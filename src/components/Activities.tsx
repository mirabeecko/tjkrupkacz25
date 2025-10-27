
import React from "react";
import { Link } from "react-router-dom";
import { Mountain, UtensilsCrossed, Building, ArrowRight, Bike, Dumbbell, Compass } from "lucide-react";

const Activities: React.FC = () => {
  return (
    <section id="o-nas" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-tjk-blue mb-4">
            Co děláme
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tělovýchovná jednota Krupka nabízí širokou škálu aktivit pro všechny věkové kategorie.
            Od sportovních zážitků, přes gastronomii až po ubytování.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Activity 1 */}
          <div className="bg-gradient-to-b from-white to-blue-50 border border-gray-100 p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-blue-50 inline-flex p-5 rounded-full mb-6">
              <Mountain className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="font-montserrat font-bold text-xl mb-3 text-tjk-blue">
              Sporty
            </h3>
            <p className="text-gray-600 mb-6">
              Objevte naše aktivity v krásném prostředí Krušných hor. Inline bruslení, kiting, trailový bike park a mnoho dalšího.
            </p>
            <Link 
              to="/sporty" 
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors group"
            >
              Objevte naše aktivity 
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Inline</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Trail park</span>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Kiting</span>
            </div>
          </div>

          {/* Activity 2 */}
          <div className="bg-gradient-to-b from-white to-amber-50 border border-gray-100 p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-amber-50 inline-flex p-5 rounded-full mb-6">
              <UtensilsCrossed className="h-10 w-10 text-amber-600" />
            </div>
            <h3 className="font-montserrat font-bold text-xl mb-3 text-tjk-blue">
              Služby
            </h3>
            <p className="text-gray-600 mb-6">
              Nabízíme kvalitní gastronomii, půjčovnu sportovního vybavení a profesionální instruktory pro vaše sportovní aktivity.
            </p>
            <Link 
              to="/sluzby" 
              className="inline-flex items-center text-amber-600 font-medium hover:text-amber-800 transition-colors group"
            >
              Prohlédněte nabídku
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Bistro</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Půjčovna</span>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Instruktoři</span>
            </div>
          </div>

          {/* Activity 3 */}
          <div className="bg-gradient-to-b from-white to-green-50 border border-gray-100 p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-green-50 inline-flex p-5 rounded-full mb-6">
              <Building className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="font-montserrat font-bold text-xl mb-3 text-tjk-blue">
              Ubytování & Bistro
            </h3>
            <p className="text-gray-600 mb-6">
              Komfortní ubytování s výhledem na Krušné hory a bistro s domácí kuchyní pro dokonalý zážitek z vašeho pobytu.
            </p>
            <Link 
              to="/komari-vizka" 
              className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors group"
            >
              Rezervujte pobyt
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Pokoje</span>
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">Apartmány</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Restaurace</span>
            </div>
          </div>
        </div>
        
        {/* Featured Categories */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-10">Oblíbené kategorie sportů</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <Link to="/sporty" className="flex flex-col items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Bike className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-center">Cyklistika</span>
            </Link>
            
            <Link to="/sporty" className="flex flex-col items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="bg-amber-100 p-3 rounded-full mb-3">
                <Compass className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-center">Outdoor</span>
            </Link>
            
            <Link to="/sporty" className="flex flex-col items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <Dumbbell className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-center">Fitness</span>
            </Link>
            
            <Link to="/sporty" className="flex flex-col items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <Mountain className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-center">Turistika</span>
            </Link>
            
            <Link to="/sporty" className="flex flex-col items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="bg-red-100 p-3 rounded-full mb-3">
                <UtensilsCrossed className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-center">Zimní sporty</span>
            </Link>
            
            <Link to="/sporty" className="flex flex-col items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="bg-cyan-100 p-3 rounded-full mb-3">
                <Building className="h-6 w-6 text-cyan-600" />
              </div>
              <span className="text-sm font-medium text-center">Ubytování</span>
            </Link>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="md:flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Připojte se k naší sportovní komunitě</h3>
                <p className="text-white/80 mb-6 md:mb-0 max-w-2xl">Objevte sportovní aktivity, akce a události. Přihlaste se do našeho newsletteru nebo nás sledujte na sociálních sítích.</p>
              </div>
              <div className="flex gap-3">
                <Link 
                  to="/dobrovolnici" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Přidat se
                </Link>
                <Link 
                  to="/kontakt" 
                  className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
