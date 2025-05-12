import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
// Ensure all required libraries are imported

export default function Home() {
  return (
    <>
      <Head>
        <title>Midnight Magnolia | A Southern Digital Sanctuary</title>
        <meta name="description" content="Midnight Magnolia - A digital-first brand weaving together creativity, self-healing, automation, and storytelling for women of resilience." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-midnight-blue to-midnight-teal overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 py-12 z-10">
          <div className="max-w-3xl">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-magnolia-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Midnight Magnolia:<br />
              <span className="text-rich-gold">A Southern Digital Sanctuary</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-xl text-magnolia-white/90 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A digital-first brand weaving together creativity, self-healing, automation,
              and storytelling for women of resilience. Anchored in Southern Gothic elegance,
              it's a sanctuary for transformation through art, tech, and income stability.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/shop" className="btn btn-primary px-8 py-3">
                Explore Our Shop
              </Link>
              <Link href="/midnight-magnolia/overview" className="btn btn-outline px-8 py-3">
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
          {/* This would be replaced with an actual decorative graphic */}
          <div className="w-full h-full bg-gradient-radial from-rich-gold/20 to-transparent"></div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-magnolia-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-midnight-blue">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-midnight-blue/80 max-w-2xl mx-auto">
              Explore our collection of digital products designed to support your journey
              toward creativity, healing, and resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Product 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="h-64 relative">
                {/* This would be replaced with actual product image */}
                <div className="w-full h-full bg-gradient-to-r from-midnight-teal/20 to-sage-green/20 flex items-center justify-center">
                  <span className="text-midnight-blue/60 font-heading">Tarot & Affirmation Deck</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-midnight-blue">Digital Tarot Deck</h3>
                <p className="mt-2 text-midnight-blue/80">A digital deck combining Southern Gothic imagery with ancestral wisdom.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-rich-gold font-bold">$19.95</span>
                  <Link href="/shop/products/digital-tarot-deck" className="text-sm uppercase tracking-wide font-accent text-midnight-blue hover:text-rich-gold transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Product 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="h-64 relative">
                {/* This would be replaced with actual product image */}
                <div className="w-full h-full bg-gradient-to-r from-rich-gold/20 to-sage-green/20 flex items-center justify-center">
                  <span className="text-midnight-blue/60 font-heading">Digital Journal</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-midnight-blue">Self-Healing Journal</h3>
                <p className="mt-2 text-midnight-blue/80">Interactive digital journal with guided prompts for trauma healing and resilience.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-rich-gold font-bold">$24.95</span>
                  <Link href="/shop/products/self-healing-journal" className="text-sm uppercase tracking-wide font-accent text-midnight-blue hover:text-rich-gold transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Product 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="h-64 relative">
                {/* This would be replaced with actual product image */}
                <div className="w-full h-full bg-gradient-to-r from-midnight-blue/20 to-midnight-teal/20 flex items-center justify-center">
                  <span className="text-midnight-blue/60 font-heading">Guided Meditation</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-midnight-blue">Ancestral Healing Meditation</h3>
                <p className="mt-2 text-midnight-blue/80">Audio meditation series focused on connecting with ancestral wisdom and healing.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-rich-gold font-bold">$17.95</span>
                  <Link href="/shop/products/ancestral-healing-meditation" className="text-sm uppercase tracking-wide font-accent text-midnight-blue hover:text-rich-gold transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/shop" className="btn btn-primary px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                About Midnight Magnolia
              </h2>
              <p className="mt-6 text-magnolia-white/80">
                Midnight Magnolia is more than just a brand—it's a sanctuary for women seeking transformation
                through creativity, technology, and ancestral wisdom. Founded on the principles of Southern
                Gothic elegance and resilience, we provide digital tools and resources to support your journey
                toward healing and sustainable wellness.
              </p>
              <p className="mt-4 text-magnolia-white/80">
                Our offerings are designed with ADHD-friendly principles, ensuring clear visual hierarchies,
                consistent navigation, and reduced cognitive load to make your experience seamless and accessible.
              </p>
              <div className="mt-8">
                <Link href="/midnight-magnolia/overview" className="btn btn-outline border-magnolia-white text-magnolia-white hover:bg-magnolia-white/10 px-8 py-3">
                  Learn Our Story
                </Link>
              </div>
            </div>
            <div className="relative">
              {/* This would be replaced with actual image */}
              <div className="rounded-lg overflow-hidden aspect-square bg-gradient-to-br from-midnight-teal to-midnight-blue border border-rich-gold/30 flex items-center justify-center">
                <span className="text-rich-gold font-heading text-xl">Midnight Magnolia Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-heading font-bold">
            Join Our Community
          </h2>
          <p className="mt-4 text-lg text-magnolia-white/80 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive content, early product access, and wisdom for your journey.
          </p>
          <form className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md bg-midnight-blue/40 border border-midnight-blue/30 text-magnolia-white placeholder:text-magnolia-white/50 focus:outline-none focus:ring-2 focus:ring-rich-gold"
              />
              <button
                type="submit"
                className="btn btn-primary px-6 py-3 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}