import React from 'react';
import MembershipTiers from '@/components/MembershipTiers';
import { Helmet } from 'react-helmet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, BookOpen, Sparkles, RefreshCw, Star, MoonStar } from 'lucide-react';

const MembershipPage: React.FC = () => {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Maya Thompson",
      role: "Spiritual Coach",
      quote: "Midnight Magnolia has completely transformed my content creation process. The tarot descriptions and affirmations I create with the Digital Grimoire have become essential to my business.",
      tier: "Golden Grove"
    },
    {
      id: 2,
      name: "James Chen",
      role: "Wellness Blogger",
      quote: "The workflow tools are intuitive and help me stay consistent with my content calendar. Worth every penny for the time saved alone.",
      tier: "Crescent Bloom"
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      role: "Tarot Reader",
      quote: "The depth of content I can create with these tools has elevated my brand. My clients notice the difference in quality and depth.",
      tier: "Moonlit Sanctuary"
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: <CheckCircle className="h-8 w-8 text-[#D4AF37]" />,
      title: "Quality Content",
      description: "Create professional mystical content that resonates with your audience and reflects your unique spiritual perspective."
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-[#D4AF37]" />,
      title: "Time Efficiency",
      description: "Reduce content creation time by up to 75% with our guided workflows and AI-powered content generation tools."
    },
    {
      icon: <Heart className="h-8 w-8 text-[#D4AF37]" />,
      title: "Community Connection",
      description: "Join a supportive network of like-minded spiritual entrepreneurs and content creators."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-[#D4AF37]" />,
      title: "Extensive Library",
      description: "Access our growing collection of templates, prompts, and spiritual resources to enhance your content."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-[#D4AF37]" />,
      title: "Spiritual Alignment",
      description: "Create content that authentically aligns with moon phases, astrological events, and seasonal energies."
    },
    {
      icon: <Star className="h-8 w-8 text-[#D4AF37]" />,
      title: "Brand Elevation",
      description: "Distinguish your spiritual brand with premium, consistent content that builds authority in your niche."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Membership Tiers | Midnight Magnolia Digital Grimoire</title>
        <meta name="description" content="Join Midnight Magnolia's membership tiers for mystical content creation tools, tarot resources, journal prompts, guided workflows, and personalized spiritual content." />
        <meta name="keywords" content="spiritual content creation, tarot content, journal prompts, affirmations, mystical content, content creator tools, Midnight Magnolia membership" />
        <link rel="canonical" href="https://midnightmagnolia.com/membership" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Membership Tiers | Midnight Magnolia Digital Grimoire" />
        <meta property="og:description" content="Transform your spiritual content creation with our premium tools, templates, and resources for mystical entrepreneurs and creators." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://midnightmagnolia.com/membership" />
        <meta property="og:image" content="https://midnightmagnolia.com/img/membership-og.jpg" />
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Midnight Magnolia Digital Grimoire Membership",
              "description": "Premium membership for spiritual content creators with access to tarot content, journal prompts, and mystical resources",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "5",
                "highPrice": "45",
                "priceCurrency": "USD",
                "offerCount": "4"
              }
            }
          `}
        </script>
      </Helmet>

      <div className="bg-[#FAF3E0]/30 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-[#0A192F] text-white py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-playfair mb-6">
                  Elevate Your Spiritual <span className="text-[#D4AF37]">Content Creation</span>
                </h1>
                <p className="text-[#FAF3E0] text-lg mb-8 max-w-xl">
                  Join our tiered membership program and unlock the Digital Grimoire - your ultimate toolkit for creating mystical content with ease, flow, and authentic spiritual depth.
                </p>
                <div className="flex space-x-4 items-center">
                  <MoonStar className="h-6 w-6 text-[#D4AF37]" />
                  <p className="text-[#FAF3E0]/80">
                    Trusted by 1,200+ spiritual creators and entrepreneurs
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl"></div>
                  <div className="relative bg-[#0A192F]/40 p-6 rounded-lg border border-[#FAF3E0]/10 backdrop-blur-sm">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center p-3 bg-[#0A192F]/60 rounded-md border border-[#FAF3E0]/10">
                        <CheckCircle className="h-5 w-5 text-[#D4AF37] mr-3" />
                        <span className="text-[#FAF3E0]">AI-Powered Content Generation</span>
                      </div>
                      <div className="flex items-center p-3 bg-[#0A192F]/60 rounded-md border border-[#FAF3E0]/10">
                        <CheckCircle className="h-5 w-5 text-[#D4AF37] mr-3" />
                        <span className="text-[#FAF3E0]">Guided Workflow Templates</span>
                      </div>
                      <div className="flex items-center p-3 bg-[#0A192F]/60 rounded-md border border-[#FAF3E0]/10">
                        <CheckCircle className="h-5 w-5 text-[#D4AF37] mr-3" />
                        <span className="text-[#FAF3E0]">Tarot & Oracle Resources</span>
                      </div>
                      <div className="flex items-center p-3 bg-[#0A192F]/60 rounded-md border border-[#FAF3E0]/10">
                        <CheckCircle className="h-5 w-5 text-[#D4AF37] mr-3" />
                        <span className="text-[#FAF3E0]">Spiritual Content Library</span>
                      </div>
                      <div className="flex items-center p-3 bg-[#0A192F]/60 rounded-md border border-[#FAF3E0]/10">
                        <CheckCircle className="h-5 w-5 text-[#D4AF37] mr-3" />
                        <span className="text-[#FAF3E0]">Multi-Platform Publishing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair text-[#0A192F] mb-4">
                Benefits of Membership
              </h2>
              <p className="text-[#0A192F]/80 max-w-2xl mx-auto">
                Discover how our Digital Grimoire transforms your content creation process while deepening your spiritual practice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-[#0A192F]/10">
                  <CardHeader className="pb-2">
                    {benefit.icon}
                    <CardTitle className="text-xl font-medium text-[#0A192F] mt-4">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#0A192F]/80">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Tiers Section */}
        <section className="py-20 px-4 bg-[#F8F5EB]" id="pricing">
          <MembershipTiers />
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair text-[#0A192F] mb-4">
                What Our Members Say
              </h2>
              <p className="text-[#0A192F]/80 max-w-2xl mx-auto">
                Hear from spiritual entrepreneurs and content creators who have transformed their work with the Digital Grimoire.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-[#0A192F]/10">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#0A192F]/80 italic mb-6">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#0A192F]/10 flex items-center justify-center mr-3">
                        <span className="text-[#0A192F] font-medium">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0A192F]">{testimonial.name}</h4>
                        <div className="flex items-center">
                          <span className="text-[#0A192F]/70 text-sm">{testimonial.role}</span>
                          <span className="mx-2 text-[#0A192F]/30">•</span>
                          <span className="text-[#D4AF37] text-sm">{testimonial.tier} Member</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-[#F8F5EB]">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair text-[#0A192F] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#0A192F]/80 max-w-2xl mx-auto">
                Common questions about our membership tiers and the Digital Grimoire
              </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="general" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-white">
                  General
                </TabsTrigger>
                <TabsTrigger value="membership" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-white">
                  Membership
                </TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-white">
                  Features
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <ScrollArea className="h-[400px] rounded-md border border-[#0A192F]/10 p-6 bg-white">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">What is the Digital Grimoire?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        The Digital Grimoire is our content creation platform designed specifically for spiritual entrepreneurs, tarot readers, astrologers, and mystical content creators. It combines AI-powered content generation with structured workflows and a rich resource library.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">Do I need technical skills to use the platform?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        No technical skills are required. Our platform is designed to be intuitive and user-friendly, with guided processes for all content creation tasks.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">Can I cancel my membership anytime?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        Yes, all memberships can be canceled at any time. You'll maintain access until the end of your current billing period.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">Is my content protected and private?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        Absolutely. All content you create belongs to you, and your data is kept private and secure. We never share or sell your content or personal information.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="membership">
                <ScrollArea className="h-[400px] rounded-md border border-[#0A192F]/10 p-6 bg-white">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">How do I upgrade or downgrade my membership?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        You can change your membership tier at any time from your account settings. Changes take effect at your next billing cycle.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">Are there any contracts or minimum commitment periods?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        No contracts or minimum periods. All memberships are month-to-month, and you can cancel anytime.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">What payment methods do you accept?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        We accept all major credit cards, PayPal, and Apple Pay for membership payments.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">Do you offer discounts for annual subscriptions?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        Yes, we offer a 20% discount when you choose annual billing for any membership tier.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="features">
                <ScrollArea className="h-[400px] rounded-md border border-[#0A192F]/10 p-6 bg-white">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">What types of content can I create with the Digital Grimoire?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        You can create tarot card descriptions, affirmations, journal prompts, ritual guides, social media content, product descriptions, and much more.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">How does the AI content generation work?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        Our AI tools are trained on spiritual and mystical content to help you generate ideas, outlines, and drafts. You maintain full creative control and can edit or refine the AI suggestions.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">Can I use the content commercially?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        Yes, all content you create with our platform can be used commercially in your business and products.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0A192F]">Do you provide templates and examples?</h3>
                      <p className="mt-2 text-[#0A192F]/80">
                        Yes, all membership tiers include access to templates, examples, and frameworks to help you create professional content quickly.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </>
  );
};

export default MembershipPage;