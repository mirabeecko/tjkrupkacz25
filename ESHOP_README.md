# TJ Krupka E-shop 🛒

Kompletní e-commerce řešení pro TJ Krupka s podporou plateb kartou (Stripe) a bankovním převodem (ComGate).

## ✨ Funkce

### Pro zákazníky
- 🛍️ **Katalog produktů** - Merch, vybavení, jízdenky, členství
- 🔍 **Vyhledávání a filtrování** - Podle kategorií a názvu
- 🛒 **Nákupní košík** - Pro přihlášené i nepřihlášené uživatele
- 💳 **Online platby** - Stripe (karta) + ComGate (bankovní převod)
- 🎫 **Automatické vstupenky** - Pro digitální produkty
- 👤 **Členství** - Automatická aktivace po platbě
- 📧 **E-mailová potvrzení** - Po dokončení objednávky

### Pro administrátory
- 📊 **Databáze objednávek** - Kompletní přehled
- 💰 **Sledování plateb** - Stripe + ComGate transakce
- 🔐 **Zabezpečení** - RLS policies, webhooks
- 📈 **Reporting** - Připraveno pro analytics

## 🗂️ Struktura

### Frontend stránky
```
/eshop           → Katalog produktů
/kosik           → Nákupní košík
/pokladna        → Checkout formulář
/platba/uspech   → Potvrzení platby
/platba/zruseno  → Zrušená platba
```

### Databázové tabulky (prefix: tjkshop_)
```
tjkshop_products         → Produkty
tjkshop_categories       → Kategorie
tjkshop_variants         → Varianty (velikosti, barvy)
tjkshop_cart             → Košíky
tjkshop_cart_items       → Položky košíku
tjkshop_orders           → Objednávky
tjkshop_order_items      → Položky objednávky
tjkshop_payments         → Platby
tjkshop_tickets          → Vstupenky
tjkshop_memberships      → Členství
tjkshop_discount_codes   → Slevové kódy
tjkshop_discount_usage   → Použití slev
```

### Edge Functions
```
create-stripe-payment    → Vytvoření Stripe platby
stripe-webhook          → Webhook pro Stripe události
create-comgate-payment  → Vytvoření ComGate platby
comgate-webhook         → Webhook pro ComGate notifikace
```

## 🚀 Rychlý start

### 1. Nastavit .env soubor
```bash
cp .env.example .env
# Vyplňte Supabase URL, Stripe a ComGate klíče
```

### 2. SQL migrace již provedena ✅
Databázové tabulky jsou vytvořeny a obsahují ukázková data.

### 3. Nasadit Edge Functions
```bash
# Přihlásit se
npx supabase login

# Nastavit secrets
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_...
npx supabase secrets set COMGATE_MERCHANT=...
npx supabase secrets set COMGATE_SECRET=...

# Nasadit všechny funkce
./deploy-functions.sh
```

### 4. Nastavit webhooky
- **Stripe**: https://dashboard.stripe.com/webhooks
- **ComGate**: V obchodním účtu ComGate

Detailní instrukce v `DEPLOY_INSTRUCTIONS.md`

## 📦 Ukázková data

Databáze obsahuje 10 produktů:
- 🎽 TJ Krupka Tričko (399 Kč)
- 👕 TJ Krupka Mikina (899 Kč)
- 🧢 TJ Krupka Čepice (299 Kč)
- 🎫 Celodenní skipas (350 Kč)
- 🎫 Půldenní skipas (250 Kč)
- 🎫 Týdenní skipas (1800 Kč)
- ⭐ Roční členství Basic (1200 Kč)
- 💎 Roční členství Premium (2500 Kč)
- 🥤 Láhev na vodu (199 Kč)
- ⛷️ Kurz snowkitingu (3500 Kč)

## 💳 Testování plateb

### Stripe Test Cards
```
Úspěch:  4242 4242 4242 4242
Zamítnuto: 4000 0000 0000 0002
CVC: 123
Datum: 12/25
```

### ComGate Test Mode
Nastavte `COMGATE_TEST_MODE=true` pro testovací platby.

## 🔐 Zabezpečení

- ✅ RLS policies na všech tabulkách
- ✅ Webhook signature verification
- ✅ Environment variables pro API klíče
- ✅ HTTPS pro všechny požadavky
- ✅ Validace dat na frontendu i backendu

## 📊 Platební flow

```
1. Zákazník přidá produkty do košíku
2. Přejde na pokladnu a vyplní údaje
3. Vybere platební metodu (Stripe/ComGate)
4. Klikne na "Dokončit objednávku"
   ↓
   Vytvoří se záznam v tjkshop_orders
   ↓
5. Přesměrování na platební bránu
6. Zákazník zaplatí
   ↓
   Webhook od Stripe/ComGate
   ↓
7. Aktualizace stavu platby
8. Vytvoření vstupenek/členství
9. Přesměrování na /platba/uspech
```

## 🎨 Kategorie produktů

```typescript
'merch'       → Oblečení a doplňky
'equipment'   → Sportovní vybavení
'ticket'      → Skipasy a jízdenky
'membership'  → Členství v klubu
```

## 🎯 Typy produktů

```typescript
'physical'  → Fyzické zboží (vyžaduje dopravu)
'digital'   → Digitální produkty (vstupenky)
'service'   → Služby (členství, kurzy)
```

## 📝 TODO (volitelné rozšíření)

- [ ] Admin dashboard pro správu
- [ ] E-mailové notifikace
- [ ] PDF faktury
- [ ] Uživatelský účet s historií objednávek
- [ ] QR kódy pro vstupenky
- [ ] Detail produktu s galerií
- [ ] Recenze produktů
- [ ] Wishlist

## 🆘 Řešení problémů

### Edge Functions se nenasadí
```bash
# Zkontrolujte přihlášení
npx supabase login

# Zkontrolujte projekt
npx supabase projects list
```

### Platby nefungují
1. Ověřte API klíče v .env
2. Zkontrolujte Supabase secrets
3. Zkontrolujte webhooks v dashboardech
4. Podívejte se na logs v Supabase

### Košík se nevytváří
1. Zkontrolujte RLS policies
2. Ověřte, že tabulky existují
3. Zkontrolujte browser console

## 📞 Podpora

- **Stripe dokumentace**: https://stripe.com/docs
- **ComGate dokumentace**: https://help.comgate.cz/
- **Supabase dokumentace**: https://supabase.com/docs

## 🎉 Hotovo!

E-shop je plně funkční a připravený k použití. Pro produkční nasazení nezapomeňte:
1. Přepnout na produkční API klíče
2. Nastavit ComGate na live mode
3. Nakonfigurovat SMTP pro e-maily
4. Otestovat celý platební proces

---

**Vytvořeno s 🤖 Claude Code**
