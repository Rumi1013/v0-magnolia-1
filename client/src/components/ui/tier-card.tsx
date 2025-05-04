import React from 'react';
import { motion } from 'framer-motion';
import { TierData } from '@/components/MidnightMagnoliaTiers';
import {
  FaSeedling,
  FaMoon,
  FaTree,
  FaSpa,
  FaGem,
  FaCheck
} from 'react-icons/fa';

interface TierCardProps {
  tier: TierData;
  index: number;
}

export const TierCard: React.FC<TierCardProps> = ({ tier, index }) => {
  const isGolden = tier.name === "Golden Grove" || tier.name === "House of Midnight";
  const iconMap = {
    seedling: <FaSeedling className="text-2xl text-[#FAF3E0]" />,
    moon: <FaMoon className="text-2xl text-[#FAF3E0]" />,
    tree: <FaTree className="text-2xl text-[#FAF3E0]" />,
    spa: <FaSpa className="text-2xl text-[#FAF3E0]" />,
    gem: <FaGem className="text-2xl text-[#FAF3E0]" />
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap];
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`tier-card bg-[#0A192F] border-2 ${isGolden ? 'border-[#D4AF37]' : 'border-[#A3B18A]'} rounded-lg overflow-hidden shadow-lg flex flex-col h-full relative`}
      whileHover={{ 
        y: -5,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3 }
      }}
    >
      {tier.popular && (
        <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A192F] text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          POPULAR
        </div>
      )}
      
      <div 
        className={`${
          isGolden 
            ? 'bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/5' 
            : 'bg-gradient-to-br from-[#A3B18A]/30 to-[#A3B18A]/10'
        } p-6 text-center`}
      >
        <motion.div 
          className={`tier-icon ${isGolden ? 'bg-[#FAF3E0]/20' : 'bg-[#FAF3E0]/10'} h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {getIcon(tier.icon)}
        </motion.div>
        <h3 className="font-playfair text-2xl text-[#D4AF37] mb-1">{tier.name}</h3>
        <p className="text-[#FAF3E0]/70 text-sm italic mb-3">{tier.tagline}</p>
        <div className="text-2xl font-bold text-[#FAF3E0] mb-2">{tier.price}</div>
        <div className={`w-16 h-0.5 ${isGolden ? 'bg-[#D4AF37]/50' : 'bg-[#A3B18A]/50'} mx-auto`}></div>
      </div>
      
      <div className="p-6 flex-grow">
        <ul className="space-y-3">
          {tier.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start">
              <FaCheck className={`mt-1 mr-3 ${isGolden ? 'text-[#D4AF37]' : 'text-[#A3B18A]'}`} />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-6 pt-0">
        {isGolden && tier.name === "Golden Grove" ? (
          <button className="w-full py-3 px-4 bg-[#D4AF37] text-[#0A192F] rounded-md hover:bg-[#D4AF37]/80 transition-colors duration-300 font-medium">
            Join Tier
          </button>
        ) : (
          <button 
            className={`w-full py-3 px-4 bg-transparent border ${
              isGolden ? 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]' : 'border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A]'
            } rounded-md hover:text-[#0A192F] transition-colors duration-300 font-medium`}
          >
            Join Tier
          </button>
        )}
      </div>
    </motion.div>
  );
};
