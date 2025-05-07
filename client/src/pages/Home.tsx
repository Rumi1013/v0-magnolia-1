import React from 'react';
import { MidnightMagnoliaTiers } from '@/components/MidnightMagnoliaTiers';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Moon, Star, Sparkles, CreditCard, Instagram, Twitter, BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative font-montserrat text-[#FAF3E0] bg-[#0A192F] min-h-screen">
      <div 
        className="absolute top-0 left-0 w-full h-full z-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}
      ></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="absolute top-0 right-0 w-1/3 h-screen bg-opacity-20 z-0"></div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center z-10 mb-12"
        >
          <h1 className="font-playfair text-[#D4AF37] text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider">
            Midnight Magnolia
          </h1>
          <div className="w-24 h-1 bg-[#A3B18A] mx-auto mb-6"></div>
          <p className="text-[#FAF3E0] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Join our sacred circle of supporters and nurture your spirit through ancestral wisdom.
          </p>
        </motion.div>
        
        <div className="marquee-container w-full my-12 overflow-hidden">
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "linear"
            }}
            className="py-2 text-[#D4AF37] opacity-70 whitespace-nowrap"
          >
            ✧ Plant the seeds of transformation ✧ Illuminate your path ✧ Nurture your creative spirit ✧ Enter the sacred space ✧ Dwell in creative abundance ✧
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div 
            className="w-8 h-14 border-2 border-[#FAF3E0] rounded-full flex items-center justify-center"
            style={{ position: 'relative' }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-[#FAF3E0] rounded-full"
              animate={{ 
                y: [0, 8, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </section>
      
      {/* Featured Services Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0A192F] to-[#0F233E]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-playfair text-[#D4AF37] text-4xl mb-6">Mystical Tools & Services</h2>
          <p className="text-[#FAF3E0] max-w-2xl mx-auto mb-16">
            Explore our collection of spiritual and mystical tools designed to enhance your personal journey and creative practice.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Birth Chart Generator Card */}
            <motion.div 
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-[#0A192F]/60 border border-[#A3B18A]/20 rounded-lg p-8 flex flex-col items-center text-center relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37]/5 z-0"></div>
              <Moon className="text-[#D4AF37] h-16 w-16 mb-6 z-10 relative" />
              <h3 className="font-playfair text-[#D4AF37] text-2xl mb-4 z-10 relative">Birth Chart Generator</h3>
              <p className="text-[#FAF3E0] mb-8 z-10 relative">
                Unlock the celestial blueprint of your being with our personalized astrological birth chart analysis.
              </p>
              <Link to="/birth-chart">
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black z-10 relative">
                  Generate Your Chart
                </Button>
              </Link>
            </motion.div>
            
            {/* Digital Grimoire Card */}
            <motion.div 
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-[#0A192F]/60 border border-[#A3B18A]/20 rounded-lg p-8 flex flex-col items-center text-center relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37]/5 z-0"></div>
              <Star className="text-[#D4AF37] h-16 w-16 mb-6 z-10 relative" />
              <h3 className="font-playfair text-[#D4AF37] text-2xl mb-4 z-10 relative">Digital Grimoire</h3>
              <p className="text-[#FAF3E0] mb-8 z-10 relative">
                Access your sacred digital workspace with powerful tools for content creators and mystic entrepreneurs.
              </p>
              <Link to="/notion">
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black z-10 relative">
                  Enter The Grimoire
                </Button>
              </Link>
            </motion.div>
            
            {/* Membership Tiers Card */}
            <motion.div 
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-[#0A192F]/60 border border-[#A3B18A]/20 rounded-lg p-8 flex flex-col items-center text-center relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37]/5 z-0"></div>
              <Sparkles className="text-[#D4AF37] h-16 w-16 mb-6 z-10 relative" />
              <h3 className="font-playfair text-[#D4AF37] text-2xl mb-4 z-10 relative">Membership Tiers</h3>
              <p className="text-[#FAF3E0] mb-8 z-10 relative">
                Choose the perfect membership tier to support your mystical journey and access premium features.
              </p>
              <Link to="/pricing">
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black z-10 relative">
                  View Pricing Plans
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Membership Tiers Section */}
      <MidnightMagnoliaTiers />
      
      {/* Footer */}
      <footer className="bg-[#0A192F]/50 border-t border-[#A3B18A]/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="font-playfair text-[#D4AF37] text-2xl mb-1">Midnight Magnolia</h2>
              <p className="text-[#FAF3E0]">Nurturing spirits through ancestral wisdom</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-[#A3B18A]/20 flex items-center justify-center hover:bg-[#A3B18A]/40 transition-colors">
                <Instagram className="h-5 w-5 text-[#FAF3E0]" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#A3B18A]/20 flex items-center justify-center hover:bg-[#A3B18A]/40 transition-colors">
                <Twitter className="h-5 w-5 text-[#FAF3E0]" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#A3B18A]/20 flex items-center justify-center hover:bg-[#A3B18A]/40 transition-colors">
                <BookOpen className="h-5 w-5 text-[#FAF3E0]" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-[#A3B18A]/20 pt-6 text-center md:text-left">
            <p className="text-[#FAF3E0] text-sm">
              &copy; {new Date().getFullYear()} Midnight Magnolia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
