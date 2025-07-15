-- Team Members Table
-- This table manages team members displayed on the about us page
-- Uses the existing 'teammember' bucket for image uploads

-- Drop the existing table and recreate it with the correct structure
DROP TABLE IF EXISTS team_members;

-- Create team_members table based on TeamCard structure
-- This table will store all team member information following the card structure

CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    image_url TEXT,
    experience_description TEXT,
    email VARCHAR(255),
    department VARCHAR(100),
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
DROP POLICY IF EXISTS "Enable read access for all users" ON team_members;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON team_members;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON team_members;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated users to read team_members" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated users to insert team_members" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated users to update team_members" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated users to delete team_members" ON team_members;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read team_members" ON team_members
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert team_members" ON team_members
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update team_members" ON team_members
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete team_members" ON team_members
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data from OurTeamSection
INSERT INTO team_members (id, name, position, image_url, experience_description, email, is_active, created_at) VALUES
(1, 'Amzan', 'CEO', '/images/about/team/amzan.jpeg', 'Leading the company with over 10 years of experience in construction and engineering.', 'Stratum.tech.ltd@gmail.com', true, NOW()),
(2, 'Don', 'Project Manager', '/images/about/team/don.jpeg', 'Managing complex construction projects with expertise in quality control and timeline management.', 'Stratum.tech.ltd@gmail.com', true, NOW()),
(3, 'Sarah', 'Lead Engineer', '/images/about/team/sarah.jpeg', 'Specializing in structural engineering and innovative construction solutions.', 'Stratum.tech.ltd@gmail.com', true, NOW());

-- Note: The 'teammember' bucket already exists with member details policies
-- No need to create new bucket or policies as they are already configured 