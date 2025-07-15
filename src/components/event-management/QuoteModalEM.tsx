"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { EventPageData } from "@/src/types/event-management"
import { sendFormEmail } from "@/src/actions/send-form-email"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface QuoteModalEMProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  formDataLabels: EventPageData["quoteForm"]
  initialEventType?: string
}

export default function QuoteModalEM({
  isOpen,
  onOpenChange,
  formDataLabels,
  initialEventType = "",
}: QuoteModalEMProps) {
  const [formValues, setFormValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: initialEventType,
    estimatedBudget: "",
    details: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState<string>("")

  useEffect(() => {
    if (initialEventType) {
      setFormValues((prev) => ({ ...prev, eventType: initialEventType }))
    }
  }, [initialEventType, isOpen]) // Reset/update eventType when modal opens or initialEventType changes

  useEffect(() => {
    // Reset form on close
    if (!isOpen) {
      setFormValues({
        fullName: "",
        phone: "",
        email: "",
        eventType: initialEventType, // Keep initial event type if modal reopens for same service
        estimatedBudget: "",
        details: "",
      })
      setErrors({})
      setSubmitStatus(null)
      setStatusMessage("")
      setIsSubmitting(false)
    }
  }, [isOpen, initialEventType])

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
      newErrors.phone = "Please enter a valid phone number (e.g., +250788123456)."
    }
    if (!formValues.eventType.trim()) newErrors.eventType = "Event type is required."
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus(null)
    setStatusMessage("")

    try {
      const result = await sendFormEmail({
        formType: "Event Quote",
        formData: formValues,
        userEmail: formValues.email,
        userName: formValues.fullName,
      })

      if (result.success) {
        setSubmitStatus("success")
        setStatusMessage(result.message || "Quote request submitted successfully!")
        setTimeout(() => onOpenChange(false), 3000) // Close modal after 3 seconds
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.message || "Failed to submit quote request. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setStatusMessage("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-white p-0 rounded-lg shadow-xl">
        <DialogHeader className="p-6 pb-4 bg-royal-blue text-white rounded-t-lg">
          <DialogTitle className="text-2xl font-bold font-sans">{formDataLabels.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <Label htmlFor="fullName" className="text-gray-700">
                {formDataLabels.fullNameLabel} <span className="text-royal-gold">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                placeholder={formDataLabels.fullNamePlaceholder}
                disabled={isSubmitting}
                className={`mt-1 ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-royal-gold"}`}
                required
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-700">
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
                className={`mt-1 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-royal-gold"}`}
                required
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700">
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
                className={`mt-1 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-royal-gold"}`}
                required
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="eventType" className="text-gray-700">
                {formDataLabels.eventTypeLabel} <span className="text-royal-gold">*</span>
              </Label>
              <Input
                id="eventType"
                name="eventType"
                value={formValues.eventType}
                onChange={handleChange}
                placeholder="Event Type"
                disabled={isSubmitting}
                className={`mt-1 ${errors.eventType ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-royal-gold"}`}
                required
              />
              {errors.eventType && <p className="mt-1 text-xs text-red-500">{errors.eventType}</p>}
            </div>
            <div>
              <Label htmlFor="estimatedBudget" className="text-gray-700">
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
                className={`mt-1 ${errors.estimatedBudget ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-royal-gold"}`}
                required
                min="0"
              />
              {errors.estimatedBudget && <p className="mt-1 text-xs text-red-500">{errors.estimatedBudget}</p>}
            </div>
            <div>
              <Label htmlFor="details" className="text-gray-700">
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
                className={`mt-1 resize-none ${errors.details ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-royal-gold"}`}
                required
              />
              {errors.details && <p className="mt-1 text-xs text-red-500">{errors.details}</p>}
            </div>

            {submitStatus === "success" && (
              <div
                className="text-sm text-green-600 p-4 bg-green-50 rounded-md border border-green-200 animate-fadeIn"
                role="alert"
              >
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle size={18} className="mr-2" />
                  <p className="font-medium">Quote Request Submitted Successfully!</p>
                </div>
                <p>{statusMessage}</p>
                <p className="text-xs mt-2 text-green-700">
                  📧 You'll receive a confirmation email shortly. We'll contact you within 24 hours!
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div
                className="text-sm text-red-600 p-4 bg-red-50 rounded-md border border-red-200 animate-fadeIn"
                role="alert"
              >
                <div className="flex items-center justify-center mb-2">
                  <AlertCircle size={18} className="mr-2" />
                  <p className="font-medium">Quote Submission Failed</p>
                </div>
                <p>{statusMessage}</p>
                <p className="text-xs mt-2 text-red-700">📞 You can also call us directly at +250 788 123 456</p>
              </div>
            )}
          </div>
          <DialogFooter className="p-6 bg-gray-50 rounded-b-lg border-t">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="hover:bg-gray-100" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-royal-gold text-royal-blue font-semibold hover:bg-royal-gold/90 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                formDataLabels.submitButtonText
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
