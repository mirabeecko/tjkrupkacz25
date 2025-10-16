import React, { useRef } from "react";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import { Handshake, Users, HeartHandshake, Gift, Star, Building2, ArrowRightCircle } from "lucide-react";

const Dobrovolnici = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageLayout
      title="Zapojte se – Dobrovolníci & Partneři"
      description="Staňte se součástí trailparku Komáří vížka. Pomozte nám tvořit místo, které má smysl."
    >
      {/* Hero sekce */}
      <section className="relative bg-white rounded-3xl shadow px-6 py-14 mb-14 border border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-gray-900 mb-4 tracking-tight">
            Společně tvoříme <span className="text-tjk-blue">budoucnost areálu</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Přidejte se k nám jako dobrovolník nebo partner a pomozte nám rozvíjet unikátní sportovní areál na Komáří vížce. Každý může přispět – zkušenostmi, energií, podporou.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-tjk-blue text-white font-semibold shadow hover:bg-tjk-blue/90 transition"
            >
              Chci se zapojit
              <ArrowRightCircle className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dvě hlavní cesty zapojení */}
      <section id="zapojeni" className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        {/* Dobrovolníci */}
        <div className="bg-blue-50 rounded-xl shadow border border-blue-100 p-10 flex flex-col items-start hover:shadow-md transition group">
          <div className="flex items-center gap-3 mb-6 w-full">
            <Users className="h-10 w-10 text-tjk-blue" />
            <h2 className="text-3xl font-extrabold text-tjk-blue w-full text-left">Pro dobrovolníky</h2>
          </div>
          <p className="text-gray-700 mb-6 text-base w-full text-justify">
            Dobrovolnictví je srdcem našeho areálu. Hledáme lidi, kteří mají chuť přiložit ruku k dílu, naučit se nové věci a stát se součástí komunity, která sdílí lásku k přírodě, sportu a pohybu. Každý dobrovolník je pro nás důležitý – ať už pomáháte jednou za čas, nebo se zapojíte pravidelně. Přidejte se k nám a zažijte radost z práce, která má smysl a zanechává stopu v krajině i v lidech kolem vás.
          </p>
          <ul className="space-y-3 mb-6 text-gray-800 text-base w-full text-justify">
            <li className="flex items-center gap-3">
              <Users className="h-6 w-6 text-tjk-blue/80" /> Péče o areál a zázemí – naučíte se praktické dovednosti a pomůžete udržovat vše v perfektním stavu.
            </li>
            <li className="flex items-center gap-3">
              <Star className="h-6 w-6 text-tjk-blue/80" /> Pomoc při akcích a závodech – zažijte atmosféru sportovních událostí z první ruky.
            </li>
            <li className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-tjk-blue/80" /> Provoz areálu v sezóně – podílejte se na chodu místa, které přináší radost stovkám návštěvníků.
            </li>
          </ul>
          <div className="mb-6 w-full text-justify">
            <h3 className="font-semibold mb-1 text-tjk-blue text-base">Co získáte?</h3>
            <ul className="text-gray-700 text-sm pl-2 space-y-0.5">
              <li>• Volné vstupy a slevy na služby areálu</li>
              <li>• Nové zkušenosti, dovednosti a přátelství</li>
              <li>• Skvělý pocit z dobře odvedené práce a poděkování od komunity</li>
              <li>• Možnost být u zrodu něčeho výjimečného</li>
            </ul>
          </div>
          <button
            onClick={scrollToForm}
            className="mt-auto inline-flex items-center gap-2 px-6 py-2 rounded-full bg-tjk-blue text-white font-semibold shadow hover:bg-tjk-blue/90 transition"
          >
            Chci být dobrovolník
            <ArrowRightCircle className="h-5 w-5" />
          </button>
        </div>

        {/* Partneři & Sponzoři */}
        <div className="bg-orange-50 rounded-xl shadow border border-orange-100 p-10 flex flex-col items-start hover:shadow-md transition group">
          <div className="flex items-center gap-3 mb-6 w-full">
            <Handshake className="h-10 w-10 text-tjk-orange" />
            <h2 className="text-3xl font-extrabold text-tjk-orange w-full text-left">Pro partnery & sponzory</h2>
          </div>
          <p className="text-gray-700 mb-6 text-base w-full text-justify">
            Staňte se partnerem nebo sponzorem areálu Komáří vížka a podpořte projekt, který má pozitivní dopad na region, sportovní komunitu i životní prostředí. Vaše podpora nám umožní rozšiřovat nabídku služeb, pořádat větší akce a zlepšovat zázemí pro všechny návštěvníky. Společně můžeme vytvořit místo, které inspiruje a spojuje lidi napříč generacemi. Nabízíme férovou spolupráci, zviditelnění vaší značky a možnost být součástí smysluplného rozvoje regionu.
          </p>
          <ul className="space-y-3 mb-6 text-gray-800 text-base w-full text-justify">
            <li className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-tjk-orange/80" /> Finanční nebo materiální podpora – pomozte nám růst a inovovat.
            </li>
            <li className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-tjk-orange/80" /> Odborná pomoc, know-how – sdílejte své zkušenosti a posuňte nás dál.
            </li>
            <li className="flex items-center gap-3">
              <Star className="h-6 w-6 text-tjk-orange/80" /> Marketingová spolupráce – zviditelněte svou značku v atraktivním prostředí a mezi aktivními lidmi.
            </li>
          </ul>
          <div className="mb-6 w-full text-justify">
            <h3 className="font-semibold mb-1 text-tjk-orange text-base">Co nabízíme?</h3>
            <ul className="text-gray-700 text-sm pl-2 space-y-0.5">
              <li>• Logo na webu, v areálu a na propagačních materiálech</li>
              <li>• Možnost firemních akcí a prezentace v médiích</li>
              <li>• Dlouhodobé partnerství a osobní přístup</li>
              <li>• Společně tvoříme hodnoty, které mají smysl</li>
            </ul>
          </div>
          <button
            onClick={scrollToForm}
            className="mt-auto inline-flex items-center gap-2 px-6 py-2 rounded-full bg-tjk-orange text-white font-semibold shadow hover:bg-tjk-orange/90 transition"
          >
            Chci být partner
            <ArrowRightCircle className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Kontakt / výzva */}
      <section
        ref={formRef}
        className="mb-20 w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-12 pt-32 -mt-32 mt-16"
        style={{ boxSizing: 'border-box' }}
      >
        <div className="flex flex-col items-center mb-6">
          <Users className="h-10 w-10 text-tjk-blue mb-2" />
          <h2 className="text-2xl font-bold text-tjk-blue text-center font-montserrat">
            Máte zájem? Ozvěte se nám!
          </h2>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-lg p-0">
          <ContactForm showPhone={true} />
        </div>
      </section>
    </PageLayout>
  );
};

export default Dobrovolnici;
