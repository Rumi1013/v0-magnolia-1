import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User, Clock, Search, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Blog | Midnight Magnolia",
  description:
    "Explore our blog featuring articles on Southern heritage, digital entrepreneurship, creative expression, and the stories of resilient Black women.",
}

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Symbolism of Magnolias in Southern Black Culture",
    excerpt:
      "Exploring how the magnolia flower has represented strength, beauty, and resilience in Southern Black communities throughout history.",
    content: "",
    author: "Latisha Waters",
    date: "May 15, 2025",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=800&query=magnolia+flower+southern",
    category: "Heritage",
    featured: true,
    slug: "symbolism-magnolias-southern-black-culture",
  },
  {
    id: 2,
    title: "5 Digital Tools Every Southern Creative Entrepreneur Needs",
    excerpt:
      "A curated guide to the essential digital tools that can help Southern creative entrepreneurs streamline their businesses and reach new audiences.",
    content: "",
    author: "Latisha Waters",
    date: "May 10, 2025",
    readTime: "6 min read",
    image: "/placeholder.svg?height=600&width=800&query=digital+tools+entrepreneur",
    category: "Business",
    featured: true,
    slug: "digital-tools-southern-creative-entrepreneur",
  },
  {
    id: 3,
    title: "Healing Through Art: Traditional Southern Practices for Modern Times",
    excerpt:
      "How traditional Southern artistic practices can be adapted for modern healing and wellness routines in today's fast-paced world.",
    content: "",
    author: "Maya Johnson",
    date: "May 5, 2025",
    readTime: "10 min read",
    image: "/placeholder.svg?height=600&width=800&query=southern+art+healing",
    category: "Wellness",
    featured: false,
    slug: "healing-through-art-southern-practices",
  },
  {
    id: 4,
    title: "Southern Gothic Aesthetics in Digital Design",
    excerpt:
      "How the haunting beauty of Southern Gothic imagery is influencing contemporary digital design, websites, and brand identities.",
    content: "",
    author: "Jasmine Reynolds",
    date: "April 30, 2025",
    readTime: "7 min read",
    image: "/placeholder.svg?height=600&width=800&query=southern+gothic+design",
    category: "Design",
    featured: false,
    slug: "southern-gothic-aesthetics-digital-design",
  },
  {
    id: 5,
    title: "Preserving Family Stories: A Digital Guide",
    excerpt:
      "Practical tips for documenting, digitizing, and preserving family histories and stories for future generations.",
    content: "",
    author: "Latisha Waters",
    date: "April 25, 2025",
    readTime: "9 min read",
    image: "/placeholder.svg?height=600&width=800&query=family+stories+digital+preservation",
    category: "Heritage",
    featured: false,
    slug: "preserving-family-stories-digital-guide",
  },
  {
    id: 6,
    title: "Building Community in the Digital Age: Southern Traditions Online",
    excerpt:
      "How Southern traditions of community-building and mutual support can be translated into meaningful online connections.",
    content: "",
    author: "Marcus Williams",
    date: "April 20, 2025",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=800&query=online+community+southern",
    category: "Community",
    featured: false,
    slug: "building-community-digital-age-southern-traditions",
  },
  {
    id: 7,
    title: "The Rise of Southern Tech Entrepreneurs",
    excerpt:
      "Profiles of innovative Black tech entrepreneurs from the South who are making waves in the digital landscape.",
    content: "",
    author: "Jasmine Reynolds",
    date: "April 15, 2025",
    readTime: "11 min read",
    image: "/placeholder.svg?height=600&width=800&query=southern+tech+entrepreneurs",
    category: "Business",
    featured: false,
    slug: "rise-southern-tech-entrepreneurs",
  },
  {
    id: 8,
    title: "Southern Storytelling in the Digital Era",
    excerpt:
      "How traditional Southern storytelling techniques are being adapted for blogs, podcasts, and social media.",
    content: "",
    author: "Latisha Waters",
    date: "April 10, 2025",
    readTime: "7 min read",
    image: "/placeholder.svg?height=600&width=800&query=southern+storytelling+digital",
    category: "Heritage",
    featured: false,
    slug: "southern-storytelling-digital-era",
  },
  {
    id: 9,
    title: "Mindfulness Practices Rooted in Southern Traditions",
    excerpt:
      "Exploring mindfulness and meditation practices that draw from Southern spiritual and cultural traditions.",
    content: "",
    author: "Maya Johnson",
    date: "April 5, 2025",
    readTime: "9 min read",
    image: "/placeholder.svg?height=600&width=800&query=southern+mindfulness+practices",
    category: "Wellness",
    featured: false,
    slug: "mindfulness-practices-southern-traditions",
  },
]

