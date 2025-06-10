import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/supabaseClient";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  order: number;
}

const ONas = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('order', { ascending: true });
          
        if (error) {
          console.error('Error fetching team members:', error);
        } else {
          setTeamMembers(data || []);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

  return (
    <PageLayout 
      title="O nás" 
      description="Seznamte se s historií, vizí a týmem Tělovýchovné jednoty Krupka. Naším posláním je podporovat sport a zdravý životní styl v Krušných horách."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-montserrat font-bold mb-4 text-tjk-blue">Kdo jsme</h2>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Tělovýchovná jednota Krupka z.s. (TJK) působí od roku 1974 v Krušných horách. Jsme komunitní spolek zaměřený 
            na zimní i letní sporty, pohybové aktivity dětí i dospělých a rozvoj místní infrastruktury.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-montserrat font-bold mb-4 text-tjk-blue">Naše hodnoty</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-tjk-blue mb-2">Tradice a společná historie</h3>
            <p>Vážíme si naší dlouholeté historie a zkušeností, které jsme za ta léta nasbírali. Udržujeme tradice a zároveň hledíme do budoucnosti.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-tjk-blue mb-2">Bezpečnost a profesionalita</h3>
            <p>Všechny naše aktivity plánujeme s důrazem na bezpečnost a profesionální přístup. Naši instruktoři jsou certifikovaní a pravidelně školeni.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-tjk-blue mb-2">Inovace a progres</h3>
            <p>Neustále se snažíme zlepšovat naše služby a přinášet nové nápady pro rozvoj areálu i celého regionu.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-tjk-blue mb-2">Podpora mládeže a dobrovolnictví</h3>
            <p>Věříme v hodnotu zapojení mladých lidí do sportu a podporujeme dobrovolnictví jako cestu k budování komunity.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-montserrat font-bold mb-6 text-tjk-blue">Náš tým</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tjk-blue"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image_url || 'https://images.unsplash.com/photo-1487958449943-2429e8be8625'} 
                    alt={member.name}
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-tjk-blue">{member.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{member.position}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {teamMembers.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Informace o našem týmu brzy doplníme.</p>
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-montserrat font-bold mb-4 text-tjk-blue">Naše vize a cíle</h2>
        <div className="prose max-w-none">
          <ul className="space-y-4 pl-6 list-disc text-lg">
            <li>Udržet a rozvíjet ski areál Komáří vížka</li>
            <li>Rozšířit letní nabídku sportů pro rodiny a školy</li>
            <li>Vytvořit moderní zázemí pro členy i návštěvníky</li>
            <li>Propojit sportovní aktivity s ekologickými principy a udržitelností</li>
          </ul>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-tjk-blue text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-montserrat font-bold mb-4">Přidejte se k nám!</h2>
          <p className="mb-6">Staňte se členem TJ Krupka a získejte přístup k mnoha výhodám a aktivitám.</p>
          <a href="/dobrovolnici" className="bg-white text-tjk-blue hover:bg-gray-100 font-semibold py-2 px-6 rounded-md inline-block transition-colors">
            Zjistit více
          </a>
        </div>
        <div className="bg-tjk-orange text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-montserrat font-bold mb-4">Podpořte nás</h2>
          <p className="mb-6">Pomozte nám rozvíjet sportovní aktivity v regionu jako sponzor nebo partner.</p>
          <a href="/dobrovolnici" className="bg-white text-tjk-orange hover:bg-gray-100 font-semibold py-2 px-6 rounded-md inline-block transition-colors">
            Kontaktujte nás
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default ONas;
