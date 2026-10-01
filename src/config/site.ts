/**
 * Centrální obsah a nastavení webu tjkrupka.cz
 *
 * Vše na jednom místě, aby se dalo měnit bez hledání v komponentách.
 *
 * ⚠️ HODNOTY OZNAČENÉ [DOPLNIT] NEBYLY VYMÝŠLENY — musí je potvrdit Owner.
 *    Dokud nejsou vyplněné, příslušný prvek se na webu VŮBEC nezobrazí
 *    (prázdný blok je lepší než vymyšlené číslo nebo anonymní reference).
 *    Zdroj zadání: /webaudit (DRE-100467.1), body B1–B18.
 */

/** Rezervační a platební kanál — hlavní konverzní cíl celého webu (B5). */
export const APP_URL = "https://app.tjkrupka.cz";

/** Přímý odkaz do aplikace na rezervaci / platbu. */
export const appLink = (utm?: string) =>
  utm ? `${APP_URL}/?utm_source=tjkrupka.cz&utm_medium=web&utm_campaign=${utm}` : APP_URL;

export const CONTACT = {
  email: "info@tjkrupka.cz",
  /** Snowkiting (kurzy, airbag) — viz webaudit 3.6 otázka 8. */
  phoneSnowkiting: { label: "773 090 842", tel: "+420773090842" },
  /** Klub, členství a půjčovna — viz webaudit 3.6 otázka 8. */
  phoneClub: { label: "777 734 389", tel: "+420777734389" },
  street: "Husitská 191/8",
  city: "417 41 Krupka",
  legalName: "Tělovýchovná jednota Krupka z.s.",
  /** Plný název bez právní formy — pro běžné texty (B10). */
  name: "Tělovýchovná jednota Krupka",
  ico: "46070516",
};

/** --- HERO (webaudit 3.1) ------------------------------------------------ */
export const HERO = {
  h1Line1: "Naučíme vás létat na sněhu.",
  h1Line2: "A když spadnete, spadnete bezpečně.",
  subheadline:
    "Snowkite kurzy na Komáří vížce pro začátečníky i pokročilé. Airbag pro bezpečný trénink triků — pro veřejnost i pro skupiny. Vybavení je v ceně, stačí přijet.",
  badges: ["Vybavení v ceně", "Airbag den od 300 Kč"],
  benefits: [
    {
      title: "Vybavení v ceně",
      text: "Kite, trapéz i helmu půjčíme. Přijeďte jen v tom, v čem se hýbete.",
    },
    {
      title: "Malé skupiny",
      text: "Maximálně 4 účastníci na instruktora.",
    },
    {
      title: "Nefouká? Přesuneme to zdarma",
      text: "Kurz posuneme na termín s lepšími podmínkami.",
    },
  ],
  ctaPrimary: { label: "Rezervovat kurz", href: appLink("hero-kurz") },
  ctaSecondary: { label: "Airbag den od 300 Kč", href: "/airbag" },
};

/** --- SNOWKITE KURZY (webaudit 3.2) -------------------------------------- */
export type CourseLevel = {
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  priceFrom: number;
  features: string[];
  image: string;
};

/**
 * Ceny jsou převzaté z dosavadního webu (SnowkitingKurzy.tsx, defaultLevels)
 * a ČEKAJÍ NA POTVRZENÍ OWNERA (webaudit 3.2 a 8). Nejsou vymyšlené.
 */
export const COURSES: CourseLevel[] = [
  {
    title: "Začátečník",
    subtitle: "PRVNÍ KROKY NA SNĚHU",
    duration: "2–3 dny",
    price: "4 500 Kč",
    priceFrom: 4500,
    features: [
      "Ovládání draka na zemi",
      "Základy bezpečnosti",
      "První jízdy s drakem",
      "Teorie větru a počasí",
      "Vybavení v ceně",
    ],
    image: "/images/snowkiting/jj produktovka.jpg",
  },
  {
    title: "Pokročilý",
    subtitle: "ZLEPŠETE SVOU TECHNIKU",
    duration: "2 dny",
    price: "3 800 Kč",
    priceFrom: 3800,
    features: [
      "Jízda ve vyšších rychlostech",
      "Jízda proti větru",
      "Skoky a triky",
      "Pokročilé ovládání draka",
      "Taktika a strategie",
    ],
    image: "/images/snowkiting/jj_vrtule.jpg",
  },
  {
    title: "Expert",
    subtitle: "MISTROVSTVÍ NA SNĚHU",
    duration: "1–2 dny",
    price: "3 200 Kč",
    priceFrom: 3200,
    features: [
      "Extrémní podmínky",
      "Akrobatické prvky",
      "Big air skoky",
      "Závodní techniky",
      "Individuální coaching",
    ],
    image: "/images/snowkiting/jj_kom_jump.jpg",
  },
];

/** Individuální lekce — cena z dosavadního webu, čeká na potvrzení. */
export const COURSE_INDIVIDUAL = {
  title: "Individuální lekce",
  duration: "dle dohody",
  price: "od 2 000 Kč/hod",
  priceFrom: 2000,
  note: "Když chcete instruktora jen pro sebe nebo pro dvojici. Program na míru vaší úrovni a cíli.",
};

/** „Co je v ceně" — jednotně na všech kurzech (webaudit 3.2). */
export const COURSE_INCLUDED = [
  "kompletní zapůjčení vybavení — kite, trapéz, helma",
  "výuka pod vedením instruktora (max. 4 osoby na instruktora)",
  "teorie větru, počasí a bezpečnosti",
  "praxe na sněhu v Krušných horách",
  "přesun kurzu na jiný termín, pokud nebudou vhodné podmínky",
];

/** Lokality praxe — v Krušných horách, vybírá se podle podmínek. */
export const COURSE_LOCATIONS = ["Komáří vížka", "Fojtovice", "Petrovice"];

/** Garance podmínek — text na stránce kurzů i na homepage. */
export const COURSE_GUARANTEE =
  "Nebude foukat? Nevadí. Kurz přesuneme na jiný termín bez poplatku — o podmínkách vás vždy informujeme předem.";

/**
 * O instruktorech mluvíme JAZYKEM ZKUŠENOSTI, ne „certifikace" (B8).
 * Konkrétní počet let praxe musí doplnit Owner — [DOPLNIT].
 */
export const INSTRUCTORS = {
  headline: "Instruktoři, kteří jezdí na Komáří vížce celou sezónu",
  text: "Učí vás lidi, kteří na Komáří vížce jezdí celou sezónu a snowkiting učí v praxi. Žádné teorie od stolu — jedete od prvního dne.",
  yearsInPractice: null as string | null, // [DOPLNIT] např. "15" → zobrazí se „instruktoři s praxí 15 let"
};

/** --- AIRBAG (webaudit 3.3 a 3.4) ---------------------------------------- */
export const AIRBAG = {
  title: "Airbag: zkuste trik, který jste si nikdy nedovolili",
  subtitle:
    "Měkká dopadová matrace pro bezpečný trénink triků na lyžích, snowboardu i kole. Trénujete pod dohledem instruktora, opakujete prvek tak dlouho, dokud ho nemáte jistý — a pády bolí jen v hlavě.",
  benefits: [
    {
      title: "Kontrolovaný risk",
      text: "Matrace je určená k dopadům z výšky a k opakovaným pokusům. Každý pád je měkký, takže se nebojíte zkusit další.",
    },
    {
      title: "Instruktor u vás",
      text: "Před prvním skokem projdete bezpečnostní instruktáží a pravidly používání. Dohlíží na vás po celou dobu.",
    },
    {
      title: "Vhodné pro každého",
      text: "Od prvního skoku dítěte po závodníka, který ladí rotaci. Začátečník i profík trénuje to, co zrovna potřebuje.",
    },
  ],
  /** Ceník — převzato z dosavadního ceníku, čeká na potvrzení Ownera. */
  priceMember: 300,
  priceNonMember: 600,
  membershipPrice: 200,
  priceNote:
    "Členství stojí 200 Kč — pokud plánujete přijet víckrát, členství se vyplatí už po prvním dni.",
  ctaPrimary: { label: "Rezervovat airbag den", href: appLink("hero-airbag") },
  ctaSecondary: { label: "Chci nejdřív vědět víc", href: "/kontakt" },
};

