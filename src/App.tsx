import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ONasModern from "./pages/ONas";
import Sporty from "./pages/Sporty";
import Sluzby from "./pages/Sluzby";
import KomariVizka from "./pages/KomariVizka";
import Merch from "./pages/Merch";
import Vstupenky from "./pages/Vstupenky";
import Dobrovolnici from "./pages/Dobrovolnici";
import Kontakt from "./pages/Kontakt";
import Pocasi from "./pages/Pocasi";
import NotFound from "./pages/NotFound";
import TrailParkKomarka from "./pages/TrailParkKomarka";
import TPK from "./pages/TPK";
import ScrollToTop from "@/components/ScrollToTop";
import Skoly from "./pages/skoly";
import Firmy from "./pages/firmy";
import Ubytovani from "./pages/Ubytovani";
import Trailpark from "./pages/trailpark";
import Bistro from "./pages/bistro";
import Pripravujeme from "./pages/Pripravujeme";
import SnowkitingKurzy from "./pages/SnowkitingKurzy";
import Pujcovna from "./pages/Pujcovna";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/o-nas" element={<ONasModern />} />
          <Route path="/sporty" element={<Sporty />} />
          <Route path="/sluzby" element={<Sluzby />} />
          <Route path="/komari-vizka" element={<KomariVizka />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/vstupenky" element={<Vstupenky />} />
          <Route path="/dobrovolnici" element={<Dobrovolnici />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/pocasi" element={<Pocasi />} />
          <Route path="/trail-park-komarka" element={<TrailParkKomarka />} />
          <Route path="/tpk" element={<TPK />} />
          <Route path="/skoly" element={<Skoly />} />
          <Route path="/firmy" element={<Firmy />} />
          <Route path="/ubytovani" element={<Ubytovani />} />
          <Route path="/trailpark" element={<Trailpark />} />
          <Route path="/bistro" element={<Bistro />} />
          <Route path="/pripravujeme" element={<Pripravujeme />} />
          <Route path="/snowkiting-kurzy" element={<SnowkitingKurzy />} />
          <Route path="/pujcovna" element={<Pujcovna />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
