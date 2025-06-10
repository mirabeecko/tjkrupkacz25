import React from "react";

import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Bed, Users, Hammer, Mountain, Leaf, Tent, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Ubytovani = () => {
  return (
    <PageLayout
      title="Ubytování – Komáří vížka"
      description="Penzion a glamping v srdci Krušných hor. Komfortní pokoje, příroda, klid a zážitky."
      backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    >
      <section className="mb-12">
        <div className="prose max-w-none mb-8">
          <h2 className="text-3xl font-bold text-tjk-blue mb-4">Ubytování v srdci Krušných hor</h2>
          <p>
            Komáří vížka je jedinečné místo na hřebenech Krušných hor, kde se snoubí klid horské krajiny, čistý vzduch a dechberoucí výhledy na okolní lesy, louky a údolí. 
            Okolí nabízí nespočet možností pro pěší turistiku, cyklistiku, běžky i relaxaci v přírodě. 
            V blízkosti najdete rozhledny, historické památky i přírodní zajímavosti.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-r from-tjk-blue to-blue-700 text-white rounded-t-xl">
              <Bed className="h-8 w-8" />
              <CardTitle>Penzion Komáří vížka</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="mb-4 space-y-2 text-gray-700">
                <li className="flex items-center">
                  <Users className="h-5 w-5 text-tjk-blue mr-2" />
                  <span>14 pokojů, kapacita až 40 osob</span>
                </li>
                <li className="flex items-center">
                  <Hammer className="h-5 w-5 text-amber-600 mr-2" />
                  <span>Právě probíhá kompletní rekonstrukce – těšte se na moderní komfort!</span>
                </li>
                <li className="flex items-center">
                  <Mountain className="h-5 w-5 text-green-700 mr-2" />
                  <span>Výhledy na hřebeny Krušných hor</span>
                </li>
                <li className="flex items-center">
                  <Leaf className="h-5 w-5 text-green-500 mr-2" />
                  <span>Okolní příroda, lesy a louky přímo za okny</span>
                </li>
              </ul>
              <div className="mb-4 text-gray-600">
                <strong>Otevíráme již brzy!</strong> Sledujte naše stránky pro aktuální informace o zahájení provozu a možnostech rezervace.
              </div>
              <Button asChild className="bg-tjk-blue hover:bg-tjk-blue/90 text-white font-semibold px-6 py-2 rounded-md">
                <Link to="/kontakt">
                  Mám zájem o ubytování <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-xl">
              <Tent className="h-8 w-8" />
              <CardTitle>Glamping & přírodní zážitky</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="mb-4 space-y-2 text-gray-700">
                <li className="flex items-center">
                  <Tent className="h-5 w-5 text-amber-500 mr-2" />
                  <span>Stylové ubytování v přírodě – připravujeme glampingové stany a jurty</span>
                </li>
                <li className="flex items-center">
                  <Leaf className="h-5 w-5 text-green-500 mr-2" />
                  <span>Soukromí, klid a kontakt s přírodou</span>
                </li>
                <li className="flex items-center">
                  <Mountain className="h-5 w-5 text-tjk-blue mr-2" />
                  <span>Východy a západy slunce přímo z vašeho lůžka</span>
                </li>
              </ul>
              <div className="mb-4 text-gray-600">
                <strong>Glamping bude spuštěn v roce 2025.</strong> Sledujte novinky a rezervujte si svůj zážitek včas!
              </div>
              <Button asChild className="bg-amber-500 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-md">
                <Link to="/kontakt">
                  Chci glamping <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="mb-12">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
            alt="Krajina Krušných hor"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="prose max-w-none mt-8">
          <h3 className="text-xl font-bold text-tjk-blue">Krajina a okolí</h3>
          <p>
            Komáří vížka je ideálním výchozím bodem pro objevování krás Krušných hor. 
            V okolí najdete husté lesy, rozkvetlé louky, horské potoky i malebné vesničky. 
            V létě si užijete turistiku, cyklistiku, v zimě běžky a lyžování. 
            Okolí je protkáno sítí značených tras a nabízí klid i dobrodružství pro rodiny, páry i skupiny přátel.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Ubytovani;