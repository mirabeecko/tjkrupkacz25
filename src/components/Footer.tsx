import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, UserPlus, ChevronRight, Home, Book, ShoppingBag, Wind, Bike, Mountain, School, Briefcase, Bed, Shield, Building, Handshake } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-tjk-blue via-blue-950 to-tjk-blue text-white py-12 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-dots-pattern"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Popular Links */}
        <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/ubytovani" className="group bg-white/5 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 border border-white/10 hover:border-tjk-orange/50 hover:bg-white/10">
            <div className="p-3 rounded-lg bg-white/10 group-hover:bg-tjk-orange/20 transition-colors">
              <Bed className="h-6 w-6 text-white group-hover:text-tjk-orange transition-colors" />
            </div>
            <h3 className="font-poppins font-bold text-base text-white">Ubytování</h3>
          </Link>
          <Link to="/skoly" className="group bg-white/5 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 border border-white/10 hover:border-tjk-orange/50 hover:bg-white/10">
            <div className="p-3 rounded-lg bg-white/10 group-hover:bg-tjk-orange/20 transition-colors">
              <School className="h-6 w-6 text-white group-hover:text-tjk-orange transition-colors" />
            </div>
            <h3 className="font-poppins font-bold text-base text-white">Pro školy</h3>
          </Link>
          <Link to="/firmy" className="group bg-white/5 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 border border-white/10 hover:border-tjk-orange/50 hover:bg-white/10">
            <div className="p-3 rounded-lg bg-white/10 group-hover:bg-tjk-orange/20 transition-colors">
              <Building className="h-6 w-6 text-white group-hover:text-tjk-orange transition-colors" />
            </div>
            <h3 className="font-poppins font-bold text-base text-white">Pro firmy</h3>
          </Link>
          <Link to="/dobrovolnici" className="group bg-white/5 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 border border-white/10 hover:border-tjk-orange/50 hover:bg-white/10">
            <div className="p-3 rounded-lg bg-white/10 group-hover:bg-tjk-orange/20 transition-colors">
              <Handshake className="h-6 w-6 text-white group-hover:text-tjk-orange transition-colors" />
            </div>
            <h3 className="font-poppins font-bold text-base text-white">Partneři</h3>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <h3 className="font-poppins font-bold text-xl mb-4 text-white">Tělovýchovná jednota Krupka z.s.</h3>
            <p className="text-white/80 mb-4 font-inter leading-relaxed">
              IČO: 46070516<br />
              Husitská 191/8<br />
              417 41 Krupka
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="group text-white hover:text-tjk-orange transition-all duration-300 bg-white/10 hover:bg-white/20 p-3 rounded-xl hover:scale-110 shadow-lg hover:shadow-xl" aria-label="Facebook">
                <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group text-white hover:text-tjk-orange transition-all duration-300 bg-white/10 hover:bg-white/20 p-3 rounded-xl hover:scale-110 shadow-lg hover:shadow-xl" aria-label="Instagram">
                <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="group text-white hover:text-tjk-orange transition-all duration-300 bg-white/10 hover:bg-white/20 p-3 rounded-xl hover:scale-110 shadow-lg hover:shadow-xl" aria-label="Youtube">
                <Youtube className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <h3 className="font-poppins font-bold text-xl mb-4 text-white">Rychlé menu</h3>
            <ul className="space-y-2.5">
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/o-nas" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <ChevronRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  <span className="group-hover:font-medium">O nás</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/komari-vizka" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <ChevronRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  <span className="group-hover:font-medium">Komáří vížka</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/sluzby" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <ChevronRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  <span className="group-hover:font-medium">Služby</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/snowkiting-kurzy" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <ChevronRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  <span className="group-hover:font-medium">Kurzy Snowkitingu</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/dobrovolnici" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <ChevronRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  <span className="group-hover:font-medium">Dobrovolníci & Sponzoři</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/kontakt" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <ChevronRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  <span className="group-hover:font-medium">Kontakt</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/pocasi" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <ChevronRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  <span className="group-hover:font-medium">Počasí</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <h3 className="font-poppins font-bold text-xl mb-4 text-white">Naše služby</h3>
            <ul className="space-y-2.5">
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/snowkiting-kurzy" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <Wind className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="group-hover:font-medium">Snowkiting Kurzy</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/pujcovna" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <Bike className="h-4 w-4 mr-2 text-orange-400" />
                  <span className="group-hover:font-medium">Půjčovna Motocyklů</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/komari-vizka" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <Mountain className="h-4 w-4 mr-2 text-green-400" />
                  <span className="group-hover:font-medium">Lyžařský areál</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/skoly" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <School className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="group-hover:font-medium">Pro školy</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/firmy" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <Briefcase className="h-4 w-4 mr-2 text-purple-400" />
                  <span className="group-hover:font-medium">Pro firmy</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/ubytovani" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <Bed className="h-4 w-4 mr-2 text-yellow-400" />
                  <span className="group-hover:font-medium">Ubytování</span>
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-2">
                <Link to="/airbag" className="group text-white/80 hover:text-tjk-orange transition-colors flex items-center font-inter">
                  <Shield className="h-4 w-4 mr-2 text-red-400" />
                  <span className="group-hover:font-medium">AIRBAG</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Aktuální počasí - dynamický widget */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <h3 className="font-poppins font-bold text-xl mb-4 text-white">Aktuální počasí</h3>
            <div className="bg-gradient-to-br from-white/10 to-white/5 p-5 rounded-xl shadow-inner border border-white/10">
              <WeatherWidget />
              <div className="text-xs text-white/70 mt-3 font-inter">Data: Open-Meteo, aktualizace každých 15 min</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-8 text-center">
          <p className="text-white/80 font-inter mb-3">© {currentYear} Tělovýchovná jednota Krupka z.s. Všechna práva vyhrazena.</p>
          <div className="mt-4 text-sm flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/zasady-ochrany-osobnich-udaju" className="text-white/70 hover:text-tjk-orange transition-colors font-inter hover:underline underline-offset-4">Zásady ochrany osobních údajů</Link>
            <Link to="/podminky-pouziti" className="text-white/70 hover:text-tjk-orange transition-colors font-inter hover:underline underline-offset-4">Podmínky použití</Link>
            <Link to="/cookies" className="text-white/70 hover:text-tjk-orange transition-colors font-inter hover:underline underline-offset-4">Cookies</Link>
            <Link to="/pristupnost" className="text-white/70 hover:text-tjk-orange transition-colors font-inter hover:underline underline-offset-4">Přístupnost</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
