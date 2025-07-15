"use client"

import { useState, useEffect } from "react"
import CarCard from "@/src/components/CarCard"
import BookingModal from "@/src/components/BookingModal"
import { useCars } from "@/src/lib/database-hooks"
import type { Car } from "@/src/lib/database-hooks"

const INITIAL_ITEMS_DISPLAYED = 6 // Initially show 6 cars (2 rows of 3)
const ITEMS_PER_LOAD = 6 // Load next 6 cars on click

export default function CarRentalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCarName, setSelectedCarName] = useState<string>("")
  const [isLoadingInitial, setIsLoadingInitial] = useState(true) // For initial skeleton
  const [displayedCars, setDisplayedCars] = useState<Car[]>([])
  const [numDisplayed, setNumDisplayed] = useState(INITIAL_ITEMS_DISPLAYED)
  const { cars, loading, error } = useCars()

  useEffect(() => {
    if (!loading && cars.length > 0) {
      setIsLoadingInitial(true)
      // Simulate API call or data loading for initial set
      setTimeout(() => {
        setDisplayedCars(cars.slice(0, INITIAL_ITEMS_DISPLAYED))
        setIsLoadingInitial(false)
      }, 500)
    }
  }, [cars, loading])

  const handleLoadMore = () => {
    const newNumDisplayed = Math.min(numDisplayed + ITEMS_PER_LOAD, cars.length)
    setNumDisplayed(newNumDisplayed)
    // To ensure smooth animation for newly added items, we can add them incrementally
    // or just update the slice. For simplicity, updating the slice.
    setDisplayedCars(cars.slice(0, newNumDisplayed))
  }

  const handleOpenBookingModal = (carName: string) => {
    setSelectedCarName(carName)
    setIsModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
    setSelectedCarName("")
  }

  const allCarsLoaded = numDisplayed >= cars.length

  if (loading || isLoadingInitial) {
    return (
      <div className="min-h-screen pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Cars</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#001934] mb-2">Real Estate Deals</h1>
          <p className="text-gray-600">
            Discover exclusive real estate opportunities and property listings
          </p>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No properties available</h2>
            <p className="text-gray-500">Please check back later for available properties.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={{
                    id: car.id,
                    name: car.name,
                    shortDescription: car.short_description,
                    detailedDescription: car.detailed_description,
                    mainImage: car.main_image,
                    galleryImages: car.gallery_images,
                    capabilities: car.capabilities,
                    specifications: car.specifications,
                    price: car.price_per_day,
                    is_active: car.is_active,
                  }}
                  onBookClick={() => handleOpenBookingModal(car.name)}
                />
              ))}
            </div>

            {!allCarsLoaded && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="bg-[#B8860B] hover:bg-[#A67C0A] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Load More Properties
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBookingModal}
        selectedItemName={selectedCarName}
      />
    </div>
  )
}
