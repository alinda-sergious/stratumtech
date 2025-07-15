"use client"

import { useEffect, useRef, useState } from "react"

export default function MissionVisionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true)
        }
      },
      {
        threshold: 0.2,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    if (imageRef.current) {
      imageObserver.observe(imageRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      if (imageRef.current) {
        imageObserver.unobserve(imageRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Side - Mission & Vision stacked */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Our Mission */}
            <div
              className={`transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-3xl lg:text-4xl font-bold text-[#B8860B] mb-6 font-arizona">Our Mission</h3>
                <p className="text-gray-800 leading-relaxed text-lg">
    To deliver innovative, reliable, and sustainable civil engineering and construction
     solutions that strengthen communities, empower progress, and uphold the highest standards of quality and integrity.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div
              className={`transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-3xl lg:text-4xl font-bold text-[#B8860B] mb-6 font-arizona">Our Vision</h3>
                <p className="text-gray-800 leading-relaxed text-lg">
                  To become a leading force in Uganda’s construction industry-recognized for
                   excellence, innovation, and shaping infrastructure that stands the test of time.
                </p>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2" ref={imageRef}>
            <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <img
                src="/images/nathan-waters-j7q-Z9DV3zw-unsplash.jpg"
                alt="Mission and Vision"
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  imageVisible ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
