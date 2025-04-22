"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Sample AI-generated images
const aiImages = [
  {
    title: "Southern Heritage",
    description: "AI-generated imagery celebrating the beauty and history of the American South",
    image: "/ai-showcase-southern-heritage.png",
  },
  {
    title: "Digital Creativity",
    description: "Modern digital art inspired by Southern aesthetics and cultural elements",
    image: "/ai-showcase-digital-creativity.png",
  },
  {
    title: "Magnolia Bloom",
    description: "Elegant floral compositions featuring the iconic Southern magnolia",
    image: "/ai-showcase-magnolia-bloom.png",
  },
]

export default function AIShowcase() {
  const [currentImage, setCurrentImage] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(aiImages.map(() => true))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % aiImages.length)
    }, 5000)
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
    <section className="py-20 bg-midnight-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-midnight-blue">
            AI-Powered Creativity
          </h2>
          <p className="text-midnight-teal max-w-2xl mx-auto">
            Explore the possibilities of AI-generated imagery that celebrates Southern heritage, digital creativity, and
            the unique aesthetic of Midnight Magnolia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {aiImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
              >
                {imagesLoaded[index] && (
                  <Image
                    src={"/placeholder.svg?height=800&width=600&query=ai+generated+" + image.title}
                    alt={image.title}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(index)}
                  />
                )}
              </div>
            ))}
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-midnight-blue">
              {aiImages[currentImage].title}
            </h3>
            <p className="text-midnight-teal">{aiImages[currentImage].description}</p>
            <p className="text-midnight-teal">
              Our AI image generator allows you to create custom visuals that reflect your brand, tell your story, and
              capture the essence of Southern heritage with modern digital flair.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue" asChild>
                <Link href="/ai-image-generator">
                  Create Your Own
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="flex space-x-2">
                {aiImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImage ? "bg-rich-gold w-8" : "bg-midnight-blue/20"
                    }`}
                    aria-label={`View ${aiImages[index].title}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
