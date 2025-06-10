import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, UserPlus, ArrowRight, ChevronRight, Mountain, Home, Book, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import WeatherWidget from "@/components/WeatherWidget";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-tjk-blue to-blue-900 text-white py-12">
      <div className="container px-4 mx-auto">
        {/* Join Us - Highlighted CTA Section */}
        <div className="mb-12 py-10 px-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Přidej se k nám</h2>
              <p className="text-white/80 max-w-xl">
                Staň se součástí komunity nadšenců, kteří milují hory a sport. Pomoz nám budovat 
                a udržovat traily, zlepšovat služby a vytvářet společně místo, kam se budeš rád vracet.
              </p>
              <div className="mt-6 space-x-3 flex flex-wrap gap-3">
                <Link to="/dobrovolnici" className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-300">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Jak se přidat
                </Link>
                <Link to="/o-nas" className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-300">
                  <Mountain className="mr-2 h-4 w-4" />
                  O naší komunitě
                </Link>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link to="/dobrovolnici">
                <Button size="lg" className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Přidej se k týmu
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Popular Links */}
        <div className="mb-10 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
          <Link to="/trailpark" className="group bg-gradient-to-br from-blue-800/80 to-blue-600/80 hover:from-blue-700 hover:to-blue-500 backdrop-blur-md rounded-xl p-4 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:scale-105">
            <Mountain className="h-8 w-8 mb-2 text-amber-400 group-hover:text-white transition-colors drop-shadow-lg" />
            <h3 className="font-bold text-base mb-0.5 tracking-wide text-white group-hover:text-amber-300 transition-colors">TPK</h3>
          </Link>
          <Link to="/sluzby" className="group bg-gradient-to-br from-yellow-700/80 to-yellow-500/80 hover:from-yellow-600 hover:to-yellow-400 backdrop-blur-md rounded-xl p-4 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:scale-105">
            <Home className="h-8 w-8 mb-2 text-white group-hover:text-yellow-300 transition-colors drop-shadow-lg" />
            <h3 className="font-bold text-base mb-0.5 tracking-wide text-white group-hover:text-yellow-200 transition-colors">Ubytování</h3>
          </Link>
          <Link to="/sluzby" className="group bg-gradient-to-br from-blue-600/80 to-blue-400/80 hover:from-blue-700 hover:to-blue-500 backdrop-blur-md rounded-xl p-4 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:scale-105">
            <Book className="h-8 w-8 mb-2 text-white group-hover:text-blue-200 transition-colors drop-shadow-lg" />
            <h3 className="font-bold text-base mb-0.5 tracking-wide text-white group-hover:text-blue-200 transition-colors">Pro školy</h3>
          </Link>
          <Link to="/firmy" className="group bg-gradient-to-br from-green-700/80 to-green-500/80 hover:from-green-800 hover:to-green-400 backdrop-blur-md rounded-xl p-4 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:scale-105">
            <ShoppingBag className="h-8 w-8 mb-2 text-white group-hover:text-green-200 transition-colors drop-shadow-lg" />
            <h3 className="font-bold text-base mb-0.5 tracking-wide text-white group-hover:text-green-200 transition-colors">Pro firmy</h3>
          </Link>
          <Link to="/dobrovolnici" className="group bg-gradient-to-br from-pink-600/80 to-pink-400/80 hover:from-pink-700 hover:to-pink-300 backdrop-blur-md rounded-xl p-4 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:scale-105">
            <UserPlus className="h-8 w-8 mb-2 text-white group-hover:text-pink-100 transition-colors drop-shadow-lg" />
            <h3 className="font-bold text-base mb-0.5 tracking-wide text-white group-hover:text-pink-100 transition-colors">Partneři</h3>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-4">Tělovýchovná jednota Krupka z.s.</h3>
            <p className="text-gray-300 mb-4">
              IČO: 46070516<br />
              Tělovýchovná jednota Krupka
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white hover:text-tjk-orange transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white hover:text-tjk-orange transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white hover:text-tjk-orange transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full" aria-label="Youtube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-4">Rychlé menu</h3>
            <ul className="space-y-2">
              <li className="transition-transform hover:translate-x-1">
                <Link to="/o-nas" className="text-gray-300 hover:text-tjk-orange transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> O nás
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-1">
                <Link to="/sluzby" className="text-gray-300 hover:text-tjk-orange transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Služby
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-1">
                <Link to="/komari-vizka" className="text-gray-300 hover:text-tjk-orange transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Komáří vížka
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-1">
                <Link to="/trail-park-komarka" className="text-gray-300 hover:text-tjk-orange transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Trail Park Komárka
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-1">
                <Link to="/dobrovolnici" className="text-gray-300 hover:text-tjk-orange transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Dobrovolníci
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Aktuální počasí - dynamický widget */}
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-4">Aktuální počasí</h3>
            <div className="bg-white/10 p-4 rounded-xl shadow-inner">
              <WeatherWidget />
              <div className="text-xs text-gray-300 mt-2">Data: Open-Meteo, aktualizace každých 15 min</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400">
          <p>© {currentYear} Tělovýchovná jednota Krupka z.s. Všechna práva vyhrazena.</p>
          <div className="mt-2 text-sm flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link to="/gdpr" className="hover:text-tjk-orange transition-colors">Zásady ochrany osobních údajů</Link>
            <Link to="/podminky" className="hover:text-tjk-orange transition-colors">Podmínky použití</Link>
            <Link to="/cookies" className="hover:text-tjk-orange transition-colors">Cookies</Link>
            <Link to="/pristupnost" className="hover:text-tjk-orange transition-colors">Přístupnost</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