/** Airbag pro skupiny a firmy (webaudit 3.4). */
export const AIRBAG_GROUPS = {
  title: "Airbag pro firmy, školy a oddíly",
  subtitle:
    "Program, který se vejde do jednoho odpoledne a baví celý tým — včetně lidí, kteří na snowboardu nikdy nestáli. Měkká matrace zvládne každý pokus, takže se zapojí i ten, kdo se jinak bojí.",
  audiences: [
    {
      title: "Firmy a teambuildingy",
      text: "Aktivita se sdíleným zážitkem, kterou zvládne celá skupina bez ohledu na úroveň.",
    },
    {
      title: "Sportovní oddíly a soustředění",
      text: "Trénink triků mimo závodní tlak. Každý prvek lze zopakovat, dokud není jistý.",
    },
    {
      title: "Školy a dětské kolektivy",
      text: "Bezpečné vyzkoušení akrobacie pod dohledem, přizpůsobené věku skupiny.",
    },
  ],
  /** [DOPLNIT] Owner: cena za skupinu, minimální počet osob, délka programu. */
  priceFrom: null as string | null,
  priceNote:
    "Pro jednodenní program bez navýšení platí cena 300 Kč na člena / 600 Kč na nečlena; u skupin se členství vyplatí vyřídit předem (200 Kč).",
  cta: { label: "Poptat airbag pro skupinu", href: "/firmy#poptavka" },
};

/** --- TRUST PÁS a REFERENCE (webaudit 3.7) -------------------------------- */
/**
 * Trust pás se zobrazí POUZE s vyplněnými hodnotami (min. 3 z 4).
 * Weby nesmí obsahovat dvě různá čísla o téže věci (nález P2A6).
 *
 * Dvě hodnoty níže jsou převzaté z dosavadního webu (patička homepage:
 * „10+ let zkušeností", „50+ spokojených účastníků ročně") a ČEKAJÍ NA
 * POTVRZENÍ OWNERA. Hodnocení Google a počet instruktorů Owner NEDODAL —
 * proto jsou prázdné a nezobrazí se. Nevymýšlet.
 */
export const TRUST = [
  { value: null as string | null, label: "let na Komáří vížce" }, // [DOPLNIT]
  { value: null as string | null, label: "účastníků kurzů ročně" }, // [DOPLNIT]
  { value: null as string | null, label: "hodnocení na Google" }, // [DOPLNIT]
  { value: null as string | null, label: "instruktorů" }, // [DOPLNIT]
];

/**
 * Reference: pouze se jménem, organizací a rokem (webaudit 3.7).
 * Citace bez jména se NEPOUŽÍVÁ — anonymní reference je horší než žádná.
 * Prázdné pole = blok se na webu nezobrazí. [DOPLNIT od Ownera]
 */
export const TESTIMONIALS: { quote: string; name: string; organization?: string; year: string }[] = [];

/**
 * FAQ — ROZDĚLENÉ PODLE PRODUKTU (kite kurzy vs. airbag).
 * Jsou to dva samostatné produkty, proto se otázky nemíchají do jednoho bloku.
 * Otázky 1–5 vycházejí z dosavadního FAQ na stránce kurzů, zbytek je nový
 * s důrazem na bezpečnost. Čísla a lhůty, které Owner nedodal, nejsou vymyšlené.
 */
export type FaqItem = { q: string; a: string };

