"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/src/lib/supabase"
import { ArrowLeft, Plus, Edit, Trash2, Eye, Upload, X } from "lucide-react"
import Link from "next/link"

interface FeaturedService {
  id: string
  title: string
  description: string
  image_url: string
  cta_text: string
  cta_link: string
  service_id: string
  is_active: boolean
  created_at?: string
}

export default function FeaturedServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState<FeaturedService[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [editingService, setEditingService] = useState<FeaturedService | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    cta_text: "Book Service",
    cta_link: "",
    service_id: "",
    is_active: true,
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("featured_services")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setServices(data || [])
    } catch (error) {
      console.error("Error fetching services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `featuredservice/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('featuredservice')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('featuredservice')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, image_url: publicUrl }))
      setSelectedImageFile(file)
    } catch (error) {
      console.error('Error uploading image:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown upload error'
      alert(`Error uploading image: ${errorMessage}. Please try again.`)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingService) {
        // Update existing service
        const { error } = await supabase
          .from("featured_services")
          .update(formData)
          .eq("id", editingService.id)

        if (error) throw error
      } else {
        // Create new service
        const { error } = await supabase
          .from("featured_services")
          .insert([formData])

        if (error) throw error
      }

      resetForm()
      fetchServices()
    } catch (error) {
      console.error("Error saving service:", error)
      alert("Error saving service. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service: FeaturedService) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      image_url: service.image_url,
      cta_text: service.cta_text,
      cta_link: service.cta_link,
      service_id: service.service_id,
      is_active: service.is_active,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      const { error } = await supabase
        .from("featured_services")
        .delete()
        .eq("id", id)

      if (error) throw error

      fetchServices()
    } catch (error) {
      console.error("Error deleting service:", error)
      alert("Error deleting service. Please try again.")
    }
  }

  const resetForm = () => {
    setEditingService(null)
    setFormData({
      title: "",
      description: "",
      image_url: "",
      cta_text: "Book Service",
      cta_link: "",
      service_id: "",
      is_active: true,
    })
    setSelectedImageFile(null)
    setShowForm(false)
  }

  const toggleActive = async (service: FeaturedService) => {
    try {
      const { error } = await supabase
        .from("featured_services")
        .update({ is_active: !service.is_active })
        .eq("id", service.id)

      if (error) throw error

      fetchServices()
    } catch (error) {
      console.error("Error updating service:", error)
      alert("Error updating service. Please try again.")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#001934]">Featured Services</h1>
            <p className="text-gray-600 mt-2">Manage featured construction services displayed on homepage</p>
          </div>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-[#B8860B] hover:bg-[#A67C0A] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#001934]">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Service Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Architecture Design"
                  required
                />
              </div>

              <div>
                <Label htmlFor="service_id">Service ID *</Label>
                <Input
                  id="service_id"
                  value={formData.service_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, service_id: e.target.value }))}
                  placeholder="architecture-design"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Service description..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="cta_text">CTA Text</Label>
                <Input
                  id="cta_text"
                  value={formData.cta_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, cta_text: e.target.value }))}
                  placeholder="Book Service"
                />
              </div>

              <div>
                <Label htmlFor="cta_link">CTA Link *</Label>
                <Input
                  id="cta_link"
                  value={formData.cta_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, cta_link: e.target.value }))}
                  placeholder="/services/architecture-design"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Service Image *</Label>
              <div className="mt-2">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleImageUpload(file)
                    }
                  }}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#B8860B] transition-colors">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {selectedImageFile ? selectedImageFile.name : "Click to upload image"}
                    </p>
                    {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                  </div>
                </label>
                {formData.image_url && (
                  <p className="text-xs text-green-600 mt-1">✓ Image uploaded successfully</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked as boolean }))}
              />
              <Label htmlFor="is_active">Active (visible on website)</Label>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={loading || uploading}>
                {editingService ? "Update Service" : "Create Service"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#001934] mb-4">Featured Services</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B8860B] mx-auto"></div>
              <p className="mt-4 text-[#001934]">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No featured services found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {service.image_url ? (
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Eye className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#001934]">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.description.substring(0, 100)}...</p>
                      <p className="text-xs text-gray-500">ID: {service.service_id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(service)}
                    >
                      {service.is_active ? "Active" : "Inactive"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 