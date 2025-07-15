"use client"

import type React from "react"

import { useEffect } from "react"

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Scroll to top on every page navigation
    window.scrollTo(0, 0)
  }, [])

  return <>{children}</>
}
