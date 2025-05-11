import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { FaMagic, FaSpinner } from 'react-icons/fa';

export function AIContentGenerator() {
  const { toast } = useToast();
  const [contentType, setContentType] = useState('tarot');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      // API call will go here
      const response = await fetch('/api/openai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: contentType, prompt }),
      });

      if (!response.ok) throw new Error('Failed to generate content');

      const data = await response.json();
      setGeneratedContent(data.content);
      toast({
        title: "Content Generated",
        description: "Your content has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Content Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Content Type</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tarot">Tarot Reading</SelectItem>
              <SelectItem value="ritual">Ritual Description</SelectItem>
              <SelectItem value="product">Product Description</SelectItem>
              <SelectItem value="social">Social Media Post</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Prompt</Label>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your content prompt..."
            className="min-h-[100px]"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={loading || !prompt} 
          className="w-full"
        >
          {loading ? (
            <><FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <><FaMagic className="mr-2" /> Generate Content</>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-2">
            <Label>Generated Content</Label>
            <Textarea
              value={generatedContent}
              readOnly
              className="min-h-[200px]"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AIContentGenerator;