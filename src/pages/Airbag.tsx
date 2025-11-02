import React from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Sparkles, Target, Users, Award, CheckCircle2, ChevronRight, Heart, Star, Zap, TrendingUp, Baby, GraduationCap, Trophy, ShieldCheck, Rabbit, Smile, BrainCircuit, School } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Bezpečný trénink",
    description: "Trénujte náročné triky bez rizika zranění. Měkké přistání garantuje maximální bezpečnost.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Rychlý progres",
    description: "Zvládněte nové prvky rychleji díky možnosti opakovaného bezpečného tréninku.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Profesionální vybavení",
    description: "AIRBAG matrace splňující všechny bezpečnostní normy.",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Pro všechny úrovně",
    description: "Od začátečníků po profesionály. Každý najde své možnosti rozvoje.",
    gradient: "from-purple-500 to-pink-500"
  }
];

const whoIsItFor = [
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Profesionální sportovci",
    description: "Zdokonalte své dovednosti a naučte se nové triky bez rizika.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Začátečníci",
    description: "Získejte sebevědomí a naučte se základy bezpečně.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: <Baby className="h-6 w-6" />,
    title: "Děti a mládež",
    description: "Bezpečné prostředí pro rozvoj dovedností dětí.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Sportovní školy",
    description: "Ideální pro tréninky a soustředění sportovních týmů.",
    color: "bg-orange-100 text-orange-600"
  }
];

const howItWorks = [
  {
    step: "1",
    title: "Rezervace",
    description: "Kontaktujte nás a rezervujte si termín pro trénink na AIRBAG matraci."
  },
  {
    step: "2",
    title: "Instruktáž",
    description: "Projdete bezpečnostní instruktáž a seznámíte se s pravidly používání."
  },
  {
    step: "3",
    title: "Trénink",
    description: "Trénujte pod dohledem instruktora a zdokonalujte své dovednosti."
  },
  {
    step: "4",
    title: "Progres",
    description: "Sledujte svůj pokrok a postupně zvyšujte náročnost triků."
  }
];

const Airbag = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="AIRBAG Matrace - Bezpečný trénink triků | Tělovýchovná jednota Krupka"
        description="Profesionální AIRBAG matrace pro bezpečný trénink triků a akrobatických prvků. Pro všechny úrovně - od začátečníků po profesionály."
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background with parallax effect */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/images/homepage/airbag.avif')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-transparent to-purple-900/50"></div>
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 6 + 3}px`,
                  height: `${Math.random() * 6 + 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`,
                  animation: `float ${Math.random() * 15 + 8}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          <div className="container relative z-20 px-4 py-20">
            <ScrollAnimation animation="fade-up" delay={200}>
              <div className="max-w-5xl mx-auto text-center text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 shadow-xl">
                  <Sparkles className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-bold">Profesionální tréninkové zařízení</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-montserrat font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl mb-3">
                    AIRBAG
                  </span>
                  <span className="block bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
                    Matrace
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-3xl mb-6 font-bold text-white/95 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
                  Profesionální dopadová matrace pro bezpečný trénink
                </p>
                <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md leading-relaxed">
                  Špičkové tréninkové zařízení umožňující bezpečný nácvik a zdokonalování náročných akrobatických prvků, triků a skoků. Ideální pro snowboardisty, lyžaře, freestyle bikery, skateboardisty a další adrenalinové sporty.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>Dopadová matrace</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>Profesionální dohled</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>Pro všechny úrovně</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex justify-center">
                  <Link to="/kontakt">
                    <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-white font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
                      Rezervovat trénink
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
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



        {/* Group Rental Section */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center px-4">
            <ScrollAnimation animation="fade-up">
              <h2 className="font-montserrat font-bold text-3xl md:text-5xl text-tjk-blue mb-4">
                Možnost pronájmu pro skupinu
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Plánujete teambuilding, sportovní soustředění nebo jen zábavný den s přáteli? Nabízíme možnost exkluzivního pronájmu AIRBAG matrace pro vaši skupinu. Užijte si soukromí a maximální prostor pro váš trénink a zábavu.
              </p>
              <Link to="/kontakt">
                <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-white font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
                  Kontaktujte nás
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </ScrollAnimation>
          </div>
        </section>

        {/* Benefity Section */}
        <section id="benefity" className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-tjk-blue to-cyan-600 text-white px-3 py-1 text-xs font-semibold shadow-lg">
                  Hlavní výhody
                </Badge>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-tjk-blue mb-3">
                  Proč trénovat s námi?
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  Objevte klíčové výhody našeho AIRBAGu pro váš trénink.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <ShieldCheck className="h-6 w-6" />,
                  title: "Maximální bezpečnost",
                  description: "Trénujte bez rizika. Naše matrace garantuje měkké a bezpečné dopady.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <Rabbit className="h-6 w-6" />,
                  title: "Rychlý progres",
                  description: "Opakujte triky do dokonalosti a posouvejte své hranice rychleji než kdy dřív.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: <Smile className="h-6 w-6" />,
                  title: "Překonání strachu",
                  description: "Získejte jistotu a sebedůvěru v bezpečném prostředí pod dohledem.",
                  gradient: "from-red-500 to-pink-500"
                },
                {
                  icon: <BrainCircuit className="h-6 w-6" />,
                  title: "Rozvoj dovedností",
                  description: "Zlepšete koordinaci, odvahu a techniku skoků pro jakýkoliv sport.",
                  gradient: "from-yellow-500 to-amber-500"
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Pro všechny úrovně",
                  description: "Ať jste začátečník nebo profík, AIRBAG je tu pro vás a vaše cíle.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: <School className="h-6 w-6" />,
                  title: "Profesionální zázemí",
                  description: "Využijte náš AIRBAG pro sportovní kurzy, školní programy a soustředění.",
                  gradient: "from-indigo-500 to-violet-500"
                }
              ].map((benefit, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <Card className="group border-gray-200 hover:border-tjk-blue transition-all duration-300 hover:shadow-lg overflow-hidden h-full bg-gray-50/50">
                    <CardContent className="p-6 text-center flex flex-col items-center">
                        <div className={`mb-4 p-3 inline-flex items-center justify-center bg-gradient-to-br ${benefit.gradient} rounded-full shadow-lg text-white`}>
                          {benefit.icon}
                        </div>
                        <h3 className="text-lg font-bold text-tjk-blue group-hover:text-tjk-orange transition-colors mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Jak to funguje */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                  Jak to funguje
                </Badge>
                <h2 className="font-montserrat font-bold text-3xl md:text-5xl text-tjk-blue mb-4">
                  Cesta k bezpečnému tréninku
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  4 jednoduché kroky k vašemu prvnímu tréninku
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((item, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <Card className="group relative overflow-hidden border-2 border-gray-200 hover:border-tjk-orange transition-all duration-500 hover:shadow-xl h-full">
                    {/* Step number badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-tjk-orange to-amber-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-black text-xl">{item.step}</span>
                    </div>

                    <CardContent className="pt-8 pb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-tjk-blue mb-3 group-hover:text-tjk-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Pro koho je AIRBAG určen */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                  Pro koho
                </Badge>
                <h2 className="font-montserrat font-bold text-3xl md:text-5xl text-tjk-blue mb-4">
                  AIRBAG je určen pro všechny
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Bez ohledu na věk nebo úroveň zkušeností
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoIsItFor.map((item, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <Card className="group text-center border-2 border-gray-200 hover:border-tjk-blue transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full">
                    <CardContent className="pt-8 pb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${item.color} rounded-2xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-tjk-blue mb-3 group-hover:text-tjk-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollAnimation animation="fade-up" delay={300}>
                <div className="text-center p-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl border border-blue-200">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    <strong className="text-tjk-blue">Děkujeme</strong> za důvěru a podporu, kterou nám poskytujete.
                    Díky vám můžeme nabídnout špičkové sportovní zázemí pro rozvoj mladých talentů v Krušných horách.
                    </p>
                </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-tjk-orange via-amber-500 to-orange-600"></div>

          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          </div>

          <div className="max-w-4xl mx-auto text-center text-white relative z-10">
            <ScrollAnimation animation="fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                <Zap className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-semibold">Začněte trénovat ještě dnes</span>
              </div>

              <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-6 leading-tight">
                Připraveni vyzkoušet AIRBAG?
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
                Kontaktujte nás a rezervujte si svůj první trénink na profesionální AIRBAG matraci.
                Náš tým vám rád poradí a pomůže s výběrem vhodného programu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/kontakt">
                  <Button size="lg" className="bg-white text-tjk-orange hover:bg-blue-50 font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300">
                    Kontaktovat nás
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/sluzby">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 backdrop-blur-md hover:bg-white/20 font-bold text-lg px-10 py-7 rounded-xl">
                    Další služby
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Sponzoři Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-white via-gray-50 to-white">
            <div className="max-w-6xl mx-auto">
                <ScrollAnimation animation="fade-up">
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                    <Heart className="h-4 w-4 inline mr-2" />
                    Partneři projektu
                    </Badge>
                    <h2 className="font-montserrat font-bold text-3xl md:text-5xl text-tjk-blue mb-4">
                    S podporou našich partnerů
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                    Tento projekt by nevznikl bez podpory <strong>Ústeckého kraje</strong> a <strong>Veterinární kliniky Vet-Live z Litoměřic</strong>, kterým tímto vyjadřujeme velké poděkování a upřímnou vděčnost. Díky jejich pomoci můžeme přinést do regionu moderní sportovní prvek, který bude sloužit dětem, sportovcům i široké veřejnosti.
                    </p>
                </div>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* LIVE VET Litoměřice */}
                <ScrollAnimation animation="fade-up" delay={100}>
                    <Card className="group border-2 border-gray-200 hover:border-green-500 transition-all duration-500 hover:shadow-2xl overflow-hidden">
                    <CardContent className="p-8">
                        <a href="https://www.veterina-live.eu" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center justify-center h-32">
                            {/* Logo LIVE VET - nahraďte vlastním logem */}
                            <img
                                src="/images/partners/livevet-logo.png"
                                alt="LIVE VET Litoměřice"
                                className="h-24 object-contain"
                                onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling.style.display = 'flex';
                                }}
                            />
                            <div className="text-green-600 flex-col items-center gap-2 hidden">
                                <Heart className="h-16 w-16" />
                                <span className="font-bold text-2xl">LIVE VET</span>
                            </div>
                            </div>
                        </div>
                        </a>

                        <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="h-5 w-5 fill-green-500 text-green-500" />
                        <Badge className="bg-green-500 text-white">Hlavní partner</Badge>
                        </div>

                        <h3 className="text-2xl font-bold text-tjk-blue mb-3 group-hover:text-green-600 transition-colors text-center">
                        LIVE VET Litoměřice
                        </h3>

                        <div className="space-y-3 text-left mb-4">
                        <p className="text-gray-700 leading-relaxed font-semibold text-green-700">
                            🏥 Komplexní veterinární péče 24/7
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Specializace:</strong> Moderní veterinární klinika poskytující špičkovou péči o malá i velká zvířata. Kompletní diagnostika, chirurgie, preventivní péče a pohotovostní služba.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Co je dělá unikátními:</strong> Nejmodernější vybavení v regionu, tým zkušených veterinářů, individuální přístup ke každému pacientovi a non-stop dostupnost.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Jejich podpora:</strong> Díky finanční a morální podpoře LIVE VET jsme mohli realizovat projekt AIRBAG matrace a poskytnout tak bezpečné tréninkové zázemí pro mladé sportovce.
                        </p>
                        </div>

                        <a
                        href="https://www.veterina-live.eu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
                        >
                        <span>Navštivte web LIVE VET</span>
                        <ChevronRight className="h-4 w-4" />
                        </a>
                    </CardContent>
                    </Card>
                </ScrollAnimation>

                {/* Ústecký kraj */}
                <ScrollAnimation animation="fade-up" delay={200}>
                    <Card className="group border-2 border-gray-200 hover:border-blue-500 transition-all duration-500 hover:shadow-2xl overflow-hidden">
                    <CardContent className="p-8">
                        <a href="https://www.kr-ustecky.cz" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center justify-center h-32">
                            {/* Logo Ústeckého kraje - nahraďte vlastním logem */}
                            <img
                                src="/images/partners/ustecky-kraj-logo.png"
                                alt="Ústecký kraj"
                                className="h-24 object-contain"
                                onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling.style.display = 'flex';
                                }}
                            />
                            <div className="text-blue-600 flex-col items-center gap-2 hidden">
                                <Award className="h-16 w-16" />
                                <span className="font-bold text-2xl">Ústecký kraj</span>
                            </div>
                            </div>
                        </div>
                        </a>

                        <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="h-5 w-5 fill-blue-500 text-blue-500" />
                        <Badge className="bg-blue-500 text-white">Oficiální partner</Badge>
                        </div>

                        <h3 className="text-2xl font-bold text-tjk-blue mb-3 group-hover:text-blue-600 transition-colors text-center">
                        Ústecký kraj
                        </h3>

                        <div className="space-y-3 text-left mb-4">
                        <p className="text-gray-700 leading-relaxed font-semibold text-blue-700">
                            🏛️ Regionální samospráva a podpora rozvoje
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Zaměření:</strong> Ústecký kraj podporuje rozvoj regionu v oblastech vzdělávání, kultury, sportu, sociálních služeb a infrastruktury. Aktivně podporuje projekty zaměřené na mládež a sport.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Sportovní podpora:</strong> Kraj dlouhodobě investuje do sportovní infrastruktury a podporuje sportovní aktivity dětí a mládeže. Cílem je vytvářet kvalitní podmínky pro rozvoj talentů.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Význam podpory:</strong> Dotace od Ústeckého kraje výrazně přispěla k realizaci AIRBAG matrace, která slouží jako moderní tréninkové zařízení pro bezpečný rozvoj dovedností mladých sportovců v Krušnohoří.
                        </p>
                        </div>

                        <a
                        href="https://www.kr-ustecky.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                        >
                        <span>Navštivte web Ústeckého kraje</span>
                        <ChevronRight className="h-4 w-4" />
                        </a>
                    </CardContent>
                    </Card>
                </ScrollAnimation>
                </div>
            </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default Airbag;
