import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SportsList from "@/components/sports/SportsList";
import CategoryTabs from "@/components/sports/CategoryTabs";
import { SportWithImage } from "@/components/sports/SportCard";

// Defining a local Sport type for data fetching
interface Sport {
  id: number;
  name: string;
  description: string;
  category: string;
  difficulty: number;
  ageGroup: string;
  season: string[];
  location: string;
  instructor: string;
  equipmentProvided: boolean;
}

const Sporty = () => {
  const [sports, setSports] = useState<SportWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSport, setSelectedSport] = useState<SportWithImage | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      // Convert the fetched data to match the SportWithImage interface from SportCard
      const formattedSports: SportWithImage[] = [
        {
          id: 1,
          name: "Horská cyklistika",
          slug: "horska-cyklistika",
          description: "Vyrazte na horských kolech po značených trasách v Krušných horách. Nabízíme trasy všech obtížností pro začátečníky i pokročilé jezdce.",
          category_id: 1,
          location: "Trailpark Komárka",
          equipment: "Poskytujeme veškeré vybavení",
          price: "od 300 Kč",
          difficulty: 3,
          audience: "10+",
          color: "blue",
          background: "bg-blue-100",
          image_url: "lovable-uploads/mountain-biking.jpg"
        },
        {
          id: 2,
          name: "Sjezdová cyklistika",
          slug: "sjezdova-cyklistika",
          description: "Pro zkušené jezdce máme připraveny adrenalinové sjezdové tratě s řadou technických prvků, skoků a klopených zatáček.",
          category_id: 1,
          location: "Trailpark Komárka",
          equipment: "Poskytujeme veškeré vybavení",
          price: "od 400 Kč",
          difficulty: 5,
          audience: "15+",
          color: "red",
          background: "bg-red-100",
          image_url: "lovable-uploads/downhill-biking.jpg"
        },
        {
          id: 3,
          name: "Nordic Walking",
          slug: "nordic-walking",
          description: "Chůze s holemi v krásné přírodě Krušných hor je ideální aktivitou pro všechny věkové kategorie. Zlepšíte kondici a poznáte krásná místa v okolí.",
          category_id: 1,
          location: "Okolí Krupky",
          equipment: "Poskytujeme hole",
          price: "od 150 Kč",
          difficulty: 1,
          audience: "Všechny věkové kategorie",
          color: "green",
          background: "bg-green-100",
          image_url: "lovable-uploads/nordic-walking.jpg"
        },
        {
          id: 4,
          name: "Turistika",
          slug: "turistika",
          description: "Vydejte se s námi na pěší túry po značených trasách Krušných hor. Objevte nádherné výhledy, historické památky a přírodní krásy.",
          category_id: 1,
          location: "Krušné hory",
          equipment: "Vlastní vybavení",
          price: "zdarma s průvodcem od 200 Kč",
          difficulty: 2,
          audience: "Všechny věkové kategorie",
          color: "yellow",
          background: "bg-yellow-100",
          image_url: "lovable-uploads/hiking.jpg"
        },
        {
          id: 5,
          name: "Běžky",
          slug: "bezky",
          description: "V zimě nabízíme udržované běžkařské tratě různých délek a obtížností. Začátečníci mohou využít služeb našich instruktorů.",
          category_id: 2,
          location: "Běžkařské tratě Komáří vížka",
          equipment: "Možnost zapůjčení vybavení",
          price: "od 250 Kč",
          difficulty: 2,
          audience: "8+",
          color: "blue",
          background: "bg-blue-100",
          image_url: "lovable-uploads/cross-country-skiing.jpg"
        },
        {
          id: 6,
          name: "Paragliding",
          slug: "paragliding",
          description: "Zažijte nezapomenutelný pocit volnosti při tandemových letech s instruktorem. Startoviště se nachází přímo u Komáří vížky.",
          category_id: 3,
          location: "Komáří vížka",
          equipment: "Poskytujeme veškeré vybavení",
          price: "od 1500 Kč",
          difficulty: 3,
          audience: "12+",
          color: "purple",
          background: "bg-purple-100",
          image_url: "lovable-uploads/paragliding.jpg"
        },
        {
          id: 7,
          name: "Badminton",
          slug: "badminton",
          description: "Zahrajte si badminton v našem sportovním areálu. K dispozici jsou kvalitní kurty a možnost zapůjčení vybavení.",
          category_id: 4,
          location: "Sportovní areál TJ Krupka",
          equipment: "Možnost zapůjčení vybavení",
          price: "od 200 Kč / hodina",
          difficulty: 2,
          audience: "Všechny věkové kategorie",
          color: "orange",
          background: "bg-orange-100",
          image_url: "lovable-uploads/badminton.jpg"
        },
        {
          id: 8,
          name: "Volejbal",
          slug: "volejbal",
          description: "Přijďte si zahrát plážový volejbal v letních měsících nebo klasický volejbal v tělocvičně. Organizujeme i amatérské turnaje.",
          category_id: 5,
          location: "Sportovní areál TJ Krupka",
          equipment: "Poskytujeme míče",
          price: "od 300 Kč / hodina",
          difficulty: 2,
          audience: "10+",
          color: "yellow",
          background: "bg-yellow-100",
          image_url: "lovable-uploads/volleyball.jpg"
        }
      ];
      setSports(formattedSports);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredSports = activeCategory === "all" 
    ? sports 
    : sports.filter(sport => {
        // Match the category_id to the activeCategory
        const categoryMapping: Record<string, number[]> = {
          "outdoor": [1],
          "winter": [2],
          "air": [3],
          "indoor": [4],
          "team": [5]
        };
        
        return categoryMapping[activeCategory]?.includes(sport.category_id);
      });

  // Function to handle difficulty levels display
  const getDifficultyLabel = (level?: number) => {
    switch(level) {
      case 1: return "Začátečník";
      case 2: return "Mírně pokročilý";
      case 3: return "Středně pokročilý";
      case 4: return "Pokročilý";
      case 5: return "Expert";
      default: return "Všechny úrovně";
    }
  };

  // Function to handle sport selection
  const handleSportClick = (sport: SportWithImage) => {
    setSelectedSport(sport);
  };

  return (
    <PageLayout 
      title="Sportovní aktivity" 
      description="Objevte širokou nabídku sportovních aktivit pro všechny věkové kategorie a úrovně zkušeností. Vyberte si ze sportů pro každé roční období."
      backgroundImage="lovable-uploads/sports-bg.jpg"
    >
      <div className="mb-8">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full max-w-md" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <CategoryTabs 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <SportsList 
                  sports={filteredSports} 
                  getDifficultyLabel={getDifficultyLabel}
                />
              </div>
              
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Kontakt na instruktory</h3>
                  <p className="mb-4">
                    Pro více informací o sportovních aktivitách nebo rezervaci tréninku s instruktorem nás kontaktujte:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tjk-blue mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>+420 777 734 389</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tjk-blue mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>sport@tjkrupka.cz</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-tjk-blue mb-2">Rezervační systém</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Pro rezervaci sportovišť nebo lekcí s instruktorem využijte náš online rezervační systém.
                    </p>
                    <a href="#" className="text-tjk-blue font-medium hover:text-tjk-orange transition-colors">
                      Přejít na rezervace →
                    </a>
                  </div>
                </Card>
                
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">Sezónní sporty</h3>
                  <Tabs defaultValue="summer">
                    <TabsList className="w-full">
                      <TabsTrigger value="summer" className="flex-1">Léto</TabsTrigger>
                      <TabsTrigger value="winter" className="flex-1">Zima</TabsTrigger>
                    </TabsList>
                    <TabsContent value="summer" className="pt-4">
                      <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        <li>Horská cyklistika</li>
                        <li>Sjezdová cyklistika</li>
                        <li>Turistika</li>
                        <li>Paragliding</li>
                        <li>Plážový volejbal</li>
                      </ul>
                    </TabsContent>
                    <TabsContent value="winter" className="pt-4">
                      <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        <li>Běžecké lyžování</li>
                        <li>Zimní turistika</li>
                        <li>Badminton (indoor)</li>
                        <li>Volejbal (indoor)</li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Sporty;
