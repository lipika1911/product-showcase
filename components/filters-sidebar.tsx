"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { gsap } from "gsap"
import type { FilterState } from "../types"
import { sortOptions } from "../utils/sorting"

interface FiltersSidebarProps {
  categories: string[]
  filters: FilterState
  onFiltersChange: (filters: Partial<FilterState>) => void
  totalProducts?: number
}

export function FiltersSidebar({
  categories,
  filters,
  onFiltersChange,
  totalProducts,
}: FiltersSidebarProps) {

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      sortBy: "title-asc",
    })
  }

  const hasActiveFilters = filters.category !== ""

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ category: value === "all" ? "" : value })
  }

  const handleQuickCategoryClick = (category: string) => {
    onFiltersChange({ category })
  }

  const formatCategoryName = (category: string | undefined | null): string => {
    if (!category || typeof category !== "string") return ""
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs hover:scale-105 transition-transform"
              >
                <X className="h-2 w-2 mr-1" />
                Clear
              </Button>
            )}
          </div>
          {totalProducts && <p className="text-sm text-muted-foreground">{totalProducts} products found</p>}
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={filters.category || "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger className="bg-white transition-colors  border-gray-200">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent className="h-50">
                <SelectItem value="all" >All categories</SelectItem>
                {categories.map((category, key) => (
                  <SelectItem key={key} value={category}>
                    {formatCategoryName(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Sort by</label>
            <Select value={filters.sortBy} onValueChange={(value) => onFiltersChange({ sortBy: value })}>
              <SelectTrigger className="hover:bg-muted/50 transition-colors bg-white border border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="h-50">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div>
              <label className="text-sm font-medium mb-3 block">Active Filters</label>
              <div className="flex flex-wrap gap-4">
                {filters.category && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 hover:bg-secondary/80 transition-colors"
                  >
                    {formatCategoryName(filters.category)}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                      onClick={() => onFiltersChange({ category: "" })}
                    />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="gap-3">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Quick Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={filters.category === "" ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickCategoryClick("")}
              className="justify-start text-xs hover:scale-105 transition-transform"
            >
              All Products
            </Button>
            {categories.slice(0, 4).map((category, key) => (
              <Button
                key={key}
                variant={filters.category === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickCategoryClick(category)}
                className="justify-start text-xs hover:scale-105 transition-transform"
              >
                {formatCategoryName(category)}
              </Button>
            ))}
            {categories.length > 6 && (
              <p className="text-xs text-muted-foreground mt-2">+{categories.length - 4} more in dropdown</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
