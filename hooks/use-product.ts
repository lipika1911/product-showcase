"use client"

import { useState, useEffect } from "react"
import type { Product, ProductsResponse, FilterState } from "../types"
import { ProductAPI } from "@/lib/api"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

      const products = response.products;

      setProducts(products)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
  }
}
