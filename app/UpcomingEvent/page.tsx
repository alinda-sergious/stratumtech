"use client"

import { useState, useEffect, useMemo } from "react"
import EventCard from "@/src/components/EventCard"
import EventSearchBar from "@/src/components/EventSearchBar"
import EventCategoriesFilter from "@/src/components/EventCategoriesFilter"
import Pagination from "@/src/components/Pagination"
import { supabase } from "@/src/lib/supabase"

// Interface for ongoing projects
interface OngoingProject {
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

const ITEMS_PER_PAGE = 6

export default function OngoingProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [projects, setProjects] = useState<OngoingProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch projects from database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("ongoing_projects")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
        
        if (error) {
          console.error("Error fetching projects:", error)
          setError("Failed to load projects")
        } else {
          setProjects(data || [])
        }
      } catch (err) {
        console.error("Error:", err)
        setError("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Get unique categories from projects
  const allCategoriesList = useMemo(() => {
    const categories = projects
      .map(project => project.category)
      .filter((category): category is string => !!category)
    return [...new Set(categories)]
  }, [projects])

  // Transform database projects to match EventCard format
  const transformedProjects = useMemo(() => {
    return projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.short_description,
      imageUrl: project.main_image,
      category: project.category || "Construction",
      duration: project.duration,
      destination: project.destination,
      images: project.gallery_images || [project.main_image],
      itinerary: project.itinerary || [],
      included: project.included || [],
      excluded: project.excluded || [],
      pricePerPerson: project.price_per_person
    }))
  }, [projects])

  const filteredProjects = useMemo(() => {
    return transformedProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.destination.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.category)
      return matchesSearch && matchesCategory
    })
  }, [transformedProjects, searchQuery, selectedCategories])

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const currentProjects = filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1) // Reset to first page on filter change
  }, [searchQuery, selectedCategories])

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#B8860B] mx-auto"></div>
            <p className="text-lg text-gray-600 mt-4">Loading ongoing projects...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-lg text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-[#B8860B] text-white px-4 py-2 rounded-lg hover:bg-[#B8860B]/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#001934] font-arizona">Ongoing Projects</h1>
          <p className="text-lg text-gray-600 mt-2">Explore our active construction projects across Uganda.</p>
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
                <p className="text-xl text-gray-500">
                  {projects.length === 0 
                    ? "No ongoing projects available at the moment." 
                    : "No projects found matching your criteria."
                  }
                </p>
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