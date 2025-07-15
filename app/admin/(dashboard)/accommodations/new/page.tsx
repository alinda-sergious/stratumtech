"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AddAccommodationPage() {
  const router = useRouter()
  const [type, setType] = useState("apartment")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [images, setImages] = useState<FileList | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    let imageUrls: string[] = []
    try {
      // Upload images if any
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const file = images[i]
          const filePath = `accommodation/${Date.now()}-${file.name}`
          const { data, error: uploadError } = await supabase.storage.from("accomodation").upload(filePath, file)
          if (uploadError) throw uploadError
          const { data: publicUrlData } = supabase.storage.from("accomodation").getPublicUrl(filePath)
          imageUrls.push(publicUrlData.publicUrl)
        }
      }
      // Build insert object with only present fields
      const timestamp = Date.now()
      const newId = type === "hotel" ? `hotel-${timestamp}` : `apt-${timestamp}`
      const insertObj: any = {
        id: newId,
        type,
        name,
        description,
        location,
      }
      if (type === "hotel" && rating !== null && rating !== undefined) {
        insertObj.rating = rating
      }
      if (imageUrls.length > 0) {
        insertObj.images = imageUrls
      }
      const { error: insertError } = await supabase.from("accommodations").insert([insertObj])
      if (insertError) throw insertError
      router.push("/admin/accommodations")
    } catch (err: any) {
      setError(err.message || "Failed to add accommodation.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-4">
        <Link href="/admin/accommodations">
          <Button variant="outline">&larr; Back to Accommodations</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-[#001934]">Add New Accommodation</h1>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded shadow">
        {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
        <div>
          <label className="block font-semibold mb-1">Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="apartment">Apartment</option>
            <option value="hotel">Hotel</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        {type === "hotel" && (
          <div>
            <label className="block font-semibold mb-1">Rating (1-5)</label>
            <input type="number" min={1} max={5} value={rating ?? ""} onChange={e => setRating(Number(e.target.value))} className="w-full border rounded px-3 py-2" />
          </div>
        )}
        <div>
          <label className="block font-semibold mb-1">Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>
        <Button type="submit" disabled={isSubmitting} style={{ backgroundColor: '#B8860B', color: '#001934', fontWeight: 600 }}>
          {isSubmitting ? "Adding..." : "Add Accommodation"}
        </Button>
      </form>
    </div>
  )
} 