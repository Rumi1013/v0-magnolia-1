import React from 'react';
import { AIToolsSection } from '@/components/AIToolsSection';

export default function AIToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair text-[#0A192F] mb-8">AI Tools & Integration</h1>
      <AIToolsSection />
    </div>
  );
}