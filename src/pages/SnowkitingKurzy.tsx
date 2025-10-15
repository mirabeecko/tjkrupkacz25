import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Wind,
  Snowflake,
  Mountain,
  Users,
  Award,
  CheckCircle,
  Star,
  Calendar,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const meta = {
  title: "Kurzy Snowkitingu | Komáří Vížka",
  description:
    "Profesionální kurzy snowkitingu v Krušných horách. Naučte se létat na snowboardu nebo lyžích s drakem. Kurzy pro začátečníky i pokročilé.",
  keywords:
    "snowkiting, kurzy snowkitingu, Komáří Vížka, Krušné hory, zimní sporty, kite, drak, snowboard, lyže, adrenalin, outdoor, winter sports",
};

const levels = [
  {
    title: "Začátečník",
    subtitle: "PRVNÍ KROKY NA SNĚHU",
    duration: "2-3 dny",
    price: "4 500 Kč",
    icon: <Users className="w-12 h-12" />,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Ovládání draka na zemi",
      "Základy bezpečnosti",
      "První jízdy s drakem",
      "Teorie větru a počasí",
      "Kompletní zapůjčení vybavení",
    ],
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"
  },
  {
    title: "Pokročilý",
    subtitle: "ZLEPŠETE SVOU TECHNIKU",
    duration: "2 dny",
    price: "3 800 Kč",
    icon: <TrendingUp className="w-12 h-12" />,
    color: "from-purple-500 to-pink-500",
    features: [
      "Jízda ve vyšších rychlostech",
      "Jízda proti větru",
      "Skoky a triky",
      "Pokročilé ovládání draka",
      "Taktika a strategie",
    ],
    image: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800&q=80"
  },
  {
    title: "Expert",
    subtitle: "MISTROVSTVÍ NA SNĚHU",
    duration: "1-2 dny",
    price: "3 200 Kč",
    icon: <Award className="w-12 h-12" />,
    color: "from-orange-500 to-red-500",
    features: [
      "Extrémní podmínky",
      "Akrobatické prvky",
      "Big air skoky",
      "Závodní techniky",
      "Individuální coaching",
    ],
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80"
  },
];

const whyUs = [
  {
    icon: <Award className="w-8 h-8 text-blue-600" />,
    title: "Certifikovaní instruktoři",
    description: "Zkušení lektoři s mezinárodními certifikáty"
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Bezpečnost především",
    description: "Moderní vybavení a důraz na bezpečnostní pravidla"
  },
  {
    icon: <Mountain className="w-8 h-8 text-purple-600" />,
    title: "Ideální podmínky",
    description: "Krušné hory nabízejí perfektní terén a vítr"
  },
  {
    icon: <Users className="w-8 h-8 text-orange-600" />,
    title: "Malé skupiny",
    description: "Max 4 účastníci na instruktora pro osobní přístup"
  },
];

