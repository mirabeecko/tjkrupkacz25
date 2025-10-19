import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Bike,
  CheckCircle2,
  Gauge,
  Weight,
  Calendar,
  Shield,
  Clock,
  Euro,
  Wrench,
  Phone,
  Mail,
  ChevronRight
} from "lucide-react";
import SEO from "@/components/SEO";

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

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching vehicle:", error);
        setError("Vozidlo nebylo nalezeno");
      } else {
        setVehicle(data);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Došlo k chybě při načítání vozidla");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header toggleNavbar={toggleNavbar} />
        <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mb-4"></div>
            <p className="text-gray-600">Načítám informace o vozidle...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header toggleNavbar={toggleNavbar} />
        <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Vozidlo nenalezeno</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link to="/pujcovna">
              <Button className="bg-gradient-to-r from-orange-600 to-red-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zpět na půjčovnu
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const specifications = [
    {
      label: "Objem motoru",
      value: vehicle.engine_capacity_cc ? `${vehicle.engine_capacity_cc} cc` : null,
      icon: <Gauge className="w-5 h-5 text-orange-600" />
    },
    {
      label: "Výkon",
      value: vehicle.power_kw && vehicle.power_hp ? `${vehicle.power_kw} kW / ${vehicle.power_hp} HP` : null,
      icon: <Shield className="w-5 h-5 text-orange-600" />
    },
    {
      label: "Hmotnost",
      value: vehicle.weight_kg ? `${vehicle.weight_kg} kg` : null,
      icon: <Weight className="w-5 h-5 text-orange-600" />
    },
    {
      label: "Rok výroby",
      value: vehicle.year ? vehicle.year.toString() : null,
      icon: <Calendar className="w-5 h-5 text-orange-600" />
    },
  ].filter(spec => spec.value !== null);

  const rentalBenefits = [
    "Profesionální servis a údržba",
    "Kompletní výstroj v ceně",
    "Instruktáž před jízdou zdarma",
    "Povinné ručení v ceně",
    "Trasy a mapy okolí",
    "24/7 technická podpora"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={`${vehicle.brand} ${vehicle.model} - Půjčovna Motocyklů`}
        description={`Zapůjčte si ${vehicle.brand} ${vehicle.model}. ${vehicle.notes || 'Prémiový motocykl s profesionálním servisem.'}`}
        keywords={`půjčovna motocyklů, ${vehicle.brand}, ${vehicle.model}, ${vehicle.type}, enduro, KTM`}
        url={`https://tjkrupka.cz/vozidlo/${vehicle.id}`}
      />

      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-600 hover:text-orange-600">Domů</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/pujcovna" className="text-gray-600 hover:text-orange-600">Půjčovna</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-semibold">{vehicle.brand} {vehicle.model}</span>
            </div>
          </div>
        </section>

        {/* Hero Section with Image */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <Link to="/pujcovna">
              <Button variant="outline" className="mb-6 group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Zpět na půjčovnu
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Image */}
              <div className="relative">
                <div className="sticky top-24">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                    <img
                      src={vehicle.photo_url || "/images/sluzby/pujcovna.jpg"}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                    {vehicle.type && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-orange-500 text-white text-lg px-4 py-2">
                          {vehicle.type}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div>
                {/* Brand */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                    <Bike className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-lg font-semibold text-orange-600">{vehicle.brand}</span>
                </div>

                {/* Model */}
                <h1 className="text-5xl font-black mb-6 text-gray-900">{vehicle.model}</h1>

                {/* Description */}
                {vehicle.notes && (
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {vehicle.notes}
                  </p>
                )}

                {/* Specifications */}
                <Card className="mb-8 border-2">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Wrench className="w-6 h-6 text-orange-600" />
                      Technické specifikace
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {specifications.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          {spec.icon}
                          <div>
                            <p className="text-sm text-gray-600">{spec.label}</p>
                            <p className="text-lg font-bold text-gray-900">{spec.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                {(vehicle.new_price_eur || vehicle.current_price_eur) && (
                  <Card className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Euro className="w-6 h-6 text-orange-600" />
                        Ceník pronájmu
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {vehicle.new_price_eur && (
                          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                              <Clock className="w-5 h-5" />
                              <span className="font-semibold">Hodina</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-4xl font-black text-orange-600">
                                {vehicle.new_price_eur}
                              </span>
                              <span className="text-xl text-gray-600">€</span>
                            </div>
                          </div>
                        )}
                        {vehicle.current_price_eur && (
                          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                              <Calendar className="w-5 h-5" />
                              <span className="font-semibold">Den</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-4xl font-black text-orange-600">
                                {vehicle.current_price_eur}
                              </span>
                              <span className="text-xl text-gray-600">€</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA Button */}
                <Link to="/kontakt-pujcovna">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-xl py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                  >
                    <Bike className="mr-3 h-6 w-6" />
                    Rezervovat tento motocykl
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Co je v ceně pronájmu?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {rentalBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Máte dotazy?</h2>
              <p className="text-xl text-gray-600 mb-12">
                Kontaktujte nás pro více informací o tomto motocyklu nebo pro rezervaci.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Telefon</h3>
                    <a href="tel:+420773090842" className="text-orange-600 hover:text-orange-700 font-semibold text-lg">
                      +420 773 090 842
                    </a>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <a href="mailto:pujcovna@tjkrupka.cz" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
                      pujcovna@tjkrupka.cz
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VehicleDetail;
