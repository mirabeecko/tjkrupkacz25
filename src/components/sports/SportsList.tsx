
import React from "react";
import { SportWithImage } from "./SportCard";
import SportCard from "./SportCard";

interface SportsListProps {
  sports: SportWithImage[];
  getDifficultyLabel: (level?: number) => string;
}

const SportsList: React.FC<SportsListProps> = ({ sports, getDifficultyLabel }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sports.length > 0 ? (
        sports.map((sport) => (
          <SportCard 
            key={sport.id} 
            sport={sport} 
            getDifficultyLabel={getDifficultyLabel} 
          />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">V této kategorii nejsou momentálně žádné sporty.</p>
        </div>
      )}
    </div>
  );
};

export default SportsList;
