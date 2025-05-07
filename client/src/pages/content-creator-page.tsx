import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

import { 
  Moon, Star, Sparkles, Book, ScrollText, FileText, 
  Calendar, Clock, File, PenTool, Image, Instagram, 
  MessageCircle, Mail, Layers, Layout, Bookmark, 
  Save, Share2, Plus, X, PlusCircle, Grid3X3, ListFilter
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Types for content items
type ContentType = 'blog' | 'newsletter' | 'social' | 'product' | 'worksheet' | 'custom';
type ContentStatus = 'draft' | 'in-progress' | 'ready' | 'published';
type MoonPhase = 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  description?: string;
  tags: string[];
  moonPhase?: MoonPhase;
  createdAt: Date;
  updatedAt: Date;
  notionPageId?: string;
  coverImage?: string;
}

// Sample content items
const sampleContentItems: ContentItem[] = [
  {
    id: '1',
    title: 'New Moon Rituals for Self-Reflection',
    type: 'blog',
    status: 'ready',
    description: 'A guide to harnessing the energy of the new moon for personal growth and intention setting.',
    tags: ['moon-phases', 'rituals', 'self-care'],
    moonPhase: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    coverImage: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'August Full Moon Newsletter',
    type: 'newsletter',
    status: 'draft',
    description: 'Monthly newsletter featuring full moon insights, rituals, and community highlights.',
    tags: ['newsletter', 'full-moon', 'community'],
    moonPhase: 'full',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
  },
  {
    id: '3',
    title: 'Crystal Cleansing Instagram Carousel',
    type: 'social',
    status: 'published',
    description: 'A 10-slide carousel post explaining different methods for cleansing crystals.',
    tags: ['instagram', 'crystals', 'tutorial'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
    coverImage: 'https://images.unsplash.com/photo-1618589047511-4c5f59b5d4a3?q=80&w=1529&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Moon Phase Journal Prompts Worksheet',
    type: 'worksheet',
    status: 'in-progress',
    description: 'Printable journal prompts for each moon phase to guide personal reflection.',
    tags: ['worksheet', 'journal', 'moon-phases'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: '5',
    title: 'Astrological Birth Chart Reading - Service Description',
    type: 'product',
    status: 'ready',
    description: 'Service page copy for personalized birth chart readings.',
    tags: ['services', 'astrology', 'birth-chart'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  }
];

// Content templates
interface ContentTemplate {
  id: string;
  name: string;
  type: ContentType;
  description: string;
  icon: React.ReactNode;
  sections: string[];
}

const contentTemplates: ContentTemplate[] = [
  {
    id: 'blog-moon-phase',
    name: 'Moon Phase Blog Post',
    type: 'blog',
    description: 'A comprehensive blog post about a specific moon phase',
    icon: <Moon className="h-5 w-5" />,
    sections: ['Introduction', 'About This Moon Phase', 'Rituals & Practices', 'Journal Prompts', 'Conclusion']
  },
  {
    id: 'newsletter-monthly',
    name: 'Monthly Newsletter',
    type: 'newsletter',
    description: 'A structured newsletter for monthly updates and offerings',
    icon: <Mail className="h-5 w-5" />,
    sections: ['Monthly Theme', 'Celestial Events', 'Featured Products', 'Community Spotlight', 'Upcoming Workshops']
  },
  {
    id: 'instagram-carousel',
    name: 'Instagram Carousel',
    type: 'social',
    description: 'A multi-slide Instagram carousel post structure',
    icon: <Instagram className="h-5 w-5" />,
    sections: ['Cover Slide', 'Introduction', 'Key Points (Multiple Slides)', 'Tips or How-To', 'Call to Action']
  },
  {
    id: 'worksheet-reflection',
    name: 'Reflection Worksheet',
    type: 'worksheet',
    description: 'A printable worksheet with prompts and exercises',
    icon: <FileText className="h-5 w-5" />,
    sections: ['Introduction & Instructions', 'Reflection Prompts', 'Journaling Space', 'Action Steps', 'Resources']
  }
];

// Utility function to format relative time
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

// Content type to icon mapping
const contentTypeIcons: Record<ContentType, React.ReactNode> = {
  'blog': <FileText className="h-4 w-4" />,
  'newsletter': <Mail className="h-4 w-4" />,
  'social': <Instagram className="h-4 w-4" />,
  'product': <Bookmark className="h-4 w-4" />,
  'worksheet': <File className="h-4 w-4" />,
  'custom': <PenTool className="h-4 w-4" />
};

// Content status to badge style mapping
const statusBadgeStyles: Record<ContentStatus, string> = {
  'draft': 'bg-zinc-200 text-zinc-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'ready': 'bg-green-100 text-green-800',
  'published': 'bg-purple-100 text-purple-800'
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

const ContentCreatorPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedContentItem, setSelectedContentItem] = useState<ContentItem | null>(null);
  const [newContentDialogOpen, setNewContentDialogOpen] = useState<boolean>(false);
  
  // Filter content items by search query and active tab
  const filteredContentItems = sampleContentItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'favorites' && item.tags.includes('favorite')) ||
      item.type === activeTab ||
      item.status === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  // Handle creating new content
  const handleCreateNewContent = (template: ContentTemplate) => {
    // In a real app, we would create a new content item in the database
    toast({
      title: "Template selected",
      description: `Creating new ${template.name} content...`,
    });
    setNewContentDialogOpen(false);
    
    // Navigate to content editor (in a real app)
    // setLocation('/content-editor/new?template=${template.id}');
  };
  
  return (
    <div className="bg-[#FAF3E0] min-h-screen text-[#1A1523]">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-playfair text-[#0A192F] mb-2">Digital Grimoire</h1>
              <p className="text-[#0A192F]/70">Your mystical content creation workspace</p>
            </div>
            
            <Dialog open={newContentDialogOpen} onOpenChange={setNewContentDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Content
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#FAF3E0] border-[#0A192F]/20 text-[#0A192F]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-playfair text-[#0A192F]">Create New Content</DialogTitle>
                  <DialogDescription className="text-[#0A192F]/70">
                    Select a template or create custom content from scratch.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {contentTemplates.map((template) => (
                    <Card 
                      key={template.id} 
                      className="bg-white border-[#0A192F]/10 hover:border-[#D4AF37] cursor-pointer transition-all"
                      onClick={() => handleCreateNewContent(template)}
                    >
                      <CardContent className="p-4 flex items-start">
                        <div className="mr-4 mt-1 bg-[#0A192F]/5 p-2 rounded-full">
                          {template.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-[#0A192F]">{template.name}</h3>
                          <p className="text-[#0A192F]/60 text-sm">{template.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Custom content option */}
                  <Card 
                    className="bg-white border-[#0A192F]/10 hover:border-[#D4AF37] cursor-pointer transition-all"
                    onClick={() => {
                      toast({
                        title: "Custom content",
                        description: "Creating new custom content...",
                      });
                      setNewContentDialogOpen(false);
                    }}
                  >
                    <CardContent className="p-4 flex items-start">
                      <div className="mr-4 mt-1 bg-[#0A192F]/5 p-2 rounded-full">
                        <PenTool className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#0A192F]">Custom Content</h3>
                        <p className="text-[#0A192F]/60 text-sm">Start from scratch with a blank canvas</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
            <div className="relative w-full md:w-auto md:flex-1 max-w-md">
              <Input
                placeholder="Search content..."
                className="pl-9 bg-white border-[#0A192F]/20 text-[#0A192F]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="h-4 w-4 text-[#0A192F]/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center ml-0 md:ml-4 space-x-2">
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full md:w-auto"
              >
                <TabsList className="bg-white/80 border border-[#0A192F]/10">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="blog" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
                    Blog
                  </TabsTrigger>
                  <TabsTrigger value="social" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
                    Social
                  </TabsTrigger>
                  <TabsTrigger value="draft" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
                    Drafts
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex bg-white/80 border border-[#0A192F]/10 rounded-md p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-2 py-1 ${viewMode === 'grid' ? 'bg-[#0A192F] text-[#FAF3E0]' : 'bg-transparent text-[#0A192F]'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-2 py-1 ${viewMode === 'list' ? 'bg-[#0A192F] text-[#FAF3E0]' : 'bg-transparent text-[#0A192F]'}`}
                  onClick={() => setViewMode('list')}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        <main>
          {filteredContentItems.length > 0 ? (
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
              {filteredContentItems.map((item) => (
                <ContentCard 
                  key={item.id} 
                  item={item} 
                  viewMode={viewMode}
                  onSelect={(item) => setSelectedContentItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 rounded-lg border border-[#0A192F]/10">
              <Book className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
              <h3 className="text-lg font-medium text-[#0A192F]">No content found</h3>
              <p className="text-[#0A192F]/60 mb-6">
                {searchQuery 
                  ? `No results matching "${searchQuery}"` 
                  : "You don't have any content in this category yet"}
              </p>
              <Button 
                onClick={() => setNewContentDialogOpen(true)}
                className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Content
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Content card component
interface ContentCardProps {
  item: ContentItem;
  viewMode: 'grid' | 'list';
  onSelect: (item: ContentItem) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, viewMode, onSelect }) => {
  if (viewMode === 'grid') {
    return (
      <motion.div 
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group"
      >
        <Card className="bg-white border-[#0A192F]/10 h-full overflow-hidden hover:border-[#D4AF37] transition-colors">
          {item.coverImage && (
            <div className="h-32 w-full overflow-hidden relative">
              <div 
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${item.coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            </div>
          )}
          
          <CardContent className={`p-4 ${!item.coverImage ? 'pt-5' : 'pt-2'} flex flex-col h-full`}>
            <div className="flex items-start justify-between mb-2">
              <Badge variant="outline" className={`${statusBadgeStyles[item.status]}`}>
                {item.status.replace('-', ' ')}
              </Badge>
              
              <div className="flex space-x-1">
                {item.moonPhase && (
                  <span title={`Moon phase: ${item.moonPhase.replace('-', ' ')}`}>
                    {moonPhaseEmojis[item.moonPhase]}
                  </span>
                )}
                <Badge variant="outline" className="bg-[#0A192F]/5 text-[#0A192F]">
                  {contentTypeIcons[item.type]}
                  <span className="ml-1">{item.type}</span>
                </Badge>
              </div>
            </div>
            
            <h3 className="font-medium text-[#0A192F] text-lg mb-2 group-hover:text-[#0A192F]/80 transition-colors">
              {item.title}
            </h3>
            
            {item.description && (
              <p className="text-[#0A192F]/70 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>
            )}
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-[#0A192F]/5 text-[#0A192F]/80 hover:bg-[#0A192F]/10">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="secondary" className="bg-[#0A192F]/5 text-[#0A192F]/80">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-[#0A192F]/60 text-xs flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatRelativeTime(item.updatedAt)}
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <svg 
                        width="15" 
                        height="15" 
                        viewBox="0 0 15 15" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#0A192F]"
                      >
                        <path 
                          d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" 
                          fill="currentColor" 
                          fillRule="evenodd" 
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#FAF3E0] border-[#0A192F]/10 text-[#0A192F]">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => onSelect(item)}>
                      <PenTool className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Save className="h-4 w-4 mr-2" />
                      Save as Template
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#0A192F]/10" />
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                      <X className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
  
  // List view
  return (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
      <Card className="bg-white border-[#0A192F]/10 hover:border-[#D4AF37] transition-colors">
        <CardContent className="p-4 flex">
          <div className="mr-4 flex flex-col items-center">
            <div className="bg-[#0A192F]/5 p-2 rounded-full mb-2">
              {contentTypeIcons[item.type]}
            </div>
            {item.moonPhase && (
              <span title={`Moon phase: ${item.moonPhase.replace('-', ' ')}`} className="text-lg">
                {moonPhaseEmojis[item.moonPhase]}
              </span>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-medium text-[#0A192F] text-lg">
                {item.title}
              </h3>
              
              <Badge variant="outline" className={`${statusBadgeStyles[item.status]} ml-2`}>
                {item.status.replace('-', ' ')}
              </Badge>
            </div>
            
            {item.description && (
              <p className="text-[#0A192F]/70 text-sm mb-2">
                {item.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-[#0A192F]/5 text-[#0A192F]/80 hover:bg-[#0A192F]/10">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="text-[#0A192F]/60 text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatRelativeTime(item.updatedAt)}
              </div>
            </div>
          </div>
          
          <div className="ml-4 flex flex-col space-y-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
              onClick={() => onSelect(item)}
            >
              <PenTool className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                >
                  <svg 
                    width="15" 
                    height="15" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path 
                      d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" 
                      fill="currentColor" 
                      fillRule="evenodd" 
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#FAF3E0] border-[#0A192F]/10 text-[#0A192F]">
                <DropdownMenuItem className="cursor-pointer">
                  <Save className="h-4 w-4 mr-2" />
                  Save as Template
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#0A192F]/10" />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <X className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContentCreatorPage;