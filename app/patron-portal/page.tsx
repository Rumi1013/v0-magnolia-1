import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { MonthlyContentSection } from "@/components/sections/monthly-content-section"

export default function PatronPortal() {
  const membershipTiers = [
    {
      name: "Magnolia Seed",
      price: "$3/month",
      tagline: "Plant the seeds of transformation",
      icon: "🌱",
      description:
        "Join the beginning of our journey with monthly affirmations, digital wallpapers, and community recognition.",
      features: [
        "Monthly digital affirmation cards",
        "Exclusive phone/desktop wallpapers",
        "Supporter recognition",
        "Access to patron-only feed",
      ],
      popular: false,
    },
    {
      name: "Crescent Bloom",
      price: "$7/month",
      tagline: "Illuminate your path through shadow and light",
      icon: "🌙",
      description: "Expand your experience with tarot insights and exclusive content to guide your journey.",
      features: [
        "Everything in Magnolia Seed tier",
        "Monthly digital tarot card",
        "Private blog/vlog content",
        "Archived content access",
        "Early announcements",
      ],
      popular: true,
    },
    {
      name: "Golden Grove",
      price: "$15/month",
      tagline: "Nurture your creative spirit and ancestral wisdom",
      icon: "✨",
      description: "Deepen your practice with journals, audio rituals, and exclusive previews of upcoming creations.",
      features: [
        "Everything in previous tiers",
        "Monthly printable journal pages",
        "Guided audio rituals or playlists",
        "Sneak peeks of upcoming products",
        "10% discount code for shop",
      ],
      popular: false,
    },
    {
      name: "Moonlit Sanctuary",
      price: "$30/month",
      tagline: "Enter the sacred space of collective healing",
      icon: "🌑",
      description: "Join our inner circle with personalized content, early access, and community gatherings.",
      features: [
        "Everything in previous tiers",
        "Personalized monthly affirmation",
        "Early access to product releases",
        "Quarterly community circle",
        "Input on monthly themes",
        "15% discount code for shop",
      ],
      popular: false,
    },
    {
      name: "House of Midnight",
      price: "$75/month",
      tagline: "Dwell in the ancestral mansion of creative abundance",
      icon: "🏛️",
      description:
        "Experience our most exclusive offerings including physical mailings, personal readings, and direct creator access.",
      features: [
        "Everything in previous tiers",
        "Quarterly physical mail package",
        "Monthly custom tarot reading",
        "Product development input",
        "Seasonal 1:1 connection",
        "25% discount code for shop",
      ],
      popular: false,
    },
  ]

  const exclusiveContent = [
    {
      title: "Monthly Tarot Readings",
      description: "Exclusive video readings with our Southern Gothic-inspired tarot deck.",
      image: "/southern-gothic-tarot.png",
    },
    {
      title: "Automation Masterclass",
      description: "Step-by-step tutorials for setting up your own passive income systems.",
      image: "/passive-income-automation.png",
    },
    {
      title: "Healing Journal Prompts",
      description: "Weekly prompts designed for trauma recovery and personal transformation.",
      image: "/adhd-friendly-journal.png",
    },
  ]

  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">Patron Portal</h1>
          <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mx-auto">
            Join our community of patrons to access exclusive content, resources, and support for your healing and
            creative journey.
          </p>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">Choose Your Membership</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipTiers.slice(0, 3).map((tier, index) => (
              <div
                key={index}
                className={`bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border ${
                  tier.popular ? "border-rich-gold" : "border-midnight-teal/30"
                } hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-rich-gold text-midnight-blue text-xs font-accent px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{tier.icon}</span>
                  </div>
                  <h3 className="font-heading text-xl text-rich-gold mb-2">{tier.name}</h3>
                  <p className="text-2xl font-accent text-magnolia-white mb-2">{tier.price}</p>
                  <p className="text-sm italic text-rich-gold/90 mb-2">"{tier.tagline}"</p>
                  <p className="text-sm text-magnolia-white/80">{tier.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-rich-gold flex-shrink-0 mt-0.5" />
                      <span className="text-magnolia-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <button
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-accent text-sm transition-colors shadow-md hover:shadow-lg ${
                      tier.popular
                        ? "bg-rich-gold text-midnight-blue hover:bg-rich-gold/90"
                        : "border border-rich-gold text-rich-gold hover:bg-rich-gold/10"
                    }`}
                  >
                    Join {tier.name}
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="text-rich-gold hover:text-rich-gold/80 transition-colors font-accent">
              View higher tier options (Moonlit Sanctuary & House of Midnight) →
            </button>
          </div>
        </div>
      </section>

      {/* Monthly Content Section */}
      <MonthlyContentSection />

      {/* Exclusive Content Preview */}
      <section className="py-16 bg-midnight-blue/90">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">Exclusive Patron Content</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {exclusiveContent.map((content, index) => (
              <div
                key={index}
                className="bg-midnight-blue/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-midnight-teal/30 group"
              >
                <div className="relative h-48">
                  <Image src={content.image || "/placeholder.svg"} alt={content.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/90 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-rich-gold/90 rounded-full p-3 opacity-90">
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
                        className="h-6 w-6 text-midnight-blue"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-rich-gold mb-2">{content.title}</h3>
                  <p className="text-magnolia-white/80 text-sm mb-4">{content.description}</p>
                  <p className="text-xs text-rich-gold/80 italic">Available to all patrons</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-magnolia-white/90 mb-6">
              Unlock these resources and much more when you become a patron.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors shadow-md hover:shadow-lg">
              Become a Patron Today
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-3xl text-midnight-blue mb-12 text-center">What Our Patrons Say</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-sage-green/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src="/professional-black-woman-portrait.png" alt="Patron" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-heading text-lg text-midnight-blue">Amara J.</p>
                  <p className="text-sm text-midnight-teal/80">Crescent Bloom Member</p>
                </div>
              </div>
              <p className="text-midnight-teal italic">
                "The resources and community I've found through the Patron Portal have been valuable for my healing
                journey. The ADHD-friendly systems have helped me create consistency in my creative practice."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-sage-green/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src="/professional-woman-portrait.png" alt="Patron" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-heading text-lg text-midnight-blue">Tasha M.</p>
                  <p className="text-sm text-midnight-teal/80">Golden Grove Member</p>
                </div>
              </div>
              <p className="text-midnight-teal italic">
                "The monthly journal pages have transformed my self-reflection practice. I've implemented several of the
                suggested systems that have helped me balance creativity with my day job. This community understands the
                unique challenges of neurodivergent creators."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-midnight-blue/90">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: "How do I access patron content after joining?",
                answer:
                  "After joining, you'll receive login credentials to access the Patron Portal. All exclusive content, resources, and community features will be available through your dashboard.",
              },
              {
                question: "Can I change my membership tier later?",
                answer:
                  "Yes! You can upgrade or downgrade your membership tier at any time. Changes will take effect at the start of your next billing cycle.",
              },
              {
                question: "Are there any long-term commitments?",
                answer:
                  "No, all memberships are month-to-month and you can cancel anytime. We believe in creating value that makes you want to stay, not contracts that force you to.",
              },
              {
                question: "How often is new content added?",
                answer:
                  "New content is added weekly, with major resources launching monthly. We also host live events and Q&A sessions throughout the month for higher-tier members.",
              },
              {
                question: "Is there a community component?",
                answer:
                  "Yes! Crescent Bloom and higher tier members have access to our private community forum where you can connect with other patrons, share your journey, and participate in collaborative projects.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-midnight-teal/30"
              >
                <h3 className="font-heading text-xl text-rich-gold mb-3">{faq.question}</h3>
                <p className="font-body text-magnolia-white/90">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
