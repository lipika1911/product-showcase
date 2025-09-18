"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react"
import { sortOptions } from "../utils/sorting"

interface SortDropdownProps {
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function SortDropdown({ value, onValueChange, className }: SortDropdownProps) {
  const [field, order] = value.split("-")
  const isAscending = order === "asc"

  const toggleSortOrder = () => {
    if (field === "newest") return
    const newOrder = isAscending ? "desc" : "asc"
    onValueChange(`${field}-${newOrder}`)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-48 bg-background border border-gray-200">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {field !== "newest" && (
        <Button variant="outline" size="icon" onClick={toggleSortOrder} title="Toggle sort order">
          {isAscending ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        </Button>
      )}
    </div>
  )
}
