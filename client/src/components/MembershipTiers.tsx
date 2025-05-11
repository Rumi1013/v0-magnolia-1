import React from 'react';
import { Link } from 'wouter';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define tier types
interface TierFeature {
  name: string;
  included: boolean;
}

interface Tier {
  id: string;
  name: string;
  description: string;
  price: number;
  highlighted?: boolean;
  color: string;
  features: TierFeature[];
  buttonText: string;
  buttonLink: string;
}

const MembershipTiers: React.FC = () => {
  // Membership tiers data
  const tiers: Tier[] = [
    {
      id: 'magnolia-seed',
      name: 'Magnolia Seed',
      description: 'Essential resources for those beginning their journey with basic downloadable content.',
      price: 5,
      color: '#4D7563', // Sage green for Seed tier (darker for better contrast)
      features: [
        { name: 'Basic affirmations & journal prompts', included: true },
        { name: 'Monthly newsletter with spiritual insights', included: true },
        { name: 'Seasonal ritual guides & worksheets', included: true },
        { name: 'Access to community forum', included: true },
        { name: 'Discounted digital products', included: true },
        { name: 'Premium content library access', included: false },
        { name: 'Custom tarot & birth chart readings', included: false },
        { name: 'Personalized content suggestions', included: false },
        { name: 'Early access to new resources', included: false },
        { name: 'Private consultations', included: false },
      ],
      buttonText: 'Start with Seed',
      buttonLink: '/checkout/magnolia-seed'
    },
    {
      id: 'crescent-bloom',
      name: 'Crescent Bloom',
      description: 'Extended resources including premium content access and personalized elements.',
      price: 12,
      color: '#3D5A73', // Blue for Crescent tier (darker for better contrast)
      features: [
        { name: 'Basic affirmations & journal prompts', included: true },
        { name: 'Monthly newsletter with spiritual insights', included: true },
        { name: 'Seasonal ritual guides & worksheets', included: true },
        { name: 'Access to community forum', included: true },
        { name: 'Discounted digital products', included: true },
        { name: 'Premium content library access', included: true },
        { name: 'Custom tarot & birth chart readings', included: false },
        { name: 'Personalized content suggestions', included: true },
        { name: 'Early access to new resources', included: false },
        { name: 'Private consultations', included: false },
      ],
      buttonText: 'Join Crescent',
      buttonLink: '/checkout/crescent-bloom'
    },
    {
      id: 'golden-grove',
      name: 'Golden Grove',
      description: 'Premium access with personalized readings and priority consultations.',
      price: 25,
      highlighted: true,
      color: '#D4AF37', // Rich gold for Golden Grove (popular tier)
      features: [
        { name: 'Basic affirmations & journal prompts', included: true },
        { name: 'Monthly newsletter with spiritual insights', included: true },
        { name: 'Seasonal ritual guides & worksheets', included: true },
        { name: 'Access to community forum', included: true },
        { name: 'Discounted digital products', included: true },
        { name: 'Premium content library access', included: true },
        { name: 'Custom tarot & birth chart readings', included: true },
        { name: 'Personalized content suggestions', included: true },
        { name: 'Early access to new resources', included: true },
        { name: 'Private consultations', included: false },
      ],
      buttonText: 'Choose Golden Grove',
      buttonLink: '/checkout/golden-grove'
    },
    {
      id: 'moonlit-sanctuary',
      name: 'Moonlit Sanctuary',
      description: 'Complete access to all resources with exclusive consulting sessions.',
      price: 45,
      color: '#3B4F7D', // Deep blue for highest tier (darkened for better contrast)
      features: [
        { name: 'Basic affirmations & journal prompts', included: true },
        { name: 'Monthly newsletter with spiritual insights', included: true },
        { name: 'Seasonal ritual guides & worksheets', included: true },
        { name: 'Access to community forum', included: true },
        { name: 'Discounted digital products', included: true },
        { name: 'Premium content library access', included: true },
        { name: 'Custom tarot & birth chart readings', included: true },
        { name: 'Personalized content suggestions', included: true },
        { name: 'Early access to new resources', included: true },
        { name: 'Private consultations', included: true },
      ],
      buttonText: 'Enter Sanctuary',
      buttonLink: '/checkout/moonlit-sanctuary'
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-playfair font-bold text-[#0A192F] mb-6" id="membership-tiers">
          Membership Tiers
        </h1>
        <p className="text-[#0A192F] text-lg max-w-3xl mx-auto">
          Join our community of creators and spiritual seekers. Choose the tier that aligns with your journey and unlock a world of mystical content creation resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tiers.map((tier) => (
          <Card 
            key={tier.id}
            className={`border-2 relative h-full flex flex-col ${
              tier.highlighted 
                ? 'border-[#D4AF37] shadow-lg transform -translate-y-2' 
                : 'border-[#0A192F]/10'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-[#D4AF37] text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader className={tier.highlighted ? 'pb-4' : 'pb-2'}>
              <CardTitle className="text-center text-2xl font-playfair text-[#0A192F]">
                {tier.name}
              </CardTitle>
              <div className="text-center mt-2">
                <span className="text-3xl font-bold text-[#0A192F]">${tier.price}</span>
                <span className="text-[#0A192F]/70 ml-1">/month</span>
              </div>
              <CardDescription className="text-center text-[#0A192F]/80 mt-2 min-h-[60px]">
                {tier.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-center"
                  >
                    {feature.included ? (
                      <Check className={`h-5 w-5 mr-2 flex-shrink-0`} style={{ color: tier.color }} />
                    ) : (
                      <X className="h-5 w-5 mr-2 text-[#0A192F]/50 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-[#0A192F]/90' : 'text-[#0A192F]/70'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-6">
              <Button 
                className="w-full" 
                style={{ 
                  backgroundColor: tier.color, 
                  color: '#FFFFFF',
                  borderColor: tier.color,
                  boxShadow: tier.highlighted ? '0 4px 14px 0 rgba(212, 175, 55, 0.39)' : 'none'
                }}
                asChild
              >
                <Link href={tier.buttonLink}>
                  {tier.buttonText}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-playfair font-bold text-[#0A192F] mb-4">House of Midnight</h2>
        <p className="text-[#0A192F] mb-6 max-w-2xl mx-auto">
          For content creators, influencers, and business owners who need custom solutions for their mystical brands. 
          Contact us directly for a personalized collaboration.
        </p>
        <Button
          className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-white"
          asChild
        >
          <Link href="/contact">Request Custom Collaboration</Link>
        </Button>
      </div>
    </div>
  );
};

export default MembershipTiers;