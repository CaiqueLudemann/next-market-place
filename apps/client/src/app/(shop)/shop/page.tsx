import { getActiveProducts } from '@/lib/productService'
import { ProductCard } from '@/components/ProductCard'

export default function ShopPage() {
  const products = getActiveProducts()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Shop</h1>
        <p className="text-lg text-gray-600">Browse our collection of {products.length} products</p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
