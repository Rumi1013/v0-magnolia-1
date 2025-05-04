"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

type Testimonial = {
  id: number
  name: string
  role: string
  company: string
  content: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Founder",
    company: "Southern Charm Boutique",
    content:
      "Midnight Magnolia transformed our online presence with a website that perfectly captures our brand's southern elegance. Their attention to detail and understanding of our aesthetic was remarkable.",
    image: "/professional-black-woman.png",
  },
  {
    id: 2,
    name: "Marcus Williams",
    role: "Creative Director",
    company: "Heritage Design Co.",
    content:
      "The workflow automation solutions provided by Midnight Magnolia have saved us countless hours. Their understanding of both technology and southern business culture makes them an invaluable partner.",
    image: "/creative-director-woman.png",
  },
  {
    id: 3,
    name: "Eliza Thompson",
    role: "Author",
    company: "Southern Stories Press",
    content:
      "Working with Midnight Magnolia on my author website was a dream. They understood the nuances of southern gothic aesthetics and created a digital space that feels like stepping into one of my novels.",
    image: "/woman-journaling-adhd.png",
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextTestimonial()
    }
    if (isRightSwipe) {
      prevTestimonial()
    }

    // Reset values
    setTouchStart(null)
    setTouchEnd(null)
  }

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Autoplay functionality
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [activeIndex])

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
  }

  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
    autoplayRef.current = setInterval(() => {
      nextTestimonial()
    }, 8000)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={18} className={`\${i < rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-400"}`} />
    ))
  }

  return (
    <section
      className="py-16 bg-[#F8F6F0]"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-[#191970] mb-4">What Our Clients Say</h2>
          <p className="text-[#191970]/80 max-w-2xl mx-auto">
            Discover how Midnight Magnolia has helped businesses across the South elevate their digital presence with
            southern elegance and modern technology.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 relative">
                    <Quote className="absolute top-6 left-6 text-[#D4AF37]/20 h-12 w-12" />
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#D4AF37]/20">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-[#191970] mb-6 italic">"{testimonial.content}"</p>
                        <div>
                          <h4 className="font-serif text-lg text-[#191970] font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-[#191970]/70">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 bg-[#191970] text-white p-2 rounded-full shadow-lg hover:bg-[#191970]/80 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 bg-[#191970] text-white p-2 rounded-full shadow-lg hover:bg-[#191970]/80 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-[#D4AF37]" : "bg-[#191970]/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { TestimonialsSection }
