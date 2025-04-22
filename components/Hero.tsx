"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/whispering-willows-manor.png",
      title: "Elevate Your Brand",
      subtitle: "Digital creativity rooted in Southern heritage",
      cta: "Explore Services",
      link: "/services",
    },
    {
      image: "/confident-business-owner.png",
      title: "Embrace Your Heritage",
      subtitle: "Celebrating the resilience of Southern Black women",
      cta: "Discover Heritage",
      link: "/heritage",
    },
    {
      image: "/vibrant-digital-display.png",
      title: "Transform Your Business",
      subtitle: "Digital products that create sustainable income",
      cta: "Shop Products",
      link: "/shop",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/70 to-transparent" />
        </div>
      ))}

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-magnolia-white/90 mb-8">{slides[currentSlide].subtitle}</p>
            <Button asChild size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
              <Link href={slides[currentSlide].link}>
                {slides[currentSlide].cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
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
    </section>
  )
}
