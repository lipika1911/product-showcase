import type { Product, ProductsResponse } from "../types"

const BASE_URL = "https://dummyjson.com"

export class ProductAPI {
  static async getProducts(limit = 20, skip = 0): Promise<ProductsResponse> {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return response.json()
  }

  static async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }
    return response.json()
  }

  static async getCategories(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/products/categories`)
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
    return response.json()
  }

  static async getProductsByCategory(category: string, limit = 20, skip = 0): Promise<ProductsResponse> {
    const response = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`)
    if (!response.ok) {
      throw new Error("Failed to fetch products by category")
    }
    return response.json()
  }

  static async searchProducts(query: string, limit = 20, skip = 0): Promise<ProductsResponse> {
    const response = await fetch(
      `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
    )
    if (!response.ok) {
      throw new Error("Failed to search products")
    }
    return response.json()
  }
}
