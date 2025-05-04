import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-16 bg-[#191970] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-[#FAF3E0] mb-6">
            Ready to Bring Your Southern-Inspired Vision to Life?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's collaborate to create something beautiful that honors your Southern roots while embracing modern
            digital possibilities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970] font-medium px-8 w-full sm:w-auto"
              >
                Contact Us
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37]/20 font-medium w-full sm:w-auto"
              >
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
