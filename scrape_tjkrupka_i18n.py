#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Scraper + i18n helper
- EXPORT mode: crawl site, split pages into blocks, export CSV all_blocks.csv
- APPLY mode: read CSV and generate localized markdown pages per language

Usage examples:
  python3 scrape_tjkrupka_i18n.py --mode export --start https://tjkrupka.cz/ --outdir ~/tjkrupka_export
  # uprav all_blocks.csv v Excel / Google Sheets (sloupce text_cs, text_en, ...)
  python3 scrape_tjkrupka_i18n.py --mode apply --outdir ~/tjkrupka_export --langs cs,en
"""

import os
import re
import csv
import time
import argparse
import hashlib
from urllib.parse import urljoin, urldefrag, urlparse
import requests
from bs4 import BeautifulSoup

# ---------- konfigurace ----------
DEFAULT_START = "https://tjkrupka.cz/"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; tjkrupka-i18n-scraper/1.0)"}
SKIP_EXT = re.compile(r"\.(pdf|jpe?g|png|gif|webp|svg|ico|mp4|mp3|mov|zip|rar|7z|gz|woff2?|ttf)$", re.I)
DROP_TAGS = ("script", "style", "noscript", "iframe", "svg", "nav", "footer", "header", "form", "aside")

# ---------- pomocné funkce ----------
def detect_outdir(preferred_name="tjkrupka_export"):
    for base in ("/sdcard/Download", "/storage/emulated/0/Download"):
        if os.path.isdir(base) and os.access(base, os.W_OK):
            path = os.path.join(base, preferred_name)
            os.makedirs(path, exist_ok=True)
            return path
    path = os.path.abspath(preferred_name)
    os.makedirs(path, exist_ok=True)
    return path

def normalize(url: str, base: str) -> str:
    absu = urljoin(base, url)
    absu, _ = urldefrag(absu)
    return absu

def same_site(url: str, domain: str) -> bool:
    netloc = urlparse(url).netloc
    return (netloc == domain) or (netloc.endswith("." + domain))

def should_skip(url: str, domain: str) -> bool:
    if not url.startswith(("http://", "https://")):
        return True
    if not same_site(url, domain):
        return True
    if SKIP_EXT.search(url):
        return True
    return False

def safe_name_from_url(url: str) -> str:
    p = urlparse(url).path or "/"
    p = p.rstrip("/")
    if p in ("", "/"):
        return "index"
    return re.sub(r"[^a-zA-Z0-9_-]+", "_", p.strip("/"))[:200] or "page"

def block_id_for(url: str, block_type: str, index: int) -> str:
    # unikátní id (stabilní): hash(url + block_type + index)
    h = hashlib.sha1(f"{url}||{block_type}||{index}".encode("utf-8")).hexdigest()[:12]
    return f"{safe_name_from_url(url)}__{block_type}__{index}__{h}"

def clean_text_node(node: BeautifulSoup) -> str:
    # jednoduché očištění textu z uzlu
    txt = node.get_text(" ", strip=True)
    txt = re.sub(r"\s{2,}", " ", txt)
    return txt

# ---------- parsování stránky na bloky ----------
def page_to_blocks(url: str, html: str):
    soup = BeautifulSoup(html, "lxml")
    # odstraníme nepotřebné prvky
    for tag in soup(DROP_TAGS):
        tag.decompose()
    for hidden in soup.select('[aria-hidden="true"], [hidden], [style*="display:none"], [style*="visibility:hidden"]'):
        hidden.decompose()

    blocks = []
    # title + meta description
    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    meta = soup.find("meta", attrs={"name": "description"}) or soup.find("meta", attrs={"property": "og:description"})
    meta_desc = meta.get("content", "").strip() if meta else ""

    # title block
    blocks.append(("title", title))
    blocks.append(("meta_description", meta_desc))

    # potom projdeme hlavní obsah: h1,h2,h3,p, li (v pořadí výskytu)
    content_root = soup.body or soup
    index = 0
    for el in content_root.find_all(["h1","h2","h3","h4","p","li"], recursive=True):
        text = clean_text_node(el)
        if not text:
            continue
        tag = el.name.lower()
        # normalizujeme tagy: treat li as p
        block_type = tag if tag in ("h1","h2","h3","h4","p") else "p"
        blocks.append((block_type, text))
        index += 1

    return blocks

# ---------- EXPORT: crawl + CSV ----------
def export_mode(start_url: str, limit: int, delay: float, outdir: str, timeout: int = 25):
    domain = urlparse(start_url).netloc
    seen, queue = set(), [start_url]
    session = requests.Session()
    session.headers.update(HEADERS)

    rows = []
    print(f"[info] Stahuji domovskou stránku: {start_url}")
    while queue and len(seen) < limit:
        url = queue.pop(0)
        if url in seen:
            continue
        seen.add(url)
        try:
            r = session.get(url, timeout=timeout, verify=True)
            ctype = r.headers.get("content-type", "").lower()
            if "text/html" not in ctype:
                print(f"[skip] {url} (ctype {ctype})")
                continue
            blocks = page_to_blocks(url, r.text)
            for idx, (btype, btext) in enumerate(blocks):
                bid = block_id_for(url, btype, idx)
                rows.append({
                    "page_url": url,
                    "page_path": urlparse(url).path or "/",
                    "block_id": bid,
                    "block_type": btype,
                    "orig_text": btext,
                    # připravené sloupce pro překlady/úpravy (ponechány prázdné)
                    "text_cs": btext if urlparse(url).netloc.endswith("tjkrupka.cz") else btext,
                    "text_en": "",
                    "text_de": ""
                })
            # discover links
            soup = BeautifulSoup(r.text, "lxml")
            for a in soup.find_all("a", href=True):
                nu = normalize(a["href"], url)
                if not should_skip(nu, domain):
                    if nu not in seen and nu not in queue:
                        queue.append(nu)
            print(f"[ok] {url} (blocks: {len(blocks)})")
            time.sleep(max(0.0, delay))
        except Exception as e:
            print(f"[error] Stažení selhalo: {e}")
            rows.append({
                "page_url": url,
                "page_path": urlparse(url).path or "/",
                "block_id": block_id_for(url, "error", 0),
                "block_type": "error",
                "orig_text": f"__ERROR__:{e}",
                "text_cs": "",
                "text_en": "",
                "text_de": ""
            })
            continue

    csv_path = os.path.join(outdir, "all_blocks.csv")
    fieldnames = ["page_url","page_path","block_id","block_type","orig_text","text_cs","text_en","text_de"]
    with open(csv_path, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows:
            w.writerow(r)

    print(f"\n✅ Export hotov: {csv_path} (řádků: {len(rows)})")
    return csv_path

# ---------- APPLY: čtení CSV a generování lokalizovaných souborů ----------
def apply_mode(csv_path: str, outdir: str, langs: list):
    # načteme CSV -> seskupíme podle stránky, rekonstrukce obsahu v pořadí výskytu
    pages = {}  # page_url -> list of blocks (in order)
    with open(csv_path, "r", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for row in r:
            page = row["page_url"]
            if page not in pages:
                pages[page] = []
            pages[page].append(row)

    # pro každý jazyk vytvoříme složku outdir/{lang}/pages/ a v ní MD soubory
    for lang in langs:
        lang_dir = os.path.join(outdir, lang, "pages")
        os.makedirs(lang_dir, exist_ok=True)
        for page_url, blocks in pages.items():
            fname = safe_name_from_url(page_url) + ".md"
            path = os.path.join(lang_dir, fname)
            # vytvoříme MD s pořadím bloků: title, meta, potom obsah
            lines = []
            # title
            title_block = next((b for b in blocks if b["block_type"] == "title"), None)
            if title_block:
                txt = title_block.get(f"text_{lang}", "") or title_block.get("orig_text", "")
                lines.append(f"# {txt}\n")
            # meta
            meta_block = next((b for b in blocks if b["block_type"] == "meta_description"), None)
            if meta_block:
                mtxt = meta_block.get(f"text_{lang}", "") or meta_block.get("orig_text", "")
                if mtxt:
                    lines.append(f"> {mtxt}\n")
            # obsah
            for b in blocks:
                btype = b["block_type"]
                if btype in ("title","meta_description"):
                    continue
                txt = b.get(f"text_{lang}", "") or b.get("orig_text", "")
                if not txt:
                    continue
                if btype.startswith("h") and len(btype) == 2 and btype[1].isdigit():
                    # nadpis
                    level = int(btype[1])
                    level = min(max(level,1),6)
                    lines.append(f"{'#'*level} {txt}\n")
                else:
                    # odstavec
                    lines.append(f"{txt}\n")
            # uložit
            with open(path, "w", encoding="utf-8") as fh:
                fh.write("\n".join(lines))
        print(f"[ok] lokalizace {lang} v {os.path.join(outdir,lang)}")

    print("\n✅ Apply hotov. Zkontroluj složky s MD soubory a nasazení dle svého CMS workflow.")

# ---------- CLI ----------
def parse_args():
    ap = argparse.ArgumentParser(description="Scraper + CSV i18n helper")
    ap.add_argument("--mode", choices=("export","apply"), required=True, help="export = scrape -> CSV, apply = CSV -> localized files")
    ap.add_argument("--start", default=DEFAULT_START, help="start URL pro export")
    ap.add_argument("--limit", type=int, default=1000, help="max počet stránek při exportu")
    ap.add_argument("--delay", type=float, default=0.25, help="prodleva mezi požadavky")
    ap.add_argument("--outdir", default=None, help="výstupní složka (default detect)")
    ap.add_argument("--csv", default=None, help="cesta k CSV při režimu apply")
    ap.add_argument("--langs", default="cs,en", help="seznam jazyků oddělených čárkou při apply (např. cs,en,de)")
    return ap.parse_args()

if __name__ == "__main__":
    args = parse_args()
    outdir = args.outdir or detect_outdir()
    if args.mode == "export":
        export_mode(args.start, args.limit, args.delay, outdir)
    else:
        csv_path = args.csv or os.path.join(outdir, "all_blocks.csv")
        langs = [x.strip() for x in args.langs.split(",") if x.strip()]
        if not langs:
            langs = ["cs"]
        apply_mode(csv_path, outdir, langs)
