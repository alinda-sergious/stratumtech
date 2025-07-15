"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from '@/src/lib/supabase'
import AdminSidebar from '@/src/components/admin/AdminSidebar'
import AdminTopbar from '@/src/components/admin/AdminTopbar'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Session check error:', error)
          // If there's an auth error, redirect to login
          router.replace("/admin/login")
          return
        }
        if (!data.session) {
          router.replace("/admin/login")
        } else {
          setChecking(false)
        }
      } catch (error) {
        console.error('Authentication error:', error)
        // If there's a network or other error, still redirect to login
        router.replace("/admin/login")
      }
    }
    checkSession()
  }, [router])

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-[#001934]">Checking authentication...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminTopbar />
      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 