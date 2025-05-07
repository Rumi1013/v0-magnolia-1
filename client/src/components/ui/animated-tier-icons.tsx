import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Magnolia Seed Icon (Animated Seedling)
export const MagnoliaSeedIcon: React.FC = () => {
  const controls = useAnimation();
  const [key, setKey] = useState(0);
  
  // Reset and play animation sequence on component mount or key change
  useEffect(() => {
    // Start with opacity 0
    controls.set({ opacity: 0 });
    
    // Then animate to full opacity
    controls.start({ 
      opacity: 1,
      transition: { duration: 0.5 }
    });
    
    // We use the key to force a complete re-render and restart animations
  }, [controls, key]);
  
  return (
    <motion.svg 
      key={key}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 1 }}
    >
      {/* Stem */}
      <motion.path 
        d="M24 15 L24 38" 
        stroke="#FAF3E0" 
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, y: 10 }}
        animate={{ pathLength: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Leaves */}
      <motion.path 
        d="M24 25 Q30 20 32 15 Q25 17 24 25" 
        fill="#A3B18A"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />
      
      <motion.path 
        d="M24 25 Q18 20 16 15 Q23 17 24 25" 
        fill="#A3B18A"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      />
      
      {/* Seed/Root */}
      <motion.circle 
        cx="24" 
        cy="38" 
        r="4" 
        fill="#D4AF37"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.5, duration: 1, times: [0, 0.7, 1] }}
      />
      
      {/* Roots */}
      <motion.path 
        d="M24 42 L20 46" 
        stroke="#D4AF37" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      />
      
      <motion.path 
        d="M24 42 L28 46" 
        stroke="#D4AF37" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
    </motion.svg>
  );
};

// Crescent Bloom Icon (Animated Moon with Flower)
export const CrescentBloomIcon: React.FC = () => {
  const controls = useAnimation();
  const [key, setKey] = useState(0);
  
  // Reset and play animation sequence on component mount or key change
  useEffect(() => {
    // Start with opacity 0
    controls.set({ opacity: 0 });
    
    // Then animate to full opacity
    controls.start({ 
      opacity: 1,
      transition: { duration: 0.5 }
    });
    
    // We use the key to force a complete re-render and restart animations
  }, [controls, key]);
  
  return (
    <motion.svg 
      key={key}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.8 }}
    >
      {/* Crescent Moon */}
      <motion.path 
        d="M16 12C11 12 7 16 7 22C7 28 11 34 17 34C23 34 18 28 18 22C18 16 22 12 16 12Z" 
        fill="#FAF3E0"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Flower Center */}
      <motion.circle 
        cx="30" 
        cy="25" 
        r="3" 
        fill="#D4AF37"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      
      {/* Flower Petals */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.path 
          key={i}
          d={`M30 25 Q${30 + 5 * Math.cos((angle * Math.PI) / 180)} ${25 + 5 * Math.sin((angle * Math.PI) / 180)} ${30 + 8 * Math.cos((angle * Math.PI) / 180)} ${25 + 8 * Math.sin((angle * Math.PI) / 180)}`}
          stroke="#A3B18A"
          strokeWidth="2"
          fill="#A3B18A"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
        />
      ))}
      
      {/* Stars */}
      {[
        { x: 35, y: 10, delay: 1.5 },
        { x: 28, y: 8, delay: 1.7 },
        { x: 38, y: 18, delay: 1.9 }
      ].map((star, i) => (
        <motion.circle 
          key={i}
          cx={star.x} 
          cy={star.y} 
          r="1" 
          fill="#FAF3E0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ 
            delay: star.delay, 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 1
          }}
        />
      ))}
    </motion.svg>
  );
};

// Golden Grove Icon (Animated Tree)
export const GoldenGroveIcon: React.FC = () => {
  const controls = useAnimation();
  const [key, setKey] = useState(0);
  
  // Reset and play animation sequence on component mount or key change
  useEffect(() => {
    // Start with opacity 0
    controls.set({ opacity: 0 });
    
    // Then animate to full opacity
    controls.start({ 
      opacity: 1,
      transition: { duration: 0.5 }
    });
    
    // We use the key to force a complete re-render and restart animations
  }, [controls, key]);
  
  return (
    <motion.svg 
      key={key}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {/* Tree Trunk */}
      <motion.rect 
        x="22" 
        y="25" 
        width="4" 
        height="15" 
        fill="#D4AF37"
        initial={{ scaleY: 0, y: 40 }}
        animate={{ scaleY: 1, y: 25 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Tree Branches */}
      <motion.path 
        d="M24 20 L18 25 L30 25 Z" 
        fill="#A3B18A"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      
      <motion.path 
        d="M24 15 L16 22 L32 22 Z" 
        fill="#A3B18A"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      />
      
      <motion.path 
        d="M24 10 L14 19 L34 19 Z" 
        fill="#A3B18A"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      
      {/* Golden Leaves */}
      {[
        { x: 20, y: 11, delay: 1.4 },
        { x: 28, y: 12, delay: 1.5 },
        { x: 24, y: 9, delay: 1.6 },
        { x: 18, y: 16, delay: 1.7 },
        { x: 30, y: 17, delay: 1.8 },
        { x: 22, y: 21, delay: 1.9 },
        { x: 26, y: 21, delay: 2.0 }
      ].map((leaf, i) => (
        <motion.circle 
          key={i}
          cx={leaf.x} 
          cy={leaf.y} 
          r="1.5" 
          fill="#D4AF37"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: leaf.delay, duration: 0.3 }}
        />
      ))}
    </motion.svg>
  );
};

