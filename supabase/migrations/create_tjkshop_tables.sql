-- E-commerce Tables for TJ Krupka with tjkshop_ prefix
-- All tables use SERIAL (auto-increment integer) for compatibility

-- 1. PRODUKTY (Merch, vybavení)
CREATE TABLE IF NOT EXISTS tjkshop_products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  category TEXT, -- 'merch', 'equipment', 'ticket', 'membership'
  type TEXT DEFAULT 'physical', -- 'physical', 'digital', 'service'
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  metadata JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. KATEGORIE PRODUKTŮ
CREATE TABLE IF NOT EXISTS tjkshop_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id INTEGER REFERENCES tjkshop_categories(id) ON DELETE SET NULL,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VARIANTY PRODUKTŮ (velikosti, barvy)
CREATE TABLE IF NOT EXISTS tjkshop_variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES tjkshop_products(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "Velikost M", "Barva červená"
  sku TEXT UNIQUE,
  price DECIMAL(10, 2),
  stock_quantity INTEGER DEFAULT 0,
  attributes JSONB DEFAULT '{}'::jsonb, -- {"size": "M", "color": "red"}
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. KOŠÍK
CREATE TABLE IF NOT EXISTS tjkshop_cart (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT, -- Pro nepřihlášené uživatele
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. POLOŽKY V KOŠÍKU
CREATE TABLE IF NOT EXISTS tjkshop_cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER NOT NULL REFERENCES tjkshop_cart(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES tjkshop_products(id) ON DELETE CASCADE,
  variant_id INTEGER REFERENCES tjkshop_variants(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL, -- Cena v době přidání do košíku
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. OBJEDNÁVKY
CREATE TABLE IF NOT EXISTS tjkshop_orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Kontaktní informace
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

  -- Stav objednávky
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
  payment_status TEXT DEFAULT 'unpaid', -- 'unpaid', 'paid', 'failed', 'refunded'
  payment_method TEXT, -- 'stripe', 'comgate'

  -- Poznámky
  customer_note TEXT,
  admin_note TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

-- 7. POLOŽKY OBJEDNÁVKY
CREATE TABLE IF NOT EXISTS tjkshop_order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES tjkshop_orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES tjkshop_products(id) ON DELETE SET NULL,
  variant_id INTEGER REFERENCES tjkshop_variants(id) ON DELETE SET NULL,

  -- Snapshot produktu v době objednávky
  product_name TEXT NOT NULL,
  product_sku TEXT,
  variant_name TEXT,

  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,

  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PLATBY
CREATE TABLE IF NOT EXISTS tjkshop_payments (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES tjkshop_orders(id) ON DELETE CASCADE,

  payment_method TEXT NOT NULL, -- 'stripe', 'comgate'
  payment_gateway TEXT, -- 'stripe_checkout', 'comgate_gateway'

  -- IDs z platebních bran
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  comgate_transaction_id TEXT,
  comgate_ref_id TEXT,

  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'CZK',

  status TEXT DEFAULT 'pending', -- 'pending', 'succeeded', 'failed', 'cancelled', 'refunded'

  -- Detaily platby
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  failed_reason TEXT,

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ČLENSTVÍ
CREATE TABLE IF NOT EXISTS tjkshop_memberships (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  membership_type TEXT NOT NULL, -- 'basic', 'premium', 'vip'
  status TEXT DEFAULT 'active', -- 'active', 'expired', 'cancelled'

  start_date DATE NOT NULL,
  end_date DATE NOT NULL,

  auto_renew BOOLEAN DEFAULT false,

  -- Ceny
  price DECIMAL(10, 2) NOT NULL,

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. JÍZDENKY A VSTUPENKY
CREATE TABLE IF NOT EXISTS tjkshop_tickets (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES tjkshop_orders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  ticket_type TEXT NOT NULL, -- 'skipass', 'event', 'course'
  ticket_code TEXT UNIQUE NOT NULL, -- QR kód

  product_name TEXT NOT NULL,

  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,

  status TEXT DEFAULT 'valid', -- 'valid', 'used', 'expired', 'cancelled'

  used_at TIMESTAMPTZ,

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. SLEVOVÉ KÓDY
CREATE TABLE IF NOT EXISTS tjkshop_discount_codes (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  description TEXT,

  discount_type TEXT NOT NULL, -- 'percentage', 'fixed'
  discount_value DECIMAL(10, 2) NOT NULL,

  min_purchase_amount DECIMAL(10, 2),
  max_discount_amount DECIMAL(10, 2),

  usage_limit INTEGER, -- Kolikrát celkem lze použít
  usage_count INTEGER DEFAULT 0,

  per_user_limit INTEGER, -- Kolikrát může jeden uživatel použít

  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,

  is_active BOOLEAN DEFAULT true,

  applicable_products INTEGER[], -- Array product IDs (null = všechny produkty)
  applicable_categories TEXT[], -- Array kategorie slugs

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. POUŽITÍ SLEVOVÝCH KÓDŮ
CREATE TABLE IF NOT EXISTS tjkshop_discount_usage (
  id SERIAL PRIMARY KEY,
  discount_code_id INTEGER NOT NULL REFERENCES tjkshop_discount_codes(id) ON DELETE CASCADE,
  order_id INTEGER NOT NULL REFERENCES tjkshop_orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  discount_amount DECIMAL(10, 2) NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXY pro výkon
CREATE INDEX IF NOT EXISTS idx_tjkshop_products_category ON tjkshop_products(category);
CREATE INDEX IF NOT EXISTS idx_tjkshop_products_slug ON tjkshop_products(slug);
CREATE INDEX IF NOT EXISTS idx_tjkshop_products_is_active ON tjkshop_products(is_active);
CREATE INDEX IF NOT EXISTS idx_tjkshop_products_featured ON tjkshop_products(featured);

CREATE INDEX IF NOT EXISTS idx_tjkshop_orders_user_id ON tjkshop_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_tjkshop_orders_status ON tjkshop_orders(status);
CREATE INDEX IF NOT EXISTS idx_tjkshop_orders_payment_status ON tjkshop_orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_tjkshop_orders_order_number ON tjkshop_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_tjkshop_orders_created_at ON tjkshop_orders(created_at);

CREATE INDEX IF NOT EXISTS idx_tjkshop_payments_order_id ON tjkshop_payments(order_id);
CREATE INDEX IF NOT EXISTS idx_tjkshop_payments_status ON tjkshop_payments(status);
CREATE INDEX IF NOT EXISTS idx_tjkshop_payments_payment_method ON tjkshop_payments(payment_method);

CREATE INDEX IF NOT EXISTS idx_tjkshop_cart_user_id ON tjkshop_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_tjkshop_cart_session_id ON tjkshop_cart(session_id);

CREATE INDEX IF NOT EXISTS idx_tjkshop_cart_items_cart_id ON tjkshop_cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_tjkshop_cart_items_product_id ON tjkshop_cart_items(product_id);

CREATE INDEX IF NOT EXISTS idx_tjkshop_tickets_user_id ON tjkshop_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tjkshop_tickets_ticket_code ON tjkshop_tickets(ticket_code);
CREATE INDEX IF NOT EXISTS idx_tjkshop_tickets_status ON tjkshop_tickets(status);

CREATE INDEX IF NOT EXISTS idx_tjkshop_memberships_user_id ON tjkshop_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_tjkshop_memberships_status ON tjkshop_memberships(status);

-- TRIGGERY pro automatickou aktualizaci updated_at
CREATE OR REPLACE FUNCTION tjkshop_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tjkshop_update_products_updated_at BEFORE UPDATE ON tjkshop_products
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER tjkshop_update_cart_updated_at BEFORE UPDATE ON tjkshop_cart
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER tjkshop_update_cart_items_updated_at BEFORE UPDATE ON tjkshop_cart_items
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER tjkshop_update_orders_updated_at BEFORE UPDATE ON tjkshop_orders
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER tjkshop_update_payments_updated_at BEFORE UPDATE ON tjkshop_payments
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

CREATE TRIGGER tjkshop_update_memberships_updated_at BEFORE UPDATE ON tjkshop_memberships
  FOR EACH ROW EXECUTE FUNCTION tjkshop_update_updated_at_column();

-- RLS (Row Level Security) Policies
ALTER TABLE tjkshop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE tjkshop_tickets ENABLE ROW LEVEL SECURITY;

-- Produkty - veřejné čtení
CREATE POLICY "Produkty jsou veřejně viditelné" ON tjkshop_products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin může spravovat produkty" ON tjkshop_products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Objednávky - uživatel vidí jen své
CREATE POLICY "Uživatelé vidí jen své objednávky" ON tjkshop_orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin vidí všechny objednávky" ON tjkshop_orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Košík - uživatel vidí jen svůj
CREATE POLICY "Uživatelé vidí jen svůj košík" ON tjkshop_cart
  FOR ALL USING (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Uživatelé vidí jen své košíkové položky" ON tjkshop_cart_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM tjkshop_cart
      WHERE tjkshop_cart.id = tjkshop_cart_items.cart_id
      AND (tjkshop_cart.user_id = auth.uid() OR tjkshop_cart.session_id IS NOT NULL)
    )
  );

-- Platby - uživatel vidí jen své
CREATE POLICY "Uživatelé vidí jen své platby" ON tjkshop_payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tjkshop_orders
      WHERE tjkshop_orders.id = tjkshop_payments.order_id
      AND tjkshop_orders.user_id = auth.uid()
    )
  );

-- Členství - uživatel vidí jen své
CREATE POLICY "Uživatelé vidí jen své členství" ON tjkshop_memberships
  FOR SELECT USING (auth.uid() = user_id);

-- Vstupenky - uživatel vidí jen své
CREATE POLICY "Uživatelé vidí jen své vstupenky" ON tjkshop_tickets
  FOR SELECT USING (auth.uid() = user_id);

-- FUNKCE pro generování order number
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

-- TRIGGER pro automatické generování order number
CREATE OR REPLACE FUNCTION tjkshop_set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := tjkshop_generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tjkshop_set_order_number_trigger
BEFORE INSERT ON tjkshop_orders
FOR EACH ROW
EXECUTE FUNCTION tjkshop_set_order_number();

-- FUNKCE pro generování unikátního ticket code
CREATE OR REPLACE FUNCTION tjkshop_generate_ticket_code()
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    new_code := 'TJK-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));

    SELECT EXISTS(SELECT 1 FROM tjkshop_tickets WHERE ticket_code = new_code) INTO code_exists;

    EXIT WHEN NOT code_exists;
  END LOOP;

  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER pro automatické generování ticket code
CREATE OR REPLACE FUNCTION tjkshop_set_ticket_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ticket_code IS NULL OR NEW.ticket_code = '' THEN
    NEW.ticket_code := tjkshop_generate_ticket_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tjkshop_set_ticket_code_trigger
BEFORE INSERT ON tjkshop_tickets
FOR EACH ROW
EXECUTE FUNCTION tjkshop_set_ticket_code();

-- Vložení ukázkových dat
INSERT INTO tjkshop_products (name, slug, description, short_description, price, category, type, stock_quantity, images, is_active, featured)
VALUES
  ('TJ Krupka Tričko', 'tj-krupka-tricko', 'Bavlněné tričko s logem TJ Krupka. Dostupné ve velikostech S, M, L, XL, XXL. Vyrobeno z kvalitní 100% bavlny.', 'Kvalitní bavlněné tričko s logem', 399.00, 'merch', 'physical', 50, '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"]', true, true),

  ('TJ Krupka Mikina', 'tj-krupka-mikina', 'Teplá mikina s kapucí a logem klubu. Ideální pro chladné dny v horách. Vyrobeno z kvalitní směsi bavlny a polyesteru.', 'Komfortní mikina s kapucí', 899.00, 'merch', 'physical', 30, '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"]', true, true),

  ('TJ Krupka Čepice', 'tj-krupka-cepice', 'Zimní čepice s logem TJ Krupka. Hřeje a vypadá skvěle!', 'Stylová zimní čepice', 299.00, 'merch', 'physical', 40, '["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500"]', true, false),

  ('Celodenní skipas', 'celodenny-skipas', 'Celodenní jízdenka na všechny vleky v areálu Komáří vížka. Platnost od otevření do zavření areálu. Zahrnuje neomezený počet jízd.', 'Neomezené jízdy po celý den', 350.00, 'ticket', 'digital', 999, '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500"]', true, false),

  ('Půldenní skipas', 'puldenny-skipas', 'Půldenní jízdenka na vleky (platnost od 12:00 do zavření). Ideální pro odpolední lyžování.', 'Jízdenka od poledne', 250.00, 'ticket', 'digital', 999, '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500"]', true, false),

  ('Týdenní skipas', 'tydenni-skipas', 'Týdenní skipas s platností 7 po sobě jdoucích dnů. Nejlepší volba pro delší pobyty.', '7denní neomezené jízdy', 1800.00, 'ticket', 'digital', 999, '[]', true, true),

  ('Roční členství Basic', 'rocni-clenstvi-basic', 'Základní roční členství v TJ Krupka. Zahrnuje slevy na všechny služby klubu, přednostní rezervace a přístup k členským akcím.', 'Základní členství se slevami', 1200.00, 'membership', 'service', 999, '[]', true, false),

  ('Roční členství Premium', 'rocni-clenstvi-premium', 'Premium roční členství s extra výhodami. Zahrnuje vše z Basic + 20% slevu na vše, přednostní přístup, členskou kartu a dárkový balíček.', 'Prémiové členství', 2500.00, 'membership', 'service', 999, '[]', true, true),

  ('Láhev na vodu TJ Krupka', 'lahev-na-vodu', 'Sportovní láhev na vodu s logem TJ Krupka. Objem 750ml, bez BPA.', 'Praktická sportovní láhev', 199.00, 'merch', 'physical', 60, '["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"]', true, false),

  ('Kurz snowkitingu - začátečníci', 'kurz-snowkitingu-zacatecnici', 'Dvoudenní kurz snowkitingu pro začátečníky. Zahrnuje zapůjčení vybavení, instruktora a osvědčení.', 'Naučte se snowkiting', 3500.00, 'ticket', 'service', 20, '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500"]', true, true)

ON CONFLICT (slug) DO NOTHING;

-- Vložení ukázkových kategorií
INSERT INTO tjkshop_categories (name, slug, description, sort_order, is_active)
VALUES
  ('Oblečení', 'obleceni', 'Trička, mikiny, čepice a další oblečení s logem TJ Krupka', 1, true),
  ('Doplňky', 'doplnky', 'Sportovní doplňky a accessories', 2, true),
  ('Jízdenky', 'jizdenky', 'Skipasy a jízdenky na vleky', 3, true),
  ('Členství', 'clenstvi', 'Roční členství v klubu', 4, true),
  ('Kurzy', 'kurzy', 'Sportovní kurzy a lekce', 5, true)
ON CONFLICT (slug) DO NOTHING;

COMMENT ON TABLE tjkshop_products IS 'E-shop produkty - merch, vybavení, jízdenky, členství';
COMMENT ON TABLE tjkshop_orders IS 'Objednávky zákazníků';
COMMENT ON TABLE tjkshop_payments IS 'Platby přes Stripe a ComGate';
COMMENT ON TABLE tjkshop_tickets IS 'Vydané vstupenky a jízdenky';
COMMENT ON TABLE tjkshop_memberships IS 'Členství v klubu';
