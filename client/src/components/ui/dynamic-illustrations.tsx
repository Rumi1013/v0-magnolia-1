
import React from 'react';
import { motion } from 'framer-motion';

export const DynamicIllustration: React.FC<{
  variant: 'hero' | 'feature' | 'footer';
  className?: string;
}> = ({ variant, className }) => {
  const baseStyle = "absolute inset-0 mix-blend-overlay pointer-events-none";
  
  const variants = {
    hero: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { 
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.02, 1],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    feature: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }
    },
    footer: {
      initial: { opacity: 0 },
      animate: { 
        opacity: [0.1, 0.2, 0.1],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <motion.div
      className={`${baseStyle} ${className}`}
      initial={variants[variant].initial}
      animate={variants[variant].animate}
      style={{
        backgroundImage: `
          url('/attached_assets/freepik__background__90242.png'),
          radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, rgba(10, 25, 47, 0.05) 100%),
          linear-gradient(45deg, rgba(163, 177, 138, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)
        `,
        backgroundBlendMode: 'overlay, screen, normal',
        backgroundSize: 'cover, cover, cover',
      }}
    />
  );
};
