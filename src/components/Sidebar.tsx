
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Info, Activity, Map, Coffee, ShoppingBag, Ticket, Heart, Mail, CloudSun, X 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const menuItems = [
  { name: "O nás", icon: <Info className="h-5 w-5" />, href: "#o-nas" },
  { name: "Sporty", icon: <Activity className="h-5 w-5" />, href: "#sporty" },
  { name: "Služby", icon: <Coffee className="h-5 w-5" />, href: "#sluzby" },
  { name: "Komáří vížka", icon: <Map className="h-5 w-5" />, href: "#komari-vizka" },
  { name: "Merch", icon: <ShoppingBag className="h-5 w-5" />, href: "#merch" },
  { name: "Vstupenky", icon: <Ticket className="h-5 w-5" />, href: "#vstupenky" },
  { name: "Dobrovolníci & Sponzoři", icon: <Heart className="h-5 w-5" />, href: "#dobrovolnici" },
  { name: "Kontakt", icon: <Mail className="h-5 w-5" />, href: "#kontakt" },
  { name: "Počasí", icon: <CloudSun className="h-5 w-5" />, href: "#pocasi" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
        flex flex-col lg:translate-x-0 lg:static lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-montserrat font-bold text-lg text-tjk-blue">Menu</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden" 
            onClick={closeSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Navigation Links */}
        <nav className="sidebar-content p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-tjk-gray hover:text-tjk-blue transition-all"
                  onClick={(e) => {
                    if (window.innerWidth < 1024) {
                      closeSidebar();
                    }
                  }}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="mt-auto p-4 border-t">
          <div className="flex flex-col space-y-2">
            <Button className="bg-tjk-orange hover:bg-tjk-orange/90 text-white">
              Rezervujte si jízdenku
            </Button>
            <Button variant="outline" className="border-tjk-blue text-tjk-blue hover:bg-tjk-blue/10">
              Staňte se dobrovolníkem
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
