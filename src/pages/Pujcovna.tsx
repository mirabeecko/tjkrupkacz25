import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  Gauge,
  Weight,
  Calendar,
  Shield,
  Wrench,
  Car,
  Wind
} from "lucide-react";
import SEO from "@/components/SEO";

interface Vehicle {
  id: number;
  brand: string | null;
  model: string | null;
  year: number | null;
  engine_capacity_cc: number | null;
  power_kw: number | null;
  power_hp: number | null;
  weight_kg: number | null;
  "1h_price_czk": number | null;
  "3h_price_czk": number | null;
  day_price_czk: number | null;
  weekend_price_czk: number | null;
  photo_url: string | null;
  notes: string | null;
  moye: boolean | null;
  category: string | null;
}

type CategoryType = 'all' | 'motorcycle' | 'car' | 'kite';

const Pujcovna = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, [selectedCategory]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("vehicles")
        .select("*")
        .eq("moye", true);

      if (selectedCategory !== 'all') {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query.order("id", { ascending: true });

      if (error) {
        console.error("Error fetching vehicles:", error);
      } else {
        setVehicles(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all' as CategoryType, name: 'Vše', icon: <Wrench className="w-5 h-5" />, count: vehicles.length },
    { id: 'motorcycle' as CategoryType, name: 'Motocykly', icon: <Bike className="w-5 h-5" /> },
    { id: 'car' as CategoryType, name: 'Auta', icon: <Car className="w-5 h-5" /> },
    { id: 'kite' as CategoryType, name: 'Kite vybavení', icon: <Wind className="w-5 h-5" /> },
  ];

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'motorcycle':
        return 'Motocykly';
      case 'car':
        return 'Auta';
      case 'kite':
        return 'Kite vybavení';
      default:
        return 'Veškeré vybavení';
    }
  };

  const getCategoryDescription = () => {
    switch (selectedCategory) {
      case 'motorcycle':
        return 'Prémiové motocykly KTM připravené pro váš zážitek v terénu';
      case 'car':
        return 'Spolehlivá vozidla pro pohodlnou dopravu';
      case 'kite':
        return 'Profesionální kite vybavení pro snowkiting a landkiting';
      default:
        return 'Vyberte si z našeho kompletního sortimentu';
    }
  };

  const rentalBenefits = [
    "Profesionální servis a údržba všech vozidel",
    "Kompletní výstroj a ochranné pomůcky",
    "Instruktáž před jízdou zdarma",
    "Povinné ručení v ceně pronájmu",
    "Trasy a mapy okolí zdarma",
    "24/7 technická podpora"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title="Půjčovna - Motocykly, Auta, Kite Vybavení | Tělovýchovná jednota Krupka"
        description="Půjčovna motocyklů KTM, aut a kite vybavení v Krušných horách. Profesionální servis, kompletní výstroj a instruktáž zdarma."
        keywords="půjčovna motocyklů, KTM, enduro, půjčovna aut, kite vybavení, snowkiting, Krušné hory, Krupka"
        url="https://tjkrupka.cz/pujcovna"
      />

      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/sluzby/pujcovna.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-red-900/30"></div>
          </div>

          <div className="container relative z-20 px-4 py-20">
            <div className="max-w-5xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Shield className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium font-inter">Kompletní půjčovní služby</span>
              </div>

              <h1 className="font-poppins font-black text-5xl md:text-7xl lg:text-8xl mb-6">
                <span className="bg-gradient-to-r from-white via-orange-200 to-red-300 bg-clip-text text-transparent">
                  Půjčovna
                </span>
              </h1>

              <p className="text-xl md:text-3xl mb-8 font-light leading-relaxed font-inter">
                Motocykly • Auta • Kite vybavení
                <br className="hidden md:block" />
                <span className="text-orange-300">Vše na jednom místě</span>
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Profesionální servis</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Kompletní výstroj</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Instruktáž zdarma</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="sticky top-20 z-30 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  <span className="font-poppins">{category.name}</span>
                  {category.id === 'all' && vehicles.length > 0 && (
                    <Badge className={`ml-2 ${selectedCategory === 'all' ? 'bg-white/20' : 'bg-orange-100 text-orange-700'}`}>
                      {vehicles.length}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicles Grid Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                {getCategoryTitle()}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
                {getCategoryDescription()}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
                <p className="mt-4 text-gray-600 font-inter">Načítám vozidla...</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Žádné položky</h3>
                <p className="text-gray-600 font-inter">V této kategorii momentálně nemáme dostupné vybavení.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {vehicles.map((vehicle) => (
                  <Card
                    key={vehicle.id}
                    className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-orange-300 overflow-hidden"
                  >
                    {/* Vehicle Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img
                        src={vehicle.photo_url || "/images/sluzby/pujcovna.jpg"}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-orange-600 text-white font-semibold">
                          {vehicle.brand}
                        </Badge>
                      </div>
                      {vehicle.moye && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-green-500 text-white font-semibold">
                            Dostupné
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      {/* Vehicle Name */}
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 font-poppins">{vehicle.model}</h3>

                      {/* Description */}
                      {vehicle.notes && (
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm font-inter line-clamp-2">
                          {vehicle.notes}
                        </p>
                      )}

                      {/* Specifications */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {vehicle.engine_capacity_cc && (
                          <div className="flex items-center gap-2 text-sm">
                            <Gauge className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{vehicle.engine_capacity_cc}cc</span>
                          </div>
                        )}
                        {vehicle.power_hp && (
                          <div className="flex items-center gap-2 text-sm">
                            <Shield className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{vehicle.power_hp} HP</span>
                          </div>
                        )}
                        {vehicle.weight_kg && (
                          <div className="flex items-center gap-2 text-sm">
                            <Weight className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{vehicle.weight_kg} kg</span>
                          </div>
                        )}
                        {vehicle.year && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">Rok {vehicle.year}</span>
                          </div>
                        )}
                      </div>

                      {/* Pricing */}
                      {(vehicle.day_price_czk || vehicle.weekend_price_czk) && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Cena od</p>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-orange-600">
                                  {vehicle.day_price_czk || vehicle.weekend_price_czk}
                                </span>
                                <span className="text-sm text-gray-600 font-semibold">Kč / den</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Link to={`/vozidlo/${vehicle.id}`}>
                        <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 group font-semibold">
                          Zobrazit detail
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-20 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg font-poppins">
                  Co je v ceně pronájmu?
                </h2>
                <p className="text-xl text-orange-100 drop-shadow-md font-inter">
                  Kompletní servis pro váš bezpečný a zábavný zážitek
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {rentalBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0 mt-1 drop-shadow-lg" />
                    <span className="text-lg drop-shadow-md font-inter">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link to="/kontakt-pujcovna">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-xl px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <Shield className="mr-2 h-6 w-6" />
                    Kontaktovat nás
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
                <Wrench className="w-3 h-3 mr-1 inline" />
                Servis a údržba
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                Profesionální <span className="text-orange-600">péče</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
                Veškeré vybavení prochází pravidelným servisem a je připraveno pro maximální výkon
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-poppins">Pravidelný servis</h3>
                <p className="text-gray-600 font-inter">
                  Kompletní kontrola a údržba po každém pronájmu
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-poppins">Bezpečnost první</h3>
                <p className="text-gray-600 font-inter">
                  Kvalitní ochranné pomůcky a vybavení
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-poppins">Špičková kvalita</h3>
                <p className="text-gray-600 font-inter">
                  Prémiové značky a nejnovější modely
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pujcovna;
