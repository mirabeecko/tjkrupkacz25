# 🎯 Rezervační Systém - Návod k Dokončení Nastavení

Tento dokument obsahuje všechny kroky potřebné k plnému zprovoznění rezervačního systému pro půjčovnu motocyklů.

## ✅ Co bylo vytvořeno

### 1. **Databázová struktura** ✓
- Tabulka `rental_bookings` v Supabase
- Migrace: `supabase/migrations/20250119000000_create_rental_bookings.sql`
- Obsahuje všechna pole pro kompletní rezervaci

### 2. **Edge Function pro emaily** ✓
- Supabase Edge Function: `send-rental-booking-email`
- Automatické odesílání potvrzovacích emailů zákazníkovi i administrátorovi
- Profesionální HTML šablony emailů

### 3. **Rezervační formulář** ✓
- Kompletní formulář v `KontaktPujcovna.tsx`
- Automatický výpočet ceny podle dnů pronájmu
- Validace všech polí
- GDPR souhlas
- Integrace s Supabase

### 4. **Detailní stránka vozidla** ✓
- `VehicleDetail.tsx` - zobrazení všech informací o vozidle z databáze
- Tlačítko "Rezervovat tento motocykl" s přesměrováním na formulář

---

## 📋 Kroky k Dokončení Nastavení

### KROK 1: Spuštění Databázové Migrace

```bash
# Přejděte do složky projektu
cd /Users/mb/GitHub/tjkrupkacz25

# Spusťte migraci pro vytvoření tabulky rental_bookings
npx supabase db push
```

**Co toto udělá:**
- Vytvoří tabulku `rental_bookings` v Supabase databázi
- Nastaví všechny indexy a Row Level Security políčka
- Umožní formuláři ukládat rezervace

---

### KROK 2: Nasazení Edge Function pro Emaily

```bash
# Nasaďte Edge Function do Supabase
npx supabase functions deploy send-rental-booking-email
```

**Co toto udělá:**
- Nahraje funkci pro odesílání emailů do Supabase
- Umožní automatické odesílání potvrzovacích emailů

---

### KROK 3: Nastavení Resend API pro Emaily

#### 3.1. Získání Resend API klíče

