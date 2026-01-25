# Zapnutí/Vypnutí Půjčovny

Půjčovna motocyklů je nyní skryta ze všech stránek pomocí feature flag systému.

## Rychlé zapnutí/vypnutí pomocí příkazu

### Zapnout půjčovnu:
```bash
npm run pujcovna:enable
```

### Vypnout půjčovnu:
```bash
npm run pujcovna:disable
```

**⚠️ Důležité:** Po spuštění příkazu je nutné restartovat dev server (Ctrl+C a pak `npm run dev`)

## Co tyto příkazy dělají?

1. **Mění feature flag** v `src/config/features.ts`
   - `ENABLE_PUJCOVNA: true` nebo `false`

2. **Zakomentovává/odkomentovává** importy v `src/App.tsx`
   - `import Pujcovna from "./pages/Pujcovna";`
   - `import KontaktPujcovna from "./pages/KontaktPujcovna";`
   - `import VehicleDetail from "./pages/VehicleDetail";`

3. **Zakomentovává/odkomentovává** routy v `src/App.tsx`
   - `/pujcovna`
   - `/vozidlo/:id`
   - `/kontakt-pujcovna`

## Kde všude je půjčovna skryta?

Když je `ENABLE_PUJCOVNA: false`, půjčovna je skryta na těchto místech:

- ✅ **Navbar** (hlavní menu)
- ✅ **Footer** (odkazy v patičce)
- ✅ **Homepage** (celá sekce s motocykly)
- ✅ **Služby** (karta služby)
- ✅ **Activities** (text a badge)
- ✅ **Komáří Vížka** (karta odkazující na půjčovnu)
- ✅ **Snowkiting kurzy** (CTA sekce)
- ✅ **App.tsx** (routy jsou zakomentované)

## Manuální změna (alternativa)

Pokud chceš měnit pouze feature flag ručně:

1. Otevři `src/config/features.ts`
2. Změň `ENABLE_PUJCOVNA: false` na `ENABLE_PUJCOVNA: true`
3. V `src/App.tsx` odkomentuj 3 importy a 3 routy (hledej `__PUJCOVNA__`)
4. Restartuj dev server

## Poznámky

- Všechny změny jsou označené komentáři **"FEATURE FLAG: Půjčovna"**
- Feature flag funguje okamžitě po restartu serveru
- Routes musí být manuálně zakomentované v App.tsx (nebo použij npm příkaz)
