"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Facebook, Instagram, Twitter } from "lucide-react"
import PlanTripForm from "./PlanTripForm"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isPlanTripOpen, setIsPlanTripOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleMenu = () => setIsOpen(!isOpen)

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/UpcomingEvent", label: "Construction" },
    { href: "/contact", label: "Contact Us" },
  ]

  const serviceLinks = [
    
    { href: "/services/event-management", label: "Project Management and Supervision" },
    { href: "/services/tours", label: "Surveying and BOQs" },
    { href: "/services/accommodation", label: "Property Management" },
  ]

  return (
    <>
      {/* Fixed Navbar - Always visible */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#001934] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center h-12">
              <Image src="/logo2.jpg" alt="Stratum Tech U Ltd Logo" width={48} height={48} className="mr-2 h-12 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors duration-200 hover:underline underline-offset-4 ${
                    isActiveLink(link.href) ? "text-[#B8860B]" : "text-white hover:text-[#B8860B]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Services Dropdown - Main link is now clickable */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className={`transition-colors duration-200 font-medium flex items-center space-x-1 group ${
                    isActiveLink("/services") ? "text-[#B8860B]" : "text-white hover:text-[#B8860B]"
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-56 bg-[#001934]/95 backdrop-blur-sm border border-[#B8860B]/20 rounded-lg shadow-xl transition-all duration-200 ${
                    isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="py-2">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2 transition-colors duration-200 ${
                          isActiveLink(link.href)
                            ? "text-[#B8860B] bg-[#B8860B]/10"
                            : "text-white hover:text-[#B8860B] hover:bg-[#B8860B]/10"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Plan Your Trip Button */}
              <button
                onClick={() => setIsPlanTripOpen(true)}
                className="bg-[#B8860B] hover:bg-[#996f09] text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <span>Make Appointment</span>
              </button>
            </div>

            {/* Desktop Social Icons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="https://www.facebook.com/share/1B4ricfjg6/?mibextid=wwXIfr" className="text-white hover:text-[#B8860B] transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/stratum_tech?igsh=NnQ5M2o1aXRocHV6&utm_source=qr" className="text-white hover:text-[#B8860B] transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://x.com/amzan85?s=11" className="text-white hover:text-[#B8860B] transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Menu Button - Always visible */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-[#B8860B] hover:text-[#B8860B]/80 transition-colors duration-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Separate from navbar */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#001934] z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col h-full px-6 py-8 space-y-6 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className={`text-xl font-medium transition-colors duration-200 ${
                isActiveLink(link.href) ? "text-[#B8860B]" : "text-white hover:text-[#B8860B]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Services - Main link clickable */}
          <div className="space-y-4">
            <Link
              href="/services"
              onClick={toggleMenu}
              className={`text-xl font-medium transition-colors duration-200 ${
                isActiveLink("/services") ? "text-[#B8860B]" : "text-white hover:text-[#B8860B]"
              }`}
            >
              Services
            </Link>
            <div className="pl-4 space-y-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className={`block text-lg transition-colors duration-200 ${
                    isActiveLink(link.href) ? "text-[#B8860B]" : "text-white/80 hover:text-[#B8860B]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Plan Your Trip Button */}
          <button
            onClick={() => {
              setIsPlanTripOpen(true)
              toggleMenu()
            }}
            className="bg-[#B8860B] hover:bg-[#996f09] text-white px-4 py-3 rounded-md font-medium transition-colors duration-200 text-left"
          >
            Make Appointment
          </button>

          {/* Mobile Social Icons */}
          <div className="flex items-center space-x-6 pt-8">
            <a href="https://www.facebook.com/share/1B4ricfjg6/?mibextid=wwXIfr" className="text-white hover:text-[#B8860B] transition-colors duration-200">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/stratum_tech?igsh=NnQ5M2o1aXRocHV6&utm_source=qr" className="text-white hover:text-[#B8860B] transition-colors duration-200">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://x.com/amzan85?s=11" className="text-white hover:text-[#B8860B] transition-colors duration-200">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Plan Trip Form */}
      <PlanTripForm isOpen={isPlanTripOpen} onClose={() => setIsPlanTripOpen(false)} />
    </>
  )
}