// Moonlit Sanctuary Icon (Animated Lotus/Sanctuary)
export const MoonlitSanctuaryIcon: React.FC = () => {
  const controls = useAnimation();
  const [key, setKey] = useState(0);
  
  // Reset and play animation sequence on component mount or key change
  useEffect(() => {
    // Start with opacity 0
    controls.set({ opacity: 0 });
    
    // Then animate to full opacity
    controls.start({ 
      opacity: 1,
      transition: { duration: 0.5 }
    });
    
    // We use the key to force a complete re-render and restart animations
  }, [controls, key]);
  
  return (
    <motion.svg 
      key={key}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {/* Moon */}
      <motion.circle 
        cx="24" 
        cy="12" 
        r="7" 
        fill="#FAF3E0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.5, 0.7] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "mirror" 
        }}
      />
      
      {/* Lotus/Sanctuary Structure */}
      <motion.path 
        d="M24 28 L24 38" 
        stroke="#FAF3E0" 
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Lotus Petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.path 
          key={i}
          d={`M24 28 Q${24 + 8 * Math.cos((angle * Math.PI) / 180)} ${28 + 8 * Math.sin((angle * Math.PI) / 180)} ${24 + 12 * Math.cos((angle * Math.PI) / 180)} ${28 + 12 * Math.sin((angle * Math.PI) / 180)}`}
          stroke="#A3B18A"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
        />
      ))}
      
      {/* Sanctuary Base */}
      <motion.path 
        d="M16 38 L32 38" 
        stroke="#D4AF37" 
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
      
      {/* Light Beams */}
      {[30, 150, 270].map((angle, i) => (
        <motion.path 
          key={i}
          d={`M24 12 L${24 + 25 * Math.cos((angle * Math.PI) / 180)} ${12 + 25 * Math.sin((angle * Math.PI) / 180)}`}
          stroke="#FAF3E0"
          strokeOpacity="0.2"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ delay: 1.8 + i * 0.2, duration: 0.8 }}
        />
      ))}
    </motion.svg>
  );
};

// House of Midnight Icon (Animated Mansion/Temple)
export const HouseOfMidnightIcon: React.FC = () => {
  const controls = useAnimation();
  const [key, setKey] = useState(0);
  
  // Reset and play animation sequence on component mount or key change
  useEffect(() => {
    // Start with opacity 0
    controls.set({ opacity: 0 });
    
    // Then animate to full opacity
    controls.start({ 
      opacity: 1,
      transition: { duration: 0.5 }
    });
    
    // We use the key to force a complete re-render and restart animations
  }, [controls, key]);
  
  return (
    <motion.svg 
      key={key}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {/* House Base */}
      <motion.rect 
        x="12" 
        y="25" 
        width="24" 
        height="15" 
        fill="#0A192F"
        stroke="#D4AF37"
        strokeWidth="1.5"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Roof */}
      <motion.path 
        d="M10 25 L24 10 L38 25 Z" 
        fill="#0A192F"
        stroke="#D4AF37"
        strokeWidth="1.5"
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      
      {/* Windows */}
      <motion.rect 
        x="16" 
        y="30" 
        width="4" 
        height="6" 
        fill="#FAF3E0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.4, 0.9] }}
        transition={{ delay: 1.3, duration: 2, repeat: Infinity, repeatType: "mirror" }}
      />
      
      <motion.rect 
        x="28" 
        y="30" 
        width="4" 
        height="6" 
        fill="#FAF3E0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.4, 0.9] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatType: "mirror" }}
      />
      
      {/* Door */}
      <motion.rect 
        x="21" 
        y="32" 
        width="6" 
        height="8" 
        fill="#0A192F"
        stroke="#D4AF37"
        strokeWidth="1"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      
      {/* Columns */}
      <motion.rect 
        x="10" 
        y="20" 
        width="2" 
        height="5" 
        fill="#D4AF37"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.7, duration: 0.3 }}
      />
      
      <motion.rect 
        x="36" 
        y="20" 
        width="2" 
        height="5" 
        fill="#D4AF37"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.9, duration: 0.3 }}
      />
      
      {/* Stars */}
      {[
        { x: 10, y: 8, delay: 2.0, duration: 2.5 },
        { x: 38, y: 10, delay: 2.2, duration: 3.0 },
        { x: 24, y: 5, delay: 2.4, duration: 2.8 }
      ].map((star, i) => (
        <motion.circle 
          key={i}
          cx={star.x} 
          cy={star.y} 
          r="1" 
          fill="#FAF3E0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.3, 1] }}
          transition={{ 
            delay: star.delay, 
            duration: star.duration, 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        />
      ))}
      
      {/* Gem/Crystal */}
      <motion.path 
        d="M24 14 L21 18 L27 18 Z" 
        fill="#D4AF37"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.5 }}
      />
    </motion.svg>
  );
};