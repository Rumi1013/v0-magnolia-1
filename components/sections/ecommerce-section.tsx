import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingCart, Tag, CreditCard, Package } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

export function EcommerceSection() {
  const featuredProducts = [
    {
      id: 1,
      name: "Digital Entrepreneur's Starter Kit",
      price: "$47.00",
      description: "Everything you need to launch your digital business with confidence and clarity.",
      image: "/products/digital-entrepreneur-kit.png",
      category: "Business Tools",
      featured: true,
    },
    {
      id: 2,
      name: "The Magnolia Reset Journal",
      price: "$27.00",
      description: "A 90-day guided journal for healing, sobriety, and personal transformation.",
      image: "/products/magnolia-reset-journal.png",
      category: "Digital Journals",
      featured: true,
    },
    {
      id: 3,
      name: "Southern Gothic Tarot Deck",
      price: "$35.00",
      description: "A unique tarot deck featuring Black historical figures and Southern Gothic aesthetics.",
      image: "/products/tarot-deck.png",
      category: "Tarot & Affirmations",
      featured: true,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue/90 to-midnight-teal/80 text-magnolia-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-rich-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-midnight-teal/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          label="SHOP"
          title="Digital Sanctuary Products"
          description="Explore our collection of digital products designed to support your healing, creativity, and business growth."
          titleColor="text-rich-gold"
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-midnight-blue/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-rich-gold/90 text-midnight-blue text-xs font-accent px-2 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-rich-gold mb-2">{product.name}</h3>
                <p className="text-magnolia-white/80 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-accent text-magnolia-white">{product.price}</span>
                  <div className="flex gap-2">
                    <Link
                      href={`/shop/product/${product.id}`}
                      className="p-2 rounded-full bg-rich-gold/10 hover:bg-rich-gold/20 transition-colors"
                    >
                      <ArrowRight className="h-5 w-5 text-rich-gold" />
                    </Link>
                    <button className="p-2 rounded-full bg-rich-gold text-midnight-blue hover:bg-rich-gold/90 transition-colors">
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-midnight-blue/40 backdrop-blur-sm p-4 rounded-lg border border-midnight-teal/30 text-center">
            <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="h-6 w-6 text-rich-gold" />
            </div>
            <h3 className="font-heading text-lg text-magnolia-white mb-1">Secure Checkout</h3>
            <p className="text-sm text-magnolia-white/70">Safe and encrypted payment processing</p>
          </div>
          <div className="bg-midnight-blue/40 backdrop-blur-sm p-4 rounded-lg border border-midnight-teal/30 text-center">
            <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="h-6 w-6 text-rich-gold" />
            </div>
            <h3 className="font-heading text-lg text-magnolia-white mb-1">Instant Delivery</h3>
            <p className="text-sm text-magnolia-white/70">Immediate access to digital products</p>
          </div>
          <div className="bg-midnight-blue/40 backdrop-blur-sm p-4 rounded-lg border border-midnight-teal/30 text-center">
            <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Tag className="h-6 w-6 text-rich-gold" />
            </div>
            <h3 className="font-heading text-lg text-magnolia-white mb-1">Member Discounts</h3>
            <p className="text-sm text-magnolia-white/70">Special pricing for patrons</p>
          </div>
          <div className="bg-midnight-blue/40 backdrop-blur-sm p-4 rounded-lg border border-midnight-teal/30 text-center">
            <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="h-6 w-6 text-rich-gold" />
            </div>
            <h3 className="font-heading text-lg text-magnolia-white mb-1">Multiple Payment Options</h3>
            <p className="text-sm text-magnolia-white/70">Cards, PayPal, and more</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors"
          >
            Browse All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
