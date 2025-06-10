import React from "react";
import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { School, Briefcase, Bed, Bike, Coffee } from "lucide-react";
import Hero from "@/components/Hero";

// SEO meta description a klíčová slova
export const meta = {
  title: "Služby | Komáří Vížka Trailpark",
  description:
    "Objevte kompletní nabídku služeb v Trailparku Komáří Vížka: programy pro školy, firemní akce, ubytování, trailpark a bistro. Zážitky pro každého!",
  keywords:
    "trailpark, služby, školy, firemní akce, ubytování, bistro, cyklistika, Komáří Vížka, zážitky, sportovní areál, programy pro školy, firemní teambuilding, restaurace, bikepark, příroda, Krušné hory",
};

const categories = [
  {
    title: "Pro školy",
    description:
      "Speciální programy pro školy a dětské kolektivy. Zábava, pohyb a vzdělávání v přírodě pod vedením zkušených instruktorů.",
    icon: <School className="w-10 h-10 text-blue-600" />,
    cta: "Více pro školy",
    link: "/skoly",
    image: "/images/sluzby_skoly.jpg",
  },
  {
    title: "Pro firmy",
    description:
      "Firemní akce, teambuildingy a zážitkové programy na míru. Posilujte týmového ducha v inspirativním prostředí hor.",
    icon: <Briefcase className="w-10 h-10 text-green-600" />,
    cta: "Firemní nabídka",
    link: "/firmy",
    image: "/images/sluzby_firmy.jpg",
  },
  {
    title: "Ubytování",
    description:
      "Komfortní ubytování přímo v areálu i v okolí. Ideální zázemí pro sportovce, rodiny i skupiny.",
    icon: <Bed className="w-10 h-10 text-yellow-600" />,
    cta: "Zjistit více o ubytování",
    link: "/ubytovani",
    image: "/images/sluzby_ubytovani.jpg",
  },
  {
    title: "TrailPark Komárka",
    description:
      "Moderní trailpark pro všechny úrovně jezdců. Flow traily, technické pasáže i zábava pro děti.",
    icon: <Bike className="w-10 h-10 text-red-600" />,
    cta: "Prozkoumat TrailPark",
    link: "/trailpark",
    image: "/images/sluzby_trailpark.jpg",
  },
  {
    title: "Bistro",
    description:
      "Stylové bistro s domácí kuchyní, občerstvením a posezením na terase. Ideální místo pro relax po sportu.",
    icon: <Coffee className="w-10 h-10 text-pink-600" />,
    cta: "Menu a nabídka bistra",
    link: "/bistro",
    image: "/images/sluzby_bistro.jpg",
  },
];

// --- Vylepšený hlavní banner s Hero komponentou a fallback obrázkem ---
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Activities from "@/components/Activities";
import ArealStats from "@/components/ArealStats";
import WeatherSection from "@/components/WeatherSection";
import NewsletterSignup from "@/components/NewsletterSignup";

const Sluzby = () => {
  return (
    <PageLayout
      title="Služby areálu Komáří Vížka"
      description="Kompletní nabídka služeb pro školy, firmy, sportovce i rodiny. Užijte si zážitky v přírodě, kvalitní zázemí a moderní trailpark."
    >
      <Hero />

      {/* --- Úvodní popis s Activities a ArealStats --- */}


      {/* --- Kategorie služeb s Card komponentou a stylistikou --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-24 animate-fade-in-up">
        {categories.map((cat, idx) => (
          <Card
            key={cat.title}
            className="bg-white rounded-3xl shadow-xl flex flex-col items-center p-10 text-center hover:shadow-2xl transition-shadow border-2 border-blue-50 relative group overflow-hidden animate-fade-in-up delay-100"
          >
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="mb-4 text-5xl">{cat.icon}</div>
                <img
                  src={
                    cat.image ||
                    "/lovable-uploads/c2b3b5df-f5a4-42d2-816a-3f11bd43a404.png"
                  }
                  alt={cat.title}
                  className="w-full h-44 object-cover rounded-xl mb-6 border-2 border-blue-100 shadow-md"
                  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                />
              </div>
              <CardTitle className="text-2xl font-bold mb-3 text-blue-900 flex items-center gap-2 justify-center">
                {cat.icon} {cat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 min-h-[60px] font-serif italic">
                {cat.description}
              </p>
              {/* Rozšířený popis pro každou kategorii */}
              {idx === 0 && (
                <p className="text-blue-700 text-sm mb-2">
                  Vzdělávací programy, sportovní dny, adaptační kurzy a zážitky v
                  přírodě pro školy všech stupňů.
                </p>
              )}
              {idx === 1 && (
                <p className="text-green-700 text-sm mb-2">
                  Teambuilding, firemní večírky, workshopy a akce na míru v
                  inspirativním prostředí hor.
                </p>
              )}
              {idx === 2 && (
                <p className="text-yellow-700 text-sm mb-2">
                  Pokoje, apartmány i chaty. Komfortní zázemí pro sportovce,
                  rodiny i skupiny s možností stravování.
                </p>
              )}
              {idx === 3 && (
                <p className="text-red-700 text-sm mb-2">
                  Flow traily, technické sekce, dětské trasy a půjčovna kol.
                  Zábava a bezpečí pro všechny věkové kategorie.
                </p>
              )}
              {idx === 4 && (
                <p className="text-pink-700 text-sm mb-2">
                  Domácí kuchyně, výběrová káva, dezerty a terasa s výhledem na
                  hory. Otevřeno pro všechny návštěvníky.
                </p>
              )}
              <Link to={cat.link} className="mt-auto">
                <button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg text-lg transition-colors mt-4 animate-fade-in-up delay-200">
                  {cat.cta}
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* --- Newsletter a další interaktivní sekce --- */}
      <section className="max-w-3xl mx-auto mb-24 animate-fade-in-up">
        <NewsletterSignup />
      </section>
    </PageLayout>
  );
};

export default Sluzby;
