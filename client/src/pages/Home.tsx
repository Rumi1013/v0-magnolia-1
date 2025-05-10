import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { TieredProductPricing } from '@/components/TieredProductPricing';
import { AIContentGenerator } from '@/components/AIContentGenerator';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Star, Sparkles, Book, Calendar } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0A192F] text-[#FAF3E0] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 mb-12"
        >
          <img 
            src="/logo-animated.png" 
            alt="Midnight Magnolia" 
            className="w-64 h-64 mx-auto mb-8"
          />
          <h1 className="font-playfair text-[#D4AF37] text-5xl md:text-6xl lg:text-7xl mb-6">
            Midnight Magnolia
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            A Southern Digital Sanctuary for Creating & Automating Mystical Content
          </p>
        </motion.div>
      </section>

      {/* Digital Products Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-playfair text-[#D4AF37] text-4xl mb-12">Digital Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {digitalProducts.map((product, index) => (
              <Card key={index} className="bg-[#0A192F]/60 border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <product.icon className="w-12 h-12 text-[#D4AF37] mb-4" />
                  <h3 className="text-xl font-playfair text-[#D4AF37] mb-2">{product.title}</h3>
                  <p className="text-[#FAF3E0]/80 mb-4">{product.description}</p>
                  <Link href={product.link}>
                    <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                      Explore
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Automation */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0A192F] to-[#051224]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-playfair text-[#D4AF37] text-4xl mb-12">Content Automation</h2>
          <AIContentGenerator />
        </div>
      </section>

      {/* Membership Tiers */}
      <TieredProductPricing />
    </div>
  );
};

const digitalProducts = [
  {
    title: "Digital Grimoire",
    description: "Interactive digital planners and journals for your spiritual journey",
    icon: Book,
    link: "/grimoire"
  },
  {
    title: "Moon Phase Content",
    description: "Automated content aligned with lunar cycles",
    icon: Moon,
    link: "/moon-content"
  },
  {
    title: "Automated Rituals",
    description: "Digital ritual templates and generators",
    icon: Star,
    link: "/rituals"
  },
  {
    title: "Content Calendar",
    description: "Mystical content planning and scheduling",
    icon: Calendar,
    link: "/calendar"
  },
  {
    title: "AI Content Suite",
    description: "Automated content creation tools",
    icon: Sparkles,
    link: "/ai-tools"
  }
];

export default Home;