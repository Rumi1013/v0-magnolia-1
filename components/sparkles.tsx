"use client"

import { useEffect, useRef, useState } from "react"
import { useMousePosition } from "@/lib/hooks/use-mouse-position"

interface SparklesProps {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
  count?: number
}

export const SparklesCore = ({
  id = "tsparticles",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className = "h-full w-full",
  particleColor = "#D4AF37",
  count = 20,
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleReducedMotionChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleReducedMotionChange)

    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      mediaQuery.removeEventListener("change", handleReducedMotionChange)
    }
  }, [])

  useEffect(() => {
    if (!isClient || prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Adjust particle count based on screen size
    const adjustedDensity = dimensions.width < 768 ? particleDensity / 2 : particleDensity

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * (maxSize - minSize) + minSize
        this.speedX = Math.random() * 0.3 - 0.15 // Reduced from 0.5 - 0.25
        this.speedY = Math.random() * 0.3 - 0.15 // Reduced from 0.5 - 0.25
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        // Mouse interaction - reduce effect on mobile and make gentler
        if (dimensions.width > 768) {
          const dx = mousePosition.x - this.x
          const dy = mousePosition.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) {
            const angle = Math.atan2(dy, dx)
            this.x -= Math.cos(angle) * 0.5 // Reduced from 1
            this.y -= Math.sin(angle) * 0.5 // Reduced from 1
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < adjustedDensity; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [
    maxSize,
    minSize,
    particleColor,
    particleDensity,
    mousePosition.x,
    mousePosition.y,
    dimensions,
    isClient,
    prefersReducedMotion,
  ])

  // If user prefers reduced motion, render static particles
  if (isClient && prefersReducedMotion) {
    return (
      <div
        id={id}
        className={className}
        style={{
          background,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: Math.min(count, 10) }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * (maxSize - minSize) + minSize}px`,
              height: `${Math.random() * (maxSize - minSize) + minSize}px`,
              borderRadius: "50%",
              backgroundColor: particleColor,
            }}
          />
        ))}
      </div>
    )
  }

  if (!isClient) return null

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        background,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  )
}

export const Sparkles = ({ count = 20, ...props }: SparklesProps) => <SparklesCore {...props} particleDensity={count} />
