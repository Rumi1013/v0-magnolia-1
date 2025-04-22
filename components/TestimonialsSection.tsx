"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

// Default placeholder for testimonial images
const DEFAULT_TESTIMONIAL_IMAGE = "/diverse-positive-feedback.png"

const testimonials = [
  {
    quote:
      "Midnight Magnolia transformed my brand with their Southern-inspired design aesthetic. Their digital products have helped me streamline my business and connect more authentically with my audience.",
    author: "Jasmine Reynolds",
    role: "Small Business Owner",
    image: "/images/testimonial-1.jpg",
  },
  {
    quote:
      "The 'Through Our Eyes' resources provided by Midnight Magnolia were instrumental in my healing journey. Their trauma recovery guides offered practical steps with cultural sensitivity that I hadn't found elsewhere.",
    author: "Tasha Williams",
    role: "Community Advocate",
    image: "/images/testimonial-2.jpg",
  },
  {
    quote:
      "As a digital entrepreneur, Midnight Magnolia's automation workflows and business templates have saved me countless hours. Their products reflect both technical expertise and a deep understanding of cultural nuance.",
    author: "Marcus Johnson",
    role: "Digital Creator",
    image: "/images/testimonial-3.jpg",
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section className="py-20 bg-midnight-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-midnight-blue">Client Testimonials</h2>
          <p className="text-midnight-teal max-w-2xl mx-auto">
            Hear from our clients about how Midnight Magnolia has helped them transform their brands, businesses, and
            personal journeys.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-magnolia-white rounded-lg shadow-lg p-8 md:p-12"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3">
                  <div className="relative h-64 w-full md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={"/placeholder.svg?height=400&width=300&query=testimonial+" + testimonials[current].author}
                      alt={testimonials[current].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <Quote className="h-12 w-12 text-rich-gold mb-4" />
                  <p className="text-midnight-blue text-lg md:text-xl italic mb-6">{testimonials[current].quote}</p>
                  <div className="flex items-center">
                    <div className="h-0.5 w-12 bg-rich-gold mr-4"></div>
                    <div>
                      <h4 className="font-playfair text-lg font-bold text-midnight-blue">
                        {testimonials[current].author}
                      </h4>
                      <p className="text-midnight-teal">{testimonials[current].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current ? "bg-rich-gold w-8" : "bg-midnight-blue/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-magnolia-white border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
            onClick={prev}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-magnolia-white border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
            onClick={next}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
