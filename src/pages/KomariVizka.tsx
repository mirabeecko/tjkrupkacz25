import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { supabase } from '@/supabaseClient';
import { MapPin, ArrowRight, Users, Lightbulb, Bike, Coffee, Map, Users as UsersIcon, Globe, ExternalLink, Compass, Bird, Mountain, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Trail {
  id: number;
  name: string;
  sport: string;
  sports: string;
  style: string;
  start: string;
  end: string;
  gps_start: string;
  gps_end: string;
  builder: string;
  legal: boolean;
  length_km: number;
  elevation_gain_m: number;
  difficulty: number;
}

interface Vlek {
  id: number;
  name: string;
  elevation: number;
  long: number;
  "gps start": string;
  "gps end": string;
  unasedel: number;
  unasecu: number;
  vykon_motoru: string;
  "max.rychlost": string;
  created_at: string;
}

const KomariVizka = () => {
  const [vleky, setVleky] = useState<Vlek[]>([]);
  const [vlekyLoading, setVlekyLoading] = useState(true);
  const [places, setPlaces] = useState<any[]>([]);
  const [placesLoading, setPlacesLoading] = useState(true);

  useEffect(() => {
    async function fetchVleky() {
      try {
        const { data, error } = await supabase
          .from('vleky')
          .select('*');
          
        if (error) {
          console.error('Error fetching vleky:', error);
        } else {
          setVleky(data || []);
        }
      } catch (error) {
        console.error('Error fetching vleky:', error);
      } finally {
        setVlekyLoading(false);
      }
    }

    async function fetchPlaces() {
      try {
        const { data, error } = await supabase
          .from('places')
          .select('*');
          
        if (error) {
          console.error('Error fetching places:', error);
        } else {
          setPlaces(data || []);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setPlacesLoading(false);
      }
    }

    fetchVleky();
    fetchPlaces();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'historie':
        return <Clock className="h-4 w-4 mr-1.5 text-tjk-orange" />;
      case 'rozhledny':
        return <Mountain className="h-4 w-4 mr-1.5 text-tjk-orange" />;
      case 'priroda':
        return <Bird className="h-4 w-4 mr-1.5 text-tjk-orange" />;
      default:
        return null;
    }
  };

  const getPlacesForCategory = (category: string) => {
    if (category === "all") {
      return places;
    }
    return places.filter(place => place.category === category);
  };

  return (
    <PageLayout 
      title="Areál Komáří vížka" 
      description="Letní i zimní provoz areálu Komáří vížka – vleky, bike park, ubytování a atrakce v srdci Krušných hor."
      backgroundImage="https://images.unsplash.com/photo-1571863533956-01c88e79957e?q=80&w=1974&auto=format&fit=crop"
    >
      <section className="mb-12">
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Komáří vížka leží ve výšce 800–900 m n. m., obklopena hustými smrkovými lesy a zvlněnými 
            loukami Krušných hor. Výhledy sahají k českoněmecké hranici a nejvyššímu vrcholu Klínovec.
            Areál nabízí celoroční vyžití pro sportovce všech úrovní.
          </p>
        </div>
        
        <div className="relative h-80 mb-8 rounded-xl overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20334.990979076266!2d13.81428368599375!3d50.676307072674574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709ff62287d0415%3A0x4cb0aa2f30c44b43!2zS29tw6HFmcOtIHbDrcW-a2E!5e0!3m2!1scs!2scz!4v1715704057041!5m2!1scs!2scz" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa areálu Komáří vížka"
            className="absolute inset-0"
          ></iframe>
        </div>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-tjk-blue mb-4">Trailpark Komárka</h3>
            <p className="text-gray-600 mb-6">
              Objevte naše udržované traily pro všechny úrovně zkušenosti. Single tracky, 
              technické sjezdy i rodinné stezky. Vhodné pro horská kola i enduro.
            </p>
            <Link to="/trailpark" className="group">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Prozkoumat traily
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-tjk-blue mb-4">Dobrovolnické programy</h3>
            <p className="text-gray-600 mb-6">
              Přidejte se k nám při budování a údržbě trailů, organizaci akcí nebo 
              jako instruktoři v bikeškole. Získejte slevy a další výhody.
            </p>
            <Link to="/dobrovolnici" className="group">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Přidat se k týmu
                <Users className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        {placesLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tjk-blue"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {places.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100"
              >
                {place.image_url && (
                  <img
                    src={place.image_url}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-bold text-tjk-blue mb-2">{place.name}</h3>
                  <p className="text-gray-600 mb-3">{place.description}</p>
                  {place.address && (
                    <div className="text-sm text-gray-500 mb-1">
                      <span className="font-semibold">Adresa: </span>{place.address}
                    </div>
                  )}
                  {place.type && (
                    <div className="text-sm text-gray-500 mb-2">
                      <span className="font-semibold">Typ: </span>{place.type}
                    </div>
                  )}
                  {/* Výpis všech ostatních sloupců kromě těch hlavních */}
                  {Object.entries(place).map(([key, value]) => {
                    if (
                      ["id", "name", "description", "map_url", "image_url", "address", "type", "created_at"].includes(key)
                      || value === null
                    ) return null;
                    return (
                      <div key={key} className="text-xs text-gray-400">
                        <span className="font-semibold">{key}: </span>{String(value)}
                      </div>
                    );
                  })}
                  <div className="mt-4">
                    <a
                      href={place.map_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-tjk-blue hover:text-tjk-orange font-medium"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> Zobrazit na mapě
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!placesLoading && places.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Momentálně nejsou k dispozici žádná místa.</p>
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-montserrat font-bold mb-6 text-tjk-blue">Vleky</h2>
        {vlekyLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tjk-blue"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-md">
            <Table>
              <TableHeader className="bg-tjk-blue">
                <TableRow>
                  <TableHead className="text-white">Název</TableHead>
                  <TableHead className="text-white">Délka</TableHead>
                  <TableHead className="text-white">Převýšení</TableHead>
                  <TableHead className="text-white">Kapacita sedačky</TableHead>
                  <TableHead className="text-white">Kapacita kotvy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vleky.map((vlek) => (
                  <TableRow key={vlek.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{vlek.name}</TableCell>
                    <TableCell>{vlek.long} m</TableCell>
                    <TableCell>{vlek.elevation} m</TableCell>
                    <TableCell>{vlek.unasedel}</TableCell>
                    <TableCell>{vlek.unasecu}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {!vlekyLoading && vleky.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Momentálně nejsou k dispozici žádné vleky.</p>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100">
          <CardHeader className="bg-gradient-to-r from-tjk-blue to-blue-700 text-white">
            <CardTitle>Jízdenky</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-4">
              Zakupte si jízdenky na vleky online a vyhněte se frontám.
              Nabízíme výhodné celodenní, polodenní a bodové jízdné.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/vstupenky" className="w-full">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
                Koupit jízdenky
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <CardTitle>Ubytování</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-4">
              Komfortní pokoje s výhledem do krajiny Krušných hor.
              Ideální pro víkendové pobyty, rodinné dovolené i skupiny.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/sluzby" className="w-full">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md">
                Rezervovat pobyt
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardTitle>Bistro</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-4">
              Občerstvení přímo v areálu. Nabízíme teplá jídla,
              čerstvé bagety, dezerty a širokou nabídku nápojů.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/sluzby" className="w-full">
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md">
                Prohlédnout menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      {/* --- NOVÝ BLOK: Nabídka pro školy (Komárek) --- */}
      <section className="my-16 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-blue-50 to-white rounded-2xl shadow-lg p-8">
        <div className="flex-1 flex justify-center items-center">
          <img src="/src/loga/komárek.png" alt="Logo Komárek" className="max-h-40 w-auto object-contain drop-shadow-xl" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-tjk-blue mb-4">Nabídka pro školy: Zážitkové dny na Komáří vížce</h2>
          <p className="text-lg text-gray-700 mb-3">
            Hledáte originální program pro školní výlet, adaptační kurz nebo sportovní den? Nabízíme bezpečné a zábavné aktivity v přírodě pod vedením zkušených instruktorů. Připravíme program na míru pro základní i střední školy – cyklistika, hry v přírodě, environmentální workshopy, orientační běh, základy první pomoci a mnoho dalšího. Vše v krásném prostředí Krušných hor s možností stravování a ubytování.
          </p>
          <p className="text-md text-gray-600">Kontaktujte nás pro individuální nabídku a rezervaci termínu!</p>
        </div>
      </section>

      {/* --- NOVÝ BLOK: Trailpark pro školy --- */}
      <section className="my-16 flex flex-col md:flex-row-reverse items-center gap-10 bg-gradient-to-l from-orange-50 to-white rounded-2xl shadow-lg p-8">
        <div className="flex-1 flex justify-center items-center">
          <img src="/src/img/komari-vizka-komari-vizka-l5d.jpeg" alt="Logo Trailpark" className="max-h-40 w-auto object-contain drop-shadow-xl rounded-xl" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-4">Trailpark pro školy: Pohyb, zábava, bezpečí</h2>
          <p className="text-lg text-gray-700 mb-3">
            Přiveďte své žáky do moderního trailparku! Naučíme děti i teenagery základy bezpečné jízdy na kole, správné chování v terénu a týmové spolupráci. Programy vedou certifikovaní bike instruktoři, vše je přizpůsobeno věku a zkušenostem dětí. K dispozici je půjčovna kol, zázemí i možnost občerstvení. Ideální pro sportovní dny, školy v přírodě i adaptační kurzy.
          </p>
          <p className="text-md text-gray-600">Neváhejte a rezervujte si termín pro vaši třídu ještě dnes!</p>
        </div>
      </section>
    </PageLayout>
  );
};

export default KomariVizka;
