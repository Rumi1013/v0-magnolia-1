import React from 'react';
import AIWorkflowAssistant from '@/components/AIWorkflowAssistant';

const WorkflowPage: React.FC = () => {
  return (
    <div className="bg-[#FAF3E0]/30 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-playfair text-[#0A192F] mb-2">Guided Workflows</h1>
          <p className="text-[#0A192F]/70">Follow structured workflows to streamline your content creation process</p>
        </header>
        
        <AIWorkflowAssistant />
      </div>
    </div>
  );
};

export default WorkflowPage;