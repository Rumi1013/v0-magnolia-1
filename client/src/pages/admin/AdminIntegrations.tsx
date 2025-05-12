import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  AlertTriangle, 
  Info, 
  ExternalLink, 
  RefreshCw, 
  Loader2
} from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

// Define the shape of integration data
interface IntegrationStatus {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'not_connected' | 'error' | 'checking';
  details?: string;
  icon: string;
  credentials?: Record<string, string>;
  exampleUrl?: string;
  documentationUrl?: string;
  setupInstructions?: string[];
}

// Service groups
const serviceGroups = [
  { id: 'content', name: 'Content Management' },
  { id: 'crm', name: 'Customer Relationship' },
  { id: 'membership', name: 'Membership & Billing' },
  { id: 'ai', name: 'AI & Content Generation' },
  { id: 'automation', name: 'Workflow Automation' }
];

const AdminIntegrations: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('content');

  // Fetch integrations status
  const { data: integrations, isLoading, error } = useQuery({
    queryKey: ['/api/admin/integrations'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Mutation for testing connection
  const testConnectionMutation = useMutation({
    mutationFn: (integrationId: string) =>
      apiRequest('POST', `/api/admin/integrations/${integrationId}/test`),
    onSuccess: (data, integrationId) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/integrations'] });
      toast({
        title: 'Connection test successful',
        description: `The connection to ${getIntegrationName(integrationId)} was verified.`,
      });
    },
    onError: (error: any, integrationId) => {
      toast({
        title: 'Connection test failed',
        description: error.message || `Could not connect to ${getIntegrationName(integrationId)}.`,
        variant: 'destructive',
      });
    },
  });

  // Mutation for saving credentials
  const saveCredentialsMutation = useMutation({
    mutationFn: (data: { integrationId: string; credentials: Record<string, string> }) =>
      apiRequest('POST', `/api/admin/integrations/${data.integrationId}/credentials`, data.credentials),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/integrations'] });
      toast({
        title: 'Credentials saved',
        description: `The credentials for ${getIntegrationName(variables.integrationId)} have been updated.`,
      });
    },
    onError: (error: any, variables) => {
      toast({
        title: 'Failed to save credentials',
        description: error.message || `Could not update credentials for ${getIntegrationName(variables.integrationId)}.`,
        variant: 'destructive',
      });
    },
  });

  // Helper function to get a nice name for an integration
  const getIntegrationName = (id: string): string => {
    const integration = integrations?.find(i => i.id === id);
    return integration ? integration.name : id;
  };

  // Filter integrations by group
  const filteredIntegrations = (groupId: string) => {
    if (!integrations) return [];
    
    switch (groupId) {
      case 'content':
        return integrations.filter(i => ['notion', 'airtable', 'google-cloud'].includes(i.id));
      case 'crm':
        return integrations.filter(i => ['hubspot'].includes(i.id));
      case 'membership':
        return integrations.filter(i => ['patreon', 'stripe'].includes(i.id));
      case 'ai':
        return integrations.filter(i => ['openai', 'anthropic', 'ideogram', 'replicate'].includes(i.id));
      case 'automation':
        return integrations.filter(i => ['make'].includes(i.id));
      default:
        return [];
    }
  };

  // Mock integrations data until the API is connected
  const mockIntegrations: IntegrationStatus[] = [
    {
      id: 'notion',
      name: 'Notion',
      description: 'Connect to Notion for content management and templates',
      status: 'connected',
      icon: '📝',
      exampleUrl: 'https://www.notion.so/my-integrations',
      documentationUrl: 'https://developers.notion.com/',
      setupInstructions: [
        'Go to https://www.notion.so/my-integrations',
        'Create a new integration',
        'Copy the integration secret',
        'Share your Notion page with the integration'
      ]
    },
    {
      id: 'airtable',
      name: 'Airtable',
      description: 'Manage content inventory and tracking',
      status: 'connected',
      icon: '📊',
      exampleUrl: 'https://airtable.com/account',
      documentationUrl: 'https://airtable.com/developers/web/api/introduction',
      setupInstructions: [
        'Go to https://airtable.com/account',
        'Under API section, create a personal access token',
        'Copy the token value'
      ]
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'CRM for client management',
      status: 'connected',
      icon: '👥',
      exampleUrl: 'https://app.hubspot.com/api-key',
      documentationUrl: 'https://developers.hubspot.com/',
      setupInstructions: [
        'Go to HubSpot > Settings > Integrations > API Key',
        'Generate a new API key',
        'Copy the key value'
      ]
    },
    {
      id: 'patreon',
      name: 'Patreon',
      description: 'Membership management platform',
      status: 'connected',
      icon: '🏆',
      exampleUrl: 'https://www.patreon.com/portal/registration/register-clients',
      documentationUrl: 'https://docs.patreon.com/',
      setupInstructions: [
        'Go to the Patreon developer portal',
        'Create a new client',
        'Copy the Client ID and Client Secret'
      ]
    },
    {
      id: 'google-cloud',
      name: 'Google Cloud',
      description: 'File storage and cloud services',
      status: 'not_connected',
      icon: '☁️',
      exampleUrl: 'https://console.cloud.google.com/',
      documentationUrl: 'https://cloud.google.com/docs',
      setupInstructions: [
        'Create a project in Google Cloud Console',
        'Enable the required APIs',
        'Create a service account and download the JSON key'
      ]
    },
    {
      id: 'make',
      name: 'Make.com',
      description: 'Workflow automation platform',
      status: 'connected',
      icon: '⚙️',
      exampleUrl: 'https://www.make.com/en/api',
      documentationUrl: 'https://www.make.com/en/help/api',
      setupInstructions: [
        'Log in to your Make.com account',
        'Go to Profile Settings > API tokens',
        'Generate a new token and copy its value'
      ]
    },
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'AI for content generation',
      status: 'connected',
      icon: '🧠',
      exampleUrl: 'https://platform.openai.com/account/api-keys',
      documentationUrl: 'https://platform.openai.com/docs/api-reference',
      setupInstructions: [
        'Log in to your OpenAI account',
        'Go to API keys and create a new secret key',
        'Copy the key value'
      ]
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      description: 'Advanced AI assistant',
      status: 'connected',
      icon: '🤖',
      exampleUrl: 'https://console.anthropic.com/account/keys',
      documentationUrl: 'https://docs.anthropic.com/claude/reference',
      setupInstructions: [
        'Log in to your Anthropic account',
        'Navigate to API Keys',
        'Create a new API key and copy it'
      ]
    },
    {
      id: 'ideogram',
      name: 'Ideogram',
      description: 'AI image generation',
      status: 'connected',
      icon: '🖼️',
      exampleUrl: 'https://ideogram.ai/api',
      documentationUrl: 'https://ideogram.ai/api/docs',
      setupInstructions: [
        'Create an Ideogram account',
        'Go to API settings',
        'Generate and copy your API key'
      ]
    },
    {
      id: 'replicate',
      name: 'Replicate',
      description: 'AI model hosting platform',
      status: 'connected',
      icon: '🔄',
      exampleUrl: 'https://replicate.com/account/api-tokens',
      documentationUrl: 'https://replicate.com/docs',
      setupInstructions: [
        'Sign in to your Replicate account',
        'Go to your account settings',
        'Create a new API token and copy it'
      ]
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing',
      status: 'connected',
      icon: '💳',
      exampleUrl: 'https://dashboard.stripe.com/apikeys',
      documentationUrl: 'https://stripe.com/docs/api',
      setupInstructions: [
        'Log in to your Stripe dashboard',
        'Go to Developers > API keys',
        'Copy both the publishable key and secret key'
      ]
    }
  ];

  // Use mock data if the real data hasn't loaded yet
  const displayIntegrations = integrations || mockIntegrations;

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-playfair text-[#D4AF37] mb-2">Service Integrations</h1>
          <p className="text-[#FAF3E0] opacity-80 font-lora">
            Manage your connections to external services and APIs for content creation, customer management, and automation.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-8 bg-[#0A192F]/50">
            {serviceGroups.map(group => (
              <TabsTrigger 
                key={group.id} 
                value={group.id}
                className="text-[#FAF3E0] data-[state=active]:text-[#D4AF37] data-[state=active]:bg-[#0A192F]/70"
              >
                {group.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {serviceGroups.map(group => (
            <TabsContent key={group.id} value={group.id} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredIntegrations(group.id).map((integration) => (
                  <Card 
                    key={integration.id} 
                    className="bg-[#0A192F] border border-[#A3B18A]/30 overflow-hidden"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{integration.icon}</div>
                          <div>
                            <CardTitle className="text-[#D4AF37]">{integration.name}</CardTitle>
                            <CardDescription className="text-[#FAF3E0]/70">
                              {integration.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {integration.status === 'connected' && (
                            <div className="rounded-full bg-green-500/20 p-1">
                              <Check className="h-4 w-4 text-green-500" />
                            </div>
                          )}
                          {integration.status === 'not_connected' && (
                            <div className="rounded-full bg-gray-500/20 p-1">
                              <X className="h-4 w-4 text-gray-500" />
                            </div>
                          )}
                          {integration.status === 'error' && (
                            <div className="rounded-full bg-red-500/20 p-1">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            </div>
                          )}
                          {integration.status === 'checking' && (
                            <div className="rounded-full bg-blue-500/20 p-1">
                              <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-sm text-[#FAF3E0]">
                        <div className="flex items-center text-[#A3B18A] mb-2">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            integration.status === 'connected' ? 'bg-green-500' :
                            integration.status === 'not_connected' ? 'bg-gray-500' :
                            integration.status === 'error' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`}></div>
                          <span className="capitalize">
                            {integration.status === 'not_connected' ? 'Not Connected' : integration.status}
                          </span>
                        </div>
                        
                        {integration.details && (
                          <p className="text-[#FAF3E0]/70 text-xs mb-2">
                            {integration.details}
                          </p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#A3B18A] border-[#A3B18A]/50"
                        onClick={() => testConnectionMutation.mutate(integration.id)}
                        disabled={testConnectionMutation.isPending}
                      >
                        {testConnectionMutation.isPending ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        Test Connection
                      </Button>
                      
                      {integration.documentationUrl && (
                        <a 
                          href={integration.documentationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#D4AF37] text-sm flex items-center hover:underline"
                        >
                          Docs <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredIntegrations(group.id).length === 0 && (
                <div className="text-center p-10 border border-dashed border-[#A3B18A]/30 rounded-lg">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="text-xl font-medium text-[#D4AF37] mb-2">No Integrations Found</h3>
                  <p className="text-[#FAF3E0]/70 max-w-md mx-auto">
                    There are no integrations configured for this category yet.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="bg-[#051224] border border-[#A3B18A]/20 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-[#0A192F] p-2 rounded-full">
              <Info className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-[#D4AF37] mb-2">Integration Help</h3>
              <p className="text-[#FAF3E0] mb-4">
                Each service requires specific API keys or credentials to connect. Follow these general steps:
              </p>
              <ol className="space-y-2 text-[#FAF3E0]/80 list-decimal list-inside">
                <li>Create an account with the service provider if you don't have one</li>
                <li>Navigate to the API or developer settings in your account</li>
                <li>Generate the required API keys or access tokens</li>
                <li>Add them to your integration settings here</li>
                <li>Test the connection to verify everything is working</li>
              </ol>
              <div className="mt-4">
                <Link to="/admin/workflows">
                  <Button variant="outline" className="text-[#D4AF37] border-[#D4AF37]/50">
                    Manage Automated Workflows
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIntegrations;