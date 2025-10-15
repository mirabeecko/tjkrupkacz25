import React from "react";
import PageLayout from "@/components/PageLayout";
import { School } from "lucide-react";
import { Link } from "react-router-dom";

export const meta = {
  title: "Programy pro školy | Komáří Vížka",
  description:
    "Zážitkové programy pro školy v areálu Komáří Vížka. Vzdělávání, pohyb a zábava v přírodě pod vedením zkušených instruktorů.",
  keywords:
    "programy pro školy, školní výlety, outdoor vzdělávání, sportovní kurzy, Komáří Vížka, sportovní areál, dětské kolektivy, školní akce, Krušné hory, zážitková pedagogika",
};

const Skoly = () => (
  <PageLayout
    title="Programy pro školy"
    description="Zážitkové vzdělávání, pohyb a dobrodružství v přírodě pro školní kolektivy."
  >
    {/* Hero sekce */}
    <section className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center bg-cover bg-center rounded-3xl overflow-hidden mb-16 shadow-2xl border-4 border-blue-200 animate-fade-in" style={{ backgroundImage: `url('/images/skoly_detail1.jpg')` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-blue-400/30 z-10" />
      <div className="relative z-20 text-center text-white px-6 md:px-12">
        <School className="w-16 h-16 mx-auto mb-6 animate-fade-in-up" />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl tracking-tight animate-fade-in-up">Programy pro školy</h1>
        <p className="text-2xl md:text-3xl font-medium max-w-3xl mx-auto drop-shadow-lg animate-fade-in-up delay-100">Objevte jedinečné školní výlety a sportovní kurzy v srdci Krušných hor.</p>
        <img src="/images/skoly_hero_banner.jpg" alt="Školní program v přírodě" className="mx-auto mt-8 w-full max-w-2xl rounded-xl shadow-lg border-2 border-white/40 animate-fade-in-up delay-200" />
      </div>
    </section>

    {/* SEO text a sekce */}
    <section className="mb-16 flex flex-col md:flex-row items-center gap-10 md:gap-20 justify-center animate-fade-in-up">
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-blue-900 flex items-center gap-3 justify-center md:justify-start">
          <span className="inline-block bg-blue-100 rounded-full p-2"><School className="inline w-7 h-7 text-blue-600" /></span>
          Zážitkové vzdělávání v přírodě
        </h2>
        <p className="text-gray-700 text-lg mb-4 max-w-xl mx-auto md:mx-0">
          Nabízíme komplexní programy pro školy a dětské kolektivy zaměřené na pohyb, spolupráci a poznávání přírody. Naše aktivity rozvíjejí týmového ducha, podporují zdravý životní styl a přinášejí radost z pohybu na čerstvém vzduchu. Vše pod vedením zkušených instruktorů s důrazem na bezpečnost a individuální přístup.
        </p>
        <ul className="flex flex-wrap gap-4 justify-center md:justify-start mt-6 mb-8">
          <li className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 font-semibold shadow-sm"><School className="w-5 h-5" /> Školní výlety</li>
          <li className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 font-semibold shadow-sm"><School className="w-5 h-5" /> Adaptační kurzy</li>
          <li className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 font-semibold shadow-sm"><School className="w-5 h-5" /> Sportovní dny</li>
        </ul>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Outdoorové vzdělávací programy</li>
          <li>Sportovní dny a cyklistické workshopy</li>
          <li>Tematické hry a týmové aktivity</li>
          <li>Možnost zajištění stravování a ubytování</li>
        </ul>
        <div className="flex gap-4 mb-8">
          <img src="/images/skoly_detail2.jpg" alt="Školní program v přírodě" className="rounded-xl w-48 h-32 object-cover shadow-md border border-blue-50 animate-fade-in-up" />
          <img src="/images/skoly_detail3.jpg" alt="Děti na trailu" className="rounded-xl w-48 h-32 object-cover shadow-md border border-blue-50 animate-fade-in-up delay-100" />
        </div>
        <h3 className="text-xl font-bold mb-2">Proč právě k nám?</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Moderní zázemí a bezpečné prostředí</li>
          <li>Individuální přístup ke každé skupině</li>
          <li>Možnost kombinace sportu, vzdělávání a zábavy</li>
          <li>Krásná příroda Krušných hor</li>
        </ul>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link to="/kontakt" className="flex-1">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow">Zarezervovat termín</button>
          </Link>
          <a href="/images/skoly_programy.pdf" className="flex-1" target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-white border border-blue-600 text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-50">Stáhnout programy (PDF)</button>
          </a>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-6">
        <img src="/images/skoly_akce.jpg" alt="Školní akce v areálu" className="rounded-2xl shadow-xl w-full max-w-md border-2 border-blue-100 animate-fade-in-up" />
        <img src="/images/skoly_rodina.jpg" alt="Děti v přírodě" className="rounded-xl w-40 h-28 object-cover shadow-md border border-blue-50 animate-fade-in-up delay-100" />
      </div>
    </section>

    {/* Banner s referencí */}
    <section className="bg-blue-50 rounded-2xl p-8 max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
      <blockquote className="italic text-lg text-blue-900 mb-4">“Děti byly nadšené! Skvělý program, profesionální přístup a krásné prostředí.”</blockquote>
      <div className="text-blue-700 font-semibold">ZŠ Teplice, 2024</div>
    </section>
  </PageLayout>
);

export default Skoly;
