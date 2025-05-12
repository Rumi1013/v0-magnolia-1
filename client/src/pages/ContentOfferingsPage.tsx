import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Brand colors
const colors = {
  midnightBlue: "#0A192F",
  midnightTeal: "#0A3B4D",
  magnoliaWhite: "#FAF3E0",
  richGold: "#D4AF37",
  sageGreen: "#A3B18A",
  darkNavy: "#051224"
};

const ContentOfferingsPage = () => {
  // Content Types from the Patreon Templates
  const contentTypes = [
    {
      id: "affirmations",
      name: "Monthly Affirmation Cards",
      icon: "✨",
      description: "Beautiful affirmation cards with southern gothic aesthetic and soul-centered wisdom.",
      examples: [
        {
          title: "May Affirmations: Blooming Through Shadows",
          details: "Theme: Growth After Adversity",
          samples: [
            "I bloom most brilliantly in the spaces where darkness once lived.",
            "My resilience is rooted in generations of survivors who whisper strength to me.",
            "I trust the midnight hour to reveal what daylight cannot.",
            "My shadow self carries wisdom I am now ready to receive.",
            "Like the magnolia, I thrive despite storms, not in their absence."
          ],
          tiers: ["Magnolia Seed", "Crescent Bloom", "Golden Grove", "Moonlit Sanctuary", "House of Midnight"]
        }
      ]
    },
    {
      id: "wallpapers",
      name: "Digital Wallpapers",
      icon: "🖼️",
      description: "Exclusive phone and desktop wallpapers with inspirational quotes and beautiful design.",
      examples: [
        {
          title: "May Wallpapers: Midnight Garden",
          details: "Theme: Southern Gothic Gardens",
          samples: [
            "Magnolia by Moonlight - Silhouetted magnolia tree against night sky with text overlay: 'Even in darkness, I bloom'",
            "Garden of Memories - Spanish moss hanging from elegant branches with text overlay: 'Rooted in ancestry, growing toward possibility'",
            "Midnight Sanctuary - Garden gate with magnolia wreath with text overlay: 'Sacred boundaries, sacred space'"
          ],
          tiers: ["Magnolia Seed", "Crescent Bloom", "Golden Grove", "Moonlit Sanctuary", "House of Midnight"]
        }
      ]
    },
    {
      id: "tarot",
      name: "Monthly Tarot Card",
      icon: "🔮",
      description: "Deep dive into tarot wisdom with southern gothic interpretations and personal reflection prompts.",
      examples: [
        {
          title: "May Tarot Insight: The Hermit",
          details: "Card Details: The Hermit (IX of Major Arcana)",
          samples: [
            "The Hermit brings us the gift of sacred solitude – not as isolation, but as the needed space where wisdom germinates.",
            "In Southern Gothic tradition, The Hermit represents the elder who knows the old ways, the healer who lives at the edge of town with remedies others have forgotten.",
            "Journal Prompts: What wisdom am I seeking that can only be found in silence?",
            "Affirmation: I honor the wisdom that only silence can reveal."
          ],
          tiers: ["Crescent Bloom", "Golden Grove", "Moonlit Sanctuary", "House of Midnight"]
        }
      ]
    },
    {
      id: "journals",
      name: "Journal Pages & Worksheets",
      icon: "📝",
      description: "Printable journal pages and worksheets for deeper spiritual practice and personal growth.",
      examples: [
        {
          title: "May Journal Pages: Ancestral Healing",
          details: "Theme: Connecting with Family Wisdom",
          samples: [
            "Ancestral Wisdom Tracker - Document family sayings, wisdom, and traditions",
            "Healing Genogram Template - Map family patterns to identify areas for healing",
            "Letter to Ancestors - Guided writing prompts for dialoguing with those who came before",
            "Ancestral Recipes & Remedies - Preserve family healing traditions",
            "Monthly Ancestral Altar Guide - Create sacred space for ancestral connection"
          ],
          tiers: ["Golden Grove", "Moonlit Sanctuary", "House of Midnight"]
        }
      ]
    },
    {
      id: "audio",
      name: "Audio Rituals & Playlists",
      icon: "🎧",
      description: "Guided meditations, rituals, and curated playlists for your spiritual practice.",
      examples: [
        {
          title: "May Audio: Magnolia Moon Meditation",
          details: "Type: Guided Meditation with Visualization",
          samples: [
            "Introduction - Welcome and setting intention for connecting with inner strength",
            "Grounding - Deep breathing exercise with body scan for tension release",
            "Magnolia Visualization - Imagining a magnolia tree growing from your heart center",
            "Moonlight Illumination - Visualization of moonlight revealing hidden strengths",
            "Integration - Bringing insights back into daily life"
          ],
          tiers: ["Golden Grove", "Moonlit Sanctuary", "House of Midnight"]
        }
      ]
    },
    {
      id: "personalized",
      name: "Personalized Content",
      icon: "💌",
      description: "Custom affirmations, tarot readings, and personalized guidance for your unique journey.",
      examples: [
        {
          title: "Monthly Personalized Affirmation",
          details: "Custom affirmation based on your current life circumstances and spiritual focus.",
          samples: [],
          tiers: ["Moonlit Sanctuary", "House of Midnight"]
        },
        {
          title: "Custom Tarot Reading",
          details: "Monthly personal tarot reading with detailed interpretation and guidance.",
          samples: [],
          tiers: ["House of Midnight"]
        }
      ]
    },
    {
      id: "physical",
      name: "Physical Mail Package",
      icon: "📦",
      description: "Quarterly physical mailings with tangible magical items and exclusive printed materials.",
      examples: [
        {
          title: "Quarterly Physical Mail Package",
          details: "A curated collection of physical items sent by mail each quarter.",
          samples: [
            "Printed affirmation cards on premium cardstock",
            "Custom printed journal with exclusive prompts",
            "Ritual items and tools",
            "Handwritten note from the creator",
            "Seasonal themed physical products"
          ],
          tiers: ["House of Midnight"]
        }
      ]
    }
  ];

  // Tier information from PatreonTiers.tsx
  const tierData = [
    {
      name: "Magnolia Seed",
      price: "$3",
      tagline: "Plant the seeds of transformation",
      icon: "🌱",
      accentColor: colors.sageGreen,
      backgroundColor: colors.midnightBlue
    },
    {
      name: "Crescent Bloom",
      price: "$7",
      tagline: "Illuminate your path through shadow and light",
      icon: "🌙",
      accentColor: colors.magnoliaWhite,
      backgroundColor: colors.midnightTeal
    },
    {
      name: "Golden Grove",
      price: "$15",
      tagline: "Nurture your creative spirit and ancestral wisdom",
      icon: "✨",
      accentColor: colors.richGold,
      backgroundColor: colors.darkNavy
    },
    {
      name: "Moonlit Sanctuary",
      price: "$30",
      tagline: "Enter the sacred space of collective healing",
      icon: "🌑",
      accentColor: colors.magnoliaWhite,
      backgroundColor: colors.midnightBlue
    },
    {
      name: "House of Midnight",
      price: "$75",
      tagline: "Dwell in the ancestral mansion of creative abundance",
      icon: "🏛️",
      accentColor: colors.richGold,
      backgroundColor: colors.darkNavy
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051224] to-[#0A192F]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl md:text-6xl text-[#D4AF37] mb-6">
              Content & Offerings
            </h1>
            <p className="font-lora text-xl text-[#FAF3E0] mb-8 leading-relaxed">
              Explore the enchanting content available through our Patreon membership tiers.
              Each piece is crafted with intention, combining Southern Gothic aesthetics with
              spiritual guidance and ancestral wisdom.
            </p>
            <Link to="/membership">
              <Button 
                className="bg-[#D4AF37] text-[#051224] hover:bg-[#D4AF37]/90 font-montserrat"
                size="lg"
              >
                View Membership Tiers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={contentTypes[0].id} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8 bg-[#0A192F]/50">
              {contentTypes.map(type => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="text-[#FAF3E0] data-[state=active]:text-[#D4AF37] data-[state=active]:bg-[#0A192F]/70"
                >
                  <span className="mr-2">{type.icon}</span>
                  <span className="hidden md:inline">{type.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {contentTypes.map(type => (
              <TabsContent key={type.id} value={type.id} className="focus-visible:outline-none focus-visible:ring-0">
                <div className="bg-[#0A192F]/50 rounded-lg p-6 border border-[#A3B18A]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{type.icon}</span>
                    <h2 className="font-playfair text-2xl md:text-3xl text-[#D4AF37]">
                      {type.name}
                    </h2>
                  </div>
                  
                  <p className="font-lora text-lg text-[#FAF3E0] mb-8">
                    {type.description}
                  </p>
                  
                  <div className="space-y-8">
                    {type.examples.map((example, idx) => (
                      <Card key={idx} className="bg-[#051224] border-[#A3B18A]/30">
                        <CardHeader>
                          <CardTitle className="text-[#D4AF37] font-playfair">{example.title}</CardTitle>
                          <CardDescription className="text-[#FAF3E0]/80 font-lora">
                            {example.details}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {example.samples && example.samples.length > 0 ? (
                            <div className="space-y-3">
                              {example.samples.map((sample, sIdx) => (
                                <p key={sIdx} className="font-lora text-[#FAF3E0] border-l-2 border-[#D4AF37] pl-3 py-1">
                                  {sample}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="font-lora text-[#FAF3E0] italic">
                              This personalized content is unique to each member.
                            </p>
                          )}
                          
                          <div className="mt-6">
                            <h4 className="text-[#A3B18A] font-montserrat text-sm uppercase tracking-wider mb-2">
                              Available in these tiers:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {example.tiers.map((tierName, tIdx) => {
                                const tier = tierData.find(t => t.name === tierName);
                                return tier ? (
                                  <div 
                                    key={tIdx}
                                    className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                    style={{ 
                                      backgroundColor: tier.backgroundColor,
                                      border: `1px solid ${tier.accentColor}`,
                                      color: tier.accentColor
                                    }}
                                  >
                                    <span>{tier.icon}</span>
                                    <span>{tierName}</span>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#051224]/80">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl text-[#D4AF37] mb-6">
              Begin Your Journey Today
            </h2>
            <p className="font-lora text-lg text-[#FAF3E0] mb-8">
              Join our community of seekers and creators. Choose the membership tier
              that resonates with you and start receiving enchanting content that nurtures
              your spiritual practice.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/membership">
                <Button 
                  className="bg-[#D4AF37] text-[#051224] hover:bg-[#D4AF37]/90 font-montserrat w-full sm:w-auto"
                  size="lg"
                >
                  View Membership Tiers
                </Button>
              </Link>
              <a href="https://www.patreon.com/midnightmagnolia" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  className="border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A]/10 font-montserrat w-full sm:w-auto"
                  size="lg"
                >
                  Visit Patreon Page
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentOfferingsPage;