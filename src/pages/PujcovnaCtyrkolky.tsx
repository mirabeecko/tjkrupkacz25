import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Truck,
  Package,
  CheckCircle2,
  Star,
  ArrowRight,
  Shield,
  Clock,
  Phone,
  Mail,
  Euro,
  Calendar,
  TreePine,
  Hammer,
  Trees,
  Snowflake,
  Wheat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ScrollAnimation from "@/components/ScrollAnimation";

interface WorkVehicle {
  id: number;
  brand: string | null;
  model: string | null;
  year: number | null;
  photo_url: string | null;
  notes: string | null;
  "1h_price_czk": number | null;
  "3h_price_czk": number | null;
  day_price_czk: number | null;
  weekend_price_czk: number | null;
}

const PujcovnaCtyrkolky: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [workVehicles, setWorkVehicles] = useState<WorkVehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    fetchWorkVehicles();
  }, []);

  const fetchWorkVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("moye", true)
        .eq("category", "work")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching work vehicles:", error);
      } else {
        setWorkVehicles(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Výkonné stroje",
      description: "Čtyřkolky s pohonem 4x4 zvládnou těžký terén i náročné práce",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Velká nosnost",
      description: "Vozík unese až 500 kg materiálu - dřevo, seno, stavební materiál",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexibilní pronájem",
      description: "Půjčte si na hodiny, dny nebo celý týden dle vašich potřeb",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Pojištění v ceně",
      description: "Základní pojištění a technická podpora pro klidnou práci",
      color: "from-green-500 to-emerald-600"
    }
  ];

  const useCases = [
    { text: "Přeprava stavebního materiálu", icon: Hammer },
    { text: "Práce na zahradě a pozemku", icon: Trees },
    { text: "Dovoz dřeva a palivového dříví", icon: TreePine },
    { text: "Transport sena a krmiva", icon: Wheat },
    { text: "Terénní práce v lese", icon: Trees },
    { text: "Úklid sněhu v zimě", icon: Snowflake },
    { text: "Přeprava nářadí a materiálu", icon: Package },
    { text: "Práce na stavbě", icon: Hammer }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Půjčovna Čtyřkolek a Vozíku na Práci - TJ Krupka"
        description="Pronájem čtyřkolek 4x4 a robustních vozíků na práci. Ideální pro přepravu materiálu, práce v terénu a na zahradě. Flexibilní půjčování, dostupné v Krušných horách."
        keywords="půjčovna čtyřkolek, pronájem vozíku, čtyřkolka na práci, vozík na dřevo, přeprava materiálu, Krušné hory"
        url="https://tjkrupka.cz/pujcovna-ctyrkolky"
      />

      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-500">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-dots-pattern"></div>
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <Truck
                key={i}
                className="absolute text-white/20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  transform: `rotate(${Math.random() * 45 - 22}deg)`
                }}
              />
            ))}
          </div>

          <div className="container px-4 mx-auto relative z-10">
            <ScrollAnimation animation="fadeIn">
              <div className="text-center text-white max-w-4xl mx-auto">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <Truck className="w-14 h-14 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-poppins font-bold mb-6">
                  Čtyřkolka s vozíkem
                </h1>
                <p className="text-2xl md:text-3xl text-white/95 leading-relaxed mb-4">
                  <span className="font-bold text-yellow-100">Odvezte si, co potřebujete!</span>
                </p>
                <p className="text-xl text-white/90 leading-relaxed">
                  Pronájem výkonné čtyřkolky s vozíkem
                  <br className="hidden md:block" />
                  pro práci na zahradě, stavbě nebo v terénu
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {benefits.map((benefit, index) => (
                <ScrollAnimation key={index} animation="slideUp" delay={index * 0.1}>
                  <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-orange-500 h-full">
                    <CardContent className="pt-8 pb-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white`}>
                        {benefit.icon}
                      </div>
                      <h3 className="font-poppins font-semibold text-xl mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>

            {/* Vehicles & Pricing */}
            <div className="max-w-6xl mx-auto">
              <ScrollAnimation animation="slideUp">
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-orange-100 text-orange-700 text-lg px-6 py-2">
                    Ceník
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                    Dostupné stroje
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Vyberte si čtyřkolku nebo vozík podle vašich potřeb
                  </p>
                </div>
              </ScrollAnimation>

              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">Načítám vozidla...</p>
                </div>
              ) : workVehicles.length === 0 ? (
                <ScrollAnimation animation="fadeIn">
                  <Card className="text-center py-16">
                    <CardContent>
                      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Připravujeme pro vás</h3>
                      <p className="text-gray-600 mb-6">
                        Momentálně přidáváme čtyřkolky a vozíky do naší nabídky.
                      </p>
                      <Link to="/kontakt">
                        <Button className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800">
                          <Phone className="mr-2 h-4 w-4" />
                          Kontaktujte nás pro více informací
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {workVehicles.map((vehicle, index) => (
                    <ScrollAnimation key={vehicle.id} animation="slideUp" delay={index * 0.1}>
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-500">
                        {vehicle.photo_url && (
                          <div className="relative h-64 overflow-hidden bg-gray-200">
                            <img
                              src={vehicle.photo_url}
                              alt={`${vehicle.brand} ${vehicle.model}`}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
                              }}
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-orange-600 text-white text-sm">
                                <Star className="w-3 h-3 mr-1 inline" fill="white" />
                                Dostupné
                              </Badge>
                            </div>
                          </div>
                        )}
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <h3 className="text-2xl font-bold mb-2">
                              {vehicle.brand} {vehicle.model}
                            </h3>
                            {vehicle.year && (
                              <p className="text-gray-600 dark:text-gray-400">Rok: {vehicle.year}</p>
                            )}
                            {vehicle.notes && (
                              <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                {vehicle.notes}
                              </p>
                            )}
                          </div>

                          <div className="space-y-3 mb-6">
                            {vehicle["1h_price_czk"] && (
                              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300">1 hodina</span>
                                <span className="font-bold text-xl text-orange-600">{vehicle["1h_price_czk"]} Kč</span>
                              </div>
                            )}
                            {vehicle["3h_price_czk"] && (
                              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300">3 hodiny</span>
                                <span className="font-bold text-xl text-orange-600">{vehicle["3h_price_czk"]} Kč</span>
                              </div>
                            )}
                            {vehicle.day_price_czk && (
                              <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-2 border-orange-200 dark:border-orange-700">
                                <span className="text-gray-700 dark:text-gray-300 font-semibold">1 den (nejoblíbenější)</span>
                                <span className="font-bold text-2xl text-orange-600">{vehicle.day_price_czk} Kč</span>
                              </div>
                            )}
                            {vehicle.weekend_price_czk && (
                              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300">Víkend (Pá-Ne)</span>
                                <span className="font-bold text-xl text-orange-600">{vehicle.weekend_price_czk} Kč</span>
                              </div>
                            )}
                          </div>

                          <Link to={`/kontakt-pujcovna?vehicle=${vehicle.id}`}>
                            <Button className="w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 font-bold text-lg py-6">
                              <Calendar className="mr-2 h-5 w-5" />
                              Rezervovat
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </ScrollAnimation>
                  ))}
                </div>
              )}
            </div>

            {/* Use Cases Section */}
            <ScrollAnimation animation="slideUp" delay={0.2}>
              <Card className="mt-16 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 border-2 border-orange-200 dark:border-orange-700">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-orange-600" />
                    Pro co se hodí?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {useCases.map((useCase, index) => {
                      const Icon = useCase.icon;
                      return (
                        <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <Icon className="w-5 h-5 text-gray-700 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{useCase.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Contact CTA */}
            <ScrollAnimation animation="fadeIn" delay={0.3}>
              <div className="mt-16 text-center">
                <Card className="max-w-2xl mx-auto bg-gradient-to-br from-orange-600 to-red-700 text-white border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold mb-4">Máte otázky?</h3>
                    <p className="text-xl text-white/90 mb-6">
                      Rádi vám poradíme s výběrem správného stroje pro vaši práci
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/kontakt">
                        <Button size="lg" variant="secondary" className="font-bold text-lg px-8 py-6 bg-white text-orange-600 hover:bg-gray-100">
                          <Mail className="mr-2 h-5 w-5" />
                          Napsat email
                        </Button>
                      </Link>
                      <a href="tel:+420777734389">
                        <Button size="lg" variant="secondary" className="font-bold text-lg px-8 py-6 bg-white text-orange-600 hover:bg-gray-100">
                          <Phone className="mr-2 h-5 w-5" />
                          +420 777 734 389
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PujcovnaCtyrkolky;
