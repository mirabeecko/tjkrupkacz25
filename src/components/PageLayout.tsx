
import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WeatherWidget from "@/components/WeatherWidget";
import BreadcrumbNav from "@/components/BreadcrumbNav";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  backgroundImage?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title,
  description,
  backgroundImage 
}) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  // Choose background based on presence of custom image or use default pattern
  const headerBackgroundStyle = backgroundImage 
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    : {};

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />
      
      <main className="flex-1">
        {(title || description) && (
          <div
            className={`bg-tjk-gray ${!backgroundImage ? 'bg-dots-pattern' : ''} relative`}
            style={headerBackgroundStyle}
          >
            {/* Decorative elements */}
            {!backgroundImage && (
              <>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-tjk-orange to-transparent"></div>
              </>
            )}

            <div className="container mx-auto px-4 py-16 md:py-24">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-poppins font-bold mb-4 text-primary tracking-tighter slide-in">{title}</h1>
                {description && (
                  <p className="text-base sm:text-lg md:text-xl font-inter text-foreground/80 leading-relaxed max-w-3xl fade-in">{description}</p>
                )}

                <div className="mt-6 hidden md:block">
                  <WeatherWidget />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 py-12">
          <BreadcrumbNav />
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;
