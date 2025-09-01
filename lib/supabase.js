// Supabase client setup (PostgreSQL  FREE)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database operations
export async function getAllSchools() {
  const { data, error } = await supabase
    .from('schools')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching schools:', error)
    return { success: false, error: error.message }
  }
  
  return { success: true, data }
}

export async function addSchool(schoolData) {
  const { data, error } = await supabase
    .from('schools')
    .insert([schoolData])
    .select()
  
  if (error) {
    console.error('Error adding school:', error)
    return { success: false, error: error.message }
  }
  
  return { success: true, data: data[0] }
}