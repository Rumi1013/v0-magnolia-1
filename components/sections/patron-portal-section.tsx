import Link from "next/link"
import { ArrowRight, Lock, Star, Sparkles } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

export function PatronPortalSection() {
  const membershipTiers = [
    {
      name: "Magnolia Bud",
      price: "$7/month",
      description: "Begin your journey with exclusive content and early access to new releases.",
      features: [
        "Monthly digital wallpapers",
        "Early access to new products",
        "Exclusive articles and resources",
        "10% discount on all products",
      ],
      icon: <Star className="h-5 w-5 text-rich-gold" />,
      popular: false,
    },
    {
      name: "Magnolia Bloom",
      price: "$17/month",
      description: "Deepen your transformation with premium content and community access.",
      features: [
        "Everything in Magnolia Bud",
        "Monthly live Q&A sessions",
        "Access to community forum",
        "Exclusive mini-courses",
        "20% discount on all products",
      ],
      icon: <Sparkles className="h-5 w-5 text-rich-gold" />,
      popular: true,
    },
    {
      name: "Magnolia Legacy",
      price: "$37/month",
      description: "Full immersion with personalized support and premium resources.",
      features: [
        "Everything in Magnolia Bloom",
        "Monthly 1:1 coaching call",
        "Custom digital resources",
        "Beta testing for new products",
        "30% discount on all products",
      ],
      icon: <Lock className="h-5 w-5 text-rich-gold" />,
      popular: false,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue/90 to-midnight-teal/80 text-magnolia-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-rich-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-midnight-teal/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          label="PATRON PORTAL"
          title="Join Our Transformation Community"
          description="Become a patron to access exclusive content, resources, and community support for your healing and creative journey."
          titleColor="text-rich-gold"
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipTiers.map((tier, index) => (
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
                  {tier.icon}
                </div>
                <h3 className="font-heading text-xl text-rich-gold mb-2">{tier.name}</h3>
                <p className="text-2xl font-accent text-magnolia-white mb-2">{tier.price}</p>
                <p className="text-sm text-magnolia-white/80">{tier.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
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
                      className="h-5 w-5 text-rich-gold flex-shrink-0 mt-0.5"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-magnolia-white/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Link
                  href="/patron-portal"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-accent text-sm transition-colors shadow-md hover:shadow-lg ${
                    tier.popular
                      ? "bg-rich-gold text-midnight-blue hover:bg-rich-gold/90"
                      : "border border-rich-gold text-rich-gold hover:bg-rich-gold/10"
                  }`}
                >
                  Join {tier.name}
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto border border-rich-gold/20">
            <h3 className="font-heading text-2xl text-rich-gold mb-4">Community Impact</h3>
            <p className="text-magnolia-white/90 mb-6">
              Your patronage directly supports our mission to create healing resources for neurodivergent creators and
              contribute to community wellness initiatives.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-accent text-rich-gold mb-2">27+</p>
                <p className="text-sm text-magnolia-white/80">Digital Resources Created</p>
              </div>
              <div>
                <p className="text-3xl font-accent text-rich-gold mb-2">150+</p>
                <p className="text-sm text-magnolia-white/80">Community Members</p>
              </div>
              <div>
                <p className="text-3xl font-accent text-rich-gold mb-2">12+</p>
                <p className="text-sm text-magnolia-white/80">Scholarships Funded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
