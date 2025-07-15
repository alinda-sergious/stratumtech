"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { supabase } from "@/src/lib/supabase"
import { ArrowLeft, Plus, X, Calendar, MapPin, DollarSign, Clock, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import AdminImageUpload from "@/src/components/AdminImageUpload"

interface ItineraryDay {
  day: number
  title: string
  description: string
}

export default function NewEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    cover_image: "",
    gallery_images: [] as string[],
    category: "",
    price_per_person: "",
    duration: "",
    destination: "",
    itinerary: [{ day: 1, title: "", description: "" }] as ItineraryDay[],
    included: [""],
    excluded: [""],
    is_active: true
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: 'included' | 'excluded', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: 'included' | 'excluded') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }))
  }

  const removeArrayItem = (field: 'included' | 'excluded', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleItineraryChange = (index: number, field: keyof ItineraryDay, value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) => 
        i === index ? { ...day, [field]: field === 'day' ? parseInt(value) || 1 : value } : day
      )
    }))
  }

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: "", description: "" }]
    }))
  }

  const removeItineraryDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }))
  }

  const handleMainImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      cover_image: url,
      gallery_images: prev.gallery_images.length === 0 ? [url] : [url, ...prev.gallery_images.filter(img => img !== url)]
    }))
  }

  const handleGalleryImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: [...prev.gallery_images, url]
    }))
  }

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("upcoming_events")
        .insert([{
          ...formData,
          price_per_person: parseFloat(formData.price_per_person) || null,
          included: formData.included.filter(item => item.trim() !== ""),
          excluded: formData.excluded.filter(item => item.trim() !== ""),
          itinerary: formData.itinerary.filter(day => day.title.trim() !== "" && day.description.trim() !== "")
        }])

      if (error) throw error

      router.push("/admin/events")
    } catch (error) {
      console.error("Error creating event:", error)
      alert("Failed to create event. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin/events">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#001934]">Create New Event</h1>
              <p className="text-gray-600 mt-1">Add a new upcoming event to your portfolio</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#001934] mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#B8860B]" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-[#001934]">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  className="mt-1"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <Label htmlFor="date" className="text-sm font-semibold text-[#001934]">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-semibold text-[#001934]">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  required
                  className="mt-1"
                  placeholder="e.g., Wildlife Safari, Cultural Tour"
                />
              </div>

              <div>
                <Label htmlFor="price_per_person" className="text-sm font-semibold text-[#001934] flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Price per Person (USD)
                </Label>
                <Input
                  id="price_per_person"
                  type="number"
                  step="0.01"
                  value={formData.price_per_person}
                  onChange={(e) => handleInputChange("price_per_person", e.target.value)}
                  className="mt-1"
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="duration" className="text-sm font-semibold text-[#001934] flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Duration
                </Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="e.g., 4 Days"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="destination" className="text-sm font-semibold text-[#001934] flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  placeholder="e.g., Volcanoes National Park"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="description" className="text-sm font-semibold text-[#001934]">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
                rows={4}
                className="mt-1"
                placeholder="Provide a detailed description of the event..."
              />
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#001934] mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-[#B8860B]" />
              Images
            </h2>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-semibold text-[#001934] mb-2 block">Cover Image *</Label>
                <AdminImageUpload 
                  onImageUpload={handleMainImageUpload} 
                  currentImage={formData.cover_image}
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#001934] mb-2 block">Gallery Images</Label>
                <AdminImageUpload 
                  onImageUpload={handleGalleryImageUpload}
                  folder="gallery"
                />
                
                {/* Gallery Preview */}
                {formData.gallery_images.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm font-semibold text-[#001934] mb-2 block">Gallery Preview</Label>
                    <div className="flex gap-2 flex-wrap">
                      {formData.gallery_images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img 
                            src={img} 
                            alt={`Gallery ${idx + 1}`} 
                            className="w-20 h-14 object-cover rounded border" 
                          />
                          <button 
                            type="button" 
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 group-hover:scale-110 transition" 
                            onClick={() => handleRemoveGalleryImage(idx)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Itinerary Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#001934] mb-4">Itinerary</h2>
            <div className="space-y-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-semibold text-[#001934]">Day</Label>
                      <Input
                        type="number"
                        value={day.day}
                        onChange={(e) => handleItineraryChange(index, "day", e.target.value)}
                        min="1"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-[#001934]">Title</Label>
                      <Input
                        value={day.title}
                        onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                        placeholder="Day title"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      {formData.itinerary.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeItineraryDay(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label className="text-sm font-semibold text-[#001934]">Description</Label>
                    <Textarea
                      value={day.description}
                      onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                      placeholder="Day description"
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addItineraryDay}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Day
              </Button>
            </div>
          </div>

          {/* What's Included/Excluded Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#001934] mb-4">What's Included & Excluded</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-semibold text-[#001934] mb-2 block">What's Included</Label>
                <div className="space-y-2">
                  {formData.included.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayChange("included", index, e.target.value)}
                        placeholder="Included item"
                        className="flex-1"
                      />
                      {formData.included.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("included", index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("included")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#001934] mb-2 block">What's Excluded</Label>
                <div className="space-y-2">
                  {formData.excluded.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayChange("excluded", index, e.target.value)}
                        placeholder="Excluded item"
                        className="flex-1"
                      />
                      {formData.excluded.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("excluded", index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("excluded")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Publish Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => handleInputChange("is_active", e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="is_active" className="text-sm font-semibold text-[#001934]">Publish immediately</Label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Link href="/admin/events">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#B8860B', color: '#001934', fontWeight: 600 }}
            >
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 