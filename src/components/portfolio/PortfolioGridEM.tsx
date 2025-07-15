"use client"

import type { EventPortfolioPageData } from "@/src/types/event-portfolio"
import PortfolioCardEM from "./PortfolioCardEM"

interface PortfolioGridEMProps {
  portfolioData: EventPortfolioPageData["portfolio"]
}

export default function PortfolioGridEM({ portfolioData }: PortfolioGridEMProps) {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-royal-blue text-center mb-10 md:mb-16 font-sans">
          {portfolioData.title}
        </h2>
        {portfolioData.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {portfolioData.items.map((item, index) => (
              <div
                key={item.id}
                className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PortfolioCardEM item={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Our portfolio is currently being updated. Please check back soon!
          </p>
        )}
      </div>
    </section>
  )
}
