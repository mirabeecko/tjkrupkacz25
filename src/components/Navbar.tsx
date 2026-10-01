import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Info, Map, Heart, Mail, CloudSun, Wind, Briefcase, ChevronDown, Bed, Shield, School, Smile, Users, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_URL, appLink } from "@/config/site";

interface NavbarProps {
  isOpen: boolean;
  closeNavbar: () => void;
}

/**
 * Navigace podle webauditu (2.2 a body B1, B13, B18):
 *  - oba prioritní PRODUKTY (SnowKite kurzy, AIRBAG) jsou samostatné položky
 *    hlavního menu — dřív byly jen v podmenu, které se na desktopu nezobrazovalo,
 *  - „Rezervovat" je trvale viditelné tlačítko vpravo a vede do app.tjkrupka.cz,
 *  - jedna struktura pro desktop i mobil (dřív Navbar a Sidebar s jinými položkami).
 */
const productItems = [
  {
    name: "SnowKite kurzy",
    icon: <Wind className="h-5 w-5" />,
    href: "/snowkiting-kurzy",
  },
  {
    name: "Airbag",
    icon: <Shield className="h-5 w-5" />,
    href: "/airbag",
  },
];

// Služby = servisní nabídka (produkty jsou samostatně nahoře)
const servicesSubmenu = [
  { name: "Ubytování", icon: <Bed className="h-4 w-4" />, href: "/ubytovani" },
  { name: "Pro školy", icon: <School className="h-4 w-4" />, href: "/skoly" },
  { name: "Pro firmy", icon: <Briefcase className="h-4 w-4" />, href: "/firmy" },
  { name: "Aktivity pro děti", icon: <Smile className="h-4 w-4" />, href: "/aktivity-pro-deti" },
];

const menuItems = [
  { name: "Komáří vížka", icon: <Map className="h-5 w-5" />, href: "/komari-vizka" },
  { name: "Služby", icon: <Briefcase className="h-5 w-5" />, href: "/sluzby", hasSubmenu: true },
  { name: "O nás", icon: <Info className="h-5 w-5" />, href: "/o-nas" },
  { name: "Kontakt", icon: <Mail className="h-5 w-5" />, href: "/kontakt" },
];

// Servisní odkazy, které v hlavním menu nejsou, ale nesmí zmizet (drží je mobil i patička)
const secondaryItems = [
  { name: "Počasí", icon: <CloudSun className="h-4 w-4" />, href: "/pocasi" },
  { name: "Dobrovolníci & Sponzoři", icon: <Heart className="h-4 w-4" />, href: "/dobrovolnici" },
];

