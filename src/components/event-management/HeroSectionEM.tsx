"use client"

import Image from "next/image"
import type { EventPageData } from "@/src/types/event-management"

interface HeroSectionEMProps {
  heroData: EventPageData["hero"]
}

export default function HeroSectionEM({ heroData }: HeroSectionEMProps) {
  return (
    <section className="relative text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sven-mieke-fteR0e2BzKo-unsplash.jpg"
          alt="Project Management and Planning"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-royal-blue/70"></div> {/* Dark overlay */}
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 md:py-32 lg:py-40">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-sans">
          {heroData.titlePart1}
          <span className="text-royal-gold">{heroData.titlePart2Gold}</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto leading-relaxed font-sans">
          {(() => {
            const tagline = heroData.tagline;
            const noteIndex = tagline.toLowerCase().indexOf("please note");
            if (noteIndex === -1) return tagline;
            const before = tagline.slice(0, noteIndex);
            const after = tagline.slice(noteIndex + "please note".length);
            // Check for em dash or dash right after 'please note'
            let dash = "";
            let afterDash = after;
            if (after.startsWith("—") || after.startsWith("-")) {
              dash = after[0];
              afterDash = after.slice(1);
            }
            return (
              <>
                {before}
                <strong className="font-bold text-royal-gold">Please note{dash}</strong>
                {afterDash}
              </>
            );
          })()}
        </p>
      </div>
    </section>
  )
}
