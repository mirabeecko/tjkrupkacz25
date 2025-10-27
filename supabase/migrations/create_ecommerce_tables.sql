-- E-commerce Tables for TJ Krupka

-- 1. PRODUKTY (Merch, vybavení)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES product_categories(id),
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VARIANTY PRODUKTŮ (velikosti, barvy)
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "Velikost M", "Barva červená"
  sku TEXT UNIQUE,
  price DECIMAL(10, 2),
  stock_quantity INTEGER DEFAULT 0,
  attributes JSONB DEFAULT '{}'::jsonb, -- {"size": "M", "color": "red"}
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. KOŠÍK
CREATE TABLE IF NOT EXISTS cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT, -- Pro nepřihlášené uživatele
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. POLOŽKY V KOŠÍKU
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES cart(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL, -- Cena v době přidání do košíku
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. OBJEDNÁVKY
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,

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
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,

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
CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

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
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
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
CREATE TABLE IF NOT EXISTS discount_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

  applicable_products UUID[], -- Array product IDs (null = všechny produkty)
  applicable_categories TEXT[], -- Array kategorie slugs

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. POUŽITÍ SLEVOVÝCH KÓDŮ
CREATE TABLE IF NOT EXISTS discount_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discount_code_id UUID REFERENCES discount_codes(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  discount_amount DECIMAL(10, 2) NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXY pro výkon
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_session_id ON cart(session_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_ticket_code ON tickets(ticket_code);
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON memberships(user_id);

-- TRIGGERY pro automatickou aktualizaci updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_updated_at BEFORE UPDATE ON cart
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Produkty - veřejné čtení, admin zápis
CREATE POLICY "Produkty jsou veřejně viditelné" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin může spravovat produkty" ON products
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Objednávky - uživatel vidí jen své
CREATE POLICY "Uživatelé vidí jen své objednávky" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin vidí všechny objednávky" ON orders
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Košík - uživatel vidí jen svůj
CREATE POLICY "Uživatelé vidí jen svůj košík" ON cart
  FOR ALL USING (auth.uid() = user_id);

-- Členství - uživatel vidí jen své
CREATE POLICY "Uživatelé vidí jen své členství" ON memberships
  FOR SELECT USING (auth.uid() = user_id);

-- Vstupenky - uživatel vidí jen své
CREATE POLICY "Uživatelé vidí jen své vstupenky" ON tickets
  FOR SELECT USING (auth.uid() = user_id);

-- FUNKCE pro generování order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  year_prefix TEXT;
BEGIN
  year_prefix := TO_CHAR(NOW(), 'YY');

  SELECT year_prefix || LPAD((COALESCE(MAX(CAST(SUBSTRING(order_number FROM 3) AS INTEGER)), 0) + 1)::TEXT, 6, '0')
  INTO new_number
  FROM orders
  WHERE order_number LIKE year_prefix || '%';

  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER pro automatické generování order number
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number_trigger
BEFORE INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION set_order_number();

-- FUNKCE pro generování unikátního ticket code
CREATE OR REPLACE FUNCTION generate_ticket_code()
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    new_code := 'TJK-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));

    SELECT EXISTS(SELECT 1 FROM tickets WHERE ticket_code = new_code) INTO code_exists;

    EXIT WHEN NOT code_exists;
  END LOOP;

  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Vložení ukázkových dat
INSERT INTO products (name, slug, description, short_description, price, category, type, stock_quantity, images, is_active, featured)
VALUES
  ('TJ Krupka Tričko', 'tj-krupka-tricko', 'Bavlněné tričko s logem TJ Krupka', 'Kvalitní bavlněné tričko', 399.00, 'merch', 'physical', 50, '["https://via.placeholder.com/500"]', true, true),
  ('TJ Krupka Mikina', 'tj-krupka-mikina', 'Teplá mikina s kapucí a logem klubu', 'Komfortní mikina', 899.00, 'merch', 'physical', 30, '["https://via.placeholder.com/500"]', true, true),
  ('Celodenní skipas', 'celodenny-skipas', 'Celodenní jízdenka na vleky', 'Neomezené jízdy po celý den', 350.00, 'ticket', 'digital', 999, '[]', true, false),
  ('Půldenní skipas', 'puldenny-skipas', 'Půldenní jízdenka na vleky (od 12:00)', 'Jízdenka od poledne', 250.00, 'ticket', 'digital', 999, '[]', true, false),
  ('Roční členství Basic', 'rocni-clenstvi-basic', 'Základní roční členství v TJ Krupka', 'Základní členství se slevami', 1200.00, 'membership', 'service', 999, '[]', true, false),
  ('Roční členství Premium', 'rocni-clenstvi-premium', 'Premium roční členství s extra výhodami', 'Prémiové členství', 2500.00, 'membership', 'service', 999, '[]', true, true)
ON CONFLICT (slug) DO NOTHING;

COMMENT ON TABLE products IS 'Produkty - merch, vybavení, jízdenky, členství';
COMMENT ON TABLE orders IS 'Objednávky zákazníků';
COMMENT ON TABLE payments IS 'Platby přes Stripe a ComGate';
COMMENT ON TABLE tickets IS 'Vydané vstupenky a jízdenky';
COMMENT ON TABLE memberships IS 'Členství v klubu';
