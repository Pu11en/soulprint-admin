'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { UserProfile } from '../lib/supabase'

interface Props {
  profiles: UserProfile[]
}

export default function SearchFilter({ profiles }: Props) {
  const [search, setSearch] = useState('')
  
  const filtered = useMemo(() => {
    if (!search.trim()) return profiles
    const q = search.toLowerCase()
    return profiles.filter(p => 
      (p.ai_name?.toLowerCase().includes(q)) ||
      (p.user_id?.toLowerCase().includes(q))
    )
  }, [profiles, search])
  
  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by AI name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
        />
        {search && (
          <p className="text-sm text-gray-500 mt-2">
            Found {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      
      {/* Profile Cards */}
      <div className="grid gap-6">
        {filtered.length === 0 ? (
          <div className="bg-zinc-900 rounded-lg p-8 text-center">
            <p className="text-gray-400">
              {search ? 'No soulprints match your search.' : 'No soulprints yet.'}
            </p>
          </div>
        ) : (
          filtered.map((profile) => (
            <Link 
              href={`/user/${profile.id}`}
              key={profile.id} 
              className="block bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-orange-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-orange-400">
                    {profile.ai_name || 'Unnamed AI'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {profile.total_messages.toLocaleString()} messages • {profile.total_conversations.toLocaleString()} conversations
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-600">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                  <div className="mt-1">
                    <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Preview */}
              {profile.soulprint_text ? (
                <div className="bg-black rounded p-3 font-mono text-xs overflow-hidden max-h-24">
                  <pre className="whitespace-pre-wrap text-gray-400 line-clamp-3">
                    {profile.soulprint_text.slice(0, 300)}...
                  </pre>
                </div>
              ) : profile.soulprint?.interests ? (
                <div className="flex flex-wrap gap-2">
                  {profile.soulprint.interests.slice(0, 5).map((interest: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-sm text-gray-300">
                      {interest}
                    </span>
                  ))}
                  {profile.soulprint.interests.length > 5 && (
                    <span className="px-2 py-1 text-sm text-gray-500">
                      +{profile.soulprint.interests.length - 5} more
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Click to view details</p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
