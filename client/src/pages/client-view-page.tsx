import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

import { 
  Moon, Star, Calendar, Book, FileText, 
  ChevronRight, MessageCircle, Lock, CreditCard
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Types for content items
type ContentType = 'blog' | 'newsletter' | 'social' | 'resource' | 'ritual' | 'custom';
type MoonPhase = 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  description?: string;
  snippet: string;
  tags: string[];
  moonPhase?: MoonPhase;
  date: Date;
  isPremium: boolean;
  coverImage?: string;
  readTime: number;
}

// Sample content items
const samplePublicContent: ContentItem[] = [
  {
    id: '1',
    title: 'New Moon Rituals for Self-Reflection',
    type: 'blog',
    snippet: 'The new moon offers a powerful opportunity to set intentions and begin fresh cycles in your life...',
    description: 'Discover simple yet potent rituals to harness the new moon energy for personal growth and manifestation.',
    tags: ['moon-phases', 'rituals', 'self-care'],
    moonPhase: 'new',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    isPremium: false,
    coverImage: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?q=80&w=1470&auto=format&fit=crop',
    readTime: 8
  },
  {
    id: '2',
    title: 'Understanding Your Birth Chart: The Basics',
    type: 'resource',
    snippet: 'Your birth chart is a cosmic snapshot of the sky at the exact moment you were born. This celestial map reveals...',
    description: 'A beginner-friendly guide to interpreting the fundamental elements of your astrological birth chart.',
    tags: ['astrology', 'birth-chart', 'beginner'],
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    isPremium: false,
    coverImage: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?q=80&w=1480&auto=format&fit=crop',
    readTime: 12
  },
  {
    id: '3',
    title: 'Crystal Cleansing Methods for Different Stones',
    type: 'blog',
    snippet: 'Regular cleansing of your crystals is essential to maintain their energetic properties and healing potential...',
    description: 'Learn various methods to cleanse different types of crystals safely and effectively.',
    tags: ['crystals', 'tutorial', 'energy-work'],
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    isPremium: false,
    coverImage: 'https://images.unsplash.com/photo-1618589047511-4c5f59b5d4a3?q=80&w=1529&auto=format&fit=crop',
    readTime: 9
  },
  {
    id: '4',
    title: 'Full Moon Ritual Bath: Sacred Cleansing Ceremony',
    type: 'ritual',
    snippet: 'The full moon represents culmination, release, and amplified intuition. Create a sacred bathing ritual to...',
    description: 'A step-by-step guide to creating a powerful full moon bath ritual for energetic cleansing and intention setting.',
    tags: ['ritual', 'full-moon', 'self-care'],
    moonPhase: 'full',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    isPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1607238494562-d45bcaa23d79?q=80&w=1473&auto=format&fit=crop',
    readTime: 7
  },
  {
    id: '5',
    title: 'Seasonal Living: Aligning with Summer Solstice',
    type: 'newsletter',
    snippet: 'As the sun reaches its highest point in the sky, we celebrate the summer solstice—the longest day of the year...',
    description: 'Explore traditional practices, recipes, and rituals to honor the summer solstice in your daily life.',
    tags: ['seasonal-living', 'solstice', 'recipes'],
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    isPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632&auto=format&fit=crop',
    readTime: 10
  },
  {
    id: '6',
    title: 'Moon Phase Journal Prompts for Inner Growth',
    type: 'resource',
    snippet: 'Each moon phase carries unique energies that can guide our personal reflection and growth journey...',
    description: 'A collection of thoughtfully crafted journal prompts tailored to each phase of the lunar cycle.',
    tags: ['journaling', 'moon-phases', 'personal-growth'],
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    isPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1470&auto=format&fit=crop',
    readTime: 5
  }
];

// Content type to icon mapping
const contentTypeIcons: Record<ContentType, React.ReactNode> = {
  'blog': <FileText className="h-4 w-4" />,
  'newsletter': <Calendar className="h-4 w-4" />,
  'social': <MessageCircle className="h-4 w-4" />,
  'resource': <Book className="h-4 w-4" />,
  'ritual': <Star className="h-4 w-4" />,
  'custom': <FileText className="h-4 w-4" />
};

