import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollAnimation from "@/components/ScrollAnimation";
import { supabase } from '@/supabaseClient';
import { MapPin, ArrowRight, Users, Bike, Coffee, Map as MapIcon, Clock, Mountain, Bird, Home, Shield, GraduationCap, Sparkles, ChevronRight, Star, Award, Target, Phone, TrendingUp, Heart, Sprout, CloudSun, Bus, Cable, TreePine, Car, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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


  const services = [
    {
      icon: <TreePine className="h-6 w-6" />,
      title: "Snowkiting kurzy",
      description: "Naučte se snowkiting s certifikovanými instruktory v ideálních podmínkách Krušných hor.",
      link: "/snowkiting-kurzy",
      buttonText: "Zjistit více",
      gradient: "from-cyan-500 to-blue-600",
      hoverGradient: "from-cyan-600 to-blue-700"
    },
    // PŮJČOVNA SKRYTA - pro obnovení odkomentuj
    // {
    //   icon: <Bike className="h-6 w-6" />,
    //   title: "Půjčovna",
    //   description: "Kompletní vybavení na snowkiting, kola a další sportovní potřeby k pronájmu.",
    //   link: "/pujcovna",
    //   buttonText: "Zobrazit půjčovnu",
    //   gradient: "from-green-500 to-emerald-600",
    //   hoverGradient: "from-green-600 to-emerald-700"
    // },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Ubytování",
      description: "Komfortní pokoje s výhledem do Krušných hor. Ideální pro víkendové pobyty i skupiny.",
      link: "/sluzby#ubytovani",
      buttonText: "Rezervovat pobyt",
      gradient: "from-purple-600 to-pink-600",
      hoverGradient: "from-purple-700 to-pink-700"
    },

    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Programy pro školy",
      description: "Zážitkové dny, adaptační kurzy a sportovní programy na míru pro školní skupiny.",
      link: "/skoly",
      buttonText: "Pro školy",
      gradient: "from-blue-600 to-indigo-600",
      hoverGradient: "from-blue-700 to-indigo-700"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Dobrovolnické programy",
      description: "Přidejte se k nám při údržbě areálu nebo jako instruktoři. Získejte slevy a výhody.",
      link: "/dobrovolnici",
      buttonText: "Přidat se k týmu",
      gradient: "from-orange-500 to-red-500",
      hoverGradient: "from-orange-600 to-red-600"
    },
    {
      icon: <Sprout className="h-6 w-6" />,
      title: "Airbag",
      description: "Bezpečný trénink skoků a triků na airbag matraci – pro kola, snowboard i lyže.",
      link: "/airbag",
      buttonText: "Více o airbagu",
      gradient: "from-pink-500 to-rose-600",
      hoverGradient: "from-pink-600 to-rose-700"
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
        title="Komáří vížka | Junior Sportovní Areál v Krušných Horách | TJ Krupka"
        description="Junior sportovní areál v Krušných horách ⛷️ Momentálně výhradně pro členy spolku TJ Krupka (děti 5-16 let) | Lyžování | Snowkiting | Airbag | Sportovní aktivity. ✓ Nejdelší lanovka v ČR ✓ 15 min z Teplic"
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section - Minimalistická */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/homepage/okoli.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>

          <div className="container relative z-20 px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              {/* Main Heading */}
              <h1 className="font-montserrat font-black text-5xl md:text-7xl mb-6 leading-tight">
                Komáří vížka
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                Váš domov pro adrenalin, zábavu a nezapomenutelné zážitky v Krušných horách
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Důležité upozornění */}
          <ScrollAnimation animation="fade-up">
            <Alert className="mb-20 border-2 border-tjk-orange bg-gradient-to-r from-orange-50 to-amber-50 shadow-lg">
              <AlertCircle className="h-6 w-6 text-tjk-orange" />
              <AlertTitle className="text-tjk-blue font-bold text-xl">
                Důležitá informace o využívání areálu
              </AlertTitle>
              <AlertDescription className="text-gray-700 text-base leading-relaxed">
                Areál Komáří vížka <strong>momentálně slouží výhradně pro junior sportovní činnost</strong> –
                děti a mládež ve věku 5-16 let jako členy spolku Tělovýchovná jednota Krupka z.s.
                Nejde o veřejný komerční provoz. Pro více informací o členství navštivte sekci{" "}
                <Link to="/komari-vizka/pro-cleny" className="text-tjk-orange hover:text-tjk-blue font-bold underline">
                  Pro členy
                </Link>. 🏔️
              </AlertDescription>
            </Alert>
          </ScrollAnimation>

          {/* Informace - Blogový styl */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-tjk-blue/10 border border-tjk-blue/20 rounded-full mb-4">
                    <span className="text-sm font-semibold text-tjk-blue">Informace</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue">
                    Komáří vížka – aktuálně a přehledně
                  </h2>
                  <p className="text-lg text-gray-600 mt-3">
                    Krátké, jasné informace o areálu a jeho provozu.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <article className="bg-white border-2 border-tjk-blue/10 rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-wide text-tjk-blue bg-tjk-blue/10 px-3 py-1 rounded-full">
                        INFO
                      </span>
                      <span className="text-xs text-gray-500">Aktualizace</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-tjk-blue mb-3">
                      Legenda Krušných hor ožívá
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      Komáří vížka je ikonické místo s více než 50letou tradicí. Díky nejdelší sedačkové lanovce v ČR a jedinečné poloze
                      se areál stal srdcem zimní rekreace regionu Teplice, Ústí nad Labem a Krupka.
                    </p>
                  </article>

                  <article className="bg-white border-2 border-emerald-200 rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-wide text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        PROVOZ
                      </span>
                      <span className="text-xs text-gray-500">Aktuální stav</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-tjk-blue mb-3">
                      Areál slouží sportovní činnosti mládeže
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      Areál momentálně slouží výhradně pro členy spolku Tělovýchovná jednota Krupka z.s. (děti a mládež 5-16 let).
                      Provoz není veřejný komerční.
                    </p>
                    <div className="mt-4">
                      <Link to="/komari-vizka/pro-cleny" className="text-tjk-orange hover:text-tjk-blue font-bold underline">
                        Více informací v sekci Pro členy
                      </Link>
                    </div>
                  </article>
                </div>

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <article className="bg-white border-2 border-orange-200 rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold tracking-wide text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                        ZIMA
                      </span>
                      <span className="text-xs text-gray-500">Sezóna</span>
                    </div>
                    <h3 className="text-lg font-bold text-tjk-blue mb-2">Lyžování, snowboarding, snowkiting</h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Ideální podmínky pro zimní sporty a rozvoj dovedností v horském prostředí.
                    </p>
                  </article>

                  <article className="bg-white border-2 border-blue-200 rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold tracking-wide text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                        LÉTO
                      </span>
                      <span className="text-xs text-gray-500">Sezóna</span>
                    </div>
                    <h3 className="text-lg font-bold text-tjk-blue mb-2">Sportovní aktivity v létě</h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Využití lanovky, tréninky a aktivity pro různé úrovně zkušeností.
                    </p>
                  </article>

                  <article className="bg-white border-2 border-purple-200 rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold tracking-wide text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                        NOVINKA
                      </span>
                      <span className="text-xs text-gray-500">AIRBAG</span>
                    </div>
                    <h3 className="text-lg font-bold text-tjk-blue mb-2">Bezpečný nácvik triků</h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Profesionální AIRBAG matrace pro bezpečné trénování skoků na kole, snowboardu i lyžích.
                    </p>
                  </article>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* Naše cíle - Minimalistický design */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-tjk-blue">
                  Naše cíle
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg"><TrendingUp className="h-6 w-6" /></div>
                    <div>
                      <h3 className="text-xl font-bold text-tjk-blue mb-2">Zvýšení pohybových aktivit</h3>
                      <p className="text-base text-gray-700 leading-relaxed text-justify">
                        Podporujeme pohyb dětí a mládeže v přírodě prostřednictvím různých sportovních aktivit
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 p-3 rounded-lg"><Heart className="h-6 w-6" /></div>
                    <div>
                      <h3 className="text-xl font-bold text-tjk-blue mb-2">Rozvoj fyzické kondice</h3>
                      <p className="text-base text-gray-700 leading-relaxed text-justify">
                        Podporujeme sportovní všestrannost a zdravý životní styl pro všechny věkové kategorie
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-start gap-4">
                    <div className="bg-orange-100 text-orange-600 p-3 rounded-lg"><Sprout className="h-6 w-6" /></div>
                    <div>
                      <h3 className="text-xl font-bold text-tjk-blue mb-2">Pozitivní vztah ke sportu</h3>
                      <p className="text-base text-gray-700 leading-relaxed text-justify">
                        Vytváříme lásku ke sportu a přírodě skrze zážitkové aktivity v krásném horském prostředí
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-lg"><Users className="h-6 w-6" /></div>
                    <div>
                      <h3 className="text-xl font-bold text-tjk-blue mb-2">Propojení komunit</h3>
                      <p className="text-base text-gray-700 leading-relaxed text-justify">
                        Spojujeme školy, rodiny a komunity prostřednictvím pohybu a společných zážitků
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* Jak se k nám dostanete */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Jak se k nám dostanete
                </h2>
                <p className="text-lg text-gray-600">
                  Snadno a rychle z okolních měst i veřejnou dopravou
                </p>
              </div>

              {/* MHD a Lanovka info */}
              <div className="mb-12 grid md:grid-cols-2 gap-6">
                <div
                  className="relative rounded-lg overflow-hidden p-6 flex flex-col justify-end text-white bg-cover bg-center min-h-[300px]"
                  style={{ backgroundImage: "url('/images/komarivizka/lanovkakrupka.png')" }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-3"><Cable className="h-6 w-6" /> Lanovka Krupka</h3>
                    <p className="mb-4 leading-relaxed">Nejdelší sedačková lanovka v ČR.</p>
                    <a href="https://www.lanovkakrupka.cz" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold">
                        Provozní řád a jízdné
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>

                <div
                  className="relative rounded-lg overflow-hidden p-6 flex flex-col justify-end text-white bg-cover bg-center min-h-[300px]"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800')" }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-3"><Bus className="h-6 w-6" /> MHD</h3>
                    <p className="mb-4 leading-relaxed">Veřejná doprava až ke spodní stanici lanovky.</p>
                    <a href="https://idos.cz/vlakyautobusymhdvse/spojeni/vysledky/?f=Teplice&fc=1&t=Fojtovice/Krupka,Kom%C3%A1%C5%99%C3%AD%20v%C3%AD%C5%BEka&tc=200003" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold">
                        Jízdní řády IDOS
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { city: "Teplice", distance: "15 km", time: "20 min" },
                  { city: "Ústí nad Labem", distance: "30 km", time: "35 min" },
                  { city: "Most", distance: "35 km", time: "40 min" },
                  { city: "Chomutov", distance: "40 km", time: "45 min" },
                  { city: "Praha", distance: "90 km", time: "1:15 hod" },
                  { city: "Drážďany (DE)", distance: "70 km", time: "1:00 hod" },
                ].map((item, index) => (
                  <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                    <Card className="group transition-all duration-300 border border-gray-200 hover:border-tjk-blue hover:shadow-md">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <Car className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-tjk-blue">{item.city}</h3>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{item.distance}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </section>
          </ScrollAnimation>
        </div>

          {/* Komárka dnes - Modrý 100% width blok */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="bg-tjk-blue py-12 md:py-16 px-4">
                <div className="container mx-auto max-w-5xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
                    Proč přihlásit dítě do junior členství?
                  </h2>
                  <p className="text-lg md:text-xl text-white/95 leading-relaxed mb-4 text-center max-w-3xl mx-auto text-justify">
                    Moderní junior sportovní areál s 50letou tradicí, nejdelší lanovka v ČR a celoroční nabídka aktivit pro děti a mládež. Ideální vzdálenost z Teplic (15 km), profesionální zázemí a bezpečné prostředí. Areál momentálně slouží výhradně pro členy spolku (děti 5-16 let). Lyžování, snowkiting, airbag a nezapomenutelné sportovní zážitky v Krušných horách!
                  </p>
                  <p className="text-base md:text-lg text-white/90 text-center mt-6">
                    <strong>Tělovýchovná jednota Krupka z.s.</strong> nabízí junior členství na Komárce – místo, kde tradice ožívá a mladí sportovci získávají nové dovednosti!{" "}
                    <Link to="/komari-vizka/pro-cleny" className="text-yellow-300 hover:text-yellow-100 font-bold underline">
                      Zjistit více o členství
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* Mapa - 100% width */}
          <ScrollAnimation animation="fade-up">
            <section id="mapa" className="mb-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                    Kde nás najdete
                  </h2>
                  <p className="text-lg text-gray-600">
                    Areál Komáří vížka, Krušné hory
                  </p>
                </div>
              </div>
              <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
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

        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Služby - Co u nás zažijete */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <ScrollAnimation animation="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Co u nás zažijete
                </h2>
                <p className="text-lg text-gray-600">
                  Kompletní nabídka sportovních aktivit a služeb v areálu
                </p>
              </ScrollAnimation>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                  <Link to={service.link}>
                    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-tjk-orange h-full hover:-translate-y-2 cursor-pointer">
                      <CardHeader className="bg-gradient-to-br from-gray-50 to-white pb-4">
                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          {React.cloneElement(service.icon, { className: "h-8 w-8 text-white" })}
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-extrabold text-tjk-blue group-hover:text-tjk-orange transition-colors">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 pb-6">
                        <p className="text-gray-700 text-base leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-tjk-orange font-semibold group-hover:gap-4 transition-all">
                          <span>{service.buttonText}</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </section>


          {/* Nabídka pro školy - Zážitkové dny */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20 -mx-4">
              <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-12 md:py-16">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-7xl mx-auto">
                    <div className="flex-1 flex items-center justify-center relative">
                      <img
                        src="/images/loga/komarek.png"
                        alt="Logo Komárek"
                        className="max-h-80 w-auto object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-gradient-to-br from-tjk-blue to-cyan-600 rounded-2xl shadow-xl">
                          <GraduationCap className="h-10 w-10 text-white" />
                        </div>
                        <Badge className="bg-white text-tjk-blue text-base font-bold px-4 py-2">
                          Pro školy
                        </Badge>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-tjk-blue mb-5 leading-tight">
                        Zážitkové dny na Komáří vížce
                      </h2>
                      <p className="text-xl text-gray-700 mb-5 leading-relaxed">
                        Hledáte originální program pro školní výlet, adaptační kurz nebo sportovní den? Nabízíme <strong className="text-tjk-blue">bezpečné a zábavné aktivity v přírodě</strong> pod vedením zkušených instruktorů.
                      </p>
                      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Připravíme program na míru – cyklistika, hry v přírodě, environmentální workshopy, orientační běh, první pomoc a mnoho dalšího. Vše v krásném prostředí s možností stravování a ubytování.
                      </p>
                      <Link to="/skoly">
                        <Button className="bg-gradient-to-r from-tjk-blue to-cyan-600 hover:from-tjk-blue/90 hover:to-cyan-600/90 text-white font-bold px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg">
                          Více o programech
                          <ChevronRight className="ml-2 h-6 w-6" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>




          {/* Zajímavá místa v okolí */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-3">
                  Objevte krásy regionu
                </h2>
                <p className="text-lg text-gray-600">
                  Zajímavá místa v okolí Komáří vížky
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Klínovec",
                    distance: "15 km",
                    description: "Nejvyšší hora Krušných hor (1 244 m n.m.). Rozhledna, ski areál a krásné výhledy.",
                    image: "/images/okoli/klinovec.webp",
                    mapUrl: "https://www.google.com/maps/place/Kl%C3%ADnovec/@50.3939929,12.9721333,17z/"
                  },
                  {
                    name: "Teplice",
                    distance: "15 km",
                    description: "Lázeňské město s bohatou historií, zámeckými parky a termálními prameny.",
                    image: "/images/okoli/teplice.jpg",
                    mapUrl: "https://www.google.com/maps/place/Teplice/@50.6404382,13.8245225,14z/"
                  },
                  {
                    name: "Botanická zahrada Teplice",
                    distance: "15 km",
                    description: "Krásná zahrada s exotickými rostlinami, skleníky a japonskou zahradou.",
                    image: "/images/okoli/botanicka.jpg",
                    mapUrl: "https://www.google.com/maps/place/Botanick%C3%A1+zahrada+Teplice/@50.6406,13.8242,16z/"
                  },
                ].map((place, index) => (
                  <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                    <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <Card className="group h-full hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-tjk-blue cursor-pointer overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardHeader className="pb-4">
                          <CardTitle className="text-2xl font-bold text-tjk-blue group-hover:text-tjk-orange transition-colors">
                            {place.name}
                          </CardTitle>
                          <Badge className="bg-gray-100 text-gray-700 mt-2 w-fit">
                            📍 {place.distance}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                            {place.description}
                          </p>
                          <div className="flex items-center gap-2 text-tjk-blue font-semibold">
                            <span>Zobrazit na mapě</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </ScrollAnimation>
                ))}
              </div>
            </section>
          </ScrollAnimation>

          {/* Zajímavé informace o Komárce */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="text-center mb-12">
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
                    icon: "🚡"
                  },
                  {
                    title: "Historická těžba rud",
                    description: "Oblast Komáří vížky byla v minulosti důležitým centrem těžby cínových a wolframových rud. Dodnes lze v okolí najít pozůstatky starých dolů.",
                    icon: "⛏️"
                  },
                  {
                    title: "Pohraničí s Německem",
                    description: "Komáří vížka leží v těsné blízkosti česko-německých hranic. Z areálu jsou krásné výhledy na německou stranu Krušných hor - Erzgebirge.",
                    icon: "🗻"
                  },
                  {
                    title: "Fauna a flóra",
                    description: "V okolních lesích můžete potkat jeleny, srnce, lišky a vzácné druhy ptáků. Rostou zde také chráněné horské rostliny a vzácné druhy mechů.",
                    icon: "🦌"
                  },
                  {
                    title: "Celoroční provoz",
                    description: "Areál je otevřen po celý rok. V zimě nabízí lyžování a snowkiting, v létě cykloturistiku, běh a další outdoorové aktivity.",
                    icon: "🌞"
                  },
                  {
                    title: "Meteorologická stanice",
                    description: "Na Komáří vížce funguje meteorologická stanice, která sleduje počasí v Krušných horách. Data jsou využívána pro předpověď počasí v regionu.",
                    icon: "🌡️"
                  },
                ].map((fact, index) => (
                  <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                    <Card className="group h-full hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-tjk-blue bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <span className="text-4xl flex-shrink-0">{fact.icon}</span>
                          <div>
                            <h3 className="text-xl font-bold text-tjk-blue mb-2">
                              {fact.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-justify">
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
                    icon: <Cable className="h-8 w-8" />,
                    description: "Jízdní řády a ceník",
                  },
                  {
                    title: "MHD",
                    url: "https://idos.cz/vlakyautobusymhdvse/spojeni/vysledky/?f=Teplice&fc=1&t=Fojtovice/Krupka,Kom%C3%A1%C5%99%C3%AD%20v%C3%AD%C5%BEka&tc=200003",
                    icon: <Bus className="h-8 w-8" />,
                    description: "Veřejná doprava",
                  },
                  {
                    title: "Počasí Komárka",
                    url: "/pocasi",
                    icon: <CloudSun className="h-8 w-8" />,
                    description: "Aktuální předpověď"
                  },
                  {
                    title: "Kontakt",
                    url: "/kontakt",
                    icon: <Phone className="h-8 w-8" />,
                    description: "Kontaktujte nás"
                  },
                ].map((link, index) => (
                  <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                    <Link to={link.url.startsWith('http') ? link.url : link.url} target={link.url.startsWith('http') ? "_blank" : undefined} rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}>
                      <div className="group bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 rounded-lg flex flex-col items-center justify-center text-center p-4 h-40">
                        <div className="text-tjk-blue group-hover:text-tjk-orange transition-colors duration-300 mb-2">
                          {link.icon}
                        </div>
                        <h3 className="text-lg font-bold text-tjk-blue mb-0.5 group-hover:text-tjk-orange transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {link.description}
                        </p>
                      </div>
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
