"use server"

import { resend, DEFAULT_FROM_EMAIL, ADMIN_EMAIL } from "@/src/lib/resend"

export async function testEmailConnection() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return {
      success: false,
      error: "RESEND_API_KEY environment variable is not set",
      details: {
        hasApiKey: false,
        environment: process.env.NODE_ENV || "unknown",
        defaultSender: DEFAULT_FROM_EMAIL,
      },
    }
  }

  try {
    console.log("Testing email with default Resend domain:", DEFAULT_FROM_EMAIL)

    // Send a simple test email using Resend's default domain
    const result = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: "Stratum Tech - Email System Test",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Stratum Tech Email Test</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #001934 0%, #B8860B 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🏗️ Stratum Tech</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Email System Test</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #001934; margin-top: 0;">✅ Email Test Successful!</h2>
            <p>This test email confirms that the Stratum Tech email system is working correctly with Resend's default domain.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #B8860B;">
              <h3 style="margin-top: 0; color: #001934;">Test Details:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li><strong>Sent at:</strong> ${new Date().toLocaleString()}</li>
                <li><strong>Environment:</strong> ${process.env.NODE_ENV || "unknown"}</li>
                <li><strong>Sender:</strong> ${DEFAULT_FROM_EMAIL}</li>
                <li><strong>Recipient:</strong> ${ADMIN_EMAIL}</li>
              </ul>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>🎉 Success!</strong> Your email configuration is working properly.</p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 0;">
              This email was sent automatically by the Stratum Tech email testing system.
            </p>
          </div>
        </body>
        </html>
      `,
    })

    console.log("Email sent successfully:", result)

    return {
      success: true,
      emailId: result.id,
      message: "Test email sent successfully! Check donkyleben@gmail.com for the test email.",
      details: {
        hasApiKey: true,
        apiKeyLength: apiKey.length,
        environment: process.env.NODE_ENV || "unknown",
        emailId: result.id,
        sender: DEFAULT_FROM_EMAIL,
        recipient: ADMIN_EMAIL,
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Email test error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      details: {
        hasApiKey: true,
        apiKeyLength: apiKey.length,
        environment: process.env.NODE_ENV || "unknown",
        errorType: error instanceof Error ? error.constructor.name : "Unknown",
        sender: DEFAULT_FROM_EMAIL,
        timestamp: new Date().toISOString(),
      },
    }
  }
}
