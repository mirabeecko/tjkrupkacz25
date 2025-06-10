
import React from "react";
import PageLayout from "@/components/PageLayout";

const Vstupenky = () => {
  // Sample ticket types
  const tickets = [
    {
      id: 1,
      name: "Celodenní jízdenka",
      description: "Neomezený počet jízd po celý den",
      price: "399 Kč",
      category: "dospělý"
    },
    {
      id: 2,
      name: "Celodenní jízdenka",
      description: "Neomezený počet jízd po celý den",
      price: "299 Kč",
      category: "dítě do 15 let"
    },
    {
      id: 3,
      name: "Půldenní jízdenka",
      description: "Neomezený počet jízd po dobu 4 hodin",
      price: "249 Kč",
      category: "dospělý"
    },
    {
      id: 4,
      name: "Půldenní jízdenka",
      description: "Neomezený počet jízd po dobu 4 hodin",
      price: "199 Kč",
      category: "dítě do 15 let"
    },
    {
      id: 5,
      name: "Rodinné jízdné",
      description: "2 dospělí + až 3 děti, celodenní",
      price: "999 Kč",
      category: "rodina"
    },
    {
      id: 6,
      name: "Bodová jízdenka",
      description: "10 jízd dle vlastního výběru",
      price: "299 Kč",
      category: "všichni"
    }
  ];

  return (
    <PageLayout 
      title="Vstupenky & Rezervace" 
      description="Kupte si jízdenky na vleky a rezervujte služby online."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-montserrat font-bold mb-6 text-tjk-blue">Ceník jízdenek</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-t-4 border-tjk-blue">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{ticket.name}</h3>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  {ticket.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{ticket.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-tjk-orange">{ticket.price}</span>
                <button className="bg-tjk-blue hover:bg-tjk-blue/90 text-white py-2 px-4 rounded text-sm transition-colors">
                  Koupit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-montserrat font-bold mb-6 text-tjk-blue">Rezervace služeb</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-tjk-blue mb-4">Ubytování v penzionu</h3>
            <p className="text-gray-700 mb-4">
              Rezervujte si pokoj v našem penzionu s výhledem na Krušné hory.
              K dispozici jsou jedno, dvou i vícelůžkové pokoje.
            </p>
            <button className="w-full bg-tjk-orange hover:bg-tjk-orange/90 text-white py-2 px-4 rounded transition-colors">
              Rezervovat ubytování
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-tjk-blue mb-4">Sportovní kurzy</h3>
            <p className="text-gray-700 mb-4">
              Nabízíme kurzy lyžování, snowboardingu, kitingu i inline bruslení
              pro začátečníky i pokročilé.
            </p>
            <button className="w-full bg-tjk-orange hover:bg-tjk-orange/90 text-white py-2 px-4 rounded transition-colors">
              Vybrat kurz
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-montserrat font-bold mb-4 text-tjk-blue">Rezervační podmínky</h2>
        <div className="prose max-w-none">
          <ul className="space-y-2">
            <li>Vstupenky jsou platné pouze v den uvedený na vstupence.</li>
            <li>V případě nepříznivého počasí je možné vstupenku vrátit nebo vyměnit.</li>
            <li>Ubytování lze stornovat zdarma 7 dní před nástupem.</li>
            <li>Při rezervaci kurzu je nutné zaplatit zálohu ve výši 50%.</li>
            <li>Děti do 6 let mají vstup zdarma v doprovodu dospělé osoby.</li>
            <li>Senioři nad 65 let mají nárok na slevu 20% z ceny vstupného.</li>
          </ul>
        </div>
      </section>

      <section className="text-center bg-tjk-blue text-white p-8 rounded-lg">
        <h2 className="text-2xl font-montserrat font-bold mb-4">Skupinové rezervace</h2>
        <p className="mb-6">
          Pro skupiny nad 10 osob nabízíme speciální ceny a podmínky.
          Kontaktujte nás pro vytvoření individuální nabídky.
        </p>
        <a 
          href="/kontakt" 
          className="inline-block bg-white text-tjk-blue hover:bg-gray-100 font-semibold py-2 px-8 rounded-md transition-colors"
        >
          Kontaktovat
        </a>
      </section>
    </PageLayout>
  );
};

export default Vstupenky;
