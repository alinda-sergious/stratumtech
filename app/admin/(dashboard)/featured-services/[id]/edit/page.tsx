"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/src/lib/supabase"
import { ArrowLeft, Save, Upload, X } from "lucide-react"
import Link from "next/link"
import SmartImageUpload from "@/src/components/SmartImageUpload"

export default function EditFeaturedServicePage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Form fields
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [rating, setRating] = useState("")
  const [images, setImages] = useState<string[]>([])

  const serviceTypes = [
    "Architecture Design", "Building Construction", "Renovation", "Maintenance",
    "Project Management", "Interior Design", "Landscaping", "Electrical",
    "Plumbing", "HVAC", "Roofing", "Foundation", "Structural Engineering"
  ]

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data, error } = await supabase
          .from("accommodations")
          .select("*")
          .eq("id", serviceId)
          .single()

        if (error) throw error

        if (data) {
          setName(data.name || "")
          setType(data.type || "")
          setDescription(data.description || "")
          setLocation(data.location || "")
          setRating(data.rating?.toString() || "")
          setImages(data.images || [])
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch service")
      } finally {
        setLoading(false)
      }
    }

    if (serviceId) {
      fetchService()
    }
  }, [serviceId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    if (!name || !type || !description || !location) {
      setError("Please fill in all required fields.")
      return
    }

    setSaving(true)

    try {
      const { error } = await supabase
        .from("accommodations")
        .update({
          name,
          type,
          description,
          location,
          rating: rating ? parseFloat(rating) : null,
          images,
        })
        .eq("id", serviceId)

      if (error) throw error

      setSuccess("Featured service updated successfully!")
      setTimeout(() => {
        router.push("/admin/featured-services")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to update featured service")
    } finally {
      setSaving(false)
    }
  }

  const addImage = (imageUrl: string) => {
    setImages(prev => [...prev, imageUrl])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#B8860B] mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/featured-services">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#001934]">Edit Featured Service</h1>
          <p className="text-gray-600 mt-2">Update service information</p>
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
                Service Name *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter service name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">
                Service Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-[#001934]"
                required
              >
                <option value="">Select service type</option>
                {serviceTypes.map(serviceType => (
                  <option key={serviceType} value={serviceType}>{serviceType}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">
                Location *
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter service location"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">
                Rating (1-5)
              </label>
              <Input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="e.g., 4.5"
                type="number"
                min="1"
                max="5"
                step="0.1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#001934] mb-2">
              Service Description *
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the service offering in detail"
              rows={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#001934] mb-2">
              Service Images
            </label>
            <SmartImageUpload
              images={images}
              onImagesChange={setImages}
              folder="featured-services"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={saving}
              className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-[#001934] font-semibold"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#001934] mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Link href="/admin/featured-services">
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