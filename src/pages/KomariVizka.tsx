import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollAnimation from "@/components/ScrollAnimation";
import { supabase } from '@/supabaseClient';
import { MapPin, ArrowRight, Users, Bike, Coffee, Map as MapIcon, Clock, Mountain, Bird, Home, Shield, GraduationCap, Sparkles, ChevronRight, Star, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Vlek {
  id: number;
  name: string;
  elevation: number;
  long: number;
  "gps start": string;
  "gps end": string;
  unasedel: number;
  unasecu: number;
  vykon_motoru: string;
  "max.rychlost": string;
  created_at: string;
}

const KomariVizka = () => {
  const [vleky, setVleky] = useState<Vlek[]>([]);
  const [vlekyLoading, setVlekyLoading] = useState(true);
  const [places, setPlaces] = useState<any[]>([]);
  const [placesLoading, setPlacesLoading] = useState(true);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    async function fetchVleky() {
      try {
        const { data, error } = await supabase
          .from('vleky')
          .select('*');

        if (error) {
          console.error('Error fetching vleky:', error);
        } else {
          setVleky(data || []);
        }
      } catch (error) {
        console.error('Error fetching vleky:', error);
      } finally {
        setVlekyLoading(false);
      }
    }

    async function fetchPlaces() {
      try {
        const { data, error } = await supabase
          .from('places')
          .select('id, name, img_url, popis, address, web_url, map_url, phone, email, vzdalenost_km, category, tags');
        if (error) {
          console.error('Error fetching places:', error);
        } else {
          setPlaces(data || []);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setPlacesLoading(false);
      }
    }

    fetchVleky();
    fetchPlaces();
  }, []);

  const highlights = [
    {
      icon: <Mountain className="h-8 w-8" />,
      title: "800-900 m n.m.",
      description: "Výška areálu",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Celoroční provoz",
      description: "Léto i zima",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Pro všechny úrovně",
      description: "Od začátečníků po profíky",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Moderní zázemí",
      description: "Vleky, bistro, ubytování",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const services = [
    {
      icon: <Bike className="h-6 w-6" />,
      title: "Trailpark Komárka",
      description: "Udržované traily pro všechny úrovně. Single tracky, technické sjezdy i rodinné stezky.",
      link: "/sporty",
      buttonText: "Sportovní aktivity",
      gradient: "from-purple-600 to-indigo-600",
      hoverGradient: "from-purple-700 to-indigo-700"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Dobrovolnické programy",
      description: "Přidejte se k nám při budování trailů nebo jako instruktoři. Získejte slevy a výhody.",
      link: "/dobrovolnici",
      buttonText: "Přidat se k týmu",
      gradient: "from-amber-500 to-orange-500",
      hoverGradient: "from-amber-600 to-orange-600"
    }
  ];

  const facilities = [
    {
      title: "Jízdenky",
      icon: <ArrowRight className="h-6 w-6" />,
      description: "Zakupte si jízdenky na vleky online. Nabízíme výhodné celodenní, polodenní a bodové jízdné.",
      link: "/pripravujeme",
      buttonText: "Koupit jízdenky",
      gradient: "from-blue-600 to-indigo-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Ubytování",
      icon: <Home className="h-6 w-6" />,
      description: "Komfortní pokoje s výhledem do Krušných hor. Ideální pro víkendové pobyty i skupiny.",
      link: "/sluzby#ubytovani",
      buttonText: "Rezervovat pobyt",
      gradient: "from-purple-600 to-indigo-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Bistro",
      icon: <Coffee className="h-6 w-6" />,
      description: "Občerstvení přímo v areálu. Teplá jídla, čerstvé bagety, dezerty a nápoje.",
      link: "/sluzby#bistro",
      buttonText: "Prohlédnout menu",
      gradient: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Komáří vížka - Sportovní areál v Krušných horách"
        description="Moderní sportovní areál v Krušných horách. Trailpark, lyžařský areál, ubytování a bistro. Celoroční provoz pro rodiny i sportovce."
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section - Vylepšený */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image s paralaxou */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/images/sluzby/komarka.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-purple-900/40"></div>
          </div>

          {/* Animated Particles - Vylepšené */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
                  animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          <div className="container relative z-20 px-4 py-20">
            <ScrollAnimation animation="fade-up" delay={200}>
              <div className="max-w-5xl mx-auto text-center text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-semibold">Krušné hory</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                    Areál
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                    Komáří vížka
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-3xl mb-12 font-semibold text-white/95 drop-shadow-lg max-w-3xl mx-auto">
                  Nově letní i zimní provoz v srdci Krušných hor
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                  {highlights.map((item, index) => (
                    <ScrollAnimation key={index} animation="fade-up" delay={400 + index * 100}>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${item.color} mb-3 shadow-lg`}>
                          {item.icon}
                        </div>
                        <h3 className="font-bold text-lg md:text-xl mb-1">{item.title}</h3>
                        <p className="text-sm md:text-base text-white/80">{item.description}</p>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>

                {/* CTA Buttons */}
                <ScrollAnimation animation="fade-up" delay={800}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <Link to="/sluzby">
                      <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
                        Prozkoumat služby
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="#mapa">
                      <Button size="lg" variant="outline" className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 font-bold text-lg px-8 py-6 rounded-xl">
                        <MapIcon className="mr-2 h-5 w-5" />
                        Zobrazit mapu
                      </Button>
                    </Link>
                  </div>
                </ScrollAnimation>
              </div>
            </ScrollAnimation>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Úvodní text - Vylepšený */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-tjk-blue to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Mountain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-tjk-blue mb-4">
                        Objevte krásu Krušných hor
                      </h2>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        Komáří vížka leží ve výšce <strong>800–900 m n. m.</strong>, obklopena hustými smrkovými lesy a zvlněnými loukami Krušných hor. Výhledy sahají k českoněmecké hranici a nejvyššímu vrcholu Klínovec. Areál nabízí <strong>celoroční vyžití</strong> pro sportovce všech úrovní.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* Mapa - Vylepšená */}
          <ScrollAnimation animation="fade-up">
            <section id="mapa" className="mb-20">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Kde nás najdete
                </h2>
                <p className="text-lg text-gray-600">
                  Areál Komáří vížka, Krušné hory
                </p>
              </div>
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20334.990979076266!2d13.81428368599375!3d50.676307072674574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709ff62287d0415%3A0x4cb0aa2f30c44b43!2zS29tw6HFmcOtIHbDrcW-a2E!5e0!3m2!1scs!2scz!4v1715704057041!5m2!1scs!2scz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa areálu Komáří vížka"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </section>
          </ScrollAnimation>

          {/* Služby - Vylepšené karty */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-tjk-orange h-full">
                    <CardHeader className="bg-gradient-to-br from-gray-50 to-white pb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 bg-gradient-to-br ${service.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {React.cloneElement(service.icon, { className: "h-6 w-6 text-white" })}
                        </div>
                        <CardTitle className="text-2xl text-tjk-blue group-hover:text-tjk-orange transition-colors">
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 pb-4">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link to={service.link} className="w-full">
                        <Button className={`w-full bg-gradient-to-r ${service.gradient} hover:${service.hoverGradient} text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg group-hover:scale-[1.02]`}>
                          {service.buttonText}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </section>

          {/* Facilities - 3 karty */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <ScrollAnimation animation="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Naše služby
                </h2>
                <p className="text-lg text-gray-600">
                  Vše, co potřebujete pro skvělý den v horách
                </p>
              </ScrollAnimation>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {facilities.map((facility, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-tjk-blue h-full flex flex-col">
                    <CardHeader className="bg-gradient-to-br from-gray-50 to-white">
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${facility.iconBg} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                        {React.cloneElement(facility.icon, { className: `h-6 w-6 ${facility.iconColor}` })}
                      </div>
                      <CardTitle className="text-2xl text-tjk-blue group-hover:text-tjk-orange transition-colors">
                        {facility.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        {facility.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link to={facility.link} className="w-full">
                        <Button className={`w-full bg-gradient-to-r ${facility.gradient} text-white font-semibold py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
                          {facility.buttonText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </section>

          {/* Nabídka pro školy - Vylepšený design */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <Card className="overflow-hidden border-2 border-blue-200 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-8 md:p-12 flex items-center justify-center">
                    <img
                      src="/src/loga/komárek.png"
                      alt="Logo Komárek"
                      className="max-h-72 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <GraduationCap className="h-8 w-8 text-tjk-blue" />
                      </div>
                      <Badge className="bg-blue-100 text-tjk-blue text-sm font-semibold px-3 py-1">
                        Pro školy
                      </Badge>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-tjk-blue mb-4">
                      Zážitkové dny na Komáří vížce
                    </h2>
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      Hledáte originální program pro školní výlet, adaptační kurz nebo sportovní den? Nabízíme <strong>bezpečné a zábavné aktivity v přírodě</strong> pod vedením zkušených instruktorů.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Připravíme program na míru – cyklistika, hry v přírodě, environmentální workshopy, orientační běh, první pomoc a mnoho dalšího. Vše v krásném prostředí s možností stravování a ubytování.
                    </p>
                    <Link to="/sluzby#skoly">
                      <Button className="bg-gradient-to-r from-tjk-blue to-cyan-600 hover:from-tjk-blue/90 hover:to-cyan-600/90 text-white font-semibold px-6 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Více o programech
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollAnimation>

          {/* Trailpark pro školy */}
          <ScrollAnimation animation="fade-up">
            <section>
              <Card className="overflow-hidden border-2 border-orange-200 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="flex-1 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-8 md:p-12 flex items-center justify-center">
                    <img
                      src="/src/loga/TRAILPARKKomarkaLOGO.png"
                      alt="Logo Trailpark Komárka"
                      className="max-h-72 w-auto object-contain drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <Bike className="h-8 w-8 text-orange-600" />
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1">
                        Sportovní programy
                      </Badge>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-4">
                      Pohyb, zábava, bezpečí pro školy
                    </h2>
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      Přiveďte své žáky do našeho sportovního areálu! Naučíme děti i teenagery <strong>základy bezpečné jízdy na kole</strong>, správné chování v terénu a týmovou spolupráci.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Programy vedou certifikovaní bike instruktoři. K dispozici je půjčovna kol, zázemí i občerstvení. Ideální pro sportovní dny, školy v přírodě i adaptační kurzy.
                    </p>
                    <Link to="/sluzby#skoly">
                      <Button className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold px-6 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Rezervovat termín
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollAnimation>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default KomariVizka;
