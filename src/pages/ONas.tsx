import React from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Bike, Snowflake, Users, Activity, Hotel, Home, Shield, Heart, GraduationCap, Building2, Footprints, Wind, Baby, Award, Sparkles, TrendingUp, Target, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const facilities = [
  {
    name: "Sportovní areál",
    icon: <Mountain className="w-8 h-8" />,
    desc: "Komplexní zázemí pro zimní i letní sporty v srdci Krušných hor.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Ubytování",
    icon: <Hotel className="w-8 h-8" />,
    desc: "Kapacitní ubytovací zařízení pro sportovní soustředění, školy i rodinné pobyty.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "AIRBAG matrace",
    icon: <Shield className="w-8 h-8" />,
    desc: "Bezpečný trénink triků a akrobatických prvků na profesionální nafukovací matraci.",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    name: "Práce s dětmi",
    icon: <Baby className="w-8 h-8" />,
    desc: "Sportovní kroužky, tábory a systematická výchova mladých sportovců.",
    gradient: "from-pink-500 to-rose-500"
  }
];

const values = [
  {
    title: "50 let tradice",
    icon: <Building2 className="w-10 h-10" />,
    desc: "Spojujeme generace sportovců od roku 1974.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    title: "Široký záběr",
    icon: <Activity className="w-10 h-10" />,
    desc: "Od zimních sportů přes MTB až po stolní tenis a kitesurfing.",
    gradient: "from-tjk-blue to-cyan-500"
  },
  {
    title: "Moderní zázemí",
    icon: <Home className="w-10 h-10" />,
    desc: "Investujeme do vybavení a infrastruktury pro maximální pohodlí.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Komunita",
    icon: <Heart className="w-10 h-10" />,
    desc: "Rodina sportovců všech věkových kategorií a dovedností.",
    gradient: "from-red-500 to-pink-500"
  }
];

const stats = [
  { number: "50+", label: "Let tradice", icon: <Award className="h-6 w-6" /> },
  { number: "1000+", label: "Spokojených sportovců", icon: <Users className="h-6 w-6" /> },
  { number: "15+", label: "Sportovních aktivit", icon: <Activity className="h-6 w-6" /> },
  { number: "365", label: "Dní v roce otevřeno", icon: <TrendingUp className="h-6 w-6" /> }
];

