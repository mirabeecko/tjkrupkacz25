import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import ScrollToTop from "@/components/ScrollToTop";

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
import Skoly from "./pages/skoly";
import Firmy from "./pages/firmy";
import Ubytovani from "./pages/Ubytovani";
import Trailpark from "./pages/trailpark";
import Pripravujeme from "./pages/Pripravujeme";
import SnowkitingKurzy from "./pages/SnowkitingKurzy";

// FEATURE FLAG: Půjčovna imports - pro obnovení odkomentuj následující řádky a změň ENABLE_PUJCOVNA na true v src/config/features.ts
// import Pujcovna from "./pages/Pujcovna";
// import KontaktPujcovna from "./pages/KontaktPujcovna";
// import VehicleDetail from "./pages/VehicleDetail";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Cookies from "./pages/cookies";
import Accessibility from "./pages/Accessibility";
import KontaktSnowkiting from "./pages/KontaktSnowkiting";
import Airbag from "./pages/Airbag";
import Eshop from "./pages/Eshop";
import Kosik from "./pages/Kosik";
import Pokladna from "./pages/Pokladna";
import PlatbaUspech from "./pages/PlatbaUspech";
import PlatbaZruseno from "./pages/PlatbaZruseno";
import AktivityProDeti from "./pages/AktivityProDeti";
import AkteriDetail from "./pages/AkteriDetail";

import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
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
              <Route path="/pripravujeme" element={<Pripravujeme />} />
              <Route path="/snowkiting-kurzy" element={<SnowkitingKurzy />} />

              {/* PŮJČOVNA SKRYTA - pro obnovení odkomentuj následující řádky */}
              {/* <Route path="/pujcovna" element={<Pujcovna />} /> */}
              {/* <Route path="/vozidlo/:id" element={<VehicleDetail />} /> */}
              {/* <Route path="/kontakt-pujcovna" element={<KontaktPujcovna />} /> */}

              <Route
                path="/zasady-ochrany-osobnich-udaju"
                element={<PrivacyPolicy />}
              />
              <Route path="/podminky-pouziti" element={<TermsOfService />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/pristupnost" element={<Accessibility />} />
              <Route path="/kontakt-snowkiting" element={<KontaktSnowkiting />} />
              <Route path="/airbag" element={<Airbag />} />
              <Route path="/eshop" element={<Eshop />} />
              <Route path="/kosik" element={<Kosik />} />
              <Route path="/pokladna" element={<Pokladna />} />
              <Route path="/platba/uspech" element={<PlatbaUspech />} />
              <Route path="/platba/zruseno" element={<PlatbaZruseno />} />
              <Route path="/aktivity-pro-deti" element={<AktivityProDeti />} />
              <Route path="/akteri/:name" element={<AkteriDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
