"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import ImageCarousel from "@/src/components/ImageCarousel"
import BookThisTourForm from "@/src/components/BookThisTourForm"
import { CalendarDays, DollarSign, MapPin, CheckCircle, XCircle, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/src/lib/supabase"

// Interface for ongoing project
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

const ItineraryItem = ({
  day,
  title,
  description,
  isOpen,
  onToggle,
}: { day: number; title: string; description: string; isOpen: boolean; onToggle: () => void }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <span className="bg-[#B8860B] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
          {day}
        </span>
        <span className="font-semibold text-[#001934]">{title}</span>
      </div>
      {isOpen ? <ChevronUp className="w-5 h-5 text-[#B8860B]" /> : <ChevronDown className="w-5 h-5 text-[#B8860B]" />}
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-white">
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    )}
  </div>
)

export default function ConstructionProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [project, setProject] = useState<OngoingProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [openItineraryDay, setOpenItineraryDay] = useState<number | null>(1)

  // Fetch project from database
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("ongoing_projects")
          .select("*")
          .eq("id", slug)
          .eq("is_active", true)
          .single()

        if (error) {
          console.error("Error fetching project:", error)
          setError("Project not found")
        } else if (data) {
          setProject(data)
        } else {
          setError("Project not found")
        }
      } catch (err) {
        console.error("Error:", err)
        setError("Failed to load project")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProject()
    }
  }, [slug])

  const toggleItineraryDay = (day: number) => {
    setOpenItineraryDay(openItineraryDay === day ? null : day)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-16 lg:pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#B8860B] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-16 lg:pt-20">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#001934] mb-4">Project not found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the construction project you're looking for.</p>
          <Link
            href="/UpcomingEvent"
            className="inline-flex items-center bg-[#B8860B] text-[#001934] font-semibold py-3 px-6 rounded-lg hover:bg-[#B8860B]/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const infoBoxes = [
    {
      icon: <CalendarDays className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8860B]" />,
      title: "Duration",
      value: project.duration,
    },
    {
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8860B]" />,
      title: "Location",
      value: project.destination,
    },
    {
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8860B]" />,
      title: "Budget",
      value: project.price_per_person ? `$${project.price_per_person.toLocaleString()}` : "Contact for Quote",
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/UpcomingEvent"
          className="inline-flex items-center text-[#B8860B] hover:text-[#B8860B]/80 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001934] font-arizona">{project.title}</h1>
        </header>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content Area (Left Column on Desktop) */}
          <div className="lg:col-span-2">
            <ImageCarousel
              images={project.gallery_images && project.gallery_images.length > 0 ? project.gallery_images : [project.main_image]}
              title={project.title}
            />

            <section className="mt-10 py-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-[#001934] mb-4 font-arizona">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">{project.long_description}</p>
            </section>

            <section className="mt-8 py-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {infoBoxes.map((box, index) => (
                  <div
                    key={index}
                    className="bg-[#001934] text-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-start min-h-[160px]"
                  >
                    <div className="mb-3">{box.icon}</div>
                    <h3 className="text-lg font-semibold text-[#B8860B] font-arizona mb-1">{box.title}</h3>
                    <p className="text-gray-300 text-sm">{box.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {project.itinerary && project.itinerary.length > 0 && (
              <section className="mt-8 py-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-[#001934] mb-6 font-arizona">Project Phases</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {project.itinerary.map((item, index) => (
                    <ItineraryItem
                      key={index}
                      day={item.day || index + 1}
                      title={item.title}
                      description={item.description}
                      isOpen={openItineraryDay === (item.day || index + 1)}
                      onToggle={() => toggleItineraryDay(item.day || index + 1)}
                    />
                  ))}
                </div>
              </section>
            )}

            {(project.included && project.included.length > 0) || (project.excluded && project.excluded.length > 0) ? (
              <section className="mt-8 py-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.included && project.included.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#001934] mb-4 font-arizona">What's Included</h2>
                    <ul className="space-y-2">
                      {project.included.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.excluded && project.excluded.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#001934] mb-4 font-arizona">What's Excluded</h2>
                    <ul className="space-y-2">
                      {project.excluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ) : null}
          </div>

          {/* Sidebar (Right Column on Desktop) */}
          <aside className="lg:col-span-1 mt-12 lg:mt-0">
            <BookThisTourForm tourName={project.title} />
          </aside>
        </div>
      </div>
    </div>
  )
}
