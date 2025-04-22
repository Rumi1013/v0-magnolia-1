import ContentGenerator from "@/components/ContentGenerator"

export default function AIContentGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-midnight-blue text-center">
        AI Content Generator
      </h1>
      <p className="text-midnight-teal mb-12 text-center max-w-2xl mx-auto">
        Use our AI-powered content generator to create compelling copy for your brand, blog posts, product descriptions,
        and more.
      </p>
      <ContentGenerator />
    </div>
  )
}
