"use client"

import { FiltersSidebar } from "@/components/filters-sidebar";
import { Pagination } from "@/components/pagination";
import { ProductDetailModal } from "@/components/product-detail-modal";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridHeader } from "@/components/product-grid-header";
import { useProducts } from "@/hooks/use-product";
import { Product } from "@/types";
import { useState } from "react";

export default function Home() {
  const {
    products,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    categories,
    filters,
    updateFilters,
    nextPage,
    prevPage,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleModalClose = (open: boolean) => {
    setModalOpen(open)
    if (!open) {
      setSelectedProduct(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
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
      <main className="container mx-auto px-2 py-6 md:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Sticky Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-34"> 
            {/* top-24 = header height + some gap */}
            <FiltersSidebar
              categories={categories}
              filters={filters}
              onFiltersChange={updateFilters}
              totalProducts={total}
            />
          </div>
        </aside>

        {/* Products Section */}
        <div className="flex-1 min-w-0">
          {/* Product Grid Header for Sorting */}
          {!loading && !error && (
            <ProductGridHeader
              totalProducts={total}
              currentSort={filters.sortBy}
              onSortChange={(sort) => updateFilters({ sortBy: sort })}
            />
          )}
          
          {/* Product Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onProductClick={handleProductClick}
          />

          {/* Pagination */}
          {!loading && !error && products.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={prevPage}
              onNext={nextPage}
              total={total}
              limit={20}
            />
          )}
        </div>
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} open={modalOpen} onOpenChange={handleModalClose} />
    </div>
  );
}
