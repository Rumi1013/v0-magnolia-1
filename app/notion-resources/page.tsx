import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, ExternalLink } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function NotionResources() {
  const notionIcons = [
    { icon: "🌙", name: "Crescent Moon", use: "Brand Core Pages", meaning: "Transformation, night wisdom" },
    {
      icon: "🌸",
      name: "Magnolia Flower",
      use: "Main Content/Products",
      meaning: "Beauty, resilience, Southern heritage",
    },
    { icon: "✨", name: "Sparkles", use: "Special Projects", meaning: "Magic, inspiration, illumination" },
    { icon: "🕯️", name: "Candle", use: "Guidelines/Standards", meaning: "Illumination, guidance, ritual" },
    { icon: "🌿", name: "Herb Sprig", use: "Resources", meaning: "Growth, natural wisdom, healing" },
    { icon: "🧿", name: "Evil Eye", use: "Protection/Boundaries", meaning: "Setting limits, spiritual protection" },
    { icon: "🪞", name: "Mirror", use: "Self-reflection", meaning: "Shadow work, truth-seeing" },
    { icon: "🪄", name: "Magic Wand", use: "Tools & Automations", meaning: "Creation, manifestation" },
  ]

  const notionTemplates = [
    {
      title: "Digital Creator's Command Center",
      description: "Complete Notion workspace with content planning, client management, and project tracking.",
      image: "/placeholder.svg?key=e8z4p",
      price: "$47",
      featured: true,
    },
    {
      title: "Patron Content Calendar",
      description: "Streamlined system for planning, creating, and scheduling your Patreon content.",
      image: "/placeholder.svg?key=wx09b",
      price: "$37",
      featured: true,
    },
    {
      title: "Southern Digital Grimoire",
      description: "Digital journal system with tarot tracking, moon phases, and ancestral wisdom collection.",
      image: "/placeholder.svg?key=jmhsp",
      price: "$29",
      featured: true,
    },
    {
      title: "ADHD-Friendly Business Planner",
      description: "Specially designed for neurodivergent entrepreneurs with visual cues and flexible systems.",
      image: "/placeholder.svg?key=8o4gw",
      price: "$35",
      featured: false,
    },
    {
      title: "Content Repurposing System",
      description: "Turn one piece of content into multiple formats with this streamlined workflow.",
      image: "/placeholder.svg?key=sqmnk",
      price: "$25",
      featured: false,
    },
    {
      title: "Midnight Magnolia Icon Pack",
      description: "Complete set of Southern Gothic themed icons for your Notion workspace.",
      image: "/placeholder.svg?height=300&width=400&query=southern+gothic+icons+for+notion",
      price: "$15",
      featured: false,
    },
  ]

  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">Notion Resources</h1>
          <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mx-auto">
            Beautiful, functional Notion templates and resources designed with Southern Gothic aesthetics and
            ADHD-friendly systems.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-midnight-blue mb-12 text-center">Notion Templates</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {notionTemplates.map((template, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-xl text-magnolia-white mb-1">{template.title}</h3>
                    <p className="text-magnolia-white/90 text-sm">{template.price}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-body text-midnight-teal/90 mb-4">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/shop/product/${index + 1}`}
                      className="inline-flex items-center text-midnight-teal font-accent text-sm hover:underline"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="p-2 rounded-full bg-rich-gold text-midnight-blue hover:bg-rich-gold/90 transition-colors">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Icon Gallery Section */}
      <section className="py-16 bg-midnight-blue/90">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">Midnight Magnolia Notion Icons</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {notionIcons.map((item, index) => (
              <div key={index} className="bg-midnight-blue/60 p-4 rounded-lg border border-rich-gold/20 text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h4 className="font-heading text-lg text-rich-gold mb-1">{item.name}</h4>
                <p className="text-xs text-magnolia-white/80 mb-1">{item.use}</p>
                <p className="text-xs italic text-magnolia-white/70">{item.meaning}</p>
              </div>
            ))}
          </div>

          <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto border border-rich-gold/20">
            <h3 className="font-heading text-2xl text-rich-gold mb-6 text-center">Icon Implementation</h3>

            <div className="mb-6">
              <h4 className="font-heading text-lg text-magnolia-white mb-3">Primary Navigation</h4>
              <div className="bg-midnight-blue/60 p-4 rounded-lg font-mono text-sm text-magnolia-white/90 overflow-x-auto">
                <pre>
                  {`🌙 MIDNIGHT MAGNOLIA HUB
├── 📝 Monthly Content Plans
├── 🎁 Patron Offerings
│   ├── 🌱 Magnolia Seed
│   ├── 🌓 Crescent Bloom  
│   ├── 🌳 Golden Grove
│   ├── 🏛️ Moonlit Sanctuary
│   └── 👑 House of Midnight
├── 📦 Physical Packages
├── 🖋️ Blog/Written Content
├── 🎧 Audio Content
├── 🎴 Tarot/Oracle Projects
├── 🔮 Planning & Vision
├── 💰 Financial Tracking
└── 📊 Analytics Dashboard`}
                </pre>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/shop/product/6"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors"
              >
                Get the Full Icon Pack
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Patreon Automation Section */}
      <section className="py-16 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-midnight-blue mb-12 text-center">Patreon Automation Workflows</h2>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-sage-green/30 max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl text-midnight-blue mb-6">Content Creation Automation</h3>

            <div className="mb-8">
              <h4 className="font-heading text-lg text-midnight-teal mb-3">Monthly Content Batch Production System</h4>
              <p className="text-midnight-teal/90 mb-4">
                Streamline content creation by batching similar content types using Notion, Google Calendar, Canva Pro,
                and Adobe Creative Suite.
              </p>
              <div className="bg-midnight-blue/5 p-4 rounded-lg font-mono text-sm text-midnight-teal/90 overflow-x-auto">
                <pre>
                  {`1. MONTHLY PLANNING SESSION (Last Week of Previous Month)
   └── Set monthly theme in Notion content calendar
       └── Schedule 4 batch creation sessions (one content type per session)
           └── Block 2-3 hour focused time periods
               └── Prep templates and materials before each session

2. BATCH SESSION 1: VISUAL CONTENT (Week 1, Day 1)
   └── Create all month's affirmation cards
       └── Design all wallpapers
           └── Prepare tarot card imagery
               └── Export all files to organized folders

3. BATCH SESSION 2: WRITTEN CONTENT (Week 1, Day 3)
   └── Write monthly blog post
       └── Create journal prompts
           └── Draft tarot interpretations
               └── Prepare email newsletters`}
                </pre>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/shop/product/2"
                className="inline-flex items-center gap-2 px-6 py-3 bg-midnight-blue text-magnolia-white rounded-md font-accent text-sm hover:bg-midnight-blue/90 transition-colors"
              >
                Get the Complete Workflow Guide
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/90 to-midnight-teal/80 text-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">Free Resources</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg border border-midnight-teal/30">
              <h3 className="font-heading text-xl text-rich-gold mb-3">Notion Starter Template</h3>
              <p className="text-magnolia-white/80 mb-4">
                A simple but elegant Notion template to get you started with the Southern Gothic aesthetic.
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-rich-gold/20 text-rich-gold rounded-md font-accent text-sm hover:bg-rich-gold/30 transition-colors">
                Download Free Template
                <Download className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg border border-midnight-teal/30">
              <h3 className="font-heading text-xl text-rich-gold mb-3">Icon Cheat Sheet</h3>
              <p className="text-magnolia-white/80 mb-4">
                A printable PDF guide to using icons effectively in your Notion workspace.
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-rich-gold/20 text-rich-gold rounded-md font-accent text-sm hover:bg-rich-gold/30 transition-colors">
                Download Cheat Sheet
                <Download className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg border border-midnight-teal/30">
              <h3 className="font-heading text-xl text-rich-gold mb-3">Notion Setup Guide</h3>
              <p className="text-magnolia-white/80 mb-4">
                A step-by-step guide to setting up your Notion workspace with ADHD-friendly systems.
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-rich-gold/20 text-rich-gold rounded-md font-accent text-sm hover:bg-rich-gold/30 transition-colors">
                Download Guide
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
