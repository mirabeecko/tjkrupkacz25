import React from "react";
import PageLayout from "@/components/PageLayout";
import { School } from "lucide-react";
import { Link } from "react-router-dom";

export const meta = {
  title: "Programy pro školy | Komáří Vížka",
  description:
    "Zážitkové programy pro školy v areálu Komáří Vížka. Vzdělávání, pohyb a zábava v přírodě pod vedením zkušených instruktorů.",
  keywords:
    "programy pro školy, školní výlety, outdoor vzdělávání, sportovní kurzy, Komáří Vížka, sportovní areál, dětské kolektivy, školní akce, Krušné hory, zážitková pedagogika",
};

const Skoly = () => (
  <PageLayout
    title="Programy pro školy"
    description="Zážitkové vzdělávání, pohyb a dobrodružství v přírodě pro školní kolektivy."
  >
    {/* Hero sekce s hlavní fotografií - full width */}
    <div className="relative -mx-4 md:-mx-12 mb-16">
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/75 to-blue-600/65 z-10" />
        <div className="relative z-20 text-center text-white px-6 md:px-12 max-w-4xl animate-[fadeInUp_1s_ease-out]">
          <img src="/src/loga/komárek.png" alt="Logo Komárek" className="w-40 h-40 mx-auto mb-6 drop-shadow-2xl" />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl tracking-tight text-shadow-lg">
            Programy pro školy
          </h1>
          <p className="text-2xl md:text-3xl font-medium drop-shadow-2xl leading-relaxed">
            Zážitkové vzdělávání a pohyb v přírodě Krušných hor
          </p>
        </div>
      </section>
    </div>

    {/* Hlavní sekce s obsahem */}
    <section className="mb-16 grid md:grid-cols-2 gap-12 items-start animate-fade-in-up">
      {/* Levý sloupec - text a informace */}
      <div>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center gap-3">
            <span className="inline-block bg-blue-100 rounded-full p-3">
              <School className="w-8 h-8 text-blue-600" />
            </span>
            Zážitkové vzdělávání v přírodě
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Nabízíme komplexní programy pro školy a dětské kolektivy zaměřené na pohyb, spolupráci a poznávání přírody. Naše aktivity rozvíjejí týmového ducha, podporují zdravý životní styl a přinášejí radost z pohybu na čerstvém vzduchu.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-800 font-semibold shadow-sm">
              <School className="w-5 h-5" /> Školní výlety
            </span>
            <span className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-800 font-semibold shadow-sm">
              <School className="w-5 h-5" /> Adaptační kurzy
            </span>
            <span className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-800 font-semibold shadow-sm">
              <School className="w-5 h-5" /> Sportovní dny
            </span>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-blue-900">Co nabízíme</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Outdoorové vzdělávací programy</strong> – poznávání přírody a ekologie</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Sportovní dny a cyklistické workshopy</strong> – aktivní pohyb a zábava</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Tematické hry a týmové aktivity</strong> – rozvoj spolupráce</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Možnost zajištění stravování a ubytování</strong> – kompletní servis</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Vedení zkušených instruktorů</strong> – bezpečnost na prvním místě</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 shadow-xl mb-8">
          <h3 className="text-2xl font-bold mb-4">Proč právě k nám?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <span>Moderní zázemí a bezpečné prostředí</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <span>Individuální přístup ke každé skupině</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <span>Možnost kombinace sportu, vzdělávání a zábavy</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <span>Krásná příroda Krušných hor</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/kontakt" className="flex-1">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
              Zarezervovat termín
            </button>
          </Link>
        </div>
      </div>

      {/* Pravý sloupec - fotografie */}
      <div className="space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
            alt="Děti na školní akci"
            className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in-up delay-100">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"
              alt="Děti v přírodě"
              className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in-up delay-150">
            <img
              src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&q=80"
              alt="Outdoor aktivity pro děti"
              className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in-up delay-200">
          <img
            src="https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=800&q=80"
            alt="Cyklistika pro děti"
            className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>

    {/* Banner s referencí - full width */}
    <div className="relative -mx-4 md:-mx-12 mb-16">
      <section className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 py-16 md:py-20 text-center shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-center mb-6">
            <School className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
          <blockquote className="italic text-2xl md:text-3xl text-white mb-6 font-medium max-w-4xl mx-auto drop-shadow-lg leading-relaxed">
            "Děti byly nadšené! Skvělý program, profesionální přístup a krásné prostředí. Program byl perfektně přizpůsobený věku žáků a všichni se skvěle bavili."
          </blockquote>
          <div className="text-blue-100 font-bold text-xl">Mgr. Jana Nováková, ZŠ Teplice, 2024</div>
        </div>
      </section>
    </div>
  </PageLayout>
);

export default Skoly;
