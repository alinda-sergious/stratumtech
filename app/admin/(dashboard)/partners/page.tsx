"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/src/lib/supabase"
import SmartImageUpload from "@/src/components/SmartImageUpload"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Partner {
  id: string
  name: string
  logo_url: string
  website_url?: string
  description?: string
  is_active: boolean
  created_at: string
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
    website_url: "",
    description: "",
    is_active: true
  })

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("created_at", { ascending: true })
      if (!error && data) {
        setPartners(data)
      }
    } catch (error) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url || "",
      website_url: partner.website_url || "",
      description: partner.description || "",
      is_active: partner.is_active
    })
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingPartner(null)
    setFormData({
      name: "",
      logo_url: "",
      website_url: "",
      description: "",
      is_active: true
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return
    setSaving(true)
    try {
      const { error } = await supabase.from("partners").delete().eq("id", id)
      if (error) throw error
      fetchPartners()
    } catch (error) {
      alert("Error deleting partner. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingPartner) {
        // Update
        const { error } = await supabase
          .from("partners")
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq("id", editingPartner.id)
        if (error) throw error
      } else {
        // Insert
        const { error } = await supabase
          .from("partners")
          .insert([{ ...formData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
        if (error) throw error
      }
      setShowForm(false)
      setEditingPartner(null)
      fetchPartners()
    } catch (error) {
      alert("Error saving partner. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#001934]">Manage Partners</h1>
        <button
          onClick={handleAdd}
          className="bg-[#B8860B] text-white px-4 py-2 rounded-lg hover:bg-[#ae7d0a] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold text-[#001934] mb-4">
            {editingPartner ? "Edit Partner" : "Add New Partner"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo Upload</label>
              <SmartImageUpload
                images={formData.logo_url ? [formData.logo_url] : []}
                onImagesChange={urls => setFormData({ ...formData, logo_url: urls[0] || "" })}
                folder="partners"
                bucket="partners"
                maxImages={1}
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="text"
                value={formData.website_url}
                onChange={e => {
                  let value = e.target.value.trim()
                  if (value && !/^https?:\/\//i.test(value)) {
                    value = 'https://' + value
                  }
                  setFormData({ ...formData, website_url: value })
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                rows={3}
                placeholder="Brief description of the partner..."
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active Partner
              </label>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#B8860B] text-white px-4 py-2 rounded-lg hover:bg-[#ae7d0a] transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : editingPartner ? "Update Partner" : "Add Partner"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingPartner(null); }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Partners List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#001934]">All Partners</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Loading partners...</td>
                </tr>
              ) : partners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No partners found. Add your first partner above.</td>
                </tr>
              ) : (
                partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partner.logo_url ? (
                        <img src={partner.logo_url} alt={partner.name} className="h-10 w-10 object-contain" />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Logo</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                      {partner.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">{partner.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partner.website_url ? (
                        <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-[#B8860B] hover:text-[#ae7d0a] text-sm">Visit Website</a>
                      ) : (
                        <span className="text-gray-400 text-sm">No website</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${partner.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{partner.is_active ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(partner)} className="text-[#B8860B] hover:text-[#ae7d0a]"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(partner.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 