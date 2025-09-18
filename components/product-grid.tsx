"use client"
import type { Product } from "../types"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function ProductGrid({
  products,
}: ProductGridProps) {

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}
