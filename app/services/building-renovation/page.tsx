"use client"

import { useState, useEffect, useMemo } from "react"
import EventCard from "@/src/components/EventCard"
import EventSearchBar from "@/src/components/EventSearchBar"
import EventCategoriesFilter from "@/src/components/EventCategoriesFilter"
import Pagination from "@/src/components/Pagination"

// Building Renovation Projects Data
const renovationProjects = [
  {
    id: "kololo-villa-renovation",
    title: "Kololo Villa Modernization Project",
    pricePerPerson: "Negotiable",
    description:
      "Comprehensive renovation of luxury villas in Kololo, upgrading interiors, modernizing systems, and enhancing energy efficiency while preserving architectural heritage.",
    imageUrl: "/images/tours/kigali3.jpg",
    category: "Residential",
    duration: "12 Months",
    destination: "Kololo, Kampala, Uganda",
    images: [
      "/images/tours/kigali3.jpg",
      "/images/tours/i1.png.webp",
      "/images/tours/kivu6.jpg",
      "/images/tours/nyungwe1.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Assessment & Planning",
        description: "Conduct detailed assessment and develop renovation plans.",
      },
      {
        day: 2,
        title: "Structural Upgrades",
        description: "Strengthen foundations and update structural elements.",
      },
      {
        day: 3,
        title: "System Modernization",
        description: "Upgrade electrical, plumbing, and HVAC systems.",
      },
      {
        day: 4,
        title: "Interior Renovation",
        description: "Modernize interiors with contemporary finishes and fixtures.",
      },
      {
        day: 5,
        title: "Exterior Enhancement",
        description: "Update exterior finishes and landscaping.",
      },
      {
        day: 6,
        title: "Final Touches & Handover",
        description: "Complete final details and hand over renovated properties.",
      },
    ],
    included: [
      "Structural assessment",
      "System upgrades",
      "Interior renovation",
      "Exterior enhancement",
      "Energy efficiency improvements",
      "Project management",
    ],
    excluded: ["Furniture", "Personal belongings", "Additional customizations", "Landscaping"],
  },
  {
    id: "nakasero-office-renovation",
    title: "Nakasero Office Tower Renovation",
    pricePerPerson: "Negotiable",
    description:
      "Modernization of the Nakasero Office Tower, upgrading office spaces, improving energy efficiency, and enhancing tenant amenities while maintaining business operations.",
    imageUrl: "/images/tours/i1.png.webp",
    category: "Commercial",
    duration: "18 Months",
    destination: "Nakasero, Kampala, Uganda",
    images: [
      "/images/tours/i1.png.webp",
      "/images/tours/kivu6.jpg",
      "/images/tours/nyungwe1.jpg",
      "/images/tours/kigali3.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Tenant Coordination",
        description: "Coordinate with tenants and plan phased renovation approach.",
      },
      {
        day: 2,
        title: "Building Systems Upgrade",
        description: "Upgrade HVAC, electrical, and plumbing systems.",
      },
      {
        day: 3,
        title: "Office Space Modernization",
        description: "Renovate office spaces with modern finishes and layouts.",
      },
      {
        day: 4,
        title: "Common Area Enhancement",
        description: "Upgrade lobbies, elevators, and common facilities.",
      },
      {
        day: 5,
        title: "Energy Efficiency",
        description: "Install energy-efficient systems and smart building technology.",
      },
      {
        day: 6,
        title: "Final Integration",
        description: "Complete system integration and final inspections.",
      },
    ],
    included: [
      "System upgrades",
      "Office modernization",
      "Common area enhancement",
      "Energy efficiency",
      "Smart building integration",
      "Project coordination",
    ],
    excluded: ["Tenant improvements", "Furniture", "Equipment", "Additional customizations"],
  },
  {
    id: "naguru-apartments-renovation",
    title: "Naguru Apartments Renovation Program",
    pricePerPerson: "Negotiable",
    description:
      "Comprehensive renovation program for Naguru Hill Apartments, modernizing units, upgrading common areas, and improving overall living standards for residents.",
    imageUrl: "/images/tours/kivu6.jpg",
    category: "Residential",
    duration: "15 Months",
    destination: "Naguru, Kampala, Uganda",
    images: [
      "/images/tours/kivu6.jpg",
      "/images/tours/i1.png.webp",
      "/images/tours/nyungwe1.jpg",
      "/images/tours/kigali3.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Resident Communication",
        description: "Communicate renovation plans and coordinate with residents.",
      },
      {
        day: 2,
        title: "Unit Renovations",
        description: "Renovate individual apartment units with modern finishes.",
      },
      {
        day: 3,
        title: "Common Area Upgrades",
        description: "Upgrade lobbies, hallways, and shared facilities.",
      },
      {
        day: 4,
        title: "Exterior Improvements",
        description: "Enhance building exterior and landscaping.",
      },
      {
        day: 5,
        title: "System Upgrades",
        description: "Upgrade building systems for improved efficiency.",
      },
    ],
    included: [
      "Unit renovations",
      "Common area upgrades",
      "Exterior improvements",
      "System upgrades",
      "Resident coordination",
      "Project management",
    ],
    excluded: ["Personal belongings", "Furniture", "Individual customizations", "Additional amenities"],
  },
]

const ITEMS_PER_PAGE = 3
const allCategoriesList = ["Residential", "Commercial", "Industrial"]

export default function BuildingRenovationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProjects = useMemo(() => {
    return renovationProjects.filter((project) => {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-[#001934] font-arizona">Building Renovation Projects</h1>
          <p className="text-lg text-gray-600 mt-2">Explore our building renovation and modernization projects.</p>
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
                <p className="text-xl text-gray-500">No renovation projects found matching your criteria.</p>
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