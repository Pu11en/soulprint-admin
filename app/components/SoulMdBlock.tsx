'use client'

interface Props {
  content: string
}

export default function SoulMdBlock({ content }: Props) {
  // Simple syntax highlighting for markdown
  const highlighted = content
    .split('\n')
    .map((line, i) => {
      // Headers
      if (line.startsWith('# ')) {
        return <span key={i} className="text-orange-400 font-bold text-lg">{line}<br/></span>
      }
      if (line.startsWith('## ')) {
        return <span key={i} className="text-orange-300 font-semibold">{line}<br/></span>
      }
      if (line.startsWith('### ')) {
        return <span key={i} className="text-yellow-400 font-medium">{line}<br/></span>
      }
      // Bullet points
      if (line.match(/^[\-\*]\s/)) {
        return <span key={i} className="text-gray-300"><span className="text-orange-500">•</span>{line.slice(1)}<br/></span>
      }
      // Bold text
      if (line.includes('**')) {
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return (
          <span key={i}>
            {parts.map((part, j) => 
              part.startsWith('**') && part.endsWith('**') 
                ? <strong key={j} className="text-white">{part.slice(2, -2)}</strong>
                : <span key={j} className="text-gray-400">{part}</span>
            )}
            <br/>
          </span>
        )
      }
      // Code blocks
      if (line.startsWith('```')) {
        return <span key={i} className="text-purple-400">{line}<br/></span>
      }
      // Empty lines
      if (!line.trim()) {
        return <br key={i}/>
      }
      // Regular text
      return <span key={i} className="text-gray-400">{line}<br/></span>
    })
  
  return (
    <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <span className="text-sm text-gray-400 font-mono">SOUL.md</span>
        <span className="text-xs text-gray-600">{content.split('\n').length} lines</span>
      </div>
      <div className="p-4 font-mono text-sm overflow-auto max-h-[600px]">
        <code className="block">{highlighted}</code>
      </div>
    </div>
  )
}
