import React from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Brand colors
const colors = {
  midnightBlue: "#0A192F",
  midnightTeal: "#0A3B4D",
  magnoliaWhite: "#FAF3E0",
  richGold: "#D4AF37",
  sageGreen: "#A3B18A",
  darkNavy: "#051224"
};

interface TierBenefit {
  text: string;
  highlight?: boolean;
}

interface PatreonTier {
  name: string;
  price: string;
  tagline: string;
  icon: string;
  description: string;
  benefits: string[];
  backgroundColor: string;
  accentColor: string;
  link: string;
}

const tierData: PatreonTier[] = [
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
    accentColor: colors.sageGreen,
    link: "https://www.patreon.com/join/midnightmagnolia/checkout?rid=8159932"
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
    accentColor: colors.magnoliaWhite,
    link: "https://www.patreon.com/join/midnightmagnolia/checkout?rid=8159933"
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
    accentColor: colors.richGold,
    link: "https://www.patreon.com/join/midnightmagnolia/checkout?rid=8159934"
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
    accentColor: colors.magnoliaWhite,
    link: "https://www.patreon.com/join/midnightmagnolia/checkout?rid=8159935"
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
    accentColor: colors.richGold,
    link: "https://www.patreon.com/join/midnightmagnolia/checkout?rid=8159936"
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

const PatreonTierCard = ({ tier, index }: { tier: PatreonTier, index: number }) => {
  return (
    <Card 
      className="w-full overflow-hidden border-2 transition-all duration-300 hover:shadow-lg relative"
      style={{ 
        backgroundColor: tier.backgroundColor, 
        borderColor: tier.accentColor,
        color: colors.magnoliaWhite,
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-3 right-3 opacity-20" style={{ color: tier.accentColor }}>
        {index % 2 === 0 ? <MagnoliaFlower /> : <CrescentMoon />}
      </div>
      
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{tier.icon}</span>
          <CardTitle 
            className="font-playfair text-2xl" 
            style={{ color: tier.accentColor }}
          >
            {tier.name}
          </CardTitle>
        </div>
        
        <Badge 
          className="mb-2 font-medium" 
          style={{ 
            backgroundColor: "rgba(0,0,0,0.2)", 
            color: tier.accentColor 
          }}
        >
          {tier.price}/month
        </Badge>
        
        <CardDescription 
          className="font-lora italic text-base mb-2" 
          style={{ color: tier.accentColor }}
        >
          "{tier.tagline}"
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="font-lora mb-5 text-base">
          {tier.description}
        </p>
        
        <h3 
          className="font-montserrat text-sm uppercase tracking-wider mb-3"
          style={{ color: tier.accentColor }}
        >
          Includes:
        </h3>
        
        <ul className="space-y-2">
          {tier.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 font-lora text-base">
              <span style={{ color: tier.accentColor }}>✦</span>
              {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <a href={tier.link} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button 
            className="w-full font-montserrat text-sm uppercase tracking-wider font-semibold transition-all duration-300"
            style={{ 
              backgroundColor: tier.accentColor, 
              color: tier.backgroundColor 
            }}
          >
            Join {tier.name}
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

const PatreonTiers = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-playfair text-4xl md:text-5xl text-center mb-8 text-[#D4AF37]">
        Midnight Magnolia Membership
      </h1>
      
      <p className="font-lora text-lg text-center max-w-3xl mx-auto mb-12 text-[#FAF3E0]">
        Join our intimate community of seekers and creators. Your membership supports our independent work and grants you access to exclusive content, tools, and a space to nurture your personal practice.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tierData.slice(0, 3).map((tier, index) => (
          <PatreonTierCard key={index} tier={tier} index={index} />
        ))}
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 mt-8 max-w-4xl mx-auto">
        {tierData.slice(3).map((tier, index) => (
          <PatreonTierCard key={index + 3} tier={tier} index={index + 3} />
        ))}
      </div>
      
      <div className="mt-16 max-w-3xl mx-auto p-6 bg-[#0A192F]/70 border border-[#A3B18A] rounded-lg">
        <h3 className="font-playfair text-xl text-[#D4AF37] mb-3">
          About Our Membership Program
        </h3>
        <p className="font-lora text-[#FAF3E0] mb-4">
          Midnight Magnolia's membership program is designed for soul-centered individuals seeking to deepen their spiritual practice while supporting independent creators. Each tier builds upon the previous, offering a comprehensive journey through our offerings.
        </p>
        <p className="font-lora text-[#FAF3E0]">
          Your patronage directly supports the creation of enchanting, thoughtful content that honors ancestral wisdom and Southern Gothic aesthetics while embracing modern mysticism.
        </p>
      </div>
    </div>
  );
};

export default PatreonTiers;