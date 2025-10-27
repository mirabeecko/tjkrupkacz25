import React, { useState, useEffect } from "react";
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
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Heart,
  ThumbsUp,
  Clock,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const services = [
  {
    id: "snowkiting",
    title: "Snowkiting Kurzy",
    subtitle: "Létejte na sněhu s drakem",
    description: "Zažijte jedinečný adrenalin snowkitingu v srdci Krušných hor. Profesionální instruktoři vás naučí ovládat sílu větru a sněhu.",
    icon: Wind,
    cta: "Rezervovat kurz",
    link: "/snowkiting-kurzy",
    gradient: "from-cyan-500 via-blue-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Kvalifikovaní instruktoři s IKO certifikací",
      "Kompletní vybavení značky NORTH",
      "Max 4 účastníci na instruktora",
      "Ideální sněhové podmínky"
    ],
    featured: true,
    popular: true,
    price: "Od 4 500 Kč",
    duration: "2-3 dny",
    rating: 4.9,
    reviews: 156
  },
  {
    id: "pujcovna",
    title: "Půjčovna Motocyklů",
    subtitle: "Adrenalin na prémiových strojích KTM",
    description: "Prenájom prémiových enduro motocyklov KTM. Kompletná výstroj, inštruktáž a profesionálny servis v cene.",
    icon: Bike,
    cta: "Zobrazit motocykly",
    link: "/pujcovna",
    gradient: "from-orange-500 via-red-600 to-rose-600",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "KTM Freeride 350, Duke 390",
      "Profesionální technický servis",
      "Helma, bunda, rukavice zdarma",
      "Instruktáž a trasy v ceně"
    ],
    featured: true,
    price: "Od 2 500 Kč/den",
    duration: "Flexibilní",
    rating: 5.0,
    reviews: 89
  },
  {
    id: "lyzarsky-areal",
    title: "Lyžařský areál",
    subtitle: "Komáří Vížka - zimní ráj",
    description: "Moderní lyžařský areál s perfektně upravenými sjezdovkami pro rodiny i zkušené lyžaře. Lyžařská škola a půjčovna.",
    icon: Mountain,
    cta: "Zjistit více",
    link: "/komari-vizka",
    gradient: "from-purple-500 via-violet-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "5 km upravených sjezdovek",
      "Moderní vlekové systémy",
      "Dětská lyžařská škola",
      "Půjčovna lyží a snowboardů"
    ],
    price: "Od 350 Kč/den",
    duration: "Celá sezóna",
    rating: 4.7,
    reviews: 234
  },
  {
    id: "skoly",
    title: "Pro školy",
    subtitle: "Vzdělávání spojené se sportem",
    description: "Speciální programy pro školy - lyžařské kurzy, sportovní dny a vzdělávací aktivity v přírodě pod vedením zkušených pedagogů.",
    icon: School,
    cta: "Zjistit více",
    link: "/skoly",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Lyžařské kurzy dle ŠVP",
      "Certifikovaní pedagogové",
      "Bezpečné prostředí",
      "Dotované ceny pro školy"
    ],
    price: "Na dotaz",
    duration: "1-7 dní"
  },
  {
    id: "firmy",
    title: "Pro firmy",
    subtitle: "Teambuilding, který opravdu funguje",
    description: "Firemní akce a teambuildingy na míru v inspirativním prostředí Krušných hor. Posilte tým zábavnou formou.",
    icon: Briefcase,
    cta: "Firemní nabídka",
    link: "/firmy",
    gradient: "from-green-500 via-emerald-600 to-teal-600",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
    highlights: [
      "Outdoorové team building aktivity",
      "Catering a občerstvení na míru",
      "Moderátor a facilitátor",
      "Foto/video dokumentace"
    ],
    price: "Od 15 000 Kč",
    duration: "1-3 dny"
  },
  {
    id: "ubytovani",
    title: "Ubytování",
    subtitle: "Pohodlí v srdci hor",
    description: "Komfortní ubytování přímo v areálu nebo v blízkém okolí. Ideální zázemí pro sportovce, rodiny i firemní skupiny.",
    icon: Bed,
    cta: "Rezervovat pokoj",
    link: "/ubytovani",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Moderně vybavené pokoje",
      "50 m od svahu",
      "Snídaně formou bufetu",
      "Wi-Fi a parkování zdarma"
    ],
    price: "Od 800 Kč/noc",
    duration: "Min. 1 noc"
  },
  {
    id: "airbag",
    title: "AIRBAG",
    subtitle: "Bezpečnost na úplně nové úrovni",
    description: "Již brzy – nejmodernější airbag systém pro maximální ochranu při zimních i letních adrenalinových sportech.",
    icon: Shield,
    cta: "Předobjednat",
    link: "/airbag",
    gradient: "from-pink-500 via-rose-600 to-red-600",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Ochrana hlavy a páteře",
      "Automatické nafukování",
      "Certifikace EN 1621",
      "Dostupné od jara 2025"
    ],
    badge: "BRZY",
    price: "Coming soon",
    duration: "Celý rok"
  }
];

const testimonials = [
  {
    name: "Martin K.",
    text: "Nejlepší kurz snowkitingu, jaký jsem absolvoval. Instruktoři jsou top profesionálové!",
    rating: 5,
    service: "Snowkiting"
  },
  {
    name: "Petra S.",
    text: "KTM motorky jsou naprosto úžasné. Vybavení jako z výstavy, perfektní servis.",
    rating: 5,
    service: "Půjčovna"
  },
  {
    name: "Základní škola Teplice",
    text: "Skvělé zázemí pro lyžařský kurz. Děti byly nadšené, my spokojení. Určitě se vrátíme!",
    rating: 5,
    service: "Pro školy"
  }
];

const Sluzby = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [countUp, setCountUp] = useState({ years: 0, clients: 0, rating: 0 });

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  const featuredServices = services.filter(s => s.featured);
  const otherServices = services.filter(s => !s.featured);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Count up animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCountUp({
        years: Math.floor(15 * progress),
        clients: Math.floor(1000 * progress),
        rating: Math.min(4.9, 4.9 * progress)
      });

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title="Naše služby | TJ Krupka"
        description="Kompletní nabídka služeb - snowkiting kurzy, půjčovna motocyklů, lyžařský areál, programy pro školy a firmy, ubytování a mnoho dalšího."
        keywords="služby, snowkiting, půjčovna motocyklů, lyžařský areál, teambuilding, ubytování, Krušné hory"
        url="https://tjkrupka.cz/sluzby"
      />

      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* EPIC HERO SECTION with Parallax */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Parallax Background Image */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop"
              alt="Krušné hory"
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-full border border-yellow-500/30 animate-[fade-in_1s_ease-out]">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-100 tracking-wide">PRÉMIOVÉ SLUŽBY V KRUŠNÝCH HORÁCH</span>
            </div>

            {/* Main Heading with gradient animation */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none animate-[fade-in-up_1s_ease-out_0.2s_both]">
              <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                Zážitky,
              </span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                které nezapomenete
              </span>
            </h1>

            {/* Powerful Subtitle */}
            <p className="text-2xl md:text-4xl mb-12 font-light leading-relaxed animate-[fade-in-up_1s_ease-out_0.4s_both] text-blue-100">
              Adrenalin. Příroda. Profesionalita.
              <span className="block mt-3 text-white font-semibold">Vše na jednom místě.</span>
            </p>

            {/* Social Proof Pills */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 animate-[fade-in-up_1s_ease-out_0.6s_both]">
              <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-white">{countUp.rating.toFixed(1)}/5.0</span>
                <span className="text-white/70">·</span>
                <span className="text-white/90">479 recenzí</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                <Users className="w-5 h-5 text-green-400" />
                <span className="font-bold text-white">{countUp.clients.toLocaleString()}+</span>
                <span className="text-white/90">spokojených klientů</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-white">{countUp.years}+</span>
                <span className="text-white/90">let zkušeností</span>
              </div>
            </div>

            {/* Epic CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-[fade-in-up_1s_ease-out_0.8s_both]">
              <a href="#featured">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:via-cyan-500 hover:to-blue-500 text-white font-black text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Prozkoumat služby
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </a>
              <a href="tel:+420773090842">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold text-xl px-12 py-8 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="mr-3 w-6 h-6" />
                  Zavolat +420 773 090 842
                </Button>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* FEATURED SERVICES - Premium Large Cards */}
        <section id="featured" className="py-32 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-orange-100 rounded-full">
                <Zap className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-orange-900">NEJOBLÍBENĚJŠÍ</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
                Naše <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">hvězdné</span> služby
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Nejžádanější aktivity s nejlepším hodnocením od našich klientů
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {featuredServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="group relative overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 border border-gray-100"
                  >
                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute top-6 right-6 z-20 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse">
                        <span className="text-xs font-black text-white tracking-wide flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          NEJPRODÁVANĚJŠÍ
                        </span>
                      </div>
                    )}

                    {/* Image Section with Epic Overlay */}
                    <div className="relative h-96 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-700`} />

                      {/* Floating Icon Badge */}
                      <div className="absolute top-8 left-8 p-5 bg-white/25 backdrop-blur-2xl rounded-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                        <Icon className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">
                              {service.title}
                            </h3>
                            <p className="text-white/90 text-xl font-semibold">{service.subtitle}</p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(service.rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-white/30'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-white font-bold text-lg">{service.rating}</span>
                          <span className="text-white/70">({service.reviews} recenzí)</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-10">
                      <p className="text-gray-700 text-xl mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Highlights Grid */}
                      <div className="grid grid-cols-1 gap-4 mb-8">
                        {service.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl group/item hover:bg-blue-50 transition-colors">
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                            <span className="text-base text-gray-800 font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price & Duration */}
                      <div className="flex items-center justify-between mb-8 p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                        <div>
                          <div className="text-sm text-gray-600 mb-1 font-medium">Cena</div>
                          <div className="text-3xl font-black text-blue-600">{service.price}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1 font-medium">Trvání</div>
                          <div className="text-xl font-bold text-gray-900">{service.duration}</div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link to={service.link}>
                        <Button
                          className={`w-full bg-gradient-to-r ${service.gradient} text-white font-black text-xl py-7 rounded-2xl hover:shadow-2xl transition-all duration-300 group/btn hover:scale-[1.02]`}
                        >
                          {service.cta}
                          <ArrowRight className="ml-3 w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF - Testimonials */}
        <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 rounded-full">
                <Heart className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-900">CO ŘÍKAJÍ NAŠI KLIENTI</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
                Přes <span className="text-blue-600">1000+ spokojených</span> zákazníků
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.service}</div>
                    </div>
                    <ThumbsUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OTHER SERVICES - Compact Premium Cards */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Kompletní <span className="text-blue-600">nabídka</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Další skvělé služby pro školy, firmy i individuální návštěvníky
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.id}
                    to={service.link}
                    className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                  >
                    {/* Badge */}
                    {service.badge && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full shadow-lg">
                        <span className="text-xs font-black text-white tracking-wide">{service.badge}</span>
                      </div>
                    )}

                    {/* Compact Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-80 group-hover:opacity-90 transition-opacity`} />

                      {/* Icon */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-black text-center px-4 drop-shadow-lg">{service.title}</h3>
                        <p className="text-white/90 text-sm font-semibold mt-2">{service.subtitle}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Mini highlights */}
                      <div className="space-y-2 mb-5">
                        {service.highlights.slice(0, 3).map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-xs text-gray-700 font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Cena</div>
                          <div className="text-lg font-black text-blue-600">{service.price}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">Trvání</div>
                          <div className="text-sm font-bold text-gray-900">{service.duration}</div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                        <span className={`font-bold text-lg bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
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

        {/* URGENCY/SCARCITY Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
          <div className="max-w-5xl mx-auto text-center text-white">
            <Clock className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Omezená kapacita!
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Zimní sezóna se rychle zaplňuje. Rezervujte si své místo ještě dnes a získejte
              <span className="block mt-2 text-3xl font-black">10% slevu při rezervaci online!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 font-black text-2xl px-12 py-8 rounded-2xl shadow-2xl hover:scale-105 transition-all"
                >
                  Rezervovat teď
                  <ArrowRight className="ml-3 w-7 h-7" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL EPIC CTA */}
        <section className="relative py-32 px-4 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <Sparkles className="w-20 h-20 text-yellow-400 mx-auto mb-8 animate-pulse" />

            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Připraveni na
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                nezapomenutelný zážitek?
              </span>
            </h2>

            <p className="text-2xl md:text-3xl text-blue-200 mb-16 leading-relaxed font-light">
              Kontaktujte nás ještě dnes a my vám připravíme program
              <span className="block mt-2 text-white font-semibold">přesně na míru vašim představám</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/kontakt">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-black text-2xl px-14 py-9 rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
                >
                  Napište nám
                  <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <a href="tel:+420773090842">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-3 border-white/50 text-white hover:bg-white hover:text-blue-900 font-black text-2xl px-14 py-9 rounded-2xl backdrop-blur-xl transition-all hover:scale-105"
                >
                  <Phone className="mr-3 w-7 h-7" />
                  +420 773 090 842
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Okamžitá odpověď</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Bez skrytých poplatků</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>100% spokojenost</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sluzby;
