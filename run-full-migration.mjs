import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = 'https://mljqltwcdqknezuqpisb.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sanFsdHdjZHFrbmV6dXFwaXNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTMxMzM1OCwiZXhwIjoyMDYwODg5MzU4fQ.iYpjbfCw2Gd65n3EfJTHYcz7iNjpkazMWJpg3BJPXv0';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  }
});

async function runMigration() {
  console.log('\n🚀 TJ Krupka - Database Migration\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📄 Načítám SQL migraci...');
  const sqlPath = join(__dirname, 'supabase/migrations/20250127100000_complete_booking_system.sql');
  const sqlContent = readFileSync(sqlPath, 'utf8');

  console.log('✅ SQL načteno (' + Math.round(sqlContent.length / 1024) + ' KB)\n');

  console.log('⚠️  Tato migrace provede:\n');
  console.log('   • DROP všech starých tabulek (rental_bookings, staré tjkshop_*)');
  console.log('   • CREATE nových tabulek s prefixem tjkshop_');
  console.log('   • Nastavení indexů, triggerů, RLS policies');
  console.log('   • Vložení ukázkových dat\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('🔄 Spouštím migraci...\n');

  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: sqlContent
    });

    if (error) {
      console.log('❌ Chyba při spuštění migrace:\n');
      console.log('   Error:', error.message);
      console.log('   Details:', error.details || 'N/A');
      console.log('   Hint:', error.hint || 'N/A');

      // Try to provide helpful info
      if (error.message.includes('syntax error')) {
        console.log('\n💡 SQL syntax error - zkouším rozdělit na menší části...\n');
        await runMigrationInChunks(sqlContent);
      }

      return false;
    }

    console.log('✅ Migrace úspěšně provedena!\n');
    console.log('   Response:', JSON.stringify(data, null, 2));
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return true;

  } catch (error) {
    console.log('❌ Exception:', error.message);
    return false;
  }
}

async function runMigrationInChunks(sqlContent) {
  console.log('📦 Rozdělím SQL na menší části a spustím postupně...\n');

  // Split by major sections (DROP, CREATE TABLE, CREATE FUNCTION, etc.)
  const sections = [];
  let currentSection = '';
  let inFunction = false;

  const lines = sqlContent.split('\n');

  for (const line of lines) {
    currentSection += line + '\n';

    // Track if we're inside a function
    if (line.includes('CREATE OR REPLACE FUNCTION') || line.includes('CREATE FUNCTION')) {
      inFunction = true;
    }

    if (line.includes('$$;') && inFunction) {
      inFunction = false;
      sections.push(currentSection.trim());
      currentSection = '';
      continue;
    }

    // Split on semicolons outside of functions
    if (!inFunction && line.trim().endsWith(';') && !line.trim().startsWith('--')) {
      if (currentSection.trim().length > 0) {
        sections.push(currentSection.trim());
        currentSection = '';
      }
    }
  }

  if (currentSection.trim().length > 0) {
    sections.push(currentSection.trim());
  }

  console.log(`   Nalezeno ${sections.length} SQL sekcí\n`);

  let executed = 0;
  let failed = 0;
  let lastError = null;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    // Skip comments and empty sections
    if (section.startsWith('--') || section.length < 10) {
      continue;
    }

    // Show progress every 10 sections
    if (i % 10 === 0) {
      process.stdout.write(`   Progress: ${i}/${sections.length} (✅ ${executed} | ❌ ${failed})\r`);
    }

    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql_query: section
      });

      if (error) {
        failed++;
        lastError = { section: i, error: error.message, sql: section.substring(0, 100) };
      } else if (data && !data.success) {
        failed++;
        lastError = { section: i, error: data.error, sql: section.substring(0, 100) };
      } else {
        executed++;
      }

    } catch (err) {
      failed++;
      lastError = { section: i, error: err.message, sql: section.substring(0, 100) };
    }
  }

  console.log(`\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`\n📊 Výsledky migrace:\n`);
  console.log(`   ✅ Úspěšně provedeno: ${executed}`);
  console.log(`   ❌ Selhalo: ${failed}`);

  if (lastError) {
    console.log(`\n   Poslední chyba:`);
    console.log(`   Sekce: ${lastError.section}`);
    console.log(`   Error: ${lastError.error}`);
    console.log(`   SQL: ${lastError.sql}...`);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return failed === 0;
}

async function verifyMigration() {
  console.log('🔍 Ověřuji vytvořené tabulky...\n');

  const expectedTables = [
    'tjkshop_products',
    'tjkshop_services',
    'tjkshop_ticket_types',
    'tjkshop_bookings',
    'tjkshop_orders',
    'tjkshop_order_items',
    'tjkshop_payments',
    'tjkshop_issued_tickets',
    'tjkshop_memberships',
    'tjkshop_cart',
    'tjkshop_cart_items',
    'tjkshop_discount_codes'
  ];

  for (const tableName of expectedTables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`   ❌ ${tableName} - CHYBA: ${error.message}`);
      } else {
        console.log(`   ✅ ${tableName}`);
      }
    } catch (err) {
      console.log(`   ❌ ${tableName} - EXCEPTION: ${err.message}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

async function showSampleData() {
  console.log('📦 Kontroluji ukázková data...\n');

  try {
    const { data: products } = await supabase.from('tjkshop_products').select('id, name, product_type').limit(5);
    console.log('   Produkty:', products?.length || 0);
    products?.forEach(p => console.log(`      - ${p.name} (${p.product_type})`));

    const { data: services } = await supabase.from('tjkshop_services').select('id, name, service_type').limit(5);
    console.log('\n   Služby:', services?.length || 0);
    services?.forEach(s => console.log(`      - ${s.name} (${s.service_type})`));

    const { data: tickets } = await supabase.from('tjkshop_ticket_types').select('id, name, ticket_type').limit(5);
    console.log('\n   Jízdenky:', tickets?.length || 0);
    tickets?.forEach(t => console.log(`      - ${t.name} (${t.ticket_type})`));

  } catch (err) {
    console.log('   ⚠️  Nelze načíst ukázková data');
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

async function main() {
  const success = await runMigration();

  if (success) {
    await verifyMigration();
    await showSampleData();

    console.log('🎉 Migrace ÚSPĚŠNĚ DOKONČENA!\n');
    console.log('✨ Databázová struktura je připravena k použití.\n');
    console.log('📝 Vytvořené tabulky:');
    console.log('   • tjkshop_products (merch, accessory, gift)');
    console.log('   • tjkshop_services (course, lesson, teambuilding)');
    console.log('   • tjkshop_ticket_types (skipass, entrance)');
    console.log('   • tjkshop_bookings (vozidla, kite, služby)');
    console.log('   • tjkshop_orders + order_items (e-shop)');
    console.log('   • tjkshop_payments (platby)');
    console.log('   • tjkshop_cart (košík)');
    console.log('   • tjkshop_discount_codes (slevové kódy)\n');
  } else {
    console.log('⚠️  Migrace dokončena s chybami. Zkontroluj detaily výše.\n');
  }
}

main().catch(console.error);
