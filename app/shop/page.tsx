import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Filter, Search } from "lucide-react"
import AnimatedHeader from "@/components/animated-header"

export default function Shop() {
  const categories = [
    "All Products",
    "Digital Journals",
    "Tarot & Affirmations",
    "Business Tools",
    "Notion Templates",
    "Pet Accessories",
    "Digital Art",
  ]

  const products = [
    {
      id: 1,
      title: "Digital Entrepreneur's Starter Kit",
      price: "$47.00",
      category: "Business Tools",
      image: "/products/digital-entrepreneur-kit.png",
    },
    {
      id: 2,
      title: "The Magnolia Reset: 90-Day Sobriety + Healing Journal",
      price: "$27.00",
      category: "Digital Journals",
      image: "/products/magnolia-reset-journal.png",
    },
    {
      id: 3,
      title: "Passive Income Strategy Guide",
      price: "$37.00",
      category: "Business Tools",
      image: "/products/passive-income-guide.png",
    },
    {
      id: 4,
      title: "Brand Identity Workbook",
      price: "$29.00",
      category: "Business Tools",
      image: "/products/brand-identity-workbook.png",
    },
    {
      id: 5,
      title: "Notion Dashboard & Automation Templates",
      price: "$19.00",
      category: "Notion Templates",
      image: "/products/notion-templates.png",
    },
    {
      id: 6,
      title: "Tarot + Affirmation Deck",
      price: "$35.00",
      category: "Tarot & Affirmations",
      image: "/products/tarot-deck.png",
    },
    {
      id: 7,
      title: "Midnight Menagerie: Pet Bandana Set",
      price: "$24.00",
      category: "Pet Accessories",
      image: "/placeholder.svg?key=pet-bandana&height=300&width=300",
    },
    {
      id: 8,
      title: "Southern Gothic Digital Art Print Bundle",
      price: "$15.00",
      category: "Digital Art",
      image: "/placeholder.svg?key=art-prints&height=300&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-magnolia-white">
      <AnimatedHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-6">Digital Sanctuary Shop</h1>
          <p className="font-body text-xl text-magnolia-white/90 max-w-2xl mx-auto">
            Explore our collection of healing-centered digital products designed to support your journey.
          </p>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="relative w-full md:w-96 mb-6 md:mb-0">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-10 rounded-md border border-sage-green/50 focus:outline-none focus:ring-2 focus:ring-rich-gold"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-teal/50 h-4 w-4" />
            </div>

            <div className="flex items-center gap-4">
              <span className="font-body text-midnight-teal">Filter by:</span>
              <div className="relative">
                <select className="appearance-none bg-magnolia-white px-4 py-2 pr-8 rounded-md border border-sage-green/50 focus:outline-none focus:ring-2 focus:ring-rich-gold">
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-midnight-teal/50 h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-magnolia-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading text-lg text-midnight-blue">{product.title}</h3>
                    <span className="font-accent text-rich-gold font-semibold">{product.price}</span>
                  </div>
                  <p className="text-xs text-midnight-teal/60 mb-4">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/shop/product/${product.id}`}
                      className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                    >
                      View Details{" "}
                      <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="p-2 rounded-full bg-sage-green/10 hover:bg-sage-green/20 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-midnight-teal"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/10 to-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-midnight-blue mb-6">Join Our Community</h2>
          <p className="font-body text-midnight-teal/80 max-w-2xl mx-auto mb-8">
            Subscribe to receive updates on new products, special offers, and healing resources.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md border border-sage-green/50 focus:outline-none focus:ring-2 focus:ring-rich-gold flex-grow"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-rich-gold text-magnolia-white rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-midnight-teal/60 mt-3">
              We respect your privacy and will never share your information. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight-blue text-magnolia-white/80 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo/midnight-magnolia-logo-9.jpeg"
                  alt="Midnight Magnolia"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-heading text-xl text-magnolia-white">Midnight Magnolia</span>
              </div>
              <p className="font-body text-sm">
                A Southern Digital Sanctuary weaving together creativity, self-healing, automation, and storytelling.
              </p>
              <p className="font-body text-xs mt-4">
                Midnight Magnolia, LLC
                <br />
                10070 Dorchester Rd, Ste 51599
                <br />
                Summerville, SC 29485
              </p>
            </div>

            <div>
              <h4 className="font-heading text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/our-story" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Digital Journals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Tarot Deck
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Notion Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Midnight Menagerie
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://instagram.com/rumi_nationz"
                    className="font-body text-sm hover:text-rich-gold transition-colors"
                  >
                    Instagram: @rumi_nationz
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Facebook: Ruminations Shop
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    LinkedIn: Latisha Waters
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-magnolia-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="font-body text-xs">
              &copy; {new Date().getFullYear()} Midnight Magnolia | A Division of Rumi-Nations LLC | All Rights Reserved
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="font-body text-xs hover:text-rich-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="font-body text-xs hover:text-rich-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
