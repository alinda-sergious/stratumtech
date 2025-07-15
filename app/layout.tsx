// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"
import WhatsAppButton from "@/src/components/WhatsAppButton"
import BackToTopButton from "@/src/components/BackToTopButton"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-arizona",
})

export const metadata: Metadata = {
  title: "Stratum Tech U Ltd",
  description:
    "Get quality construction services at affordable costs ",

  icons: {
    icon: [
      "/logo2.jpg",
      { url: "/logo2.jpg", sizes: "16x16", type: "image/jpeg" },
      { url: "/logo2.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/logo2.jpg", sizes: "192x192", type: "image/jpeg" },
      { url: "/logo2.jpg", sizes: "512x512", type: "image/jpeg" }
    ],
    apple: "/logo2.jpg",
    other: {
      url: "/logo2.jpg",
      type: "image/jpeg"
    }
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#001934" }
  ],

  openGraph: {
    title: "Stratum Tech U Ltd",
    description:
      "Get quality construction services at affordable costs",
    url: "https://your-domain.com",
    siteName: "Stratum Tech",
    images: [
      {
        url: "/logo2.jpg",
        width: 512,
        height: 512,
        alt: "Stratum Tech U Ltd"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Stratum Tech U Ltd",
    description:
      "Get quality construction services at affordable costs",
    images: ["https://your-domain.com/logo2.jpg"],
    creator: "@yourTwitterHandle"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${playfair.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTopButton />
      </body>
    </html>
  )
}
