import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mljqltwcdqknezuqpisb.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sanFsdHdjZHFrbmV6dXFwaXNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTMxMzM1OCwiZXhwIjoyMDYwODg5MzU4fQ.iYpjbfCw2Gd65n3EfJTHYcz7iNjpkazMWJpg3BJPXv0';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testDatabase() {
  console.log('\n🧪 Testování databázové struktury\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Test 1: Products with product_type
  console.log('📦 Test 1: Produkty s product_type\n');
  const { data: products, error: prodError } = await supabase
    .from('tjkshop_products')
    .select('*');

  if (prodError) {
    console.log('   ❌ Chyba:', prodError.message);
  } else {
    console.log(`   ✅ Načteno ${products.length} produktů`);
    products.forEach(p => {
      console.log(`      • ${p.name} - typ: ${p.product_type}, cena: ${p.price} Kč`);
    });
  }

  // Test 2: Services
  console.log('\n🎓 Test 2: Služby\n');
  const { data: services, error: servError } = await supabase
    .from('tjkshop_services')
    .select('*');

  if (servError) {
    console.log('   ❌ Chyba:', servError.message);
  } else {
    console.log(`   ✅ Načteno ${services.length} služeb`);
    services.forEach(s => {
      console.log(`      • ${s.name} - typ: ${s.service_type}, cena: ${s.price} Kč, ${s.duration_hours}h`);
    });
  }

  // Test 3: Ticket types
  console.log('\n🎫 Test 3: Typy jízdenek\n');
  const { data: tickets, error: tickError } = await supabase
    .from('tjkshop_ticket_types')
    .select('*');

  if (tickError) {
    console.log('   ❌ Chyba:', tickError.message);
  } else {
    console.log(`   ✅ Načteno ${tickets.length} typů jízdenek`);
    tickets.forEach(t => {
      console.log(`      • ${t.name} - typ: ${t.ticket_type}, cena: ${t.price} Kč, platnost: ${t.validity_days} dní`);
    });
  }

  // Test 4: Create test booking
  console.log('\n📅 Test 4: Vytvoření testovací rezervace\n');

  // Get a vehicle first
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .limit(1);

  if (vehicles && vehicles.length > 0) {
    const vehicle = vehicles[0];

    const { data: booking, error: bookingError } = await supabase
      .from('tjkshop_bookings')
      .insert({
        booking_type: 'vehicle',
        reference_table: 'vehicles',
        reference_id: vehicle.id,
        reference_name: `${vehicle.brand} ${vehicle.model}`,
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_phone: '+420123456789',
        booking_start_date: '2025-02-01',
        booking_end_date: '2025-02-03',
        quantity: 1,
        unit_price: vehicle.day_price_czk || 1000,
        total_price: (vehicle.day_price_czk || 1000) * 3,
        status: 'pending',
        payment_status: 'unpaid'
      })
      .select()
      .single();

    if (bookingError) {
      console.log('   ❌ Chyba při vytváření rezervace:', bookingError.message);
    } else {
      console.log('   ✅ Rezervace vytvořena!');
      console.log(`      • Booking number: ${booking.booking_number}`);
      console.log(`      • Vozidlo: ${booking.reference_name}`);
      console.log(`      • Termín: ${booking.booking_start_date} - ${booking.booking_end_date}`);
      console.log(`      • Celková cena: ${booking.total_price} Kč`);

      // Clean up test booking
      await supabase.from('tjkshop_bookings').delete().eq('id', booking.id);
      console.log('      • Testovací rezervace smazána');
    }
  } else {
    console.log('   ⚠️  Žádná vozidla v databázi pro test');
  }

  // Test 5: Check vehicles with category
  console.log('\n🏍️  Test 5: Vozidla s kategoriemi\n');
  const { data: vehicleCategories } = await supabase
    .from('vehicles')
    .select('brand, model, category')
    .limit(5);

  if (vehicleCategories) {
    const grouped = vehicleCategories.reduce((acc, v) => {
      acc[v.category] = (acc[v.category] || 0) + 1;
      return acc;
    }, {});

    console.log('   ✅ Kategorie vozidel:');
    Object.entries(grouped).forEach(([cat, count]) => {
      console.log(`      • ${cat}: ${count} kusů`);
    });
  }

  // Test 6: Check triggers (booking_number generation)
  console.log('\n⚙️  Test 6: Automatické generování booking_number\n');
  const { data: testBooking, error: triggerError } = await supabase
    .from('tjkshop_bookings')
    .insert({
      booking_type: 'other',
      reference_table: 'test',
      reference_id: 1,
      reference_name: 'Test Item',
      customer_name: 'Trigger Test',
      customer_email: 'trigger@test.com',
      customer_phone: '+420999999999',
      booking_start_date: '2025-03-01',
      booking_end_date: '2025-03-01',
      quantity: 1,
      unit_price: 100,
      total_price: 100
    })
    .select()
    .single();

  if (triggerError) {
    console.log('   ❌ Chyba:', triggerError.message);
  } else {
    console.log('   ✅ Booking number automaticky vygenerováno!');
    console.log(`      • Booking number: ${testBooking.booking_number}`);
    console.log(`      • Format: ${testBooking.booking_number.match(/^B\d{8}$/) ? 'Správný (B + 8 číslic)' : 'CHYBNÝ'}`);

    // Clean up
    await supabase.from('tjkshop_bookings').delete().eq('id', testBooking.id);
    console.log('      • Test data smazána');
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✅ Všechny testy dokončeny!\n');
  console.log('📊 Shrnutí struktury:\n');
  console.log('   • tjkshop_products: Merch (trička, mikiny) + accessories');
  console.log('   • tjkshop_services: Kurzy, lekce, teambuilding');
  console.log('   • tjkshop_ticket_types: Skipasy, vstupné');
  console.log('   • tjkshop_bookings: Polymorfní rezervace (vozidla + služby)');
  console.log('   • tjkshop_orders + order_items: E-shop objednávky');
  console.log('   • tjkshop_payments: Platby pro orders i bookings');
  console.log('   • Automatické generování booking_number, order_number');
  console.log('   • RLS policies pro bezpečnost\n');
}

testDatabase().catch(console.error);
