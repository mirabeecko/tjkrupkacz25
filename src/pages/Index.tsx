import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Activities from "@/components/Activities";
import Stats from "@/components/Stats";
import VolunteerSection from "@/components/VolunteerSection";
import WeatherSection from "@/components/WeatherSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Mountain, 
  Compass, 
  Star,
  ChevronDown,
  Trophy,
  Users,
  Heart,
  Leaf,
  Medal,
  UserPlus,
  Activity,
  Bike,
  Snowflake,
  Wind,
  HeartHandshake
} from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Index = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };


  const currentSports = [
    { 
      name: "Stolní tenis", 
      icon: <Activity className="w-7 h-7 text-tjk-blue" />, 
      desc: "Oddíl pro všechny věkové kategorie, pravidelné tréninky a turnaje.",
      image: "lovable-uploads/hero-community.jpg"
    },
    { 
      name: "MTB (horská kola)", 
      icon: <Bike className="w-7 h-7 text-tjk-blue" />, 
      desc: "Komunita MTB jezdců, traily v okolí a společné vyjížďky.",
      image: "lovable-uploads/hero-mtb.jpg"
    },
    { 
      name: "Zimní sporty", 
      icon: <Snowflake className="w-7 h-7 text-blue-400" />, 
      desc: "Lyžování a snowboarding v areálu Komáří vížka.",
      image: "lovable-uploads/hero-winter.jpg"
    },
    { 
      name: "Kitesurfing", 
      icon: <Wind className="w-7 h-7 text-sky-500" />, 
      desc: "Adrenalin na větru, netradiční disciplína v Krušných horách.",
      image: "lovable-uploads/hero-mtb.jpg"
    },
    { 
      name: "Kolečkové sporty", 
      icon: <Activity className="w-7 h-7 text-pink-500" />, 
      desc: "Inline brusle, skateboardy a další aktivity na kolečkách.",
      image: "lovable-uploads/hero-community.jpg"
    }
  ];


  const communityValues = [
    { 
      title: "Budování komunity", 
      icon: <HeartHandshake className="w-8 h-8 text-tjk-blue" />,
      description: "Spojujeme lidi s láskou k pohybu a přírodě"
    },
    { 
      title: "Zdravý životní styl", 
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      description: "Podporujeme aktivní život v krásném prostředí hor"
    },
    { 
      title: "Nezapomenutelná dobrodružství", 
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      description: "Vytváříme zážitky, které si budete pamatovat celý život"
    },
    { 
      title: "Ocenění a uznání", 
      icon: <Medal className="w-8 h-8 text-amber-500" />,
      description: "Oceňujeme úspěchy a podporujeme růst našich členů"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />
      
      <main className="flex-1">

        <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">



          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40 mix-blend-overlay z-10"></div>
          
          {/* <video

            className="absolute inset-0 w-full h-full object-cover scale-105 transform transition-transform duration-10000 animate-slow-zoom"
            poster="lovable-uploads/hero-image.jpg"
            muted
            loop
            autoPlay
            playsInline
          >
            <source src="lovable-uploads/hero-video.mp4" type="video/mp4" />
          </video> */}



          <div className="absolute inset-0 z-5 opacity-30">
            <div className="particles-container">





              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle particle-${i + 1} animate-float-${i % 5}`}></div>
              ))}
            </div>
          </div>


          <div className="container relative z-20 flex flex-col h-full justify-center items-center text-white px-4">
            <div className="max-w-6xl">


              <div className="inline-block mb-8 animate-[fade-in_1.2s_ease-out] hover:scale-105 transition-transform duration-300">
                {/* <img 
                  src="lovable-uploads/tjk-logo-light.png" 
                  alt="TJK Krupka" 

                  className="h-24 md:h-32 drop-shadow-2xl"
                /> */}
              </div>





              <h1 className="font-montserrat font-black text-5xl md:text-8xl mb-8 drop-shadow-2xl animate-[fade-in-up_1.2s_ease-out_0.3s_both]">
                <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                  Vítejte v TJ Krupka
                </span>
              </h1>
              



              <p className="max-w-4xl mx-auto text-xl md:text-3xl mb-10 animate-[fade-in-up_1.2s_ease-out_0.5s_both] leading-relaxed font-light">
                Více než <span className="font-semibold text-blue-300">50 let tradice</span> v srdci Krušných hor. 
                Místo, kde sport spojuje generace a vytváří nezapomenutelné okamžiky.
              </p>



              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-[fade-in-up_1.2s_ease-out_0.7s_both]">
                <Link to="/o-nas">
                  <Button size="lg" className="group bg-gradient-to-r from-tjk-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xl px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                    <Users className="mr-3 h-6 w-6" />
                    Poznejte naši komunitu
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
                {/* Odkaz na sportovní aktivity byl odstraněn dle zadání */}
              </div>




              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="h-10 w-10 text-white/80" />
              </div>
            </div>
          </div>
        </section>
























































































































        {/* Další sekce zůstávají stejné */}
        <Activities />


























































        <Stats />
        <VolunteerSection />
        <WeatherSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
