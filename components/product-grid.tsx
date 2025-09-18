"use client"
import type { Product } from "../types"
import { ErrorMessage } from "./error-message"
import { LoadingSpinner } from "./loading-spinner"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: Product[]
  loading: boolean
  error: string | null
  onProductClick: (product: Product) => void
}

export function ProductGrid({
  products,
  loading,
  error,
  onProductClick,
}: ProductGridProps) {
    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
          className="product-card"
        />
      ))}
    </div>
  )
}
