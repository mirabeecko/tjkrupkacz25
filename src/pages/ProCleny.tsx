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
} from "lucide-react";

const ProCleny = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

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

        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/sluzby/komarka.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
          </div>

          <div className="container relative z-20 px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Badge className="mb-4 bg-tjk-orange text-white border-0 px-4 py-2 text-sm font-semibold">
                Interní činnost spolku
              </Badge>
              <h1 className="font-montserrat font-black text-4xl md:text-6xl mb-6 leading-tight">
                Sportovní areál Komáří vížka
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Interní činnost pro členy spolku
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Důležité upozornění - Alert Box */}
          <ScrollAnimation animation="fade-up">
            <Alert className="mb-12 border-tjk-orange bg-orange-50">
              <AlertCircle className="h-5 w-5 text-tjk-orange" />
              <AlertTitle className="text-tjk-blue font-bold text-lg">
                Důležité upozornění
              </AlertTitle>
              <AlertDescription className="text-gray-700 text-base">
                Tato stránka slouží k informování o spolkové činnosti. Nejde o
                nabídku služeb veřejnosti.
              </AlertDescription>
            </Alert>
          </ScrollAnimation>

          {/* Sekce 1: Úvod */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-tjk-blue to-cyan-600 rounded-xl">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue">
                    O spolkové činnosti
                  </h2>
                </div>
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Areál Komáří vížka slouží k realizaci sportovní a
                      pohybové činnosti <strong>výhradně pro členy spolku</strong>{" "}
                      Tělovýchovná jednota Krupka z.s., IČO 46070516.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Nejedná se o veřejný komerční provoz ani o poskytování
                      služeb veřejnosti.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>

          {/* Sekce 2: Pro koho je areál určen */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue">
                    Pro koho je areál určen
                  </h2>
                </div>
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          Areál je určen <strong>pouze pro členy spolku</strong>,
                          kteří se účastní spolkové sportovní činnosti a řídí se
                          interními pravidly a pokyny obsluhy.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>

          {/* Sekce 3: Jak funguje členství */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue">
                    Jak funguje členství
                  </h2>
                </div>
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tjk-orange text-white flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-tjk-blue mb-2">
                            Vznik členství
                          </h3>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            Členství vzniká na základě{" "}
                            <strong>přihlášky a jejího schválení výborem spolku</strong>.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tjk-orange text-white flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-tjk-blue mb-2">
                            Členské příspěvky
                          </h3>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            Členské příspěvky slouží na{" "}
                            <strong>podporu činnosti spolku</strong> a{" "}
                            <strong>nejsou úhradou za jednotlivé služby</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>

          {/* Sekce 4: Bezpečnost a odpovědnost */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue">
                    Bezpečnost a odpovědnost
                  </h2>
                </div>
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-tjk-blue flex-shrink-0 mt-1" />
                        <p className="text-lg text-gray-700 leading-relaxed">
                          Sportovní činnost probíhá na základě{" "}
                          <strong>dobrovolné účasti členů</strong>.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-tjk-blue flex-shrink-0 mt-1" />
                        <p className="text-lg text-gray-700 leading-relaxed">
                          Každý člen je povinen{" "}
                          <strong>dbát pokynů obsluhy</strong> a chovat se
                          ohleduplně.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-tjk-blue flex-shrink-0 mt-1" />
                        <p className="text-lg text-gray-700 leading-relaxed">
                          Členové se účastní činnosti{" "}
                          <strong>
                            s ohledem na své schopnosti a zdravotní stav
                          </strong>
                          .
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>

          {/* FAQ Sekce */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue">
                    Časté otázky
                  </h2>
                </div>
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold text-tjk-blue hover:text-tjk-orange">
                          Je areál přístupný veřejnosti?
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed">
                          Ne, areál slouží výhradně členům spolku Tělovýchovná
                          jednota Krupka z.s. a není určen pro veřejnost.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg font-semibold text-tjk-blue hover:text-tjk-orange">
                          Platí se jízdné?
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed">
                          Nevybírá se jízdné. Členové hradí členské příspěvky,
                          které podporují činnost celého spolku.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3">
                        <AccordionTrigger className="text-lg font-semibold text-tjk-blue hover:text-tjk-orange">
                          Jak se stanu členem?
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed">
                          Členství vzniká podáním přihlášky a následným
                          schválením výborem spolku. Pro více informací nás
                          kontaktujte.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-4">
                        <AccordionTrigger className="text-lg font-semibold text-tjk-blue hover:text-tjk-orange">
                          Kde najdu pravidla?
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 leading-relaxed">
                          Členové se řídí stanovami a interními pravidly
                          spolku, které obdrží po přijetí za člena.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>

          {/* Sekce 5: Kontakt */}
          <ScrollAnimation animation="fade-up">
            <section className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue">
                    Máte dotazy?
                  </h2>
                </div>
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-8">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      Máte dotazy k členství nebo činnosti spolku? Kontaktujte
                      nás.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-md">
                          <Mail className="h-6 w-6 text-tjk-blue" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">E-mail</p>
                          <a
                            href="mailto:miroslavbroozek@gmail.com"
                            className="text-tjk-blue font-semibold hover:text-tjk-orange transition-colors"
                          >
                            miroslavbroozek@gmail.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-md">
                          <Phone className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Telefon</p>
                          <a
                            href="tel:+420777734389"
                            className="text-tjk-blue font-semibold hover:text-green-600 transition-colors"
                          >
                            +420 777 734 389
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button
                        asChild
                        className="w-full md:w-auto bg-gradient-to-r from-tjk-orange to-amber-600 hover:from-tjk-orange/90 hover:to-amber-600/90 text-white font-semibold px-8 py-6 text-lg"
                      >
                        <Link to="/kontakt">
                          Kontaktní formulář
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
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
