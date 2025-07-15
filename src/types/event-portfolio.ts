// Simulates the data structure for the Event Portfolio page
export interface PortfolioItem {
  id: string
  title: string
  category: string // e.g., "Wedding", "Corporate", "Festival"
  coverImageUrl: string
  shortDescription: string
  date?: string // Optional, e.g., "June 2024"
  longDescription?: string
  galleryImageUrls?: string[]
  clientTestimonial?: {
    text: string
    author: string
  }
  // galleryImageUrls?: string[]; // For a potential detail view or modal
}

export interface EventPortfolioPageData {
  hero: {
    title: string
    introduction: string
  }
  portfolio: {
    title: string
    items: PortfolioItem[]
  }
  // Potentially add filter categories if needed later
}

// Sample data - this would come from Firebase
export const sampleEventPortfolioPageData: EventPortfolioPageData = {
  hero: {
    title: "Our Event Portfolio",
    introduction: "Explore a selection of memorable events we've had the pleasure to manage and provide transport for.",
  },
  portfolio: {
    title: "Featured Events",
    items: [
      {
        id: "gala-dinner-2024",
        title: "Grand Corporate Gala Dinner",
        category: "Corporate",
        coverImageUrl: "/placeholder.svg?height=600&width=1000",
        shortDescription: "Seamless transportation for 500+ guests, VIP arrivals, and post-event logistics.",
        longDescription:
          "The Grand Corporate Gala Dinner was a premier event requiring meticulous planning and execution of transportation logistics. We managed a fleet of luxury sedans and coaches to ensure timely and comfortable travel for over 500 attendees, including key executives and international delegates. Our services encompassed airport transfers, hotel shuttles, VIP point-to-point transport, and coordinated departures, all synchronized with the event's demanding schedule. The success of the transport operation contributed significantly to the overall positive experience of the attendees.",
        galleryImageUrls: [
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
        ],
        clientTestimonial: {
          text: "Stratum Tech's professionalism and attention to detail in managing our construction project were exceptional. Everything was completed on time and within budget!",
          author: "CEO, Innovatech Corp",
        },
        date: "October 2024",
      },
      {
        id: "lakeside-wedding-grace-john",
        title: "Lakeside Wedding: Grace & John",
        category: "Wedding",
        coverImageUrl: "/placeholder.svg?height=600&width=1000",
        shortDescription: "Elegant bridal party transport, guest shuttles, and romantic getaway car.",
        longDescription:
          "Grace and John's lakeside wedding was a picturesque affair, and we were honored to provide comprehensive transportation services. This included a classic limousine for the bridal party, comfortable shuttles for guests from various locations to the remote lakeside venue, and a stylish getaway car for the happy couple. Our team ensured every journey was smooth, punctual, and added to the magic of their special day.",
        galleryImageUrls: [
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
        ],
        date: "July 2024",
      },
      {
        id: "music-festival-summer-vibes",
        title: "Summer Vibes Music Festival",
        category: "Festival",
        coverImageUrl: "/placeholder.svg?height=600&width=1000",
        shortDescription:
          "Managed artist transport, crew logistics, and attendee shuttle services for a 3-day festival.",
        longDescription:
          "The Summer Vibes Music Festival attracted thousands. Our role was crucial in managing complex logistics for artists, their entourages, production crew, and providing efficient shuttle services for attendees from parking zones to the festival grounds. We operated round-the-clock to ensure everyone moved safely and on schedule.",
        galleryImageUrls: [
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
        ],
        date: "August 2024",
      },
      {
        id: "tech-conference-innovate2023",
        title: "InnovateTech Conference 2023",
        category: "Corporate",
        coverImageUrl: "/placeholder.svg?height=400&width=600",
        shortDescription:
          "Coordinated transport for international speakers, delegates, and off-site networking events.",
        date: "November 2023",
      },
      {
        id: "golden-anniversary-celebration",
        title: "Golden Anniversary Celebration",
        category: "Anniversary",
        coverImageUrl: "/placeholder.svg?height=400&width=600",
        shortDescription: "Provided luxury transport for the celebrated couple and their esteemed guests.",
        date: "May 2024",
      },
      {
        id: "charity-run-hope2024",
        title: "Run for Hope Charity Event",
        category: "Custom",
        coverImageUrl: "/placeholder.svg?height=400&width=600",
        shortDescription: "Logistical support and participant transport for a city-wide charity run.",
        date: "September 2024",
      },
    ],
  },
}
