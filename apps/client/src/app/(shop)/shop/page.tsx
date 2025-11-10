export default function ShopPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Shop</h1>
        <p className="text-lg text-gray-600">
          Browse our products. This is a placeholder - you&apos;ll implement the features using TDD.
        </p>
      </div>

      {/* Placeholder for product grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 h-48 rounded-md mb-4" />
            <h3 className="font-semibold mb-2">Product {item}</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        ))}
      </div>
    </div>
  )
}
