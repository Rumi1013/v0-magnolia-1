import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Download, Star, Check, Plus, Minus, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function ProductDetail({ params }: { params: { id: string } }) {
  // This would normally come from a database or CMS
  const product = {
    id: params.id,
    title: "The Magnolia Reset: 90-Day Sobriety + Healing Journal",
    description:
      "A trauma-informed digital journal designed to support your healing journey with ADHD-friendly layouts and prompts.",
    longDescription: `
      <p>The Magnolia Reset is a 90-day digital journal specifically designed for those on a healing journey, whether that involves sobriety, trauma recovery, or personal transformation. Created with neurodivergent minds in mind, this journal features ADHD-friendly layouts that make consistent journaling accessible and sustainable.</p>
      
      <p>Unlike traditional journals that can feel overwhelming or rigid, The Magnolia Reset offers flexible prompts and visual cues that adapt to your energy levels and focus capacity on any given day. The Southern Gothic-inspired aesthetic creates a sense of sanctuary within the pages, making your journaling practice feel like a sacred ritual rather than another task.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>90 unique daily spreads with trauma-informed prompts</li>
        <li>Weekly reflection pages to track patterns and progress</li>
        <li>Monthly review templates to celebrate growth</li>
        <li>ADHD-friendly layouts with visual cues and minimal overwhelm</li>
        <li>Beautiful Southern Gothic-inspired design elements</li>
        <li>Printable PDF format (US Letter and A4 sizes included)</li>
        <li>Digital version for use with tablet note-taking apps</li>
        <li>Hyperlinked navigation for easy digital use</li>
      </ul>
      
      <p>Whether you're in recovery, healing from trauma, or simply seeking a more intentional daily practice, The Magnolia Reset provides a structured yet gentle container for your journey.</p>
    `,
    price: "$27.00",
    salePrice: null,
    rating: 4.8,
    reviewCount: 24,
    image: "/products/magnolia-reset-journal.png",
    gallery: [
      "/products/magnolia-reset-journal.png",
      "/placeholder.svg?height=600&width=600&query=journal interior spread",
      "/placeholder.svg?height=600&width=600&query=journal prompts page",
      "/placeholder.svg?height=600&width=600&query=journal weekly reflection",
    ],
    category: "Digital Journals",
    features: [
      "90-day structured journal",
      "ADHD-friendly design",
      "Trauma-informed prompts",
      "Weekly reflection pages",
      "Printable PDF format",
      "Digital tablet version",
    ],
    fileFormat: "PDF, GoodNotes, Notability",
    pages: 196,
    relatedProducts: [
      {
        id: 3,
        title: "Passive Income Strategy Guide",
        image: "/products/passive-income-guide.png",
        price: "$37.00",
      },
      {
        id: 4,
        title: "Brand Identity Workbook",
        image: "/products/brand-identity-workbook.png",
        price: "$29.00",
      },
      {
        id: 6,
        title: "Tarot + Affirmation Deck",
        image: "/products/tarot-deck.png",
        price: "$35.00",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />

      {/* Main Content */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal/90">
        <div className="container mx-auto px-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-magnolia-white/80 hover:text-rich-gold transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery Column */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-rich-gold/20 mb-6">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.gallery.map((image, index) => (
                    <div
                      key={index}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
                        index === 0 ? "border-rich-gold" : "border-midnight-teal/30 hover:border-rich-gold/50"
                      } transition-colors`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details Column */}
            <div>
              <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-midnight-teal/30">
                <span className="inline-block px-3 py-1 bg-midnight-blue/60 text-magnolia-white/90 text-xs font-accent rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="font-heading text-3xl md:text-4xl text-rich-gold mb-4">{product.title}</h1>
                <p className="font-body text-magnolia-white/90 mb-6">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-rich-gold" : "text-midnight-teal/50"}`}
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-magnolia-white/90 text-sm">{product.rating}</span>
                  <span className="text-magnolia-white/70 text-sm">({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-8">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl font-accent text-rich-gold">{product.salePrice}</span>
                      <span className="text-xl font-accent text-magnolia-white/50 line-through">{product.price}</span>
                      <span className="bg-rich-gold/20 text-rich-gold text-xs font-accent px-2 py-1 rounded-full">
                        SALE
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-accent text-rich-gold">{product.price}</span>
                  )}
                  <span className="text-sm text-magnolia-white/70">Digital Download</span>
                </div>

                {/* Purchase Options */}
                <div className="space-y-6 mb-8">
                  {/* Quantity */}
                  <div className="flex items-center gap-4">
                    <span className="text-magnolia-white/90 w-24">Quantity:</span>
                    <div className="flex items-center">
                      <button className="p-2 bg-midnight-teal/20 rounded-l-md text-magnolia-white hover:bg-midnight-teal/30 transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value="1"
                        min="1"
                        className="w-12 text-center bg-midnight-blue/60 border-y border-midnight-teal/50 text-magnolia-white py-2"
                      />
                      <button className="p-2 bg-midnight-teal/20 rounded-r-md text-magnolia-white hover:bg-midnight-teal/30 transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Format */}
                  <div className="flex items-center gap-4">
                    <span className="text-magnolia-white/90 w-24">Format:</span>
                    <select className="bg-midnight-blue/60 text-magnolia-white px-4 py-2 rounded-md border border-midnight-teal/50 focus:outline-none focus:ring-2 focus:ring-rich-gold flex-grow">
                      <option>PDF (Printable)</option>
                      <option>GoodNotes</option>
                      <option>Notability</option>
                      <option>All Formats Bundle (+$5.00)</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors shadow-md hover:shadow-lg">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-rich-gold text-rich-gold rounded-md font-accent text-sm hover:bg-rich-gold/10 transition-colors">
                    <Download className="h-4 w-4" />
                    Buy Now
                  </button>
                </div>

                {/* Features */}
                <div className="border-t border-midnight-teal/30 pt-6 mb-6">
                  <h3 className="font-heading text-xl text-rich-gold mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-rich-gold flex-shrink-0 mt-0.5" />
                        <span className="text-magnolia-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product Details */}
                <div className="border-t border-midnight-teal/30 pt-6 mb-6">
                  <h3 className="font-heading text-xl text-rich-gold mb-4">Product Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-magnolia-white/70 mb-1">File Format</p>
                      <p className="text-magnolia-white">{product.fileFormat}</p>
                    </div>
                    <div>
                      <p className="text-magnolia-white/70 mb-1">Pages</p>
                      <p className="text-magnolia-white">{product.pages}</p>
                    </div>
                    <div>
                      <p className="text-magnolia-white/70 mb-1">License</p>
                      <p className="text-magnolia-white">Personal Use</p>
                    </div>
                    <div>
                      <p className="text-magnolia-white/70 mb-1">Delivery</p>
                      <p className="text-magnolia-white">Instant Download</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="border-t border-midnight-teal/30 pt-6">
                  <h3 className="font-heading text-xl text-rich-gold mb-4">Product Description</h3>
                  <div
                    className="prose prose-sm prose-invert max-w-none prose-headings:font-heading prose-headings:text-rich-gold prose-p:text-magnolia-white/90 prose-li:text-magnolia-white/90"
                    dangerouslySetInnerHTML={{ __html: product.longDescription }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">You May Also Like</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {product.relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-midnight-blue/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-rich-gold/90 rounded-full text-midnight-blue hover:bg-rich-gold transition-colors">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-rich-gold mb-4">{relatedProduct.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-accent text-lg text-rich-gold">{relatedProduct.price}</span>
                    <Link
                      href={`/shop/product/${relatedProduct.id}`}
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

      <SiteFooter />
    </div>
  )
}
