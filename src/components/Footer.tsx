import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/UpcomingEvent", label: "Construction" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <footer className="bg-[#001934] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img
              src="/logo2.jpg"
              alt="Stratum Tech U Ltd Logo"
              className="h-16 lg:h-20 w-auto"
            />
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for all engineering services, that gives you a lasting quality product reliable in all seasons.
            </p>
            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://www.facebook.com/share/1B4ricfjg6/?mibextid=wwXIfr"
                className="text-white hover:text-[#B8860B] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/stratum_tech?igsh=NnQ5M2o1aXRocHV6&utm_source=qr"
                className="text-white hover:text-[#B8860B] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/amzan85?s=11"
                className="text-white hover:text-[#B8860B] transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-[#B8860B] text-xl font-bold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
                <a
                  href="tel:+250788547440"
                  className="text-gray-300 hover:text-[#B8860B] transition-colors duration-200"
                >
                  +256 705 515 552
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
                <a
                  href="mailto:Stratum.tech.ltd@gmail.com"
                  className="text-gray-300 hover:text-[#B8860B] transition-colors duration-200"
                >
                  Stratum.tech.ltd@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
  
                  <br />
                  Kampala, Uganda
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[#B8860B] text-xl font-bold">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-[#B8860B] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Stratum Tech U Ltd. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              Website by{" "}
            
    
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
