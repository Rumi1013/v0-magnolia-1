import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

import { 
  Wand2, MoonStar, ScrollText, FileText, 
  Image, Star, Sparkles, Loader2, ArrowRight,
  Clipboard
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

// Types for AI content generation
type AIGeneratorType = 
  'tarot-reading' | 
  'affirmations' | 
  'content-brief' | 
  'product-description' | 
  'image-prompts' | 
  'worksheet' | 
  'moon-phase-content' | 
  'workflow-steps';

interface AIGeneratorOption {
  id: AIGeneratorType;
  title: string;
  description: string;
  icon: React.ReactNode;
  premium: boolean;
  formFields: AIFormField[];
}

interface AIFormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'slider' | 'switch' | 'checkbox';
  placeholder?: string;
  options?: {value: string, label: string}[];
  defaultValue?: any;
  min?: number;
  max?: number;
  required?: boolean;
}

// Mock content generation
const generateContent = async (generatorType: AIGeneratorType, formData: any): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`# Generated ${generatorType} content\n\nThis is a placeholder for real AI-generated content. In a production environment, this would make an API call to services like OpenAI.\n\n## Sample Structure\n\n1. First section with key points\n2. Second section with recommendations\n3. Third section with action items`);
    }, 1500);
  });
};

const AIContentGenerator: React.FC = () => {
  const { toast } = useToast();
  const [activeGenerator, setActiveGenerator] = useState<AIGeneratorOption | null>(null);
  const [formValues, setFormValues] = useState<{[key: string]: any}>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");

  // AI Generator Options
  const aiGeneratorOptions: AIGeneratorOption[] = [
    {
      id: 'tarot-reading',
      title: 'Tarot Reading Generator',
      description: 'Generate insightful tarot readings based on specific queries or intentions.',
      icon: <Star className="h-5 w-5" />,
      premium: false,
      formFields: [
        {
          name: 'query',
          label: 'Reading Focus',
          type: 'textarea',
          placeholder: 'What specific question or area of life would you like this reading to focus on?',
          required: true
        },
        {
          name: 'numCards',
          label: 'Number of Cards',
          type: 'select',
          options: [
            {value: '1', label: '1-Card Draw (Simple)'},
            {value: '3', label: '3-Card Spread (Past, Present, Future)'},
            {value: '5', label: '5-Card Spread (Detailed)'}
          ],
          defaultValue: '3'
        }
      ]
    },
    {
      id: 'affirmations',
      title: 'Affirmation Generator',
      description: 'Create powerful, personalized affirmations based on your mood, theme, and intention.',
      icon: <MoonStar className="h-5 w-5" />,
      premium: false,
      formFields: [
        {
          name: 'theme',
          label: 'Theme',
          type: 'select',
          options: [
            {value: 'abundance', label: 'Abundance & Prosperity'},
            {value: 'self-love', label: 'Self-Love & Acceptance'},
            {value: 'health', label: 'Health & Vitality'}
          ],
          defaultValue: 'self-love'
        },
        {
          name: 'count',
          label: 'Number of Affirmations',
          type: 'slider',
          min: 3,
          max: 10,
          defaultValue: 5
        }
      ]
    },
    {
      id: 'content-brief',
      title: 'Content Brief Creator',
      description: 'Generate comprehensive content briefs for blog posts, newsletters, or social media content.',
      icon: <ScrollText className="h-5 w-5" />,
      premium: true,
      formFields: [
        {
          name: 'contentType',
          label: 'Content Type',
          type: 'select',
          options: [
            {value: 'blog', label: 'Blog Post'},
            {value: 'newsletter', label: 'Newsletter'},
            {value: 'social', label: 'Social Media Post'}
          ],
          defaultValue: 'blog'
        },
        {
          name: 'topic',
          label: 'Topic',
          type: 'text',
          placeholder: 'Enter your content topic',
          required: true
        }
      ]
    },
    {
      id: 'worksheet',
      title: 'Worksheet Generator',
      description: 'Create printable worksheets for journaling, reflection, and spiritual practice.',
      icon: <FileText className="h-5 w-5" />,
      premium: true,
      formFields: [
        {
          name: 'worksheetType',
          label: 'Worksheet Type',
          type: 'select',
          options: [
            {value: 'journal', label: 'Journaling Prompts'},
            {value: 'reflection', label: 'Self-Reflection Exercise'},
            {value: 'planning', label: 'Ritual Planning'}
          ],
          defaultValue: 'journal'
        },
        {
          name: 'topic',
          label: 'Topic/Theme',
          type: 'text',
          placeholder: 'Enter the main topic or theme',
          required: true
        }
      ]
    },
    {
      id: 'image-prompts',
      title: 'Image Prompt Generator',
      description: 'Generate detailed prompts for AI image generation tools like Midjourney or DALL-E.',
      icon: <Image className="h-5 w-5" />,
      premium: true,
      formFields: [
        {
          name: 'subject',
          label: 'Subject',
          type: 'text',
          placeholder: 'What would you like to see in the image?',
          required: true
        },
        {
          name: 'style',
          label: 'Art Style',
          type: 'select',
          options: [
            {value: 'digital-art', label: 'Digital Art'},
            {value: 'fantasy', label: 'Fantasy'},
            {value: 'realistic', label: 'Realistic'}
          ],
          defaultValue: 'fantasy'
        }
      ]
    }
  ];
  
  // Reset form values when switching generators
  const handleGeneratorChange = (generator: AIGeneratorOption) => {
    const initialValues: {[key: string]: any} = {};
    
    generator.formFields.forEach(field => {
      if (field.defaultValue !== undefined) {
        initialValues[field.name] = field.defaultValue;
      }
    });
    
    setFormValues(initialValues);
    setActiveGenerator(generator);
    setGeneratedContent("");
  };
  
  // Handle form field changes
  const handleInputChange = (field: AIFormField, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [field.name]: value
    }));
  };
  
  // Handle content generation
  const handleGenerateContent = async () => {
    if (!activeGenerator) return;
    
    // Check for premium content without subscription
    if (activeGenerator.premium) {
      toast({
        title: "Premium Feature",
        description: "This generator is only available to premium subscribers.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate required fields
    const missingFields = activeGenerator.formFields
      .filter(field => field.required && !formValues[field.name])
      .map(field => field.label);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in the following fields: " + missingFields.join(", "),
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const content = await generateContent(activeGenerator.id, formValues);
      setGeneratedContent(content);
      
      toast({
        title: "Content Generated",
        description: "Your AI-generated content is ready!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Function to copy generated content
  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied to Clipboard",
      description: "Your generated content has been copied.",
    });
  };
  
  // Function to publish content workflow
  const handlePublishContent = () => {
    toast({
      title: "Publication Process Started",
      description: "Opening your content in the workflow manager...",
    });
    
    // In a real implementation, this would open the workflow manager
    setTimeout(() => {
      toast({
        title: "Content Published",
        description: "Your content is now available in your Digital Grimoire.",
      });
    }, 2000);
  };
  
  // Format markdown content to HTML for display
  const formatMarkdownToHtml = (markdown: string) => {
    if (!markdown) return '';
    
    let html = markdown;
    
    // Parse headers
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mb-3 mt-5">$1</h2>');
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mb-2 mt-4">$1</h3>');
    
    // Parse lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal mb-1">$1</li>');
    html = html.replace(/^- (.+)$/gm, '<li class="ml-5 list-disc mb-1">$1</li>');
    
    // Parse paragraphs
    html = html.replace(/^([^<#\-\d\*\n].+)$/gm, '<p class="mb-4">$1</p>');
    
    return html;
  };
  
  return (
    <div className="bg-[#FAF3E0] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-playfair text-[#0A192F] mb-2">Digital Grimoire AI Tools</h1>
          <p className="text-[#0A192F]/70">Create mystical content with our AI-powered generators</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar - Generator Selection */}
          <div className="lg:col-span-3">
            <Card className="bg-white border-[#0A192F]/10 sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-playfair text-[#0A192F]">Choose Generator</CardTitle>
                <CardDescription className="text-[#0A192F]/70">
                  Select the type of content you want to create
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-2">
                {aiGeneratorOptions.map((generator) => (
                  <div 
                    key={generator.id}
                    className={`flex items-start p-3 rounded-md cursor-pointer transition-colors ${activeGenerator?.id === generator.id ? 'bg-[#0A192F]/10' : 'hover:bg-[#0A192F]/5'}`}
                    onClick={() => handleGeneratorChange(generator)}
                  >
                    <div className="mr-3 mt-0.5 text-[#0A192F]">
                      {generator.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-[#0A192F]">{generator.title}</h3>
                        {generator.premium && (
                          <Badge className="ml-2 bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#0A192F]/60 text-sm">{generator.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Main content - Generator Form & Output */}
          <div className="lg:col-span-9">
            {activeGenerator ? (
              <div className="space-y-6">
                <Card className="bg-white border-[#0A192F]/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair text-[#0A192F] flex items-center">
                      {activeGenerator.icon}
                      <span className="ml-2">{activeGenerator.title}</span>
                      {activeGenerator.premium && (
                        <Badge className="ml-3 bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50">
                          Premium
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-[#0A192F]/70">
                      {activeGenerator.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form className="space-y-4">
                      {activeGenerator.formFields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label htmlFor={field.name} className="text-[#0A192F]">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          
                          {field.type === 'text' && (
                            <Input
                              id={field.name}
                              placeholder={field.placeholder}
                              value={formValues[field.name] || ''}
                              onChange={(e) => handleInputChange(field, e.target.value)}
                              className="border-[#0A192F]/20 text-[#0A192F]"
                            />
                          )}
                          
                          {field.type === 'textarea' && (
                            <Textarea
                              id={field.name}
                              placeholder={field.placeholder}
                              value={formValues[field.name] || ''}
                              onChange={(e) => handleInputChange(field, e.target.value)}
                              className="min-h-[100px] border-[#0A192F]/20 text-[#0A192F]"
                            />
                          )}
                          
                          {field.type === 'select' && field.options && (
                            <Select
                              value={formValues[field.name] || field.defaultValue || ''}
                              onValueChange={(value) => handleInputChange(field, value)}
                            >
                              <SelectTrigger className="border-[#0A192F]/20 text-[#0A192F]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          
                          {field.type === 'slider' && (
                            <div className="pt-2">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-[#0A192F]/70">{field.min}</span>
                                <span className="text-sm text-[#0A192F]/70">{field.max}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <Slider
                                  id={field.name}
                                  min={field.min}
                                  max={field.max}
                                  step={1}
                                  value={[formValues[field.name] || field.defaultValue || field.min || 0]}
                                  onValueChange={(value) => handleInputChange(field, value[0])}
                                  className="flex-1"
                                />
                                <span className="w-12 text-center font-medium text-[#0A192F]">
                                  {formValues[field.name] || field.defaultValue || field.min || 0}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {field.type === 'switch' && (
                            <div className="flex items-center justify-between">
                              <Label htmlFor={field.name} className="text-[#0A192F]">{field.label}</Label>
                              <Switch
                                id={field.name}
                                checked={formValues[field.name] ?? field.defaultValue ?? false}
                                onCheckedChange={(checked) => handleInputChange(field, checked)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </form>
                  </CardContent>
                  
                  <CardFooter>
                    <Button
                      onClick={handleGenerateContent}
                      disabled={isGenerating}
                      className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                    >
                      {isGenerating ? (
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
                
                {/* Generated Content Display */}
                {generatedContent && (
                  <Card className="bg-white border-[#0A192F]/10">
                    <CardHeader>
                      <CardTitle className="text-xl font-playfair text-[#0A192F]">Generated Content</CardTitle>
                      <CardDescription className="text-[#0A192F]/70">
                        Your AI-generated content is ready to use
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="relative">
                        <div 
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(generatedContent) }}
                        />
                        
                        {/* Watermark */}
                        <div className="absolute top-2 right-2 opacity-10 rotate-[-30deg]">
                          <Badge variant="outline" className="text-[#0A192F] border-[#0A192F]/30 text-xs px-2 py-1">
                            Midnight Magnolia
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex flex-wrap gap-3">
                      <Button
                        onClick={handleCopyContent}
                        variant="outline"
                        className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                      >
                        <Clipboard className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                      
                      <Button
                        onClick={handlePublishContent}
                        className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Publish & Share
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            ) : (
              // No generator selected
              <div className="bg-white border border-[#0A192F]/10 rounded-lg p-12 text-center">
                <Wand2 className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
                <h3 className="text-lg font-medium text-[#0A192F] mb-2">Choose a Generator</h3>
                <p className="text-[#0A192F]/60 max-w-md mx-auto mb-6">
                  Select a content generator from the left sidebar to begin creating magical content for your audience.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIContentGenerator;