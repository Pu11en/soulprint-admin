import { getProfiles } from './lib/supabase'
import SearchFilter from './components/SearchFilter'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const profiles = await getProfiles()
  const activeProfiles = profiles.filter(p => p.total_messages > 0)
  
  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">🧠 SoulPrint Admin</h1>
      <p className="text-gray-400 mb-8">
        View all user soulprints • {activeProfiles.length} active user{activeProfiles.length !== 1 ? 's' : ''} • {profiles.length} total
      </p>
      
      <SearchFilter profiles={activeProfiles} />
      
      <footer className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-600 text-sm">
        SoulPrint Admin Dashboard
      </footer>
    </main>
  )
}
