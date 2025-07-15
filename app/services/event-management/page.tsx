"use client"

import { useState, useRef } from "react"
import HeroSectionEM from "@/src/components/event-management/HeroSectionEM"
import ServicesGridEM from "@/src/components/event-management/ServicesGridEM"
import HowItWorksEM from "@/src/components/event-management/HowItWorksEM"
import FooterCalloutEM from "@/src/components/event-management/FooterCalloutEM"
import EventQuoteFormSectionEM from "@/src/components/event-management/EventQuoteFormSectionEM" // New import
import { sampleEventPageData } from "@/src/types/event-management"

const eventPageContent = sampleEventPageData
const FORM_SECTION_ID = "event-quote-form" // ID for the form section

export default function EventManagementPage() {
  const [selectedEventTypeForForm, setSelectedEventTypeForForm] = useState("")
  const quoteFormSectionRef = useRef<HTMLDivElement>(null)

  const handleRequestQuote = (eventType: string) => {
    setSelectedEventTypeForForm(eventType)
    // Scroll to the form section
    const formElement = document.getElementById(FORM_SECTION_ID)
    formElement?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      <HeroSectionEM heroData={eventPageContent.hero} />
      <ServicesGridEM servicesData={eventPageContent.services} onQuoteRequest={handleRequestQuote} />
      <HowItWorksEM howItWorksData={eventPageContent.howItWorks} />
      {/* Embedded Quote Form Section */}
      <EventQuoteFormSectionEM
        id={FORM_SECTION_ID} // Assign ID for scrolling
        formDataLabels={eventPageContent.quoteForm}
        initialEventType={selectedEventTypeForForm}
      />
      {/* Removed QuoteModalEM as it's replaced by the section */}
      <FooterCalloutEM calloutData={eventPageContent.footerCallout} />
    </div>
  )
}
