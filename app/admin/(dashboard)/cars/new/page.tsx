"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/src/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import SmartImageUpload from "@/src/components/SmartImageUpload"
import { X } from "lucide-react"
import Link from "next/link"
import { nanoid } from 'nanoid'

const steps = ["Basic Info", "Specifications", "Images", "Features", "Review"]

export default function AddCarPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    model: "",
    year: "",
    short_description: "",
    detailed_description: "",
    doors: "",
    color: "",
    seats: "",
    transmission: "",
    engine: "",
    fuel_type: "",
    price_per_day: "",
    main_image: "",
    gallery_images: [] as string[],
    features: [] as string[],
    is_active: true,
  })
  const [featureInput, setFeatureInput] = useState("")

  // Generate a display id (slug-style) from name and model for review only
  const displayId = (form.name && form.model)
    ? `${form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${form.model.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`
    : "";

  const handleNameChange = (e: any) => {
    const name = e.target.value
    setForm(f => ({ ...f, name }))
  }

  // Step validation
  const validateStep = () => {
    if (step === 0) {
      return form.name && form.model && form.year
    }
    if (step === 1) {
      return form.price_per_day && Number(form.price_per_day) > 0
    }
    if (step === 2) {
      return form.main_image
    }
    return true
  }

  // Handle image upload
  const handleMainImageUpload = (url: string) => {
    setForm(f => ({ ...f, main_image: url }))
  }
  const handleGalleryImageUpload = (url: string) => {
    setForm(f => ({ ...f, gallery_images: [...f.gallery_images, url] }))
  }
  const handleRemoveGalleryImage = (idx: number) => {
    setForm(f => ({ ...f, gallery_images: f.gallery_images.filter((_, i) => i !== idx) }))
  }

  // Handle features
  const handleAddFeature = () => {
    if (featureInput.trim() && !form.features.includes(featureInput.trim())) {
      setForm(f => ({ ...f, features: [...f.features, featureInput.trim()] }))
      setFeatureInput("")
    }
  }
  const handleRemoveFeature = (idx: number) => {
    setForm(f => ({ ...f, features: f.features.filter((_, i) => i !== idx) }))
  }

  // Handle submit
  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    // Generate a unique, readable id for the car
    const { id, ...formWithoutId } = form
    const { error } = await supabase.from("cars").insert([
      {
        id: nanoid(10),
        ...formWithoutId,
        year: Number(form.year),
        doors: form.doors ? Number(form.doors) : null,
        seats: form.seats ? Number(form.seats) : null,
        price_per_day: form.price_per_day,
        gallery_images: form.gallery_images,
        features: form.features,
        is_active: form.is_active,
      },
    ])
    setLoading(false)
    if (!error) {
      router.push("/admin/cars")
    } else {
      setError(error.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${i === step ? 'bg-[#B8860B] text-[#001934] border-[#B8860B]' : 'bg-white text-[#001934] border-[#001934]'}`}>{i + 1}</div>
            <span className={`mt-2 text-xs font-semibold ${i === step ? 'text-[#B8860B]' : 'text-[#001934]'}`}>{s}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-[#001934] mb-6">Basic Info</h2>
            <div className="space-y-4">
              <label className="block font-semibold text-[#001934]">Name</label>
              <Input value={form.name} onChange={handleNameChange} required placeholder="e.g. Toyota Land Cruiser" />
              <label className="block font-semibold text-[#001934]">Model</label>
              <Input value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} required placeholder="e.g. SUV" />
              <label className="block font-semibold text-[#001934]">Year</label>
              <Input type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} required min={1900} max={2100} placeholder="e.g. 2022" />
              <label className="block font-semibold text-[#001934]">Short Description</label>
              <Textarea value={form.short_description} onChange={e => setForm(f => ({ ...f, short_description: e.target.value }))} required placeholder="A brief summary for cards and lists (e.g. Premium 4WD for safari adventures and rough terrain.)" />
              <label className="block font-semibold text-[#001934]">Detailed Description</label>
              <Textarea value={form.detailed_description} onChange={e => setForm(f => ({ ...f, detailed_description: e.target.value }))} required placeholder="A full description for the car details page." rows={4} />
              <label className="block font-semibold text-[#001934]">ID (auto-generated)</label>
              <Input value={displayId} readOnly placeholder="Auto-generated from name and model" />
              <p className="text-xs mt-1 mb-2 rounded px-3 py-2" style={{ background: 'linear-gradient(90deg, #001934 0%, #B8860B 100%)', color: '#fff' }}>
                <strong>NB:</strong> The ID is a unique identifier for this car, auto-generated for your reference. The system will use its own unique ID for database operations.
              </p>
            </div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-[#001934] mb-6">Specifications</h2>
            <div className="space-y-4">
              <label className="block font-semibold text-[#001934]">Doors</label>
              <Input type="number" value={form.doors} onChange={e => setForm(f => ({ ...f, doors: e.target.value }))} min={2} max={6} placeholder="e.g. 4" />
              <label className="block font-semibold text-[#001934]">Color</label>
              <Input value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} placeholder="e.g. Pearl White" />
              <label className="block font-semibold text-[#001934]">Seats</label>
              <Input type="number" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: e.target.value }))} min={1} max={20} placeholder="e.g. 7" />
              <label className="block font-semibold text-[#001934]">Transmission</label>
              <Input value={form.transmission} onChange={e => setForm(f => ({ ...f, transmission: e.target.value }))} placeholder="e.g. Automatic" />
              <label className="block font-semibold text-[#001934]">Engine</label>
              <Input value={form.engine} onChange={e => setForm(f => ({ ...f, engine: e.target.value }))} placeholder="e.g. 4.5L V8 Turbo Diesel" />
              <label className="block font-semibold text-[#001934]">Fuel Type</label>
              <Input value={form.fuel_type} onChange={e => setForm(f => ({ ...f, fuel_type: e.target.value }))} placeholder="e.g. Diesel" />
              <label className="block font-semibold text-[#001934]">Price Per Day (USD)</label>
              <div className="flex items-center gap-2">
                <span className="px-2 text-gray-500">$</span>
                <Input
                  type="number"
                  value={form.price_per_day}
                  onChange={e => setForm(f => ({ ...f, price_per_day: e.target.value }))}
                  required
                  min={0}
                  className="w-32"
                  placeholder="e.g. 250"
                />
                <span className="px-2 text-gray-500">/day</span>
              </div>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-[#001934] mb-6">Images</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 text-[#001934]">Main Image <span className="text-red-500">*</span></label>
                <SmartImageUpload images={form.main_image ? [form.main_image] : []} onImagesChange={(urls) => handleMainImageUpload(urls[0] || '')} folder="" />
                {form.main_image && (
                  <div className="mt-2"><img src={form.main_image} alt="Main" className="w-32 h-20 object-cover rounded border" /></div>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-2 text-[#001934]">Gallery Images</label>
                <SmartImageUpload images={form.gallery_images} onImagesChange={handleGalleryImageUpload} folder="gallery" />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {form.gallery_images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt="Gallery" className="w-20 h-14 object-cover rounded border" />
                      <button type="button" className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 group-hover:scale-110 transition" onClick={() => handleRemoveGalleryImage(idx)}><X size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-[#001934] mb-6">Features</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Add feature (e.g. Air Conditioned)" value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }} />
                <Button type="button" style={{ backgroundColor: '#B8860B', color: '#001934' }} onClick={handleAddFeature}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.features.map((f, idx) => (
                  <span key={idx} className="bg-[#B8860B]/20 text-[#001934] px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    {f}
                    <button type="button" className="ml-1 text-red-500 hover:text-red-700" onClick={() => handleRemoveFeature(idx)}><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div key="step5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-[#001934] mb-6">Review & Publish</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} id="is_active" />
                <label htmlFor="is_active" className="font-semibold text-[#001934]">Publish this car</label>
              </div>
              <div className="bg-gray-50 rounded p-4">
                <h3 className="font-bold text-[#001934] mb-2">Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="font-semibold">Name:</span> {form.name}</div>
                  <div><span className="font-semibold">Model:</span> {form.model}</div>
                  <div><span className="font-semibold">Year:</span> {form.year}</div>
                  <div className="col-span-2"><span className="font-semibold">Short Description:</span> {form.short_description}</div>
                  <div className="col-span-2"><span className="font-semibold">Detailed Description:</span> {form.detailed_description}</div>
                  <div><span className="font-semibold">ID:</span> {displayId ? `${displayId}-xxxxxx` : "(will be generated)"}</div>
                  <div><span className="font-semibold">Doors:</span> {form.doors}</div>
                  <div><span className="font-semibold">Color:</span> {form.color}</div>
                  <div><span className="font-semibold">Seats:</span> {form.seats}</div>
                  <div><span className="font-semibold">Transmission:</span> {form.transmission}</div>
                  <div><span className="font-semibold">Engine:</span> {form.engine}</div>
                  <div><span className="font-semibold">Fuel Type:</span> {form.fuel_type}</div>
                  <div><span className="font-semibold">Price/Day:</span> {form.price_per_day}</div>
                  <div className="col-span-2"><span className="font-semibold">Features:</span> {form.features.join(", ")}</div>
                  <div className="col-span-2"><span className="font-semibold">Main Image:</span> {form.main_image ? <img src={form.main_image} alt="Main" className="inline w-20 h-12 object-cover rounded border ml-2" /> : "None"}</div>
                  <div className="col-span-2"><span className="font-semibold">Gallery Images:</span> {form.gallery_images.length > 0 ? form.gallery_images.map((img, idx) => (<img key={idx} src={img} alt="Gallery" className="inline w-12 h-8 object-cover rounded border ml-1" />)) : "None"}</div>
                  <div className="col-span-2"><span className="font-semibold">Published:</span> {form.is_active ? "Yes" : "No"}</div>
                </div>
              </div>
              {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Back</Button>
        {step < steps.length - 1 ? (
          <Button type="button" style={{ backgroundColor: '#B8860B', color: '#001934', fontWeight: 600 }} onClick={() => { if (validateStep()) setStep(s => s + 1) }} disabled={!validateStep()}>Next</Button>
        ) : (
          <Button type="button" style={{ backgroundColor: '#B8860B', color: '#001934', fontWeight: 600 }} onClick={handleSubmit} disabled={loading}>{loading ? "Adding..." : "Add Car"}</Button>
        )}
      </div>
    </div>
  )
} 