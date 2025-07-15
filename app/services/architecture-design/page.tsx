"use client"

import { useState, useEffect, useMemo } from "react"
import EventCard from "@/src/components/EventCard"
import EventSearchBar from "@/src/components/EventSearchBar"
import EventCategoriesFilter from "@/src/components/EventCategoriesFilter"
import Pagination from "@/src/components/Pagination"

// Architecture Design Projects Data
const architectureProjects = [
  {
    id: "kololo-luxury-estate-design",
    title: "Kololo Luxury Residential Estate Design",
    pricePerPerson: "Negotiable",
    description:
      "Comprehensive architectural design for a prestigious residential estate in Kololo, Kampala. Features modern villas with eco-friendly designs, smart home technology integration, and sustainable landscaping concepts.",
    imageUrl: "/images/tours/i1.png.webp",
    category: "Residential",
    duration: "6 Months",
    destination: "Kololo, Kampala, Uganda",
    images: [
      "/images/tours/i1.png.webp",
      "/images/tours/kivu6.jpg",
      "/images/tours/nyungwe1.jpg",
      "/images/tours/kigali3.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Site Analysis & Conceptual Design",
        description: "Conduct site surveys, analyze topography, and develop initial design concepts.",
      },
      {
        day: 2,
        title: "Detailed Architectural Plans",
        description: "Create comprehensive floor plans, elevations, and 3D renderings.",
      },
      {
        day: 3,
        title: "Structural Engineering Integration",
        description: "Collaborate with structural engineers for building integrity and safety.",
      },
      {
        day: 4,
        title: "Interior Design Coordination",
        description: "Develop interior layouts and material specifications.",
      },
      {
        day: 5,
        title: "Landscape Architecture",
        description: "Design sustainable landscaping and outdoor spaces.",
      },
      {
        day: 6,
        title: "Final Documentation & Handover",
        description: "Complete construction documents and hand over to construction team.",
      },
    ],
    included: [
      "Site analysis and surveys",
      "Architectural drawings",
      "3D renderings and visualizations",
      "Structural coordination",
      "Interior design concepts",
      "Landscape design",
      "Construction documentation",
    ],
    excluded: ["Construction costs", "Permits and approvals", "Site preparation", "Additional customizations"],
  },
  {
    id: "nakasero-office-tower-design",
    title: "Nakasero Commercial Office Tower Design",
    pricePerPerson: "Negotiable",
    description:
      "Modern office tower design in Nakasero, Kampala, featuring energy-efficient systems, premium office spaces, and innovative architectural solutions for the corporate sector.",
    imageUrl: "/images/tours/kivu6.jpg",
    category: "Commercial",
    duration: "8 Months",
    destination: "Nakasero, Kampala, Uganda",
    images: [
      "/images/tours/kivu6.jpg",
      "/images/tours/i1.png.webp",
      "/images/tours/nyungwe1.jpg",
      "/images/tours/kigali3.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Client Requirements Analysis",
        description: "Understand client needs and develop design brief.",
      },
      {
        day: 2,
        title: "Conceptual Design Development",
        description: "Create multiple design concepts and present to client.",
      },
      {
        day: 3,
        title: "Detailed Design Development",
        description: "Refine selected concept with detailed architectural plans.",
      },
      {
        day: 4,
        title: "MEP Coordination",
        description: "Coordinate mechanical, electrical, and plumbing systems.",
      },
      {
        day: 5,
        title: "Sustainability Integration",
        description: "Incorporate green building principles and energy efficiency.",
      },
      {
        day: 6,
        title: "Construction Documentation",
        description: "Prepare detailed construction drawings and specifications.",
      },
      {
        day: 7,
        title: "BIM Modeling",
        description: "Create comprehensive Building Information Modeling.",
      },
      {
        day: 8,
        title: "Final Review & Handover",
        description: "Complete final review and hand over construction documents.",
      },
    ],
    included: [
      "Architectural design",
      "MEP coordination",
      "3D modeling and BIM",
      "Sustainability analysis",
      "Construction documentation",
      "Project management",
    ],
    excluded: ["Construction costs", "Permits", "Site preparation", "Additional engineering"],
  },
  {
    id: "bugolobi-warehouse-design",
    title: "Bugolobi Industrial Warehouse Design",
    pricePerPerson: "Negotiable",
    description:
      "Large-scale industrial warehouse design in Bugolobi, Kampala, optimized for logistics and storage operations with robust infrastructure and efficient space utilization.",
    imageUrl: "/images/tours/nyungwe1.jpg",
    category: "Industrial",
    duration: "4 Months",
    destination: "Bugolobi, Kampala, Uganda",
    images: [
      "/images/tours/nyungwe1.jpg",
      "/images/tours/i1.png.webp",
      "/images/tours/kivu6.jpg",
      "/images/tours/kigali3.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Operational Requirements Analysis",
        description: "Analyze logistics and storage requirements for optimal design.",
      },
      {
        day: 2,
        title: "Structural Design",
        description: "Design robust structural framework for heavy loads.",
      },
      {
        day: 3,
        title: "Utility Systems Design",
        description: "Design electrical, plumbing, and HVAC systems.",
      },
      {
        day: 4,
        title: "Final Documentation",
        description: "Complete construction documents and specifications.",
      },
    ],
    included: [
      "Operational analysis",
      "Structural design",
      "Utility systems design",
      "Construction documentation",
      "Project coordination",
    ],
    excluded: ["Construction costs", "Equipment", "Permits", "Site preparation"],
  },
]

const ITEMS_PER_PAGE = 3
const allCategoriesList = ["Residential", "Commercial", "Industrial"]

export default function ArchitectureDesignPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProjects = useMemo(() => {
    return architectureProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.destination.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.category)
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategories])

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const currentProjects = filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1) // Reset to first page on filter change
  }, [searchQuery, selectedCategories])

  return (
    <div className="bg-white min-h-screen pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#001934] font-arizona">Architecture Design Projects</h1>
          <p className="text-lg text-gray-600 mt-2">Explore our architectural design projects and innovative building concepts.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar: Search and Filters */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 h-fit">
            <EventSearchBar onSearchSubmit={setSearchQuery} />
            <EventCategoriesFilter onFilterChange={setSelectedCategories} allCategories={allCategoriesList} />
          </aside>

          {/* Main Content: Project Cards and Pagination */}
          <main className="w-full lg:w-3/4">
            {currentProjects.length > 0 ? (
              <div className="space-y-8">
                {currentProjects.map((project) => (
                  <EventCard key={project.id} event={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No architecture design projects found matching your criteria.</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
} 