import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Check, 
  X,
  Sparkles,
  Moon,
  Book,
  Star,
  Gem
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  icon: 'moon' | 'book' | 'star' | 'gem' | 'sparkles';
  aiCredits: number;
  maxOutputs: number;
  maxWorkflows: number;
  products: string[];
  access: string[];
}

export function TieredProductPricing() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // This would normally fetch from an API endpoint
  const pricingTiers: PricingTier[] = [
    {
      id: 'magnolia-seed',
      name: 'Magnolia Seed',
      price: 9,
      monthlyPrice: 9,
      description: 'Essential tools for digital content creators just getting started',
      features: [
        'Basic AI-generated content',
        'Up to 10 workflow steps per month',
        'Natal birth chart generation',
        'Standard priority support',
        'Public Digital Grimoire templates'
      ],
      highlighted: false,
      icon: 'moon',
      aiCredits: 10,
      maxOutputs: 5,
      maxWorkflows: 3,
      products: ['Natal Chart PDF', 'Basic Affirmations'],
      access: ['Public Workflows']
    },
    {
      id: 'crescent-bloom',
      name: 'Crescent Bloom',
      price: 29,
      monthlyPrice: 29,
      description: 'Expanded tools for consistent content creators and digital entrepreneurs',
      features: [
        'Advanced AI-generated content',
        'Up to 50 workflow steps per month',
        'All birth chart types',
        'Priority support',
        'Premium Digital Grimoire templates',
        'Content calendar integration'
      ],
      highlighted: true,
      badge: 'Popular',
      icon: 'book',
      aiCredits: 50,
      maxOutputs: 20,
      maxWorkflows: 10,
      products: ['All Chart Types', 'Digital Planner', 'Tarot Interpretations'],
      access: ['Premium Workflows', 'Notion Integration']
    },
    {
      id: 'golden-grove',
      name: 'Golden Grove',
      price: 79,
      monthlyPrice: 79,
      description: 'Professional suite for established creators and digital businesses',
      features: [
        'Priority AI content generation',
        'Unlimited workflow steps',
        'API access to birth chart generation',
        'Dedicated support',
        'All Digital Grimoire templates',
        'White-label content exports',
        'Custom workflow templates'
      ],
      highlighted: false,
      icon: 'star',
      aiCredits: 200,
      maxOutputs: 100,
      maxWorkflows: 50,
      products: ['API Access', 'White-label Export', 'All Digital Products'],
      access: ['Enterprise Workflows', 'Airtable & Notion Integration']
    },
    {
      id: 'house-of-midnight',
      name: 'House of Midnight',
      price: 199,
      monthlyPrice: 199,
      description: 'Enterprise solution for agencies and professional astrologers',
      features: [
        'Unlimited AI content generation',
        'Multi-user workflow access',
        'Full API access to all features',
        '24/7 dedicated support',
        'Custom Digital Grimoire development',
        'Private AI model tuning',
        'Custom integration development'
      ],
      highlighted: false,
      badge: 'Enterprise',
      icon: 'gem',
      aiCredits: 999999, // Unlimited
      maxOutputs: 999999, // Unlimited
      maxWorkflows: 999999, // Unlimited
      products: ['All Products', 'Custom Development', 'Private AI Models'],
      access: ['Everything']
    }
  ];

  const handleSelectTier = (tier: PricingTier) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to subscribe to a pricing tier',
        variant: 'destructive',
      });
      return;
    }

    // Here you would typically redirect to a checkout page
    // with Stripe or another payment processor
    toast({
      title: 'Redirecting to Checkout',
      description: `Setting up your ${tier.name} subscription`,
    });
    
    // Redirect to a hypothetical checkout page
    // In a real implementation, this would use the Stripe API
    // window.location.href = `/checkout?tier=${tier.id}`;
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'moon':
        return <Moon className="h-5 w-5" />;
      case 'book':
        return <Book className="h-5 w-5" />;
      case 'star':
        return <Star className="h-5 w-5" />;
      case 'gem':
        return <Gem className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-playfair text-[#0A192F] mb-4">
          Digital Grimoire Access Tiers
        </h2>
        <p className="text-gray-600 mb-8">
          Choose the perfect tier for your content creation journey with our Southern Gothic digital tools.
          All plans include access to our core Digital Grimoire features.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingTiers.map((tier) => (
          <Card 
            key={tier.id} 
            className={`border ${
              tier.highlighted 
                ? 'border-[#D4AF37] shadow-lg' 
                : 'border-[#A3B18A]/20'
            } relative overflow-hidden transition-all hover:shadow-md`}
          >
            {tier.badge && (
              <Badge className="absolute top-4 right-4 bg-[#D4AF37] text-[#0A192F]">
                {tier.badge}
              </Badge>
            )}
            
            <CardHeader className={`pb-2 ${tier.highlighted ? 'bg-[#0A192F]/5' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4 text-[#D4AF37]">
                {getIconComponent(tier.icon)}
              </div>
              <CardTitle className="text-xl font-playfair text-[#0A192F]">
                {tier.name}
              </CardTitle>
              <div className="mt-2">
                <span className="text-2xl font-bold text-[#0A192F]">${tier.price}</span>
                <span className="text-gray-500 text-sm ml-1">/month</span>
              </div>
              <CardDescription className="mt-3">
                {tier.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-[#D4AF37] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#0A192F]">AI Content Generation</h4>
                  <div className="bg-[#0A192F]/5 rounded-lg p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Monthly Credits</span>
                      <span className="font-medium text-[#0A192F]">
                        {tier.aiCredits === 999999 ? 'Unlimited' : tier.aiCredits}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Max Outputs</span>
                      <span className="font-medium text-[#0A192F]">
                        {tier.maxOutputs === 999999 ? 'Unlimited' : tier.maxOutputs}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#0A192F]">Workflow Management</h4>
                  <div className="bg-[#0A192F]/5 rounded-lg p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Workflows</span>
                      <span className="font-medium text-[#0A192F]">
                        {tier.maxWorkflows === 999999 ? 'Unlimited' : tier.maxWorkflows}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#0A192F]">Digital Products</h4>
                  <div className="bg-[#0A192F]/5 rounded-lg p-3">
                    <ul className="space-y-1">
                      {tier.products.map((product, idx) => (
                        <li key={idx} className="text-xs text-gray-600">• {product}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button 
                onClick={() => handleSelectTier(tier)}
                className={`w-full ${
                  tier.highlighted
                    ? 'bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A192F]'
                    : 'bg-[#0A192F] hover:bg-[#0A192F]/90 text-white'
                }`}
              >
                Select {tier.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-[#0A192F]/5 rounded-lg p-6 border border-[#A3B18A]/30 mt-10">
        <h3 className="text-lg font-playfair text-[#0A192F] mb-4">Custom Enterprise Solutions</h3>
        <p className="text-gray-600 mb-4">
          Need a tailored solution for your business? Contact us for custom pricing and feature options.
        </p>
        <Button variant="outline" className="border-[#D4AF37] text-[#0A192F]">
          Contact Sales
        </Button>
      </div>
    </div>
  );
}