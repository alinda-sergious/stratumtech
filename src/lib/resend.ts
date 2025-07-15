import { Resend } from "resend"

// Check if API key exists
const apiKey = process.env.RESEND_API_KEY
if (!apiKey && process.env.NODE_ENV === "development") {
  console.warn("RESEND_API_KEY is not defined. Email functionality will not work.")
}

// Initialize Resend with API key
export const resend = new Resend(apiKey)

// Use Resend's default sender domain
export const DEFAULT_FROM_EMAIL = "onboarding@resend.dev"
export const ADMIN_EMAIL = "alindasergio@gmail.com"

// Email sending status check
export const isEmailConfigured = () => {
  return !!process.env.RESEND_API_KEY
}
