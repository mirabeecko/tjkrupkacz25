# Návrh: Jak udělat web tjkrupkacz25 přesvědčivější

> Status: **NÁVRH — nic se nemění v produkci.** Tento dokument slouží jako pracovní podklad pro doladění.
> Datum: 2026-08-30 · Autor: AI asistent (revize s majitelem webu probíhá)

---

## 0. Rozhodnutí majitele (2026-08-30)

| Oblast | Rozhodnutí | Dopad |
|--------|-----------|-------|
| **Hlavní kontakt** | `+420 777 734 389` a `info@tjkrupka.cz` | Všechna ostatní čísla/e-maily na webu sjednotit na tento pár (viz Fáze 1, bod 1) |
| **Ubytování** | Připravuje se (nefunguje) → **waitlist se slevou pro první hosty** | Sekce 3.3 / 3.4 použije variantu 2 (waitlist) |
| **Start** | **Fáze 1 — důvěra a konzistence** | Sekce 4, Fáze 1 je rozpracovaná na konkrétní soubory a řádky |

> ⚠️ Poznámka k snowkitingovému číslu: na stránkách kurzů (KontaktSnowkiting, SnowkitingKurzy)
> je dnes `+420 773 090 842` a `snowkiting@tjkrupka.cz`. Rozhodnutí „jeden hlavní kontakt" platí pro
> klubové stránky (Kontakt, patička, SEO, právní stránky). **Otevřená otázka:** necháváme snowkiting
> jako samostatný kontakt (často tak školy fungují), nebo i kurzy převedeme na klubový? → viz bod 6.

---

## 1. Co web dnes je (stručný audit)

Web sportovního klubu **TJ Krupka (Komáří vížka, Krušné hory)** — 50 let tradice, areál,
snowkitingová škola s vybavením Flysurfer, lyžařský areál, ubytování, bistro, programy pro
školy a firmy, e-shop, členská zóna.

Vizáž je moderní (gradienty, animace, fullscreen sekce), ale **persuase (přesvědčovací
mechanika) za ní výrazně zaostává** — texty jsou spíše popisné než prodejní a řada prvků
důvěry je nekonzistentní nebo falešná.

---

## 2. Hlavní slabiny, které ubírají na přesvědčivosti

| # | Problém | Důkaz v kódu |
|---|---------|--------------|
| 1 | **Roztříštěná identita** — hero je 100% snowkiting, klub (50 let, komunita, celoroční areál) je schovaný na /o-nas | `src/pages/Index.tsx` — hero „Snowkiting v Krušných horách", badge „Zimní sezóna 2025 je tady!" |
| 2 | **Zastaralá/časově vázaná sdělení** | „Zimní sezóna **2025** je tady!" (`Index.tsx:162`), „Coming soon **2025**" (`Sluzby.tsx:145`), „Glamping bude spuštěn v roce **2025**" (`Ubytovani.tsx:81`) |
| 3 | **Nekonzistentní čísla** — 10+ / 15+ / 50+ let zkušeností; 50+ / 1000+ účastníků | `Index.tsx:667`, `Sluzby.tsx:229`, `ONas.tsx:95` |
| 4 | **Slabé/směšné statistiky** — „⭐️ Perfektní hodnocení" jako metrika | `Sluzby.tsx:236` |
| 5 | **Testimonials na homepage jsou vypnuté** (zakomentované) | `Index.tsx:271–307` |
| 6 | **Reference vypadají smyšlené** — „TechSolutions s.r.o., 2024", „Mgr. Jana Nováková, ZŠ Teplice" | `firmy.tsx:183`, `skoly.tsx:176` |
| 7 | **„Již brzy / rekonstrukce" místo prodeje** — ubytování i airbag se samy „odprodejují" | `Ubytovani.tsx:39,51`, `Index.tsx:417` |
| 8 | **CTA, která nic nedělají** — „Koupit" a „Rezervovat" tlačítka bez handleru | `Vstupenky.tsx:71–73, 89–91, 99–101` |
| 9 | **Nekonzistentní kontakty** — 2 telefonní čísla, 4 e-maily | `Kontakt.tsx:117` (+420 777 734 389) vs `Sluzby.tsx:475`/`SnowkitingKurzy.tsx` (+420 773 090 842) |
| 10 | **Placeholder telefon ve strukturovaných datech** — „+420-123-456-789" | `src/components/SEO.tsx` |
| 11 | **Sociální sítě vedou na domovské stránky** Facebook/Instagram/YouTube, ne na profily klubu | `Footer.tsx:54–61` |
| 12 | **„Živá" data jsou falešná** — teploty 12°C / 8°C / 10°C / 11°C natvrdo | `Kontakt.tsx:278–352`, `WeatherSection.tsx:108` |
| 13 | **Chybějící OG obrázek** — odkazuje se na neexistující soubor | `src/components/SEO.tsx` → `public/images/og-image.jpg` neexistuje |
| 14 | **Překlepy v klíčových sděleních** | „Kurz **začína**!" (`SnowkitingKurzy.tsx:509`), „**Létejte** na sněhu s drakem" (`Sluzby.tsx:29`) |
| 15 | **Homepage = 6 fullscreen sekcí** s animacemi částic — pomalý skrol, žádné „proč my" | `src/pages/Index.tsx` |

