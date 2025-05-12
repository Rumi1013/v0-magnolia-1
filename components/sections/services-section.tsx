import { FeatureCard } from "@/components/ui/feature-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { CTAButton } from "@/components/ui/cta-button"

export function ServicesSection() {
  const services = [
    {
      title: "Digital Strategy & Design",
      description:
        "Creating seamless experiences that not only look beautiful but function intuitively—because I understand how both the code and the human need to work together.",
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
          className="h-6 w-6 text-midnight-teal"
        >
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
          <line x1="16" y1="8" x2="2" y2="22"></line>
          <line x1="17.5" y1="15" x2="9" y2="15"></line>
        </svg>
      ),
      link: {
        href: "#",
        text: "Learn more",
      },
    },
    {
      title: "Neurodivergent Design",
      description:
        "Creating digital spaces and systems that work for diverse minds and processing styles, with ADHD-friendly design principles.",
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
          className="h-6 w-6 text-midnight-teal"
        >
          <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-2"></path>
          <path d="M9 10h10l-3-3"></path>
          <path d="M9 14h10l-3 3"></path>
        </svg>
      ),
      link: {
        href: "#",
        text: "Learn more",
      },
    },
    {
      title: "Automation for Liberation",
      description:
        "Developing automated systems that create freedom—both financial and temporal—so that creators can focus on their genius zone instead of repetitive tasks.",
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
          className="h-6 w-6 text-midnight-teal"
        >
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
          <path d="M8.5 8.5v.01"></path>
          <path d="M16 15.5v.01"></path>
          <path d="M12 12v.01"></path>
          <path d="M11 17v.01"></path>
          <path d="M7 14v.01"></path>
        </svg>
      ),
      link: {
        href: "#",
        text: "Learn more",
      },
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/20 to-magnolia-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-rich-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-midnight-teal/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          label="OUR SERVICES"
          title="How We Can Help You Thrive"
          description="Midnight Magnolia offers a range of services designed to support your creative and healing journey."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <FeatureCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
            />
          ))}
        </div>

        {/* Services CTA */}
        <div className="mt-16 text-center">
          <CTAButton href="/services" variant="secondary">
            View All Services
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
