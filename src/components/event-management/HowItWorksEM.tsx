"use client"

import { useEffect, useRef, useState } from "react"
import type { EventPageData } from "@/src/types/event-management"
import { Lightbulb, ClipboardList, Smile, PartyPopper } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface HowItWorksEMProps {
  howItWorksData: EventPageData["howItWorks"]
}

const iconMap: { [key: string]: LucideIcon } = {
  Lightbulb,
  ClipboardList,
  Smile,
  PartyPopper, // Added PartyPopper as an alternative for "Celebrate"
}

export default function HowItWorksEM({ howItWorksData }: HowItWorksEMProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleSteps, setVisibleSteps] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = (entry.target as HTMLElement).dataset.stepId
            if (stepId) {
              setVisibleSteps((prev) => new Set(prev).add(stepId))
            }
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    )

    const currentSectionRef = sectionRef.current
    if (currentSectionRef) {
      const stepElements = currentSectionRef.querySelectorAll("[data-step-id]")
      stepElements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (currentSectionRef) {
        const stepElements = currentSectionRef.querySelectorAll("[data-step-id]")
        stepElements.forEach((el) => observer.unobserve(el))
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-royal-blue text-center mb-10 md:mb-16 font-sans">
          {howItWorksData.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {howItWorksData.steps.map((step, index) => {
            const IconComponent = iconMap[step.iconName] || Lightbulb
            const isVisible = visibleSteps.has(step.id)
            return (
              <div
                key={step.id}
                data-step-id={step.id}
                className={`flex flex-col items-center text-center p-6 md:p-8 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-5 p-4 bg-royal-gold/10 rounded-full">
                  <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-royal-gold" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-royal-blue mb-3 font-sans">{step.title}</h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
