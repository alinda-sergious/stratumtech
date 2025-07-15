"use client"

import Image from "next/image"
import Link from "next/link"

interface Event {
  id: string
  imageUrl: string
  title: string
  description: string
  category: string
}

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row group">
      {/* Image Section */}
      <div className="md:w-1/3 relative h-48 md:h-auto">
        <Image
          src={event.imageUrl || "/placeholder.svg?height=200&width=300&text=Event"}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-[#001934] mb-3 font-arizona line-clamp-2 group-hover:text-[#B8860B] transition-colors duration-300">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
        </div>
        <div className="mt-auto text-right">
          <Link
            href={`/UpcomingEvent/${event.id}`}
            className="inline-block bg-[#B8860B] text-[#001934] font-semibold py-2.5 px-6 rounded-lg hover:bg-[#ae7d0a] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
