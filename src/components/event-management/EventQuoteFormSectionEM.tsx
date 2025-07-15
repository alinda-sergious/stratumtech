"use client"

import type React from "react"
import { useState, useEffect, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { EventPageData } from "@/src/types/event-management"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { sendFormEmail } from "@/src/actions/send-form-email"

interface EventQuoteFormSectionEMProps {
  formDataLabels: EventPageData["quoteForm"]
  initialEventType?: string
  id?: string
}

const eventTypeOptions = [
  "Construction",
  "On-Site supervision",
  "Resources and Logistics Management",
  "Project Completion and Handover",
  "Concert & Show",
  "Anniversary & Party",
  "Other",
]

export default function EventQuoteFormSectionEM({
  formDataLabels,
  initialEventType = "",
  id,
}: EventQuoteFormSectionEMProps) {
  const [formValues, setFormValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: initialEventType || eventTypeOptions[0], // Default to first option or initial
    estimatedBudget: "",
    details: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState<string>("")

  useEffect(() => {
    if (initialEventType && eventTypeOptions.includes(initialEventType)) {
      setFormValues((prev) => ({ ...prev, eventType: initialEventType }))
    } else if (initialEventType) {
      // If initialEventType is custom but not in predefined list
      setFormValues((prev) => ({ ...prev, eventType: "Other" })) // Default to 'Other' if not in list
    }
  }, [initialEventType])

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formValues.fullName.trim()) newErrors.fullName = "Full name is required."
    if (!formValues.email.trim()) {
      newErrors.email = "Email address is required."
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email address is invalid."
    }
    if (!formValues.phone.trim()) {
      newErrors.phone = "Phone number is required."
    } else if (!/^\+?\d{10,15}$/.test(formValues.phone)) {
      newErrors.phone = "Please enter a valid phone number (e.g., +256705515552)."
    }
    if (!formValues.eventType.trim()) newErrors.eventType = "Project Type type is required."
    if (!formValues.estimatedBudget.trim()) {
      newErrors.estimatedBudget = "Estimated budget is required."
    } else if (isNaN(Number(formValues.estimatedBudget)) || Number(formValues.estimatedBudget) <= 0) {
      newErrors.estimatedBudget = "Please enter a valid budget amount."
    }
    if (!formValues.details.trim()) {
      newErrors.details = "Details are required."
    } else if (formValues.details.trim().length < 10) {
      newErrors.details = "Please provide at least 10 characters for details."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormValues((prev) => ({ ...prev, eventType: value }))
    if (errors.eventType) {
      setErrors((prev) => ({ ...prev, eventType: "" }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus(null)
    setStatusMessage("")

    try {
      // Send email using server action
      const result = await sendFormEmail({
        formType: "Project Quote",
        formData: formValues,
        userEmail: formValues.email,
        userName: formValues.fullName,
      })

      if (result.success) {
        setSubmitStatus("success")
        setStatusMessage(result.message || "Quote request submitted successfully!")
        setFormValues({
          fullName: "",
          phone: "",
          email: "",
          eventType: initialEventType || eventTypeOptions[0],
          estimatedBudget: "",
          details: "",
        })
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.message || "Failed to submit quote request. Please try again.")
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
    <section id={id} className="py-12 md:py-20 bg-royal-blue text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 font-arizona">
          {formDataLabels.title}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="fullName" className="text-gray-200">
              {formDataLabels.fullNameLabel} <span className="text-royal-gold">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
              placeholder={formDataLabels.fullNamePlaceholder}
              disabled={isSubmitting}
              className={`mt-1 bg-white/20 text-white placeholder-gray-400 border-gray-600 focus:border-royal-gold focus-visible:ring-royal-gold ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              required
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone" className="text-gray-200">
                {formDataLabels.phoneLabel} <span className="text-royal-gold">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={handleChange}
                placeholder={formDataLabels.phonePlaceholder}
                disabled={isSubmitting}
                className={`mt-1 bg-white/20 text-white placeholder-gray-400 border-gray-600 focus:border-royal-gold focus-visible:ring-royal-gold ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                required
              />
              {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-200">
                {formDataLabels.emailLabel} <span className="text-royal-gold">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder={formDataLabels.emailPlaceholder}
                disabled={isSubmitting}
                className={`mt-1 bg-white/20 text-white placeholder-gray-400 border-gray-600 focus:border-royal-gold focus-visible:ring-royal-gold ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                required
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="eventType" className="text-gray-200">
                {formDataLabels.eventTypeLabel} <span className="text-royal-gold">*</span>
              </Label>
              <Select
                name="eventType"
                value={formValues.eventType}
                onValueChange={handleSelectChange}
                disabled={isSubmitting}
              >
                <SelectTrigger
                  id="eventType"
                  className={`mt-1 w-full bg-white/20 text-white placeholder-gray-400 border-gray-600 focus:border-royal-gold focus:ring-royal-gold ${errors.eventType ? "border-red-500 ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent className="bg-royal-blue text-white border-gray-600">
                  {eventTypeOptions.map((option) => (
                    <SelectItem key={option} value={option} className="hover:bg-white/10 focus:bg-white/20">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.eventType && <p className="mt-1 text-xs text-red-400">{errors.eventType}</p>}
            </div>
            <div>
              <Label htmlFor="estimatedBudget" className="text-gray-200">
                {formDataLabels.estimatedBudgetLabel} <span className="text-royal-gold">*</span>
              </Label>
              <Input
                id="estimatedBudget"
                name="estimatedBudget"
                type="number"
                value={formValues.estimatedBudget}
                onChange={handleChange}
                placeholder={formDataLabels.estimatedBudgetPlaceholder}
                disabled={isSubmitting}
                className={`mt-1 bg-white/20 text-white placeholder-gray-400 border-gray-600 focus:border-royal-gold focus-visible:ring-royal-gold ${errors.estimatedBudget ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                required
                min="0"
              />
              {errors.estimatedBudget && <p className="mt-1 text-xs text-red-400">{errors.estimatedBudget}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="details" className="text-gray-200">
              {formDataLabels.detailsLabel} <span className="text-royal-gold">*</span>
            </Label>
            <Textarea
              id="details"
              name="details"
              value={formValues.details}
              onChange={handleChange}
              placeholder={formDataLabels.detailsPlaceholder}
              rows={4}
              disabled={isSubmitting}
              className={`mt-1 resize-none bg-white/20 text-white placeholder-gray-400 border-gray-600 focus:border-royal-gold focus-visible:ring-royal-gold ${errors.details ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              required
            />
            {errors.details && <p className="mt-1 text-xs text-red-400">{errors.details}</p>}
          </div>

          {submitStatus === "success" && (
            <div
              className="text-sm text-green-300 p-4 bg-green-500/20 rounded-md border border-green-500/30 animate-fadeIn"
              role="alert"
            >
              <div className="flex items-center justify-center mb-2">
                <CheckCircle size={18} className="mr-2" />
                <p className="font-medium">Quote Request Submitted Successfully!</p>
              </div>
              <p>{statusMessage}</p>
              <p className="text-xs mt-2 text-green-200">
                📧 You'll receive a confirmation email shortly. We'll contact you within 24 hours!
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div
              className="text-sm text-red-300 p-4 bg-red-500/20 rounded-md border border-red-500/30 animate-fadeIn"
              role="alert"
            >
              <div className="flex items-center justify-center mb-2">
                <AlertCircle size={18} className="mr-2" />
                <p className="font-medium">Quote Submission Failed</p>
              </div>
              <p>{statusMessage}</p>
              <p className="text-xs mt-2 text-red-200">📞 You can also call us directly at +256 705 515 552</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-royal-gold text-royal-blue font-semibold hover:bg-royal-gold/90 py-3 text-base transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" /> {formDataLabels.submitButtonText}
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
