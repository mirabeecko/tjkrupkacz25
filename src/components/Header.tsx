import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion, Menu } from "lucide-react";
import WeatherWidget from "./WeatherWidget";
import LanguageSelector from "./LanguageSelector";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  toggleNavbar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleNavbar }) => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm px-4 py-3">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleNavbar} 
            className="text-tjk-blue p-2 rounded-md hover:bg-gray-100 transition lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu />
          </button>
          <a href="/" className="flex items-center">
            <img 
              src="/tjk-logo-header.png" 
              alt="Tělovýchovná jednota Krupka z.s. logo" 
              className="h-12 w-auto drop-shadow-lg" 
              style={{ background: 'white', borderRadius: '50%' }}
            />
            <span className="ml-2 font-montserrat font-bold text-lg hidden md:inline text-tjk-blue">
              Tělovýchovná jednota Krupka z.s.
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <WeatherWidget />
          <LanguageSelector />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-tjk-blue hover:text-tjk-orange hover:bg-transparent transition-colors"
          >
            <MessageCircleQuestion className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
