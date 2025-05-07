import { useState } from "react";
import { Check, Moon, Book, Star, Gem, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

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

const tiers: PricingTier[] = [
  {
    id: "magnolia-seed",
    name: "Magnolia Seed",
    price: 0,
    monthlyPrice: 0,
    description: "Explore the surface of the mystical realm with basic tools and limited access.",
    features: [
      "Free Birth Chart (Limited)",
      "1 Basic Workflow Template",
      "Community Access",
      "Digital Grimoire Basics",
    ],
    highlighted: false,
    icon: 'moon',
    aiCredits: 3,
    maxOutputs: 10,
    maxWorkflows: 1,
    products: ["Basic Birth Chart"],
    access: ["Community Forum", "Grimoire Basics"]
  },
  {
    id: "crescent-bloom",
    name: "Crescent Bloom",
    price: 97,
    monthlyPrice: 9.97,
    description: "Begin your journey with essential tools for content and brand enchantment.",
    features: [
      "Full Birth Chart Analysis",
      "3 Workflow Templates",
      "Basic AI Content Generation",
      "Digital Grimoire Standard",
      "Email Support",
    ],
    highlighted: false,
    icon: 'book',
    aiCredits: 25,
    maxOutputs: 50,
    maxWorkflows: 3,
    products: ["Full Birth Chart", "Content Briefs", "Tarot Reading Generator"],
    access: ["Community Forum", "Grimoire Standard", "Email Support"]
  },
  {
    id: "golden-grove",
    name: "Golden Grove",
    price: 197,
    monthlyPrice: 19.97,
    description: "Amplify your practice with enhanced tools and expanded access to mystical resources.",
    features: [
      "Advanced Birth Chart Analysis",
      "5 Workflow Templates",
      "Advanced AI Content Tools",
      "Digital Grimoire Professional",
      "Priority Support",
      "Monthly Group Coaching",
    ],
    highlighted: true,
    badge: "Most Popular",
    icon: 'star',
    aiCredits: 100,
    maxOutputs: 250,
    maxWorkflows: 5,
    products: ["Advanced Birth Chart", "Content Briefs", "Tarot Reading Generator", "Affirmation Generator", "Worksheet Creator"],
    access: ["Community Forum", "Grimoire Professional", "Priority Support", "Monthly Group Coaching"]
  },
  {
    id: "moonlit-sanctuary",
    name: "Moonlit Sanctuary",
    price: 497,
    monthlyPrice: 49.97,
    description: "Immerse yourself in premium resources and personalized guidance for your content journey.",
    features: [
      "Premium Birth Chart & Compatibility",
      "10 Workflow Templates",
      "Complete AI Content Suite",
      "Digital Grimoire Elite",
      "VIP Support",
      "Bi-Weekly Group Coaching",
      "Quarterly 1:1 Strategy Session",
    ],
    highlighted: false,
    icon: 'gem',
    aiCredits: 300,
    maxOutputs: 1000,
    maxWorkflows: 10,
    products: ["Premium Birth Chart", "Content Briefs", "Tarot Reading Generator", "Affirmation Generator", "Worksheet Creator", "Product Descriptions", "Moon Phase Content", "Brand Voice Generator"],
    access: ["Community Forum", "Grimoire Elite", "VIP Support", "Bi-Weekly Group Coaching", "Quarterly 1:1 Strategy"]
  },
  {
    id: "house-of-midnight",
    name: "House of Midnight",
    price: 997,
    monthlyPrice: 99.97,
    description: "The ultimate mystical content experience with exclusive access and personalized strategy.",
    features: [
      "Bespoke Astrological Profile",
      "Unlimited Workflow Templates",
      "Unlimited AI Content Generation",
      "Digital Grimoire Ultimate",
      "Dedicated Support Manager",
      "Weekly Group Coaching",
      "Monthly 1:1 Strategy Sessions",
      "Early Access to New Features",
    ],
    highlighted: false,
    icon: 'sparkles',
    aiCredits: 999,
    maxOutputs: 0, // Unlimited
    maxWorkflows: 0, // Unlimited
    products: ["Bespoke Astrological Profile", "All AI Content Tools", "Custom Workflow Designer", "API Access", "White-labeled PDFs"],
    access: ["All Community Access", "Grimoire Ultimate", "Dedicated Support", "Weekly Group Coaching", "Monthly 1:1 Strategy", "Beta Feature Access"]
  },
];

const iconMap = {
  'moon': Moon,
  'book': Book,
  'star': Star,
  'gem': Gem,
  'sparkles': Sparkles,
};

export function TieredProductPricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [_, setLocation] = useLocation();
  const { user, loginMutation } = useAuth();

  const handleSelectTier = (tier: PricingTier) => {
    if (!user) {
      setLocation("/auth");
      return;
    }
    
    // Redirect to checkout with selected tier
    setLocation(`/checkout?plan=${tier.id}&cycle=${billingCycle}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-medium mb-3 text-primary-900">Choose Your Mystical Path</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Select the perfect tier to illuminate your journey through the Digital Grimoire and access powerful creation tools.
        </p>
        
        <Tabs defaultValue="yearly" className="w-fit mx-auto">
          <TabsList className="grid w-64 grid-cols-2">
            <TabsTrigger 
              value="monthly" 
              onClick={() => setBillingCycle("monthly")}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger 
              value="yearly" 
              onClick={() => setBillingCycle("yearly")}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Yearly <Badge variant="outline" className="ml-1.5 bg-primary/10 text-xs">Save 20%</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {tiers.map((tier) => {
          const IconComponent = iconMap[tier.icon];
          return (
            <Card 
              key={tier.id} 
              className={`border ${tier.highlighted ? 'border-primary shadow-lg relative border-2' : 'border-border shadow-md'} 
              transition-all duration-300 hover:border-primary hover:shadow-lg flex flex-col bg-white/60 backdrop-blur-sm overflow-hidden`}
            >
              {tier.badge && (
                <div className="absolute -right-12 top-4 rotate-45 bg-primary text-primary-foreground text-sm font-medium py-1 px-12 text-center">
                  {tier.badge}
                </div>
              )}
              <CardHeader className="pb-0">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${tier.highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <IconComponent className="h-7 w-7" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl font-serif">{tier.name}</CardTitle>
                <div className="text-center mt-3">
                  <span className="text-3xl font-semibold">
                    ${billingCycle === "yearly" ? tier.price : tier.monthlyPrice}
                  </span>
                  {billingCycle === "monthly" && tier.monthlyPrice > 0 && <span className="text-muted-foreground">/month</span>}
                  {billingCycle === "yearly" && tier.price > 0 && <span className="text-muted-foreground">/year</span>}
                </div>
                <CardDescription className="text-center mt-2 pb-0">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow mt-6">
                <Separator className="mb-4" />
                <div className="space-y-3 text-sm">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">AI Credits:</span>
                    <span className="font-medium">{tier.aiCredits === 999 ? "Unlimited" : tier.aiCredits}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Max Outputs:</span>
                    <span className="font-medium">{tier.maxOutputs === 0 ? "Unlimited" : tier.maxOutputs}/month</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Workflows:</span>
                    <span className="font-medium">{tier.maxWorkflows === 0 ? "Unlimited" : tier.maxWorkflows}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => handleSelectTier(tier)} 
                  className={`w-full ${tier.highlighted ? 'bg-primary hover:bg-primary/90' : 'bg-primary/80 hover:bg-primary'}`}
                >
                  {tier.price === 0 ? "Start Free" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-16 text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-serif mb-4">Not Sure Which Path to Choose?</h3>
        <p className="text-muted-foreground mb-6">
          Begin with the Magnolia Seed plan to explore the basics, or book a complimentary consultation 
          to find the perfect tier for your mystical content journey.
        </p>
        <Button variant="outline">Book a Consultation</Button>
      </div>
    </div>
  );
}