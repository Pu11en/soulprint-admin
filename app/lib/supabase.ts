import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://swvljsixpvvcirjmflze.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dmxqc2l4cHZ2Y2lyam1mbHplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzU2OTEzNCwiZXhwIjoyMDgzMTQ1MTM0fQ.2XRSViXVJbn_sVcxL3keP5ZIDlz3Ge4MFQOkilV6Q48'
)

export interface UserProfile {
  id: string
  user_id: string
  ai_name: string | null
  total_messages: number
  total_conversations: number
  soulprint_text: string | null
  soulprint: any
  created_at: string
  updated_at?: string
}

export async function getProfiles(): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('total_messages', { ascending: false })
  
  if (error) {
    console.error('Error fetching profiles:', error)
    return []
  }
  return data || []
}

export async function getProfileById(id: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }
  return data
}
