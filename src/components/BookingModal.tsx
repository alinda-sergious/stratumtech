"use client"

import type React from "react"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { sendFormEmail } from "@/src/actions/send-form-email"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  selectedItemName: string
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedItemName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        throw new Error("Please fill in all required fields")
      }

      // Prepare form data for email
      const emailData = {
        ...formData,
        selectedItem: selectedItemName,
        formType: "Booking Request",
      }

      // Send emails
      const result = await sendFormEmail({
        formType: "Booking Request",
        formData: emailData,
        userEmail: formData.email,
        userName: formData.name,
      })

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            `✅ Your booking request for "${selectedItemName}" has been submitted successfully! We'll contact you within 24 hours.`,
        })

        // Reset form and close modal after successful submission
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          })
          setSubmitStatus({ type: null, message: "" })
          onClose()
        }, 3000)
      } else {
        throw new Error(result.error || "Failed to submit booking request")
      }
    } catch (error) {
      console.error("Booking form submission error:", error)
      setSubmitStatus({
        type: "error",
        message: `❌ ${error instanceof Error ? error.message : "Failed to submit booking request"}. Please try again or contact us at +250 788 123 456.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white">
          <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900 p-4 border-b">
            Book {selectedItemName}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="p-4">
            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  submitStatus.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Your Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Phone Number"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed text-gray-600"
                  : "bg-[#B8860B] hover:bg-[#996f09] text-white shadow-md hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Booking Request</span>
              )}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default BookingModal
