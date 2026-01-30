import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProfileById } from '../../lib/supabase'
import SoulMdBlock from '../../components/SoulMdBlock'
import ExportButton from '../../components/ExportButton'
import StatsChart from '../../components/StatsChart'

export const revalidate = 60

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UserPage({ params }: PageProps) {
  const { id } = await params
  const profile = await getProfileById(id)
  
  if (!profile) {
    notFound()
  }
  
  return (
    <main className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/"
          className="text-gray-500 hover:text-orange-400 transition-colors text-sm mb-4 inline-block"
        >
          ← Back to all soulprints
        </Link>
        
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-orange-400">
              {profile.ai_name || 'Unnamed AI'}
            </h1>
            <p className="text-gray-500 mt-1">
              User ID: <code className="text-gray-400 bg-zinc-800 px-2 py-0.5 rounded text-sm">{profile.user_id}</code>
            </p>
          </div>
          <ExportButton profile={profile} />
        </div>
      </div>
      
      {/* Stats Chart */}
      <div className="mb-8">
        <StatsChart 
          totalMessages={profile.total_messages}
          totalConversations={profile.total_conversations}
          createdAt={profile.created_at}
        />
      </div>
      
      {/* SOUL.md Block */}
      {profile.soulprint_text && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Raw SOUL.md</h2>
          <SoulMdBlock content={profile.soulprint_text} />
        </div>
      )}
      
      {/* Structured Soulprint Data */}
      {profile.soulprint && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Structured Data</h2>
          
          <div className="space-y-6">
            {/* Interests */}
            {profile.soulprint.interests && profile.soulprint.interests.length > 0 && (
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-lg font-medium text-orange-300 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.soulprint.interests.map((interest: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-gray-300">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Facts */}
            {profile.soulprint.facts && profile.soulprint.facts.length > 0 && (
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-lg font-medium text-orange-300 mb-3">Key Facts</h3>
                <ul className="space-y-2">
                  {profile.soulprint.facts.map((fact: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* AI Persona */}
            {profile.soulprint.aiPersona && (
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-lg font-medium text-orange-300 mb-3">AI Persona Settings</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(profile.soulprint.aiPersona).map(([key, value]) => (
                    <div key={key} className="bg-zinc-800 rounded p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{key}</p>
                      <p className="text-gray-300 mt-1">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Communication Style */}
            {profile.soulprint.communicationStyle && (
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-lg font-medium text-orange-300 mb-3">Communication Style</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(profile.soulprint.communicationStyle).map(([key, value]) => (
                    <div key={key} className="bg-zinc-800 rounded p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{key}</p>
                      <p className="text-gray-300 mt-1">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Raw JSON Fallback */}
            {!profile.soulprint.interests && !profile.soulprint.facts && !profile.soulprint.aiPersona && (
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-lg font-medium text-orange-300 mb-3">Raw Soulprint Data</h3>
                <pre className="bg-black rounded p-4 overflow-auto text-sm text-gray-400">
                  {JSON.stringify(profile.soulprint, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Metadata */}
      <div className="mt-12 pt-8 border-t border-zinc-800">
        <h2 className="text-sm font-medium text-gray-500 mb-4">Metadata</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Profile ID</p>
            <p className="text-gray-400 font-mono text-xs break-all">{profile.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Created</p>
            <p className="text-gray-400">{new Date(profile.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Messages</p>
            <p className="text-gray-400">{profile.total_messages.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Conversations</p>
            <p className="text-gray-400">{profile.total_conversations.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
