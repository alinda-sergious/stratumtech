-- Create ongoing_projects table for construction projects
-- This table will store all ongoing construction projects with comprehensive details

CREATE TABLE IF NOT EXISTS ongoing_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT,
    long_description TEXT,
    main_image TEXT,
    gallery_images TEXT[],
    price_per_person DECIMAL(10,2),
    duration VARCHAR(100),
    destination VARCHAR(255),
    category VARCHAR(100),
    itinerary JSONB,
    included TEXT[],
    excluded TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ongoing_projects_active ON ongoing_projects(is_active);
CREATE INDEX IF NOT EXISTS idx_ongoing_projects_category ON ongoing_projects(category);
CREATE INDEX IF NOT EXISTS idx_ongoing_projects_destination ON ongoing_projects(destination);
CREATE INDEX IF NOT EXISTS idx_ongoing_projects_created_at ON ongoing_projects(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE ongoing_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read ongoing_projects" ON ongoing_projects
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert ongoing_projects" ON ongoing_projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update ongoing_projects" ON ongoing_projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete ongoing_projects" ON ongoing_projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_ongoing_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ongoing_projects_updated_at 
    BEFORE UPDATE ON ongoing_projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_ongoing_projects_updated_at();

-- Insert sample data for ongoing projects
INSERT INTO ongoing_projects (
    title,
    short_description,
    long_description,
    main_image,
    gallery_images,
    price_per_person,
    duration,
    destination,
    category,
    itinerary,
    included,
    excluded,
    is_active
) VALUES
(
    'Kololo Luxury Residential Estate',
    'A prestigious residential estate in Kololo, Kampala, featuring modern villas with eco-friendly designs and smart home technology.',
    'A prestigious residential estate in Kololo, Kampala, featuring modern villas with eco-friendly designs and smart home technology, offering upscale living for affluent residents. The project includes state-of-the-art amenities, sustainable landscaping, and advanced security systems.',
    '/images/upcoming/gorrila1.webp',
    ARRAY['/images/upcoming/gorrila1.webp', '/images/upcoming/gorrila2.png', '/images/upcoming/gorrila3.jpg', '/images/upcoming/volca1.jpg'],
    500000.00,
    '24 Months',
    'Kololo, Kampala, Uganda',
    'Residential',
    '[
        {"day": 1, "title": "Site Preparation & Foundation", "description": "Clear site, excavate, and lay reinforced concrete foundations for the villas."},
        {"day": 2, "title": "Structural Construction", "description": "Erect steel and concrete frameworks for durable villa structures."},
        {"day": 3, "title": "Interior Finishing", "description": "Install plumbing, electrical systems, and high-quality interior finishes."},
        {"day": 4, "title": "Landscaping & Handover", "description": "Complete landscaping, conduct final inspections, and hand over to clients."}
    ]'::jsonb,
    ARRAY['Construction materials', 'Skilled labor', 'Smart home systems', 'Landscaping services', 'Project management'],
    ARRAY['Land acquisition costs', 'Furniture', 'Permits', 'Additional customizations'],
    true
),
(
    'Nakasero Commercial Office Tower',
    'A multi-story office tower in Nakasero, Kampala, designed for corporate tenants with energy-efficient systems.',
    'A multi-story office tower in Nakasero, Kampala, designed for corporate tenants with energy-efficient systems and premium office spaces, enhancing the city''s business district. Features include modern conference facilities, parking, and retail spaces.',
    '/images/tours/i1.png.webp',
    ARRAY['/images/tours/i1.png.webp', '/images/tours/kivu6.jpg', '/images/tours/nyungwe1.jpg', '/images/tours/kigali3.jpg'],
    750000.00,
    '30 Months',
    'Nakasero, Kampala, Uganda',
    'Commercial',
    '[
        {"day": 1, "title": "Foundation & Basement", "description": "Excavate and construct basement parking and foundation systems."},
        {"day": 2, "title": "Core Structure", "description": "Build the main structural framework and core systems."},
        {"day": 3, "title": "Floor Systems", "description": "Install floor slabs and interior partitions."},
        {"day": 4, "title": "MEP & Finishing", "description": "Install mechanical, electrical, and plumbing systems with final finishes."}
    ]'::jsonb,
    ARRAY['Structural materials', 'MEP systems', 'Interior finishes', 'HVAC systems', 'Project management'],
    ARRAY['Land costs', 'Furniture', 'IT equipment', 'Tenant improvements'],
    true
),
(
    'Entebbe-Kampala Expressway Expansion',
    'A major infrastructure project to expand the Entebbe-Kampala Expressway, improving connectivity.',
    'A major infrastructure project to expand the Entebbe-Kampala Expressway, improving connectivity between the airport and the capital for economic and tourism growth. The project includes road widening, bridge construction, and modern traffic management systems.',
    '/images/tours/kivu6.jpg',
    ARRAY['/images/tours/kivu6.jpg', '/images/tours/nyungwe1.jpg', '/images/tours/kigali3.jpg', '/images/tours/kigali4.jpg'],
    1200000.00,
    '36 Months',
    'Entebbe-Kampala, Uganda',
    'Infrastructure',
    '[
        {"day": 1, "title": "Survey & Planning", "description": "Conduct detailed surveys and finalize project planning."},
        {"day": 2, "title": "Earthworks", "description": "Excavate and prepare roadbed for new lanes."},
        {"day": 3, "title": "Pavement & Bridges", "description": "Lay asphalt and construct new bridges."},
        {"day": 4, "title": "Signage & Handover", "description": "Install traffic signs and complete final inspections."}
    ]'::jsonb,
    ARRAY['Asphalt materials', 'Bridge construction', 'Traffic management systems', 'Safety barriers', 'Project management'],
    ARRAY['Land acquisition', 'Utility relocation', 'Environmental permits', 'Traffic control during construction'],
    true
);

-- Verify the data
SELECT 
    id, 
    title, 
    category, 
    destination, 
    duration, 
    price_per_person, 
    is_active,
    created_at
FROM ongoing_projects 
ORDER BY created_at DESC; 