import React from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mountain, Bike, Snowflake, Users, Activity, Table, Gamepad, Dribbble, Dumbbell, Wind, Keyboard, Medal, HeartHandshake, Leaf, Star, ArrowRight, Calendar, UserPlus, Trophy } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

// Ikony pro sporty
const sportIcons = {
  fotbal: <Trophy className="w-7 h-7 text-tjk-blue" />, // Football icon replaced with Trophy as a placeholder
  tenis: <Dribbble className="w-7 h-7 text-green-600" />,
  stolniTenis: <Table className="w-7 h-7 text-tjk-orange" />,
  sachy: <Gamepad className="w-7 h-7 text-gray-700" />,
  cyklistika: <Bike className="w-7 h-7 text-tjk-blue" />,
  atletika: <Activity className="w-7 h-7 text-yellow-600" />,
  karate: <Dumbbell className="w-7 h-7 text-red-600" />,
  turistika: <Mountain className="w-7 h-7 text-green-700" />,
  lyzari: <Snowflake className="w-7 h-7 text-blue-400" />,
  mtb: <Bike className="w-7 h-7 text-tjk-blue" />,
  zimniSporty: <Snowflake className="w-7 h-7 text-blue-600" />,
  kitesurfing: <Wind className="w-7 h-7 text-sky-500" />,
  koleckove: <Keyboard className="w-7 h-7 text-pink-500" />
};

const timeline = [
  { decade: "70. léta", sports: ["fotbal", "tenis", "stolniTenis", "sachy"], text: "Založení TJK, fotbal jako hlavní sport, rozvoj tenisu a stolního tenisu, šachy." },
  { decade: "80.–90. léta", sports: ["cyklistika", "atletika", "karate", "turistika", "lyzari"], text: "Růst členské základny, přibývají cyklisté, atleti, karatisté, turisté a lyžaři." }
];

const nowSports = [
  { name: "Stolní tenis", icon: sportIcons.stolniTenis, desc: "Oddíl pro všechny věkové kategorie, pravidelné tréninky a turnaje." },
  { name: "MTB (horská kola)", icon: sportIcons.mtb, desc: "Komunita MTB jezdců, traily v okolí a společné vyjížďky." },
  { name: "Zimní sporty", icon: sportIcons.zimniSporty, desc: "Lyžování a snowboarding v areálu Komáří vížka." },
  { name: "Kitesurfing", icon: sportIcons.kitesurfing, desc: "Adrenalin na větru, netradiční disciplína v Krušných horách." },
  { name: "Kolečkové sporty", icon: sportIcons.koleckove, desc: "Inline brusle, skateboardy a další aktivity na kolečkách." }
];

const joinReasons = [
  { title: "Budování komunity", icon: <HeartHandshake className="w-8 h-8 text-tjk-blue" /> },
  { title: "Zdravý životní styl", icon: <Leaf className="w-8 h-8 text-green-600" /> },
  { title: "Nezapomenutelná dobrodružství", icon: <Star className="w-8 h-8 text-yellow-500" /> }
];

