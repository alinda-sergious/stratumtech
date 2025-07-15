import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Utility function for uploading project images to the ongoing-projects bucket
export async function uploadProjectImage(file: File, fileName: string) {
  const filePath = `projects/${fileName}`
  
  const { data, error } = await supabase.storage
    .from('ongoing-projects')
    .upload(filePath, file)
    
  if (error) {
    console.error('Upload error:', error)
    throw error
  }
  
  const { data: publicUrlData } = supabase.storage
    .from('ongoing-projects')
    .getPublicUrl(filePath)
    
  return publicUrlData.publicUrl
}

// Utility function for deleting project images from the ongoing-projects bucket
export async function deleteProjectImage(filePath: string) {
  const { error } = await supabase.storage
    .from('ongoing-projects')
    .remove([filePath])
    
  if (error) {
    console.error('Delete error:', error)
    throw error
  }
} 