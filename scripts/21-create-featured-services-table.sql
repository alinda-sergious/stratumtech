-- Create featured_services table for service management
-- This table will store all featured services with comprehensive details
-- Uses the 'featuredservice' bucket for image uploads

CREATE TABLE IF NOT EXISTS featured_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    long_description TEXT,
    main_image TEXT, -- Images stored in 'featuredservice' bucket
    gallery_images TEXT[], -- Array of image URLs from 'featuredservice' bucket
    service_category VARCHAR(100),
    price_range VARCHAR(100),
    duration VARCHAR(100),
    features TEXT[],
    benefits TEXT[],
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_featured_services_active ON featured_services(is_active);
CREATE INDEX IF NOT EXISTS idx_featured_services_featured ON featured_services(is_featured);
CREATE INDEX IF NOT EXISTS idx_featured_services_category ON featured_services(service_category);

-- Enable Row Level Security
ALTER TABLE featured_services ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to read featured_services" ON featured_services;
DROP POLICY IF EXISTS "Allow authenticated users to insert featured_services" ON featured_services;
DROP POLICY IF EXISTS "Allow authenticated users to update featured_services" ON featured_services;
DROP POLICY IF EXISTS "Allow authenticated users to delete featured_services" ON featured_services;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read featured_services" ON featured_services
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert featured_services" ON featured_services
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update featured_services" ON featured_services
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete featured_services" ON featured_services
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data (only if table is empty)
INSERT INTO featured_services (
    title,
    short_description,
    long_description,
    main_image,
    gallery_images,
    service_category,
    price_range,
    duration,
    features,
    benefits,
    is_active,
    is_featured,
    display_order
) 
SELECT * FROM (VALUES
(
    'Residential Construction',
    'Complete residential construction services from foundation to finishing',
    'Our residential construction service covers everything from initial planning to final handover. We specialize in building custom homes, apartments, and residential complexes that meet the highest standards of quality and safety. Our team ensures timely completion while maintaining strict quality control throughout the construction process.',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
    ],
    'Construction',
    'UGX 50M - 500M',
    '3-12 months',
    ARRAY['Custom Design', 'Quality Materials', 'Timely Delivery', 'Warranty'],
    ARRAY['Increased Property Value', 'Energy Efficiency', 'Modern Amenities', 'Long-term Durability'],
    true,
    true,
    1
),
(
    'Commercial Construction',
    'Professional commercial building construction and development',
    'We provide comprehensive commercial construction services for offices, retail spaces, hotels, and industrial facilities. Our expertise includes project management, design coordination, and construction supervision to ensure your commercial project is completed on time and within budget.',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366754035-2003921654862?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
    ],
    'Construction',
    'UGX 100M - 2B',
    '6-24 months',
    ARRAY['Project Management', 'Design Coordination', 'Quality Control', 'Safety Compliance'],
    ARRAY['Professional Standards', 'Compliance with Regulations', 'Optimal Space Utilization', 'Modern Infrastructure'],
    true,
    true,
    2
),
(
    'Infrastructure Development',
    'Roads, bridges, and public infrastructure construction',
    'Our infrastructure development services include road construction, bridge building, and public works projects. We work with government agencies and private clients to deliver critical infrastructure that supports economic growth and community development.',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
    ],
    'Infrastructure',
    'UGX 500M - 10B',
    '12-36 months',
    ARRAY['Engineering Excellence', 'Environmental Compliance', 'Community Engagement', 'Long-term Durability'],
    ARRAY['Economic Development', 'Improved Connectivity', 'Enhanced Safety', 'Sustainable Solutions'],
    true,
    false,
    3
)) AS v(title, short_description, long_description, main_image, gallery_images, service_category, price_range, duration, features, benefits, is_active, is_featured, display_order)
WHERE NOT EXISTS (SELECT 1 FROM featured_services);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_featured_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_featured_services_updated_at ON featured_services;

CREATE TRIGGER update_featured_services_updated_at 
    BEFORE UPDATE ON featured_services 
    FOR EACH ROW 
    EXECUTE FUNCTION update_featured_services_updated_at(); 