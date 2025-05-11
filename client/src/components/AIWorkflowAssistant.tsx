import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Loader2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  ListChecks,
  AlignLeft,
  Clock,
  Calendar
} from 'lucide-react';

// Workflow template type
interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: WorkflowStep[];
}

// Workflow step type
interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  estimatedTime: string;
}

const AIWorkflowAssistant: React.FC = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // Workflow templates
  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: 'content-creation',
      title: 'Content Creation Workflow',
      description: 'A step-by-step process for creating compelling content from ideation to publication.',
      icon: <AlignLeft className="h-6 w-6" />,
      steps: [
        {
          id: 'ideation',
          title: 'Step 1: Ideation & Research',
          description: 'Begin by brainstorming ideas and conducting necessary research.',
          tasks: [
            'Identify target audience and content goals',
            'Research market trends and competitor content',
            'Brainstorm 3-5 content ideas',
            'Select the most promising concept'
          ],
          estimatedTime: '30-60 minutes'
        },
        {
          id: 'outline',
          title: 'Step 2: Content Outlining',
          description: 'Create a structured outline for your content.',
          tasks: [
            'Define the main sections of your content',
            'Organize key points in logical order',
            'Identify supporting materials needed',
            'Set content length and format guidelines'
          ],
          estimatedTime: '20-40 minutes'
        },
        {
          id: 'creation',
          title: 'Step 3: Content Creation',
          description: 'Draft your content based on the outline.',
          tasks: [
            'Write an engaging introduction',
            'Develop main content sections',
            'Include relevant examples and stories',
            'Craft a compelling conclusion or call-to-action'
          ],
          estimatedTime: '1-3 hours'
        },
        {
          id: 'editing',
          title: 'Step 4: Editing & Refinement',
          description: 'Polish your content to ensure quality and clarity.',
          tasks: [
            'Check content for clarity and flow',
            'Eliminate unnecessary words and jargon',
            'Verify facts and support claims with evidence',
            'Ensure content aligns with brand voice and style'
          ],
          estimatedTime: '30-60 minutes'
        },
        {
          id: 'publication',
          title: 'Step 5: Publication & Distribution',
          description: 'Prepare your content for release and share it.',
          tasks: [
            'Format content for the chosen platform',
            'Add relevant tags, categories, and metadata',
            'Schedule publication date and time',
            'Plan social media and email promotion'
          ],
          estimatedTime: '20-40 minutes'
        }
      ]
    },
    {
      id: 'product-launch',
      title: 'Digital Product Launch',
      description: 'A comprehensive workflow for launching a new digital product or service.',
      icon: <Calendar className="h-6 w-6" />,
      steps: [
        {
          id: 'market-research',
          title: 'Step 1: Market Research & Validation',
          description: 'Validate your product idea with market research.',
          tasks: [
            'Identify target customer segments',
            'Analyze competitor offerings and pricing',
            'Conduct customer interviews or surveys',
            'Define unique value proposition'
          ],
          estimatedTime: '1-2 weeks'
        },
        {
          id: 'product-development',
          title: 'Step 2: Product Development',
          description: 'Create and refine your digital product.',
          tasks: [
            'Outline product features and scope',
            'Design product interface or structure',
            'Develop initial version (MVP)',
            'Test functionality and user experience'
          ],
          estimatedTime: '2-4 weeks'
        },
        {
          id: 'launch-prep',
          title: 'Step 3: Launch Preparation',
          description: 'Prepare marketing assets and launch strategy.',
          tasks: [
            'Create sales page and product descriptions',
            'Develop email campaign sequence',
            'Prepare social media announcements',
            'Set up payment processing and delivery system'
          ],
          estimatedTime: '1-2 weeks'
        },
        {
          id: 'launch-execution',
          title: 'Step 4: Launch Execution',
          description: 'Execute your product launch according to plan.',
          tasks: [
            'Announce to email list and social media',
            'Activate any planned promotions or discounts',
            'Monitor sales and customer feedback',
            'Address technical issues promptly'
          ],
          estimatedTime: '1-2 weeks'
        },
        {
          id: 'post-launch',
          title: 'Step 5: Post-Launch Optimization',
          description: 'Gather feedback and improve your product.',
          tasks: [
            'Collect and analyze customer feedback',
            'Identify and fix issues or bugs',
            'Plan product improvements or expansions',
            'Develop customer retention strategy'
          ],
          estimatedTime: 'Ongoing'
        }
      ]
    },
    {
      id: 'social-campaign',
      title: 'Social Media Campaign',
      description: 'Plan and execute an effective social media campaign for maximum engagement.',
      icon: <ListChecks className="h-6 w-6" />,
      steps: [
        {
          id: 'campaign-planning',
          title: 'Step 1: Campaign Planning',
          description: 'Define your campaign goals and strategy.',
          tasks: [
            'Set specific, measurable campaign objectives',
            'Identify target platforms and audience',
            'Develop campaign theme and messaging',
            'Set campaign timeline and budget'
          ],
          estimatedTime: '2-3 days'
        },
        {
          id: 'content-creation',
          title: 'Step 2: Content Creation',
          description: 'Develop the content for your campaign.',
          tasks: [
            'Create content calendar with posting schedule',
            'Design graphics and visual elements',
            'Write engaging captions and copy',
            'Prepare videos or other multimedia content'
          ],
          estimatedTime: '3-5 days'
        },
        {
          id: 'campaign-setup',
          title: 'Step 3: Campaign Setup',
          description: 'Set up tracking and automation for your campaign.',
          tasks: [
            'Configure tracking links and analytics',
            'Set up scheduled posts and automation',
            'Prepare engagement response templates',
            'Brief team members on roles and responsibilities'
          ],
          estimatedTime: '1-2 days'
        },
        {
          id: 'campaign-execution',
          title: 'Step 4: Campaign Execution',
          description: 'Launch and manage your social media campaign.',
          tasks: [
            'Publish initial campaign content',
            'Monitor engagement and respond to comments',
            'Adjust posting schedule based on performance',
            'Share and repurpose user-generated content'
          ],
          estimatedTime: 'Campaign duration'
        },
        {
          id: 'campaign-analysis',
          title: 'Step 5: Analysis & Reporting',
          description: 'Evaluate campaign performance and document learnings.',
          tasks: [
            'Gather metrics and KPIs from all platforms',
            'Compare results against initial objectives',
            'Identify most successful content and approaches',
            'Document learnings for future campaigns'
          ],
          estimatedTime: '1-2 days'
        }
      ]
    }
  ];
  
  // Helper function to get current step
  const getCurrentStep = () => {
    if (!selectedTemplate) return null;
    return selectedTemplate.steps[currentStepIndex];
  };
  
  // Toggle task completion
  const toggleTaskCompletion = (stepId: string, taskIndex: number) => {
    const taskId = `${stepId}-task-${taskIndex}`;
    const newCompletedSteps = new Set(completedSteps);
    
    if (newCompletedSteps.has(taskId)) {
      newCompletedSteps.delete(taskId);
    } else {
      newCompletedSteps.add(taskId);
    }
    
    setCompletedSteps(newCompletedSteps);
  };
  
  // Check if a task is completed
  const isTaskCompleted = (stepId: string, taskIndex: number) => {
    return completedSteps.has(`${stepId}-task-${taskIndex}`);
  };
  
  // Check if all tasks in a step are completed
  const isStepCompleted = (step: WorkflowStep) => {
    return step.tasks.every((_, index) => isTaskCompleted(step.id, index));
  };
  
  // Handle template selection
  const handleSelectTemplate = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
  };
  
  // Handle step navigation
  const handleNextStep = () => {
    if (!selectedTemplate) return;
    if (currentStepIndex < selectedTemplate.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  // Handle AI generation for task assistance
  const handleGenerateAssistance = () => {
    const currentStep = getCurrentStep();
    if (!currentStep) return;
    
    setIsGenerating(true);
    
    // Simulated AI response, in real implementation this would call an API
    setTimeout(() => {
      toast({
        title: "AI Assistance Generated",
        description: `Suggestions for '${currentStep.title}' have been created.`,
      });
      setIsGenerating(false);
    }, 1500);
  };
  
  // Reset workflow
  const handleResetWorkflow = () => {
    if (!selectedTemplate) return;
    
    setCompletedSteps(new Set());
    setCurrentStepIndex(0);
    
    toast({
      title: "Workflow Reset",
      description: "All progress has been reset.",
    });
  };
  
  // Complete workflow
  const handleCompleteWorkflow = () => {
    if (!selectedTemplate) return;
    
    toast({
      title: "Workflow Completed",
      description: `Congratulations! You've completed the '${selectedTemplate.title}' workflow.`,
    });
    
    setSelectedTemplate(null);
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
  };
  
  // Render template selection
  const renderTemplateSelection = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair text-[#0A192F] mb-2">Choose a Workflow Template</h2>
          <p className="text-[#0A192F]/70">Select a guided workflow to help structure your project</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workflowTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="bg-white border-[#0A192F]/10 cursor-pointer hover:border-[#0A192F]/30 transition-colors"
              onClick={() => handleSelectTemplate(template)}
            >
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-md bg-[#D4AF37]/10 flex items-center justify-center mr-3 text-[#D4AF37]">
                    {template.icon}
                  </div>
                  <CardTitle className="text-lg font-playfair text-[#0A192F]">{template.title}</CardTitle>
                </div>
                <CardDescription className="text-[#0A192F]/70">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-t border-[#0A192F]/10 pt-4">
                <Badge className="bg-[#0A192F]/10 text-[#0A192F]">
                  {template.steps.length} steps
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto text-[#0A192F] hover:text-[#D4AF37]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTemplate(template);
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  // Render workflow steps
  const renderWorkflowSteps = () => {
    if (!selectedTemplate) return null;
    
    const currentStep = getCurrentStep();
    if (!currentStep) return null;
    
    const stepProgress = (currentStepIndex / (selectedTemplate.steps.length - 1)) * 100;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            className="text-[#0A192F]/60 hover:text-[#0A192F]"
            onClick={() => setSelectedTemplate(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Templates
          </Button>
          <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50">
            Step {currentStepIndex + 1} of {selectedTemplate.steps.length}
          </Badge>
        </div>
        
        <div className="relative mb-8">
          <div className="w-full h-2 bg-[#0A192F]/10 rounded-full">
            <div 
              className="h-2 bg-[#D4AF37] rounded-full transition-all"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2">
            {selectedTemplate.steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex flex-col items-center cursor-pointer ${
                  index <= currentStepIndex ? 'text-[#D4AF37]' : 'text-[#0A192F]/40'
                }`}
                onClick={() => setCurrentStepIndex(index)}
              >
                <div 
                  className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    index < currentStepIndex ? 'bg-[#D4AF37] text-white' :
                    index === currentStepIndex ? 'border-2 border-[#D4AF37]' :
                    'border border-[#0A192F]/30'
                  }`}
                >
                  {index < currentStepIndex ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs mt-1 hidden md:block">{step.title.split(':')[1]}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Card className="bg-white border-[#0A192F]/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-playfair text-[#0A192F]">{currentStep.title}</CardTitle>
                <CardDescription className="text-[#0A192F]/70 mt-1">
                  {currentStep.description}
                </CardDescription>
              </div>
              <div className="flex items-center text-[#0A192F]/60 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{currentStep.estimatedTime}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <h3 className="font-medium text-[#0A192F]">Tasks:</h3>
              <ul className="space-y-3">
                {currentStep.tasks.map((task, index) => (
                  <li 
                    key={index} 
                    className="flex items-start"
                    onClick={() => toggleTaskCompletion(currentStep.id, index)}
                  >
                    <div 
                      className={`h-5 w-5 rounded border cursor-pointer flex-shrink-0 mt-0.5 ${
                        isTaskCompleted(currentStep.id, index) ? 
                        'bg-[#D4AF37] border-[#D4AF37] flex items-center justify-center' : 
                        'border-[#0A192F]/30'
                      }`}
                    >
                      {isTaskCompleted(currentStep.id, index) && (
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className={`ml-3 ${
                      isTaskCompleted(currentStep.id, index) ? 
                      'text-[#0A192F]/60 line-through' : 
                      'text-[#0A192F]'
                    }`}>
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 border-t border-[#0A192F]/10 pt-6">
              <h3 className="font-medium text-[#0A192F] mb-4">Need help with this step?</h3>
              <Button 
                onClick={handleGenerateAssistance}
                disabled={isGenerating}
                className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate AI Assistance
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t border-[#0A192F]/10 pt-4">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                onClick={handleResetWorkflow}
              >
                Reset Progress
              </Button>
            </div>
            
            <div className="flex space-x-2">
              {currentStepIndex > 0 && (
                <Button 
                  variant="outline" 
                  className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                  onClick={handlePreviousStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
              )}
              
              {currentStepIndex < selectedTemplate.steps.length - 1 ? (
                <Button 
                  className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                  onClick={handleNextStep}
                  disabled={!isStepCompleted(currentStep)}
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                  onClick={handleCompleteWorkflow}
                  disabled={!isStepCompleted(currentStep)}
                >
                  Complete Workflow
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="p-6">
      {selectedTemplate ? renderWorkflowSteps() : renderTemplateSelection()}
    </div>
  );
};

// Use named export to avoid issues
export { AIWorkflowAssistant };
export default AIWorkflowAssistant;