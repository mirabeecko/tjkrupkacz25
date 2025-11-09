const fs = require('fs');
const path = require('path');
const https = require('https');

const supabaseUrl = 'https://mljqltwcdqknezuqpisb.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sanFsdHdjZHFrbmV6dXFwaXNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTMxMzM1OCwiZXhwIjoyMDYwODg5MzU4fQ.iYpjbfCw2Gd65n3EfJTHYcz7iNjpkazMWJpg3BJPXv0';

async function executeSql(sql) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ query: sql });

    const options = {
      hostname: 'mljqltwcdqknezuqpisb.supabase.co',
      port: 443,
      path: '/rest/v1/rpc/exec',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function runMigration() {
  try {
    console.log('Reading SQL migration file...');
    const sqlPath = path.join(__dirname, 'supabase/migrations/20250127100000_complete_booking_system.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing SQL migration...');
    console.log('This will drop and recreate all tjkshop_* tables...\n');

    try {
      await executeSql(sqlContent);
      console.log('\n✅ Migration completed successfully!');
    } catch (error) {
      console.error('\n❌ Migration failed:', error.message);

      // Try using Supabase Management API instead
      console.log('\nTrying alternative method...');
      console.log('Please run this SQL manually in Supabase Dashboard:');
      console.log('Go to: https://supabase.com/dashboard/project/mljqltwcdqknezuqpisb/editor');
      console.log('Then copy and paste the contents of:');
      console.log(sqlPath);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

runMigration();
