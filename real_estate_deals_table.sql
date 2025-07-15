-- Real Estate Deals Table
-- This table manages the "Get Discounted Real Estate Deals" items
-- Uses the 'real-estate' bucket for image uploads

-- Create the real_estate_deals table
CREATE TABLE IF NOT EXISTS real_estate_deals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    detailed_description TEXT,
    main_image_url TEXT, -- Images stored in 'real-estate' bucket
    gallery_images TEXT[], -- Array of image URLs from 'real-estate' bucket
    property_type VARCHAR(100),
    year_built INTEGER,
    number_of_floors INTEGER,
    primary_color VARCHAR(100),
    number_of_entrances INTEGER,
    air_system VARCHAR(100),
    energy_source VARCHAR(100),
    security_system VARCHAR(100),
    price VARCHAR(100),
    location VARCHAR(255),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create real_estate_deal_capabilities table for the capabilities/features
CREATE TABLE IF NOT EXISTS real_estate_deal_capabilities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    deal_id UUID REFERENCES real_estate_deals(id) ON DELETE CASCADE,
    icon VARCHAR(100),
    text VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE real_estate_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_deal_capabilities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Enable read access for all users" ON real_estate_deals;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON real_estate_deals;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON real_estate_deals;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON real_estate_deals;

DROP POLICY IF EXISTS "Enable read access for all users" ON real_estate_deal_capabilities;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON real_estate_deal_capabilities;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON real_estate_deal_capabilities;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON real_estate_deal_capabilities;

-- Create RLS policies for real_estate_deals
CREATE POLICY "Enable read access for all users" ON real_estate_deals
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON real_estate_deals
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON real_estate_deals
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON real_estate_deals
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for real_estate_deal_capabilities
CREATE POLICY "Enable read access for all users" ON real_estate_deal_capabilities
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON real_estate_deal_capabilities
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON real_estate_deal_capabilities
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON real_estate_deal_capabilities
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_real_estate_deals_active ON real_estate_deals(is_active);
CREATE INDEX IF NOT EXISTS idx_real_estate_deals_featured ON real_estate_deals(is_featured);
CREATE INDEX IF NOT EXISTS idx_real_estate_deal_capabilities_deal_id ON real_estate_deal_capabilities(deal_id);

