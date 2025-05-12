import { CTAButton } from "@/components/ui/cta-button"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-midnight-teal to-midnight-blue">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl md:text-5xl text-rich-gold mb-6">Begin Your Transformation Journey</h2>
        <p className="font-body text-lg text-magnolia-white/90 max-w-2xl mx-auto mb-10">
          Join our community of resilient creators and access tools, resources, and support for your personal and
          creative growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/patron-portal" variant="primary" size="lg">
            Become a Patron
          </CTAButton>
          <CTAButton href="/shop" variant="outline" size="lg">
            Explore Products
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
