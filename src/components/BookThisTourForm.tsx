"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { sendFormEmail } from "@/src/actions/send-form-email"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface BookThisTourFormProps {
  eventName: string
}

export default function BookThisTourForm({ eventName }: BookThisTourFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    people: 1,
    message: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState<string>("")

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = "Full name is required."
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid."
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required."
    } else if (!/^\+\d{1,4}\d{6,14}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be a valid international number (e.g., +250788123456)."
    }
    if (formData.people < 1) newErrors.people = "Number of people must be at least 1."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "people" ? Number.parseInt(value) : value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus(null)
    setStatusMessage("")

    try {
      // Include the event name in the form data
      const fullFormData = { ...formData, event: eventName }

      // Send email using server action
      const result = await sendFormEmail({
        formType: "Tour Booking",
        formData: fullFormData,
        userEmail: formData.email,
        userName: formData.name,
      })

      if (result.success) {
        setSubmitStatus("success")
        setStatusMessage(result.message || "Booking submitted successfully! We'll contact you soon.")
        setFormData({ name: "", phone: "", email: "", people: 1, message: "" })
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.message || "Failed to submit booking. Please try again.")
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
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-full">
      <h3 className="text-xl sm:text-2xl font-bold text-[#001934] mb-4 sm:mb-6 font-arizona">Know More</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-1">
            Service
          </label>
          <input
            type="text"
            id="event"
            name="event"
            value={eventName}
            readOnly
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 border border-gray-300 rounded-md cursor-not-allowed text-sm break-words overflow-ellipsis"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-md focus:ring-2 outline-none text-sm ${
              errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#B8860B]"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            pattern="^\+\d{1,4}\d{6,14}$"
            title="International format, e.g., +250788123456"
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-md focus:ring-2 outline-none text-sm ${
              errors.phone ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#B8860B]"
            }`}
            placeholder="+256705515552"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-md focus:ring-2 outline-none text-sm ${
              errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#B8860B]"
            }`}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B8860B] outline-none resize-none text-sm"
            placeholder="Any special requests or questions..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#B8860B] text-[#001934] font-semibold py-3 px-6 rounded-lg hover:bg-[#ae7d0a] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 text-sm sm:text-base touch-manipulation flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            "Submit Request"
          )}
        </button>

        {submitStatus === "success" && (
          <div
            className="text-sm text-green-600 mt-2 text-center bg-green-50 p-4 rounded-md border border-green-200 animate-fadeIn"
            role="alert"
          >
            <div className="flex items-center justify-center mb-2">
              <CheckCircle size={18} className="mr-2" />
              <p className="font-medium">Request Submitted Successfully!</p>
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
              <p className="font-medium">Service Request Submission Failed</p>
            </div>
            <p>{statusMessage}</p>
            <p className="text-xs mt-2 text-red-700">📞 You can also call us directly at +256 705 515 552</p>
          </div>
        )}
      </form>
    </div>
  )
}
