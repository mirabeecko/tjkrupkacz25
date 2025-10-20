import React from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Sparkles, Target, Users, Award, CheckCircle2, ChevronRight, Heart, Star, Zap, TrendingUp, Baby, GraduationCap, Trophy } from "lucide-react";
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
    description: "Certifikovaná AIRBAG matrace splňující všechny bezpečnostní normy.",
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
        title="AIRBAG Matrace - Bezpečný trénink triků | TJ Krupka"
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
                <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl mb-3">
                    AIRBAG
                  </span>
                  <span className="block bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
                    Matrace
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-3xl mb-8 font-bold text-white/95 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
                  Bezpečný trénink triků a akrobatických prvků
                </p>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-12 drop-shadow-md">
                  Profesionální nafukovací matrace pro nácvik a zdokonalování náročných prvků bez rizika zranění
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/kontakt">
                    <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-white font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
                      Rezervovat trénink
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="#benefity">
                    <Button size="lg" variant="outline" className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 font-bold text-lg px-10 py-7 rounded-xl">
                      <Shield className="mr-2 h-5 w-5" />
                      Zjistit více
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

        {/* Benefity Section */}
        <section id="benefity" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-gradient-to-r from-tjk-blue to-cyan-600 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                  Výhody
                </Badge>
                <h2 className="font-montserrat font-bold text-3xl md:text-5xl text-tjk-blue mb-4">
                  Proč trénovat na AIRBAG matraci?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Objevte všechny výhody bezpečného tréninku na profesionální matraci
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <Card className="group border-2 border-gray-200 hover:border-tjk-blue transition-all duration-500 hover:shadow-2xl overflow-hidden h-full">
                    <CardHeader className="bg-gradient-to-br from-white to-gray-50 pb-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-4 bg-gradient-to-br ${benefit.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {React.cloneElement(benefit.icon, { className: "h-8 w-8 text-white" })}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl md:text-3xl text-tjk-blue group-hover:text-tjk-orange transition-colors mb-3">
                            {benefit.title}
                          </CardTitle>
                          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
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

        {/* Sponzoři Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                  <Heart className="h-4 w-4 inline mr-2" />
                  Poděkování
                </Badge>
                <h2 className="font-montserrat font-bold text-3xl md:text-5xl text-tjk-blue mb-4">
                  Děkujeme našim partnerům
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                  Bez jejich podpory by realizace AIRBAG matrace nebyla možná
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* LIVE VET Litoměřice */}
              <ScrollAnimation animation="fade-up" delay={100}>
                <Card className="group border-2 border-gray-200 hover:border-green-500 transition-all duration-500 hover:shadow-2xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="bg-white rounded-2xl p-6 mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center justify-center h-32">
                        {/* Placeholder pro logo LIVE VET */}
                        <div className="text-green-600 flex flex-col items-center gap-2">
                          <Heart className="h-16 w-16" />
                          <span className="font-bold text-xl">LIVE VET</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-tjk-blue mb-3 group-hover:text-green-600 transition-colors">
                      LIVE VET Litoměřice
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Veterinární klinika, která nám poskytla klíčovou podporu při realizaci projektu AIRBAG matrace.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="font-semibold">Hlavní partner</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              {/* Ústecký kraj */}
              <ScrollAnimation animation="fade-up" delay={200}>
                <Card className="group border-2 border-gray-200 hover:border-blue-500 transition-all duration-500 hover:shadow-2xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="bg-white rounded-2xl p-6 mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center justify-center h-32">
                        {/* Placeholder pro logo Ústeckého kraje */}
                        <div className="text-blue-600 flex flex-col items-center gap-2">
                          <Award className="h-16 w-16" />
                          <span className="font-bold text-xl">Ústecký kraj</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-tjk-blue mb-3 group-hover:text-blue-600 transition-colors">
                      Ústecký kraj
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Kraj Ústeckého kraje, jehož podpora umožnila rozšíření sportovního zázemí pro mladé sportovce.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="font-semibold">Oficiální partner</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>

            <ScrollAnimation animation="fade-up" delay={300}>
              <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl border border-blue-200">
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
