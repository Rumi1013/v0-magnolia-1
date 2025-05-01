import { TestimonialsSection } from "@/components/testimonials-section"

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-[#FAF3E0] mb-4">Client Testimonials</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover what our clients have to say about working with Midnight Magnolia.
        </p>
      </div>

      <TestimonialsSection />
    </div>
  )
}