-- Insert sample data for real estate deals (only if table is empty)
INSERT INTO real_estate_deals (
    title,
    short_description,
    detailed_description,
    main_image_url,
    gallery_images,
    property_type,
    year_built,
    number_of_floors,
    primary_color,
    number_of_entrances,
    air_system,
    energy_source,
    security_system,
    price,
    location,
    is_featured,
    is_active
) 
SELECT * FROM (VALUES
(
    'Furnished Apartment',
    'A very well furnished condo with semi smart home characteristics.',
    'This luxurious furnished apartment offers modern amenities and smart home features. Located in a prime area, it provides comfort and convenience with high-quality finishes and contemporary design.',
    '/images/vehicles/land4.jpg',
    ARRAY['/images/vehicles/land4.jpg', '/images/vehicles/land5.jpg', '/images/vehicles/land6.jpg', '/images/vehicles/land7.jpg', '/images/vehicles/land8.jpg'],
    'Apartment',
    2022,
    5,
    'White',
    7,
    'Hybrid',
    'UEDCL',
    'Electric fence',
    'Visit Find My Stay for more details',
    'Kyanja, Kigali',
    true,
    true
),
(
    'Luxury Villa',
    'Spacious villa with premium amenities and beautiful garden.',
    'This stunning luxury villa features high-end finishes, multiple bedrooms, a private garden, and modern smart home technology. Perfect for families seeking comfort and elegance.',
    '/images/vehicles/range.PNG',
    ARRAY['/images/vehicles/range.PNG', '/images/vehicles/range1.PNG'],
    'Villa',
    2020,
    3,
    'Cream',
    4,
    'Central AC',
    'Solar + Grid',
    'CCTV + Guard',
    'Contact for pricing',
    'Kigali Heights',
    true,
    true
),
(
    'Modern Townhouse',
    'Contemporary townhouse with open floor plan and rooftop terrace.',
    'This modern townhouse offers a perfect blend of style and functionality. Features include an open-concept living area, modern kitchen, and a beautiful rooftop terrace with city views.',
    '/images/vehicles/sportage.jpg',
    ARRAY['/images/vehicles/sportage.jpg', '/images/vehicles/sportage1.jpg', '/images/vehicles/sportage3.jpg', '/images/vehicles/sportage4.jpg'],
    'Townhouse',
    2021,
    4,
    'Gray',
    3,
    'Split AC',
    'Grid Power',
    'Smart Security',
    'Available for rent',
    'Remera, Kigali',
    false,
    true
),
(
    'Executive Penthouse',
    'Luxury penthouse with panoramic city views and premium amenities.',
    'Experience the ultimate in luxury living with this executive penthouse. Features include floor-to-ceiling windows, private elevator, rooftop pool, and 360-degree city views.',
    '/images/vehicles/g-wagon.jpg',
    ARRAY['/images/vehicles/g-wagon.jpg', '/images/vehicles/g-wagon1.jpg', '/images/vehicles/g-wagon2.jpg'],
    'Penthouse',
    2023,
    2,
    'Black & White',
    2,
    'Smart Climate',
    'Solar Powered',
    'Biometric Access',
    'Premium pricing',
    'City Center, Kigali',
    true,
    true
),
(
    'Family Home',
    'Spacious family home with large backyard and modern amenities.',
    'Perfect for growing families, this spacious home offers multiple bedrooms, a large kitchen, family room, and a beautiful backyard. Located in a quiet, family-friendly neighborhood.',
    '/images/vehicles/benzc.jpg',
    ARRAY['/images/vehicles/benzc.jpg', '/images/vehicles/benzc1.jpg', '/images/vehicles/benzc2.jpg'],
    'Single Family',
    2019,
    2,
    'Beige',
    3,
    'Central Heating',
    'Grid Power',
    'Alarm System',
    'Family friendly pricing',
    'Kacyiru, Kigali',
    false,
    true
),
(
    'Studio Apartment',
    'Compact and efficient studio perfect for young professionals.',
    'This well-designed studio apartment maximizes space efficiency while providing all essential amenities. Perfect for young professionals or students seeking a convenient living solution.',
    '/images/vehicles/col1c.jpg',
    ARRAY['/images/vehicles/col.jpg', '/images/vehicles/col1.jpg', '/images/vehicles/col2.jpg'],
    'Studio',
    2020,
    1,
    'White',
    1,
    'Window AC',
    'Grid Power',
    'Basic Security',
    'Affordable rates',
    'Kimironko, Kigali',
    false,
    true
)) AS v(title, short_description, detailed_description, main_image_url, gallery_images, property_type, year_built, number_of_floors, primary_color, number_of_entrances, air_system, energy_source, security_system, price, location, is_featured, is_active)
WHERE NOT EXISTS (SELECT 1 FROM real_estate_deals);

-- Insert capabilities for the first deal (Furnished Apartment) - only if not exists
INSERT INTO real_estate_deal_capabilities (deal_id, icon, text)
SELECT 
    (SELECT id FROM real_estate_deals WHERE title = 'Furnished Apartment' LIMIT 1),
    icon,
    text
FROM (VALUES
    ('bed', '2 bedrooms'),
    ('locateIcon', 'Kyanja'),
    ('house', 'Condo'),
    ('landplot', '1 hectare')
) AS v(icon, text)
WHERE NOT EXISTS (SELECT 1 FROM real_estate_deal_capabilities WHERE deal_id = (SELECT id FROM real_estate_deals WHERE title = 'Furnished Apartment' LIMIT 1));

-- Insert capabilities for the second deal (Luxury Villa) - only if not exists
INSERT INTO real_estate_deal_capabilities (deal_id, icon, text)
SELECT 
    (SELECT id FROM real_estate_deals WHERE title = 'Luxury Villa' LIMIT 1),
    icon,
    text