export const FAQ_KURZY: FaqItem[] = [
  {
    q: "Je snowkiting bezpečný? Co když spadnu?",
    a: "Bezpečnost je první věc, kterou na kurzu řešíme. Projdete instruktáží, dostanete helmu a kompletní vybavení a jste pod dohledem instruktora. Začínáme na rovině s malým drakem — na první jízdu jdete, až když víte, co dělat při pádu i při nárazu větru.",
  },
  {
    q: "Potřebuji vlastní vybavení?",
    a: "Ne. Kompletní vybavení — kite, trapéz, helma — je součástí kurzu a zapůjčíme vám ho. Přijeďte v oblečení, ve kterém se hýbete, zbytek máme my.",
  },
  {
    q: "Musím umět lyžovat nebo snowboardovat?",
    a: "Ano — snowkiting staví na základech lyžování nebo snowboardingu, takže je potřebujete zvládat alespoň na úrovni bezpečného sjíždění. Úplný začátečník na lyžích to bude mít těžší; řekneme vám to předem na rovinu.",
  },
  {
    q: "Co když nebude foukat?",
    a: "Kurz přesuneme na jiný termín s vhodnějšími podmínkami, bez poplatku. Předpověď sledujeme a informujeme vás předem.",
  },
  {
    q: "Od kolika let se dá kurz absolvovat?",
    a: "Kurzy kitingu jsou vhodné od 12 let (s písemným souhlasem zákonného zástupce), horní hranice není stanovena.",
  },
  {
    q: "Jak vypadá kurz den po dni?",
    a: "První den se seznámíte s drakem na zemi — ovládání, bezpečnost, signály. Podle větru a vašeho tempa pak přijdou první jízdy na sněhu, jízda proti větru a podle úrovně i skoky a triky. Učíme v malé skupině, maximálně 4 účastníci na instruktora.",
  },
  {
    q: "Jak zruším nebo přesunu termín?",
    a: "Ozvěte se nám na 773 090 842 (snowkiting) nebo na 777 734 389 (klub). U kurzů platí, že když nebudou podmínky, přesuneme termín bez poplatku.",
  },
];

export const FAQ_AIRBAG: FaqItem[] = [
  {
    q: "Je skákání na airbag bezpečné?",
    a: "Airbag existuje právě proto, aby pády nebolely. Matrace je stavěná na dopady z výšky a i nevydařený pokus skončí měkkým doskokem. Před prvním skokem projdete bezpečnostní instruktáží, dostanete helmu a jste pod dohledem instruktora po celou dobu.",
  },
  {
    q: "Musím umět lyžovat nebo snowboardovat?",
    a: "Ne. Na airbag se skáče z místa a dopadá se na matraci, takže lyžařská ani snowboardová zkušenost není potřeba. Zvládne to i ten, kdo na svahu nikdy nestál.",
  },
  {
    q: "Potřebuji vlastní vybavení?",
    a: "Vezměte si sportovní oblečení, ve kterém se hýbete. Helmu vám můžeme zapůjčit. Lyže nebo snowboard na airbag potřeba nejsou.",
  },
  {
    q: "Jak vypadá airbag den?",
    a: "Airbag den je samostatný blok, během kterého máte matraci a instruktora k dispozici. Přijdete, projdete instruktáží, seznámíte se s pravidly a pak skáčete tak dlouho, dokud chcete — opakujete prvek tak dlouho, dokud ho nemáte jistý.",
  },
  {
    q: "Kolik lidí může být na airbagu najednou?",
    a: "Na matraci skáče vždy jeden, ostatní čekají mimo dopadovou zónu a řídí se pokyny instruktora. Pro skupiny rozvrhneme program tak, aby se nikdo neprostál — kapacitu skupiny vám rádi upřesníme podle termínu.",
  },
  {
    q: "Od kolika let to jde?",
    a: "Airbag je vhodný i pro děti v rámci školních a dětských programů. Konkrétní věkovou hranici vám rádi upřesníme na telefonu podle toho, o jaký program jde.",
  },
  {
    q: "Musím se předem přihlásit?",
    a: "Ano, rezervujte si termín předem — v aplikaci app.tjkrupka.cz, nebo nám zavolejte. Airbag den stojí 300 Kč pro členy a 600 Kč pro nečleny; členství (200 Kč) se vyplatí, pokud plánujete přijet víckrát.",
  },
  {
    q: "Jak zruším nebo přesunu termín?",
    a: "Ozvěte se nám na 773 090 842 (airbag a snowkiting) nebo na 777 734 389 (klub). Podmínky zrušení a přesunu vám rádi upřesníme.",
  },
];

