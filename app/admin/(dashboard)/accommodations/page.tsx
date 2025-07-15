"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ConstructionService {
  id: string
  type: string
  name: string
  description: string
  location: string
  rating: number | null
  images: string[]
}

export default function AdminConstructionServicesPage() {
  const [services, setServices] = useState<ConstructionService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      setLoading(true)
      const { data, error } = await supabase
        .from("accommodations")
        .select("id, type, name, description, location, rating, images")
      if (!error && data) {
        setServices(data)
      } else {
        setServices([])
      }
      setLoading(false)
    }
    fetchServices()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this construction service? This action cannot be undone.")) return;
    setError(null);
    const { error } = await supabase.from("accommodations").delete().eq("id", id);
    if (error) {
      setError(error.message || "Failed to delete construction service.");
    } else {
      setServices(prev => prev.filter(service => service.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#001934]">Construction Services</h1>
        <Link href="/admin/accommodations/new">
          <Button style={{ backgroundColor: '#B8860B', color: '#001934', fontWeight: 600 }}>Add New Construction Service</Button>
        </Link>
      </div>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3 text-[#001934]">Service Name</th>
              <th className="px-4 py-3 text-[#001934]">Category</th>
              <th className="px-4 py-3 text-[#001934]">Location</th>
              <th className="px-4 py-3 text-[#001934]">Rating</th>
              <th className="px-4 py-3 text-[#001934]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8 text-[#001934]">Loading construction services...</td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-[#001934]">No construction services found.</td></tr>
            ) : (
              services.map(service => (
                <tr key={service.id} className="hover:bg-[#B8860B]/10">
                  <td className="px-4 py-3">
                    <img src={service.images?.[0] || "/placeholder.svg"} alt={service.name} className="w-16 h-12 object-cover rounded border-2 border-[#001934]" />
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#001934]">{service.name}</td>
                  <td className="px-4 py-3 text-[#001934]">{service.type}</td>
                  <td className="px-4 py-3 text-[#001934]">{service.location}</td>
                  <td className="px-4 py-3 text-[#B8860B] font-bold">{service.rating ?? '-'}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/admin/accommodations/${service.id}/edit`} className="ml-2 text-[#B8860B] hover:underline font-semibold">Edit</Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 