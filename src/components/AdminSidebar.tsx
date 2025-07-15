"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Car,
  Calendar,
  Home,
  Settings,
  Users,
  FileText,
  Handshake,
  Wrench,
  MapPin,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Ongoing Projects", href: "/admin/ongoing-projects", icon: Building2 },
  { name: "Real Estate Deals", href: "/admin/real-estate-deals", icon: Car },
  { name: "Featured Services", href: "/admin/featured-services", icon: Wrench },
  { name: "Team Members", href: "/admin/team-members", icon: Users },
  { name: "Partners", href: "/admin/partners", icon: Handshake },
  { name: "Homepage Video", href: "/admin/homepage-video", icon: Home },
  { name: "Survey & BOQs", href: "/admin/survey-boqs", icon: FileText },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Test Connection", href: "/admin/test-connection", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    // Add sign out logic here
    console.log("Sign out clicked")
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white border-gray-200"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#001934]">
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-white">Stratum Tech Admin</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        isActive
                          ? "bg-[#B8860B] text-[#001934]"
                          : "text-gray-300 hover:bg-[#B8860B]/20 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon
                        className={cn(
                          isActive ? "text-[#001934]" : "text-gray-400 group-hover:text-gray-300",
                          "mr-3 flex-shrink-0 h-5 w-5"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full text-white border-gray-600 hover:bg-[#B8860B] hover:text-[#001934]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-[#001934]">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">Stratum Tech Admin</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? "bg-[#B8860B] text-[#001934]"
                        : "text-gray-300 hover:bg-[#B8860B]/20 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? "text-[#001934]" : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 flex-shrink-0 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full text-white border-gray-600 hover:bg-[#B8860B] hover:text-[#001934]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 