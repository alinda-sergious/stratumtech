"use client"

import { useState, useEffect } from "react"
import { Edit, Save, X, Plus, Trash2 } from "lucide-react"
import { supabase } from "@/src/lib/supabase"

interface Service {
  title: string
  description: string
  features: string[]
}

interface ProcessStep {
  step: number
  title: string
  description: string
}

interface SurveyingBOQContent {
  id: string
  title: string
  description: string
  hero_title: string
  hero_description: string
  overview_title: string
  overview_description: string
  expertise_items: string[]
  services: Service[]
  process_steps: ProcessStep[]
  contact_title: string
  contact_description: string
  is_active: boolean
  created_at: string
}

export default function SurveyBOQsAdminPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
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
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      console.log("Fetching content from database...")
      const { data, error } = await supabase
        .from("surveying_boqs_content")
        .select("*")
        .eq("is_active", true)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error("Database error:", error)
      } else if (data) {
        console.log("Found content:", data)
        setFormData({
          title: data.title || formData.title,
          description: data.description || formData.description,
          hero_title: data.hero_title || formData.hero_title,
          hero_description: data.hero_description || formData.hero_description,
          overview_title: data.overview_title || formData.overview_title,
          overview_description: data.overview_description || formData.overview_description,
          expertise_items: data.expertise_items || formData.expertise_items,
          services: data.services || formData.services,
          process_steps: data.process_steps || formData.process_steps,
          contact_title: data.contact_title || formData.contact_title,
          contact_description: data.contact_description || formData.contact_description,
          is_active: data.is_active
        })
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      console.log("Saving content:", formData)
      const { error } = await supabase
        .from("surveying_boqs_content")
        .upsert([{
          ...formData,
          updated_at: new Date().toISOString()
        }])

      if (error) {
        console.error("Save error:", error)
        throw error
      }

      console.log("Content saved successfully!")
      setShowForm(false)
      fetchContent()
    } catch (error) {
      console.error("Error saving content:", error)
      alert("Error saving content. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, {
        title: "New Service",
        description: "Service description",
        features: ["Feature 1", "Feature 2"]
      }]
    })
  }

  const updateService = (index: number, field: keyof Service, value: string | string[]) => {
    const newServices = [...formData.services]
    newServices[index] = { ...newServices[index], [field]: value }
    setFormData({ ...formData, services: newServices })
  }

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index)
    })
  }

  const updateProcessStep = (index: number, field: keyof ProcessStep, value: string | number) => {
    const newSteps = [...formData.process_steps]
    newSteps[index] = { ...newSteps[index], [field]: value }
    setFormData({ ...formData, process_steps: newSteps })
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-[#001934]">Loading content...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#001934]">Surveying & BOQs Content Editor</h1>
          <p className="text-gray-600">Edit the Surveying and BOQs service page content</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#B8860B] text-white px-4 py-2 rounded-lg hover:bg-[#ae7d0a] transition-colors flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit Content
        </button>
      </div>

      {/* Current Content Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#001934] mb-4">Current Content</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Hero Title:</h3>
            <p className="text-gray-600">{formData.hero_title}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Hero Description:</h3>
            <p className="text-gray-600">{formData.hero_description}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Services:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {formData.services.map((service, index) => (
                <li key={index}>{service.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#001934]">Edit Content</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hero Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Title *
              </label>
              <input
                type="text"
                value={formData.hero_title}
                onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Description *
              </label>
              <textarea
                value={formData.hero_description}
                onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                rows={3}
                required
              />
            </div>

            {/* Overview Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overview Title *
              </label>
              <input
                type="text"
                value={formData.overview_title}
                onChange={(e) => setFormData({ ...formData, overview_title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overview Description *
              </label>
              <textarea
                value={formData.overview_description}
                onChange={(e) => setFormData({ ...formData, overview_description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                rows={4}
                required
              />
            </div>

            {/* Expertise Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expertise Items (one per line) *
              </label>
              <textarea
                value={formData.expertise_items.join('\n')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  expertise_items: e.target.value.split('\n').filter(item => item.trim()) 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                rows={4}
                required
              />
            </div>

            {/* Services */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Services *
                </label>
                <button
                  type="button"
                  onClick={addService}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {formData.services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Service {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => updateService(index, 'title', e.target.value)}
                      placeholder="Service title"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => updateService(index, 'description', e.target.value)}
                      placeholder="Service description"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      rows={2}
                    />
                    <textarea
                      value={service.features.join('\n')}
                      onChange={(e) => updateService(index, 'features', e.target.value.split('\n').filter(item => item.trim()))}
                      placeholder="Features (one per line)"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Process Steps *
              </label>
              {formData.process_steps.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2">Step {step.step}</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateProcessStep(index, 'title', e.target.value)}
                      placeholder="Step title"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <textarea
                      value={step.description}
                      onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                      placeholder="Step description"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Title *
              </label>
              <input
                type="text"
                value={formData.contact_title}
                onChange={(e) => setFormData({ ...formData, contact_title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Description *
              </label>
              <textarea
                value={formData.contact_description}
                onChange={(e) => setFormData({ ...formData, contact_description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                rows={3}
                required
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active Content
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#B8860B] text-white px-4 py-2 rounded-lg hover:bg-[#ae7d0a] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
} 