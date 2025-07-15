"use client"

import { useState, useEffect } from "react"
import { Video, Upload, Save, Eye } from "lucide-react"
import { supabase } from "@/src/lib/supabase"
import SmartImageUpload from "@/src/components/SmartImageUpload"

interface HomepageSettings {
  id: string
  hero_video_url: string
  hero_title: string
  hero_subtitle: string
  updated_at: string
}

export default function HomepagePage() {
  const [settings, setSettings] = useState<HomepageSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    hero_video_url: "",
    hero_title: "Bring Your Vision To Life",
    hero_subtitle: "Amazing Engineering deals with quality to offer"
  })

  useEffect(() => {
    fetchHomepageSettings()
  }, [])

  const fetchHomepageSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("homepage_settings")
        .select("*")
        .single()

      if (error) {
        // If table doesn't exist or no data found, that's okay
        console.log("No homepage settings found yet - will create on first save")
        return
      }

      if (data) {
        setSettings(data)
        setFormData({
          hero_video_url: data.hero_video_url || "",
          hero_title: data.hero_title || "Bring Your Vision To Life",
          hero_subtitle: data.hero_subtitle || "Amazing Engineering deals with quality to offer"
        })
      }
    } catch (error) {
      console.log("Homepage settings not found, will create on first save")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (settings) {
        // Update existing settings
        const { error } = await supabase
          .from("homepage_settings")
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq("id", settings.id)

        if (error) {
          console.error("Error updating settings:", error)
          alert("Error updating settings. Please try again.")
          return
        }
      } else {
        // Create new settings
        const { error } = await supabase
          .from("homepage_settings")
          .insert([{
            ...formData,
            updated_at: new Date().toISOString()
          }])

        if (error) {
          console.error("Error creating settings:", error)
          alert("Error creating settings. Please try again.")
          return
        }
      }

      fetchHomepageSettings()
      alert("Homepage settings saved successfully!")
    } catch (error) {
      console.error("Error saving homepage settings:", error)
      alert("Error saving settings. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleVideoUpload = (urls: string[]) => {
    setFormData({ ...formData, hero_video_url: urls[0] || "" })
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading homepage settings...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#001934] mb-2">Homepage Management</h1>
        <p className="text-gray-600">Manage your homepage video and content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#001934] mb-4">Edit Homepage Content</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Video
              </label>
              <SmartImageUpload
                images={formData.hero_video_url ? [formData.hero_video_url] : []}
                onImagesChange={handleVideoUpload}
                folder="homepage"
                maxImages={1}
                accept="video/*"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a video file (MP4, WebM, etc.) for the homepage hero section
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Title
              </label>
              <input
                type="text"
                value={formData.hero_title}
                onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                placeholder="Bring Your Vision To Life"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Subtitle
              </label>
              <input
                type="text"
                value={formData.hero_subtitle}
                onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                placeholder="Amazing Engineering deals with quality to offer"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#B8860B] text-white px-4 py-2 rounded-lg hover:bg-[#ae7d0a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#001934] mb-4">Preview</h2>
          <div className="space-y-4">
            {/* Video Preview */}
            {formData.hero_video_url && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Hero Video</h3>
                <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                  <video
                    src={formData.hero_video_url}
                    className="w-full h-48 object-cover"
                    controls
                    muted
                  />
                </div>
              </div>
            )}

            {/* Text Preview */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Hero Text</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h1 className="text-2xl font-bold text-[#001934] mb-2">
                  {formData.hero_title}
                </h1>
                <p className="text-lg text-gray-600">
                  {formData.hero_subtitle}
                </p>
              </div>
            </div>

            {/* Current Settings Info */}
            {settings && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Last Updated</h3>
                <p className="text-sm text-gray-500">
                  {new Date(settings.updated_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Instructions</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Upload a video file for the homepage hero section</li>
          <li>• The video will be displayed as the background of your homepage</li>
          <li>• Supported formats: MP4, WebM, OGV</li>
          <li>• Recommended size: 1920x1080 or similar aspect ratio</li>
          <li>• Changes will be reflected on the homepage immediately after saving</li>
        </ul>
      </div>
    </div>
  )
} 