---

## 3. Návrhy po sekcích (s konkrétními texty „před → po")

### 3.1 Domovská stránka — hero (nejdůležitější změna)

**Problém:** Hero prodává jen snowkiting a hned na začátku říká zastaralou sezónu.
Klub jako celek (jediné místo, celoročně) se neobjeví.

**Návrh — nový hero (před → po):**

> **PŘED:** Badge „Zimní sezóna 2025 je tady!" + „Snowkiting v Krušných horách / Když vítr šeptá tvé jméno…"
>
> **PO:** Badge „50 let sportu na Komáří vížce" + nadpis **„Celoroční areál v Krušných horách"** + podtitul „Lyžování a snowkiting v zimě, trailpark a MTB v létě, ubytování a bistro po celý rok. Jedno místo — všechny vaše sporty."

- **Seasonální badge nahradit dynamickým** („Zima 2026/27" / „Léto 2026" podle data) nebo neutrálním.
- Hlavní CTA ponechat „Zobrazit kurzy", přidat druhou cestu **„Prohlédnout všechny služby"** místo „O nás" (návštěvník hledá službu, ne historii).

### 3.2 Služby — čísla a důkazy

**Problém:** „15+ let zkušeností", „1000+ klientů", „⭐️ Perfektní hodnocení" — nesourodé a nedoložené.

**Návrh:**
- Sjednotit metriky na **jednu sadu ověřitelných čísel** (viz bod 5 — co potřebuji od vás).
- Nahradit „⭐️ Perfektní hodnocení" konkrétním číslem: **„4,9/5 z 47 recenzí na Googlu"** (pokud reálné).
- U každé top služby přidat **1 řádek výsledku**: např. snowkiting → „Za 3 dny se naučíte první jízdy" (mají to už v testiominals, ale jsou vypnuté).
- **Zapnout zpět testimonials na homepage** a doplnit je skutečnými jmény + fotkami (nebo je neuvádět vůbec).

### 3.3 „Coming soon" produkty → prodej nebo sběr poptávek

**Problém:** Ubytování („probíhá rekonstrukce, otevíráme brzy"), glamping („v roce 2025") a airbag („COMING SOON") — to jsou tři produkty, které se samy odradí.

**Rozhodnuto:** Ubytování se připravuje → použít **variantu 2 (waitlist)**:

> **PŘED:** „Právě probíhá kompletní rekonstrukce — těšte se na vysoký komfort! … Otevíráme již brzy! Sledujte naše stránky."
>
> **PO:** „**Penzion Komáří vížka — otevíráme v zimní sezóně 2026/27.** Zanechte nám kontakt a jako první se dozvíte o termínech a rezervacích — prvních 20 hostů dostane **slevu 15 %.**"

**Návrh (obecně, pro airbag a glamping):**
1. **Pokud služba reálně funguje** → prodat ji: ceník, termíny, „Rezervovat pobyt" s formulářem, fotky skutečných pokojů.
2. **Pokud ještě nefunguje** → waitlist se závazkem: konkrétní datum + benefit + akce (viz výše).

### 3.4 Ubytování

**Problém:** text popisuje krajinu, ne zážitek a výhody pro konkrétní skupiny.

**Návrh — přidat strukturu:**
- **Pro koho:** rodiny / sportovní týmy a soustředění / páry.
- **Co je v ceně:** parkování zdarma, snídaně, úschovna kol/lyží, wifi.
- **Jeden silný důvod:** „Jediné ubytování přímo u lanovky a trailparku — ráno na svah za 2 minuty."
- CTA: „Rezervovat" → funkční formulář s termíny (ne jen „Mám zájem").

### 3.5 Firmy a školy

**Problém:** Text je OK, ale reference vypadají vymyšlené a chybí konkrétní nabídky/balíčky.

**Návrh:**
- Reference **buď reálné s fotkou a logem firmy, nebo je odebrat** — smyšlená recenze je právní i reputační riziko.
- Přidat **2–3 hotové balíčky s cenou „od"** (např. „Půldenní teambuilding 490 Kč/osoba", „Lyžařský kurz 5 dní pro školy — ceník na vyžádání").
- Pro školy: **„Zarezervovat termín" → dotazník s volbou termínů**, ne jen e-mail.

