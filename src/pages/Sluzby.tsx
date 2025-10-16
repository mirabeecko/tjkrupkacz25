import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { School, Briefcase, Bed, Bike, Coffee, Sparkles, ArrowRight, ChevronRight, Zap, Target, CheckCircle2, ChevronDown, Wind, Mountain, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Kurzy Snowkitingu",
    subtitle: "Létejte na sněhu",
    description:
      "Profesionální kurzy snowkitingu v Krušných horách. Naučte se létat na snowboardu nebo lyžích s drakem. Pro začátečníky i pokročilé.",
    icon: Wind,
    cta: "Zobrazit kurzy",
    link: "/snowkiting-kurzy",
    gradient: "from-blue-600 via-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070",
    benefits: [
      "Certifikovaní instruktoři",
      "Kompletní vybavení v ceně",
      "Malé skupiny (max 4 osoby)",
      "Krušné hory - ideální podmínky"
    ]
  },
  {
    title: "Půjčovna Motocyklů",
    subtitle: "Adrenalin na kolech",
    description:
      "Prémiové motocykly KTM pro terénní jízdu. Profesionální servis, kompletní výstroj a instruktáž zdarma.",
    icon: Bike,
    cta: "Zobrazit motocykly",
    link: "/pujcovna",
    gradient: "from-orange-500 via-red-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070",
    benefits: [
      "KTM Freeride, Duke, Supermoto",
      "Profesionální servis",
      "Kompletní výstroj",
      "Instruktáž zdarma"
    ]
  },
  {
    title: "Lyžařský areál Komáří Vížka",
    subtitle: "Zimní radovánky",
    description:
      "Moderní lyžařský areál s perfektními sjezdovkami pro rodiny i zkušené lyžaře. Lyžařská škola a půjčovna na místě.",
    icon: Mountain,
    cta: "Zjistit více",
    link: "/komari-vizka",
    gradient: "from-indigo-500 via-purple-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070",
    benefits: [
      "Moderní vleky",
      "Upravené sjezdovky",
      "Lyžařská škola",
      "Půjčovna lyží"
    ]
  },
  {
    title: "AIRBAG",
    subtitle: "Již brzy!",
    description:
      "Bezpečnost na nové úrovni. Již brzy u nás - moderní airbag systém pro maximální ochranu při sportu.",
    icon: Shield,
    cta: "Více informací",
    link: "/kontakt",
    gradient: "from-purple-600 via-pink-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=2070",
    benefits: [
      "Maximální ochrana",
      "Profesionální vybavení",
      "Moderní technologie",
      "Coming soon 2025"
    ],
    badge: "COMING SOON"
  },
  {
    title: "Pro školy",
    subtitle: "Vzdělávání v pohybu",
    description:
      "Speciální programy pro školy a dětské kolektivy. Zábava, pohyb a vzdělávání v přírodě pod vedením zkušených instruktorů.",
    icon: School,
    cta: "Zjistit více",
    link: "/skoly",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070",
    benefits: [
      "Lyžařské kurzy pro školy",
      "Sportovní dny v přírodě",
      "Vzdělávací programy",
      "Bezpečné prostředí"
    ]
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
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069",
    benefits: [
      "Team building aktivity",
      "Catering na míru",
      "Kompletní servis",
      "Motivační programy"
    ]
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
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    benefits: [
      "Moderní vybavení",
      "Blízko ski areálu",
      "Rodinné prostředí",
      "Vlastní stravování"
    ]
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
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070",
    benefits: [
      "Domácí kuchyně",
      "Sezónní menu",
      "Terasa s výhledem",
      "Dětský koutek"
    ]
  },
];

const Sluzby = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* HERO SECTION - Full Width */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          <div className="container relative z-20 px-4 py-20">
            <div className="max-w-5xl mx-auto text-center text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-[fade-in_1s_ease-out]">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">KOMPLETNÍ NABÍDKA SLUŽEB</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl mb-6 animate-[fade-in-up_1.2s_ease-out_0.2s_both]">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                  Naše služby
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-3xl mb-8 font-light leading-relaxed animate-[fade-in-up_1.2s_ease-out_0.4s_both]">
                Od vzdělávacích programů přes <span className="font-semibold text-blue-300">adrenalinové teambuildingy</span>
                <br className="hidden md:block" />
                až po komfortní ubytování a gastro zážitky
              </p>

              {/* Key Points */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 animate-[fade-in-up_1.2s_ease-out_0.6s_both]">
                <div className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>8 komplexních služeb</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Programy na míru</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Vše na jednom místě</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fade-in-up_1.2s_ease-out_0.8s_both]">
                <a href="#sluzby">
                  <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-xl px-8 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1">
                    Prozkoumat služby
                    <ChevronDown className="ml-2 inline h-6 w-6 transition-transform group-hover:translate-y-1" />
                  </button>
                </a>
                <Link to="/kontakt">
                  <button className="font-bold text-xl px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 transition-all duration-300">
                    Kontaktujte nás
                  </button>
                </Link>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="h-10 w-10 text-white/60" />
            </div>
          </div>
        </section>

      {/* SERVICES GRID */}
      <section id="sluzby" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Kompletní nabídka <span className="text-blue-600">pro každého</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vyberte si ze široké škály služeb, které vám zajistí nezapomenutelný zážitek
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;

              return (
                <Card
                  key={service.title}
                  className="group overflow-hidden border-2 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Image with gradient overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-80`} />
                    {service.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500 text-black font-bold animate-pulse">
                          {service.badge}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                      <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-12 h-12" />
                      </div>
                      <h3 className="text-3xl font-black text-center">{service.title}</h3>
                      <p className="text-sm font-semibold tracking-wider mt-2 uppercase">{service.subtitle}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-2 mb-6">
                      {service.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to={service.link}>
                      <button className={`w-full bg-gradient-to-r ${service.gradient} text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}>
                        {service.cta}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION - Full Width */}
      <section className="relative py-24 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-white/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-8 text-yellow-400 animate-pulse" />
            <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              Nenašli jste, co hledáte?
            </h2>
            <p className="text-2xl md:text-3xl mb-12 text-blue-100 drop-shadow-lg">
              Rádi vám připravíme program přesně na míru. Kontaktujte nás a společně vytvoříme nezapomenutelný zážitek.
            </p>

            <Link to="/kontakt">
              <button className="group bg-white text-blue-600 hover:bg-gray-100 font-bold text-xl px-12 py-7 rounded-2xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                Napište nám
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sluzby;
