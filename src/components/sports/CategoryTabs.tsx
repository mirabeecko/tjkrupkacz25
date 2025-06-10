
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mountain, Snowflake, Wind, Home, Users, Activity } from "lucide-react";

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  setActiveCategory
}) => {
  const categories = [
    { id: "all", name: "Všechny aktivity", icon: <Activity className="h-5 w-5" /> },
    { id: "outdoor", name: "Outdoor", icon: <Mountain className="h-5 w-5" /> },
    { id: "winter", name: "Zimní sporty", icon: <Snowflake className="h-5 w-5" /> },
    { id: "air", name: "Vzdušné sporty", icon: <Wind className="h-5 w-5" /> },
    { id: "indoor", name: "Indoorové sporty", icon: <Home className="h-5 w-5" /> },
    { id: "team", name: "Týmové sporty", icon: <Users className="h-5 w-5" /> }
  ];
  
  return (
    <div className="animate-fade-in">
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-4 flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-1 shadow-sm border border-gray-100 rounded-xl">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-tjk-blue data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-200"
            >
              {category.icon}
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <p className="text-lg text-gray-700">
          {activeCategory === "all" && "Přehled všech sportovních aktivit v okolí Krupky. Vyberte si z široké nabídky sportů pro každou sezónu."}
          {activeCategory === "outdoor" && "Outdoorové aktivity v krásné přírodě Krušných hor. Zažijte dobrodružství na čerstvém vzduchu."}
          {activeCategory === "winter" && "Zimní sporty a aktivity pro milovníky sněhu a ledu. Ideální podmínky od prosince do března."}
          {activeCategory === "air" && "Zažijte pocit volnosti při vzdušných sportech. Paragliding, vyhlídkové lety a další aktivity ve vzduchu."}
          {activeCategory === "indoor" && "Indoorové aktivity pro každé počasí. Sportoviště v centru města Krupka s moderním vybavením."}
          {activeCategory === "team" && "Týmové sporty pro všechny věkové kategorie. Zapojte se do místních lig nebo si zahrajte s přáteli."}
        </p>
      </div>
    </div>
  );
};

export default CategoryTabs;
