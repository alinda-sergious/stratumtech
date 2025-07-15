-- Create homepage table for homepage content management
-- This table will store all homepage content including videos and sections
-- Uses the 'homepage' bucket for image and video uploads

CREATE TABLE IF NOT EXISTS homepage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_name VARCHAR(100) NOT NULL,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    main_image TEXT, -- Images stored in 'homepage' bucket
    video_url TEXT, -- Videos stored in 'homepage' bucket
    button_text VARCHAR(100),
    button_link VARCHAR(255),
    content_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_homepage_active ON homepage(is_active);
CREATE INDEX IF NOT EXISTS idx_homepage_section ON homepage(section_name);
CREATE INDEX IF NOT EXISTS idx_homepage_order ON homepage(content_order);
CREATE INDEX IF NOT EXISTS idx_homepage_created_at ON homepage(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE homepage ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to read homepage" ON homepage;
DROP POLICY IF EXISTS "Allow authenticated users to insert homepage" ON homepage;
DROP POLICY IF EXISTS "Allow authenticated users to update homepage" ON homepage;
DROP POLICY IF EXISTS "Allow authenticated users to delete homepage" ON homepage;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read homepage" ON homepage
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert homepage" ON homepage
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update homepage" ON homepage
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete homepage" ON homepage
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_homepage_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_homepage_updated_at ON homepage;

CREATE TRIGGER update_homepage_updated_at 
    BEFORE UPDATE ON homepage 
    FOR EACH ROW 
    EXECUTE FUNCTION update_homepage_updated_at();

-- Insert sample data for homepage (only if table is empty)
INSERT INTO homepage (
    section_name,
    title,
    subtitle,
    description,
    main_image,
    video_url,
    button_text,
    button_link,
    content_order,
    is_active
) 
SELECT * FROM (VALUES
(
    'hero',
    'Build For the Future With Us',
    'Ensuring integrity in all aspects to arrive at breathtaking Engineering',
    'We are committed to delivering exceptional construction services across Uganda, from residential projects to major infrastructure developments.',
    '/images/homepage/hero-bg.jpg',
    '/videos/homepage/hero-video.mp4',
    'Explore Projects',
    '/UpcomingEvent',
    1,
    true
),
(
    'about',
    'About Stratum Tech Ug Ltd',
    'Your Trusted Construction Partner',
    'With years of experience in the construction industry, we specialize in delivering high-quality projects that meet international standards. Our team of experts ensures every project is completed with precision and excellence.',
    '/images/homepage/about-section.jpg',
    NULL,
    'Learn More',
    '/about',
    2,
    true
),
(
    'services',
    'Our Construction Services',
    'Comprehensive Solutions for Every Project',
    'From residential construction to major infrastructure projects, we offer a full range of construction services tailored to meet your specific needs.',
    '/images/homepage/services-bg.jpg',
    NULL,
    'View Services',
    '/services',
    3,
    true
)) AS v(section_name, title, subtitle, description, main_image, video_url, button_text, button_link, content_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM homepage);

-- Verify the data
SELECT 
    id, 
    section_name, 
    title, 
    content_order,
    is_active,
    created_at
FROM homepage 
ORDER BY content_order ASC; 