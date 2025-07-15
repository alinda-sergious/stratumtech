import { useState, useEffect } from 'react'
import { supabase } from './supabase'

// Types for database data
export interface Tour {
  id: string
  title: string
  short_description: string
  long_description: string
  main_image: string
  gallery_images: string[]
  price_per_person?: string
  duration: string
  destination: string
  category?: string
  itinerary: any[]
  included: string[]
  excluded: string[]
  is_active?: boolean
  created_at?: string
}

export interface Car {
  id: string
  name: string
  short_description: string
  detailed_description: string
  main_image: string
  gallery_images: string[]
  price_per_day: string
  capabilities: any[]
  specifications: any
  is_active?: boolean
  created_at?: string
}

export interface Accommodation {
  id: string
  type: string
  name: string
  description: string
  location: string
  rating?: number
  images: string[]
  is_active?: boolean
  created_at?: string
}

export interface RealEstateDeal {
  id: string
  title: string
  short_description: string
  detailed_description: string
  main_image_url: string
  gallery_images: string[]
  property_type: string
  year_built: number
  number_of_floors: number
  primary_color: string
  number_of_entrances: number
  air_system: string
  energy_source: string
  security_system: string
  price: string
  location: string
  is_featured: boolean
  is_active: boolean
  created_at?: string
}

export interface OngoingProject {
  id: string
  title: string
  short_description: string
  long_description: string
  main_image: string
  gallery_images: string[]
  price_per_person: number
  duration: string
  destination: string
  category: string
  itinerary: any[]
  included: string[]
  excluded: string[]
  is_active: boolean
  created_at?: string
}

export interface SurveyBOQ {
  id: string
  title: string
  short_description: string
  long_description: string
  main_image: string
  gallery_images: string[]
  price_per_person: string
  duration: string
  destination: string
  category: string
  itinerary: any[]
  included: string[]
  excluded: string[]
  project_type: string
  total_area: number
  total_cost: number
  currency: string
  survey_report: string
  boq_details: any
  materials_list: any
  labor_costs: any
  equipment_costs: any
  contingency_percentage: number
  is_active: boolean
  is_featured: boolean
  created_at?: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  imageUrl: string
  experienceDescription: string
  email: string
  is_active?: boolean
  created_at?: string
}

export interface FeaturedService {
  id: string
  title: string
  description: string
  image_url: string
  cta_text: string
  cta_link: string
  service_id: string
  is_active: boolean
  created_at?: string
}

// Database hooks
export function useTours() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTours() {
      try {
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setTours(data || [])
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching tours:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  return { tours, loading, error }
}

export function useCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setCars(data || [])
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching cars:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return { cars, loading, error }
}

export function useAccommodations() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const { data, error } = await supabase
          .from('accommodations')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setAccommodations(data || [])
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching accommodations:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAccommodations()
  }, [])

  return { accommodations, loading, error }
}

export function useRealEstateDeals() {
  const [deals, setDeals] = useState<RealEstateDeal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDeals() {
      try {
        const { data, error } = await supabase
          .from('real_estate_deals')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setDeals(data || [])
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching real estate deals:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  return { deals, loading, error }
}

export function useOngoingProjects() {
  const [projects, setProjects] = useState<OngoingProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('ongoing_projects')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setProjects(data || [])
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching ongoing projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}

export function useSurveyBOQs() {
  const [surveyBOQs, setSurveyBOQs] = useState<SurveyBOQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSurveyBOQs() {
      try {
        const { data, error } = await supabase
          .from('survey_boqs')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setSurveyBOQs(data || [])
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching survey BOQs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSurveyBOQs()
  }, [])

  return { surveyBOQs, loading, error }
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setTeamMembers(data || [])
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching team members:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  return { teamMembers, loading, error }
}

export function useFeaturedServices() {
  const [services, setServices] = useState<FeaturedService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('featured_services')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        setServices(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured services')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return { services, loading, error }
}

// Dashboard counts hook
export function useDashboardCounts() {
  const [counts, setCounts] = useState({
    ongoingProjects: 0,
    realEstateDeals: 0,
    featuredServices: 0,
    teamMembers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [
          { count: ongoingProjects },
          { count: realEstateDeals },
          { count: featuredServices },
          { count: teamMembers }
        ] = await Promise.all([
          supabase.from('ongoing_projects').select('*', { count: 'exact', head: true }),
          supabase.from('real_estate_deals').select('*', { count: 'exact', head: true }),
          supabase.from('featured_services').select('*', { count: 'exact', head: true }),
          supabase.from('team_members').select('*', { count: 'exact', head: true }),
        ])

        setCounts({
          ongoingProjects: ongoingProjects ?? 0,
          realEstateDeals: realEstateDeals ?? 0,
          featuredServices: featuredServices ?? 0,
          teamMembers: teamMembers ?? 0,
        })
      } catch (error) {
        console.error('Error fetching counts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  return { counts, loading }
} 