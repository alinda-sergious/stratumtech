"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import ImageCarousel from "@/src/components/ImageCarousel"
import BookThisTourForm from "@/src/components/BookThisTourForm"
import { CalendarDays, DollarSign, MapPin, CheckCircle, XCircle, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/src/lib/supabase"

// Interface for survey BOQ service
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
  project_type?: string
  total_area?: number
  total_cost?: number
  survey_report?: string
  boq_details?: any
  materials_list?: any
  labor_costs?: any
  equipment_costs?: any
}

const SurveyBOQDetailPage = () => {
  const params = useParams()
  const [project, setProject] = useState<SurveyBOQ | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('survey_boqs')
          .select('*')
          .eq('id', params.slug)
          .single()

        if (error) {
          console.error('Error fetching project:', error)
          setError('Project not found')
        } else {
          setProject(data)
        }
      } catch (err) {
        console.error('Error:', err)
        setError('Failed to load project')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchProject()
    }
  }, [params.slug])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#001934] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
          <p className="text-gray-600">{error || 'The requested service could not be found.'}</p>
          <Link 
            href="/survey-boqs" 
            className="mt-4 inline-block px-6 py-2 bg-[#001934] text-white rounded-lg hover:bg-[#001934]/90"
          >
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  const infoBoxes = [
    {
      icon: CalendarDays,
      label: "Duration",
      value: project.duration
    },
    {
      icon: DollarSign,
      label: "Price",
      value: project.price_per_person || "Contact for quote"
    },
    {
      icon: MapPin,
      label: "Service Area",
      value: project.destination
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/survey-boqs" 
          className="inline-flex items-center text-[#001934] hover:text-[#001934]/80 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Survey & BOQ Services
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
              <h2 className="text-2xl font-bold text-[#001934] mb-4">Service Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {project.long_description}
              </p>
            </section>

            {/* Info Boxes */}
            <section className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {infoBoxes.map((box, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-2">
                      <box.icon className="w-5 h-5 text-[#001934] mr-2" />
                      <span className="text-sm font-medium text-gray-600">{box.label}</span>
                    </div>
                    <p className="text-lg font-semibold text-[#001934]">{box.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary Section */}
            {project.itinerary && project.itinerary.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#001934] mb-6">Service Process</h2>
                <div className="space-y-4">
                  {project.itinerary.map((item: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                      <div className="flex items-start">
                        <div className="bg-[#001934] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                          {item.day}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#001934] mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Included/Excluded Section */}
            <section className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Included */}
                {project.included && project.included.length > 0 && (
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold text-[#001934] mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {project.included.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Excluded */}
                {project.excluded && project.excluded.length > 0 && (
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold text-[#001934] mb-4 flex items-center">
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                      What's Not Included
                    </h3>
                    <ul className="space-y-2">
                      {project.excluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* Additional Details Sections */}
            {project.survey_report && (
              <section className="mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <button
                    onClick={() => toggleSection('survey_report')}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-xl font-semibold text-[#001934]">Survey Report Details</h3>
                    {expandedSections['survey_report'] ? (
                      <ChevronUp className="w-5 h-5 text-[#001934]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#001934]" />
                    )}
                  </button>
                  {expandedSections['survey_report'] && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-700">{project.survey_report}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {project.boq_details && (
              <section className="mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <button
                    onClick={() => toggleSection('boq_details')}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-xl font-semibold text-[#001934]">BOQ Details</h3>
                    {expandedSections['boq_details'] ? (
                      <ChevronUp className="w-5 h-5 text-[#001934]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#001934]" />
                    )}
                  </button>
                  {expandedSections['boq_details'] && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(project.boq_details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Booking Form Sidebar (Right Column on Desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookThisTourForm 
                tourTitle={project.title}
                tourPrice={project.price_per_person}
                tourDuration={project.duration}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyBOQDetailPage 