import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CheckCircle,
  Shield,
  FileText,
  Mail,
  Phone,
  AlertCircle,
  UserPlus,
  Info,
  ChevronRight,
  Heart,
  Zap,
  Star,
  Calendar,
  Trophy,
  Sparkles,
  Mountain,
  Bike,
  Snowflake,
  Wind,
  Coffee,
  PartyPopper,
  Cable,
} from "lucide-react";

const ProCleny = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  const benefits = [
    {
      icon: <Mountain className="h-8 w-8" />,
      title: "Celoroční aktivity",
      description: "Lyžuj v zimě, jezdi na kole v létě - užívej si Komárku po celý rok",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Noví kamarádi",
      description: "Poznej partu mladých sportovců, kteří to milují stejně jako ty",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Zábavné akce",
      description: "Závody, výlety a workshopy speciálně pro junior členy",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Adrenalinové zážitky",
      description: "Snowkiting, sjezdovka, bikeparky - akce a adrenalin na max!",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Nauč se nové věci",
      description: "Zlepšuj své dovednosti s pomocí zkušených trenérů a instruktorů",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Buď součástí týmu",
      description: "Společně udržujeme areál a vytváříme skvělé místo pro mladé sportovce",
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Vyplň přihlášku",
      description: "S rodiči vyplňte online přihlášku – zabere to jen pár minut",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      number: "02",
      title: "Počkej na schválení",
      description: "Výbor spolku posoudí přihlášku (obvykle do týdne)",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "03",
      title: "Hurá na Komárku!",
      description: "Staň se junior členem a vyraž si užívat sport s partou!",
      icon: <PartyPopper className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Komáří vížka – sportovní činnost pro členy spolku | Tělovýchovná jednota Krupka z.s."
        description="Informace o interní sportovní činnosti na Komáří vížce pro členy spolku: členství, pravidla, bezpečnost a kontakt."
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-tjk-orange transition-colors">
                Domů
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to="/komari-vizka"
                className="hover:text-tjk-orange transition-colors"
              >
                Komáří vížka
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-tjk-blue font-medium">
                Pro členy spolku
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section - Modernější a atraktivnější */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-tjk-blue via-purple-900 to-tjk-blue">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
              <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
          </div>

          {/* Hero image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
            style={{
              backgroundImage: "url('/images/homepage/okoli.jpg')",
            }}
          ></div>

          <div className="container relative z-20 px-4 py-20">
            <div className="max-w-5xl mx-auto text-center text-white">
              <ScrollAnimation animation="fade-up">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8">
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                  <span className="font-semibold">Junior členství pro mladé sportovce</span>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={0.1}>
                <h1 className="font-montserrat font-black text-5xl md:text-7xl mb-6 leading-tight">
                  Tvůj start ve sportu,
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                    neomezené možnosti
                  </span>
                </h1>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
                  Sportovní kroužek pro děti a mládež na Komáří vížce. Připoj se k partě
                  mladých nadšenců, kteří milují sport, adrenalin a hory!
                </p>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-tjk-orange to-amber-600 hover:from-tjk-orange/90 hover:to-amber-600/90 text-white font-bold px-8 py-6 text-lg shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105"
                    asChild
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeSVSjZo7teeg2oxoAbLzIMrBqA0_12cR7Uuzd-hTThLMKBig/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <UserPlus className="mr-2 h-5 w-5" />
                      Chci se stát členem
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold px-8 py-6 text-lg"
                    asChild
                  >
                    <a href="#jak-to-funguje">
                      Jak to funguje
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </ScrollAnimation>

              {/* Stats */}
              <ScrollAnimation animation="fade-up" delay={0.4}>
                <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-3xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6">
                    <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">5-16</div>
                    <div className="text-sm md:text-base text-white/80">let věku</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6">
                    <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2">365</div>
                    <div className="text-sm md:text-base text-white/80">dní zábavy</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6">
                    <div className="text-3xl md:text-4xl font-black text-pink-400 mb-2">100%</div>
                    <div className="text-sm md:text-base text-white/80">kamarádů</div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Důležité upozornění - ale moderněji */}
          <ScrollAnimation animation="fade-up">
            <Alert className="mb-20 border-2 border-tjk-orange bg-gradient-to-r from-orange-50 to-amber-50 shadow-lg">
              <AlertCircle className="h-6 w-6 text-tjk-orange" />
              <AlertTitle className="text-tjk-blue font-bold text-xl">
                Důležitá informace pro rodiče
              </AlertTitle>
              <AlertDescription className="text-gray-700 text-base leading-relaxed">
                Areál Komáří vížka <strong>momentálně slouží výhradně pro junior sportovní činnost</strong> –
                děti a mládež ve věku 5-16 let jako členy spolku Tělovýchovná jednota Krupka z.s.
                Nejde o veřejný komerční provoz. Přihlaste své dítě do naší junior sportovní party! 🏔️
              </AlertDescription>
            </Alert>
          </ScrollAnimation>
        </div>

        {/* Info blok - Dětský vlek zdarma - FULL WIDTH */}
        <ScrollAnimation animation="fade-up">
          <section className="mb-20 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-32">
            <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 py-16 md:py-24 px-4 relative overflow-hidden min-h-[400px] md:min-h-[450px]">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 text-white text-8xl">⛷️</div>
                <div className="absolute bottom-10 right-10 text-white text-8xl">🎿</div>
              </div>

              <div className="container mx-auto max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white/20 backdrop-blur-md border-4 border-white/40 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                      <Cable className="h-16 w-16 md:h-20 md:w-20 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-white text-center md:text-left max-w-3xl">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                      <Badge className="bg-yellow-400 text-tjk-blue border-0 px-4 py-2 text-sm font-black shadow-lg">
                        ZDARMA PRO ČLENY
                      </Badge>
                      <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                    </div>

                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                      Dětský vlek bez poplatků!
                    </h3>

                    <p className="text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed mb-6">
                      Junior členové spolku mohou <strong className="text-yellow-300">využívat dětský vlek zcela zdarma</strong> ve vyhrazených časech.
                    </p>

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                      Ideální pro nácvik lyžování, snowboardingu a získávání prvních zkušeností na svahu!
                    </p>

                    <div className="flex items-start justify-center md:justify-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <CheckCircle className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                      <p className="text-white/95 text-base md:text-lg leading-relaxed">
                        Po přijetí za člena obdržíte informace o vyhrazených časech a pravidlech využívání.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* CTA - Přihláška pro děti - FULL WIDTH */}
        <ScrollAnimation animation="fade-up">
          <section className="mb-20 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-32">
            <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 py-12 md:py-16 px-4 relative overflow-hidden">
              {/* Background effects */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-full h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-64 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
              </div>

              <div className="container mx-auto max-w-5xl relative z-10">
                <div className="text-center text-white">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-4">
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                    <span className="font-semibold text-sm">Junior členství • 5-16 let</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black mb-4">
                    Připrav se na akci! 🎉
                  </h3>

                  <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                    S rodiči vyplňte online přihlášku a staňte se součástí junior sportovní party.
                    Je to jednoduché a rychlé!
                  </p>

                  <Button
                    size="lg"
                    className="bg-white text-green-700 hover:bg-gray-100 font-black px-10 py-7 text-lg shadow-2xl transform hover:scale-105 transition-all"
                    asChild
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeSVSjZo7teeg2oxoAbLzIMrBqA0_12cR7Uuzd-hTThLMKBig/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="mr-2 h-6 w-6" />
                      Vyplnit přihlášku
                      <ChevronRight className="ml-2 h-6 w-6" />
                    </a>
                  </Button>

                  <p className="text-sm text-white/70 mt-6">
                    ✓ Pro děti 5-16 let  •  ✓ Vyplňte s rodiči  •  ✓ Zabere 5 minut
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Benefity členství - Hvězdná sekce */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                  Proč se přihlásit
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black text-tjk-blue mb-4">
                  Co ti junior členství přináší?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Být junior členem TJ Krupka znamená partu, zábavu a sport po celý rok. Tady je 6 důvodů, proč se připojit!
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {benefits.map((benefit, index) => (
                  <ScrollAnimation
                    key={index}
                    animation="fade-up"
                    delay={index * 0.1}
                  >
                    <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden">
                      <CardContent className="p-6">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          {benefit.icon}
                        </div>
                        <h3 className="text-xl font-bold text-tjk-blue mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </section>
          </ScrollAnimation>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Jak to funguje - Vizuální kroky */}
          <ScrollAnimation animation="fade-up">
            <section id="jak-to-funguje" className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                  Jednoduchý proces
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black text-tjk-blue mb-4">
                  Jak se přihlásit?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Tři jednoduché kroky od přihlášky k prvním jízdám na Komárce. Děti do 16 let vítáme!
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
                <div className="relative">
                  {/* Connection line */}
                  <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-emerald-300 to-cyan-300 z-0"></div>

                  <div className="grid md:grid-cols-3 gap-8 relative z-10">
                    {steps.map((step, index) => (
                      <ScrollAnimation
                        key={index}
                        animation="scale"
                        delay={index * 0.15}
                      >
                        <div className="relative">
                          {/* Number badge */}
                          <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl z-20">
                            {step.number}
                          </div>

                          <Card className="pt-8 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                            <CardContent className="p-6 text-center">
                              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                                {step.icon}
                              </div>
                              <h3 className="text-xl font-bold text-tjk-blue mb-3">
                                {step.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {step.description}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </ScrollAnimation>
                    ))}
                  </div>
                </div>
              </div>

            </section>
          </ScrollAnimation>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">

          {/* FAQ - Vylepšené */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-24">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                    Pro rodiče
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-black text-tjk-blue mb-4">
                    Často kladené otázky
                  </h2>
                  <p className="text-lg text-gray-600">
                    Odpovědi na dotazy rodičů o junior členství pro děti.
                  </p>
                </div>

                <Card className="shadow-2xl border-0 bg-white">
                  <CardContent className="p-8">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-b-2">
                        <AccordionTrigger className="text-lg font-bold text-tjk-blue hover:text-tjk-orange py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                              ?
                            </div>
                            Je areál otevřený pro všechny děti?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed pl-11 pb-6">
                          Areál je určen pro junior členy spolku Tělovýchovná jednota Krupka z.s. (děti 5-16 let).
                          Není to veřejný provoz, ale junior členství je otevřené všem dětem,
                          které milují sport a hory! 🏔️
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-2" className="border-b-2">
                        <AccordionTrigger className="text-lg font-bold text-tjk-blue hover:text-tjk-orange py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                              ?
                            </div>
                            Musí děti platit za každou jízdu?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed pl-11 pb-6">
                          Ne! Nevybírá se žádné jízdné. Junior členové platí členské příspěvky,
                          které podporují celý spolek – údržbu areálu, vybavení a dětské akce.
                          Investice do sportovního rozvoje vašeho dítěte, ne do jednotlivých jízd! 💪
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3" className="border-b-2">
                        <AccordionTrigger className="text-lg font-bold text-tjk-blue hover:text-tjk-orange py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                              ?
                            </div>
                            Jak přihlásím své dítě?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed pl-11 pb-6">
                          Super jednoduché! Vyplňte online přihlášku (link níže), výbor ji schválí
                          (obvykle do týdne) a pak už vaše dítě může vyrazit na Komárku!
                          Pokud máte dotazy, neváhejte nás kontaktovat. 🚀
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-4">
                        <AccordionTrigger className="text-lg font-bold text-tjk-blue hover:text-tjk-orange py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                              ?
                            </div>
                            Jaká jsou pravidla pro děti?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed pl-11 pb-6">
                          Vše dostanete po přijetí dítěte za člena – stanovy spolku, interní
                          pravidla a důležité informace. Nejsou to nic složitého, jen základní
                          pravidla bezpečnosti a chování, aby si to všichni užili! 📋
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>
        </div>

        {/* Kontakt - Atraktivnější CTA - FULL WIDTH */}
        <ScrollAnimation animation="fade-up">
          <section id="kontakt" className="mb-20 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-32">
            <div className="bg-gradient-to-br from-tjk-blue via-purple-900 to-pink-900 py-12 md:py-16 px-4 relative overflow-hidden">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>

              <div className="container mx-auto max-w-5xl relative z-10">
                <div className="text-center text-white">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-6">
                    <Sparkles className="h-5 w-5 text-yellow-300" />
                    <span className="font-semibold">Připravený na akci?</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black mb-6">
                    Přihlaš své dítě ještě dnes!
                  </h2>

                  <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10">
                    Máte dotazy k junior členství? Chcete se dozvědět víc o programu
                    pro děti? Kontaktujte nás a my vám všechno vysvětlíme. Těšíme se! 🤙
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
                      <Mail className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                      <p className="text-sm text-white/70 mb-2">Napiš nám</p>
                      <a
                        href="mailto:telovychovnajednotakrupka@gmail.com"
                        className="text-white font-bold hover:text-cyan-400 transition-colors break-all"
                      >
                        telovychovnajednotakrupka@gmail.com
                      </a>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
                      <Phone className="h-8 w-8 text-green-400 mx-auto mb-3" />
                      <p className="text-sm text-white/70 mb-2">Zavolej nám</p>
                      <a
                        href="tel:+420777734389"
                        className="text-white font-bold hover:text-green-400 transition-colors text-xl"
                      >
                        +420 777 734 389
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      size="lg"
                      className="bg-white text-tjk-blue hover:bg-gray-100 font-bold px-10 py-7 text-lg shadow-2xl transform hover:scale-105 transition-all"
                      asChild
                    >
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeSVSjZo7teeg2oxoAbLzIMrBqA0_12cR7Uuzd-hTThLMKBig/viewform?usp=header"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="mr-2 h-6 w-6" />
                        Vyplnit přihlášku
                      </a>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold px-10 py-7 text-lg"
                      asChild
                    >
                      <Link to="/kontakt">
                        <Mail className="mr-2 h-5 w-5" />
                        Nebo nás kontaktuj
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </main>

      <Footer />
    </div>
  );
};

export default ProCleny;