// Moon phase emoji mapping
const moonPhaseEmojis: Record<MoonPhase, string> = {
  'new': '🌑',
  'waxing-crescent': '🌒',
  'first-quarter': '🌓',
  'waxing-gibbous': '🌔',
  'full': '🌕',
  'waning-gibbous': '🌖',
  'last-quarter': '🌗',
  'waning-crescent': '🌘'
};

const ClientViewPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false); // Mock subscription status
  
  // Filter content based on active tab and subscription status
  const filteredContent = samplePublicContent.filter(item => {
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' || 
      item.type === activeTab ||
      (activeTab === 'moon-phases' && item.moonPhase !== undefined);
    
    // Filter premium content if not subscribed
    const accessibleContent = isSubscribed ? true : !item.isPremium;
    
    return matchesTab && accessibleContent;
  });
  
  // Group available content by type for the sidebar
  const contentStats = samplePublicContent.reduce((acc, item) => {
    if (!isSubscribed && item.isPremium) return acc;
    
    if (!acc[item.type]) {
      acc[item.type] = 0;
    }
    acc[item.type]++;
    
    // Count moon phase content separately
    if (item.moonPhase) {
      if (!acc['moon-phases']) {
        acc['moon-phases'] = 0;
      }
      acc['moon-phases']++;
    }
    
    return acc;
  }, {} as Record<string, number>);
  
  const handleSubscribeClick = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to subscribe to Midnight Magnolia content",
      });
      setLocation("/auth");
    } else {
      setLocation("/pricing");
    }
  };
  
  return (
    <div className="bg-[#FAF3E0] min-h-screen text-[#1A1523]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-playfair text-[#0A192F]">Content Library</CardTitle>
                  <CardDescription className="text-[#0A192F]/70">
                    Explore our mystical resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div 
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${activeTab === 'all' ? 'bg-[#0A192F]/5' : 'hover:bg-[#0A192F]/5'}`}
                    onClick={() => setActiveTab('all')}
                  >
                    <span className="text-[#0A192F]">All Content</span>
                    <Badge variant="outline" className="bg-[#0A192F]/5 text-[#0A192F]">
                      {samplePublicContent.filter(item => isSubscribed || !item.isPremium).length}
                    </Badge>
                  </div>
                  
                  {Object.entries(contentStats).map(([type, count]) => {
                    // Skip the "moon-phases" pseudo-type as we list it separately below
                    if (type === 'moon-phases') return null;
                    
                    return (
                      <div 
                        key={type} 
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${activeTab === type ? 'bg-[#0A192F]/5' : 'hover:bg-[#0A192F]/5'}`}
                        onClick={() => setActiveTab(type)}
                      >
                        <div className="flex items-center">
                          {contentTypeIcons[type as ContentType]}
                          <span className="ml-2 capitalize text-[#0A192F]">{type}</span>
                        </div>
                        <Badge variant="outline" className="bg-[#0A192F]/5 text-[#0A192F]">
                          {count}
                        </Badge>
                      </div>
                    );
                  })}
                  
                  {contentStats['moon-phases'] && (
                    <div 
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${activeTab === 'moon-phases' ? 'bg-[#0A192F]/5' : 'hover:bg-[#0A192F]/5'}`}
                      onClick={() => setActiveTab('moon-phases')}
                    >
                      <div className="flex items-center">
                        <Moon className="h-4 w-4" />
                        <span className="ml-2 text-[#0A192F]">Moon Phases</span>
                      </div>
                      <Badge variant="outline" className="bg-[#0A192F]/5 text-[#0A192F]">
                        {contentStats['moon-phases']}
                      </Badge>
                    </div>
                  )}
                </CardContent>
                
                {!isSubscribed && (
                  <CardFooter className="pt-0">
                    <Card className="w-full bg-[#0A192F]/5 border-[#0A192F]/10">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-[#0A192F] mb-2 flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          Premium Content
                        </h3>
                        <p className="text-[#0A192F]/70 text-sm mb-3">
                          Subscribe to access all premium mystical content and resources.
                        </p>
                        <Button 
                          className="w-full bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                          onClick={handleSubscribeClick}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Subscribe Now
                        </Button>
                      </CardContent>
                    </Card>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            <header className="mb-6">
              <h1 className="text-3xl font-playfair text-[#0A192F] mb-2">
                {activeTab === 'all' ? 'Mystical Library' : 
                 activeTab === 'moon-phases' ? 'Moon Phase Resources' : 
                 `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s`}
              </h1>
              <p className="text-[#0A192F]/70">
                {activeTab === 'all' ? 'Explore all our mystical content and resources' : 
                 activeTab === 'moon-phases' ? 'Content aligned with the cycles of the moon' :
                 activeTab === 'blog' ? 'Articles on various mystical and spiritual topics' :
                 activeTab === 'ritual' ? 'Step-by-step guides for meaningful rituals' :
                 activeTab === 'resource' ? 'Educational resources and reference materials' :
                 activeTab === 'newsletter' ? 'Our most popular newsletter editions' :
                 'Explore our collection of mystical resources'}
              </p>
            </header>
            
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredContent.map((item) => (
                  <ContentCard 
                    key={item.id} 
                    item={item} 
                    isSubscribed={isSubscribed}
                    onSubscribeClick={handleSubscribeClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/50 rounded-lg border border-[#0A192F]/10">
                <Lock className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
                <h3 className="text-lg font-medium text-[#0A192F]">Premium Content</h3>
                <p className="text-[#0A192F]/60 mb-6">
                  This content is available exclusively to our subscribers
                </p>
                <Button 
                  onClick={handleSubscribeClick}
                  className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscribe Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Content card component
interface ContentCardProps {
  item: ContentItem;
  isSubscribed: boolean;
  onSubscribeClick: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, isSubscribed, onSubscribeClick }) => {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="bg-white border-[#0A192F]/10 h-full overflow-hidden hover:border-[#D4AF37] transition-colors">
        <div className="relative">
          {item.coverImage && (
            <div className="h-48 w-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${item.coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
            </div>
          )}
          
          {/* Type badge */}
          <Badge
            className="absolute top-4 left-4 bg-white/90 text-[#0A192F] border-[#0A192F]/10"
          >
            <div className="flex items-center">
              {contentTypeIcons[item.type]}
              <span className="ml-1 capitalize">{item.type}</span>
            </div>
          </Badge>
          
          {/* Premium badge */}
          {item.isPremium && (
            <Badge
              className="absolute top-4 right-4 bg-[#D4AF37]/90 text-white border-[#D4AF37]/50"
            >
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
          
          {/* Moon phase badge */}
          {item.moonPhase && (
            <Badge
              className="absolute bottom-4 right-4 bg-[#0A192F]/90 text-white border-[#0A192F]/50"
            >
              <span className="mr-1">{moonPhaseEmojis[item.moonPhase]}</span>
              {item.moonPhase.replace('-', ' ')}
            </Badge>
          )}
        </div>
        
        <CardContent className="pt-4 pb-2">
          <h3 className="font-medium text-[#0A192F] text-lg mb-2">
            {item.title}
          </h3>
          
          <p className="text-[#0A192F]/80 text-sm mb-4">
            {item.snippet}
          </p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-[#0A192F]/60 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(item.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            
            <div className="text-[#0A192F]/60 text-sm">
              {item.readTime} min read
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2">
          {item.isPremium && !isSubscribed ? (
            <Button 
              className="w-full bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
              onClick={onSubscribeClick}
            >
              <Lock className="h-4 w-4 mr-2" />
              Subscribe to Read
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
            >
              Read Article
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClientViewPage;