import React from "react";
import PageLayout from "@/components/PageLayout";
import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export const meta = {
  title: "Bistro | Komáří Vížka",
  description:
    "Stylové bistro s domácí kuchyní, občerstvením a posezením na terase v areálu Komáří Vížka. Ideální místo pro relax po sportu.",
  keywords:
    "bistro, občerstvení, Komáří Vížka, sportovní areál, domácí kuchyně, terasa, restaurace, Krušné hory, kavárna, relax, jídlo a pití",
};

const Bistro = () => (
  <PageLayout
    title="Bistro Komáří Vížka"
    description="Stylové bistro s domácí kuchyní, občerstvením a posezením na terase. Ideální místo pro relax po sportu."
  >
    {/* Hero sekce */}
 

    {/* SEO text a sekce */}
    <section className="mb-16 flex flex-col md:flex-row items-center gap-10 md:gap-20 justify-center animate-fade-in-up">
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-pink-900 flex items-center gap-3 justify-center md:justify-start">
          <span className="inline-block bg-pink-100 rounded-full p-2"><Coffee className="inline w-7 h-7 text-pink-600" /></span>
          Občerstvení a relax v srdci areálu
        </h2>
        <p className="text-gray-700 text-lg mb-4 max-w-xl mx-auto md:mx-0">
          Naše bistro nabízí domácí kuchyni, výběrovou kávu, čerstvé dezerty a široký výběr nápojů. Vychutnejte si snídani, oběd nebo odpolední kávu na slunné terase s výhledem na Krušné hory. Vše připravujeme z kvalitních surovin a s láskou k poctivému jídlu. Bistro je otevřené pro návštěvníky areálu i širokou veřejnost.
        </p>
        <ul className="flex flex-wrap gap-4 justify-center md:justify-start mt-6 mb-8">
          <li className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full text-pink-700 font-semibold shadow-sm"><Coffee className="w-5 h-5" /> Domácí kuchyně</li>
          <li className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full text-pink-700 font-semibold shadow-sm"><Coffee className="w-5 h-5" /> Výběrová káva</li>
          <li className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full text-pink-700 font-semibold shadow-sm"><Coffee className="w-5 h-5" /> Terasa s výhledem</li>
        </ul>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Domácí kuchyně a denní menu</li>
          <li>Výběrová káva a domácí dezerty</li>
          <li>Letní terasa s výhledem</li>
          <li>Občerstvení pro sportovce i rodiny</li>
          <li>Možnost pořádání oslav a akcí</li>
        </ul>
        <div className="flex gap-4 mb-8">
          <img src="/images/bistro_detail2.jpg" alt="Bistro Komáří Vížka" className="rounded-xl w-48 h-32 object-cover shadow-md border border-pink-50 animate-fade-in-up" />
          <img src="/images/bistro_detail3.jpg" alt="Dezerty a káva" className="rounded-xl w-48 h-32 object-cover shadow-md border border-pink-50 animate-fade-in-up delay-100" />
        </div>
        <h3 className="text-xl font-bold mb-2">Proč navštívit naše bistro?</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Příjemné prostředí a milá obsluha</li>
          <li>Čerstvé a kvalitní suroviny</li>
          <li>Možnost rezervace pro skupiny</li>
          <li>Speciální nabídky pro akce a oslavy</li>
        </ul>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link to="/kontakt" className="flex-1">
            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow">Rezervovat stůl</button>
          </Link>
          <a href="/images/bistro_menu.pdf" className="flex-1" target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-white border border-pink-600 text-pink-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-pink-50">Prohlédnout menu (PDF)</button>
          </a>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-6">
        <img src="/images/bistro_akce.jpg" alt="Bistro akce" className="rounded-2xl shadow-xl w-full max-w-md border-2 border-pink-100 animate-fade-in-up" />
        <img src="/images/bistro_rodina.jpg" alt="Hosté v bistru" className="rounded-xl w-40 h-28 object-cover shadow-md border border-pink-50 animate-fade-in-up delay-100" />
      </div>
    </section>

    {/* Banner s referencí */}
    <section className="bg-pink-50 rounded-2xl p-8 max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
      <blockquote className="italic text-lg text-pink-900 mb-4">“Výborné jídlo, skvělá káva a krásné posezení na terase. Doporučujeme!”</blockquote>
      <div className="text-pink-700 font-semibold">Pavla a Martin, 2025</div>
    </section>
  </PageLayout>
);

export default Bistro;