const ONas = () => {
  return (
    <PageLayout title="O nás" description="Moderní a dynamická stránka o TJ Krupka z.s. – historie, současnost, komunita a výzvy k akci.">
      {/* Úvodní sekce (Hero) + Historie v dvousloupcovém layoutu */}
      <section className="relative flex flex-col md:flex-row gap-12 justify-center items-stretch bg-gradient-to-br from-white via-blue-50 to-green-50 py-16 px-4 overflow-hidden animate-fade-in">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-montserrat font-extrabold text-3xl md:text-5xl text-tjk-blue mb-4 drop-shadow-lg">O nás: Srdce sportu v Krušných horách – Tělovýchovná jednota Krupka z.s.</h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-700 mb-6 animate-fade-in-up delay-100">
            Vítejte na stránce Tělovýchovné jednoty Krupka z.s. (TJK), která již od roku 1974 píše svou bohatou historii v malebném prostředí Krušných hor. Jsme víc než jen sportovní spolek – jsme pulzující komunita, která spojuje generace prostřednictvím lásky k pohybu, zimním i letním sportům a aktivnímu rozvoji místní infrastruktury. Za více než půl století jsme byli domovem pro nespočet sportovních odvětví a nespočet sportovních nadšenců.
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-tjk-blue mb-6 text-center md:text-left">
            Naše historie: Příběh, který spojuje generace
          </h2>
          <div className="text-lg md:text-xl text-gray-700 leading-relaxed">
            <p className="mb-6">
              Tělovýchovná jednota Krupka z.s. (TJK) vznikla v roce 1974 v srdci Krušných hor. Od samého počátku jsme byli místem, kde se setkávaly různé generace a sportovní nadšenci. Naše první kroky vedly na fotbalové hřiště, kde se zrodila tradice týmového ducha a přátelství, která přetrvává dodnes.
            </p>
            <p className="mb-6">
              V průběhu let se naše komunita rozrůstala a přibývaly nové sportovní oddíly – tenis, stolní tenis, cyklistika, atletika, turistika, lyžování i netradiční disciplíny. Každý z těchto sportů přinesl do našeho spolku nové tváře, zkušenosti a příběhy. Společně jsme překonávali výzvy, slavili úspěchy a budovali zázemí, které dnes slouží nejen našim členům, ale i široké veřejnosti.
            </p>
            <p className="mb-6">
              Naše historie je mozaikou stovek dobrovolníků, trenérů, rodičů a dětí, kteří věnovali svůj čas a energii rozvoji sportu v Krupce. Díky jejich nadšení a obětavosti jsme mohli pořádat turnaje, závody, výlety i společenské akce, které zanechaly nesmazatelnou stopu v srdcích mnoha generací.
            </p>
            <p>
              Dnes s hrdostí navazujeme na tuto tradici a pokračujeme v rozvoji sportovního areálu, modernizaci zázemí a podpoře mladých talentů. Naše minulost je základem, na kterém stavíme budoucnost – s otevřeností, respektem a vášní pro pohyb.
            </p>
          </div>
        </div>
      </section>

      {/* Současnost */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 animate-fade-in-up">
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-tjk-blue mb-8 text-center">
          Naše současnost: Dynamika a vášeň pro pohyb
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <Carousel opts={{ loop: true, align: 'center' }} className="group">
              <CarouselContent>
                {nowSports.map((sport, idx) => (
                  <CarouselItem key={sport.name} className="px-2 md:px-6">
                    <div className="glass-card bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-between min-h-[340px] transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-tjk-blue/10 to-green-200/10 rounded-full blur-2xl z-0" />
                      <div className="z-10 flex flex-col items-center gap-3">
                        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-tjk-blue/20 to-green-200/30 shadow-lg mb-2 animate-bounce-slow">
                          {sport.icon}
                        </span>
                        <h3 className="font-montserrat font-bold text-xl md:text-2xl text-tjk-blue text-center drop-shadow mb-2">
                          {sport.name}
                        </h3>
                        <p className="text-gray-700 text-base text-center mb-4 min-h-[56px]">{sport.desc}</p>
                        {sport.name === "MTB (horská kola)" && (
                          <img src="lovable-uploads/hero-mtb.jpg" alt="MTB" className="rounded-xl shadow-lg w-48 h-32 object-cover border-2 border-tjk-blue/20 mb-2 animate-fade-in-up" />
                        )}
                        {sport.name === "Zimní sporty" && (
                          <img src="lovable-uploads/hero-winter.jpg" alt="Zimní sporty" className="rounded-xl shadow-lg w-48 h-32 object-cover border-2 border-blue-400/20 mb-2 animate-fade-in-up" />
                        )}
                        {sport.name === "Stolní tenis" && (
                          <img src="lovable-uploads/hero-community.jpg" alt="Stolní tenis" className="rounded-xl shadow-lg w-48 h-32 object-cover border-2 border-green-400/20 mb-2 animate-fade-in-up" />
                        )}
                        <Button size="sm" variant="secondary" className="mt-2 bg-white/80 text-tjk-blue hover:bg-tjk-blue/10 font-semibold px-6 py-2 rounded-full shadow-md animate-fade-in-up transition-all">
                          <a href="/kontakt">Chci vyzkoušet</a>
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
            {/* Badge hodnoty pod carouselem */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up delay-150">
              <Badge className="bg-gradient-to-br from-tjk-blue/80 to-blue-400/80 text-white text-base px-5 py-3 rounded-xl shadow-md font-semibold">
                Komunita &amp; přátelství
              </Badge>
              <Badge className="bg-gradient-to-br from-green-400/80 to-green-600/80 text-white text-base px-5 py-3 rounded-xl shadow-md font-semibold">
                Zdravý pohyb
              </Badge>
              <Badge className="bg-gradient-to-br from-yellow-400/80 to-orange-400/80 text-white text-base px-5 py-3 rounded-xl shadow-md font-semibold">
                Dobrodružství
              </Badge>
              <Badge className="bg-gradient-to-br from-pink-400/80 to-red-400/80 text-white text-base px-5 py-3 rounded-xl shadow-md font-semibold">
                Otevřenost všem
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Proč se přidat */}
      <section className="py-16 px-4 bg-white animate-fade-in-up">
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-tjk-blue mb-8 text-center">
          Proč se k nám přidat? Více než jen sport!
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {joinReasons.slice(0, 3).map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-xl shadow-md transition-transform hover:scale-105 animate-fade-in-up"
            >
              {reason.icon}
              <h3 className="font-semibold text-lg text-tjk-blue text-center">{reason.title}</h3>
            </div>
          ))}
          <div className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-xl shadow-md transition-transform hover:scale-105 animate-fade-in-up">
            <Medal className="w-8 h-8 text-amber-500" />
            <h3 className="font-semibold text-lg text-tjk-blue text-center">Ocenění a uznání</h3>
          </div>
        </div>
        <div className="flex justify-center mt-6 animate-fade-in-up delay-100">
          <img
            src="lovable-uploads/hero-community.jpg"
            alt="Komunita TJ Krupka"
            className="rounded-xl shadow-lg w-full max-w-md h-48 object-cover border-2 border-green-400/30"
          />
        </div>
      </section>

      {/* CTA sekce */}
      {/* 
      <section className="py-16 px-4 bg-gradient-to-r from-tjk-blue to-blue-700 text-white animate-fade-in-up">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">Co vám chybí k tomu, abyste se cítili ve formě a plní energie?</h2>
          <p className="text-lg mb-4">Už žádné výmluvy! Přijďte si vyzkoušet jeden z našich tréninků – stolní tenis, MTB, nebo se připojte k našim zimním aktivitám. Kontaktujte nás a domluvte si nezávaznou zkušební lekci!</p>
          <Button size="lg" variant="secondary" className="bg-white text-tjk-blue hover:bg-blue-50 font-bold text-lg px-8 py-4 rounded-xl shadow-lg animate-fade-in-up" asChild>
            <a href="/kontakt"><UserPlus className="mr-2" /> Domluvit zkušební lekci</a>
          </Button>
          <Separator className="my-8 bg-white/30" />
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">Máte v sobě skrytého sportovce, který jen čeká na tu správnou příležitost?</h2>
          <p className="text-lg mb-4">Nenechte ho spát! Staňte se členem TJK a odemkněte svůj plný potenciál. Vyplňte online přihlášku a začněte svou sportovní cestu s námi ještě dnes!</p>
          <Button size="lg" variant="secondary" className="bg-white text-tjk-blue hover:bg-blue-50 font-bold text-lg px-8 py-4 rounded-xl shadow-lg animate-fade-in-up" asChild>
            <a href="/kontakt"><ArrowRight className="mr-2" /> Chci se stát členem</a>
          </Button>
          <Separator className="my-8 bg-white/30" />
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">Chcete trávit čas aktivně s podobně naladěnými lidmi a zažít nezapomenutelné dobrodružství?</h2>
          <p className="text-lg mb-4">Sledujte náš kalendář akcí! Pořádáme pravidelné výjezdy na kole, lyžařské zájezdy, turnaje ve stolním tenisu a mnoho dalších akcí. Přihlaste se k odběru novinek, ať vám nic neuteče!</p>
          <Button size="lg" variant="secondary" className="bg-white text-tjk-blue hover:bg-blue-50 font-bold text-lg px-8 py-4 rounded-xl shadow-lg animate-fade-in-up" asChild>
            <a href="/newsletter"><Calendar className="mr-2" /> Přihlásit se k odběru novinek</a>
          </Button>
        </div>
      </section>
      */}

    </PageLayout>
  );
};

export default ONas;
