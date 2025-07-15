"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/src/lib/supabase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EditAccommodationPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [type, setType] = useState("apartment")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<FileList | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAccommodation() {
      setLoading(true)
      const { data, error } = await supabase
        .from("accommodations")
        .select("type, name, description, location, rating, images")
        .eq("id", id)
        .single()
      if (!error && data) {
        setType(data.type)
        setName(data.name)
        setDescription(data.description)
        setLocation(data.location)
        setRating(data.rating)
        setImages(data.images || [])
      } else {
        setError("Accommodation not found.")
      }
      setLoading(false)
    }
    if (id) fetchAccommodation()
  }, [id])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImages(e.target.files)
  }

  const handleRemoveImage = (imgUrl: string) => {
    setImages(prev => prev.filter(url => url !== imgUrl))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    let updatedImages = [...images]
    try {
      // Upload new images if any
      if (newImages && newImages.length > 0) {
        for (let i = 0; i < newImages.length; i++) {
          const file = newImages[i]
          const filePath = `accommodation/${Date.now()}-${file.name}`
          const { data, error: uploadError } = await supabase.storage.from("accomodation").upload(filePath, file)
          if (uploadError) throw uploadError
          const { data: publicUrlData } = supabase.storage.from("accomodation").getPublicUrl(filePath)
          updatedImages.push(publicUrlData.publicUrl)
        }
      }
      // Build update object
      const updateObj: any = {
        type,
        name,
        description,
        location,
        images: updatedImages,
      }
      if (type === "hotel" && rating !== null && rating !== undefined) {
        updateObj.rating = rating
      } else {
        updateObj.rating = null
      }
      const { error: updateError } = await supabase.from("accommodations").update(updateObj).eq("id", id)
      if (updateError) throw updateError
      router.push("/admin/accommodations")
    } catch (err: any) {
      setError(err.message || "Failed to update accommodation.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this accommodation? This action cannot be undone.")) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: deleteError } = await supabase.from("accommodations").delete().eq("id", id);
      if (deleteError) throw deleteError;
      router.push("/admin/accommodations");
    } catch (err: any) {
      setError(err.message || "Failed to delete accommodation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading accommodation...</div>
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-4">
        <Link href="/admin/accommodations">
          <Button variant="outline">&larr; Back to Accommodations</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-[#001934]">Edit Accommodation</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded shadow">
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
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img src={img} alt="Accommodation" className="w-16 h-12 object-cover rounded border-2 border-[#001934]" />
                <button type="button" onClick={() => handleRemoveImage(img)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100">&times;</button>
              </div>
            ))}
          </div>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>
        <Button type="submit" disabled={isSubmitting} style={{ backgroundColor: '#B8860B', color: '#001934', fontWeight: 600 }}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
      <Button
        variant="destructive"
        onClick={handleDelete}
        disabled={isSubmitting}
        className="mt-6 w-full"
      >
        Delete Accommodation
      </Button>
    </div>
  )
} 