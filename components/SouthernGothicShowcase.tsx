"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Sample images for the showcase
const showcaseImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/universal_upscale_0_04d80a2f-965f-465b-b915-4810db79f264_0.jpg-O92cmMkdfQyGw4gTJ2G6KTN6xw5QyN.jpeg",
    alt: "Southern plantation house with a woman in a glowing dress by the water",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__-design-a-mystical-southern-gothic-backdrop-for-a-__88934-VbAnWp35ItkewXS3RTIkozEfEOoXwx.jpeg",
    alt: "Southern house with a full moon and magnolia flowers",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/universal_upscale_0_28e4a20c-aac7-44eb-b27a-98394ad2adb0_0.jpg-cD7adGixq2NusJJrscMH7drcJ3g11q.jpeg",
    alt: "Southern plantation house with a crescent moon and a woman in a glowing dress",
  },
]

interface Firefly {
  id: number
  x: number
  y: number
  size: number
  alpha: number
}

export default function SouthernGothicShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fireflies, setFireflies] = useState<Firefly[]>([])

  // Generate fireflies
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      const newFireflies = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.5,
      }))
      setFireflies(newFireflies)
    }
  }, [])

  // Animate fireflies
  useEffect(() => {
    const animateFireflies = () => {
      if (!containerRef.current) return

      const { width, height } = containerRef.current.getBoundingClientRect()

      setFireflies((prev) =>
        prev.map((fly) => {
          // Random movement
          const dx = (Math.random() - 0.5) * 2
          const dy = (Math.random() - 0.6) * 2 // Slight upward bias

          // Wrap around edges
          let newX = fly.x + dx
          let newY = fly.y + dy

          if (newX < 0) newX = width
          if (newX > width) newX = 0
          if (newY < 0) newY = height
          if (newY > height) newY = 0

          // Pulsate alpha
          const newAlpha = fly.alpha + (Math.random() - 0.5) * 0.1
          const clampedAlpha = Math.max(0.2, Math.min(1, newAlpha))

          return {
            ...fly,
            x: newX,
            y: newY,
            alpha: clampedAlpha,
          }
        }),
      )
    }

    const interval = setInterval(animateFireflies, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-blue via-midnight-teal/30 to-midnight-blue" />

      {/* Fireflies */}
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          className="absolute rounded-full bg-rich-gold mix-blend-screen pointer-events-none"
          style={{
            left: `${fly.x}px`,
            top: `${fly.y}px`,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            opacity: fly.alpha,
            boxShadow: `0 0 ${fly.size * 2}px ${fly.size}px rgba(212, 175, 55, ${fly.alpha})`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-magnolia-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Southern Gothic Gallery
          </motion.h2>
          <motion.p
            className="text-magnolia-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Step into a world where Spanish moss drapes from ancient oaks, magnolias bloom under moonlight, and the
            Southern spirit comes alive through enchanted imagery.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative h-80 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Image
                src={"/placeholder.svg?height=800&width=600&query=southern+gothic+showcase"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href="/southern-gothic-gallery">
                  <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">View Gallery</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/southern-gothic-gallery">
            <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue" size="lg">
              Explore Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
