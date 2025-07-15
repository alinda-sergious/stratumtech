"use client"

import { X, Mail } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  position: string
  imageUrl: string
  experienceDescription: string
  email: string
}

interface TeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  memberDetails: TeamMember | null
}

export default function TeamMemberModal({ isOpen, onClose, memberDetails }: TeamMemberModalProps) {
  if (!isOpen || !memberDetails) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#001934]/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all animate-in fade-in-0 zoom-in-95 duration-300">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-white rounded-full p-2 shadow-md"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Image Section - Left side on desktop, top on mobile */}
            <div className="lg:w-1/2 relative">
              <div className="relative h-64 lg:h-96 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none overflow-hidden">
                <Image
                  src={memberDetails.imageUrl || "/placeholder.svg"}
                  alt={memberDetails.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details Section - Right side on desktop, bottom on mobile */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-3 font-arizona">{memberDetails.name}</h2>

              <p className="text-xl text-[#B8860B] font-semibold mb-6">{memberDetails.position}</p>

              <p className="text-gray-700 leading-relaxed mb-6 text-base lg:text-lg">
                {memberDetails.experienceDescription}
              </p>

              {/* Email Contact */}
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
                <Mail className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
                <a
                  href={`mailto:${memberDetails.email}`}
                  className="text-[#001934] hover:text-[#B8860B] transition-colors duration-200 font-medium"
                >
                  {memberDetails.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
