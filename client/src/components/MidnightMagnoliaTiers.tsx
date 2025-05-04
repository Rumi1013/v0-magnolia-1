import React from 'react';
import { TierCard } from '@/components/ui/tier-card';
import { motion } from 'framer-motion';

export interface TierData {
  name: string;
  price: string;
  tagline: string;
  icon: string;
  benefits: string[];
  popular?: boolean;
  iconComponent?: React.ReactNode;
}

const tierData: TierData[] = [
  {
    name: "Magnolia Seed",
    price: "$3",
    tagline: "Plant the seeds of transformation",
    icon: "seedling",
    benefits: ["Monthly digital affirmation cards", "Exclusive wallpapers", "Supporter recognition"]
  },
  {
    name: "Crescent Bloom",
    price: "$7",
    tagline: "Illuminate your path through shadow and light",
    icon: "moon",
    benefits: ["Everything in Magnolia Seed", "Monthly tarot card", "Private blog content"]
  },
  {
    name: "Golden Grove",
    price: "$15",
    tagline: "Nurture your creative spirit and ancestral wisdom",
    icon: "tree",
    benefits: ["Everything in previous tiers", "Printable journal pages", "Audio rituals"],
    popular: true
  },
  {
    name: "Moonlit Sanctuary",
    price: "$30",
    tagline: "Enter the sacred space of collective healing",
    icon: "spa",
    benefits: ["Everything in previous tiers", "Personalized content", "Community gatherings"]
  },
  {
    name: "House of Midnight",
    price: "$75",
    tagline: "Dwell in the ancestral mansion of creative abundance",
    icon: "gem",
    benefits: ["Everything in previous tiers", "Quarterly mailings", "1:1 connection with creator"]
  }
];

const colors = {
  midnightBlue: "#0A192F",
  magnoliaWhite: "#FAF3E0",
  richGold: "#D4AF37",
  sageGreen: "#A3B18A"
};

export const MidnightMagnoliaTiers: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-15"
           style={{ 
             backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)",
             backgroundSize: "30px 30px"
           }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="font-playfair text-4xl md:text-5xl text-[#D4AF37] mb-4">
          Membership Tiers
        </h2>
        <p className="text-[#FAF3E0] text-lg max-w-2xl mx-auto">
          Choose your path of support and discovery through our carefully crafted membership options.
        </p>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16 relative z-10"
      >
        {tierData.map((tier, index) => (
          <TierCard 
            key={index}
            tier={tier}
            index={index}
          />
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20 text-center relative z-10"
      >
        <h2 className="font-playfair text-3xl md:text-4xl text-[#D4AF37] mb-8">From Our Community</h2>
        
        <div className="relative max-w-4xl mx-auto py-8 px-4">
          <div className="absolute -top-6 left-4 text-[#D4AF37] text-6xl opacity-20">❝</div>
          <div className="absolute -bottom-6 right-4 text-[#D4AF37] text-6xl opacity-20">❞</div>
          
          <div className="text-center">
            <p className="text-[#FAF3E0] text-lg italic mb-6">
              "Joining Midnight Magnolia has been transformative. The combination of spiritual guidance and practical tools has helped me reconnect with my ancestral wisdom in ways I never imagined possible."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#A3B18A]/30 flex items-center justify-center mr-3">
                <span className="text-[#FAF3E0] font-playfair">JL</span>
              </div>
              <div className="text-left">
                <p className="text-[#FAF3E0] font-medium">Jamie L.</p>
                <p className="text-[#FAF3E0]/60 text-sm">Golden Grove Member</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-20 max-w-3xl mx-auto relative z-10"
      >
        <h2 className="font-playfair text-3xl text-[#D4AF37] mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div className="border border-[#A3B18A]/30 rounded-lg p-6 transition-all duration-300 hover:border-[#A3B18A]">
            <h3 className="font-playfair text-xl text-[#D4AF37] mb-2">How do I access my membership benefits?</h3>
            <p className="text-[#FAF3E0]">Once you join, you'll receive an email with login details to our member portal where all digital content is available. Physical items are shipped quarterly to the address provided during signup.</p>
          </div>
          
          <div className="border border-[#A3B18A]/30 rounded-lg p-6 transition-all duration-300 hover:border-[#A3B18A]">
            <h3 className="font-playfair text-xl text-[#D4AF37] mb-2">Can I upgrade or downgrade my membership?</h3>
            <p className="text-[#FAF3E0]">Yes, you can change your membership tier at any time through your account settings. Changes will take effect at your next billing cycle.</p>
          </div>
          
          <div className="border border-[#A3B18A]/30 rounded-lg p-6 transition-all duration-300 hover:border-[#A3B18A]">
            <h3 className="font-playfair text-xl text-[#D4AF37] mb-2">When are community gatherings held?</h3>
            <p className="text-[#FAF3E0]">Community gatherings for eligible tiers are held monthly on the full moon. Calendar invites are sent to members with details for joining the virtual sessions.</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-16 px-4 text-center relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl text-[#D4AF37] mb-4">Begin Your Journey Today</h2>
          <p className="text-[#FAF3E0] text-lg mb-8 max-w-2xl mx-auto">
            Join our growing circle of seekers and nurture your spiritual growth with Midnight Magnolia.
          </p>
          <button className="bg-[#D4AF37] text-[#0A192F] px-8 py-4 rounded-md text-lg font-medium hover:bg-[#D4AF37]/80 transition-colors duration-300">
            Explore Membership Options
          </button>
        </div>
      </motion.div>
    </div>
  );
};
