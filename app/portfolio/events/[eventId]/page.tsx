import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { sampleEventPortfolioPageData, type PortfolioItem } from "@/src/types/event-portfolio"
import EventDetailGalleryEM from "@/src/components/portfolio/EventDetailGalleryEM"
import EventCommentsSection from "@/src/components/portfolio/EventCommentsSection"
import { Button } from "@/components/ui/button"
import { ChevronLeft, CalendarDays, Tag, MessageSquareQuote, Users } from "lucide-react"

// This function would typically fetch data from Firebase or your CMS
async function getEventDetails(eventId: string): Promise<PortfolioItem | undefined> {
  // Simulate fetching data
  await new Promise((resolve) => setTimeout(resolve, 200)) // Simulate network delay
  return sampleEventPortfolioPageData.portfolio.items.find((item) => item.id === eventId)
}

type Props = {
  params: { eventId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventDetails(params.eventId)

  if (!event) {
    return {
      title: "Event Not Found",
    }
  }

  return {
    title: `${event.title} | Event Portfolio`,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      images: [
        {
          url: event.coverImageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  }
}

export default async function EventDetailPage({ params }: Props) {
  const event = await getEventDetails(params.eventId)

  if (!event) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-gray-50 to-yellow-50 overflow-x-hidden">
      <main className="flex-grow w-full max-w-full">
        {/* Sticky Back Button */}
        <div className="sticky top-16 lg:top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="outline"
              asChild
              className="border-royal-gold text-royal-gold hover:bg-royal-gold/10 hover:text-royal-gold px-4 py-2 text-sm sm:text-base transition-all duration-300 ease-in-out group"
            >
              <Link href="/portfolio/events">
                <ChevronLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
                <span className="hidden xs:inline">Back to Portfolio</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative w-full">
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] w-full">
            <Image
              src={event.coverImageUrl || "/placeholder.svg"}
              alt={`Cover image for ${event.title}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
              <div className="max-w-4xl mx-auto w-full">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 shadow-text break-words">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-yellow-300">
                  {event.category && (
                    <span className="flex items-center bg-black/50 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                      <Tag className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{event.category}</span>
                    </span>
                  )}
                  {event.date && (
                    <span className="flex items-center bg-black/50 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                      <CalendarDays className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate">{event.date}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Event Quick Info Cards - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center border border-gray-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-royal-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CalendarDays className="w-6 h-6 sm:w-8 sm:h-8 text-royal-gold" />
              </div>
              <h3 className="font-semibold text-royal-blue mb-1 sm:mb-2 text-sm sm:text-base">Event Date</h3>
              <p className="text-gray-600 text-xs sm:text-sm break-words">{event.date || "TBD"}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center border border-gray-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-royal-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-royal-gold" />
              </div>
              <h3 className="font-semibold text-royal-blue mb-1 sm:mb-2 text-sm sm:text-base">Category</h3>
              <p className="text-gray-600 text-xs sm:text-sm break-words">{event.category}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-royal-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-royal-gold" />
              </div>
              <h3 className="font-semibold text-royal-blue mb-1 sm:mb-2 text-sm sm:text-base">Event Type</h3>
              <p className="text-gray-600 text-xs sm:text-sm break-words">Premium Event Management</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Event Overview */}
              {event.longDescription && (
                <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-royal-blue mb-4 sm:mb-6 font-arizona">
                    Event Overview
                  </h2>
                  <div className="prose prose-sm sm:prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words text-sm sm:text-base">
                      {event.longDescription}
                    </p>
                  </div>
                </section>
              )}

              {/* Event Gallery */}
              {event.galleryImageUrls && event.galleryImageUrls.length > 0 && (
                <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
                  <EventDetailGalleryEM imageUrls={event.galleryImageUrls} eventName={event.title} />
                </section>
              )}

              {/* Client Testimonial */}
              {event.clientTestimonial && (
                <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
                  <div className="bg-royal-gold/5 border-l-4 border-royal-gold rounded-r-lg p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <MessageSquareQuote className="h-6 w-6 sm:h-8 sm:w-8 text-royal-gold mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <blockquote className="text-gray-800 italic text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 break-words">
                          "{event.clientTestimonial.text}"
                        </blockquote>
                        <p className="text-right font-semibold text-royal-blue text-sm sm:text-base break-words">
                          - {event.clientTestimonial.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Call to Action */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-royal-blue mb-3 sm:mb-4 font-arizona">
                    Plan Your Event
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base break-words">
                    Ready to create your own memorable event? Let our expert team help you plan every detail.
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-royal-gold text-royal-blue hover:bg-royal-gold/90 transition-all duration-300 hover:scale-105 font-semibold text-sm sm:text-base py-3 sm:py-4"
                    asChild
                  >
                    <Link href="/services/event-management#event-quote-form">Get Quote</Link>
                  </Button>
                </div>

                {/* Event Highlights */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
                  <h3 className="text-lg sm:text-xl font-bold text-royal-blue mb-4 sm:mb-6 font-arizona">
                    Event Highlights
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-royal-gold rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm sm:text-base break-words">Professional event coordination</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-royal-gold rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm sm:text-base break-words">Premium transportation services</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-royal-gold rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm sm:text-base break-words">Luxury vehicle fleet</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-royal-gold rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm sm:text-base break-words">24/7 customer support</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-royal-blue rounded-xl shadow-lg p-6 sm:p-8 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 font-arizona">Need Help?</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-royal-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-royal-gold font-bold text-sm">📞</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-200">Call us</p>
                        <p className="font-semibold text-sm sm:text-base break-all">+250 788 123 456</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-royal-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-royal-gold font-bold text-sm">✉️</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-200">Email us</p>
                        <p className="font-semibold text-sm sm:text-base break-all">info@stratumtechug.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Comments Section - Full Width */}
      <EventCommentsSection eventId={params.eventId} eventTitle={event.title} />
    </div>
  )
}
