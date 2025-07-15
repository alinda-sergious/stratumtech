"use client"

import { useState, useEffect, useMemo } from "react"
import EventCard from "@/src/components/EventCard"
import EventSearchBar from "@/src/components/EventSearchBar"
import EventCategoriesFilter from "@/src/components/EventCategoriesFilter"
import Pagination from "@/src/components/Pagination"
import { supabase } from "@/src/lib/supabase"

// Interface for survey BOQ services
interface SurveyBOQ {
  id: string
  title: string
  short_description: string
  long_description: string
  main_image: string
  gallery_images: string[]
  price_per_person?: string
  duration: string
  destination: string
  category?: string
  itinerary?: any[]
  included?: string[]
  excluded?: string[]
  is_active?: boolean
  created_at?: string
}

const SurveyBOQsPage = () => {
  const [services, setServices] = useState<SurveyBOQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Fetch services from database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('survey_boqs')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching services:', error)
          setError('Failed to load services')
        } else {
          setServices(data || [])
        }
      } catch (err) {
        console.error('Error:', err)
        setError('Failed to load services')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Transform database data to match EventCard format
  const transformedServices = useMemo(() => {
    return services.map(service => ({
      id: service.id,
      title: service.title,
      shortDescription: service.short_description,
      longDescription: service.long_description,
      mainImage: service.main_image,
      galleryImages: service.gallery_images || [],
      pricePerPerson: service.price_per_person,
      duration: service.duration,
      destination: service.destination,
      category: service.category,
      itinerary: service.itinerary || [],
      included: service.included || [],
      excluded: service.excluded || []
    }))
  }, [services])

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    let filtered = transformedServices

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.destination.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(service => service.category === selectedCategory)
    }

    return filtered
  }, [transformedServices, searchTerm, selectedCategory])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = transformedServices.map(service => service.category).filter(Boolean)
    return ["All", ...Array.from(new Set(cats))]
  }, [transformedServices])

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#001934] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading survey and BOQ services...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Services</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-[#001934] text-white rounded-lg hover:bg-[#001934]/90"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#001934] to-[#003366] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-arizona mb-4">
            Survey & BOQ Services
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Professional surveying and Bill of Quantities services for construction projects across Uganda
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <EventSearchBar onSearch={setSearchTerm} placeholder="Search survey and BOQ services..." />
          <EventCategoriesFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredServices.length} of {transformedServices.length} services
          </p>
        </div>

        {/* Services Grid */}
        {paginatedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedServices.map((service) => (
              <EventCard key={service.id} event={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}
      </div>
    </div>
  )
}

export default SurveyBOQsPage 