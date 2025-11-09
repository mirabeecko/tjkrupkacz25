import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mljqltwcdqknezuqpisb.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sanFsdHdjZHFrbmV6dXFwaXNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTMxMzM1OCwiZXhwIjoyMDYwODg5MzU4fQ.iYpjbfCw2Gd65n3EfJTHYcz7iNjpkazMWJpg3BJPXv0';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const sql = `
-- Add category column to vehicles table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'vehicles' AND column_name = 'category') THEN
    ALTER TABLE vehicles ADD COLUMN category VARCHAR(50) DEFAULT 'motorcycle';
    CREATE INDEX idx_vehicles_category ON vehicles(category);

    COMMENT ON COLUMN vehicles.category IS 'Vehicle category: motorcycle, car, kite, work';

    -- Update existing vehicles to set appropriate categories
    UPDATE vehicles SET category = 'motorcycle'
    WHERE brand IN ('KTM', 'Honda', 'Yamaha', 'Suzuki', 'Husqvarna', 'Beta', 'GasGas', 'Kawasaki')
    AND category = 'motorcycle';

    UPDATE vehicles SET category = 'kite'
    WHERE brand IN ('Flysurfer', 'Dakine') OR model LIKE '%Trapéz%';
  END IF;
END $$;
`;

async function addCategoryColumn() {
  console.log('\n📝 Přidávám sloupec "category" do tabulky vehicles...\n');

  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: sql
    });

    if (error) {
      console.error('❌ Chyba:', error);
      return false;
    }

    console.log('✅ Sloupec "category" úspěšně přidán!\n');
    console.log('   Response:', data);
    return true;

  } catch (err) {
    console.error('❌ Exception:', err);
    return false;
  }
}

addCategoryColumn().then(success => {
  if (success) {
    console.log('\n💡 Teď můžete spustit: node add-work-vehicles.mjs --force\n');
  }
}).catch(console.error);
