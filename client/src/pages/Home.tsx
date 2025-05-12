
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Star, Sparkles, Book, Calendar } from 'lucide-react';
import { TieredProductPricing } from '@/components/TieredProductPricing';

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

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 overflow-hidden">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, rgba(10, 25, 47, 0.05) 100%), linear-gradient(180deg, rgba(250, 243, 224, 0.2) 0%, rgba(10, 25, 47, 0.1) 100%)",
            backdropFilter: "blur(8px)"
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 mb-12"
        >
          <img 
            src="/logo.png" 
            alt="Midnight Magnolia" 
            className="w-64 h-64 mx-auto mb-8"
          />
          <h1 className="font-playfair text-zinc-900 text-5xl md:text-6xl lg:text-7xl mb-6">
            Midnight Magnolia
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8 text-zinc-700">
            Automate your mystical content creation with AI-powered tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              className="bg-zinc-900 text-white hover:bg-zinc-800 w-full sm:w-auto"
            >
              <Link href="/ai-tools">Try AI Tools</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="border-[#D4AF37] text-[#D4AF37] w-full sm:w-auto"
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-4 relative">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, rgba(10, 25, 47, 0.05) 100%)"
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-center font-playfair text-[#D4AF37] text-4xl mb-12">
            AI-Powered Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-white border-zinc-200 shadow-sm h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <feature.icon className="w-12 h-12 text-zinc-900 mb-4" />
                    <h3 className="text-xl font-medium text-zinc-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-zinc-600 font-body">{feature.description}</p>
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
