#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Crawl web a ulož VŠECHEN viditelný text do JEDNOHO souboru:
- CSV (sloupce: url,title,full_text) NEBO
- MD (sekce per URL) NEBO
- JSON (list objektů)

Příklad:
  python3 site_to_single_file.py --start https://tjkrupka.cz/ --format csv --out ./export/site_texts.csv
"""

import os, re, csv, json, time, argparse, hashlib
from urllib.parse import urljoin, urldefrag, urlparse
import requests
from bs4 import BeautifulSoup

# ------------ Nastavení ------------
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; bulk-text-export/1.0)"}
SKIP_EXT = re.compile(r"\.(pdf|jpe?g|png|gif|webp|svg|ico|mp4|mp3|mov|zip|rar|7z|gz|woff2?|ttf)$", re.I)
DROP_TAGS = ("script","style","noscript","iframe","svg","nav","footer","header","form","aside")
HIDDEN_SEL = '[aria-hidden="true"], [hidden], [style*="display:none"], [style*="visibility:hidden"]'

def norm_url(href: str, base: str) -> str:
    u = urljoin(base, href)
    u, _ = urldefrag(u)
    return u

def same_site(u: str, domain: str) -> bool:
    netloc = urlparse(u).netloc
    return netloc == domain or netloc.endswith("." + domain)

def should_skip(u: str, domain: str) -> bool:
    if not u.startswith(("http://","https://")): return True
    if not same_site(u, domain): return True
    if SKIP_EXT.search(u): return True
    return False

def visible_text(html: str) -> tuple[str,str]:
    soup = BeautifulSoup(html, "lxml")
    for t in soup(DROP_TAGS): t.decompose()
    for h in soup.select(HIDDEN_SEL): h.decompose()
    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    # vezmeme viditelný text z <body>
    root = soup.body or soup
    text = root.get_text("\n", strip=True)
    # zhuštění mezer/řádků
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return title, text

def crawl_to_records(start: str, limit: int, delay: float, timeout: int) -> list[dict]:
    domain = urlparse(start).netloc
    q, seen, out = [start], set(), []
    sess = requests.Session()
    sess.headers.update(HEADERS)

    # certifi fallback (macOS/Homebrew prostředí)
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
                # ignoruj ne-HTML
                continue
            title, text = visible_text(r.text)
            out.append({
                "url": url,
                "title": title,
                "full_text": text
            })
            # objev odkazy
            soup = BeautifulSoup(r.text, "lxml")
            for a in soup.find_all("a", href=True):
                u = norm_url(a["href"], url)
                if not should_skip(u, domain) and u not in seen and u not in q:
                    q.append(u)
            time.sleep(max(0.0, delay))
            print(f"[ok] {url}  (celkem: {len(out)})")
        except Exception as e:
            print(f"[err] {url} -> {e}")
            out.append({"url": url, "title": "", "full_text": f"__ERROR__: {e}"})
    return out

def write_csv(records: list[dict], path: str):
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["url","title","full_text"])
        w.writeheader()
        w.writerows(records)

def write_json(records: list[dict], path: str):
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)

def write_md(records: list[dict], path: str):
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        for rec in records:
            f.write(f"# {rec['title'] or rec['url']}\n\n")
            f.write(f"_URL: {rec['url']}_\n\n")
            f.write(f"{rec['full_text']}\n\n---\n\n")

def main():
    ap = argparse.ArgumentParser(description="Export všech textů webu do jednoho souboru (CSV/MD/JSON)")
    ap.add_argument("--start", required=True, help="Start URL (např. https://tjkrupka.cz/)")
    ap.add_argument("--format", choices=("csv","md","json"), default="csv", help="Výstupní formát")
    ap.add_argument("--out", required=True, help="Cesta k výstupnímu souboru (např. ./export/site_texts.csv)")
    ap.add_argument("--limit", type=int, default=1000, help="Max. počet stránek")
    ap.add_argument("--delay", type=float, default=0.25, help="Prodleva mezi požadavky (s)")
    ap.add_argument("--timeout", type=int, default=25, help="HTTP timeout (s)")
    args = ap.parse_args()

    print(f"[info] Start: {args.start} → {args.out} ({args.format})")
    records = crawl_to_records(args.start, args.limit, args.delay, args.timeout)
    if args.format == "csv":
        write_csv(records, args.out)
    elif args.format == "json":
        write_json(records, args.out)
    else:
        write_md(records, args.out)
    print(f"✅ Hotovo: {args.out}  (stránek: {len(records)})")

if __name__ == "__main__":
    main()
