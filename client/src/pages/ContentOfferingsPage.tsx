import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  FileText, 
  Star, 
  Moon, 
  Music, 
  Calendar, 
  Download, 
  Heart,
  Sparkles,
  MapPin,
  Feather,
  Scroll,
  BookMarked,
  Search
} from 'lucide-react';

const ContentOfferingsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Content categories
  const categories = [
    { id: 'affirmations', name: 'Affirmation Cards', icon: Star },
    { id: 'tarot', name: 'Tarot Readings', icon: Moon },
    { id: 'journals', name: 'Journal Prompts', icon: FileText },
    { id: 'rituals', name: 'Ritual Guides', icon: Sparkles },
    { id: 'audio', name: 'Audio Content', icon: Music },
    { id: 'seasonal', name: 'Seasonal Collections', icon: Calendar }
  ];
  
  // Sample content for each category
  const contentItems = {
    affirmations: [
      {
        id: 'aff1',
        title: 'Ancestral Connection',
        preview: '/assets/affirmation-preview.jpg',
        description: 'A set of 5 digital affirmation cards focusing on connecting with ancestral wisdom and power.',
        tier: 'Magnolia Seed',
        sample: 'I honor the strength and resilience that flows through my ancestral lineage. Their wisdom guides my path forward.',
        tags: ['ancestry', 'connection', 'strength']
      },
      {
        id: 'aff2',
        title: 'Shadow Embrace',
        preview: '/assets/affirmation-shadow.jpg',
        description: 'Affirmations that help you embrace and integrate your shadow aspects with compassion.',
        tier: 'Crescent Bloom',
        sample: 'I embrace my shadows with gentle curiosity. Within their depths, I discover treasures of wisdom and healing.',
        tags: ['shadow work', 'integration', 'healing']
      },
      {
        id: 'aff3',
        title: 'Southern Roots',
        preview: '/assets/affirmation-southern.jpg',
        description: 'Affirmations that connect you to the mystical essence of Southern landscapes and traditions.',
        tier: 'Golden Grove',
        sample: 'The Spanish moss of my soul hangs gracefully, collecting the wisdom of generations. I am rooted in this sacred earth.',
        tags: ['southern', 'roots', 'tradition']
      }
    ],
    tarot: [
      {
        id: 'tarot1',
        title: 'Monthly Moon Reading',
        preview: '/assets/tarot-moon.jpg',
        description: 'A three-card spread offering guidance for the lunar cycle ahead.',
        tier: 'Crescent Bloom',
        sample: 'Your first card, The Empress, suggests this lunar cycle brings abundant creative energy. The second card...',
        tags: ['lunar cycle', 'monthly guidance', 'three-card spread']
      },
      {
        id: 'tarot2',
        title: 'Shadow & Light Pathway',
        preview: '/assets/tarot-shadow.jpg',
        description: 'A specialized spread examining the interplay between your shadow aspects and light.',
        tier: 'Moonlit Sanctuary',
        sample: 'In the Shadow position, the Seven of Swords reveals your tendency to self-sabotage through intellectualization...',
        tags: ['shadow work', 'integration', 'balance']
      },
      {
        id: 'tarot3',
        title: 'Ancestor Wisdom Channel',
        preview: '/assets/tarot-ancestor.jpg',
        description: 'A unique spread designed to connect with ancestral guides and their messages.',
        tier: 'House of Midnight',
        sample: 'Your ancestral guide appears as the Queen of Cups, suggesting you come from a lineage of intuitive healers...',
        tags: ['ancestry', 'guidance', 'channeling']
      }
    ],
    journals: [
      {
        id: 'journal1',
        title: 'Shadow Integration Journal',
        preview: '/assets/journal-shadow.jpg',
        description: 'A 7-day journal prompt series focused on identifying and integrating shadow aspects.',
        tier: 'Golden Grove',
        sample: 'Day 1: Recall a recent situation where you felt triggered. Describe the emotion that arose and the thoughts that accompanied it...',
        tags: ['shadow work', '7-day series', 'integration']
      },
      {
        id: 'journal2',
        title: 'Southern Gothic Reflections',
        preview: '/assets/journal-gothic.jpg',
        description: 'Atmospheric prompts inspired by Southern Gothic themes and landscapes.',
        tier: 'Golden Grove',
        sample: 'The old magnolia tree stands witness to generations of secrets. What whispers would you hear if you pressed your ear to its bark?',
        tags: ['southern gothic', 'atmospheric', 'creative writing']
      },
      {
        id: 'journal3',
        title: 'Full Moon Release Pages',
        preview: '/assets/journal-fullmoon.jpg',
        description: 'Printable journal pages designed for full moon release rituals and reflection.',
        tier: 'Moonlit Sanctuary',
        sample: 'List what you are ready to release with this full moon. Then, explore how each item has served you before you let it go...',
        tags: ['full moon', 'release ritual', 'printable']
      }
    ],
    rituals: [
      {
        id: 'ritual1',
        title: 'New Moon Intention Setting',
        preview: '/assets/ritual-newmoon.jpg',
        description: 'A simple yet powerful ritual for setting intentions at the new moon.',
        tier: 'Golden Grove',
        sample: 'Gather: A black candle, a small piece of paper, a pen, and a small bowl of water. Begin by creating sacred space...',
        tags: ['new moon', 'intentions', 'beginnings']
      },
      {
        id: 'ritual2',
        title: 'Ancestral Altar Creation',
        preview: '/assets/ritual-altar.jpg',
        description: 'Guide to creating and working with an ancestral connection altar.',
        tier: 'Moonlit Sanctuary',
        sample: 'Your ancestral altar is a bridge between worlds. Start by selecting a location that will remain undisturbed...',
        tags: ['ancestor work', 'altar', 'connection']
      },
      {
        id: 'ritual3',
        title: 'Southern Crossroads Working',
        preview: '/assets/ritual-crossroads.jpg',
        description: 'A traditional Southern crossroads ritual adapted for modern practitioners.',
        tier: 'House of Midnight',
        sample: 'The crossroads has long been a place of power in Southern folk tradition. This working draws upon those currents...',
        tags: ['southern tradition', 'crossroads', 'folk magic']
      }
    ],
    audio: [
      {
        id: 'audio1',
        title: 'Magnolia Meditation',
        preview: '/assets/audio-magnolia.jpg',
        description: 'A 15-minute guided meditation connecting to the magnolia as a symbol of grace and strength.',
        tier: 'Golden Grove',
        sample: 'Audio preview not available in text form.',
        tags: ['meditation', '15-minute', 'tree connection']
      },
      {
        id: 'audio2',
        title: 'Southern Gothic Ambient Mix',
        preview: '/assets/audio-gothic.jpg',
        description: 'Atmospheric background audio for ritual work, featuring cicadas, distant thunder, and soft piano.',
        tier: 'Golden Grove',
        sample: 'Audio preview not available in text form.',
        tags: ['ambient', 'atmospheric', 'background']
      },
      {
        id: 'audio3',
        title: 'Shadow Integration Journey',
        preview: '/assets/audio-shadow.jpg',
        description: 'A 30-minute guided journey into the shadow realm with gentle integration guidance.',
        tier: 'Moonlit Sanctuary',
        sample: 'Audio preview not available in text form.',
        tags: ['shadow work', 'guided journey', '30-minute']
      }
    ],
    seasonal: [
      {
        id: 'seasonal1',
        title: 'Summer Solstice Collection',
        preview: '/assets/seasonal-summer.jpg',
        description: 'A comprehensive collection of affirmations, journal prompts, and a ritual for the summer solstice.',
        tier: 'Moonlit Sanctuary',
        sample: 'This collection includes 5 solstice-themed affirmation cards, 3 journal prompts, and a full fire-centered ritual...',
        tags: ['summer solstice', 'collection', 'fire element']
      },
      {
        id: 'seasonal2',
        title: 'Autumn Equinox Bundle',
        preview: '/assets/seasonal-autumn.jpg',
        description: 'An atmospheric bundle of content celebrating the balance of light and dark at the autumn equinox.',
        tier: 'Moonlit Sanctuary',
        sample: 'The Autumn Equinox Bundle includes balance-focused journal prompts, a guided meditation, and a harvest ritual...',
        tags: ['autumn equinox', 'balance', 'harvest']
      },
      {
        id: 'seasonal3',
        title: 'Southern Gothic Halloween',
        preview: '/assets/seasonal-halloween.jpg',
        description: 'A special collection exploring the veil-thinning season through a Southern Gothic lens.',
        tier: 'House of Midnight',
        sample: 'This premium collection includes exclusive cemetery photography, ancestral connection rituals, and haunting audio...',
        tags: ['halloween', 'southern gothic', 'ancestors']
      }
    ]
  };
  
  // Filter content items based on search query (across all categories)
  const filterContentItems = (items: any) => {
    if (!searchQuery) return items;
    
    const query = searchQuery.toLowerCase();
    const result = {};
    
    Object.keys(items).forEach(category => {
      result[category] = items[category].filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) || 
        item.sample.toLowerCase().includes(query) || 
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });
    
    return result;
  };
  
  const filteredContent = filterContentItems(contentItems);
  
  // Helper function to determine tier badge color
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Magnolia Seed':
        return 'bg-[#A3B18A]/70 hover:bg-[#A3B18A]';
      case 'Crescent Bloom':
        return 'bg-[#0A3B4D]/70 hover:bg-[#0A3B4D]';
      case 'Golden Grove':
        return 'bg-[#D4AF37]/70 hover:bg-[#D4AF37] text-[#0A192F]';
      case 'Moonlit Sanctuary':
        return 'bg-[#FAF3E0]/70 hover:bg-[#FAF3E0] text-[#0A192F]';
      case 'House of Midnight':
        return 'bg-gradient-to-r from-[#D4AF37]/80 to-[#0A3B4D]/80 hover:from-[#D4AF37] hover:to-[#0A3B4D]';
      default:
        return 'bg-[#0A3B4D]/70 hover:bg-[#0A3B4D]';
    }
  };

  return (
    <div className="bg-[#122240] min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair text-[#D4AF37] mb-6 animate-float">
            Content Offerings
          </h1>
          <p className="text-xl font-lora text-[#FAF3E0] mb-8 leading-relaxed">
            Explore our curated collection of content designed to nurture your spiritual journey and 
            creative expression through our Southern Gothic aesthetic.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-lg mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#A3B18A]" />
            <Input 
              placeholder="Search content offerings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#0D1F35] border-[#A3B18A]/30 text-[#FAF3E0] py-6 hover:border-[#A3B18A]/60 transition-all"
            />
          </div>
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="affirmations" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 bg-[#0D1F35] mb-8 p-1 rounded-md">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-[#155268] data-[state=active]:text-[#FAF3E0] data-[state=active]:shadow-md py-3 transition-all duration-300 hover-scale"
              >
                <category.icon className="h-4 w-4 mr-2 animate-pulse-slow" />
                <span className="hidden md:inline">{category.name}</span>
                <span className="md:hidden">{category.id === 'affirmations' ? 'Affirm.' : 
                                           category.id === 'seasonal' ? 'Season.' : 
                                           category.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Content display for each tab */}
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent[category.id]?.length ? (
                  filteredContent[category.id].map(item => (
                    <Card key={item.id} className="bg-[#0D1F35] border border-[#A3B18A]/30 overflow-hidden hover:border-[#A3B18A]/60 transition-all duration-300 hover-scale">
                      <div className="h-48 w-full bg-[#155268]/70 flex items-center justify-center relative">
                        <category.icon className="h-16 w-16 text-[#D4AF37]/30 animate-pulse-slow" />
                        <Badge className={`absolute top-3 right-3 ${getTierColor(item.tier)}`}>
                          {item.tier}
                        </Badge>
                      </div>
                      
                      <CardHeader className="pb-3">
                        <CardTitle className="text-[#D4AF37] font-playfair animate-float">{item.title}</CardTitle>
                        <CardDescription className="text-[#FAF3E0]/70 font-lora">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="bg-[#102038] p-3 rounded border border-[#A3B18A]/20 mb-4 animate-shimmer">
                          <h4 className="text-[#D4AF37] text-sm font-medium mb-2">Content Sample:</h4>
                          <p className="text-[#FAF3E0] text-sm italic font-lora">"{item.sample}"</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-[#A3B18A] border-[#A3B18A]/30 hover:border-[#A3B18A]/60">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-0">
                        <Button className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90">
                          <BookMarked className="h-4 w-4 mr-2" />
                          View Full Content
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center p-12 border border-dashed border-[#A3B18A]/30 rounded-md">
                    <category.icon className="h-16 w-16 text-[#A3B18A]/30 mx-auto mb-4" />
                    <h3 className="text-[#D4AF37] font-medium text-xl mb-2">No Results Found</h3>
                    <p className="text-[#FAF3E0]/70 max-w-md mx-auto">
                      {searchQuery 
                        ? `No ${category.name.toLowerCase()} match your search criteria. Try different keywords or clear your search.`
                        : `There are currently no ${category.name.toLowerCase()} available.`}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Membership CTA */}
        <div className="mt-16 mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair text-[#D4AF37] mb-4">
            Unlock Our Full Collection
          </h2>
          <p className="text-[#FAF3E0] max-w-2xl mx-auto mb-6 font-lora">
            Join our membership program to unlock access to our complete library of content.
            Choose the tier that resonates with your journey.
          </p>
          <Button 
            className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90 px-8 py-6 text-lg"
            onClick={() => window.location.href = '/membership'}
          >
            <Heart className="h-4 w-4 mr-2" />
            Explore Membership Options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentOfferingsPage;