import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

import {
  Wand2, BookOpen, Save, Share2, ArrowRight, Check,
  Download, ExternalLink, Globe, Lock, FileText, Pencil
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types for content workflow
export type ContentDestination = 'notion' | 'draft' | 'published' | 'download';
export type ContentVisibility = 'public' | 'premium' | 'private';
export type ContentType = 'blog' | 'ritual' | 'resource' | 'product' | 'newsletter' | 'social';

export interface ContentMetadata {
  title: string;
  tags: string[];
  type: ContentType;
  visibility: ContentVisibility;
  applyWatermark: boolean;
}

interface ContentWorkflowManagerProps {
  content: string;
  contentTitle: string;
  contentType: ContentType;
  onComplete: (destination: ContentDestination, metadata: ContentMetadata) => void;
  onCancel: () => void;
}

// Component to manage the content workflow
const ContentWorkflowManager: React.FC<ContentWorkflowManagerProps> = ({
  content,
  contentTitle,
  contentType,
  onComplete,
  onCancel
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [destination, setDestination] = useState<ContentDestination>('draft');
  const [metadata, setMetadata] = useState<ContentMetadata>({
    title: contentTitle || '',
    tags: [],
    type: contentType || 'blog',
    visibility: 'public',
    applyWatermark: true
  });
  const [previewWithWatermark, setPreviewWithWatermark] = useState<boolean>(true);
  const [tagInput, setTagInput] = useState<string>('');

  // Handle adding a tag
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    if (!metadata.tags.includes(tagInput.trim().toLowerCase())) {
      setMetadata({
        ...metadata,
        tags: [...metadata.tags, tagInput.trim().toLowerCase()]
      });
    }
    
    setTagInput('');
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setMetadata({
      ...metadata,
      tags: metadata.tags.filter(t => t !== tag)
    });
  };

  // Handle completing the workflow
  const handleComplete = () => {
    // Validate metadata
    if (!metadata.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for your content.",
        variant: "destructive"
      });
      return;
    }

    // For premium content, ensure watermark is disabled
    const finalMetadata = {
      ...metadata,
      applyWatermark: metadata.visibility === 'premium' ? false : metadata.applyWatermark
    };

    onComplete(destination, finalMetadata);
  };

  // Format markdown content to HTML for display
  const formatMarkdownToHtml = (markdown: string) => {
    if (!markdown) return '';
    
    // Parse headers
    let html = markdown.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mb-3 mt-5">$1</h2>');
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mb-2 mt-4">$1</h3>');
    
    // Parse lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal mb-1">$1</li>');
    html = html.replace(/^- (.+)$/gm, '<li class="ml-5 list-disc mb-1">$1</li>');
    
    // Parse paragraphs (any line that doesn't start with a special character)
    html = html.replace(/^([^<#\-\d\*\n].+)$/gm, '<p class="mb-4">$1</p>');
    
    // Parse code blocks
    html = html.replace(/```([^`]+)```/, '<pre class="bg-gray-100 p-3 rounded-md my-4 overflow-x-auto text-sm">$1</pre>');
    
    // Parse emphasis
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Wrap consecutive <li> elements in <ul> or <ol>
    html = html.replace(/(<li class="ml-5 list-disc mb-1">.*?<\/li>(?:\n|$))+/g, '<ul class="mb-4">$&</ul>');
    html = html.replace(/(<li class="ml-5 list-decimal mb-1">.*?<\/li>(?:\n|$))+/g, '<ol class="mb-4">$&</ol>');
    
    return html;
  };

  return (
    <div className="space-y-8">
      {/* Workflow Steps */}
      <div className="flex items-center justify-center">
        <div className="flex items-center w-full max-w-3xl">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#0A192F]' : 'text-[#0A192F]/40'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#0A192F] text-white' : 'bg-[#0A192F]/10 text-[#0A192F]/40'}`}>
              1
            </div>
            <span className="mt-2 text-sm">Edit & Format</span>
          </div>
          
          <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-[#0A192F]' : 'bg-[#0A192F]/10'}`}></div>
          
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-[#0A192F]' : 'text-[#0A192F]/40'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#0A192F] text-white' : 'bg-[#0A192F]/10 text-[#0A192F]/40'}`}>
              2
            </div>
            <span className="mt-2 text-sm">Preview</span>
          </div>
          
          <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-[#0A192F]' : 'bg-[#0A192F]/10'}`}></div>
          
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-[#0A192F]' : 'text-[#0A192F]/40'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#0A192F] text-white' : 'bg-[#0A192F]/10 text-[#0A192F]/40'}`}>
              3
            </div>
            <span className="mt-2 text-sm">Publish</span>
          </div>
        </div>
      </div>
      
      {/* Step 1: Edit & Format */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Card className="bg-white border-[#0A192F]/10 h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair text-[#0A192F]">Content Metadata</CardTitle>
                  <CardDescription className="text-[#0A192F]/70">
                    Provide details about your content
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#0A192F]">Title</Label>
                    <Input 
                      id="title" 
                      value={metadata.title} 
                      onChange={(e) => setMetadata({...metadata, title: e.target.value})}
                      className="border-[#0A192F]/20 text-[#0A192F]"
                      placeholder="Enter a title for your content"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-[#0A192F]">Content Type</Label>
                    <Select 
                      value={metadata.type} 
                      onValueChange={(value) => setMetadata({...metadata, type: value as ContentType})}
                    >
                      <SelectTrigger className="border-[#0A192F]/20 text-[#0A192F]">
                        <SelectValue placeholder="Select a content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blog">Blog Post</SelectItem>
                        <SelectItem value="ritual">Ritual / Practice</SelectItem>
                        <SelectItem value="resource">Resource / Worksheet</SelectItem>
                        <SelectItem value="product">Product Description</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-[#0A192F]">Tags</Label>
                    <div className="flex">
                      <Input 
                        id="tags" 
                        value={tagInput} 
                        onChange={(e) => setTagInput(e.target.value)}
                        className="border-[#0A192F]/20 text-[#0A192F] flex-1"
                        placeholder="Enter tags"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddTag}
                        className="ml-2 bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                      >
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {metadata.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          className="bg-[#0A192F]/10 text-[#0A192F] hover:bg-[#0A192F]/20"
                        >
                          {tag}
                          <button 
                            className="ml-1 text-[#0A192F]/60 hover:text-[#0A192F]"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="visibility" className="text-[#0A192F]">Content Visibility</Label>
                    <Select 
                      value={metadata.visibility} 
                      onValueChange={(value) => setMetadata({
                        ...metadata, 
                        visibility: value as ContentVisibility,
                        applyWatermark: value === 'premium' ? false : metadata.applyWatermark
                      })}
                    >
                      <SelectTrigger className="border-[#0A192F]/20 text-[#0A192F]">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            Public (Free)
                          </div>
                        </SelectItem>
                        <SelectItem value="premium">
                          <div className="flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            Premium (Subscribers Only)
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Private (Draft)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {metadata.visibility === 'public' && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="watermark"
                        checked={metadata.applyWatermark}
                        onCheckedChange={(checked) => setMetadata({...metadata, applyWatermark: checked})}
                      />
                      <Label htmlFor="watermark" className="text-[#0A192F]">
                        Apply Midnight Magnolia watermark
                      </Label>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="bg-white border-[#0A192F]/10 h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair text-[#0A192F]">Content Preview</CardTitle>
                  <CardDescription className="text-[#0A192F]/70">
                    Review your generated content
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="max-h-[400px] overflow-y-auto p-2 border border-[#0A192F]/10 rounded-md">
                    <h1 className="text-2xl font-bold mb-4 text-[#0A192F]">{metadata.title || 'Untitled Content'}</h1>
                    <div 
                      className="prose max-w-none text-[#0A192F]"
                      dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(content) }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
            >
              Cancel
            </Button>
            
            <Button 
              onClick={() => setStep(2)}
              className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
            >
              Continue to Preview <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Step 2: Preview */}
      {step === 2 && (
        <div className="space-y-6">
          <Card className="bg-white border-[#0A192F]/10">
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-[#0A192F]">Preview Your Content</CardTitle>
              <CardDescription className="text-[#0A192F]/70">
                This is how your content will appear to your audience
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Badge className={
                    metadata.visibility === 'premium' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50' :
                    metadata.visibility === 'private' ? 'bg-gray-200 text-gray-800 border-gray-300' :
                    'bg-green-100 text-green-800 border-green-200'
                  }>
                    {metadata.visibility === 'premium' ? 'Premium Content' : 
                     metadata.visibility === 'private' ? 'Private Draft' : 
                     'Free Content'}
                  </Badge>
                  
                  <Badge variant="outline" className="bg-[#0A192F]/5 text-[#0A192F]">
                    {metadata.type === 'blog' ? 'Blog Post' :
                     metadata.type === 'ritual' ? 'Ritual / Practice' :
                     metadata.type === 'resource' ? 'Resource' :
                     metadata.type === 'product' ? 'Product' :
                     metadata.type === 'newsletter' ? 'Newsletter' :
                     'Social Media'}
                  </Badge>
                </div>
                
                {metadata.visibility === 'public' && (
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="preview-watermark" className="text-[#0A192F]">
                      Preview with watermark
                    </Label>
                    <Switch
                      id="preview-watermark"
                      checked={previewWithWatermark}
                      onCheckedChange={setPreviewWithWatermark}
                    />
                  </div>
                )}
              </div>
              
              <div className="relative p-6 border border-[#0A192F]/10 rounded-lg bg-white">
                <h1 className="text-3xl font-playfair font-bold mb-4 text-[#0A192F]">{metadata.title || 'Untitled Content'}</h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {metadata.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      className="bg-[#0A192F]/10 text-[#0A192F]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div 
                  className="prose max-w-none text-[#0A192F]"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(content) }}
                />
                
                {/* Watermark */}
                {metadata.visibility === 'public' && previewWithWatermark && metadata.applyWatermark && (
                  <div className="absolute top-6 right-6 opacity-20 rotate-[-30deg]">
                    <Badge variant="outline" className="text-[#0A192F] border-[#0A192F]/30 px-2 py-1">
                      Midnight Magnolia
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="justify-between">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
              >
                Back to Edit
              </Button>
              
              <Button 
                onClick={() => setStep(3)}
                className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
              >
                Continue to Publish <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Step 3: Publish */}
      {step === 3 && (
        <div className="space-y-6">
          <Card className="bg-white border-[#0A192F]/10">
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-[#0A192F]">Choose Destination</CardTitle>
              <CardDescription className="text-[#0A192F]/70">
                Select where you want to save or publish your content
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                  className={`border-2 cursor-pointer transition-all ${destination === 'notion' ? 'border-[#0A192F]' : 'border-[#0A192F]/10 hover:border-[#0A192F]/30'}`}
                  onClick={() => setDestination('notion')}
                >
                  <CardContent className="p-6 flex items-start">
                    <div className="mr-4 mt-1 bg-[#0A192F]/5 p-2 rounded-full">
                      <ExternalLink className="h-6 w-6 text-[#0A192F]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#0A192F] text-lg mb-1">Save to Notion</h3>
                      <p className="text-[#0A192F]/60 text-sm">
                        Send this content directly to your Notion workspace for further editing and organization.
                      </p>
                    </div>
                    {destination === 'notion' && (
                      <Check className="ml-auto text-[#0A192F]" />
                    )}
                  </CardContent>
                </Card>
                
                <Card 
                  className={`border-2 cursor-pointer transition-all ${destination === 'draft' ? 'border-[#0A192F]' : 'border-[#0A192F]/10 hover:border-[#0A192F]/30'}`}
                  onClick={() => setDestination('draft')}
                >
                  <CardContent className="p-6 flex items-start">
                    <div className="mr-4 mt-1 bg-[#0A192F]/5 p-2 rounded-full">
                      <Save className="h-6 w-6 text-[#0A192F]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#0A192F] text-lg mb-1">Save as Draft</h3>
                      <p className="text-[#0A192F]/60 text-sm">
                        Store this content in your draft library for later editing and publishing.
                      </p>
                    </div>
                    {destination === 'draft' && (
                      <Check className="ml-auto text-[#0A192F]" />
                    )}
                  </CardContent>
                </Card>
                
                <Card 
                  className={`border-2 cursor-pointer transition-all ${destination === 'published' ? 'border-[#0A192F]' : 'border-[#0A192F]/10 hover:border-[#0A192F]/30'}`}
                  onClick={() => setDestination('published')}
                >
                  <CardContent className="p-6 flex items-start">
                    <div className="mr-4 mt-1 bg-[#0A192F]/5 p-2 rounded-full">
                      <Globe className="h-6 w-6 text-[#0A192F]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#0A192F] text-lg mb-1">Publish Now</h3>
                      <p className="text-[#0A192F]/60 text-sm">
                        Publish immediately to your content library with the selected visibility settings.
                      </p>
                    </div>
                    {destination === 'published' && (
                      <Check className="ml-auto text-[#0A192F]" />
                    )}
                  </CardContent>
                </Card>
                
                <Card 
                  className={`border-2 cursor-pointer transition-all ${destination === 'download' ? 'border-[#0A192F]' : 'border-[#0A192F]/10 hover:border-[#0A192F]/30'}`}
                  onClick={() => setDestination('download')}
                >
                  <CardContent className="p-6 flex items-start">
                    <div className="mr-4 mt-1 bg-[#0A192F]/5 p-2 rounded-full">
                      <Download className="h-6 w-6 text-[#0A192F]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#0A192F] text-lg mb-1">Download as Markdown</h3>
                      <p className="text-[#0A192F]/60 text-sm">
                        Download your content as a markdown file to use in other applications.
                      </p>
                    </div>
                    {destination === 'download' && (
                      <Check className="ml-auto text-[#0A192F]" />
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            
            <CardFooter className="justify-between">
              <Button 
                variant="outline" 
                onClick={() => setStep(2)}
                className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
              >
                Back to Preview
              </Button>
              
              <Button 
                onClick={handleComplete}
                className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
              >
                Finish & {
                  destination === 'notion' ? 'Save to Notion' :
                  destination === 'draft' ? 'Save as Draft' :
                  destination === 'published' ? 'Publish Now' :
                  'Download'
                }
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContentWorkflowManager;