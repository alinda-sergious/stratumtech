"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, DollarSign } from "lucide-react"
import type { Tour } from "@/src/data/toursData"

interface TourCardHorizontalProps {
  tour: Tour
  onBookClick: (tourTitle: string) => void
}

export default function TourCardHorizontal({ tour, onBookClick }: TourCardHorizontalProps) {
  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation
    e.stopPropagation() // Prevent event bubbling
    onBookClick(tour.title)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section - Left side on desktop */}
        <div className="md:w-2/5 relative h-64 md:h-auto">
          <Image
            src={tour.mainImage || "/placeholder.svg"}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {tour.category && (
            <div className="absolute top-4 left-4 bg-[#B8860B] text-[#001934] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
              {tour.category}
            </div>
          )}
        </div>

        {/* Content Section - Right side on desktop */}
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div className="flex-grow">
            <h3 className="text-xl lg:text-2xl font-bold text-[#001934] mb-3 font-arizona line-clamp-2 group-hover:text-[#B8860B] transition-colors duration-300">
              {tour.title}
            </h3>

            {/* Tour Details */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
              {tour.duration && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5 text-[#B8860B]" />
                  <span>{tour.duration}</span>
                </div>
              )}
              {tour.destination && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5 text-[#B8860B]" />
                  <span className="line-clamp-1">{tour.destination}</span>
                </div>
              )}
              {tour.pricePerPerson && (
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1.5 text-[#B8860B]" />
                  <span className="font-semibold text-green-600">{tour.pricePerPerson}</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">{tour.shortDescription}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-auto">
            <Link
              href={`/tours/${tour.id}`}
              className="flex-1 border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#001934] font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-center text-sm"
            >
              View Details
            </Link>
            <button
              onClick={handleBookClick}
              className="flex-1 bg-[#B8860B] text-[#001934] font-semibold py-2.5 px-4 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