/** Fotky airbagu (cutouty bez pozadí — dodal Owner 30. 9. 2026). */
export const AIRBAG_IMAGES = {
  /** Matrace — hlavní produktová fotka. */
  matrace: "/images/airbag/airbag-matrace.png",
  /** Matrace, druhý záběr — používá se v blocích o airbagu. */
  matrace2: "/images/airbag/airbag-matrace-2.png",
};

/** --- SPOLEČNÉ SEKCE ----------------------------------------------------- */

/** Proč jezdit k nám (webaudit 5 — jazyk zkušenosti, bez „certifikace"). */
export const WHY_US = [
  {
    title: "Instruktoři, kteří tu jezdí celou sezónu",
    text: "Učí vás lidi, kteří na Komáří vížce jezdí celou sezónu a snowkiting učí v praxi.",
  },
  {
    title: "Bezpečnost především",
    text: "Instruktáž, helma a kompletní vybavení jsou součástí každé lekce — nic si nepořizujete.",
  },
  {
    title: "Ideální podmínky",
    text: "Komáří vížka, Fojtovice a Petrovice — lokalitu vybíráme podle aktuálních podmínek.",
  },
  {
    title: "Malé skupiny",
    text: "Max. 4 účastníci na instruktora, takže se na vás dostane čas i zpětná vazba.",
  },
];

/** Fotky areálu pro galerii na homepage (webaudit 4 — vlastní, ne stocky). */
export const GALLERY = [
  { src: "/images/snowkiting/jj_top_ride_promo.jpg", alt: "Snowkiting na Komáří vížce" },
  { src: "/images/snowkiting/jj_zapad.jpg", alt: "Západ slunce nad Krušnými horami" },
  { src: "/images/homepage/airbag.png", alt: "Airbag — dopadová matrace" },
  { src: "/images/snowkiting/jj_kom_jump.jpg", alt: "Skok na snowkitu" },
  { src: "/images/vybaveni/peak.jpg", alt: "Vybavení pro snowkiting" },
  { src: "/images/homepage/jj-kom-jump.jpg", alt: "Komáří vížka v zimě" },
];

/** --- TEXTY FORMULÁŘŮ (webaudit 3.8) ------------------------------------- */
export const FORM_TEXTS = {
  course: {
    title: "Nezávazná poptávka kurzu",
    subtitle: "Napište nám, co vás zajímá. Ozveme se na uvedený kontakt.",
    submit: "Odeslat poptávku",
    success: "Díky, poptávku máme. Ozveme se na uvedený kontakt.",
  },
  group: {
    title: "Airbag pro skupinu",
    subtitle: "Napište nám rozsah a termín, připravíme program na míru.",
    submit: "Odeslat poptávku",
    success: "Díky, poptávku na airbag pro skupinu máme. Ozveme se s návrhem programu a ceny.",
  },
  errors: {
    required: "Vyplňte prosím toto pole.",
    phone: "Zadejte telefon ve formátu 777 123 456.",
    email: "Zkontrolujte prosím e-mail.",
    sending: "Odesíláme…",
    network: `Odeslání se nepovedlo. Zkuste to znovu, nebo nám zavolejte na ${CONTACT.phoneClub.label}.`,
  },
  gdpr:
    "Odesláním formuláře souhlasíte se zpracováním osobních údajů za účelem vyřízení poptávky. Údaje používáme jen pro tuto komunikaci.",
};

/** Kolik čísel musí být vyplněných, aby se trust pás zobrazil. */
export const TRUST_MIN_FILLED = 3;
