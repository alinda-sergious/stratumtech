"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/src/components/HeroSection"
import AboutUsSection from "@/src/components/AboutUsSection"
import FeaturedAdventuresSection from "@/src/components/FeaturedAdventuresSection"
import OurFleetSection from "@/src/components/OurFleetSection"
import PartnersSection from "@/src/components/PartnersSection"
import BookingModal from "@/src/components/BookingModal"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItemName, setSelectedItemName] = useState<string>("")

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleOpenBookingModal = (itemName: string) => {
    setSelectedItemName(itemName)
    setIsModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
    setSelectedItemName("")
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <AboutUsSection />

      {/* Featured Adventures */}
      <FeaturedAdventuresSection onBookClick={handleOpenBookingModal} />

      {/* Our Fleet */}
      <OurFleetSection onBookClick={handleOpenBookingModal} />

      {/* Partners Section */}
      <PartnersSection />

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={handleCloseBookingModal} selectedItemName={selectedItemName} />
    </div>
  )
}
