import React, { useEffect, useState } from "react";
import { CalendarCheck, Phone, X } from "lucide-react";
import { CONTACT, appLink } from "@/config/site";

/**
 * Sticky prodejní lišta pro mobil (webaudit bod B12).
 *
 * Na mobilu dnes neexistuje trvale dostupná cesta k rezervaci ani k telefonu.
 * Lišta se objeví po odskrolování hero a dá se zavřít.
 */
const StickyCta: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-tjk-blue/95 backdrop-blur-sm shadow-2xl">
      <div className="flex items-stretch">
        <a
          href={appLink("sticky-mobil")}
          className="flex-1 flex items-center justify-center gap-2 bg-tjk-orange text-white font-poppins font-bold py-3.5"
        >
          <CalendarCheck className="h-5 w-5" />
          Rezervovat
        </a>
        <a
          href={`tel:${CONTACT.phoneSnowkiting.tel}`}
          className="flex-1 flex items-center justify-center gap-2 text-white font-poppins font-semibold py-3.5 border-l border-white/15"
        >
          <Phone className="h-5 w-5" />
          Zavolat
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Skrýt lištu"
          className="px-3 text-white/60 hover:text-white border-l border-white/15"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default StickyCta;
