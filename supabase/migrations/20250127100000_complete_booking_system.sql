-- ============================================
-- KOMPLETNÍ SYSTÉM PRO REZERVACE A E-SHOP
-- ============================================
-- Tento skript vytváří/aktualizuje všechny potřebné tabulky
-- pro rezervace vozidel, kite vybavení, jízdenek a e-shop

-- ============================================
-- 1. SMAZÁNÍ STARÝCH TABULEK (pokud existují)
-- ============================================

DROP TABLE IF EXISTS rental_bookings CASCADE;
DROP TABLE IF EXISTS tjkshop_discount_usage CASCADE;
DROP TABLE IF EXISTS tjkshop_discount_codes CASCADE;
DROP TABLE IF EXISTS tjkshop_tickets CASCADE;
DROP TABLE IF EXISTS tjkshop_memberships CASCADE;
DROP TABLE IF EXISTS tjkshop_payments CASCADE;
DROP TABLE IF EXISTS tjkshop_order_items CASCADE;
DROP TABLE IF EXISTS tjkshop_orders CASCADE;
DROP TABLE IF EXISTS tjkshop_cart_items CASCADE;
DROP TABLE IF EXISTS tjkshop_cart CASCADE;
DROP TABLE IF EXISTS tjkshop_variants CASCADE;
DROP TABLE IF EXISTS tjkshop_categories CASCADE;
DROP TABLE IF EXISTS tjkshop_products CASCADE;
DROP TABLE IF EXISTS tjkshop_bookings CASCADE;

-- Smazání funkcí
DROP FUNCTION IF EXISTS tjkshop_update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS tjkshop_generate_order_number CASCADE;
DROP FUNCTION IF EXISTS tjkshop_set_order_number CASCADE;
DROP FUNCTION IF EXISTS tjkshop_generate_ticket_code CASCADE;
DROP FUNCTION IF EXISTS tjkshop_set_ticket_code CASCADE;
DROP FUNCTION IF EXISTS tjkshop_generate_booking_number CASCADE;
DROP FUNCTION IF EXISTS tjkshop_set_booking_number CASCADE;

-- ============================================
-- 2. PRODUKTY (Merch + fyzické produkty)
-- ============================================

CREATE TABLE tjkshop_products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,

  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),

  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,

  -- Typy produktů: 'merch' (trička, mikiny), 'accessory' (láhve, tašky), 'gift' (dárkové balíčky)
  product_type TEXT NOT NULL DEFAULT 'merch',

  -- Typ: 'physical' (fyzické), 'digital' (e-book, pdf)
  type TEXT DEFAULT 'physical',

  images JSONB DEFAULT '[]'::jsonb,
  attributes JSONB DEFAULT '{}'::jsonb, -- {"sizes": ["S","M","L"], "colors": ["red","blue"]}
  metadata JSONB DEFAULT '{}'::jsonb,

  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tjkshop_products_product_type ON tjkshop_products(product_type);
CREATE INDEX idx_tjkshop_products_slug ON tjkshop_products(slug);
CREATE INDEX idx_tjkshop_products_is_active ON tjkshop_products(is_active);
CREATE INDEX idx_tjkshop_products_featured ON tjkshop_products(featured);

COMMENT ON TABLE tjkshop_products IS 'Fyzické produkty - merch (trička, mikiny), doplňky, dárky';
COMMENT ON COLUMN tjkshop_products.product_type IS 'Typ: merch, accessory, gift';

-- ============================================
-- 3. SLUŽBY (Kurzy, teambuildingu, lekce)
-- ============================================

CREATE TABLE tjkshop_services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,

  price DECIMAL(10, 2) NOT NULL,

  -- Typ služby: 'course' (kurz), 'lesson' (lekce), 'teambuilding', 'guided_tour'
  service_type TEXT NOT NULL,

  duration_hours INTEGER, -- Délka v hodinách
  capacity_min INTEGER,   -- Minimální počet osob
  capacity_max INTEGER,   -- Maximální počet osob

  images JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,

  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tjkshop_services_service_type ON tjkshop_services(service_type);
