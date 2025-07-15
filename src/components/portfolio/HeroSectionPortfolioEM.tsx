"use client"

import type { EventPortfolioPageData } from "@/src/types/event-portfolio"

interface HeroSectionPortfolioEMProps {
  heroData: EventPortfolioPageData["hero"]
}

export default function HeroSectionPortfolioEM({ heroData }: HeroSectionPortfolioEMProps) {
  return (
    <section className="bg-royal-blue text-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-sans">{heroData.title}</h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
          {heroData.introduction}
        </p>
      </div>
    </section>
  )
}
