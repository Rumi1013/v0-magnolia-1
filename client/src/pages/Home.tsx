import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import PatreonTiers from '../components/patreon/PatreonTiers';
import { ArrowRight, Sparkles, Star, FileText } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-[#122240] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#122240] to-[#0D1F35]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/10 to-transparent animate-shimmer" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-t from-[#A3B18A]/10 to-transparent animate-shimmer" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#155268]/20 to-transparent animate-pulse-slow" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-[#D4AF37] mb-6 leading-tight animate-float">
              <span className="italic">Midnight</span> Magnolia <br />
              <span className="text-3xl md:text-4xl text-[#FAF3E0]">Creative Content Collection</span>
            </h1>
            <p className="text-xl font-lora text-[#FAF3E0] mb-8 leading-relaxed">
              Join our Southern Gothic-inspired journey where ancestral wisdom meets modern mysticism. 
              Explore our tiered membership options to unlock exclusive content for your spiritual and creative practice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90 px-8 py-6 text-base animate-pulse-gold hover-scale"
                asChild
              >
                <Link to="/membership">
                  Explore Membership Tiers
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A]/10 px-8 py-6 text-base hover-scale"
                asChild
              >
                <Link to="/content-offerings">
                  Browse Content Offerings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Tiers */}
      <section className="py-16 bg-gradient-to-b from-[#122240] to-[#0B1D35] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-1/4 h-1/2 bg-gradient-to-l from-[#D4AF37]/10 to-transparent animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-[#A3B18A]/10 to-transparent animate-shimmer"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-10 text-center animate-float">
            Membership Tiers
          </h2>
          
          <PatreonTiers compact={true} />
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              className="border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A]/10 hover-scale transition-all duration-300 shadow-md hover:shadow-lg"
              asChild
            >
              <Link to="/membership">
                View All Tier Details <ArrowRight className="ml-2 h-4 w-4 animate-float" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Content Preview */}
      <section className="py-16 bg-gradient-to-b from-[#0B1D35] to-[#122A46]">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-4 animate-float">
              Featured Content
            </h2>
            <p className="text-lg font-lora text-[#FAF3E0] max-w-2xl mx-auto">
              Explore our curated content collections designed to enhance your spiritual journey
              through our unique Southern Gothic aesthetic.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#0D1F35] to-[#122240] p-6 rounded-lg border border-[#A3B18A]/30 hover:border-[#A3B18A]/60 transition-all hover-scale shadow-lg backdrop-blur-sm hover:shadow-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#155268] to-[#0D1F35] flex items-center justify-center mb-4 animate-pulse-slow shadow-inner">
                <Star className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-playfair text-[#D4AF37] mb-3 animate-shimmer">Affirmation Cards</h3>
              <p className="text-[#FAF3E0] font-lora mb-4">
                Beautiful digital affirmation cards infused with ancestral wisdom and Southern Gothic aesthetics to guide your daily practice.
              </p>
              <Button 
                variant="outline" 
                className="border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A]/10 w-full hover-scale transition-all duration-300"
                asChild
              >
                <Link to="/content-offerings?tab=affirmations">
                  Explore Affirmations
                </Link>
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-[#0D1F35] to-[#122240] p-6 rounded-lg border border-[#A3B18A]/30 hover:border-[#A3B18A]/60 transition-all hover-scale shadow-lg backdrop-blur-sm hover:shadow-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#155268] to-[#0D1F35] flex items-center justify-center mb-4 animate-pulse-slow shadow-inner">
                <FileText className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-playfair text-[#D4AF37] mb-3 animate-shimmer">Journal Prompts</h3>
              <p className="text-[#FAF3E0] font-lora mb-4">
                Thought-provoking journal prompts that inspire self-reflection, shadow integration, and creative exploration.
              </p>
              <Button 
                variant="outline" 
                className="border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A]/10 w-full hover-scale transition-all duration-300"
                asChild
              >
                <Link to="/content-offerings?tab=journals">
                  Explore Journal Prompts
                </Link>
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-[#0D1F35] to-[#122240] p-6 rounded-lg border border-[#A3B18A]/30 hover:border-[#A3B18A]/60 transition-all hover-scale shadow-lg backdrop-blur-sm hover:shadow-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#155268] to-[#0D1F35] flex items-center justify-center mb-4 animate-pulse-slow shadow-inner">
                <Sparkles className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-playfair text-[#D4AF37] mb-3 animate-shimmer">Ritual Guides</h3>
              <p className="text-[#FAF3E0] font-lora mb-4">
                Detailed guides for personal rituals that connect you to ancestral wisdom, lunar cycles, and Southern folk traditions.
              </p>
              <Button 
                variant="outline" 
                className="border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A]/10 w-full hover-scale transition-all duration-300"
                asChild
              >
                <Link to="/content-offerings?tab=rituals">
                  Explore Ritual Guides
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90 animate-pulse-gold hover-scale"
              asChild
            >
              <Link to="/content-offerings">
                View All Content Offerings
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-[#122A46] to-[#0D1F35]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-10 text-center animate-float">
            From Our Community
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#122240] to-[#0D1F35] p-6 rounded-lg border border-[#A3B18A]/20 hover:border-[#A3B18A]/60 transition-all hover-scale shadow-lg backdrop-blur-sm hover:shadow-xl">
              <p className="text-[#FAF3E0] italic font-lora mb-4 leading-relaxed">
                "The monthly journal prompts have completely transformed my self-reflection practice. 
                Each one feels like it was written specifically for me. This membership is the anchor in my spiritual practice."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#155268] to-[#0D1F35] flex items-center justify-center text-lg animate-pulse-slow shadow-md">
                  ✨
                </div>
                <div className="ml-3">
                  <h4 className="text-[#D4AF37] font-medium animate-shimmer">Sophia J.</h4>
                  <p className="text-[#A3B18A] text-sm">Golden Grove Member</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#122240] to-[#0D1F35] p-6 rounded-lg border border-[#A3B18A]/20 hover:border-[#A3B18A]/60 transition-all hover-scale shadow-lg backdrop-blur-sm hover:shadow-xl">
              <p className="text-[#FAF3E0] italic font-lora mb-4 leading-relaxed">
                "The tarot insights have been incredibly accurate for my journey. 
                I look forward to them each month as a guide for what's coming. The aesthetic perfectly captures that Southern Gothic vibe I love."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#155268] to-[#0D1F35] flex items-center justify-center text-lg animate-pulse-slow shadow-md">
                  🌙
                </div>
                <div className="ml-3">
                  <h4 className="text-[#D4AF37] font-medium animate-shimmer">Marcus T.</h4>
                  <p className="text-[#A3B18A] text-sm">Crescent Bloom Member</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#122240] to-[#0D1F35] p-6 rounded-lg border border-[#A3B18A]/20 hover:border-[#A3B18A]/60 transition-all hover-scale shadow-lg backdrop-blur-sm hover:shadow-xl">
              <p className="text-[#FAF3E0] italic font-lora mb-4 leading-relaxed">
                "The quarterly packages are like receiving a piece of magic in the mail. 
                The personalized readings have been spot on, and the 1:1 connections have given me insights I wouldn't have found elsewhere."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#155268] to-[#0D1F35] flex items-center justify-center text-lg animate-pulse-slow shadow-md">
                  🏛️
                </div>
                <div className="ml-3">
                  <h4 className="text-[#D4AF37] font-medium animate-shimmer">Elena R.</h4>
                  <p className="text-[#A3B18A] text-sm">House of Midnight Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-b from-[#0D1F35] to-[#114559] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-l from-[#D4AF37]/5 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-[#A3B18A]/5 to-transparent animate-shimmer"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-6 animate-float">
            Begin Your Midnight Magnolia Journey
          </h2>
          <p className="text-xl font-lora text-[#FAF3E0] max-w-2xl mx-auto mb-8 leading-relaxed">
            Join our community of seekers, dreamers, and creators. Explore our membership tiers and find the one that resonates with your path.
          </p>
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 blur-xl animate-shimmer rounded-full"></div>
            <Button 
              className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90 px-8 py-6 text-lg relative z-10 hover-scale shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/membership">
                <span className="animate-float inline-block">Explore Membership Options</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;