CREATE INDEX idx_tjkshop_services_slug ON tjkshop_services(slug);
CREATE INDEX idx_tjkshop_services_is_active ON tjkshop_services(is_active);

COMMENT ON TABLE tjkshop_services IS 'Služby - kurzy snowkitingu, lekce, teambuilding';

-- ============================================
-- 4. JÍZDENKY (Skipasy, vstupné)
-- ============================================

CREATE TABLE tjkshop_ticket_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,

  price DECIMAL(10, 2) NOT NULL,

  -- Typ: 'skipass', 'lift_ticket', 'entrance', 'parking'
  ticket_type TEXT NOT NULL,

  validity_days INTEGER NOT NULL DEFAULT 1, -- Počet dní platnosti
  validity_hours INTEGER, -- Nebo hodin (pro půldenní)

  images JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,

  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tjkshop_ticket_types_ticket_type ON tjkshop_ticket_types(ticket_type);
CREATE INDEX idx_tjkshop_ticket_types_slug ON tjkshop_ticket_types(slug);
CREATE INDEX idx_tjkshop_ticket_types_is_active ON tjkshop_ticket_types(is_active);

COMMENT ON TABLE tjkshop_ticket_types IS 'Typy jízdenek - skipasy, vstupné, parkovné';

-- ============================================
-- 5. REZERVACE (Vozidla, Kite vybavení, Služby)
-- ============================================

CREATE TABLE tjkshop_bookings (
  id SERIAL PRIMARY KEY,
  booking_number TEXT UNIQUE NOT NULL,

  -- Polymorfní reference - co se rezervuje
  booking_type TEXT NOT NULL, -- 'vehicle', 'service', 'other'
  reference_table TEXT NOT NULL, -- 'vehicles', 'tjkshop_services'
  reference_id INTEGER NOT NULL, -- ID v příslušné tabulce
  reference_name TEXT NOT NULL, -- Název pro historii

  -- Zákazník
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  driving_license_number TEXT, -- Pro vozidla

  -- Rezervační detaily
  booking_start_date DATE NOT NULL,
  booking_end_date DATE NOT NULL,
  booking_duration_days INTEGER GENERATED ALWAYS AS (booking_end_date - booking_start_date + 1) STORED,

  quantity INTEGER DEFAULT 1, -- Počet kusů (pro vybavení)

  -- Doplňkové služby
  extras JSONB DEFAULT '{}'::jsonb, -- {"helmet": true, "gear": true}

  -- Ceny
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  deposit_amount DECIMAL(10, 2) DEFAULT 0, -- Kauce

  -- Stav
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'paid', 'completed', 'cancelled'
  payment_status TEXT DEFAULT 'unpaid', -- 'unpaid', 'deposit_paid', 'paid', 'refunded'

  -- Poznámky
  customer_message TEXT,
  admin_notes TEXT,

  -- GDPR
  gdpr_consent BOOLEAN DEFAULT true NOT NULL,

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,

  CONSTRAINT valid_booking_dates CHECK (booking_end_date >= booking_start_date),
  CONSTRAINT valid_quantity CHECK (quantity > 0)
);

CREATE INDEX idx_tjkshop_bookings_booking_type ON tjkshop_bookings(booking_type);
CREATE INDEX idx_tjkshop_bookings_reference ON tjkshop_bookings(reference_table, reference_id);
CREATE INDEX idx_tjkshop_bookings_email ON tjkshop_bookings(customer_email);
CREATE INDEX idx_tjkshop_bookings_status ON tjkshop_bookings(status);
CREATE INDEX idx_tjkshop_bookings_payment_status ON tjkshop_bookings(payment_status);
CREATE INDEX idx_tjkshop_bookings_dates ON tjkshop_bookings(booking_start_date, booking_end_date);
CREATE INDEX idx_tjkshop_bookings_booking_number ON tjkshop_bookings(booking_number);

