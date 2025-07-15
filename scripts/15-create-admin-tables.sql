-- Create homepage_settings table
CREATE TABLE IF NOT EXISTS homepage_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    hero_video_url TEXT,
    hero_title TEXT DEFAULT 'Bring Your Vision To Life',
    hero_subtitle TEXT DEFAULT 'Amazing Engineering deals with quality to offer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create survey_boqs table
CREATE TABLE IF NOT EXISTS survey_boqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT,
    category TEXT DEFAULT 'Survey',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default homepage settings
INSERT INTO homepage_settings (hero_title, hero_subtitle)
VALUES ('Bring Your Vision To Life', 'Amazing Engineering deals with quality to offer')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partners_active ON partners(is_active);
CREATE INDEX IF NOT EXISTS idx_survey_boqs_category ON survey_boqs(category);
CREATE INDEX IF NOT EXISTS idx_survey_boqs_active ON survey_boqs(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE homepage_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_boqs ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read homepage_settings" ON homepage_settings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert homepage_settings" ON homepage_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update homepage_settings" ON homepage_settings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read partners" ON partners
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert partners" ON partners
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update partners" ON partners
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete partners" ON partners
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read survey_boqs" ON survey_boqs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert survey_boqs" ON survey_boqs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update survey_boqs" ON survey_boqs
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete survey_boqs" ON survey_boqs
    FOR DELETE USING (auth.role() = 'authenticated'); 