"use client"

import { useState } from "react"
import { testEmailConnection } from "@/src/actions/test-email"
import { sendFormEmail } from "@/src/actions/send-form-email"

export default function EmailTestComponent() {
  const [connectionResult, setConnectionResult] = useState<any>(null)
  const [formResult, setFormResult] = useState<any>(null)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [isTestingForm, setIsTestingForm] = useState(false)
  const [testEmail, setTestEmail] = useState("test@example.com")

  const runConnectionTest = async () => {
    setIsTestingConnection(true)
    setConnectionResult(null)

    try {
      const result = await testEmailConnection()
      setConnectionResult(result)
    } catch (error) {
      setConnectionResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  const runFormTest = async () => {
    setIsTestingForm(true)
    setFormResult(null)

    try {
      const testFormData = {
        name: "John Doe",
        email: testEmail,
        phone: "+250788123456",
        message: "This is a test form submission to verify the complete email flow works correctly.",
        destination: "Volcanoes National Park",
        tourType: "Gorilla Trekking",
        numberOfPeople: "2",
        preferredDate: "2024-07-15",
      }

      const result = await sendFormEmail({
        formType: "Contact Form",
        formData: testFormData,
        userEmail: testFormData.email,
        userName: testFormData.name,
      })

      setFormResult(result)
    } catch (error) {
      setFormResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsTestingForm(false)
    }
  }

  const TestResult = ({ title, result, icon }: { title: string; result: any; icon: string }) => {
    if (!result) return null

    return (
      <div
        className={`p-6 rounded-lg border-2 ${
          result.success ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">{result.success ? "✅" : "❌"}</span>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>

        <p className="mb-4">{result.message || (result.success ? "Test completed successfully!" : result.error)}</p>

        {result.emailId && (
          <div className="bg-white bg-opacity-50 p-3 rounded mb-4">
            <p className="text-sm">
              <strong>Email ID:</strong> <span className="font-mono">{result.emailId}</span>
            </p>
          </div>
        )}

        {result.adminEmailId && (
          <div className="bg-white bg-opacity-50 p-3 rounded mb-2">
            <p className="text-sm">
              <strong>Admin Email ID:</strong> <span className="font-mono">{result.adminEmailId}</span>
            </p>
          </div>
        )}

        {result.userEmailId && (
          <div className="bg-white bg-opacity-50 p-3 rounded mb-4">
            <p className="text-sm">
              <strong>User Email ID:</strong> <span className="font-mono">{result.userEmailId}</span>
            </p>
          </div>
        )}

        {result.details && (
          <details className="mt-4">
            <summary className="cursor-pointer font-medium mb-2">📊 Technical Details</summary>
            <div className="bg-gray-100 p-4 rounded text-xs font-mono overflow-auto">
              <pre>{JSON.stringify(result.details, null, 2)}</pre>
            </div>
          </details>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📧 Email System Test Suite</h1>
        <p className="text-gray-600">Test both basic email connectivity and complete form submission flow</p>
      </div>

      {/* Configuration Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-blue-900">🔧 Configuration Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span>API Key:</span>
            <span className={process.env.RESEND_API_KEY ? "text-green-600" : "text-red-600"}>
              {process.env.RESEND_API_KEY ? "✅ Configured" : "❌ Missing"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Environment:</span>
            <span className="font-mono">{process.env.NODE_ENV || "unknown"}</span>
          </div>
          <div className="flex justify-between">
            <span>Sender Domain:</span>
            <span className="font-mono text-blue-600">onboarding@resend.dev</span>
          </div>
          <div className="flex justify-between">
            <span>Admin Email:</span>
            <span className="font-mono text-blue-600">donkyleben@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Test Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Connection Test */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">🔌</span>
            <h3 className="text-lg font-semibold">Connection Test</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Tests basic Resend API connectivity and sends a simple test email.
          </p>
          <button
            onClick={runConnectionTest}
            disabled={isTestingConnection}
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isTestingConnection ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Testing...
              </span>
            ) : (
              "Test Connection"
            )}
          </button>
        </div>

        {/* Form Submission Test */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">📝</span>
            <h3 className="text-lg font-semibold">Form Submission Test</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Tests complete form submission flow with both admin and user emails.
          </p>

          <div className="mb-4">
            <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Test User Email:
            </label>
            <input
              type="email"
              id="testEmail"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email to receive confirmation"
            />
          </div>

          <button
            onClick={runFormTest}
            disabled={isTestingForm || !testEmail}
            className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isTestingForm ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Testing Form...
              </span>
            ) : (
              "Test Form Submission"
            )}
          </button>
        </div>
      </div>

      {/* Test Results */}
      <div className="space-y-6">
        <TestResult title="Connection Test Result" result={connectionResult} icon="🔌" />
        <TestResult title="Form Submission Test Result" result={formResult} icon="📝" />
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800">📋 Testing Instructions</h3>
        <div className="space-y-4 text-sm text-yellow-700">
          <div>
            <h4 className="font-semibold mb-2">🔌 Connection Test:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Tests basic Resend API connectivity</li>
              <li>Sends a simple test email to donkyleben@gmail.com</li>
              <li>Verifies your API key is working</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">📝 Form Submission Test:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Tests the complete form submission email flow</li>
              <li>Sends admin notification to donkyleben@gmail.com</li>
              <li>Sends user confirmation to the email you specify</li>
              <li>Uses realistic form data (contact form with tour details)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">✅ What to Check:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Both tests show success status</li>
              <li>Email IDs are returned (proves emails were sent)</li>
              <li>Check donkyleben@gmail.com for admin notifications</li>
              <li>Check your test email for user confirmation</li>
              <li>Verify email formatting and content look professional</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">🚀 Setup Instructions</h3>
        <ol className="text-sm space-y-2 list-decimal list-inside text-gray-700">
          <li>
            Get your API key from{" "}
            <a
              href="https://resend.com/api-keys"
              target="_blank"
              className="text-blue-600 underline hover:text-blue-800"
              rel="noreferrer"
            >
              Resend Dashboard
            </a>
          </li>
          <li>Add RESEND_API_KEY to your environment variables</li>
          <li>Run both tests to verify functionality</li>
          <li>Check both admin and user email inboxes</li>
          <li>Once working, test actual form submissions on your website</li>
        </ol>
      </div>
    </div>
  )
}
