#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Crawl web a ulož texty do dvou CSV:
1) structured_blocks.csv  (1 řádek = 1 textový blok; zachované pořadí + rodiče H1/H2/H3)
2) per_page_wide.csv      (1 řádek = 1 stránka; sloupce H1_*, H2_*, H3_*, H4_*, H5_*, H6_*, P_*)

Příklad:
  python3 site_to_structured_csv.py --start https://tjkrupka.cz/ --outdir ./export \
    --limit 2000 --delay 0.2 --max-per-tag 200
"""

import os, re, csv, time, argparse
from urllib.parse import urljoin, urldefrag, urlparse
import requests
from bs4 import BeautifulSoup

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; structured-export/1.1)"}
DROP_TAGS = ("script","style","noscript","iframe","svg","nav","footer","header","form","aside")
HIDDEN_SEL = '[aria-hidden="true"], [hidden], [style*="display:none"], [style*="visibility:hidden"]'
SKIP_EXT = re.compile(r"\.(pdf|jpe?g|png|gif|webp|svg|ico|mp4|mp3|mov|zip|rar|7z|gz|woff2?|ttf)$", re.I)

TAGS_CAPTURE = ["h1","h2","h3","h4","h5","h6","p","li"]  # li ukládáme jako P

def norm_url(href, base):
    u = urljoin(base, href)
    return urldefrag(u)[0]

def same_site(u, domain):
    netloc = urlparse(u).netloc
    return netloc == domain or netloc.endswith("." + domain)

def should_skip(u, domain):
    if not u.startswith(("http://","https://")): return True
    if not same_site(u, domain): return True
    if SKIP_EXT.search(u): return True
    return False

def clean_text(node):
    txt = node.get_text(" ", strip=True)
    txt = re.sub(r"\s{2,}", " ", txt)
    return txt

def extract_page_struct(html):
    soup = BeautifulSoup(html, "lxml")

    # schovat rušivé/nevhodné části
    for t in soup(DROP_TAGS): t.decompose()
    for h in soup.select(HIDDEN_SEL): h.decompose()

    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    m = soup.find("meta", attrs={"name":"description"}) or soup.find("meta", attrs={"property":"og:description"})
    meta_desc = m.get("content","").strip() if m else ""

    root = soup.body or soup

    blocks = []
    order = 0
    parent_h1 = parent_h2 = parent_h3 = ""

    for el in root.find_all(TAGS_CAPTURE, recursive=True):
        tag = el.name.lower()
        text = clean_text(el)
        if not text:
            continue

        # hierarchie
        if tag == "h1":
            parent_h1, parent_h2, parent_h3 = text, "", ""
        elif tag == "h2":
            parent_h2, parent_h3 = text, ""
        elif tag == "h3":
            parent_h3 = text

        tag_for_row = tag if tag != "li" else "p"
        level = int(tag[1]) if tag.startswith("h") and tag[1].isdigit() else (0 if tag_for_row == "p" else 0)

        blocks.append({
            "order": order,
            "tag": tag_for_row,
            "level": level,
            "text": text,
            "parent_h1": parent_h1,
            "parent_h2": parent_h2,
            "parent_h3": parent_h3
        })
        order += 1

    return title, meta_desc, blocks

def crawl(start, limit, delay, timeout):
    domain = urlparse(start).netloc
    q, seen, pages = [start], set(), []

    sess = requests.Session()
    sess.headers.update(HEADERS)
    # certifi fallback (mac/Homebrew)
    try:
        import certifi, os as _os
        _os.environ.setdefault("SSL_CERT_FILE", certifi.where())
    except Exception:
        pass

    while q and len(seen) < limit:
        url = q.pop(0)
        if url in seen: continue
        seen.add(url)
        try:
            r = sess.get(url, timeout=timeout)
            ctype = r.headers.get("content-type","").lower()
            if "text/html" not in ctype:
                continue
            title, meta_desc, blocks = extract_page_struct(r.text)
            pages.append({
                "url": url,
                "path": urlparse(url).path or "/",
                "title": title,
                "meta_description": meta_desc,
                "blocks": blocks
            })

            # objev odkazy
            soup = BeautifulSoup(r.text, "lxml")
            for a in soup.find_all("a", href=True):
                u = norm_url(a["href"], url)
                if not should_skip(u, domain) and u not in seen and u not in q:
                    q.append(u)

            print(f"[ok] {url} (bloků: {len(blocks)})")
            time.sleep(max(0.0, delay))
        except Exception as e:
            print(f"[err] {url} -> {e}")
            pages.append({
                "url": url,
                "path": urlparse(url).path or "/",
                "title": "",
                "meta_description": "",
                "blocks": [{"order":0,"tag":"error","level":0,"text":f"__ERROR__:{e}","parent_h1":"","parent_h2":"","parent_h3":""}]
            })
    return pages

def write_structured_blocks_csv(pages, outdir):
    path = os.path.join(outdir, "structured_blocks.csv")
    os.makedirs(outdir, exist_ok=True)
    fields = ["url","path","order","tag","level","parent_h1","parent_h2","parent_h3","text"]
    with open(path, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for p in pages:
            for b in p["blocks"]:
                w.writerow({
                    "url": p["url"],
                    "path": p["path"],
                    "order": b["order"],
                    "tag": b["tag"],
                    "level": b["level"],
                    "parent_h1": b["parent_h1"],
                    "parent_h2": b["parent_h2"],
                    "parent_h3": b["parent_h3"],
                    "text": b["text"]
                })
    return path

def write_per_page_wide_csv(pages, outdir, max_per_tag):
    path = os.path.join(outdir, "per_page_wide.csv")
    os.makedirs(outdir, exist_ok=True)

    # připrav hlavičky
    heads = ["url","path","title","meta_description"]
    tags = ["h1","h2","h3","h4","h5","h6","p"]
    for t in tags:
        heads += [f"{t.upper()}_{i}" for i in range(1, max_per_tag+1)]

    with open(path, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=heads)
        w.writeheader()
        for p in pages:
            row = {"url": p["url"], "path": p["path"], "title": p["title"], "meta_description": p["meta_description"]}
            counters = {t:0 for t in tags}
            for b in p["blocks"]:
                tag = b["tag"] if b["tag"] in tags else "p"
                counters[tag] += 1
                idx = counters[tag]
                if idx <= max_per_tag:
                    row[f"{tag.upper()}_{idx}"] = b["text"]
            w.writerow(row)
    return path

def parse_args():
    ap = argparse.ArgumentParser(description="Export strukturovaných textů webu do CSV")
    ap.add_argument("--start", required=True, help="Start URL (např. https://tjkrupka.cz/)")
    ap.add_argument("--outdir", required=True, help="Výstupní složka")
    ap.add_argument("--limit", type=int, default=2000, help="Max. počet stránek")
    ap.add_argument("--delay", type=float, default=0.25, help="Prodleva mezi požadavky (s)")
    ap.add_argument("--timeout", type=int, default=25, help="HTTP timeout (s)")
    ap.add_argument("--max-per-tag", type=int, default=200, help="Max. počet sloupců na tag v per_page_wide.csv")
    return ap.parse_args()

def main():
    args = parse_args()
    os.makedirs(args.outdir, exist_ok=True)
    pages = crawl(args.start, args.limit, args.delay, args.timeout)
    p1 = write_structured_blocks_csv(pages, args.outdir)
    p2 = write_per_page_wide_csv(pages, args.outdir, args.max_per_tag)
    print("\n✅ Hotovo")
    print(f"   {p1}")
    print(f"   {p2}")

if __name__ == "__main__":
    main()
