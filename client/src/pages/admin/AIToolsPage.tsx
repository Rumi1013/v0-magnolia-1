import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  Sparkles, 
  MessageSquare, 
  Image, 
  FileText, 
  Music, 
  Brain, 
  DownloadCloud, 
  RefreshCw,
  ScanText,
  BadgeCheck,
  BadgeX
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

// AI Tool Categories
const categories = [
  { id: 'text', name: 'Text Generation', icon: MessageSquare },
  { id: 'image', name: 'Image Creation', icon: Image },
  { id: 'tarot', name: 'Tarot Reading', icon: Sparkles },
  { id: 'audio', name: 'Audio Generation', icon: Music },
  { id: 'content-brief', name: 'Content Briefs', icon: FileText },
  { id: 'analysis', name: 'Content Analysis', icon: Brain }
];

// Available AI Models
const availableModels = {
  text: [
    { id: 'claude-3-7-sonnet-20250219', name: 'Claude 3.7 Sonnet', provider: 'Anthropic' },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI' },
  ],
  image: [
    { id: 'ideogram-api', name: 'Ideogram API', provider: 'Ideogram' },
    { id: 'sdxl', name: 'Stable Diffusion XL', provider: 'Replicate' },
  ],
  tarot: [
    { id: 'claude-tarot', name: 'Claude Tarot', provider: 'Anthropic' },
    { id: 'llama-tarot', name: 'Llama 2 Tarot', provider: 'Replicate' },
  ],
  audio: [
    { id: 'musicgen', name: 'MusicGen', provider: 'Replicate' },
  ],
  'content-brief': [
    { id: 'claude-brief', name: 'Claude Content Brief', provider: 'Anthropic' },
    { id: 'gpt-brief', name: 'GPT Content Brief', provider: 'OpenAI' },
  ],
  analysis: [
    { id: 'claude-sentiment', name: 'Claude Sentiment Analysis', provider: 'Anthropic' },
    { id: 'gpt-analysis', name: 'GPT Content Analysis', provider: 'OpenAI' },
  ]
};

// Content type templates for the text generation tab
const contentTypes = [
  { id: 'affirmation', name: 'Affirmation Card', description: 'Create a powerful, poetic affirmation with Southern Gothic aesthetic' },
  { id: 'tarotReading', name: 'Tarot Reading', description: 'Generate a tarot card interpretation with mystical imagery' },
  { id: 'journalPrompt', name: 'Journal Prompt', description: 'Create a thought-provoking journal prompt for self-reflection' },
  { id: 'ritualDescription', name: 'Ritual Description', description: 'Describe a ritual practice with steps and spiritual meaning' },
  { id: 'productDescription', name: 'Product Description', description: 'Write an enchanting description for a spiritual product' },
];