const ONas = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="O nás - Tělovýchovná jednota Krupka z.s."
        description="50 let tradice sportu v Krušných horách. Moderní sportovní areál, práce s mládeží a široká nabídka sportovních aktivit."
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section - Vylepšený s animacemi */}
        <section className="relative bg-gradient-to-br from-tjk-blue via-blue-700 to-blue-900 text-white py-24 md:py-32 px-4 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 8}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.1
                }}
              >
                {i % 3 === 0 && <Mountain className="h-8 w-8" />}
                {i % 3 === 1 && <Bike className="h-8 w-8" />}
                {i % 3 === 2 && <Snowflake className="h-8 w-8" />}
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <ScrollAnimation animation="fade-up" delay={200}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold">Od roku 1974</span>
              </div>

              <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                  Tělovýchovná jednota
                </span>
                <span className="block bg-gradient-to-r from-cyan-200 via-amber-200 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl mt-2">
                  Krupka z.s.
                </span>
              </h1>

              <p className="text-xl md:text-3xl mb-4 font-bold text-white/95 drop-shadow-lg">
                50 let tradice sportu v Krušných horách
              </p>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12 drop-shadow-md leading-relaxed">
                Od roku 1974 budujeme sportovní komunitu, provozujeme moderní areál a věnujeme se systematické práci s dětmi a mládeží. Jsme domovem pro širokou škálu sportů.
              </p>
            </ScrollAnimation>

            {/* Stats Grid */}
            <ScrollAnimation animation="fade-up" delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-white/20 rounded-xl">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            {/* CTA Buttons */}
            <ScrollAnimation animation="fade-up" delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Link to="/sluzby">
                  <Button size="lg" className="bg-gradient-to-r from-tjk-orange to-amber-500 hover:from-tjk-orange/90 hover:to-amber-500/90 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
                    Naše služby
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 font-bold text-lg px-8 py-6 rounded-xl">
                    Kontaktujte nás
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Co nabízíme - Vylepšený design */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-tjk-blue text-white px-4 py-2 text-sm font-semibold">
                  Naše služby
                </Badge>
                <h2 className="font-montserrat font-bold text-3xl md:text-5xl text-tjk-blue mb-4">
                  Co nabízíme
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Komplexní sportovní zázemí pro všechny věkové kategorie a úrovně
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {facilities.map((facility, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <Card className="group border-2 border-gray-200 hover:border-tjk-blue transition-all duration-500 hover:shadow-2xl overflow-hidden h-full">
                    <CardHeader className="bg-gradient-to-br from-white to-gray-50 pb-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-4 bg-gradient-to-br ${facility.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {React.cloneElement(facility.icon, { className: "w-8 h-8 text-white" })}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl md:text-3xl text-tjk-blue group-hover:text-tjk-orange transition-colors mb-2">
                            {facility.name}
                          </CardTitle>
                          <CardDescription className="text-base md:text-lg text-gray-700 leading-relaxed">
                            {facility.desc}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Naše hodnoty - Vylepšený design */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-gradient-to-r from-tjk-blue to-cyan-600 text-white px-4 py-2 text-sm font-semibold">
                  Naše hodnoty
                </Badge>
                <h2 className="font-montserrat font-bold text-3xl md:text-5xl text-tjk-blue mb-4">
                  Proč právě my
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Více než půl století zkušeností a neustálý rozvoj
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                  <div className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-gray-100 hover:border-tjk-blue">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className={`p-5 bg-gradient-to-br ${value.gradient} rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        {React.cloneElement(value.icon, { className: "w-10 h-10 text-white" })}
                      </div>
                      <h3 className="font-montserrat font-bold text-xl md:text-2xl text-tjk-blue group-hover:text-tjk-orange transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Historie - Vylepšený design s timeline */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold">
                  Naše cesta
                </Badge>
                <h2 className="font-montserrat font-bold text-3xl md:text-5xl text-tjk-blue mb-4">
                  Naše historie
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Více než 50 let budujeme sportovní komunitu v Krušných horách
                </p>
              </div>
            </ScrollAnimation>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-tjk-blue via-cyan-500 to-tjk-orange"></div>

              <div className="space-y-12">
                <ScrollAnimation animation="fade-right">
                  <Card className="md:w-[calc(50%-2rem)] md:ml-auto bg-white border-2 border-blue-200 hover:border-tjk-blue transition-all duration-300 hover:shadow-2xl">
                    <CardContent className="pt-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-tjk-blue to-cyan-600 rounded-xl shadow-lg">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-tjk-blue text-white text-sm font-bold px-3 py-1">
                          1974 - Založení
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        <strong>Tělovýchovná jednota Krupka z.s.</strong> byla založena v roce 1974 s cílem rozvíjet sport a tělesnou kulturu v regionu Krušných hor. Od začátku jsme kladli důraz na práci s mládeží a vytváření kvalitního zázemí.
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-left">
                  <Card className="md:w-[calc(50%-2rem)] bg-white border-2 border-green-200 hover:border-green-500 transition-all duration-300 hover:shadow-2xl">
                    <CardContent className="pt-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-green-500 text-white text-sm font-bold px-3 py-1">
                          1974-2024 - Rozvoj
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        Během pěti dekád jsme prošli výraznou transformací – od malého sportovního klubu až po moderní spolek s <strong>provozem komplexního sportovního areálu</strong>. Investovali jsme do infrastruktury, ubytování a špičkového vybavení.
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-right">
                  <Card className="md:w-[calc(50%-2rem)] md:ml-auto bg-white border-2 border-pink-200 hover:border-pink-500 transition-all duration-300 hover:shadow-2xl">
                    <CardContent className="pt-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-lg">
                          <Baby className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-pink-500 text-white text-sm font-bold px-3 py-1">
                          Práce s mládeží
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        Naše práce s <strong>dětmi a mládeží</strong> je prioritou. Provozujeme sportovní kroužky, pořádáme letní tábory a soustředění, systematicky podporujeme mladé talenty a pomáháme jim rozvíjet nejen sportovní dovednosti, ale i charakterové vlastnosti.
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-left">
                  <Card className="md:w-[calc(50%-2rem)] bg-white border-2 border-purple-200 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl">
                    <CardContent className="pt-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                          <Activity className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-purple-500 text-white text-sm font-bold px-3 py-1">
                          Široká nabídka
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        Dnes nabízíme <strong>široký rozsah sportovních aktivit</strong> – od stolního tenisu, přes zimní sporty (lyžování, snowboarding), horskou cyklistiku (MTB), až po adrenalinové sporty jako kitesurfing. Ubytování využívají sportovní týmy, školy i rodiny.
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up">
                  <Card className="bg-gradient-to-br from-tjk-blue to-cyan-600 text-white border-0 shadow-2xl">
                    <CardContent className="pt-8 text-center">
                      <div className="flex justify-center mb-6">
                        <div className="p-5 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl">
                          <Award className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <Badge className="mb-4 bg-white/20 backdrop-blur-md text-white text-sm font-bold px-4 py-2">
                        Dnes
                      </Badge>
                      <p className="text-xl md:text-2xl font-bold mb-4 leading-relaxed">
                        50 let tradice nás zavazuje k uchování hodnot i neustálému rozvoji
                      </p>
                      <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
                        Jsme hrdí na to, že spojujeme generace sportovců a vytváříme prostředí, kde může každý najít svou cestu ke sportu a zdravému životnímu stylu. Naše vize je jasná – být <strong>předním sportovním centrem Krušných hor</strong>.
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Vylepšený */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-tjk-blue via-blue-700 to-cyan-600"></div>

          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          </div>

          <div className="max-w-4xl mx-auto text-center text-white relative z-10">
            <ScrollAnimation animation="fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold">Připojte se k nám</span>
              </div>

              <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-6 leading-tight">
                Staňte se součástí naší<br />sportovní rodiny
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
                Ať už hledáte sportovní vyžití pro sebe nebo své děti, plánujete soustředění nebo ubytování v krásném prostředí Krušných hor – jsme tu pro vás.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/kontakt">
                  <Button size="lg" className="bg-white text-tjk-blue hover:bg-blue-50 font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300">
                    Kontaktujte nás
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/sluzby">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 backdrop-blur-md hover:bg-white/20 font-bold text-lg px-10 py-7 rounded-xl">
                    Prohlédnout služby
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
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

export default ONas;
