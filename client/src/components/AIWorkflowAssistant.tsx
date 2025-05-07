import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
// Define interfaces matching the server-side workflow types
interface Workflow {
  id: number;
  name: string;
  description: string;
  steps: WorkflowStep[];
  owner: string;
  category: string;
}

interface WorkflowStep {
  name: string;
  status: "Complete" | "In Progress" | "Not Started";
  date: string;
  title?: string;
  description?: string;
  priority?: string;
  notes?: string;
  assignee?: string;
  dueDate?: string;
}
import { Wand2, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AIWorkflowAssistantProps {
  workflow?: Workflow;
  onApplySteps: (steps: WorkflowStep[]) => void;
}

interface GenerateWorkflowStepsRequest {
  title?: string;
  description?: string;
  category?: string;
  prompt: string;
  workflowType: string;
}

interface GenerateWorkflowStepsResponse {
  steps: WorkflowStep[];
}

export function AIWorkflowAssistant({ workflow, onApplySteps }: AIWorkflowAssistantProps) {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [workflowType, setWorkflowType] = useState('content-creation');
  const [generatedSteps, setGeneratedSteps] = useState<WorkflowStep[]>([]);

  const generateStepsMutation = useMutation({
    mutationFn: async (data: GenerateWorkflowStepsRequest) => {
      const response = await apiRequest('POST', '/api/openai/generate-workflow-steps', data);
      return response.json() as Promise<GenerateWorkflowStepsResponse>;
    },
    onSuccess: (data) => {
      setGeneratedSteps(data.steps);
      toast({
        title: 'Workflow steps generated!',
        description: `${data.steps.length} steps have been generated for your workflow.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error generating workflow steps',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleGenerateSteps = () => {
    if (!prompt) {
      toast({
        title: 'Please enter a prompt',
        description: 'Describe what kind of workflow you need to generate.',
        variant: 'destructive',
      });
      return;
    }

    generateStepsMutation.mutate({
      title: workflow?.name,
      description: workflow?.description,
      category: workflow?.category,
      prompt,
      workflowType,
    });
  };

  const handleApplySteps = () => {
    onApplySteps(generatedSteps);
    toast({
      title: 'Steps applied to workflow',
      description: 'The generated steps have been added to your workflow.',
    });
  };

  return (
    <Card className="border-[#D4AF37]/20">
      <CardHeader>
        <CardTitle className="text-xl font-playfair text-[#0A192F] flex items-center">
          <Wand2 className="mr-2 h-5 w-5 text-[#D4AF37]" />
          AI Workflow Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Let our AI assistant help you generate workflow steps based on your needs. 
            Describe what you're trying to accomplish, and we'll suggest a structured workflow.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="workflow-type" className="block text-sm font-medium text-gray-700 mb-1">
              Workflow Type
            </label>
            <Select value={workflowType} onValueChange={setWorkflowType}>
              <SelectTrigger id="workflow-type" className="w-full">
                <SelectValue placeholder="Select workflow type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="content-creation">Content Creation</SelectItem>
                  <SelectItem value="product-launch">Product Launch</SelectItem>
                  <SelectItem value="marketing-campaign">Marketing Campaign</SelectItem>
                  <SelectItem value="client-onboarding">Client Onboarding</SelectItem>
                  <SelectItem value="digital-product">Digital Product</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
              Describe your workflow needs
            </label>
            <Textarea
              id="prompt"
              placeholder="e.g., I need a workflow for creating a new tarot-themed ebook including writing, editing, and design steps"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        {generatedSteps.length > 0 && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium text-[#0A192F] flex items-center">
              <Sparkles className="mr-2 h-4 w-4 text-[#D4AF37]" />
              Generated Steps
            </h3>
            <div className="bg-[#0A192F]/5 p-4 rounded-md border border-[#A3B18A]/30">
              <ol className="space-y-2 list-decimal list-inside">
                {generatedSteps.map((step, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">{step.title}</span>
                    {step.description && (
                      <p className="ml-6 text-xs text-gray-600">{step.description}</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="secondary" 
          onClick={handleGenerateSteps}
          disabled={generateStepsMutation.isPending || !prompt}
        >
          {generateStepsMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Steps
            </>
          )}
        </Button>
        
        {generatedSteps.length > 0 && (
          <Button 
            variant="default" 
            onClick={handleApplySteps}
            className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Apply to Workflow
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}