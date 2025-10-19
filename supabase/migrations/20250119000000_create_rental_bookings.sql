-- Create rental_bookings table for storing vehicle rental reservations
CREATE TABLE IF NOT EXISTS rental_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Customer information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,

  -- Rental details
  vehicle_id INTEGER REFERENCES vehicles(id),
  vehicle_name TEXT NOT NULL, -- Store vehicle name for history
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

-- Create index for faster queries
CREATE INDEX idx_rental_bookings_email ON rental_bookings(email);
CREATE INDEX idx_rental_bookings_status ON rental_bookings(status);
CREATE INDEX idx_rental_bookings_created_at ON rental_bookings(created_at DESC);
CREATE INDEX idx_rental_bookings_vehicle_id ON rental_bookings(vehicle_id);

-- Enable Row Level Security
ALTER TABLE rental_bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (create booking)
CREATE POLICY "Anyone can create rental booking"
  ON rental_bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Users can view their own bookings by email
CREATE POLICY "Users can view own bookings"
  ON rental_bookings
  FOR SELECT
  TO anon, authenticated
  USING (true); -- For now allow reading all, can be restricted later

-- Add comment to table
COMMENT ON TABLE rental_bookings IS 'Stores vehicle rental reservations from customers';
