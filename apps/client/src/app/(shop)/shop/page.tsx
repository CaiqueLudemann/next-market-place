import { getActiveProducts } from '@/lib/productService'
import { ShopClient } from './ShopClient'

export default function ShopPage() {
  const products = getActiveProducts()

  return (
    <div className="min-h-screen">
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

            {/* Search bar placeholder - can be implemented later */}
            <div className="max-w-xl mx-auto pt-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-xl shadow-soft focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <ShopClient products={products} itemsPerPage={12} />
        </div>
      </section>
    </div>
  )
}
