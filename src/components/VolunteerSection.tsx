
import React from "react";
import { Button } from "@/components/ui/button";

const VolunteerSection: React.FC = () => {
  return (
    <section id="dobrovolnici" className="section-padding bg-tjk-gray bg-dots-pattern">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Volunteer Banner */}
          <div className="rounded-xl overflow-hidden relative shadow-elevation group">
            <div className="absolute inset-0 bg-gradient-to-r from-tjk-blue/90 to-tjk-blue/60 z-10 transition-opacity duration-500"></div>
            <img 
              src="lovable-uploads/volunteer-image.jpg" 
              alt="Dobrovolníci TJ Krupka" 
              className="w-full h-72 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";
              }}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
              <h3 className="font-poppins font-bold text-2xl md:text-3xl mb-4 leading-tight">
                Zapojte se do stavby trailparku!
              </h3>
              <p className="mb-6 text-white/90 max-w-md leading-relaxed">
                Hledáme nadšence, kteří nám pomohou s budováním nového trailového parku na Komáří vížce.
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-white inline-flex w-fit">
                Jdu pomoct
              </Button>
            </div>
          </div>
          
          {/* Sponsor Banner */}
          <div className="rounded-xl overflow-hidden relative shadow-elevation group">
            <div className="absolute inset-0 bg-gradient-to-r from-tjk-blue/90 to-tjk-blue/60 z-10 transition-opacity duration-500"></div>
            <img 
              src="lovable-uploads/sponsor-image.jpg" 
              alt="Sponzoři TJ Krupka" 
              className="w-full h-72 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80";
              }}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
              <h3 className="font-poppins font-bold text-2xl md:text-3xl mb-4 leading-tight">
                Podpořte nás jako partner
              </h3>
              <p className="mb-6 text-white/90 max-w-md leading-relaxed">
                Hledáme partnery, kteří nám pomohou s rozvojem sportovních aktivit a infrastruktury v areálu Komáří vížky.
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-white inline-flex w-fit">
                Chci být sponzor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