FROM (VALUES
    ('bed', '4 bedrooms'),
    ('locateIcon', 'Kigali Heights'),
    ('house', 'Villa'),
    ('leaf', 'Garden')
) AS v(icon, text)
WHERE NOT EXISTS (SELECT 1 FROM real_estate_deal_capabilities WHERE deal_id = (SELECT id FROM real_estate_deals WHERE title = 'Luxury Villa' LIMIT 1));

-- Insert capabilities for the third deal (Modern Townhouse) - only if not exists
INSERT INTO real_estate_deal_capabilities (deal_id, icon, text)
SELECT 
    (SELECT id FROM real_estate_deals WHERE title = 'Modern Townhouse' LIMIT 1),
    icon,
    text
FROM (VALUES
    ('bed', '3 bedrooms'),
    ('locateIcon', 'Remera'),
    ('house', 'Townhouse'),
    ('wind', 'Rooftop Terrace')
) AS v(icon, text)
WHERE NOT EXISTS (SELECT 1 FROM real_estate_deal_capabilities WHERE deal_id = (SELECT id FROM real_estate_deals WHERE title = 'Modern Townhouse' LIMIT 1));

-- Insert capabilities for the fourth deal (Executive Penthouse) - only if not exists
INSERT INTO real_estate_deal_capabilities (deal_id, icon, text)
SELECT 
    (SELECT id FROM real_estate_deals WHERE title = 'Executive Penthouse' LIMIT 1),
    icon,
    text
FROM (VALUES
    ('bed', '2 bedrooms'),
    ('locateIcon', 'City Center'),
    ('house', 'Penthouse'),
    ('wind', 'City Views')
) AS v(icon, text)
WHERE NOT EXISTS (SELECT 1 FROM real_estate_deal_capabilities WHERE deal_id = (SELECT id FROM real_estate_deals WHERE title = 'Executive Penthouse' LIMIT 1));

-- Insert capabilities for the fifth deal (Family Home) - only if not exists
INSERT INTO real_estate_deal_capabilities (deal_id, icon, text)
SELECT 
    (SELECT id FROM real_estate_deals WHERE title = 'Family Home' LIMIT 1),
    icon,
    text
FROM (VALUES
    ('bed', '4 bedrooms'),
    ('locateIcon', 'Kacyiru'),
    ('house', 'Family Home'),
    ('leaf', 'Backyard')
) AS v(icon, text)
WHERE NOT EXISTS (SELECT 1 FROM real_estate_deal_capabilities WHERE deal_id = (SELECT id FROM real_estate_deals WHERE title = 'Family Home' LIMIT 1));

-- Insert capabilities for the sixth deal (Studio Apartment) - only if not exists
INSERT INTO real_estate_deal_capabilities (deal_id, icon, text)
SELECT 
    (SELECT id FROM real_estate_deals WHERE title = 'Studio Apartment' LIMIT 1),
    icon,
    text
FROM (VALUES
    ('bed', 'Studio'),
    ('locateIcon', 'Kimironko'),
    ('house', 'Studio'),
    ('leaf', 'Compact')
) AS v(icon, text)
WHERE NOT EXISTS (SELECT 1 FROM real_estate_deal_capabilities WHERE deal_id = (SELECT id FROM real_estate_deals WHERE title = 'Studio Apartment' LIMIT 1));

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_real_estate_deals_updated_at ON real_estate_deals;
DROP TRIGGER IF EXISTS update_real_estate_deal_capabilities_updated_at ON real_estate_deal_capabilities;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_real_estate_deals_updated_at 
    BEFORE UPDATE ON real_estate_deals 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for real_estate_deal_capabilities
CREATE TRIGGER update_real_estate_deal_capabilities_updated_at 
    BEFORE UPDATE ON real_estate_deal_capabilities 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON real_estate_deals TO authenticated;
GRANT ALL ON real_estate_deal_capabilities TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated; 