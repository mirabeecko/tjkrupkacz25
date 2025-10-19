#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os, re, csv, time, argparse, asyncio
from urllib.parse import urljoin, urldefrag, urlparse
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

DROP_TAGS = ("script","style","noscript","iframe","svg","form")
HIDDEN_SEL = '[aria-hidden="true"], [hidden], [style*="display:none"], [style*="visibility:hidden"]'
SKIP_EXT = re.compile(r"\.(pdf|jpe?g|png|gif|webp|svg|ico|mp4|mp3|mov|zip|rar|7z|gz|woff2?|ttf)$", re.I)
TAGS_CAPTURE = ["h1","h2","h3","h4","h5","h6","p","li"]

def norm_url(href, base): u = urljoin(base, href); return urldefrag(u)[0]
def same_site(u, domain): netloc = urlparse(u).netloc; return netloc==domain or netloc.endswith("."+domain)
def should_skip(u, domain):
    if not u.startswith(("http://","https://")): return True
    if not same_site(u, domain): return True
    if SKIP_EXT.search(u): return True
    return False

def clean_text(node):
    txt = node.get_text(" ", strip=True)
    return re.sub(r"\s{2,}", " ", txt)

def extract_structured(html):
    soup = BeautifulSoup(html, "lxml")
    for t in soup(DROP_TAGS): t.decompose()
    for h in soup.select(HIDDEN_SEL): h.decompose()
    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    md = soup.find("meta", attrs={"name":"description"}) or soup.find("meta", attrs={"property":"og:description"})
    meta_desc = md.get("content","").strip() if md else ""
    root = soup.body or soup
    blocks, order = [], 0
    parent_h1 = parent_h2 = parent_h3 = ""
    for el in root.find_all(TAGS_CAPTURE, recursive=True):
        tag = el.name.lower()
        text = clean_text(el)
        if not text: continue
        if tag == "h1": parent_h1, parent_h2, parent_h3 = text, "", ""
        elif tag == "h2": parent_h2, parent_h3 = text, ""
        elif tag == "h3": parent_h3 = text
        tag_for = tag if tag != "li" else "p"
        level = int(tag[1]) if tag.startswith("h") and tag[1].isdigit() else 0
        blocks.append({"order":order,"tag":tag_for,"level":level,"text":text,
                       "parent_h1":parent_h1,"parent_h2":parent_h2,"parent_h3":parent_h3})
        order += 1
    return title, meta_desc, blocks

async def crawl_rendered(start, limit, delay, timeout):
    domain = urlparse(start).netloc
    queue, seen, pages = [start], set(), []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context(ignore_https_errors=False)
        page = await ctx.new_page()

        while queue and len(seen) < limit:
            url = queue.pop(0)
            if url in seen: continue
            seen.add(url)
            try:
                resp = await page.goto(url, wait_until="load", timeout=timeout*1000)
                # 2. wave: počkej na „síť klid“ a nech vykreslit lazy obsah
                try: await page.wait_for_load_state("networkidle", timeout=timeout*1000)
                except: pass
                await page.wait_for_timeout(500)  # krátké dojití JS

                # odklikni cookie lištu, pokud má standardní pattern
                for sel in ["button[aria-label*='Accept']","button:has-text('Accept')",
                            "button:has-text('Souhlasím')","button:has-text('Povolit vše')"]:
                    for b in await page.query_selector_all(sel):
                        try: await b.click(timeout=500)
                        except: pass

                html = await page.content()
                title, meta_desc, blocks = extract_structured(html)
                pages.append({"url":url,"path":urlparse(url).path or "/",
                              "title":title,"meta_description":meta_desc,"blocks":blocks})
                # link discovery z vykresleného DOMu
                links = await page.eval_on_selector_all("a[href]", "els => els.map(e=>e.getAttribute('href'))")
                for href in links:
                    if not href: continue
                    u = norm_url(href, url)
                    if not should_skip(u, domain) and u not in seen and u not in queue:
                        queue.append(u)
                print(f"[ok] {url} (bloků: {len(blocks)})")
                await page.wait_for_timeout(int(max(0, delay)*1000))
            except Exception as e:
                print(f"[err] {url} -> {e}")
                pages.append({"url":url,"path":urlparse(url).path or "/",
                              "title":"","meta_description":"",
                              "blocks":[{"order":0,"tag":"error","level":0,"text":f'__ERROR__:{e}',
                                         "parent_h1":"","parent_h2":"","parent_h3":""}]})
        await browser.close()
    return pages

def write_structured_blocks_csv(pages, outdir):
    p = os.path.join(outdir, "structured_blocks.csv")
    os.makedirs(outdir, exist_ok=True)
    fields = ["url","path","order","tag","level","parent_h1","parent_h2","parent_h3","text"]
    with open(p, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields); w.writeheader()
        for pg in pages:
            for b in pg["blocks"]:
                w.writerow({"url":pg["url"],"path":pg["path"],"order":b["order"],"tag":b["tag"],
                            "level":b["level"],"parent_h1":b["parent_h1"],"parent_h2":b["parent_h2"],
                            "parent_h3":b["parent_h3"],"text":b["text"]})
    return p

def write_per_page_wide_csv(pages, outdir, max_per_tag):
    p = os.path.join(outdir, "per_page_wide.csv")
    os.makedirs(outdir, exist_ok=True)
    tags = ["h1","h2","h3","h4","h5","h6","p"]
    heads = ["url","path","title","meta_description"] + [f"{t.upper()}_{i}" for t in tags for i in range(1, max_per_tag+1)]
    with open(p, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=heads); w.writeheader()
        for pg in pages:
            row = {"url":pg["url"],"path":pg["path"],"title":pg["title"],"meta_description":pg["meta_description"]}
            counts = {t:0 for t in tags}
            for b in pg["blocks"]:
                t = b["tag"] if b["tag"] in tags else "p"
                counts[t]+=1
                i = counts[t]
                if i<=max_per_tag: row[f"{t.upper()}_{i}"]=b["text"]
            w.writerow(row)
    return p

def parse_args():
    ap = argparse.ArgumentParser(description="Rendered crawl → structured CSV")
    ap.add_argument("--start", required=True)
    ap.add_argument("--outdir", required=True)
    ap.add_argument("--limit", type=int, default=2000)
    ap.add_argument("--delay", type=float, default=0.2)
    ap.add_argument("--timeout", type=int, default=25)
    ap.add_argument("--max-per-tag", type=int, default=200)
    return ap.parse_args()

def main():
    args = parse_args()
    os.makedirs(args.outdir, exist_ok=True)
    pages = asyncio.run(crawl_rendered(args.start, args.limit, args.delay, args.timeout))
    p1 = write_structured_blocks_csv(pages, args.outdir)
    p2 = write_per_page_wide_csv(pages, args.outdir, args.max_per_tag)
    print("\n✅ Hotovo"); print(" ", p1); print(" ", p2)

if __name__ == "__main__":
    main()
