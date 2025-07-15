"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Users, MapPin, DollarSign, Phone, Mail, User, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { sendFormEmail } from "@/src/actions/send-form-email"

interface AccommodationBookingFormProps {
  type: "apartments" | "hotels"
}

export default function AccommodationBookingForm({ type }: AccommodationBookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    rooms: "1",
    guests: "",
    checkin: "",
    checkout: "",
    location: "",
    needTransport: false,
    pickup: "",
  })
  const [needTransport, setNeedTransport] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const isApartments = type === "apartments"

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required."
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid."
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required."
    } else if (!/^\+\d{1,4}\d{6,14}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be a valid international number (e.g., +256705515552)."
    }
    if (!formData.checkin) newErrors.checkin = "Management start date is required."
    if (!formData.checkout) newErrors.checkout = "Management end date is required."
    if (!formData.location) newErrors.budget = "Location is required."
    if (needTransport && !formData.pickup.trim()) {
      newErrors.pickup = "Pickup location is required when transport is needed."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus(null)
    setStatusMessage("")

    try {
      // Add accommodation type to form data
      const fullFormData = {
        ...formData,
        accommodationType: type,
        needTransport: needTransport,
      }

      // Send email using server action
      const result = await sendFormEmail({
        formType: isApartments ? "Apartment management" : "Hotel management",
        formData: fullFormData,
        userEmail: formData.email,
        userName: formData.fullName,
      })

      if (result.success) {
        setSubmitStatus("success")
        setStatusMessage(result.message || "Property management request submitted successfully!")
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          rooms: "1",
          guests: "1",
          checkin: "",
          checkout: "",
          location: "",
          needTransport: false,
          pickup: "",
        })
        setNeedTransport(false)
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.message || "Failed to submit property management request. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setStatusMessage("An unexpected error occurred. Please try again later.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#001934] font-arizona mb-2">
          Request {isApartments ? "Apartment" : "Hotel"} Management Services
        </h3>
        <p className="text-gray-600">
          Fill out the form below to request professional property management services for your {isApartments ? "apartment" : "hotel"}. Our team will contact you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-[#001934]">
              <User className="w-4 h-4 inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                errors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#B8860B]"
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-[#001934]">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#B8860B]"
              }`}
              placeholder="+256 xxx xxx xxx"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-[#001934]">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#B8860B]"
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isApartments && (
            <div className="space-y-2">
              <label htmlFor="rooms" className="block text-sm font-medium text-[#001934]">
                <Users className="w-4 h-4 inline mr-2" />
                Number of Units *
              </label>
              <input
                type="number"
                id="rooms"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                min="1"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                placeholder="1"
              />
            </div>
          )}

        </div>

        {/* Management Period */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="checkin" className="block text-sm font-medium text-[#001934]">
              <Calendar className="w-4 h-4 inline mr-2" />
              Management Start Date *
            </label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              value={formData.checkin}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                errors.checkin ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#B8860B]"
              }`}
            />
            {errors.checkin && <p className="text-xs text-red-500 mt-1">{errors.checkin}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="checkout" className="block text-sm font-medium text-[#001934]">
              <Calendar className="w-4 h-4 inline mr-2" />
              Management End Date *
            </label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              value={formData.checkout}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              min={formData.checkin || new Date().toISOString().split("T")[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                errors.checkout ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#B8860B]"
              }`}
            />
            {errors.checkout && <p className="text-xs text-red-500 mt-1">{errors.checkout}</p>}
          </div>
        </div>

        {/* Budget */}
        
          <div className="space-y-2">
            <label htmlFor="guests" className="block text-sm font-medium text-[#001934]">
              <Users className="w-4 h-4 inline mr-2" />
              Location *
            </label>
            <input
              type="location"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              placeholder="Kampala"
            />
          </div>
   

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#B8860B] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#A0750A] focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="mr-2 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            "Submit property management Request"
          )}
        </button>

        {submitStatus === "success" && (
          <div
            className="text-sm text-green-600 mt-2 text-center bg-green-50 p-4 rounded-md border border-green-200 animate-fadeIn"
            role="alert"
          >
            <div className="flex items-center justify-center mb-2">
              <CheckCircle size={18} className="mr-2" />
              <p className="font-medium">Property Management Request Submitted Successfully!</p>
            </div>
            <p>{statusMessage}</p>
            <p className="text-xs mt-2 text-green-700">
              📧 You'll receive a confirmation email shortly. We'll contact you within 24 hours!
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div
            className="text-sm text-red-600 mt-2 text-center bg-red-50 p-4 rounded-md border border-red-200 animate-fadeIn"
            role="alert"
          >
            <div className="flex items-center justify-center mb-2">
              <AlertCircle size={18} className="mr-2" />
              <p className="font-medium">Property Management Request Failed</p>
            </div>
            <p>{statusMessage}</p>
            <p className="text-xs mt-2 text-red-700">📞 You can also call us directly at +256 705 515 552</p>
          </div>
        )}
      </form>
    </div>
  )
}
