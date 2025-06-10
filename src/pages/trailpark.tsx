import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { supabase } from '@/supabaseClient';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Trail {
  id: number;
  name: string;
  sport: string;
  sports: string;
  style: string;
  start: string;
  end: string;
  gps_start: string;
  gps_end: string;
  builder: string;
  legal: boolean;
  length_km: number;
  elevation_gain_m: number;
  difficulty: number;
}

const Trailpark = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [trailsLoading, setTrailsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const { data, error } = await supabase
          .from('traily')
          .select('*')
          .order('difficulty', { ascending: true });
        if (error) {
          console.error('Error fetching trails:', error);
        } else {
          setTrails(data || []);
        }
      } catch (error) {
        console.error('Error fetching trails:', error);
      } finally {
        setTrailsLoading(false);
      }
    }
    fetchTrails();
  }, []);

  // Funkce pro label a barvu obtížnosti
  const getDifficultyInfo = (difficulty: number) => {
    switch(difficulty) {
      case 1:
        return { label: 'Začátečník', color: 'bg-green-500' };
      case 2:
        return { label: 'Mírně pokročilý', color: 'bg-blue-500' };
      case 3:
        return { label: 'Středně pokročilý', color: 'bg-red-500' };
      case 4:
        return { label: 'Pokročilý', color: 'bg-black' };
      case 5:
        return { label: 'Expert', color: 'bg-purple-500' };
      default:
        return { label: 'Neznámá', color: 'bg-gray-400' };
    }
  };

  return (
    <PageLayout title="TrailPark Komárka" description="Moderní trailpark pro všechny úrovně jezdců. Flow traily, technické pasáže i zábava pro děti.">
      <section className="mb-12">
        <h2 className="text-2xl font-montserrat font-bold mb-6 text-tjk-blue">Trailpark</h2>
        {trailsLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tjk-blue"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-md">
            <Table>
              <TableHeader className="bg-tjk-blue">
                <TableRow>
                  <TableHead className="text-white">Název</TableHead>
                  <TableHead className="text-white">Sport</TableHead>
                  <TableHead className="text-white">Styl</TableHead>
                  <TableHead className="text-white">Délka</TableHead>
                  <TableHead className="text-white">Převýšení</TableHead>
                  <TableHead className="text-white">Obtížnost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trails.map((trail) => {
                  const { label, color } = getDifficultyInfo(trail.difficulty);
                  return (
                    <TableRow key={trail.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{trail.name}</TableCell>
                      <TableCell>{trail.sport || trail.sports}</TableCell>
                      <TableCell>{trail.style}</TableCell>
                      <TableCell>{trail.length_km} km</TableCell>
                      <TableCell>{trail.elevation_gain_m} m</TableCell>
                      <TableCell>
                        <span className={`${color} text-white text-xs px-2 py-1 rounded`}>
                          {label}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        {!trailsLoading && trails.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Momentálně nejsou k dispozici žádné traily.</p>
          </div>
        )}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white p-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Zapojte se do stavby trailparku!</h3>
              <p className="mb-6 text-white/90 leading-relaxed">
                Hledáme dobrovolníky pro rozšíření a údržbu trailů v areálu Komáří vížka. 
                Staňte se součástí naší komunity a užijte si radost z jízdy na trasách, které jste pomohli vybudovat.
              </p>
              <Link to="/dobrovolnici">
                <Button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-md transition-colors text-base shadow-md hover:shadow-lg">
                  Jdu pomoct
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1614236224416-9a88fb92bd8d?q=80&w=2574&auto=format&fit=crop" 
                alt="Dobrovolníci při stavbě trailů" 
                className="h-64 w-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Trailpark;
