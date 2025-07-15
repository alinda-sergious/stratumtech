"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/src/lib/supabase"

export default function TestDBPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testTeamMembersTable()
  }, [])

  const testTeamMembersTable = async () => {
    try {
      console.log('Testing team_members table...')
      
      // First, let's check if the table exists
      const { data: tableData, error: tableError } = await supabase
        .from('team_members')
        .select('count')
        .limit(1)
      
      if (tableError) {
        console.error('Table error:', tableError)
        setError(`Table error: ${tableError.message}`)
        setLoading(false)
        return
      }

      console.log('Table exists, fetching data...')
      
      // Now fetch all data
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Fetch error:', error)
        setError(`Fetch error: ${error.message}`)
        setLoading(false)
        return
      }

      console.log('Team members data:', data)
      setTeamMembers(data || [])
    } catch (err) {
      console.error('General error:', err)
      setError(`General error: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Database Test - Team Members</h1>
        
        {loading && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            Loading...
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Team Members ({teamMembers.length})</h2>
            
            {teamMembers.length === 0 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                No team members found in the database. Please run the SQL script to create the table and insert sample data.
              </div>
            ) : (
              <div className="grid gap-4">
                {teamMembers.map((member, index) => (
                  <div key={member.id || index} className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                    <p className="text-sm text-gray-500">Image: {member.image_url}</p>
                    <p className="text-sm text-gray-500">Email: {member.email}</p>
                    <p className="text-sm text-gray-500">Active: {member.is_active ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 