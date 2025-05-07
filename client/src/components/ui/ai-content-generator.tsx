import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, getQueryFn, queryClient } from '@/lib/queryClient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  FaMoon, 
  FaStar, 
  FaFeather, 
  FaBook, 
  FaMagic, 
  FaImage, 
  FaSpinner, 
  FaClipboard, 
  FaExclamationTriangle,
  FaFileAlt,
  FaShoppingBag,
  FaClipboardList,
  FaPalette,
  FaDatabase
} from 'react-icons/fa';

export const AIContentGenerator: React.FC = () => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [activeTab, setActiveTab] = useState('tarot');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [generatedJSON, setGeneratedJSON] = useState<any | null>(null);

  // Content generation form states
  const [tarotCard, setTarotCard] = useState('The Fool');
  const [queryType, setQueryType] = useState('general');
  const [affirmationTheme, setAffirmationTheme] = useState('abundance');
  const [affirmationCount, setAffirmationCount] = useState('5');
  const [affirmationMood, setAffirmationMood] = useState('positive');
  const [contentType, setContentType] = useState('blog post');
  const [contentTheme, setContentTheme] = useState('spiritual growth');
  const [additionalContext, setAdditionalContext] = useState('');
  const [productType, setProductType] = useState('digital workbook');
  const [productTitle, setProductTitle] = useState('');
  const [productFeatures, setProductFeatures] = useState('');
  const [targetAudience, setTargetAudience] = useState('spiritual practitioners');
  const [imageSubject, setImageSubject] = useState('');
  const [imageStyle, setImageStyle] = useState('mystical');
  const [worksheetTopic, setWorksheetTopic] = useState('');
  const [worksheetPurpose, setWorksheetPurpose] = useState('');
  const [moonPhase, setMoonPhase] = useState('New Moon');

  // Check OpenAI connection status
  const { data: apiHealth, isLoading: isCheckingConnection } = useQuery({
    queryKey: ['/api/openai/health'],
    queryFn: getQueryFn({ on401: "throw" }),
    onSuccess: (data: any) => {
      if (data?.success) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    },
    onError: () => {
      setConnectionStatus('error');
    }
  });

  // Tarot reading mutation
  const tarotReadingMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/openai/tarot-reading', {
        cardName: tarotCard,
        queryType: queryType
      });
    },
    onSuccess: async (response: Response) => {
      const data = await response.json();
      setGeneratedContent(data.reading);
      toast({
        title: "Reading Generated",
        description: "Tarot reading has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: `Failed to generate reading: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Affirmations mutation
  const affirmationsMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/openai/affirmations', {
        theme: affirmationTheme,
        count: parseInt(affirmationCount),
        mood: affirmationMood
      });
    },
    onSuccess: async (response: Response) => {
      const data = await response.json();
      setGeneratedContent(data.affirmations.join('\n\n'));
      toast({
        title: "Affirmations Generated",
        description: `Generated ${data.affirmations.length} affirmations.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: `Failed to generate affirmations: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Content brief mutation
  const contentBriefMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/openai/content-brief', {
        contentType,
        theme: contentTheme,
        additionalContext
      });
    },
    onSuccess: async (response: Response) => {
      const data = await response.json();
      setGeneratedJSON(data.brief);
      toast({
        title: "Content Brief Generated",
        description: "Your content brief has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: `Failed to generate content brief: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Product description mutation
  const productDescriptionMutation = useMutation({
    mutationFn: async () => {
      const features = productFeatures.split(',').map(f => f.trim());
      
      return apiRequest('POST', '/api/openai/product-description', {
        productType,
        title: productTitle,
        features,
        targetAudience
      });
    },
    onSuccess: async (response: Response) => {
      const data = await response.json();
      setGeneratedContent(data.description);
      toast({
        title: "Description Generated",
        description: "Product description has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: `Failed to generate product description: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Image prompts mutation
  const imagePromptsMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/openai/image-prompts', {
        subject: imageSubject,
        style: imageStyle,
        count: 3
      });
    },
    onSuccess: async (response: Response) => {
      const data = await response.json();
      setGeneratedContent(data.prompts.join('\n\n'));
      toast({
        title: "Image Prompts Generated",
        description: `Generated ${data.prompts.length} image prompts.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: `Failed to generate image prompts: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Worksheet structure mutation
  const worksheetMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/openai/worksheet', {
        topic: worksheetTopic,
        purpose: worksheetPurpose
      });
    },
    onSuccess: async (response: Response) => {
      const data = await response.json();
      setGeneratedJSON(data.worksheet);
      toast({
        title: "Worksheet Generated",
        description: "Your worksheet structure has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: `Failed to generate worksheet: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Moon phase content mutation
  const moonPhaseContentMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/openai/moon-phase-content', {
        phase: moonPhase,
        contentType: 'general'
      });
    },
    onSuccess: async (response: Response) => {
      const data = await response.json();
      setGeneratedJSON(data.content);
      toast({
        title: "Moon Phase Content Generated",
        description: `Generated content ideas for ${moonPhase}.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: `Failed to generate moon phase content: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Copy generated content to clipboard
  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      toast({
        title: "Copied",
        description: "Content copied to clipboard."
      });
    } else if (generatedJSON) {
      navigator.clipboard.writeText(JSON.stringify(generatedJSON, null, 2));
      toast({
        title: "Copied",
        description: "JSON content copied to clipboard."
      });
    }
  };

  // Handle creation of a Notion page from generated content
  const createNotionPage = () => {
    // This would connect to your Notion API to create a page
    toast({
      title: "Feature Coming Soon",
      description: "Direct export to Notion will be available in the next update."
    });
  };

  // Render the JSON content in a readable format
  const renderJSONContent = (json: any) => {
    if (!json) return null;

    return (
      <div className="space-y-4">
        {Object.entries(json).map(([key, value], index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-[#D4AF37] font-medium capitalize">{key}</h3>
            {Array.isArray(value) ? (
              <ul className="list-disc list-inside space-y-1 text-[#FAF3E0]">
                {(value as any[]).map((item, i) => (
                  <li key={i}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
                ))}
              </ul>
            ) : typeof value === 'string' ? (
              <p className="text-[#FAF3E0]">{value}</p>
            ) : (
              <pre className="bg-[#0A192F]/70 p-2 rounded text-xs text-[#FAF3E0] overflow-x-auto">
                {JSON.stringify(value, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-playfair text-[#D4AF37]">AI Content Creation</h2>
          <p className="text-sm text-[#FAF3E0]">
            Generate various content types using OpenAI
          </p>
        </div>
        <Badge
          variant="outline"
          className={`${
            connectionStatus === 'checking'
              ? 'bg-blue-500/20 text-blue-300'
              : connectionStatus === 'connected'
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}
        >
          {connectionStatus === 'checking' ? 'Checking Connection...' :
           connectionStatus === 'connected' ? 'Connected' : 'Connection Error'}
        </Badge>
      </div>

      {connectionStatus === 'error' ? (
        <Card className="bg-[#0A192F] border-red-400/30 shadow-lg">
          <CardHeader className="border-b border-red-400/20">
            <CardTitle className="text-red-400 flex items-center">
              <FaExclamationTriangle className="mr-2" /> OpenAI API Connection Error
            </CardTitle>
            <CardDescription className="text-[#FAF3E0]">
              Unable to connect to the OpenAI API. Please check your API key.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="bg-red-950/20 border border-red-400/20 rounded-md p-4">
              <h3 className="font-medium text-red-400 mb-2">Troubleshooting Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#FAF3E0]">
                <li>Verify that your OpenAI API key is correct and active</li>
                <li>Ensure your OpenAI account has available credits</li>
                <li>Check that you have access to the required models</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Content Generation Section */}
          <Card className="bg-[#0A192F] border-[#A3B18A]/30 shadow-lg">
            <CardHeader className="border-b border-[#A3B18A]/20">
              <CardTitle className="text-[#D4AF37] flex items-center">
                <FaMagic className="mr-2" /> Content Generator
              </CardTitle>
              <CardDescription className="text-[#FAF3E0]">
                Select content type and customize generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 bg-[#0A192F] border border-[#A3B18A]/30 p-1 w-full flex flex-wrap gap-1 justify-center">
                  <TabsTrigger 
                    value="tarot" 
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F] text-sm min-w-0 flex-grow md:flex-grow-0"
                  >
                    <FaMoon className="mr-1 hidden md:inline" /> Tarot
                  </TabsTrigger>
                  <TabsTrigger 
                    value="affirmations" 
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F] text-sm min-w-0 flex-grow md:flex-grow-0"
                  >
                    <FaStar className="mr-1 hidden md:inline" /> Affirmations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="content-brief" 
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F] text-sm min-w-0 flex-grow md:flex-grow-0"
                  >
                    <FaFileAlt className="mr-1 hidden md:inline" /> Content Brief
                  </TabsTrigger>
                  <TabsTrigger 
                    value="product" 
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F] text-sm min-w-0 flex-grow md:flex-grow-0"
                  >
                    <FaShoppingBag className="mr-1 hidden md:inline" /> Product
                  </TabsTrigger>
                  <TabsTrigger 
                    value="image-prompts" 
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F] text-sm min-w-0 flex-grow md:flex-grow-0"
                  >
                    <FaImage className="mr-1 hidden md:inline" /> Image
                  </TabsTrigger>
                  <TabsTrigger 
                    value="worksheet" 
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F] text-sm min-w-0 flex-grow md:flex-grow-0"
                  >
                    <FaClipboardList className="mr-1 hidden md:inline" /> Worksheet
                  </TabsTrigger>
                  <TabsTrigger 
                    value="moon-phase" 
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F] text-sm min-w-0 flex-grow md:flex-grow-0"
                  >
                    <FaMoon className="mr-1 hidden md:inline" /> Moon Phase
                  </TabsTrigger>
                </TabsList>

                {/* Tarot Reading Tab */}
                <TabsContent value="tarot" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tarot-card" className="text-[#FAF3E0]">Card Name</Label>
                      <Input
                        id="tarot-card"
                        value={tarotCard}
                        onChange={(e) => setTarotCard(e.target.value)}
                        placeholder="Enter tarot card name"
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="query-type" className="text-[#FAF3E0]">Reading Type</Label>
                      <Select
                        value={queryType}
                        onValueChange={setQueryType}
                      >
                        <SelectTrigger id="query-type" className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectValue placeholder="Select reading type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="love">Love & Relationships</SelectItem>
                          <SelectItem value="career">Career & Finances</SelectItem>
                          <SelectItem value="spiritual">Spiritual Growth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => tarotReadingMutation.mutate()}
                      disabled={tarotReadingMutation.isPending || !tarotCard}
                      className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                    >
                      {tarotReadingMutation.isPending ? (
                        <>
                          <FaSpinner className="mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FaMoon className="mr-2" />
                          Generate Tarot Reading
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                {/* Affirmations Tab */}
                <TabsContent value="affirmations" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="affirmation-theme" className="text-[#FAF3E0]">Theme</Label>
                      <Input
                        id="affirmation-theme"
                        value={affirmationTheme}
                        onChange={(e) => setAffirmationTheme(e.target.value)}
                        placeholder="Enter affirmation theme"
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="affirmation-count" className="text-[#FAF3E0]">Count</Label>
                        <Select
                          value={affirmationCount}
                          onValueChange={setAffirmationCount}
                        >
                          <SelectTrigger id="affirmation-count" className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                            <SelectValue placeholder="Number of affirmations" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                            <SelectItem value="3">3 Affirmations</SelectItem>
                            <SelectItem value="5">5 Affirmations</SelectItem>
                            <SelectItem value="7">7 Affirmations</SelectItem>
                            <SelectItem value="10">10 Affirmations</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="affirmation-mood" className="text-[#FAF3E0]">Mood</Label>
                        <Select
                          value={affirmationMood}
                          onValueChange={setAffirmationMood}
                        >
                          <SelectTrigger id="affirmation-mood" className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                            <SelectItem value="positive">Positive</SelectItem>
                            <SelectItem value="empowering">Empowering</SelectItem>
                            <SelectItem value="calming">Calming</SelectItem>
                            <SelectItem value="motivational">Motivational</SelectItem>
                            <SelectItem value="healing">Healing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      onClick={() => affirmationsMutation.mutate()}
                      disabled={affirmationsMutation.isPending || !affirmationTheme}
                      className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                    >
                      {affirmationsMutation.isPending ? (
                        <>
                          <FaSpinner className="mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FaStar className="mr-2" />
                          Generate Affirmations
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                {/* Content Brief Tab */}
                <TabsContent value="content-brief" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content-type" className="text-[#FAF3E0]">Content Type</Label>
                      <Select
                        value={contentType}
                        onValueChange={setContentType}
                      >
                        <SelectTrigger id="content-type" className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectItem value="blog post">Blog Post</SelectItem>
                          <SelectItem value="ebook">eBook</SelectItem>
                          <SelectItem value="social media post">Social Media Post</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content-theme" className="text-[#FAF3E0]">Theme/Topic</Label>
                      <Input
                        id="content-theme"
                        value={contentTheme}
                        onChange={(e) => setContentTheme(e.target.value)}
                        placeholder="Enter the main theme or topic"
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additional-context" className="text-[#FAF3E0]">Additional Context (Optional)</Label>
                      <Textarea
                        id="additional-context"
                        value={additionalContext}
                        onChange={(e) => setAdditionalContext(e.target.value)}
                        placeholder="Enter any additional context or specific requirements"
                        rows={3}
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <Button
                      onClick={() => contentBriefMutation.mutate()}
                      disabled={contentBriefMutation.isPending || !contentTheme}
                      className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                    >
                      {contentBriefMutation.isPending ? (
                        <>
                          <FaSpinner className="mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FaFileAlt className="mr-2" />
                          Generate Content Brief
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                {/* Product Description Tab */}
                <TabsContent value="product" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-type" className="text-[#FAF3E0]">Product Type</Label>
                      <Select
                        value={productType}
                        onValueChange={setProductType}
                      >
                        <SelectTrigger id="product-type" className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectItem value="digital workbook">Digital Workbook</SelectItem>
                          <SelectItem value="printable planner">Printable Planner</SelectItem>
                          <SelectItem value="ebook">eBook</SelectItem>
                          <SelectItem value="online course">Online Course</SelectItem>
                          <SelectItem value="tarot deck">Tarot Deck</SelectItem>
                          <SelectItem value="meditation audio">Meditation Audio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-title" className="text-[#FAF3E0]">Product Title</Label>
                      <Input
                        id="product-title"
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        placeholder="Enter product title"
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-features" className="text-[#FAF3E0]">Features (comma-separated)</Label>
                      <Textarea
                        id="product-features"
                        value={productFeatures}
                        onChange={(e) => setProductFeatures(e.target.value)}
                        placeholder="Enter key features, separated by commas"
                        rows={2}
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-audience" className="text-[#FAF3E0]">Target Audience</Label>
                      <Input
                        id="target-audience"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="Describe your target audience"
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <Button
                      onClick={() => productDescriptionMutation.mutate()}
                      disabled={productDescriptionMutation.isPending || !productTitle || !productFeatures}
                      className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                    >
                      {productDescriptionMutation.isPending ? (
                        <>
                          <FaSpinner className="mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FaShoppingBag className="mr-2" />
                          Generate Product Description
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                {/* Image Prompts Tab */}
                <TabsContent value="image-prompts" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-subject" className="text-[#FAF3E0]">Image Subject</Label>
                      <Input
                        id="image-subject"
                        value={imageSubject}
                        onChange={(e) => setImageSubject(e.target.value)}
                        placeholder="Describe the subject of your image"
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image-style" className="text-[#FAF3E0]">Style</Label>
                      <Select
                        value={imageStyle}
                        onValueChange={setImageStyle}
                      >
                        <SelectTrigger id="image-style" className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectValue placeholder="Select art style" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectItem value="mystical">Mystical</SelectItem>
                          <SelectItem value="vintage">Vintage</SelectItem>
                          <SelectItem value="watercolor">Watercolor</SelectItem>
                          <SelectItem value="ethereal">Ethereal</SelectItem>
                          <SelectItem value="botanical">Botanical</SelectItem>
                          <SelectItem value="art nouveau">Art Nouveau</SelectItem>
                          <SelectItem value="dark fantasy">Dark Fantasy</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => imagePromptsMutation.mutate()}
                      disabled={imagePromptsMutation.isPending || !imageSubject}
                      className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                    >
                      {imagePromptsMutation.isPending ? (
                        <>
                          <FaSpinner className="mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FaImage className="mr-2" />
                          Generate Image Prompts
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                {/* Worksheet Tab */}
                <TabsContent value="worksheet" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="worksheet-topic" className="text-[#FAF3E0]">Topic</Label>
                      <Input
                        id="worksheet-topic"
                        value={worksheetTopic}
                        onChange={(e) => setWorksheetTopic(e.target.value)}
                        placeholder="Enter worksheet topic"
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="worksheet-purpose" className="text-[#FAF3E0]">Purpose</Label>
                      <Textarea
                        id="worksheet-purpose"
                        value={worksheetPurpose}
                        onChange={(e) => setWorksheetPurpose(e.target.value)}
                        placeholder="Describe the purpose of this worksheet"
                        rows={3}
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <Button
                      onClick={() => worksheetMutation.mutate()}
                      disabled={worksheetMutation.isPending || !worksheetTopic || !worksheetPurpose}
                      className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                    >
                      {worksheetMutation.isPending ? (
                        <>
                          <FaSpinner className="mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FaClipboardList className="mr-2" />
                          Generate Worksheet Structure
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                {/* Moon Phase Tab */}
                <TabsContent value="moon-phase" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="moon-phase" className="text-[#FAF3E0]">Moon Phase</Label>
                      <Select
                        value={moonPhase}
                        onValueChange={setMoonPhase}
                      >
                        <SelectTrigger id="moon-phase" className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectValue placeholder="Select moon phase" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectItem value="New Moon">New Moon</SelectItem>
                          <SelectItem value="Waxing Crescent">Waxing Crescent</SelectItem>
                          <SelectItem value="First Quarter">First Quarter</SelectItem>
                          <SelectItem value="Waxing Gibbous">Waxing Gibbous</SelectItem>
                          <SelectItem value="Full Moon">Full Moon</SelectItem>
                          <SelectItem value="Waning Gibbous">Waning Gibbous</SelectItem>
                          <SelectItem value="Last Quarter">Last Quarter</SelectItem>
                          <SelectItem value="Waning Crescent">Waning Crescent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => moonPhaseContentMutation.mutate()}
                      disabled={moonPhaseContentMutation.isPending}
                      className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                    >
                      {moonPhaseContentMutation.isPending ? (
                        <>
                          <FaSpinner className="mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FaMoon className="mr-2" />
                          Generate Content Ideas
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Output Display Section */}
          <Card className="bg-[#0A192F] border-[#A3B18A]/30 shadow-lg">
            <CardHeader className="border-b border-[#A3B18A]/20">
              <CardTitle className="text-[#D4AF37] flex items-center">
                <FaFeather className="mr-2" /> Generated Content
              </CardTitle>
              <CardDescription className="text-[#FAF3E0]">
                Your AI-generated content will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px] overflow-y-auto bg-[#0A192F]/50 border border-[#A3B18A]/20 rounded-md p-4">
                {generatedContent ? (
                  <div className="whitespace-pre-line text-[#FAF3E0]">
                    {generatedContent}
                  </div>
                ) : generatedJSON ? (
                  renderJSONContent(generatedJSON)
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#A3B18A]">
                    <FaMagic className="text-3xl mb-4" />
                    <p>Generate content using the options on the left</p>
                    <p className="text-xs mt-2">Content will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#A3B18A]/20 pt-4 flex justify-between">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                disabled={!generatedContent && !generatedJSON}
                className="text-[#A3B18A] border-[#A3B18A] hover:bg-[#A3B18A] hover:text-[#0A192F]"
              >
                <FaClipboard className="mr-2" /> Copy to Clipboard
              </Button>
              <Button
                onClick={createNotionPage}
                disabled={!generatedContent && !generatedJSON}
                className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
              >
                <FaDatabase className="mr-2" /> Save to Notion
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIContentGenerator;