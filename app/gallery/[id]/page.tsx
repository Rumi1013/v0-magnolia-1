import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Download, Share2, Heart, Maximize, Plus, Minus, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function GalleryItem({ params }: { params: { id: string } }) {
  // This would normally come from a database or CMS
  const item = {
    id: params.id,
    title: "Midnight Magnolia Bloom",
    description:
      "Digital illustration capturing the ethereal beauty of magnolias under moonlight, a symbol of resilience and transformation in Southern Gothic tradition.",
    longDescription: `
      <p>This digital artwork captures the essence of the Southern Gothic aesthetic through the iconic magnolia flower, rendered in deep midnight blues and rich golds. The magnolia, a symbol of perseverance and beauty that thrives in challenging environments, is depicted in full bloom under a crescent moon.</p>
      
      <p>The piece draws on traditional Southern Gothic elements while reimagining them through a lens of healing and transformation. The contrast between the darkness of the background and the luminous quality of the magnolia represents the journey from trauma to resilience that is central to the Midnight Magnolia brand.</p>
      
      <p>Created using digital painting techniques, this artwork features multiple layers of texture and subtle gradients that create depth and dimension. The gold accents throughout the piece are inspired by kintsugi, the Japanese art of repairing broken pottery with gold, symbolizing how our broken places can become our most beautiful features when honored and transformed.</p>
    `,
    image: "/southern-gothic-magnolia.png",
    category: "Southern Gothic",
    price: "$15.00",
    dimensions: "3000 x 4500 px",
    fileFormat: "JPG, PNG, PDF",
    license: "Personal Use",
    tags: ["Southern Gothic", "Magnolia", "Moon", "Digital Art", "Healing", "Transformation"],
    relatedItems: [
      {
        id: 3,
        title: "Tarot of Transformation",
        image: "/southern-gothic-tarot.png",
        price: "$8.00",
      },
      {
        id: 8,
        title: "Magnolia and Moon",
        image: "/placeholder.svg?height=400&width=600&query=magnolia flower crescent moon minimal",
        price: "$10.00",
      },
      {
        id: 4,
        title: "Moonlit Marsh",
        image: "/placeholder.svg?key=oj7q5",
        price: "$18.00",
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
            href="/gallery"
            className="inline-flex items-center gap-2 text-magnolia-white/80 hover:text-rich-gold transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Gallery
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Column */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-rich-gold/20 mb-6">
                  <div className="relative aspect-[3/4]">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-midnight-blue/60 backdrop-blur-sm rounded-full text-magnolia-white hover:bg-rich-gold/90 hover:text-midnight-blue transition-colors">
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex justify-center gap-4">
                  <button className="p-3 rounded-full bg-midnight-teal/20 hover:bg-midnight-teal/30 transition-colors text-magnolia-white/80 hover:text-rich-gold">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-3 rounded-full bg-midnight-teal/20 hover:bg-midnight-teal/30 transition-colors text-magnolia-white/80 hover:text-rich-gold">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div>
              <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-midnight-teal/30">
                <span className="inline-block px-3 py-1 bg-midnight-blue/60 text-magnolia-white/90 text-xs font-accent rounded-full mb-4">
                  {item.category}
                </span>
                <h1 className="font-heading text-3xl md:text-4xl text-rich-gold mb-4">{item.title}</h1>
                <p className="font-body text-magnolia-white/90 mb-6">{item.description}</p>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl font-accent text-rich-gold">{item.price}</span>
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

                  {/* License Type */}
                  <div className="flex items-center gap-4">
                    <span className="text-magnolia-white/90 w-24">License:</span>
                    <select className="bg-midnight-blue/60 text-magnolia-white px-4 py-2 rounded-md border border-midnight-teal/50 focus:outline-none focus:ring-2 focus:ring-rich-gold flex-grow">
                      <option>Personal Use - $15.00</option>
                      <option>Commercial Use - $45.00</option>
                      <option>Extended License - $95.00</option>
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

                {/* Product Details */}
                <div className="border-t border-midnight-teal/30 pt-6 mb-6">
                  <h3 className="font-heading text-xl text-rich-gold mb-4">Artwork Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-magnolia-white/70 mb-1">Dimensions</p>
                      <p className="text-magnolia-white">{item.dimensions}</p>
                    </div>
                    <div>
                      <p className="text-magnolia-white/70 mb-1">File Format</p>
                      <p className="text-magnolia-white">{item.fileFormat}</p>
                    </div>
                    <div>
                      <p className="text-magnolia-white/70 mb-1">License</p>
                      <p className="text-magnolia-white">{item.license}</p>
                    </div>
                    <div>
                      <p className="text-magnolia-white/70 mb-1">Delivery</p>
                      <p className="text-magnolia-white">Instant Download</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-midnight-teal/20 text-magnolia-white/90 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="border-t border-midnight-teal/30 pt-6">
                  <h3 className="font-heading text-xl text-rich-gold mb-4">About This Artwork</h3>
                  <div
                    className="prose prose-sm prose-invert max-w-none prose-p:text-magnolia-white/90"
                    dangerouslySetInnerHTML={{ __html: item.longDescription }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Items */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">You May Also Like</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {item.relatedItems.map((relatedItem) => (
              <div
                key={relatedItem.id}
                className="bg-midnight-blue/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={relatedItem.image || "/placeholder.svg"}
                    alt={relatedItem.title}
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
                  <h3 className="font-heading text-xl text-rich-gold mb-4">{relatedItem.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-accent text-lg text-rich-gold">{relatedItem.price}</span>
                    <Link
                      href={`/gallery/${relatedItem.id}`}
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

      {/* Custom Art CTA */}
      <section className="py-16 bg-midnight-blue/90">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-heading text-3xl text-rich-gold mb-6">Want Something Custom?</h2>
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
