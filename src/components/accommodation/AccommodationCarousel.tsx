"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import type { AccommodationImage } from "@/src/data/accommodationData"

interface AccommodationCarouselProps {
  images: AccommodationImage[]
  showRating?: boolean
}

export default function AccommodationCarousel({ images, showRating = false }: AccommodationCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-64 sm:h-80 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const currentImage = images[currentIndex]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl group">
        <div className="relative w-full h-full">
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.caption}
            fill
            className="object-cover transition-opacity duration-500 ease-in-out"
            priority={currentIndex === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-3 sm:left-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#B8860B] touch-manipulation"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#B8860B] touch-manipulation"
              aria-label="Next Image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Image Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-1 break-words">{currentImage.caption}</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm sm:text-base text-white/90 break-words">{currentImage.location}</p>
              {showRating && currentImage.rating && (
                <div className="flex items-center gap-1 bg-[#B8860B] px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-white text-white" />
                  <span className="text-xs sm:text-sm font-medium text-white">{currentImage.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/50 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 touch-manipulation ${
                currentIndex === index ? "bg-[#B8860B] scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
