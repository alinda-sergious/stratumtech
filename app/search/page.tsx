"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Building, Wrench } from "lucide-react"
import EventCard from "@/src/components/EventCard"
import BookingModal from "@/src/components/BookingModal"

// Construction projects data (same as in upcoming events page)
const constructionProjects = [
  {
    id: "kololo-luxury-residential-estate",
    title: "Kololo Luxury Residential Estate",
    description:
      "A prestigious residential estate in Kololo, Kampala, featuring modern villas with eco-friendly designs and smart home technology, offering upscale living for affluent residents.",
    imageUrl: "/images/upcoming/gorrila1.webp",
    category: "Residential",
    duration: "24 Months",
    destination: "Kololo, Kampala, Uganda",
  },
  {
    id: "nakasero-commercial-office-tower",
    title: "Nakasero Commercial Office Tower",
    description:
      "A multi-story office tower in Nakasero, Kampala, designed for corporate tenants with energy-efficient systems and premium office spaces, enhancing the city's business district.",
    imageUrl: "https://via.placeholder.com/300x200/B8860B/001934?text=Chimpanzee+Trek",
    category: "Commercial",
    duration: "30 Months",
    destination: "Nakasero, Kampala, Uganda",
  },
  {
    id: "entebbe-kampala-expressway-expansion",
    title: "Entebbe-Kampala Expressway Expansion",
    description:
      "A major infrastructure project to expand the Entebbe-Kampala Expressway, improving connectivity between the airport and the capital for economic and tourism growth.",
    imageUrl: "https://via.placeholder.com/300x200/001934/B8860B?text=Culture+Kivu",
    category: "Infrastructure",
    duration: "36 Months",
    destination: "Entebbe-Kampala, Uganda",
  },
  {
    id: "bugolobi-industrial-warehouse-complex",
    title: "Bugolobi Industrial Warehouse Complex",
    description:
      "A large-scale industrial warehouse in Bugolobi, Kampala, designed for logistics and storage with robust infrastructure to support commercial operations.",
    imageUrl: "https://via.placeholder.com/300x200/B8860B/001934?text=Akagera",
    category: "Industrial",
    duration: "18 Months",
    destination: "Bugolobi, Kampala, Uganda",
  },
  {
    id: "naguru-hill-residential-apartments",
    title: "Naguru Hill Residential Apartments",
    description:
      "A mid-rise apartment complex in Naguru, Kampala, offering modern and affordable housing solutions for urban residents with green spaces and ample parking.",
    imageUrl: "https://via.placeholder.com/300x200/001934/B8860B?text=Honeymoon+Kivu",
    category: "Residential",
    duration: "22 Months",
    destination: "Naguru, Kampala, Uganda",
  },
]

// Construction services data
const constructionServices = [
  {
    id: "architecture-design",
    title: "Architecture Design",
    description:
      "We craft visionary architectural designs that blend aesthetics, functionality, and sustainability. Our team of skilled architects collaborates with clients to create bespoke plans for residential, commercial, and industrial projects.",
    imageUrl: "/images/tours/i1.png.webp",
    category: "Design",
    duration: "Varies",
    destination: "Kampala, Uganda",
  },
  {
    id: "building-construction",
    title: "Building Construction",
    description:
      "From groundbreaking to handover, we execute comprehensive building construction projects with precision. Specializing in residential estates, commercial towers, and infrastructure developments.",
    imageUrl: "/images/tours/kivu6.jpg",
    category: "Construction",
    duration: "Varies",
    destination: "Kampala, Uganda",
  },
  {
    id: "building-maintenance",
    title: "Building Maintenance",
    description:
      "We provide proactive building maintenance services to preserve the longevity and performance of your properties. Our tailored maintenance plans include regular inspections, repairs, and system upkeep.",
    imageUrl: "/images/tours/nyungwe1.jpg",
    category: "Maintenance",
    duration: "Ongoing",
    destination: "Kampala, Uganda",
  },
  {
    id: "building-renovation",
    title: "Building Renovation",
    description:
      "Transform your existing spaces with our expert building renovation services. Whether modernizing outdated interiors, upgrading facilities, or restoring historic structures.",
    imageUrl: "/images/tours/kigali3.jpg",
    category: "Renovation",
    duration: "Varies",
    destination: "Kampala, Uganda",
  },
]

function SearchResults() {
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItemName, setSelectedItemName] = useState<string>("")
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [filteredServices, setFilteredServices] = useState<any[]>([])

  // Get search parameters
  const searchType = searchParams.get("type") || "projects"
  const query = searchParams.get("query") || ""

  useEffect(() => {
    console.log("Search params:", { searchType, query })

    // Filter projects based on search criteria
    if (searchType === "projects") {
      let filtered = [...constructionProjects]

      if (query && query.trim()) {
        filtered = filtered.filter(
          (project) =>
            (project.title && project.title.toLowerCase().includes(query.toLowerCase())) ||
            (project.description && project.description.toLowerCase().includes(query.toLowerCase())) ||
            (project.destination && project.destination.toLowerCase().includes(query.toLowerCase())) ||
            (project.category && project.category.toLowerCase().includes(query.toLowerCase())),
        )
      }

      setFilteredProjects(filtered)
      console.log("Filtered projects:", filtered.length)
    }

    // Filter services based on search criteria
    if (searchType === "services") {
      let filtered = [...constructionServices]

      if (query && query.trim()) {
        filtered = filtered.filter(
          (service) =>
            (service.title && service.title.toLowerCase().includes(query.toLowerCase())) ||
            (service.description && service.description.toLowerCase().includes(query.toLowerCase())) ||
            (service.category && service.category.toLowerCase().includes(query.toLowerCase())),
        )
      }

      setFilteredServices(filtered)
      console.log("Filtered services:", filtered.length)
    }
  }, [searchType, query])

  const handleOpenBookingModal = (itemName: string) => {
    setSelectedItemName(itemName)
    setIsModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
    setSelectedItemName("")
  }

  const resultsCount = searchType === "projects" ? filteredProjects.length : filteredServices.length
  const resultsLabel = searchType === "projects" ? "projects" : "services"

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-[#001934] hover:text-[#B8860B] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              {resultsCount} {resultsLabel} found
            </div>
          </div>
        </div>
      </section>



      {/* Search Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resultsCount === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {searchType === "projects" ? (
                <Building className="w-16 h-16 mx-auto" />
              ) : (
                <Wrench className="w-16 h-16 mx-auto" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No {resultsLabel} found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or browse all {resultsLabel} below.
            </p>
            <Link
              href={searchType === "projects" ? "/UpcomingEvent" : "/services"}
              className="inline-flex items-center bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#ae7d0a] transition-colors"
            >
              View All {searchType === "projects" ? "Projects" : "Services"}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#001934]">
              Search Results for {searchType === "projects" ? "Construction Projects" : "Construction Services"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchType === "projects" 
                ? filteredProjects.map((project) => (
                    <EventCard key={project.id} event={project} />
                  ))
                : filteredServices.map((service) => (
                    <EventCard key={service.id} event={service} />
                  ))
              }
            </div>
          </div>
        )}
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBookingModal}
        itemName={selectedItemName}
      />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
