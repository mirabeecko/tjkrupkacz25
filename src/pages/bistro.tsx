import React from "react";
import PageLayout from "@/components/PageLayout";
import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export const meta = {
  title: "Bistro | Komáří Vížka",
  description:
    "Stylové bistro s domácí kuchyní, občerstvením a posezením na terase v areálu Komáří Vížka. Ideální místo pro relax po sportu.",
  keywords:
    "bistro, občerstvení, Komáří Vížka, sportovní areál, domácí kuchyně, terasa, restaurace, Krušné hory, kavárna, relax, jídlo a pití",
};

const Bistro = () => (
  <PageLayout
    title="Bistro Komáří Vížka"
    description="Stylové bistro s domácí kuchyní, občerstvením a posezením na terase. Ideální místo pro relax po sportu."
  >
    {/* Hero sekce s hlavní fotografií - full width */}
    <div className="relative -mx-4 md:-mx-12 mb-16">
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/85 via-orange-800/75 to-orange-600/65 z-10" />
        <div className="relative z-20 text-center text-white px-6 md:px-12 max-w-4xl animate-[fadeInUp_1s_ease-out]">
          <Coffee className="w-20 h-20 mx-auto mb-6 drop-shadow-2xl animate-[bounce_2s_ease-in-out_infinite]" />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl tracking-tight text-shadow-lg">
            Bistro Komáří Vížka
          </h1>
          <p className="text-2xl md:text-3xl font-medium drop-shadow-2xl leading-relaxed">
            Domácí kuchyně, výběrová káva a terasa s výhledem na hory
          </p>
        </div>
      </section>
    </div>

    {/* Hlavní sekce s obsahem */}
    <section className="mb-16 grid md:grid-cols-2 gap-12 items-start animate-fade-in-up">
      {/* Levý sloupec - text a informace */}
      <div>
        <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-orange-900 flex items-center gap-3">
            <span className="inline-block bg-orange-100 rounded-full p-3">
              <Coffee className="w-8 h-8 text-orange-600" />
            </span>
            Občerstvení a relax v srdci areálu
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Naše bistro nabízí domácí kuchyni, výběrovou kávu, čerstvé dezerty a široký výběr nápojů. Vychutnejte si snídani, oběd nebo odpolední kávu na slunné terase s výhledem na Krušné hory. Vše připravujeme z kvalitních surovin a s láskou k poctivému jídlu.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-orange-800 font-semibold shadow-sm">
              <Coffee className="w-5 h-5" /> Domácí kuchyně
            </span>
            <span className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-orange-800 font-semibold shadow-sm">
              <Coffee className="w-5 h-5" /> Výběrová káva
            </span>
            <span className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-orange-800 font-semibold shadow-sm">
              <Coffee className="w-5 h-5" /> Terasa s výhledem
            </span>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-orange-900">Co nabízíme</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Domácí kuchyně a denní menu</strong> – zdravé a chutné jídlo</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Výběrová káva a domácí dezerty</strong> – skvělá káva od místních pražíren</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Letní terasa s výhledem</strong> – relaxace v přírodě</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Občerstvení pro sportovce i rodiny</strong> – něco pro každého</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Možnost pořádání oslav a akcí</strong> – firemní i soukromé akce</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-2xl p-8 shadow-xl mb-8">
          <h3 className="text-2xl font-bold mb-4">Proč navštívit naše bistro?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <span>Příjemné prostředí a milá obsluha</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <span>Čerstvé a kvalitní suroviny od regionálních dodavatelů</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <span>Možnost rezervace pro skupiny a firemní akce</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <span>Speciální nabídky pro oslavy a večírky</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/kontakt" className="flex-1">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
              Rezervovat stůl
            </button>
          </Link>
        </div>
      </div>

      {/* Pravý sloupec - fotografie */}
      <div className="space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
            alt="Interiér bistra"
            className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in-up delay-100">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80"
              alt="Káva a dezerty"
              className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in-up delay-150">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80"
              alt="Jídlo z bistra"
              className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in-up delay-200">
          <img
            src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80"
            alt="Terasa bistra"
            className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>

    {/* Banner s referencí - full width */}
    <div className="relative -mx-4 md:-mx-12 mb-16">
      <section className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 py-16 md:py-20 text-center shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-center mb-6">
            <Coffee className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
          <blockquote className="italic text-2xl md:text-3xl text-white mb-6 font-medium max-w-4xl mx-auto drop-shadow-lg leading-relaxed">
            "Výborné jídlo, skvělá káva a krásné posezení na terase s výhledem na hory. Obsluha byla milá a prostředí útulné. Určitě se vrátíme!"
          </blockquote>
          <div className="text-orange-100 font-bold text-xl">Pavla a Martin, pravidelní hosté, 2025</div>
        </div>
      </section>
    </div>
  </PageLayout>
);

export default Bistro;
