import ImageGenerator from "@/components/ImageGenerator"

export default function AIImageGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-midnight-blue text-center">
        AI Image Generator
      </h1>
      <p className="text-midnight-teal mb-12 text-center max-w-2xl mx-auto">
        Create custom images that reflect your Southern heritage and creative vision using our AI-powered image
        generator.
      </p>
      <ImageGenerator />
    </div>
  )
}
