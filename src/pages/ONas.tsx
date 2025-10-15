import React from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mountain, Bike, Snowflake, Users, Activity, Hotel, Home, Shield, Heart, GraduationCap, Building2, Footprints, Wind, Baby } from "lucide-react";

const facilities = [
  {
    name: "Sportovní areál",
    icon: <Mountain className="w-8 h-8 text-tjk-blue" />,
    desc: "Komplexní zázemí pro zimní i letní sporty v srdci Krušných hor."
  },
  {
    name: "Ubytování",
    icon: <Hotel className="w-8 h-8 text-green-600" />,
    desc: "Kapacitní ubytovací zařízení pro sportovní soustředění, školy i rodinné pobyty."
  },
  {
    name: "AIRBAG matrace",
    icon: <Shield className="w-8 h-8 text-orange-600" />,
    desc: "Bezpečný trénink triků a akrobatických prvků na profesionální nafukovací matraci."
  },
  {
    name: "Práce s dětmi",
    icon: <Baby className="w-8 h-8 text-pink-600" />,
    desc: "Sportovní kroužky, tábory a systematická výchova mladých sportovců."
  }
];

const values = [
  {
    title: "50 let tradice",
    icon: <Building2 className="w-8 h-8 text-amber-600" />,
    desc: "Spojujeme generace sportovců od roku 1974."
  },
  {
    title: "Široký záběr",
    icon: <Activity className="w-8 h-8 text-tjk-blue" />,
    desc: "Od zimních sportů přes MTB až po stolní tenis a kitesurfing."
  },
  {
    title: "Moderní zázemí",
    icon: <Home className="w-8 h-8 text-green-600" />,
    desc: "Investujeme do vybavení a infrastruktury pro maximální pohodlí."
  },
  {
    title: "Komunita",
    icon: <Heart className="w-8 h-8 text-red-600" />,
    desc: "Rodina sportovců všech věkových kategorií a dovedností."
  }
];

const ONas = () => {
  return (
    <PageLayout title="O nás" description="Tělovýchovná jednota Krupka z.s. – 50 let tradice, sportu a práce s mládeží v Krušných horách.">
      {/* Hero sekce */}
      <section className="relative bg-gradient-to-br from-tjk-blue via-blue-600 to-blue-800 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl mb-6 drop-shadow-lg">
            Tělovýchovná jednota Krupka z.s.
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-semibold">
            50 let tradice sportu v Krušných horách
          </p>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Od roku 1974 budujeme sportovní komunitu, provozujeme moderní areál a věnujeme se systematické práci s dětmi a mládeží. Jsme domovem pro širokou škálu sportů – od zimních aktivit až po adrenalinové disciplíny.
          </p>
        </div>
      </section>

      {/* Co nabízíme */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-tjk-blue mb-12 text-center">
            Co nabízíme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility) => (
              <Card key={facility.name} className="border-2 hover:border-tjk-blue transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl">
                      {facility.icon}
                    </div>
                    <CardTitle className="text-2xl text-tjk-blue">{facility.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-gray-700 leading-relaxed">
                    {facility.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Naše hodnoty */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-tjk-blue mb-12 text-center">
            Proč právě my
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-full">
                    {value.icon}
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-tjk-blue">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historie */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-tjk-blue mb-8 text-center">
            Naše historie
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              <strong>Tělovýchovná jednota Krupka z.s.</strong> byla založena v roce 1974 s cílem rozvíjet sport a tělesnou kulturu v regionu Krušných hor. Od samého začátku jsme kladli důraz na práci s mládeží, budování sportovní komunity a vytváření kvalitního zázemí pro širokou škálu sportovních aktivit.
            </p>
            <p>
              Během pěti dekád naší existence jsme prošli výraznou transformací – od malého sportovního klubu až po moderní spolek s <strong>provozem komplexního sportovního areálu</strong>. Investovali jsme do infrastruktury, ubytovacích kapacit a špičkového vybavení, včetně profesionální <strong>AIRBAG matrace</strong> pro bezpečný trénink akrobatických prvků a triků.
            </p>
            <p>
              Naše práce s <strong>dětmi a mládeží</strong> je pro nás prioritou. Provozujeme sportovní kroužky, pořádáme letní tábory a soustředění, systematicky podporujeme mladé talenty a pomáháme jim rozvíjet nejen sportovní dovednosti, ale i charakterové vlastnosti – týmového ducha, disciplínu, vytrvalost a fair play.
            </p>
            <p>
              Dnes nabízíme <strong>široký rozsah sportovních aktivit</strong> – od tradičních disciplín jako stolní tenis, přes zimní sporty (lyžování, snowboarding), horskou cyklistiku (MTB), až po adrenalinové sporty jako kitesurfing. Naše ubytovací kapacity využívají sportovní týmy, školy i rodiny, které hledají aktivní dovolenou v přírodě.
            </p>
            <p>
              <strong>50 let tradice</strong> nás zavazuje nejen k uchování hodnot minulých generací, ale i k neustálému rozvoji a modernizaci. Jsme hrdí na to, že spojujeme generace sportovců a vytváříme prostředí, kde může každý najít svou cestu ke sportu a zdravému životnímu stylu.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-tjk-blue to-blue-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
            Připojte se k nám
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Ať už hledáte sportovní vyžití pro sebe nebo své děti, plánujete soustředění nebo ubytování v krásném prostředí Krušných hor – jsme tu pro vás.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-tjk-blue hover:bg-blue-50 font-bold text-lg px-8 py-6 rounded-xl shadow-lg" asChild>
              <a href="/kontakt">Kontaktujte nás</a>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-xl" asChild>
              <a href="/ubytovani">Ubytování</a>
            </Button>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default ONas;
