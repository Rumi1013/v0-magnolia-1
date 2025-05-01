"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  featured: boolean
  shopifyUrl?: string
  status: "in_stock" | "low_stock" | "out_of_stock" | "coming_soon"
}

export function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data.products)

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.products.map((product: Product) => product.category)))
        setCategories(uniqueCategories)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-600">In Stock</Badge>
      case "low_stock":
        return <Badge className="bg-yellow-600">Low Stock</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-600">Out of Stock</Badge>
      case "coming_soon":
        return <Badge className="bg-blue-600">Coming Soon</Badge>
    }
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-[#FAF3E0] mb-4">Our Products</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Discover our collection of Southern-inspired digital and physical products.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="w-full max-w-2xl mx-auto flex flex-wrap justify-center bg-[#191970]/50 border border-[#D4AF37]/20">
          <TabsTrigger
            value="all"
            onClick={() => setActiveCategory("all")}
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970]"
          >
            All Products
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970]"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading
          ? // Skeleton loading state
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          : filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all"
              >
                <div className="relative h-48 w-full group">
                  <Image
                    src={product.image || "/placeholder.svg?height=400&width=600&query=product"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-[#D4AF37] text-[#191970]">Featured</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">{product.category}</span>
                    {getStatusBadge(product.status)}
                  </div>
                  <h3 className="text-xl font-serif text-[#FAF3E0] mb-2">{product.name}</h3>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-[#D4AF37] font-bold">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {product.shopifyUrl ? (
                    <Button
                      asChild
                      className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]"
                      disabled={product.status === "out_of_stock" || product.status === "coming_soon"}
                    >
                      <a href={product.shopifyUrl} target="_blank" rel="noopener noreferrer">
                        {product.status === "coming_soon"
                          ? "Coming Soon"
                          : product.status === "out_of_stock"
                            ? "Out of Stock"
                            : "Shop Now"}
                      </a>
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]"
                      disabled={product.status === "out_of_stock" || product.status === "coming_soon"}
                    >
                      {product.status === "coming_soon"
                        ? "Coming Soon"
                        : product.status === "out_of_stock"
                          ? "Out of Stock"
                          : "Shop Now"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  )
}
