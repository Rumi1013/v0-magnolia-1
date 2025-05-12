import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Feather, Sparkles, BookOpen } from "lucide-react"
import AnimatedHeader from "@/components/animated-header"

export default function Home() {
  return (
    <div className="min-h-screen bg-magnolia-white">
      {/* Animated Header */}
      <AnimatedHeader />

      {/* Hero Section with Logo */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-magnolia-white via-sage-green/5 to-sage-green/20">
        <div className="container mx-auto px-4 text-center mb-12">
          <div className="max-w-md mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-rich-gold/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative z-10 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] overflow-hidden">
              <Image
                src="/logo/midnight-magnolia-warm.png"
                alt="Midnight Magnolia"
                width={400}
                height={400}
                className="w-full h-auto animate-float"
                priority
              />
            </div>
          </div>
          <h1 className="sr-only">Midnight Magnolia - A Southern Digital Sanctuary</h1>
          <p className="font-body text-lg text-midnight-blue/90 max-w-2xl mx-auto drop-shadow-sm">
            Weaving together creativity, self-healing, automation, and storytelling for women of resilience. Anchored in
            Southern Gothic elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/our-story"
              className="px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm font-semibold hover:bg-rich-gold/90 transition-colors text-center group shadow-md hover:shadow-lg"
            >
              <span className="inline-flex items-center">
                Our Story
                <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 border-2 border-midnight-blue/80 text-midnight-blue/90 rounded-md font-accent text-sm hover:bg-midnight-blue/5 transition-colors text-center shadow-md"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Manifesto Preview Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl text-center mb-12 text-rich-gold drop-shadow-lg">
              The Story Behind Midnight Magnolia
            </h2>

            <div className="bg-midnight-blue/50 p-8 rounded-lg border-l-4 border-rich-gold mb-12 shadow-lg">
              <p className="font-heading text-xl italic text-magnolia-white/90">
                "A journey of transformation, resilience, and reclamation that birthed not just a business, but a
                movement for financial autonomy and creative freedom."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="bg-midnight-blue/30 p-6 rounded-lg shadow-lg">
                <h3 className="font-heading text-2xl text-rich-gold mb-4 drop-shadow-md">Origins in Transformation</h3>
                <p className="font-body text-magnolia-white/90 mb-4">
                  Midnight Magnolia was born from the ashes of burnout, the trauma of activism, and the journey of
                  self-discovery that follows when you finally choose yourself.
                </p>
                <Link
                  href="/our-story"
                  className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                >
                  Read more <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="bg-midnight-blue/30 p-6 rounded-lg shadow-lg">
                <h3 className="font-heading text-2xl text-rich-gold mb-4 drop-shadow-md">The Power of Diagnosis</h3>
                <p className="font-body text-magnolia-white/90 mb-4">
                  At 42, I received an ADHD diagnosis that finally provided context for what I had experienced as
                  failure. I wasn't broken—I was wired differently in a world that never learned to listen.
                </p>
                <Link
                  href="/our-story"
                  className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                >
                  Read more <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm font-semibold hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
              >
                Read the Full Story
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Philosophy Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/20 to-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-midnight-blue mb-4 drop-shadow-sm">
              A New Paradigm of Business
            </h2>
            <p className="font-body text-midnight-teal/90 max-w-2xl mx-auto">
              Midnight Magnolia isn't just a creative brand—it's a referendum on how business should work. It's a space
              for neurodivergent, chronically pained, brilliant Black women to rest, to create, to heal, to thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mb-4">
                <Feather className="h-6 w-6 text-midnight-teal" />
              </div>
              <h3 className="font-heading text-xl text-midnight-blue mb-2">Digital Strategy & Design</h3>
              <p className="font-body text-midnight-teal/90">
                Creating seamless experiences that not only look beautiful but function intuitively—because I understand
                how both the code and the human need to work together.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-midnight-teal" />
              </div>
              <h3 className="font-heading text-xl text-midnight-blue mb-2">Trauma-Informed Business</h3>
              <p className="font-body text-midnight-teal/90">
                A strategy rooted in understanding how trauma impacts decision-making, productivity, and sustainable
                growth—creating systems that honor the whole person.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mb-4">
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
                  className="h-6 w-6 text-midnight-teal"
                >
                  <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-2"></path>
                  <path d="M9 10h10l-3-3"></path>
                  <path d="M9 14h10l-3 3"></path>
                </svg>
              </div>
              <h3 className="font-heading text-xl text-midnight-blue mb-2">Neurodivergent Design</h3>
              <p className="font-body text-midnight-teal/90">
                Creating digital spaces and systems that work for diverse minds and processing styles, with
                ADHD-friendly design principles.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-midnight-teal" />
              </div>
              <h3 className="font-heading text-xl text-midnight-blue mb-2">Automation for Liberation</h3>
              <p className="font-body text-midnight-teal/90">
                Developing automated systems that create freedom—both financial and temporal—so that creators can focus
                on their genius zone instead of repetitive tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Name Meaning Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue via-midnight-teal/90 to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl text-center mb-12 text-rich-gold drop-shadow-lg">
              The Meaning Behind the Name
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-midnight-blue/30 p-6 rounded-lg shadow-lg">
                <h3 className="font-heading text-2xl text-rich-gold mb-4 drop-shadow-md">Midnight</h3>
                <p className="font-body text-magnolia-white/95 mb-4">
                  Midnight represents the threshold between endings and beginnings, symbolizing transformation, deep
                  introspection, and the power of unseen potential. Midnight is the hour of change, where clarity
                  emerges from darkness.
                </p>
              </div>

              <div className="bg-midnight-blue/30 p-6 rounded-lg shadow-lg">
                <h3 className="font-heading text-2xl text-rich-gold mb-4 drop-shadow-md">Magnolia</h3>
                <p className="font-body text-magnolia-white/95 mb-4">
                  Magnolia signifies perseverance, dignity, and beauty in resilience. Magnolias bloom through adversity,
                  symbolizing the endurance of Black women in challenging environments. The magnolia tree is strong,
                  deeply rooted, and able to withstand storms.
                </p>
              </div>
            </div>

            <div className="bg-magnolia-white/10 p-8 rounded-lg border-l-4 border-rich-gold mt-12 shadow-lg backdrop-blur-sm">
              <p className="font-heading text-xl italic text-magnolia-white/95 text-center drop-shadow-md">
                "I am not who I was. But every part of her lives in me. Honored. Released. Transformed."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/20 to-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-midnight-blue mb-4 drop-shadow-sm">
              Digital Products
            </h2>
            <p className="font-body text-midnight-teal/90 max-w-2xl mx-auto">
              Transform your creative vision into sustainable income streams with our digital offerings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-magnolia-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-sage-green/20">
              <div className="relative h-48">
                <Image src="/southern-gothic-tarot.png" alt="Midnight Magnolia Tarot" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-midnight-blue mb-2">Midnight Magnolia Tarot</h3>
                <p className="font-body text-midnight-teal/90 mb-4">
                  A digital tarot deck blending Southern Gothic aesthetics with ancestral wisdom.
                </p>
                <Link
                  href="#"
                  className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                >
                  Explore Deck{" "}
                  <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="bg-magnolia-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-sage-green/20">
              <div className="relative h-48">
                <Image src="/adhd-friendly-journal.png" alt="Digital Journals" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-midnight-blue mb-2">The Magnolia Reset</h3>
                <p className="font-body text-midnight-teal/90 mb-4">
                  90-Day Sobriety + Healing Journal with ADHD-friendly design principles.
                </p>
                <Link
                  href="#"
                  className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                >
                  View Journal{" "}
                  <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="bg-magnolia-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-sage-green/20">
              <div className="relative h-48">
                <Image
                  src="/passive-income-automation.png"
                  alt="Passive Income Strategy Guide"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-midnight-blue mb-2">Passive Income Strategy Guide</h3>
                <p className="font-body text-midnight-teal/90 mb-4">
                  Transform your creative skills into sustainable income streams with automation.
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/10 to-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-midnight-blue mb-6 drop-shadow-sm">
            Begin Your Transformation Journey
          </h2>
          <p className="font-body text-midnight-teal/90 max-w-2xl mx-auto mb-8">
            Ready to transform your creative vision into sustainable income streams? Explore our offerings designed to
            empower your digital entrepreneurship journey.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm font-semibold hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
          >
            EXPLORE OUR SERVICES
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
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
                    Tarot Deck
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Digital Journals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Strategy Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Notion Templates
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
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Pinterest
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                    Newsletter
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
