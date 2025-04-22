"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Southern Gothic images
const carouselImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/universal_upscale_0_04d80a2f-965f-465b-b915-4810db79f264_0.jpg-O92cmMkdfQyGw4gTJ2G6KTN6xw5QyN.jpeg",
    alt: "Southern plantation house with a woman in a glowing dress by the water",
    caption: "Midnight Magnolia",
    description: "Where Southern heritage meets mystical beauty under the golden moon",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/universal_upscale_0_fdc4050b-43af-4c72-ab4d-76849c309858_0.jpg-NQhtSbkPcfVg1QZsFGJS3L2cpc3zj6.jpeg",
    alt: "Southern mansion with hanging lanterns and a woman in a white dress",
    caption: "Twilight Reverie",
    description: "The quiet moments between day and night where magic begins to stir",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/universal_upscale_0_a3b40d15-32e3-4d25-84f5-865e603e079d_0.jpg-RyjINOkvIvNHT6LJHjBzdOTCspReCi.jpeg",
    alt: "Southern house with a glowing circular window and a woman by the water",
    caption: "Moonlit Serenity",
    description: "Bathed in the glow of a Southern moon, finding peace in the stillness",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/universal_upscale_0_28e4a20c-aac7-44eb-b27a-98394ad2adb0_0.jpg-cD7adGixq2NusJJrscMH7drcJ3g11q.jpeg",
    alt: "Southern plantation house with a crescent moon and a woman in a glowing dress",
    caption: "Crescent Dreams",
    description: "Guided by the soft glow of lanterns and the crescent moon's light",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__-design-a-mystical-southern-gothic-backdrop-for-a-__88934-VbAnWp35ItkewXS3RTIkozEfEOoXwx.jpeg",
    alt: "Southern house with a full moon and magnolia flowers",
    caption: "Magnolia Path",
    description: "Where faith and nature intertwine under the golden moonlight",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__-design-a-mystical-southern-gothic-backdrop-for-a-__88932-WDzgQlY71PfhYW53ETseEtmK9Gt9oU.png",
    alt: "Southern house with a path lined with white flowers and a woman in a white dress",
    caption: "Flower-Lined Journey",
    description: "The moment when dreams take flight on the evening breeze",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__-design-a-mystical-southern-gothic-backdrop-for-a-__88933.png-SRllCINn4t0XTMZYKwq8JywV2Ic0pu.jpeg",
    alt: "Southern house with a full moon and a woman in a white dress by the water",
    caption: "Golden Reflections",
    description: "Ancient trees share secrets with those who pause to listen",
  },
]

// Color themes that complement each image
const colorThemes = [
  {
    primary: "from-midnight-blue via-teal-800 to-midnight-blue",
    accent: "rich-gold",
    text: "magnolia-white",
  },
  {
    primary: "from-purple-900 via-indigo-800 to-purple-900",
    accent: "amber-400",
    text: "magnolia-white",
  },
  {
    primary: "from-teal-900 via-teal-800 to-teal-900",
    accent: "yellow-400",
    text: "magnolia-white",
  },
  {
    primary: "from-indigo-900 via-purple-800 to-indigo-900",
    accent: "amber-300",
    text: "magnolia-white",
  },
  {
    primary: "from-slate-900 via-teal-900 to-slate-900",
    accent: "yellow-300",
    text: "magnolia-white",
  },
  {
    primary: "from-gray-900 via-yellow-900 to-gray-900",
    accent: "yellow-500",
    text: "magnolia-white",
  },
  {
    primary: "from-purple-900 via-teal-900 to-purple-900",
    accent: "amber-300",
    text: "magnolia-white",
  },
]

interface Firefly {
  id: number
  x: number
  y: number
  size: number
  alpha: number
  speed: number
}

export default function SouthernGothicCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [fireflies, setFireflies] = useState<Firefly[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  // Generate initial fireflies
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      const newFireflies = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 1 + 0.5,
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
          // Random movement with slight upward tendency
          const dx = (Math.random() - 0.5) * fly.speed
          const dy = (Math.random() - 0.6) * fly.speed // Slight upward bias

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

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
      }, 6000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
  }

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true)
  }

  return (
    <div
      className={`relative w-full h-[80vh] overflow-hidden bg-gradient-to-b ${colorThemes[currentIndex].primary}`}
      ref={containerRef}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
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

      {/* Image carousel */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-full h-full">
              <Image
                src={"/placeholder.svg?height=1200&width=1920&query=southern+gothic+carousel"}
                alt={carouselImages[currentIndex].alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </motion.div>

        {/* Caption */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          key={`caption-${currentIndex}`}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-2 text-magnolia-white text-shadow-gold">
            {carouselImages[currentIndex].caption}
          </h2>
          <p className="text-magnolia-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            {carouselImages[currentIndex].description}
          </p>
        </motion.div>

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
          <span className="sr-only">Next</span>
        </Button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-rich-gold w-8" : "bg-magnolia-white/50 hover:bg-magnolia-white/80",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10">
        <motion.div
          className="w-16 h-16 rounded-full bg-rich-gold/20 backdrop-blur-sm"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
      <div className="absolute bottom-20 left-10">
        <motion.div
          className="w-24 h-24 rounded-full bg-rich-gold/10 backdrop-blur-sm"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>
    </div>
  )
}
