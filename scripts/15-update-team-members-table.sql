-- Update team_members table to match the about us page structure
-- Drop existing table if it exists
DROP TABLE IF EXISTS team_members CASCADE;

-- Create team_members table with correct field names
CREATE TABLE team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    imageUrl TEXT NOT NULL,
    experienceDescription TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_team_members_name ON team_members(name);
CREATE INDEX idx_team_members_position ON team_members(position);
CREATE INDEX idx_team_members_is_active ON team_members(is_active);
CREATE INDEX idx_team_members_created_at ON team_members(created_at);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Enable read access for all users" ON team_members;
CREATE POLICY "Enable read access for all users" ON team_members
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON team_members;
CREATE POLICY "Enable insert for authenticated users only" ON team_members
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON team_members;
CREATE POLICY "Enable update for authenticated users only" ON team_members
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON team_members;
CREATE POLICY "Enable delete for authenticated users only" ON team_members
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger
DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;
CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data from OurTeamSection
INSERT INTO team_members (name, position, imageUrl, experienceDescription, email) VALUES
(
    'Tumusiime Simon Peter',
    'Managing Director',
    '/images/about/team/sergio.jpg.webp',
    'Strategy, operations while managing key client relations.',
    'Stratum.tech.ltd@gmail.com'
),
(
    'Ninesiga Frank Muhoozi',
    'Director of Finance',
    'https://via.placeholder.com/150/001934/B8860B?text=Clarise',
    'Procurement, budgeting and financial reporting ensuring efficient flow of processes',
    'Stratum.tech.ltd@gmail.com'
),
(
    'Mulinde Bizmark',
    'Director of Engineering',
    'https://via.placeholder.com/150/001934/B8860B?text=Vincent',
    'Site management, ensuring compliance to regulations while overseeing staff',
    'Stratum.tech.ltd@gmail.com'
),
(
    'Baturaine Faisal',
    'Secretary',
    'https://via.placeholder.com/150/B8860B/001934?text=Dieudonne',
    'Supports technical documentations, prepares bids and ensuring coordination amongst stakeholders',
    'Stratum.tech.ltd@gmail.com'
),
(
    'Alinda Sergious',
    'Software Engineer & IT Support Specialist',
    '/images/about/team/sergio.jpg.webp',
    'Alinda Sergious is our Software Engineer & IT Support Specialist, expertly developing efficient software and providing comprehensive IT support. He ensure our technology operates seamlessly for everyone.',
    'alindasergio@gmail.com'
);

-- Grant permissions
GRANT ALL ON team_members TO authenticated;
GRANT ALL ON team_members TO anon;
GRANT ALL ON team_members TO service_role; 