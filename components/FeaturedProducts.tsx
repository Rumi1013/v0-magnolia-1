"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Download, BookOpen, Sparkles } from "lucide-react"

// Default placeholder for product images
const DEFAULT_PRODUCT_IMAGE = "/assorted-products-display.png"

const products = {
  digital: [
    {
      id: 1,
      name: "Digital Entrepreneur's Starter Kit",
      description:
        "Business plan template, content calendar, financial tracker, brand guide template, automation checklist",
      price: 37,
      image: "/images/product-1.jpg",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Brand Identity Workbook",
      description:
        "Brand discovery questions, visual identity exercises, voice development worksheets, brand story framework",
      price: 29,
      image: "/images/product-2.jpg",
      badge: "New",
    },
    {
      id: 3,
      name: "Automation Workflow Templates",
      description:
        "Content planning system, client management database, product development pipeline, financial dashboard",
      price: 49,
      image: "/images/product-3.jpg",
      badge: null,
    },
  ],
  resources: [
    {
      id: 4,
      name: "Through Our Eyes Resource Library",
      description: "Expungement guides, abuse recovery resources, trauma healing, community support",
      price: 79,
      image: "/images/product-4.jpg",
      badge: "Featured",
    },
    {
      id: 5,
      name: "Southern Heritage Digital Art Collection",
      description: "Digital art prints featuring influential Black women figures, Southern motifs",
      price: 45,
      image: "/images/product-5.jpg",
      badge: "Limited",
    },
    {
      id: 6,
      name: "Astrology and Wellness Content Suite",
      description: "Personalized guides, journal prompts, wellness practices",
      price: 39,
      image: "/images/product-6.jpg",
      badge: null,
    },
  ],
  physical: [
    {
      id: 7,
      name: "Midnight Menagerie Pet Accessories",
      description: "Pet products with Southern Gothic aesthetic",
      price: 25,
      image: "/images/product-7.jpg",
      badge: "New Line",
    },
    {
      id: 8,
      name: "Southern Roots Art Print",
      description: "Limited edition art print celebrating Southern heritage",
      price: 65,
      image: "/images/product-8.jpg",
      badge: null,
    },
    {
      id: 9,
      name: "Magnolia Stationery Set",
      description: "Elegant stationery featuring magnolia motifs",
      price: 35,
      image: "/images/product-9.jpg",
      badge: null,
    },
  ],
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("digital")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const getIcon = (tab: string) => {
    switch (tab) {
      case "digital":
        return <Download className="h-4 w-4" />
      case "resources":
        return <BookOpen className="h-4 w-4" />
      case "physical":
        return <ShoppingBag className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <section className="py-20 bg-midnight-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-midnight-blue">Featured Products</h2>
          <p className="text-midnight-teal max-w-2xl mx-auto">
            Explore our curated collection of digital and physical products designed to inspire, empower, and celebrate
            Southern heritage and creativity.
          </p>
        </div>

        <Tabs defaultValue="digital" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-magnolia-white">
              <TabsTrigger
                value="digital"
                className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
              >
                <Download className="h-4 w-4 mr-2" />
                Digital Products
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Resources
              </TabsTrigger>
              <TabsTrigger
                value="physical"
                className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Physical Products
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(products).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={container}
                initial="hidden"
                animate={activeTab === category ? "show" : "hidden"}
              >
                {items.map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-64">
                        <Image
                          src={"/placeholder.svg?height=400&width=600&query=product+" + product.name}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {product.badge && (
                          <Badge className="absolute top-4 right-4 bg-rich-gold text-midnight-blue">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="font-playfair">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-midnight-blue">${product.price}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-midnight-blue hover:bg-midnight-blue/90">
                          {getIcon(category)}
                          <span className="ml-2">
                            {category === "digital"
                              ? "Download Now"
                              : category === "resources"
                                ? "View Details"
                                : "Add to Cart"}
                          </span>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
          >
            View All Products
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
