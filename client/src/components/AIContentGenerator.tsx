import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export const AIContentGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState('blog');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/openai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType, topic })
      });
      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error('Error generating content:', error);
    }
    setLoading(false);
  };

  return (
    <Card className="p-6 bg-[#0A192F]/60 border-[#D4AF37]/20">
      <div className="grid gap-4">
        <Select
          value={contentType}
          onValueChange={setContentType}
          options={[
            { value: 'blog', label: 'Blog Post' },
            { value: 'social', label: 'Social Media' },
            { value: 'email', label: 'Email Newsletter' },
            { value: 'product', label: 'Product Description' }
          ]}
        />
        <Input
          placeholder="Enter your topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-[#D4AF37] text-[#0A192F]"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Content
        </Button>
        {generatedContent && (
          <Textarea
            value={generatedContent}
            readOnly
            className="mt-4 h-40"
          />
        )}
      </div>
    </Card>
  );
};