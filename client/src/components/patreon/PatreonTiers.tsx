import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Brand colors
const colors = {
  midnightBlue: "#0A192F",
  midnightTeal: "#0A3B4D",
  magnoliaWhite: "#FAF3E0",
  richGold: "#D4AF37",
  sageGreen: "#A3B18A",
  darkNavy: "#051224"
};

// Tier data
const tierData = [
  {
    name: "Magnolia Seed",
    price: "$3",
    tagline: "Plant the seeds of transformation",
    icon: "🌱",
    description: "Join the beginning of our journey with monthly affirmations, digital wallpapers, and community recognition.",
    benefits: [
      "Monthly digital affirmation cards",
      "Exclusive phone/desktop wallpapers",
      "Supporter recognition",
      "Access to patron-only feed"
    ],
    backgroundColor: colors.midnightBlue,
    accentColor: colors.sageGreen
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
      "Early announcements"
    ],
    backgroundColor: colors.midnightTeal,
    accentColor: colors.magnoliaWhite
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
      "10% discount code for shop"
    ],
    backgroundColor: colors.darkNavy,
    accentColor: colors.richGold
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
      "15% discount code for shop"
    ],
    backgroundColor: colors.midnightBlue,
    accentColor: colors.magnoliaWhite
  },
  {
    name: "House of Midnight",
    price: "$75",
    tagline: "Dwell in the ancestral mansion of creative abundance",
    icon: "🏛️",
    description: "Experience our most exclusive offerings including physical mailings, personal readings, and direct creator access.",
    benefits: [
      "Everything in previous tiers",
      "Quarterly physical mail package",
      "Monthly custom tarot reading",
      "Product development input",
      "Seasonal 1:1 connection",
      "25% discount code for shop"
    ],
    backgroundColor: colors.darkNavy,
    accentColor: colors.richGold
  }
];

// SVGs for decoration
const MagnoliaFlower = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.7" />
    <path d="M50 35C46 41 43 48 50 50C57 48 54 41 50 35Z" fill="currentColor" />
    <path d="M50 35C54 41 57 48 50 50C43 48 46 41 50 35Z" fill="currentColor" />
    <path d="M50 35C57 39 64 39 62 46C55 48 52 41 50 35Z" fill="currentColor" />
    <path d="M50 35C43 39 36 39 38 46C45 48 48 41 50 35Z" fill="currentColor" />
  </svg>
);

const CrescentMoon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 30C59.5 30 50.1 34.7 44 42.3C47.6 39.6 52.1 38 57 38C72.5 38 85 50.5 85 66C85 81.5 72.5 94 57 94C52.1 94 47.6 92.4 44 89.7C50.1 97.3 59.5 102 70 102C89 102 104 87 104 68C104 49 89 34 70 34V30Z" fill="currentColor" />
  </svg>
);

interface PatreonTiersProps {
  className?: string;
  compact?: boolean;
}

const PatreonTiers: React.FC<PatreonTiersProps> = ({ className = "", compact = false }) => {
  return (
    <div className={`mx-auto max-w-6xl ${className}`}>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-4">
          Join Our Membership Community
        </h2>
        <p className="text-[#FAF3E0] opacity-90 max-w-2xl mx-auto font-lora">
          Choose the tier that resonates with your journey and gain access to exclusive content, personalized guidance, and a supportive community.
        </p>
      </div>
      
      <div className={`grid gap-8 ${compact ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1 lg:grid-cols-2'}`}>
        {tierData.map((tier, index) => (
          <Card 
            key={tier.name} 
            className="overflow-hidden border-0 shadow-lg relative"
            style={{
              backgroundColor: tier.backgroundColor,
              borderColor: tier.accentColor,
              borderWidth: "1px",
              borderStyle: "solid"
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 opacity-20" style={{ color: tier.accentColor }}>
              {index % 2 === 0 ? <MagnoliaFlower /> : <CrescentMoon />}
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{tier.icon}</span>
                <div>
                  <CardTitle className="text-2xl font-playfair" style={{ color: tier.accentColor }}>
                    {tier.name}
                  </CardTitle>
                  <div className="inline-block mt-1 px-3 py-1 rounded-md" style={{ backgroundColor: "rgba(0,0,0,0.2)", color: tier.accentColor }}>
                    <span className="font-bold">{tier.price}</span>
                    <span className="text-sm">/month</span>
                  </div>
                </div>
              </div>
              <CardDescription className="italic mt-3 font-lora text-base" style={{ color: tier.accentColor }}>
                "{tier.tagline}"
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-[#FAF3E0] mb-6 font-lora">
                {tier.description}
              </p>
              
              <div>
                <h4 className="uppercase text-xs tracking-wider mb-3 font-bold" style={{ color: tier.accentColor }}>
                  Includes:
                </h4>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#FAF3E0] font-lora">
                      <span style={{ color: tier.accentColor }}>✦</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="pt-4">
              <Button 
                className="w-full transition-transform hover:scale-105"
                style={{ backgroundColor: tier.accentColor, color: tier.backgroundColor }}
              >
                Join {tier.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-[#FAF3E0]/80 max-w-2xl mx-auto mb-6 font-lora">
          All memberships automatically renew but can be cancelled anytime. Join our community today and begin your transformative journey with Midnight Magnolia.
        </p>
        <Button 
          className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90 hover:text-[#0A192F] px-8"
          size="lg"
        >
          Explore All Membership Benefits
        </Button>
      </div>
    </div>
  );
};

export default PatreonTiers;