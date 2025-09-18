"use client"
import { useEffect, useRef } from "react"
import type { Product } from "../types"
import { ErrorMessage } from "./error-message"
import { LoadingSpinner } from "./loading-spinner"
import { ProductCard } from "./product-card"
import gsap from "gsap"

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
  const gridRef = useRef<HTMLDivElement>(null)
  const emptyStateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return; 
    if (!loading && !error && products.length > 0 && gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".product-card")

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    }
  }, [products, loading, error])

  useEffect(() => {
    if (!gridRef.current) return; 
    if (!loading && !error && products.length === 0 && emptyStateRef.current) {
      gsap.fromTo(emptyStateRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
    }
  }, [products, loading, error])
    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

  if (products.length === 0) {
    return (
      <div ref={emptyStateRef} className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl md:text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground text-sm md:text-base">Try adjusting your filters or search criteria.</p>
      </div>
    )
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
          className="product-card"
          index={index}
        />
      ))}
    </div>
  )
}
