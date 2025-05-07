import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

import { Moon, Star, Sparkles, Calendar, Book, ScrollText, FileText, Clock, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

// Define subscription tiers and their features
const tiers = {
  "magnolia-seed": {
    name: "Magnolia Seed",
    color: "#A3B18A",
    features: ["Basic birth chart", "Limited content templates", "Community access"],
    maxWorkflows: 2,
    aiCredits: 5,
    icon: <Moon className="h-8 w-8" />
  },
  "crescent-bloom": {
    name: "Crescent Bloom",
    color: "#B5AFC0",
    features: ["Full birth chart", "All content templates", "Community access", "Basic workflow automation"],
    maxWorkflows: 5,
    aiCredits: 20,
    icon: <Star className="h-8 w-8" />
  },
  "golden-grove": {
    name: "Golden Grove",
    color: "#D4AF37",
    features: ["Full birth chart", "All content templates", "Community access", "Advanced workflow automation", "Priority support"],
    maxWorkflows: 10,
    aiCredits: 50,
    icon: <Sparkles className="h-8 w-8" />
  },
  "moonlit-sanctuary": {
    name: "Moonlit Sanctuary",
    color: "#7C90A0",
    features: ["Full birth chart", "All content templates", "Community access", "Advanced workflow automation", "Priority support", "1:1 content coaching"],
    maxWorkflows: 20,
    aiCredits: 100,
    icon: <Calendar className="h-8 w-8" />
  },
  "house-of-midnight": {
    name: "House of Midnight",
    color: "#1A1523",
    features: ["Full birth chart", "All content templates", "Community access", "Advanced workflow automation", "Priority support", "1:1 content coaching", "Custom integration development"],
    maxWorkflows: 9999,
    aiCredits: 500,
    icon: <Book className="h-8 w-8" />
  }
};

// Recent activity type
type Activity = {
  id: string;
  type: 'workflow' | 'birth-chart' | 'template' | 'integration';
  title: string;
  description: string;
  date: Date;
  icon: React.ReactNode;
};

// Mock recent activity data
const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'workflow',
    title: 'Blog Content Workflow',
    description: 'Workflow updated with new steps',
    date: new Date(Date.now() - 1000 * 60 * 30),
    icon: <ScrollText className="h-4 w-4" />
  },
  {
    id: '2',
    type: 'birth-chart',
    title: 'Birth Chart Generated',
    description: 'New chart created for personal use',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: <Moon className="h-4 w-4" />
  },
  {
    id: '3',
    type: 'template',
    title: 'Full Moon Content Template',
    description: 'Template used for new creation',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    icon: <FileText className="h-4 w-4" />
  }
];

