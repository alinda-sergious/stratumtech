"use client"

import type { EventPageData } from "@/src/types/event-management"

interface FooterCalloutEMProps {
  calloutData: EventPageData["footerCallout"]
}

export default function FooterCalloutEM({ calloutData }: FooterCalloutEMProps) {
  // Removed the link and button to the event portfolio as requested
  return null;
}
