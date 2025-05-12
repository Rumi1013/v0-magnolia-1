import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Tag, ArrowLeft, Share2, Bookmark, Heart } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function BlogPost({ params }: { params: { id: string } }) {
  // This would normally come from a database or CMS
  const post = {
    id: params.id,
    title: "Healing Through Digital Creation: A Southern Gothic Perspective",
    excerpt:
      "Explore how digital art and storytelling can be powerful tools for processing trauma and reclaiming your narrative through a Southern Gothic lens.",
    content: `
      <p>In the heart of Southern Gothic tradition lies a profound understanding of trauma, resilience, and the power of storytelling. As a Black woman navigating the complex intersections of race, gender, and neurodivergence, I've found digital creation to be not just an artistic outlet, but a powerful healing modality.</p>
      
      <h2>The Healing Power of Digital Storytelling</h2>
      
      <p>Digital storytelling offers a unique opportunity to process trauma in a contained, controlled environment. Unlike traditional art forms that might require physical materials or studio space, digital creation can happen anywhere, anytime—making it accessible during moments of emotional processing.</p>
      
      <p>The Southern Gothic tradition, with its emphasis on the haunted, the hidden, and the transformative power of confronting darkness, provides a perfect framework for this healing work. When we create digital art that explores our shadows through this lens, we're participating in a long tradition of using the grotesque and the supernatural to speak truths that might otherwise remain buried.</p>
      
      <blockquote>
        "The past is never dead. It's not even past." - William Faulkner
      </blockquote>
      
      <h2>Reclaiming Narrative Through Digital Art</h2>
      
      <p>For marginalized communities, particularly Black women, the ability to control our own narratives has historically been limited. Digital creation offers a powerful counterpoint to this historical silencing. Through digital art, we can:</p>
      
      <ul>
        <li>Create imagery that centers our experiences without external gatekeeping</li>
        <li>Explore complex emotions in a safe, private space before choosing whether to share</li>
        <li>Connect with others who resonate with our visual language</li>
        <li>Document our healing journeys in ways that feel authentic and true</li>
      </ul>
      
      <h2>Southern Gothic Elements as Healing Metaphors</h2>
      
      <p>The Southern Gothic tradition offers rich symbolic language for processing trauma:</p>
      
      <p><strong>The Haunted House:</strong> Our bodies and minds that carry the imprints of past experiences</p>
      <p><strong>The Swamp or Marsh:</strong> The unconscious mind where both danger and transformation reside</p>
      <p><strong>The Magnolia:</strong> Beauty and resilience that persists despite harsh conditions</p>
      <p><strong>The Moon:</strong> Cycles of darkness and light that mirror our healing journey</p>
      
      <p>By incorporating these elements into digital art, we create visual metaphors that help us process complex emotional states without having to verbalize them explicitly.</p>
      
      <h2>Practical Steps for Healing Through Digital Creation</h2>
      
      <p>If you're interested in exploring digital creation as a healing modality, here are some starting points:</p>
      
      <ol>
        <li>Begin with simple tools that don't require extensive technical knowledge (Canva, Procreate, or even smartphone apps)</li>
        <li>Create a visual journal where you can explore emotions through color, texture, and symbolism</li>
        <li>Experiment with Southern Gothic elements that resonate with your personal experience</li>
        <li>Consider creating a series that documents your healing journey over time</li>
        <li>Share only if and when it feels right—creation for healing doesn't require an audience</li>
      </ol>
      
      <p>Remember that healing isn't linear, and neither is the creative process. Some days, your digital creation might feel cathartic and powerful; other days, it might feel frustrating or triggering. Both experiences are valid parts of the healing journey.</p>
      
      <h2>Conclusion: Digital Creation as Liberation</h2>
      
      <p>At its core, healing through digital creation is an act of liberation. It allows us to transform pain into beauty, confusion into meaning, and isolation into connection. By embracing the Southern Gothic tradition's unflinching look at darkness while maintaining hope for transformation, we create digital spaces where healing becomes possible.</p>
      
      <p>As you embark on your own journey of healing through digital creation, remember that you're not just making art—you're reclaiming your narrative, one pixel at a time.</p>
    `,
    date: "May 8, 2023",
    readTime: "8 min read",
    category: "Healing",
    image: "/southern-gothic-magnolia.png",
    author: {
      name: "Latisha Waters",
      image: "/logo/midnight-magnolia-logo-9.jpeg",
      bio: "Founder of Midnight Magnolia, digital creator, and advocate for neurodivergent-friendly business practices.",
    },
    relatedPosts: [
      {
        id: 4,
        title: "The Power of Diagnosis: My Late-in-Life ADHD Journey",
        image: "/placeholder.svg?key=x50kk",
        category: "Personal",
      },
      {
        id: 5,
        title: "Southern Gothic Digital Art: Symbolism and Storytelling",
        image: "/southern-gothic-tarot.png",
        category: "Art",
      },
      {
        id: 6,
        title: "Creating ADHD-Friendly Digital Products: A Designer's Guide",
        image: "/adhd-friendly-journal.png",
        category: "Design",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white relative">
        <div className="absolute inset-0 opacity-20">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight-blue via-midnight-blue/90 to-midnight-teal"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-magnolia-white/80 hover:text-rich-gold transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-midnight-blue/60 backdrop-blur-sm text-magnolia-white/90 text-xs font-accent px-2 py-1 rounded-full flex items-center gap-1 w-fit">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">{post.title}</h1>
          <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mb-8">{post.excerpt}</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                src={post.author.image || "/placeholder.svg"}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full border-2 border-rich-gold/30"
              />
              <div>
                <p className="font-accent text-sm text-magnolia-white">{post.author.name}</p>
                <p className="text-xs text-magnolia-white/70">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-magnolia-white/70">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="relative h-96 md:h-[500px] -mt-12 mb-12 z-20">
        <div className="container mx-auto px-4">
          <div className="relative h-full rounded-xl overflow-hidden shadow-2xl border border-rich-gold/20">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <section className="py-12 bg-midnight-blue/90">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            {/* Social Share Sidebar */}
            <div className="hidden lg:block col-span-1">
              <div className="sticky top-32 flex flex-col items-center gap-6">
                <button className="p-3 rounded-full bg-midnight-teal/20 hover:bg-midnight-teal/30 transition-colors text-magnolia-white/80 hover:text-rich-gold">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-3 rounded-full bg-midnight-teal/20 hover:bg-midnight-teal/30 transition-colors text-magnolia-white/80 hover:text-rich-gold">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-3 rounded-full bg-midnight-teal/20 hover:bg-midnight-teal/30 transition-colors text-magnolia-white/80 hover:text-rich-gold">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <article className="col-span-12 lg:col-span-8 bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-xl border border-midnight-teal/30">
              <div
                className="prose prose-lg prose-invert max-w-none prose-headings:font-heading prose-headings:text-rich-gold prose-p:text-magnolia-white/90 prose-a:text-rich-gold prose-blockquote:border-rich-gold/50 prose-blockquote:text-magnolia-white/80 prose-blockquote:italic prose-strong:text-rich-gold/90"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-midnight-teal/30">
                <div className="flex flex-wrap gap-2">
                  {["Southern Gothic", "Digital Art", "Healing", "Trauma Recovery", "Creativity"].map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-midnight-teal/20 text-magnolia-white/90 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 bg-midnight-teal/20 rounded-xl p-6 border border-rich-gold/10">
                <div className="flex items-start gap-4">
                  <Image
                    src={post.author.image || "/placeholder.svg"}
                    alt={post.author.name}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-rich-gold/30"
                  />
                  <div>
                    <h3 className="font-heading text-xl text-rich-gold mb-2">About {post.author.name}</h3>
                    <p className="text-magnolia-white/80 text-sm">{post.author.bio}</p>
                    <div className="mt-4">
                      <Link
                        href="/our-story"
                        className="text-rich-gold hover:underline text-sm inline-flex items-center gap-1 group"
                      >
                        Read More About My Story
                        <ArrowLeft className="h-3 w-3 rotate-180 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Social Share */}
              <div className="flex lg:hidden justify-center gap-4 mt-8">
                <button className="p-3 rounded-full bg-midnight-teal/20 hover:bg-midnight-teal/30 transition-colors text-magnolia-white/80 hover:text-rich-gold">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-3 rounded-full bg-midnight-teal/20 hover:bg-midnight-teal/30 transition-colors text-magnolia-white/80 hover:text-rich-gold">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-3 rounded-full bg-midnight-teal/20 hover:bg-midnight-teal/30 transition-colors text-magnolia-white/80 hover:text-rich-gold">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <div className="sticky top-32">
                <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-midnight-teal/30 mb-8">
                  <h3 className="font-heading text-xl text-rich-gold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {post.relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                        <div className="flex gap-3">
                          <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <span className="text-xs text-magnolia-white/70">{relatedPost.category}</span>
                            <h4 className="font-heading text-sm text-magnolia-white group-hover:text-rich-gold transition-colors">
                              {relatedPost.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-midnight-teal/30">
                  <h3 className="font-heading text-xl text-rich-gold mb-4">Subscribe</h3>
                  <p className="text-sm text-magnolia-white/80 mb-4">Get notified when new articles are published.</p>
                  <form>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white text-sm focus:outline-none focus:ring-2 focus:ring-rich-gold mb-3"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors shadow-md"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Articles Section */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">More Articles You Might Enjoy</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {post.relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                className="bg-midnight-blue/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-midnight-blue/60 backdrop-blur-sm text-magnolia-white/90 text-xs font-accent px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                      <Tag className="h-3 w-3" />
                      {relatedPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-rich-gold mb-4">{relatedPost.title}</h3>
                  <Link
                    href={`/blog/${relatedPost.id}`}
                    className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                  >
                    Read Article
                    <ArrowLeft className="h-3 w-3 rotate-180 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
