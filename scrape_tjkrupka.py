#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Scraper pro tjkrupka.cz
- Projde všechny interní stránky
- Z každé vytáhne viditelný text (bez <script>, <style>, <noscript>)
- Výstupy:
  - tjkrupka_all_text.txt  (všechny texty pohromadě, očíslované podle URL)
  - tjkrupka_content.csv   (strukturovaně: URL, Title, H1–H6, Paragraphs, Lists)
Použití: python3 scrape_tjkrupka.py
Volby:   --respect-robots (respektovat robots.txt)
"""

import argparse
import csv
import html
import re
import sys
import time
from collections import deque
from urllib.parse import urljoin, urlparse, urldefrag

import requests
from bs4 import BeautifulSoup

START_URL = "http://tjkrupka.cz"
TIMEOUT = 15
DELAY_S = 0.5           # šetrné zpoždění mezi dotazy
MAX_PAGES = 5000        # bezpečnostní limit
HEADERS = {
    "User-Agent": "TJ-Krupka-Scraper/1.0 (+mailto:info@tjkrupka.cz)"
}
ALLOWED_SCHEMES = {"http", "https"}

def normalize_url(url: str) -> str:
    # odstraň fragmenty (#...) a sjednoť http/https na https, nech query
    url, _ = urldefrag(url)
    parsed = urlparse(url)
    scheme = "https" if parsed.scheme in ALLOWED_SCHEMES else parsed.scheme
    normalized = parsed._replace(scheme=scheme).geturl()
    # odstranit trailing slash duplicity
    if normalized.endswith("/"):
        normalized = normalized[:-1]
    return normalized

def same_domain(u: str, base_netloc: str) -> bool:
    return urlparse(u).netloc == base_netloc

def is_probably_html(resp: requests.Response) -> bool:
    ctype = resp.headers.get("Content-Type", "").lower()
    return "text/html" in ctype or "application/xhtml" in ctype or ctype == ""

def clean_text(s: str) -> str:
    s = html.unescape(s)
    s = re.sub(r"\s+\n", "\n", s)
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()

def extract_visible_texts(soup: BeautifulSoup):
    # odstraníme neviditelné části
    for tag in soup(["script", "style", "noscript", "template", "iframe"]):
        tag.decompose()

    # schovat navigační opakující se prvky (často mají role/nav/header/footer)
    for tag in soup.find_all(["nav", "header", "footer", "form", "aside"]):
        # ponecháme ale text v main obsahu
        pass

    # Nadpisy
    headings = {}
    for level in range(1, 7):
        hs = [clean_text(h.get_text(separator=" ", strip=True))
              for h in soup.find_all(f"h{level}")]
        headings[f"h{level}"] = [t for t in hs if t]

    # Odstavce
    paragraphs = [clean_text(p.get_text(separator=" ", strip=True))
                  for p in soup.find_all("p")]
    paragraphs = [p for p in paragraphs if p]

    # Položky seznamů
    list_items = [clean_text(li.get_text(separator=" ", strip=True))
                  for li in soup.find_all("li")]
    list_items = [li for li in list_items if li]

    # Celkový "viditelný" text (konzervativně poskládaný)
    blocks = []
    title = clean_text(soup.title.get_text(strip=True)) if soup.title else ""
    if title:
        blocks.append(f"# {title}")
    for level in range(1, 7):
        for t in headings[f"h{level}"]:
            blocks.append(t)
    blocks.extend(paragraphs)
    blocks.extend(list_items)
    full_text = clean_text("\n".join(b for b in blocks if b))

    return title, headings, paragraphs, list_items, full_text

def get_robots_parser(base: str):
    from urllib import robotparser
    rp = robotparser.RobotFileParser()
    root = f"{urlparse(base).scheme}://{urlparse(base).netloc}/robots.txt"
    try:
        rp.set_url(root)
        rp.read()
    except Exception:
        pass
    return rp

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--respect-robots", action="store_true",
                    help="Respektovat robots.txt (doporučeno pro cizí weby).")
    args = ap.parse_args()

    start = START_URL
    start = normalize_url(start)
    base = urlparse(start)
    base_netloc = base.netloc

    rp = get_robots_parser(start) if args.respect_robots else None

    seen = set()
    q = deque([start])

    rows = []  # pro CSV
    all_text_parts = []  # pro TXT

    pages_count = 0

    while q and pages_count < MAX_PAGES:
        url = q.popleft()
        if url in seen:
            continue
        seen.add(url)

        if rp and not rp.can_fetch(HEADERS["User-Agent"], url):
            # přeskočit, pokud robots nepovoluje
            continue

        try:
            resp = requests.get(url, timeout=TIMEOUT, headers=HEADERS, allow_redirects=True)
        except requests.RequestException:
            continue

        # pouze HTML
        if not is_probably_html(resp):
            continue

        # jen stejná doména
        if not same_domain(resp.url, base_netloc):
            continue

        # parse
        try:
            soup = BeautifulSoup(resp.text, "html.parser")
        except Exception:
            continue

        title, headings, paragraphs, list_items, full_text = extract_visible_texts(soup)

        # zapsat do TXT
        if full_text:
            all_text_parts.append(f"===== {resp.url} =====\n{full_text}\n")

        # řádek do CSV
        row = {
            "URL": resp.url,
            "Title": title,
            "H1": " | ".join(headings["h1"]),
            "H2": " | ".join(headings["h2"]),
            "H3": " | ".join(headings["h3"]),
            "H4": " | ".join(headings["h4"]),
            "H5": " | ".join(headings["h5"]),
            "H6": " | ".join(headings["h6"]),
            "Paragraphs": " \\n ".join(paragraphs),
            "Lists": " \\n ".join(list_items),
        }
        rows.append(row)
        pages_count += 1

        # najít nové interní odkazy
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            if href.startswith("mailto:") or href.startswith("tel:"):
                continue
            nxt = urljoin(resp.url, href)
            nxt = normalize_url(nxt)
            if (urlparse(nxt).scheme in ALLOWED_SCHEMES
                and same_domain(nxt, base_netloc)
                and nxt not in seen):
                q.append(nxt)

        time.sleep(DELAY_S)

    # uložit soubory
    with open("tjkrupka_all_text.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(all_text_parts))

    fieldnames = ["URL", "Title", "H1", "H2", "H3", "H4", "H5", "H6", "Paragraphs", "Lists"]
    with open("tjkrupka_content.csv", "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows:
            w.writerow(r)

    print(f"Hotovo. Stránek: {pages_count}")
    print("Výstupy: tjkrupka_all_text.txt, tjkrupka_content.csv")

if __name__ == "__main__":
    # Bezpečnostní pojistka pro systémy bez certifikátů – případně odkomentuj:
    # requests.packages.urllib3.disable_warnings()
    main()
