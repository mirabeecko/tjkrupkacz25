import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mljqltwcdqknezuqpisb.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sanFsdHdjZHFrbmV6dXFwaXNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTMxMzM1OCwiZXhwIjoyMDYwODg5MzU4fQ.iYpjbfCw2Gd65n3EfJTHYcz7iNjpkazMWJpg3BJPXv0';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const workVehicles = [
  {
    brand: 'Yamaha',
    model: 'Grizzly 700',
    year: 2020,
    engine_capacity_cc: 686,
    power_kw: 33,
    weight_kg: 310,
    '1h_price_czk': 250,
    '3h_price_czk': 600,
    day_price_czk: 800,
    weekend_price_czk: 2000,
    photo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    notes: 'Výkonná čtyřkolka s pohonem 4x4, ideální pro těžké práce v terénu. Automatická převodovka, vysoká nosnost, nízká spotřeba.',
    moye: true,
    category: 'work'
  },
  {
    brand: 'Yamaha',
    model: 'Kodiak 450',
    year: 2021,
    engine_capacity_cc: 421,
    power_kw: 23,
    weight_kg: 285,
    '1h_price_czk': 200,
    '3h_price_czk': 500,
    day_price_czk: 650,
    weekend_price_czk: 1650,
    photo_url: 'https://images.unsplash.com/photo-1600709588726-f5c9b0b155c7?w=800',
    notes: 'Kompaktní a všestranná čtyřkolka pro práce na zahradě a menší terénní práce. Spolehlivý pohon 4x4 a skvělá ovladatelnost.',
    moye: true,
    category: 'work'
  },
  {
    brand: 'Universal',
    model: 'Pracovní vozík 500kg',
    year: 2023,
    weight_kg: 85,
    '1h_price_czk': 100,
    '3h_price_czk': 250,
    day_price_czk: 300,
    weekend_price_czk: 750,
    photo_url: 'https://images.unsplash.com/photo-1586864387634-bdf1f8a01b21?w=800',
    notes: 'Robustní pracovní vozík s nosností až 500 kg. Sklápěcí korba pro snadné vykládání. Ideální pro přepravu stavebního materiálu, dřeva nebo sena. Připojení na tažné zařízení čtyřkolky.',
    moye: true,
    category: 'work'
  },
  {
    brand: 'Honda',
    model: 'Foreman 520',
    year: 2022,
    engine_capacity_cc: 518,
    power_kw: 27,
    weight_kg: 299,
    '1h_price_czk': 220,
    '3h_price_czk': 550,
    day_price_czk: 750,
    weekend_price_czk: 1900,
    photo_url: 'https://images.unsplash.com/photo-1600709588726-f5c9b0b155c7?w=800',
    notes: 'Spolehlivá pracovní čtyřkolka Honda s výkonným motorem. Perfektní pro lesní práce, dopravu materiálu a těžší terénní úkoly. Automatická převodovka DCT.',
    moye: true,
    category: 'work'
  }
];

async function addWorkVehicles() {
  console.log('\n🚜 Přidávám pracovní vozidla do databáze...\n');

  // Check if work category exists in vehicles
  console.log('📊 Kontroluji kategorii "work" ve vehicles...\n');

  const { data: existingWork, error: checkError } = await supabase
    .from('vehicles')
    .select('*')
    .eq('category', 'work')
    .eq('moye', true);

  if (checkError) {
    console.error('❌ Chyba při kontrole:', checkError);
    return;
  }

  if (existingWork && existingWork.length > 0) {
    console.log(`⚠️  Již existuje ${existingWork.length} vozidel kategorie "work"`);
    console.log('   Mám je smazat a nahradit novými? (ano/ne)\n');
    console.log('   Pro automatické přidání spusťte s parametrem --force\n');

    if (!process.argv.includes('--force')) {
      console.log('💡 Spusťte: node add-work-vehicles.mjs --force\n');
      return;
    }

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
  }

  // Add new vehicles
  console.log(`📦 Přidávám ${workVehicles.length} nových vozidel...\n`);

  for (let i = 0; i < workVehicles.length; i++) {
    const vehicle = workVehicles[i];
    console.log(`   ${i + 1}/${workVehicles.length} Přidávám: ${vehicle.brand} ${vehicle.model}...`);

    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicle])
      .select()
      .single();

    if (error) {
      console.error(`   ❌ Chyba: ${error.message}`);
    } else {
      console.log(`   ✅ Přidáno (ID: ${data.id})`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('🎉 Hotovo!\n');
  console.log('📊 Přidaná vozidla:\n');

  const { data: finalVehicles } = await supabase
    .from('vehicles')
    .select('id, brand, model, category, day_price_czk')
    .eq('category', 'work')
    .eq('moye', true)
    .order('id', { ascending: true });

  if (finalVehicles) {
    finalVehicles.forEach(v => {
      console.log(`   • ${v.brand} ${v.model} - ${v.day_price_czk} Kč/den`);
    });
  }

  console.log('\n✨ Můžete je teď vidět na: http://localhost:8081/pujcovna-ctyrkolky\n');
}

addWorkVehicles().catch(console.error);