1. Jděte na [resend.com](https://resend.com)
2. Zaregistrujte se nebo přihlaste
3. V dashboardu klikněte na "API Keys"
4. Vytvořte nový API klíč
5. Zkopírujte klíč (začíná `re_...`)

#### 3.2. Nastavení API klíče v Supabase

```bash
# Nastavte RESEND_API_KEY jako secret v Supabase
npx supabase secrets set RESEND_API_KEY=re_your_actual_api_key_here
```

**NEBO** přes Supabase Dashboard:
1. Otevřete [app.supabase.com](https://app.supabase.com)
2. Vyberte projekt
3. Jděte do **Settings** → **Edge Functions** → **Secrets**
4. Přidejte nový secret:
   - Název: `RESEND_API_KEY`
   - Hodnota: Váš Resend API klíč

---

### KROK 4: Ověření Domény v Resend (DŮLEŽITÉ!)

Pro odesílání emailů z vaší domény musíte ověřit doménu:

1. V Resend dashboardu jděte do **Domains**
2. Klikněte **Add Domain**
3. Zadejte `tjkrupka.cz`
4. Resend vám zobrazí DNS záznamy, které musíte přidat:

```
Typ: TXT
Název: _resend
Hodnota: [hodnota od Resend]

Typ: MX
Název: @
Priorita: 10
Hodnota: [hodnota od Resend]
```

5. Přidejte tyto záznamy u vašeho poskytovatele domény (např. Wedos, Forpsi, atd.)
6. Počkejte na ověření (může trvat až 48 hodin, obvykle pár minut)

**Alternativa pro testování:**
Pokud nechcete čekat, můžete dočasně používat testovací doménu Resend:
- Změňte v Edge Function `from: 'TJ Krupka Půjčovna <noreply@resend.dev>'`
- Emaily budou fungovat okamžitě, ale budou z `resend.dev` domény

---

### KROK 5: Aktualizace Admin Emailu

Otevřete soubor:
```
/Users/mb/GitHub/tjkrupkacz25/supabase/functions/send-rental-booking-email/index.ts
```

Na řádku **229** změňte admin email:
```typescript
to: ['vas.skutecny.email@tjkrupka.cz'], // ZMĚŇTE TOTO!
```

Pak znovu nasaďte funkci:
```bash
npx supabase functions deploy send-rental-booking-email
```

---

### KROK 6: Testování Systému

#### 6.1. Test rezervačního formuláře

1. Spusťte aplikaci: `npm run dev`
2. Otevřete: `http://localhost:8084/kontakt-pujcovna`
3. Vyplňte formulář a odešlete
4. Zkontrolujte:
   - ✅ Zobrazí se toast: "Rezervace byla úspěšně odeslána!"
   - ✅ Formulář se resetuje

#### 6.2. Ověření v databázi

1. Otevřete Supabase Dashboard
2. Jděte do **Table Editor** → `rental_bookings`
3. Zkontrolujte, že se objevil nový záznam s vaší rezervací

#### 6.3. Ověření emailů

1. Zkontrolujte emailovou schránku zákazníka
2. Zkontrolujte emailovou schránku administrátora
3. Oba by měly obdržet potvrzovací emaily

---

## 🔧 Možné Problémy a Řešení

### Problem: Formulář se nepodaří odeslat

**Příčina:** Migrace nebyla spuštěna
**Řešení:** Spusťte `npx supabase db push`

### Problem: Emaily se neodesílají

**Příčina:** Chybějící RESEND_API_KEY
**Řešení:**
1. Zkontrolujte, že jste nastavili secret v Supabase
2. Nasaďte Edge Function znovu

### Problem: Emaily končí ve spamu

**Příčina:** Doména není ověřena
**Řešení:** Dokončete KROK 4 - ověření domény

### Problem: Edge Function vyhodí chybu

**Příčina:** Neplatný API klíč nebo neověřená doména
**Řešení:**
1. Zkontrolujte API klíč v Resend dashboardu
2. Zkontrolujte status ověření domény

---

## 📊 Administrace Rezervací

### Zobrazení všech rezervací

V Supabase Dashboard:
1. **Table Editor** → `rental_bookings`
2. Zde vidíte všechny rezervace s detaily

### SQL dotazy pro reporting

```sql
-- Zobrazit všechny pending rezervace
SELECT * FROM rental_bookings WHERE status = 'pending' ORDER BY created_at DESC;

-- Statistiky za měsíc
SELECT
  COUNT(*) as total_bookings,
  SUM(total_price) as total_revenue,
  AVG(rental_duration_days) as avg_duration
FROM rental_bookings
WHERE created_at >= date_trunc('month', CURRENT_DATE);

-- Nejoblíbenější vozidla
SELECT vehicle_name, COUNT(*) as booking_count
FROM rental_bookings
GROUP BY vehicle_name
ORDER BY booking_count DESC;
```

---

## 🚀 Dodatečné Funkce (Volitelné)

### 1. SMS Notifikace
- Přidejte službu jako Twilio pro SMS notifikace
- Upravte Edge Function pro odeslání SMS

### 2. Automatické potvrzení
- Vytvořte admin panel pro potvrzování rezervací
- Přidejte tlačítko "Potvrdit" / "Zrušit"

### 3. Kalendář dostupnosti
- Vytvořte kalendářový view dostupnosti vozidel
- Zabraňte dvojitým rezervacím na stejný termín

### 4. Platební brána
- Integrace s Stripe nebo GoPay
- Umožnit online platby za rezervace

---

## 📞 Potřebujete Pomoct?

Pokud narazíte na problém:
1. Zkontrolujte logy v Supabase: **Logs** → **Edge Functions**
2. Zkontrolujte browser console (F12) pro chyby
3. Zkontrolujte, že všechny kroky byly provedeny správně

---

## ✨ Souhrn

Po dokončení všech kroků budete mít:
- ✅ Plně funkční rezervační systém
- ✅ Automatické potvrzovací emaily
- ✅ Databázi všech rezervací
- ✅ Automatický výpočet cen
- ✅ GDPR compliant formulář

**Gratulujeme! 🎉**
