import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AIContentGenerator() {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('tarot');

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Content Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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

          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your content prompt..."
            className="min-h-[100px]"
          />

          <Button className="w-full">
            Generate Content
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}