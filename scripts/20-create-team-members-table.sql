-- Create team_members table for team member management
-- This table will store all team member information and details
-- Uses the 'teammember' bucket for image uploads

CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    bio TEXT,
    main_image TEXT, -- Images stored in 'teammember' bucket
    gallery_images TEXT[], -- Array of image URLs from 'teammember' bucket
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    experience_years INTEGER,
    specializations TEXT[],
    education TEXT[],
    certifications TEXT[],
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_members_featured ON team_members(is_featured);
CREATE INDEX IF NOT EXISTS idx_team_members_department ON team_members(department);
CREATE INDEX IF NOT EXISTS idx_team_members_position ON team_members(position);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to read team_members" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated users to insert team_members" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated users to update team_members" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated users to delete team_members" ON team_members;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read team_members" ON team_members
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert team_members" ON team_members
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update team_members" ON team_members
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete team_members" ON team_members
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data (only if table is empty)
INSERT INTO team_members (
    name,
    position,
    department,
    bio,
    main_image,
    gallery_images,
    email,
    phone,
    linkedin_url,
    experience_years,
    specializations,
    education,
    certifications,
    is_active,
    is_featured,
    display_order
) 
SELECT * FROM (VALUES
(
    'John Muwonge',
    'Chief Executive Officer',
    'Executive',
    'John Muwonge is a seasoned construction executive with over 15 years of experience in the industry. He has successfully led numerous high-profile projects across Uganda and East Africa, specializing in large-scale infrastructure and commercial developments.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    ARRAY[
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    ],
    'john.muwonge@stratumtech.ug',
    '+256 701 234 567',
    'https://linkedin.com/in/john-muwonge',
    15,
    ARRAY['Project Management', 'Strategic Planning', 'Business Development'],
    ARRAY['BSc Civil Engineering - Makerere University', 'MBA - University of Manchester'],
    ARRAY['PMP Certification', 'LEED Green Associate'],
    true,
    true,
    1
),
(
    'Sarah Nalukenge',
    'Chief Operations Officer',
    'Operations',
    'Sarah Nalukenge oversees all operational aspects of our construction projects. With her background in civil engineering and project management, she ensures that all projects are delivered on time, within budget, and to the highest quality standards.',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    ARRAY[
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    ],
    'sarah.nalukenge@stratumtech.ug',
    '+256 702 345 678',
    'https://linkedin.com/in/sarah-nalukenge',
    12,
    ARRAY['Operations Management', 'Quality Control', 'Team Leadership'],
    ARRAY['BSc Civil Engineering - Makerere University', 'MSc Construction Management - University of London'],
    ARRAY['Six Sigma Black Belt', 'ISO 9001 Lead Auditor'],
    true,
    true,
    2
),
(
    'David Okello',
    'Senior Project Manager',
    'Project Management',
    'David Okello brings extensive experience in managing complex construction projects. He specializes in residential and commercial developments, with a proven track record of delivering projects that exceed client expectations.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    ARRAY[
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    ],
    'david.okello@stratumtech.ug',
    '+256 703 456 789',
    'https://linkedin.com/in/david-okello',
    10,
    ARRAY['Project Planning', 'Risk Management', 'Stakeholder Communication'],
    ARRAY['BSc Construction Management - Makerere University', 'PMP Certification'],
    ARRAY['PMP', 'PRINCE2 Practitioner'],
    true,
    false,
    3
)) AS v(name, position, department, bio, main_image, gallery_images, email, phone, linkedin_url, experience_years, specializations, education, certifications, is_active, is_featured, display_order)
WHERE NOT EXISTS (SELECT 1 FROM team_members);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_team_members_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;

CREATE TRIGGER update_team_members_updated_at 
    BEFORE UPDATE ON team_members 
    FOR EACH ROW 
    EXECUTE FUNCTION update_team_members_updated_at(); 