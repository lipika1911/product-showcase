"use client"

import { SortDropdown } from "./sort-dropdown"
import { Grid} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductGridHeaderProps {
  totalProducts: number
  currentSort: string
  onSortChange: (sort: string) => void
}

export function ProductGridHeader({
  totalProducts,
  currentSort,
  onSortChange,
}: ProductGridHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="font-semibold">Products</h2>
          <p className="text-sm text-muted-foreground">{totalProducts} items found</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SortDropdown value={currentSort} onValueChange={onSortChange} />

        <div className="flex items-center border rounded-md">
            <Button
                variant="default"
                size="sm"
            >
                <Grid className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </div>
  )
}
