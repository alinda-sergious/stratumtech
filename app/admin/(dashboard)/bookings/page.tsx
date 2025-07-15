"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { CalendarDays, Mail, Phone, User, Car, Users, Info, CheckCircle, XCircle } from "lucide-react"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true)
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
      if (error) {
        setError("Failed to fetch bookings.")
      } else {
        setBookings(data || [])
      }
      setLoading(false)
    }
    fetchBookings()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#B8860B]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001934] to-[#B8860B]/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#001934] mb-10 text-center">All Bookings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-xl p-10 border-2 border-[#B8860B]/20 hover:border-[#B8860B] transition-all duration-200 relative flex flex-col min-h-[340px]"
            >
              <div className="flex items-center gap-3 mb-4">
                {booking.type === "car" ? <Car className="w-7 h-7 text-[#B8860B]" /> : <Users className="w-7 h-7 text-[#001934]" />}
                <span className="text-lg font-bold text-[#001934]">{booking.type === "car" ? "Car Rental" : "Tour"}</span>
                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${booking.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{booking.payment_status}</span>
              </div>
              <div className="mb-2 text-[#001934] font-semibold text-xl">{booking.item_name}</div>
              <div className="flex items-center gap-2 text-gray-700 mb-1"><User className="w-4 h-4" /> {booking.customer_name}</div>
              <div className="flex items-center gap-2 text-gray-700 mb-1"><Mail className="w-4 h-4" /> {booking.customer_email}</div>
              {booking.customer_phone && <div className="flex items-center gap-2 text-gray-700 mb-1"><Phone className="w-4 h-4" /> {booking.customer_phone}</div>}
              {booking.type === "car" && (
                <>
                  <div className="flex items-center gap-2 text-gray-700 mb-1"><Info className="w-4 h-4" /> <b>Days:</b> {booking.metadata?.days || "-"}</div>
                  <div className="flex items-center gap-2 text-gray-700 mb-1"><CalendarDays className="w-4 h-4" /> <b>Start:</b> {booking.metadata?.startDate || "-"}</div>
                </>
              )}
              {booking.type === "tour" && (
                <>
                  <div className="flex items-center gap-2 text-gray-700 mb-1"><Users className="w-4 h-4" /> <b>People:</b> {booking.people || "-"}</div>
                  <div className="flex items-center gap-2 text-gray-700 mb-1"><CalendarDays className="w-4 h-4" /> <b>Arrival:</b> {booking.arrival_date || "-"}</div>
                </>
              )}
              <div className="flex items-center gap-2 text-gray-700 mb-1"><CheckCircle className="w-4 h-4 text-green-500" /> <b>Deposit Paid:</b> ${((booking.amount_paid ?? 0) / 100).toFixed(2)}</div>
              <div className="flex items-center gap-2 text-gray-700 mb-1"><CalendarDays className="w-4 h-4" /> <b>Booked:</b> {new Date(booking.created_at).toLocaleString()}</div>
              {booking.message && (
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3 text-left text-sm">
                  <b>Message:</b> {booking.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 