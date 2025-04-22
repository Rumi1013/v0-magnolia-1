import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ImageIcon, FileText, Sparkles, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Tools | Midnight Magnolia",
  description:
    "Explore our AI-powered tools for image generation and content creation that celebrate Southern heritage and digital creativity.",
}

export default function AIToolsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-midnight-blue text-magnolia-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=1080&width=1920&query=ai+generated+southern+gothic+art"
            alt="AI Tools Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">AI-Powered Creativity</h1>
            <p className="text-lg md:text-xl text-magnolia-white/80 mb-8">
              Harness the power of artificial intelligence to create stunning visuals and compelling content that
              celebrate Southern heritage and digital creativity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue" asChild>
                <Link href="/ai-image-generator">
                  <ImageIcon className="mr-2 h-5 w-5" />
                  Image Generator
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-rich-gold text-rich-gold hover:bg-rich-gold/10"
                asChild
              >
                <Link href="/ai-content-generator">
                  <FileText className="mr-2 h-5 w-5" />
                  Content Generator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Our AI Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Generator Card */}
            <Card className="overflow-hidden h-full flex flex-col border-rich-gold/20">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=600&width=800&query=ai+image+generator+southern+gothic"
                  alt="AI Image Generator"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="bg-rich-gold text-midnight-blue px-4 py-1 rounded-full text-sm font-bold">
                      Image Generator
                    </span>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">AI Image Generator</CardTitle>
                <CardDescription>
                  Create custom images that reflect your Southern heritage and creative vision using our AI-powered
                  image generator.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <h3 className="font-bold text-midnight-blue mb-3">Features:</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-rich-gold/20 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="h-3 w-3 text-rich-gold" />
                    </div>
                    <span className="text-midnight-teal">
                      Multiple style presets including Southern Gothic, Magnolia Bloom, and more
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-rich-gold/20 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="h-3 w-3 text-rich-gold" />
                    </div>
                    <span className="text-midnight-teal">Customizable aspect ratios and creativity levels</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-rich-gold/20 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="h-3 w-3 text-rich-gold" />
                    </div>
                    <span className="text-midnight-teal">Curated prompt templates to inspire your creations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-rich-gold/20 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="h-3 w-3 text-rich-gold" />
                    </div>
                    <span className="text-midnight-teal">Download and save your generated images</span>
                  </li>
                </ul>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative aspect-square rounded-md overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=200&width=200&query=ai+southern+sample+${i}`}
                        alt={`Sample ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-midnight-blue hover:bg-midnight-blue/90" asChild>
                  <Link href="/ai-image-generator">
                    Try Image Generator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Content Generator Card */}
            <Card className="overflow-hidden h-full flex flex-col border-rich-gold/20">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=600&width=800&query=ai+content+generator+southern+writing"
                  alt="AI Content Generator"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="bg-rich-gold text-midnight-blue px-4 py-1 rounded-full text-sm font-bold">
                      Content Generator
                    </span>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">AI Content Generator</CardTitle>
                <CardDescription>
                  Create compelling copy for your brand, blog posts, product descriptions, and more with our AI-powered
                  content generator.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <h3 className="font-bold text-midnight-blue mb-3">Features:</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-rich-gold/20 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="h-3 w-3 text-rich-gold" />
                    </div>
                    <span className="text-midnight-teal">
                      Multiple content types including blog posts, product descriptions, and social media
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-rich-gold/20 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="h-3 w-3 text-rich-gold" />
                    </div>
                    <span className="text-midnight-teal">
                      Adjustable tone settings including professional, casual, and Southern
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-rich-gold/20 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="h-3 w-3 text-rich-gold" />
                    </div>
                    <span className="text-midnight-teal">
                      Content that aligns with Southern heritage and Black women's resilience themes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-rich-gold/20 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="h-3 w-3 text-rich-gold" />
                    </div>
                    <span className="text-midnight-teal">Copy to clipboard functionality for easy use</span>
                  </li>
                </ul>
                <div className="bg-midnight-blue/5 p-4 rounded-md">
                  <p className="text-midnight-teal italic text-sm">
                    "The magnolia's bloom, resilient against summer storms, reminds us of our own strength—a beauty that
                    persists through adversity, roots deep in Southern soil yet reaching skyward with unwavering
                    determination."
                  </p>
                  <p className="text-xs text-midnight-teal/70 mt-2">— Sample AI-generated content</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-midnight-blue hover:bg-midnight-blue/90" asChild>
                  <Link href="/ai-content-generator">
                    Try Content Generator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-midnight-blue/5">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Choose Your Tool",
                description: "Select either the Image Generator or Content Generator based on your creative needs.",
                icon: <Zap className="h-10 w-10 text-rich-gold" />,
              },
              {
                step: 2,
                title: "Customize Your Request",
                description: "Input your prompt, select style preferences, and adjust settings to match your vision.",
                icon: <Sparkles className="h-10 w-10 text-rich-gold" />,
              },
              {
                step: 3,
                title: "Generate",
                description: "Our AI tools will process your request and create custom content or images.",
                icon: <ImageIcon className="h-10 w-10 text-rich-gold" />,
              },
              {
                step: 4,
                title: "Download & Use",
                description: "Save your creations and incorporate them into your projects and content.",
                icon: <ArrowRight className="h-10 w-10 text-rich-gold" />,
              },
            ].map((step) => (
              <Card key={step.step} className="border-rich-gold/20 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-rich-gold/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div className="h-8 w-8 rounded-full bg-midnight-blue text-magnolia-white flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <CardTitle className="font-playfair">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-midnight-teal">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-midnight-blue text-center">
            AI Showcase
          </h2>
          <p className="text-midnight-teal max-w-2xl mx-auto text-center mb-16">
            Explore examples of what our AI tools can create, from stunning Southern Gothic imagery to compelling
            content that captures the essence of Southern heritage.
          </p>

          <Tabs defaultValue="images" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-midnight-blue/10">
                <TabsTrigger
                  value="images"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Image Examples
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Content Examples
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="images">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Southern Gothic",
                    description:
                      "Moody, atmospheric imagery featuring Spanish moss, old plantation houses, and moonlit scenes",
                    image: "/placeholder.svg?height=600&width=800&query=southern+gothic+ai+art",
                  },
                  {
                    title: "Magnolia Bloom",
                    description:
                      "Soft, elegant imagery featuring magnolia flowers, pastel colors, and delicate details",
                    image: "/placeholder.svg?height=600&width=800&query=magnolia+bloom+ai+art",
                  },
                  {
                    title: "Digital Heritage",
                    description: "Modern digital art that celebrates Southern heritage and Black excellence",
                    image: "/placeholder.svg?height=600&width=800&query=digital+southern+heritage+ai+art",
                  },
                  {
                    title: "Watercolor South",
                    description:
                      "Watercolor-style paintings of Southern landscapes, architecture, and cultural elements",
                    image: "/placeholder.svg?height=600&width=800&query=watercolor+southern+ai+art",
                  },
                  {
                    title: "Vintage Southern",
                    description: "Nostalgic imagery with sepia tones reminiscent of historical Southern photography",
                    image: "/placeholder.svg?height=600&width=800&query=vintage+southern+ai+art",
                  },
                  {
                    title: "Modern Resilience",
                    description: "Contemporary imagery that symbolizes strength, growth, and resilience",
                    image: "/placeholder.svg?height=600&width=800&query=modern+resilience+ai+art",
                  },
                ].map((example, index) => (
                  <Card key={index} className="overflow-hidden h-full flex flex-col border-rich-gold/20">
                    <div className="relative h-64">
                      <Image
                        src={example.image || "/placeholder.svg"}
                        alt={example.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-playfair">{example.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-midnight-teal">{example.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Brand Story",
                    content:
                      "Like the magnolia that blooms in adversity, our brand emerged from generations of Southern resilience. Founded by women who carried wisdom in their hands and determination in their hearts, we blend traditional craftsmanship with modern innovation to create products that tell our story—one of beauty that persists, roots that run deep, and branches that reach ever skyward.",
                    type: "Brand Narrative",
                  },
                  {
                    title: "Product Description",
                    content:
                      "Our Midnight Magnolia Candle Collection captures the essence of Southern evenings—when fireflies dance among ancient oaks and the sweet perfume of magnolia blossoms mingles with night air. Hand-poured in small batches using locally-sourced beeswax, each candle features notes of magnolia, sweet tea, and a whisper of Spanish moss. More than mere illumination, these candles carry the light of our ancestors and the warmth of Southern hospitality.",
                    type: "E-commerce Copy",
                  },
                  {
                    title: "Blog Introduction",
                    content:
                      "The kitchen has always been the heart of Southern homes—a place where recipes passed down through generations tell stories of survival, celebration, and love. In this month's exploration of culinary heritage, we dive into the rich tradition of Southern preserving, where the abundance of summer harvests is transformed into jars of jewel-toned jams and pickles that sustain families through winter months. This practice, born of necessity and perfected through artistry, represents the foresight and resourcefulness that defines our heritage.",
                    type: "Blog Content",
                  },
                  {
                    title: "Social Media Post",
                    content:
                      "Under the glow of the midnight moon, our grandmothers taught us that beauty isn't just what you see—it's what endures. Today, we honor their wisdom by creating spaces where Southern heritage meets modern purpose. Double tap if you carry their strength in your spirit. ✨ #MidnightMagnolia #SouthernHeritage #BlackWomenCreate",
                    type: "Social Media",
                  },
                ].map((example, index) => (
                  <Card key={index} className="h-full flex flex-col border-rich-gold/20">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="font-playfair">{example.title}</CardTitle>
                        <span className="bg-rich-gold/10 text-rich-gold px-3 py-1 rounded-full text-xs font-medium">
                          {example.type}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="bg-midnight-blue/5 p-4 rounded-md h-full">
                        <p className="text-midnight-teal italic">"{example.content}"</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center">Pricing</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto text-center mb-16">
            Access our AI tools with flexible pricing options designed to support your creative journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Try our AI tools with basic features",
                features: [
                  "5 image generations per month",
                  "3 content generations per month",
                  "Basic style presets",
                  "Standard resolution images",
                  "Community support",
                ],
              },
              {
                name: "Premium",
                price: "$19",
                description: "Perfect for creators and small businesses",
                features: [
                  "50 image generations per month",
                  "30 content generations per month",
                  "All style presets",
                  "High resolution images",
                  "Priority support",
                  "Download history",
                ],
                featured: true,
              },
              {
                name: "Professional",
                price: "$49",
                description: "For agencies and power users",
                features: [
                  "Unlimited image generations",
                  "Unlimited content generations",
                  "All style presets + custom styles",
                  "Maximum resolution images",
                  "Priority support",
                  "API access",
                  "Commercial usage rights",
                ],
              },
            ].map((plan, i) => (
              <Card
                key={i}
                className={`h-full flex flex-col ${
                  plan.featured
                    ? "bg-rich-gold text-midnight-blue border-rich-gold"
                    : "bg-midnight-teal border-rich-gold/20 text-magnolia-white"
                }`}
              >
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-center">{plan.name}</CardTitle>
                  <div className="text-center my-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.name !== "Free" && <span className="text-sm opacity-80"> / month</span>}
                  </div>
                  <CardDescription
                    className={`text-center ${plan.featured ? "text-midnight-blue/80" : "text-magnolia-white/70"}`}
                  >
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 mr-2 flex-shrink-0 ${plan.featured ? "text-midnight-blue" : "text-rich-gold"}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.featured
                        ? "bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white"
                        : "bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
                    }`}
                  >
                    {plan.name === "Free" ? "Get Started" : "Subscribe"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How do the AI tools work?",
                a: "Our AI tools use advanced machine learning models that have been trained on diverse datasets. The image generator creates visuals based on your text prompts, while the content generator produces written content tailored to your specifications.",
              },
              {
                q: "Can I use the generated content and images commercially?",
                a: "Yes, with our Premium and Professional plans, you receive commercial usage rights for all generated content and images. The Free plan is limited to personal use only.",
              },
              {
                q: "How are these AI tools different from others?",
                a: "Our AI tools are uniquely designed to understand and incorporate Southern heritage, Black women's experiences, and digital creativity themes. They're optimized to create content and imagery that resonates with these perspectives.",
              },
              {
                q: "Is my data secure when using these tools?",
                a: "Yes, we prioritize data security. Your prompts and generated content are not stored long-term or used to train our models without explicit permission. We adhere to strict privacy policies to protect your information.",
              },
              {
                q: "Can I request specific features or improvements?",
                a: "We welcome feedback and feature requests from our community. You can submit suggestions through our feedback form, and our team regularly reviews these to enhance our tools.",
              },
            ].map((faq, i) => (
              <Card key={i} className="border-rich-gold/20">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-midnight-teal">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Ready to Create with AI?</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto mb-8">
            Start generating beautiful images and compelling content that celebrate your unique vision and Southern
            heritage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue" asChild>
              <Link href="/ai-image-generator">
                Try Image Generator
                <ImageIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-rich-gold text-rich-gold hover:bg-rich-gold/10"
              asChild
            >
              <Link href="/ai-content-generator">
                Try Content Generator
                <FileText className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
