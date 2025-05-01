"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { Star } from "lucide-react"

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  testimonial: string
  rating: number
  image?: string
  date: string
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials")

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials")
        }

        const data = await response.json()
        setTestimonials(data.testimonials)
      } catch (err) {
        console.error("Error fetching testimonials:", err)
        setError("Failed to load testimonials. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-400"}`} />
    ))
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-[#FAF3E0] mb-4">What Our Clients Say</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Discover why clients choose Midnight Magnolia for their digital needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? // Skeleton loading state
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="bg-[#191970]/30 border border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-12 w-12 rounded-full mr-4" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-4 mr-1 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-3 w-24 ml-auto" />
                </CardContent>
              </Card>
            ))
          : testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="bg-[#191970]/30 border border-[#D4AF37]/20 hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 bg-[#D4AF37]/20">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[#D4AF37] font-serif text-lg">{testimonial.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#FAF3E0]">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                  <p className="text-gray-300 mb-4">{testimonial.testimonial}</p>
                  <p className="text-right text-sm text-gray-400">{testimonial.date}</p>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  )
}
