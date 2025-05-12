import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function BlogPage() {
  const featuredArticles = [
    {
      title: "ADHD-Friendly Design Principles for Digital Creators",
      excerpt:
        "Learn how to create digital products and spaces that work with neurodivergent brains instead of against them.",
      image: "/abstract-neurodivergent-mind.png",
      category: "NEURODIVERGENT DESIGN",
      date: "May 10, 2023",
      author: "Latisha Waters",
      authorImage: "/professional-black-woman-portrait.png",
      slug: "/blog/articles/adhd-friendly-design",
    },
    {
      title: "Sustainable Passive Income Strategies for Creative Entrepreneurs",
      excerpt: "Discover how to build passive income streams that honor both your creativity and need for rest.",
      image: "/passive-income-guide.png",
      category: "BUSINESS STRATEGY",
      date: "April 15, 2023",
      author: "Latisha Waters",
      authorImage: "/professional-black-woman-portrait.png",
      slug: "/blog/articles/passive-income-strategies",
    },
  ]

  const recentArticles = [
    {
      title: "Creating ADHD-Friendly Journaling Practices",
      excerpt: "Journaling approaches that work with neurodivergent thinking patterns.",
      image: "/adhd-friendly-journal.png",
      category: "SELF-CARE",
      date: "March 22, 2023",
      slug: "#",
    },
    {
      title: "Southern Gothic Aesthetics in Digital Design",
      excerpt: "How to incorporate Southern Gothic elements into your digital presence.",
      image: "/southern-gothic-magnolia.png",
      category: "DESIGN",
      date: "March 5, 2023",
      slug: "#",
    },
    {
      title: "Setting Up Your First Automation System",
      excerpt: "A beginner's guide to creating your first business automation workflow.",
      image: "/passive-income-automation.png",
      category: "AUTOMATION",
      date: "February 18, 2023",
      slug: "#",
    },
    {
      title: "Using Notion to Manage Your Digital Product Business",
      excerpt: "How to set up Notion systems that streamline your digital product sales.",
      image: "/products/notion-templates.png",
      category: "PRODUCTIVITY",
      date: "February 3, 2023",
      slug: "#",
    },
  ]

  const categories = [
    "All",
    "Neurodivergent Design",
    "Business Strategy",
    "Automation",
    "Self-Care",
    "Creativity",
    "Southern Gothic",
  ]

  return (
    <div className="min-h-screen bg-magnolia-white">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="font-heading text-4xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">The Blog</h1>
            <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mx-auto">
              Insights on neurodivergent creativity, sustainable business, and Southern Gothic digital aesthetics.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-magnolia-white border-b border-midnight-blue/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full font-accent text-sm transition-colors ${
                    index === 0
                      ? "bg-midnight-blue text-magnolia-white"
                      : "bg-midnight-blue/10 text-midnight-blue hover:bg-midnight-blue/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl text-midnight-blue mb-12 text-center">Featured Articles</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {featuredArticles.map((article, index) => (
                <Link
                  key={index}
                  href={article.slug}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-60">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-rich-gold/90 text-midnight-blue px-3 py-1 rounded-md text-xs font-accent">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-midnight-blue mb-3 group-hover:text-midnight-teal transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-midnight-blue/70 mb-4">{article.excerpt}</p>
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={article.authorImage || "/placeholder.svg"}
                          alt={article.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-accent text-midnight-blue/80">{article.author}</p>
                        <p className="text-xs text-midnight-blue/60">{article.date}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 bg-midnight-blue/5">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl text-midnight-blue mb-12 text-center">Recent Articles</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {recentArticles.map((article, index) => (
                <Link
                  key={index}
                  href={article.slug}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-rich-gold/90 text-midnight-blue px-2 py-0.5 rounded text-xs font-accent">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg text-midnight-blue mb-2 group-hover:text-midnight-teal transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-midnight-blue/70 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    <p className="text-xs text-midnight-blue/60">{article.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-heading text-3xl text-rich-gold mb-4">Join Our Newsletter</h2>
            <p className="text-magnolia-white/90 mb-8">
              Get the latest articles, resources, and inspiration delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md bg-magnolia-white/10 border border-magnolia-white/20 text-magnolia-white placeholder:text-magnolia-white/50 focus:outline-none focus:ring-2 focus:ring-rich-gold"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent hover:bg-rich-gold/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
