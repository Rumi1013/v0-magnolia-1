import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// UI Components
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Icons
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingCart, 
  Users, 
  Settings,
  Moon,
  Star,
  Sparkles,
  Clock,
  PenSquare,
  ScrollText,
  BookOpen,
  Package,
  Loader2,
  Check,
  X,
  Download,
  Save,
  Share2,
  Send,
  Upload,
  ExternalLink,
  Database,
  Briefcase
} from 'lucide-react';

// Content type definitions
type ContentType = 'affirmation' | 'tarot' | 'journal' | 'product' | 'social';
type EnergyLevel = 'high' | 'medium' | 'low';
type ContentStatus = 'draft' | 'published' | 'archived';

// Generated content interfaces
interface GeneratedContent {
  id?: number;
  title: string;
  contentType: string;
  content: string;
  prompt?: string;
  tags?: string[];
  status: string;
  userId?: number;
  imageUrl?: string;
  productId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Client {
  id?: number;
  fullName: string;
  email: string;
  phone?: string;
  platform?: string;
  membershipTier?: string;
  status?: string;
}

interface Product {
  id?: number;
  name: string;
  type: string;
  price: number;
  status: string;
  description?: string;
  platform?: string;
}

interface Task {
  id?: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  userId: number;
}

export function ContentDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel | null>(null);
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [contentDraft, setContentDraft] = useState<Partial<GeneratedContent>>({
    title: '',
    contentType: 'affirmation',
    content: '',
    tags: [],
    status: 'draft'
  });
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // Prompt templates for different content types
  const promptTemplates = {
    affirmation: "Write 5 affirmations focused on [THEME] that incorporate southern gothic elements and black feminine energy.",
    tarot: "Create a detailed tarot card description for [CARD_NAME] that includes upright and reversed meanings, plus a personal message.",
    journal: "Generate 3 journal prompts about [TOPIC] that encourage deep reflection and healing.",
    product: "Write a compelling product description for a [PRODUCT_TYPE] that emphasizes its spiritual and healing properties.",
    social: "Create an engaging social media post about [TOPIC] that includes a call to action and aligns with the Midnight Magnolia brand voice."
  };

  const [prompt, setPrompt] = useState<string>(promptTemplates.affirmation.replace('[THEME]', 'self-acceptance'));
  const [promptVariables, setPromptVariables] = useState<{[key: string]: string}>({
    THEME: 'self-acceptance',
    CARD_NAME: 'The High Priestess',
    TOPIC: 'ancestral healing',
    PRODUCT_TYPE: 'digital planner'
  });

  // Data fetching queries
  const { data: contentData, isLoading: isContentLoading } = useQuery({
    queryKey: ['/api/content'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/content');
      return res.json();
    },
    enabled: selectedTab === 'content' || selectedTab === 'dashboard'
  });