const AIToolsPage: React.FC = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('text');
  
  // Content generation states
  const [contentType, setContentType] = useState('affirmation');
  const [selectedModel, setSelectedModel] = useState('claude-3-7-sonnet-20250219');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [savedContents, setSavedContents] = useState<Array<{id: string, content: string, type: string}>>([]);
  
  // Image generation states
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStyle, setImageStyle] = useState('vintage');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');

  // Tarot reading states
  const [question, setQuestion] = useState('');
  const [spreadType, setSpreadType] = useState('three-card');
  const [tarotReading, setTarotReading] = useState('');

  // Content brief states
  const [briefContentType, setBriefContentType] = useState('journal');
  const [primaryTheme, setPrimaryTheme] = useState('');
  const [secondaryThemes, setSecondaryThemes] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [generatedBrief, setGeneratedBrief] = useState('');

  // Analysis states
  const [analysisText, setAnalysisText] = useState('');
  const [analysisFeedback, setAnalysisFeedback] = useState<any>(null);

  // Text generation mutation
  const generateContentMutation = useMutation({
    mutationFn: (data: { prompt: string; contentType: string; model: string }) =>
      apiRequest('POST', '/api/ai/generate-content', data),
    onSuccess: (data) => {
      setGeneratedContent(data.content);
      toast({
        title: 'Content generated',
        description: 'Your content has been generated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Generation failed',
        description: error.message || 'Failed to generate content',
        variant: 'destructive',
      });
    },
  });

  // Image generation mutation
  const generateImageMutation = useMutation({
    mutationFn: (data: { prompt: string; style: string; aspectRatio: string }) =>
      apiRequest('POST', '/api/ai/generate-image', data),
    onSuccess: (data) => {
      setGeneratedImageUrl(data.imageUrl);
      toast({
        title: 'Image generated',
        description: 'Your image has been generated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Image generation failed',
        description: error.message || 'Failed to generate image',
        variant: 'destructive',
      });
    },
  });

  // Tarot reading mutation
  const generateTarotMutation = useMutation({
    mutationFn: (data: { question: string; spread: string }) =>
      apiRequest('POST', '/api/ai/generate-tarot', data),
    onSuccess: (data) => {
      setTarotReading(data.reading);
      toast({
        title: 'Tarot reading generated',
        description: 'Your tarot reading has been generated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Tarot reading failed',
        description: error.message || 'Failed to generate tarot reading',
        variant: 'destructive',
      });
    },
  });

  // Content brief mutation
  const generateBriefMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest('POST', '/api/ai/generate-brief', data),
    onSuccess: (data) => {
      setGeneratedBrief(data.brief);
      toast({
        title: 'Content brief generated',
        description: 'Your content brief has been generated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Brief generation failed',
        description: error.message || 'Failed to generate content brief',
        variant: 'destructive',
      });
    },
  });

  // Analysis mutation
  const analyzeContentMutation = useMutation({
    mutationFn: (data: { text: string }) =>
      apiRequest('POST', '/api/ai/analyze-sentiment', data),
    onSuccess: (data) => {
      setAnalysisFeedback(data);
      toast({
        title: 'Analysis complete',
        description: 'Your content has been analyzed successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Analysis failed',
        description: error.message || 'Failed to analyze content',
        variant: 'destructive',
      });
    },
  });

  // Handle content generation
  const handleGenerateContent = () => {
    if (!prompt) {
      toast({
        title: 'Input required',
        description: 'Please enter a prompt to generate content',
        variant: 'destructive',
      });
      return;
    }

    generateContentMutation.mutate({
      prompt,
      contentType,
      model: selectedModel
    });
  };

  // Handle image generation
  const handleGenerateImage = () => {
    if (!imagePrompt) {
      toast({
        title: 'Input required',
        description: 'Please enter a prompt to generate an image',
        variant: 'destructive',
      });
      return;
    }

    generateImageMutation.mutate({
      prompt: imagePrompt,
      style: imageStyle,
      aspectRatio
    });
  };

  // Handle tarot reading generation
  const handleGenerateTarot = () => {
    if (!question) {
      toast({
        title: 'Input required',
        description: 'Please enter a question for your tarot reading',
        variant: 'destructive',
      });
      return;
    }

    generateTarotMutation.mutate({
      question,
      spread: spreadType
    });
  };

  // Handle content brief generation
  const handleGenerateBrief = () => {
    if (!primaryTheme) {
      toast({
        title: 'Input required',
        description: 'Please enter a primary theme for your content brief',
        variant: 'destructive',
      });
      return;
    }

    generateBriefMutation.mutate({
      contentType: briefContentType,
      primaryTheme,
      secondaryThemes,
      targetAudience
    });
  };

  // Handle content analysis
  const handleAnalyzeContent = () => {
    if (!analysisText) {
      toast({
        title: 'Input required',
        description: 'Please enter text to analyze',
        variant: 'destructive',
      });
      return;
    }

    analyzeContentMutation.mutate({
      text: analysisText
    });
  };

  // Handle saving generated content
  const handleSaveContent = () => {
    if (!generatedContent) return;
    
    const contentItem = {
      id: Date.now().toString(),
      content: generatedContent,
      type: contentType
    };
    
    setSavedContents([...savedContents, contentItem]);
    setGeneratedContent('');
    setPrompt('');
    
    toast({
      title: 'Content saved',
      description: 'Your generated content has been saved to your library',
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-playfair text-[#D4AF37] mb-2">AI Content Tools</h1>
          <p className="text-[#FAF3E0] opacity-80 font-lora">
            Leverage AI to generate content for your Midnight Magnolia Patreon tiers.
          </p>
        </div>
        
        <Tabs defaultValue="text" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-[#0A192F]/50">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-[#FAF3E0] data-[state=active]:text-[#D4AF37] data-[state=active]:bg-[#0A192F]/70"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Text Generation Tab */}
          <TabsContent value="text" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Text Generation</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Generate beautiful, on-brand content for your Patreon tiers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contentType">Content Type</Label>
                    <Select 
                      value={contentType} 
                      onValueChange={setContentType}
                    >
                      <SelectTrigger className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#051224] border-[#A3B18A]/30">
                        {contentTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-[#FAF3E0]/60">
                      {contentTypes.find(type => type.id === contentType)?.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="model">AI Model</Label>
                    <Select 
                      value={selectedModel} 
                      onValueChange={setSelectedModel}
                    >
                      <SelectTrigger className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#051224] border-[#A3B18A]/30">
                        {availableModels.text.map(model => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.provider})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Your Prompt</Label>
                    <Textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Enter your content prompt here..."
                      className="min-h-[120px] bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleGenerateContent}
                    disabled={generateContentMutation.isPending || !prompt}
                    className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90"
                  >
                    {generateContentMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    Generate Content
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Generated Content</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Your AI-generated content will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generateContentMutation.isPending ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/70">Generating content...</p>
                      </div>
                    </div>
                  ) : generatedContent ? (
                    <div className="bg-[#051224] rounded-md p-4 min-h-[200px] border border-[#A3B18A]/20">
                      <p className="text-[#FAF3E0] whitespace-pre-line font-lora">{generatedContent}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center min-h-[200px] border border-dashed border-[#A3B18A]/30 rounded-md">
                      <div className="text-center p-4">
                        <MessageSquare className="h-10 w-10 text-[#A3B18A]/40 mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/40">Generated content will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setGeneratedContent('')}
                    disabled={!generatedContent}
                    className="border-[#A3B18A]/50 text-[#A3B18A]"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    onClick={handleSaveContent}
                    disabled={!generatedContent}
                    className="bg-[#A3B18A] text-[#0A192F] hover:bg-[#A3B18A]/90"
                  >
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Save to Library
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Image Generation Tab */}
          <TabsContent value="image" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Image Generation</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Create beautiful visuals with your brand aesthetic
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="imagePrompt">Image Description</Label>
                    <Textarea
                      id="imagePrompt"
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Describe the image you want to create..."
                      className="min-h-[120px] bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="imageStyle">Style</Label>
                    <Select 
                      value={imageStyle} 
                      onValueChange={setImageStyle}
                    >
                      <SelectTrigger className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectItem value="vintage">Vintage</SelectItem>
                        <SelectItem value="dark_fantasy">Dark Fantasy</SelectItem>
                        <SelectItem value="art_deco">Art Deco</SelectItem>
                        <SelectItem value="southern_gothic">Southern Gothic</SelectItem>
                        <SelectItem value="mystical">Mystical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                    <Select 
                      value={aspectRatio} 
                      onValueChange={setAspectRatio}
                    >
                      <SelectTrigger className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectValue placeholder="Select aspect ratio" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectItem value="1:1">Square (1:1)</SelectItem>
                        <SelectItem value="3:4">Portrait (3:4)</SelectItem>
                        <SelectItem value="4:3">Landscape (4:3)</SelectItem>
                        <SelectItem value="9:16">Mobile (9:16)</SelectItem>
                        <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleGenerateImage}
                    disabled={generateImageMutation.isPending || !imagePrompt}
                    className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90"
                  >
                    {generateImageMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Image className="h-4 w-4 mr-2" />
                    )}
                    Generate Image
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Generated Image</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Your AI-generated image will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generateImageMutation.isPending ? (
                    <div className="flex justify-center items-center aspect-square bg-[#051224] rounded-md">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/70">Generating image...</p>
                      </div>
                    </div>
                  ) : generatedImageUrl ? (
                    <div className="relative aspect-square bg-[#051224] rounded-md overflow-hidden">
                      <img 
                        src={generatedImageUrl} 
                        alt="Generated artwork" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center aspect-square border border-dashed border-[#A3B18A]/30 rounded-md">
                      <div className="text-center p-4">
                        <Image className="h-10 w-10 text-[#A3B18A]/40 mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/40">Generated image will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setGeneratedImageUrl('')}
                    disabled={!generatedImageUrl}
                    className="border-[#A3B18A]/50 text-[#A3B18A]"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  {generatedImageUrl && (
                    <Button
                      onClick={() => window.open(generatedImageUrl, '_blank')}
                      className="bg-[#A3B18A] text-[#0A192F] hover:bg-[#A3B18A]/90"
                    >
                      <DownloadCloud className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Tarot Reading Tab */}
          <TabsContent value="tarot" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Tarot Reading Generator</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Create detailed tarot card readings with your Southern Gothic aesthetic
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Question or Focus</Label>
                    <Textarea
                      id="question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="What question would you like to explore in this reading?"
                      className="min-h-[120px] bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="spreadType">Spread Type</Label>
                    <Select 
                      value={spreadType} 
                      onValueChange={setSpreadType}
                    >
                      <SelectTrigger className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectValue placeholder="Select spread type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectItem value="single-card">Single Card</SelectItem>
                        <SelectItem value="three-card">Three Card Spread</SelectItem>
                        <SelectItem value="celtic-cross">Celtic Cross (10 cards)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleGenerateTarot}
                    disabled={generateTarotMutation.isPending || !question}
                    className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90"
                  >
                    {generateTarotMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    Generate Tarot Reading
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Tarot Reading</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Your generated tarot reading will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generateTarotMutation.isPending ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/70">Generating tarot reading...</p>
                      </div>
                    </div>
                  ) : tarotReading ? (
                    <div className="bg-[#051224] rounded-md p-4 min-h-[300px] border border-[#A3B18A]/20 overflow-auto max-h-[500px]">
                      <p className="text-[#FAF3E0] whitespace-pre-line font-lora">{tarotReading}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center min-h-[300px] border border-dashed border-[#A3B18A]/30 rounded-md">
                      <div className="text-center p-4">
                        <Sparkles className="h-10 w-10 text-[#A3B18A]/40 mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/40">Your tarot reading will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setTarotReading('')}
                    disabled={!tarotReading}
                    className="border-[#A3B18A]/50 text-[#A3B18A]"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    disabled={!tarotReading}
                    className="bg-[#A3B18A] text-[#0A192F] hover:bg-[#A3B18A]/90"
                  >
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Save to Library
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Content Brief Tab */}
          <TabsContent value="content-brief" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Content Brief Generator</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Create detailed content briefs for your content creation process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="briefContentType">Content Type</Label>
                    <Select 
                      value={briefContentType} 
                      onValueChange={setBriefContentType}
                    >
                      <SelectTrigger className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectItem value="journal">Journal Prompts</SelectItem>
                        <SelectItem value="affirmation">Affirmation Cards</SelectItem>
                        <SelectItem value="ritual">Ritual Guide</SelectItem>
                        <SelectItem value="newsletter">Patron Newsletter</SelectItem>
                        <SelectItem value="product">Product Description</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primaryTheme">Primary Theme</Label>
                    <Input
                      id="primaryTheme"
                      value={primaryTheme}
                      onChange={(e) => setPrimaryTheme(e.target.value)}
                      placeholder="Main theme of the content"
                      className="bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryThemes">Secondary Themes (Optional)</Label>
                    <Input
                      id="secondaryThemes"
                      value={secondaryThemes}
                      onChange={(e) => setSecondaryThemes(e.target.value)}
                      placeholder="Related themes, comma separated"
                      className="bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
                    <Input
                      id="targetAudience"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="Who is this content for?"
                      className="bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleGenerateBrief}
                    disabled={generateBriefMutation.isPending || !primaryTheme}
                    className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90"
                  >
                    {generateBriefMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4 mr-2" />
                    )}
                    Generate Content Brief
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Generated Brief</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Your content brief will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generateBriefMutation.isPending ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/70">Generating content brief...</p>
                      </div>
                    </div>
                  ) : generatedBrief ? (
                    <div className="bg-[#051224] rounded-md p-4 min-h-[300px] border border-[#A3B18A]/20 overflow-auto max-h-[500px]">
                      <p className="text-[#FAF3E0] whitespace-pre-line font-lora">{generatedBrief}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center min-h-[300px] border border-dashed border-[#A3B18A]/30 rounded-md">
                      <div className="text-center p-4">
                        <FileText className="h-10 w-10 text-[#A3B18A]/40 mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/40">Your content brief will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setGeneratedBrief('')}
                    disabled={!generatedBrief}
                    className="border-[#A3B18A]/50 text-[#A3B18A]"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    disabled={!generatedBrief}
                    className="bg-[#A3B18A] text-[#0A192F] hover:bg-[#A3B18A]/90"
                  >
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Save to Notion
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Content Analysis</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Analyze content sentiment, tone, and engagement potential
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="analysisText">Content to Analyze</Label>
                    <Textarea
                      id="analysisText"
                      value={analysisText}
                      onChange={(e) => setAnalysisText(e.target.value)}
                      placeholder="Paste your content here for analysis..."
                      className="min-h-[300px] bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleAnalyzeContent}
                    disabled={analyzeContentMutation.isPending || !analysisText}
                    className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90"
                  >
                    {analyzeContentMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <ScanText className="h-4 w-4 mr-2" />
                    )}
                    Analyze Content
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Analysis Results</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    AI-powered content analysis results will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analyzeContentMutation.isPending ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/70">Analyzing content...</p>
                      </div>
                    </div>
                  ) : analysisFeedback ? (
                    <div className="bg-[#051224] rounded-md p-4 min-h-[300px] border border-[#A3B18A]/20">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-[#D4AF37] font-medium mb-2 flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${
                              analysisFeedback.sentiment === 'positive' ? 'bg-green-500' :
                              analysisFeedback.sentiment === 'negative' ? 'bg-red-500' :
                              'bg-yellow-500'
                            }`}></div>
                            Overall Sentiment: {analysisFeedback.sentiment.charAt(0).toUpperCase() + analysisFeedback.sentiment.slice(1)}
                          </h3>
                          <div className="w-full bg-[#0A192F] rounded-full h-2">
                            <div 
                              className="bg-[#D4AF37] h-2 rounded-full" 
                              style={{ width: `${analysisFeedback.confidence * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-[#FAF3E0]/70 text-sm mt-1">
                            Confidence: {Math.round(analysisFeedback.confidence * 100)}%
                          </p>
                        </div>
                        
                        <Separator className="bg-[#A3B18A]/20" />
                        
                        <div>
                          <h3 className="text-[#D4AF37] font-medium mb-2">Detected Tones</h3>
                          <div className="flex flex-wrap gap-2">
                            {analysisFeedback.tone?.map((tone: string, index: number) => (
                              <Badge 
                                key={index}
                                className="bg-[#0A3B4D] text-[#FAF3E0] hover:bg-[#0A3B4D]"
                              >
                                {tone}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Separator className="bg-[#A3B18A]/20" />
                        
                        <div>
                          <h3 className="text-[#D4AF37] font-medium mb-2">Key Highlights</h3>
                          <ul className="space-y-2">
                            {analysisFeedback.highlights?.map((highlight: string, index: number) => (
                              <li key={index} className="text-[#FAF3E0] flex items-start gap-2">
                                <span className="text-[#A3B18A]">•</span>
                                <span>"{highlight}"</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Separator className="bg-[#A3B18A]/20" />
                        
                        <div>
                          <h3 className="text-[#D4AF37] font-medium mb-2">Summary</h3>
                          <p className="text-[#FAF3E0]">
                            {analysisFeedback.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center min-h-[300px] border border-dashed border-[#A3B18A]/30 rounded-md">
                      <div className="text-center p-4">
                        <Brain className="h-10 w-10 text-[#A3B18A]/40 mx-auto mb-2" />
                        <p className="text-[#FAF3E0]/40">Analysis results will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setAnalysisFeedback(null)}
                    disabled={!analysisFeedback}
                    className="border-[#A3B18A]/50 text-[#A3B18A]"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    disabled={!analysisFeedback}
                    className="bg-[#A3B18A] text-[#0A192F] hover:bg-[#A3B18A]/90"
                  >
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Audio Generation Tab */}
          <TabsContent value="audio" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Audio Generation</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Create ambient music and guided meditations for your content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="audioPrompt">Audio Description</Label>
                    <Textarea
                      id="audioPrompt"
                      placeholder="Describe the audio atmosphere you want to create..."
                      className="min-h-[120px] bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audioDuration">Duration</Label>
                    <Select defaultValue="8">
                      <SelectTrigger className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#051224] border-[#A3B18A]/30">
                        <SelectItem value="4">4 seconds</SelectItem>
                        <SelectItem value="8">8 seconds</SelectItem>
                        <SelectItem value="12">12 seconds</SelectItem>
                        <SelectItem value="16">16 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-[#FAF3E0]/60">
                      Note: Generated audio can be looped for longer durations
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    disabled
                    className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90"
                  >
                    <Music className="h-4 w-4 mr-2" />
                    Generate Audio
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Generated Audio</CardTitle>
                  <CardDescription className="text-[#FAF3E0]/70">
                    Your AI-generated audio will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center min-h-[300px] border border-dashed border-[#A3B18A]/30 rounded-md">
                    <div className="text-center p-4">
                      <Music className="h-10 w-10 text-[#A3B18A]/40 mx-auto mb-2" />
                      <p className="text-[#FAF3E0]/40">Generated audio will appear here</p>
                      <p className="text-[#FAF3E0]/60 text-sm mt-2">Coming soon</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    disabled
                    className="border-[#A3B18A]/50 text-[#A3B18A]"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    disabled
                    className="bg-[#A3B18A] text-[#0A192F] hover:bg-[#A3B18A]/90"
                  >
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {activeCategory === 'text' && savedContents.length > 0 && (
          <Card className="bg-[#0A192F] border border-[#A3B18A]/30 mt-8">
            <CardHeader>
              <CardTitle className="text-[#D4AF37]">Saved Content Library</CardTitle>
              <CardDescription className="text-[#FAF3E0]/70">
                Your previously generated and saved content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedContents.map((item) => (
                  <div key={item.id} className="bg-[#051224] rounded-md p-4 border border-[#A3B18A]/20">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-[#0A3B4D] text-[#FAF3E0] hover:bg-[#0A3B4D]">
                        {contentTypes.find(type => type.id === item.type)?.name || item.type}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-[#A3B18A] h-6 w-6 p-0">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-[#FAF3E0] whitespace-pre-line font-lora">{item.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIToolsPage;