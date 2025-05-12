import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, ShoppingCart, Filter } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Gallery() {
  // Sample gallery items
  const galleryItems = [
    {
      id: 1,
      title: "Midnight Magnolia Bloom",
      description: "Digital illustration capturing the ethereal beauty of magnolias under moonlight.",
      image: "/southern-gothic-magnolia.png",
      category: "Southern Gothic",
      price: "$15.00",
      featured: true,
    },
    {
      id: 2,
      title: "Ancestral Whispers",
      description: "Abstract representation of ancestral wisdom and generational healing.",
      image: "/abstract-neurodivergent-mind.png",
      category: "Abstract",
      price: "$12.00",
    },
    {
      id: 3,
      title: "Tarot of Transformation",
      description: "Digital tarot card design featuring Southern Gothic symbolism.",
      image: "/southern-gothic-tarot.png",
      category: "Tarot",
      price: "$8.00",
    },
    {
      id: 4,
      title: "Moonlit Marsh",
      description: "Atmospheric digital painting of a Southern marsh under moonlight.",
      image: "/placeholder.svg?key=ak290",
      category: "Landscape",
      price: "$18.00",
    },
    {
      id: 5,
      title: "Healing Hands",
      description: "Symbolic representation of self-healing and inner child work.",
      image: "/placeholder.svg?key=kfvhx",
      category: "Abstract",
      price: "$14.00",
    },
    {
      id: 6,
      title: "Southern Gothic Portrait",
      description: "Digital portrait with Southern Gothic elements and symbolism.",
      image: "/placeholder.svg?key=xrksr",
      category: "Portrait",
      price: "$20.00",
    },
    {
      id: 7,
      title: "Neurodivergent Mind Map",
      description: "Visual representation of ADHD thought patterns and creative connections.",
      image: "/placeholder.svg?key=0obkl",
      category: "Abstract",
      price: "$15.00",
    },
    {
      id: 8,
      title: "Magnolia and Moon",
      description: "Minimalist digital art featuring magnolia and crescent moon motifs.",
      image: "/placeholder.svg?height=400&width=600&query=magnolia flower crescent moon minimal",
      category: "Southern Gothic",
      price: "$10.00",
    },
  ]

  // Categories for filter
  const categories = ["All", "Southern Gothic", "Abstract", "Tarot", "Landscape", "Portrait"]

  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">
            Southern Gothic Art Gallery
          </h1>
          <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mx-auto">
            Digital art prints and Southern Gothic-inspired creations for your sanctuary.
          </p>
        </div>
      </section>

      {/* Featured Artwork */}
      {galleryItems
        .filter((item) => item.featured)
        .map((featuredItem) => (
          <section key={featuredItem.id} className="py-12 bg-midnight-blue/90">
            <div className="container mx-auto px-4">
              <div className="bg-midnight-teal/30 rounded-xl overflow-hidden shadow-2xl border border-rich-gold/20">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featuredItem.image || "/placeholder.svg"}
                      alt={featuredItem.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/70 to-transparent"></div>
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-rich-gold/20 text-rich-gold text-xs font-accent px-2 py-1 rounded-full">
                        FEATURED ARTWORK
                      </span>
                      <span className="bg-midnight-blue/40 text-magnolia-white/80 text-xs font-accent px-2 py-1 rounded-full">
                        {featuredItem.category}
                      </span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl text-rich-gold mb-4">{featuredItem.title}</h2>
                    <p className="font-body text-magnolia-white/90 mb-6">{featuredItem.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xl font-accent text-rich-gold">{featuredItem.price}</span>
                      <span className="text-sm text-magnolia-white/70">Digital Download</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/gallery/${featuredItem.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <button className="inline-flex items-center gap-2 px-6 py-3 border border-rich-gold text-rich-gold rounded-md font-accent text-sm hover:bg-rich-gold/10 transition-colors">
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

      {/* Gallery */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4">
          {/* Filter Controls */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-accent transition-colors ${
                      category === "All"
                        ? "bg-rich-gold text-midnight-blue"
                        : "bg-midnight-blue/40 text-magnolia-white/90 hover:bg-rich-gold/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-3">
                <span className="text-magnolia-white/80 text-sm">Sort by:</span>
                <div className="relative">
                  <select className="appearance-none bg-midnight-blue/40 text-magnolia-white/90 px-4 py-2 pr-8 rounded-md border border-midnight-teal/50 focus:outline-none focus:ring-2 focus:ring-rich-gold text-sm">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Popularity</option>
                  </select>
                  <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-magnolia-white/50 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {galleryItems
              .filter((item) => !item.featured)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-midnight-blue/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-midnight-blue/60 backdrop-blur-sm text-magnolia-white/90 text-xs font-accent px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-rich-gold/90 rounded-full text-midnight-blue hover:bg-rich-gold transition-colors">
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-rich-gold mb-2">{item.title}</h3>
                    <p className="font-body text-magnolia-white/80 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-accent text-lg text-rich-gold">{item.price}</span>
                      <Link
                        href={`/gallery/${item.id}`}
                        className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                      >
                        View Details
                        <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-midnight-blue/90">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-midnight-teal/20 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-rich-gold/10 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl text-rich-gold mb-4">About Our Digital Art</h2>
              <p className="font-body text-magnolia-white/90 max-w-2xl mx-auto">
                Each piece in our gallery is created with intention, drawing on Southern Gothic traditions and themes of
                healing, transformation, and resilience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-rich-gold" />
                </div>
                <h3 className="font-heading text-lg text-rich-gold mb-2">Digital Downloads</h3>
                <p className="text-sm text-magnolia-white/80">
                  Instant access to high-resolution files for printing or digital use.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-rich-gold"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m2 12 5-3 2 6 5-5 2 4 6-4"></path>
                    <path d="M19 12v7"></path>
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-rich-gold mb-2">Print Quality</h3>
                <p className="text-sm text-magnolia-white/80">
                  All artwork is optimized for high-quality printing up to 24x36 inches.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-rich-gold"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-rich-gold mb-2">Personal Use License</h3>
                <p className="text-sm text-magnolia-white/80">
                  Each purchase includes a license for personal use and display.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Art CTA */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-heading text-3xl text-rich-gold mb-6">Looking for Custom Artwork?</h2>
          <p className="font-body text-magnolia-white/90 mb-8">
            We offer custom digital art commissions tailored to your vision and needs. Perfect for personal projects,
            gifts, or business branding.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
          >
            Inquire About Custom Art
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
