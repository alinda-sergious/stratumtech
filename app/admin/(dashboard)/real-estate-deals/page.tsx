"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { supabase } from "@/src/lib/supabase"
import { Pencil, Trash2, EyeOff, Eye, Plus, Building2, MapPin, DollarSign, Bed, Users, Calendar, Shield, Home, Building, Hotel, Store, Factory } from "lucide-react"

interface RealEstateDeal {
  id: string
  title: string
  short_description: string
  detailed_description: string
  main_image_url: string
  gallery_images: string[]
  property_type: string
  year_built: number
  number_of_floors: number
  primary_color: string
  number_of_entrances: number
  air_system: string
  energy_source: string
  security_system: string
  price: string
  location: string
  is_featured: boolean
  is_active: boolean
  created_at?: string
}

export default function AdminRealEstateDealsPage() {
  const [deals, setDeals] = useState<RealEstateDeal[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("real_estate_deals")
        .select("*")
        .order("created_at", { ascending: false })
      
      if (!error && data) {
        setDeals(data)
      } else {
        console.error("Error fetching real estate deals:", error)
        setDeals([])
      }
      setLoading(false)
    }
    fetchDeals()
  }, [])

  // Filtered and searched deals
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(search.toLowerCase()) || 
                         deal.short_description.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus ? (filterStatus === "active" ? deal.is_active : !deal.is_active) : true
    return matchesSearch && matchesStatus
  })

  const toggleSelect = (id: string) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id])
  }

  const selectAll = () => {
    setSelected(filteredDeals.map(deal => deal.id))
  }

  const clearSelected = () => setSelected([])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this real estate deal?")) {
      const { error } = await supabase
        .from("real_estate_deals")
        .delete()
        .eq("id", id)
      
      if (!error) {
        setDeals(deals.filter(deal => deal.id !== id))
        setSelected(selected.filter(s => s !== id))
      } else {
        console.error("Error deleting deal:", error)
        alert("Error deleting deal. Please try again.")
      }
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("real_estate_deals")
      .update({ is_active: !currentStatus })
      .eq("id", id)
    
    if (!error) {
      setDeals(deals.map(deal => 
        deal.id === id ? { ...deal, is_active: !currentStatus } : deal
      ))
    } else {
      console.error("Error updating deal status:", error)
      alert("Error updating deal status. Please try again.")
    }
  }

  const handleBulkDelete = async () => {
    if (selected.length === 0) return
    if (confirm(`Are you sure you want to delete ${selected.length} real estate deals?`)) {
      const { error } = await supabase
        .from("real_estate_deals")
        .delete()
        .in("id", selected)
      
      if (!error) {
        setDeals(deals.filter(deal => !selected.includes(deal.id)))
        setSelected([])
      } else {
        console.error("Error bulk deleting deals:", error)
        alert("Error deleting deals. Please try again.")
      }
    }
  }

  const getPropertyIcon = (propertyType: string) => {
    switch (propertyType.toLowerCase()) {
      case "apartment":
        return <Building className="w-4 h-4" />
      case "house":
      case "villa":
        return <Home className="w-4 h-4" />
      case "hotel":
      case "lodge":
        return <Hotel className="w-4 h-4" />
      case "commercial":
      case "office":
        return <Store className="w-4 h-4" />
      case "industrial":
      case "factory":
        return <Factory className="w-4 h-4" />
      default:
        return <Building2 className="w-4 h-4" />
    }
  }

  const getCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case "bed":
        return <Bed className="w-4 h-4" />
      case "map-pin":
        return <MapPin className="w-4 h-4" />
      case "building":
        return <Building2 className="w-4 h-4" />
      case "calendar":
        return <Calendar className="w-4 h-4" />
      case "users":
        return <Users className="w-4 h-4" />
      case "shield":
        return <Shield className="w-4 h-4" />
      default:
        return <Building2 className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#001934]">Real Estate Deals</h1>
          <p className="text-gray-600 mt-2">Manage your real estate properties and deals</p>
        </div>
        <Link href="/admin/real-estate-deals/new">
          <Button className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-[#001934] font-semibold">
            <Plus className="w-4 h-4 mr-2" />
            Add New Deal
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search real estate deals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-[#001934]"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {selected.length > 0 && (
              <Button
                onClick={handleBulkDelete}
                variant="destructive"
                size="sm"
              >
                Delete Selected ({selected.length})
              </Button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">
                  <Checkbox 
                    checked={selected.length === filteredDeals.length && filteredDeals.length > 0} 
                    onCheckedChange={selectAll} 
                  />
                </th>
                <th className="px-4 py-3 text-[#001934]">Image</th>
                <th className="px-4 py-3 text-[#001934]">Property Name</th>
                <th className="px-4 py-3 text-[#001934]">Capabilities</th>
                <th className="px-4 py-3 text-[#001934]">Specifications</th>
                <th className="px-4 py-3 text-[#001934]">Price</th>
                <th className="px-4 py-3 text-[#001934]">Status</th>
                <th className="px-4 py-3 text-[#001934]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-8 text-[#001934]">Loading real estate deals...</td></tr>
              ) : filteredDeals.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8 text-[#001934]">No real estate deals found.</td></tr>
              ) : (
                <AnimatePresence>
                  {filteredDeals.map(deal => (
                    <motion.tr
                      key={deal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-[#B8860B]/10"
                    >
                      <td className="px-4 py-3 text-center">
                        <Checkbox 
                          checked={selected.includes(deal.id)} 
                          onCheckedChange={() => toggleSelect(deal.id)} 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <img 
                          src={deal.main_image_url || "/placeholder.svg"} 
                          alt={deal.title} 
                          className="w-16 h-12 object-cover rounded border-2 border-[#001934]" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-semibold text-[#001934]">{deal.title}</div>
                          <div className="text-sm text-gray-600 line-clamp-2">{deal.short_description}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <span className="text-[#B8860B]">{getCapabilityIcon("bed")}</span>
                            <span>{deal.number_of_floors} floors</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <span className="text-[#B8860B]">{getCapabilityIcon("map-pin")}</span>
                            <span>{deal.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <span className="text-[#B8860B]">{getPropertyIcon(deal.property_type)}</span>
                            <span>{deal.property_type}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <span className="text-[#B8860B]">{getCapabilityIcon("calendar")}</span>
                            <span>{deal.year_built}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs text-gray-600 space-y-1">
                          <div><span className="font-medium">Type:</span> {deal.property_type}</div>
                          <div><span className="font-medium">Year:</span> {deal.year_built}</div>
                          <div><span className="font-medium">Floors:</span> {deal.number_of_floors}</div>
                          <div><span className="font-medium">Color:</span> {deal.primary_color}</div>
                          <div><span className="font-medium">Entrances:</span> {deal.number_of_entrances}</div>
                          <div><span className="font-medium">Air System:</span> {deal.air_system}</div>
                          <div><span className="font-medium">Energy:</span> {deal.energy_source}</div>
                          <div><span className="font-medium">Security:</span> {deal.security_system}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <a 
                          href={deal.price} 
                          className="text-[#B8860B] font-bold hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {deal.price}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          deal.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {deal.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <Link 
                          href={`/real-estate/${deal.id}`}
                          className="text-blue-600 hover:underline font-semibold"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/real-estate-deals/${deal.id}/edit`} 
                          className="text-[#B8860B] hover:underline font-semibold"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button 
                          title="Delete" 
                          className="hover:text-red-600 text-[#001934]" 
                          onClick={() => handleDelete(deal.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                        {deal.is_active ? (
                          <button 
                            title="Deactivate" 
                            className="hover:text-[#B8860B] text-[#001934]" 
                            onClick={() => handleToggleActive(deal.id, true)}
                          >
                            <EyeOff size={18} />
                          </button>
                        ) : (
                          <button 
                            title="Activate" 
                            className="hover:text-[#B8860B] text-[#001934]" 
                            onClick={() => handleToggleActive(deal.id, false)}
                          >
                            <Eye size={18} />
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
    </div>
  )
} 