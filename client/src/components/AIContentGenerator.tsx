
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, getQueryFn } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FaShopify, FaFileAlt, FaImage, FaSpinner, FaClipboard, FaDatabase } from 'react-icons/fa';

const AIContentGenerator = () => {
  const { toast } = useToast();
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [contentType, setContentType] = useState('product');
  const [topic, setTopic] = useState('');
  const [destination, setDestination] = useState<'notion' | 'shopify' | null>(null);

  // Generate content mutation
  const generateContentMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/openai/generate-content', {
        contentType,
        topic,
      });
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setGeneratedContent(data.content);
      toast({
        title: "Content Generated",
        description: "Your content has been generated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Export to destination mutation
  const exportMutation = useMutation({
    mutationFn: async () => {
      if (!generatedContent) return;
      
      const endpoint = destination === 'notion' 
        ? '/api/notion/create-page'
        : '/api/shopify/create-product';
        
      return apiRequest('POST', endpoint, {
        content: generatedContent,
        contentType,
        title: topic
      });
    },
    onSuccess: () => {
      toast({
        title: "Export Successful",
        description: `Content exported to ${destination}`,
      });
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Content Generator</CardTitle>
        <CardDescription>
          Generate and export content to your preferred platform
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Content Type</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product">Product Description</SelectItem>
              <SelectItem value="social">Social Media Post</SelectItem>
              <SelectItem value="email">Email Campaign</SelectItem>
              <SelectItem value="blog">Blog Post</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Topic/Title</Label>
          <Input
            placeholder="Enter topic or title..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <Button 
          onClick={() => generateContentMutation.mutate()}
          disabled={generateContentMutation.isPending}
          className="w-full"
        >
          {generateContentMutation.isPending && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
          Generate Content
        </Button>

        {generatedContent && (
          <>
            <Textarea
              value={generatedContent}
              readOnly
              className="min-h-[200px]"
            />
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setDestination('notion')}
                className="flex-1"
              >
                <FaDatabase className="mr-2" /> Export to Notion
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setDestination('shopify')}
                className="flex-1"
              >
                <FaShopify className="mr-2" /> Export to Shopify
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(generatedContent);
                  toast({ title: "Copied to clipboard" });
                }}
              >
                <FaClipboard className="mr-2" /> Copy
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
