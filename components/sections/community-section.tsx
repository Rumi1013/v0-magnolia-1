import { SectionHeading } from "@/components/ui/section-heading"
import { CTAButton } from "@/components/ui/cta-button"
import Image from "next/image"
import { Users, Calendar, BookOpen, MessageCircle } from "lucide-react"

export function CommunitySection() {
  return (
    <section className="py-16 bg-midnight-blue">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our Community" subtitle="Connect with fellow resilient creators" align="center" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-xl h-[400px]">
            <Image src="/placeholder.svg?key=f9hue" alt="Midnight Magnolia Community" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/90 to-transparent flex flex-col justify-end p-6">
              <h3 className="font-heading text-2xl text-rich-gold mb-2">The Magnolia Circle</h3>
              <p className="font-body text-magnolia-white/90">
                A supportive space for women of resilience to connect, share, and grow together.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="font-heading text-3xl text-rich-gold">Join Our Supportive Community</h3>
            <p className="font-body text-magnolia-white/90">
              The Midnight Magnolia community is a digital sanctuary for women navigating transformation, healing, and
              creative expression. We center ADHD-friendly approaches, trauma-informed practices, and Southern Gothic
              aesthetics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-3">
                <div className="bg-midnight-teal/30 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-rich-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-magnolia-white">Monthly Gatherings</h4>
                  <p className="font-body text-sm text-magnolia-white/70">Virtual circles for connection and growth</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-midnight-teal/30 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-rich-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-magnolia-white">Resource Library</h4>
                  <p className="font-body text-sm text-magnolia-white/70">Shared wisdom and practical tools</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-midnight-teal/30 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-rich-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-magnolia-white">Mentorship</h4>
                  <p className="font-body text-sm text-magnolia-white/70">Support from experienced creators</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-midnight-teal/30 p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-rich-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-magnolia-white">Private Forum</h4>
                  <p className="font-body text-sm text-magnolia-white/70">Safe space for authentic connection</p>
                </div>
              </div>
            </div>

            <CTAButton href="/community" variant="primary" size="md">
              Explore Community
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}
