"use client"

import Image from "next/image"
import Link from "next/link"
import type { Tour } from "@/src/data/toursData"

interface TourCardProps {
  imageUrl: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  tourId: string
  onBookClick: (tourTitle: string) => void
  tour?: Tour // Optional full tour object
}

export default function TourCard({
  imageUrl,
  title,
  description,
  ctaText,
  ctaLink,
  tourId,
  onBookClick,
  tour,
}: TourCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 min-w-[300px] sm:min-w-[350px]">
      {/* Image */}
      <div className="relative h-48 sm:h-56">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#001934] mb-3 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-3">{description}</p>

        {/* Action Button */}
        <div className="flex">
          <button
            onClick={() => onBookClick(title)}
            className="w-full bg-[#B8860B] text-[#001934] font-semibold py-2 px-4 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  )
}
