import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { getActiveProducts } from '@/lib/productService'
import Link from 'next/link'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({
  params,
}: ProductPageProps): Promise<React.ReactElement> {
  // Check authentication
  const session = await getSession()

  if (!session) {
    const { id } = await params
    redirect(`/login?redirect=/products/${id}`)
  }

  // Get product
  const { id } = await params
  const products = getActiveProducts()
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  // Format price
  const price = (product.price / 100).toFixed(2)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/shop"
            className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Shop
          </Link>
          <div className="text-sm text-neutral-600">
            Logged in as <span className="font-medium">{session.user.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center">
                      <svg class="w-24 h-24 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  `
                }}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 mb-2">{product.name}</h1>
                <p className="text-3xl font-bold text-primary-600">${price}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-2">Description</h2>
                  <p className="text-neutral-600 leading-relaxed">{product.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-neutral-500">Stock</p>
                    <p className="font-medium text-neutral-900">
                      {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Currency</p>
                    <p className="font-medium text-neutral-900">{product.currency}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <button
                  className={`
                    w-full px-6 py-4 rounded-lg font-medium text-white transition-all
                    ${
                      product.stock > 0
                        ? 'bg-primary-600 hover:bg-primary-700 active:scale-95'
                        : 'bg-neutral-300 cursor-not-allowed'
                    }
                  `}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>

                <button className="w-full px-6 py-3 rounded-lg font-medium text-primary-600 border-2 border-primary-200 hover:bg-primary-50 transition-all">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
