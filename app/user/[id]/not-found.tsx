import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="p-8 max-w-5xl mx-auto text-center">
      <h1 className="text-6xl font-bold text-orange-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Soulprint Not Found</h2>
      <p className="text-gray-500 mb-8">
        The user profile you're looking for doesn't exist or has been removed.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-medium rounded-lg transition-colors inline-block"
      >
        ← Back to Dashboard
      </Link>
    </main>
  )
}
