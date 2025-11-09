import React from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sun, Snowflake, Shield, Award, MapPin, ChevronRight, Smile, Zap, Leaf } from "lucide-react";

const AktivityProDeti: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);

  const summerActivities = [
    {
      title: "Dobrodružné hledání pokladu",
      description: "Děti se vydají na napínavou cestu po areálu, kde plní úkoly, luští hádanky a hledají skrytý poklad. Ideální pro rozvoj týmové spolupráce a orientace v přírodě.",
      image: "/images/deti/treasure_hunt.jpg",
      icon: <MapPin />
    },
    {
      title: "Slackline a balanční aktivity",
      description: "Naše slackline zóna je skvělým místem pro trénink rovnováhy, koordinace a trpělivosti. Zábava pro všechny věkové kategorie pod dohledem instruktorů.",
      image: "/images/deti/slackline.jpg",
      icon: <Zap />
    },
    {
      title: "Rodinné výlety a cyklistika",
      description: "Okolí Komáří vížky nabízí nespočet tras pro pěší turistiku a cyklistiku, vhodných i pro ty nejmenší. Užijte si společné chvíle v krásné přírodě Krušných hor.",
      image: "/images/deti/father_son.jpg",
      icon: <Leaf />
    }
  ];

  const winterActivities = [
    {
      title: "Lyžařská a snowboardová škola",
      description: "Naši certifikovaní instruktoři naučí vaše děti základům lyžování a snowboardingu v bezpečném a zábavném prostředí. Kurzy pro úplné začátečníky i pokročilé.",
      image: "/images/deti/ski_instructor.jpg",
      icon: <Award />
    },
    {
      title: "První obloučky na sněhu",
      description: "Pro nejmenší lyžaře máme připravený dětský vlek a mírný svah, kde si mohou bezpečně osvojit první lyžařské dovednosti a získat lásku k zimním sportům.",
      image: "/images/deti/little_skier.jpg",
      icon: <Smile />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Aktivity pro děti | Sportovní areál Komáří vížka"
        description="Objevte naši širokou nabídku letních a zimních aktivit pro děti v areálu Komáří vížka. Od lyžařské školy po letní dobrodružství v přírodě. Zábava pro celou rodinu."
        keywords="aktivity pro děti, Komáří vížka, Krušné hory, lyžařská škola, letní tábory, program pro děti, rodinná dovolená, cyklistika, slackline"
      />
      <Header toggleNavbar={toggleNavbar} />
      <Navbar isOpen={navbarOpen} closeNavbar={closeNavbar} />

      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section 
          className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: "url('/images/deti/little_skier.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/70 to-purple-600/70"></div>
          <div className="relative z-10 text-center px-4">
            <div className="mb-4">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">Zábava pro celou rodinu</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg">Dobrodružství volá!</h1>
            <p className="text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">Na Komáří vížce věříme, že nejlepší vzpomínky vznikají venku. Proto jsme připravili pestrou nabídku aktivit pro děti všech věkových kategorií.</p>
          </div>
        </section>

        {/* Intro Text */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-6">Pohyb a smích na čerstvém vzduchu</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Naším cílem je probudit v dětech lásku k přírodě a pohybu. Všechny aktivity jsou navrženy tak, aby byly nejen zábavné, ale i bezpečné a poučné. Pod vedením našich zkušených instruktorů si děti osvojí nové dovednosti, naučí se spolupracovat a odnesou si nezapomenutelné zážitky.
            </p>
            <div className="flex justify-center gap-8 text-tjk-blue">
                <div className="flex items-center gap-2"><Shield size={20}/> Bezpečnost na prvním místě</div>
                <div className="flex items-center gap-2"><Smile size={20}/> Zábava pro každého</div>
                <div className="flex items-center gap-2"><Award size={20}/> Nové dovednosti</div>
            </div>
          </div>
        </section>

        {/* Winter Activities */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-2 flex items-center justify-center gap-3"><Snowflake className="text-blue-500"/> Zimní radovánky</h2>
              <p className="text-lg text-gray-600">Užijte si s námi zimu na maximum!</p>
            </div>
            <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto">
              {winterActivities.map((activity, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row-reverse items-center border-2 border-transparent hover:border-blue-200">
                  <div className="md:w-1/2 h-64 md:h-auto">
                    <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">{activity.icon}</div>
                        <h3 className="text-2xl font-bold text-tjk-blue">{activity.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{activity.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* School Activities CTA */}
        <section className="relative py-20 bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/images/deti/treasure_hunt.jpg')" }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/80 to-orange-600/80"></div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">Perfektní pro školní výlety a kurzy</h2>
                <p className="text-lg mb-8 max-w-3xl mx-auto drop-shadow-sm">
                    Naše aktivity jsou ideální pro školní skupiny. Nabízíme programy na míru, které kombinují sport, zábavu a vzdělávání v přírodě. Posilujeme týmového ducha a zanecháváme v dětech silné zážitky.
                </p>
                <Link to="/skoly">
                    <Button size="lg" className="bg-white text-tjk-orange hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Více o programech pro školy
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </section>

        {/* Summer Activities */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tjk-blue mb-2 flex items-center justify-center gap-3"><Sun className="text-yellow-500"/> Letní dobrodružství</h2>
              <p className="text-lg text-gray-600">Když sníh roztaje, zábava u nás nekončí!</p>
            </div>
            <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto">
              {summerActivities.map((activity, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row items-center border-2 border-transparent hover:border-yellow-200">
                  <div className="md:w-1/2 h-64 md:h-auto">
                    <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">{activity.icon}</div>
                        <h3 className="text-2xl font-bold text-tjk-blue">{activity.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{activity.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-tjk-blue mb-4">Máte dotaz nebo si přejete rezervovat aktivitu?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Rádi vám poradíme a pomůžeme naplánovat nezapomenutelný den pro vaši rodinu.</p>
            <Link to="/kontakt">
              <Button size="lg" className="bg-tjk-orange hover:bg-orange-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                Kontaktujte nás
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AktivityProDeti;
