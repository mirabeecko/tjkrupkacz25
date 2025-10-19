-- ============================================
-- KOMPLETNÍ SQL PŘÍKAZY PRO REZERVAČNÍ SYSTÉM
-- Spusťte tento skript v Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. VYTVOŘENÍ TABULKY PRO REZERVACE
-- ============================================

CREATE TABLE IF NOT EXISTS rental_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Customer information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,

  -- Rental details
  vehicle_id INTEGER REFERENCES vehicles(id),
  vehicle_name TEXT NOT NULL,
  rental_start_date DATE NOT NULL,
  rental_end_date DATE NOT NULL,
  rental_duration_days INTEGER GENERATED ALWAYS AS (rental_end_date - rental_start_date) STORED,

  -- Additional options
  helmet_needed BOOLEAN DEFAULT false,
  protective_gear_needed BOOLEAN DEFAULT false,

  -- Pricing
  price_per_day NUMERIC(10,2),
  total_price NUMERIC(10,2),

  -- Additional information
  message TEXT,
  driving_license_number TEXT,

  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  admin_notes TEXT,

  -- GDPR consent
  gdpr_consent BOOLEAN DEFAULT true NOT NULL,

  CONSTRAINT valid_dates CHECK (rental_end_date >= rental_start_date)
);

-- ============================================
-- 2. VYTVOŘENÍ INDEXŮ PRO RYCHLÉ VYHLEDÁVÁNÍ
-- ============================================

