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
  Clock,
  Euro
} from "lucide-react";

interface Vehicle {
  id: number;
  brand: string | null;
  model: string | null;
  year: number | null;
  type: string | null;
  engine_capacity_cc: number | null;
  power_kw: number | null;
  power_hp: number | null;
  weight_kg: number | null;
  new_price_eur: number | null;
  current_price_eur: number | null;
  photo_url: string | null;
  notes: string | null;
  moye: boolean | null;
}

const Pujcovna = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("moye", true)
        .order("id", { ascending: true });

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

  const rentalBenefits = [
    "Profesionální servis a údržba všech vozidel",
    "Kompletní výstroj a ochranné pomůcky",
    "Instruktáž před jízdou zdarma",
    "Povinné ručení v ceně pronájmu",
    "Trasy a mapy okolí zdarma",
    "24/7 technická podpora"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/sluzby/pujcovna.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-red-900/30"></div>
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
                <Bike className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium">Premiové motocykly KTM</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl mb-6 animate-[fade-in-up_1.2s_ease-out_0.2s_both]">
                <span className="bg-gradient-to-r from-white via-orange-200 to-red-300 bg-clip-text text-transparent">
                  Půjčovna Motocyklů
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-3xl mb-8 font-light leading-relaxed animate-[fade-in-up_1.2s_ease-out_0.4s_both]">
                Zažijte adrenalin na <span className="font-semibold text-orange-300">prémiových motocyklech KTM</span>
                <br className="hidden md:block" />
                v krásném terénu Krušných hor
              </p>

              {/* Key Points */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 animate-[fade-in-up_1.2s_ease-out_0.6s_both]">
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

        {/* Vehicles Grid Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">
                Naše vozidla
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Vyberte si svůj <span className="text-orange-600">motocykl</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Všechny motocykly jsou pravidelně servisované a připravené pro váš zážitek
              </p>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
                <p className="mt-4 text-gray-600">Načítám vozidla...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {vehicles.map((vehicle) => (
                  <Card
                    key={vehicle.id}
                    className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-orange-300 overflow-hidden"
                  >
                    {/* Vehicle Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={vehicle.photo_url || "/images/sluzby/pujcovna.jpg"}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        {vehicle.type && (
                          <Badge className="bg-orange-500 text-white">
                            {vehicle.type}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Brand */}
                      <div className="flex items-center gap-2 mb-2">
                        <Bike className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-semibold text-orange-600">{vehicle.brand}</span>
                      </div>

                      {/* Vehicle Name */}
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{vehicle.model}</h3>

                      {/* Description */}
                      {vehicle.notes && (
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
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
                        {vehicle.power_kw && (
                          <div className="flex items-center gap-2 text-sm">
                            <Shield className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{vehicle.power_kw} kW</span>
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
                      {(vehicle.new_price_eur || vehicle.current_price_eur) && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-4">
                          <div className="grid grid-cols-2 gap-4">
                            {vehicle.new_price_eur && (
                              <div>
                                <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                  <Clock className="w-3 h-3" />
                                  <span>Hodina</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-2xl font-bold text-orange-600">
                                    {vehicle.new_price_eur}
                                  </span>
                                  <span className="text-sm text-gray-600">€</span>
                                </div>
                              </div>
                            )}
                            {vehicle.current_price_eur && (
                              <div>
                                <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Den</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-2xl font-bold text-orange-600">
                                    {vehicle.current_price_eur}
                                  </span>
                                  <span className="text-sm text-gray-600">€</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Link to={`/vozidlo/${vehicle.id}`}>
                        <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 group">
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

        {/* Benefits Section - Full Width */}
        <section className="relative py-20 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  Co je v ceně pronájmu?
                </h2>
                <p className="text-xl text-orange-100 drop-shadow-md">
                  Kompletní servis pro váš bezpečný a zábavný zážitek
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {rentalBenefits.map((benefit, index) => (
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
                <Link to="/kontakt-pujcovna">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-xl px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <Bike className="mr-2 h-6 w-6" />
                    Rezervovat motocykl
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Profesionální <span className="text-orange-600">péče</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Všechny motocykly procházejí pravidelným servisem a jsou připraveny pro maximální výkon
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pravidelný servis</h3>
                <p className="text-gray-600">
                  Kompletní kontrola a údržba po každé jízdě
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Bezpečnost první</h3>
                <p className="text-gray-600">
                  Kvalitní ochranné pomůcky a vybavení
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bike className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Špičková technika</h3>
                <p className="text-gray-600">
                  Nejnovější modely motocyklů KTM
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
