import { getActiveProducts, getCategories } from '@/lib/productService'
import { ShopClient } from './ShopClient'
import { getSession } from '@/lib/auth/session'
import { UserNav } from '@/components/UserNav'

export default async function ShopPage() {
  const products = getActiveProducts()
  const categories = getCategories()
  const session = await getSession()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600">Marketplace</h1>
          <UserNav session={session} />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-6 mb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl" />
          </div>

          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold font-display">
              <span
                style={{
                  background:
                    'linear-gradient(to right, rgb(79 70 229), rgb(99 102 241), rgb(6 182 212))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Discover Amazing
              </span>
              <br />
              <span className="text-neutral-900">Products</span>
            </h1>

            <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Browse our curated collection of {products.length} premium products.
              <br />
              Find exactly what you&apos;re looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <ShopClient products={products} categories={categories} itemsPerPage={12} />
        </div>
      </section>
    </div>
  )
}
