
import React from "react";
import { Activity } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface SportCardProps {
  sport: SportWithImage;
  getDifficultyLabel: (level?: number) => string;
}

export interface SportWithImage {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category_id: number;
  location?: string;
  equipment?: string;
  price?: string;
  difficulty?: number;
  audience?: string;
  color?: string;
  background?: string;
  image_url?: string;
}

const SportCard: React.FC<SportCardProps> = ({ sport, getDifficultyLabel }) => {
  return (
    <Card key={sport.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="h-48 bg-gray-200 relative">
        {sport.image_url ? (
          <img 
            src={sport.image_url} 
            alt={sport.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&h=300";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Activity className="w-16 h-16 text-gray-400" />
          </div>
        )}
        {sport.difficulty && (
          <span className="absolute top-3 right-3 bg-white/90 text-xs font-medium px-2 py-1 rounded-full">
            {getDifficultyLabel(sport.difficulty)}
          </span>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-montserrat">{sport.name}</CardTitle>
        {sport.location && (
          <CardDescription>{sport.location}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{sport.description}</p>
        {sport.audience && (
          <div className="text-xs text-gray-500 mb-2">
            <span className="font-medium">Pro koho:</span> {sport.audience}
          </div>
        )}
        {sport.equipment && (
          <div className="text-xs text-gray-500 mb-2">
            <span className="font-medium">Vybavení:</span> {sport.equipment}
          </div>
        )}
        {sport.price && (
          <div className="text-xs font-medium text-tjk-blue mt-2">
            {sport.price}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SportCard;
