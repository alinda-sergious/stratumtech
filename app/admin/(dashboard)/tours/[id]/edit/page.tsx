'use client'
import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../../../../../src/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default function EditTourPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  // Editable fields
  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  type ItineraryItem = { day: number, title: string, description: string }
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([])
  const [included, setIncluded] = useState<string[]>([''])
  const [excluded, setExcluded] = useState<string[]>([''])

  // Image state
  const [mainImage, setMainImage] = useState<{ file?: File, url: string } | null>(null)
  const [galleryImages, setGalleryImages] = useState<{ file?: File, url: string }[]>([])
  const [mainGalleryIndex, setMainGalleryIndex] = useState<number | null>(null)
  const mainInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchTour() {
      setLoading(true)
      setError('')
      const { data, error } = await supabase.from('tours').select('*').eq('id', id).single()
      if (error || !data) {
        setError('Failed to load tour')
        setLoading(false)
        return
      }
      setTitle(data.title || '')
      setDestination(data.destination || '')
      setPrice(data.price_per_person || '')
      setDuration(data.duration || data.duration_days?.toString() || '')
      setShortDesc(data.short_description || '')
      setLongDesc(data.long_description || data.description || '')
      let parsedItinerary: ItineraryItem[] = []
      if (Array.isArray(data.itinerary)) parsedItinerary = data.itinerary
      else if (data.itinerary) parsedItinerary = JSON.parse(data.itinerary)
      setItinerary(parsedItinerary.length ? parsedItinerary : [{ day: 1, title: '', description: '' }])
      setIncluded(Array.isArray(data.included) ? data.included : (data.included ? JSON.parse(data.included) : ['']))
      setExcluded(Array.isArray(data.excluded) ? data.excluded : (data.excluded ? JSON.parse(data.excluded) : ['']))
      // Images
      setMainImage(data.main_image ? { url: data.main_image } : null)
      setGalleryImages(Array.isArray(data.gallery_images) ? data.gallery_images.map((url: string) => ({ url })) : (data.gallery_images ? JSON.parse(data.gallery_images).map((url: string) => ({ url })) : []))
      setMainGalleryIndex(0)
      setLoading(false)
    }
    if (id) fetchTour()
  }, [id])

  // Dynamic list handlers (same as in new page)
  function handleItineraryField(idx: number, field: keyof ItineraryItem, value: string) {
    setItinerary(list => list.map((item, i) => i === idx ? { ...item, [field]: value } : item))
  }
  function addItineraryDay() {
    setItinerary(list => [...list, { day: list.length + 1, title: '', description: '' }])
  }
  function removeItineraryDay(idx: number) {
    setItinerary(list => list.length === 1 ? [{ day: 1, title: '', description: '' }] : list.filter((_, i) => i !== idx).map((item, i) => ({ ...item, day: i + 1 })))
  }
  function handleIncludedChange(idx: number, value: string) {
    setIncluded(list => list.map((item, i) => i === idx ? value : item))
  }
  function addIncluded() {
    setIncluded(list => [...list, ''])
  }
  function removeIncluded(idx: number) {
    setIncluded(list => list.length === 1 ? [''] : list.filter((_, i) => i !== idx))
  }
  function handleExcludedChange(idx: number, value: string) {
    setExcluded(list => list.map((item, i) => i === idx ? value : item))
  }
  function addExcluded() {
    setExcluded(list => [...list, ''])
  }
  function removeExcluded(idx: number) {
    setExcluded(list => list.length === 1 ? [''] : list.filter((_, i) => i !== idx))
  }

  // Image upload helpers
  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
  // Main image handlers
  async function handleMainImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const url = await readFileAsDataURL(file)
      setMainImage({ file, url })
    }
  }
  function handleMainImageDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      readFileAsDataURL(file).then(url => setMainImage({ file, url }))
    }
  }
  function handleMainDragOver(e: React.DragEvent<HTMLDivElement>) { e.preventDefault() }

  // Helper to extract file path from public URL
  function getFilePathFromUrl(url: string) {
    const idx = url.indexOf('/tours/')
    return idx !== -1 ? url.substring(idx + 1) : null
  }

  async function deleteImageFromStorage(url: string) {
    const filePath = getFilePathFromUrl(url)
    if (!filePath) return
    const { error } = await supabase.storage.from('tours').remove([filePath])
    if (error) {
      console.error('Failed to delete image from storage:', error)
      setError('Failed to delete image from storage')
    }
  }

  // Main image handlers
  async function handleRemoveMainImage() {
    if (mainImage?.url && !mainImage.file) {
      // Only delete if it's an existing image (not a new upload)
      // Also check it's not used in galleryImages
      const usedInGallery = galleryImages.some(img => img.url === mainImage.url)
      if (!usedInGallery) await deleteImageFromStorage(mainImage.url)
    }
    setMainImage(null)
  }
  // Gallery image handlers
  async function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const urls = await Promise.all(files.map(readFileAsDataURL))
    setGalleryImages(prev => [...prev, ...files.map((file, i) => ({ file, url: urls[i] }))])
  }
  function handleGalleryDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files || [])
    Promise.all(files.map(readFileAsDataURL)).then(urls => {
      setGalleryImages(prev => [...prev, ...files.map((file, i) => ({ file, url: urls[i] }))])
    })
  }
  async function handleRemoveGalleryImage(idx: number) {
    const img = galleryImages[idx]
    // Only delete if it's an existing image (not a new upload) and not used as main image
    if (img?.url && !img.file) {
      const usedAsMain = mainImage?.url === img.url
      if (!usedAsMain) await deleteImageFromStorage(img.url)
    }
    setGalleryImages(prev => prev.filter((_, i) => i !== idx))
    if (mainGalleryIndex === idx) setMainGalleryIndex(null)
    else if (mainGalleryIndex && mainGalleryIndex > idx) setMainGalleryIndex(mainGalleryIndex - 1)
  }
  function handleSetMainGallery(idx: number) {
    setMainGalleryIndex(idx)
  }
  function handleGalleryDragOver(e: React.DragEvent<HTMLDivElement>) { e.preventDefault() }

  async function uploadImageToStorage(file: File) {
    const fileExt = file.name.split('.').pop()
    const filePath = `tours/${uuidv4()}.${fileExt}`
    const { data, error } = await supabase.storage.from('tours').upload(filePath, file)
    if (error) {
      console.error('Supabase Storage upload error:', error)
      throw new Error(error.message || 'Image upload failed')
    }
    const { data: publicUrlData } = supabase.storage.from('tours').getPublicUrl(filePath)
    if (!publicUrlData?.publicUrl) {
      throw new Error('Could not get image URL')
    }
    return publicUrlData.publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      let mainImageUrl = mainImage?.url || ''
      let galleryImageUrls = galleryImages.map(img => img.url)
      // Upload new main image if it's a File
      if (mainImage?.file) {
        mainImageUrl = await uploadImageToStorage(mainImage.file)
      }
      // Upload new gallery images if any are Files
      galleryImageUrls = await Promise.all(galleryImages.map(async img => {
        if (img.file) return await uploadImageToStorage(img.file)
        return img.url
      }))
      // Set main image from gallery if selected
      if (mainGalleryIndex !== null && galleryImageUrls[mainGalleryIndex]) {
        mainImageUrl = galleryImageUrls[mainGalleryIndex]
      }
      const { error } = await supabase.from('tours').update({
        title,
        destination,
        price_per_person: parseFloat(price),
        duration,
        short_description: shortDesc,
        long_description: longDesc,
        itinerary: JSON.stringify(itinerary),
        included,
        excluded,
        main_image: mainImageUrl,
        gallery_images: galleryImageUrls,
      }).eq('id', id)
      if (error) throw new Error(error.message || 'Failed to update tour')
      setSuccess('Tour updated!')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      console.error('Tour update error:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-400">Loading tour...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="max-w-2xl mx-auto w-full py-8">
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-[#001934] hover:text-[#b8860b] font-semibold">&larr; Back</button>
        <h1 className="text-2xl font-bold text-[#001934]">Edit Tour</h1>
      </div>
      <form className="space-y-6 bg-white rounded-xl shadow p-6" onSubmit={handleSubmit}>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Location/Destination</label>
          <input type="text" value={destination} onChange={e => setDestination(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#001934] mb-1">Price (USD)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#001934] mb-1">Duration</label>
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Short Description</label>
          <textarea value={shortDesc} onChange={e => setShortDesc(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={2} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Detailed Description</label>
          <textarea value={longDesc} onChange={e => setLongDesc(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={4} />
        </div>
        {/* Main Image Upload */}
        <div>
          <label className="block text-base font-bold text-[#001934] mb-2 mt-6">Main Image</label>
          <div
            className={`w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 cursor-pointer ${mainImage ? 'border-[#b8860b]' : 'border-gray-300 hover:border-[#b8860b]'}`}
            onClick={() => mainInputRef.current?.click()}
            onDrop={handleMainImageDrop}
            onDragOver={handleMainDragOver}
          >
            {mainImage ? (
              <div className="relative h-full flex items-center">
                <img src={mainImage.url} alt="Main" className="h-28 w-auto rounded object-contain" />
                <button type="button" onClick={e => { e.stopPropagation(); handleRemoveMainImage() }} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 hover:bg-red-100"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/></svg></button>
              </div>
            ) : (
              <span>(Drag & drop or click to upload main image)</span>
            )}
            <input type="file" accept="image/*" ref={mainInputRef} className="hidden" onChange={handleMainImageChange} />
          </div>
        </div>
        {/* Gallery Images Upload */}
        <div>
          <label className="block text-base font-bold text-[#001934] mb-2 mt-6">Gallery Images</label>
          <div
            className="w-full min-h-[96px] border-2 border-dashed border-[#b8860b] rounded-lg flex flex-wrap items-center gap-2 p-2 cursor-pointer"
            onClick={() => galleryInputRef.current?.click()}
            onDrop={handleGalleryDrop}
            onDragOver={handleGalleryDragOver}
          >
            {galleryImages.length === 0 && <span className="text-gray-400">(Drag & drop or click to upload gallery images)</span>}
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img.url}
                  alt={`Gallery ${idx + 1}`}
                  className={`h-20 w-20 object-cover rounded border-2 ${mainGalleryIndex === idx ? 'border-[#b8860b]' : 'border-gray-200'} cursor-pointer`}
                  onClick={e => { e.stopPropagation(); handleSetMainGallery(idx) }}
                  title={mainGalleryIndex === idx ? 'Main Image' : 'Set as Main'}
                />
                <button type="button" onClick={async e => { e.stopPropagation(); await handleRemoveGalleryImage(idx) }} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 hover:bg-red-100 opacity-0 group-hover:opacity-100 transition"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/></svg></button>
                {mainGalleryIndex === idx && <span className="absolute bottom-1 left-1 bg-[#b8860b] text-white text-xs px-2 py-0.5 rounded">Main</span>}
              </div>
            ))}
            <input type="file" accept="image/*" multiple ref={galleryInputRef} className="hidden" onChange={handleGalleryChange} />
          </div>
        </div>
        {/* Itinerary (dynamic list of objects) */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Itinerary (Day by Day)</label>
          <div className="space-y-4">
            {itinerary.map((item, idx) => (
              <div className="flex flex-col gap-2 border border-gray-200 rounded-lg p-3 mb-2" key={idx}>
                <div className="flex gap-2 items-center">
                  <span className="font-semibold text-[#b8860b]">Day {idx + 1}</span>
                  <button type="button" className="ml-auto bg-gray-200 px-2 rounded text-[#001934] hover:bg-red-100" onClick={() => removeItineraryDay(idx)} disabled={itinerary.length === 1}>-</button>
                </div>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Title (e.g. Gorilla Trekking Adventure)"
                  value={item.title}
                  onChange={e => handleItineraryField(idx, 'title', e.target.value)}
                />
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Description for this day..."
                  value={item.description}
                  onChange={e => handleItineraryField(idx, 'description', e.target.value)}
                  rows={2}
                />
              </div>
            ))}
            <button type="button" className="text-[#b8860b] font-semibold" onClick={addItineraryDay}>+ Add Day</button>
          </div>
        </div>
        {/* Included/Excluded (dynamic lists) */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Included / Excluded</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="mb-1 font-semibold text-xs text-[#001934]">Included</div>
              <div className="space-y-2">
                {included.map((item, idx) => (
                  <div className="flex gap-2" key={idx}>
                    <input
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g. Park fees"
                      value={item}
                      onChange={e => handleIncludedChange(idx, e.target.value)}
                    />
                    <button type="button" className="bg-gray-200 px-2 rounded text-[#001934] hover:bg-red-100" onClick={() => removeIncluded(idx)} disabled={included.length === 1}>-</button>
                  </div>
                ))}
                <button type="button" className="text-[#b8860b] font-semibold" onClick={addIncluded}>+ Add</button>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1 font-semibold text-xs text-[#001934]">Excluded</div>
              <div className="space-y-2">
                {excluded.map((item, idx) => (
                  <div className="flex gap-2" key={idx}>
                    <input
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g. Flights"
                      value={item}
                      onChange={e => handleExcludedChange(idx, e.target.value)}
                    />
                    <button type="button" className="bg-gray-200 px-2 rounded text-[#001934] hover:bg-red-100" onClick={() => removeExcluded(idx)} disabled={excluded.length === 1}>-</button>
                  </div>
                ))}
                <button type="button" className="text-[#b8860b] font-semibold" onClick={addExcluded}>+ Add</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="w-full bg-[#001934] text-white font-semibold py-3 rounded-lg hover:bg-[#b8860b] hover:text-[#001934] transition" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </form>
    </div>
  )
} 