### 3.6 Snowkiting kurzy

Tahle stránka je nejsilnější (FAQ, vybavení, postup). Drobnosti:
- Opravit „Kurz **začína**!" → „Kurz **začíná**!".
- Do hero přidat konkrétní benefit: „Max 4 lidé na instruktora" je už v textu — vytáhnout nahoru jako badge.
- „Rezervovat kurz" → místo odkazu na kontakt formulář **zavést termíny/volná místa** (BookingSystem.tsx už v projektu existuje — jen se nepoužívá).

### 3.7 Vstupenky — opravit mrtvá tlačítka

**Problém:** „Koupit" a „Rezervovat ubytování/kurz" nemají žádný handler (nic se nestane).
To je největší konverzní hřích na webu — CTA, které selže, zabije důvěru.

**Návrh:** propojit s e-shopem/kosíkem, nebo alespoň vést na formulář. Ať každé tlačítko někam vede a něco dělá.

### 3.8 Kontakt a patička — konzistence = důvěra

- **Jedno telefonní číslo a jeden hlavní e-mail** pro celý web (dnes 2 tel. + 4 e-maily: info@, snowkiting@, pujcovna@, gmail).
- **Opravit strukturovaná data** v `src/components/SEO.tsx`: telefon „+420-123-456-789" → skutečný.
- **Sociální sítě:** odkazy na skutečné profily klubu (dnes `facebook.com` bez profilu).
- **Odstranit hardcoded teploty** u webkamer — buď live API, nebo je neuvádět („Aktualizováno: 12:34" vedle statické 12°C vypadá falešně).
- **Doplnit OG obrázek** (chybí `public/images/og-image.jpg`) — sdílení na FB/WhatsApp teď nemá obrázek.

### 3.9 Jazyk sdělení obecně

Prodejní texty postavit na vzorci **„konkrétní výsledek + bez rizika + jak začít"**:
- „Zapůjčení kompletního vybavení" → „Vybavení i oblečení máte v ceně — přijedete a začnete."
- Přidat **záruku/bezpečnostní pojistku**: „Nebude foukat? Přesuneme kurz zdarma na jiný termín." (FAQ to už říká — vytáhnout na hero kurzů.)

---

## 4. Doporučené pořadí (quick wins → větší práce)

**Fáze 1 — Důvěra a konzistence (nízká námaha, velký dopad):**
1. Sjednotit kontakty (tel., e-mail, sociální sítě, SEO schema).
2. Opravit mrtvá tlačítka na Vstupenkách.
3. Opravit překlepy („začína", „Létejte") a zastaralá data (2025 → 2026/27).
4. Doplnit OG obrázek.

**Fáze 2 — Sdělení a struktura (střední námaha):**
5. Přepsat hero homepage → celoroční areál + dynamická sezóna.
6. Sjednotit statistiky na jednu ověřitelnou sadu.
7. „Coming soon" produkty → prodej nebo waitlist se slevou.
8. Zapnout/založit reálné reference.

**Fáze 3 — Konverzní tok (větší námaha):**
9. Rezervace kurzů s termíny (využít existující BookingSystem).
10. Rezervační tok ubytování.
11. Balíčky pro firmy a školy s cenami „od".

---

## 4.1 Fáze 1 — konkrétní plán (schváleno k rozpracování)

> ⚠️ Zatím **nic neměnit** — tohle je pracovní seznam, na kterém se domluvíme před spuštěním.

### Krok 1a — Hlavní kontakt `+420 777 734 389` / `info@tjkrupka.cz`

Převest **klubové stránky** z druhého čísla `+420 773 090 842` na hlavní:

| Soubor | Řádky | Co je tam dnes |
|--------|-------|----------------|
| `src/pages/cookies.tsx` | 304–305 | tel: +420 773 090 842 |
| `src/pages/PrivacyPolicy.tsx` | 67–68, 204–205 | tel: +420 773 090 842 |
| `src/pages/TermsOfService.tsx` | 72–73, 288–289 | tel: +420 773 090 842 |
| `src/pages/Accessibility.tsx` | 275–276 | tel: +420 773 090 842 |
| `src/pages/ProCleny.tsx` | 592–595 | telovychovnajednotakrupka@gmail.com → info@tjkrupka.cz |
| `src/pages/Kontakt.tsx` | 108 | gmail → info@tjkrupka.cz |
| `src/components/SEO.tsx` | 85 | placeholder „+420-123-456-789" → +420 777 734 389 |

**Otevřené — nechat na snowkitingových stránkách** (dokud se nerozhodne):
- `src/pages/KontaktSnowkiting.tsx` (231–232, 245–246), `src/pages/SnowkitingKurzy.tsx` (551–554, 636, 643), `src/pages/Sluzby.tsx` (469–475), `src/pages/member/MemberHome.tsx` (83–84)
- Půjčovna je skrytá → `pujcovna@tjkrupka.cz` (KontaktPujcovna, VehicleDetail) se řeší, až se půjčovna znovu zapne

### Krok 1b — Sociální sítě (Footer)

| Soubor | Řádky | Problém |
|--------|-------|---------|
| `src/components/Footer.tsx` | 54–61 | Odkazy vedou na `facebook.com` / `instagram.com` / `youtube.com` (domovské stránky, ne profily klubu) → doplnit skutečné URL profilů |

### Krok 2 — Mrtvá tlačítka na Vstupenkách

| Soubor | Řádky | Problém | Návrh |
|--------|-------|---------|-------|
| `src/pages/Vstupenky.tsx` | 71–73 | „Koupit" bez handleru | Přidat do košíku (CartContext existuje) nebo odkaz na /kosik |
| `src/pages/Vstupenky.tsx` | 89–91 | „Rezervovat ubytování" bez handleru | Odkaz na /ubytovani (waitlist) |
| `src/pages/Vstupenky.tsx` | 99–101 | „Vybrat kurz" bez handleru | Odkaz na /snowkiting-kurzy |

### Krok 3 — Překlepy a zastaralá data

| Soubor | Řádky | Dnes | Po |
|--------|-------|------|----|
| `src/pages/SnowkitingKurzy.tsx` | 509 | „Kurz začína!" | „Kurz začíná!" |
| `src/pages/Sluzby.tsx` | 29 | „Létejte na sněhu s drakem" | „Leťte na sněhu s drakem" |
| `src/pages/Index.tsx` | 162 | „Zimní sezóna 2025 je tady!" | „Zimní sezóna 2026/27 je tady!" (nebo dynamicky) |
| `src/pages/Ubytovani.tsx` | 81 | „Glamping bude spuštěn v roce 2025." | nové znění waitlistu (viz 3.3/3.4) |
| `src/pages/Sluzby.tsx` | 145 | „Coming soon 2025" | „Připravujeme" nebo konkrétní datum |

### Krok 4 — OG obrázek

- Chybí `public/images/og-image.jpg` (odkazuje se na něj `SEO.tsx` i `index.html`).
- Dodat obrázek 1200×630 (foto areálu + logo) → pak stačí nahrát do `public/images/og-image.jpg`.

### Krok 5 — „Živá" data (bezpečnostní, doporučeno ve Fázi 1)

| Soubor | Řádky | Problém |
|--------|-------|---------|
| `src/pages/Kontakt.tsx` | 278, 302, 327, 352 | Teploty 12/8/10/11°C natvrdo vedle „Aktualizováno: {čas}" → vypadá falešně |
| `src/components/WeatherSection.tsx` | 108–109 | „12°C / Pocitově 10°C" natvrdo |

Návrh: buď napojit na reálné API (Open-Meteo — už ho používá WeatherWidget v patičce), nebo statické číslo úplně odstranit.

---

## 5. Co potřebuji od vás, aby to bylo přesvědčivé a pravdivé

- **Skutečné statistiky:** kolik let, účastníků, kurzů, spokojených klientů (jedno číslo na metr — ne 10+/15+/50+ zároveň).
- **Reálné reference** (2–3 s fotkou a jménem) nebo svolení je vyřadit.
- **Správné kontakty:** které číslo a e-mail je hlavní; skutečné FB/IG/YT profily.
- **Stav služeb:** funguje ubytování/airbag/glamping už, nebo se připravuje (a kdy)?
- **Ověřená čísla pro Google recenze**, pokud existují.

---

## 6. Otevřené otázky / poznámky k doladění

**Rozhodnuto:**
- [x] Hlavní kontakt: +420 777 734 389 / info@tjkrupka.cz
- [x] Ubytování se připravuje → waitlist se slevou pro první hosty
- [x] Startujeme Fází 1 (důvěra a konzistence)

**Stále otevřené:**
- [ ] Necháváme snowkiting na samostatném kontaktu (+420 773 090 842 / snowkiting@tjkrupka.cz), nebo sjednotit vše na klubový?
- [ ] Skutečné profily FB / IG / YT (pro patičku)?
- [ ] Reálné číslo: kolik let zkušeností a kolik spokojených klientů?
- [ ] Stav airbagu a glampingu: funguje / kdy?
- [ ] Google recenze: existují, kolik a jaké skóre?
- [ ] OG obrázek k dispozici (1200×630)?
- [ ] Teploty u webkamer: napojit na Open-Meteo API, nebo odstranit?
- [ ] Ceník ubytování a termín otevření penzionu (pro waitlist copy)?
- [ ] Mrtvá tlačítka na Vstupenkách: propojit s košíkem, nebo jen odkázat na stránky?
