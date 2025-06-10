
import React from "react";
import { Snowflake, Building, Clock } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ArealStats: React.FC = () => {
  const stats: StatProps[] = [
    { 
      icon: <Snowflake className="h-8 w-8 text-tjk-orange" />, 
      label: "Počet vleků", 
      value: "3" 
    },
    { 
      icon: <Building className="h-8 w-8 text-tjk-orange" />, 
      label: "Počet pokojů", 
      value: "14" 
    },
    { 
      icon: <Clock className="h-8 w-8 text-tjk-orange" />, 
      label: "Historie", 
      value: "50 let" 
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-montserrat font-bold mb-10 text-center text-tjk-blue">
          Areál Komáří vížka v číslech
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
              <div className="mb-4">
                {stat.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
              <p className="text-4xl font-bold text-tjk-blue">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArealStats;
