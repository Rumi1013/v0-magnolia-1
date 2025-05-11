import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Edit,
  Eye,
  FileUp,
  FileText,
  Loader2,
  X,
} from 'lucide-react';

interface ContentWorkflowManagerProps {
  content: string;
  onComplete: () => void;
  onCancel: () => void;
}

// Content visibility types
type ContentVisibility = 'public' | 'premium' | 'private';

// Content destination types
type ContentDestination = 'notion' | 'draft' | 'published' | 'download';

// Workflow step types
type WorkflowStep = 'edit' | 'preview' | 'publish';

const ContentWorkflowManager: React.FC<ContentWorkflowManagerProps> = ({ 
  content, 
  onComplete,
  onCancel
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentMetadata, setContentMetadata] = useState({
    title: '',
    description: '',
    contentType: 'affirmation',
    tags: '',
    visibility: 'public' as ContentVisibility,
    destination: 'published' as ContentDestination,
    watermarkEnabled: true,
  });
  
  const [editedContent, setEditedContent] = useState(content);
  
  // Function to handle metadata changes
  const handleMetadataChange = (field: string, value: string | boolean) => {
    setContentMetadata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  // Handle next step in workflow
  const handleNextStep = () => {
    if (currentStep === 'edit') {
      // Validate fields before proceeding
      if (!contentMetadata.title) {
        toast({
          title: "Missing Information",
          description: "Please provide a title for your content.",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep('preview');
    } else if (currentStep === 'preview') {
      setCurrentStep('publish');
    }
  };
  
  // Handle previous step in workflow
  const handlePreviousStep = () => {
    if (currentStep === 'preview') {
      setCurrentStep('edit');
    } else if (currentStep === 'publish') {
      setCurrentStep('preview');
    }
  };
  
  // Handle workflow completion
  const handleCompleteWorkflow = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to save content
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle specific destinations
      if (contentMetadata.destination === 'notion') {
        toast({
          title: "Published to Notion",
          description: "Your content has been saved to your Notion workspace.",
        });
      } else if (contentMetadata.destination === 'download') {
        // In a real implementation, this would trigger a download
        toast({
          title: "Content Downloaded",
          description: "Your content has been downloaded as a markdown file.",
        });
      } else {
        // For drafts and published
        toast({
          title: contentMetadata.destination === 'draft' ? "Saved as Draft" : "Content Published",
          description: contentMetadata.destination === 'draft' 
            ? "Your content has been saved to your drafts." 
            : "Your content has been published and is now available in your library.",
        });
      }
      
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error publishing your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render watermark for content
  const renderWatermarkedContent = (content: string) => {
    if (!contentMetadata.watermarkEnabled || contentMetadata.visibility !== 'public') {
      return (
        <div className="prose max-w-none">
          {content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>
      );
    }
    
    return (
      <div className="prose max-w-none relative">
        {content.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-4">{paragraph}</p>
        ))}
        <div className="absolute top-2 right-2 opacity-10 rotate-[-30deg]">
          <Badge variant="outline" className="text-[#0A192F] border-[#0A192F]/30 text-xs px-2 py-1">
            Midnight Magnolia
          </Badge>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-white border-[#0A192F]/10">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-playfair text-[#0A192F]">
                Content Workflow
              </CardTitle>
              <CardDescription className="text-[#0A192F]/70">
                Refine, preview, and publish your content
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCancel}
              className="text-[#0A192F]/60 hover:text-[#0A192F] hover:bg-[#0A192F]/5"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Workflow steps indicator */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep === 'edit' ? 'bg-[#0A192F] text-white' : 
                  currentStep === 'preview' || currentStep === 'publish' ? 'bg-[#0A192F]/20 text-[#0A192F]' : 'bg-gray-200 text-gray-500'
              }`}>
                <Edit className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium text-center mt-1 w-20">
                Edit & Format
              </div>
            </div>
            
            <div className="w-10 h-px bg-[#0A192F]/20"></div>
            
            <div className="flex items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep === 'preview' ? 'bg-[#0A192F] text-white' : 
                  currentStep === 'publish' ? 'bg-[#0A192F]/20 text-[#0A192F]' : 'bg-gray-200 text-gray-500'
              }`}>
                <Eye className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium text-center mt-1 w-20">
                Preview
              </div>
            </div>
            
            <div className="w-10 h-px bg-[#0A192F]/20"></div>
            
            <div className="flex items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep === 'publish' ? 'bg-[#0A192F] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <FileUp className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium text-center mt-1 w-20">
                Publish
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          {currentStep === 'edit' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-[#0A192F]">Title</Label>
                    <Input
                      id="title"
                      value={contentMetadata.title}
                      onChange={(e) => handleMetadataChange('title', e.target.value)}
                      placeholder="Enter a title for your content"
                      className="border-[#0A192F]/20 text-[#0A192F]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-[#0A192F]">Description</Label>
                    <Textarea
                      id="description"
                      value={contentMetadata.description}
                      onChange={(e) => handleMetadataChange('description', e.target.value)}
                      placeholder="Briefly describe your content"
                      className="border-[#0A192F]/20 text-[#0A192F] min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contentType" className="text-[#0A192F]">Content Type</Label>
                    <Select
                      value={contentMetadata.contentType}
                      onValueChange={(value) => handleMetadataChange('contentType', value)}
                    >
                      <SelectTrigger className="border-[#0A192F]/20 text-[#0A192F]">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="affirmation">Affirmation Card</SelectItem>
                        <SelectItem value="tarot">Tarot Description</SelectItem>
                        <SelectItem value="journal">Journal Prompt</SelectItem>
                        <SelectItem value="product">Product Listing</SelectItem>
                        <SelectItem value="moon-content">Moon Phase Content</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="tags" className="text-[#0A192F]">Tags</Label>
                    <Input
                      id="tags"
                      value={contentMetadata.tags}
                      onChange={(e) => handleMetadataChange('tags', e.target.value)}
                      placeholder="Enter tags separated by commas"
                      className="border-[#0A192F]/20 text-[#0A192F]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contentEditor" className="text-[#0A192F]">Content</Label>
                    <Textarea
                      id="contentEditor"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      placeholder="Edit your content here"
                      className="border-[#0A192F]/20 text-[#0A192F] min-h-[250px] font-mono"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-[#0A192F] mb-2 block">Content Visibility</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className={contentMetadata.visibility === 'public' 
                          ? 'bg-[#0A192F]/10 border-[#0A192F]' 
                          : 'border-[#0A192F]/20'}
                        onClick={() => handleMetadataChange('visibility', 'public')}
                      >
                        Public
                        {contentMetadata.visibility === 'public' && <Check className="ml-2 h-4 w-4" />}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className={contentMetadata.visibility === 'premium' 
                          ? 'bg-[#0A192F]/10 border-[#0A192F]' 
                          : 'border-[#0A192F]/20'}
                        onClick={() => handleMetadataChange('visibility', 'premium')}
                      >
                        Premium
                        {contentMetadata.visibility === 'premium' && <Check className="ml-2 h-4 w-4" />}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className={contentMetadata.visibility === 'private' 
                          ? 'bg-[#0A192F]/10 border-[#0A192F]' 
                          : 'border-[#0A192F]/20'}
                        onClick={() => handleMetadataChange('visibility', 'private')}
                      >
                        Private
                        {contentMetadata.visibility === 'private' && <Check className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="watermark"
                      checked={contentMetadata.watermarkEnabled}
                      onCheckedChange={(checked) => handleMetadataChange('watermarkEnabled', checked)}
                    />
                    <Label htmlFor="watermark" className="text-[#0A192F]">
                      Add Midnight Magnolia watermark to free (public) content
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'preview' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#0A192F]/10 pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-medium text-[#0A192F]">{contentMetadata.title}</h3>
                  <p className="text-[#0A192F]/70">{contentMetadata.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge className="bg-[#0A192F]/10 text-[#0A192F] border border-[#0A192F]/20">
                    {contentMetadata.contentType}
                  </Badge>
                  <Badge className={`
                    ${contentMetadata.visibility === 'public' ? 'bg-green-50 text-green-600 border-green-200' : 
                      contentMetadata.visibility === 'premium' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 
                      'bg-blue-50 text-blue-600 border-blue-200'}
                  `}>
                    {contentMetadata.visibility === 'public' ? 'Public' : 
                     contentMetadata.visibility === 'premium' ? 'Premium' : 'Private'}
                  </Badge>
                </div>
              </div>
              
              <div className="border border-[#0A192F]/10 rounded-md p-6 bg-white">
                {renderWatermarkedContent(editedContent)}
              </div>
              
              <div className="pt-4 border-t border-[#0A192F]/10">
                <h3 className="text-lg font-medium text-[#0A192F] mb-2">Preview Notes</h3>
                {contentMetadata.visibility === 'public' && contentMetadata.watermarkEnabled ? (
                  <div className="text-[#0A192F]/70">
                    <p>This content is set to <strong>public visibility</strong> and includes a watermark.</p>
                    <p className="mt-2">Public content is free but includes the Midnight Magnolia branding.</p>
                  </div>
                ) : contentMetadata.visibility === 'premium' ? (
                  <div className="text-[#0A192F]/70">
                    <p>This content is set to <strong>premium visibility</strong> and will be available only to paid subscribers.</p>
                    <p className="mt-2">Premium content is clean without watermarks and exclusively available to your subscribers.</p>
                  </div>
                ) : (
                  <div className="text-[#0A192F]/70">
                    <p>This content is set to <strong>private visibility</strong> and will only be visible to you.</p>
                    <p className="mt-2">Private content is useful for drafts or content you're not ready to share yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {currentStep === 'publish' && (
            <div className="space-y-6">
              <div className="border border-[#0A192F]/10 rounded-md p-6 bg-[#0A192F]/5">
                <h3 className="text-lg font-medium text-[#0A192F] mb-4">Where would you like to publish?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`border rounded-md p-4 cursor-pointer transition-colors ${
                      contentMetadata.destination === 'notion' 
                        ? 'border-[#0A192F] bg-[#0A192F]/5' 
                        : 'border-[#0A192F]/10 hover:border-[#0A192F]/30 hover:bg-[#0A192F]/5'
                    }`}
                    onClick={() => handleMetadataChange('destination', 'notion')}
                  >
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-md bg-black text-white flex items-center justify-center mr-3">
                        N
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0A192F]">Notion</h4>
                        <p className="text-sm text-[#0A192F]/60">Add directly to your Notion workspace</p>
                      </div>
                    </div>
                    {contentMetadata.destination === 'notion' && (
                      <div className="mt-2 text-sm text-[#0A192F]/70">
                        Your content will be added to your connected Notion workspace.
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 cursor-pointer transition-colors ${
                      contentMetadata.destination === 'draft' 
                        ? 'border-[#0A192F] bg-[#0A192F]/5' 
                        : 'border-[#0A192F]/10 hover:border-[#0A192F]/30 hover:bg-[#0A192F]/5'
                    }`}
                    onClick={() => handleMetadataChange('destination', 'draft')}
                  >
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-md bg-[#0A192F]/10 text-[#0A192F] flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0A192F]">Save as Draft</h4>
                        <p className="text-sm text-[#0A192F]/60">Keep in your Digital Grimoire drafts</p>
                      </div>
                    </div>
                    {contentMetadata.destination === 'draft' && (
                      <div className="mt-2 text-sm text-[#0A192F]/70">
                        Your content will be saved as a draft for future editing.
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 cursor-pointer transition-colors ${
                      contentMetadata.destination === 'published' 
                        ? 'border-[#0A192F] bg-[#0A192F]/5' 
                        : 'border-[#0A192F]/10 hover:border-[#0A192F]/30 hover:bg-[#0A192F]/5'
                    }`}
                    onClick={() => handleMetadataChange('destination', 'published')}
                  >
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-md bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mr-3">
                        <FileUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0A192F]">Publish to Library</h4>
                        <p className="text-sm text-[#0A192F]/60">Add to your content library</p>
                      </div>
                    </div>
                    {contentMetadata.destination === 'published' && (
                      <div className="mt-2 text-sm text-[#0A192F]/70">
                        Your content will be published to your Digital Grimoire library based on visibility settings.
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 cursor-pointer transition-colors ${
                      contentMetadata.destination === 'download' 
                        ? 'border-[#0A192F] bg-[#0A192F]/5' 
                        : 'border-[#0A192F]/10 hover:border-[#0A192F]/30 hover:bg-[#0A192F]/5'
                    }`}
                    onClick={() => handleMetadataChange('destination', 'download')}
                  >
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-md bg-[#0A192F]/10 text-[#0A192F] flex items-center justify-center mr-3">
                        <Download className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0A192F]">Download</h4>
                        <p className="text-sm text-[#0A192F]/60">Save as markdown file</p>
                      </div>
                    </div>
                    {contentMetadata.destination === 'download' && (
                      <div className="mt-2 text-sm text-[#0A192F]/70">
                        Your content will be downloaded as a markdown file to your device.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0A192F]/5 rounded-md p-4">
                <h3 className="text-lg font-medium text-[#0A192F] mb-2">Publication Summary</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-[#0A192F]/70">Title:</span>
                    <span className="font-medium text-[#0A192F]">{contentMetadata.title}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[#0A192F]/70">Type:</span>
                    <span className="font-medium text-[#0A192F]">{contentMetadata.contentType}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[#0A192F]/70">Visibility:</span>
                    <span className="font-medium text-[#0A192F]">
                      {contentMetadata.visibility === 'public' ? 'Public (Free)' : 
                       contentMetadata.visibility === 'premium' ? 'Premium (Subscribers Only)' : 'Private (Draft)'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[#0A192F]/70">Destination:</span>
                    <span className="font-medium text-[#0A192F]">
                      {contentMetadata.destination === 'notion' ? 'Notion Workspace' : 
                       contentMetadata.destination === 'draft' ? 'Saved as Draft' : 
                       contentMetadata.destination === 'published' ? 'Published to Library' : 'Download as File'}
                    </span>
                  </li>
                  {contentMetadata.visibility === 'public' && (
                    <li className="flex justify-between">
                      <span className="text-[#0A192F]/70">Watermark:</span>
                      <span className="font-medium text-[#0A192F]">
                        {contentMetadata.watermarkEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6 border-t border-[#0A192F]/10">
          {currentStep !== 'edit' ? (
            <Button 
              variant="outline" 
              onClick={handlePreviousStep}
              className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
          
          {currentStep !== 'publish' ? (
            <Button 
              onClick={handleNextStep}
              className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleCompleteWorkflow}
              disabled={isSubmitting}
              className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Complete
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentWorkflowManager;