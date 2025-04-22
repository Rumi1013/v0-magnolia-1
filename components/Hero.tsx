"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Southern Gothic hero images
const heroImages = [
  {
    title: "Southern Heritage",
    subtitle: "Digital Creativity",
    description:
      "Transforming art, design, and strategy into sustainable income streams while honoring Southern heritage and Black women's resilience.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__-design-a-mystical-southern-gothic-backdrop-for-a-__88934-VbAnWp35ItkewXS3RTIkozEfEOoXwx.jpeg",
    cta: "Explore Our Products",
    link: "/shop",
  },
  {
    title: "Through Our Eyes",
    subtitle: "Healing Resources",
    description: "Empowering resources for trauma recovery, expungement workshops, and community support.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/universal_upscale_0_04d80a2f-965f-465b-b915-4810db79f264_0.jpg-O92cmMkdfQyGw4gTJ2G6KTN6xw5QyN.jpeg",
    cta: "Discover Resources",
    link: "/through-our-eyes",
  },
  {
    title: "Creative Services",
    subtitle: "Digital Solutions",
    description: "Web development, brand design, and automation implementation for entrepreneurs and small businesses.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/universal_upscale_0_28e4a20c-aac7-44eb-b27a-98394ad2adb0_0.jpg-cD7adGixq2NusJJrscMH7drcJ3g11q.jpeg",
    cta: "View Services",
    link: "/services",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState([true, true, true])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handleImageError = (index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })
  }

  return (
    <div className="relative h-[90vh] overflow-hidden">
      {/* Background image with overlay */}
      {heroImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {imagesLoaded[index] && (
            <Image
              src={"/placeholder.svg?height=1200&width=1920&query=southern+gothic+" + slide.title}
              alt={slide.title}
              fill
              priority
              className="object-cover"
              onError={() => handleImageError(index)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/80 to-midnight-teal/50" />
        </div>
      ))}

      {/* Moon glow effect */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-rich-gold/20 blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <motion.div
          className="max-w-2xl text-magnolia-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-rich-gold font-medium mb-2">{heroImages[currentSlide].subtitle}</h2>
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {heroImages[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl">{heroImages[currentSlide].description}</p>
            <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue" asChild>
              <a href={heroImages[currentSlide].link}>
                {heroImages[currentSlide].cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-rich-gold w-8" : "bg-magnolia-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
