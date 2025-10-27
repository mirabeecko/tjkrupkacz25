import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  School,
  Briefcase,
  Bed,
  Bike,
  ArrowRight,
  CheckCircle2,
  Wind,
  Mountain,
  Shield,
  Star,
  Users,
  Calendar,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const services = [
  {
    id: "snowkiting",
    title: "Snowkiting Kurzy",
    subtitle: "Létejte na sněhu s drakem",
    description: "Zažijte jedinečný adrenalin snowkitingu v srdci Krušných hor. Zkušení instruktoři vás naučí ovládat sílu větru a sněhu.",
    icon: Wind,
    cta: "Zobrazit kurzy",
    link: "/snowkiting-kurzy",
    gradient: "from-cyan-500 to-blue-600",
    image: "/images/snowkiting/jj produktovka.jpg",
    highlights: [
      "Zkušení instruktoři",
      "Kompletní vybavení",
      "Malé skupiny",
      "Ideální podmínky"
    ],
    featured: true
  },
  {
    id: "pujcovna",
    title: "Půjčovna Motocyklů",
    subtitle: "Adrenalin na prémiových strojích",
    description: "Motocykly KTM pro terénní jízdu. Kompletní výstroj, instruktáž a profesionální servis v ceně.",
    icon: Bike,
    cta: "Zobrazit motocykly",
    link: "/pujcovna",
    gradient: "from-orange-500 to-red-600",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "KTM Freeride, Duke",
      "Profesionální servis",
      "Kompletní výstroj",
      "Instruktáž zdarma"
    ],
    featured: true
  },
  {
    id: "lyzarsky-areal",
    title: "Lyžařský areál",
    subtitle: "Zimní radovánky pro všechny",
    description: "Moderní lyžařský areál Komáří Vížka s perfektními sjezdovkami pro rodiny i zkušené lyžaře.",
    icon: Mountain,
    cta: "Zjistit více",
    link: "/komari-vizka",
    gradient: "from-purple-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Moderní vleky",
      "Upravené sjezdovky",
      "Lyžařská škola",
      "Půjčovna lyží"
    ]
  },
  {
    id: "skoly",
    title: "Pro školy",
    subtitle: "Vzdělávání v přírodě",
    description: "Speciální programy pro školy. Lyžařské kurzy, sportovní dny a vzdělávací aktivity v horách.",
    icon: School,
    cta: "Zjistit více",
    link: "/skoly",
    gradient: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Lyžařské kurzy",
      "Sportovní dny",
      "Vzdělávací programy",
      "Bezpečné prostředí"
    ]
  },
  {
    id: "firmy",
    title: "Pro firmy",
    subtitle: "Teambuilding, který funguje",
    description: "Firemní akce a teambuildingy na míru. Posilujte týmového ducha v inspirativním prostředí Krušných hor.",
    icon: Briefcase,
    cta: "Firemní nabídka",
    link: "/firmy",
    gradient: "from-green-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
    highlights: [
      "Team building",
      "Catering na míru",
      "Kompletní servis",
      "Motivační programy"
    ]
  },
  {
    id: "ubytovani",
    title: "Ubytování",
    subtitle: "Pohodlí v srdci hor",
    description: "Komfortní ubytování přímo v areálu. Ideální zázemí pro sportovce, rodiny i firemní skupiny.",
    icon: Bed,
    cta: "Rezervovat",
    link: "/ubytovani",
    gradient: "from-amber-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Moderní vybavení",
      "Blízko areálu",
      "Rodinné prostředí",
      "Snídaně v ceně"
    ]
  },
  {
    id: "airbag",
    title: "AIRBAG",
    subtitle: "Bezpečnost na nové úrovni",
    description: "Již brzy – moderní airbag systém pro maximální ochranu při zimních a letních sportech.",
    icon: Shield,
    cta: "Více informací",
    link: "/airbag",
    gradient: "from-pink-500 to-rose-600",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Maximální ochrana",
      "Profesionální vybavení",
      "Moderní technologie",
      "Coming soon 2025"
    ],
    badge: "BRZY"
  }
];

const Sluzby = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  const featuredServices = services.filter(s => s.featured);
  const otherServices = services.filter(s => !s.featured);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title="Naše služby | Tělovýchovná jednota Krupka"
        description="Kompletní nabídka služeb - snowkiting kurzy, půjčovna motocyklů, lyžařský areál, programy pro školy a firmy, ubytování a mnoho dalšího."
        keywords="služby, snowkiting, půjčovna motocyklů, lyžařský areál, teambuilding, ubytování, Krušné hory"
        url="https://tjkrupka.cz/sluzby"
      />

      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">Vše pro nezapomenutelný zážitek</span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-6 text-gray-900">
              Naše <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">služby</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-center text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Od adrenalinových sportů přes teambuildingy až po komfortní ubytování.
              <span className="block mt-2 text-gray-900 font-semibold">Vše na jednom místě v Krušných horách.</span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">7</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Služeb</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">15+</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Let zkušeností</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">1000+</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Spokojených klientů</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">⭐️</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Perfektní hodnocení</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED SERVICES - Large Cards */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Naše <span className="text-blue-600">top služby</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nejoblíbenější a nejvyhledávanější aktivity v Krušných horách
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {featuredServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                  >
                    {/* Image Section */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}></div>

                      {/* Icon Badge */}
                      <div className="absolute top-6 left-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-10 h-10 text-white" />
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{service.title}</h3>
                        <p className="text-white/90 text-lg font-medium">{service.subtitle}</p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col flex-grow">
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Highlights */}
                      <div className="grid grid-cols-2 gap-3 mb-8 flex-grow">
                        {service.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700 font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Link to={service.link} className="mt-auto">
                        <Button
                          className={`w-full bg-gradient-to-r ${service.gradient} text-white font-bold text-lg py-6 rounded-xl hover:opacity-90 transition-all group/btn`}
                        >
                          {service.cta}
                          <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* OTHER SERVICES - Compact Grid */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Další <span className="text-blue-600">služby</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Kompletní nabídka pro školy, firmy i individuální návštěvníky
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.id}
                    to={service.link}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Compact Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-75`}></div>

                      {/* Badge if exists */}
                      {service.badge && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                          <span className="text-xs font-bold text-gray-900">{service.badge}</span>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl mb-3 group-hover:scale-110 transition-transform">
                          <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-center px-4">{service.title}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Mini highlights */}
                      <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                        {service.highlights.slice(0, 3).map((highlight, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className={`font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                          {service.cta}
                        </span>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Proč si vybrat <span className="text-blue-600">nás?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Profesionální tým</h3>
                <p className="text-gray-600 leading-relaxed">
                  Zkušení instruktoři a lektoři. Bezpečnost a kvalita na prvním místě.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Komplexní služby</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vše na jednom místě – sport, ubytování, stravování i relaxaci. Nemusíte nic řešit.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Programy na míru</h3>
                <p className="text-gray-600 leading-relaxed">
                  Přizpůsobíme se vašim požadavkům. Individuální i skupinové programy dle vašich představ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Pojďme vytvořit váš
              <span className="block mt-2">nezapomenutelný zážitek</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Kontaktujte nás a společně naplánujeme program přesně podle vašich představ
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-xl px-10 py-7 rounded-xl shadow-2xl hover:scale-105 transition-all"
                >
                  Napište nám
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <a href="tel:+420773090842">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold text-xl px-10 py-7 rounded-xl backdrop-blur-sm"
                >
                  Zavolat +420 773 090 842
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sluzby;
