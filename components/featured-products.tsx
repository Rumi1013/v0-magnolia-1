import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Product = {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: string
}

const featuredProducts: Product[] = [
  {
    id: "prod_01",
    name: "Magnolia Moon Journal",
    description: "ADHD-friendly journal with southern-inspired design elements and executive function support.",
    price: "$34.99",
    image: "/southern-gothic-products.png",
    category: "Journals & Stationery",
  },
  {
    id: "prod_02",
    name: "Southern Oracle Tarot Deck",
    description: "Tarot deck featuring southern gothic imagery and traditional symbolism.",
    price: "$45.99",
    image: "/southern-gothic-brand.png",
    category: "Oracle Decks",
  },
  {
    id: "prod_03",
    name: "Heritage Digital Planner",
    description: "Digital planner template with southern aesthetic and productivity features.",
    price: "$19.99",
    image: "/southern-gothic-web-design.png",
    category: "Digital Products",
  },
  {
    id: "prod_04",
    name: "Midnight Elegance Stationery Set",
    description: "Premium paper goods with magnolia motifs and gold accents.",
    price: "$28.99",
    image: "/southern-gothic-automation.png",
    category: "Stationery",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-[#191970]/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#191970] mb-2">Featured Products</h2>
            <p className="text-[#191970]/80 max-w-2xl">
              Discover our curated collection of southern-inspired digital and physical products.
            </p>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 flex items-center text-[#191970] hover:text-[#D4AF37] transition-colors font-medium"
          >
            View All Products
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow group-hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl text-[#191970] mt-2 mb-2">{product.name}</h3>
                  <p className="text-[#191970]/70 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#191970] font-medium">{product.price}</span>
                    <Link
                      href={`/products/${product.id}`}
                      className="px-4 py-2 bg-[#191970] text-white rounded hover:bg-[#191970]/90 transition-colors text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
