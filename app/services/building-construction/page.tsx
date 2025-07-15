"use client"

import { useState, useEffect, useMemo } from "react"
import EventCard from "@/src/components/EventCard"
import EventSearchBar from "@/src/components/EventSearchBar"
import EventCategoriesFilter from "@/src/components/EventCategoriesFilter"
import Pagination from "@/src/components/Pagination"

// Building Construction Projects Data
const constructionProjects = [
  {
    id: "kololo-luxury-estate-construction",
    title: "Kololo Luxury Residential Estate Construction",
    pricePerPerson: "Negotiable",
    description:
      "A prestigious residential estate in Kololo, Kampala, featuring modern villas with eco-friendly designs and smart home technology, offering upscale living for affluent residents.",
    imageUrl: "/images/tours/kivu6.jpg",
    category: "Residential",
    duration: "24 Months",
    destination: "Kololo, Kampala, Uganda",
    images: [
      "/images/tours/kivu6.jpg",
      "/images/tours/i1.png.webp",
      "/images/tours/nyungwe1.jpg",
      "/images/tours/kigali3.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Site Preparation & Foundation",
        description: "Clear site, excavate, and lay reinforced concrete foundations for the villas.",
      },
      {
        day: 2,
        title: "Structural Construction",
        description: "Erect steel and concrete frameworks for durable villa structures.",
      },
      {
        day: 3,
        title: "Interior Finishing",
        description: "Install plumbing, electrical systems, and high-quality interior finishes.",
      },
      {
        day: 4,
        title: "Landscaping & Handover",
        description: "Complete landscaping, conduct final inspections, and hand over to clients.",
      },
    ],
    included: [
      "Construction materials",
      "Skilled labor",
      "Smart home systems",
      "Landscaping services",
      "Project management",
    ],
    excluded: ["Land acquisition costs", "Furniture", "Permits", "Additional customizations"],
  },
  {
    id: "nakasero-office-tower-construction",
    title: "Nakasero Commercial Office Tower Construction",
    pricePerPerson: "Negotiable",
    description:
      "A multi-story office tower in Nakasero, Kampala, designed for corporate tenants with energy-efficient systems and premium office spaces, enhancing the city's business district.",
    imageUrl: "/images/tours/nyungwe1.jpg",
    category: "Commercial",
    duration: "30 Months",
    destination: "Nakasero, Kampala, Uganda",
    images: [
      "/images/tours/nyungwe1.jpg",
      "/images/tours/i1.png.webp",
      "/images/tours/kivu6.jpg",
      "/images/tours/kigali3.jpg",
    ],
    itinerary: [
      { day: 1, title: "Site Clearing & Foundation", description: "Clear site and lay foundation for the tower." },
      {
        day: 2,
        title: "Structural Framework",
        description: "Construct steel framework and concrete floors for the building.",
      },
      { day: 3, title: "Facade Installation", description: "Install glass facade and exterior systems." },
      {
        day: 4,
        title: "Interior Fit-Out",
        description: "Complete HVAC, electrical, and office space fit-outs.",
      },
      {
        day: 5,
        title: "Utilities & Systems",
        description: "Install plumbing and advanced energy-efficient systems.",
      },
      { day: 6, title: "Exterior Finishing", description: "Complete exterior cladding and landscaping." },
      {
        day: 7,
        title: "Safety & Compliance Checks",
        description: "Conduct safety inspections and ensure regulatory compliance.",
      },
      { day: 8, title: "Interior Finishing", description: "Finalize interior designs and fittings." },
      {
        day: 9,
        title: "Testing & Commissioning",
        description: "Test all systems and prepare for occupancy.",
      },
      { day: 10, title: "Project Handover", description: "Final inspections and handover to client." },
    ],
    included: ["Construction materials", "Labor", "Energy-efficient systems", "Project supervision", "Fit-outs"],
    excluded: ["Tenant customizations", "Legal fees", "Insurance", "Additional infrastructure"],
  },
  {
    id: "naguru-apartments-construction",
    title: "Naguru Hill Residential Apartments Construction",
    pricePerPerson: "Negotiable",
    description:
      "A mid-rise apartment complex in Naguru, Kampala, offering modern and affordable housing solutions for urban residents with green spaces and ample parking.",
    imageUrl: "/images/tours/kigali3.jpg",
    category: "Residential",
    duration: "22 Months",
    destination: "Naguru, Kampala, Uganda",
    images: [
      "/images/tours/kigali3.jpg",
      "/images/tours/i1.png.webp",
      "/images/tours/kivu6.jpg",
      "/images/tours/nyungwe1.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Foundation Work",
        description: "Excavate site and lay foundations for apartment buildings.",
      },
      { day: 2, title: "Structural Construction", description: "Build concrete frameworks and floors." },
      {
        day: 3,
        title: "Utility Installation",
        description: "Install plumbing, electrical, and HVAC systems.",
      },
      { day: 4, title: "Interior Finishing", description: "Complete interior fit-outs and painting." },
      {
        day: 5,
        title: "Exterior Works",
        description: "Finish exterior cladding and parking areas.",
      },
      {
        day: 6,
        title: "Landscaping",
        description: "Develop green spaces and landscaping around the complex.",
      },
      { day: 7, title: "Project Handover", description: "Conduct final inspections and hand over to management." },
    ],
    included: ["Construction materials", "Labor", "Utilities", "Green spaces", "Project supervision"],
    excluded: ["Furniture", "Legal fees", "Marketing costs", "Additional amenities"],
  },
]

const ITEMS_PER_PAGE = 3
const allCategoriesList = ["Residential", "Commercial", "Industrial"]

export default function BuildingConstructionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProjects = useMemo(() => {
    return constructionProjects.filter((project) => {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-[#001934] font-arizona">Building Construction Projects</h1>
          <p className="text-lg text-gray-600 mt-2">Explore our active building construction projects across Uganda.</p>
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
                <p className="text-xl text-gray-500">No construction projects found matching your criteria.</p>
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