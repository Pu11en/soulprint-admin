import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://swvljsixpvvcirjmflze.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dmxqc2l4cHZ2Y2lyam1mbHplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzU2OTEzNCwiZXhwIjoyMDgzMTQ1MTM0fQ.2XRSViXVJbn_sVcxL3keP5ZIDlz3Ge4MFQOkilV6Q48'
)

interface UserProfile {
  id: string
  user_id: string
  ai_name: string | null
  total_messages: number
  total_conversations: number
  soulprint_text: string | null
  soulprint: any
  created_at: string
}

async function getProfiles(): Promise<UserProfile[]> {
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

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const profiles = await getProfiles()
  const activeProfiles = profiles.filter(p => p.total_messages > 0)
  
  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">🧠 SoulPrint Admin</h1>
      <p className="text-gray-400 mb-8">View all user soulprints • {activeProfiles.length} active users</p>
      
      <div className="grid gap-6">
        {activeProfiles.length === 0 ? (
          <div className="bg-zinc-900 rounded-lg p-8 text-center">
            <p className="text-gray-400">No soulprints yet. Users need to import their data.</p>
          </div>
        ) : (
          activeProfiles.map((profile) => (
            <div key={profile.id} className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-orange-400">
                    {profile.ai_name || 'Unnamed AI'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {profile.total_messages.toLocaleString()} messages • {profile.total_conversations.toLocaleString()} conversations
                  </p>
                </div>
                <span className="text-xs text-gray-600">
                  {new Date(profile.created_at).toLocaleDateString()}
                </span>
              </div>
              
              {profile.soulprint_text ? (
                <div className="bg-black rounded p-4 font-mono text-sm overflow-auto max-h-96">
                  <pre className="whitespace-pre-wrap text-gray-300">{profile.soulprint_text}</pre>
                </div>
              ) : profile.soulprint ? (
                <div className="space-y-3">
                  {profile.soulprint.interests && (
                    <div>
                      <span className="text-gray-500 text-sm">Interests:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.soulprint.interests.map((interest: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile.soulprint.facts && profile.soulprint.facts.length > 0 && (
                    <div>
                      <span className="text-gray-500 text-sm">Key Facts:</span>
                      <ul className="mt-1 space-y-1">
                        {profile.soulprint.facts.slice(0, 5).map((fact: string, i: number) => (
                          <li key={i} className="text-sm text-gray-400">• {fact}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {profile.soulprint.aiPersona && (
                    <div>
                      <span className="text-gray-500 text-sm">AI Persona:</span>
                      <p className="text-sm text-gray-400 mt-1">
                        Tone: {profile.soulprint.aiPersona.tone} • 
                        Style: {profile.soulprint.aiPersona.style} • 
                        Humor: {profile.soulprint.aiPersona.humor}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No soulprint data</p>
              )}
            </div>
          ))
        )}
      </div>
      
      <footer className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-600 text-sm">
        SoulPrint Admin • {profiles.length} total users
      </footer>
    </main>
  )
}
