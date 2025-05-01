"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Feather, Scroll } from "lucide-react"

export function FloatingPaper({ count = 5 }) {
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

    // Update dimensions only on client side
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

  // Adjust count based on screen size
  const adjustedCount = isClient && dimensions.width < 768 ? Math.max(3, Math.floor(count / 2)) : count

  const icons = [
    <BookOpen key="book" className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]/70" />,
    <Feather key="feather" className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]/70" />,
    <Scroll key="scroll" className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]/70" />,
  ]

  if (!isClient) return null

  // If user prefers reduced motion, render static elements
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: adjustedCount }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
          >
            <div className="relative w-12 h-16 sm:w-16 sm:h-20 bg-[#191970]/20 backdrop-blur-sm rounded-lg border border-[#D4AF37]/20 flex items-center justify-center">
              {icons[i % icons.length]}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: adjustedCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: [Math.random() * dimensions.width, Math.random() * dimensions.width, Math.random() * dimensions.width],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30 + Math.random() * 15, // Slower animation (was 20 + Math.random() * 10)
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="relative w-12 h-16 sm:w-16 sm:h-20 bg-[#191970]/20 backdrop-blur-sm rounded-lg border border-[#D4AF37]/20 flex items-center justify-center transform hover:scale-110 transition-transform duration-500">
            {icons[i % icons.length]}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
