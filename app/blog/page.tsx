import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Blog() {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Healing Through Digital Creation: A Southern Gothic Perspective",
      excerpt:
        "Explore how digital art and storytelling can be powerful tools for processing trauma and reclaiming your narrative through a Southern Gothic lens.",
      date: "May 8, 2023",
      readTime: "8 min read",
      category: "Healing",
      image: "/southern-gothic-magnolia.png",
      featured: true,
    },
    {
      id: 2,
      title: "ADHD-Friendly Business Systems That Actually Work",
      excerpt:
        "Discover practical, neurodivergent-friendly systems for managing your creative business without burning out or getting lost in the details.",
      date: "April 22, 2023",
      readTime: "6 min read",
      category: "Business",
      image: "/abstract-neurodivergent-mind.png",
    },
    {
      id: 3,
      title: "Automation as Liberation: Setting Up Your First Passive Income Stream",
      excerpt:
        "Learn how to leverage automation tools to create sustainable income streams that work while you rest, heal, and create.",
      date: "April 10, 2023",
      readTime: "10 min read",
      category: "Automation",
      image: "/passive-income-automation.png",
    },
    {
      id: 4,
      title: "The Power of Diagnosis: My Late-in-Life ADHD Journey",
      excerpt:
        "A personal reflection on receiving an ADHD diagnosis at 42 and how it transformed my understanding of past struggles and future possibilities.",
      date: "March 28, 2023",
      readTime: "7 min read",
      category: "Personal",
      image: "/placeholder.svg?key=3kkwi",
    },
    {
      id: 5,
      title: "Southern Gothic Digital Art: Symbolism and Storytelling",
      excerpt:
        "Explore the rich symbolism and storytelling traditions of Southern Gothic aesthetics and how they translate into powerful digital art.",
      date: "March 15, 2023",
      readTime: "5 min read",
      category: "Art",
      image: "/southern-gothic-tarot.png",
    },
    {
      id: 6,
      title: "Creating ADHD-Friendly Digital Products: A Designer's Guide",
      excerpt:
        "Design principles and practical tips for creating digital products that work for neurodivergent minds, based on personal experience and user research.",
      date: "February 28, 2023",
      readTime: "9 min read",
      category: "Design",
      image: "/adhd-friendly-journal.png",
    },
  ]

  // Categories for filter
  const categories = ["All", "Healing", "Business", "Automation", "Personal", "Art", "Design"]

  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">
            Midnight Magnolia Blog
          </h1>
          <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mx-auto">
            Insights, stories, and wisdom for your transformation journey.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts
        .filter((post) => post.featured)
        .map((featuredPost) => (
          <section key={featuredPost.id} className="py-12 bg-midnight-blue/90">
            <div className="container mx-auto px-4">
              <div className="bg-midnight-teal/30 rounded-xl overflow-hidden shadow-2xl border border-rich-gold/20">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/70 to-transparent"></div>
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-rich-gold/20 text-rich-gold text-xs font-accent px-2 py-1 rounded-full">
                        FEATURED
                      </span>
                      <span className="bg-midnight-blue/40 text-magnolia-white/80 text-xs font-accent px-2 py-1 rounded-full flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl text-rich-gold mb-4">{featuredPost.title}</h2>
                    <p className="font-body text-magnolia-white/90 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-magnolia-white/70 mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
                    >
                      Read Full Article
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

      {/* Blog Posts */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-accent transition-colors ${
                  category === "All"
                    ? "bg-rich-gold text-midnight-blue"
                    : "bg-midnight-blue/40 text-magnolia-white/90 hover:bg-rich-gold/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <article
                  key={post.id}
                  className="bg-midnight-blue/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-midnight-blue/60 backdrop-blur-sm text-magnolia-white/90 text-xs font-accent px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-rich-gold mb-3">{post.title}</h3>
                    <p className="font-body text-magnolia-white/80 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-magnolia-white/70">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                      >
                        Read More
                        <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-midnight-blue/90">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-midnight-teal/20 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-rich-gold/10 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl text-rich-gold mb-4">Subscribe to Our Newsletter</h2>
              <p className="font-body text-magnolia-white/90 max-w-2xl mx-auto">
                Join our community to receive the latest articles, resources, and exclusive content delivered directly
                to your inbox.
              </p>
            </div>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-magnolia-white/60 mt-3 text-center">
                We respect your privacy and will never share your information. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
