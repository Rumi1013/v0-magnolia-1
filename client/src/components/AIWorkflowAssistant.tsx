import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Loader2, 
  FlaskConical, 
  Check, 
  Plus, 
  Wand2, 
  Sparkles, 
  FileCheck 
} from 'lucide-react';

interface WorkflowStep {
  name: string;
  title?: string;
  description?: string;
  notes?: string;
  priority?: 'High' | 'Medium' | 'Low';
  assignee?: string;
  dueDate?: string;
}

interface Workflow {
  id: number;
  name: string;
  description: string;
  category: string;
  steps: any[];
  owner: string;
}

interface AIWorkflowAssistantProps {
  workflow: Workflow | null;
  onApplySteps: (steps: WorkflowStep[]) => void;
}

export function AIWorkflowAssistant({ workflow, onApplySteps }: AIWorkflowAssistantProps) {
  const { toast } = useToast();
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [numSteps, setNumSteps] = useState('5');
  const [detailLevel, setDetailLevel] = useState('medium');
  const [includeAssignees, setIncludeAssignees] = useState(false);
  const [includeDueDates, setIncludeDueDates] = useState(false);
  const [generatedSteps, setGeneratedSteps] = useState<WorkflowStep[]>([]);
  
  const generateStepsMutation = useMutation({
    mutationFn: async (data: {
      workflowName: string;
      workflowDescription: string;
      numSteps: number;
      detailLevel: string;
      includeAssignees: boolean;
      includeDueDates: boolean;
    }) => {
      const response = await apiRequest('POST', '/api/openai/generate-workflow-steps', data);
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedSteps(data.steps || []);
      toast({
        title: 'Workflow steps generated',
        description: 'AI has created steps based on your workflow description.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error generating workflow steps',
        description: error.message || 'An error occurred while generating workflow steps',
        variant: 'destructive',
      });
    },
  });

  const handleGenerateSteps = () => {
    if (!workflowDescription.trim()) {
      toast({
        title: 'Description required',
        description: 'Please enter a workflow description',
        variant: 'destructive',
      });
      return;
    }

    generateStepsMutation.mutate({
      workflowName: workflow?.name || 'New Workflow',
      workflowDescription,
      numSteps: parseInt(numSteps),
      detailLevel,
      includeAssignees,
      includeDueDates,
    });
  };

  const handleApplySteps = () => {
    if (generatedSteps.length === 0) {
      toast({
        title: 'No steps to apply',
        description: 'Please generate workflow steps first',
        variant: 'destructive',
      });
      return;
    }

    onApplySteps(generatedSteps);
    toast({
      title: 'Steps applied to workflow',
      description: `${generatedSteps.length} steps have been added to your workflow.`,
    });
    
    // Reset after applying
    setGeneratedSteps([]);
    setWorkflowDescription('');
  };

  return (
    <Card className="border-[#D4AF37]/20">
      <CardHeader className="border-b border-[#A3B18A]/20">
        <CardTitle className="text-lg font-playfair text-[#0A192F] flex items-center">
          <Wand2 className="w-5 h-5 text-[#D4AF37] mr-2" />
          AI Workflow Assistant
        </CardTitle>
        <CardDescription>
          Generate workflow steps based on your description
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="workflow-description">Workflow Description</Label>
            <Textarea
              id="workflow-description"
              placeholder="Describe the workflow you want to create..."
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Include details about the workflow's purpose, target outcomes, and any specific requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="num-steps">Number of Steps</Label>
              <Select value={numSteps} onValueChange={setNumSteps}>
                <SelectTrigger id="num-steps">
                  <SelectValue placeholder="Select number of steps" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 steps</SelectItem>
                  <SelectItem value="5">5 steps</SelectItem>
                  <SelectItem value="7">7 steps</SelectItem>
                  <SelectItem value="10">10 steps</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="detail-level">Detail Level</Label>
              <Select value={detailLevel} onValueChange={setDetailLevel}>
                <SelectTrigger id="detail-level">
                  <SelectValue placeholder="Select detail level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-assignees"
                  checked={includeAssignees}
                  onChange={(e) => setIncludeAssignees(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-assignees" className="text-sm">Assignees</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-due-dates"
                  checked={includeDueDates}
                  onChange={(e) => setIncludeDueDates(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-due-dates" className="text-sm">Due Dates</Label>
              </div>
            </div>
          </div>
        </div>
        
        {generateStepsMutation.isPending ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mb-4" />
            <p className="text-gray-600">Generating workflow steps...</p>
          </div>
        ) : generatedSteps.length > 0 ? (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-[#0A192F]">Generated Workflow Steps</h3>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setGeneratedSteps([])}
              >
                Clear
              </Button>
            </div>
            
            <div className="border rounded-lg divide-y">
              {generatedSteps.map((step, index) => (
                <div key={index} className="p-4 hover:bg-[#0A192F]/5 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-medium text-[#0A192F]">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#0A192F]">{step.title || step.name}</h4>
                      {step.description && (
                        <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {step.priority && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            step.priority === 'High' ? 'bg-red-100 text-red-800' :
                            step.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {step.priority}
                          </span>
                        )}
                        
                        {step.assignee && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {step.assignee}
                          </span>
                        )}
                        
                        {step.dueDate && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                            Due: {step.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={handleApplySteps}
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#0A192F]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Apply to Workflow
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="border-t border-[#A3B18A]/20 p-4">
        <Button 
          onClick={handleGenerateSteps}
          disabled={generateStepsMutation.isPending || !workflowDescription.trim()}
          className="bg-[#0A192F] hover:bg-[#0A192F]/80 text-white"
        >
          {generateStepsMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Steps
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}