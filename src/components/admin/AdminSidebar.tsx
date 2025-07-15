"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Car, 
  Calendar, 
  Building, 
  Users, 
  Settings,
  LogOut,
  MapPin,
  TrendingUp,
  DollarSign
} from "lucide-react"
import { supabase } from '@/src/lib/supabase'
import { useRouter } from "next/navigation"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Team Members", href: "/admin/team-members", icon: Calendar },
    { name: "Partners", href: "/admin/partners", icon: Users },
    { name: "Homepage", href: "/admin/homepage", icon: TrendingUp },
    
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <div className="w-64 bg-[#001934] text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-[#B8860B]">Stratum Tech</h1>
        <p className="text-sm text-gray-400 mt-1">Construction Admin</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#B8860B] text-[#001934]"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
} 