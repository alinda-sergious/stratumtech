"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { sendFormEmail } from "@/src/actions/send-form-email"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState<string>("")
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const [isVisible, setIsVisible] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // Unobserve after first intersection
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (formRef.current) {
      observer.observe(formRef.current)
    }

    return () => {
      if (formRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(formRef.current)
      }
    }
  }, [])

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required."
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid."
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required."
    } else if (!/^\+\d{1,4}\d{6,14}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must be a valid international number starting with country code (e.g., +250788123456, +1234567890)."
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
    setDebugInfo(null)

    try {
      console.log("Submitting form:", formData)

      // Send email using server action
      const result = await sendFormEmail({
        formType: "Contact Form",
        formData,
        userEmail: formData.email,
        userName: formData.name,
      })

      console.log("Form submission result:", result)
      setDebugInfo(result.success || result)

      if (result.success) {
        setSubmitStatus("success")
        setStatusMessage(result.message || "Message sent successfully! We'll be in touch soon.")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setStatusMessage("An unexpected error occurred. Please try again later.")
      setDebugInfo(error instanceof Error ? { message: error.message, stack: error.stack } : String(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      ref={formRef}
      className="bg-[#1E293B] p-6 md:p-8 lg:p-10 rounded-xl shadow-2xl transform transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${isVisible ? 200 : 0}ms`, // Delay for the right column
      }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-arizona">
        <span className="text-white">Send Us a </span>
        <span className="text-[#B8860B]">Message</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Your Name <span className="text-[#B8860B]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full px-4 py-2.5 bg-[#0F172A] text-white border rounded-md focus:ring-2 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-500 ${
              errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-[#B8860B]"
            }`}
            required
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address <span className="text-[#B8860B]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={`w-full px-4 py-2.5 bg-[#0F172A] text-white border rounded-md focus:ring-2 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-500 ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-[#B8860B]"
            }`}
            required
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone Number <span className="text-[#B8860B]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number with country code (e.g., +256705515552)"
            className={`w-full px-4 py-2.5 bg-[#0F172A] text-white border rounded-md focus:ring-2 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-500 ${
              errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-[#B8860B]"
            }`}
            pattern="^\+\d{1,4}\d{6,14}$"
            title="Phone number must be a valid international number starting with country code (e.g., +256705515552)."
            required
          />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message <span className="text-[#B8860B]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your requirements, preferred dates, or any questions you have..."
            className={`w-full px-4 py-2.5 bg-[#0F172A] text-white border rounded-md focus:ring-2 focus:border-transparent outline-none transition-all duration-200 resize-none placeholder-gray-500 ${
              errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-[#B8860B]"
            }`}
            required
          ></textarea>
          {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#B8860B] text-[#0F172A] font-semibold py-3 px-6 rounded-md hover:bg-[#ae7d0a] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Send Message</span>
            </>
          )}
        </button>

        {submitStatus === "success" && (
          <div className="text-sm text-green-400 text-center p-4 bg-green-900/20 rounded-md border border-green-500/20">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle size={18} className="mr-2" />
              <p className="font-medium">Message Sent Successfully!</p>
            </div>
            <p>{statusMessage}</p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="text-sm text-red-400 text-center p-4 bg-red-900/20 rounded-md border border-red-500/20">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle size={18} className="mr-2" />
              <p className="font-medium">Failed to Send Message</p>
            </div>
            <p>{statusMessage}</p>
          </div>
        )}

        {process.env.NODE_ENV === "development" && debugInfo && (
          <div className="mt-4 p-3 bg-gray-800 rounded-md text-xs text-gray-300 overflow-auto max-h-40">
            <details>
              <summary className="cursor-pointer font-medium">Debug Information</summary>
              <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
            </details>
          </div>
        )}

        <div className="bg-[#B8860B] text-[#0F172A] text-xs text-center p-2.5 rounded-md">
          Quick Response: We typically respond to all inquiries within 2-4 hours during business hours.
        </div>
      </form>
    </div>
  )
}