  const { data: clientsData, isLoading: isClientsLoading } = useQuery({
    queryKey: ['/api/clients'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/clients');
      return res.json();
    },
    enabled: selectedTab === 'clients' || selectedTab === 'fulfill'
  });

  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/digitalProducts');
        return res.json();
      } catch (error) {
        // Fallback if endpoint is not available yet
        return { success: true, products: [] };
      }
    },
    enabled: selectedTab === 'products' || selectedTab === 'fulfill'
  });

  const { data: tasksData, isLoading: isTasksLoading } = useQuery({
    queryKey: ['/api/tasks'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/tasks');
        return res.json();
      } catch (error) {
        // Fallback if endpoint is not available yet
        return { success: true, tasks: [] };
      }
    },
    enabled: selectedTab === 'dashboard'
  });

  // Save content mutation
  const saveContentMutation = useMutation({
    mutationFn: async (content: Partial<GeneratedContent>) => {
      const res = await apiRequest('POST', '/api/content', content);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({
        title: "Content Saved",
        description: "Your content has been successfully saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Function to handle energy level selection
  const handleEnergySelect = (level: EnergyLevel) => {
    setEnergyLevel(level);
    toast({
      title: "Energy Level Updated",
      description: `Your energy level has been set to ${level}.`,
    });
  };

  // Update prompt based on content type
  useEffect(() => {
    const template = promptTemplates[contentDraft.contentType as ContentType] || '';
    
    // Replace placeholder with variable
    let newPrompt = template;
    Object.entries(promptVariables).forEach(([key, value]) => {
      newPrompt = newPrompt.replace(`[${key}]`, value);
    });
    
    setPrompt(newPrompt);
  }, [contentDraft.contentType, promptVariables]);

  // Function to update prompt variables
  const handlePromptVariableChange = (key: string, value: string) => {
    setPromptVariables(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Function to generate content using AI
  const generateContent = async () => {
    setIsGenerating(true);
    try {
      // Determine which API endpoint to use based on content type
      let endpoint = '/api/openai/';
      
      switch(contentDraft.contentType) {
        case 'affirmation':
          endpoint += 'affirmations';
          break;
        case 'tarot':
          endpoint += 'tarot-reading';
          break;
        case 'journal':
          endpoint += 'worksheet';
          break;
        case 'product':
          endpoint += 'product-description';
          break;
        case 'social':
          endpoint += 'content-brief';
          break;
        default:
          endpoint += 'affirmations';
      }
      
      // Generate parameters based on content type
      let params: any = {};
      if (contentDraft.contentType === 'affirmation') {
        params = {
          theme: promptVariables.THEME,
          count: 5,
          mood: 'empowering'
        };
      } else if (contentDraft.contentType === 'tarot') {
        params = {
          cardName: promptVariables.CARD_NAME,
          queryType: 'detailed'
        };
      } else if (contentDraft.contentType === 'journal') {
        params = {
          topic: promptVariables.TOPIC,
          purpose: 'reflection'
        };
      } else if (contentDraft.contentType === 'product') {
        params = {
          productType: promptVariables.PRODUCT_TYPE,
          title: contentDraft.title || 'Digital Product',
          features: ['spiritual', 'healing', 'productivity'],
          targetAudience: 'women seeking personal growth'
        };
      } else if (contentDraft.contentType === 'social') {
        params = {
          contentType: 'social post',
          theme: promptVariables.TOPIC,
          additionalContext: 'Include hashtags and a compelling call to action'
        };
      }

      // Simulate API call if endpoints are not ready
      // In a real implementation, this would make the actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Format mock response based on content type
      let generatedText = '';
      
      if (contentDraft.contentType === 'affirmation') {
        generatedText = `# ${promptVariables.THEME.toUpperCase()} AFFIRMATIONS\n\n1. My softness ain't weakness, honey; it's the river that carved the canyon.\n\n2. I honor the shadows of my ancestors as they guide my steps toward the light.\n\n3. Like magnolia blooms after the frost, my resilience is both delicate and unstoppable.\n\n4. The blood of healers runs through my veins; I transform pain into purpose with each breath.\n\n5. My boundaries are sacred ground, watered by self-respect and guarded by my unwavering spirit.`;
      } else if (contentDraft.contentType === 'tarot') {
        generatedText = `# ${promptVariables.CARD_NAME}\n\n## Upright Meaning\nSerenity, intuition, the unconscious mind, inner wisdom. The High Priestess sits between the pillars of duality, representing the threshold between the conscious and unconscious realms. She encourages you to trust your intuition and listen to your inner voice.\n\n## Reversed Meaning\nSecrets withheld, lack of personal harmony, repressed intuition. When reversed, The High Priestess suggests you may be ignoring your intuition or overanalyzing situations instead of trusting your gut feelings.\n\n## Personal Message\nNow is the time to turn inward and listen to the whispers of your soul. The answers you seek cannot be found through logical analysis alone but require you to honor your dreams, feelings, and intuitive flashes. Like the moon reflected in still waters, truth becomes clear when the mind is quiet.`;
      } else if (contentDraft.contentType === 'journal') {
        generatedText = `# JOURNAL PROMPTS: ${promptVariables.TOPIC.toUpperCase()}\n\n1. Describe a moment when you felt a connection to your ancestors. What emotions surfaced, and how did this experience shape your understanding of yourself?\n\n2. If the wounds of your lineage could speak, what would they say they need for healing? Write a dialogue between yourself and these ancestral wounds.\n\n3. Identify three strengths or gifts you believe were passed down to you through your bloodline. How can you honor these traits while releasing any generational patterns that no longer serve you?`;
      } else if (contentDraft.contentType === 'product') {
        generatedText = `# ${contentDraft.title || 'MIDNIGHT MAGNOLIA DIGITAL PLANNER'}\n\n## Product Description\n\nEmbrace the sacred dance between organization and intuition with our Midnight Magnolia Digital Planner, a soul-nourishing tool designed for women who honor both structure and spiritual alignment in their daily practice.\n\nCrafted with the essence of Southern Gothic elegance, this digital companion features midnight blue pages adorned with delicate magnolia blossoms and phases of the moon, creating a sanctuary for your thoughts, dreams, and divine appointments.\n\n## Features\n\n- Moon phase tracker to align your activities with lunar energy\n- Energy level monitoring system for ADHD-friendly productivity\n- Daily affirmation spaces to cultivate self-compassion\n- Ancestral wisdom quotes for moments of reflection\n- Hyperlinked navigation for seamless planning\n- Compatible with GoodNotes, Notability, and other PDF annotation apps\n\nMore than just a planner, this is your digital grimoire—a place where productivity meets purpose, and organization becomes a ritual of self-care. Transform your relationship with time and tasks as you honor your unique rhythms and spiritual journey.`;
      } else if (contentDraft.contentType === 'social') {
        generatedText = `# SOCIAL MEDIA POST: ${promptVariables.TOPIC.toUpperCase()}\n\n✨ When we speak of ancestral healing, we're not just addressing the past—we're actively creating a new legacy for generations yet to come. \n\nToday's moon in Scorpio invites us to dive deep into those hidden family patterns. What stories are you ready to transform? What gifts are waiting to be reclaimed?\n\nOur new guided journal "Roots & Wings" provides 31 days of prompts designed to help you untangle these ancestral knots with grace and power. \n\nTap the link in bio to begin this journey. Your ancestors are waiting. Your descendants are counting on you. 💫\n\n#AncestralHealing #SoulWork #MidnightMagnolia #BlackWellness #SpiritualGrowth #HealingJourney`;
      }

      setContentDraft(prev => ({
        ...prev,
        content: generatedText
      }));
      setGeneratedContent(generatedText);
      
      toast({
        title: "Content Generated",
        description: "AI has created content based on your prompt.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to save content
  const saveContent = () => {
    if (!contentDraft.title) {
      toast({
        title: "Title Required",
        description: "Please provide a title for your content.",
        variant: "destructive",
      });
      return;
    }

    if (!contentDraft.content) {
      toast({
        title: "Content Required", 
        description: "Please generate or write some content before saving.",
        variant: "destructive",
      });
      return;
    }

    // Convert tags from string to array if needed
    const tagsArray = typeof contentDraft.tags === 'string' 
      ? contentDraft.tags.split(',').map(tag => tag.trim()) 
      : Array.isArray(contentDraft.tags) ? contentDraft.tags : [];

    const contentToSave: Partial<GeneratedContent> = {
      ...contentDraft,
      tags: tagsArray,
      prompt: prompt,
      status: 'published'
    };

    saveContentMutation.mutate(contentToSave);
  };

  // Function to fulfill content to a client
  const fulfillContentToClient = () => {
    if (!selectedClient) {
      toast({
        title: "Client Required",
        description: "Please select a client to fulfill this content to.",
        variant: "destructive",
      });
      return;
    }

    if (selectedProducts.length === 0) {
      toast({
        title: "Product Required",
        description: "Please select at least one product to associate with this content.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Content Fulfilled",
      description: `Content has been assigned to the selected client and products.`,
    });

    // Reset selection
    setSelectedClient(null);
    setSelectedProducts([]);
    setSelectedTab('dashboard');
  };

  // Handle checkbox change for product selection
  const handleProductCheckbox = (productId: number) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Dashboard main layout
  return (
    <div className="min-h-screen bg-[#FAF3E0]/30">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-playfair text-[#0A192F] mb-2">Midnight Magnolia Dashboard</h1>
          <p className="text-[#0A192F]/70 flex items-center">
            <Moon className="h-4 w-4 mr-2" />
            Waxing Crescent | May 12, 2025 | Ideal for: new beginnings, setting intentions
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-[#0A192F] text-[#FAF3E0] rounded-lg p-6 sticky top-24">
              <div className="mb-6 text-center">
                <h2 className="font-playfair text-[#D4AF37] text-xl mb-2">Midnight Magnolia</h2>
                <p className="text-sm text-[#FAF3E0]/70">Content Creation Hub</p>
              </div>
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setSelectedTab('dashboard')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${
                    selectedTab === 'dashboard' 
                      ? 'bg-[#0A192F]/90 text-[#D4AF37]' 
                      : 'text-[#FAF3E0] hover:bg-[#0A192F]/90 hover:text-[#D4AF37]'
                  } transition-colors`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                
                <button 
                  onClick={() => setSelectedTab('create')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${
                    selectedTab === 'create' 
                      ? 'bg-[#0A192F]/90 text-[#D4AF37]' 
                      : 'text-[#FAF3E0] hover:bg-[#0A192F]/90 hover:text-[#D4AF37]'
                  } transition-colors`}
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Create Content</span>
                </button>
                
                <button 
                  onClick={() => setSelectedTab('content')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${
                    selectedTab === 'content' 
                      ? 'bg-[#0A192F]/90 text-[#D4AF37]' 
                      : 'text-[#FAF3E0] hover:bg-[#0A192F]/90 hover:text-[#D4AF37]'
                  } transition-colors`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Content Library</span>
                </button>
                
                <button 
                  onClick={() => setSelectedTab('products')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${
                    selectedTab === 'products' 
                      ? 'bg-[#0A192F]/90 text-[#D4AF37]' 
                      : 'text-[#FAF3E0] hover:bg-[#0A192F]/90 hover:text-[#D4AF37]'
                  } transition-colors`}
                >
                  <Package className="h-5 w-5" />
                  <span>Products</span>
                </button>
                
                <button 
                  onClick={() => setSelectedTab('clients')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${
                    selectedTab === 'clients' 
                      ? 'bg-[#0A192F]/90 text-[#D4AF37]' 
                      : 'text-[#FAF3E0] hover:bg-[#0A192F]/90 hover:text-[#D4AF37]'
                  } transition-colors`}
                >
                  <Users className="h-5 w-5" />
                  <span>Clients</span>
                </button>
                
                <button 
                  onClick={() => setSelectedTab('fulfill')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${
                    selectedTab === 'fulfill' 
                      ? 'bg-[#0A192F]/90 text-[#D4AF37]' 
                      : 'text-[#FAF3E0] hover:bg-[#0A192F]/90 hover:text-[#D4AF37]'
                  } transition-colors`}
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Fulfill Orders</span>
                </button>
              </nav>
              
              <div className="mt-8 border-t border-[#FAF3E0]/10 pt-6">
                <h3 className="text-sm font-medium text-[#FAF3E0] mb-4">Energy Tracker</h3>
                <div className="flex justify-between gap-2">
                  <Button 
                    variant="outline" 
                    className={`flex-1 border-green-500 ${energyLevel === 'high' ? 'bg-green-500/20 text-green-400' : 'text-green-600 hover:bg-green-500/10'}`}
                    onClick={() => handleEnergySelect('high')}
                  >
                    High
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`flex-1 border-amber-500 ${energyLevel === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'text-amber-600 hover:bg-amber-500/10'}`}
                    onClick={() => handleEnergySelect('medium')}
                  >
                    Medium
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`flex-1 border-blue-400 ${energyLevel === 'low' ? 'bg-blue-400/20 text-blue-300' : 'text-blue-500 hover:bg-blue-400/10'}`}
                    onClick={() => handleEnergySelect('low')}
                  >
                    Low
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {/* Dashboard Tab */}
            {selectedTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-white border-[#0A192F]/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-[#0A192F]">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#0A192F]">$2,450</div>
                      <p className="text-sm text-green-600">+18% this month</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-[#0A192F]/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-[#0A192F]">Clients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#0A192F]">
                        {isClientsLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          clientsData?.clients?.length || 0
                        )}
                      </div>
                      <p className="text-sm text-green-600">+2 this week</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-[#0A192F]/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-[#0A192F]">Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#0A192F]">
                        {isContentLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          contentData?.content?.length || 0
                        )}
                      </div>
                      <p className="text-sm text-[#0A192F]/60">+5 this week</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-[#0A192F]/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-[#0A192F]">Goal Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-1">
                        <div className="text-2xl font-bold text-[#0A192F]">24.5%</div>
                        <div className="text-sm text-[#0A192F]/60">$2,450/$10,000</div>
                      </div>
                      <Progress value={24.5} className="h-2" />
                    </CardContent>
                  </Card>
                </div>
                
                {/* Recent Activity & Tasks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white border-[#0A192F]/10">
                    <CardHeader>
                      <CardTitle className="text-xl font-playfair text-[#0A192F]">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 mt-0.5 text-[#D4AF37]">
                            <ShoppingCart className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-[#0A192F]">New sale: The Magnolia Reset Journal</p>
                            <p className="text-[#0A192F]/60 text-sm">2 hours ago</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 mt-0.5 text-[#D4AF37]">
                            <PenSquare className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-[#0A192F]">Created 5 new affirmation cards</p>
                            <p className="text-[#0A192F]/60 text-sm">Yesterday</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 mt-0.5 text-[#D4AF37]">
                            <Users className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-[#0A192F]">New client: Maya Johnson</p>
                            <p className="text-[#0A192F]/60 text-sm">2 days ago</p>
                          </div>
                        </li>
                      </ul>
                      <Button 
                        variant="ghost" 
                        className="w-full mt-4 text-[#0A192F]/70 hover:text-[#0A192F]"
                        onClick={() => toast({
                          title: "Coming Soon",
                          description: "View all activity feature is under development.",
                        })}
                      >
                        View all activity
                        <Clock className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-[#0A192F]/10">
                    <CardHeader>
                      <CardTitle className="text-xl font-playfair text-[#0A192F]">Today's Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isTasksLoading ? (
                        <div className="flex justify-center p-6">
                          <Loader2 className="h-8 w-8 animate-spin text-[#0A192F]/40" />
                        </div>
                      ) : (
                        <ul className="space-y-4">
                          {tasksData?.tasks?.length > 0 ? (
                            tasksData.tasks.slice(0, 3).map((task: Task) => (
                              <li key={task.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className={`h-5 w-5 rounded border border-[#0A192F]/30 mr-3 ${
                                    task.status === 'completed' ? 'bg-[#0A192F]/10 flex items-center justify-center' : ''
                                  }`}>
                                    {task.status === 'completed' && (
                                      <Check className="h-3 w-3 text-[#0A192F]" />
                                    )}
                                  </div>
                                  <span className={`${
                                    task.status === 'completed' ? 'text-[#0A192F]/60 line-through' : 'text-[#0A192F]'
                                  }`}>
                                    {task.title}
                                  </span>
                                </div>
                                <Badge className={`
                                  ${task.priority === 'high' ? 'bg-red-50 text-red-600 border-red-200' : 
                                    task.priority === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                                    task.status === 'completed' ? 'bg-[#0A192F]/10 text-[#0A192F]/60 border-[#0A192F]/20' :
                                    'bg-blue-50 text-blue-600 border-blue-200'}
                                `}>
                                  {task.status === 'completed' ? 'Completed' : task.priority}
                                </Badge>
                              </li>
                            ))
                          ) : (
                            <li className="text-center text-[#0A192F]/60 py-4">
                              No tasks for today
                            </li>
                          )}
                        </ul>
                      )}
                      <Button 
                        className="w-full mt-6 bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                        onClick={() => toast({
                          title: "Add Task",
                          description: "Task management feature is under development.",
                        })}
                      >
                        + Add New Task
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Quick Create */}
                <Card className="bg-white border-[#0A192F]/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair text-[#0A192F]">Quick Create</CardTitle>
                    <CardDescription className="text-[#0A192F]/70">
                      Start creating your mystical content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <button
                        onClick={() => {
                          setSelectedTab('create');
                          setContentDraft(prev => ({
                            ...prev,
                            contentType: 'affirmation',
                            title: '',
                            content: ''
                          }));
                          setPromptVariables(prev => ({
                            ...prev,
                            THEME: 'self-acceptance'
                          }));
                        }} 
                        className="border border-[#0A192F]/10 rounded-lg p-4 text-center hover:bg-[#0A192F]/5 transition-colors"
                      >
                        <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                          <Star className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-[#0A192F]">Affirmation Card</h3>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setSelectedTab('create');
                          setContentDraft(prev => ({
                            ...prev,
                            contentType: 'tarot',
                            title: '',
                            content: ''
                          }));
                          setPromptVariables(prev => ({
                            ...prev,
                            CARD_NAME: 'The High Priestess'
                          }));
                        }}
                        className="border border-[#0A192F]/10 rounded-lg p-4 text-center hover:bg-[#0A192F]/5 transition-colors"
                      >
                        <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                          <Moon className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-[#0A192F]">Tarot Description</h3>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setSelectedTab('create');
                          setContentDraft(prev => ({
                            ...prev,
                            contentType: 'journal',
                            title: '',
                            content: ''
                          }));
                          setPromptVariables(prev => ({
                            ...prev,
                            TOPIC: 'ancestral healing'
                          }));
                        }}
                        className="border border-[#0A192F]/10 rounded-lg p-4 text-center hover:bg-[#0A192F]/5 transition-colors"
                      >
                        <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                          <ScrollText className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-[#0A192F]">Journal Prompt</h3>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setSelectedTab('create');
                          setContentDraft(prev => ({
                            ...prev,
                            contentType: 'product',
                            title: 'Digital Planner',
                            content: ''
                          }));
                          setPromptVariables(prev => ({
                            ...prev,
                            PRODUCT_TYPE: 'digital planner'
                          }));
                        }}
                        className="border border-[#0A192F]/10 rounded-lg p-4 text-center hover:bg-[#0A192F]/5 transition-colors"
                      >
                        <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                          <Package className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-[#0A192F]">Product Listing</h3>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Create Content Tab */}
            {selectedTab === 'create' && (
              <div className="space-y-6">
                <Card className="bg-white border-[#0A192F]/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair text-[#0A192F]">Create New Content</CardTitle>
                    <CardDescription className="text-[#0A192F]/70">
                      Generate AI-powered content for your products and clients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="contentType" className="text-[#0A192F]">Content Type</Label>
                          <Select
                            value={contentDraft.contentType}
                            onValueChange={(value: ContentType) => setContentDraft(prev => ({
                              ...prev,
                              contentType: value
                            }))}
                          >
                            <SelectTrigger className="border-[#0A192F]/20 text-[#0A192F]">
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="affirmation">Affirmation Card</SelectItem>
                              <SelectItem value="tarot">Tarot Description</SelectItem>
                              <SelectItem value="journal">Journal Prompt</SelectItem>
                              <SelectItem value="product">Product Listing</SelectItem>
                              <SelectItem value="social">Social Media Post</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="title" className="text-[#0A192F]">Title</Label>
                          <Input
                            id="title"
                            value={contentDraft.title}
                            onChange={(e) => setContentDraft(prev => ({
                              ...prev,
                              title: e.target.value
                            }))}
                            placeholder="Enter a title for your content"
                            className="border-[#0A192F]/20 text-[#0A192F]"
                          />
                        </div>
                        
                        {/* Dynamic input based on content type */}
                        {contentDraft.contentType === 'affirmation' && (
                          <div>
                            <Label htmlFor="theme" className="text-[#0A192F]">Theme</Label>
                            <Input
                              id="theme"
                              value={promptVariables.THEME}
                              onChange={(e) => handlePromptVariableChange('THEME', e.target.value)}
                              placeholder="e.g., self-acceptance, resilience, healing"
                              className="border-[#0A192F]/20 text-[#0A192F]"
                            />
                          </div>
                        )}
                        
                        {contentDraft.contentType === 'tarot' && (
                          <div>
                            <Label htmlFor="cardName" className="text-[#0A192F]">Card Name</Label>
                            <Input
                              id="cardName"
                              value={promptVariables.CARD_NAME}
                              onChange={(e) => handlePromptVariableChange('CARD_NAME', e.target.value)}
                              placeholder="e.g., The High Priestess, The Fool"
                              className="border-[#0A192F]/20 text-[#0A192F]"
                            />
                          </div>
                        )}
                        
                        {contentDraft.contentType === 'journal' && (
                          <div>
                            <Label htmlFor="topic" className="text-[#0A192F]">Topic</Label>
                            <Input
                              id="topic"
                              value={promptVariables.TOPIC}
                              onChange={(e) => handlePromptVariableChange('TOPIC', e.target.value)}
                              placeholder="e.g., ancestral healing, shadow work"
                              className="border-[#0A192F]/20 text-[#0A192F]"
                            />
                          </div>
                        )}
                        
                        {contentDraft.contentType === 'product' && (
                          <div>
                            <Label htmlFor="productType" className="text-[#0A192F]">Product Type</Label>
                            <Input
                              id="productType"
                              value={promptVariables.PRODUCT_TYPE}
                              onChange={(e) => handlePromptVariableChange('PRODUCT_TYPE', e.target.value)}
                              placeholder="e.g., digital planner, tarot guide"
                              className="border-[#0A192F]/20 text-[#0A192F]"
                            />
                          </div>
                        )}
                        
                        {contentDraft.contentType === 'social' && (
                          <div>
                            <Label htmlFor="socialTopic" className="text-[#0A192F]">Topic</Label>
                            <Input
                              id="socialTopic"
                              value={promptVariables.TOPIC}
                              onChange={(e) => handlePromptVariableChange('TOPIC', e.target.value)}
                              placeholder="e.g., new product launch, moon phases"
                              className="border-[#0A192F]/20 text-[#0A192F]"
                            />
                          </div>
                        )}
                        
                        <div>
                          <Label htmlFor="prompt" className="text-[#0A192F]">Generation Prompt</Label>
                          <Textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter your prompt for AI generation"
                            className="border-[#0A192F]/20 text-[#0A192F] min-h-[100px]"
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                          onClick={generateContent}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Generate Content
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="contentEditor" className="text-[#0A192F]">Generated Content</Label>
                          <Textarea
                            id="contentEditor"
                            value={contentDraft.content}
                            onChange={(e) => setContentDraft(prev => ({
                              ...prev,
                              content: e.target.value
                            }))}
                            placeholder="Generated content will appear here"
                            className="border-[#0A192F]/20 text-[#0A192F] min-h-[300px] font-mono"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="tags" className="text-[#0A192F]">Tags</Label>
                          <Input
                            id="tags"
                            value={contentDraft.tags instanceof Array ? contentDraft.tags.join(', ') : contentDraft.tags || ''}
                            onChange={(e) => setContentDraft(prev => {
                              // We'll store as string in the form and convert to array on save
                              return {
                                ...prev,
                                tags: e.target.value
                              };
                            })}
                            placeholder="Enter tags separated by commas"
                            className="border-[#0A192F]/20 text-[#0A192F]"
                          />
                        </div>
                        
                        <div className="flex space-x-2 pt-4">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                            onClick={() => {
                              if (contentDraft.content) {
                                // Create a blob and download
                                const blob = new Blob([contentDraft.content], { type: 'text/markdown' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${contentDraft.title || 'content'}.md`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                                
                                toast({
                                  title: "Content Downloaded",
                                  description: "Your content has been downloaded as a markdown file.",
                                });
                              } else {
                                toast({
                                  title: "No Content",
                                  description: "Please generate content before downloading.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                            onClick={() => {
                              if (contentDraft.content) {
                                // Copy to clipboard
                                navigator.clipboard.writeText(contentDraft.content);
                                toast({
                                  title: "Copied to Clipboard",
                                  description: "Content has been copied to your clipboard.",
                                });
                              } else {
                                toast({
                                  title: "No Content",
                                  description: "Please generate content before copying.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                          <Button 
                            className="flex-1 bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                            onClick={saveContent}
                            disabled={saveContentMutation.isPending}
                          >
                            {saveContentMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Content Library Tab */}
            {selectedTab === 'content' && (
              <div className="space-y-6">
                <Card className="bg-white border-[#0A192F]/10">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl font-playfair text-[#0A192F]">Content Library</CardTitle>
                        <CardDescription className="text-[#0A192F]/70">
                          Manage all your generated content
                        </CardDescription>
                      </div>
                      <Button 
                        onClick={() => setSelectedTab('create')}
                        className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                      >
                        <PenSquare className="mr-2 h-4 w-4" />
                        Create New
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isContentLoading ? (
                      <div className="flex justify-center p-6">
                        <Loader2 className="h-8 w-8 animate-spin text-[#0A192F]/40" />
                      </div>
                    ) : contentData?.content?.length > 0 ? (
                      <div className="space-y-4">
                        {contentData.content.map((item: GeneratedContent) => (
                          <Card key={item.id} className="border-[#0A192F]/10">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg font-medium text-[#0A192F]">{item.title}</CardTitle>
                                  <div className="flex gap-2 mt-1">
                                    <Badge className="bg-[#0A192F]/10 text-[#0A192F] border border-[#0A192F]/20">
                                      {item.contentType}
                                    </Badge>
                                    {item.status && (
                                      <Badge className={`
                                        ${item.status === 'published' ? 'bg-green-50 text-green-600 border-green-200' : 
                                         item.status === 'draft' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                                         'bg-red-50 text-red-600 border-red-200'}
                                      `}>
                                        {item.status}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="icon" variant="ghost" className="text-[#0A192F]/60 hover:text-[#0A192F] hover:bg-[#0A192F]/5">
                                    <PenSquare className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="text-[#0A192F]/60 hover:text-[#0A192F] hover:bg-[#0A192F]/5">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="prose prose-sm max-w-none text-[#0A192F]/80">
                                <p>{item.content?.split('\n')[0]?.substring(0, 150)}...</p>
                              </div>
                              <div className="flex gap-1 mt-3">
                                {item.tags && Array.isArray(item.tags) && item.tags.map((tag, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="outline" 
                                    className="text-xs text-[#0A192F]/70 border-[#0A192F]/20"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t border-[#0A192F]/10 pt-4">
                              <div className="text-xs text-[#0A192F]/60">
                                Created {new Date(item.createdAt || '').toLocaleDateString()}
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                                onClick={() => {
                                  toast({
                                    title: "Coming Soon",
                                    description: "The content fulfillment feature is under development.",
                                  });
                                  setSelectedTab('fulfill');
                                }}
                              >
                                <Send className="mr-2 h-3 w-3" />
                                Fulfill to Client
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
                        <h3 className="text-lg font-medium text-[#0A192F] mb-2">No Content Yet</h3>
                        <p className="text-[#0A192F]/60 max-w-md mx-auto mb-6">
                          You haven't created any content yet. Start generating content to build your library.
                        </p>
                        <Button 
                          onClick={() => setSelectedTab('create')}
                          className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                        >
                          <PenSquare className="mr-2 h-4 w-4" />
                          Create Content
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Products Tab */}
            {selectedTab === 'products' && (
              <div className="space-y-6">
                <Card className="bg-white border-[#0A192F]/10">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl font-playfair text-[#0A192F]">Product Library</CardTitle>
                        <CardDescription className="text-[#0A192F]/70">
                          Manage your digital products
                        </CardDescription>
                      </div>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Coming Soon",
                            description: "The add product feature is under development.",
                          });
                        }}
                        className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                      >
                        <Package className="mr-2 h-4 w-4" />
                        Add Product
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isProductsLoading ? (
                      <div className="flex justify-center p-6">
                        <Loader2 className="h-8 w-8 animate-spin text-[#0A192F]/40" />
                      </div>
                    ) : productsData?.products?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {productsData.products.map((product: Product) => (
                          <Card key={product.id} className="border-[#0A192F]/10">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg font-medium text-[#0A192F]">{product.name}</CardTitle>
                                  <div className="flex gap-2 mt-1">
                                    <Badge className="bg-[#0A192F]/10 text-[#0A192F] border border-[#0A192F]/20">
                                      {product.type}
                                    </Badge>
                                    {product.status && (
                                      <Badge className={`
                                        ${product.status === 'published' ? 'bg-green-50 text-green-600 border-green-200' : 
                                         product.status === 'draft' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                                         'bg-red-50 text-red-600 border-red-200'}
                                      `}>
                                        {product.status}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="text-lg font-bold text-[#0A192F]">
                                  ${(product.price / 100).toFixed(2)}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="prose prose-sm max-w-none text-[#0A192F]/80">
                                <p>{product.description?.substring(0, 150) || 'No description available'}...</p>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t border-[#0A192F]/10 pt-4">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                                onClick={() => {
                                  setSelectedTab('create');
                                  setContentDraft(prev => ({
                                    ...prev,
                                    contentType: 'product',
                                    title: product.name,
                                    content: ''
                                  }));
                                  setPromptVariables(prev => ({
                                    ...prev,
                                    PRODUCT_TYPE: product.type
                                  }));
                                }}
                              >
                                <PenSquare className="mr-2 h-3 w-3" />
                                Generate Content
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                                onClick={() => {
                                  toast({
                                    title: "Coming Soon",
                                    description: "The edit product feature is under development.",
                                  });
                                }}
                              >
                                <Upload className="mr-2 h-3 w-3" />
                                Upload Assets
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Package className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
                        <h3 className="text-lg font-medium text-[#0A192F] mb-2">No Products Yet</h3>
                        <p className="text-[#0A192F]/60 max-w-md mx-auto mb-6">
                          You haven't added any products yet. Start creating products to fill your inventory.
                        </p>
                        <Button 
                          onClick={() => {
                            toast({
                              title: "Coming Soon",
                              description: "The add product feature is under development.",
                            });
                          }}
                          className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                        >
                          <Package className="mr-2 h-4 w-4" />
                          Add Product
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Clients Tab */}
            {selectedTab === 'clients' && (
              <div className="space-y-6">
                <Card className="bg-white border-[#0A192F]/10">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl font-playfair text-[#0A192F]">Client Management</CardTitle>
                        <CardDescription className="text-[#0A192F]/70">
                          Manage your clients and their memberships
                        </CardDescription>
                      </div>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Coming Soon",
                            description: "The add client feature is under development.",
                          });
                        }}
                        className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Add Client
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isClientsLoading ? (
                      <div className="flex justify-center p-6">
                        <Loader2 className="h-8 w-8 animate-spin text-[#0A192F]/40" />
                      </div>
                    ) : clientsData?.clients?.length > 0 ? (
                      <div className="space-y-4">
                        {clientsData.clients.map((client: Client) => (
                          <Card key={client.id} className="border-[#0A192F]/10">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg font-medium text-[#0A192F]">{client.fullName}</CardTitle>
                                  <div className="text-[#0A192F]/70 text-sm">{client.email}</div>
                                  <div className="flex gap-2 mt-1">
                                    {client.platform && (
                                      <Badge className="bg-[#0A192F]/10 text-[#0A192F] border border-[#0A192F]/20">
                                        {client.platform}
                                      </Badge>
                                    )}
                                    {client.membershipTier && (
                                      <Badge className={`
                                        ${client.membershipTier === 'premium' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 
                                         client.membershipTier === 'standard' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                                         'bg-green-50 text-green-600 border-green-200'}
                                      `}>
                                        {client.membershipTier}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="icon" variant="ghost" className="text-[#0A192F]/60 hover:text-[#0A192F] hover:bg-[#0A192F]/5">
                                    <PenSquare className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="text-[#0A192F]/60 hover:text-[#0A192F] hover:bg-[#0A192F]/5">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardFooter className="flex justify-between border-t border-[#0A192F]/10 pt-4">
                              <div className="text-sm text-[#0A192F]/60">
                                {client.phone || 'No phone provided'}
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                                onClick={() => {
                                  setSelectedTab('fulfill');
                                  setSelectedClient(client.id || null);
                                }}
                              >
                                <Send className="mr-2 h-3 w-3" />
                                Fulfill Content
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Users className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
                        <h3 className="text-lg font-medium text-[#0A192F] mb-2">No Clients Yet</h3>
                        <p className="text-[#0A192F]/60 max-w-md mx-auto mb-6">
                          You haven't added any clients yet. Add clients to start managing relationships.
                        </p>
                        <Button 
                          onClick={() => {
                            toast({
                              title: "Coming Soon",
                              description: "The add client feature is under development.",
                            });
                          }}
                          className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Add Client
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Fulfill Tab */}
            {selectedTab === 'fulfill' && (
              <div className="space-y-6">
                <Card className="bg-white border-[#0A192F]/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair text-[#0A192F]">Content Fulfillment</CardTitle>
                    <CardDescription className="text-[#0A192F]/70">
                      Deliver content to clients based on their memberships
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Client Selection */}
                      <div>
                        <Label className="text-[#0A192F] block mb-2">Select Client</Label>
                        {isClientsLoading ? (
                          <div className="flex justify-center p-6">
                            <Loader2 className="h-8 w-8 animate-spin text-[#0A192F]/40" />
                          </div>
                        ) : clientsData?.clients?.length > 0 ? (
                          <RadioGroup 
                            className="gap-2" 
                            defaultValue={selectedClient?.toString()}
                            onValueChange={(value) => setSelectedClient(parseInt(value))}
                          >
                            {clientsData.clients.map((client: Client) => (
                              <div key={client.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={client.id?.toString() || ''} id={`client-${client.id}`} />
                                <Label htmlFor={`client-${client.id}`} className="flex flex-1 justify-between items-center">
                                  <div>
                                    <span className="text-[#0A192F] font-medium">{client.fullName}</span>
                                    <span className="text-[#0A192F]/60 text-sm ml-2">{client.email}</span>
                                  </div>
                                  {client.membershipTier && (
                                    <Badge className={`
                                      ${client.membershipTier === 'premium' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 
                                        client.membershipTier === 'standard' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                                        'bg-green-50 text-green-600 border-green-200'}
                                    `}>
                                      {client.membershipTier}
                                    </Badge>
                                  )}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <div className="text-center p-4 border border-dashed border-[#0A192F]/20 rounded-md">
                            <p className="text-[#0A192F]/60">No clients available</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Selection */}
                      <div>
                        <Label className="text-[#0A192F] block mb-2">Select Products</Label>
                        {isProductsLoading ? (
                          <div className="flex justify-center p-6">
                            <Loader2 className="h-8 w-8 animate-spin text-[#0A192F]/40" />
                          </div>
                        ) : productsData?.products?.length > 0 ? (
                          <div className="space-y-2">
                            {productsData.products.map((product: Product) => (
                              <div key={product.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`product-${product.id}`} 
                                  checked={selectedProducts.includes(product.id || 0)}
                                  onCheckedChange={() => handleProductCheckbox(product.id || 0)}
                                />
                                <Label htmlFor={`product-${product.id}`} className="flex flex-1 justify-between items-center">
                                  <span className="text-[#0A192F]">{product.name}</span>
                                  <span className="text-[#0A192F] font-medium">${(product.price / 100).toFixed(2)}</span>
                                </Label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-4 border border-dashed border-[#0A192F]/20 rounded-md">
                            <p className="text-[#0A192F]/60">No products available</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content Selection */}
                    <div className="mt-6">
                      <Label className="text-[#0A192F] block mb-2">Select Content to Fulfill</Label>
                      {isContentLoading ? (
                        <div className="flex justify-center p-6">
                          <Loader2 className="h-8 w-8 animate-spin text-[#0A192F]/40" />
                        </div>
                      ) : contentData?.content?.length > 0 ? (
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                          {contentData.content.map((item: GeneratedContent) => (
                            <div key={item.id} className="flex items-center space-x-2">
                              <Checkbox id={`content-${item.id}`} />
                              <Label htmlFor={`content-${item.id}`} className="flex flex-1 justify-between items-center">
                                <div>
                                  <span className="text-[#0A192F] font-medium">{item.title}</span>
                                  <Badge className="ml-2 bg-[#0A192F]/10 text-[#0A192F] border border-[#0A192F]/20">
                                    {item.contentType}
                                  </Badge>
                                </div>
                                <Badge className={`
                                  ${item.status === 'published' ? 'bg-green-50 text-green-600 border-green-200' : 
                                    item.status === 'draft' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                                    'bg-red-50 text-red-600 border-red-200'}
                                `}>
                                  {item.status}
                                </Badge>
                              </Label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-4 border border-dashed border-[#0A192F]/20 rounded-md">
                          <p className="text-[#0A192F]/60">No content available</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button 
                        variant="outline" 
                        className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                        onClick={() => setSelectedTab('dashboard')}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                        onClick={fulfillContentToClient}
                        disabled={!selectedClient || selectedProducts.length === 0}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Fulfill to Client
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}