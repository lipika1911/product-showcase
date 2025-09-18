"use client"

import { useState, useEffect } from "react"
import type { Product, ProductsResponse, FilterState } from "../types"
import { ProductAPI } from "@/lib/api"
import { sortProducts } from "../utils/sorting"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    sortBy: "title-asc",
    sortOrder: "asc",
  })

  const limit = 20

  const fetchProducts = async (page = 1, category = "", sortBy = "title-asc") => {
    try {
      setLoading(true)
      setError(null)

      const skip = (page - 1) * limit
      let response: ProductsResponse

      if (category) {
        response = await ProductAPI.getProductsByCategory(category, limit, skip)
      } else {
        response = await ProductAPI.getProducts(limit, skip)
      }

      // Sort products client-side
      const sortedProducts = sortProducts(response.products, sortBy)

      setProducts(sortedProducts)
      setTotal(response.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const categoriesData = await ProductAPI.getCategories()
      setCategories(categoriesData)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts(currentPage, filters.category, filters.sortBy)
  }, [currentPage, filters.category, filters.sortBy])

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const nextPage = () => {
    if (currentPage * limit < total) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const totalPages = Math.ceil(total / limit)

  return {
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
    refetch: () => fetchProducts(currentPage, filters.category, filters.sortBy),
  }
}
