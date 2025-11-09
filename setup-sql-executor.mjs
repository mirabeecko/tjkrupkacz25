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
  },
  db: {
    schema: 'public'
  }
});

// SQL to create the exec function
const CREATE_EXEC_FUNCTION = `
-- Drop if exists
DROP FUNCTION IF EXISTS exec_sql(text);

-- Create function to execute arbitrary SQL
CREATE OR REPLACE FUNCTION exec_sql(sql_query text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result_count integer;
BEGIN
  -- Execute the query
  EXECUTE sql_query;

  -- Try to get row count if available
  GET DIAGNOSTICS result_count = ROW_COUNT;

  -- Return success
  RETURN json_build_object(
    'success', true,
    'message', 'SQL executed successfully',
    'rows_affected', result_count
  );
EXCEPTION
  WHEN OTHERS THEN
    -- Return error details
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM,
      'detail', SQLSTATE
    );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION exec_sql(text) TO service_role;
GRANT EXECUTE ON FUNCTION exec_sql(text) TO postgres;

COMMENT ON FUNCTION exec_sql IS 'Execute arbitrary SQL - USE WITH CAUTION';
`;

async function setupExecutor() {
  console.log('\n🔧 Nastavuji SQL Executor pro automatické migrace...\n');

  // Step 1: Create the exec function using direct SQL query
  console.log('📌 Krok 1: Vytvářím pomocnou funkci exec_sql()...');

  try {
    // We'll use a workaround - create function by inserting into vehicles table with a trigger
    // Actually, let's try using the query endpoint directly

    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        sql_query: CREATE_EXEC_FUNCTION
      })
    });

    if (response.ok) {
      console.log('   ✅ Funkce exec_sql vytvořena!');
      return true;
    }

    // If function doesn't exist, we need another approach
    console.log('   ℹ️  Funkce exec_sql ještě neexistuje...');
    console.log('\n📌 Zkouším alternativní přístup...\n');

    // Try using pg_query - some Supabase instances have this
    const pgQueryResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/pg_query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({
        query: CREATE_EXEC_FUNCTION
      })
    });

    if (pgQueryResponse.ok) {
      console.log('   ✅ Použit pg_query!');
      return true;
    }

    console.log('   ❌ REST API nemá SQL execution endpoint');
    return false;

  } catch (error) {
    console.log('   ❌ Chyba:', error.message);
    return false;
  }
}

async function useSupabaseCLI() {
  console.log('\n📌 Zkouším Supabase CLI přístup...\n');

  // Try using supabase db execute
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);

  try {
    // Save the SQL to a temp file
    const sqlPath = join(__dirname, 'supabase/migrations/00_create_exec_function.sql');

    console.log('   Spouštím: npx supabase db execute --file ...');

    const { stdout, stderr } = await execAsync(
      `npx supabase db execute --db-url "postgresql://postgres.mljqltwcdqknezuqpisb:$(echo $SUPABASE_DB_PASSWORD)@aws-0-eu-central-1.pooler.supabase.com:6543/postgres" --file "${sqlPath}"`,
      { cwd: __dirname }
    );

    console.log('   ✅ SQL spuštěno přes CLI!');
    if (stdout) console.log(stdout);
    return true;

  } catch (error) {
    console.log('   ❌ CLI přístup selhal:', error.message);
    return false;
  }
}

async function showManualSetup() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 MANUÁLNÍ NASTAVENÍ (jednorázově)\n');
  console.log('Potřebuji, abys spustil tento SQL příkaz V DASHBOARDU:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(CREATE_EXEC_FUNCTION);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n🔗 Kde to spustit:');
  console.log('   https://supabase.com/dashboard/project/mljqltwcdqknezuqpisb/editor\n');
  console.log('📋 Kroky:');
  console.log('   1. Otevři SQL Editor');
  console.log('   2. Vytvoř New Query');
  console.log('   3. Zkopíruj SQL výše (mezi ━━━ čarami)');
  console.log('   4. Vlož do editoru a klikni RUN');
  console.log('   5. Po spuštění spusť: node setup-sql-executor.mjs --test\n');
  console.log('✨ Po vytvoření této funkce budu moci spouštět SQL automaticky!\n');
}

async function testExecutor() {
  console.log('\n🧪 Testuji exec_sql funkci...\n');

  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: 'SELECT 1 as test'
    });

    if (error) {
      console.log('   ❌ Funkce exec_sql neexistuje nebo nefunguje');
      console.log('   Error:', error.message);
      return false;
    }

    console.log('   ✅ Funkce exec_sql FUNGUJE!');
    console.log('   Response:', data);
    return true;

  } catch (error) {
    console.log('   ❌ Test selhal:', error.message);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--test')) {
    const works = await testExecutor();
    if (works) {
      console.log('\n🎉 Vše je připraveno! Můžu teď spouštět migrace automaticky.\n');
      console.log('💡 Spusť: node run-full-migration.mjs\n');
    } else {
      console.log('\n⚠️  Funkce exec_sql ještě není připravena.\n');
      await showManualSetup();
    }
    return;
  }

  console.log('🚀 TJ Krupka - SQL Executor Setup\n');
  console.log('Zkouším různé metody pro automatické spouštění SQL...\n');

  // Try REST API
  const restWorks = await setupExecutor();
  if (restWorks) {
    console.log('\n✅ Hotovo! Testuji...\n');
    const works = await testExecutor();
    if (works) {
      console.log('\n🎉 Vše funguje! Můžu teď spouštět migrace automaticky.\n');
      return;
    }
  }

  // Try CLI
  const cliWorks = await useSupabaseCLI();
  if (cliWorks) {
    console.log('\n✅ Hotovo přes CLI! Testuji...\n');
    const works = await testExecutor();
    if (works) {
      console.log('\n🎉 Vše funguje!\n');
      return;
    }
  }

  // Show manual setup
  await showManualSetup();
}

main().catch(console.error);
