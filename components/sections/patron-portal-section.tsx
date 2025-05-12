import { SectionHeading } from "@/components/ui/section-heading"
import { CTAButton } from "@/components/ui/cta-button"

// Brand colors
const colors = {
  midnightBlue: "#0A192F",
  midnightTeal: "#0A3B4D",
  magnoliaWhite: "#FAF3E0",
  richGold: "#D4AF37",
  sageGreen: "#A3B18A",
  darkNavy: "#051224",
}

const tierData = [
  {
    name: "Magnolia Seed",
    price: "$3",
    tagline: "Plant the seeds of transformation",
    icon: "🌱",
    description:
      "Join the beginning of our journey with monthly affirmations, digital wallpapers, and community recognition.",
    benefits: [
      "Monthly digital affirmation cards",
      "Exclusive phone/desktop wallpapers",
      "Supporter recognition",
      "Access to patron-only feed",
    ],
    backgroundColor: colors.midnightBlue,
    accentColor: colors.sageGreen,
  },
  {
    name: "Crescent Bloom",
    price: "$7",
    tagline: "Illuminate your path through shadow and light",
    icon: "🌙",
    description: "Expand your experience with tarot insights and exclusive content to guide your journey.",
    benefits: [
      "Everything in Magnolia Seed tier",
      "Monthly digital tarot card",
      "Private blog/vlog content",
      "Archived content access",
      "Early announcements",
    ],
    backgroundColor: colors.midnightTeal,
    accentColor: colors.magnoliaWhite,
  },
  {
    name: "Golden Grove",
    price: "$15",
    tagline: "Nurture your creative spirit and ancestral wisdom",
    icon: "✨",
    description: "Deepen your practice with journals, audio rituals, and exclusive previews of upcoming creations.",
    benefits: [
      "Everything in previous tiers",
      "Monthly printable journal pages",
      "Guided audio rituals or playlists",
      "Sneak peeks of upcoming products",
      "10% discount code for shop",
    ],
    backgroundColor: colors.darkNavy,
    accentColor: colors.richGold,
  },
  {
    name: "Moonlit Sanctuary",
    price: "$30",
    tagline: "Enter the sacred space of collective healing",
    icon: "🌑",
    description: "Join our inner circle with personalized content, early access, and community gatherings.",
    benefits: [
      "Everything in previous tiers",
      "Personalized monthly affirmation",
      "Early access to product releases",
      "Quarterly community circle",
      "Input on monthly themes",
      "15% discount code for shop",
    ],
    backgroundColor: colors.midnightBlue,
    accentColor: colors.magnoliaWhite,
  },
  {
    name: "House of Midnight",
    price: "$75",
    tagline: "Dwell in the ancestral mansion of creative abundance",
    icon: "🏛️",
    description:
      "Experience our most exclusive offerings including physical mailings, personal readings, and direct creator access.",
    benefits: [
      "Everything in previous tiers",
      "Quarterly physical mail package",
      "Monthly custom tarot reading",
      "Product development input",
      "Seasonal 1:1 connection",
      "25% discount code for shop",
    ],
    backgroundColor: colors.darkNavy,
    accentColor: colors.richGold,
  },
]

export function PatronPortalSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-midnight-blue to-midnight-teal">
      <div className="container mx-auto px-4">
        <SectionHeading title="Patron Portal" subtitle="Join our community of resilient creators" align="center" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tierData.map((tier, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:transform hover:scale-105"
              style={{
                backgroundColor: tier.backgroundColor,
                border: `1px solid ${tier.accentColor}`,
              }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{tier.icon}</span>
                  <h3 className="font-heading text-2xl" style={{ color: tier.accentColor }}>
                    {tier.name}
                  </h3>
                </div>

                <div
                  className="inline-block px-3 py-1 rounded mb-4 text-sm font-accent font-semibold"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    color: tier.accentColor,
                  }}
                >
                  {tier.price}/month
                </div>

                <p className="font-body italic mb-4" style={{ color: tier.accentColor }}>
                  "{tier.tagline}"
                </p>

                <p className="font-body text-magnolia-white/90 mb-6">{tier.description}</p>

                <div className="mt-6">
                  <h4 className="text-xs uppercase tracking-wider font-accent mb-3" style={{ color: tier.accentColor }}>
                    Includes:
                  </h4>

                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-magnolia-white/90">
                        <span style={{ color: tier.accentColor }}>✦</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="w-full mt-8 py-3 px-4 rounded font-accent text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: tier.accentColor,
                    color: tier.backgroundColor,
                  }}
                >
                  Join {tier.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CTAButton href="/patron-portal" variant="primary" size="lg">
            Learn More About Membership
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
