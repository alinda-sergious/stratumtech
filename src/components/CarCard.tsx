"use client"
import { Icon } from 'lucide-react';
import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bed,
  LocateIcon,
  House,
  Eye,
  LandPlot,
  Wind,
  Leaf,
  CarFrontIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import type { Car } from "@/src/data/carsData"

interface CarCardProps {
  car: Car
  onBookClick: (carName: string) => void
}

export default function CarCard({ car, onBookClick }: CarCardProps) {
  const [showGallery, setShowGallery] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case "bed":
        return <Bed className="w-5 h-5" />
      case "locateIcon":
        return <LocateIcon className="w-5 h-5" />
      case "house":
        return <House className="w-5 h-5" />
      case "landplot": // For Air Conditioned
        return <LandPlot className="w-5 h-5" />
      case "wind": // For Climate Control
        return <Wind className="w-5 h-5" />
      case "leaf": // For Eco Friendly
        return <Leaf className="w-5 h-5" />
      default:
        return <CarFrontIcon className="w-5 h-5" /> // Default icon
    }
  }

  const handleViewGalleryClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation
    e.stopPropagation() // Prevent event bubbling
    setShowGallery(true)
  }

  const handleBookClickInternal = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation
    e.stopPropagation() // Prevent event bubbling
    onBookClick(car.name)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.galleryImages.length) % car.galleryImages.length)
  }

  return (
    <>
      <Link
        href={`/cars/${car.id}`}
        className="block h-full transform hover:-translate-y-1 transition-transform duration-200"
        aria-label={`View details for ${car.name}`}
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
          {/* Main Image */}
          <div className="relative h-48 sm:h-56 w-full">
            <Image
              src={car.mainImage || "/placeholder.svg"}
              alt={car.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-[#001934] mb-2 group-hover:text-[#B8860B] transition-colors duration-200">
              {car.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{car.shortDescription}</p>

            {/* Capabilities */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {car.capabilities.slice(0, 4).map((capability, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                  <span className="text-[#B8860B]">{getCapabilityIcon(capability.icon)}</span>
                  <span>{capability.text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-auto">
              <button
                onClick={handleViewGalleryClick}
                className="flex-1 bg-gray-100 text-[#001934] font-medium py-2 px-3 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-1.5 text-sm"
                aria-label={`View gallery for ${car.name}`}
              >
                <Eye className="w-4 h-4" />
                <span>Gallery</span>
              </button>
              <button
                onClick={handleBookClickInternal}
                className="flex-1 bg-[#B8860B] text-[#001934] font-semibold py-2 px-3 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 text-sm"
                aria-label={`Book ${car.name}`}
              >
                Get Deal
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
          <div className="relative bg-[#001934] p-4 rounded-lg shadow-2xl max-w-4xl w-full">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-300 z-10 bg-black/30 rounded-full p-1.5"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-72 sm:h-96 md:h-[500px]">
              <Image
                src={car.galleryImages[currentImageIndex] || "/placeholder.svg"}
                alt={`${car.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain rounded-md"
              />
            </div>

            {car.galleryImages.length > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={prevImage}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-white text-sm">
                  {currentImageIndex + 1} / {car.galleryImages.length}
                </span>
                <button
                  onClick={nextImage}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
