"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section className="py-20 bg-magnolia-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-midnight-blue">
              The Story Behind <span className="text-rich-gold">Midnight Magnolia</span>
            </h2>
            <p className="text-midnight-teal mb-6">
              Like the magnolia tree that withstands storms yet continues to bloom with elegance and grace, Midnight
              Magnolia represents resilience, beauty, and the rich heritage of Southern Black women.
            </p>
            <p className="text-midnight-teal mb-6">
              Founded by Latisha Waters, Midnight Magnolia is a digital-first creative brand that transforms art,
              design, and strategy into sustainable income streams while honoring Southern heritage and Black women's
              resilience.
            </p>
            <p className="text-midnight-teal mb-8">
              Our mission is to empower creative entrepreneurs with the tools, resources, and inspiration they need to
              build thriving businesses while celebrating their unique cultural heritage.
            </p>
            <Button className="bg-midnight-blue hover:bg-midnight-blue/90">Learn More About Us</Button>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[500px] w-full">
              <div className="absolute top-0 right-0 w-4/5 h-4/5 border-2 border-rich-gold rounded-lg" />
              <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-midnight-blue/5 rounded-lg overflow-hidden">
                <Image src="/southern-town-square.png" alt="Midnight Magnolia Founder" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage-green rounded-full flex items-center justify-center">
                <span className="font-playfair text-magnolia-white text-center text-sm px-4">Est. 2025</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
