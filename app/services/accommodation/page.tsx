"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Building2, Hotel, ChevronRight } from "lucide-react"

export default function AccommodationPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/jason-dent-w3eFhqXjkZE-unsplash.jpg"
            alt="Property Management"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#001934]/60" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-arizona">
              Property Management
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-2xl">Your trusted property manager</p>
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001934] font-arizona mb-4">
              Choose your property category
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From comfortable apartments to luxury hotels, we help you run the businesses seemlessly.
            </p>
          </div>

          {/* Mobile: Horizontal scroll, Tablet+: Grid */}
          <div className="block sm:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              <AccommodationCard
                type="apartments"
                title="Apartments"
                tagline="Residential and Commercial appartments"
                icon={<Building2 className="w-8 h-8" />}
                image="/images/accommodation/mainap.jpg"
                href="/accommodation/apartments"
              />
              <AccommodationCard
                type="hotels"
                title="Hotels"
                tagline="Hospitality suits"
                icon={<Hotel className="w-8 h-8" />}
                image="/images/accommodation/mainho.jpg"
                href="/accommodation/hotels"
              />
            </div>
          </div>

          {/* Tablet and Desktop: Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <AccommodationCard
              type="apartments"
              title="Apartments"
              tagline="Residential and Commercial appartments"
              icon={<Building2 className="w-8 h-8" />}
              image="/images/accommodation/mainap.jpg"
              href="/accommodation/apartments"
            />
            <AccommodationCard
              type="hotels"
              title="Hotels"
              tagline="Hospitality suits"
              icon={<Hotel className="w-8 h-8" />}
              image="/images/accommodation/mainho.jpg"
              href="/accommodation/hotels"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

interface AccommodationCardProps {
  type: string
  title: string
  tagline: string
  icon: React.ReactNode
  image: string
  href: string
}

function AccommodationCard({ type, title, tagline, icon, image, href }: AccommodationCardProps) {
  return (
    <Link href={href} className="block group snap-center">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 min-w-[280px] sm:min-w-0">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001934]/60 to-transparent" />
          <div className="absolute top-4 left-4 bg-[#B8860B] text-white p-2 rounded-lg">{icon}</div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#001934] font-arizona mb-2">{title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{tagline}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-[#B8860B] transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}
