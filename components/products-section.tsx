"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Feather, BookOpen, Scroll } from "lucide-react"

export function ProductsSection() {
  const products = [
    {
      title: "Southern Oracle Tarot",
      description:
        "Tarot and oracle decks featuring southern imagery, Black cultural elements, and traditional symbolism",
      icon: <Feather className="h-8 w-8 text-[#D4AF37]" />,
    },
    {
      title: "Journals & Stationery",
      description: "Premium paper goods designed for executive function support, mindfulness, and southern elegance",
      icon: <BookOpen className="h-8 w-8 text-[#D4AF37]" />,
    },
    {
      title: "Digital Template Library",
      description: "Accessible digital content supporting education, creativity, and community knowledge-sharing",
      icon: <Scroll className="h-8 w-8 text-[#D4AF37]" />,
    },
  ]

  return (
    <section id="products" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Our <span className="text-[#D4AF37]">Products</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto px-4">
            Explore our curated collection of products that blend southern elegance with modern functionality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#191970]/30 border border-[#D4AF37]/20 backdrop-blur-sm text-white h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="bg-[#191970] p-2 rounded-md shrink-0">{product.icon}</div>
                  <CardTitle className="font-serif text-base sm:text-lg">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-sm sm:text-base">
                    {product.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