COMMENT ON TABLE tjkshop_bookings IS 'Všechny rezervace - vozidla, kite vybavení, služby';

-- ============================================
-- 6. E-SHOP OBJEDNÁVKY
-- ============================================

CREATE TABLE tjkshop_orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Kontakt
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,

  -- Dodací adresa
  shipping_address_line1 TEXT,
  shipping_address_line2 TEXT,
  shipping_city TEXT,
  shipping_postal_code TEXT,
  shipping_country TEXT DEFAULT 'CZ',

  -- Fakturační adresa
  billing_address_line1 TEXT,
  billing_address_line2 TEXT,
  billing_city TEXT,
  billing_postal_code TEXT,
  billing_country TEXT DEFAULT 'CZ',
  billing_company TEXT,
  billing_ico TEXT,
  billing_dic TEXT,

  -- Ceny
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,

  -- Stav
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'unpaid',
  payment_method TEXT,

  -- Poznámky
  customer_note TEXT,
  admin_note TEXT,

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

CREATE INDEX idx_tjkshop_orders_user_id ON tjkshop_orders(user_id);
CREATE INDEX idx_tjkshop_orders_status ON tjkshop_orders(status);
CREATE INDEX idx_tjkshop_orders_payment_status ON tjkshop_orders(payment_status);
CREATE INDEX idx_tjkshop_orders_order_number ON tjkshop_orders(order_number);
CREATE INDEX idx_tjkshop_orders_email ON tjkshop_orders(email);

COMMENT ON TABLE tjkshop_orders IS 'E-shop objednávky fyzických produktů';

-- ============================================
-- 7. POLOŽKY OBJEDNÁVKY
-- ============================================

CREATE TABLE tjkshop_order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES tjkshop_orders(id) ON DELETE CASCADE,

  -- Polymorfní reference - může být produkt, služba, jízdenka
  item_type TEXT NOT NULL, -- 'product', 'service', 'ticket'
  item_id INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  item_sku TEXT,
  variant_info JSONB, -- {"size": "M", "color": "red"}

  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,

  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tjkshop_order_items_order_id ON tjkshop_order_items(order_id);
CREATE INDEX idx_tjkshop_order_items_item ON tjkshop_order_items(item_type, item_id);

COMMENT ON TABLE tjkshop_order_items IS 'Položky v objednávkách';

-- ============================================
-- 8. PLATBY
-- ============================================

CREATE TABLE tjkshop_payments (
  id SERIAL PRIMARY KEY,

  -- Reference na objednávku NEBO rezervaci
  order_id INTEGER REFERENCES tjkshop_orders(id) ON DELETE CASCADE,
  booking_id INTEGER REFERENCES tjkshop_bookings(id) ON DELETE CASCADE,

  payment_method TEXT NOT NULL,
  payment_gateway TEXT,

  -- IDs z platebních bran
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  comgate_transaction_id TEXT,
  comgate_ref_id TEXT,

  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'CZK',

  status TEXT DEFAULT 'pending',

  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  failed_reason TEXT,

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT payment_reference_check CHECK (
    (order_id IS NOT NULL AND booking_id IS NULL) OR
    (order_id IS NULL AND booking_id IS NOT NULL)
  )
);

CREATE INDEX idx_tjkshop_payments_order_id ON tjkshop_payments(order_id);
CREATE INDEX idx_tjkshop_payments_booking_id ON tjkshop_payments(booking_id);
CREATE INDEX idx_tjkshop_payments_status ON tjkshop_payments(status);
CREATE INDEX idx_tjkshop_payments_payment_method ON tjkshop_payments(payment_method);

COMMENT ON TABLE tjkshop_payments IS 'Platby pro objednávky a rezervace';

-- ============================================
-- 9. VYDANÉ VSTUPENKY
-- ============================================

