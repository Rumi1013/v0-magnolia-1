import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FaRobot, FaImage, FaPencilAlt, FaMagic, FaSpinner } from 'react-icons/fa';

const AIContentGenerator = () => {
  const { toast } = useToast();
  const [provider, setProvider] = useState('openai');
  const [contentType, setContentType] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const generateMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', `/api/${provider}/generate`, {
        contentType,
        prompt,
      });
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setGeneratedContent(data.content);
      toast({
        title: "Content Generated",
        description: "Generated successfully using " + provider,
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Multi-AI Content Generator</CardTitle>
        <CardDescription>Generate content using various AI providers</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="text" className="space-y-4">
          <TabsList>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>AI Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                  <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                  <SelectItem value="grok">Grok</SelectItem>
                  <SelectItem value="ideogram">Ideogram</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Prompt</Label>
              <Textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={() => generateMutation.mutate()}
              disabled={generateMutation.isPending || !prompt}
              className="w-full"
            >
              {generateMutation.isPending && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Generate with {provider}
            </Button>

            {generatedContent && (
              <Textarea
                value={generatedContent}
                readOnly
                className="min-h-[200px] mt-4"
              />
            )}
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;