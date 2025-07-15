-- First, let's check if the table exists and add missing columns
-- Add is_active column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'real_estate' AND column_name = 'is_active'
    ) THEN
        ALTER TABLE real_estate ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add other missing columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'real_estate' AND column_name = 'gallery_images'
    ) THEN
        ALTER TABLE real_estate ADD COLUMN gallery_images TEXT[];
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'real_estate' AND column_name = 'price_per_day'
    ) THEN
        ALTER TABLE real_estate ADD COLUMN price_per_day VARCHAR(100);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'real_estate' AND column_name = 'short_description'
    ) THEN
        ALTER TABLE real_estate ADD COLUMN short_description TEXT;
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'real_estate' AND column_name = 'detailed_description'
    ) THEN
        ALTER TABLE real_estate ADD COLUMN detailed_description TEXT;
    END IF;
END $$;

-- Create capabilities table if it doesn't exist
CREATE TABLE IF NOT EXISTS real_estate_capabilities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    real_estate_id UUID REFERENCES real_estate(id) ON DELETE CASCADE,
    icon VARCHAR(100) NOT NULL,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_real_estate_active ON real_estate(is_active);
CREATE INDEX IF NOT EXISTS idx_real_estate_capabilities_id ON real_estate_capabilities(real_estate_id);

-- Enable Row Level Security if not already enabled
ALTER TABLE real_estate ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_capabilities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access for active properties" ON real_estate;
DROP POLICY IF EXISTS "Allow authenticated users to read all properties" ON real_estate;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON real_estate;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON real_estate;
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON real_estate;

-- Create RLS policies for real_estate table
CREATE POLICY "Allow public read access for active properties" ON real_estate
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users to read all properties" ON real_estate
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert" ON real_estate
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update" ON real_estate
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete" ON real_estate
    FOR DELETE USING (auth.role() = 'authenticated');

-- Drop existing policies for capabilities if they exist
DROP POLICY IF EXISTS "Allow public read access for capabilities" ON real_estate_capabilities;
DROP POLICY IF EXISTS "Allow authenticated users to manage capabilities" ON real_estate_capabilities;

-- Create RLS policies for real_estate_capabilities table
CREATE POLICY "Allow public read access for capabilities" ON real_estate_capabilities
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage capabilities" ON real_estate_capabilities
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data if the table is empty (updated for construction company)
INSERT INTO real_estate (id, name, short_description, detailed_description, main_image, gallery_images, price_per_day, is_active)
SELECT 
    'luxury-apartment-kyanja',
    'Luxury Apartment in Kyanja',
    'Modern 3-bedroom apartment with premium finishes and smart home features.',
    'This stunning luxury apartment features high-end finishes, smart home automation, and panoramic city views. Perfect for executives and families seeking premium living in one of Kampala\'s most desirable neighborhoods.',
    '/images/vehicles/land4.jpg',
    ARRAY['/images/vehicles/land4.jpg', '/images/vehicles/land5.jpg', '/images/vehicles/land6.jpg', '/images/vehicles/land7.jpg', '/images/vehicles/land8.jpg'],
    'Contact for pricing',
    true
WHERE NOT EXISTS (SELECT 1 FROM real_estate WHERE id = 'luxury-apartment-kyanja');

-- Insert construction-focused capabilities
INSERT INTO real_estate_capabilities (real_estate_id, icon, text)
SELECT 'luxury-apartment-kyanja', 'bed', '3 Bedrooms'
WHERE NOT EXISTS (SELECT 1 FROM real_estate_capabilities WHERE real_estate_id = 'luxury-apartment-kyanja' AND icon = 'bed');

INSERT INTO real_estate_capabilities (real_estate_id, icon, text)
SELECT 'luxury-apartment-kyanja', 'map-pin', 'Kyanja'
WHERE NOT EXISTS (SELECT 1 FROM real_estate_capabilities WHERE real_estate_id = 'luxury-apartment-kyanja' AND icon = 'map-pin');

INSERT INTO real_estate_capabilities (real_estate_id, icon, text)
SELECT 'luxury-apartment-kyanja', 'building', 'Apartment'
WHERE NOT EXISTS (SELECT 1 FROM real_estate_capabilities WHERE real_estate_id = 'luxury-apartment-kyanja' AND icon = 'building');

INSERT INTO real_estate_capabilities (real_estate_id, icon, text)
SELECT 'luxury-apartment-kyanja', 'ruler', '2,500 sq ft'
WHERE NOT EXISTS (SELECT 1 FROM real_estate_capabilities WHERE real_estate_id = 'luxury-apartment-kyanja' AND icon = 'ruler');

INSERT INTO real_estate_capabilities (real_estate_id, icon, text)
SELECT 'luxury-apartment-kyanja', 'bath', '2.5 Bathrooms'
WHERE NOT EXISTS (SELECT 1 FROM real_estate_capabilities WHERE real_estate_id = 'luxury-apartment-kyanja' AND icon = 'bath');

INSERT INTO real_estate_capabilities (real_estate_id, icon, text)
SELECT 'luxury-apartment-kyanja', 'wifi', 'Smart Home'
WHERE NOT EXISTS (SELECT 1 FROM real_estate_capabilities WHERE real_estate_id = 'luxury-apartment-kyanja' AND icon = 'wifi'); 