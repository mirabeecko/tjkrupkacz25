
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Mountain } from "lucide-react";

interface TrailCardProps {
  name: string;
  difficulty: string;
  length: string;
  elevation: string;
  color: "green" | "blue" | "red";
  description?: string;
  status?: "open" | "closed" | "construction" | "maintenance";
}

const TrailCard: React.FC<TrailCardProps> = ({
  name,
  difficulty,
  length,
  elevation,
  color,
  description,
  status = "open"
}) => {
  const colorVariants = {
    green: "bg-green-100 border-green-200 text-green-800",
    blue: "bg-blue-100 border-blue-200 text-blue-800",
    red: "bg-red-100 border-red-200 text-red-800"
  };
  
  const badgeVariants = {
    green: "bg-green-500 hover:bg-green-500 text-white",
    blue: "bg-blue-500 hover:bg-blue-500 text-white",
    red: "bg-red-500 hover:bg-red-500 text-white"
  };

  const statusBadges = {
    open: <Badge className="bg-green-500 text-white">Otevřeno</Badge>,
    closed: <Badge className="bg-red-500 text-white">Uzavřeno</Badge>,
    construction: <Badge className="bg-amber-500 text-white">Ve výstavbě</Badge>,
    maintenance: <Badge className="bg-blue-500 text-white">Údržba</Badge>
  };

  return (
    <Card className={`border ${colorVariants[color]} hover:shadow-lg transition-all duration-300`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
          <div className="flex gap-2 items-center">
            <Badge className={badgeVariants[color]}>
              {difficulty}
            </Badge>
            {statusBadges[status]}
          </div>
        </div>
        {description && (
          <p className="text-gray-600 text-sm mt-2">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-y-2">
          <div className="flex items-center">
            <Map className="h-4 w-4 mr-2 opacity-70" />
            <span>Délka: {length}</span>
          </div>
          <div className="flex items-center">
            <Mountain className="h-4 w-4 mr-2 opacity-70" />
            <span>Převýšení: {elevation}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full hover:bg-gray-50 transition-colors">
          Zobrazit detaily trasy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrailCard;
