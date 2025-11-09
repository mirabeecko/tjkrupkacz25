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
    persistSession: false
  }
});

async function createExecFunction() {
  console.log('📌 Step 1: Creating exec_sql helper function...');

  const helperSql = readFileSync(
    join(__dirname, 'supabase/migrations/00_create_exec_function.sql'),
    'utf8'
  );

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({ sql_query: helperSql })
    });

    if (!response.ok) {
      // Function doesn't exist yet, that's expected
      console.log('   ℹ️  exec_sql function needs to be created first');
      return false;
    }

    console.log('   ✅ Helper function ready');
    return true;
  } catch (error) {
    console.log('   ℹ️  Helper function not available');
    return false;
  }
}

async function runMainMigration() {
  console.log('\n📌 Step 2: Running main migration...');

  const mainSql = readFileSync(
    join(__dirname, 'supabase/migrations/20250127100000_complete_booking_system.sql'),
    'utf8'
  );

  // Split into statements and execute one by one
  const statements = mainSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 10 && !s.startsWith('--'));

  console.log(`   Found ${statements.length} SQL statements\n`);

  let executed = 0;
  let failed = 0;

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';

    // Show progress
    if (i % 5 === 0) {
      process.stdout.write(`   Progress: ${i}/${statements.length}...\r`);
    }

    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql_query: statement
      });

      if (error) {
        console.log(`\n   ⚠️  Statement ${i + 1} error:`, error.message.substring(0, 100));
        failed++;
      } else {
        executed++;
      }
    } catch (err) {
      console.log(`\n   ❌ Exception at statement ${i + 1}:`, err.message.substring(0, 100));
      failed++;
    }
  }

  console.log(`\n\n   ✅ Executed: ${executed}`);
  console.log(`   ⚠️  Failed: ${failed}`);

  return failed === 0;
}

async function main() {
  console.log('\n🚀 TJ Krupka - Database Migration Executor\n');

  // Try to use exec_sql function
  const hasExecFunction = await createExecFunction();

  if (!hasExecFunction) {
    console.log('\n❌ Cannot execute migration automatically via REST API.');
    console.log('\n✅ Please run the migration MANUALLY:\n');
    console.log('1. Open Supabase Dashboard:');
    console.log('   https://supabase.com/dashboard/project/mljqltwcdqknezuqpisb/editor\n');
    console.log('2. Click "New Query" or SQL Editor\n');
    console.log('3. Copy the ENTIRE contents from this file:');
    console.log('   supabase/migrations/20250127100000_complete_booking_system.sql\n');
    console.log('4. Paste it into the SQL editor\n');
    console.log('5. Click "Run" button (or press Cmd+Enter)\n');
    console.log('6. Wait for completion (should take 5-10 seconds)\n');
    console.log('7. Check for any errors in the output panel\n');
    console.log('✨ The migration will:');
    console.log('   - Drop old tables (rental_bookings, old tjkshop_* tables)');
    console.log('   - Create new tjkshop_products table (with product_type for merch)');
    console.log('   - Create tjkshop_services (courses, lessons, teambuilding)');
    console.log('   - Create tjkshop_ticket_types (skipasses)');
    console.log('   - Create tjkshop_bookings (for vehicles, kite, services)');
    console.log('   - Create tjkshop_orders and order_items (e-shop)');
    console.log('   - Create tjkshop_payments (unified for orders and bookings)');
    console.log('   - Add sample data for testing\n');
    return;
  }

  // If exec function exists, try to run migration
  const success = await runMainMigration();

  if (success) {
    console.log('\n🎉 Migration completed successfully!\n');
  } else {
    console.log('\n⚠️  Migration completed with some errors. Please check manually.\n');
  }
}

main().catch(console.error);
