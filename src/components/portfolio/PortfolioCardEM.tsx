"use client"

import Image from "next/image"
import Link from "next/link"
import type { PortfolioItem } from "@/src/types/event-portfolio"
import { CalendarDays } from "lucide-react"

interface PortfolioCardEMProps {
  item: PortfolioItem
}

export default function PortfolioCardEM({ item }: PortfolioCardEMProps) {
  return (
    <Link href={`/portfolio/events/${item.id}`} passHref legacyBehavior>
      <a className="block bg-white rounded-xl shadow-lg overflow-hidden group transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5">
        <div className="relative h-56 md:h-64 w-full">
          <Image
            src={item.coverImageUrl || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 right-3 bg-royal-gold text-royal-blue text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
            {item.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl md:text-2xl font-bold text-royal-blue mb-2 font-sans group-hover:text-royal-gold transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{item.shortDescription}</p>
          {item.date && (
            <div className="flex items-center text-xs text-gray-500">
              <CalendarDays className="w-4 h-4 mr-1.5 text-royal-gold" />
              <span>{item.date}</span>
            </div>
          )}
        </div>
      </a>
    </Link>
  )
}
