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
} from "lucide-react";

const ProCleny = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  const benefits = [
    {
      icon: <Mountain className="h-8 w-8" />,
      title: "Přístup do areálu",
      description: "Užívej si všechny aktivity na Komáří vížce po celý rok",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Aktivní komunita",
      description: "Staň se součástí party nadšenců pro sport a outdoorové aktivity",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Exkluzivní akce",
      description: "Zapoj se do workshopů, závodů a společných výjezdů pro členy",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Bezkonkurenční zážitky",
      description: "Lyžování, snowkiting, bikování - adrenalin 365 dní v roce",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Podpora projektu",
      description: "Pomáháš rozvíjet sportovní zázemí v Krušných horách",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Rozvoj dovedností",
      description: "Zlepšuj se pod vedením zkušených členů a instruktorů",
      gradient: "from-amber-500 to-yellow-500",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Podej přihlášku",
      description: "Vyplň přihlášku a pošli nám ji mailem nebo telefonicky",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      number: "02",
      title: "Schválení výborem",
      description: "Výbor spolku posoudí tvou přihlášku",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "03",
      title: "Vítej v týmu!",
      description: "Staň se oficiálním členem a vyrážej do akce",
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
                  <span className="font-semibold">Staň se součástí naší komunity</span>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={0.1}>
                <h1 className="font-montserrat font-black text-5xl md:text-7xl mb-6 leading-tight">
                  Tvoje členství,
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                    neomezené možnosti
                  </span>
                </h1>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
                  Komáří vížka není jen místo – je to životní styl. Připoj se k partě,
                  která žije sportem, adrenalinenem a horami.
                </p>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-tjk-orange to-amber-600 hover:from-tjk-orange/90 hover:to-amber-600/90 text-white font-bold px-8 py-6 text-lg shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105"
                    asChild
                  >
                    <a href="#kontakt">
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
                    <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">365</div>
                    <div className="text-sm md:text-base text-white/80">dní aktivit</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6">
                    <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2">50+</div>
                    <div className="text-sm md:text-base text-white/80">let tradice</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6">
                    <div className="text-3xl md:text-4xl font-black text-pink-400 mb-2">100%</div>
                    <div className="text-sm md:text-base text-white/80">zážitek</div>
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
                Důležitá informace
              </AlertTitle>
              <AlertDescription className="text-gray-700 text-base leading-relaxed">
                Areál Komáří vížka provozujeme jako <strong>interní sportovní činnost</strong> pro
                členy spolku Tělovýchovná jednota Krupka z.s. Nejde o veřejný komerční provoz.
                Členství je otevřené všem, kteří sdílejí naši vášeň pro sport a hory! 🏔️
              </AlertDescription>
            </Alert>
          </ScrollAnimation>

          {/* Benefity členství - Hvězdná sekce */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                  Proč se stát členem
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black text-tjk-blue mb-4">
                  Co ti členství přináší?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Být členem TJ Krupka znamená být součástí něčeho většího. Tady jsou top důvody, proč se připojit.
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

          {/* Jak to funguje - Vizuální kroky */}
          <ScrollAnimation animation="fade-up">
            <section id="jak-to-funguje" className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                  Jednoduchý proces
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black text-tjk-blue mb-4">
                  Jak se stát členem?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Tři jednoduché kroky od přihlášky k tvým prvním jízdám na Komárce.
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

              {/* Členské příspěvky info */}
              <ScrollAnimation animation="fade-up" delay={0.3}>
                <Card className="mt-12 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Info className="h-6 w-6 text-blue-600" />
                      <h3 className="text-2xl font-bold text-tjk-blue">
                        O členských příspěvcích
                      </h3>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Členské příspěvky slouží na <strong>podporu činnosti spolku</strong> –
                      údržbu areálu, rozvoj aktivit a pořádání akcí.
                      Nejsou úhradou za jednotlivé služby, ale investicí do společné vášně! 🚀
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </section>
          </ScrollAnimation>

          {/* Bezpečnost a pravidla - ale cool */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-24">
              <div className="max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Text column */}
                  <div>
                    <Badge className="mb-4 bg-gradient-to-r from-red-600 to-orange-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                      Bezpečnost na prvním místě
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-black text-tjk-blue mb-6">
                      Společně a bezpečně
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      Sport je zábava, ale bezpečnost je základ. Jako členové
                      se řídíme jednoduchými pravidly, která zajišťují, že si
                      všichni užijeme aktivity naplno.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-tjk-blue mb-1">Dobrovolná účast</h4>
                          <p className="text-gray-600">
                            Sportuješ, protože to miluješ – dobrovolně a s respektem ke svým limitům.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                        <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-tjk-blue mb-1">Respekt k obsluze</h4>
                          <p className="text-gray-600">
                            Poslouchej pokyny týmu – jsou tu pro tvoji bezpečnost i zábavu.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                        <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-tjk-blue mb-1">Ohleduplnost</h4>
                          <p className="text-gray-600">
                            Buď cool k ostatním – všichni jsme tady kvůli stejné lásce ke sportu.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image column */}
                  <div className="relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                      <img
                        src="/images/snowkiting/jj_kom_jump.jpg"
                        alt="Sportovní aktivita na Komáří vížce"
                        className="w-full h-[500px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-white font-bold text-xl">
                          "Nejlepší rozhodnutí, které jsem udělal!"
                        </p>
                        <p className="text-white/80 text-sm mt-1">– Člen TJ Krupka</p>
                      </div>
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 transform -rotate-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="font-black text-2xl text-tjk-blue">100%</div>
                          <div className="text-xs text-gray-600">Bezpečnost</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* FAQ - Vylepšené */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-24">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                    Máš otázky?
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-black text-tjk-blue mb-4">
                    Nejčastější dotazy
                  </h2>
                  <p className="text-lg text-gray-600">
                    Všechno, co potřebuješ vědět, než se staneš členem.
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
                            Je areál přístupný veřejnosti?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed pl-11 pb-6">
                          Ne, areál slouží výhradně členům spolku Tělovýchovná
                          jednota Krupka z.s. – ale členství je otevřené všem,
                          kteří sdílejí naši vášeň! Není to žádný exkluzivní klub,
                          prostě místo pro lidi, co mají rádi sport. 🎿
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-2" className="border-b-2">
                        <AccordionTrigger className="text-lg font-bold text-tjk-blue hover:text-tjk-orange py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                              ?
                            </div>
                            Platí se jízdné?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed pl-11 pb-6">
                          Nevybírá se žádné jízdné! Členové platí členské příspěvky,
                          které podporují celý spolek – údržbu, rozvoj a akce.
                          Jednoduše řečeno: investuješ do společné věci, ne do jízdenek. 💪
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3" className="border-b-2">
                        <AccordionTrigger className="text-lg font-bold text-tjk-blue hover:text-tjk-orange py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                              ?
                            </div>
                            Jak se stanu členem?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed pl-11 pb-6">
                          Super jednoduché: pošleš přihlášku, výbor ji schválí
                          (což obvykle trvá pár dní) a pak už jen vyrazíš užívat
                          si Komárku! Kontaktuj nás níže a pomůžeme ti se vším. 🚀
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-4">
                        <AccordionTrigger className="text-lg font-bold text-tjk-blue hover:text-tjk-orange py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                              ?
                            </div>
                            Kde najdu pravidla?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed pl-11 pb-6">
                          Vše dostaneš po přijetí za člena – stanovy, interní
                          pravidla a všechny důležité info. Neboj, nic složitého,
                          jen základní věci, aby to fungovalo pro všechny. 📋
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>

          {/* Kontakt - Atraktivnější CTA */}
          <ScrollAnimation animation="fade-up">
            <section id="kontakt" className="mb-20">
              <div className="max-w-5xl mx-auto">
                <Card className="relative overflow-hidden border-0 shadow-2xl">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-tjk-blue via-purple-900 to-pink-900"></div>

                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                  </div>

                  <CardContent className="relative z-10 p-10 md:p-16 text-center text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-6">
                      <Sparkles className="h-5 w-5 text-yellow-300" />
                      <span className="font-semibold">Připravený na akci?</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6">
                      Pojď do toho s námi!
                    </h2>

                    <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10">
                      Máš dotazy? Chceš se dozvědět víc o členství? Kontaktuj nás
                      a my ti všechno vysvětlíme. Těšíme se na tebe! 🤙
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

                    <Button
                      size="lg"
                      className="bg-white text-tjk-blue hover:bg-gray-100 font-bold px-10 py-7 text-lg shadow-2xl transform hover:scale-105 transition-all"
                      asChild
                    >
                      <Link to="/kontakt">
                        <Mail className="mr-2 h-5 w-5" />
                        Kontaktní formulář
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProCleny;
