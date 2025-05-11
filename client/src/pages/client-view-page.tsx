import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Download, 
  Filter, 
  Search, 
  Tag,
  Lock, 
  Copy,
  Star,
  MessageCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const ClientViewPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Mock content items
  const contentItems = [
    {
      id: 1,
      title: 'Daily Affirmation Set - Self-Love',
      description: 'A set of 5 powerful affirmations focused on self-love and acceptance.',
      type: 'affirmation',
      isPremium: false,
      createdAt: '2 days ago',
      tags: ['self-love', 'affirmation', 'daily-practice'],
      content: `1. I honor my true self and embrace all aspects of who I am.
2. I am worthy of love exactly as I am, without needing to prove my value.
3. My self-care is a sacred practice and not an indulgence.
4. I release the need for external validation; I approve of myself.
5. My body deserves respect and kindness from myself and others.`
    },
    {
      id: 2,
      title: 'The Moon Tarot Card - Complete Interpretation',
      description: 'In-depth exploration of The Moon card symbolism, meanings, and readings in different positions.',
      type: 'tarot',
      isPremium: true,
      createdAt: '1 week ago',
      tags: ['tarot', 'the-moon', 'major-arcana'],
      content: 'This premium content is only available to subscribers.'
    },
    {
      id: 3,
      title: 'New Moon Ritual Journal Prompts',
      description: 'Journal prompts designed specifically for new moon intention setting and reflection.',
      type: 'journal',
      isPremium: false,
      createdAt: '3 days ago',
      tags: ['journal', 'moon-phase', 'new-moon', 'ritual'],
      content: `1. What seeds of intention am I planting with this new moon?
2. What must I release to create space for these new beginnings?
3. How can I align my daily practices with my deeper intentions?
4. What fears are blocking me from embarking on this new phase?
5. How will I nurture these intentions as they grow?`
    },
    {
      id: 4,
      title: 'Shadow Work Worksheet - Facing Your Fear',
      description: 'A guided worksheet for exploring and integrating shadow aspects related to fear.',
      type: 'worksheet',
      isPremium: true,
      createdAt: '2 weeks ago',
      tags: ['shadow-work', 'worksheet', 'fear', 'integration'],
      content: 'This premium content is only available to subscribers.'
    }
  ];
  
  // Filter and search content
  const filteredContent = contentItems.filter(item => {
    // Apply type filter if not 'all'
    if (filter !== 'all' && item.type !== filter) {
      return false;
    }
    
    // Apply search query
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    return true;
  });
  
  // Render content with watermark if needed
  const renderContent = (item: typeof contentItems[0]) => {
    if (item.isPremium) {
      return (
        <div className="relative">
          <div className="blur-sm text-[#0A192F]/40">
            {item.content.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A192F]/10 rounded-md backdrop-blur-sm">
            <Lock className="h-8 w-8 text-[#D4AF37] mb-2" />
            <p className="text-center font-medium text-[#0A192F]">Premium Content</p>
            <p className="text-center text-sm text-[#0A192F]/70 max-w-xs mb-3">
              This content is exclusive to premium subscribers.
            </p>
            <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white">
              Upgrade to Premium
            </Button>
          </div>
        </div>
      );
    }
    
    // Free content with watermark
    return (
      <div className="relative">
        <div className="prose max-w-none">
          {item.content.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line}</p>
          ))}
        </div>
        <div className="absolute top-0 right-0 opacity-10 rotate-[-30deg]">
          <Badge variant="outline" className="text-[#0A192F] border-[#0A192F]/30 text-xs px-2 py-1">
            Midnight Magnolia
          </Badge>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-[#FAF3E0]/30 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-playfair text-[#0A192F] mb-2">Content Library</h1>
          <p className="text-[#0A192F]/70">Explore our collection of mystical content and resources</p>
        </header>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A192F]/40" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search content by title, description or tags"
              className="pl-10 border-[#0A192F]/20 text-[#0A192F]"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              className={filter === 'all' ? 'bg-[#0A192F] text-white' : 'border-[#0A192F]/20 text-[#0A192F]'}
              onClick={() => setFilter('all')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              All
            </Button>
            <Button
              variant={filter === 'affirmation' ? 'default' : 'outline'}
              className={filter === 'affirmation' ? 'bg-[#0A192F] text-white' : 'border-[#0A192F]/20 text-[#0A192F]'}
              onClick={() => setFilter('affirmation')}
            >
              <Star className="mr-2 h-4 w-4" />
              Affirmations
            </Button>
            <Button
              variant={filter === 'journal' ? 'default' : 'outline'}
              className={filter === 'journal' ? 'bg-[#0A192F] text-white' : 'border-[#0A192F]/20 text-[#0A192F]'}
              onClick={() => setFilter('journal')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Journal
            </Button>
            <Button
              variant={filter === 'tarot' ? 'default' : 'outline'}
              className={filter === 'tarot' ? 'bg-[#0A192F] text-white' : 'border-[#0A192F]/20 text-[#0A192F]'}
              onClick={() => setFilter('tarot')}
            >
              <Filter className="mr-2 h-4 w-4" />
              Tarot
            </Button>
          </div>
        </div>
        
        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContent.length > 0 ? (
            filteredContent.map(item => (
              <Card key={item.id} className="bg-white border-[#0A192F]/10">
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-xl font-playfair text-[#0A192F]">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-[#0A192F]/70">
                        {item.description}
                      </CardDescription>
                    </div>
                    {item.isPremium && (
                      <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-[#0A192F]/60 mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{item.createdAt}</span>
                    <div className="w-px h-3 bg-[#0A192F]/20 mx-2" />
                    <Tag className="h-3 w-3 mr-1" />
                    <span className="space-x-1">
                      {item.tags.slice(0, 2).map((tag, i) => (
                        <span key={i}>#{tag}</span>
                      ))}
                      {item.tags.length > 2 && <span>+{item.tags.length - 2}</span>}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {renderContent(item)}
                </CardContent>
                
                <CardFooter className="flex justify-between border-t border-[#0A192F]/10 pt-4">
                  <Button
                    variant="outline"
                    className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                    onClick={() => {
                      if (item.isPremium) {
                        toast({
                          title: "Premium Content",
                          description: "This content is only available to premium subscribers.",
                          variant: "destructive",
                        });
                      } else {
                        navigator.clipboard.writeText(item.content);
                        toast({
                          title: "Copied to Clipboard",
                          description: "Content has been copied to your clipboard.",
                        });
                      }
                    }}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Text
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                    onClick={() => {
                      if (item.isPremium) {
                        toast({
                          title: "Premium Content",
                          description: "This content is only available to premium subscribers.",
                          variant: "destructive",
                        });
                      } else {
                        toast({
                          title: "Download Started",
                          description: "Your content is being downloaded as a text file.",
                        });
                      }
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-2 bg-white border border-[#0A192F]/10 rounded-lg p-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
              <h3 className="text-lg font-medium text-[#0A192F] mb-2">No Content Found</h3>
              <p className="text-[#0A192F]/60 max-w-md mx-auto">
                We couldn't find any content matching your search criteria. Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientViewPage;