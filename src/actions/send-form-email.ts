"use server"

import { resend, DEFAULT_FROM_EMAIL, ADMIN_EMAIL } from "@/src/lib/resend"

interface SendFormEmailProps {
  formType: string
  formData: Record<string, any>
  userEmail: string
  userName: string
}

export async function sendFormEmail({ formType, formData, userEmail, userName }: SendFormEmailProps) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error("RESEND_API_KEY is not defined")
    return {
      success: false,
      error: "Email service not configured",
      emailSent: false,
      message:
        "Your form has been submitted, but email notifications are not configured. Our team will contact you soon.",
    }
  }

  try {
    console.log(`Sending ${formType} emails using default Resend domain...`)

    const submittedAt = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    })

    // Create admin notification email
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New ${formType} Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #001934 0%, #B8860B 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🏗️ Stratum Tech</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">New ${formType} Submission</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #001934; margin-top: 0;">📋 Contact Information</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${userName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ""}
          </div>
          
          <h2 style="color: #001934;">📝 Form Details</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${Object.entries(formData)
              .map(([key, value]) => `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`)
              .join("")}
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1565c0;"><strong>📅 Submitted:</strong> ${submittedAt}</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Create user confirmation email
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You - Stratum Tech Ug Ltd</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #001934 0%, #B8860B 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🏗️ Stratum Tech Ug Ltd</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Thank You for Your Submission</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #001934; margin-top: 0;">Dear ${userName},</h2>
          <p>Thank you for your <strong>${formType.toLowerCase()}</strong> submission. We have received your message and appreciate your interest in Stratum Tech Ug Ltd.</p>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #4caf50;">
            <h3 style="margin-top: 0; color: #2e7d32;">🚀 What happens next?</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Our expert team will review your submission carefully</li>
              <li>We'll contact you within <strong>24 hours</strong></li>
              <li>You'll receive a personalized response via email or phone</li>
              <li>We'll help you achieve your construction goals</li>
            </ul>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ddd;">
            <h3 style="margin-top: 0; color: #001934;">📞 Need immediate assistance?</h3>
            <p style="margin: 5px 0;">Phone: +256 705 515 552</p>
            <p style="margin: 5px 0;">Email: info@stratumtechug.com</p>
            <p style="margin: 5px 0;">WhatsApp: +256 705 515 552</p>
          </div>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>The Stratum Tech Ug Ltd Team</strong></p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            This confirmation email was sent on ${submittedAt}
          </p>
        </div>
      </body>
      </html>
    `

    // Send admin notification
    console.log("Sending admin notification...")
    const adminResult = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🏔️ New ${formType} Submission from ${userName}`,
      html: adminEmailHtml,
    })

    console.log("Admin email sent:", adminResult)

    // Send user confirmation
    console.log("Sending user confirmation...")
    const userResult = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: userEmail,
      subject: `Thank you for your ${formType} submission - Stratum Tech Ug Ltd`,
      html: userEmailHtml,
    })

    console.log("User email sent:", userResult)

    return {
      success: true,
      adminEmailId: adminResult.data?.id,
      userEmailId: userResult.data?.id,
      emailSent: true,
      message:
        "✅ Your form has been submitted successfully! We've sent you a confirmation email and our team will contact you soon.",
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
      emailSent: false,
      message:
        "Your form has been submitted, but we couldn't send confirmation emails. Our team will contact you soon.",
    }
  }
}
