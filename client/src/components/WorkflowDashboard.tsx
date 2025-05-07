import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Calendar, Clock, FileText, Share2, Database, Code, CheckSquare, BarChart2, Moon } from 'lucide-react';
import { queryClient, getQueryFn, apiRequest } from '@/lib/queryClient';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Define workflow step structure
type WorkflowStep = {
  name: string;
  status: "Complete" | "In Progress" | "Not Started";
  date: string;
};

// Define the workflow type
type Workflow = {
  id: number;
  name: string;
  description: string;
  steps: WorkflowStep[];
  owner: string;
  category: string;
};

export default function WorkflowDashboard() {
  const [activeTab, setActiveTab] = useState('workflow');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Workflows");
  const { toast } = useToast();

  // Fetch all workflows
  const { data: workflowData, isLoading } = useQuery({
    queryKey: ['/api/workflows'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const workflows: Workflow[] = workflowData?.workflows || [];

  // Mutation for updating workflow
  const updateWorkflowMutation = useMutation({
    mutationFn: async (workflow: Workflow) => {
      return apiRequest('PATCH', `/api/workflows/${workflow.id}`, workflow);
    },
    onSuccess: async () => {
      toast({
        title: "Workflow Updated",
        description: "The workflow has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/workflows'] });
      setSelectedWorkflow(null);
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: `Failed to update workflow: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation for creating a new workflow
  const createWorkflowMutation = useMutation({
    mutationFn: async (workflow: Omit<Workflow, "id">) => {
      return apiRequest('POST', '/api/workflows', workflow);
    },
    onSuccess: async () => {
      toast({
        title: "Workflow Created",
        description: "The new workflow has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/workflows'] });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: `Failed to create workflow: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation for deleting a workflow
  const deleteWorkflowMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/workflows/${id}`);
    },
    onSuccess: async () => {
      toast({
        title: "Workflow Deleted",
        description: "The workflow has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/workflows'] });
      setSelectedWorkflow(null);
    },
    onError: (error: any) => {
      toast({
        title: "Deletion Failed",
        description: `Failed to delete workflow: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const workflowCategories = [
    { name: "All Workflows", icon: <Moon className="w-4 h-4 mr-2" /> },
    { name: "Product Development", icon: <FileText className="w-4 h-4 mr-2" /> },
    { name: "Marketing", icon: <Share2 className="w-4 h-4 mr-2" /> },
    { name: "Technical", icon: <Code className="w-4 h-4 mr-2" /> },
    { name: "Analytics", icon: <BarChart2 className="w-4 h-4 mr-2" /> },
  ];

  const filteredWorkflows = selectedCategory === "All Workflows" 
    ? workflows 
    : workflows.filter(workflow => workflow.category === selectedCategory);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Complete':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400';
    }
  };

  // Function to create a new workflow
  const handleCreateWorkflow = () => {
    const newWorkflow = {
      name: "New Workflow",
      description: "Description of the new workflow",
      steps: [
        { name: "Step 1", status: "Not Started" as const, date: new Date().toLocaleDateString() }
      ],
      owner: "Latisha Waters",
      category: selectedCategory === "All Workflows" ? "Product Development" : selectedCategory
    };
    
    createWorkflowMutation.mutate(newWorkflow);
  };

  // Function to update a workflow step's status
  const updateStepStatus = (stepIndex: number, newStatus: "Complete" | "In Progress" | "Not Started") => {
    if (!selectedWorkflow) return;
    
    const updatedWorkflow = { ...selectedWorkflow };
    updatedWorkflow.steps[stepIndex].status = newStatus;
    
    updateWorkflowMutation.mutate(updatedWorkflow);
  };

  return (
    <div className="space-y-6">
      <header className="bg-[#0A192F] text-[#FAF3E0] p-8 text-center border-b-[3px] border-[#D4AF37]">
        <h1 className="font-playfair text-4xl text-[#D4AF37] mb-2">MIDNIGHT MAGNOLIA</h1>
        <p className="text-xl font-normal">Visual Brand Dashboard</p>
      </header>
      
      <div className="bg-[#051224] overflow-x-auto whitespace-nowrap mb-8 border-b-2 border-[#D4AF37]">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b-0">
            <TabsTrigger 
              value="colors" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] data-[state=active]:bg-[rgba(212,175,55,0.1)] data-[state=active]:text-[#D4AF37] rounded-none px-6 py-4"
            >
              Color Palette
            </TabsTrigger>
            <TabsTrigger 
              value="typography" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] data-[state=active]:bg-[rgba(212,175,55,0.1)] data-[state=active]:text-[#D4AF37] rounded-none px-6 py-4"
            >
              Typography
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] data-[state=active]:bg-[rgba(212,175,55,0.1)] data-[state=active]:text-[#D4AF37] rounded-none px-6 py-4"
            >
              Products
            </TabsTrigger>
            <TabsTrigger 
              value="audience" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] data-[state=active]:bg-[rgba(212,175,55,0.1)] data-[state=active]:text-[#D4AF37] rounded-none px-6 py-4"
            >
              Audience
            </TabsTrigger>
            <TabsTrigger 
              value="voice" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] data-[state=active]:bg-[rgba(212,175,55,0.1)] data-[state=active]:text-[#D4AF37] rounded-none px-6 py-4"
            >
              Brand Voice
            </TabsTrigger>
            <TabsTrigger 
              value="architecture" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] data-[state=active]:bg-[rgba(212,175,55,0.1)] data-[state=active]:text-[#D4AF37] rounded-none px-6 py-4"
            >
              Tech Architecture
            </TabsTrigger>
            <TabsTrigger 
              value="workflow" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] data-[state=active]:bg-[rgba(212,175,55,0.1)] data-[state=active]:text-[#D4AF37] rounded-none px-6 py-4"
            >
              Workflows
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <TabsContent value="workflow" className="mt-0">
          <div>
            <Card className="bg-white shadow-sm mb-8">
              <CardHeader>
                <CardTitle className="text-[#0A192F] text-3xl border-b-2 border-[#D4AF37] pb-2 font-playfair">
                  Implementation Workflows
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Structured processes to ensure consistent application of the Midnight Magnolia brand across all touchpoints.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="h-10 w-10 border-4 border-[rgba(212,175,55,0.3)] border-t-[#D4AF37] rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-64 flex-shrink-0">
                      <div className="bg-[#0A192F] text-[#FAF3E0] p-4 rounded-t-lg font-playfair">
                        <h3 className="font-medium">Categories</h3>
                      </div>
                      <div className="border border-t-0 rounded-b-lg overflow-hidden">
                        {workflowCategories.map((category, index) => (
                          <div 
                            key={index}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`
                              p-3 cursor-pointer transition-all flex items-center
                              ${selectedCategory === category.name ? 'bg-gray-50 border-l-3 border-[#D4AF37]' : 'border-l-3 border-transparent'}
                              ${index !== workflowCategories.length - 1 ? 'border-b' : ''}
                            `}
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 bg-[#0A192F] text-[#FAF3E0] p-4 rounded-t-lg font-playfair">
                        <h3 className="font-medium">Quick Stats</h3>
                      </div>
                      <div className="border border-t-0 rounded-b-lg p-4">
                        <div className="mb-4">
                          <div className="text-sm text-gray-600">Active Workflows</div>
                          <div className="text-2xl font-semibold text-[#0A192F]">{workflows.length}</div>
                        </div>
                        <div className="mb-4">
                          <div className="text-sm text-gray-600">Completed Steps</div>
                          <div className="text-2xl font-semibold text-[#0A192F]">
                            {workflows.reduce((acc, workflow) => acc + workflow.steps.filter(step => step.status === 'Complete').length, 0)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">In Progress Steps</div>
                          <div className="text-2xl font-semibold text-[#0A192F]">
                            {workflows.reduce((acc, workflow) => acc + workflow.steps.filter(step => step.status === 'In Progress').length, 0)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      {selectedWorkflow ? (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <Button
                              variant="ghost"
                              onClick={() => setSelectedWorkflow(null)}
                              className="text-[#0A192F] hover:bg-gray-100"
                            >
                              ← Back to all workflows
                            </Button>
                          </div>
                          
                          <Card className="bg-[#0A192F] mb-4 border-none">
                            <CardContent className="pt-6">
                              <h3 className="text-2xl font-playfair text-[#D4AF37] mb-2">{selectedWorkflow.name}</h3>
                              <p className="text-[#FAF3E0] opacity-90 font-serif">{selectedWorkflow.description}</p>
                              <div className="flex items-center mt-4 text-sm text-[#FAF3E0] opacity-80">
                                <span className="mr-4">
                                  <span className="mr-2">Owner:</span>
                                  <span>{selectedWorkflow.owner}</span>
                                </span>
                                <span>
                                  <span className="mr-2">Category:</span>
                                  <span>{selectedWorkflow.category}</span>
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="bg-gray-50 py-4 px-6">
                              <div className="grid grid-cols-[3fr_1fr_1fr] gap-4 font-medium">
                                <div>Step</div>
                                <div>Status</div>
                                <div>Date</div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-0">
                              {selectedWorkflow.steps.map((step, index) => (
                                <div 
                                  key={index}
                                  className={`
                                    grid grid-cols-[3fr_1fr_1fr] gap-4 p-4 items-center
                                    ${index !== selectedWorkflow.steps.length - 1 ? 'border-b' : ''}
                                  `}
                                >
                                  <div className="flex items-center">
                                    <div 
                                      className={`
                                        w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3
                                        ${step.status === 'Complete' ? 'bg-green-100 text-green-700' : 
                                          step.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                                          'bg-gray-100 text-gray-700'}
                                      `}
                                    >
                                      {index + 1}
                                    </div>
                                    <span>{step.name}</span>
                                  </div>
                                  <div>
                                    <select 
                                      value={step.status}
                                      onChange={(e) => updateStepStatus(
                                        index, 
                                        e.target.value as "Complete" | "In Progress" | "Not Started"
                                      )}
                                      className="block w-full bg-transparent focus:ring-[#D4AF37] focus:border-[#D4AF37] rounded-md border-gray-300 text-sm"
                                    >
                                      <option value="Complete">Complete</option>
                                      <option value="In Progress">In Progress</option>
                                      <option value="Not Started">Not Started</option>
                                    </select>
                                  </div>
                                  <div className="text-sm text-gray-600">{step.date}</div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                          
                          <div className="mt-8 flex justify-end gap-4">
                            <Button 
                              variant="outline"
                              className="border-[#0A192F] text-[#0A192F]"
                            >
                              Export Workflow
                            </Button>
                            <Button 
                              onClick={() => deleteWorkflowMutation.mutate(selectedWorkflow.id)}
                              variant="destructive"
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Workflow
                            </Button>
                            <Button 
                              className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-playfair text-[#0A192F]">
                              {selectedCategory} ({filteredWorkflows.length})
                            </h3>
                            <Button 
                              onClick={handleCreateWorkflow}
                              className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                            >
                              <span className="text-lg mr-1">+</span> New Workflow
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredWorkflows.map((workflow) => (
                              <Card 
                                key={workflow.id}
                                onClick={() => setSelectedWorkflow(workflow)}
                                className="cursor-pointer hover:shadow-md transition-shadow"
                              >
                                <CardHeader className="bg-[#0A192F] border-b border-[rgba(212,175,55,0.3)]">
                                  <CardTitle className="text-xl text-[#FAF3E0] font-playfair">
                                    {workflow.name}
                                  </CardTitle>
                                  <Badge 
                                    variant="outline" 
                                    className="bg-[rgba(163,177,138,0.2)] text-[#A3B18A] mt-2 w-fit"
                                  >
                                    {workflow.category}
                                  </Badge>
                                </CardHeader>
                                <CardContent className="pt-4">
                                  <p className="text-gray-600 text-sm mb-4 font-serif line-clamp-2">{workflow.description}</p>
                                  
                                  <div className="flex gap-2 mb-4 text-xs">
                                    <div className="flex items-center gap-1">
                                      <CheckSquare className="w-3 h-3" />
                                      <span>
                                        {workflow.steps.filter(step => step.status === 'Complete').length} / {workflow.steps.length}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>
                                        Updated recently
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="h-1 bg-gray-100 rounded">
                                    <div 
                                      className="h-1 bg-[#D4AF37] rounded"
                                      style={{ 
                                        width: `${(workflow.steps.filter(step => step.status === 'Complete').length / workflow.steps.length) * 100}%` 
                                      }}
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Other tabs would go here - we're only implementing the workflow tab for now */}
        <TabsContent value="colors" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Midnight Magnolia's brand colors</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Color palette content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="typography" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Typography guidelines for Midnight Magnolia</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Typography content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
}