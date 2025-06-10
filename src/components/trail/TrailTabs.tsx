
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrailCard from "./TrailCard";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Trail {
  id: string;
  name: string;
  difficulty: string;
  length: string;
  elevation: string;
  color: "green" | "blue" | "red";
  description?: string;
  status: "open" | "closed" | "construction" | "maintenance";
  category: "easy" | "medium" | "expert";
}

const trails: Trail[] = [
  {
    id: "vetvicka",
    name: "Větvička",
    difficulty: "Lehká",
    length: "2.5 km",
    elevation: "120 m",
    color: "green",
    description: "Lehká stezka vhodná pro začátečníky a rodinné vyjížďky.",
    status: "open",
    category: "easy"
  },
  {
    id: "koren",
    name: "Kořen",
    difficulty: "Střední",
    length: "3.8 km",
    elevation: "180 m",
    color: "blue",
    description: "Středně obtížná stezka s technickými pasážemi.",
    status: "open",
    category: "medium"
  },
  {
    id: "lavina",
    name: "Lavina",
    difficulty: "Těžká",
    length: "4.2 km",
    elevation: "220 m",
    color: "red",
    description: "Náročná trasa pro zkušené jezdce s řadou skoků a dropů.",
    status: "construction",
    category: "expert"
  },
  {
    id: "horizont",
    name: "Horizont",
    difficulty: "Střední",
    length: "3.1 km",
    elevation: "150 m",
    color: "blue",
    description: "Středně obtížná stezka s nádherným výhledem na Krušné hory.",
    status: "maintenance",
    category: "medium"
  },
  {
    id: "mechova",
    name: "Mechová",
    difficulty: "Lehká",
    length: "1.8 km",
    elevation: "90 m",
    color: "green",
    description: "Jednoduchá trasa vedoucí smrkovým lesem, vhodná pro začátečníky.",
    status: "construction",
    category: "easy"
  },
  {
    id: "kamenna",
    name: "Kamenná",
    difficulty: "Těžká",
    length: "3.5 km",
    elevation: "200 m",
    color: "red",
    description: "Technicky velmi náročná trasa s množstvím kamenných pasáží.",
    status: "closed",
    category: "expert"
  }
];

const TrailTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredTrails = activeTab === "all" 
    ? trails 
    : trails.filter(trail => trail.category === activeTab);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-8 rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Přehled tras Trailparku</h2>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 bg-white shadow-sm">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white transition-all"
          >
            Všechny trasy
          </TabsTrigger>
          <TabsTrigger 
            value="easy" 
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all"
          >
            Začátečnické
          </TabsTrigger>
          <TabsTrigger 
            value="medium" 
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all"
          >
            Středně pokročilé
          </TabsTrigger>
          <TabsTrigger 
            value="expert" 
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white transition-all"
          >
            Expertní
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="animate-fade-in space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTrails.map((trail) => (
              <TrailCard 
                key={trail.id}
                name={trail.name}
                difficulty={trail.difficulty}
                length={trail.length}
                elevation={trail.elevation}
                color={trail.color}
                description={trail.description}
                status={trail.status}
              />
            ))}
            
            {filteredTrails.length === 0 && (
              <Card className="bg-gray-50 border-gray-200 flex flex-col justify-center items-center p-8 col-span-full">
                <p className="text-gray-500 text-center mb-4">
                  Žádné trasy této kategorie momentálně nejsou k dispozici.
                </p>
                <Badge variant="outline" className={`
                  ${activeTab === 'easy' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                  ${activeTab === 'medium' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                  ${activeTab === 'expert' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                `}>
                  Již brzy
                </Badge>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrailTabs;
