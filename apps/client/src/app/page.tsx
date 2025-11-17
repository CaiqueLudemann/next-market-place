export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Marketplace</h1>
        <p className="text-lg text-gray-600 mb-8">
          A production-ready white-label marketplace built with Next.js 16
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/shop"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Shop 123
          </a>
          <a
            href="/admin"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </main>
  )
}
