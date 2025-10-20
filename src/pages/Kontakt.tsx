import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Map as MapIcon, Mail, Phone, Clock, Info, MapPin, Car, Calendar,
  ArrowRight, ExternalLink, Globe, Camera, Coffee,
  Mountain, Snowflake, Bird, Fish, Compass, Sun, CloudSun
} from "lucide-react";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";

// Define the Place interface to match the expected structure
interface Place {
  id: number;
  name: string;
  title?: string; // If you use place.title elsewhere, otherwise remove
  description: string;
  img_url?: string; // If you use img_url elsewhere, otherwise remove
  image?: string; // If you use place.image elsewhere, otherwise remove
  category: string;
  suitableForChildren?: boolean;
  distance?: string;
  duration?: string;
  openingHours?: string;
  website?: string;
}

const Kontakt = () => {
  const { toast } = useToast();
  const [places, setPlaces] = useState<Place[]>([]);
  const [placesLoading, setPlacesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    async function fetchPlaces() {
      setPlacesLoading(true);
      const { data, error } = await supabase.from("places").select("*");
      if (!error && data) {
        // Filter only items that have required Place properties
        setPlaces(
          (data as any[]).filter(
            (item): item is Place =>
              typeof item.id === "number" &&
              typeof item.name === "string" &&
              typeof item.description === "string" &&
              typeof item.img_url === "string"
          ) as Place[]
        );
      }
      setPlacesLoading(false);
    }
    fetchPlaces();
  }, []);

  // Contact form is now a separate component

  const getPlacesForCategory = (category: string) => {
    if (category === "all") return places;
    return places.filter(place => place.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "historie": return <Clock className="h-5 w-5" />;
      case "rozhledny": return <Mountain className="h-5 w-5" />;
      case "priroda": return <Bird className="h-5 w-5" />;
      default: return <Compass className="h-5 w-5" />;
    }
  };

  return (
    <PageLayout
      title="Kontakt"
      description="Jak nás najdete, kontaktní údaje, mapa areálu."
    >
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          {/* Kontaktní údaje - Vylepšené */}
          <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-8 rounded-2xl shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-tjk-blue to-cyan-600 rounded-xl shadow-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-montserrat font-bold text-tjk-blue">Kontaktní údaje</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-tjk-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-tjk-blue text-lg mb-1">Adresa</h3>
                  <p className="text-gray-700">Husitská 191/8, 417 41 Krupka</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-6 w-6 text-tjk-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-tjk-blue text-lg mb-1">E-mail</h3>
                  <p><a href="mailto:miroslavbroozek@gmail.com" className="text-tjk-blue hover:text-tjk-orange hover:underline transition-colors">miroslavbroozek@gmail.com</a></p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-tjk-blue text-lg mb-1">Telefon</h3>
                  <p><a href="tel:+420777734389" className="text-tjk-blue hover:text-green-600 hover:underline transition-colors">+420 777 734 389</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Sociální sítě - Vylepšené */}
          <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 p-8 rounded-2xl shadow-xl border-2 border-purple-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-montserrat font-bold text-purple-700">Sledujte nás</h2>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100054246950281" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-blue-600 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Formulář - Vylepšený wrapper */}
        <div className="bg-gradient-to-br from-white via-green-50 to-emerald-50 p-8 rounded-2xl shadow-xl border-2 border-green-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-montserrat font-bold text-green-700">Napište nám</h2>
          </div>
          <ContactForm />
        </div>
      </div>

      <section className="mb-12 -mx-4 md:-mx-8 lg:-mx-16 xl:-mx-32">
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-none shadow-none">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2528.0114486862482!2d13.861383076959465!3d50.69114397186274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709ff62287d0415%3A0x4cb0aa2f30c44b43!2zS29tw6HFmcOtIHbDrcW-a2E!5e0!3m2!1scs!2scz!4v1715704057041!5m2!1scs!2scz" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa Tělovýchovná jednota Krupka z.s."
          ></iframe>
        </div>
      </section>

      <section className="mb-12 bg-gradient-to-br from-white via-gray-50 to-blue-50 p-10 rounded-3xl shadow-2xl border-2 border-gray-200">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tjk-blue/10 backdrop-blur-md border border-tjk-blue/20 rounded-full mb-4">
            <Car className="h-5 w-5 text-tjk-blue" />
            <span className="text-sm font-semibold text-tjk-blue">Navigace</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-tjk-blue">Jak k nám</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-8 rounded-2xl shadow-xl border-2 border-blue-200 hover:shadow-2xl hover:border-tjk-blue transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-tjk-orange to-amber-500 rounded-xl shadow-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-tjk-blue">Příjezd autem</h3>
            </div>
            <p className="mb-4 text-gray-700">
              Z Teplic směr Dubí, poté po silnici II/382 směr Krupka. V Krupce odbočit na značenou silnici směr Komáří vížka. K dispozici je bezplatné parkoviště přímo u areálu.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Doporučujeme využít navigaci na adresu Horní Krupka 107, Krupka.</li>
              <li>Parkoviště je prostorné a zdarma, nachází se přímo u lanovky a vstupu do areálu.</li>
              <li>V zimě doporučujeme sledovat aktuální sjízdnost silnic a případně použít zimní výbavu.</li>
              <li>Areál je dobře značený, sledujte směrovky „Komáří vížka“ už od Krupky.</li>
            </ul>
            <div className="flex-1 flex flex-col justify-end">
              <a
                href="https://www.google.com/maps/dir//SKI+AREA+KRUPKA,+Horn%C3%AD+Krupka+107,+Krupka,+Czechia/data=!4m9!4m8!1m0!1m5!1m1!19sChIJfxUC3MORCUcRLJ465ayTqOM!2m2!1d13.8670323!2d50.702396!3e0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-auto px-8 py-4 rounded-xl bg-gradient-to-r from-tjk-blue to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-base"
              >
                Navigovat do areálu
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-8 rounded-2xl shadow-xl border-2 border-orange-200 hover:shadow-2xl hover:border-tjk-orange transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <MapIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-tjk-blue">Veřejná doprava</h3>
            </div>
            <p className="mb-4 text-gray-700">
              Z Teplic autobusem číslo 10 nebo 13 do zastávky Krupka, Bohosudov. Poté přestup na turistický autobus s cílovou zastávkou Komáří vížka (jezdí pouze v letní sezóně o víkendech).
            </p>
            <div className="mb-4">
              <strong>Autobus číslo 142</strong> (někdy označovaný jako linka 484 nebo 582484) z Teplic, kterým se dostanete k do areálu Komáří vížka, projíždí následujícími zastávkami:
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Teplice, Benešovo náměstí</li>
                <li>Teplice, Hlavní nádraží</li>
                <li>Krupka, Bohosudov, MěÚ</li>
                <li>Krupka, muzeum</li>
                <li>Krupka, Fojtovice, Komáří vížka</li>
              </ul>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <a
                href="https://idos.cz/vlakyautobusymhdvse/spojeni/vysledky/?f=Teplice&fc=1&t=Fojtovice/Krupka,Kom%C3%A1%C5%99%C3%AD%20v%C3%AD%C5%BEka&tc=200003&cmd=cmdSearch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-auto px-8 py-4 rounded-xl bg-gradient-to-r from-tjk-orange to-amber-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-base"
              >
                Vyhledat autobus do areálu
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Vzdálenosti - Vylepšené */}
        <div className="mb-0">
          <h3 className="text-xl font-bold text-tjk-blue mb-6 text-center">Vzdálenosti z hlavních měst</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center border-2 border-gray-100 hover:border-tjk-blue">
              <h4 className="font-semibold text-gray-600 mb-2">Z Prahy</h4>
              <p className="text-3xl font-extrabold text-tjk-blue mb-1">92 km</p>
              <p className="text-sm text-gray-500">cca 1h 15min</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center border-2 border-gray-100 hover:border-tjk-blue">
              <h4 className="font-semibold text-gray-600 mb-2">Z Ústí n.L.</h4>
              <p className="text-3xl font-extrabold text-tjk-blue mb-1">25 km</p>
              <p className="text-sm text-gray-500">cca 30min</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center border-2 border-gray-100 hover:border-tjk-blue">
              <h4 className="font-semibold text-gray-600 mb-2">Z Teplic</h4>
              <p className="text-3xl font-extrabold text-tjk-blue mb-1">12 km</p>
              <p className="text-sm text-gray-500">cca 20min</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center border-2 border-gray-100 hover:border-tjk-blue">
              <h4 className="font-semibold text-gray-600 mb-2">Z Drážďan</h4>
              <p className="text-3xl font-extrabold text-tjk-blue mb-1">68 km</p>
              <p className="text-sm text-gray-500">cca 1h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Webcams Section - Vylepšená */}
      <section className="mb-12 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-10 rounded-3xl shadow-2xl border-2 border-indigo-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 backdrop-blur-md border border-indigo-300 rounded-full mb-4">
            <Camera className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">Live náhled</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-tjk-blue flex items-center justify-center gap-3">
            Webkamery & Počasí
          </h2>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Sun className="h-6 w-6 text-amber-500 animate-pulse" />
            <span className="font-bold text-xl text-tjk-blue">12°C</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl overflow-hidden shadow-xl group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-2 border-blue-200">
            <h3 className="bg-gradient-to-r from-tjk-blue to-cyan-700 text-white p-4 font-bold text-lg flex justify-between items-center">
              <span>HORNÍ STANICE</span>
              <CloudSun className="h-6 w-6 text-white" />
            </h3>
            <div className="aspect-video group-hover:brightness-105 transition-all">
              <iframe
                src="https://rtsp.me/embed/eyST2ZdA/"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Webkamera - Horní stanice"
              ></iframe>
            </div>
            <div className="bg-white p-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Aktualizováno: {new Date().toLocaleTimeString('cs-CZ')}</span>
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full">
                  <Snowflake className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-blue-600">8°C</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-2 border-blue-200">
            <h3 className="bg-gradient-to-r from-tjk-blue to-cyan-700 text-white p-4 font-bold text-lg flex justify-between items-center">
              <span>SLOUP č. 22</span>
              <Sun className="h-6 w-6 text-white" />
            </h3>
            <div className="aspect-video group-hover:brightness-105 transition-all">
              <iframe
                src="https://rtsp.me/embed/r32e6FtS/"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Webkamera - Sloup č. 22"
              ></iframe>
            </div>
            <div className="bg-white p-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Aktualizováno: {new Date().toLocaleTimeString('cs-CZ')}</span>
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 rounded-full">
                  <Sun className="h-4 w-4 text-amber-600" />
                  <span className="font-bold text-amber-600">10°C</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-2 border-blue-200">
            <h3 className="bg-gradient-to-r from-tjk-blue to-cyan-700 text-white p-4 font-bold text-lg flex justify-between items-center">
              <span>FOJTOVICE</span>
              <Sun className="h-6 w-6 text-white" />
            </h3>
            <div className="aspect-video group-hover:brightness-105 transition-all">
              <iframe
                src="https://www.ipcamlive.com/592f3bce0107c"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Webkamera - Fojtovice"
              ></iframe>
            </div>
            <div className="bg-white p-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Aktualizováno: {new Date().toLocaleTimeString('cs-CZ')}</span>
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 rounded-full">
                  <Sun className="h-4 w-4 text-amber-600" />
                  <span className="font-bold text-amber-600">11°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/pocasi">
            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg">
              Zobrazit informace o počasí
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

    </PageLayout>
  );
};

export default Kontakt;