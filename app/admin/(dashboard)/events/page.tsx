"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { supabase } from "@/src/lib/supabase"
import { Pencil, Trash2, EyeOff, Eye, Calendar, MapPin, Image as ImageIcon, DollarSign, Clock } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  description: string
  cover_image: string
  gallery_images: string[]
  category: string
  price_per_person?: number
  duration?: string
  destination?: string
  itinerary?: any[]
  included?: string[]
  excluded?: string[]
  is_active?: boolean
  created_at?: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("upcoming_events")
        .select("*")
        .order("created_at", { ascending: false })
      
      if (!error && data) {
        setEvents(data)
      } else {
        console.error("Error fetching events:", error)
        setEvents([])
      }
      setLoading(false)
    }
    fetchEvents()
  }, [])

  // Filtered and searched events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                         event.category.toLowerCase().includes(search.toLowerCase()) ||
                         (event.destination && event.destination.toLowerCase().includes(search.toLowerCase()))
    return matchesSearch
  })

  const handleToggleActive = async (eventId: string, currentActive: boolean) => {
    setActionLoading(eventId)
    const { error } = await supabase
      .from("upcoming_events")
      .update({ is_active: !currentActive })
      .eq("id", eventId)
    
    if (!error) {
      setEvents(events => events.map(event => 
        event.id === eventId ? { ...event, is_active: !currentActive } : event
      ))
    } else {
      console.error("Error updating event status:", error)
    }
    setActionLoading(null)
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return
    
    setActionLoading(eventId)
    const { error } = await supabase
      .from("upcoming_events")
      .delete()
      .eq("id", eventId)
    
    if (!error) {
      setEvents(events => events.filter(event => event.id !== eventId))
    } else {
      console.error("Error deleting event:", error)
      alert("Failed to delete event. Please try again.")
    }
    setActionLoading(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search events by title, category, or destination..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
        <Link href="/admin/events/new">
          <Button style={{ backgroundColor: '#B8860B', color: '#001934', fontWeight: 600 }}>
            Add New Event
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-[#001934]">Image</th>
              <th className="px-4 py-3 text-[#001934]">Title</th>
              <th className="px-4 py-3 text-[#001934]">Category</th>
              <th className="px-4 py-3 text-[#001934]">Price</th>
              <th className="px-4 py-3 text-[#001934]">Duration</th>
              <th className="px-4 py-3 text-[#001934]">Destination</th>
              <th className="px-4 py-3 text-[#001934]">Date</th>
              <th className="px-4 py-3 text-[#001934]">Status</th>
              <th className="px-4 py-3 text-[#001934]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-[#001934]">
                  Loading events...
                </td>
              </tr>
            ) : filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-[#001934]">
                  No events found.
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {filteredEvents.map(event => (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-[#B8860B]/10"
                  >
                    <td className="px-4 py-3">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden border-2 border-[#001934]">
                        {event.cover_image ? (
                          <img 
                            src={event.cover_image} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#001934] max-w-xs">
                      <div className="truncate" title={event.title}>
                        {event.title}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-[#B8860B]/20 text-[#001934] px-2 py-1 rounded text-xs font-medium">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#001934]">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-[#B8860B]" />
                        {event.price_per_person ? formatPrice(event.price_per_person) : 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#001934]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#B8860B]" />
                        {event.duration || 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#001934] max-w-xs">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#B8860B]" />
                        <span className="truncate" title={event.destination}>
                          {event.destination || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#001934]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#B8860B]" />
                        {formatDate(event.date)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {event.is_active ? (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-semibold">
                          Published
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-500 font-semibold">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Link 
                        href={`/admin/events/${event.id}/edit`} 
                        className="text-[#B8860B] hover:text-[#001934] transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button 
                        title="Delete" 
                        className="text-red-500 hover:text-red-700 transition-colors" 
                        onClick={() => handleDelete(event.id)}
                        disabled={!!actionLoading}
                      >
                        {actionLoading === event.id ? (
                          <div className="animate-spin w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full"></div>
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                      {event.is_active ? (
                        <button 
                          title="Unpublish" 
                          className="text-gray-400 hover:text-[#B8860B] transition-colors" 
                          onClick={() => handleToggleActive(event.id, true)}
                          disabled={!!actionLoading}
                        >
                          {actionLoading === event.id ? (
                            <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      ) : (
                        <button 
                          title="Publish" 
                          className="text-[#B8860B] hover:text-[#001934] transition-colors" 
                          onClick={() => handleToggleActive(event.id, false)}
                          disabled={!!actionLoading}
                        >
                          {actionLoading === event.id ? (
                            <div className="animate-spin w-4 h-4 border-2 border-[#B8860B] border-t-transparent rounded-full"></div>
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 