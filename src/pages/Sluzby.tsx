import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { School, Briefcase, Bed, Bike, Coffee, Sparkles, ArrowRight, ChevronRight, Zap, Target } from "lucide-react";

const services = [
  {
    title: "Pro školy",
    subtitle: "Vzdělávání v pohybu",
    description:
      "Speciální programy pro školy a dětské kolektivy. Zábava, pohyb a vzdělávání v přírodě pod vedením zkušených instruktorů.",
    icon: School,
    cta: "Zjistit více",
    link: "/skoly",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    title: "Pro firmy",
    subtitle: "Teambuilding na maximum",
    description:
      "Firemní akce, teambuildingy a zážitkové programy na míru. Posilujte týmového ducha v inspirativním prostředí hor.",
    icon: Briefcase,
    cta: "Firemní nabídka",
    link: "/firmy",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
  },
  {
    title: "Ubytování",
    subtitle: "Pohodlí v horách",
    description:
      "Komfortní ubytování přímo v areálu i v okolí. Ideální zázemí pro sportovce, rodiny i skupiny.",
    icon: Bed,
    cta: "Rezervovat",
    link: "/ubytovani",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
  },
  {
    title: "Sportovní aktivity",
    subtitle: "Pohyb a zábava",
    description:
      "Široká nabídka sportovních aktivit pro všechny věkové kategorie. Od zimních sportů až po letní adrenalin.",
    icon: Bike,
    cta: "Zjistit více",
    link: "/sporty",
    gradient: "from-red-500 via-rose-500 to-pink-500",
  },
  {
    title: "Bistro",
    subtitle: "Chuť v přírodě",
    description:
      "Stylové bistro s domácí kuchyní, občerstvením a posezením na terase. Ideální místo pro relax po sportu.",
    icon: Coffee,
    cta: "Zobrazit menu",
    link: "/bistro",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
  },
];

const Sluzby = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <PageLayout
      title="Naše služby"
      description="Objevte komplexní nabídku služeb v areálu Komáří Vížka – od vzdělávacích programů přes teambuildingy až po ubytování a gastro zážitky."
    >
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold tracking-wide">KOMPLETNÍ NABÍDKA</span>
          </div>

          <h1 className="font-montserrat font-black text-6xl md:text-8xl mb-6 leading-none">
            <span className="block text-white mb-2">NAŠE</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SLUŽBY
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Od vzdělávacích programů přes adrenalinové teambuildingy až po komfortní ubytování.
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
              Vše na jednom místě v srdci Krušných hor.
            </span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Target className="inline w-5 h-5 text-blue-400 mr-2" />
              <span className="font-semibold">5 hlavních služeb</span>
            </div>
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Zap className="inline w-5 h-5 text-yellow-400 mr-2" />
              <span className="font-semibold">Programy na míru</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isHovered = hoveredIndex === idx;
              const isLarge = idx === 0;

              return (
                <Link
                  key={service.title}
                  to={service.link}
                  className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] ${
                    isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    minHeight: isLarge ? '600px' : '320px'
                  }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-transform duration-700 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`} />

                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col justify-between text-white z-10">
                    <div>
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mb-6 transition-all duration-500 ${
                        isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                      }`}>
                        <Icon className="w-8 h-8" />
                      </div>

                      <div className="mb-3">
                        <div className="text-sm font-semibold uppercase tracking-widest opacity-90 mb-2">
                          {service.subtitle}
                        </div>
                        <h3 className={`font-montserrat font-black leading-tight ${
                          isLarge ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'
                        }`}>
                          {service.title}
                        </h3>
                      </div>

                      <p className={`text-white/90 leading-relaxed ${
                        isLarge ? 'text-lg max-w-2xl' : 'text-base'
                      }`}>
                        {service.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className={`flex items-center gap-2 font-bold text-lg transition-all duration-300 ${
                      isHovered ? 'gap-4' : 'gap-2'
                    }`}>
                      {service.cta}
                      <ChevronRight className={`w-6 h-6 transition-transform duration-300 ${
                        isHovered ? 'translate-x-2' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-purple-500/20 blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-8 text-yellow-400 animate-pulse" />
          <h2 className="font-montserrat font-black text-5xl md:text-6xl mb-6">
            Nenašli jste, co hledáte?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Rádi vám připravíme program přesně na míru. Kontaktujte nás a společně vytvoříme nezapomenutelný zážitek.
          </p>
          <Link to="/kontakt">
            <button className="group relative inline-flex items-center gap-3 px-12 py-6 bg-white text-black font-black text-xl rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              Napište nám
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default Sluzby;
