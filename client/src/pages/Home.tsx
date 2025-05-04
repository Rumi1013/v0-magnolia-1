import React from 'react';
import { MidnightMagnoliaTiers } from '@/components/MidnightMagnoliaTiers';
import { motion } from 'framer-motion';

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
                <i className="fab fa-instagram text-[#FAF3E0]"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#A3B18A]/20 flex items-center justify-center hover:bg-[#A3B18A]/40 transition-colors">
                <i className="fab fa-twitter text-[#FAF3E0]"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#A3B18A]/20 flex items-center justify-center hover:bg-[#A3B18A]/40 transition-colors">
                <i className="fab fa-patreon text-[#FAF3E0]"></i>
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
