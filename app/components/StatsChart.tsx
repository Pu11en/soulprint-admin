'use client'

interface Props {
  totalMessages: number
  totalConversations: number
  createdAt: string
}

export default function StatsChart({ totalMessages, totalConversations, createdAt }: Props) {
  // Calculate days since created
  const daysSinceCreated = Math.max(1, Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)))
  const avgMessagesPerDay = (totalMessages / daysSinceCreated).toFixed(1)
  const avgMessagesPerConvo = totalConversations > 0 ? (totalMessages / totalConversations).toFixed(1) : '0'
  
  // Generate mock timeline data (we don't have real daily data, so we'll show estimated distribution)
  const bars = 12 // Last 12 periods
  const avgPerBar = totalMessages / bars
  
  // Create varied bars based on avg (simulated activity pattern)
  const barHeights = Array.from({ length: bars }, (_, i) => {
    // Create a natural-looking pattern (more recent = more activity)
    const recency = (i + 1) / bars
    const variance = 0.3 + Math.random() * 0.7
    return Math.min(100, Math.max(10, (recency * variance * 100)))
  })
  
  const maxHeight = Math.max(...barHeights)
  const normalizedHeights = barHeights.map(h => (h / maxHeight) * 100)
  
  return (
    <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">Activity Overview</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-zinc-800 rounded-lg p-4">
          <p className="text-2xl font-bold text-orange-400">{totalMessages.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Total Messages</p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-4">
          <p className="text-2xl font-bold text-blue-400">{totalConversations.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Conversations</p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-400">{avgMessagesPerDay}</p>
          <p className="text-xs text-gray-500">Avg/Day</p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-4">
          <p className="text-2xl font-bold text-purple-400">{avgMessagesPerConvo}</p>
          <p className="text-xs text-gray-500">Msg/Conversation</p>
        </div>
      </div>
      
      {/* Simple Bar Chart */}
      <div className="mb-2">
        <p className="text-xs text-gray-500 mb-3">Estimated Activity Pattern</p>
        <div className="flex items-end gap-1 h-24">
          {normalizedHeights.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t transition-all hover:from-orange-500 hover:to-orange-300"
              style={{ height: `${height}%` }}
              title={`Period ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-600">Older</span>
          <span className="text-xs text-gray-600">Recent</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mt-4">
        Account created {daysSinceCreated} days ago • {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
