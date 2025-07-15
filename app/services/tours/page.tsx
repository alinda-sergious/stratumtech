"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle, MapPin, Calculator, FileText, Users, Clock, Shield } from "lucide-react"

interface SurveyingService {
  id: string
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
}

const surveyingServices: SurveyingService[] = [
  {
    id: "land-surveying",
    title: "Land Surveying",
    description: "Comprehensive land surveying services including boundary surveys, topographic mapping, and land subdivision. Our expert surveyors use advanced GPS and traditional surveying equipment for accurate results.",
    features: [
      "Boundary surveys and property lines",
      "Topographic mapping",
      "Land subdivision surveys",
      "GPS and traditional surveying",
      "Detailed survey reports"
    ],
    icon: <MapPin className="w-8 h-8 text-[#B8860B]" />
  },
  {
    id: "construction-surveying",
    title: "Construction Surveying",
    description: "Precise construction surveying for building projects, road construction, and infrastructure development. We provide layout surveys, as-built surveys, and construction monitoring.",
    features: [
      "Building layout surveys",
      "Road and infrastructure surveys",
      "As-built surveys",
      "Construction monitoring",
      "Quality control verification"
    ],
    icon: <Calculator className="w-8 h-8 text-[#B8860B]" />
  },
  {
    id: "boq-preparation",
    title: "Bill of Quantities (BOQ)",
    description: "Detailed Bill of Quantities preparation for construction projects. We provide comprehensive cost estimates, material takeoffs, and project specifications to ensure accurate budgeting.",
    features: [
      "Detailed cost estimates",
      "Material takeoffs",
      "Project specifications",
      "Quantity calculations",
      "Budget planning support"
    ],
    icon: <FileText className="w-8 h-8 text-[#B8860B]" />
  }
]

export default function SurveyingAndBOQsPage() {
  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Image */}
        <div className="flex justify-center mb-8">
          <img src="/images/valerie-v-OO4laKg2HS0-unsplash.jpg" alt="Surveying and BOQs" className="rounded-lg shadow-lg max-h-96 w-full object-cover" />
        </div>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#001934] mb-4">Surveying & BOQs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional surveying services and detailed Bill of Quantities preparation for your construction projects
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {surveyingServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-bold text-[#001934] ml-3">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#B8860B] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#001934] mb-6 text-center">Why Choose Our Surveying Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Users className="w-12 h-12 text-[#B8860B] mx-auto mb-4" />
              <h3 className="font-semibold text-[#001934] mb-2">Expert Team</h3>
              <p className="text-sm text-gray-600">Licensed surveyors with years of experience</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-[#B8860B] mx-auto mb-4" />
              <h3 className="font-semibold text-[#001934] mb-2">Quality Assurance</h3>
              <p className="text-sm text-gray-600">Accurate measurements and detailed reports</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-[#B8860B] mx-auto mb-4" />
              <h3 className="font-semibold text-[#001934] mb-2">Timely Delivery</h3>
              <p className="text-sm text-gray-600">Fast turnaround times for all projects</p>
            </div>
            <div className="text-center">
              <Calculator className="w-12 h-12 text-[#B8860B] mx-auto mb-4" />
              <h3 className="font-semibold text-[#001934] mb-2">Cost Effective</h3>
              <p className="text-sm text-gray-600">Competitive pricing for quality services</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#001934] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-300 mb-6">
            Contact us today for professional surveying services and BOQ preparation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Get Quote
            </a>
            <a
              href="tel:+256700000000"
              className="border border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
