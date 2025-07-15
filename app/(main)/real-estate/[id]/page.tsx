"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/src/lib/supabase"
import { 
  MapPin, 
  Calendar, 
  Building2, 
  Home, 
  Hotel, 
  Store, 
  Factory,
  Bed,
  Users,
  Shield,
  Wind,
  Zap,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react"
import Link from "next/link"

interface RealEstateDeal {
  id: string
  title: string
  short_description: string
  detailed_description: string
  main_image_url: string
  gallery_images: string[]
  property_type: string
  year_built: number
  number_of_floors: number
  primary_color: string
  number_of_entrances: number
  air_system: string
  energy_source: string
  security_system: string
  price: string
  location: string
  is_featured: boolean
  is_active: boolean
  created_at?: string
}

export default function RealEstateDetailPage() {
  const params = useParams()
  const [property, setProperty] = useState<RealEstateDeal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('real_estate_deals')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) {
          throw error
        }

        setProperty(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch property')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProperty()
    }
  }, [params.id])

  const getPropertyTypeIcon = (propertyType: string) => {
    switch (propertyType.toLowerCase()) {
      case 'apartment':
        return <Home className="w-6 h-6" />
      case 'hotel':
        return <Hotel className="w-6 h-6" />
      case 'commercial':
        return <Store className="w-6 h-6" />
      case 'industrial':
        return <Factory className="w-6 h-6" />
      default:
        return <Building2 className="w-6 h-6" />
    }
  }

  const nextImage = () => {
    if (property?.gallery_images) {
      setCurrentImageIndex((prev) => (prev + 1) % property.gallery_images.length)
    }
  }

  const prevImage = () => {
    if (property?.gallery_images) {
      setCurrentImageIndex((prev) => (prev - 1 + property.gallery_images.length) % property.gallery_images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-20 p-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The property you are looking for does not exist.'}</p>
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#A67C0A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-[#B8860B] hover:text-[#A67C0A] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </Link>

        {/* Property Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-[#B8860B]">{getPropertyTypeIcon(property.property_type)}</span>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {property.property_type}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-[#001934] mb-4">{property.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Built in {property.year_built}</span>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={property.main_image_url || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowGallery(true)}
              className="bg-white/90 backdrop-blur-sm text-[#001934] p-3 rounded-lg hover:bg-white transition-colors"
            >
              <Eye className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#001934] mb-4">Property Description</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{property.detailed_description}</p>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#001934] mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-[#B8860B]" />
                  <div>
                    <p className="text-sm text-gray-600">Property Type</p>
                    <p className="font-medium">{property.property_type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Bed className="w-5 h-5 text-[#B8860B]" />
                  <div>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="font-medium">{property.number_of_floors}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#B8860B]" />
                  <div>
                    <p className="text-sm text-gray-600">Entrances</p>
                    <p className="font-medium">{property.number_of_entrances}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Wind className="w-5 h-5 text-[#B8860B]" />
                  <div>
                    <p className="text-sm text-gray-600">Air System</p>
                    <p className="font-medium">{property.air_system}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-[#B8860B]" />
                  <div>
                    <p className="text-sm text-gray-600">Energy Source</p>
                    <p className="font-medium">{property.energy_source}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#B8860B]" />
                  <div>
                    <p className="text-sm text-gray-600">Security</p>
                    <p className="font-medium">{property.security_system}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-[#B8860B] text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Price</h3>
              <p className="text-3xl font-bold">{property.price}</p>
              <p className="text-sm opacity-90 mt-2">Contact us for more details</p>
            </div>

            {/* Contact Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#001934] mb-4">Contact Us</h3>
              <div className="space-y-4">
                <button className="w-full bg-[#B8860B] text-white py-3 px-4 rounded-lg hover:bg-[#A67C0A] transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </button>
                <button className="w-full bg-gray-100 text-[#001934] py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Send Email</span>
                </button>
                <button className="w-full bg-gray-100 text-[#001934] py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Modal */}
        {showGallery && property.gallery_images && property.gallery_images.length > 0 && (
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
                  src={property.gallery_images[currentImageIndex] || property.main_image_url}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              {property.gallery_images.length > 1 && (
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
                  {currentImageIndex + 1} of {property.gallery_images.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 