// Blog categories
const categories = ["All", "Heritage", "Business", "Wellness", "Design", "Community"]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-midnight-blue text-magnolia-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=1080&width=1920&query=southern+writing+desk+magnolias"
            alt="Blog Hero"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Midnight Magnolia Blog</h1>
            <p className="text-lg md:text-xl text-magnolia-white/80 mb-8">
              Insights, stories, and resources exploring Southern heritage, digital creativity, and the resilience of
              Black women entrepreneurs.
            </p>
            <div className="max-w-md mx-auto relative">
              <Input
                type="text"
                placeholder="Search articles..."
                className="bg-magnolia-white/10 border-rich-gold/30 text-magnolia-white placeholder:text-magnolia-white/50 pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-magnolia-white/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Featured Articles
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => (
                <Card key={post.id} className="overflow-hidden border-rich-gold/20">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-2/5 aspect-square">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-transparent to-transparent md:hidden" />
                      <Badge className="absolute top-4 right-4 bg-rich-gold text-midnight-blue">{post.category}</Badge>
                    </div>
                    <div className="w-full md:w-3/5 p-6">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-rich-gold border-rich-gold">
                            Featured
                          </Badge>
                          <div className="flex items-center text-midnight-teal/70 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <CardTitle className="font-playfair text-xl md:text-2xl">{post.title}</CardTitle>
                        <CardDescription className="text-sm flex items-center mt-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                          <span className="mx-2">•</span>
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 pb-4">
                        <p className="text-midnight-teal line-clamp-3">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="p-0">
                        <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue" asChild>
                          <Link href={`/blog/${post.slug}`}>
                            Read Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-20 bg-midnight-blue/5">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-midnight-blue text-center">
            All Articles
          </h2>
          <p className="text-midnight-teal max-w-2xl mx-auto text-center mb-12">
            Explore our collection of articles covering Southern heritage, digital entrepreneurship, wellness, and
            creative expression.
          </p>

          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <TabsList className="bg-midnight-blue/10">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts
                    .filter((post) => category === "All" || post.category === category)
                    .map((post) => (
                      <Card key={post.id} className="overflow-hidden h-full flex flex-col border-rich-gold/20">
                        <div className="relative aspect-video">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-4 right-4 bg-rich-gold text-midnight-blue">
                            {post.category}
                          </Badge>
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <CardDescription className="text-sm flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {post.date}
                            </CardDescription>
                            <div className="flex items-center text-midnight-teal/70 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                          <CardTitle className="font-playfair">{post.title}</CardTitle>
                          <CardDescription className="text-sm flex items-center mt-1">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-midnight-teal line-clamp-3">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full bg-midnight-blue hover:bg-midnight-blue/90" asChild>
                            <Link href={`/blog/${post.slug}`}>
                              Read Article
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-magnolia-white/80 mb-8">
              Get the latest articles, resources, and insights delivered directly to your inbox. Join our community of
              readers exploring Southern heritage, digital creativity, and stories of resilience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-magnolia-white/10 border-rich-gold/30 text-magnolia-white placeholder:text-magnolia-white/50"
              />
              <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-magnolia-white/60 text-sm mt-4">
              By subscribing, you agree to receive email communications from Midnight Magnolia. We respect your privacy
              and will never share your information.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Popular Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Southern Heritage",
                description: "Exploring the rich cultural traditions, history, and legacy of the American South.",
                icon: <BookOpen className="h-10 w-10 text-rich-gold" />,
                count: 12,
              },
              {
                title: "Digital Entrepreneurship",
                description: "Strategies, tools, and insights for building successful online businesses.",
                icon: <BookOpen className="h-10 w-10 text-rich-gold" />,
                count: 15,
              },
              {
                title: "Wellness & Healing",
                description: "Traditional and modern approaches to wellness, self-care, and healing.",
                icon: <BookOpen className="h-10 w-10 text-rich-gold" />,
                count: 9,
              },
              {
                title: "Creative Expression",
                description: "Celebrating artistic and creative practices that honor Southern traditions.",
                icon: <BookOpen className="h-10 w-10 text-rich-gold" />,
                count: 11,
              },
            ].map((topic, index) => (
              <Card key={index} className="border-rich-gold/20 h-full">
                <CardHeader>
                  <div className="mb-4">{topic.icon}</div>
                  <CardTitle className="font-playfair flex items-center justify-between">
                    {topic.title}
                    <Badge variant="outline" className="ml-2">
                      {topic.count} articles
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-midnight-teal">{topic.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                  >
                    Explore Topic
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Author Spotlight */}
      <section className="py-20 bg-midnight-blue/5">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Meet Our Contributors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Latisha Waters",
                role: "Founder & Lead Writer",
                bio: "Digital entrepreneur, Southern heritage advocate, and creative visionary behind Midnight Magnolia.",
                image: "/placeholder.svg?height=400&width=400&query=professional+black+woman+writer",
                articles: 15,
              },
              {
                name: "Maya Johnson",
                role: "Wellness Contributor",
                bio: "Holistic wellness practitioner specializing in traditional Southern healing practices and modern wellness approaches.",
                image: "/placeholder.svg?height=400&width=400&query=black+woman+wellness+expert",
                articles: 8,
              },
              {
                name: "Jasmine Reynolds",
                role: "Design & Technology Writer",
                bio: "Digital designer and tech entrepreneur exploring the intersection of Southern aesthetics and modern technology.",
                image: "/placeholder.svg?height=400&width=400&query=black+woman+tech+designer",
                articles: 10,
              },
              {
                name: "Marcus Williams",
                role: "Community & Culture Contributor",
                bio: "Community organizer and cultural historian documenting Southern Black communities and their digital evolution.",
                image: "/placeholder.svg?height=400&width=400&query=black+man+community+organizer",
                articles: 7,
              },
              {
                name: "Tasha Bennett",
                role: "Business Strategy Writer",
                bio: "Business strategist helping Southern entrepreneurs build sustainable digital businesses while honoring their heritage.",
                image: "/placeholder.svg?height=400&width=400&query=black+woman+business+strategist",
                articles: 6,
              },
              {
                name: "Become a Contributor",
                role: "Join Our Team",
                bio: "Have expertise in Southern heritage, digital creativity, or entrepreneurship? We'd love to feature your voice.",
                image: "/placeholder.svg?height=400&width=400&query=diverse+writing+team",
                articles: null,
              },
            ].map((author, index) => (
              <Card key={index} className="overflow-hidden h-full flex flex-col border-rich-gold/20">
                <div className="relative aspect-square">
                  <Image src={author.image || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="font-playfair">{author.name}</CardTitle>
                  <CardDescription className="font-medium text-rich-gold">{author.role}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-midnight-teal">{author.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                  >
                    {author.articles === null ? "Apply Now" : "View Profile"}
                  </Button>
                  {author.articles !== null && (
                    <Badge variant="outline" className="ml-2">
                      {author.articles} articles
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Share Your Perspective</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto mb-8">
            We're always looking for fresh voices and diverse perspectives to feature on the Midnight Magnolia Blog. If
            you have expertise in Southern heritage, digital entrepreneurship, or creative resilience, we'd love to hear
            from you.
          </p>
          <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
            Submit a Guest Post
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
