-- Fix RLS policies for ongoing_projects table
-- This script adds public read access for active projects while maintaining security for admin operations

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read ongoing_projects" ON ongoing_projects;
DROP POLICY IF EXISTS "Allow authenticated users to insert ongoing_projects" ON ongoing_projects;
DROP POLICY IF EXISTS "Allow authenticated users to update ongoing_projects" ON ongoing_projects;
DROP POLICY IF EXISTS "Allow authenticated users to delete ongoing_projects" ON ongoing_projects;

-- Create new policies that allow public read access for active projects
-- Public can read active projects (for the website)
CREATE POLICY "Allow public to read active ongoing_projects" ON ongoing_projects
    FOR SELECT USING (is_active = true);

-- Authenticated users can read all projects (for admin panel)
CREATE POLICY "Allow authenticated users to read all ongoing_projects" ON ongoing_projects
    FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated users can insert projects
CREATE POLICY "Allow authenticated users to insert ongoing_projects" ON ongoing_projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update projects
CREATE POLICY "Allow authenticated users to update ongoing_projects" ON ongoing_projects
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Authenticated users can delete projects
CREATE POLICY "Allow authenticated users to delete ongoing_projects" ON ongoing_projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Verify the policies are working
-- This should return all active projects for public access
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
WHERE is_active = true
ORDER BY created_at DESC; 