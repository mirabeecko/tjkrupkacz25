import React from "react";
import { Link } from "react-router-dom";
import { 
  Info, Activity, Coffee, Map, ShoppingBag, Ticket, Heart, Mail, CloudSun, Bike
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isOpen: boolean;
  closeNavbar: () => void;
}

const menuItems = [
  { name: "O nás", icon: <Info className="h-5 w-5" />, href: "/o-nas" },
  { name: "Komáří vížka", icon: <Map className="h-5 w-5" />, href: "/komari-vizka" },
  { name: "TPK", icon: <Bike className="h-5 w-5" />, href: "/trailpark" },
  { name: "Dobrovolníci & Sponzoři", icon: <Heart className="h-5 w-5" />, href: "/dobrovolnici" },
  { name: "Kontakt", icon: <Mail className="h-5 w-5" />, href: "/kontakt" },
  { name: "Počasí", icon: <CloudSun className="h-5 w-5" />, href: "/pocasi" },
];

const Navbar: React.FC<NavbarProps> = ({ isOpen, closeNavbar }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={closeNavbar}
        ></div>
      )}
      
      {/* Navigation menu - Desktop: horizontal under header, Mobile: slideout menu */}
      <nav className={cn(
        "bg-white z-30 transition-all duration-300 ease-in-out",
        // Mobile styles - slide out menu
        "fixed top-0 left-0 h-full w-64 shadow-lg transform lg:shadow-none lg:transform-none", 
        isOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop styles - horizontal menu under header
        "lg:static lg:flex lg:h-auto lg:w-full lg:translate-x-0 lg:justify-center lg:border-b lg:border-gray-100"
      )}>
        {/* Mobile menu header */}
        <div className="p-4 border-b flex justify-between items-center lg:hidden">
          <h2 className="font-montserrat font-bold text-lg text-tjk-blue">Menu</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={closeNavbar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Navigation Links */}
        <ul className={cn(
          "space-y-2 p-4",
          // Desktop: horizontal layout
          "lg:flex lg:space-y-0 lg:space-x-2 lg:items-center lg:p-0"
        )}>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-tjk-gray hover:text-tjk-blue transition-all",
                  // Desktop styles
                  "lg:py-4 lg:hover:bg-transparent lg:hover:text-tjk-orange"
                )}
                onClick={closeNavbar}
              >
                <span className="lg:hidden">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Mobile Footer */}
        <div className="mt-auto p-4 border-t lg:hidden">
          <div className="flex flex-col space-y-2">
            <a 
              href="/dobrovolnici" 
              className="border border-tjk-blue text-tjk-blue hover:bg-tjk-blue/10 py-2 px-4 rounded text-center font-medium"
            >
              Staňte se dobrovolníkem
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
