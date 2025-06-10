import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Map, Mail, Phone, Clock, Info, MapPin, Car, Calendar, 
  ArrowRight, ExternalLink, Globe, Camera, Coffee, 
  Mountain, Snowflake, Bird, Fish, Compass, Sun, CloudSun
} from "lucide-react";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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

  // NOVÝ FORMULÁŘ
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "dobrovolnictví",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            interest: formData.interest,
            status: 'new'
          }
        ]);

      if (error) {
        toast({
          title: "Chyba!",
          description: error.message,
          variant: "destructive",
        });
        console.error('Error submitting form:', error);
      } else {
        toast({
          title: "Zpráva odeslána!",
          description: "Děkujeme za vaši zprávu. Brzy se vám ozveme.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          interest: "dobrovolnictví",
        });
      }
    } catch (error) {
      toast({
        title: "Chyba!",
        description: "Něco se pokazilo. Zkuste to prosím později.",
        variant: "destructive",
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-montserrat font-bold mb-4 text-tjk-blue">Kontaktní údaje</h2>
            <div className="space-y-6 pl-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-7 w-7 text-tjk-orange mt-1" />
                <div>
                  <h3 className="font-semibold text-tjk-blue">Adresa</h3>
                  <p className="text-gray-700">Husitská 191/8, 417 41 Krupka</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-7 w-7 text-tjk-blue mt-1" />
                <div>
                  <h3 className="font-semibold">E-mail</h3>
                  <p><a href="mailto:miroslavbroozek@gmail.com" className="text-tjk-blue hover:underline">miroslavbroozek@gmail.com</a></p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-7 w-7 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-tjk-blue">Telefon</h3>
                  <p><a href="tel:+420777734389" className="text-tjk-blue hover:underline">+420 777 734 389</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-montserrat font-bold mb-4 text-tjk-blue">Sledujte nás</h2>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100054246950281" target="_blank" rel="noopener noreferrer" className="text-tjk-blue hover:text-tjk-orange">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              {/* ...ostatní sociální ikony, pokud budou potřeba... */}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-montserrat font-bold mb-4 text-tjk-blue">Napište nám</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Jméno a příjmení</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">Telefon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="interest" className="block mb-1 font-medium">Mám zájem o</label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="dobrovolnictví">Dobrovolnictví</option>
                <option value="sponzorství/partnerství">Sponzorství/partnerství</option>
                <option value="zpráva">Zpráva</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Zpráva</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-tjk-blue hover:bg-tjk-blue/90 text-white px-6 py-2 rounded-md transition-colors"
            >
              {loading ? "Odesílání..." : "Odeslat zprávu"}
            </Button>
          </form>
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

      <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-montserrat font-bold mb-6 text-tjk-blue">Jak k nám</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <Car className="h-6 w-6 text-tjk-orange mr-2" />
              <h3 className="text-xl font-bold text-tjk-blue">Příjezd autem</h3>
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
                className="inline-flex items-center justify-center mt-auto px-6 py-3 rounded-lg bg-tjk-blue text-white font-semibold shadow hover:bg-tjk-blue/90 transition text-base"
              >
                Navigovat do areálu
              </a>
            </div>
          </div>
          <div className="flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <Map className="h-6 w-6 text-tjk-orange mr-2" />
              <h3 className="text-xl font-bold text-tjk-blue">Veřejná doprava</h3>
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
                className="inline-flex items-center justify-center mt-auto px-6 py-3 rounded-lg bg-tjk-orange text-white font-semibold shadow hover:bg-tjk-orange/90 transition text-base"
              >
                Vyhledat autobus do areálu
              </a>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <h4 className="font-medium text-gray-600">Z Prahy</h4>
              <p className="text-2xl font-bold text-tjk-blue">92 km</p>
              <p className="text-sm text-gray-500">cca 1h 15min</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <h4 className="font-medium text-gray-600">Z Ústí n.L.</h4>
              <p className="text-2xl font-bold text-tjk-blue">25 km</p>
              <p className="text-sm text-gray-500">cca 30min</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <h4 className="font-medium text-gray-600">Z Teplic</h4>
              <p className="text-2xl font-bold text-tjk-blue">12 km</p>
              <p className="text-sm text-gray-500">cca 20min</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <h4 className="font-medium text-gray-600">Z Drážďan</h4>
              <p className="text-2xl font-bold text-tjk-blue">68 km</p>
              <p className="text-sm text-gray-500">cca 1h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Webcams Section with Weather Information */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-montserrat font-bold text-tjk-blue flex items-center">
            <Info className="h-6 w-6 text-tjk-orange mr-3" />
            Webkamery & Počasí
          </h2>
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-amber-500 animate-pulse" />
            <span className="font-medium text-tjk-blue">12°C</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-xl">
            <h3 className="bg-gradient-to-r from-tjk-blue to-blue-700 text-white p-3 font-medium flex justify-between items-center">
              <span>HORNÍ STANICE</span>
              <CloudSun className="h-5 w-5 text-white" />
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
            <div className="bg-white p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Aktualizováno: {new Date().toLocaleTimeString('cs-CZ')}</span>
                <div className="flex items-center">
                  <Snowflake className="h-4 w-4 text-blue-400 mr-1" />
                  <span>8°C</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-xl">
            <h3 className="bg-gradient-to-r from-tjk-blue to-blue-700 text-white p-3 font-medium flex justify-between items-center">
              <span>SLOUP č. 22</span>
              <Sun className="h-5 w-5 text-white" />
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
            <div className="bg-white p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Aktualizováno: {new Date().toLocaleTimeString('cs-CZ')}</span>
                <div className="flex items-center">
                  <Sun className="h-4 w-4 text-amber-500 mr-1" />
                  <span>10°C</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-xl">
            <h3 className="bg-gradient-to-r from-tjk-blue to-blue-700 text-white p-3 font-medium flex justify-between items-center">
              <span>FOJTOVICE</span>
              <Sun className="h-5 w-5 text-white" />
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
            <div className="bg-white p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Aktualizováno: {new Date().toLocaleTimeString('cs-CZ')}</span>
                <div className="flex items-center">
                  <Sun className="h-4 w-4 text-amber-500 mr-1" />
                  <span>11°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline" className="bg-white hover:bg-tjk-blue/5 transition-colors">
            <Link to="/pocasi" className="inline-flex items-center">
              Zobrazit informace o počasí
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Enhanced Interesting Places Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-montserrat font-bold text-tjk-blue flex items-center">
              <MapPin className="h-6 w-6 text-tjk-orange mr-2" />
              Zajímavá místa v okolí
            </h2>
            <div className="hidden md:block">
              <Badge variant="outline" className="mr-1 bg-white">
                Objevujte s námi
              </Badge>
            </div>
          </div>

          <Tabs 
            defaultValue="all" 
            className="w-full mb-6"
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 mb-6 bg-white/70">
              <TabsTrigger value="all" className="data-[state=active]:bg-tjk-blue data-[state=active]:text-white">
                <Compass className="h-4 w-4 mr-2" />
                <span>Vše</span>
              </TabsTrigger>
              <TabsTrigger value="historie" className="data-[state=active]:bg-tjk-blue data-[state=active]:text-white">
                <Clock className="h-4 w-4 mr-2" />
                <span>Historie</span>
              </TabsTrigger>
              <TabsTrigger value="rozhledny" className="data-[state=active]:bg-tjk-blue data-[state=active]:text-white">
                <Mountain className="h-4 w-4 mr-2" />
                <span>Rozhledny</span>
              </TabsTrigger>
              <TabsTrigger value="priroda" className="data-[state=active]:bg-tjk-blue data-[state=active]:text-white">
                <Bird className="h-4 w-4 mr-2" />
                <span>Příroda</span>
              </TabsTrigger>
            </TabsList>

            {["all", "historie", "rozhledny", "priroda"].map(category => (
              <TabsContent key={category} value={category} className="animate-fade-in">
                <div className="grid gap-6 md:grid-cols-2">
                  {getPlacesForCategory(category).map(place => (
                    <div key={place.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                      <div className="md:flex">
                        <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                          <img 
                            src={place.image} 
                            alt={place.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" 
                          />
                          <div className="absolute bottom-0 right-0 bg-tjk-blue text-white px-3 py-1 rounded-tl-md text-sm flex items-center">
                            {getCategoryIcon(place.category)}
                            <span className="ml-1 capitalize">
                              {place.category === "historie" && "Historie"}
                              {place.category === "rozhledny" && "Rozhledna"}
                              {place.category === "priroda" && "Příroda"}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 md:w-3/5">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold text-tjk-blue mb-2">{place.title}</h3>
                            {place.suitableForChildren && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                Pro děti
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-3">{place.description}</p>
                          <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                            <div className="flex items-center text-gray-500">
                              <MapPin className="h-4 w-4 mr-1.5 text-tjk-orange" />
                              <span>Vzdálenost: {place.distance}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Clock className="h-4 w-4 mr-1.5 text-tjk-orange" />
                              <span>Délka návštěvy: {place.duration}</span>
                            </div>
                            <div className="flex items-center text-gray-500 col-span-2">
                              <Calendar className="h-4 w-4 mr-1.5 text-tjk-orange" />
                              <span>Otevírací doba: {place.openingHours}</span>
                            </div>
                          </div>
                          {place.website && (
                            <div className="flex justify-end">
                              <Button asChild variant="outline" size="sm" className="text-tjk-blue hover:text-white hover:bg-tjk-blue">
                                <a href={place.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                  <Globe className="h-4 w-4 mr-1.5" />
                                  <span>Webové stránky</span>
                                  <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="bg-white p-6 rounded-lg mt-8 shadow-inner">
            <h3 className="text-lg font-semibold mb-3 text-tjk-blue flex items-center">
              <Coffee className="h-5 w-5 text-tjk-orange mr-2" />
              Doporučení pro návštěvníky
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex bg-blue-50 p-3 rounded-md">
                <Camera className="h-5 w-5 text-tjk-blue mr-2 flex-shrink-0" />
                <p>Nezapomeňte si fotoaparát – výhledy z Komáří vížky jsou dechberoucí!</p>
              </div>
              <div className="flex bg-amber-50 p-3 rounded-md">
                <Mountain className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                <p>Vhodná turistická obuv je nutností pro návštěvu okolních stezek</p>
              </div>
              <div className="flex bg-green-50 p-3 rounded-md">
                <Sun className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                <p>V letních měsících nezapomeňte na ochranu proti slunci a dostatek vody</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Kontakt;
