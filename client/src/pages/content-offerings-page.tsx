import React from 'react';
import { Helmet } from 'react-helmet';
import ContentOfferings from '@/components/ContentOfferings.fixed';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { MoonStar, Star, Sparkles, ArrowRight } from 'lucide-react';

const ContentOfferingsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Content Creation Tools | Midnight Magnolia Digital Grimoire</title>
        <meta name="description" content="Create professional mystical content with the Digital Grimoire. Generate tarot descriptions, journal prompts, affirmations, ritual guides, and spiritual content for your brand or business." />
        <meta name="keywords" content="tarot content creation, journal prompts, spiritual affirmations, ritual guides, mystic content generator, spiritual content for business, digital grimoire" />
        <link rel="canonical" href="https://midnightmagnolia.com/content-offerings" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Content Creation Tools | Midnight Magnolia Digital Grimoire" />
        <meta property="og:description" content="Professional content creation tools for spiritual entrepreneurs, tarot readers, and mystical content creators." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://midnightmagnolia.com/content-offerings" />
        <meta property="og:image" content="https://midnightmagnolia.com/img/content-offerings-og.jpg" />
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Midnight Magnolia Digital Grimoire",
              "applicationCategory": "ContentCreationApplication",
              "operatingSystem": "Web",
              "description": "Professional content creation platform for spiritual entrepreneurs and mystical content creators",
              "offers": {
                "@type": "Offer",
                "price": "5.00",
                "priceCurrency": "USD"
              }
            }
          `}
        </script>
      </Helmet>

      <div className="bg-[#FAF3E0]/30 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-[#0A192F]">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-playfair text-white mb-6">
                  <span className="text-[#D4AF37]">Mystical Content</span> Creation Made Simple
                </h1>
                <p className="text-[#FAF3E0] text-lg mb-8 max-w-xl">
                  The Digital Grimoire makes creating professional spiritual content effortless. From tarot descriptions to journal prompts, our tools help you create authentic content that resonates.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button 
                    className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                    asChild
                  >
                    <Link href="/content-creator">
                      Start Creating
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[#FAF3E0] text-[#FAF3E0] hover:bg-[#FAF3E0]/10"
                    asChild
                  >
                    <Link href="/membership">
                      View Membership Plans
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-[#0F294D] p-5 rounded-lg border border-[#FAF3E0]/10">
                      <MoonStar className="h-8 w-8 text-[#D4AF37] mb-2" />
                      <h3 className="text-[#FAF3E0] font-medium">Tarot Content</h3>
                      <p className="text-[#FAF3E0]/70 text-sm">Professional card descriptions and interpretations</p>
                    </div>
                    <div className="bg-[#0F294D] p-5 rounded-lg border border-[#FAF3E0]/10">
                      <Star className="h-8 w-8 text-[#D4AF37] mb-2" />
                      <h3 className="text-[#FAF3E0] font-medium">Affirmations</h3>
                      <p className="text-[#FAF3E0]/70 text-sm">Positive statements for any intention</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-6">
                    <div className="bg-[#0F294D] p-5 rounded-lg border border-[#FAF3E0]/10">
                      <Sparkles className="h-8 w-8 text-[#D4AF37] mb-2" />
                      <h3 className="text-[#FAF3E0] font-medium">Journal Prompts</h3>
                      <p className="text-[#FAF3E0]/70 text-sm">Thought-provoking questions for reflection</p>
                    </div>
                    <div className="bg-[#0F294D] p-5 rounded-lg border border-[#FAF3E0]/10">
                      <Star className="h-8 w-8 text-[#D4AF37] mb-2" />
                      <h3 className="text-[#FAF3E0] font-medium">Ritual Guides</h3>
                      <p className="text-[#FAF3E0]/70 text-sm">Step-by-step spiritual practices</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Offerings Section */}
        <ContentOfferings />

        {/* Stats Section */}
        <section className="py-16 px-4 bg-[#0A192F] text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">8+</div>
                <div className="text-[#FAF3E0]/80">Content Types</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">1,000+</div>
                <div className="text-[#FAF3E0]/80">Content Pieces</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">15x</div>
                <div className="text-[#FAF3E0]/80">Faster Creation</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">98%</div>
                <div className="text-[#FAF3E0]/80">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-playfair text-[#0A192F] mb-4">Ready to Transform Your Content Creation?</h2>
            <p className="text-[#0A192F]/80 max-w-2xl mx-auto mb-8">
              Join thousands of spiritual entrepreneurs who are saving time and creating professional content with the Digital Grimoire.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                size="lg"
                asChild
              >
                <Link href="/content-creator">
                  Try It Now
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-[#0A192F] text-[#0A192F]"
                size="lg"
                asChild
              >
                <Link href="/membership">
                  View Membership Plans
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContentOfferingsPage;