"use client"

import { useState, useEffect } from "react"
import TeamCard from "./TeamCard"
import { supabase } from "@/src/lib/supabase"

interface TeamMember {
  id: string
  name: string
  position: string
  imageUrl: string
  experienceDescription: string
  email: string
  is_active?: boolean
}

interface OurTeamSectionProps {
  onViewTeamMember: (member: TeamMember) => void
}

export default function OurTeamSection({ onViewTeamMember }: OurTeamSectionProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (error) throw error
      
      // Transform the data to match the component's expected structure
      const transformedData = (data || []).map(member => ({
        id: member.id,
        name: member.name,
        position: member.position,
        imageUrl: member.image_url, // Map from snake_case to camelCase
        experienceDescription: member.experience_description, // Map from snake_case to camelCase
        email: member.email,
        is_active: member.is_active
      }))
      
      setTeamMembers(transformedData)
    } catch (error) {
      console.error('Error fetching team members:', error)
      // Fallback to hardcoded data if database fails
      const teamMembers = [
        {
          id: "1",
          name: "Amzan",
          position: "CEO",
          imageUrl: "/images/about/team/amzan.jpeg",
          experienceDescription: "Leading the company with over 10 years of experience in construction and engineering.",
          email: "Stratum.tech.ltd@gmail.com",
        },
        {
          id: "2",
          name: "Don",
          position: "Project Manager",
          imageUrl: "/images/about/team/don.jpeg",
          experienceDescription: "Managing complex construction projects with expertise in quality control and timeline management.",
          email: "Stratum.tech.ltd@gmail.com",
        },
        {
          id: "3",
          name: "Sarah",
          position: "Lead Engineer",
          imageUrl: "/images/about/team/sarah.jpeg",
          experienceDescription: "Specializing in structural engineering and innovative construction solutions.",
          email: "Stratum.tech.ltd@gmail.com",
        },
      ]
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-4 font-arizona">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the passionate professionals bringing the visions to life with unmatched collaboration
            </p>
          </div>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-[#001934]">Loading team members...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-4 font-arizona">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the passionate professionals bringing the visions to life with unmatched collaboration
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} onViewClick={onViewTeamMember} />
          ))}
        </div>
      </div>
    </section>
  )
}