CREATE INDEX IF NOT EXISTS idx_rental_bookings_email ON rental_bookings(email);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_status ON rental_bookings(status);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_created_at ON rental_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_vehicle_id ON rental_bookings(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_rental_dates ON rental_bookings(rental_start_date, rental_end_date);

-- ============================================
-- 3. POVOLENÍ ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE rental_bookings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. VYTVOŘENÍ RLS POLITIK
-- ============================================

-- Politika: Kdokoliv může vytvořit rezervaci (pro formulář)
DROP POLICY IF EXISTS "Anyone can create rental booking" ON rental_bookings;
CREATE POLICY "Anyone can create rental booking"
  ON rental_bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Politika: Kdokoliv může číst všechny rezervace (můžete omezit později)
DROP POLICY IF EXISTS "Anyone can view bookings" ON rental_bookings;
CREATE POLICY "Anyone can view bookings"
  ON rental_bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Politika: Pouze autentizovaní uživatelé mohou upravovat rezervace
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON rental_bookings;
CREATE POLICY "Authenticated users can update bookings"
  ON rental_bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 5. KOMENTÁŘE K TABULCE A SLOUPCŮM
-- ============================================

COMMENT ON TABLE rental_bookings IS 'Stores vehicle rental reservations from customers';
COMMENT ON COLUMN rental_bookings.id IS 'Unique identifier for each booking';
COMMENT ON COLUMN rental_bookings.status IS 'Current status: pending, confirmed, cancelled, or completed';
COMMENT ON COLUMN rental_bookings.rental_duration_days IS 'Automatically calculated from start and end dates';

-- ============================================
-- 6. VIEW PRO ADMIN PŘEHLED (VOLITELNÉ)
-- ============================================

CREATE OR REPLACE VIEW admin_bookings_overview AS
SELECT
  rb.id,
  rb.created_at,
  rb.full_name,
  rb.email,
  rb.phone,
  rb.vehicle_name,
  v.brand || ' ' || v.model as vehicle_full_name,
  rb.rental_start_date,
  rb.rental_end_date,
  rb.rental_duration_days,
  rb.total_price,
  rb.status,
  rb.helmet_needed,
  rb.protective_gear_needed,
  rb.message,
  rb.driving_license_number,
  -- Počet dní do zahájení pronájmu
  (rb.rental_start_date - CURRENT_DATE) as days_until_rental
FROM rental_bookings rb
LEFT JOIN vehicles v ON rb.vehicle_id = v.id
ORDER BY rb.created_at DESC;

COMMENT ON VIEW admin_bookings_overview IS 'Admin view with all booking details and vehicle information';

-- ============================================
-- 7. FUNKCE PRO KONTROLU DOSTUPNOSTI VOZIDLA
-- ============================================

CREATE OR REPLACE FUNCTION check_vehicle_availability(
  p_vehicle_id INTEGER,
  p_start_date DATE,
  p_end_date DATE,
  p_exclude_booking_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_conflict_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO v_conflict_count
  FROM rental_bookings
  WHERE vehicle_id = p_vehicle_id
    AND status IN ('pending', 'confirmed')
    AND (p_exclude_booking_id IS NULL OR id != p_exclude_booking_id)
    AND (
      (rental_start_date <= p_end_date AND rental_end_date >= p_start_date)
    );

  RETURN v_conflict_count = 0;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION check_vehicle_availability IS 'Returns true if vehicle is available for the specified date range';

-- ============================================
-- 8. TRIGGER PRO AUTOMATICKOU KONTROLU DOSTUPNOSTI (VOLITELNÉ)
-- ============================================

CREATE OR REPLACE FUNCTION validate_booking_availability()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT check_vehicle_availability(NEW.vehicle_id, NEW.rental_start_date, NEW.rental_end_date, NEW.id) THEN
    RAISE EXCEPTION 'Vehicle is not available for the selected dates';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Vytvoření triggeru
DROP TRIGGER IF EXISTS check_booking_availability ON rental_bookings;
CREATE TRIGGER check_booking_availability
  BEFORE INSERT OR UPDATE ON rental_bookings
  FOR EACH ROW
  WHEN (NEW.status IN ('pending', 'confirmed'))
  EXECUTE FUNCTION validate_booking_availability();

COMMENT ON FUNCTION validate_booking_availability IS 'Validates that vehicle is available before creating/updating booking';

-- ============================================
-- 9. UŽITEČNÉ POHLEDY PRO STATISTIKY
-- ============================================

-- Počet rezervací podle statusu
CREATE OR REPLACE VIEW bookings_by_status AS
SELECT
  status,
  COUNT(*) as count,
  SUM(total_price) as total_revenue
FROM rental_bookings
GROUP BY status;

-- Měsíční statistiky
CREATE OR REPLACE VIEW monthly_booking_stats AS
SELECT
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as total_bookings,
  COUNT(DISTINCT email) as unique_customers,
  SUM(total_price) as total_revenue,
  AVG(rental_duration_days) as avg_duration,
  COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_bookings,
  COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_bookings
FROM rental_bookings
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- Nejoblíbenější vozidla
CREATE OR REPLACE VIEW popular_vehicles AS
SELECT
  vehicle_id,
  vehicle_name,
  COUNT(*) as booking_count,
  SUM(total_price) as total_revenue,
  AVG(rental_duration_days) as avg_rental_days
FROM rental_bookings
WHERE status IN ('confirmed', 'completed')
GROUP BY vehicle_id, vehicle_name
ORDER BY booking_count DESC;

-- ============================================
-- 10. GRANT OPRÁVNĚNÍ
-- ============================================

-- Povolit přístup k tabulce pro anon role (veřejný formulář)
GRANT SELECT, INSERT ON rental_bookings TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- Povolit přístup k tabulce pro authenticated role
GRANT ALL ON rental_bookings TO authenticated;

-- Povolit přístup k views
GRANT SELECT ON admin_bookings_overview TO authenticated;
GRANT SELECT ON bookings_by_status TO authenticated;
GRANT SELECT ON monthly_booking_stats TO authenticated;
GRANT SELECT ON popular_vehicles TO authenticated;

-- ============================================
-- 11. TESTOVACÍ DATA (VOLITELNÉ - ZAKOMENTOVANÉ)
-- ============================================

/*
-- Odkomentujte pro vložení testovacích dat

INSERT INTO rental_bookings (
  full_name,
  email,
  phone,
  vehicle_id,
  vehicle_name,
  rental_start_date,
  rental_end_date,
  helmet_needed,
  protective_gear_needed,
  price_per_day,
  total_price,
  message,
  status,
  gdpr_consent
) VALUES
(
  'Jan Novák',
  'jan.novak@example.com',
  '+420 777 123 456',
  1,
  'KTM Freeride 350',
  CURRENT_DATE + INTERVAL '7 days',
  CURRENT_DATE + INTERVAL '9 days',
  true,
  false,
  80.00,
  160.00,
  'Rád bych vozidlo vyzvedl ráno kolem 9:00',
  'pending',
  true
),
(
  'Marie Svobodová',
  'marie.svobodova@example.com',
  '+420 608 987 654',
  2,
  'KTM Duke 390',
  CURRENT_DATE + INTERVAL '14 days',
  CURRENT_DATE + INTERVAL '17 days',
  false,
  true,
  70.00,
  210.00,
  'Mám zájem o prodloužené víkendové zapůjčení',
  'confirmed',
  true
);
*/

-- ============================================
-- 12. UŽITEČNÉ SELECT DOTAZY
-- ============================================

-- Zobrazit všechny pending rezervace
-- SELECT * FROM rental_bookings WHERE status = 'pending' ORDER BY created_at DESC;

-- Zobrazit nadcházející rezervace (následující 30 dní)
-- SELECT * FROM rental_bookings
-- WHERE rental_start_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
-- ORDER BY rental_start_date;

-- Zobrazit přehled rezervací s detaily vozidel
-- SELECT * FROM admin_bookings_overview LIMIT 20;

-- Statistiky za aktuální měsíc
-- SELECT * FROM monthly_booking_stats
-- WHERE month = DATE_TRUNC('month', CURRENT_DATE);

-- Nejoblíbenější vozidla
-- SELECT * FROM popular_vehicles;

-- Kontrola dostupnosti vozidla (příklad)
-- SELECT check_vehicle_availability(1, '2025-01-20', '2025-01-23');

-- ============================================
-- KONEC SKRIPTU
-- ============================================

-- Pro ověření, že vše funguje správně:
SELECT
  'rental_bookings' as table_name,
  COUNT(*) as row_count
FROM rental_bookings
UNION ALL
SELECT
  'Table created successfully' as table_name,
  1 as row_count
WHERE EXISTS (
  SELECT 1 FROM information_schema.tables
  WHERE table_name = 'rental_bookings'
);
