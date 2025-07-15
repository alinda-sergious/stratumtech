"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Eye, Search, Upload, X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/src/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface TeamMember {
  id: string
  name: string
  position: string
  image_url: string
  experience_description: string
  email: string
  department: string
  phone: string
  linkedin_url: string
  twitter_url: string
  experience_years: number
  specializations: string[]
  education: string[]
  certifications: string[]
  is_active: boolean
  is_featured: boolean
  display_order: number
  created_at?: string
  updated_at?: string
}

export default function TeamMembersPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    image_url: "",
    experience_description: "",
    email: "",
    department: "",
    phone: "",
    linkedin_url: "",
    twitter_url: "",
    experience_years: "",
    specializations: [] as string[],
    education: [] as string[],
    certifications: [] as string[],
    is_active: true,
    is_featured: false,
    display_order: 0
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setTeamMembers(data || [])
    } catch (error) {
      console.error('Error fetching team members:', error)
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `teammember/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('teammember')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('teammember')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, image_url: publicUrl }))
      setSelectedImageFile(file)
    } catch (error) {
      console.error('Error uploading image:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown upload error'
      toast({
        title: "Error",
        description: `Error uploading image: ${errorMessage}`,
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const submitData = {
        ...formData,
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
        display_order: formData.display_order || 0
      }

      if (editingMember) {
        const { error } = await supabase
          .from('team_members')
          .update({
            ...submitData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingMember.id)

        if (error) {
          console.error('Update error details:', error)
          throw error
        }
        toast({
          title: "Success",
          description: "Team member updated successfully"
        })
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([submitData])

        if (error) {
          console.error('Insert error details:', error)
          throw error
        }
        toast({
          title: "Success",
          description: "Team member added successfully"
        })
      }

      setIsDialogOpen(false)
      setEditingMember(null)
      resetForm()
      fetchTeamMembers()
    } catch (error) {
      console.error('Error saving team member:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown database error'
      toast({
        title: "Error",
        description: `Failed to save team member: ${errorMessage}`,
        variant: "destructive"
      })
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name || "",
      position: member.position || "",
      image_url: member.image_url || "",
      experience_description: member.experience_description || "",
      email: member.email || "",
      department: member.department || "",
      phone: member.phone || "",
      linkedin_url: member.linkedin_url || "",
      twitter_url: member.twitter_url || "",
      experience_years: member.experience_years?.toString() || "",
      specializations: member.specializations || [],
      education: member.education || [],
      certifications: member.certifications || [],
      is_active: member.is_active ?? true,
      is_featured: member.is_featured ?? false,
      display_order: member.display_order || 0
    })
    setSelectedImageFile(null)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast({
        title: "Success",
        description: "Team member deleted successfully"
      })
      fetchTeamMembers()
    } catch (error) {
      console.error('Error deleting team member:', error)
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setEditingMember(null)
    setFormData({
      name: "",
      position: "",
      image_url: "",
      experience_description: "",
      email: "",
      department: "",
      phone: "",
      linkedin_url: "",
      twitter_url: "",
      experience_years: "",
      specializations: [],
      education: [],
      certifications: [],
      is_active: true,
      is_featured: false,
      display_order: 0
    })
    setSelectedImageFile(null)
    setIsDialogOpen(false)
  }

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[#001934]">Loading team members...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#001934]">Team Members</h1>
          <p className="text-gray-600 mt-2">Manage your construction team members for the about us page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#B8860B] hover:bg-[#A67C0A] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[#001934]">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="experience_years">Years of Experience</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="twitter_url">Twitter URL</Label>
                  <Input
                    id="twitter_url"
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                  />
                </div>
              </div>
              
              {/* Image Upload */}
              <div>
                <Label htmlFor="member_image">Profile Image</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="member_image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handleImageUpload(file)
                      }
                    }}
                    className="hidden"
                  />
                  <label htmlFor="member_image" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#B8860B] transition-colors">
                      <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {selectedImageFile ? selectedImageFile.name : "Click to upload profile image"}
                      </p>
                      {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                    </div>
                  </label>
                  {formData.image_url && (
                    <p className="text-xs text-green-600 mt-1">✓ Image uploaded successfully</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="experience_description">Experience Description *</Label>
                <Textarea
                  id="experience_description"
                  value={formData.experience_description}
                  onChange={(e) => setFormData({ ...formData, experience_description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked as boolean }))}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked as boolean }))}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#B8860B] hover:bg-[#A67C0A] text-white">
                  {editingMember ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={member.image_url}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.jpg';
                }}
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                {member.is_featured && (
                  <Badge className="bg-[#B8860B] text-white text-xs">Featured</Badge>
                )}
                {!member.is_active && (
                  <Badge variant="secondary" className="text-xs">Inactive</Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-lg text-[#001934]">{member.name}</h3>
                <p className="text-sm text-[#B8860B] font-medium">{member.position}</p>
                {member.department && (
                  <p className="text-xs text-gray-500">{member.department}</p>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {member.experience_description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{member.email}</span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(member)}
                    className="h-8 px-2"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(member.id)}
                    className="h-8 px-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && teamMembers.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No team members found matching your search.</p>
        </div>
      )}

      {teamMembers.length === 0 && (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first team member.</p>
        </div>
      )}
    </div>
  )
} 