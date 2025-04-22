import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Download, BookOpen, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Shop | Midnight Magnolia",
  description:
    "Explore our curated collection of digital and physical products designed to inspire, empower, and celebrate Southern heritage and creativity.",
}

// Product categories and items
const products = {
  digital: [
    {
      id: 1,
      name: "Digital Entrepreneur's Starter Kit",
      description:
        "Business plan template, content calendar, financial tracker, brand guide template, automation checklist",
      price: 37,
      image: "/digital-launchpad.png",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Brand Identity Workbook",
      description:
        "Brand discovery questions, visual identity exercises, voice development worksheets, brand story framework",
      price: 29,
      image: "/brand-identity-workbook-concept.png",
      badge: "New",
    },
    {
      id: 3,
      name: "Automation Workflow Templates",
      description:
        "Content planning system, client management database, product development pipeline, financial dashboard",
      price: 49,
      image: "/interconnected-automation.png",
      badge: null,
    },
    {
      id: 4,
      name: "Southern Digital Art Collection",
      description: "10 high-resolution digital art pieces celebrating Southern heritage and Black excellence",
      price: 59,
      image: "/southern-charm-gallery.png",
      badge: null,
    },
  ],
  resources: [
    {
      id: 5,
      name: "Through Our Eyes Resource Library",
      description: "Expungement guides, abuse recovery resources, trauma healing, community support",
      price: 79,
      image: "/nature-nurture-library.png",
      badge: "Featured",
    },
    {
      id: 6,
      name: "Southern Heritage Digital Art Collection",
      description: "Digital art prints featuring influential Black women figures, Southern motifs",
      price: 45,
      image: "/placeholder.svg?height=400&width=600&query=southern+heritage+art",
      badge: "Limited",
    },
    {
      id: 7,
      name: "Astrology and Wellness Content Suite",
      description: "Personalized guides, journal prompts, wellness practices",
      price: 39,
      image: "/placeholder.svg?height=400&width=600&query=astrology+wellness+content",
      badge: null,
    },
    {
      id: 8,
      name: "Business Strategy Playbook",
      description: "Comprehensive guide for Southern entrepreneurs building sustainable businesses",
      price: 65,
      image: "/placeholder.svg?height=400&width=600&query=business+strategy+playbook",
      badge: null,
    },
  ],
  physical: [
    {
      id: 9,
      name: "Midnight Menagerie Pet Accessories",
      description: "Pet products with Southern Gothic aesthetic",
      price: 25,
      image: "/placeholder.svg?height=400&width=600&query=gothic+pet+accessories",
      badge: "New Line",
    },
    {
      id: 10,
      name: "Southern Roots Art Print",
      description: "Limited edition art print celebrating Southern heritage",
      price: 65,
      image: "/placeholder.svg?height=400&width=600&query=southern+roots+art+print",
      badge: null,
    },
    {
      id: 11,
      name: "Magnolia Stationery Set",
      description: "Elegant stationery featuring magnolia motifs",
      price: 35,
      image: "/placeholder.svg?height=400&width=600&query=magnolia+stationery+set",
      badge: null,
    },
    {
      id: 12,
      name: "Southern Gothic Candle Collection",
      description: "Hand-poured candles with scents inspired by Southern landscapes",
      price: 42,
      image: "/placeholder.svg?height=400&width=600&query=southern+gothic+candles",
      badge: "Limited Edition",
    },
  ],
}

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-midnight-blue text-magnolia-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=1080&width=1920&query=southern+gothic+shop+display"
            alt="Shop Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Curated Collections</h1>
            <p className="text-lg md:text-xl text-magnolia-white/80 mb-8">
              Explore our thoughtfully crafted digital and physical products designed to inspire, empower, and celebrate
              Southern heritage and creativity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                Digital Products
              </Button>
              <Button size="lg" variant="outline" className="border-rich-gold text-rich-gold hover:bg-rich-gold/10">
                Physical Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Shop Our Collections
          </h2>

          <Tabs defaultValue="digital" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-midnight-blue/5">
                <TabsTrigger
                  value="digital"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Digital Products
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="physical"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Physical Products
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(products).map(([category, items]) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {items.map((product) => (
                    <Card key={product.id} className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-64">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {product.badge && (
                          <Badge className="absolute top-4 right-4 bg-rich-gold text-midnight-blue">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="font-playfair">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-midnight-blue">${product.price}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-midnight-blue hover:bg-midnight-blue/90">
                          {category === "digital" ? (
                            <Download className="mr-2 h-4 w-4" />
                          ) : category === "resources" ? (
                            <BookOpen className="mr-2 h-4 w-4" />
                          ) : (
                            <ShoppingBag className="mr-2 h-4 w-4" />
                          )}
                          <span>
                            {category === "digital"
                              ? "Download Now"
                              : category === "resources"
                                ? "View Details"
                                : "Add to Cart"}
                          </span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-20 bg-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Join Our Membership</h2>
              <p className="text-magnolia-white/80 mb-6">
                Get unlimited access to our entire digital product library, monthly exclusive resources, and special
                member pricing on physical products with our Midnight Magnolia Membership.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-rich-gold flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-midnight-blue"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Unlimited access to all digital products</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-rich-gold flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-midnight-blue"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Monthly exclusive resources and templates</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-rich-gold flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-midnight-blue"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>20% discount on all physical products</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-rich-gold flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-midnight-blue"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Private community access and monthly Q&A sessions</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                  Join Now - $29/month
                </Button>
                <Button size="lg" variant="outline" className="border-rich-gold text-rich-gold hover:bg-rich-gold/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=600&query=southern+gothic+membership+benefits"
                  alt="Membership Benefits"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="bg-rich-gold text-midnight-blue px-4 py-1 rounded-full text-sm font-bold">
                      Premium Membership
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-midnight-blue/5 border-none">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=100&width=100&query=portrait+testimonial+${i}`}
                        alt="Customer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base font-playfair">
                        {["Sarah Johnson", "Michael Williams", "Tanya Rodriguez"][i - 1]}
                      </CardTitle>
                      <CardDescription>
                        {["Digital Entrepreneur", "Small Business Owner", "Artist & Creator"][i - 1]}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex text-rich-gold mb-2">
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-midnight-blue">
                    {
                      [
                        "The Digital Entrepreneur's Starter Kit has been a game-changer for my business. The templates are beautiful and so easy to customize to my brand.",
                        "I've purchased several digital products and the quality is consistently excellent. The Southern Heritage Collection is my absolute favorite.",
                        "The Through Our Eyes Resource Library provided exactly what I needed during a difficult time. Thoughtfully created with such care and understanding.",
                      ][i - 1]
                    }
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-midnight-blue/5">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How do I access my digital products after purchase?",
                a: "After completing your purchase, you'll receive an email with download links. You can also access all your digital products from your account dashboard at any time.",
              },
              {
                q: "What is your refund policy?",
                a: "We offer a 14-day satisfaction guarantee on all digital products. If you're not satisfied, please contact our support team for assistance or a refund.",
              },
              {
                q: "Can I use these products for client work?",
                a: "Yes! Our Standard License allows you to use our products for both personal and client projects. The only restriction is reselling or redistributing the original files.",
              },
              {
                q: "How often do you add new products?",
                a: "We release new products monthly. Members get early access to all new releases and exclusive member-only content.",
              },
              {
                q: "Do you ship physical products internationally?",
                a: "Yes, we ship worldwide. International shipping rates and delivery times vary by location.",
              },
            ].map((faq, i) => (
              <Card key={i} className="border-rich-gold/20">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-midnight-teal">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Creative Journey?</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto mb-8">
            Explore our curated collections and find the perfect resources to support your creative vision and business
            growth.
          </p>
          <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
            Browse All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
