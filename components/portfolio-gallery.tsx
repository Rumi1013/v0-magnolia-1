"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

type PortfolioItem = {
  id: string
  title: string
  description: string
  category: string
  image: string
  client: string
  year: string
  tags: string[]
}

export function PortfolioGallery({ category }: { category: string }) {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch(`/api/portfolio${category !== "all" ? `?category=${category}` : ""}`)

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio items")
        }

        const data = await response.json()
        setItems(data.items)
      } catch (err) {
        console.error("Error fetching portfolio items:", err)
        setError("Failed to load portfolio items. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolioItems()
  }, [category])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? // Skeleton loading state
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden">
                <div className="relative h-64 w-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          : items.map((item) => (
              <Card
                key={item.id}
                className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-64 w-full group">
                  <Image
                    src={item.image || "/placeholder.svg?height=400&width=600&query=portfolio+item"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-serif text-[#FAF3E0] mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {item.client} • {item.year}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 text-xs font-medium text-[#D4AF37] bg-[#D4AF37]/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="inline-block px-3 py-1 text-xs font-medium text-gray-400 bg-gray-800/30 rounded-full">
                        +{item.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="max-w-4xl bg-[#0A192F] border border-[#D4AF37]/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-[#FAF3E0]">{selectedItem.title}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {selectedItem.client} • {selectedItem.year}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-full w-full rounded-lg overflow-hidden">
                <Image
                  src={selectedItem.image || "/placeholder.svg?height=600&width=800&query=portfolio+item"}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-gray-300 mb-6">{selectedItem.description}</p>
                <div className="mb-6">
                  <h4 className="text-[#D4AF37] font-medium mb-2">Category</h4>
                  <p className="text-gray-300">{selectedItem.category}</p>
                </div>
                <div>
                  <h4 className="text-[#D4AF37] font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 text-xs font-medium text-[#D4AF37] bg-[#D4AF37]/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
