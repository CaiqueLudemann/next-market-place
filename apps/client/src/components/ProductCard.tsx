import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types/product.types'
import { formatCurrency } from '@marketplace/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps): React.ReactElement {
  const isInStock = product.stock > 0

  return (
    <Link href={`/shop/products/${product.id}`} className="group block">
      <article className="relative h-full bg-white rounded-2xl border border-neutral-200 overflow-hidden transition-all duration-300 hover:shadow-medium hover:border-primary-200 hover:-translate-y-1">
        {/* Product Image with Overlay */}
        <div className="relative h-56 overflow-hidden bg-neutral-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                isInStock ? 'bg-emerald-500/90 text-white' : 'bg-neutral-900/80 text-white'
              }`}
            >
              {isInStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Gradient Overlay on Hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)',
            }}
          />
        </div>

        {/* Product Details */}
        <div className="p-5 space-y-3">
          <h3 className="font-semibold text-lg text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span
                className="text-2xl font-bold"
                style={{
                  background: 'linear-gradient(to right, rgb(79 70 229), rgb(8 145 178))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {formatCurrency(product.price, product.currency)}
              </span>
            </div>

            {/* View Details Button - appears on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
              <div className="flex items-center gap-1 text-primary-600 text-sm font-medium">
                <span>View</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
