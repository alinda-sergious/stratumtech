"use client"

import { useState, useEffect, useMemo } from "react"
import EventCard from "@/src/components/EventCard"
import EventSearchBar from "@/src/components/EventSearchBar"
import EventCategoriesFilter from "@/src/components/EventCategoriesFilter"
import Pagination from "@/src/components/Pagination"

// Building Maintenance Projects Data
const maintenanceProjects = [
  {
    id: "kololo-estate-maintenance",
    title: "Kololo Luxury Estate Maintenance Program",
    pricePerPerson: "Negotiable",
    description:
      "Comprehensive maintenance program for the Kololo Luxury Estate, including regular inspections, preventive maintenance, and system upgrades to ensure optimal performance and value retention.",
    imageUrl: "/images/tours/nyungwe1.jpg",
    category: "Residential",
    duration: "Ongoing",
    destination: "Kololo, Kampala, Uganda",
    images: [
      "/images/tours/nyungwe1.jpg",
      "/images/tours/i1.png.webp",
      "/images/tours/kivu6.jpg",
      "/images/tours/kigali3.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Initial Assessment",
        description: "Conduct comprehensive building assessment and identify maintenance needs.",
      },
      {
        day: 2,
        title: "Preventive Maintenance",
        description: "Implement regular maintenance schedules for all building systems.",
      },
      {
        day: 3,
        title: "System Upgrades",
        description: "Upgrade electrical, plumbing, and HVAC systems as needed.",
      },
      {
        day: 4,
        title: "Safety Inspections",
        description: "Conduct regular safety inspections and compliance checks.",
      },
    ],
    included: [
      "Regular inspections",
      "Preventive maintenance",
      "System upgrades",
      "Safety compliance",
      "Emergency repairs",
      "24/7 support",
    ],
    excluded: ["Major renovations", "Structural changes", "Tenant improvements", "Additional customizations"],
  },
  {
    id: "nakasero-tower-maintenance",
    title: "Nakasero Office Tower Maintenance",
    pricePerPerson: "Negotiable",
    description:
      "Professional maintenance services for the Nakasero Office Tower, ensuring optimal performance of all building systems and maintaining high standards for corporate tenants.",
    imageUrl: "/images/tours/kigali3.jpg",
    category: "Commercial",
    duration: "Ongoing",
    destination: "Nakasero, Kampala, Uganda",
    images: [
      "/images/tours/kigali3.jpg",
      "/images/tours/i1.png.webp",
      "/images/tours/kivu6.jpg",
      "/images/tours/nyungwe1.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Building Systems Assessment",
        description: "Evaluate all building systems and identify maintenance priorities.",
      },
      {
        day: 2,
        title: "HVAC Maintenance",
        description: "Maintain and optimize heating, ventilation, and air conditioning systems.",
      },
      {
        day: 3,
        title: "Electrical Systems",
        description: "Inspect and maintain electrical systems and backup power.",
      },
      {
        day: 4,
        title: "Plumbing & Fire Safety",
        description: "Maintain plumbing systems and fire safety equipment.",
      },
      {
        day: 5,
        title: "Facade & Common Areas",
        description: "Maintain building facade and common area facilities.",
      },
    ],
    included: [
      "HVAC maintenance",
      "Electrical systems",
      "Plumbing maintenance",
      "Fire safety systems",
      "Facade maintenance",
      "Common area upkeep",
    ],
    excluded: ["Tenant improvements", "Major renovations", "Equipment replacement", "Additional services"],
  },
  {
    id: "naguru-apartments-maintenance",
    title: "Naguru Apartments Maintenance Program",
    pricePerPerson: "Negotiable",
    description:
      "Comprehensive maintenance program for the Naguru Hill Residential Apartments, ensuring comfortable living conditions and preserving property value for residents.",
    imageUrl: "/images/tours/i1.png.webp",
    category: "Residential",
    duration: "Ongoing",
    destination: "Naguru, Kampala, Uganda",
    images: [
      "/images/tours/i1.png.webp",
      "/images/tours/kivu6.jpg",
      "/images/tours/nyungwe1.jpg",
      "/images/tours/kigali3.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Residential Systems Check",
        description: "Inspect all residential systems and common areas.",
      },
      {
        day: 2,
        title: "Utility Maintenance",
        description: "Maintain plumbing, electrical, and water systems.",
      },
      {
        day: 3,
        title: "Common Area Upkeep",
        description: "Maintain landscaping, parking areas, and common facilities.",
      },
      {
        day: 4,
        title: "Resident Support",
        description: "Provide responsive maintenance support for residents.",
      },
    ],
    included: [
      "Residential systems",
      "Common area maintenance",
      "Utility systems",
      "Landscaping upkeep",
      "Resident support",
      "Emergency repairs",
    ],
    excluded: ["Individual unit improvements", "Furniture", "Personal appliances", "Additional amenities"],
  },
]

const ITEMS_PER_PAGE = 3
const allCategoriesList = ["Residential", "Commercial", "Industrial"]

export default function BuildingMaintenancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProjects = useMemo(() => {
    return maintenanceProjects.filter((project) => {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-[#001934] font-arizona">Building Maintenance Projects</h1>
          <p className="text-lg text-gray-600 mt-2">Explore our building maintenance and facility management services.</p>
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
                <p className="text-xl text-gray-500">No maintenance projects found matching your criteria.</p>
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