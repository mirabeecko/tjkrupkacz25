import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Wind,
  Mountain,
  Users,
  Calendar,
  Award,
  ChevronDown,
  Snowflake,
  CheckCircle2,
  Star,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const courseBenefits = [
    "Profesionální instruktoři s letitou zkušeností",
    "Kvalitní výukový materiál a bezpečnostní vybavení",
    "Malé skupiny pro individuální přístup",
    "Praxe na sněhu v Krušných horách",
    "Certifikát po absolvování kurzu"
  ];

  const courseTypes = [
    {
      title: "Začátečníci",
      icon: <Snowflake className="w-10 h-10 text-blue-400" />,
      duration: "3 dny",
      description: "Naučte se základy snowkitingu od nuly. Ovládání kitu, bezpečnost a první jízdy.",
      price: "od 4 500 Kč"
    },
    {
      title: "Pokročilí",
      icon: <Wind className="w-10 h-10 text-sky-500" />,
      duration: "2 dny",
      description: "Zdokonalte svou techniku, triky a jízdu ve složitějších podmínkách.",
      price: "od 3 500 Kč"
    },
    {
      title: "Individuální",
      icon: <Award className="w-10 h-10 text-amber-500" />,
      duration: "dle dohody",
      description: "Kurz šitý na míru vašim potřebám a úrovni dovedností.",
      price: "od 2 000 Kč/hod"
    }
  ];

  const testimonials = [
    {
      name: "Martin K.",
      text: "Úžasný zážitek! Instruktoři jsou skvělí a za 3 dny jsem se naučil jezdit. Určitě doporučuji!",
      rating: 5
    },
    {
      name: "Petra S.",
      text: "Snowkiting je neuvěřitelný sport a tento kurz byl perfektní úvod. Krušné hory jsou ideální!",
      rating: 5
    },
    {
      name: "Jan V.",
      text: "Profesionální přístup, skvělá atmosféra a nádherné prostředí. Vrátím se určitě!",
      rating: 5
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-cyan-900/30"></div>
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          <div className="container relative z-20 px-4 py-20">
            <div className="max-w-5xl mx-auto text-center text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-[fade-in_1s_ease-out]">
                <Snowflake className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium">Zimní sezóna 2025 je tady!</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl mb-6 animate-[fade-in-up_1.2s_ease-out_0.2s_both]">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                  Snowkiting v Krušných horách
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-3xl mb-8 font-light leading-relaxed animate-[fade-in-up_1.2s_ease-out_0.4s_both]">
                Objevte adrenalin na <span className="font-semibold text-cyan-300">sněhu a větru</span>
                <br className="hidden md:block" />
                s profesionálními instruktory TJ Krupka
              </p>

              {/* Key Points */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 animate-[fade-in-up_1.2s_ease-out_0.6s_both]">
                <div className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Kurzy pro všechny úrovně</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Certifikovaní instruktoři</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Zapůjčení vybavení</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fade-in-up_1.2s_ease-out_0.8s_both]">
                <Link to="/snowkiting-kurzy">
                  <Button size="lg" className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xl px-8 py-6 rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1">
                    <Calendar className="mr-2 h-6 w-6" />
                    Zobrazit kurzy
                    <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
                <Link to="/o-nas">
                  <Button size="lg" variant="outline" className="font-bold text-xl px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300">
                    <Mountain className="mr-2 h-6 w-6" />
                    O nás
                  </Button>
                </Link>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="h-10 w-10 text-white/60" />
            </div>
          </div>
        </section>

        {/* Course Types Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
                Naše kurzy
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Vyberte si svůj <span className="text-blue-600">snowkiting kurz</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bez ohledu na vaši úroveň máme pro vás připravený kurz, který vás posune dál
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {courseTypes.map((course, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-300"
                >
                  <CardContent className="p-8">
                    <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                      {course.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="text-3xl font-bold text-blue-600 mb-6">
                      {course.price}
                    </div>
                    <Link to="/snowkiting-kurzy">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                        Zobrazit detaily
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section - Full Width */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  Proč kurz u nás?
                </h2>
                <p className="text-xl text-blue-100 drop-shadow-md">
                  Poskytneme vám vše, co potřebujete pro bezpečný a zábavný start
                </p>
              </div>

              <div className="grid gap-6">
                {courseBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0 mt-1 drop-shadow-lg" />
                    <span className="text-lg drop-shadow-md">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link to="/kontakt">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-xl px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <Calendar className="mr-2 h-6 w-6" />
                    Chci začít!
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-200">
                Reference
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Co říkají naši <span className="text-blue-600">absolventi</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">{testimonial.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section - Full Width with Enhanced Design */}
        <section className="relative py-24 bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          {/* Animated snowflakes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <Snowflake
                key={i}
                className="absolute text-white/20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${20 + Math.random() * 30}px`,
                  height: `${20 + Math.random() * 30}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl animate-[fadeInUp_1s_ease-out]">
                Připraveni na dobrodružství?
              </h2>
              <p className="text-2xl md:text-3xl mb-12 text-blue-100 drop-shadow-lg animate-[fadeInUp_1s_ease-out_0.2s_both]">
                Přidejte se k nám a zažijte snowkiting v krásném prostředí Krušných hor
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-[fadeInUp_1s_ease-out_0.4s_both]">
                <Link to="/kontakt">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-xl px-12 py-7 rounded-2xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300">
                    <Users className="mr-2 h-6 w-6" />
                    Kontaktujte nás
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100 drop-shadow-md animate-[fadeInUp_1s_ease-out_0.6s_both]">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <Wind className="w-6 h-6" />
                  <span className="font-semibold">50+ spokojených účastníků ročně</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <Award className="w-6 h-6" />
                  <span className="font-semibold">10+ let zkušeností</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <Mountain className="w-6 h-6" />
                  <span className="font-semibold">Krušné hory</span>
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

export default Index;
