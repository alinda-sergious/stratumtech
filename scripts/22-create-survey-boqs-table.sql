-- Create survey_boqs table for surveying and BOQ management
-- This table will store all surveying and Bill of Quantities data following tours structure
-- Uses the 'surveyboqs' bucket for image uploads

CREATE TABLE IF NOT EXISTS survey_boqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    long_description TEXT,
    main_image TEXT, -- Images stored in 'surveyboqs' bucket
    gallery_images TEXT[], -- Array of image URLs from 'surveyboqs' bucket
    price_per_person VARCHAR(100),
    duration VARCHAR(100),
    destination VARCHAR(255),
    category VARCHAR(100),
    itinerary JSONB,
    included TEXT[],
    excluded TEXT[],
    project_type VARCHAR(100),
    total_area DECIMAL(10,2),
    total_cost DECIMAL(15,2),
    currency VARCHAR(10) DEFAULT 'UGX',
    survey_report TEXT,
    boq_details JSONB,
    materials_list JSONB,
    labor_costs JSONB,
    equipment_costs JSONB,
    contingency_percentage DECIMAL(5,2) DEFAULT 10.00,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_survey_boqs_active ON survey_boqs(is_active);
CREATE INDEX IF NOT EXISTS idx_survey_boqs_featured ON survey_boqs(is_featured);
CREATE INDEX IF NOT EXISTS idx_survey_boqs_category ON survey_boqs(category);
CREATE INDEX IF NOT EXISTS idx_survey_boqs_project_type ON survey_boqs(project_type);

-- Enable Row Level Security
ALTER TABLE survey_boqs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to read survey_boqs" ON survey_boqs;
DROP POLICY IF EXISTS "Allow authenticated users to insert survey_boqs" ON survey_boqs;
DROP POLICY IF EXISTS "Allow authenticated users to update survey_boqs" ON survey_boqs;
DROP POLICY IF EXISTS "Allow authenticated users to delete survey_boqs" ON survey_boqs;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read survey_boqs" ON survey_boqs
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert survey_boqs" ON survey_boqs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update survey_boqs" ON survey_boqs
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete survey_boqs" ON survey_boqs
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data following tours structure (only if table is empty)
INSERT INTO survey_boqs (
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
    project_type,
    total_area,
    total_cost,
    survey_report,
    boq_details,
    materials_list,
    labor_costs,
    equipment_costs,
    is_active,
    is_featured
) 
SELECT * FROM (VALUES
(
    'Topographic Survey',
    'Accurate mapping of land features for effective project planning. Ideal for construction and development projects.',
    'Our topographic survey service provides detailed mapping of natural and man-made features on a site, including contours, elevations, trees, buildings, and utilities. Using advanced tools like GPS, total stations, and drones, we deliver precise data to support architects, engineers, and developers in planning construction projects. This service ensures accurate site analysis, reducing risks and optimizing design efficiency.',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
    ],
    'Negotiable',
    '2-5 Days',
    'All kinds of Topography',
    'Surveying',
    '[{"day": 1, "title": "Site Assessment & Setup", "description": "Conduct initial site visit, consult with client on project scope, and set up survey equipment."}, {"day": 2, "title": "Data Collection", "description": "Perform field survey using GPS, total stations, or drones to capture topographic data."}, {"day": 3, "title": "Data Processing & Delivery", "description": "Analyze collected data and produce detailed topographic maps or 3D models. Deliver final reports to client."}]',
    ARRAY['Field survey with advanced equipment', 'Topographic maps or 3D models', 'Professional surveyor fees', 'Project consultation', 'Digital and hardcopy deliverables'],
    ARRAY['Travel expenses outside specified region', 'Additional revisions beyond scope', 'Permits or regulatory fees'],
    'Residential',
    2500.00,
    850000000.00,
    'Comprehensive survey report for the topographic survey project. The survey covers all aspects including soil testing, environmental assessment, and structural requirements.',
    '{"foundation": {"concrete": "500 cubic meters", "steel": "50 tons", "cost": 150000000}, "structure": {"bricks": "100,000 pieces", "cement": "200 bags", "cost": 300000000}, "finishing": {"tiles": "2000 sqm", "paint": "500 liters", "cost": 200000000}}',
    '{"materials": [{"name": "Cement", "quantity": "500 bags", "unit_cost": 45000}, {"name": "Steel", "quantity": "50 tons", "unit_cost": 2500000}, {"name": "Bricks", "quantity": "100,000 pieces", "unit_cost": 1500}]}',
    '{"labor": [{"category": "Masons", "days": 60, "rate": 50000}, {"category": "Carpenters", "days": 45, "rate": 45000}, {"category": "Electricians", "days": 30, "rate": 55000}]}',
    '{"equipment": [{"name": "Excavator", "days": 15, "rate": 200000}, {"name": "Crane", "days": 30, "rate": 300000}, {"name": "Concrete Mixer", "days": 90, "rate": 50000}]}',
    true,
    true
),
(
    'Bill of Quantities Preparation',
    'Detailed cost estimation with precise material and labor quantities for efficient project budgeting.',
    'Our BOQ preparation service delivers comprehensive documentation of materials, labor, and quantities required for your construction project. By conducting thorough quantity takeoffs and cost analysis, we help clients, contractors, and developers create accurate budgets, streamline procurement, and support tendering processes. Our BOQs are tailored to project specifications, ensuring transparency and cost control.',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366754035-2003921654862?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
    ],
    'Negotiable',
    '4-10 Days',
    'Residential, Commercial, Infrastructure, Industrial',
    'BOQ',
    '[{"day": 1, "title": "Project Scope Review", "description": "Meet with client to review project plans, specifications, and requirements."}, {"day": 2, "title": "Quantity Takeoff", "description": "Perform detailed measurements and calculations from drawings using BOQ software like CostX."}, {"day": 3, "title": "Cost Estimation & Drafting", "description": "Compile quantities, assign unit costs, and draft initial BOQ document."}, {"day": 4, "title": "Review & Finalization", "description": "Review BOQ with client, incorporate feedback, and deliver final BOQ in digital and hardcopy formats."}]',
    ARRAY['Detailed BOQ document', 'Quantity takeoff and cost estimation', 'Use of industry-standard software', 'Consultation and revisions (up to 2 rounds)', 'Digital and hardcopy deliverables'],
    ARRAY['Site visits (if required)', 'Additional revisions beyond scope', 'Specialized consultancy fees'],
    'Commercial',
    5000.00,
    1200000000.00,
    'Detailed BOQ for the commercial project. Includes comprehensive cost breakdown for all construction phases.',
    '{"foundation": {"concrete": "800 cubic meters", "steel": "80 tons", "cost": 240000000}, "structure": {"concrete": "1200 cubic meters", "steel": "120 tons", "cost": 480000000}, "finishing": {"glass": "2000 sqm", "aluminum": "500 sqm", "cost": 300000000}}',
    '{"materials": [{"name": "Concrete", "quantity": "2000 cubic meters", "unit_cost": 150000}, {"name": "Steel", "quantity": "200 tons", "unit_cost": 2500000}, {"name": "Glass", "quantity": "2000 sqm", "unit_cost": 50000}]}',
    '{"labor": [{"category": "Structural Engineers", "days": 90, "rate": 80000}, {"category": "Masons", "days": 120, "rate": 50000}, {"category": "Electricians", "days": 60, "rate": 55000}]}',
    '{"equipment": [{"name": "Tower Crane", "days": 90, "rate": 500000}, {"name": "Excavator", "days": 30, "rate": 200000}, {"name": "Concrete Pump", "days": 60, "rate": 100000}]}',
    true,
    true
),
(
    'Boundary Survey',
    'Precise determination of property lines to resolve disputes or support land development.',
    'Our boundary survey service establishes accurate property lines to prevent disputes, support land transactions, or prepare for construction. Using legal descriptions, deeds, and field measurements, our licensed surveyors mark boundaries and provide detailed plats. This service is essential for landowners, developers, and legal professionals needing clarity on property extents.',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop'
    ],
    'Negotiable',
    '1-3 Days',
    'All sorts of landscapes',
    'Surveying',
    '[{"day": 1, "title": "Research & Planning", "description": "Review legal documents, deeds, and existing surveys to define boundary scope."}, {"day": 2, "title": "Field Survey", "description": "Conduct on-site measurements using GPS and total stations to locate boundary markers."}, {"day": 3, "title": "Plat Preparation & Delivery", "description": "Prepare boundary plat or map, mark corners if required, and deliver final report to client."}]',
    ARRAY['Construction staking for specified elements', 'As-staked drawings', 'Professional surveyor fees', 'Use of advanced survey tools', 'Digital deliverables'],
    ARRAY['Restaking due to site changes', 'Additional staking beyond scope', 'Travel expenses outside specified region'],
    'Infrastructure',
    1500.00,
    450000000.00,
    'Boundary survey report for infrastructure project. Includes detailed property line documentation and legal compliance.',
    '{"foundation": {"concrete": "300 cubic meters", "steel": "30 tons", "cost": 90000000}, "structure": {"concrete": "500 cubic meters", "steel": "60 tons", "cost": 180000000}, "finishing": {"asphalt": "1000 sqm", "markings": "500 sqm", "cost": 90000000}}',
    '{"materials": [{"name": "Concrete", "quantity": "800 cubic meters", "unit_cost": 150000}, {"name": "Steel", "quantity": "90 tons", "unit_cost": 2500000}, {"name": "Asphalt", "quantity": "1000 sqm", "unit_cost": 45000}]}',
    '{"labor": [{"category": "Surveyors", "days": 20, "rate": 60000}, {"category": "Engineers", "days": 15, "rate": 80000}, {"category": "Technicians", "days": 30, "rate": 40000}]}',
    '{"equipment": [{"name": "GPS Equipment", "days": 20, "rate": 100000}, {"name": "Total Station", "days": 20, "rate": 80000}, {"name": "Drones", "days": 5, "rate": 150000}]}',
    true,
    false
)) AS v(title, short_description, long_description, main_image, gallery_images, price_per_person, duration, destination, category, itinerary, included, excluded, project_type, total_area, total_cost, survey_report, boq_details, materials_list, labor_costs, equipment_costs, is_active, is_featured)
WHERE NOT EXISTS (SELECT 1 FROM survey_boqs);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_survey_boqs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_survey_boqs_updated_at ON survey_boqs;

CREATE TRIGGER update_survey_boqs_updated_at 
    BEFORE UPDATE ON survey_boqs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_survey_boqs_updated_at(); 