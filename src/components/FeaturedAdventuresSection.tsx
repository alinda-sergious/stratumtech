"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TourCard from "./TourCard"
import { useFeaturedServices } from "@/src/lib/database-hooks"

interface FeaturedAdventuresSectionProps {
  onBookClick: (tourTitle: string) => void
}

export default function FeaturedAdventuresSection({ onBookClick }: FeaturedAdventuresSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { services, loading, error } = useFeaturedServices()

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Services</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-4">Featured Construction Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide personalised and high quality construction services. Partner with us to bring your construction vision to life with unparalleled expertise and dedication.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No featured services available</h3>
            <p className="text-gray-500">Please check back later for available services.</p>
          </div>
        ) : (
          /* Services Container */
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hidden lg:block"
            >
              <ChevronLeft className="w-6 h-6 text-[#001934]" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hidden lg:block"
            >
              <ChevronRight className="w-6 h-6 text-[#001934]" />
            </button>

            {/* Scrollable Services */}
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {services.map((service) => (
                <TourCard
                  key={service.id}
                  imageUrl={service.image_url}
                  title={service.title}
                  description={service.description}
                  ctaText={service.cta_text}
                  ctaLink={service.cta_link}
                  tourId={service.service_id}
                  onBookClick={onBookClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
