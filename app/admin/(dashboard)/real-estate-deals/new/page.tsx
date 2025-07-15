"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/src/lib/supabase"
import { ArrowLeft, Save, Plus, Upload, X } from "lucide-react"
import Link from "next/link"

export default function NewRealEstateDealPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    detailed_description: "",
    main_image_url: "",
    gallery_images: [""],
    property_type: "",
    year_built: "",
    number_of_floors: "",
    primary_color: "",
    number_of_entrances: "",
    air_system: "",
    energy_source: "",
    security_system: "",
    price: "",
    location: "",
    is_featured: false,
    is_active: true,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMainImageUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `real-estate/${fileName}`

      // First, check if the bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets()
      const bucketExists = buckets?.some(bucket => bucket.name === 'real-estate')
      
      if (!bucketExists) {
        const { error: bucketError } = await supabase.storage.createBucket('real-estate', {
          public: true
        })
        if (bucketError) {
          console.error('Error creating bucket:', bucketError)
          throw new Error('Failed to create storage bucket')
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('real-estate')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('real-estate')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, main_image_url: publicUrl }))
      setMainImageFile(file)
    } catch (error) {
      console.error('Error uploading main image:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown upload error'
      alert(`Error uploading main image: ${errorMessage}. Please try again.`)
    } finally {
      setUploading(false)
    }
  }

  const handleGalleryImageUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `real-estate/${fileName}`

      // First, check if the bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets()
      const bucketExists = buckets?.some(bucket => bucket.name === 'real-estate')
      
      if (!bucketExists) {
        const { error: bucketError } = await supabase.storage.createBucket('real-estate', {
          public: true
        })
        if (bucketError) {
          console.error('Error creating bucket:', bucketError)
          throw new Error('Failed to create storage bucket')
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('real-estate')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('real-estate')
        .getPublicUrl(filePath)

      setFormData(prev => ({ 
        ...prev, 
        gallery_images: [...prev.gallery_images, publicUrl] 
      }))
      setGalleryImageFiles(prev => [...prev, file])
    } catch (error) {
      console.error('Error uploading gallery image:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown upload error'
      alert(`Error uploading gallery image: ${errorMessage}. Please try again.`)
    } finally {
      setUploading(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    const newGalleryImages = formData.gallery_images.filter((_, i) => i !== index)
    const newGalleryFiles = galleryImageFiles.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, gallery_images: newGalleryImages }))
    setGalleryImageFiles(newGalleryFiles)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("real_estate_deals")
        .insert([{
          ...formData,
          year_built: parseInt(formData.year_built),
          number_of_floors: parseInt(formData.number_of_floors),
          number_of_entrances: parseInt(formData.number_of_entrances),
          gallery_images: formData.gallery_images.filter(img => img.trim() !== ""),
        }])

      if (error) {
        console.error("Error creating real estate deal:", error)
        alert("Error creating real estate deal. Please try again.")
      } else {
        router.push("/admin/real-estate-deals")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error creating real estate deal. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/real-estate-deals">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deals
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#001934]">Add New Real Estate Deal</h1>
          <p className="text-gray-600 mt-2">Create a new real estate property listing</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#001934]">Basic Information</h3>
              
            <div>
                <Label htmlFor="title">Property Title *</Label>
              <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Luxury Apartment in Kigali"
                required
              />
            </div>

            <div>
                <Label htmlFor="short_description">Short Description *</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => handleInputChange("short_description", e.target.value)}
                  placeholder="Brief description for the card display"
                  rows={3}
                required
                />
            </div>

            <div>
                <Label htmlFor="detailed_description">Detailed Description *</Label>
                <Textarea
                  id="detailed_description"
                  value={formData.detailed_description}
                  onChange={(e) => handleInputChange("detailed_description", e.target.value)}
                  placeholder="Comprehensive description of the property"
                  rows={5}
                required
              />
            </div>

            <div>
                <Label htmlFor="location">Location *</Label>
              <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Kigali City Center"
                required
              />
            </div>

            <div>
                <Label htmlFor="price">Price Link *</Label>
              <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="Contact for pricing details"
                  required
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#001934]">Property Details</h3>

            <div>
                <Label htmlFor="property_type">Property Type *</Label>
              <Input
                  id="property_type"
                  value={formData.property_type}
                  onChange={(e) => handleInputChange("property_type", e.target.value)}
                  placeholder="Apartment, Villa, Commercial, etc."
                  required
              />
            </div>

              <div className="grid grid-cols-2 gap-4">
            <div>
                  <Label htmlFor="year_built">Year Built *</Label>
              <Input
                    id="year_built"
                type="number"
                    value={formData.year_built}
                    onChange={(e) => handleInputChange("year_built", e.target.value)}
                    placeholder="2023"
                    required
              />
            </div>

            <div>
                  <Label htmlFor="number_of_floors">Number of Bedrooms *</Label>
                  <Input
                    id="number_of_floors"
                    type="number"
                    value={formData.number_of_floors}
                    onChange={(e) => handleInputChange("number_of_floors", e.target.value)}
                    placeholder="3"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary_color">Primary Color</Label>
              <Input
                    id="primary_color"
                    value={formData.primary_color}
                    onChange={(e) => handleInputChange("primary_color", e.target.value)}
                    placeholder="Modern White"
              />
            </div>

            <div>
                  <Label htmlFor="number_of_entrances">Number of Entrances</Label>
              <Input
                    id="number_of_entrances"
                    type="number"
                    value={formData.number_of_entrances}
                    onChange={(e) => handleInputChange("number_of_entrances", e.target.value)}
                    placeholder="2"
              />
            </div>
          </div>

          <div>
                <Label htmlFor="air_system">Air System</Label>
                <Input
                  id="air_system"
                  value={formData.air_system}
                  onChange={(e) => handleInputChange("air_system", e.target.value)}
                  placeholder="Central AC, Split Units, etc."
            />
          </div>

          <div>
                <Label htmlFor="energy_source">Energy Source</Label>
                <Input
                  id="energy_source"
                  value={formData.energy_source}
                  onChange={(e) => handleInputChange("energy_source", e.target.value)}
                  placeholder="Solar + Grid, Grid Power, etc."
            />
          </div>

          <div>
                <Label htmlFor="security_system">Security System</Label>
                <Input
                  id="security_system"
                  value={formData.security_system}
                  onChange={(e) => handleInputChange("security_system", e.target.value)}
                  placeholder="24/7 Security, CCTV, etc."
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#001934]">Images</h3>
            
            {/* Main Image Upload */}
          <div>
              <Label htmlFor="main_image">Main Image *</Label>
              <div className="mt-2">
                <input
                  type="file"
                  id="main_image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleMainImageUpload(file)
                    }
                  }}
                  className="hidden"
                />
                <label htmlFor="main_image" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#B8860B] transition-colors">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {mainImageFile ? mainImageFile.name : "Click to upload main image"}
                    </p>
                    {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                  </div>
            </label>
                {formData.main_image_url && (
                  <p className="text-xs text-green-600 mt-1">✓ Main image uploaded successfully</p>
                )}
              </div>
            </div>

            {/* Gallery Images Upload */}
            <div>
              <Label>Gallery Images</Label>
              <div className="mt-2">
                <input
                  type="file"
                  id="gallery_image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleGalleryImageUpload(file)
                    }
                  }}
                  className="hidden"
                />
                <label htmlFor="gallery_image" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#B8860B] transition-colors">
                    <Plus className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Add gallery image</p>
                    {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                  </div>
                </label>
              </div>

              {/* Display uploaded gallery images */}
              {formData.gallery_images.length > 0 && formData.gallery_images[0] !== "" && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Gallery Images:</p>
                  {formData.gallery_images.map((imageUrl, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Gallery image {index + 1}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#001934]">Settings</h3>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange("is_active", checked as boolean)}
              />
              <Label htmlFor="is_active">Active (visible on website)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleInputChange("is_featured", checked as boolean)}
              />
              <Label htmlFor="is_featured">Featured Property</Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link href="/admin/real-estate-deals">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-[#001934] font-semibold"
              disabled={loading || uploading}
            >
                <Save className="w-4 h-4 mr-2" />
              {loading ? "Creating..." : "Create Deal"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 