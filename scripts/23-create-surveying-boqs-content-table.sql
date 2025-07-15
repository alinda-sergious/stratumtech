-- Create surveying_boqs_content table for managing Surveying and BOQs service page content
-- This table will store the content for the Surveying and BOQs service page

CREATE TABLE IF NOT EXISTS surveying_boqs_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Surveying and BOQs Services',
    description TEXT,
    hero_title VARCHAR(255) NOT NULL DEFAULT 'Surveying and BOQs Services',
    hero_description TEXT,
    overview_title VARCHAR(255) NOT NULL DEFAULT 'Service Overview',
    overview_description TEXT,
    expertise_items TEXT[],
    services JSONB,
    process_steps JSONB,
    contact_title VARCHAR(255) NOT NULL DEFAULT 'Ready to Start Your Project?',
    contact_description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_surveying_boqs_content_active ON surveying_boqs_content(is_active);

-- Enable Row Level Security
ALTER TABLE surveying_boqs_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to read surveying_boqs_content" ON surveying_boqs_content;
DROP POLICY IF EXISTS "Allow authenticated users to insert surveying_boqs_content" ON surveying_boqs_content;
DROP POLICY IF EXISTS "Allow authenticated users to update surveying_boqs_content" ON surveying_boqs_content;
DROP POLICY IF EXISTS "Allow authenticated users to delete surveying_boqs_content" ON surveying_boqs_content;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read surveying_boqs_content" ON surveying_boqs_content
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert surveying_boqs_content" ON surveying_boqs_content
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update surveying_boqs_content" ON surveying_boqs_content
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete surveying_boqs_content" ON surveying_boqs_content
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_surveying_boqs_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_surveying_boqs_content_updated_at ON surveying_boqs_content;

CREATE TRIGGER update_surveying_boqs_content_updated_at 
    BEFORE UPDATE ON surveying_boqs_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_surveying_boqs_content_updated_at();

-- Insert default content (only if table is empty)
INSERT INTO surveying_boqs_content (
    title,
    description,
    hero_title,
    hero_description,
    overview_title,
    overview_description,
    expertise_items,
    services,
    process_steps,
    contact_title,
    contact_description,
    is_active
) 
SELECT * FROM (VALUES
(
    'Surveying and BOQs Services',
    'Comprehensive surveying services and Bill of Quantities (BOQ) preparation. Our expert surveyors provide accurate measurements, land assessments, and detailed cost estimates.',
    'Surveying and BOQs Services',
    'Professional surveying services and comprehensive Bill of Quantities (BOQ) preparation for construction projects',
    'Service Overview',
    'Our expert team provides comprehensive surveying and BOQ services using advanced technology and industry best practices. We ensure accurate measurements, detailed cost estimates, and professional documentation for all types of construction projects.',
    ARRAY[
        'Licensed and certified surveyors',
        'Advanced GPS and surveying equipment',
        'Detailed BOQ preparation and cost estimation',
        'Professional documentation and reports'
    ],
    '[
        {
            "title": "Land Surveying",
            "description": "Comprehensive land surveying services for property boundaries, topographic mapping, and land development.",
            "features": ["Boundary Surveys", "Topographic Mapping", "Land Subdivision", "GPS Surveys"]
        },
        {
            "title": "BOQ Preparation",
            "description": "Detailed Bill of Quantities preparation with accurate cost estimation for construction projects.",
            "features": ["Quantity Takeoff", "Cost Estimation", "Material Specifications", "Labor Calculations"]
        },
        {
            "title": "Construction Surveying",
            "description": "Construction surveying services for site layout, foundation marking, and construction monitoring.",
            "features": ["Site Layout", "Foundation Marking", "Construction Monitoring", "As-Built Surveys"]
        }
    ]'::jsonb,
    '[
        {
            "step": 1,
            "title": "Initial Consultation",
            "description": "Discuss project requirements and scope"
        },
        {
            "step": 2,
            "title": "Field Survey",
            "description": "Conduct on-site measurements and data collection"
        },
        {
            "step": 3,
            "title": "Analysis & Preparation",
            "description": "Process data and prepare BOQ documentation"
        },
        {
            "step": 4,
            "title": "Final Delivery",
            "description": "Deliver comprehensive reports and documentation"
        }
    ]'::jsonb,
    'Ready to Start Your Project?',
    'Contact us today for professional surveying and BOQ services',
    true
)) AS v(title, description, hero_title, hero_description, overview_title, overview_description, expertise_items, services, process_steps, contact_title, contact_description, is_active)
WHERE NOT EXISTS (SELECT 1 FROM surveying_boqs_content);

-- Note: The 'surveyboqs' bucket already exists with surveying policies
-- No need to create new bucket or policies as they are already configured 