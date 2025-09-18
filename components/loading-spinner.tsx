"use client"

import { useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { gsap } from "gsap"

export function LoadingSpinner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const spinnerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (containerRef.current && spinnerRef.current && textRef.current) {
      // Animate container in
      gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })

      // Pulse animation for text
      gsap.to(textRef.current, {
        opacity: 0.5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      // Scale animation for spinner
      gsap.to(spinnerRef.current, {
        scale: 1.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <div ref={spinnerRef}>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <p ref={textRef} className="text-sm text-muted-foreground">
          Loading products...
        </p>
      </div>
    </div>
  )
}
