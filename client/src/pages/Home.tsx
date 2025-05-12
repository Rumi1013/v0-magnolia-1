import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DynamicIllustration } from '@/components/ui/dynamic-illustrations';
import { Moon, Star, Sparkles, Book, Calendar } from 'lucide-react';

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
  }
];

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0A192F] text-[#FAF3E0] overflow-hidden">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <DynamicIllustration variant="hero" className="opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 mb-12"
        >
          <h1 className="font-playfair text-[#FAF3E0] text-5xl md:text-6xl lg:text-7xl mb-6">
            Midnight Magnolia
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8 text-[#FAF3E0]/80">
            Automate your mystical content creation with AI-powered tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80 w-full sm:w-auto"
            >
              <Link href="/ai-tools">Try AI Tools</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 w-full sm:w-auto"
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-center font-playfair text-[#D4AF37] text-4xl mb-12">
            AI-Powered Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-[#0A192F]/50 border-[#D4AF37]/20 backdrop-blur-sm">
                  <CardContent className="p-6 flex flex-col h-full">
                    <feature.icon className="w-12 h-12 text-[#D4AF37] mb-4" />
                    <h3 className="text-xl font-medium text-[#FAF3E0] mb-2">{feature.title}</h3>
                    <p className="text-sm text-[#FAF3E0]/80">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="py-24 relative z-10">
        <TieredProductPricing />
      </section>
    </div>
  );
};

export default Home;