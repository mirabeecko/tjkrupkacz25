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

async function runMigration() {
  console.log('\n📦 TJ Krupka - Database Migration Tool\n');
  console.log('⚠️  This migration will:');
  console.log('   - DROP all existing tjkshop_* tables');
  console.log('   - CREATE new tables with tjkshop_ prefix');
  console.log('   - Add sample data for products, services, and tickets\n');

  const sqlPath = join(__dirname, 'supabase/migrations/20250127100000_complete_booking_system.sql');
  console.log('📄 Reading SQL file:', sqlPath);

  const sqlContent = readFileSync(sqlPath, 'utf8');

  console.log('\n❌ Cannot execute SQL directly via REST API.');
  console.log('\n✅ Please run the migration manually:');
  console.log('\n1. Go to: https://supabase.com/dashboard/project/mljqltwcdqknezuqpisb/editor');
  console.log('2. Click "New Query"');
  console.log('3. Copy and paste the contents from:');
  console.log(`   ${sqlPath}`);
  console.log('4. Click "Run" button\n');

  console.log('📋 Or use this command if you have psql installed:');
  console.log('   psql "postgresql://postgres:[PASSWORD]@db.mljqltwcdqknezuqpisb.supabase.co:5432/postgres" -f supabase/migrations/20250127100000_complete_booking_system.sql\n');
}

runMigration();
