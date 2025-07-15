-- Featured Services Table
-- This table manages the featured construction services displayed on the homepage
-- Uses the existing 'featuredservice' bucket for image uploads

-- Create the featured_services table
CREATE TABLE IF NOT EXISTS featured_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT, -- Images stored in 'featuredservice' bucket
    cta_text VARCHAR(100) DEFAULT 'Book Service',
    cta_link VARCHAR(255) NOT NULL,
    service_id VARCHAR(100) NOT NULL, -- Unique identifier for the service
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE featured_services ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Enable read access for all users" ON featured_services;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON featured_services;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON featured_services;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON featured_services;

-- Create policies
CREATE POLICY "Enable read access for all users" ON featured_services
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON featured_services
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON featured_services
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON featured_services
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_featured_services_updated_at ON featured_services;

CREATE TRIGGER update_featured_services_updated_at
    BEFORE UPDATE ON featured_services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample featured services data
INSERT INTO featured_services (title, description, image_url, cta_text, cta_link, service_id, is_active) VALUES
(
    'Architecture Design',
    'We craft visionary architectural designs that blend aesthetics, functionality, and sustainability. Our team of skilled architects collaborates with clients to create bespoke plans for residential, commercial, and industrial projects.',
    '/images/tours/i1.png.webp',
    'Book Service',
    '/services/architecture-design',
    'architecture-design',
    true
),
(
    'Building Construction',
    'From groundbreaking to handover, we execute comprehensive building construction projects with precision. Specializing in residential estates, commercial towers, and infrastructure developments.',
    '/images/tours/akagera1.jpg',
    'Book Service',
    '/services/building-construction',
    'building-construction',
    true
),
(
    'Building Maintenance',
    'We provide proactive building maintenance services to preserve the longevity and performance of your properties. Our tailored maintenance plans include regular inspections, repairs, and system upkeep.',
    '/images/tours/nyungwe1.jpg',
    'Book Service',
    '/services/building-maintenance',
    'building-maintenance',
    true
),
(
    'Building Renovation',
    'Transform your existing spaces with our expert building renovation services. Whether modernizing outdated interiors, upgrading facilities, or restoring historic structures.',
    '/images/tours/kigali3.jpg',
    'Book Service',
    '/services/building-renovation',
    'building-renovation',
    true
);

-- Note: The 'featuredservice' bucket already exists with tailored service policies
-- No need to create new bucket or policies as they are already configured 