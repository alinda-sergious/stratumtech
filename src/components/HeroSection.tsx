"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Building, Wrench } from "lucide-react"
import { supabase } from "@/src/lib/supabase"

export default function HeroSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"projects" | "services">("projects")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Hero content state
  const [loading, setLoading] = useState(true)
  const [heroTitle, setHeroTitle] = useState("Bring Your Vision To Life")
  const [heroSubtitle, setHeroSubtitle] = useState("Amazing Engineering deals with quality to offer")
  const [heroVideoUrl, setHeroVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchHero = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("homepage_settings")
          .select("*")
          .single()
        if (!error && data) {
          setHeroTitle(data.hero_title || "Bring Your Vision To Life")
          setHeroSubtitle(data.hero_subtitle || "Amazing Engineering deals with quality to offer")
          setHeroVideoUrl(data.hero_video_url || null)
        }
      } catch (err) {
        // fallback to defaults
      } finally {
        setLoading(false)
      }
    }
    fetchHero()
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    // Build search parameters
    const searchParams = new URLSearchParams()
    searchParams.set("type", activeTab)
    searchParams.set("query", searchQuery.trim())
    router.push(`/search?${searchParams.toString()}`)
    setTimeout(() => {
      setIsSearching(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16 lg:mt-20">
        <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-3xl text-gray-400 font-bold mb-4">Loading homepage...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16 lg:mt-20">
      {/* Background Video */}
      {heroVideoUrl ? (
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={heroVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/images/hero/Visit.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#001934]/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Headlines */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">{heroTitle}</h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8">
          {heroSubtitle}
        </p>

        {/* Search Container */}
        <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 max-w-2xl mx-auto">
          {/* Tab Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                activeTab === "projects"
                  ? "bg-[#B8860B] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Building className="w-4 h-4" />
              Ongoing Projects
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                activeTab === "services"
                  ? "bg-[#B8860B] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Wrench className="w-4 h-4" />
              Services
            </button>
          </div>

          {/* Search Input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Search ${activeTab === "projects" ? "ongoing projects" : "construction services"}...`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none text-gray-700 placeholder-gray-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isSearching}
              className="bg-[#B8860B] hover:bg-[#ae7d0a] disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>

          {/* Search Tips */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              {activeTab === "projects" 
                ? "Try searching for: Kololo, Nakasero, Entebbe, Bugolobi, Naguru"
                : "Try searching for: Architecture, Construction, Maintenance, Renovation"
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
