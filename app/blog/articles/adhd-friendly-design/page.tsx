import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function ADHDFriendlyDesignArticle() {
  return (
    <div className="min-h-screen bg-magnolia-white">
      <SiteHeader />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-midnight-blue/70 hover:text-midnight-blue mb-8 font-accent text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <div className="bg-rich-gold/10 text-midnight-blue/80 px-3 py-1 rounded-md inline-block font-accent text-sm mb-4">
              NEURODIVERGENT DESIGN
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-midnight-blue mb-4">
              ADHD-Friendly Design Principles for Digital Creators
            </h1>
            <div className="flex items-center gap-3 text-midnight-blue/70 mb-6">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src="/professional-black-woman-portrait.png" alt="Author" fill className="object-cover" />
              </div>
              <div>
                <p className="font-accent text-sm">Latisha Waters</p>
                <p className="text-xs">May 10, 2023 · 8 min read</p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-80 mb-10 rounded-xl overflow-hidden">
            <Image src="/abstract-neurodivergent-mind.png" alt="ADHD-Friendly Design" fill className="object-cover" />
          </div>

          <div className="prose prose-lg max-w-none text-midnight-blue/90">
            <p className="lead font-heading text-xl">
              As a neurodivergent creator diagnosed with ADHD in my 40s, I've spent years adapting digital spaces to
              work with my brain instead of against it. Here are the design principles I've developed that can help make
              your digital products more accessible and effective for neurodivergent users.
            </p>

            <h2>Understanding the ADHD Brain</h2>
            <p>
              ADHD brains process information differently. We often experience challenges with executive function,
              working memory, and attention regulation—not a deficit of attention, but inconsistent control over where
              our attention goes. This means traditional digital interfaces can create significant friction for us.
            </p>

            <h2>Key Design Principles</h2>

            <h3>1. Clear Visual Hierarchy</h3>
            <p>
              ADHD brains can struggle to filter important information from background noise. A strong visual hierarchy
              helps direct attention to what matters most:
            </p>
            <ul>
              <li>Use size, color, and spacing to clearly indicate importance</li>
              <li>Limit the number of competing visual elements</li>
              <li>Create breathing room with generous white space</li>
              <li>Use consistent patterns for similar information</li>
            </ul>

            <h3>2. Reduce Cognitive Load</h3>
            <p>
              Working memory challenges mean we benefit from designs that don't require holding multiple pieces of
              information in mind:
            </p>
            <ul>
              <li>Break complex processes into clear, manageable steps</li>
              <li>Use progressive disclosure to reveal information as needed</li>
              <li>Provide visual cues and feedback for completed actions</li>
              <li>Include visible reminders of context and progress</li>
            </ul>

            <h3>3. Minimize Distractions</h3>
            <p>Attention regulation difficulties make it crucial to create focused environments:</p>
            <ul>
              <li>Remove unnecessary animations and movement</li>
              <li>Create distraction-free reading/working modes</li>
              <li>Use subtle background colors to reduce visual strain</li>
              <li>Avoid auto-playing media or intrusive notifications</li>
            </ul>

            <h3>4. Provide Multiple Pathways</h3>
            <p>ADHD often comes with different information processing preferences:</p>
            <ul>
              <li>Offer both visual and text-based navigation options</li>
              <li>Include search functionality with forgiving search parameters</li>
              <li>Provide multiple ways to accomplish the same task</li>
              <li>Support both linear and non-linear exploration</li>
            </ul>

            <h2>Practical Applications</h2>

            <h3>For Digital Products</h3>
            <p>When creating digital products like courses, ebooks, or templates:</p>
            <ul>
              <li>Include a "quick start" option alongside comprehensive instructions</li>
              <li>Create visual roadmaps that show overall structure</li>
              <li>Use consistent color coding for different types of content</li>
              <li>Break content into smaller, digestible modules</li>
              <li>Include progress tracking and completion markers</li>
            </ul>

            <h3>For Websites</h3>
            <p>For websites and online platforms:</p>
            <ul>
              <li>Simplify navigation with clear, descriptive labels</li>
              <li>Use breadcrumbs to maintain context</li>
              <li>Implement forgiving form validation with clear error messages</li>
              <li>Provide estimated reading times for longer content</li>
              <li>Include table of contents for navigation within long pages</li>
            </ul>

            <h2>Testing With Neurodivergent Users</h2>
            <p>
              The most valuable approach is to include neurodivergent users in your testing process. What works for
              neurotypical users may create unexpected friction for those with ADHD, autism, or other neurodivergent
              conditions.
            </p>

            <h2>Conclusion</h2>
            <p>
              Designing for neurodivergence isn't just about accommodation—it often results in better experiences for
              everyone. Clear structure, reduced cognitive load, and multiple pathways benefit all users, creating more
              intuitive and accessible digital spaces.
            </p>
            <p>
              By implementing these principles, you're not only making your digital products more accessible to the
              estimated 15-20% of the population with some form of neurodivergence—you're creating better experiences
              for everyone navigating our increasingly complex digital world.
            </p>
          </div>

          <div className="mt-12 p-6 bg-midnight-blue/10 rounded-xl">
            <h3 className="font-heading text-xl text-midnight-teal mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image src="/professional-black-woman-portrait.png" alt="Author" fill className="object-cover" />
              </div>
              <div>
                <p className="font-accent text-midnight-blue font-medium mb-2">Latisha Waters</p>
                <p className="text-midnight-blue/80 text-sm">
                  Latisha is the founder of Midnight Magnolia, a digital sanctuary for neurodivergent creators. With a
                  background in web development and a late-in-life ADHD diagnosis, she creates systems and designs that
                  work with diverse brain wiring instead of against it.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-midnight-blue/20 pt-8">
            <h3 className="font-heading text-2xl text-midnight-teal mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/blog"
                className="group block bg-magnolia-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/adhd-friendly-journal.png"
                    alt="Related Article"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h4 className="font-heading text-lg text-midnight-blue group-hover:text-midnight-teal transition-colors">
                  Creating ADHD-Friendly Journaling Practices
                </h4>
              </Link>
              <Link
                href="/blog"
                className="group block bg-magnolia-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/passive-income-automation.png"
                    alt="Related Article"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h4 className="font-heading text-lg text-midnight-blue group-hover:text-midnight-teal transition-colors">
                  Automation Systems for Neurodivergent Entrepreneurs
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
