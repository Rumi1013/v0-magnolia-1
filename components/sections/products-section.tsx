import { ProductCard } from "@/components/ui/product-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { CTAButton } from "@/components/ui/cta-button"

export function ProductsSection() {
  const products = [
    {
      title: "Midnight Magnolia Tarot",
      description: "A digital tarot deck blending Southern Gothic aesthetics with ancestral wisdom.",
      image: "/tarot-deck.png",
      price: "$35.00",
      badge: { text: "POPULAR" },
      link: {
        href: "#",
        text: "Explore Deck",
      },
    },
    {
      title: "The Magnolia Reset",
      description: "90-Day Sobriety + Healing Journal with ADHD-friendly design principles.",
      image: "/digital-journal.png",
      price: "$27.00",
      badge: { text: "BESTSELLER" },
      link: {
        href: "#",
        text: "View Journal",
      },
    },
    {
      title: "Passive Income Strategy Guide",
      description: "Transform your creative skills into sustainable income streams with automation.",
      image: "/passive-income-guide.png",
      price: "$37.00",
      badge: { text: "NEW" },
      link: {
        href: "#",
        text: "Learn More",
      },
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-midnight-blue/0 to-midnight-blue/30"></div>
      <div className="absolute -top-10 right-10 w-40 h-40 bg-rich-gold/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-rich-gold/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          label="FEATURED PRODUCTS"
          title="Digital Products for Your Journey"
          description="Transform your creative vision into sustainable income streams with our digital offerings."
          titleColor="text-rich-gold"
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              image={product.image}
              price={product.price}
              badge={product.badge}
              link={product.link}
            />
          ))}
        </div>

        {/* Enhanced Products CTA */}
        <div className="text-center mt-16">
          <CTAButton href="/shop" variant="primary" size="lg">
            SHOP ALL PRODUCTS
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
