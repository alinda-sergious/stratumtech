"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  imageUrl: string
  link: string
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={service.link}>
      <div
        className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-80 lg:h-96 overflow-hidden">
          <Image
            src={service.imageUrl || "/placeholder.svg"}
            alt={service.title}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? "scale-110 brightness-75" : "scale-100 brightness-100"
            }`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001934]/80 via-transparent to-transparent"></div>

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-[#001934]/40 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* View Button */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="bg-[#B8860B] text-[#001934] rounded-full p-4 shadow-2xl transform transition-all duration-300 hover:scale-110">
              <Eye className="w-8 h-8" />
            </div>
          </div>

          {/* Service Title */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-white font-arizona mb-2">{service.title}</h3>
            <p
              className={`text-gray-200 text-sm lg:text-base transition-all duration-500 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {service.description}
            </p>
          </div>
        </div>

        {/* Animated Border */}
        <div
          className={`absolute inset-0 border-4 border-[#B8860B] rounded-2xl transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </div>
    </Link>
  )
}
