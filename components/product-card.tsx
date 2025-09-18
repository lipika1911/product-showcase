"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
  onClick?: () => void
  className?: string
}

export function ProductCard({ product, onClick, className }: ProductCardProps){

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, (max-width: 1280px) 33vw, 25vw"
          priority
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-destructive text-background text-xs">
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}
        <Badge
            variant={product.stock > 0 ? "secondary" : "destructive"}
            className={`absolute top-2 right-2 text-xs ${
                product.stock > 0 ? "bg-green-500 text-white hover:bg-green-600" : ""
            }`}
        >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <CardContent className="p-3 md:p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm md:text-base leading-tight line-clamp-2 text-balance">
              {product.title}
            </h3>
          </div>
          <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 text-pretty">{product.description}</p>

          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    `h-3 w-3 md:h-4 md:w-4 transition-colors duration-200",
                    ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}
                    `}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">({product.rating.toFixed(1)})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 md:gap-2">
              <span className="font-bold text-base md:text-lg text-primary">${discountedPrice.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="text-xs md:text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
