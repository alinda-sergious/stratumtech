"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
  altText: string
}

export default function ImageCarousel({ images, altText }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 text-sm sm:text-base">No images available</p>
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

  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-lg overflow-hidden shadow-xl group">
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${altText} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500 ease-in-out"
          priority={currentIndex === 0}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <>
          {/* Navigation Buttons - Larger touch targets for mobile */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-200 opacity-80 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#B8860B] touch-manipulation"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-200 opacity-80 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#B8860B] touch-manipulation"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator - Larger for mobile */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 touch-manipulation ${
                  currentIndex === index ? "bg-[#B8860B] scale-125" : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter - Mobile-friendly */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/50 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}
