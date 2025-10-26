import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollAnimation from "@/components/ScrollAnimation";
import { supabase } from '@/supabaseClient';
import { MapPin, ArrowRight, Users, Bike, Coffee, Map as MapIcon, Clock, Mountain, Bird, Home, Shield, GraduationCap, Sparkles, ChevronRight, Star, Award, Target, Phone } from "lucide-react";
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
        {/* Hero Section - Dechberoucí */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image s paralaxou */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/images/homepage/okoli.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-transparent to-blue-900/30"></div>
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
                <p className="text-xl md:text-3xl mb-12 font-semibold text-white/95 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
                  Kde se snoubí divoká příroda s adrenalinem,<br className="hidden md:block" />
                  klid hor s rytmem sportu a každá návštěva zanechává stopy v srdci
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
          {/* Úvodní text - Vylepšený profesionálně */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-3xl p-10 md:p-14 shadow-2xl border-2 border-blue-200 overflow-hidden hover:shadow-blue-500/20 transition-all duration-500">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-8">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-tjk-blue to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <Mountain className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full mb-3">
                          <Sparkles className="h-4 w-4 text-tjk-blue" />
                          <span className="text-sm font-semibold text-tjk-blue">800-900 m n.m.</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-5 leading-tight">
                          Perlou Krušných hor
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4">
                          Ve výšce <strong className="text-tjk-blue">800–900 metrů nad mořem</strong> se rozprostírá místo, kde čas zpomaluje a dech se zatajuje. Obklopena nekonečnými smrkovými lesy a zvlněnými loukami, <strong className="text-tjk-orange">Komáří vížka</strong> je místem, kde se setkává nebe se zemí.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          Výhledy sahají k českoněmecké hranici, k majestátnímu Klínovci a za ním k horizontu, který láká k dobrodružství. Ať už jste začátečník hledající první zážitky, nebo profík toužící po adrenalinových výzvách – <strong className="text-tjk-blue">tady najdete svůj domov v horách</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* Mapa - Vylepšená profesionálně */}
          <ScrollAnimation animation="fade-up">
            <section id="mapa" className="mb-20">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 backdrop-blur-md border border-green-300 rounded-full mb-4">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">Lokace</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Kde nás najdete
                </h2>
                <p className="text-lg text-gray-600">
                  Areál Komáří vížka, Krušné hory
                </p>
              </div>
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-200 hover:border-tjk-blue transition-all duration-500">
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

          {/* Služby - Vylepšené profesionálně */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <ScrollAnimation animation="fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 backdrop-blur-md border border-purple-300 rounded-full mb-4">
                  <Star className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">Aktivity</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Co u nás zažijete
                </h2>
                <p className="text-lg text-gray-600">
                  Sportovní aktivity pro každého
                </p>
              </ScrollAnimation>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {services.map((service, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-tjk-orange h-full hover:-translate-y-2">
                    <CardHeader className="bg-gradient-to-br from-gray-50 to-white pb-6">
                      <div className="flex items-center gap-5">
                        <div className={`p-5 bg-gradient-to-br ${service.gradient} rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          {React.cloneElement(service.icon, { className: "h-7 w-7 text-white" })}
                        </div>
                        <CardTitle className="text-2xl md:text-3xl font-extrabold text-tjk-blue group-hover:text-tjk-orange transition-colors">
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 pb-6">
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link to={service.link} className="w-full">
                        <Button className={`w-full bg-gradient-to-r ${service.gradient} hover:${service.hoverGradient} text-white font-bold py-6 md:py-7 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-lg md:text-xl group-hover:scale-[1.02]`}>
                          {service.buttonText}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </section>

          {/* Facilities - 3 karty profesionálně */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <ScrollAnimation animation="fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 backdrop-blur-md border border-amber-300 rounded-full mb-4">
                  <Coffee className="h-5 w-5 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">Zázemí</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Naše služby
                </h2>
                <p className="text-lg text-gray-600">
                  Vše, co potřebujete pro skvělý den v horách
                </p>
              </ScrollAnimation>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {facilities.map((facility, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-tjk-blue h-full flex flex-col hover:-translate-y-2">
                    <CardHeader className="bg-gradient-to-br from-gray-50 to-white pb-6">
                      <div className={`inline-flex items-center justify-center w-20 h-20 ${facility.iconBg} rounded-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                        {React.cloneElement(facility.icon, { className: `h-8 w-8 ${facility.iconColor}` })}
                      </div>
                      <CardTitle className="text-2xl md:text-3xl font-extrabold text-tjk-blue group-hover:text-tjk-orange transition-colors">
                        {facility.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 flex-1">
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        {facility.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link to={facility.link} className="w-full">
                        <Button className={`w-full bg-gradient-to-r ${facility.gradient} text-white font-bold py-5 md:py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-base md:text-lg`}>
                          {facility.buttonText}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </section>

          {/* Nabídka pro školy - Profesionálně vylepšený */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <Card className="overflow-hidden border-2 border-blue-300 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-10 md:p-16 flex items-center justify-center relative overflow-hidden">
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-300/20 rounded-full blur-3xl"></div>
                    <img
                      src="/src/loga/komárek.png"
                      alt="Logo Komárek"
                      className="max-h-80 w-auto object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500 relative z-10"
                    />
                  </div>
                  <div className="flex-1 p-10 md:p-14">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-tjk-blue to-cyan-600 rounded-2xl shadow-xl">
                        <GraduationCap className="h-10 w-10 text-white" />
                      </div>
                      <Badge className="bg-blue-100 text-tjk-blue text-base font-bold px-4 py-2">
                        Pro školy
                      </Badge>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-tjk-blue mb-5 leading-tight">
                      Zážitkové dny na Komáří vížce
                    </h2>
                    <p className="text-xl text-gray-700 mb-5 leading-relaxed">
                      Hledáte originální program pro školní výlet, adaptační kurz nebo sportovní den? Nabízíme <strong className="text-tjk-blue">bezpečné a zábavné aktivity v přírodě</strong> pod vedením zkušených instruktorů.
                    </p>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Připravíme program na míru – cyklistika, hry v přírodě, environmentální workshopy, orientační běh, první pomoc a mnoho dalšího. Vše v krásném prostředí s možností stravování a ubytování.
                    </p>
                    <Link to="/sluzby#skoly">
                      <Button className="bg-gradient-to-r from-tjk-blue to-cyan-600 hover:from-tjk-blue/90 hover:to-cyan-600/90 text-white font-bold px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg">
                        Více o programech
                        <ChevronRight className="ml-2 h-6 w-6" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollAnimation>

          {/* Trailpark pro školy - Profesionálně vylepšený */}
          <ScrollAnimation animation="fade-up">
            <section>
              <Card className="overflow-hidden border-2 border-orange-300 shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="flex-1 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-10 md:p-16 flex items-center justify-center relative overflow-hidden">
                    {/* Decorative background */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-300/20 rounded-full blur-3xl"></div>
                    <img
                      src="/src/loga/TRAILPARKKomarkaLOGO.png"
                      alt="Logo Trailpark Komárka"
                      className="max-h-80 w-auto object-contain drop-shadow-2xl rounded-2xl hover:scale-110 transition-transform duration-500 relative z-10"
                    />
                  </div>
                  <div className="flex-1 p-10 md:p-14">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-orange-600 to-amber-500 rounded-2xl shadow-xl">
                        <Bike className="h-10 w-10 text-white" />
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 text-base font-bold px-4 py-2">
                        Sportovní programy
                      </Badge>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-orange-700 mb-5 leading-tight">
                      Pohyb, zábava, bezpečí pro školy
                    </h2>
                    <p className="text-xl text-gray-700 mb-5 leading-relaxed">
                      Přiveďte své žáky do našeho sportovního areálu! Naučíme děti i teenagery <strong className="text-orange-700">základy bezpečné jízdy na kole</strong>, správné chování v terénu a týmovou spolupráci.
                    </p>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Programy vedou certifikovaní bike instruktoři. K dispozici je půjčovna kol, zázemí i občerstvení. Ideální pro sportovní dny, školy v přírodě i adaptační kurzy.
                    </p>
                    <Link to="/sluzby#skoly">
                      <Button className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg">
                        Rezervovat termín
                        <ChevronRight className="ml-2 h-6 w-6" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </section>
          </ScrollAnimation>

          {/* Vzdálenosti z měst */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 backdrop-blur-md border border-cyan-300 rounded-full mb-4">
                  <MapPin className="h-5 w-5 text-cyan-600" />
                  <span className="text-sm font-semibold text-cyan-700">Doprava</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Jak se k nám dostanete
                </h2>
                <p className="text-lg text-gray-600">
                  Vzdálenosti z okolních měst
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { city: "Teplice", distance: "15 km", time: "20 min", icon: "🚗" },
                  { city: "Ústí nad Labem", distance: "30 km", time: "35 min", icon: "🚗" },
                  { city: "Most", distance: "35 km", time: "40 min", icon: "🚗" },
                  { city: "Chomutov", distance: "40 km", time: "45 min", icon: "🚗" },
                  { city: "Praha", distance: "90 km", time: "1:15 hod", icon: "🚗" },
                  { city: "Drážďany (DE)", distance: "70 km", time: "1:00 hod", icon: "🚗" },
                ].map((item, index) => (
                  <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-cyan-500 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-bold text-tjk-blue group-hover:text-cyan-600 transition-colors">
                            {item.city}
                          </h3>
                          <span className="text-3xl">{item.icon}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-gray-700">
                            <span className="font-medium">Vzdálenost:</span>
                            <span className="text-lg font-bold text-tjk-orange">{item.distance}</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-700">
                            <span className="font-medium">Čas jízdy:</span>
                            <span className="text-lg font-semibold text-gray-900">{item.time}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>

              {/* MHD a Lanovka info */}
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                    <CardTitle className="text-2xl font-bold text-tjk-blue flex items-center gap-3">
                      <Clock className="h-6 w-6" />
                      Lanovka Krupka
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Nejdelší sedačková lanovka v ČR spojující město Krupka s areálem Komáří vížka.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-700">Délka:</span>
                        <span className="text-tjk-blue font-bold">2 348 m</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-700">Převýšení:</span>
                        <span className="text-tjk-blue font-bold">415 m</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-700">Čas jízdy:</span>
                        <span className="text-tjk-blue font-bold">~15 min</span>
                      </div>
                    </div>
                    <a href="https://www.lanovkakrupka.cz" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-tjk-blue to-cyan-600 text-white font-semibold">
                        Provozní řád a jízdné
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-300 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-2xl font-bold text-tjk-blue flex items-center gap-3">
                      <MapIcon className="h-6 w-6" />
                      MHD Krupka
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Veřejná autobusová doprava spojující Krupku s okolními městy a spodní stanicí lanovky.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Spodní stanice lanovky:</p>
                        <p className="font-semibold text-tjk-blue">Zastávka "Lanovka"</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Spojení:</p>
                        <p className="font-semibold text-gray-900">Teplice • Dubí • Bohosudov</p>
                      </div>
                    </div>
                    <a href="https://www.dpuk.cz" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold">
                        Jízdní řády MHD
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>

          {/* Zajímavá místa v okolí */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 backdrop-blur-md border border-purple-300 rounded-full mb-4">
                  <Mountain className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">Okolí</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Objevte krásy regionu
                </h2>
                <p className="text-lg text-gray-600">
                  Zajímavá místa v okolí Komáří vížky
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Klínovec",
                    distance: "15 km",
                    description: "Nejvyšší hora Krušných hor (1 244 m n.m.). Rozhledna, ski areál a krásné výhledy.",
                    icon: <Mountain className="h-8 w-8" />,
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    name: "Teplice",
                    distance: "15 km",
                    description: "Lázeňské město s bohatou historií, zámeckými parky a termálními prameny.",
                    icon: <Home className="h-8 w-8" />,
                    color: "from-amber-500 to-orange-500"
                  },
                  {
                    name: "Geopark Egeria",
                    distance: "okolí",
                    description: "Unikátní geologická lokalita s sopečnými útvary a minerály.",
                    icon: <Award className="h-8 w-8" />,
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    name: "Hrad Přemyslovců",
                    distance: "10 km",
                    description: "Zřícenina hradu s nádherným výhledem do údolí a na okolní hory.",
                    icon: <Shield className="h-8 w-8" />,
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    name: "Rozhledna Telnice",
                    distance: "20 km",
                    description: "Moderní rozhledna s panoramatickým výhledem na Krušné hory a Polabí.",
                    icon: <Target className="h-8 w-8" />,
                    color: "from-red-500 to-rose-500"
                  },
                  {
                    name: "Botanická zahrada Teplice",
                    distance: "15 km",
                    description: "Krásná zahrada s exotickými rostlinami, skleníky a japons kou zahradou.",
                    icon: <Sparkles className="h-8 w-8" />,
                    color: "from-pink-500 to-fuchsia-500"
                  },
                ].map((place, index) => (
                  <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                    <Card className="group h-full hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-tjk-orange hover:-translate-y-2">
                      <CardHeader className="pb-4">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${place.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                          {React.cloneElement(place.icon, { className: "text-white" })}
                        </div>
                        <CardTitle className="text-2xl font-bold text-tjk-blue group-hover:text-tjk-orange transition-colors">
                          {place.name}
                        </CardTitle>
                        <Badge className="bg-gray-100 text-gray-700 mt-2 w-fit">
                          📍 {place.distance}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {place.description}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </section>
          </ScrollAnimation>

          {/* Zajímavé informace o Komárce */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 backdrop-blur-md border border-orange-300 rounded-full mb-4">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-semibold text-orange-700">Zajímavosti</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Věděli jste, že...?
                </h2>
                <p className="text-lg text-gray-600">
                  Unikátní fakta o Komáří vížce
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Nejdelší sedačková lanovka v ČR",
                    description: "Lanovka z Krupky na Komáří vížku měří 2 348 metrů a je nejdelší svého druhu v České republice. Jízda trvá přibližně 15 minut.",
                    icon: "🚡",
                    color: "border-blue-300 bg-blue-50"
                  },
                  {
                    title: "Historická těžba rud",
                    description: "Oblast Komáří vížky byla v minulosti důležitým centrem těžby cínových a wolframových rud. Dodnes lze v okolí najít pozůstatky starých dolů.",
                    icon: "⛏️",
                    color: "border-amber-300 bg-amber-50"
                  },
                  {
                    title: "Pohraničí s Německem",
                    description: "Komáří vížka leží v těsné blízkosti česko-německých hranic. Z areálu jsou krásné výhledy na německou stranu Krušných hor - Erzgebirge.",
                    icon: "🗻",
                    color: "border-green-300 bg-green-50"
                  },
                  {
                    title: "Fauna a flóra",
                    description: "V okolních lesích můžete potkat jeleny, srnce, lišky a vzácné druhy ptáků. Rostou zde také chráněné horské rostliny a vzácné druhy mechů.",
                    icon: "🦌",
                    color: "border-purple-300 bg-purple-50"
                  },
                  {
                    title: "Celoroční provoz",
                    description: "Areál je otevřen po celý rok. V zimě nabízí lyžování a snowkiting, v létě cykloturistiku, běh a další outdoorové aktivity.",
                    icon: "🌞",
                    color: "border-cyan-300 bg-cyan-50"
                  },
                  {
                    title: "Meteorologická stanice",
                    description: "Na Komáří vížce funguje meteorologická stanice, která sleduje počasí v Krušných horách. Data jsou využívána pro předpověď počasí v regionu.",
                    icon: "🌡️",
                    color: "border-pink-300 bg-pink-50"
                  },
                ].map((fact, index) => (
                  <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                    <Card className={`group h-full hover:shadow-xl transition-all duration-300 border-2 ${fact.color} hover:-translate-y-1`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <span className="text-4xl flex-shrink-0">{fact.icon}</span>
                          <div>
                            <h3 className="text-xl font-bold text-tjk-blue mb-2 group-hover:text-tjk-orange transition-colors">
                              {fact.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {fact.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </section>
          </ScrollAnimation>

          {/* Důležité odkazy */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 backdrop-blur-md border border-red-300 rounded-full mb-4">
                  <MapIcon className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-semibold text-red-700">Užitečné</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Důležité odkazy
                </h2>
                <p className="text-lg text-gray-600">
                  Vše, co potřebujete vědět před návštěvou
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Lanovka Krupka",
                    url: "https://www.lanovkakrupka.cz",
                    icon: <Clock className="h-6 w-6" />,
                    color: "from-blue-600 to-cyan-600",
                    description: "Jízdní řády a ceník"
                  },
                  {
                    title: "MHD Krupka",
                    url: "https://www.dpuk.cz",
                    icon: <MapIcon className="h-6 w-6" />,
                    color: "from-green-600 to-emerald-600",
                    description: "Veřejná doprava"
                  },
                  {
                    title: "Počasí Komárka",
                    url: "/pocasi",
                    icon: <Mountain className="h-6 w-6" />,
                    color: "from-orange-600 to-amber-600",
                    description: "Aktuální předpověď"
                  },
                  {
                    title: "Kontakt",
                    url: "/kontakt",
                    icon: <Phone className="h-6 w-6" />,
                    color: "from-purple-600 to-pink-600",
                    description: "Kontaktujte nás"
                  },
                ].map((link, index) => (
                  <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                    <Link to={link.url.startsWith('http') ? link.url : link.url} target={link.url.startsWith('http') ? "_blank" : undefined} rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}>
                      <Card className="group h-full hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-tjk-orange cursor-pointer hover:-translate-y-2">
                        <CardContent className="p-6 text-center">
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${link.color} mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                            {React.cloneElement(link.icon, { className: "text-white" })}
                          </div>
                          <h3 className="text-xl font-bold text-tjk-blue mb-2 group-hover:text-tjk-orange transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {link.description}
                          </p>
                          <div className="flex items-center justify-center gap-2 text-tjk-orange font-semibold group-hover:gap-4 transition-all">
                            <span>Navštívit</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </ScrollAnimation>
                ))}
              </div>
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
