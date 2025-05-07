import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, getQueryFn, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Moon, 
  FileText, 
  Share2, 
  Code, 
  BarChart2,
  Plus,
  Calendar,
  Clock,
  Layout,
  Database,
  Download,
  Upload,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  Users
} from "lucide-react";

type WorkflowStep = {
  name: string;
  status: "Complete" | "In Progress" | "Not Started";
  date: string;
  dueDate?: string;
  assignee?: string;
  notes?: string;
  priority?: "High" | "Medium" | "Low";
};

type Workflow = {
  id: number;
  name: string;
  description: string;
  steps: WorkflowStep[];
  owner: string;
  category: string;
};

export default function WorkflowDashboard() {
  const [activeTab, setActiveTab] = useState("workflow");
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Workflows");
  const { toast } = useToast();

  // Fetch all workflows
  const { data: workflowData, isLoading } = useQuery({
    queryKey: ['/api/workflows'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Use proper type handling for data
  const workflows = workflowData?.workflows || [];

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

  // Workflow templates
  const workflowTemplates = [
    {
      name: "Product Launch",
      description: "Step-by-step process for launching a new digital product",
      steps: [
        { name: "Market Research", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Product Design", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Content Creation", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Website Update", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Email Campaign", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Social Media Promotion", status: "Not Started" as const, date: new Date().toLocaleDateString() }
      ],
      category: "Product Development"
    },
    {
      name: "Content Calendar",
      description: "Monthly content planning and production workflow",
      steps: [
        { name: "Theme Selection", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Content Outline", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Draft Creation", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Image Production", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Editing & Review", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Scheduling", status: "Not Started" as const, date: new Date().toLocaleDateString() }
      ],
      category: "Marketing"
    },
    {
      name: "Moon Phase Campaign",
      description: "Create content aligned with moon phase energy",
      steps: [
        { name: "Phase Research", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Theme Development", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Content Creation", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Graphics Design", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Scheduling", status: "Not Started" as const, date: new Date().toLocaleDateString() }
      ],
      category: "Marketing"
    },
    {
      name: "Notion Integration",
      description: "Connect new Notion database to the Midnight Magnolia ecosystem",
      steps: [
        { name: "API Setup", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Database Schema", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Integration Testing", status: "Not Started" as const, date: new Date().toLocaleDateString() },
        { name: "Documentation", status: "Not Started" as const, date: new Date().toLocaleDateString() }
      ],
      category: "Technical"
    }
  ];

  // State for template selection modal
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  // Function to create a new workflow
  const handleCreateWorkflow = () => {
    setIsTemplateModalOpen(true);
  };
  
  // Function to create from template
  const createFromTemplate = (template: any) => {
    const newWorkflow = {
      name: template.name,
      description: template.description,
      steps: template.steps,
      owner: "Latisha Waters",
      category: template.category
    };
    
    createWorkflowMutation.mutate(newWorkflow);
    setIsTemplateModalOpen(false);
  };
  
  // Function to create a blank workflow
  const createBlankWorkflow = () => {
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
    setIsTemplateModalOpen(false);
  };

  // State for export modal
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"json" | "csv" | "pdf">("json");
  
  // Function to update a workflow step's status
  const updateStepStatus = (stepIndex: number, newStatus: "Complete" | "In Progress" | "Not Started") => {
    if (!selectedWorkflow) return;
    
    const updatedWorkflow = { ...selectedWorkflow };
    updatedWorkflow.steps[stepIndex].status = newStatus;
    
    updateWorkflowMutation.mutate(updatedWorkflow);
  };
  
  // Function to handle workflow export
  const handleExport = () => {
    if (!selectedWorkflow) return;
    
    // Format data based on the selected export format
    let exportData: string;
    let fileName: string;
    let mimeType: string;
    
    switch (exportFormat) {
      case "json":
        exportData = JSON.stringify(selectedWorkflow, null, 2);
        fileName = `${selectedWorkflow.name.replace(/\s+/g, '_').toLowerCase()}_workflow.json`;
        mimeType = "application/json";
        break;
        
      case "csv":
        // Create CSV header
        const csvHeader = "Step Name,Status,Date\n";
        // Create CSV rows
        const csvRows = selectedWorkflow.steps.map(step => 
          `"${step.name}","${step.status}","${step.date}"`
        ).join('\n');
        
        exportData = csvHeader + csvRows;
        fileName = `${selectedWorkflow.name.replace(/\s+/g, '_').toLowerCase()}_workflow.csv`;
        mimeType = "text/csv";
        break;
        
      case "pdf":
        // For PDF, we'll just create a text representation
        // In a real app, you'd use a library like jsPDF
        exportData = `Workflow: ${selectedWorkflow.name}\n`;
        exportData += `Description: ${selectedWorkflow.description}\n`;
        exportData += `Owner: ${selectedWorkflow.owner}\n`;
        exportData += `Category: ${selectedWorkflow.category}\n\n`;
        exportData += `Steps:\n`;
        selectedWorkflow.steps.forEach((step, index) => {
          exportData += `${index + 1}. ${step.name} - ${step.status} (${step.date})\n`;
        });
        
        fileName = `${selectedWorkflow.name.replace(/\s+/g, '_').toLowerCase()}_workflow.txt`;
        mimeType = "text/plain";
        break;
        
      default:
        exportData = JSON.stringify(selectedWorkflow, null, 2);
        fileName = `${selectedWorkflow.name.replace(/\s+/g, '_').toLowerCase()}_workflow.json`;
        mimeType = "application/json";
    }
    
    // Create a blob and download link
    const blob = new Blob([exportData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Close modal and show success message
    setIsExportModalOpen(false);
    toast({
      title: "Workflow Exported",
      description: `The workflow has been exported as ${exportFormat.toUpperCase()}.`,
    });
  };

  return (
    <div className="space-y-6">
      <header className="bg-[#0A192F] text-[#FAF3E0] p-8 text-center border-b-[3px] border-[#D4AF37]">
        <h1 className="font-playfair text-4xl text-[#D4AF37] mb-2">MIDNIGHT MAGNOLIA</h1>
        <p className="text-xl font-normal">Visual Brand Dashboard</p>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="bg-[#051224] overflow-x-auto whitespace-nowrap mb-8 border-b-2 border-[#D4AF37]">
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
        </div>
        
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Color scheme for Midnight Magnolia</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Color palette content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="typography">
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
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Product catalog for Midnight Magnolia</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Products content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audience">
          <Card>
            <CardHeader>
              <CardTitle>Audience</CardTitle>
              <CardDescription>Target audience personas for Midnight Magnolia</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Audience content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="voice">
          <Card>
            <CardHeader>
              <CardTitle>Brand Voice</CardTitle>
              <CardDescription>Voice and tone guidelines for Midnight Magnolia</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Brand voice content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="architecture">
          <Card>
            <CardHeader>
              <CardTitle>Tech Architecture</CardTitle>
              <CardDescription>Technical infrastructure for Midnight Magnolia</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Tech architecture content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workflow">
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
                            <h3 className="text-lg font-medium text-[#0A192F]">{selectedCategory} ({filteredWorkflows.length})</h3>
                            <Button
                              onClick={handleCreateWorkflow}
                              className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Create Workflow
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredWorkflows.map((workflow) => (
                              <Card 
                                key={workflow.id} 
                                className="cursor-pointer hover:shadow-md transition-shadow duration-300"
                                onClick={() => setSelectedWorkflow(workflow)}
                              >
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg">
                                    {workflow.name}
                                  </CardTitle>
                                  <Badge className="text-xs">{workflow.category}</Badge>
                                </CardHeader>
                                <CardContent className="pb-3 pt-1">
                                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{workflow.description}</p>
                                  <div className="mt-4 text-xs text-gray-500">
                                    <span className="mr-4">
                                      <span className="mr-2">Owner:</span>
                                      <span className="font-medium">{workflow.owner}</span>
                                    </span>
                                    <span>
                                      <span className="mr-2">Steps:</span>
                                      <span className="font-medium">{workflow.steps.length}</span>
                                    </span>
                                  </div>
                                </CardContent>
                                <CardFooter className="pt-1">
                                  <div className="flex justify-between items-center w-full">
                                    <div className="text-xs text-gray-500">
                                      <span className="mr-2">Status:</span>
                                    </div>
                                    <div className="space-x-1 flex">
                                      {workflow.steps.slice(0, 3).map((step, index) => (
                                        <Badge 
                                          key={index}
                                          variant="outline" 
                                          className={`${getStatusStyle(step.status)} text-xs`}
                                        >
                                          {step.status}
                                        </Badge>
                                      ))}
                                      {workflow.steps.length > 3 && (
                                        <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs">
                                          +{workflow.steps.length - 3}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </CardFooter>
                              </Card>
                            ))}
                          </div>
                          
                          {filteredWorkflows.length === 0 && (
                            <div className="border border-dashed rounded-lg p-10 text-center">
                              <h3 className="text-lg font-medium text-gray-600 mb-2">No workflows found</h3>
                              <p className="text-gray-500 mb-6">There are no workflows in this category yet.</p>
                              <Button
                                onClick={handleCreateWorkflow}
                                className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Create First Workflow
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Template Selection Modal */}
      <Dialog open={isTemplateModalOpen} onOpenChange={setIsTemplateModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-[#0A192F]">Create New Workflow</DialogTitle>
            <DialogDescription>
              Choose a template or start from scratch to create your workflow.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card 
              className="cursor-pointer hover:border-[#D4AF37] transition-colors"
              onClick={createBlankWorkflow}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Layout className="w-5 h-5 mr-2 text-[#D4AF37]" />
                  Blank Workflow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Start with a clean slate and create a custom workflow from scratch.
                </p>
              </CardContent>
            </Card>
            
            {workflowTemplates.map((template, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:border-[#D4AF37] transition-colors"
                onClick={() => createFromTemplate(template)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    {template.category === "Product Development" ? (
                      <FileText className="w-5 h-5 mr-2 text-[#D4AF37]" />
                    ) : template.category === "Marketing" ? (
                      <Share2 className="w-5 h-5 mr-2 text-[#D4AF37]" />
                    ) : template.category === "Technical" ? (
                      <Database className="w-5 h-5 mr-2 text-[#D4AF37]" />
                    ) : (
                      <Calendar className="w-5 h-5 mr-2 text-[#D4AF37]" />
                    )}
                    {template.name}
                  </CardTitle>
                  <Badge variant="outline" className="ml-7">{template.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    {template.description}
                  </p>
                  <div className="text-xs text-gray-500">
                    {template.steps.length} steps
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Export Workflow Dialog */}
      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-[#0A192F]">Export Workflow</DialogTitle>
            <DialogDescription>
              Choose a format to export {selectedWorkflow?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <RadioGroup 
              value={exportFormat} 
              onValueChange={(value) => setExportFormat(value as "json" | "csv" | "pdf")}
              className="flex flex-col space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-500" />
                  JSON Format
                  <span className="ml-2 text-xs text-gray-500">(Recommended for developers)</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center">
                  <Database className="w-5 h-5 mr-2 text-green-500" />
                  CSV Format
                  <span className="ml-2 text-xs text-gray-500">(For spreadsheet software)</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-red-500" />
                  Text Format
                  <span className="ml-2 text-xs text-gray-500">(Simple text format)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => setIsExportModalOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleExport}
              className="bg-[#0A192F] hover:bg-[#142a48] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}