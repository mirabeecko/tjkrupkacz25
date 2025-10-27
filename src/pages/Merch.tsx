
import React from "react";
import PageLayout from "@/components/PageLayout";

const Merch = () => {
  // Simulate merchandise items
  const merchItems = [
    {
      id: 1,
      name: "TJK Tričko",
      description: "Bavlněné tričko s logem Tělovýchovné jednoty Krupka",
      price: "399 Kč",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Kšiltovka Komáří vížka",
      description: "Stylová kšiltovka s výšivkou",
      price: "299 Kč",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1036&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Hrnek TJK",
      description: "Keramický hrnek s motivem Krušných hor",
      price: "199 Kč",
      image: "https://images.unsplash.com/photo-1577937927133-66a4b7d27c9c?q=80&w=987&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Mikina Komáří vížka",
      description: "Teplá mikina s kapucí a logem areálu",
      price: "699 Kč",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=987&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Sportovní batoh",
      description: "Praktický batoh na sport i výlety",
      price: "599 Kč",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1064&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Láhev na vodu",
      description: "Nerezová láhev s logem TJK",
      price: "249 Kč",
      image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=987&auto=format&fit=crop"
    },
  ];

  return (
    <PageLayout 
      title="Merch" 
      description="Originální trička, čepice, klíčenky a další suvenýry z areálu Komáří vížka."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {merchItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform hover:scale-105" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064&auto=format&fit=crop";
                }}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-montserrat font-semibold text-tjk-blue">{item.name}</h2>
                <span className="font-bold text-tjk-orange">{item.price}</span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button className="w-full bg-tjk-blue hover:bg-tjk-blue/90 text-white py-2 px-4 rounded transition-colors">
                Přidat do košíku
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-montserrat font-bold mb-4 text-tjk-blue">Informace o nákupu</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Doprava</h3>
            <p className="text-sm text-gray-600">
              Doručení Českou poštou nebo osobní odběr v areálu Komáří vížka.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Platba</h3>
            <p className="text-sm text-gray-600">
              Bankovním převodem nebo kartou online. Při osobním odběru i hotově.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Reklamace</h3>
            <p className="text-sm text-gray-600">
              Zboží můžete vrátit do 14 dnů od zakoupení.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-montserrat font-bold mb-4 text-tjk-blue">Máte dotaz?</h2>
        <p className="mb-6">Kontaktujte nás, rádi vám pomůžeme s výběrem nebo zodpovíme jakékoli dotazy.</p>
        <a 
          href="/kontakt" 
          className="inline-block bg-tjk-orange hover:bg-tjk-orange/90 text-white py-2 px-8 rounded font-medium transition-colors"
        >
          Kontaktovat
        </a>
      </section>
    </PageLayout>
  );
};

export default Merch;