CREATE TABLE tjkshop_issued_tickets (
  id SERIAL PRIMARY KEY,
  ticket_type_id INTEGER REFERENCES tjkshop_ticket_types(id) ON DELETE SET NULL,
  order_id INTEGER REFERENCES tjkshop_orders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  ticket_code TEXT UNIQUE NOT NULL,
  ticket_name TEXT NOT NULL,

  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,

  status TEXT DEFAULT 'valid', -- 'valid', 'used', 'expired', 'cancelled'

  used_at TIMESTAMPTZ,
  used_by TEXT, -- Jméno kontrolora

  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tjkshop_issued_tickets_ticket_code ON tjkshop_issued_tickets(ticket_code);
CREATE INDEX idx_tjkshop_issued_tickets_status ON tjkshop_issued_tickets(status);
CREATE INDEX idx_tjkshop_issued_tickets_user_id ON tjkshop_issued_tickets(user_id);
CREATE INDEX idx_tjkshop_issued_tickets_valid_dates ON tjkshop_issued_tickets(valid_from, valid_until);

COMMENT ON TABLE tjkshop_issued_tickets IS 'Vydané vstupenky zákazníkům';

-- ============================================
-- 10. ČLENSTVÍ
-- ============================================

CREATE TABLE tjkshop_memberships (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  membership_type TEXT NOT NULL, -- 'basic', 'premium', 'vip'
  status TEXT DEFAULT 'active',

  start_date DATE NOT NULL,
  end_date DATE NOT NULL,

  auto_renew BOOLEAN DEFAULT false,
  price DECIMAL(10, 2) NOT NULL,

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tjkshop_memberships_user_id ON tjkshop_memberships(user_id);
CREATE INDEX idx_tjkshop_memberships_status ON tjkshop_memberships(status);

COMMENT ON TABLE tjkshop_memberships IS 'Členství v TJ Krupka';

-- ============================================
-- 11. KOŠÍK
-- ============================================

CREATE TABLE tjkshop_cart (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tjkshop_cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER NOT NULL REFERENCES tjkshop_cart(id) ON DELETE CASCADE,

  item_type TEXT NOT NULL, -- 'product', 'service', 'ticket'
  item_id INTEGER NOT NULL,

  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  variant_info JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tjkshop_cart_user_id ON tjkshop_cart(user_id);
CREATE INDEX idx_tjkshop_cart_session_id ON tjkshop_cart(session_id);
CREATE INDEX idx_tjkshop_cart_items_cart_id ON tjkshop_cart_items(cart_id);

-- ============================================
-- 12. SLEVOVÉ KÓDY
-- ============================================

CREATE TABLE tjkshop_discount_codes (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  description TEXT,

  discount_type TEXT NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL,

  min_purchase_amount DECIMAL(10, 2),
  max_discount_amount DECIMAL(10, 2),

  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  per_user_limit INTEGER,

  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,

  is_active BOOLEAN DEFAULT true,

  applicable_types TEXT[], -- ['product', 'service', 'ticket']

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tjkshop_discount_codes_code ON tjkshop_discount_codes(code);
CREATE INDEX idx_tjkshop_discount_codes_is_active ON tjkshop_discount_codes(is_active);

-- ============================================
-- FUNKCE A TRIGGERY
-- ============================================

-- Funkce pro automatickou aktualizaci updated_at
CREATE OR REPLACE FUNCTION tjkshop_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggery pro updated_at
CREATE TRIGGER update_tjkshop_products_updated_at BEFORE UPDATE ON tjkshop_products
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER update_tjkshop_services_updated_at BEFORE UPDATE ON tjkshop_services
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER update_tjkshop_ticket_types_updated_at BEFORE UPDATE ON tjkshop_ticket_types
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER update_tjkshop_bookings_updated_at BEFORE UPDATE ON tjkshop_bookings
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER update_tjkshop_orders_updated_at BEFORE UPDATE ON tjkshop_orders
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER update_tjkshop_payments_updated_at BEFORE UPDATE ON tjkshop_payments
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER update_tjkshop_cart_updated_at BEFORE UPDATE ON tjkshop_cart
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER update_tjkshop_cart_items_updated_at BEFORE UPDATE ON tjkshop_cart_items
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

-- Funkce pro generování booking number
CREATE OR REPLACE FUNCTION tjkshop_generate_booking_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  year_prefix TEXT;
  max_number INTEGER;
BEGIN
  year_prefix := 'B' || TO_CHAR(NOW(), 'YY');

  SELECT COALESCE(MAX(
    CASE
      WHEN booking_number ~ ('^' || year_prefix || '[0-9]+$')
      THEN CAST(SUBSTRING(booking_number FROM 4) AS INTEGER)
      ELSE 0
    END
  ), 0) INTO max_number
  FROM tjkshop_bookings
  WHERE booking_number LIKE year_prefix || '%';

  new_number := year_prefix || LPAD((max_number + 1)::TEXT, 6, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION tjkshop_set_booking_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_number IS NULL OR NEW.booking_number = '' THEN
    NEW.booking_number := tjkshop_generate_booking_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_booking_number_trigger
BEFORE INSERT ON tjkshop_bookings
FOR EACH ROW
EXECUTE FUNCTION tjkshop_set_booking_number();

-- Funkce pro generování order number
CREATE OR REPLACE FUNCTION tjkshop_generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  year_prefix TEXT;
  max_number INTEGER;
BEGIN
  year_prefix := TO_CHAR(NOW(), 'YY');

  SELECT COALESCE(MAX(
    CASE
      WHEN order_number ~ ('^' || year_prefix || '[0-9]+$')
      THEN CAST(SUBSTRING(order_number FROM 3) AS INTEGER)
      ELSE 0
    END
  ), 0) INTO max_number
  FROM tjkshop_orders
  WHERE order_number LIKE year_prefix || '%';

  new_number := year_prefix || LPAD((max_number + 1)::TEXT, 6, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION tjkshop_set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := tjkshop_generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number_trigger
BEFORE INSERT ON tjkshop_orders
FOR EACH ROW
EXECUTE FUNCTION tjkshop_set_order_number();

-- Funkce pro generování ticket code
CREATE OR REPLACE FUNCTION tjkshop_generate_ticket_code()
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    new_code := 'TJK-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    SELECT EXISTS(SELECT 1 FROM tjkshop_issued_tickets WHERE ticket_code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
  END LOOP;
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION tjkshop_set_ticket_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ticket_code IS NULL OR NEW.ticket_code = '' THEN
    NEW.ticket_code := tjkshop_generate_ticket_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_ticket_code_trigger
BEFORE INSERT ON tjkshop_issued_tickets
FOR EACH ROW
EXECUTE FUNCTION tjkshop_set_ticket_code();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE tjkshop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_issued_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_cart_items ENABLE ROW LEVEL SECURITY;

-- Veřejné čtení aktivních produktů/služeb/jízdenek
CREATE POLICY "Public read active products" ON tjkshop_products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active services" ON tjkshop_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active ticket types" ON tjkshop_ticket_types FOR SELECT USING (is_active = true);

-- Rezervace - kdokoli může vytvořit, vidí jen své
CREATE POLICY "Anyone can create booking" ON tjkshop_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users see own bookings" ON tjkshop_bookings FOR SELECT USING (customer_email = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin');

-- Objednávky - uživatel vidí jen své
CREATE POLICY "Users see own orders" ON tjkshop_orders FOR SELECT USING (user_id = auth.uid() OR email = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin');

-- Košík - uživatel vidí jen svůj
CREATE POLICY "Users manage own cart" ON tjkshop_cart FOR ALL USING (user_id = auth.uid() OR session_id IS NOT NULL);
CREATE POLICY "Users manage own cart items" ON tjkshop_cart_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM tjkshop_cart
    WHERE tjkshop_cart.id = tjkshop_cart_items.cart_id
    AND (tjkshop_cart.user_id = auth.uid() OR tjkshop_cart.session_id IS NOT NULL)
  )
);

-- Vstupenky - uživatel vidí jen své
CREATE POLICY "Users see own tickets" ON tjkshop_issued_tickets FOR SELECT USING (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

-- Členství - uživatel vidí jen své
CREATE POLICY "Users see own memberships" ON tjkshop_memberships FOR SELECT USING (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- UKÁZKOVÁ DATA
-- ============================================

-- Produkty (Merch)
INSERT INTO tjkshop_products (name, slug, short_description, description, price, product_type, type, stock_quantity, is_active, featured, images)
VALUES
  ('TJ Krupka Tričko', 'tj-krupka-tricko', 'Kvalitní bavlněné tričko s logem', 'Bavlněné tričko s logem TJ Krupka. Dostupné ve velikostech S, M, L, XL, XXL. Vyrobeno z kvalitní 100% bavlny.', 399.00, 'merch', 'physical', 50, true, true, '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"]'),
  ('TJ Krupka Mikina', 'tj-krupka-mikina', 'Komfortní mikina s kapucí', 'Teplá mikina s kapucí a logem klubu. Ideální pro chladné dny v horách.', 899.00, 'merch', 'physical', 30, true, true, '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"]'),
  ('Láhev na vodu TJ Krupka', 'lahev-na-vodu', 'Praktická sportovní láhev', 'Sportovní láhev na vodu s logem TJ Krupka. Objem 750ml, bez BPA.', 199.00, 'accessory', 'physical', 60, true, false, '["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"]')
ON CONFLICT (slug) DO NOTHING;

-- Služby
INSERT INTO tjkshop_services (name, slug, short_description, description, price, service_type, duration_hours, capacity_min, capacity_max, is_active, featured)
VALUES
  ('Kurz snowkitingu - začátečníci', 'kurz-snowkitingu-zacatecnici', 'Naučte se snowkiting za 2 dny', 'Dvoudenní kurz snowkitingu pro začátečníky. Zahrnuje zapůjčení vybavení, instruktora a osvědčení.', 3500.00, 'course', 16, 2, 6, true, true),
  ('Privátní lekce snowkitingu', 'privatni-lekce-snowkitingu', 'Individuální lekce s instruktorem', 'Hodinová privátní lekce snowkitingu s kvalifikovaným instruktorem. Vhodné pro všechny úrovně.', 1200.00, 'lesson', 1, 1, 1, true, false),
  ('Teambuilding program', 'teambuilding-program', 'Firemní teambuilding v horách', 'Celodenní teambuilding program pro firmy. Zahrnuje aktivity, catering a instruktory.', 8500.00, 'teambuilding', 8, 10, 30, true, true)
ON CONFLICT (slug) DO NOTHING;

-- Jízdenky
INSERT INTO tjkshop_ticket_types (name, slug, short_description, description, price, ticket_type, validity_days, is_active, featured)
VALUES
  ('Celodenní skipas', 'celodenny-skipas', 'Neomezené jízdy po celý den', 'Celodenní jízdenka na všechny vleky v areálu Komáří vížka. Platnost od otevření do zavření areálu.', 350.00, 'skipass', 1, true, true),
  ('Půldenní skipas', 'puldenny-skipas', 'Jízdenka od poledne', 'Půldenní jízdenka na vleky (platnost od 12:00 do zavření).', 250.00, 'skipass', 1, true, false),
  ('Týdenní skipas', 'tydenni-skipas', '7denní neomezené jízdy', 'Týdenní skipas s platností 7 po sobě jdoucích dnů.', 1800.00, 'skipass', 7, true, true)
ON CONFLICT (slug) DO NOTHING;
