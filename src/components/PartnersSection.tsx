"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase"

interface Partner {
  id?: string
  name: string
  logo_url: string
  website_url?: string
  description?: string
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("partners")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: true })
        setPartners(data || [])
      } catch (err) {
        setPartners([])
      } finally {
        setLoading(false)
      }
    }
    fetchPartners()
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-arizona mb-4">
            <span className="text-[#001934]">Our </span>
            <span className="text-[#B8860B]">Partners</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proudly partnered with Uganda's best upcoming Real Estate service provider
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[120px]">
            <div className="w-8 h-8 border-2 border-[#B8860B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No partners to display yet.</div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-8 w-full">
              {partners.map((partner, idx) => (
                <div key={partner.id || partner.name + idx} className="group flex flex-col items-center bg-white rounded-lg shadow p-6 transition-all duration-300 hover:scale-105">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-4">
                    <img
                      src={partner.logo_url || "/placeholder-logo.png"}
                      alt={partner.name}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#001934] group-hover:text-[#B8860B] transition-colors duration-300">
                    {partner.name}
                  </h3>
                  {partner.description && (
                    <p className="text-sm text-gray-500 text-center mt-1">{partner.description}</p>
                  )}
                  {partner.website_url && (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-xs text-[#B8860B] hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partnership Statement */}
        <div className="text-center mt-12">
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Through our strategic partnerships, we ensure that clients are met with durable housing infrastructure that is guaranteed
            and corresponds to the costs agreed without extortion.
          </p>
        </div>
      </div>
    </section>
  )
}
