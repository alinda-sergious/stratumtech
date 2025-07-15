"use client"

import { useState } from "react"
import PlanTripForm from "@/src/components/PlanTripForm"
import BookingModal from "@/src/components/BookingModal"
import ContactForm from "@/src/components/ContactForm"

export default function TestAllFormsPage() {
  const [isPlanTripOpen, setIsPlanTripOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")

  const handleOpenBookingModal = (itemName: string) => {
    setSelectedItem(itemName)
    setIsBookingModalOpen(true)
  }

  const testForms = [
    {
      name: "Contact Form",
      description: "Test the main contact form functionality",
      component: "contact-form",
      status: "✅ Enhanced",
    },
    {
      name: "Plan Trip Form",
      description: "Test the trip planning form with comprehensive details",
      component: "plan-trip",
      status: "✅ Enhanced",
    },
    {
      name: "Booking Modal",
      description: "Test booking requests for tours and cars",
      component: "booking-modal",
      status: "✅ Enhanced",
    },
    {
      name: "Tour Booking Form",
      description: "Test individual tour booking forms",
      component: "tour-booking",
      status: "✅ Enhanced",
    },
    {
      name: "Accommodation Booking",
      description: "Test hotel and apartment booking forms",
      component: "accommodation",
      status: "✅ Enhanced",
    },
    {
      name: "Event Quote Forms",
      description: "Test event management quote requests",
      component: "event-quotes",
      status: "✅ Enhanced",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#001934] mb-4">🧪 Stratum Tech - Form Testing Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive testing environment for all website forms with email notifications
          </p>
        </div>

        {/* Test Status Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#001934] mb-6">📋 Form Enhancement Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testForms.map((form, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#001934]">{form.name}</h3>
                  <span className="text-sm font-medium text-green-600">{form.status}</span>
                </div>
                <p className="text-sm text-gray-600">{form.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Testing Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Plan Trip Form Test */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-[#001934] mb-4">🗺️ Plan Trip Form Test</h3>
            <p className="text-gray-600 mb-6">
              Test the comprehensive trip planning form with all fields and email notifications.
            </p>
            <button
              onClick={() => setIsPlanTripOpen(true)}
              className="w-full bg-[#B8860B] hover:bg-[#996f09] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Open Plan Trip Form
            </button>
          </div>

          {/* Booking Modal Test */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-[#001934] mb-4">🎫 Booking Modal Test</h3>
            <p className="text-gray-600 mb-6">Test booking requests for tours and cars with email notifications.</p>
            <div className="space-y-3">
              <button
                onClick={() => handleOpenBookingModal("Gorilla Trekking Adventure")}
                className="w-full bg-[#001934] hover:bg-[#001934]/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Test Tour Booking
              </button>
              <button
                onClick={() => handleOpenBookingModal("Toyota Land Cruiser")}
                className="w-full bg-[#B8860B] hover:bg-[#996f09] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Test Car Booking
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form Test */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-[#001934] mb-6">📞 Contact Form Test</h3>
          <p className="text-gray-600 mb-6">
            Test the main contact form to verify email functionality is working correctly.
          </p>
          <ContactForm />
        </div>

        {/* Testing Checklist */}
        <div className="bg-gradient-to-r from-[#001934] to-[#B8860B] rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">✅ Testing Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">📧 Email Functionality:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Admin notifications sent to donkyleben@gmail.com</li>
                <li>• User confirmation emails delivered</li>
                <li>• Email templates properly formatted</li>
                <li>• All form data included in emails</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">🎯 User Experience:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Success messages displayed clearly</li>
                <li>• Error handling works properly</li>
                <li>• Loading states show during submission</li>
                <li>• Forms reset after successful submission</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12 p-6 bg-yellow-50 rounded-xl">
          <h4 className="font-semibold text-[#001934] mb-2">📞 Need Help?</h4>
          <p className="text-gray-600">
            If you encounter any issues during testing, contact us at:
            <br />
            <strong>Email:</strong> donkyleben@gmail.com | <strong>Phone:</strong> +250 788 123 456
          </p>
        </div>
      </div>

      {/* Form Modals */}
      <PlanTripForm isOpen={isPlanTripOpen} onClose={() => setIsPlanTripOpen(false)} />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedItemName={selectedItem}
      />
    </div>
  )
}
