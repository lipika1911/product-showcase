"use client"

import { ProductGrid } from "@/components/product-grid";
import { useProducts } from "@/hooks/use-product";
import { Product } from "@/types";

export default function Home() {

  const { 
    products,
    loading,
    error,
  } = useProducts()

  const handleProductClick = (product: Product) => {
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-2 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Product Showcase</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Discover amazing products from our curated collection
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-2 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-40 shrink-0">
            Sidebar
          </aside>

          <div className="flex-1 min-w-0">
            
            {/* Product Grid Header for Sorting */}
            <div>Product Grid Header</div>
            
            {/* Product Grid */}
            <ProductGrid
              products={products}
              loading={loading}
              error={error}
              onProductClick={handleProductClick}
            />

            {/* Pagination */}
            <div>Pagination</div>

          </div>
        </div>
      </main>

    </div>
  );
}
