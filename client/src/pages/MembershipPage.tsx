import React from 'react';
import PatreonTiers from '@/components/patreon/PatreonTiers';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const MembershipPage = () => {
  // Brand colors
  const colors = {
    midnightBlue: "#0A192F",
    magnoliaWhite: "#FAF3E0",
    richGold: "#D4AF37",
    sageGreen: "#A3B18A",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051224] to-[#0A192F]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#A3B18A]/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl md:text-6xl text-[#D4AF37] mb-6">
              Join the Midnight Circle
            </h1>
            <p className="font-lora text-xl text-[#FAF3E0] mb-8 leading-relaxed">
              Access exclusive enchanting content that honors ancestral wisdom 
              and embraces modern mysticism. Your membership supports independent 
              creation while nurturing your own practice.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#membership-tiers">
                <Button 
                  className="bg-[#D4AF37] text-[#051224] hover:bg-[#D4AF37]/90 font-montserrat"
                  size="lg"
                >
                  Explore Memberships
                </Button>
              </a>
              <Link to="/content-offerings">
                <Button 
                  variant="outline" 
                  className="border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A]/10 font-montserrat"
                  size="lg"
                >
                  View Content Samples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16 bg-[#051224]/50">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl text-center text-[#D4AF37] mb-12">
            Why Join Our Membership
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#0A192F] p-6 rounded-lg border border-[#A3B18A]/20 text-center">
              <div className="mb-4 text-4xl mx-auto">✨</div>
              <h3 className="font-playfair text-xl text-[#D4AF37] mb-3">Exclusive Content</h3>
              <p className="font-lora text-[#FAF3E0]">
                Receive beautifully crafted affirmations, tarot insights, journal prompts, 
                and more, delivered directly to you each month.
              </p>
            </div>
            
            <div className="bg-[#0A192F] p-6 rounded-lg border border-[#A3B18A]/20 text-center">
              <div className="mb-4 text-4xl mx-auto">🌙</div>
              <h3 className="font-playfair text-xl text-[#D4AF37] mb-3">Community Connection</h3>
              <p className="font-lora text-[#FAF3E0]">
                Join a supportive community of like-minded individuals pursuing spiritual growth
                and creative exploration.
              </p>
            </div>
            
            <div className="bg-[#0A192F] p-6 rounded-lg border border-[#A3B18A]/20 text-center">
              <div className="mb-4 text-4xl mx-auto">🌿</div>
              <h3 className="font-playfair text-xl text-[#D4AF37] mb-3">Creator Access</h3>
              <p className="font-lora text-[#FAF3E0]">
                Higher tiers offer direct creator access, input on content development,
                and personalized readings and guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section id="membership-tiers" className="py-16">
        <PatreonTiers />
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#051224]/50">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl text-center text-[#D4AF37] mb-12">
            What Our Members Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#0A192F] p-6 rounded-lg border border-[#A3B18A]/20">
              <p className="font-lora italic text-[#FAF3E0] mb-4">
                "The monthly affirmations and tarot cards have become an essential part of my 
                spiritual practice. The attention to detail and the thoughtfulness that goes into 
                each piece is truly exceptional."
              </p>
              <div className="font-montserrat text-[#D4AF37]">— Jessica B., Crescent Bloom Member</div>
            </div>
            
            <div className="bg-[#0A192F] p-6 rounded-lg border border-[#A3B18A]/20">
              <p className="font-lora italic text-[#FAF3E0] mb-4">
                "The journal prompts and audio rituals have transformed my relationship with my 
                ancestors. This content is created with such respect and authenticity that it's 
                unlike anything else I've found."
              </p>
              <div className="font-montserrat text-[#D4AF37]">— Michael T., Golden Grove Member</div>
            </div>
            
            <div className="bg-[#0A192F] p-6 rounded-lg border border-[#A3B18A]/20">
              <p className="font-lora italic text-[#FAF3E0] mb-4">
                "The personalized monthly affirmations speak directly to my journey. Being able 
                to provide input on monthly themes makes me feel like I'm truly part of a creative 
                community. Worth every penny."
              </p>
              <div className="font-montserrat text-[#D4AF37]">— Amara L., Moonlit Sanctuary Member</div>
            </div>
            
            <div className="bg-[#0A192F] p-6 rounded-lg border border-[#A3B18A]/20">
              <p className="font-lora italic text-[#FAF3E0] mb-4">
                "From the quarterly mail packages to the personalized tarot readings, this 
                membership has exceeded my expectations. There's a depth and authenticity to 
                everything that comes from Midnight Magnolia."
              </p>
              <div className="font-montserrat text-[#D4AF37]">— David R., House of Midnight Member</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl text-center text-[#D4AF37] mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="font-playfair text-xl text-[#D4AF37] mb-2">
                How do I access my membership content?
              </h3>
              <p className="font-lora text-[#FAF3E0]">
                All digital content is delivered through Patreon's platform. You'll receive 
                notifications when new content is published, and you can access everything 
                through your patron account and the patron-only feed.
              </p>
            </div>
            
            <div>
              <h3 className="font-playfair text-xl text-[#D4AF37] mb-2">
                Can I upgrade or downgrade my membership tier?
              </h3>
              <p className="font-lora text-[#FAF3E0]">
                Yes, you can change your membership tier at any time through your Patreon 
                account settings. The change will take effect at the start of the next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="font-playfair text-xl text-[#D4AF37] mb-2">
                How does the physical mail package work?
              </h3>
              <p className="font-lora text-[#FAF3E0]">
                House of Midnight members receive a curated package every quarter (four times per year). 
                You'll provide your mailing address through a secure form, and packages are typically 
                sent in the first month of each quarter.
              </p>
            </div>
            
            <div>
              <h3 className="font-playfair text-xl text-[#D4AF37] mb-2">
                Can I gift a membership to someone?
              </h3>
              <p className="font-lora text-[#FAF3E0]">
                Absolutely! Visit our Patreon page and select "Give as a gift" when choosing 
                a membership tier. You can specify the duration of the gift and provide the 
                recipient's email address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#051224]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl text-[#D4AF37] mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="font-lora text-xl text-[#FAF3E0] mb-8">
              Choose the tier that calls to you and start exploring the enchanting world of Midnight Magnolia.
            </p>
            <a href="#membership-tiers">
              <Button 
                className="bg-[#D4AF37] text-[#051224] hover:bg-[#D4AF37]/90 font-montserrat"
                size="lg"
              >
                Join Our Membership
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;