-- Create real_estate table based on the structure from OurFleetSection.tsx (without specifications)
CREATE TABLE IF NOT EXISTS real_estate (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_description TEXT,
    detailed_description TEXT,
    main_image TEXT,
    gallery_images TEXT[], -- Array of image URLs
    price_per_day VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for capabilities (icon and text pairs)
CREATE TABLE IF NOT EXISTS real_estate_capabilities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    real_estate_id UUID REFERENCES real_estate(id) ON DELETE CASCADE,
    icon VARCHAR(100) NOT NULL,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_real_estate_active ON real_estate(is_active);
CREATE INDEX IF NOT EXISTS idx_real_estate_capabilities_id ON real_estate_capabilities(real_estate_id);

-- Enable Row Level Security
ALTER TABLE real_estate ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_capabilities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for real_estate table
-- Allow public read access for active properties
CREATE POLICY "Allow public read access for active properties" ON real_estate
    FOR SELECT USING (is_active = true);

-- Allow authenticated users to read all properties
CREATE POLICY "Allow authenticated users to read all properties" ON real_estate
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert" ON real_estate
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update" ON real_estate
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated users to delete" ON real_estate
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for real_estate_capabilities table
CREATE POLICY "Allow public read access for capabilities" ON real_estate_capabilities
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage capabilities" ON real_estate_capabilities
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data based on the OurFleetSection.tsx structure (without specifications)
INSERT INTO real_estate (id, name, short_description, detailed_description, main_image, gallery_images, price_per_day, is_active) VALUES
(
    'toyota-land-cruiser-v8',
    'Furnished Apartment',
    'A very well furnished condo with semi smart home characteristics.',
    'Detailed description for the furnished apartment with smart home features, modern amenities, and comfortable living spaces.',
    '/images/vehicles/land4.jpg',
    ARRAY['/images/vehicles/land4.jpg', '/images/vehicles/land5.jpg', '/images/vehicles/land6.jpg', '/images/vehicles/land7.jpg', '/images/vehicles/land8.jpg'],
    'Visit Find My Stay for more details',
    true
);

-- Insert capabilities for the furnished apartment
INSERT INTO real_estate_capabilities (real_estate_id, icon, text) VALUES
('toyota-land-cruiser-v8', 'bed', '2 bedrooms'),
('toyota-land-cruiser-v8', 'locateIcon', 'Kyanja'),
('toyota-land-cruiser-v8', 'house', 'Condo'),
('toyota-land-cruiser-v8', 'landplot', '1 hectare');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_real_estate_updated_at 
    BEFORE UPDATE ON real_estate 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 