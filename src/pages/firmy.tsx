import React from "react";
import PageLayout from "@/components/PageLayout";
import { Briefcase, Users, Calendar, Mountain, Smile, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const meta = {
  title: "Firemní akce a teambuilding | Komáří Vížka",
  description:
    "Firemní akce, teambuildingy a zážitkové programy na míru v areálu Komáří Vížka. Posilujte týmového ducha v inspirativním prostředí hor.",
  keywords:
    "firemní akce, teambuilding, zážitkové programy, Komáří Vížka, sportovní areál, Krušné hory, firemní eventy, týmová spolupráce, outdoor aktivity, školení, workshopy, firemní večírky",
};

const Firmy = () => (
  <PageLayout
    title="Firemní akce a teambuilding"
    description="Zážitkové programy, teambuilding a firemní eventy v přírodě. Inspirujte svůj tým v Trailparku Komáří Vížka."
  >
 

    {/* SEO text a sekce */}
    <section className="mb-16 flex flex-col md:flex-row items-center gap-10 md:gap-20 justify-center animate-fade-in-up">
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-green-900 flex items-center gap-3 justify-center md:justify-start">
          <span className="inline-block bg-green-100 rounded-full p-2"><Briefcase className="inline w-7 h-7 text-green-600" /></span>
          Zážitkové programy na míru
        </h2>
        <p className="text-gray-700 text-lg mb-4 max-w-xl mx-auto md:mx-0">
          Nabízíme firemní akce, teambuildingy a workshopy v přírodě, které posilují týmovou spolupráci, motivaci a kreativitu. Každý program připravujeme individuálně podle potřeb klienta – od sportovních aktivit přes outdoor hry až po relaxační zázemí a catering. Moderní areál, profesionální tým a krásné prostředí Krušných hor jsou zárukou úspěšné akce.
        </p>
        <ul className="flex flex-wrap gap-4 justify-center md:justify-start mt-6 mb-8">
          <li className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700 font-semibold shadow-sm"><Briefcase className="w-5 h-5" /> Teambuilding</li>
          <li className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700 font-semibold shadow-sm"><Briefcase className="w-5 h-5" /> Workshopy</li>
          <li className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700 font-semibold shadow-sm"><Briefcase className="w-5 h-5" /> Firemní večírky</li>
        </ul>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Teambuildingové programy a outdoor aktivity</li>
          <li>Firemní večírky, školení a workshopy</li>
          <li>Možnost zajištění ubytování a stravování</li>
          <li>Moderní zázemí a technické vybavení</li>
          <li>Individuální přístup a profesionální organizace</li>
        </ul>
        <div className="flex gap-4 mb-8">
          <img src="/images/firmy_detail2.jpg" alt="Firemní akce v přírodě" className="rounded-xl w-48 h-32 object-cover shadow-md border border-green-50 animate-fade-in-up" />
          <img src="/images/firmy_detail3.jpg" alt="Týmová spolupráce" className="rounded-xl w-48 h-32 object-cover shadow-md border border-green-50 animate-fade-in-up delay-100" />
        </div>
        <h3 className="text-xl font-bold mb-2">Proč firemní akci u nás?</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Inspirativní prostředí a krásná příroda</li>
          <li>Široká nabídka aktivit pro malé i velké týmy</li>
          <li>Možnost kombinace sportu, relaxu a zábavy</li>
          <li>Profesionální tým s dlouholetou zkušeností</li>
        </ul>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link to="/kontakt" className="flex-1">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow">Požádat o nabídku</button>
          </Link>
          <a href="/images/firmy_programy.pdf" className="flex-1" target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-white border border-green-600 text-green-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-50">Stáhnout nabídku (PDF)</button>
          </a>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-6">
        <img src="/images/firmy_akce.jpg" alt="Firemní akce v areálu" className="rounded-2xl shadow-xl w-full max-w-md border-2 border-green-100 animate-fade-in-up" />
        <img src="/images/firmy_team.jpg" alt="Týmová spolupráce" className="rounded-xl w-40 h-28 object-cover shadow-md border border-green-50 animate-fade-in-up delay-100" />
      </div>
    </section>
    {/* Banner s referencí */}
    <section className="bg-green-50 rounded-2xl p-8 max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
      <blockquote className="italic text-lg text-green-900 mb-4">“Skvělý teambuilding, perfektní organizace a krásné prostředí. Doporučujeme!”</blockquote>
      <div className="text-green-700 font-semibold">HR tým, TechSolutions s.r.o., 2024</div>
    </section>
  </PageLayout>
);

export default Firmy;
