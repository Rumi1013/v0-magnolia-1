import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Feather, Sparkles, Zap, Heart, Calendar, PenTool } from "lucide-react"
import AnimatedHeader from "@/components/animated-header"

export default function Dashboard() {
  const products = [
    {
      title: "Digital Entrepreneur's Starter Kit",
      description: "Everything you need to launch your digital business with confidence and clarity.",
      icon: <Zap className="h-6 w-6 text-rich-gold" />,
      image: "/products/digital-entrepreneur-kit.png",
      link: "#",
    },
    {
      title: "The Magnolia Reset: 90-Day Sobriety + Healing Journal",
      description: "A trauma-informed journal for your healing journey with ADHD-friendly design.",
      icon: <Heart className="h-6 w-6 text-rich-gold" />,
      image: "/products/magnolia-reset-journal.png",
      link: "#",
    },
    {
      title: "Passive Income Strategy Guide",
      description: "Transform your creative skills into sustainable income streams with automation.",
      icon: <Zap className="h-6 w-6 text-rich-gold" />,
      image: "/products/passive-income-guide.png",
      link: "#",
    },
    {
      title: "Brand Identity Workbook",
      description: "Discover and define your authentic brand voice and visual identity.",
      icon: <PenTool className="h-6 w-6 text-rich-gold" />,
      image: "/products/brand-identity-workbook.png",
      link: "#",
    },
    {
      title: "Notion Dashboard & Automation Templates",
      description: "ADHD-friendly systems to streamline your workflow and boost productivity.",
      icon: <Calendar className="h-6 w-6 text-rich-gold" />,
      image: "/products/notion-templates.png",
      link: "#",
    },
    {
      title: "Tarot + Affirmation Deck",
      description: "Southern Gothic-inspired deck featuring notable Black icons and empowering affirmations.",
      icon: <Sparkles className="h-6 w-6 text-rich-gold" />,
      image: "/products/tarot-deck.png",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-magnolia-white">
      <AnimatedHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue via-midnight-teal/90 to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-rich-gold/30 rounded-full blur-xl animate-pulse"></div>
            <Image
              src="/logo/midnight-magnolia-warm.png"
              alt="Midnight Magnolia"
              fill
              className="object-cover rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">Creator Dashboard</h1>
          <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mx-auto">
            Your Southern Digital Sanctuary for transformation through art, technology, and income stability.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#products"
              className="px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm font-semibold hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
            >
              <span className="inline-flex items-center">
                Explore Products
                <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="#services"
              className="px-6 py-3 border border-magnolia-white text-magnolia-white rounded-md font-accent text-sm hover:bg-magnolia-white/10 transition-colors shadow-md"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/10 to-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-midnight-blue mb-4 drop-shadow-sm">
              Our Core Values
            </h2>
            <p className="font-body text-midnight-teal/90 max-w-2xl mx-auto">
              Midnight Magnolia is built on principles that honor your whole self and journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <h3 className="font-heading text-xl text-midnight-blue mb-3 flex items-center">
                <span className="w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center mr-3">
                  <Heart className="h-4 w-4 text-midnight-teal" />
                </span>
                Healing over Hustle
              </h3>
              <p className="font-body text-midnight-teal/90">
                We prioritize sustainable growth and well-being over burnout culture, honoring rest as a strategic
                necessity.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <h3 className="font-heading text-xl text-midnight-blue mb-3 flex items-center">
                <span className="w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center mr-3">
                  <Sparkles className="h-4 w-4 text-midnight-teal" />
                </span>
                Inclusivity and Accessibility
              </h3>
              <p className="font-body text-midnight-teal/90">
                We create spaces and tools that welcome diverse minds, bodies, and experiences with intentional design.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <h3 className="font-heading text-xl text-midnight-blue mb-3 flex items-center">
                <span className="w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center mr-3">
                  <Feather className="h-4 w-4 text-midnight-teal" />
                </span>
                Creativity as Resistance
              </h3>
              <p className="font-body text-midnight-teal/90">
                We believe in the revolutionary power of creative expression as a tool for healing and transformation.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <h3 className="font-heading text-xl text-midnight-blue mb-3 flex items-center">
                <span className="w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center mr-3">
                  <BookOpen className="h-4 w-4 text-midnight-teal" />
                </span>
                Inner-Child Nurturing
              </h3>
              <p className="font-body text-midnight-teal/90">
                We honor the healing journey by creating safe spaces for your inner child to play, heal, and grow.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <h3 className="font-heading text-xl text-midnight-blue mb-3 flex items-center">
                <span className="w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center mr-3">
                  <Zap className="h-4 w-4 text-midnight-teal" />
                </span>
                Celebration of Neurodivergence
              </h3>
              <p className="font-body text-midnight-teal/90">
                We embrace diverse minds and create tools that work with your brain, not against it.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <h3 className="font-heading text-xl text-midnight-blue mb-3 flex items-center">
                <span className="w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-midnight-teal"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                    <path d="M8.5 8.5v.01" />
                    <path d="M16 15.5v.01" />
                    <path d="M12 12v.01" />
                    <path d="M11 17v.01" />
                    <path d="M7 14v.01" />
                  </svg>
                </span>
                Deep Southern Roots, Soft Fierce Futures
              </h3>
              <p className="font-body text-midnight-teal/90">
                We honor our Southern heritage while creating new narratives of strength, resilience, and gentle power.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue via-midnight-teal/90 to-midnight-teal text-magnolia-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-rich-gold mb-4 drop-shadow-lg">Digital Products</h2>
            <p className="font-body text-magnolia-white/95 max-w-2xl mx-auto">
              Transform your creative vision into sustainable income streams with our digital offerings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-midnight-blue/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm border border-magnolia-white/10"
              >
                <div className="relative h-48">
                  <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-rich-gold/20 rounded-full flex items-center justify-center mr-2">
                      {product.icon}
                    </div>
                    <h3 className="font-heading text-xl text-rich-gold">{product.title}</h3>
                  </div>
                  <p className="font-body text-magnolia-white/90 mb-4">{product.description}</p>
                  <Link
                    href={product.link}
                    className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                  >
                    Learn More{" "}
                    <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm font-semibold hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
            >
              View All Products
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-sage-green/10 to-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-midnight-blue mb-4 drop-shadow-sm">Our Services</h2>
            <p className="font-body text-midnight-teal/90 max-w-2xl mx-auto">
              Professional support for your creative and healing journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-heading text-xl text-midnight-blue mb-3">Document Support & Branding</h3>
              <p className="font-body text-midnight-teal/90 mb-4">
                Professional document design, branding assistance, and visual identity development tailored to your
                unique vision.
              </p>
              <Link
                href="#"
                className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
              >
                Learn More <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-heading text-xl text-midnight-blue mb-3">Event Planning & Coordination</h3>
              <p className="font-body text-midnight-teal/90 mb-4">
                Thoughtful, detailed event planning with a focus on creating meaningful, accessible experiences for all
                participants.
              </p>
              <Link
                href="#"
                className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
              >
                Learn More <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-heading text-xl text-midnight-blue mb-3">Custom Digital Artwork</h3>
              <p className="font-body text-midnight-teal/90 mb-4">
                Bespoke digital illustrations, graphics, and designs that capture your essence and tell your unique
                story.
              </p>
              <Link
                href="#"
                className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
              >
                Learn More <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-heading text-xl text-midnight-blue mb-3">Healing & Creative Courses</h3>
              <p className="font-body text-midnight-teal/90 mb-4">
                Trauma-informed workshops on mindfulness, journaling, creative expression, and AI basics for personal
                growth.
              </p>
              <Link
                href="#"
                className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
              >
                Learn More <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Affirmations Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue via-midnight-teal/90 to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-rich-gold mb-4 drop-shadow-lg">
              Healing Affirmations
            </h2>
            <p className="font-body text-magnolia-white/95 max-w-2xl mx-auto">
              Words of power to carry with you on your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-midnight-blue/30 p-8 rounded-lg text-center text-magnolia-white shadow-lg border border-rich-gold/30 backdrop-blur-sm">
              <p className="font-heading text-xl italic">"You are rooted in your becoming."</p>
            </div>

            <div className="bg-midnight-blue/30 p-8 rounded-lg text-center text-magnolia-white shadow-lg border border-rich-gold/30 backdrop-blur-sm">
              <p className="font-heading text-xl italic">"Softness is your strength."</p>
            </div>

            <div className="bg-midnight-blue/30 p-8 rounded-lg text-center text-magnolia-white shadow-lg border border-rich-gold/30 backdrop-blur-sm">
              <p className="font-heading text-xl italic">"Healing is sacred, nonlinear, and yours to claim."</p>
            </div>

            <div className="bg-midnight-blue/30 p-8 rounded-lg text-center text-magnolia-white shadow-lg border border-rich-gold/30 backdrop-blur-sm">
              <p className="font-heading text-xl italic">"Bloom at your own pace."</p>
            </div>

            <div className="bg-midnight-blue/30 p-8 rounded-lg text-center text-magnolia-white shadow-lg border border-rich-gold/30 backdrop-blur-sm">
              <p className="font-heading text-xl italic">"Rest is not quitting. Rest is strategy."</p>
            </div>

            <div className="bg-midnight-blue/30 p-8 rounded-lg text-center text-magnolia-white shadow-lg border border-rich-gold/30 backdrop-blur-sm">
              <p className="font-heading text-xl italic">"Your journey is worthy of documentation."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/10 to-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-midnight-blue mb-6 drop-shadow-sm">
            Join Our Digital Sanctuary
          </h2>
          <p className="font-body text-midnight-teal/90 max-w-2xl mx-auto mb-8">
            Connect with us to receive healing affirmations, product updates, and exclusive offers designed to support
            your journey.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md border border-sage-green/50 focus:outline-none focus:ring-2 focus:ring-rich-gold flex-grow shadow-md"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm font-semibold hover:bg-rich-gold/90 transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
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
      <footer className="bg-gradient-to-b from-midnight-blue to-midnight-blue/95 text-magnolia-white/80 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo/midnight-magnolia-warm.png"
                  alt="Midnight Magnolia"
                  width={40}
                  height={40}
                  className="rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]"
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
              <h4 className="font-heading text-lg mb-4 text-rich-gold">Quick Links</h4>
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
              <h4 className="font-heading text-lg mb-4 text-rich-gold">Products</h4>
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
              <h4 className="font-heading text-lg mb-4 text-rich-gold">Connect</h4>
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
