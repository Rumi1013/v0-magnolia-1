import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, 
  Play, 
  Pause, 
  Plus, 
  PlusCircle, 
  RotateCw, 
  Clock, 
  Calendar, 
  Users, 
  FileText, 
  BarChart4,
  Database 
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

// Workflow categories
const categories = [
  { id: 'all', name: 'All Workflows' },
  { id: 'content-creation', name: 'Content Creation', icon: FileText },
  { id: 'content-delivery', name: 'Content Delivery', icon: Calendar },
  { id: 'patron-management', name: 'Patron Management', icon: Users },
  { id: 'integration', name: 'Data Integration', icon: Database },
  { id: 'analytics', name: 'Analytics & Reports', icon: BarChart4 }
];

// Interface for workflows
interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  category: string;
  nextRun?: string;
  lastRun?: string;
  totalRuns?: number;
}

// Interface for workflow blueprint
interface WorkflowBlueprint {
  id: string;
  name: string;
  description: string;
  category: string;
}

const WorkflowPage: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showBlueprintModal, setShowBlueprintModal] = useState(false);

  // Mock data - will be replaced with real API calls
  const mockWorkflows: Workflow[] = [
    {
      id: 'workflow-1',
      name: 'Monthly Content Batch Production',
      description: 'Automates the monthly content batch creation process for Midnight Magnolia Patreon',
      status: 'active',
      category: 'content-creation',
      nextRun: '2025-06-01T00:00:00Z',
      lastRun: '2025-05-01T00:00:00Z',
      totalRuns: 5
    },
    {
      id: 'workflow-2',
      name: 'Patreon Content Publishing',
      description: 'Automatically publishes scheduled content to Patreon from Notion',
      status: 'active',
      category: 'content-delivery',
      nextRun: '2025-05-13T00:00:00Z',
      lastRun: '2025-05-12T00:00:00Z',
      totalRuns: 42
    },
    {
      id: 'workflow-3',
      name: 'New Patron Welcome Sequence',
      description: 'Automatically process and welcome new Patreon members',
      status: 'active',
      category: 'patron-management',
      lastRun: '2025-05-10T15:23:00Z',
      totalRuns: 28
    },
    {
      id: 'workflow-4',
      name: 'Notion to Airtable Content Sync',
      description: 'Synchronizes content database between Notion and Airtable',
      status: 'inactive',
      category: 'integration',
      lastRun: '2025-05-01T00:00:00Z',
      totalRuns: 30
    },
    {
      id: 'workflow-5',
      name: 'Weekly Analytics Report',
      description: 'Generates and delivers a weekly report of Patreon and content analytics',
      status: 'active',
      category: 'analytics',
      nextRun: '2025-05-20T08:00:00Z',
      lastRun: '2025-05-13T08:00:00Z',
      totalRuns: 15
    }
  ];

  const mockBlueprints: WorkflowBlueprint[] = [
    {
      id: 'monthly-content-batch',
      name: 'Monthly Content Batch Production',
      description: 'Automates the monthly content batch creation process for Midnight Magnolia Patreon',
      category: 'content-creation'
    },
    {
      id: 'patreon-post-scheduler',
      name: 'Patreon Content Publishing',
      description: 'Automatically publishes scheduled content to Patreon from Notion',
      category: 'content-delivery'
    },
    {
      id: 'patron-welcome-automation',
      name: 'New Patron Welcome Sequence',
      description: 'Automatically process and welcome new Patreon members',
      category: 'patron-management'
    },
    {
      id: 'notion-airtable-sync',
      name: 'Notion to Airtable Content Sync',
      description: 'Synchronizes content database between Notion and Airtable',
      category: 'integration'
    },
    {
      id: 'weekly-analytics-report',
      name: 'Weekly Analytics Report',
      description: 'Generates and delivers a weekly report of Patreon and content analytics',
      category: 'analytics'
    }
  ];

  // Replace with real API calls when ready
  const { data: workflows, isLoading } = useQuery({
    queryKey: ['/api/admin/workflows'],
    enabled: false, // Disable for now
    initialData: mockWorkflows
  });

  const { data: blueprints } = useQuery({
    queryKey: ['/api/admin/workflows/blueprints'],
    enabled: false, // Disable for now
    initialData: mockBlueprints
  });

  // Mutations
  const activateWorkflowMutation = useMutation({
    mutationFn: (workflowId: string) =>
      apiRequest('POST', `/api/admin/workflows/${workflowId}/activate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/workflows'] });
      toast({
        title: 'Workflow activated',
        description: 'The workflow has been successfully activated',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to activate workflow',
        description: 'There was an error activating the workflow',
        variant: 'destructive',
      });
    },
  });

  const deactivateWorkflowMutation = useMutation({
    mutationFn: (workflowId: string) =>
      apiRequest('POST', `/api/admin/workflows/${workflowId}/deactivate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/workflows'] });
      toast({
        title: 'Workflow deactivated',
        description: 'The workflow has been successfully deactivated',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to deactivate workflow',
        description: 'There was an error deactivating the workflow',
        variant: 'destructive',
      });
    },
  });

  const deployBlueprintMutation = useMutation({
    mutationFn: (blueprintId: string) =>
      apiRequest('POST', '/api/admin/workflows/deploy', { blueprintName: blueprintId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/workflows'] });
      setShowBlueprintModal(false);
      toast({
        title: 'Workflow deployed',
        description: 'The workflow has been successfully deployed from blueprint',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to deploy workflow',
        description: 'There was an error deploying the workflow from blueprint',
        variant: 'destructive',
      });
    },
  });

  // Filter workflows by category
  const filteredWorkflows = activeCategory === 'all'
    ? workflows
    : workflows?.filter(workflow => workflow.category === activeCategory);

  // Function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Function to get category icon
  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    const Icon = category?.icon || FileText;
    return <Icon className="h-4 w-4 mr-2" />;
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair text-[#D4AF37] mb-2">Workflow Automation</h1>
            <p className="text-[#FAF3E0] opacity-80 font-lora">
              Manage and monitor your content creation and delivery automation workflows.
            </p>
          </div>
          <Button 
            onClick={() => setShowBlueprintModal(true)}
            className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Deploy New Workflow
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-[#0A192F]/50">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-[#FAF3E0] data-[state=active]:text-[#D4AF37] data-[state=active]:bg-[#0A192F]/70"
              >
                {category.icon && <category.icon className="h-4 w-4 mr-2" />}
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {isLoading ? (
                <div className="col-span-2 flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                </div>
              ) : filteredWorkflows && filteredWorkflows.length > 0 ? (
                filteredWorkflows.map(workflow => (
                  <Card key={workflow.id} className="bg-[#0A192F] border border-[#A3B18A]/30">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-[#D4AF37] flex items-center">
                            {getCategoryIcon(workflow.category)}
                            {workflow.name}
                          </CardTitle>
                          <CardDescription className="text-[#FAF3E0]/70">
                            {workflow.description}
                          </CardDescription>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          workflow.status === 'active' ? 'bg-green-500/20 text-green-500' :
                          workflow.status === 'draft' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-gray-500/20 text-gray-500'
                        }`}>
                          {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="grid grid-cols-2 gap-4 text-sm text-[#FAF3E0]">
                        <div>
                          <div className="flex items-center text-[#A3B18A] mb-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Last Run</span>
                          </div>
                          <div>{formatDate(workflow.lastRun)}</div>
                        </div>
                        <div>
                          <div className="flex items-center text-[#A3B18A] mb-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Next Run</span>
                          </div>
                          <div>{formatDate(workflow.nextRun)}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center text-[#A3B18A] mb-1">
                            <RotateCw className="h-3 w-3 mr-1" />
                            <span>Total Executions</span>
                          </div>
                          <div>{workflow.totalRuns || 0}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 flex justify-between">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (workflow.status === 'active') {
                            deactivateWorkflowMutation.mutate(workflow.id);
                          } else {
                            activateWorkflowMutation.mutate(workflow.id);
                          }
                        }}
                        disabled={activateWorkflowMutation.isPending || deactivateWorkflowMutation.isPending}
                        className={`border-[#A3B18A]/50 ${
                          workflow.status === 'active' 
                            ? 'text-[#FAF3E0]' 
                            : 'text-green-500'
                        }`}
                      >
                        {activateWorkflowMutation.isPending || deactivateWorkflowMutation.isPending ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : workflow.status === 'active' ? (
                          <Pause className="h-4 w-4 mr-2" />
                        ) : (
                          <Play className="h-4 w-4 mr-2" />
                        )}
                        {workflow.status === 'active' ? 'Pause' : 'Activate'}
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="text-[#D4AF37] border-[#D4AF37]/50"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center p-10 border border-dashed border-[#A3B18A]/30 rounded-lg">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="text-xl font-medium text-[#D4AF37] mb-2">No Workflows Found</h3>
                  <p className="text-[#FAF3E0]/70 max-w-md mx-auto mb-6">
                    There are no workflow automations in this category yet. Deploy a new workflow from a blueprint to get started.
                  </p>
                  <Button 
                    onClick={() => setShowBlueprintModal(true)}
                    className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Deploy New Workflow
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Blueprint Modal */}
        {showBlueprintModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-[#0A192F] border border-[#A3B18A]/50 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-auto">
              <div className="p-6">
                <h2 className="text-2xl font-playfair text-[#D4AF37] mb-4">Deploy Workflow From Blueprint</h2>
                <p className="text-[#FAF3E0]/80 mb-6">
                  Select a pre-configured workflow blueprint to deploy. These blueprints are designed specifically for the Midnight Magnolia content creation process.
                </p>
                
                <div className="space-y-4 mb-6">
                  <Input 
                    placeholder="Search blueprints..." 
                    className="bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                  />
                  
                  <div className="space-y-3">
                    {blueprints.map(blueprint => (
                      <Card key={blueprint.id} className="bg-[#051224] border border-[#A3B18A]/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-[#D4AF37] flex items-center text-lg">
                            {getCategoryIcon(blueprint.category)}
                            {blueprint.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-[#FAF3E0]/80 text-sm">
                            {blueprint.description}
                          </p>
                        </CardContent>
                        <CardFooter className="pt-3 flex justify-end">
                          <Button 
                            onClick={() => deployBlueprintMutation.mutate(blueprint.id)}
                            disabled={deployBlueprintMutation.isPending}
                            className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90"
                          >
                            {deployBlueprintMutation.isPending ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Plus className="h-4 w-4 mr-2" />
                            )}
                            Deploy
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowBlueprintModal(false)}
                    className="text-[#FAF3E0] border-[#FAF3E0]/30"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowPage;