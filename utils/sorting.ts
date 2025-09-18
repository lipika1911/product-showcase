import type { Product, SortOption } from "../types"

export const sortOptions: SortOption[] = [
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "price-asc", label: "Price Low to High" },
  { value: "price-desc", label: "Price High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "rating-asc", label: "Lowest Rated" },
  { value: "discount-desc", label: "Best Deals" },
  { value: "stock-desc", label: "Most Available" },
  { value: "newest", label: "Newest First" },
]

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const [field, order] = sortBy.split("-") as [string, "asc" | "desc"]

  return [...products].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (field) {
      case "title":
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case "price":
        // Using discounted price for sorting
        aValue = a.price * (1 - a.discountPercentage / 100)
        bValue = b.price * (1 - b.discountPercentage / 100)
        break
      case "rating":
        aValue = a.rating
        bValue = b.rating
        break
      case "discount":
        aValue = a.discountPercentage
        bValue = b.discountPercentage
        break
      case "stock":
        aValue = a.stock
        bValue = b.stock
        break
      case "newest":
        // Sorting by ID as a proxy for newest (higher ID = newer)
        aValue = a.id
        bValue = b.id
        break
      default:
        aValue = a[field as keyof Product]
        bValue = b[field as keyof Product]
    }

    if (order === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
}

export function getSortLabel(sortBy: string): string {
  const option = sortOptions.find((opt) => opt.value === sortBy)
  return option?.label || "Default"
}
