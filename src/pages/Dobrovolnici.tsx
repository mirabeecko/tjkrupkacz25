import React, { useRef, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import {
  Handshake,
  Users,
  HeartHandshake,
  Gift,
  Star,
  Building2,
  ArrowRightCircle,
} from "lucide-react";

const Dobrovolnici = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Zapojte se – Dobrovolníci & Partneři"
        description="Staňte se součástí trailparku Komáří vížka. Pomozte nám tvořit místo, které má smysl."
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero sekce - Vylepšená 100% width a min-h-screen */}
        <section className="relative bg-gradient-to-br from-tjk-blue via-blue-700 to-cyan-600 shadow-2xl px-6 py-32 overflow-hidden min-h-screen flex items-center">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <div
              className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "5s", animationDelay: "1s" }}
            />
          </div>

          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
              <Handshake className="h-4 w-4 text-amber-300" />
              <span className="text-sm font-semibold text-white">
                Připojte se k nám
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold font-montserrat text-white mb-6 tracking-tight leading-tight">
              Společně tvoříme{" "}
              <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                budoucnost areálu
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed max-w-3xl mx-auto">
              Přidejte se k nám jako dobrovolník nebo partner a pomozte nám
              rozvíjet unikátní sportovní areál na Komáří vížce. Každý může
              přispět – zkušenostmi, energií, podporou.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-white text-tjk-blue font-bold text-lg shadow-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                Chci se zapojit
                <ArrowRightCircle className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Obsah v containeru */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Dvě hlavní cesty zapojení - Vylepšené */}
          <section
            id="zapojeni"
            className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 mb-20"
          >
            {/* Dobrovolníci */}
            <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-2xl shadow-xl border-2 border-blue-200 p-10 flex flex-col items-start hover:shadow-2xl hover:border-tjk-blue transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-center gap-4 mb-6 w-full">
                <div className="p-3 bg-gradient-to-br from-tjk-blue to-cyan-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-tjk-blue w-full text-left group-hover:text-cyan-700 transition-colors">
                  Pro dobrovolníky
                </h2>
              </div>
              <p className="text-gray-700 mb-6 text-base w-full text-justify">
                Dobrovolnictví je srdcem našeho areálu. Hledáme lidi, kteří mají
                chuť přiložit ruku k dílu, naučit se nové věci a stát se
                součástí komunity, která sdílí lásku k přírodě, sportu a pohybu.
                Každý dobrovolník je pro nás důležitý – ať už pomáháte jednou za
                čas, nebo se zapojíte pravidelně. Přidejte se k nám a zažijte
                radost z práce, která má smysl a zanechává stopu v krajině i v
                lidech kolem vás.
              </p>
              <ul className="space-y-3 mb-6 text-gray-800 text-base w-full text-justify">
                <li className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-tjk-blue/80" /> Péče o areál a
                  zázemí – naučíte se praktické dovednosti a pomůžete udržovat
                  vše v perfektním stavu.
                </li>
                <li className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-tjk-blue/80" /> Pomoc při akcích
                  a závodech – zažijte atmosféru sportovních událostí z první
                  ruky.
                </li>
                <li className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-tjk-blue/80" /> Provoz
                  areálu v sezóně – podílejte se na chodu místa, které přináší
                  radost stovkám návštěvníků.
                </li>
              </ul>
              <div className="mb-6 w-full text-justify">
                <h3 className="font-semibold mb-1 text-tjk-blue text-base">
                  Co získáte?
                </h3>
                <ul className="text-gray-700 text-sm pl-2 space-y-0.5">
                  <li>• Volné vstupy a slevy na služby areálu</li>
                  <li>• Nové zkušenosti, dovednosti a přátelství</li>
                  <li>
                    • Skvělý pocit z dobře odvedené práce a poděkování od
                    komunity
                  </li>
                  <li>• Možnost být u zrodu něčeho výjimečného</li>
                </ul>
              </div>
              <button
                onClick={scrollToForm}
                className="mt-auto inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-tjk-blue to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Chci být dobrovolník
                <ArrowRightCircle className="h-5 w-5" />
              </button>
            </div>

            {/* Partneři & Sponzoři */}
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 rounded-2xl shadow-xl border-2 border-orange-200 p-10 flex flex-col items-start hover:shadow-2xl hover:border-tjk-orange transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-center gap-4 mb-6 w-full">
                <div className="p-3 bg-gradient-to-br from-tjk-orange to-amber-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-tjk-orange w-full text-left group-hover:text-amber-600 transition-colors">
                  Pro partnery & sponzory
                </h2>
              </div>
              <p className="text-gray-700 mb-6 text-base w-full text-justify">
                Staňte se partnerem nebo sponzorem areálu Komáří vížka a
                podpořte projekt, který má pozitivní dopad na region, sportovní
                komunitu i životní prostředí. Vaše podpora nám umožní rozšiřovat
                nabídku služeb, pořádat větší akce a zlepšovat zázemí pro
                všechny návštěvníky. Společně můžeme vytvořit místo, které
                inspiruje a spojuje lidi napříč generacemi. Nabízíme férovou
                spolupráci, zviditelnění vaší značky a možnost být součástí
                smysluplného rozvoje regionu.
              </p>
              <ul className="space-y-3 mb-6 text-gray-800 text-base w-full text-justify">
                <li className="flex items-center gap-3">
                  <Gift className="h-6 w-6 text-tjk-orange/80" /> Finanční nebo
                  materiální podpora – pomozte nám růst a inovovat.
                </li>
                <li className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-tjk-orange/80" /> Odborná
                  pomoc, know-how – sdílejte své zkušenosti a posuňte nás dál.
                </li>
                <li className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-tjk-orange/80" /> Marketingová
                  spolupráce – zviditelněte svou značku v atraktivním prostředí
                  a mezi aktivními lidmi.
                </li>
              </ul>
              <div className="mb-6 w-full text-justify">
                <h3 className="font-semibold mb-1 text-tjk-orange text-base">
                  Co nabízíme?
                </h3>
                <ul className="text-gray-700 text-sm pl-2 space-y-0.5">
                  <li>
                    • Logo na webu, v areálu a na propagačních materiálech
                  </li>
                  <li>• Možnost firemních akcí a prezentace v médiích</li>
                  <li>• Dlouhodobé partnerství a osobní přístup</li>
                  <li>• Společně tvoříme hodnoty, které mají smysl</li>
                </ul>
              </div>
              <button
                onClick={scrollToForm}
                className="mt-auto inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-tjk-orange to-amber-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Chci být partner
                <ArrowRightCircle className="h-5 w-5" />
              </button>
            </div>
          </section>

          {/* Naši partneři */}
          <section className="mb-20 w-full max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue font-montserrat mb-4">
                Naši partneři
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Děkujeme našim partnerům za podporu a důvěru
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Ústecký kraj */}
              <a
                href="https://www.kr-ustecky.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-blue-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-full h-32 flex items-center justify-center mb-4">
                    <img
                      src="/images/partners/ustecky-kraj-logo.png"
                      alt="Ústecký kraj"
                      className="max-h-28 max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center text-blue-600">
                      <svg className="h-20 w-20 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span className="font-bold text-xl">Ústecký kraj</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-tjk-blue mb-2 text-center">Ústecký kraj</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Podpora rozvoje sportu a cestovního ruchu v regionu
                  </p>
                </div>
              </a>

              {/* Veterina Live */}
              <a
                href="https://www.veterina-live.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-green-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-full h-32 flex items-center justify-center mb-4">
                    <img
                      src="/images/partners/veterina-live-logo.png"
                      alt="Veterina Live Litoměřice"
                      className="max-h-28 max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center text-green-600">
                      <svg className="h-20 w-20 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-xl">Veterina Live</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-tjk-blue mb-2 text-center">Veterina Live Litoměřice</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Moderní veterinární klinika poskytující špičkovou péči 24/7
                  </p>
                </div>
              </a>
            </div>
          </section>

          {/* Kontakt / výzva - Vylepšená */}
          <section
            ref={formRef}
            className="mb-20 w-full max-w-7xl mx-auto bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-3xl shadow-2xl border-2 border-blue-100 p-12 pt-32 -mt-32 mt-16"
            style={{ boxSizing: "border-box" }}
          >
            <div className="flex flex-col items-center mb-8">
              <div className="p-4 bg-gradient-to-br from-tjk-blue to-cyan-600 rounded-2xl shadow-lg mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue text-center font-montserrat mb-3">
                Máte zájem? Ozvěte se nám!
              </h2>
              <p className="text-lg text-gray-600 text-center max-w-2xl">
                Vyplňte formulář a my se vám co nejdříve ozveme
              </p>
            </div>
            <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <ContactForm showPhone={true} />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dobrovolnici;
