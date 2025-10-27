# Instrukce pro nasazení E-shopu

## 1. Nastavení proměnných prostředí

### Frontend (.env)
Zkopírujte `.env.example` do `.env` a vyplňte následující hodnoty:

```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (získejte z https://dashboard.stripe.com/apikeys)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key

# ComGate (získejte z ComGate obchodního účtu)
VITE_COMGATE_MERCHANT=your_merchant_id
VITE_COMGATE_SECRET=your_comgate_secret
VITE_COMGATE_TEST_MODE=true
```

### Supabase Edge Functions Secrets
Nastavte následující tajné klíče pro Edge Functions:

```bash
# Přihlásit se do Supabase CLI
npx supabase login

# Nastavit secret pro Stripe
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Nastavit secret pro ComGate
npx supabase secrets set COMGATE_MERCHANT=your_merchant_id
npx supabase secrets set COMGATE_SECRET=your_comgate_secret
npx supabase secrets set COMGATE_TEST_MODE=true
```

## 2. Nasazení Edge Functions

```bash
# Nasadit Stripe funkce
npx supabase functions deploy create-stripe-payment
npx supabase functions deploy stripe-webhook

# Nasadit ComGate funkce
npx supabase functions deploy create-comgate-payment
npx supabase functions deploy comgate-webhook
```

## 3. Nastavení Webhooků

### Stripe Webhook
1. Přejděte na https://dashboard.stripe.com/webhooks
2. Klikněte na "Add endpoint"
3. Zadejte URL: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/stripe-webhook`
4. Vyberte události:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`
5. Zkopírujte webhook signing secret a nastavte ho pomocí:
   ```bash
   npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

### ComGate Webhook
1. Přihlaste se do ComGate obchodního účtu
2. Přejděte do nastavení
3. Nastavte Notification URL: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/comgate-webhook`
4. Povolte notifikace pro změny stavu plateb

## 4. Testování Plateb

### Stripe Test Mode
Použijte testovací karty:
- Úspěšná platba: `4242 4242 4242 4242`
- Zamítnutá platba: `4000 0000 0000 0002`
- CVC: jakékoliv 3 číslice
- Datum: jakékoliv budoucí datum

### ComGate Test Mode
Nastavte `VITE_COMGATE_TEST_MODE=true` a `COMGATE_TEST_MODE=true` pro testovací režim.

## 5. Databáze

SQL migrace již byla provedena a obsahuje:
- ✅ 12 tabulek s prefixem `tjkshop_`
- ✅ RLS policies
- ✅ Triggery a funkce
- ✅ Ukázková data (10 produktů)

## 6. Přepnutí do Production Mode

Když budete připraveni spustit ostrý provoz:

1. Získejte production klíče ze Stripe
2. Získejte production přístup od ComGate
3. Aktualizujte .env:
   ```bash
   VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
   VITE_COMGATE_TEST_MODE=false
   ```
4. Aktualizujte Supabase secrets:
   ```bash
   npx supabase secrets set STRIPE_SECRET_KEY=sk_live_xxxxx
   npx supabase secrets set COMGATE_TEST_MODE=false
   ```

## 7. Spuštění aplikace

```bash
# Vývoj
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 8. Struktura E-shopu

### Stránky
- `/eshop` - Katalog produktů s vyhledáváním a filtrováním
- `/kosik` - Nákupní košík s možností úpravy množství
- `/pokladna` - Formulář pro dokončení objednávky
- `/platba/uspech` - Potvrzení úspěšné platby
- `/platba/zruseno` - Informace o zrušené platbě

### Funkce
- ✅ Zobrazení produktů z databáze
- ✅ Přidání do košíku (pro přihlášené i nepřihlášené uživatele)
- ✅ Správa množství v košíku
- ✅ Platba kartou (Stripe)
- ✅ Platba bankovním převodem (ComGate)
- ✅ Automatické vytváření vstupenek pro digitální produkty
- ✅ Automatické vytváření členství
- ✅ E-mailová notifikace (připraveno pro implementaci)

## 9. Co ještě chybí (volitelné rozšíření)

- [ ] Admin dashboard pro správu produktů a objednávek
- [ ] E-mailové notifikace po dokončení objednávky
- [ ] PDF faktury
- [ ] Stránka se seznamem objednávek pro přihlášené uživatele
- [ ] QR kódy pro vstupenky
- [ ] Detailní stránka produktu
- [ ] Recenze produktů
- [ ] Wishlist (seznam přání)
- [ ] Slevy a kupóny (frontend - backend je připraven)

## 10. Bezpečnost

- ✅ RLS policies pro ochranu dat
- ✅ HTTPS pro všechny požadavky
- ✅ Validace dat na frontendu i backendu
- ✅ Webhook signature verification
- ✅ Environment variables pro citlivé údaje

## 11. Podpora

V případě problémů:
1. Zkontrolujte Supabase logs: Dashboard → Edge Functions → Logs
2. Zkontrolujte browser console pro frontend errory
3. Ověřte, že všechny environment variables jsou správně nastavené
4. Pro Stripe: https://dashboard.stripe.com/logs
5. Pro ComGate: Kontaktujte ComGate podporu
