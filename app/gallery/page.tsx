import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function GalleryPage() {
  // Sample gallery items
  const galleryItems = [
    {
      id: 1,
      title: "Midnight Bloom",
      description: "Magnolia flower under moonlight",
      image: "/magnolia-night-gothic.png",
      category: "Digital Art",
    },
    {
      id: 2,
      title: "Spanish Moss Dreams",
      description: "Ethereal moss hanging from ancient oaks",
      image: "/southern-gothic-moss.png",
      category: "Photography",
    },
    {
      id: 3,
      title: "Southern Whispers",
      description: "Abstract representation of southern stories",
      image: "/abstract-southern-gothic.png",
      category: "Mixed Media",
    },
    {
      id: 4,
      title: "Crescent Shadows",
      description: "Moon phases casting shadows on water",
      image: "/southern-gothic-moon-reflection.png",
      category: "Digital Art",
    },
    {
      id: 5,
      title: "Veiled Memories",
      description: "Nostalgic southern landscape with fog",
      image: "/foggy-southern-plantation-gothic.png",
      category: "Photography",
    },
    {
      id: 6,
      title: "Magnolia State of Mind",
      description: "Conceptual piece exploring southern identity",
      image: "/placeholder.svg?height=400&width=600&query=conceptual+southern+identity+art+magnolia",
      category: "Mixed Media",
    },
  ]

  // Categories for filtering
  const categories = ["All", "Digital Art", "Photography", "Mixed Media"]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-[#FAF3E0] mb-4">Art Gallery</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore our collection of Southern Gothic inspired artwork, where tradition meets the mystical.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className="px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#191970] transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item) => (
          <Card
            key={item.id}
            className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all"
          >
            <div className="relative h-64 w-full">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-[#D4AF37] bg-[#D4AF37]/10 rounded-full">
                {item.category}
              </div>
              <h3 className="text-xl font-serif text-[#FAF3E0] mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
