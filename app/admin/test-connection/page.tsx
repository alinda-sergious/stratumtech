"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/src/lib/supabase"

export default function TestConnectionPage() {
  const [status, setStatus] = useState<string>("Testing connection...")
  const [session, setSession] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test basic connection
        setStatus("Testing Supabase connection...")
        
        // Test session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) {
          setError(`Session error: ${sessionError.message}`)
          setStatus("Failed")
          return
        }
        
        setSession(sessionData.session)
        
        if (sessionData.session) {
          setStatus("Connected with session")
        } else {
          setStatus("Connected without session")
        }
        
        // Test database connection
        const { data, error } = await supabase
          .from('team_members')
          .select('count')
          .limit(1)
        
        if (error) {
          setError(`Database error: ${error.message}`)
          setStatus("Database connection failed")
        } else {
          setStatus("All connections working")
        }
        
      } catch (err: any) {
        setError(`Connection error: ${err.message}`)
        setStatus("Connection failed")
      }
    }
    
    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="space-y-4">
        <div>
          <strong>Status:</strong> {status}
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {session && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>Session found:</strong> User ID: {session.user.id}
          </div>
        )}
        
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <strong>Environment Variables:</strong><br />
          NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing"}<br />
          NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing"}
        </div>
      </div>
    </div>
  )
} 