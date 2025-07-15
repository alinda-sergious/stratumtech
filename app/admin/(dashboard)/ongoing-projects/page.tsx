"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { supabase } from "@/src/lib/supabase"
import { Pencil, Trash2, EyeOff, Eye, Plus, Building2, MapPin, Calendar, DollarSign } from "lucide-react"

interface OngoingProject {
  id: string
  title: string
  short_description: string
  long_description: string
  main_image: string
  gallery_images: string[]
  price_per_person?: string
  duration: string
  destination: string
  category?: string
  itinerary?: any[]
  included?: string[]
  excluded?: string[]
  is_active?: boolean
  created_at?: string
}

export default function AdminOngoingProjectsPage() {
  const [projects, setProjects] = useState<OngoingProject[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("ongoing_projects")
        .select("*")
        .order("created_at", { ascending: false })
      
      if (!error && data) {
        setProjects(data)
      } else {
        console.error("Error fetching ongoing projects:", error)
        setProjects([])
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  // Filtered and searched projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                         project.short_description.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus ? (filterStatus === "active" ? project.is_active : !project.is_active) : true
    return matchesSearch && matchesStatus
  })

  const toggleSelect = (id: string) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id])
  }

  const selectAll = () => {
    setSelected(filteredProjects.map(project => project.id))
  }

  const clearSelected = () => setSelected([])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this ongoing project?")) {
      const { error } = await supabase
        .from("ongoing_projects")
        .delete()
        .eq("id", id)
      
      if (!error) {
        setProjects(projects.filter(project => project.id !== id))
        setSelected(selected.filter(s => s !== id))
      } else {
        console.error("Error deleting project:", error)
      }
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("ongoing_projects")
      .update({ is_active: !currentStatus })
      .eq("id", id)
    
    if (!error) {
      setProjects(projects.map(project => 
        project.id === id ? { ...project, is_active: !currentStatus } : project
      ))
    } else {
      console.error("Error updating project status:", error)
    }
  }

  const handleBulkDelete = async () => {
    if (selected.length === 0) return
    if (confirm(`Are you sure you want to delete ${selected.length} ongoing projects?`)) {
      const { error } = await supabase
        .from("ongoing_projects")
        .delete()
        .in("id", selected)
      
      if (!error) {
        setProjects(projects.filter(project => !selected.includes(project.id)))
        setSelected([])
      } else {
        console.error("Error bulk deleting projects:", error)
      }
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#001934]">Ongoing Projects</h1>
          <p className="text-gray-600 mt-2">Manage your construction projects and developments</p>
        </div>
        <Link href="/admin/ongoing-projects/new">
          <Button className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-[#001934] font-semibold">
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search ongoing projects..."
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
                    checked={selected.length === filteredProjects.length && filteredProjects.length > 0} 
                    onCheckedChange={selectAll} 
                  />
                </th>
                <th className="px-4 py-3 text-[#001934]">Image</th>
                <th className="px-4 py-3 text-[#001934]">Project Name</th>
                <th className="px-4 py-3 text-[#001934]">Category</th>
                <th className="px-4 py-3 text-[#001934]">Location</th>
                <th className="px-4 py-3 text-[#001934]">Duration</th>
                <th className="px-4 py-3 text-[#001934]">Budget</th>
                <th className="px-4 py-3 text-[#001934]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-8 text-[#001934]">Loading ongoing projects...</td></tr>
              ) : filteredProjects.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8 text-[#001934]">No ongoing projects found.</td></tr>
              ) : (
                <AnimatePresence>
                  {filteredProjects.map(project => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-[#B8860B]/10"
                    >
                      <td className="px-4 py-3 text-center">
                        <Checkbox 
                          checked={selected.includes(project.id)} 
                          onCheckedChange={() => toggleSelect(project.id)} 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <img 
                          src={project.main_image || "/placeholder.svg"} 
                          alt={project.title} 
                          className="w-16 h-12 object-cover rounded border-2 border-[#001934]" 
                        />
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#001934]">{project.title}</td>
                      <td className="px-4 py-3 text-[#001934]">{project.category || "N/A"}</td>
                      <td className="px-4 py-3 text-[#001934]">{project.destination}</td>
                      <td className="px-4 py-3 text-[#001934]">{project.duration}</td>
                      <td className="px-4 py-3 text-[#B8860B] font-bold">{project.price_per_person || "N/A"}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <Link 
                          href={`/admin/ongoing-projects/${project.id}/edit`} 
                          className="text-[#B8860B] hover:underline font-semibold"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button 
                          title="Delete" 
                          className="hover:text-red-600 text-[#001934]" 
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                        {project.is_active ? (
                          <button 
                            title="Deactivate" 
                            className="hover:text-[#B8860B] text-[#001934]" 
                            onClick={() => handleToggleActive(project.id, true)}
                          >
                            <EyeOff size={18} />
                          </button>
                        ) : (
                          <button 
                            title="Activate" 
                            className="hover:text-[#001934] text-[#B8860B]" 
                            onClick={() => handleToggleActive(project.id, false)}
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