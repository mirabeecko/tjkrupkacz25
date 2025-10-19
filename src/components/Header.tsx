import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion, Menu, Phone, Mail, Search, Moon, Sun } from "lucide-react";
import WeatherWidget from "./WeatherWidget";
import LanguageSelector from "./LanguageSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface HeaderProps {
  toggleNavbar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleNavbar }) => {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-gradient-to-r from-tjk-blue via-blue-900 to-tjk-blue shadow-lg py-2 border-white/10"
          : "bg-gradient-to-r from-white/95 via-white/98 to-white/95 backdrop-blur-lg shadow-sm py-3 border-gray-100"
      )}
    >
      <div className="container flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleNavbar}
            className={cn(
              "p-2 rounded-xl transition-all duration-300 lg:hidden group",
              scrolled
                ? "text-white hover:bg-white/20"
                : "text-tjk-blue hover:bg-tjk-blue/10"
            )}
            aria-label="Toggle menu"
          >
            <Menu className="transition-transform group-hover:rotate-90" />
          </button>
          <a href="/" className="flex items-center group">
            <div className="relative">
              <img
                src="tjk-logo-header.png"
                alt="Tělovýchovná jednota Krupka z.s. logo"
                className={cn(
                  "w-auto drop-shadow-xl transition-all duration-300 group-hover:scale-110",
                  scrolled ? "h-10" : "h-12"
                )}
                style={{ background: "white", borderRadius: "50%" }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-tjk-orange to-amber-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <span
              className={cn(
                "ml-3 font-poppins font-bold hidden md:inline transition-all duration-300",
                scrolled ? "text-white text-base" : "text-tjk-blue text-lg"
              )}
            >
              Tělovýchovná jednota Krupka z.s.
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Quick Contact Buttons - Hidden on mobile */}
          {!isMobile && (
            <>
              <a
                href="tel:+420777734389"
                className={cn(
                  "group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105",
                  scrolled
                    ? "text-white hover:bg-white/20"
                    : "text-tjk-blue hover:bg-tjk-blue/10"
                )}
              >
                <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
                <span className="text-sm font-medium hidden lg:inline">
                  +420 777 734 389
                </span>
              </a>
              <a
                href="mailto:info@tjkrupka.cz"
                className={cn(
                  "group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105",
                  scrolled
                    ? "text-white hover:bg-white/20"
                    : "text-tjk-blue hover:bg-tjk-blue/10"
                )}
              >
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium hidden xl:inline">
                  info@tjkrupka.cz
                </span>
              </a>
            </>
          )}

          <WeatherWidget />
          <LanguageSelector />

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className={cn(
              "rounded-xl transition-all duration-300 hover:scale-110",
              scrolled
                ? "text-white hover:bg-white/20"
                : "text-tjk-blue hover:bg-tjk-blue/10"
            )}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 transition-transform hover:rotate-180" />
            ) : (
              <Moon className="h-5 w-5 transition-transform hover:-rotate-12" />
            )}
          </Button>

          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-xl transition-all duration-300 hover:scale-110",
              scrolled
                ? "text-white hover:bg-white/20"
                : "text-tjk-blue hover:bg-tjk-blue/10"
            )}
          >
            <Search className="h-5 w-5 transition-transform hover:scale-125" />
          </Button>

          {/* Help Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-xl transition-all duration-300 hover:scale-110",
              scrolled
                ? "text-white hover:bg-white/20"
                : "text-tjk-blue hover:bg-tjk-blue/10"
            )}
          >
            <MessageCircleQuestion className="h-5 w-5 transition-transform hover:rotate-12" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
