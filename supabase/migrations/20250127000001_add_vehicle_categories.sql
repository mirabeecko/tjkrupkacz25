-- Add category column to vehicles table

-- Add category column with enum type
ALTER TABLE vehicles
ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'motorcycle';

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category);

-- Update existing motorcycles
UPDATE vehicles
SET category = 'motorcycle'
WHERE brand IN ('KTM', 'Honda', 'Yamaha', 'Suzuki', 'Husqvarna', 'Beta', 'GasGas', 'Kawasaki');

-- Set category for kite equipment (if already inserted)
UPDATE vehicles
SET category = 'kite'
WHERE brand IN ('Flysurfer', 'Dakine') OR model LIKE '%Trapéz%';

-- Add comment to explain categories
COMMENT ON COLUMN vehicles.category IS 'Vehicle/Equipment category: motorcycle, car, kite';
