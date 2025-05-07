import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, BookOpen, Feather, Wand2, Moon, Calendar, Sparkles } from 'lucide-react';

type ContentType = 'tarot-reading' | 'affirmations' | 'content-brief' | 'product-description' | 'image-prompts' | 'worksheet' | 'moon-phase';

interface ContentRequest {
  // Common properties
  type: ContentType;
  
  // Tarot reading
  cardName?: string;
  queryType?: 'general' | 'love' | 'career' | 'spiritual';
  
  // Affirmations
  theme?: string;
  count?: number;
  mood?: string;
  
  // Content brief
  contentType?: string;
  additionalContext?: string;
  
  // Product description
  productType?: string;
  title?: string;
  features?: string[];
  targetAudience?: string;
  
  // Image prompts
  subject?: string;
  style?: string;
  
  // Worksheet
  topic?: string;
  purpose?: string;
  
  // Moon phase
  phase?: string;
}

export function AIContentGenerator() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ContentType>('tarot-reading');
  const [generatedContent, setGeneratedContent] = useState<string | any>('');
  const [isContentGenerated, setIsContentGenerated] = useState(false);
  
  // Tarot reading state
  const [cardName, setCardName] = useState('');
  const [queryType, setQueryType] = useState<'general' | 'love' | 'career' | 'spiritual'>('general');
  
  // Affirmations state
  const [affirmationTheme, setAffirmationTheme] = useState('');
  const [affirmationCount, setAffirmationCount] = useState('5');
  const [affirmationMood, setAffirmationMood] = useState('positive');
  
  // Content brief state
  const [briefContentType, setBriefContentType] = useState('');
  const [briefTheme, setBriefTheme] = useState('');
  const [briefContext, setBriefContext] = useState('');
  
  // Product description state
  const [productType, setProductType] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productFeatures, setProductFeatures] = useState('');
  const [productAudience, setProductAudience] = useState('');
  
  // Image prompts state
  const [imageSubject, setImageSubject] = useState('');
  const [imageStyle, setImageStyle] = useState('Southern Gothic');
  
  // Worksheet state
  const [worksheetTopic, setWorksheetTopic] = useState('');
  const [worksheetPurpose, setWorksheetPurpose] = useState('');
  
  // Moon phase state
  const [moonPhase, setMoonPhase] = useState('');
  const [moonContentType, setMoonContentType] = useState('general');

  const generateContentMutation = useMutation({
    mutationFn: async (request: ContentRequest) => {
      let endpoint = '';
      let payload = {};
      
      switch (request.type) {
        case 'tarot-reading':
          endpoint = '/api/openai/tarot-reading';
          payload = { 
            cardName: request.cardName,
            queryType: request.queryType
          };
          break;
        case 'affirmations':
          endpoint = '/api/openai/affirmations';
          payload = { 
            theme: request.theme,
            count: request.count ? parseInt(request.count.toString()) : 5,
            mood: request.mood
          };
          break;
        case 'content-brief':
          endpoint = '/api/openai/content-brief';
          payload = { 
            contentType: request.contentType,
            theme: request.theme,
            additionalContext: request.additionalContext
          };
          break;
        case 'product-description':
          endpoint = '/api/openai/product-description';
          payload = { 
            productType: request.productType,
            title: request.title,
            features: request.features,
            targetAudience: request.targetAudience
          };
          break;
        case 'image-prompts':
          endpoint = '/api/openai/image-prompts';
          payload = { 
            subject: request.subject,
            style: request.style,
            count: 3
          };
          break;
        case 'worksheet':
          endpoint = '/api/openai/worksheet';
          payload = { 
            topic: request.topic,
            purpose: request.purpose
          };
          break;
        case 'moon-phase':
          endpoint = '/api/openai/moon-phase-content';
          payload = { 
            phase: request.phase,
            contentType: request.contentType || 'general'
          };
          break;
      }
      
      const response = await apiRequest('POST', endpoint, payload);
      return response.json();
    },
    onSuccess: (data) => {
      if (activeTab === 'tarot-reading') {
        setGeneratedContent(data.reading || '');
      } else if (activeTab === 'affirmations') {
        setGeneratedContent(data.affirmations || []);
      } else if (activeTab === 'content-brief') {
        setGeneratedContent(data.brief || {});
      } else if (activeTab === 'product-description') {
        setGeneratedContent(data.description || '');
      } else if (activeTab === 'image-prompts') {
        setGeneratedContent(data.prompts || []);
      } else if (activeTab === 'worksheet') {
        setGeneratedContent(data.worksheet || {});
      } else if (activeTab === 'moon-phase') {
        setGeneratedContent(data.content || {});
      }
      
      setIsContentGenerated(true);
      toast({
        title: 'Content generated successfully!',
        description: 'Your request has been processed.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error generating content',
        description: error.message || 'An error occurred while generating content',
        variant: 'destructive',
      });
    },
  });

  const handleGenerate = () => {
    const request: ContentRequest = { type: activeTab };
    
    switch (activeTab) {
      case 'tarot-reading':
        if (!cardName) {
          toast({
            title: 'Card name required',
            description: 'Please enter a tarot card name',
            variant: 'destructive',
          });
          return;
        }
        request.cardName = cardName;
        request.queryType = queryType;
        break;
      case 'affirmations':
        if (!affirmationTheme) {
          toast({
            title: 'Theme required',
            description: 'Please enter an affirmation theme',
            variant: 'destructive',
          });
          return;
        }
        request.theme = affirmationTheme;
        request.count = parseInt(affirmationCount);
        request.mood = affirmationMood;
        break;
      case 'content-brief':
        if (!briefContentType || !briefTheme) {
          toast({
            title: 'Required fields missing',
            description: 'Please enter both content type and theme',
            variant: 'destructive',
          });
          return;
        }
        request.contentType = briefContentType;
        request.theme = briefTheme;
        request.additionalContext = briefContext;
        break;
      case 'product-description':
        if (!productType || !productTitle || !productAudience) {
          toast({
            title: 'Required fields missing',
            description: 'Please fill in product type, title, and target audience',
            variant: 'destructive',
          });
          return;
        }
        request.productType = productType;
        request.title = productTitle;
        request.features = productFeatures.split(',').map(f => f.trim());
        request.targetAudience = productAudience;
        break;
      case 'image-prompts':
        if (!imageSubject) {
          toast({
            title: 'Subject required',
            description: 'Please enter an image subject',
            variant: 'destructive',
          });
          return;
        }
        request.subject = imageSubject;
        request.style = imageStyle;
        break;
      case 'worksheet':
        if (!worksheetTopic || !worksheetPurpose) {
          toast({
            title: 'Required fields missing',
            description: 'Please enter both topic and purpose',
            variant: 'destructive',
          });
          return;
        }
        request.topic = worksheetTopic;
        request.purpose = worksheetPurpose;
        break;
      case 'moon-phase':
        if (!moonPhase) {
          toast({
            title: 'Moon phase required',
            description: 'Please select a moon phase',
            variant: 'destructive',
          });
          return;
        }
        request.phase = moonPhase;
        request.contentType = moonContentType;
        break;
    }
    
    generateContentMutation.mutate(request);
  };

  const renderContentOutput = () => {
    if (generateContentMutation.isPending) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mb-4" />
          <p className="text-gray-600">Generating your content...</p>
        </div>
      );
    }

    if (!isContentGenerated) {
      return (
        <div className="p-8 text-center border border-dashed rounded-lg">
          <p className="text-gray-500">Your generated content will appear here</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'tarot-reading':
        return (
          <div className="p-6 bg-[#0A192F]/5 rounded-lg border border-[#A3B18A]/30">
            <h3 className="text-lg font-playfair text-[#0A192F] mb-4">Generated Tarot Reading</h3>
            <div className="whitespace-pre-line">{generatedContent}</div>
          </div>
        );
      case 'affirmations':
        return (
          <div className="p-6 bg-[#0A192F]/5 rounded-lg border border-[#A3B18A]/30">
            <h3 className="text-lg font-playfair text-[#0A192F] mb-4">Generated Affirmations</h3>
            {Array.isArray(generatedContent) && (
              <ol className="list-decimal list-inside space-y-2">
                {generatedContent.map((affirmation, index) => (
                  <li key={index} className="italic">{affirmation}</li>
                ))}
              </ol>
            )}
          </div>
        );
      case 'content-brief':
        return (
          <div className="p-6 bg-[#0A192F]/5 rounded-lg border border-[#A3B18A]/30">
            <h3 className="text-lg font-playfair text-[#0A192F] mb-4">Generated Content Brief</h3>
            {typeof generatedContent === 'object' && (
              <div className="space-y-4">
                {generatedContent.titleIdeas && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Title Ideas</h4>
                    <ul className="list-disc list-inside">
                      {Array.isArray(generatedContent.titleIdeas) 
                        ? generatedContent.titleIdeas.map((title, index) => <li key={index}>{title}</li>)
                        : <li>{generatedContent.titleIdeas}</li>
                      }
                    </ul>
                  </div>
                )}
                {generatedContent.keyPoints && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Key Points</h4>
                    <ul className="list-disc list-inside">
                      {Array.isArray(generatedContent.keyPoints)
                        ? generatedContent.keyPoints.map((point, index) => <li key={index}>{point}</li>)
                        : <li>{generatedContent.keyPoints}</li>
                      }
                    </ul>
                  </div>
                )}
                {generatedContent.structure && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Structure</h4>
                    <div className="pl-4">{generatedContent.structure}</div>
                  </div>
                )}
                {generatedContent.targetAudience && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Target Audience</h4>
                    <p>{generatedContent.targetAudience}</p>
                  </div>
                )}
                {generatedContent.keywords && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Keywords</h4>
                    <p>{generatedContent.keywords}</p>
                  </div>
                )}
                {generatedContent.tone && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Tone & Style</h4>
                    <p>{generatedContent.tone}</p>
                  </div>
                )}
                {generatedContent.recommendedLength && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Recommended Length</h4>
                    <p>{generatedContent.recommendedLength}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 'product-description':
        return (
          <div className="p-6 bg-[#0A192F]/5 rounded-lg border border-[#A3B18A]/30">
            <h3 className="text-lg font-playfair text-[#0A192F] mb-4">Generated Product Description</h3>
            <div className="whitespace-pre-line">{generatedContent}</div>
          </div>
        );
      case 'image-prompts':
        return (
          <div className="p-6 bg-[#0A192F]/5 rounded-lg border border-[#A3B18A]/30">
            <h3 className="text-lg font-playfair text-[#0A192F] mb-4">Generated Image Prompts</h3>
            {Array.isArray(generatedContent) && (
              <ol className="list-decimal list-inside space-y-4">
                {generatedContent.map((prompt, index) => (
                  <li key={index} className="text-sm">
                    <div className="mt-1 ml-5">{prompt}</div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        );
      case 'worksheet':
        return (
          <div className="p-6 bg-[#0A192F]/5 rounded-lg border border-[#A3B18A]/30">
            <h3 className="text-lg font-playfair text-[#0A192F] mb-4">Generated Worksheet Structure</h3>
            {typeof generatedContent === 'object' && (
              <div className="space-y-4">
                {generatedContent.title && (
                  <div>
                    <h4 className="font-bold text-xl text-[#0A192F]">{generatedContent.title}</h4>
                  </div>
                )}
                {generatedContent.introduction && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Introduction</h4>
                    <p>{generatedContent.introduction}</p>
                  </div>
                )}
                {generatedContent.exercises && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Exercises</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {Array.isArray(generatedContent.exercises) 
                        ? generatedContent.exercises.map((exercise, index) => (
                            <li key={index} className="font-medium mt-2">
                              {typeof exercise === 'object' ? (
                                <>
                                  {exercise.title}
                                  <p className="font-normal ml-5 mt-1">{exercise.instructions}</p>
                                </>
                              ) : exercise}
                            </li>
                          ))
                        : <li>{generatedContent.exercises}</li>
                      }
                    </ol>
                  </div>
                )}
                {generatedContent.reflection && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Reflection</h4>
                    <p>{generatedContent.reflection}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 'moon-phase':
        return (
          <div className="p-6 bg-[#0A192F]/5 rounded-lg border border-[#A3B18A]/30">
            <h3 className="text-lg font-playfair text-[#0A192F] mb-4">Generated Moon Phase Content</h3>
            {typeof generatedContent === 'object' && (
              <div className="space-y-4">
                {generatedContent.themes && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Content Themes</h4>
                    <ul className="list-disc list-inside">
                      {Array.isArray(generatedContent.themes) 
                        ? generatedContent.themes.map((theme, index) => <li key={index}>{theme}</li>)
                        : <li>{generatedContent.themes}</li>
                      }
                    </ul>
                  </div>
                )}
                {generatedContent.keywords && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Keywords & Phrases</h4>
                    <p>{Array.isArray(generatedContent.keywords) 
                        ? generatedContent.keywords.join(", ")
                        : generatedContent.keywords}</p>
                  </div>
                )}
                {generatedContent.activities && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Recommended Activities</h4>
                    <ul className="list-disc list-inside">
                      {Array.isArray(generatedContent.activities) 
                        ? generatedContent.activities.map((activity, index) => <li key={index}>{activity}</li>)
                        : <li>{generatedContent.activities}</li>
                      }
                    </ul>
                  </div>
                )}
                {generatedContent.formats && (
                  <div>
                    <h4 className="font-medium text-[#0A192F]">Content Formats</h4>
                    <ul className="list-disc list-inside">
                      {Array.isArray(generatedContent.formats) 
                        ? generatedContent.formats.map((format, index) => <li key={index}>{format}</li>)
                        : <li>{generatedContent.formats}</li>
                      }
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      default:
        return <div>No content generated yet</div>;
    }
  };

  return (
    <Card className="border-[#D4AF37]/20">
      <CardHeader className="border-b border-[#A3B18A]/20">
        <CardTitle className="text-xl font-playfair text-[#0A192F]">
          Digital Grimoire AI Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value as ContentType);
          setIsContentGenerated(false);
        }}>
          <TabsList className="grid grid-cols-4 md:grid-cols-7 mb-4">
            <TabsTrigger value="tarot-reading" className="text-xs">Tarot</TabsTrigger>
            <TabsTrigger value="affirmations" className="text-xs">Affirmations</TabsTrigger>
            <TabsTrigger value="content-brief" className="text-xs">Content Brief</TabsTrigger>
            <TabsTrigger value="product-description" className="text-xs">Product</TabsTrigger>
            <TabsTrigger value="image-prompts" className="text-xs">Images</TabsTrigger>
            <TabsTrigger value="worksheet" className="text-xs">Worksheet</TabsTrigger>
            <TabsTrigger value="moon-phase" className="text-xs">Moon Phase</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <TabsContent value="tarot-reading" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-name">Tarot Card Name</Label>
                    <Input 
                      id="card-name" 
                      placeholder="e.g. The High Priestess" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="query-type">Reading Type</Label>
                    <Select value={queryType} onValueChange={(value: 'general' | 'love' | 'career' | 'spiritual') => setQueryType(value)}>
                      <SelectTrigger id="query-type">
                        <SelectValue placeholder="Select reading type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="love">Love</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="spiritual">Spiritual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="affirmations" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="affirmation-theme">Theme</Label>
                    <Input 
                      id="affirmation-theme" 
                      placeholder="e.g. Self-Confidence, Healing, Abundance" 
                      value={affirmationTheme}
                      onChange={(e) => setAffirmationTheme(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="affirmation-count">Number of Affirmations</Label>
                      <Input 
                        id="affirmation-count" 
                        type="number" 
                        value={affirmationCount}
                        onChange={(e) => setAffirmationCount(e.target.value)}
                        min="1"
                        max="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="affirmation-mood">Mood</Label>
                      <Select value={affirmationMood} onValueChange={setAffirmationMood}>
                        <SelectTrigger id="affirmation-mood">
                          <SelectValue placeholder="Select mood" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="positive">Positive</SelectItem>
                          <SelectItem value="peaceful">Peaceful</SelectItem>
                          <SelectItem value="powerful">Powerful</SelectItem>
                          <SelectItem value="nurturing">Nurturing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="content-brief" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="brief-content-type">Content Type</Label>
                    <Input 
                      id="brief-content-type" 
                      placeholder="e.g. Blog Post, Newsletter, Social Media Series" 
                      value={briefContentType}
                      onChange={(e) => setBriefContentType(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brief-theme">Theme</Label>
                    <Input 
                      id="brief-theme" 
                      placeholder="e.g. Tarot for Beginners, Southern Gothic Elements" 
                      value={briefTheme}
                      onChange={(e) => setBriefTheme(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brief-context">Additional Context (optional)</Label>
                    <Textarea 
                      id="brief-context" 
                      placeholder="Any specific details or requirements to include" 
                      value={briefContext}
                      onChange={(e) => setBriefContext(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="product-description" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-type">Product Type</Label>
                    <Input 
                      id="product-type" 
                      placeholder="e.g. eBook, Digital Planner, Course" 
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-title">Product Title</Label>
                    <Input 
                      id="product-title" 
                      placeholder="e.g. Digital Entrepreneur's Starter Kit" 
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-features">Key Features/Benefits (comma separated)</Label>
                    <Textarea 
                      id="product-features" 
                      placeholder="e.g. Customizable templates, Step-by-step tutorials, Bonus resources" 
                      value={productFeatures}
                      onChange={(e) => setProductFeatures(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-audience">Target Audience</Label>
                    <Input 
                      id="product-audience" 
                      placeholder="e.g. Digital entrepreneurs, Tarot enthusiasts" 
                      value={productAudience}
                      onChange={(e) => setProductAudience(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="image-prompts" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image-subject">Subject</Label>
                    <Input 
                      id="image-subject" 
                      placeholder="e.g. Magnolia flowers in moonlight" 
                      value={imageSubject}
                      onChange={(e) => setImageSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image-style">Style</Label>
                    <Select value={imageStyle} onValueChange={setImageStyle}>
                      <SelectTrigger id="image-style">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Southern Gothic">Southern Gothic</SelectItem>
                        <SelectItem value="Ethereal">Ethereal</SelectItem>
                        <SelectItem value="Vintage">Vintage</SelectItem>
                        <SelectItem value="Watercolor">Watercolor</SelectItem>
                        <SelectItem value="Digital Art">Digital Art</SelectItem>
                        <SelectItem value="Minimalist">Minimalist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="worksheet" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="worksheet-topic">Worksheet Topic</Label>
                    <Input 
                      id="worksheet-topic" 
                      placeholder="e.g. Setting Intentions, Shadow Work" 
                      value={worksheetTopic}
                      onChange={(e) => setWorksheetTopic(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="worksheet-purpose">Purpose</Label>
                    <Input 
                      id="worksheet-purpose" 
                      placeholder="e.g. Self-reflection, Goal setting, Mindfulness practice" 
                      value={worksheetPurpose}
                      onChange={(e) => setWorksheetPurpose(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="moon-phase" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="moon-phase">Moon Phase</Label>
                    <Select value={moonPhase} onValueChange={setMoonPhase}>
                      <SelectTrigger id="moon-phase">
                        <SelectValue placeholder="Select moon phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New Moon">New Moon</SelectItem>
                        <SelectItem value="Waxing Crescent">Waxing Crescent</SelectItem>
                        <SelectItem value="First Quarter">First Quarter</SelectItem>
                        <SelectItem value="Waxing Gibbous">Waxing Gibbous</SelectItem>
                        <SelectItem value="Full Moon">Full Moon</SelectItem>
                        <SelectItem value="Waning Gibbous">Waning Gibbous</SelectItem>
                        <SelectItem value="Third Quarter">Third Quarter</SelectItem>
                        <SelectItem value="Waning Crescent">Waning Crescent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="moon-content-type">Content Focus</Label>
                    <Select value={moonContentType} onValueChange={setMoonContentType}>
                      <SelectTrigger id="moon-content-type">
                        <SelectValue placeholder="Select content focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="product">Product Development</SelectItem>
                        <SelectItem value="ritual">Ritual & Practice</SelectItem>
                        <SelectItem value="content">Content Creation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </div>
            
            <div>
              {renderContentOutput()}
            </div>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t border-[#A3B18A]/20 p-4">
        <Button 
          onClick={handleGenerate}
          disabled={generateContentMutation.isPending}
          className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#0A192F]"
        >
          {generateContentMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Content
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}