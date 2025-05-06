import React, { useState } from 'react';
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
import {
  MagnoliaSeedIcon,
  CrescentBloomIcon,
  GoldenGroveIcon,
  MoonlitSanctuaryIcon,
  HouseOfMidnightIcon
} from '@/components/ui/animated-tier-icons';

interface TierCardProps {
  tier: TierData;
  index: number;
}

export const TierCard: React.FC<TierCardProps> = ({ tier, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isGolden = tier.name === "Golden Grove" || tier.name === "House of Midnight";
  
  // Backup static icons (will be used only if animated ones fail)
  const staticIconMap = {
    seedling: <FaSeedling className="text-2xl text-[#FAF3E0]" />,
    moon: <FaMoon className="text-2xl text-[#FAF3E0]" />,
    tree: <FaTree className="text-2xl text-[#FAF3E0]" />,
    spa: <FaSpa className="text-2xl text-[#FAF3E0]" />,
    gem: <FaGem className="text-2xl text-[#FAF3E0]" />
  };
  
  // Animated icon map
  const animatedIconMap = {
    seedling: <MagnoliaSeedIcon />,
    moon: <CrescentBloomIcon />,
    tree: <GoldenGroveIcon />,
    spa: <MoonlitSanctuaryIcon />,
    gem: <HouseOfMidnightIcon />
  };

  const getIcon = (iconName: string) => {
    // Return animated icon if the card is hovered, otherwise fallback to static icon
    return isHovered 
      ? animatedIconMap[iconName as keyof typeof animatedIconMap] 
      : staticIconMap[iconName as keyof typeof staticIconMap];
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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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
        } p-6 text-center relative`}
      >
        {/* Create spotlight effect when hovered */}
        {isHovered && (
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${isGolden ? '#D4AF37' : '#A3B18A'} 0%, transparent 70%)`,
            }}
          />
        )}
        
        <motion.div 
          className={`tier-icon ${isGolden ? 'bg-[#0A192F] border-2 border-[#D4AF37]/40' : 'bg-[#0A192F] border-2 border-[#A3B18A]/40'} h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden`}
        >
          {getIcon(tier.icon)}
        </motion.div>
        
        <h3 className="font-playfair text-2xl text-[#D4AF37] mb-1">{tier.name}</h3>
        <p className="text-[#FAF3E0] text-sm italic mb-3">{tier.tagline}</p>
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
