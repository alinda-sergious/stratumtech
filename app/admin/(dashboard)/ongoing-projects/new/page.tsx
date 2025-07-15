"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/src/lib/supabase"
import { ArrowLeft, Save, Upload, X, Plus, Minus } from "lucide-react"
import Link from "next/link"
import SmartImageUpload from "@/src/components/SmartImageUpload"

export default function AddOngoingProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Form fields
  const [title, setTitle] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [mainImage, setMainImage] = useState("")
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [pricePerPerson, setPricePerPerson] = useState("")
  const [duration, setDuration] = useState("")
  const [destination, setDestination] = useState("")
  const [category, setCategory] = useState("")
  const [itinerary, setItinerary] = useState([{ day: 1, title: "", description: "" }])
  const [included, setIncluded] = useState([""])
  const [excluded, setExcluded] = useState([""])

  const categories = [
    "Residential", "Commercial", "Infrastructure", "Industrial", 
    "Renovation", "Interior Design", "Landscaping", "Foundation"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    if (!title || !shortDescription || !longDescription || !mainImage || !duration || !destination) {
      setError("Please fill in all required fields.")
      return
    }

    setLoading(true)

    try {
      // Filter out empty itinerary items
      const filteredItinerary = itinerary.filter(item => item.title && item.description)
      const filteredIncluded = included.filter(item => item.trim())
      const filteredExcluded = excluded.filter(item => item.trim())

      const { error } = await supabase.from("ongoing_projects").insert([{
        title,
        short_description: shortDescription,
        long_description: longDescription,
        main_image: mainImage,
        gallery_images: galleryImages,
        price_per_person: pricePerPerson || null,
        duration,
        destination,
        category,
        itinerary: filteredItinerary,
        included: filteredIncluded,
        excluded: filteredExcluded,
        is_active: true,
      }])

      if (error) throw error

      setSuccess("Ongoing project created successfully!")
      setTimeout(() => {
        router.push("/admin/ongoing-projects")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to create ongoing project")
    } finally {
      setLoading(false)
    }
  }

  const addGalleryImage = (imageUrl: string) => {
    setGalleryImages(prev => [...prev, imageUrl])
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index))
  }

  const addItineraryItem = () => {
    setItinerary(prev => [...prev, { day: prev.length + 1, title: "", description: "" }])
  }

  const removeItineraryItem = (index: number) => {
    setItinerary(prev => prev.filter((_, i) => i !== index))
  }

  const updateItineraryItem = (index: number, field: 'day' | 'title' | 'description', value: string) => {
    setItinerary(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: field === 'day' ? parseInt(value) || 1 : value } : item
    ))
  }

  const addIncludedItem = () => {
    setIncluded(prev => [...prev, ""])
  }

  const removeIncludedItem = (index: number) => {
    setIncluded(prev => prev.filter((_, i) => i !== index))
  }

  const updateIncludedItem = (index: number, value: string) => {
    setIncluded(prev => prev.map((item, i) => i === index ? value : item))
  }

  const addExcludedItem = () => {
    setExcluded(prev => [...prev, ""])
  }

  const removeExcludedItem = (index: number) => {
    setExcluded(prev => prev.filter((_, i) => i !== index))
  }

  const updateExcludedItem = (index: number, value: string) => {
    setExcluded(prev => prev.map((item, i) => i === index ? value : item))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/ongoing-projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#001934]">Add New Ongoing Project</h1>
          <p className="text-gray-600 mt-2">Create a new construction project</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">
                Project Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-[#001934]"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">
                Location *
              </label>
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter project location"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">
                Duration *
              </label>
              <Input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 24 Months"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">
                Budget
              </label>
              <Input
                value={pricePerPerson}
                onChange={(e) => setPricePerPerson(e.target.value)}
                placeholder="e.g., $500,000 or Negotiable"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#001934] mb-2">
              Short Description *
            </label>
            <Textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief project description"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#001934] mb-2">
              Detailed Description *
            </label>
            <Textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Comprehensive project description"
              rows={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#001934] mb-2">
              Main Image *
            </label>
            <SmartImageUpload
              images={mainImage ? [mainImage] : []}
              onImagesChange={(urls) => setMainImage(urls[0] || "")}
              folder="main-images"
              bucket="ongoing-projects"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#001934] mb-2">
              Gallery Images
            </label>
            <div className="space-y-4">
              <SmartImageUpload
                images={galleryImages}
                onImagesChange={setGalleryImages}
                folder="gallery-images"
                bucket="ongoing-projects"
              />
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Project Phases */}
          <div>
            <label className="block text-sm font-medium text-[#001934] mb-2">
              Project Phases
            </label>
            <div className="space-y-4">
              {itinerary.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-[#001934]">Phase {item.day}</h4>
                    <button
                      type="button"
                      onClick={() => removeItineraryItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Phase Title</label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateItineraryItem(index, 'title', e.target.value)}
                        placeholder="e.g., Site Preparation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Phase Number</label>
                      <Input
                        value={item.day}
                        onChange={(e) => updateItineraryItem(index, 'day', e.target.value)}
                        type="number"
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm text-gray-600 mb-1">Phase Description</label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => updateItineraryItem(index, 'description', e.target.value)}
                      placeholder="Describe this project phase"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={addItineraryItem}
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project Phase
              </Button>
            </div>
          </div>

          {/* Included Services */}
          <div>
            <label className="block text-sm font-medium text-[#001934] mb-2">
              Included Services
            </label>
            <div className="space-y-2">
              {included.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateIncludedItem(index, e.target.value)}
                    placeholder="e.g., Construction materials"
                  />
                  <button
                    type="button"
                    onClick={() => removeIncludedItem(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                onClick={addIncludedItem}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Included Service
              </Button>
            </div>
          </div>

          {/* Excluded Services */}
          <div>
            <label className="block text-sm font-medium text-[#001934] mb-2">
              Excluded Services
            </label>
            <div className="space-y-2">
              {excluded.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateExcludedItem(index, e.target.value)}
                    placeholder="e.g., Land acquisition costs"
                  />
                  <button
                    type="button"
                    onClick={() => removeExcludedItem(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                onClick={addExcludedItem}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Excluded Service
              </Button>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-[#001934] font-semibold"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#001934] mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {loading ? "Creating..." : "Create Project"}
            </Button>
            <Link href="/admin/ongoing-projects">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 