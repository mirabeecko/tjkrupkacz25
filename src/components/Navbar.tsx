import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Info, Map, Heart, Mail, CloudSun, Wind, Briefcase, ChevronDown, Bed, Bike, Coffee, Mountain, Shield, School
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isOpen: boolean;
  closeNavbar: () => void;
}

// Submenu pro Služby
const servicesSubmenu = [
  { name: "Snowkiting Kurzy", icon: <Wind className="h-4 w-4" />, href: "/snowkiting-kurzy" },
  { name: "Půjčovna Motocyklů", icon: <Bike className="h-4 w-4" />, href: "/pujcovna" },
  { name: "Lyžařský areál", icon: <Mountain className="h-4 w-4" />, href: "/komari-vizka" },
  { name: "Pro školy", icon: <School className="h-4 w-4" />, href: "/skoly" },
  { name: "Pro firmy", icon: <Briefcase className="h-4 w-4" />, href: "/firmy" },
  { name: "Ubytování", icon: <Bed className="h-4 w-4" />, href: "/ubytovani" },
  { name: "AIRBAG", icon: <Shield className="h-4 w-4" />, href: "/airbag" },
];

const menuItems = [
  { name: "O nás", icon: <Info className="h-5 w-5" />, href: "/o-nas" },
  { name: "Komáří vížka", icon: <Map className="h-5 w-5" />, href: "/komari-vizka" },
  { name: "Služby", icon: <Briefcase className="h-5 w-5" />, href: "/sluzby", hasSubmenu: true },
  { name: "Dobrovolníci & Sponzoři", icon: <Heart className="h-5 w-5" />, href: "/dobrovolnici" },
  { name: "Kontakt", icon: <Mail className="h-5 w-5" />, href: "/kontakt" },
  { name: "Počasí", icon: <CloudSun className="h-5 w-5" />, href: "/pocasi" },
];

