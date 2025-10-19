import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Bike,
  Calendar,
  Shield,
  Wrench,
  Euro,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import ScrollAnimation from "@/components/ScrollAnimation";

interface Vehicle {
  id: number;
  brand: string | null;
  model: string | null;
  current_price_eur: number | null;
}

const KontaktPujcovna: React.FC = () => {
  const [searchParams] = useSearchParams();
  const vehicleId = searchParams.get('vehicle');

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleId: vehicleId || "",
    rentalStartDate: "",
    rentalEndDate: "",
    helmetNeeded: false,
    protectiveGearNeeded: false,
    drivingLicenseNumber: "",
    message: "",
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rentalDays, setRentalDays] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  // Fetch available vehicles
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Set selected vehicle when vehicleId changes
  useEffect(() => {
    if (vehicleId && vehicles.length > 0) {
      const vehicle = vehicles.find(v => v.id.toString() === vehicleId);
      if (vehicle) {
        setSelectedVehicle(vehicle);
        setFormData(prev => ({ ...prev, vehicleId: vehicleId }));
      }
    }
  }, [vehicleId, vehicles]);

  // Calculate rental days and estimated price
  useEffect(() => {
    if (formData.rentalStartDate && formData.rentalEndDate) {
      const start = new Date(formData.rentalStartDate);
      const end = new Date(formData.rentalEndDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      if (days > 0) {
        setRentalDays(days);

        if (selectedVehicle?.current_price_eur) {
          setEstimatedPrice(days * selectedVehicle.current_price_eur);
        }
      } else {
        setRentalDays(0);
        setEstimatedPrice(null);
      }
    } else {
      setRentalDays(0);
      setEstimatedPrice(null);
    }
  }, [formData.rentalStartDate, formData.rentalEndDate, selectedVehicle]);

  // Update selected vehicle when form vehicleId changes
  useEffect(() => {
    if (formData.vehicleId && vehicles.length > 0) {
      const vehicle = vehicles.find(v => v.id.toString() === formData.vehicleId);
      setSelectedVehicle(vehicle || null);
    } else {
      setSelectedVehicle(null);
    }
  }, [formData.vehicleId, vehicles]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("id, brand, model, current_price_eur")
        .eq("moye", true)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching vehicles:", error);
      } else {
        setVehicles(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.gdprConsent) {
      toast.error("Prosím, potvrďte souhlas se zpracováním osobních údajů.");
      return;
    }

    if (!formData.vehicleId) {
      toast.error("Prosím, vyberte vozidlo.");
      return;
    }

    if (!formData.rentalStartDate || !formData.rentalEndDate) {
      toast.error("Prosím, vyplňte datum zahájení a ukončení pronájmu.");
      return;
    }

    if (rentalDays <= 0) {
      toast.error("Datum ukončení musí být po datu zahájení.");
      return;
    }

    setIsSubmitting(true);

    try {
      const vehicleName = selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.model}` : "Nespecifikováno";

      // Insert booking into database
      const { data: booking, error: insertError } = await supabase
        .from("rental_bookings")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            vehicle_id: parseInt(formData.vehicleId),
            vehicle_name: vehicleName,
            rental_start_date: formData.rentalStartDate,
            rental_end_date: formData.rentalEndDate,
            helmet_needed: formData.helmetNeeded,
            protective_gear_needed: formData.protectiveGearNeeded,
            price_per_day: selectedVehicle?.current_price_eur || null,
            total_price: estimatedPrice,
            message: formData.message || null,
            driving_license_number: formData.drivingLicenseNumber || null,
            gdpr_consent: formData.gdprConsent,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Error inserting booking:", insertError);
        toast.error("Nepodařilo se odeslat rezervaci. Prosím, zkuste to znovu.");
        setIsSubmitting(false);
        return;
      }

      // Send confirmation emails via Edge Function
      try {
        const { error: emailError } = await supabase.functions.invoke('send-rental-booking-email', {
          body: { booking: {
            id: booking.id,
            full_name: booking.full_name,
            email: booking.email,
            phone: booking.phone,
            vehicle_name: booking.vehicle_name,
            rental_start_date: booking.rental_start_date,
            rental_end_date: booking.rental_end_date,
            rental_duration_days: rentalDays,
            helmet_needed: booking.helmet_needed,
            protective_gear_needed: booking.protective_gear_needed,
            total_price: booking.total_price,
            message: booking.message,
            driving_license_number: booking.driving_license_number
          }}
        });

        if (emailError) {
          console.error("Error sending email:", emailError);
          // Don't fail the whole operation if email fails
        }
      } catch (emailError) {
        console.error("Email function error:", emailError);
        // Continue anyway - booking was successful
      }

      toast.success("✅ Rezervace byla úspěšně odeslána! Obdržíte potvrzení na email.");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        vehicleId: "",
        rentalStartDate: "",
        rentalEndDate: "",
        helmetNeeded: false,
        protectiveGearNeeded: false,
        drivingLicenseNumber: "",
        message: "",
        gdprConsent: false,
      });
      setSelectedVehicle(null);
      setEstimatedPrice(null);
      setRentalDays(0);

    } catch (error) {
      console.error("Error:", error);
      toast.error("Došlo k chybě. Prosím, zkuste to znovu nebo nás kontaktujte telefonicky.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Rezervace - Půjčovna Motocyklů"
        description="Rezervujte si motorku nebo čtyřkolku pro projížďku Krušnými horami. Profesionální servis a kompletní výstroj v ceně."
        keywords="rezervace motorky, půjčovna enduro, Krušné hory, KTM, rezervace online"
        url="https://tjkrupka.cz/kontakt-pujcovna"
      />

      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-pink-700">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-dots-pattern"></div>
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <Bike
                key={i}
                className="absolute text-white/20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${20 + Math.random() * 30}px`,
                  height: `${20 + Math.random() * 30}px`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <div className="container px-4 mx-auto relative z-10">
            <ScrollAnimation animation="fadeIn">
              <div className="text-center text-white max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Bike className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-6">
                  Rezervace Motocyklu
                </h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Vyplňte formulář níže a my vás budeme kontaktovat
                  <br className="hidden md:block" />
                  <span className="font-semibold">do 24 hodin s potvrzením!</span>
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <ScrollAnimation animation="slideUp" delay={0.1}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-orange-500">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg mb-2">Telefon</h3>
                    <a href="tel:+420773090842" className="text-orange-600 hover:text-orange-700 font-medium">
                      +420 773 090 842
                    </a>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slideUp" delay={0.2}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-orange-500">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg mb-2">Email</h3>
                    <a href="mailto:pujcovna@tjkrupka.cz" className="text-orange-600 hover:text-orange-700 font-medium">
                      pujcovna@tjkrupka.cz
                    </a>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slideUp" delay={0.3}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-orange-500">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg mb-2">Odpověď do</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      24 hodin
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>

            {/* Reservation Form */}
            <div className="max-w-4xl mx-auto">
              <ScrollAnimation animation="slideUp" delay={0.2}>
                <Card className="shadow-2xl border-2">
                  <CardHeader className="bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-t-xl">
                    <CardTitle className="text-2xl md:text-3xl font-poppins text-center flex items-center justify-center gap-3">
                      <Calendar className="w-8 h-8" />
                      Rezervační formulář
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Jméno a příjmení *
                          </label>
                          <Input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Jan Novák"
                            required
                            className="h-12"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jan@example.com"
                            required
                            className="h-12"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Telefon *
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+420 123 456 789"
                            required
                            className="h-12"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Číslo řidičského průkazu
                          </label>
                          <Input
                            type="text"
                            name="drivingLicenseNumber"
                            value={formData.drivingLicenseNumber}
                            onChange={handleChange}
                            placeholder="XX000000"
                            className="h-12"
                          />
                        </div>
                      </div>

                      {/* Vehicle Selection */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                          Vyberte vozidlo *
                        </label>
                        <select
                          name="vehicleId"
                          value={formData.vehicleId}
                          onChange={handleChange as any}
                          required
                          className="w-full h-12 px-3 rounded-md border border-input bg-background"
                        >
                          <option value="">Vyberte vozidlo</option>
                          {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                              {vehicle.brand} {vehicle.model}
                              {vehicle.current_price_eur && ` - ${vehicle.current_price_eur}€/den`}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Rental Period */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Datum zahájení pronájmu *
                          </label>
                          <Input
                            type="date"
                            name="rentalStartDate"
                            value={formData.rentalStartDate}
                            onChange={handleChange}
                            min={today}
                            required
                            className="h-12"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Datum ukončení pronájmu *
                          </label>
                          <Input
                            type="date"
                            name="rentalEndDate"
                            value={formData.rentalEndDate}
                            onChange={handleChange}
                            min={formData.rentalStartDate || today}
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      {/* Price Estimate */}
                      {rentalDays > 0 && estimatedPrice && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-700">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                Doba pronájmu: <strong>{rentalDays} {rentalDays === 1 ? 'den' : rentalDays < 5 ? 'dny' : 'dní'}</strong>
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Předpokládaná cena
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Euro className="w-6 h-6 text-orange-600" />
                              <span className="text-3xl font-black text-orange-600">
                                {estimatedPrice}€
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            * Konečná cena bude potvrzena při rezervaci
                          </p>
                        </div>
                      )}

                      {/* Additional Options */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Dodatečné vybavení (v ceně pronájmu)
                        </label>

                        <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <Checkbox
                            id="helmetNeeded"
                            checked={formData.helmetNeeded}
                            onCheckedChange={(checked) => handleCheckboxChange('helmetNeeded', checked as boolean)}
                          />
                          <label
                            htmlFor="helmetNeeded"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            🪖 Potřebuji helmu
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <Checkbox
                            id="protectiveGearNeeded"
                            checked={formData.protectiveGearNeeded}
                            onCheckedChange={(checked) => handleCheckboxChange('protectiveGearNeeded', checked as boolean)}
                          />
                          <label
                            htmlFor="protectiveGearNeeded"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            🦺 Potřebuji ochranné vybavení
                          </label>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                          Zpráva / Speciální požadavky
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Napište nám, pokud máte nějaké speciální požadavky..."
                          rows={5}
                          className="resize-none"
                        />
                      </div>

                      {/* GDPR Consent */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="gdprConsent"
                            checked={formData.gdprConsent}
                            onCheckedChange={(checked) => handleCheckboxChange('gdprConsent', checked as boolean)}
                            required
                          />
                          <label
                            htmlFor="gdprConsent"
                            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                          >
                            Souhlasím se zpracováním osobních údajů dle{" "}
                            <a href="/zasady-ochrany-osobnich-udaju" className="underline hover:text-orange-600" target="_blank">
                              GDPR
                            </a>{" "}
                            za účelem zpracování rezervace. *
                          </label>
                        </div>
                      </div>

                      {/* Info Box */}
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            <p className="font-semibold mb-1">Co se stane po odeslání?</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Obdržíte potvrzení na email</li>
                              <li>Budeme vás kontaktovat do 24 hodin</li>
                              <li>Domluvíme si přesné detaily a čas předání</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white font-poppins font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Odesílám rezervaci...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" />
                            Odeslat rezervaci
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>

            {/* Benefits Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScrollAnimation animation="scale" delay={0.1}>
                <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 border-2 border-orange-200 dark:border-orange-700">
                  <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-poppins font-bold text-lg mb-2">Profesionální servis</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Všechna vozidla pravidelně kontrolována a servisována
                  </p>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="scale" delay={0.2}>
                <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-blue-700">
                  <Wrench className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-poppins font-bold text-lg mb-2">Kompletní výstroj</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Helma, ochranné vybavení a instruktáž v ceně
                  </p>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="scale" delay={0.3}>
                <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border-2 border-green-200 dark:border-green-700">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-poppins font-bold text-lg mb-2">Bezpečnost zajištěna</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Pojištění a 24/7 technická podpora
                  </p>
                </Card>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default KontaktPujcovna;
