import Image from "next/image"
import { CTAButton } from "@/components/ui/cta-button"

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue/90 to-midnight-teal/80 text-magnolia-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-midnight-blue/0 to-midnight-blue/30"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-rich-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-midnight-teal/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-midnight-blue/60 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-rich-gold/20">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <Image src="/southern-gothic-magnolia.png" alt="Southern Gothic Magnolia" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/70 to-transparent md:bg-gradient-to-t"></div>
              <div className="absolute inset-0 flex items-center justify-center md:hidden">
                <h2 className="font-heading text-3xl text-magnolia-white drop-shadow-lg text-center px-4">
                  Begin Your Transformation
                </h2>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <h2 className="font-heading text-3xl text-rich-gold mb-6 drop-shadow-sm hidden md:block">
                Begin Your Transformation Journey
              </h2>
              <p className="font-body text-magnolia-white/90 mb-8">
                Ready to transform your creative vision into sustainable income streams? Explore our offerings designed
                to empower your digital entrepreneurship journey.
              </p>
              <div className="space-y-4">
                {[
                  "ADHD-friendly digital products designed for your success",
                  "Trauma-informed business strategies that honor your journey",
                  "Automation tools to create sustainable income streams",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-rich-gold/20 rounded-full p-1 mt-0.5">
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
                        className="text-rich-gold"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-sm text-magnolia-white/90">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <CTAButton href="/shop" variant="primary" fullWidth>
                  START YOUR JOURNEY TODAY
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