const SnowkitingKurzy = () => {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* HERO SECTION - Plná obrazovka */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80"
              alt="Snowkiting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
              <Wind className="w-16 h-16 animate-pulse" />
              <Snowflake className="w-16 h-16 animate-spin-slow" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight animate-fade-in-up">
              SNOWKITING
              <span className="block text-5xl md:text-7xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2">
                KURZY V KRUŠNÝCH HORÁCH
              </span>
            </h1>

            <p className="text-xl md:text-3xl mb-12 font-light max-w-4xl mx-auto animate-fade-in-up delay-100">
              Zažijte adrenalin snowkitingu s profesionálními instruktory
              <span className="block mt-2 text-cyan-400 font-semibold">Létejte na sněhu s drakem!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-200">
              <a href="#kurzy">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-12 py-8 text-xl rounded-2xl shadow-2xl hover:scale-105 transition-all">
                  <Calendar className="mr-3 w-6 h-6" />
                  Rezervovat kurz
                </Button>
              </a>
              <a href="#info">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-12 py-8 text-xl rounded-2xl backdrop-blur-sm bg-white/10">
                  <Zap className="mr-3 w-6 h-6" />
                  Zjistit více
                </Button>
              </a>
            </div>

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronRight className="w-8 h-8 rotate-90 text-white/70" />
            </div>
          </div>
        </section>

        {/* ÚVODNÍ SEKCE - Full Width */}
        <section id="info" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                CO JE <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">SNOWKITING</span>?
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Snowkiting je zimní sport, který kombinuje snowboarding nebo lyžování s ovládáním draka (kite).
                Vítr vás táhne po sněhu a umožňuje vám dosahovat vysokých rychlostí i spektakulárních skoků.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUs.map((item, idx) => (
                <Card key={idx} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all hover:scale-105">
                  <CardHeader>
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="p-4 bg-white rounded-2xl">
                        {item.icon}
                      </div>
                      <CardTitle className="text-white text-xl">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-center">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* KURZY SEKCE */}
        <section id="kurzy" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
                NAŠE <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">KURZY</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Vyberte si kurz podle vaší úrovně. Každý kurz je veden zkušenými instruktory s mezinárodními certifikáty.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {levels.map((level, idx) => (
                <Card
                  key={idx}
                  className={`overflow-hidden border-2 transition-all hover:scale-105 cursor-pointer ${
                    selectedLevel === idx ? 'border-blue-600 shadow-2xl' : 'border-gray-200 hover:border-blue-400'
                  }`}
                  onClick={() => setSelectedLevel(idx)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={level.image}
                      alt={level.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${level.color} opacity-80`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      {level.icon}
                      <h3 className="text-3xl font-black mt-4">{level.title}</h3>
                      <p className="text-sm font-semibold tracking-wider mt-2">{level.subtitle}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5" />
                        <span className="font-semibold">{level.duration}</span>
                      </div>
                      <div className="text-3xl font-black text-blue-600">
                        {level.price}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {level.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/kontakt">
                      <Button className={`w-full bg-gradient-to-r ${level.color} text-white font-bold py-6 text-lg hover:opacity-90 transition-opacity`}>
                        Rezervovat kurz
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bonusy */}
            <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 p-8">
              <div className="text-center">
                <Star className="w-16 h-16 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-black mb-4">V CENĚ KURZU</h3>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="flex flex-col items-center gap-3">
                    <Wind className="w-12 h-12" />
                    <p className="font-bold text-lg">Kompletní vybavení</p>
                    <p className="text-sm opacity-90">Kite, trapéz, helma, všechno zapůjčíme</p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Shield className="w-12 h-12" />
                    <p className="font-bold text-lg">Pojištění</p>
                    <p className="text-sm opacity-90">Úrazové pojištění v ceně kurzu</p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Award className="w-12 h-12" />
                    <p className="font-bold text-lg">Certifikát</p>
                    <p className="text-sm opacity-90">Po absolvování kurzu získáte certifikát</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* JAK TO FUNGUJE */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
                JAK TO <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">FUNGUJE</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Rezervace",
                  description: "Vyberte si kurz a termín, který vám vyhovuje. Kontaktujte nás telefonicky nebo e-mailem.",
                  icon: <Calendar className="w-12 h-12 text-blue-600" />
                },
                {
                  step: "02",
                  title: "Příprava",
                  description: "Před kurzem vás kontaktujeme s informacemi o počasí, vybavení a místě konání.",
                  icon: <CheckCircle className="w-12 h-12 text-green-600" />
                },
                {
                  step: "03",
                  title: "Kurz začína!",
                  description: "Přijeďte na místo, získáte vybavení a začneme s teorií a praxí na sněhu.",
                  icon: <Zap className="w-12 h-12 text-orange-600" />
                }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border-2 border-gray-100">
                    <div className="text-8xl font-black text-gray-100 absolute top-4 right-4">
                      {item.step}
                    </div>
                    <div className="relative z-10">
                      <div className="mb-6">{item.icon}</div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ChevronRight className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
                ČASTÉ <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">DOTAZY</span>
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "Potřebuji vlastní vybavení?",
                  a: "Ne, kompletní vybavení (kite, trapéz, helma) je součástí kurzu a zapůjčíme vám ho."
                },
                {
                  q: "Musím umět lyžovat nebo snowboardovat?",
                  a: "Ano, základní znalost lyžování nebo snowboardingu je nutná. Snowkiting staví na těchto dovednostech."
                },
                {
                  q: "Jaké jsou věkové limity?",
                  a: "Kurzy jsou vhodné pro účastníky od 12 let (s písemným souhlasem zákonného zástupce). Horní věková hranice není stanovena."
                },
                {
                  q: "Co když nebude vítr?",
                  a: "Kurz přesuneme na jiný termín s vhodnějšími podmínkami. Sledujeme předpověď a vždy vás včas informujeme."
                },
                {
                  q: "Mohu absolvovat kurz sám nebo jen ve skupině?",
                  a: "Nabízíme jak skupinové kurzy (max 4 osoby), tak individuální lekce. Cena se liší podle typu kurzu."
                }
              ].map((item, idx) => (
                <Card key={idx} className="border-2 border-gray-200 hover:border-blue-600 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.q}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* KONTAKT CTA - Full Width */}
        <section className="py-24 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <Wind className="w-20 h-20 mx-auto mb-8 animate-bounce" />
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              PŘIPRAVENI LÉTAT?
            </h2>
            <p className="text-2xl md:text-3xl mb-12 font-light">
              Rezervujte si svůj kurz snowkitingu ještě dnes
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
              <Link to="/kontakt" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100 font-black px-12 py-8 text-xl rounded-2xl shadow-2xl hover:scale-105 transition-all">
                  <Calendar className="mr-3 w-6 h-6" />
                  Rezervovat kurz
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Phone className="w-8 h-8 flex-shrink-0" />
                <div>
                  <p className="font-bold text-lg mb-1">Telefon</p>
                  <a href="tel:+420773090842" className="text-white/90 hover:text-white">+420 773 090 842</a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Mail className="w-8 h-8 flex-shrink-0" />
                <div>
                  <p className="font-bold text-lg mb-1">E-mail</p>
                  <a href="mailto:snowkiting@tjkrupka.cz" className="text-white/90 hover:text-white">snowkiting@tjkrupka.cz</a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <MapPin className="w-8 h-8 flex-shrink-0" />
                <div>
                  <p className="font-bold text-lg mb-1">Místo</p>
                  <p className="text-white/90">SkiAreál Komáří Vížka</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SnowkitingKurzy;
