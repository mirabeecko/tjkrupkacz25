
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Hero Background with animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 mix-blend-overlay z-10"></div>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        poster="/lovable-uploads/hero-image.jpg"
        muted
        loop
        autoPlay
        playsInline
      >
        <source src="/lovable-uploads/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Animated elements */}
      <div className="absolute inset-0 z-5">
        {/* Mountain silhouettes for depth */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-[url('/lovable-uploads/mountain-silhouette.png')] bg-bottom bg-contain bg-repeat-x opacity-20"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="particles-container">
            {/* These particles are styled in CSS with animations */}
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container relative z-20 flex flex-col h-full justify-center items-center text-center text-white px-4">
        <div className="max-w-5xl">
          {/* Logo badge */}
          <div className="inline-block mb-8 animate-[fade-in_1s_ease-out]">
            <img 
              src="/lovable-uploads/tjk-logo-light.png" 
              alt="TJK Krupka" 
              className="h-20 md:h-24 drop-shadow-lg"
            />
          </div>
          
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-[counter-up_1s_ease-out_0.2s_both] drop-shadow-lg">
            Zažij Krušné hory 
            <span className="block text-tjk-orange mt-2">naplno s TJK Krupka!</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90 animate-[counter-up_1s_ease-out_0.4s_both]">
            Jedinečné horské zážitky pro každého - trailpark, kiting, turistika, 
            paragliding a nezapomenutelné výlety pro rodiny i přátele.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[counter-up_1s_ease-out_0.6s_both]">
            <Button size="lg" className="bg-tjk-orange hover:bg-tjk-orange/90 text-white px-8 py-6 text-lg rounded-full group">
              Rezervovat aktivitu
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full">
              Staňte se dobrovolníkem
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#o-nas"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white animate-bounce"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 opacity-80">Objevit více</span>
          <ChevronDown className="h-8 w-8" />
        </div>
      </a>
    </section>
  );
};

export default Hero;
