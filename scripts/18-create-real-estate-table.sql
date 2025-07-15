-- Create real_estate table for property listings
-- This table will store all real estate properties with comprehensive details

CREATE TABLE IF NOT EXISTS real_estate (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT,
    long_description TEXT,
    main_image TEXT,
    gallery_images TEXT[],
    price DECIMAL(12,2),
    property_type VARCHAR(100),
    location VARCHAR(255),
    bedrooms INTEGER,
    bathrooms INTEGER,
    square_feet DECIMAL(10,2),
    land_size DECIMAL(10,2),
    features TEXT[],
    amenities TEXT[],
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_real_estate_active ON real_estate(is_active);
CREATE INDEX IF NOT EXISTS idx_real_estate_featured ON real_estate(is_featured);
CREATE INDEX IF NOT EXISTS idx_real_estate_property_type ON real_estate(property_type);
CREATE INDEX IF NOT EXISTS idx_real_estate_location ON real_estate(location);

-- Enable Row Level Security
ALTER TABLE real_estate ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read real_estate" ON real_estate
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert real_estate" ON real_estate
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update real_estate" ON real_estate
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete real_estate" ON real_estate
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO real_estate (
    title, 
    short_description, 
    long_description, 
    main_image, 
    gallery_images, 
    price, 
    property_type, 
    location, 
    bedrooms, 
    bathrooms, 
    square_feet, 
    land_size, 
    features, 
    amenities, 
    is_active, 
    is_featured
) VALUES 
(
    'Modern Luxury Villa in Kololo',
    'Spacious 5-bedroom villa with stunning city views',
    'This luxurious villa offers the perfect blend of modern architecture and comfort. Located in the prestigious Kololo area, this property features high-end finishes, smart home technology, and breathtaking views of Kampala city. The villa includes a private garden, swimming pool, and secure parking.',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
    ],
    850000000,
    'Villa',
    'Kololo, Kampala',
    5,
    4,
    450.00,
    1200.00,
    ARRAY['Swimming Pool', 'Garden', 'Security System', 'Smart Home', 'Parking'],
    ARRAY['Gym', 'Spa', 'Home Theater', 'Wine Cellar', 'Staff Quarters'],
    true,
    true
),
(
    'Contemporary Apartment in Nakasero',
    'Elegant 3-bedroom apartment in the heart of the city',
    'This contemporary apartment offers luxury living in the heart of Nakasero. With premium amenities, 24/7 security, and stunning city views, this property is perfect for professionals seeking convenience and comfort.',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    450000000,
    'Apartment',
    'Nakasero, Kampala',
    3,
    2,
    180.00,
    0.00,
    ARRAY['Balcony', 'City View', 'Security', 'Elevator'],
    ARRAY['Gym', 'Pool', 'Concierge', 'Parking'],
    true,
    false
),
(
    'Commercial Office Space in Industrial Area',
    'Prime office space for businesses',
    'This commercial property offers excellent office space in the industrial area. Perfect for businesses looking to establish their presence in Kampala with easy access to major roads and amenities.',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366754035-2003921654862?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
    ],
    1200000000,
    'Commercial',
    'Industrial Area, Kampala',
    0,
    0,
    500.00,
    2000.00,
    ARRAY['Parking', 'Security', 'Loading Dock', 'High Ceilings'],
    ARRAY['Cafeteria', 'Conference Rooms', 'IT Infrastructure'],
    true,
    true
); 