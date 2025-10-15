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
    description="Zážitkové programy, teambuilding a firemní eventy v přírodě. Inspirujte svůj tým v areálu Komáří Vížka."
  >
    {/* Hero sekce s hlavní fotografií - full width */}
    <div className="relative -mx-4 md:-mx-12 mb-16">
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-green-800/75 to-green-600/65 z-10" />
        <div className="relative z-20 text-center text-white px-6 md:px-12 max-w-4xl animate-[fadeInUp_1s_ease-out]">
          <Briefcase className="w-20 h-20 mx-auto mb-6 drop-shadow-2xl animate-[bounce_2s_ease-in-out_infinite]" />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl tracking-tight text-shadow-lg">
            Firemní akce a teambuilding
          </h1>
          <p className="text-2xl md:text-3xl font-medium drop-shadow-2xl leading-relaxed">
            Posilte týmového ducha v inspirativním prostředí Krušných hor
          </p>
        </div>
      </section>
    </div>

    {/* Hlavní sekce s obsahem */}
    <section className="mb-16 grid md:grid-cols-2 gap-12 items-start animate-fade-in-up">
      {/* Levý sloupec - text a informace */}
      <div>
        <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-3">
            <span className="inline-block bg-green-100 rounded-full p-3">
              <Briefcase className="w-8 h-8 text-green-600" />
            </span>
            Zážitkové programy na míru
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Nabízíme firemní akce, teambuildingy a workshopy v přírodě, které posilují týmovou spolupráci, motivaci a kreativitu. Každý program připravujeme individuálně podle potřeb klienta – od sportovních aktivit přes outdoor hry až po relaxační zázemí a catering.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-800 font-semibold shadow-sm">
              <Users className="w-5 h-5" /> Teambuilding
            </span>
            <span className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-800 font-semibold shadow-sm">
              <Mountain className="w-5 h-5" /> Outdoor aktivity
            </span>
            <span className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-800 font-semibold shadow-sm">
              <Calendar className="w-5 h-5" /> Firemní večírky
            </span>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Co nabízíme
          </h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span>Teambuildingové programy a outdoor aktivity</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span>Firemní večírky, školení a workshopy</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span>Možnost zajištění ubytování a stravování</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span>Moderní zázemí a technické vybavení</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span>Individuální přístup a profesionální organizace</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-7 h-7" />
            Proč firemní akci u nás?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Smile className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Inspirativní prostředí a krásná příroda</span>
            </li>
            <li className="flex items-start gap-3">
              <Smile className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Široká nabídka aktivit pro malé i velké týmy</span>
            </li>
            <li className="flex items-start gap-3">
              <Smile className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Možnost kombinace sportu, relaxu a zábavy</span>
            </li>
            <li className="flex items-start gap-3">
              <Smile className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Profesionální tým s dlouholetou zkušeností</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link to="/kontakt" className="flex-1">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
              Požádat o nabídku
            </button>
          </Link>
        </div>
      </div>

      {/* Pravý sloupec - fotografie */}
      <div className="space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
          <img
            src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&q=80"
            alt="Týmová spolupráce outdoor"
            className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in-up delay-100">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80"
              alt="Firemní tým"
              className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in-up delay-150">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80"
              alt="Workshop v přírodě"
              className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in-up delay-200">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
            alt="Outdoor aktivity"
            className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>

    {/* Banner s referencí - full width */}
    <div className="relative -mx-4 md:-mx-12 mb-16">
      <section className="relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 py-16 md:py-20 text-center shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-center mb-6">
            <Award className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
          <blockquote className="italic text-2xl md:text-3xl text-white mb-6 font-medium max-w-4xl mx-auto drop-shadow-lg leading-relaxed">
            "Skvělý teambuilding, perfektní organizace a krásné prostředí. Náš tým byl nadšený a plný energie. Určitě se vrátíme!"
          </blockquote>
          <div className="text-green-100 font-bold text-xl">HR tým, TechSolutions s.r.o., 2024</div>
        </div>
      </section>
    </div>
  </PageLayout>
);

export default Firmy;
