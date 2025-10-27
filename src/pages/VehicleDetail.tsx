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
  Phone,
  Mail,
  ChevronRight,
  Zap,
  Star,
  MapPin,
  Users,
  Info
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
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

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
            <p className="text-gray-600 font-poppins">Načítám informace...</p>
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

  const priceOptions = [
    {
      id: 0,
      duration: "1 hodina",
      price: vehicle["1h_price_czk"],
      perUnit: "/ hod",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 1,
      duration: "3 hodiny",
      price: vehicle["3h_price_czk"],
      perUnit: "/ 3 hod",
      icon: <Clock className="w-5 h-5" />,
      badge: "Nejoblíbenější"
    },
    {
      id: 2,
      duration: "Celý den",
      price: vehicle.day_price_czk,
      perUnit: "/ den",
      icon: <Calendar className="w-5 h-5" />,
      badge: "Nejlepší cena"
    },
    {
      id: 3,
      duration: "Víkend",
      price: vehicle.weekend_price_czk,
      perUnit: "/ víkend",
      icon: <Calendar className="w-5 h-5" />
    },
  ].filter(option => option.price !== null);

  const specifications = [
    {
      label: "Značka",
      value: vehicle.brand,
      icon: <Bike className="w-5 h-5" />
    },
    {
      label: "Model",
      value: vehicle.model,
      icon: <Bike className="w-5 h-5" />
    },
    {
      label: "Rok",
      value: vehicle.year?.toString(),
      icon: <Calendar className="w-5 h-5" />
    },
    {
      label: "Objem",
      value: vehicle.engine_capacity_cc ? `${vehicle.engine_capacity_cc} cc` : null,
      icon: <Gauge className="w-5 h-5" />
    },
    {
      label: "Výkon",
      value: vehicle.power_hp ? `${vehicle.power_hp} HP` : null,
      icon: <Zap className="w-5 h-5" />
    },
    {
      label: "Hmotnost",
      value: vehicle.weight_kg ? `${vehicle.weight_kg} kg` : null,
      icon: <Weight className="w-5 h-5" />
    },
  ].filter(spec => spec.value);

  const features = [
    { icon: <Shield className="w-5 h-5" />, text: "Pojištění v ceně" },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: "Kompletní výstroj" },
    { icon: <Users className="w-5 h-5" />, text: "Instruktáž zdarma" },
    { icon: <MapPin className="w-5 h-5" />, text: "Mapy tras" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm font-inter">
              <Link to="/" className="text-gray-600 hover:text-orange-600 transition-colors">Domů</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/pujcovna" className="text-gray-600 hover:text-orange-600 transition-colors">Půjčovna</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{vehicle.brand} {vehicle.model}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <Link to="/pujcovna" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zpět na výběr vozidel
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10]">
                <img
                  src={vehicle.photo_url || "/images/sluzby/pujcovna.jpg"}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
                {vehicle.moye && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white font-bold px-4 py-2 text-sm shadow-lg">
                      Dostupné
                    </Badge>
                  </div>
                )}
              </div>

              {/* Title & Rating */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-orange-600 border-orange-600 font-semibold">
                    {vehicle.brand}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                  </div>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 font-poppins mb-4">
                  {vehicle.model}
                </h1>
                {vehicle.notes && (
                  <p className="text-lg text-gray-600 font-inter leading-relaxed">
                    {vehicle.notes}
                  </p>
                )}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-green-600">{feature.icon}</div>
                    <span className="text-sm font-medium text-gray-900">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Specifications */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">Technické parametry</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {specifications.map((spec, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600 mt-1">
                          {spec.icon}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                            {spec.label}
                          </p>
                          <p className="text-lg font-bold text-gray-900">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* What's Included */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">Co je v ceně?</h2>
                  <div className="space-y-3">
                    {[
                      "Kompletní ochranná výstroj (helma, chrániče, rukavice)",
                      "Základní instruktáž a zaškolení před jízdou",
                      "Povinné ručení a havarijní pojištění",
                      "Mapy turistických tras v okolí",
                      "24/7 telefonní asistence",
                      "Plná nádrž paliva při převzetí"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Important Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Důležité informace</h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Minimální věk: 18 let</li>
                        <li>• Řidičský průkaz skupiny A nebo A2</li>
                        <li>• Kauce: 5 000 Kč (vrací se při vrácení v pořádku)</li>
                        <li>• Rezervace předem nutná (min. 24h)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-2xl border-2">
                  <CardContent className="p-6">
                    {/* Price Display */}
                    <div className="mb-6 pb-6 border-b">
                      <p className="text-sm text-gray-600 mb-2">Cena od</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-orange-600">
                          {priceOptions[selectedPrice]?.price}
                        </span>
                        <span className="text-xl font-bold text-gray-600">Kč</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {priceOptions[selectedPrice]?.perUnit}
                      </p>
                    </div>

                    {/* Price Options */}
                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-semibold text-gray-900 mb-3">Vyberte délku pronájmu:</p>
                      {priceOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedPrice(option.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                            selectedPrice === option.id
                              ? 'border-orange-600 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                        >
                          {option.badge && (
                            <div className="absolute -top-2 right-4">
                              <Badge className="bg-orange-600 text-white text-xs px-2 py-0.5">
                                {option.badge}
                              </Badge>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`${selectedPrice === option.id ? 'text-orange-600' : 'text-gray-400'}`}>
                                {option.icon}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{option.duration}</p>
                                <p className="text-sm text-gray-500">{option.perUnit}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-black text-gray-900">{option.price} Kč</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link to="/kontakt-pujcovna">
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <Bike className="mr-2 h-5 w-5" />
                        Rezervovat teď
                      </Button>
                    </Link>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Bez skrytých poplatků • Zrušení zdarma do 24h
                    </p>

                    {/* Contact */}
                    <div className="mt-6 pt-6 border-t space-y-3">
                      <p className="text-sm font-semibold text-gray-900">Máte dotazy?</p>
                      <a href="tel:+420777734389" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500">Zavolejte nám</p>
                          <p className="font-semibold text-gray-900">+420 777 734 389</p>
                        </div>
                      </a>
                      <a href="mailto:pujcovna@tjkrupka.cz" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500">Napište nám</p>
                          <p className="font-semibold text-gray-900">pujcovna@tjkrupka.cz</p>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VehicleDetail;
