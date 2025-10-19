import React, { useState } from "react";
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
  Snowflake,
  Wind,
  Calendar,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import ScrollAnimation from "@/components/ScrollAnimation";

const KontaktSnowkiting: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseType: "",
    participants: "",
    preferredDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulace odeslání formuláře
    setTimeout(() => {
      toast.success("Děkujeme! Vaši poptávku jsme obdrželi a brzy se vám ozveme.");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        courseType: "",
        participants: "",
        preferredDate: "",
        message: "",
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Kontakt - Snowkiting Kurzy"
        description="Máte zájem o kurz snowkitingu v Krušných horách? Kontaktujte nás pro více informací a rezervaci termínu."
        keywords="snowkiting kurzy, kontakt, rezervace, Krušné hory, zimní sporty"
        url="https://tjkrupka.cz/kontakt-snowkiting"
      />

      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-700 to-blue-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-dots-pattern"></div>
          </div>

          {/* Animated Snowflakes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <Snowflake
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
                  <Wind className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-6">
                  Kontakt pro Snowkiting Kurzy
                </h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Chcete se naučit snowkiting nebo máte otázky ke kurzům?
                  <br className="hidden md:block" />
                  <span className="font-semibold">Jsme tu pro vás!</span>
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <ScrollAnimation animation="slideUp" delay={0.1}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-cyan-500">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg mb-2">Telefon</h3>
                    <a href="tel:+420123456789" className="text-cyan-600 hover:text-cyan-700 font-medium">
                      +420 123 456 789
                    </a>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slideUp" delay={0.2}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-cyan-500">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg mb-2">Email</h3>
                    <a href="mailto:snowkiting@tjkrupka.cz" className="text-cyan-600 hover:text-cyan-700 font-medium">
                      snowkiting@tjkrupka.cz
                    </a>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slideUp" delay={0.3}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-cyan-500">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg mb-2">Lokalita</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      Komáří vížka<br />Krušné hory
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slideUp" delay={0.4}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-cyan-500">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg mb-2">Sezóna</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      Prosinec - Březen<br />
                      <span className="text-sm">dle sněhových podmínek</span>
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>

            {/* Contact Form */}
            <div className="max-w-4xl mx-auto">
              <ScrollAnimation animation="slideUp" delay={0.2}>
                <Card className="shadow-2xl border-2">
                  <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-t-xl">
                    <CardTitle className="text-2xl md:text-3xl font-poppins text-center flex items-center justify-center gap-3">
                      <Calendar className="w-8 h-8" />
                      Poptávka kurzu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Jméno a příjmení *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
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
                            Typ kurzu *
                          </label>
                          <select
                            name="courseType"
                            value={formData.courseType}
                            onChange={handleChange as any}
                            required
                            className="w-full h-12 px-3 rounded-md border border-input bg-background"
                          >
                            <option value="">Vyberte typ kurzu</option>
                            <option value="beginner">Začátečníci (3 dny)</option>
                            <option value="advanced">Pokročilí (2 dny)</option>
                            <option value="individual">Individuální lekce</option>
                            <option value="group">Skupinový kurz</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Počet účastníků
                          </label>
                          <Input
                            type="number"
                            name="participants"
                            value={formData.participants}
                            onChange={handleChange}
                            placeholder="1"
                            min="1"
                            className="h-12"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                            Preferovaný termín
                          </label>
                          <Input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                          Zpráva / Dotazy
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Napište nám své dotazy nebo speciální požadavky..."
                          rows={5}
                          className="resize-none"
                        />
                      </div>

                      <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Po odeslání poptávky vás budeme kontaktovat do <strong>24 hodin</strong> s dostupnými termíny a dalšími informacemi.
                          </p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-poppins font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Odesílám...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" />
                            Odeslat poptávku
                          </span>
                        )}
                      </Button>

                      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        Odesláním souhlasíte se zpracováním osobních údajů dle{" "}
                        <a href="/zasady-ochrany-osobnich-udaju" className="underline hover:text-cyan-600">
                          GDPR
                        </a>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>

            {/* Additional Info */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScrollAnimation animation="scale" delay={0.1}>
                <Card className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-2 border-cyan-200 dark:border-cyan-700">
                  <Users className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="font-poppins font-bold text-lg mb-2">Skupinové kurzy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Max. 6 účastníků na instruktora pro individuální přístup
                  </p>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="scale" delay={0.2}>
                <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-blue-700">
                  <Snowflake className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-poppins font-bold text-lg mb-2">Vybavení v ceně</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Kompletní snowkiting výstroj včetně bezpečnostního vybavení
                  </p>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="scale" delay={0.3}>
                <Card className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-indigo-200 dark:border-indigo-700">
                  <Wind className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="font-poppins font-bold text-lg mb-2">Certifikovaní instruktoři</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Zkušení lektoři s mezinárodními certifikáty
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

export default KontaktSnowkiting;
