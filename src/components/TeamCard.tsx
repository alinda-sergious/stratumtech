"use client"

import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  position: string
  imageUrl: string
  experienceDescription: string
  email: string
}

interface TeamCardProps {
  member: TeamMember
  onViewClick: (member: TeamMember) => void
}

export default function TeamCard({ member, onViewClick }: TeamCardProps) {
  // Handle undefined or null experienceDescription
  const experienceDescription = member.experienceDescription || ""
  const previewText = experienceDescription.length > 100 
    ? `${experienceDescription.substring(0, 100)}...` 
    : experienceDescription

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Member Image */}
      <div className="relative h-48 sm:h-56">
        <Image src={member.imageUrl || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#001934] mb-2 font-arizona">{member.name}</h3>
        <p className="text-[#B8860B] font-semibold mb-4">{member.position}</p>

        {/* Brief description preview */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{previewText}</p>

        {/* View Button */}
        <button
          onClick={() => onViewClick(member)}
          className="w-full bg-[#B8860B] text-[#001934] font-semibold py-3 px-6 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      </div>
    </div>
  )
}
