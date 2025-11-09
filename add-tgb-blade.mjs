import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mljqltwcdqknezuqpisb.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sanFsdHdjZHFrbmV6dXFwaXNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTMxMzM1OCwiZXhwIjoyMDYwODg5MzU4fQ.iYpjbfCw2Gd65n3EfJTHYcz7iNjpkazMWJpg3BJPXv0';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const tgbBlade = {
  brand: 'TGB',
  model: 'BLADE 1000 LTX MAX EPS',
  year: 2023,
  engine_capacity_cc: 1000,
  power_kw: 63,
  weight_kg: 470,
  '1h_price_czk': 300,
  '3h_price_czk': 750,
  day_price_czk: 1000,
  weekend_price_czk: 2500,
  photo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  notes: 'Výkonná čtyřkolka TGB BLADE 1000 LTX MAX s pohonem 4x4 a automatickou převodovkou. Elektronické řízení posilovače řízení (EPS) pro snadnou ovladatelnost. Ideální pro náročné práce v terénu.',
  moye: true,
  category: 'work'
};

async function addTGBBlade() {
  console.log('\n🏍️  Přidávám TGB BLADE 1000 do databáze...\n');

  // Delete existing work vehicles first
  console.log('🗑️  Mažu stará vozidla kategorie "work"...\n');
  const { error: deleteError } = await supabase
    .from('vehicles')
    .delete()
    .eq('category', 'work')
    .eq('moye', true);

  if (deleteError) {
    console.error('❌ Chyba při mazání:', deleteError);
    return;
  }

  console.log('✅ Stará vozidla smazána\n');

  // Add TGB BLADE
  console.log('📦 Přidávám TGB BLADE 1000...\n');

  const { data, error } = await supabase
    .from('vehicles')
    .insert([tgbBlade])
    .select()
    .single();

  if (error) {
    console.error('❌ Chyba:', error.message);
  } else {
    console.log(`✅ Přidáno (ID: ${data.id})\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🎉 Hotovo!\n');
    console.log(`📊 Vozidlo: ${data.brand} ${data.model}\n`);
    console.log(`   • Rok: ${data.year}`);
    console.log(`   • Objem: ${data.engine_capacity_cc} cc`);
    console.log(`   • Výkon: ${data.power_kw} kW`);
    console.log(`   • Cena za den: ${data.day_price_czk} Kč\n`);
    console.log('✨ Můžete to vidět na: http://localhost:8082/pujcovna-ctyrkolky\n');
  }
}

addTGBBlade().catch(console.error);