const Navbar: React.FC<NavbarProps> = ({ isOpen, closeNavbar }) => {
  const location = useLocation();
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isServiceActive = () => {
    return servicesSubmenu.some(item => location.pathname === item.href) || location.pathname === "/sluzby";
  };

  const toggleMobileSubmenu = () => {
    setMobileSubmenuOpen(!mobileSubmenuOpen);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeNavbar}
        ></div>
      )}

      {/* Navigation menu - Desktop: horizontal under header, Mobile: slideout menu */}
      <nav className={cn(
        "z-50 transition-all duration-300 ease-in-out",
        // Mobile styles - slide out menu with gradient
        "fixed top-0 left-0 h-full w-72 shadow-2xl transform lg:shadow-none lg:transform-none overflow-y-auto",
        "bg-gradient-to-br from-tjk-blue via-blue-900 to-tjk-blue",
        isOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop styles - horizontal menu with glassmorphism
        "lg:static lg:flex lg:h-auto lg:w-full lg:translate-x-0 lg:justify-center lg:z-30 lg:overflow-visible",
        "lg:bg-gradient-to-r lg:from-white/95 lg:via-white/98 lg:to-white/95 lg:backdrop-blur-lg lg:border-b lg:border-gray-200/50 lg:shadow-sm"
      )}>
        {/* Mobile menu header */}
        <div className="p-5 border-b border-white/20 flex justify-between items-center lg:hidden bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tjk-orange to-amber-600 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <h2 className="font-poppins font-bold text-xl text-white">Menu</h2>
          </div>
          <button
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
            onClick={closeNavbar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={cn(
          "space-y-1 p-4",
          // Desktop: horizontal layout
          "lg:flex lg:space-y-0 lg:space-x-1 lg:items-center lg:p-0 lg:py-0"
        )}>
          {menuItems.map((item) => (
            <li key={item.name} className="lg:h-full lg:relative">
              {item.hasSubmenu ? (
                // Služby s submenu
                <>
                  {/* Mobile - kliknutelný button */}
                  <button
                    onClick={toggleMobileSubmenu}
                    className={cn(
                      "lg:hidden w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300",
                      "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm",
                      "border border-transparent hover:border-white/20",
                      isServiceActive() && "bg-white/15 border-white/30"
                    )}
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-tjk-orange/20 to-amber-500/20 flex items-center justify-center group-hover:from-tjk-orange/30 group-hover:to-amber-500/30 transition-all duration-300">
                      {item.icon}
                    </span>
                    <span className="font-poppins font-medium flex-1 text-left">
                      {item.name}
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      mobileSubmenuOpen && "rotate-180"
                    )} />
                  </button>

                  {/* Mobile - submenu */}
                  {mobileSubmenuOpen && (
                    <ul className="lg:hidden ml-4 mt-1 space-y-1 animate-in slide-in-from-top-2">
                      {servicesSubmenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.href}
                            onClick={closeNavbar}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200",
                              "text-white/80 hover:text-white hover:bg-white/10",
                              isActive(subItem.href) && "bg-white/15 text-white font-semibold"
                            )}
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                              {subItem.icon}
                            </span>
                            <span className="font-poppins">{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Desktop - hover menu */}
                  <div className="hidden lg:block group h-full">
                    <Link
                      to={item.href}
                      className={cn(
                        "relative flex items-center gap-2 px-5 py-6 font-medium transition-all duration-300 h-full",
                        "text-gray-700 hover:text-tjk-orange",
                        "relative overflow-hidden",
                        isServiceActive() && "text-tjk-orange font-semibold"
                      )}
                    >
                      <span className="font-poppins font-semibold relative z-10">
                        {item.name}
                      </span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />

                      {/* Desktop hover underline effect */}
                      <span className={cn(
                        "absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-tjk-orange to-amber-500 transition-transform duration-300 origin-left",
                        isServiceActive() ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}></span>
                    </Link>

                    {/* Desktop Dropdown Menu */}
                    <div className="absolute top-full left-0 w-[32rem] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden mt-2">
                        <div className="p-2 grid grid-cols-2 gap-2">
                          {servicesSubmenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                "text-gray-700 hover:text-tjk-orange hover:bg-orange-50",
                                isActive(subItem.href) && "bg-orange-100 text-tjk-orange font-semibold"
                              )}
                            >
                              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                                {subItem.icon}
                              </span>
                              <span className="font-poppins font-medium text-sm">{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Běžné menu položky bez submenu
                <Link
                  to={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300",
                    // Mobile styles
                    "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm",
                    "border border-transparent hover:border-white/20",
                    isActive(item.href) && "bg-white/15 border-white/30",
                    // Desktop styles
                    "lg:text-gray-700 lg:hover:text-tjk-orange lg:py-6 lg:px-5",
                    "lg:border-0 lg:hover:bg-transparent lg:rounded-none",
                    "lg:relative lg:overflow-hidden",
                    isActive(item.href) && "lg:text-tjk-orange lg:font-semibold"
                  )}
                  onClick={closeNavbar}
                >
                  {/* Mobile icon */}
                  <span className="lg:hidden flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-tjk-orange/20 to-amber-500/20 flex items-center justify-center group-hover:from-tjk-orange/30 group-hover:to-amber-500/30 transition-all duration-300">
                    {item.icon}
                  </span>

                  {/* Text */}
                  <span className="font-poppins font-medium lg:font-semibold relative z-10">
                    {item.name}
                  </span>

                  {/* Desktop hover underline effect */}
                  <span className={cn(
                    "hidden lg:block absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-tjk-orange to-amber-500 transition-transform duration-300 origin-left",
                    isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}></span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Footer */}
        <div className="mt-auto p-4 border-t border-white/20 lg:hidden bg-gradient-to-t from-black/20 to-transparent backdrop-blur-sm">
          <div className="flex flex-col space-y-3">
            <Link
              to="/dobrovolnici"
              onClick={closeNavbar}
              className="group relative overflow-hidden bg-gradient-to-r from-tjk-orange to-amber-600 hover:from-tjk-orange/90 hover:to-amber-600/90 text-white py-3 px-5 rounded-xl text-center font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Staňte se dobrovolníkem
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
