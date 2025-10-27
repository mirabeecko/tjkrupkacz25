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
  Wrench,
  Phone,
  Mail,
  ChevronRight,
  Zap,
  Sunset,
  CalendarDays
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
      label: "Značka",
      value: vehicle.brand || null,
      icon: <Bike className="w-5 h-5 text-orange-600" />
    },
    {
      label: "Model",
      value: vehicle.model || null,
      icon: <Bike className="w-5 h-5 text-orange-600" />
    },
    {
      label: "Objem motoru",
      value: vehicle.engine_capacity_cc ? `${vehicle.engine_capacity_cc} cc` : null,
      icon: <Gauge className="w-5 h-5 text-orange-600" />
    },
    {
      label: "Výkon",
      value: vehicle.power_kw && vehicle.power_hp ? `${vehicle.power_kw} kW / ${vehicle.power_hp} HP` : null,
      icon: <Zap className="w-5 h-5 text-orange-600" />
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

  const priceOptions = [
    {
      duration: "1 hodina",
      price: vehicle["1h_price_czk"],
      icon: <Clock className="w-6 h-6" />,
      popular: false
    },
    {
      duration: "3 hodiny",
      price: vehicle["3h_price_czk"],
      icon: <Clock className="w-6 h-6" />,
      popular: true
    },
    {
      duration: "Celý den",
      price: vehicle.day_price_czk,
      icon: <Sunset className="w-6 h-6" />,
      popular: true
    },
    {
      duration: "Víkend",
      price: vehicle.weekend_price_czk,
      icon: <CalendarDays className="w-6 h-6" />,
      popular: false
    },
  ].filter(option => option.price !== null);

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
        keywords={`půjčovna motocyklů, ${vehicle.brand}, ${vehicle.model}, enduro, KTM`}
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

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
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
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white">
                    <img
                      src={vehicle.photo_url || "/images/sluzby/pujcovna.jpg"}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Details */}
              <div>
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
                  <Bike className="w-5 h-5 text-orange-600" />
                  <span className="text-lg font-bold text-orange-600">{vehicle.brand}</span>
                </div>

                {/* Model */}
                <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">{vehicle.model}</h1>

                {/* Year Badge */}
                {vehicle.year && (
                  <Badge className="mb-6 bg-gray-100 text-gray-900 text-lg px-4 py-2 hover:bg-gray-200">
                    Rok výroby: {vehicle.year}
                  </Badge>
                )}

                {/* Description */}
                {vehicle.notes && (
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-orange-500 pl-6 italic">
                    {vehicle.notes}
                  </p>
                )}

                {/* CTA Button */}
                <Link to="/kontakt-pujcovna">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-xl py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] mb-8"
                  >
                    <Bike className="mr-3 h-6 w-6" />
                    Rezervovat tento motocykl
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-100 rounded-full">
                  <Wrench className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-blue-900">TECHNICKÉ SPECIFIKACE</span>
                </div>
                <h2 className="text-4xl font-black text-gray-900">Parametry motocyklu</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specifications.map((spec, idx) => (
                  <div key={idx} className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                        {spec.icon}
                      </div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{spec.label}</p>
                    </div>
                    <p className="text-2xl font-black text-gray-900 ml-11">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Professional Layout */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-orange-100 rounded-full">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-bold text-orange-900">CENÍK PRONÁJMU</span>
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4">Zvolte si délku pronájmu</h2>
                <p className="text-xl text-gray-600">Uvedené ceny jsou v českých korunách</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {priceOptions.map((option, idx) => (
                  <div
                    key={idx}
                    className={`relative p-8 rounded-3xl transition-all duration-300 hover:scale-105 ${
                      option.popular
                        ? 'bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-2xl ring-4 ring-orange-300'
                        : 'bg-white text-gray-900 shadow-lg hover:shadow-xl border-2 border-gray-200'
                    }`}
                  >
                    {option.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-yellow-400 text-gray-900 font-bold px-4 py-1 shadow-lg">
                          OBLÍBENÉ
                        </Badge>
                      </div>
                    )}

                    <div className={`flex items-center justify-center gap-2 mb-4 ${option.popular ? 'text-white' : 'text-gray-600'}`}>
                      {option.icon}
                      <span className="text-sm font-bold uppercase tracking-wide">{option.duration}</span>
                    </div>

                    <div className="text-center mb-2">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className={`text-5xl font-black ${option.popular ? 'text-white' : 'text-orange-600'}`}>
                          {option.price}
                        </span>
                        <span className={`text-2xl font-bold ${option.popular ? 'text-white/90' : 'text-gray-600'}`}>Kč</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-6 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 inline mr-2" />
                  Všechny ceny zahrnují kompletní výstroj a pojištění
                </p>
                <Link to="/kontakt-pujcovna">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-xl px-12 py-7 rounded-2xl shadow-xl hover:scale-105 transition-all"
                  >
                    Rezervovat teď
                    <ArrowLeft className="ml-3 h-6 w-6 rotate-180" />
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
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Co je v ceně pronájmu?</h2>
                <p className="text-xl text-white/90">Získáte kompletní servis bez starostí</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {rentalBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                    <span className="text-lg font-medium">{benefit}</span>
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
                <Card className="hover:shadow-xl transition-shadow border-2 hover:border-orange-500">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Telefon</h3>
                    <a href="tel:+420777734389" className="text-orange-600 hover:text-orange-700 font-semibold text-lg">
                      +420 777 734 389
                    </a>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-shadow border-2 hover:border-blue-500">
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
