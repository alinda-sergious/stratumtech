"use client"

import { useState, useEffect } from "react"
import MissionVisionSection from "@/src/components/MissionVisionSection"
import OurTeamSection from "@/src/components/OurTeamSection"
import TeamMemberModal from "@/src/components/TeamMemberModal"
import WhyChooseUsSection from "@/src/components/WhyChooseUsSection"
import PartnersSection from "@/src/components/PartnersSection"

interface TeamMember {
  id: string
  name: string
  position: string
  imageUrl: string
  experienceDescription: string
  email: string
}

export default function AboutPage() {
  // State management for team member modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Handler to open team member modal
  const handleViewTeamMember = (member: TeamMember) => {
    setSelectedTeamMember(member)
    setIsModalOpen(true)
  }

  // Handler to close team member modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTeamMember(null)
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Main Page Title with Background Image */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/shivendu-shukla-3yoTPuYR9ZY-unsplash.jpg"
            alt="About Us"
            className="w-full h-full object-cover animate-zoom-in"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#001934]/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-arizona mb-6">
            <span className="text-white">About </span>
            <span className="text-[#B8860B]">Us</span>
          </h1>
          <p className="text-lg lg:text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Bring your dream to life with us - where visions are seamlessly transformed into reality with cutting edge technologies in the innovation world.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <MissionVisionSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Our Team Section */}
      <OurTeamSection onViewTeamMember={handleViewTeamMember} />

      {/* Partners Section */}
      <PartnersSection />

      {/* Team Member Modal */}
      <TeamMemberModal isOpen={isModalOpen} onClose={handleCloseModal} memberDetails={selectedTeamMember} />
    </div>
  )
}
