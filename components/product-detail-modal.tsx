"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, Package, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"
import type { Product } from "../types"
import { cn } from "@/lib/utils"

interface ProductDetailModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductDetailModal({ product, open, onOpenChange }: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const imageGalleryRef = useRef<HTMLDivElement>(null)
  const productInfoRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && modalContentRef.current) {
      const tl = gsap.timeline()

      // Reset positions
      gsap.set([imageGalleryRef.current, productInfoRef.current, reviewsRef.current], {
        opacity: 0,
        y: 30,
      })

      // Animate in
      tl.to(modalContentRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
        .to(
          imageGalleryRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          productInfoRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .to(
          reviewsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        )
    }
  }, [open])

  if (!product) return null

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const images = product.images.length > 0 ? product.images : [product.thumbnail]

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length

    if (imageGalleryRef.current) {
      const currentImg = imageGalleryRef.current.querySelector(".main-image")
      gsap.to(currentImg, {
        x: -20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setCurrentImageIndex(newIndex)
          gsap.fromTo(currentImg, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" })
        },
      })
    } else {
      setCurrentImageIndex(newIndex)
    }
  }

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length

    if (imageGalleryRef.current) {
      const currentImg = imageGalleryRef.current.querySelector(".main-image")
      gsap.to(currentImg, {
        x: 20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setCurrentImageIndex(newIndex)
          gsap.fromTo(currentImg, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" })
        },
      })
    } else {
      setCurrentImageIndex(newIndex)
    }
  }

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : product.rating

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
            ref={modalContentRef}
            className="w-full max-w-[1200px] sm:max-w-[800px] max-h-[90vh] overflow-y-auto"
        >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-balance">{product.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div ref={imageGalleryRef} className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover main-image"
                sizes="(max-width: 768px) 80vw, 50vw"
              />
              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 transition-all duration-200 hover:scale-110"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 transition-all duration-200 hover:scale-110"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              {product.discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground animate-pulse">
                  -{Math.round(product.discountPercentage)}%
                </Badge>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "relative aspect-square w-16 h-16 rounded-md overflow-hidden border-2 shrink-0 transition-all duration-200 hover:scale-105",
                      index === currentImageIndex ? "border-primary" : "border-transparent",
                    )}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div ref={productInfoRef} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4 transition-colors duration-200",
                        i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted",
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">${discountedPrice.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                )}
              </div>

              <p className="text-muted-foreground text-pretty">{product.description}</p>
            </div>

            <Separator />

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>SKU: {product.sku}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Weight: {product.weight}g</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-pretty">{product.shippingInformation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-pretty">{product.warrantyInformation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-muted-foreground" />
                  <span className="text-pretty">{product.returnPolicy}</span>
                </div>
                <div>
                  <span>Min. Order: {product.minimumOrderQuantity}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            {product.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews.length > 0 && (
          <div ref={reviewsRef} className="mt-8">
            <Separator className="mb-6" />
            <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
            <div className="space-y-4 overflow-y-auto">
              {product.reviews.map((review, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.reviewerName}</span>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3 w-3 transition-colors duration-200",
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-pretty">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
