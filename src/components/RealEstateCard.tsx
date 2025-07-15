"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bed,
  MapPin,
  Building2,
  Calendar,
  Home,
  Hotel,
  Store,
  Factory,
  LandPlot,
  Users,
  Shield,
  Wind,
  Zap,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface RealEstateCapability {
  icon: string
  text: string
}

interface RealEstateSpecification {
  model: string
  year: number
  floors: number
  color: string
  entrances: number
  airSystem: string
  energy: string
  security: string
}

interface RealEstate {
  id: string
  name: string
  shortDescription: string
  detailedDescription: string
  mainImage: string
  galleryImages: string[]
  capabilities: RealEstateCapability[]
  specifications: RealEstateSpecification
  price: string
  is_active?: boolean
}

interface RealEstateCardProps {
  property: RealEstate
  onBookClick: (propertyName: string) => void
}

export default function RealEstateCard({ property, onBookClick }: RealEstateCardProps) {
  const [showGallery, setShowGallery] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case "bed":
        return <Bed className="w-5 h-5" />
      case "map-pin":
        return <MapPin className="w-5 h-5" />
      case "building":
        return <Building2 className="w-5 h-5" />
      case "calendar":
        return <Calendar className="w-5 h-5" />
      case "home":
        return <Home className="w-5 h-5" />
      case "hotel":
        return <Hotel className="w-5 h-5" />
      case "store":
        return <Store className="w-5 h-5" />
      case "factory":
        return <Factory className="w-5 h-5" />
      case "landplot":
        return <LandPlot className="w-5 h-5" />
      case "users":
        return <Users className="w-5 h-5" />
      case "shield":
        return <Shield className="w-5 h-5" />
      case "wind":
        return <Wind className="w-5 h-5" />
      case "zap":
        return <Zap className="w-5 h-5" />
      default:
        return <Building2 className="w-5 h-5" />
    }
  }

  const handleViewGalleryClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowGallery(true)
  }

  const handleBookClickInternal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onBookClick(property.name)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.galleryImages.length) % property.galleryImages.length)
  }

  return (
    <>
      <Link
        href={`/real-estate/${property.id}`}
        className="block h-full transform hover:-translate-y-1 transition-transform duration-200"
        aria-label={`View details for ${property.name}`}
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
          {/* Main Image */}
          <div className="relative h-48 sm:h-56 w-full">
            <Image
              src={property.mainImage || "/placeholder.svg"}
              alt={property.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Property Type Badge */}
            <div className="absolute top-4 left-4 bg-[#B8860B] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
              {property.specifications.model}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-[#001934] mb-2 group-hover:text-[#B8860B] transition-colors duration-200">
              {property.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{property.shortDescription}</p>

            {/* Capabilities */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {property.capabilities.slice(0, 4).map((capability, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                  <span className="text-[#B8860B]">{getCapabilityIcon(capability.icon)}</span>
                  <span>{capability.text}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mb-4">
              <p className="text-lg font-semibold text-[#B8860B]">{property.price}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={handleViewGalleryClick}
                className="flex-1 bg-gray-100 text-[#001934] font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Gallery</span>
              </button>
              <button
                onClick={handleBookClickInternal}
                className="flex-1 bg-[#B8860B] text-[#001934] font-semibold py-2 px-4 rounded-lg hover:bg-[#A67C0A] transition-colors duration-200"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative h-96 sm:h-[500px]">
              <Image
                src={property.galleryImages[currentImageIndex] || property.mainImage}
                alt={`${property.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {property.galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <div className="text-center mt-4 text-white">
              <p className="text-sm">
                {currentImageIndex + 1} of {property.galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 