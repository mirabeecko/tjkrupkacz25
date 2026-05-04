import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedStats() {
  const stats = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    stats.push({
      date: dateStr,
      page_views: Math.floor(Math.random() * 500) + 100,
      sessions: Math.floor(Math.random() * 200) + 50,
      active_users: Math.floor(Math.random() * 150) + 30,
      average_session_duration: Math.random() * 300,
      bounce_rate: Math.floor(Math.random() * 40) + 20
    });
  }

  console.log(`Inserting ${stats.length} rows...`);
  
  const { error } = await supabase
    .from('site_statistics')
    .upsert(stats, { onConflict: 'date' });

  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Successfully seeded statistics data!');
  }
}

seedStats();
