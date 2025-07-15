"use client"

import { useState, type FormEvent } from "react"
import { Search } from "lucide-react"

interface EventSearchBarProps {
  onSearchSubmit: (query: string) => void
}

export default function EventSearchBar({ onSearchSubmit }: EventSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearchSubmit(searchQuery)
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-2xl font-bold text-[#B8860B] mb-4 font-arizona">Search Construction Categories</h3>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Project"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none transition-all duration-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#B8860B] text-[#001934] p-2 rounded-md hover:bg-[#ae7d0a] transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
