"use client"

import { useParams } from "next/navigation"
import ImageCarousel from "@/src/components/ImageCarousel"
import BookThisTourForm from "@/src/components/BookThisTourForm" // Reusing this form
import { toursData, type Tour } from "@/src/data/toursData"
import { CalendarDays, DollarSign, MapPin, CheckCircle, XCircle, ChevronDown, ChevronUp, Info } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

const ItineraryItem = ({
  day,
  title,
  description,
  isOpen,
  onToggle,
}: { day: number; title: string; description: string; isOpen: boolean; onToggle: () => void }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center py-4 px-1 text-left hover:bg-gray-50 transition-colors rounded-t-md"
      aria-expanded={isOpen}
    >
      <span className="text-lg font-semibold text-[#001934]">
        Day {day}: {title}
      </span>
      {isOpen ? <ChevronUp className="w-5 h-5 text-[#B8860B]" /> : <ChevronDown className="w-5 h-5 text-[#B8860B]" />}
    </button>
    {isOpen && <div className="p-4 bg-gray-50 text-gray-700 text-sm leading-relaxed rounded-b-md">{description}</div>}
  </div>
)

export default function TourDetailPage() {
  const params = useParams()
  const tourId = params.tourId as string
  const [tour, setTour] = useState<Tour | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openItineraryDay, setOpenItineraryDay] = useState<number | null>(1) // Open first day by default

  useEffect(() => {
    setIsLoading(true)
    const foundTour = toursData.find((t) => t.id === tourId)
    if (foundTour) {
      setTour(foundTour)
    }
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 200)
    return () => clearTimeout(timer)
  }, [tourId])

  const toggleItineraryDay = (day: number) => {
    setOpenItineraryDay(openItineraryDay === day ? null : day)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16 lg:pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#B8860B]"></div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4 pt-16 lg:pt-20 bg-white">
        <div>
          <h1 className="text-3xl font-bold text-[#001934] mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the survey and BOQs service you're looking for.</p>
          <Link
            href="/services/tours"
            className="bg-[#B8860B] text-[#001934] font-semibold py-3 px-6 rounded-lg hover:bg-[#B8860B]/90 transition-all"
          >
            Back to Tours
          </Link>
        </div>
      </div>
    )
  }

  const infoBoxes = [
    {
      icon: <DollarSign className="w-7 h-7 text-[#B8860B]" />,
      title: "Price",
      value: tour.pricePerPerson || "Contact Us",
    },
    { icon: <CalendarDays className="w-7 h-7 text-[#B8860B]" />, title: "Duration", value: tour.duration },
    { icon: <MapPin className="w-7 h-7 text-[#B8860B]" />, title: "Destination", value: tour.destination },
  ]
  if (tour.category) {
    infoBoxes.push({ icon: <Info className="w-7 h-7 text-[#B8860B]" />, title: "Category", value: tour.category })
  }

  return (
    <div className="bg-white min-h-screen pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001934] font-arizona">{tour.title}</h1>
        </header>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content Area (Left Column on Desktop) */}
          <div className="lg:col-span-2">
            <ImageCarousel
              images={tour.galleryImages.length > 0 ? tour.galleryImages : [tour.mainImage]}
              altText={tour.title}
            />

            <section className="mt-10 py-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-[#001934] mb-4 font-arizona">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">{tour.longDescription}</p>
            </section>

            <section className="mt-8 py-8 border-t border-gray-200">
              <div
                className={`grid grid-cols-1 md:grid-cols-${infoBoxes.length > 3 ? 2 : 3} lg:grid-cols-${infoBoxes.length > 3 ? 2 : 3} gap-6 mb-8`}
              >
                {infoBoxes.map((box) => (
                  <div
                    key={box.title}
                    className="bg-[#001934] text-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-start min-h-[160px]"
                  >
                    <div className="mb-3">{box.icon}</div>
                    <h3 className="text-lg font-semibold text-[#B8860B] font-arizona mb-1">{box.title}</h3>
                    <p className="text-gray-300 text-sm">{box.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {tour.itinerary && tour.itinerary.length > 0 && (
              <section className="mt-8 py-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-[#001934] mb-6 font-arizona">Activities</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {tour.itinerary.map((item) => (
                    <ItineraryItem
                      key={item.day}
                      day={item.day}
                      title={item.title}
                      description={item.description}
                      isOpen={openItineraryDay === item.day}
                      onToggle={() => toggleItineraryDay(item.day)}
                    />
                  ))}
                </div>
              </section>
            )}

            {(tour.included && tour.included.length > 0) || (tour.excluded && tour.excluded.length > 0) ? (
              <section className="mt-8 py-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
                {tour.included && tour.included.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#001934] mb-4 font-arizona">What's Included</h2>
                    <ul className="space-y-2">
                      {tour.included.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tour.excluded && tour.excluded.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#001934] mb-4 font-arizona">What's Excluded</h2>
                    <ul className="space-y-2">
                      {tour.excluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ) : null}
          </div>

          {/* Sidebar (Right Column on Desktop) */}
          <aside className="lg:col-span-1 mt-12 lg:mt-0">
            <BookThisTourForm eventName={tour.title} />
          </aside>
        </div>
      </div>
    </div>
  )
}
