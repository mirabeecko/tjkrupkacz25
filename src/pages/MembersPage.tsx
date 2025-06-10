// src/pages/MembersPage.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

// uprav typ podle struktury tabulky
type Member = {
  id: number;
  name: string;
  email: string;
  // …další sloupce
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('id', { ascending: true });
      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setMembers((data ?? []) as Member[]);
      }
      setLoading(false);
    }
    fetchMembers();
  }, []);

  if (loading) return <p>Načítám členy…</p>;
  if (error)   return <p>Chyba: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seznam členů</h1>
      <ul className="list-disc pl-5">
        {members.map(m => (
          <li key={m.id}>
            {m.name} ({m.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
