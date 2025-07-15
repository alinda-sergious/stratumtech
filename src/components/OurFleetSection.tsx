"use client"

import { useState } from "react"
import RealEstateCard from "./RealEstateCard"
import { useRealEstateDeals } from "@/src/lib/database-hooks"
import type { RealEstateDeal } from "@/src/lib/database-hooks"

interface OurFleetSectionProps {
  onBookClick: (itemName: string) => void
}

export default function OurFleetSection({ onBookClick }: OurFleetSectionProps) {
  const [visibleCars, setVisibleCars] = useState(6)
  const { deals, loading, error } = useRealEstateDeals()

  const handleLoadMore = () => {
    setVisibleCars((prev) => Math.min(prev + 2, deals.length))
  }

  const showLoadMore = visibleCars < deals.length

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Properties</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#001934] mb-4">
            Our <span className="text-[#B8860B]">Real Estate</span> Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our exclusive collection of premium properties and real estate opportunities
          </p>
        </div>

        {deals.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties available</h3>
            <p className="text-gray-500">Please check back later for available properties.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.slice(0, visibleCars).map((deal) => (
                <RealEstateCard
                  key={deal.id}
                  property={{
                    id: deal.id,
                    name: deal.title,
                    shortDescription: deal.short_description,
                    detailedDescription: deal.detailed_description,
                    mainImage: deal.main_image_url,
                    galleryImages: deal.gallery_images,
                    capabilities: [
                      { icon: "bed", text: `${deal.number_of_floors} bedrooms` },
                      { icon: "map-pin", text: deal.location },
                      { icon: "building", text: deal.property_type },
                      { icon: "calendar", text: `${deal.year_built}` },
                    ],
                    specifications: {
                      model: deal.property_type,
                      year: deal.year_built,
                      floors: deal.number_of_floors,
                      color: deal.primary_color,
                      entrances: deal.number_of_entrances,
                      airSystem: deal.air_system,
                      energy: deal.energy_source,
                      security: deal.security_system,
                    },
                    price: deal.price,
                    is_active: deal.is_active,
                  }}
                  onBookClick={() => onBookClick(deal.title)}
                />
              ))}
            </div>

            {showLoadMore && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="bg-[#B8860B] text-[#001934] font-semibold py-3 px-8 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Load More Properties
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