// Format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTier, setActiveTier] = useState<string>('magnolia-seed'); // Default tier
  const [aiCreditsUsed, setAiCreditsUsed] = useState<number>(3); // Mock data
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  // If no user is logged in, this shouldn't happen due to ProtectedRoute, but just in case
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to view your dashboard",
        variant: "destructive",
      });
      setLocation("/auth");
    } else {
      // In a real application, we would fetch the user's subscription tier from the backend
      // For now, we'll just use a mock tier
      setActiveTier("golden-grove");
    }
  }, [user, setLocation, toast]);
  
  // Get current tier details
  const currentTier = tiers[activeTier as keyof typeof tiers];
  const aiCreditsPercentage = Math.round((aiCreditsUsed / currentTier.aiCredits) * 100);
  
  return (
    <div className="bg-gradient-to-b from-[#0A192F] to-[#0F233E] min-h-screen text-[#FAF3E0]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair text-[#D4AF37] mb-2">Your Digital Grimoire</h1>
            <p className="text-[#FAF3E0]/70">View your mystical tools and creative workspace</p>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Avatar className="h-12 w-12 border-2 border-[#D4AF37]">
              <AvatarImage src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user?.username || 'user'}`} />
              <AvatarFallback className="bg-[#0A192F]">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-[#FAF3E0]">{user?.username}</h3>
              <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20">
                {currentTier.name}
              </Badge>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-[#FAF3E0]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0A192F]/90 backdrop-blur-sm p-4 rounded-lg mb-6 border border-[#A3B18A]/20">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-10 w-10 border-2 border-[#D4AF37]">
                <AvatarImage src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user?.username || 'user'}`} />
                <AvatarFallback className="bg-[#0A192F]">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-[#FAF3E0]">{user?.username}</h3>
                <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20">
                  {currentTier.name}
                </Badge>
              </div>
            </div>
            
            <nav className="space-y-2">
              <Link to="/notion">
                <Button variant="ghost" className="w-full justify-start text-[#FAF3E0] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  <Book className="mr-2 h-4 w-4" />
                  Digital Grimoire
                </Button>
              </Link>
              <Link to="/workflows">
                <Button variant="ghost" className="w-full justify-start text-[#FAF3E0] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  <ScrollText className="mr-2 h-4 w-4" />
                  Workflows
                </Button>
              </Link>
              <Link to="/ai-tools">
                <Button variant="ghost" className="w-full justify-start text-[#FAF3E0] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Tools
                </Button>
              </Link>
              <Link to="/birth-chart">
                <Button variant="ghost" className="w-full justify-start text-[#FAF3E0] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  <Moon className="mr-2 h-4 w-4" />
                  Birth Chart
                </Button>
              </Link>
            </nav>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main dashboard content - 2 columns on larger screens */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick actions */}
            <section>
              <h2 className="text-xl font-playfair text-[#D4AF37] mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Link to="/notion">
                    <Card className="bg-[#0A192F]/60 border-[#A3B18A]/20 hover:border-[#D4AF37]/30 transition-colors cursor-pointer">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <Book className="h-8 w-8 text-[#D4AF37] mb-3" />
                        <h3 className="font-medium text-[#FAF3E0]">Digital Grimoire</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Link to="/workflows">
                    <Card className="bg-[#0A192F]/60 border-[#A3B18A]/20 hover:border-[#D4AF37]/30 transition-colors cursor-pointer">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <ScrollText className="h-8 w-8 text-[#D4AF37] mb-3" />
                        <h3 className="font-medium text-[#FAF3E0]">Workflows</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Link to="/ai-tools">
                    <Card className="bg-[#0A192F]/60 border-[#A3B18A]/20 hover:border-[#D4AF37]/30 transition-colors cursor-pointer">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <Sparkles className="h-8 w-8 text-[#D4AF37] mb-3" />
                        <h3 className="font-medium text-[#FAF3E0]">AI Tools</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Link to="/birth-chart">
                    <Card className="bg-[#0A192F]/60 border-[#A3B18A]/20 hover:border-[#D4AF37]/30 transition-colors cursor-pointer">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <Moon className="h-8 w-8 text-[#D4AF37] mb-3" />
                        <h3 className="font-medium text-[#FAF3E0]">Birth Chart</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </div>
            </section>
            
            {/* Recent activity */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-playfair text-[#D4AF37]">Recent Activity</h2>
                <Button variant="link" className="text-[#D4AF37]">View All</Button>
              </div>
              
              <Card className="bg-[#0A192F]/60 border-[#A3B18A]/20">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="mr-4 mt-1 bg-[#D4AF37]/10 p-2 rounded-full">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#FAF3E0]">{activity.title}</h4>
                          <p className="text-[#FAF3E0]/70 text-sm">{activity.description}</p>
                        </div>
                        <div className="text-[#FAF3E0]/50 text-sm flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatRelativeTime(activity.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
          
          {/* Sidebar - usage stats and subscription info */}
          <div className="space-y-8">
            {/* Subscription info */}
            <Card className="bg-[#0A192F]/60 border-[#A3B18A]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-playfair text-[#D4AF37]">Your Membership</CardTitle>
                <CardDescription className="text-[#FAF3E0]/70">
                  Current tier & mystical benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-[#D4AF37]/10 rounded-full mr-4">
                    {currentTier.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#FAF3E0] text-lg">{currentTier.name}</h3>
                    <p className="text-[#FAF3E0]/70 text-sm">Active subscription</p>
                  </div>
                </div>
                
                <Separator className="my-4 bg-[#A3B18A]/20" />
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#FAF3E0]/70 text-sm">AI Credits</span>
                      <span className="text-[#FAF3E0] text-sm">{aiCreditsUsed}/{currentTier.aiCredits}</span>
                    </div>
                    <Progress value={aiCreditsPercentage} className="h-2 bg-[#A3B18A]/20" 
                      // Using custom styling via CSS variables
                      style={{ "--progress-foreground": "#D4AF37" } as React.CSSProperties} 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#FAF3E0]/70 text-sm">Workflows</span>
                      <span className="text-[#FAF3E0] text-sm">1/{currentTier.maxWorkflows}</span>
                    </div>
                    <Progress value={1/currentTier.maxWorkflows * 100} className="h-2 bg-[#A3B18A]/20"
                      style={{ "--progress-foreground": "#D4AF37" } as React.CSSProperties} 
                    />
                  </div>
                </div>
                
                <Separator className="my-4 bg-[#A3B18A]/20" />
                
                <div>
                  <h4 className="font-medium text-[#FAF3E0] mb-2">Features</h4>
                  <ul className="space-y-2">
                    {currentTier.features.map((feature, index) => (
                      <li key={index} className="text-[#FAF3E0]/70 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/pricing" className="w-full">
                  <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                    Upgrade Membership
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* Moon phase card */}
            <Card className="bg-[#0A192F]/60 border-[#A3B18A]/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#D4AF37]/5 -translate-y-1/3 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#D4AF37]/5 translate-y-1/3 -translate-x-1/3"></div>
              
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="text-xl font-playfair text-[#D4AF37]">Current Moon Phase</CardTitle>
                <CardDescription className="text-[#FAF3E0]/70">
                  Align your content with lunar energy
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FAF3E0]/80 to-[#FAF3E0] flex items-center justify-center mr-4">
                    <div className="w-14 h-14 rounded-full bg-[#0A192F] shadow-inner"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#FAF3E0] text-lg">Waxing Crescent</h3>
                    <p className="text-[#FAF3E0]/70 text-sm">19% illuminated</p>
                  </div>
                </div>
                
                <p className="text-[#FAF3E0]/90 text-sm">
                  Ideal time for: Setting intentions, planning new projects, and brainstorming content ideas.
                </p>
              </CardContent>
              <CardFooter className="relative z-10">
                <Link to="/ai-tools" className="w-full">
                  <Button variant="outline" size="sm" className="w-full border-[#FAF3E0]/30 text-[#FAF3E0] hover:bg-[#FAF3E0]/10">
                    Generate Moon Phase Content
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;