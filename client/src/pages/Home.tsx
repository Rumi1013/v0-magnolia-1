
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Star, Sparkles, Book, Calendar } from 'lucide-react';
import { TieredProductPricing } from '@/components/TieredProductPricing';

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
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
            Automate your mystical content creation with AI-powered tools
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/ai-tools">
              <Button className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90">
                Try AI Tools
              </Button>
            </Link>
            <Link href="#pricing">
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                View Pricing
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* AI Features Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-playfair text-[#D4AF37] text-4xl mb-12">
            AI-Powered Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-[#0A192F]/60 border-[#D4AF37]/20">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-[#D4AF37] mb-4" />
                    <h3 className="text-xl font-playfair text-[#D4AF37] mb-2">{feature.title}</h3>
                    <p className="text-[#FAF3E0]/80">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <TieredProductPricing />
      </section>
    </div>
  );
};

const aiFeatures = [
  {
    title: "Content Generation",
    description: "AI-powered creation of tarot readings, journal prompts, and product descriptions",
    icon: Sparkles,
  },
  {
    title: "Lunar Content Planning",
    description: "Automated content scheduling aligned with moon phases",
    icon: Moon,
  },
  {
    title: "Digital Grimoire",
    description: "AI-assisted creation of mystical digital products",
    icon: Book,
  },
  {
    title: "Automated Workflows",
    description: "Smart automation of your content creation process",
    icon: Calendar,
  },
  {
    title: "Custom Templates",
    description: "AI-generated templates for your digital products",
    icon: Star,
  }
];

export default Home;
