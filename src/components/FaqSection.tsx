import React from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/config/site";

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  id?: string;
  /** true = vykreslí se jen akordeon bez vlastní sekce a nadpisu (pro vložení do stránky). */
  embedded?: boolean;
}

/**
 * FAQ akordeon — nativní <details>, žádná JS knihovna (webaudit 4).
 * Funguje i bez JavaScriptu a dá se najít fulltextem ve vyhledávačích.
 */
const FaqSection: React.FC<FaqSectionProps> = ({
  items,
  title = "Než se zeptáte",
  subtitle = "Bezpečnost, vítr, vybavení, věk i storno — na co se nás lidé ptají nejčastěji.",
  id = "faq",
  embedded = false,
}) => {
  const accordion = (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={item.q}
          className="group bg-white rounded-2xl border border-gray-200 shadow-sm open:shadow-md transition-shadow"
          open={!embedded && i === 0}
        >
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-poppins font-semibold text-tjk-blue text-base md:text-lg">
            <span>{item.q}</span>
            <ChevronDown className="h-5 w-5 flex-shrink-0 text-tjk-orange transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-5 font-inter text-gray-700 leading-relaxed">{item.a}</div>
        </details>
      ))}
    </div>
  );

  if (embedded) return accordion;

  return (
    <section id={id} className="py-16 md:py-20 bg-tjk-light scroll-mt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="font-poppins font-black text-3xl md:text-4xl text-tjk-blue mb-3">
            {title}
          </h2>
          <p className="font-inter text-base md:text-lg text-gray-600">{subtitle}</p>
        </div>

        {accordion}
      </div>
    </section>
  );
};

export default FaqSection;
