
import React from "react";
import { MapPin, Clock, Car } from "lucide-react";

interface DistanceProps {
  city: string;
  distance: string;
  time: string;
}

const distances: DistanceProps[] = [
  { city: "Z Prahy", distance: "92 km", time: "cca 1h 15min" },
  { city: "Z Ústí n.L.", distance: "25 km", time: "cca 30min" },
  { city: "Z Teplic", distance: "12 km", time: "cca 20min" },
  { city: "Z Drážďan", distance: "68 km", time: "cca 1h" },
];

const DistanceInfoGraphic: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MapPin className="h-5 w-5 text-tjk-orange mr-2" />
        Vzdálenosti do areálu
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {distances.map((item) => (
          <div key={item.city} className="bg-white p-4 rounded-lg shadow text-center">
            <h4 className="font-medium text-gray-600">{item.city}</h4>
            <p className="text-2xl font-bold text-tjk-blue">{item.distance}</p>
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistanceInfoGraphic;
