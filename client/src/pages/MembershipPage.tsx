import React from 'react';
import PatreonTiers from '../components/patreon/PatreonTiers';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MembershipPage: React.FC = () => {
  return (
    <div className="bg-[#0A192F] min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0A192F]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-t from-[#A3B18A]/10 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-[#D4AF37] mb-6">
              Join the Midnight <span className="italic">Magnolia</span> Journey
            </h1>
            <p className="text-xl font-lora text-[#FAF3E0] mb-8 leading-relaxed">
              Become part of our Southern Gothic digital sanctuary where ancestral wisdom, modern mysticism, and creative inspiration converge
            </p>
            <Button className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90 px-8 py-6 text-lg font-medium">
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
      
      {/* Membership Tiers */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <PatreonTiers />
      </div>
      
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair text-[#D4AF37] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <Tabs defaultValue="membership" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#051224]">
              <TabsTrigger value="membership" className="data-[state=active]:bg-[#0A3B4D] data-[state=active]:text-[#FAF3E0]">
                Membership
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-[#0A3B4D] data-[state=active]:text-[#FAF3E0]">
                Content
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-[#0A3B4D] data-[state=active]:text-[#FAF3E0]">
                Billing
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="membership" className="space-y-6 mt-6">
              <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-3">
                  How do I access my membership content?
                </h3>
                <p className="text-[#FAF3E0] font-lora">
                  Once you've joined a membership tier, you'll receive immediate access to your tier's content through our patron portal. You'll also receive email notifications when new content is available for your tier.
                </p>
              </div>
              
              <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-3">
                  Can I change my membership tier?
                </h3>
                <p className="text-[#FAF3E0] font-lora">
                  Yes! You can upgrade or downgrade your membership tier at any time. Changes will take effect at the beginning of your next billing cycle.
                </p>
              </div>
              
              <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-3">
                  What happens if I join in the middle of the month?
                </h3>
                <p className="text-[#FAF3E0] font-lora">
                  When you join mid-month, you'll be charged the full monthly rate and gain immediate access to all currently available content for your tier, including the current month's releases.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-6 mt-6">
              <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-3">
                  How often is new content released?
                </h3>
                <p className="text-[#FAF3E0] font-lora">
                  We release new content on a consistent monthly schedule. Affirmation cards, wallpapers, and tarot insights are released at the beginning of each month, while other content like journal prompts and guided rituals are released throughout the month.
                </p>
              </div>
              
              <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-3">
                  Can I access past months' content?
                </h3>
                <p className="text-[#FAF3E0] font-lora">
                  Yes, members of the Crescent Bloom tier and higher have access to our content archives. Magnolia Seed members have access to the current month's content only.
                </p>
              </div>
              
              <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-3">
                  What's included in the physical mailings?
                </h3>
                <p className="text-[#FAF3E0] font-lora">
                  House of Midnight members receive quarterly physical packages that may include printed affirmation cards, ritual guides, custom tea blends, crystal specimens, handcrafted altar items, and seasonal themed goods—all aligned with our Southern Gothic aesthetic.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-6 mt-6">
              <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-3">
                  How does billing work?
                </h3>
                <p className="text-[#FAF3E0] font-lora">
                  Membership is billed monthly (or annually if you choose that option). Your initial charge will happen immediately when you join, and subsequent charges will occur on the same date each month.
                </p>
              </div>
              
              <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-3">
                  Can I cancel my membership?
                </h3>
                <p className="text-[#FAF3E0] font-lora">
                  Yes, you can cancel your membership at any time. You'll continue to have access to your tier's content until the end of your current billing period.
                </p>
              </div>
              
              <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-3">
                  Do you offer annual subscriptions?
                </h3>
                <p className="text-[#FAF3E0] font-lora">
                  Yes, we offer annual subscriptions at a 10% discount compared to monthly payments. Please contact us directly to switch to an annual billing cycle.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-3xl font-playfair text-[#D4AF37] mb-8 text-center">
          From Our Community
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#0A3B4D] flex items-center justify-center text-xl">
                ✨
              </div>
              <div className="ml-4">
                <h4 className="text-[#D4AF37] font-medium">Sophia J.</h4>
                <p className="text-[#A3B18A] text-sm">Golden Grove Member</p>
              </div>
            </div>
            <p className="text-[#FAF3E0] italic font-lora">
              "The monthly journal prompts have completely transformed my self-reflection practice. Each one feels like it was written specifically for what I'm experiencing. This membership is the anchor in my spiritual practice."
            </p>
          </div>
          
          <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#0A3B4D] flex items-center justify-center text-xl">
                🌙
              </div>
              <div className="ml-4">
                <h4 className="text-[#D4AF37] font-medium">Marcus T.</h4>
                <p className="text-[#A3B18A] text-sm">Crescent Bloom Member</p>
              </div>
            </div>
            <p className="text-[#FAF3E0] italic font-lora">
              "The monthly tarot insights have been incredibly accurate for my journey. I look forward to them each month as a guide for what's coming. The aesthetic perfectly captures that Southern Gothic vibe I love."
            </p>
          </div>
          
          <div className="bg-[#051224] p-6 rounded-lg border border-[#A3B18A]/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#0A3B4D] flex items-center justify-center text-xl">
                🏛️
              </div>
              <div className="ml-4">
                <h4 className="text-[#D4AF37] font-medium">Elena R.</h4>
                <p className="text-[#A3B18A] text-sm">House of Midnight Member</p>
              </div>
            </div>
            <p className="text-[#FAF3E0] italic font-lora">
              "The quarterly packages are like receiving a piece of magic in the mail. The personalized tarot readings have been spot on, and the 1:1 connections have given me insights I wouldn't have found elsewhere. Worth every penny."
            </p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-[#0A3B4D] py-16 mt-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-6">
            Begin Your Midnight Magnolia Journey Today
          </h2>
          <p className="text-[#FAF3E0] max-w-2xl mx-auto mb-8 font-lora text-lg">
            Join our community of seekers, dreamers, and creators. Explore our membership tiers and find the one that resonates with your path.
          </p>
          <Button className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90 px-8 py-6 text-lg">
            Explore Membership Options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;