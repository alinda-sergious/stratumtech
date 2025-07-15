"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import type { EventPageData } from "@/src/types/event-management"
import { Heart, Briefcase, Music, Gift, PartyPopper, Sparkles, CheckCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ServicesGridEMProps {
  servicesData: EventPageData["services"]
  onQuoteRequest: (eventType: string) => void // Keep this to set event type and scroll
}

const iconMap: { [key: string]: LucideIcon } = {
  Heart,
  Briefcase,
  Music,
  Gift,
  PartyPopper,
  Sparkles,
}

export default function ServicesGridEM({ servicesData, onQuoteRequest }: ServicesGridEMProps) {
  const [openAccordionItem, setOpenAccordionItem] = useState<string | null>(null)

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-royal-blue text-center mb-10 md:mb-16 font-arizona">
          {servicesData.title}
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          value={openAccordionItem ?? undefined}
          onValueChange={setOpenAccordionItem}
        >
          {servicesData.items.map((service) => {
            const IconComponent = iconMap[service.iconName] || Sparkles
            return (
              <AccordionItem
                value={service.id}
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-0"
              >
                <AccordionTrigger className="p-6 text-left hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold focus-visible:ring-offset-2 rounded-xl">
                  <div className="flex items-center space-x-4 w-full">
                    <div className="p-3 bg-royal-gold/10 rounded-full">
                      <IconComponent className="w-8 h-8 text-royal-gold" />
                    </div>
                    <span className="text-xl font-semibold text-royal-blue font-sans flex-1">{service.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.serviceList.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-royal-gold mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {/* Use the onQuoteRequest prop to handle click */}
                  <Button
                    onClick={() => onQuoteRequest(service.label)}
                    className="w-full md:w-auto bg-royal-gold text-royal-blue font-semibold hover:bg-royal-gold/90 py-3 px-6 text-base transition-transform hover:scale-105"
                    style={{ minHeight: "44px" }}
                  >
                    {service.quoteButtonText}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
