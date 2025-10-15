import React, { useState } from "react";
import { MapPin, Hotel, Coffee, Bike, Snowflake, Baby, Shield, X } from "lucide-react";

interface MapPoint {
  id: string;
  name: string;
  icon: React.ReactNode;
  position: { x: number; y: number }; // percentage position
  color: string;
  description: string;
  features?: string[];
}

const mapPoints: MapPoint[] = [
  {
    id: "ubytovani",
    name: "Ubytování",
    icon: <Hotel className="w-6 h-6" />,
    position: { x: 25, y: 30 },
    color: "bg-blue-500",
    description: "Komfortní pokoje a apartmány pro sportovce i rodiny",
    features: ["Pokoje 2-4 lůžka", "Společné prostory", "WiFi zdarma"]
  },
  {
    id: "bistro",
    name: "Bistro",
    icon: <Coffee className="w-6 h-6" />,
    position: { x: 50, y: 40 },
    color: "bg-orange-500",
    description: "Stylové bistro s domácí kuchyní a terasou",
    features: ["Domácí kuchyně", "Terasa s výhledem", "Výběrová káva"]
  },
  {
    id: "trails",
    name: "MTB Traily",
    icon: <Bike className="w-6 h-6" />,
    position: { x: 70, y: 55 },
    color: "bg-green-500",
    description: "Udržované traily pro všechny úrovně jezdců",
    features: ["Flow traily", "Technické sekce", "Rodinné stezky"]
  },
  {
    id: "winter",
    name: "Zimní areál",
    icon: <Snowflake className="w-6 h-6" />,
    position: { x: 40, y: 65 },
    color: "bg-cyan-500",
    description: "Lyžařské a snowboardové aktivity",
    features: ["Sjezdovka", "Snowpark", "Půjčovna vybavení"]
  },
  {
    id: "airbag",
    name: "AIRBAG Matrace",
    icon: <Shield className="w-6 h-6" />,
    position: { x: 60, y: 25 },
    color: "bg-red-500",
    description: "Bezpečný trénink triků a akrobatických prvků",
    features: ["Profesionální matrace", "Bezpečný landing", "Pro všechny úrovně"]
  },
  {
    id: "deti",
    name: "Dětská zóna",
    icon: <Baby className="w-6 h-6" />,
    position: { x: 35, y: 80 },
    color: "bg-pink-500",
    description: "Bezpečné prostředí pro nejmenší",
    features: ["Dětské hřiště", "Lehké traily", "Dozor instruktorů"]
  }
];

const InteractiveMap: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  return (
    <div className="relative w-full bg-gradient-to-br from-green-50 via-blue-50 to-gray-50 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
      {/* Map Background - placeholder gradient */}
      <div className="relative w-full aspect-[16/10]">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          {/* Mountains silhouette */}
          <svg className="absolute bottom-0 w-full h-1/2 text-gray-300/30" viewBox="0 0 1200 400" fill="currentColor">
            <path d="M0,300 L300,100 L600,200 L900,50 L1200,180 L1200,400 L0,400 Z" />
          </svg>

          {/* Trees decorations */}
          <div className="absolute bottom-20 left-10 w-8 h-12 bg-green-400/20 rounded-full" />
          <div className="absolute bottom-24 left-16 w-6 h-10 bg-green-500/20 rounded-full" />
          <div className="absolute bottom-16 right-20 w-10 h-14 bg-green-400/20 rounded-full" />
          <div className="absolute bottom-28 right-32 w-8 h-12 bg-green-500/20 rounded-full" />

          {/* Paths */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <path d="M 200,200 Q 400,250 600,220 T 900,280" stroke="#6B7280" strokeWidth="3" fill="none" strokeDasharray="5,5" />
            <path d="M 300,400 Q 500,350 700,360" stroke="#6B7280" strokeWidth="3" fill="none" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Map Points */}
        {mapPoints.map((point) => (
          <div
            key={point.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ left: `${point.position.x}%`, top: `${point.position.y}%` }}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
            onClick={() => setSelectedPoint(point)}
          >
            {/* Pulse animation */}
            <div
              className={`absolute inset-0 ${point.color} rounded-full opacity-30 animate-ping`}
              style={{ width: '48px', height: '48px', margin: '-12px' }}
            />

            {/* Icon container */}
            <div
              className={`relative ${point.color} text-white p-3 rounded-full shadow-xl transition-all duration-300 ${
                hoveredPoint === point.id ? 'scale-125 shadow-2xl' : 'scale-100'
              }`}
            >
              {point.icon}
            </div>

            {/* Label */}
            <div
              className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-sm font-semibold text-gray-800 transition-all duration-300 ${
                hoveredPoint === point.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              {point.name}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-tjk-blue" />
            Mapa areálu
          </h3>
          <p className="text-xs text-gray-600">
            Klikněte na ikony pro více informací o jednotlivých částech areálu
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPoint && (
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPoint(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPoint(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>

            {/* Icon */}
            <div className={`${selectedPoint.color} text-white p-4 rounded-2xl w-fit mb-4 shadow-lg`}>
              {selectedPoint.icon}
            </div>

            {/* Content */}
            <h3 className="text-3xl font-black text-gray-900 mb-3 font-montserrat">
              {selectedPoint.name}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {selectedPoint.description}
            </p>

            {/* Features */}
            {selectedPoint.features && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 mb-2">Co nabízíme:</h4>
                {selectedPoint.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <div className={`w-2 h-2 ${selectedPoint.color} rounded-full`} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
