"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  testimonial: string
  rating: number
  image?: string
}

export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Simulate fetching testimonials
    const fetchTestimonials = async () => {
      try {
        // In a real implementation, you would fetch from your API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data
        const sampleTestimonials: Testimonial[] = [
          {
            id: "1",
            name: "Sarah Johnson",
            role: "CEO",
            company: "Southern Heritage Designs",
            testimonial:
              "Working with Midnight Magnolia transformed our brand. They captured the essence of Southern elegance while bringing a modern touch that resonated with our audience. The attention to detail and understanding of our vision exceeded our expectations.",
            rating: 5,
            image: "/professional-black-woman.png",
          },
          {
            id: "2",
            name: "Marcus Williams",
            role: "Founder",
            company: "Magnolia Tech Solutions",
            testimonial:
              "The team at Midnight Magnolia helped us create a digital presence that truly represents our values and heritage. Their understanding of both technology and Southern aesthetics created a perfect blend for our brand.",
            rating: 5,
          },
          {
            id: "3",
            name: "Eliza Thompson",
            role: "Creative Director",
            company: "Charleston Creative Collective",
            testimonial:
              "I was blown away by the attention to detail and the deep understanding of Southern Gothic aesthetics. Midnight Magnolia didn't just deliver a website; they created an experience that tells our story beautifully.",
            rating: 5,
            image: "/creative-director-woman.png",
          },
        ]

        setTestimonials(sampleTestimonials)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={18} className={`${i < rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-400"}`} />
    ))
  }

  return (
    <section className="py-16 bg-[#191970]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-[#FAF3E0] mb-4">Client Testimonials</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover what our clients have to say about working with Midnight Magnolia.
          </p>
        </div>

        {isLoading ? (
          <Card className="bg-[#191970]/30 border border-[#D4AF37]/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-4 mr-1 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-32 mr-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : testimonials.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <Card className="bg-[#191970]/30 border border-[#D4AF37]/20">
              <CardContent className="p-8">
                <div className="absolute top-8 left-8 text-[#D4AF37]/20">
                  <Quote size={60} />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden bg-[#D4AF37]/20 flex-shrink-0">
                    {testimonials[currentIndex].image ? (
                      <Image
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#D4AF37] font-serif text-2xl">
                          {testimonials[currentIndex].name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    <p className="text-gray-300 mb-6 italic">"{testimonials[currentIndex].testimonial}"</p>
                    <div>
                      <h4 className="font-medium text-[#FAF3E0]">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-gray-400">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {testimonials.length > 1 && (
              <div className="flex justify-center mt-6 space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
            )}

            <div className="flex justify-center mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full mx-1 ${currentIndex === index ? "bg-[#D4AF37]" : "bg-gray-500"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No testimonials available at this time.</p>
        )}
      </div>
    </section>
  )
}
