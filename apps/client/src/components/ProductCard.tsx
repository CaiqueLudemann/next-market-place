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
    <Link
      href={`/shop/products/${product.id}`}
      className="block border rounded-lg p-4 hover:shadow-lg transition-shadow group"
    >
      <div className="relative h-48 mb-4 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">
          {formatCurrency(product.price, product.currency)}
        </span>

        <span className={`text-sm font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </Link>
  )
}
