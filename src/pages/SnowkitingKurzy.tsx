import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { supabase } from "@/supabaseClient";
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

interface KurzData {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  features: string[];
  image: string;
  color?: string;
  level_order?: number;
}

const defaultLevels = [
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
    title: "Profesionální instruktoři",
    description: "Zkušení lektoři s mezinárodními kvalifikacemi"
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
  const [levels, setLevels] = useState<any[]>(defaultLevels);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKurzy() {
      try {
        console.log('🔍 Začínám načítat kurzy z Supabase...');
        const { data, error } = await supabase
          .from('kurzy_nabidka')
          .select('*')
          .eq('aktivni', true);

        console.log('📊 Data z databáze:', data);
        console.log('❌ Chyba:', error);

        if (error) {
          console.error('Chyba při načítání kurzů:', error);
          setLevels(defaultLevels);
        } else if (data && data.length > 0) {
          console.log('✅ Načteno kurzů:', data.length);
          // Mapujeme data z databáze na náš formát
          const levelsWithIcons = data.map((kurz: any, index: number) => {
            let icon, color;
            const jmeno = kurz.jmeno_kurzu.toLowerCase();

            // Určíme ikonu a barvu podle názvu kurzu
            if (jmeno.includes('intro') || jmeno.includes('flyday') || jmeno.includes('kids')) {
              icon = <Users className="w-12 h-12" />;
              color = "from-blue-500 to-cyan-500";
            } else if (jmeno.includes('freeride') || jmeno.includes('progress')) {
              icon = <TrendingUp className="w-12 h-12" />;
              color = "from-purple-500 to-pink-500";
            } else if (jmeno.includes('expedition') || jmeno.includes('backcountry')) {
              icon = <Award className="w-12 h-12" />;
              color = "from-orange-500 to-red-500";
            } else {
              icon = <Mountain className="w-12 h-12" />;
              color = "from-green-500 to-teal-500";
            }

            // Převedeme obsah kurzu na array features
            const features = kurz.obsah_kurzu
              ? kurz.obsah_kurzu.split(',').map((f: string) => f.trim())
              : [];

            // Přidáme "V ceně" items
            if (kurz.v_cene) {
              const vceneItems = kurz.v_cene.split(',').map((f: string) => f.trim());
              features.push(...vceneItems);
            }

            return {
              id: kurz.id,
              title: kurz.jmeno_kurzu,
              subtitle: kurz.subtitle || "SNOWKITING KURZ",
              duration: kurz.doba_trvani || 'Dle dohody',
              price: `${kurz.cena_czk} Kč`,
              features: features.slice(0, 5), // Max 5 features pro zobrazení
              image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80", // Default image
              icon,
              color,
            };
          });
          setLevels(levelsWithIcons);
        } else {
          setLevels(defaultLevels);
        }
      } catch (err) {
        console.error('Neočekávaná chyba:', err);
        setLevels(defaultLevels);
      } finally {
        setLoading(false);
      }
    }

    fetchKurzy();
  }, []);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* HERO SECTION - Plná obrazovka */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 w-full px-4">
            <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-sm rounded-full p-2">
              <div className="flex justify-center items-center gap-2">
                <a href="#kurzy" className="text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Naše kurzy</a>
                <a href="#info" className="text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Co je snowkiting?</a>
                <a href="#proc-kurz" className="text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Proč u nás</a>
                <a href="#jak-to-funguje" className="text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Jak to funguje</a>
                <a href="#faq" className="text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">FAQ</a>
                <a href="#pripraven" className="text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors">Připraven?</a>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-0">
            <img
              src="/images/snowkiting/jj_kom_jump.jpg"
              alt="Snowkiting v Krušných horách"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
              <Wind className="w-16 h-16 animate-pulse" />
              <Snowflake className="w-16 h-16 animate-spin-slow" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tight animate-fade-in-up">
              SNOWKITING
              <span className="block text-4xl sm:text-5xl md:text-7xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2">
                KURZY V KRUŠNÝCH HORÁCH
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-12 font-light max-w-4xl mx-auto animate-fade-in-up delay-100 text-white">
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
        <section id="info" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                CO JE <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">SNOWKITING</span>?
              </h2>
              <p className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Snowkiting je zimní sport, který kombinuje snowboarding nebo lyžování s ovládáním draka (kite).
                Vítr vás táhne po sněhu a umožňuje vám dosahovat vysokých rychlostí i spektakulárních skoků.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUs.map((item, idx) => (
                <Card key={idx} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all hover:scale-105 p-6">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-3 bg-white rounded-full mb-2">
                      {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                    </div>
                    <CardTitle className="text-white text-lg font-bold">{item.title}</CardTitle>
                    <p className="text-gray-300 text-center text-sm">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* KURZY SEKCE */}
        <section id="kurzy" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                NAŠE <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">KURZY</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Vyberte si kurz podle vaší úrovně a doby trvání. Každý kurz je veden zkušenými instruktory s mezinárodními kvalifikacemi.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
              </div>
            ) : (
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

                      <Link to="/kontakt-snowkiting">
                        <Button className={`w-full bg-gradient-to-r ${level.color} text-white font-bold py-6 text-lg hover:opacity-90 transition-opacity`}>
                          Rezervovat kurz
                          <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="proc-kurz" className="relative py-16 md:py-20 bg-white text-gray-800 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-stretch">
              <div className="max-w-xl">
                <div className="text-left mb-8">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                    Proč kurz u nás?
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600">
                    Poskytneme vám vše, co potřebujete pro bezpečný a zábavný start
                  </p>
                </div>

                <div className="grid gap-6">
                  {[
                    "Profesionální instruktoři s letitou zkušeností",
                    "Kvalitní výukový materiál a bezpečnostní vybavení",
                    "Malé skupiny pro individuální přístup",
                    "Praxe na sněhu v Krušných horách - Komáří Vížka, Fojtovice, Petrovice",
                    "Potvrzení o absolvování kurzu"
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-800">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link to="/kontakt-snowkiting">
                    <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg px-8 py-5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                      <Calendar className="mr-2 h-5 w-5" />
                      Chci začít!
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img src="/images/snowkiting/jj_top_ride_promo.jpg" alt="Snowkiting promo" className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
                </section>

        {/* EQUIPMENT SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Naše <span className="text-blue-600">špičkové vybavení</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Sázíme na kvalitu a bezpečnost. Proto je naše škola vybavena nejmodernějšími kity a vybavením od renomované německé značky Flysurfer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-2xl p-8">
                <img src="/images/vybaveni/peak.jpg" alt="Flysurfer PEAK6" className="w-full h-auto object-contain mb-4"/>
                <h3 className="text-2xl font-bold text-tjk-blue">Flysurfer PEAK6</h3>
                <p className="text-gray-600 mb-4">Ultralehký single-skin kite, ideální pro snowkiting a touring ve slabém větru.</p>
                <ul className="space-y-2 text-gray-700">                  
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Maximální bezpečnost díky B-Safe systému</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Neuvěřitelný výkon ve slabém větru</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Extrémně lehký a sbalitelný</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <img src="/images/vybaveni/soul.jpg" alt="Flysurfer SOUL" className="w-full h-auto object-contain mb-4"/>
                <h3 className="text-2xl font-bold text-tjk-blue">Flysurfer SOUL</h3>
                <p className="text-gray-600 mb-4">Univerzální closed-cell foil kite pro freeride a big air s obrovským větrným rozsahem.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Inspirující stabilita a intuitivní ovládání</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Působivý výkon ve skocích a big air</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Snadný start a restartovatelnost</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gray-50 rounded-2xl p-8 max-w-3xl mx-auto">
                <img src="/images/vybaveni/bar.jpg" alt="Flysurfer Connect 3 Bar" className="w-full h-auto object-contain mb-4"/>
                <h3 className="text-2xl font-bold text-tjk-blue">Flysurfer Connect 3 Control Bar</h3>
                <p className="text-gray-600 mb-4">Univerzální a bezpečný bar s přepínatelným bezpečnostním systémem pro maximální kontrolu.</p>
              </div>
            </div>

            {/* FEATURE FLAG: Půjčovna CTA - pro obnovení změň ENABLE_PUJCOVNA na true v src/config/features.ts */}
            {/* <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-tjk-blue mb-2">Chcete si vybavení vyzkoušet?</h3>
              <p className="text-gray-600 mb-4">Veškeré vybavení naší školy si můžete také zapůjčit v naší půjčovně.</p>
              <Link to="/pujcovna">
                <Button size="lg" className="bg-tjk-orange hover:bg-orange-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Přejít do půjčovny
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div> */}
          </div>
        </section>
        <section id="jak-to-funguje" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden">
              <img src="/images/snowkiting/jj_vrtule.jpg" alt="Snowkiting vrtule" className="w-full h-full object-cover"/>
            </div>
            <div className="px-4">
              <div className="text-left mb-8">
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                  JAK TO <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">FUNGUJE</span>
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Rezervace",
                    description: "Vyberte si kurz a termín, který vám vyhovuje. Kontaktujte nás telefonicky nebo e-mailem.",
                    icon: <Calendar className="w-8 h-8 text-blue-600" />
                  },
                  {
                    step: "02",
                    title: "Příprava",
                    description: "Před kurzem vás kontaktujeme s informacemi o počasí, vybavení a místě konání.",
                    icon: <CheckCircle className="w-8 h-8 text-green-600" />
                  },
                  {
                    step: "03",
                    title: "Kurz začína!",
                    description: "Přijeďte na místo, získáte vybavení a začneme s teorií a praxí na sněhu.",
                    icon: <Zap className="w-8 h-8 text-orange-600" />
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-black text-blue-200">{item.step}</div>
                      <div className="mt-2">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RYCHLÝ DOTAZ */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <Card className="border-2 border-blue-300 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Mail className="w-6 h-6" />
                  Máte dotaz? Napište nám!
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center text-gray-600 mb-4">
                  Neváhejte se na nás obrátit s jakýmkoliv dotazem ohledně kurzů snowkitingu
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/kontakt-snowkiting">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Mail className="mr-2 w-5 h-5" />
                      Kontaktní formulář
                    </Button>
                  </Link>
                  <a href="tel:+420773090842">
                    <Button size="lg" variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Phone className="mr-2 w-5 h-5" />
                      Zavolat (+420 773 090 842)
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
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
        <section id="pripraven" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
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
              <Link to="/kontakt-snowkiting" className="w-full sm:w-auto">
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
                  <p className="text-white/90">Komáří Vížka, Fojtovice, Petrovice</p>
                </div>
              </div>
            </div>
          </div>
                </section>
        
                {/* ZAPAD SLUNCE SECTION */}
                <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/snowkiting/jj_zapad.jpg')" }}>
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
                    <h2 className="text-4xl md:text-6xl font-black drop-shadow-2xl">Svoboda na dosah</h2>
                    <p className="text-xl md:text-2xl mt-4 max-w-2xl drop-shadow-lg">Zažijte pocit, kdy se vítr stane vaším motorem a hory vaším hřištěm.</p>
                  </div>
                </section>
        
              </main>

      <Footer />
    </div>
  );
};

export default SnowkitingKurzy;
