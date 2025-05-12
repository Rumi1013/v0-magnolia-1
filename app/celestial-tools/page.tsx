import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Moon, Sun, Star, Calendar, Clock } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { BirthChartGenerator } from "@/components/features/birth-chart-generator"

export default function CelestialTools() {
  const celestialTools = [
    {
      title: "Birth Chart Generator",
      description: "Discover your unique celestial blueprint with our automated birth chart generator.",
      icon: <Star className="h-6 w-6 text-rich-gold" />,
      image: "/birth-chart-example.png",
      featured: true,
    },
    {
      title: "Tarot Card Pulls",
      description: "Automated daily, weekly, or monthly tarot card pulls with personalized interpretations.",
      icon: <Star className="h-6 w-6 text-rich-gold" />,
      image: "/southern-gothic-tarot.png",
    },
    {
      title: "Moon Phase Tracker",
      description: "Track lunar cycles and receive guidance for aligning your activities with moon phases.",
      icon: <Moon className="h-6 w-6 text-rich-gold" />,
      image: "/placeholder.svg?key=9tbh1",
    },
    {
      title: "Astrology Insights",
      description: "Personalized astrological insights based on current planetary transits and your birth chart.",
      icon: <Sun className="h-6 w-6 text-rich-gold" />,
      image: "/placeholder.svg?key=enl31",
    },
    {
      title: "Celestial Calendar",
      description: "Track important astrological events, retrogrades, and optimal times for different activities.",
      icon: <Calendar className="h-6 w-6 text-rich-gold" />,
      image: "/placeholder.svg?key=6jnuh",
    },
    {
      title: "Zodiac Compatibility",
      description: "Explore relationship dynamics and compatibility based on astrological profiles.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-rich-gold"
        >
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
        </svg>
      ),
      image: "/placeholder.svg?key=j1hb4",
    },
    {
      title: "Retrograde Survival Guide",
      description: "Personalized guidance for navigating planetary retrogrades based on your birth chart.",
      icon: <Clock className="h-6 w-6 text-rich-gold" />,
      image: "/placeholder.svg?key=0wrrs",
    },
  ]

  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">Celestial Tools</h1>
          <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mx-auto">
            Harness the wisdom of the stars with our automated celestial tools designed to support your healing and
            transformation journey.
          </p>
        </div>
      </section>

      {/* Featured Tool - Birth Chart */}
      <section className="py-12 bg-midnight-blue/90">
        <div className="container mx-auto px-4 max-w-5xl">
          <BirthChartGenerator />
        </div>
      </section>

      {/* All Celestial Tools */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">Explore All Celestial Tools</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {celestialTools
              .filter((tool) => !tool.featured)
              .map((tool, index) => (
                <div
                  key={index}
                  className="bg-midnight-blue/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={tool.image || "/placeholder.svg"}
                      alt={tool.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-rich-gold/20 rounded-full p-2">{tool.icon}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-rich-gold mb-3">{tool.title}</h3>
                    <p className="font-body text-magnolia-white/90 mb-4">{tool.description}</p>
                    <Link
                      href="#"
                      className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                    >
                      Try Now
                      <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Patron Portal Teaser */}
      <section className="py-16 bg-midnight-blue/90">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-midnight-teal/20 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-rich-gold/10 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl text-rich-gold mb-4">Unlock Premium Celestial Tools</h2>
              <p className="font-body text-magnolia-white/90 max-w-2xl mx-auto">
                Join our Patron Portal to access advanced celestial tools, personalized readings, and exclusive
                astrological content to deepen your cosmic journey.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-midnight-blue/40 backdrop-blur-sm p-4 rounded-lg border border-midnight-teal/30 text-center">
                <div className="w-10 h-10 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-rich-gold"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-rich-gold mb-2">Advanced Birth Charts</h3>
                <p className="text-sm text-magnolia-white/80">
                  Detailed natal charts with house placements, aspects, and personalized interpretations.
                </p>
              </div>
              <div className="bg-midnight-blue/40 backdrop-blur-sm p-4 rounded-lg border border-midnight-teal/30 text-center">
                <div className="w-10 h-10 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-rich-gold"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-rich-gold mb-2">Monthly Forecasts</h3>
                <p className="text-sm text-magnolia-white/80">
                  Personalized monthly astrological forecasts based on your birth chart.
                </p>
              </div>
              <div className="bg-midnight-blue/40 backdrop-blur-sm p-4 rounded-lg border border-midnight-teal/30 text-center">
                <div className="w-10 h-10 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-rich-gold"
                  >
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-rich-gold mb-2">Live Q&A Sessions</h3>
                <p className="text-sm text-magnolia-white/80">
                  Monthly live sessions with our astrologer to answer your celestial questions.
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/patron-portal"
                className="inline-flex items-center gap-2 px-8 py-4 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
              >
                Join Patron Portal
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">What Users Say</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-rich-gold/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src="/professional-black-woman-portrait.png" alt="User" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-heading text-lg text-rich-gold">Amara J.</p>
                  <p className="text-sm text-magnolia-white/80">Birth Chart User</p>
                </div>
              </div>
              <p className="text-magnolia-white/90 italic">
                "The birth chart generator provided insights that were eerily accurate. It helped me understand patterns
                in my life that I've been trying to make sense of for years. The Southern Gothic aesthetic makes the
                whole experience feel sacred and special."
              </p>
            </div>

            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-rich-gold/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?key=4n6q7" alt="User" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-heading text-lg text-rich-gold">Tasha M.</p>
                  <p className="text-sm text-magnolia-white/80">Tarot Pull Subscriber</p>
                </div>
              </div>
              <p className="text-magnolia-white/90 italic">
                "The automated tarot pulls have become an essential part of my morning routine. They provide just the
                right amount of guidance to set my intention for the day. The interpretations are thoughtful and
                nuanced, not generic like other services I've tried."
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
