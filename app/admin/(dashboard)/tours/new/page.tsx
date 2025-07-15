'use client'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { supabase } from '@/src/lib/supabase'
import SmartAdminImageUpload from '@/src/components/SmartAdminImageUpload'
import SmartImageUpload from '@/src/components/SmartImageUpload'
import { nanoid } from 'nanoid'

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function AddTourPage() {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [detailedDesc, setDetailedDesc] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Image upload state - using arrays of URLs instead of file objects
  const [mainImage, setMainImage] = useState<string>('')
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  // Dynamic lists state
  const [itinerary, setItinerary] = useState<string[]>([''])
  const [included, setIncluded] = useState<string[]>([''])
  const [excluded, setExcluded] = useState<string[]>([''])

  // Itinerary handlers
  function handleItineraryChange(idx: number, value: string) {
    setItinerary(list => list.map((item, i) => i === idx ? value : item))
  }
  function addItineraryDay() {
    setItinerary(list => [...list, ''])
  }
  function removeItineraryDay(idx: number) {
    setItinerary(list => list.length === 1 ? [''] : list.filter((_, i) => i !== idx))
  }

  // Included handlers
  function handleIncludedChange(idx: number, value: string) {
    setIncluded(list => list.map((item, i) => i === idx ? value : item))
  }
  function addIncluded() {
    setIncluded(list => [...list, ''])
  }
  function removeIncluded(idx: number) {
    setIncluded(list => list.length === 1 ? [''] : list.filter((_, i) => i !== idx))
  }

  // Excluded handlers
  function handleExcludedChange(idx: number, value: string) {
    setExcluded(list => list.map((item, i) => i === idx ? value : item))
  }
  function addExcluded() {
    setExcluded(list => [...list, ''])
  }
  function removeExcluded(idx: number) {
    setExcluded(list => list.length === 1 ? [''] : list.filter((_, i) => i !== idx))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!title || !location || !price || !duration || !shortDesc || !detailedDesc) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      // Generate a unique ID using timestamp and random string
      const uniqueId = `tour_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
      
      // Insert directly into Supabase
      const { error } = await supabase.from('tours').insert([{
        id: uniqueId,
        title,
        destination: location,
        price_per_person: parseFloat(price),
        duration,
        short_description: shortDesc,
        long_description: detailedDesc,
        main_image: mainImage,
        gallery_images: galleryImages,
        itinerary,
        included,
        excluded,
        is_active: true,
      }])
      if (error) throw error
      setSuccess('Tour created!')
      // Optionally reset form here
    } catch (err: any) {
      setError(err.message || 'Failed to create tour')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto w-full py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/tours" className="text-[#001934] hover:text-[#b8860b] font-semibold">&larr; Back to Tours</Link>
        <h1 className="text-2xl font-bold text-[#001934]">Add New Tour</h1>
      </div>
      <form className="space-y-6 bg-white rounded-xl shadow p-6" onSubmit={handleSubmit}>
        {/* Error/Success Feedback */}
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="e.g. Akagera Safari" />
        </div>
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Location</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="e.g. Akagera National Park" />
        </div>
        {/* Price & Duration */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#001934] mb-1">Price (USD)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="e.g. 1200" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#001934] mb-1">Duration</label>
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="e.g. 3 days, 2 nights" />
          </div>
        </div>
        {/* Descriptions */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Short Description</label>
          <textarea value={shortDesc} onChange={e => setShortDesc(e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="Brief description for cards and lists" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Detailed Description</label>
          <textarea value={detailedDesc} onChange={e => setDetailedDesc(e.target.value)} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="Full description for the tour details page" />
        </div>
        {/* Main Image Upload */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Main Image</label>
          <SmartAdminImageUpload onImageUpload={setMainImage} currentImage={mainImage} />
        </div>
        {/* Gallery Images Upload */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Gallery Images</label>
          <SmartImageUpload images={galleryImages} onImagesChange={setGalleryImages} />
        </div>
        {/* Itinerary */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Itinerary</label>
          {itinerary.map((day, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={day}
                onChange={e => handleItineraryChange(idx, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent"
                placeholder={`Day ${idx + 1} activities`}
              />
              <button type="button" onClick={() => removeItineraryDay(idx)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addItineraryDay} className="px-4 py-2 bg-[#b8860b] text-white rounded-lg hover:bg-[#a6760a]">Add Day</button>
        </div>
        {/* Included */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">What's Included</label>
          {included.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={e => handleIncludedChange(idx, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent"
                placeholder="e.g. Accommodation, Meals, Guide"
              />
              <button type="button" onClick={() => removeIncluded(idx)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addIncluded} className="px-4 py-2 bg-[#b8860b] text-white rounded-lg hover:bg-[#a6760a]">Add Item</button>
        </div>
        {/* Excluded */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">What's Not Included</label>
          {excluded.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={e => handleExcludedChange(idx, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent"
                placeholder="e.g. Flights, Personal expenses"
              />
              <button type="button" onClick={() => removeExcluded(idx)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addExcluded} className="px-4 py-2 bg-[#b8860b] text-white rounded-lg hover:bg-[#a6760a]">Add Item</button>
        </div>
        {/* Submit */}
        <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-[#b8860b] text-white rounded-lg hover:bg-[#a6760a] disabled:opacity-50">
          {loading ? 'Creating...' : 'Create Tour'}
        </button>
      </form>
    </div>
  )
} 