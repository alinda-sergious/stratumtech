"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { supabase } from "@/src/lib/supabase"
import { Pencil, Trash2, EyeOff, Eye } from "lucide-react"

export default function AdminRealEstateDealsPage() {
  const [deals, setDeals] = useState<any[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("cars")
        .select("id, name, model, year, price_per_day, is_active, main_image, features")
      if (!error && data) {
        setDeals(data)
      } else {
        setDeals([])
      }
      setLoading(false)
    }
    fetchDeals()
  }, [])

  // Filtered and searched deals
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(search.toLowerCase()) || deal.model.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus ? deal.status === filterStatus : true
    return matchesSearch && matchesStatus
  })

  const toggleSelect = (id: string) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id])
  }

  const selectAll = () => {
    setSelected(filteredDeals.map(deal => deal.id))
  }

  const clearSelected = () => setSelected([])

  // Placeholder bulk actions
  const handleBulkDelete = (id: string) => {
    setDeals(deals.filter(deal => deal.id !== id))
    setSelected([])
  }

  const handleBulkStatus = (status: string) => {
    setDeals(deals.map(deal => selected.includes(deal.id) ? { ...deal, status } : deal))
    setSelected([])
  }

  const handleToggleActive = async (dealId: string, currentActive: boolean) => {
    const { error } = await supabase
      .from("cars")
      .update({ is_active: !currentActive })
      .eq("id", dealId)
    if (!error) {
      setDeals(deals => deals.map(deal => deal.id === dealId ? { ...deal, is_active: !currentActive } : deal))
    }
  }

  const handleBulkPublish = async () => {
    const { error } = await supabase
      .from("cars")
      .update({ is_active: true })
      .in("id", selected)
    if (!error) {
      setDeals(deals => deals.map(deal => selected.includes(deal.id) ? { ...deal, is_active: true } : deal))
      setSelected([])
    }
  }

  const handleBulkUnpublish = async () => {
    const { error } = await supabase
      .from("cars")
      .update({ is_active: false })
      .in("id", selected)
    if (!error) {
      setDeals(deals => deals.map(deal => selected.includes(deal.id) ? { ...deal, is_active: false } : deal))
      setSelected([])
    }
  }

  const handleDelete = async (dealId: string) => {
    const { error } = await supabase.from("cars").delete().eq("id", dealId)
    if (!error) {
      setDeals(deals => deals.filter(deal => deal.id !== dealId))
      setSelected(sel => sel.filter(id => id !== dealId))
    } else {
      alert("Failed to delete real estate deal. Please try again.")
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search by property name or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
        <Link href="/admin/cars/new">
          <Button style={{ backgroundColor: '#B8860B', color: '#001934', fontWeight: 600 }}>Add New Real Estate Deal</Button>
        </Link>
      </div>

      {selected.length > 0 && (
        <div className="mb-4 flex gap-2 items-center bg-yellow-50 border border-yellow-200 rounded p-3">
          <span>{selected.length} selected</span>
          <Button variant="destructive" onClick={() => handleBulkDelete(selected[0])}>Delete</Button>
          <Button style={{ backgroundColor: '#B8860B', color: '#001934' }} onClick={handleBulkPublish}>Activate</Button>
          <Button style={{ backgroundColor: '#001934', color: '#B8860B' }} onClick={handleBulkUnpublish}>Deactivate</Button>
          <Button variant="outline" onClick={clearSelected}>Clear</Button>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3"><Checkbox checked={selected.length === filteredDeals.length && filteredDeals.length > 0} onCheckedChange={selectAll} /></th>
              <th className="px-4 py-3 text-[#001934]">Image</th>
              <th className="px-4 py-3 text-[#001934]">Property Name</th>
              <th className="px-4 py-3 text-[#001934]">Type</th>
              <th className="px-4 py-3 text-[#001934]">Year</th>
              <th className="px-4 py-3 text-[#001934]">Price</th>
              <th className="px-4 py-3 text-[#001934]">Features</th>
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
                      <Checkbox checked={selected.includes(deal.id)} onCheckedChange={() => toggleSelect(deal.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <img src={deal.main_image || "/placeholder.svg"} alt={deal.name} className="w-16 h-12 object-cover rounded border-2 border-[#001934]" />
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#001934]">{deal.name}</td>
                    <td className="px-4 py-3 text-[#001934]">{deal.model}</td>
                    <td className="px-4 py-3 text-[#001934]">{deal.year}</td>
                    <td className="px-4 py-3 text-[#B8860B] font-bold">{typeof deal.price_per_day === 'number' ? `$${deal.price_per_day}` : `$${deal.price_per_day}`}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(deal.features) && deal.features.map((feature: string, idx: number) => (
                          <span key={idx} className="bg-[#B8860B]/20 text-[#001934] px-2 py-1 rounded text-xs font-medium">{feature}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Link href={`/admin/cars/${deal.id}/edit`} className="ml-2 text-[#B8860B] hover:underline font-semibold">Edit</Link>
                      <button title="Delete" className="hover:text-red-600 text-[#001934]" onClick={() => handleDelete(deal.id)}>
                        <Trash2 size={18} />
                      </button>
                      {deal.is_active ? (
                        <button title="Deactivate" className="hover:text-[#B8860B] text-[#001934]" onClick={() => handleToggleActive(deal.id, true)}>
                          <EyeOff size={18} />
                        </button>
                      ) : (
                        <button title="Activate" className="hover:text-[#001934] text-[#B8860B]" onClick={() => handleToggleActive(deal.id, false)}>
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
  )
} 