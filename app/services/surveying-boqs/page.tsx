"use client"

import { useState, useEffect } from "react"
import { CheckCircle, MapPin, Users, Clock, Shield, Calculator, FileText, Phone, Mail, Building, Ruler, BarChart3 } from "lucide-react"
import { supabase } from "@/src/lib/supabase"

interface SurveyingBOQContent {
  id: string
  title: string
  description: string
  hero_title: string
  hero_description: string
  overview_title: string
  overview_description: string
  expertise_items: string[]
  services: {
    title: string
    description: string
    features: string[]
  }[]
  process_steps: {
    step: number
    title: string
    description: string
  }[]
  contact_title: string
  contact_description: string
  is_active: boolean
}

export default function SurveyingBOQsPage() {
  const [content, setContent] = useState<SurveyingBOQContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("surveying_boqs_content")
        .select("*")
        .eq("is_active", true)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching content:", error)
      } else if (data) {
        setContent(data)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Default content if database fetch fails
  const defaultContent: SurveyingBOQContent = {
    id: "default",
    title: "Surveying and BOQs Services",
    description: "Comprehensive surveying services and Bill of Quantities (BOQ) preparation. Our expert surveyors provide accurate measurements, land assessments, and detailed cost estimates.",
    hero_title: "Surveying & BOQs",
    hero_description: "Professional surveying services and detailed Bill of Quantities preparation for your construction projects",
    overview_title: "Service Overview",
    overview_description: "Our expert team provides comprehensive surveying and BOQ services using advanced technology and industry best practices. We ensure accurate measurements, detailed cost estimates, and professional documentation for all types of construction projects.",
    expertise_items: [
      "Licensed and certified surveyors",
      "Advanced GPS and surveying equipment",
      "Detailed BOQ preparation and cost estimation",
      "Professional documentation and reports"
    ],
    services: [
      {
        title: "Land Surveying",
        description: "Comprehensive land surveying services including boundary surveys, topographic mapping, and land subdivision. Our expert surveyors use advanced GPS and traditional surveying equipment for accurate results.",
        features: [
          "Boundary surveys and property lines",
          "Topographic mapping",
          "Land subdivision surveys",
          "GPS and traditional surveying",
          "Detailed survey reports"
        ]
      },
      {
        title: "Construction Surveying",
        description: "Precise construction surveying for building projects, road construction, and infrastructure development. We provide layout surveys, as-built surveys, and construction monitoring.",
        features: [
          "Building layout surveys",
          "Road and infrastructure surveys",
          "As-built surveys",
          "Construction monitoring",
          "Quality control verification"
        ]
      },
      {
        title: "Bill of Quantities (BOQ)",
        description: "Detailed Bill of Quantities preparation for construction projects. We provide comprehensive cost estimates, material takeoffs, and project specifications to ensure accurate budgeting.",
        features: [
          "Detailed cost estimates",
          "Material takeoffs",
          "Project specifications",
          "Quantity calculations",
          "Budget planning support"
        ]
      }
    ],
    process_steps: [
      {
        step: 1,
        title: "Initial Consultation",
        description: "Discuss project requirements and scope"
      },
      {
        step: 2,
        title: "Field Survey",
        description: "Conduct on-site measurements and data collection"
      },
      {
        step: 3,
        title: "Analysis & Preparation",
        description: "Process data and prepare BOQ documentation"
      },
      {
        step: 4,
        title: "Final Delivery",
        description: "Deliver comprehensive reports and documentation"
      }
    ],
    contact_title: "Ready to Start Your Project?",
    contact_description: "Contact us today for professional surveying and BOQ services",
    is_active: true
  }

  const displayContent = content || defaultContent

  if (loading) {
    return (
      <div className="min-h-screen pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-[#001934]">Loading content...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#001934] mb-4">{displayContent.hero_title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {displayContent.hero_description}
          </p>
        </div>

        {/* Service Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#001934] mb-4">{displayContent.overview_title}</h2>
              <p className="text-gray-600 mb-6">
                {displayContent.overview_description}
              </p>
              <div className="space-y-4">
                {displayContent.expertise_items.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#B8860B] mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#001934] mb-4">Our Expertise</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Land Surveying</span>
                </div>
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">BOQ Preparation</span>
                </div>
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Construction Surveying</span>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Cost Estimation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayContent.services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <MapPin className="w-12 h-12 text-[#B8860B] mb-4" />
              <h3 className="text-xl font-bold text-[#001934] mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#001934] mb-6 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {displayContent.process_steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="bg-[#B8860B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">{step.step}</div>
                <h3 className="font-semibold text-[#001934] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#001934] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{displayContent.contact_title}</h2>
          <p className="text-gray-300 mb-6">
            {displayContent.contact_description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Get Quote
            </a>
            <a
              href="tel:+256700000000"
              className="border border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 