import Hero from "@/components/hero"
import AIResearcher from "@/components/ai-researcher"
import TestimonialsSection from "@/components/testimonials-section"
import FeaturedProducts from "@/components/featured-products"
import ServicesOverview from "@/components/services-overview"
import NewsletterSignup from "@/components/newsletter-signup"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesOverview />
      <FeaturedProducts />
      <AIResearcher />
      <TestimonialsSection />
      <NewsletterSignup />
      <Footer />
    </main>
  )
}
