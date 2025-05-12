import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import AnimatedHeader from "@/components/animated-header"

export default function OurStory() {
  return (
    <div className="min-h-screen bg-magnolia-white">
      {/* Animated Header */}
      <AnimatedHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue via-midnight-teal/90 to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="max-w-md mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-rich-gold/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative z-10 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] overflow-hidden">
              <Image
                src="/logo/midnight-magnolia-warm.png"
                alt="Midnight Magnolia"
                width={300}
                height={300}
                className="w-full h-auto animate-float"
                priority
              />
            </div>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-rich-gold drop-shadow-lg">
            The Story Behind Midnight Magnolia
          </h1>
          <p className="font-body text-xl text-magnolia-white/95 italic">
            A journey of transformation, resilience, and reclamation that birthed not just a business, but a movement
            for financial autonomy and creative freedom.
          </p>
        </div>
      </section>

      {/* Origins Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/10 to-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-heading text-3xl text-midnight-blue mb-6 drop-shadow-sm">
                Origins in Transformation
              </h2>
              <div className="font-body text-midnight-teal/90 space-y-4">
                <p>
                  Midnight Magnolia was born from the ashes of burnout, the trauma of activism, and the journey of
                  self-discovery that follows when you finally choose yourself. As its founder, my path to creating this
                  brand was neither straightforward nor gentle—but it was necessary.
                </p>
                <p>
                  For years, I poured myself into the movement for Black liberation. I showed up in the streets, in the
                  meetings, in the unspoken spaces where freedom was born. I helped free countless individuals, reunite
                  families, and challenge systems of oppression. This work was sacred, and I remain deeply, soulfully
                  grateful to have been part of it.
                </p>
                <p>
                  But inside the movement, I found more harm. I experienced exploitation while preaching liberation. I
                  gave everything I had—my time, my mind, my heart—and still, I was used, plotted against, worn down. My
                  literal job was to free Black people. But I had to ask myself: who was freeing me?
                </p>
              </div>
            </div>
            <div className="relative h-80 md:h-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/logo/midnight-magnolia-earthy.jpeg"
                alt="Transformation Journey"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="bg-midnight-blue/5 p-8 md:p-12 rounded-lg border-l-4 border-rich-gold my-16 shadow-lg">
            <p className="font-heading text-2xl md:text-3xl text-midnight-blue italic">
              "From the ashes of burnout, the trauma of activism, and the misdiagnosis of my being—I birthed Midnight
              Magnolia. Not just a business. A sanctuary. A soft rebellion."
            </p>
          </div>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue via-midnight-teal/90 to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-80 md:h-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/logo/midnight-magnolia-warm.png"
                alt="The Power of Diagnosis"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-heading text-3xl text-rich-gold mb-6 drop-shadow-lg">The Power of Diagnosis</h2>
              <div className="font-body text-magnolia-white/95 space-y-4">
                <p>
                  At 42, I received an ADHD diagnosis that finally provided context for what I had experienced as
                  failure. I wasn't broken—I was wired differently in a world that never learned to listen.
                </p>
                <p>
                  This diagnosis was transformative. It helped me understand why traditional business models and work
                  environments had always felt like ill-fitting clothes. It explained why I could hyperfocus on projects
                  I loved while struggling with routine tasks.
                </p>
                <p>
                  Most importantly, it gave me permission to design a business that worked with my brain instead of
                  against it. Midnight Magnolia became not just a brand, but a laboratory for neurodivergent-friendly
                  systems and workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Paradigm Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/10 to-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-3xl text-midnight-blue mb-6 drop-shadow-sm">A New Paradigm of Business</h2>
          <div className="font-body text-midnight-teal/90 space-y-4 mb-12">
            <p>
              Midnight Magnolia isn't just a creative brand—it's a referendum on how business should work. It's a space
              for neurodivergent, chronically pained, brilliant Black women like me to rest, to create, to heal, to
              thrive. It's a model of sustainability that doesn't demand exhaustion as the price of success.
            </p>
            <p>
              After years of giving without replenishment, I learned to set boundaries without apology. I stopped
              begging people to stay, and started staying with myself. Through this process, I discovered that true
              leadership begins with honoring your own needs first.
            </p>
            <p>
              Today, Midnight Magnolia stands as a testament to what's possible when you transform pain into purpose. We
              create digital products, design experiences, and develop strategies that empower others to build
              sustainable income streams without sacrificing their wellbeing.
            </p>
          </div>

          {/* Expertise Cards */}
          <h2 className="font-heading text-3xl text-midnight-blue mb-8 drop-shadow-sm">
            Professional Expertise Forged Through Experience
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-heading text-xl text-midnight-blue mb-3">Digital Strategy & Design</h3>
              <p className="font-body text-midnight-teal/90">
                With HTML/CSS certification and design experience, I create seamless experiences that not only look
                beautiful but function intuitively—because I understand how both the code and the human need to work
                together.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-heading text-xl text-midnight-blue mb-3">Trauma-Informed Business Development</h3>
              <p className="font-body text-midnight-teal/90">
                My approach to business strategy is rooted in understanding how trauma impacts decision-making,
                productivity, and sustainable growth—creating systems that honor the whole person.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-heading text-xl text-midnight-blue mb-3">Accessibility & Neurodivergent Design</h3>
              <p className="font-body text-midnight-teal/90">
                As someone diagnosed with ADHD later in life, I bring a unique perspective to creating digital spaces
                and systems that work for diverse minds and processing styles.
              </p>
            </div>

            <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-heading text-xl text-midnight-blue mb-3">Automation for Liberation</h3>
              <p className="font-body text-midnight-teal/90">
                I specialize in developing automated systems that create freedom—both financial and temporal—so that
                creators can focus on their genius zone instead of repetitive tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meaning Behind the Name */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue via-midnight-teal/90 to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-3xl text-rich-gold mb-8 text-center drop-shadow-lg">
            The Meaning Behind the Name
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-midnight-blue/30 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <h3 className="font-heading text-2xl text-rich-gold mb-4 drop-shadow-md">Midnight</h3>
              <p className="font-body text-magnolia-white/95 mb-8">
                Midnight represents the threshold between endings and beginnings, symbolizing transformation, deep
                introspection, and the power of unseen potential. Midnight is the hour of change, where clarity emerges
                from darkness, aligning with my transition to a new career and lifestyle.
              </p>
            </div>
            <div className="bg-midnight-blue/30 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <h3 className="font-heading text-2xl text-rich-gold mb-4 drop-shadow-md">Magnolia</h3>
              <p className="font-body text-magnolia-white/95 mb-8">
                Magnolia signifies perseverance, dignity, and beauty in resilience. Magnolias bloom through adversity,
                symbolizing the endurance of Black women in challenging environments. The magnolia tree is strong,
                deeply rooted, and able to withstand storms—just as this brand is built to thrive through change and
                economic independence.
              </p>
            </div>
          </div>

          <div className="bg-magnolia-white/10 p-8 md:p-12 rounded-lg border-l-4 border-rich-gold mt-12 shadow-lg backdrop-blur-sm">
            <p className="font-heading text-2xl md:text-3xl text-magnolia-white/95 italic text-center drop-shadow-md">
              "I am not who I was. But every part of her lives in me. Honored. Released. Transformed."
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sage-green/10 to-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-heading text-3xl text-midnight-blue mb-6 drop-shadow-sm">
            Begin Your Transformation Journey
          </h2>
          <p className="font-body text-midnight-teal/90 text-lg mb-8 max-w-2xl mx-auto">
            Ready to transform your creative vision into sustainable income streams? Explore our offerings designed to
            empower your digital entrepreneurship journey.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm font-semibold hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
          >
            EXPLORE OUR SERVICES
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-midnight-blue to-midnight-blue/95 text-magnolia-white/80 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/logo/midnight-magnolia-warm.png"
              alt="Midnight Magnolia"
              width={30}
              height={30}
              className="rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]"
            />
            <span className="font-heading text-lg text-magnolia-white">Midnight Magnolia</span>
          </div>
          <p className="font-body text-sm">
            © {new Date().getFullYear()} Midnight Magnolia | A Division of Rumi-Nations LLC | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  )
}
