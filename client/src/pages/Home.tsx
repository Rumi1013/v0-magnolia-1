import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PatreonTiers from '@/components/patreon/PatreonTiers';

// Brand colors for the Midnight Magnolia aesthetic
const colors = {
  midnightBlue: "#0A192F",
  midnightTeal: "#0A3B4D",
  magnoliaWhite: "#FAF3E0",
  richGold: "#D4AF37",
  sageGreen: "#A3B18A",
  darkNavy: "#051224"
};

// Featured content examples from the Patreon templates
const featuredContent = [
  {
    title: "Monthly Affirmation Cards",
    description: "Beautiful affirmation cards with southern gothic aesthetic and soul-centered wisdom",
    example: "I bloom most brilliantly in the spaces where darkness once lived.",
    icon: "✨",
    backgroundColor: colors.midnightBlue,
    accentColor: colors.sageGreen
  },
  {
    title: "Digital Tarot Insights",
    description: "Deep dive into tarot wisdom with southern gothic interpretations and personal reflection prompts",
    example: "The Hermit brings us the gift of sacred solitude – not as isolation, but as the needed space where wisdom germinates.",
    icon: "🔮",
    backgroundColor: colors.midnightTeal,
    accentColor: colors.magnoliaWhite
  },
  {
    title: "Printable Journal Pages",
    description: "Beautifully designed journal pages for deeper connection with ancestral wisdom",
    example: "Letter to Ancestors - Guided writing prompts for dialoguing with those who came before",
    icon: "📝",
    backgroundColor: colors.darkNavy,
    accentColor: colors.richGold
  },
  {
    title: "Audio Rituals & Meditations",
    description: "Guided practices to deepen your spiritual connection and personal growth",
    example: "Magnolia Moon Meditation - Connecting with inner strength and ancestral wisdom",
    icon: "🎧",
    backgroundColor: colors.midnightBlue,
    accentColor: colors.magnoliaWhite
  }
];

// SVG components for decorative elements
const MagnoliaFlower = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.7" />
    <path d="M50 35C46 41 43 48 50 50C57 48 54 41 50 35Z" fill="currentColor" />
    <path d="M50 35C54 41 57 48 50 50C43 48 46 41 50 35Z" fill="currentColor" />
    <path d="M50 35C57 39 64 39 62 46C55 48 52 41 50 35Z" fill="currentColor" />
    <path d="M50 35C43 39 36 39 38 46C45 48 48 41 50 35Z" fill="currentColor" />
  </svg>
);

const CrescentMoon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 30C59.5 30 50.1 34.7 44 42.3C47.6 39.6 52.1 38 57 38C72.5 38 85 50.5 85 66C85 81.5 72.5 94 57 94C52.1 94 47.6 92.4 44 89.7C50.1 97.3 59.5 102 70 102C89 102 104 87 104 68C104 49 89 34 70 34V30Z" fill="currentColor" />
  </svg>
);

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#051224] to-[#0A192F] text-[#FAF3E0] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#A3B18A]/5 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 opacity-5">
            <MagnoliaFlower className="w-80 h-80 text-[#D4AF37]" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 opacity-5">
            <CrescentMoon className="w-60 h-60 text-[#FAF3E0]" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 mb-12 max-w-4xl"
        >
          <h1 className="font-playfair text-[#D4AF37] text-5xl md:text-6xl lg:text-7xl mb-6">
            Midnight Magnolia
          </h1>
          <p className="font-lora text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8 text-[#FAF3E0]">
            Join our intimate community of seekers and creators. Access exclusive enchanting content that honors ancestral wisdom 
            and embraces modern mysticism. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/membership">
              <Button 
                className="bg-[#D4AF37] text-[#051224] hover:bg-[#D4AF37]/90 font-montserrat w-full sm:w-auto"
                size="lg"
              >
                Explore Memberships
              </Button>
            </Link>
            <Link href="/content-offerings">
              <Button 
                variant="outline" 
                className="border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A]/10 font-montserrat w-full sm:w-auto"
                size="lg"
              >
                View Content Samples
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Content Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-center font-playfair text-[#D4AF37] text-4xl mb-12">
            Enchanting Content For Your Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredContent.map((content, index) => (
              <motion.div
                key={content.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card 
                  className="overflow-hidden border-2 transition-all duration-300 hover:shadow-lg relative h-full"
                  style={{ 
                    backgroundColor: content.backgroundColor, 
                    borderColor: content.accentColor,
                    color: colors.magnoliaWhite,
                  }}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-3 right-3 opacity-20" style={{ color: content.accentColor }}>
                    {index % 2 === 0 ? <MagnoliaFlower /> : <CrescentMoon />}
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{content.icon}</span>
                      <CardTitle 
                        className="font-playfair text-2xl" 
                        style={{ color: content.accentColor }}
                      >
                        {content.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="font-lora mb-4">
                      {content.description}
                    </p>
                    
                    <div className="mt-4 p-3 rounded-md bg-black/20 border-l-2" style={{ borderColor: content.accentColor }}>
                      <p className="font-lora italic text-sm">
                        "{content.example}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/content-offerings">
              <Button 
                variant="outline" 
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-montserrat"
              >
                View All Content Offerings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section id="membership-tiers" className="py-16">
        <h2 className="text-center font-playfair text-[#D4AF37] text-4xl mb-12">
          Join Our Membership Tiers
        </h2>
        <PatreonTiers />
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#051224]/50">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl text-center text-[#D4AF37] mb-12">
            What Our Members Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#0A192F] p-6 rounded-lg border border-[#A3B18A]/20">
              <p className="font-lora italic text-[#FAF3E0] mb-4">
                "The monthly affirmations and tarot cards have become an essential part of my 
                spiritual practice. The attention to detail and the thoughtfulness that goes into 
                each piece is truly exceptional."
              </p>
              <div className="font-montserrat text-[#D4AF37]">— Jessica B., Crescent Bloom Member</div>
            </div>
            
            <div className="bg-[#0A192F] p-6 rounded-lg border border-[#A3B18A]/20">
              <p className="font-lora italic text-[#FAF3E0] mb-4">
                "The journal prompts and audio rituals have transformed my relationship with my 
                ancestors. This content is created with such respect and authenticity that it's 
                unlike anything else I've found."
              </p>
              <div className="font-montserrat text-[#D4AF37]">— Michael T., Golden Grove Member</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#051224]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl text-[#D4AF37] mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="font-lora text-xl text-[#FAF3E0] mb-8">
              Choose the tier that calls to you and start exploring the enchanting world of Midnight Magnolia.
            </p>
            <Link href="/membership">
              <Button 
                className="bg-[#D4AF37] text-[#051224] hover:bg-[#D4AF37]/90 font-montserrat"
                size="lg"
              >
                Join Our Membership
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;