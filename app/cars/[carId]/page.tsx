"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import { carsData } from "@/src/data/carsData"
import type { Car } from "@/src/data/carsData"
import BookingModal from "@/src/components/BookingModal"
import { CarFront, CalendarDays, DoorOpen, Palette, Users, Settings, Wrench, Fuel, NotebookTabsIcon } from "lucide-react"

// Helper to get appropriate icon
const getSpecIcon = (specName: string) => {
  switch (specName.toLowerCase()) {
    case "model":
      return <NotebookTabsIcon className="w-7 h-7 text-[#B8860B]" />
    case "year":
      return <CalendarDays className="w-7 h-7 text-[#B8860B]" />
    case "floors":
      return <DoorOpen className="w-7 h-7 text-[#B8860B]" />
    case "color":
      return <Palette className="w-7 h-7 text-[#B8860B]" />
    case "entrances":
      return <Users className="w-7 h-7 text-[#B8860B]" />
    case "airsystem":
      return <Settings className="w-7 h-7 text-[#B8860B]" />
    case "energy":
      return <Wrench className="w-7 h-7 text-[#B8860B]" />
    case "security": // Matched to data
      return <Fuel className="w-7 h-7 text-[#B8860B]" />
    default:
      return <NotebookTabsIcon className="w-7 h-7 text-[#B8860B]" />
  }
}

export default function CarDetailsPage() {
  const params = useParams()
  const carId = params.carId as string

  const [car, setCar] = useState<Car | null>(null)
  const [currentMainImage, setCurrentMainImage] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isImageLoading, setIsImageLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const foundCar = carsData.find((c) => c.id === carId)
    if (foundCar) {
      setCar(foundCar)
      setCurrentMainImage(foundCar.mainImage)
    }
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [carId])

  const handleThumbnailClick = (imageSrc: string) => {
    setIsImageLoading(true)
    setCurrentMainImage(imageSrc)
    // Allow time for CSS transition to start before removing loading state
    setTimeout(() => setIsImageLoading(false), 50) // Small delay
  }

  const handleOpenBookingModal = () => {
    if (car) {
      setIsModalOpen(true)
    }
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16 lg:pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#B8860B]"></div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4 pt-16 lg:pt-20">
        <div>
          <h1 className="text-3xl font-bold text-[#001934] mb-4">Deal Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the Deal you're looking for.</p>
          <a
            href="/services/car-rental"
            className="bg-[#B8860B] text-[#001934] font-semibold py-3 px-6 rounded-lg hover:bg-[#B8860B]/90 transition-all"
          >
            Back to Real Estates
          </a>
        </div>
      </div>
    )
  }

  const carSpecs = [
    { name: "Property Type", value: car.specifications.model },
    { name: "Year Built", value: car.specifications.year.toString() },
    { name: "Number of Floors", value: car.specifications.floors.toString() },
    { name: "Primary Colour", value: car.specifications.color },
    { name: "Number of Entrances", value: car.specifications.entrances.toString() },
    { name: "Air System", value: car.specifications.airSystem },
    { name: "Energy Source", value: car.specifications.energy },
    { name: "Security System", value: car.specifications.security },
  ]

  // Create a unique list of gallery images including the main image, prioritizing mainImage first
  const uniqueGalleryImages = [car.mainImage, ...car.galleryImages.filter((img) => img !== car.mainImage)]

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-white animate-in fade-in-0 duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-center lg:text-left animate-in fade-in-0 slide-in-from-top-5 duration-500">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001934] font-arizona">{car.name}</h1>
          {car.price && <p className="text-2xl text-[#B8860B] font-semibold mt-2">{car.price}</p>}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-3 animate-in fade-in-0 slide-in-from-left-10 duration-500 delay-100">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl mb-4">
              <Image
                key={currentMainImage} // Add key to trigger re-render for transition
                src={currentMainImage || "/placeholder.svg"}
                alt={car.name}
                fill
                className={`object-cover transition-opacity duration-500 ease-in-out ${isImageLoading ? "opacity-50" : "opacity-100"}`}
                priority
                onLoadingComplete={() => setIsImageLoading(false)}
              />
            </div>
            {uniqueGalleryImages.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {uniqueGalleryImages.slice(0, 5).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(img)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 hover:opacity-100 hover:border-[#B8860B]
                                ${currentMainImage === img ? "border-[#B8860B] opacity-100 ring-2 ring-[#B8860B]" : "border-transparent opacity-75"}`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${car.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 animate-in fade-in-0 slide-in-from-right-10 duration-500 delay-200">
            <h2 className="text-2xl font-bold text-[#001934] mb-4 font-arizona">Estate Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">{car.detailedDescription}</p>
            <button
              onClick={handleOpenBookingModal}
              className="w-full bg-[#B8860B] text-[#001934] font-semibold py-3.5 px-8 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
            >
              Get Deal
            </button>
          </div>
        </div>

        <section className="py-10 border-t border-gray-200 animate-in fade-in-0 slide-in-from-bottom-10 duration-500 delay-300">
          <h2 className="text-3xl font-bold text-[#001934] mb-8 text-center font-arizona">Deal Details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8">
            {carSpecs.map((spec) => (
              <div
                key={spec.name}
                className="bg-gray-50 p-5 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
              >
                <div className="mb-2.5">{getSpecIcon(spec.name)}</div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-0.5">{spec.name}</h3>
                <p className="text-lg font-medium text-[#001934]">{spec.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {car && <BookingModal isOpen={isModalOpen} onClose={handleCloseBookingModal} selectedItemName={car.name} />}
    </div>
  )
}
