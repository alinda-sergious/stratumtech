"use client"

import { useState, useEffect } from "react"

interface EventCategoriesFilterProps {
  onFilterChange: (selectedCategories: string[]) => void
  allCategories: string[]
}

export default function EventCategoriesFilter({ onFilterChange, allCategories }: EventCategoriesFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  useEffect(() => {
    onFilterChange(selectedCategories)
  }, [selectedCategories, onFilterChange])

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-[#B8860B] mb-4 font-arizona">Categories</h3>
      <div className="space-y-3">
        {allCategories.map((category) => (
          <label key={category} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
              className="form-checkbox h-5 w-5 text-[#B8860B] rounded border-gray-300 focus:ring-[#B8860B]/50 transition-all duration-150"
            />
            <span className="text-gray-700 group-hover:text-[#B8860B] transition-colors duration-150">{category}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