const Navbar: React.FC<NavbarProps> = ({ isOpen, closeNavbar }) => {
  const location = useLocation();
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const isServiceActive = () =>
    servicesSubmenu.some((item) => location.pathname === item.href) ||
    location.pathname === "/sluzby";

  const isProductActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeNavbar}
        ></div>
      )}

      <nav
        className={cn(
          "z-50 transition-all duration-300 ease-in-out",
          "fixed top-0 left-0 h-full w-72 shadow-2xl transform lg:shadow-none lg:transform-none overflow-y-auto",
          "bg-gradient-to-br from-tjk-blue via-blue-900 to-tjk-blue",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:flex lg:h-auto lg:w-full lg:translate-x-0 lg:justify-center lg:z-30 lg:overflow-visible",
          "lg:bg-gradient-to-r lg:from-white/95 lg:via-white/98 lg:to-white/95 lg:backdrop-blur-lg lg:border-b lg:border-gray-200/50 lg:shadow-sm",
        )}
      >
        {/* Mobile menu header */}
        <div className="p-5 border-b border-white/20 flex justify-between items-center lg:hidden bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tjk-orange to-amber-600 flex items-center justify-center shadow-lg">
              <Wind className="h-5 w-5 text-white" />
            </div>
            <h2 className="font-poppins font-bold text-xl text-white">Menu</h2>
          </div>
          <button
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
            onClick={closeNavbar}
            aria-label="Zavřít menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul
          className={cn(
            "space-y-1 p-4",
            "lg:flex lg:space-y-0 lg:space-x-1 lg:items-center lg:p-0 lg:py-0 lg:justify-center",
          )}
        >
          {/* Produkty — první dvě položky, vlastní akční barva (B1) */}
          {productItems.map((item) => (
            <li key={item.name} className="lg:h-full lg:relative">
              <Link
                to={item.href}
                onClick={closeNavbar}
                className={cn(
                  "group relative flex items-center gap-3 px-4 py-3 rounded-xl font-poppins font-semibold transition-all duration-300",
                  "text-white bg-tjk-orange/90 hover:bg-tjk-orange border border-tjk-orange",
                  "lg:bg-transparent lg:text-tjk-orange lg:border-0 lg:border-b-2 lg:border-tjk-orange/0 lg:hover:border-tjk-orange",
                  "lg:py-6 lg:px-4 lg:rounded-none lg:h-full",
                  isProductActive(item.href) && "lg:border-tjk-orange",
                )}
              >
                <span className="lg:hidden flex-shrink-0 w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                  {item.icon}
                </span>
                <span className="hidden lg:inline-flex flex-shrink-0">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          {menuItems.map((item) => (
            <li key={item.name} className="lg:h-full lg:relative">
              {item.hasSubmenu ? (
                <>
                  {/* Mobile - kliknutelný button */}
                  <button
                    onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                    className={cn(
                      "lg:hidden w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300",
                      "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm",
                      "border border-transparent hover:border-white/20",
                      isServiceActive() && "bg-white/15 border-white/30",
                    )}
                    aria-expanded={mobileSubmenuOpen}
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-tjk-orange/20 to-amber-500/20 flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="font-poppins font-medium flex-1 text-left">{item.name}</span>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform duration-300", mobileSubmenuOpen && "rotate-180")}
                    />
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
                              isActive(subItem.href) && "bg-white/15 text-white font-semibold",
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
                  <div className="hidden lg:block h-full" onMouseLeave={() => setIsServicesMenuOpen(false)}>
                    <Link
                      to={item.href}
                      onMouseEnter={() => setIsServicesMenuOpen(true)}
                      className={cn(
                        "relative flex items-center gap-2 px-5 py-6 font-medium transition-all duration-300 h-full",
                        "text-gray-700 hover:text-tjk-orange relative overflow-hidden",
                        isServiceActive() && "text-tjk-orange font-semibold",
                      )}
                    >
                      <span className="font-poppins font-semibold relative z-10">{item.name}</span>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform duration-300", isServicesMenuOpen && "rotate-180")}
                      />
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 w-full h-1 bg-tjk-orange transition-transform duration-300 origin-left",
                          isServiceActive() || isServicesMenuOpen ? "scale-x-100" : "scale-x-0",
                        )}
                      ></span>
                    </Link>

                    <div
                      className={cn(
                        "absolute top-full left-0 w-[26rem] transition-all duration-300 transform z-50",
                        isServicesMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
                      )}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden mt-2">
                        <div className="p-2 grid grid-cols-2 gap-2">
                          {servicesSubmenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                "text-gray-700 hover:text-tjk-orange hover:bg-orange-50",
                                isActive(subItem.href) && "bg-orange-100 text-tjk-orange font-semibold",
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
                <Link
                  to={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300",
                    "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm",
                    "border border-transparent hover:border-white/20",
                    isActive(item.href) && "bg-white/15 border-white/30",
                    "lg:text-gray-700 lg:hover:text-tjk-orange lg:py-6 lg:px-5",
                    "lg:border-0 lg:hover:bg-transparent lg:rounded-none",
                    "lg:relative lg:overflow-hidden",
                    isActive(item.href) && "lg:text-tjk-orange lg:font-semibold",
                  )}
                  onClick={closeNavbar}
                >
                  <span className="lg:hidden flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-tjk-orange/20 to-amber-500/20 flex items-center justify-center">
                    {item.icon}
                  </span>
                  <span className="font-poppins font-medium lg:font-semibold relative z-10">{item.name}</span>
                  <span
                    className={cn(
                      "hidden lg:block absolute bottom-0 left-0 w-full h-1 bg-tjk-orange transition-transform duration-300 origin-left",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  ></span>
                </Link>
              )}
            </li>
          ))}

          {/* Rezervovat — konverzní cíl celého webu (B5) */}
          <li className="lg:h-full lg:ml-2">
            <a
              href={appLink("menu")}
              className={cn(
                "group relative flex items-center gap-3 px-4 py-3 rounded-xl font-poppins font-bold transition-all duration-300",
                "text-white bg-tjk-orange hover:bg-tjk-orange/90 shadow-md hover:shadow-lg",
                "lg:py-6 lg:px-5 lg:rounded-none",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeNavbar}
              title={`Rezervace a platba v aplikaci ${APP_URL}`}
            >
              <span className="lg:hidden flex-shrink-0 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </span>
              <span className="hidden lg:inline-block flex-shrink-0">
                <Users className="h-5 w-5" />
              </span>
              <span className="relative z-10">
                <span className="block leading-tight">Rezervovat</span>
                <span className="hidden lg:block text-[11px] font-medium text-white/85 leading-tight">
                  Pro členy a platby
                </span>
              </span>
            </a>
          </li>
        </ul>

        {/* Mobile Footer */}
        <div className="mt-auto p-4 border-t border-white/20 lg:hidden bg-gradient-to-t from-black/20 to-transparent backdrop-blur-sm">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-wrap gap-2 pb-2">
              {secondaryItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeNavbar}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/75 hover:text-white hover:bg-white/10"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
            <a
              href={appLink("menu-mobil")}
              className="flex items-center justify-center gap-2 bg-tjk-orange hover:bg-tjk-orange/90 text-white py-3 px-5 rounded-xl text-center font-poppins font-semibold shadow-lg transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeNavbar}
            >
              <CalendarCheck className="h-5 w-5" />
              Rezervovat v aplikaci
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
