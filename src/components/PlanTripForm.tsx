"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { sendFormEmail } from "@/src/actions/send-form-email"

interface PlanTripFormProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  numberOfPeople: string
  appointmentDate: string
  category: string
  services: string[]
  message: string
}

export default function PlanTripForm({ isOpen, onClose }: PlanTripFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    numberOfPeople: "",
    appointmentDate: "",
    category: "",
    services: [],
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  // Prevent body scroll when form is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = "100%"
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({ ...prev, category }))
  }

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((i) => i !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.company ||
        !formData.numberOfPeople ||
        !formData.appointmentDate ||
        !formData.category
      ) {
        throw new Error("Please fill in all required fields")
      }

      // Prepare form data for email
      const emailData = {
        ...formData,
        services: formData.services.join(", ") || "None specified",
        formType: "Appointment request",
      }

      // Send emails
      const result = await sendFormEmail({
        formType: "Appointment request",
        formData: emailData,
        userEmail: formData.email,
        userName: formData.name,
      })

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "✅ Your appointment request has been submitted successfully! We'll contact you within 24 hours.",
        })

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            numberOfPeople: "",
            appointmentDate: "",
            category: "",
            services: [],
            message: "",
          })
          setSubmitStatus({ type: null, message: "" })
          onClose()
        }, 3000)
      } else {
        throw new Error(result.error || "Failed to submit appointment request")
      }
    } catch (error) {
      console.error("Appointment form submission error:", error)
      setSubmitStatus({
        type: "error",
        message: `❌ ${error instanceof Error ? error.message : "Failed to submit request"}. Please try again or contact us at +256 705 515 552.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const serviceOptions = [
    "Architecture Designing",
    "Building Construction",
    "Building Maintenance",
    "Real Estates",
    "Project Management",
    "Surveying and BOQs",
    "Property Management",
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Form Panel - Always positioned from top-left */}
      <div
        className={`relative h-full w-full sm:w-96 md:w-[28rem] lg:w-[32rem] bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-100 to-yellow-50 border-b border-yellow-200 p-4 sm:p-6 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#001934] font-arizona">Take The First Step</h2>
              <p className="text-lg sm:text-xl font-semibold text-[#001934] font-arizona">Schedule Your Appointment</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-yellow-200 rounded-full transition-colors duration-200 flex-shrink-0"
            >
              <X className="w-5 h-5 text-[#001934]" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`mb-4 p-4 rounded-lg border ${
                  submitStatus.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}
            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full Name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your Email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Phone and Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Enter your Company Name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Number of People and Appointment Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Number of Representatives *</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                  placeholder="Number of people"
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Appointment Date *</label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-[#001934] mb-3">Project Category *</label>
              <div className="flex flex-wrap gap-4">
                {["Residential", "Commercial", "Industrial", "Renovation"].map((category) => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={formData.category === category}
                      onChange={() => handleCategoryChange(category)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                        formData.category === category ? "border-[#B8860B] bg-[#B8860B]" : "border-gray-400"
                      }`}
                    >
                      {formData.category === category && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-[#001934]">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-[#001934] mb-3">Services Interested In</label>
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3 bg-white">
                <div className="grid grid-cols-1 gap-2">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceChange(service)}
                        className="w-4 h-4 text-[#B8860B] border-gray-300 rounded focus:ring-[#B8860B] focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-[#001934]">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message/More detail"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed text-gray-600"
                  : "bg-[#B8860B] hover:bg-[#996f09] text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Appointment Request</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
