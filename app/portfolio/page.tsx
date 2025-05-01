"use client"

import { useState } from "react"
import { PortfolioGallery } from "@/components/portfolio-gallery"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Work" },
    { id: "Brand Design", name: "Brand Design" },
    { id: "Web Design", name: "Web Design" },
    { id: "Product Design", name: "Product Design" },
    { id: "Automation", name: "Automation" },
    { id: "Illustration", name: "Illustration" },
    { id: "Digital Archive", name: "Digital Archive" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-[#FAF3E0] mb-4">Our Portfolio</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore our collection of Southern-inspired work for clients across various industries.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full mb-12">
        <TabsList className="w-full max-w-2xl mx-auto flex flex-wrap justify-center bg-[#191970]/50 border border-[#D4AF37]/20">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970]"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <PortfolioGallery category={activeCategory} />
    </div>
  )
}
