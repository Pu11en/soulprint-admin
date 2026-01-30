'use client'

import { UserProfile } from '../lib/supabase'

interface Props {
  profile: UserProfile
}

export default function ExportButton({ profile }: Props) {
  const handleExport = () => {
    const exportData = {
      id: profile.id,
      user_id: profile.user_id,
      ai_name: profile.ai_name,
      total_messages: profile.total_messages,
      total_conversations: profile.total_conversations,
      soulprint: profile.soulprint,
      soulprint_text: profile.soulprint_text,
      created_at: profile.created_at,
      exported_at: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `soulprint-${profile.ai_name || profile.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-medium rounded-lg transition-colors flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export JSON
    </button>
  )
}
