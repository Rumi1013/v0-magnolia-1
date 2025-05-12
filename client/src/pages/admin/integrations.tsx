import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw,
  NotebookPen,
  Database,
  Users,
  Cloud, 
  Workflow,
  Shield
} from 'lucide-react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Types for integration status
type IntegrationStatus = "connected" | "not_configured" | "error" | "checking";
type ServiceKey = "notion" | "airtable" | "hubspot" | "patreon" | "googleCloud" | "make";

interface IntegrationState {
  status: IntegrationStatus;
  message?: string;
  lastChecked?: Date;
}

interface IntegrationConfig {
  name: string;
  key: ServiceKey;
  description: string;
  icon: React.ReactNode;
  requiredSecrets: string[];
  docsLink: string;
}

// Define integrations with their metadata
const integrations: IntegrationConfig[] = [
  {
    name: "Notion",
    key: "notion",
    description: "Content management and organization hub.",
    icon: <NotebookPen className="h-6 w-6" />,
    requiredSecrets: ["NOTION_INTEGRATION_SECRET", "NOTION_PAGE_URL"],
    docsLink: "https://developers.notion.com/"
  },
  {
    name: "Airtable",
    key: "airtable",
    description: "Content inventory tracking and management.",
    icon: <Database className="h-6 w-6" />,
    requiredSecrets: ["AIRTABLE_API_KEY", "AIRTABLE_BASE_ID"],
    docsLink: "https://airtable.com/developers"
  },
  {
    name: "HubSpot",
    key: "hubspot",
    description: "Client relationship management and tracking.",
    icon: <Users className="h-6 w-6" />,
    requiredSecrets: ["HUBSPOT_API_KEY"],
    docsLink: "https://developers.hubspot.com/"
  },
  {
    name: "Patreon",
    key: "patreon",
    description: "Membership management and subscription platform.",
    icon: <Shield className="h-6 w-6" />,
    requiredSecrets: [
      "PATREON_CLIENT_ID", 
      "PATREON_CLIENT_SECRET", 
      "PATREON_CREATOR_ACCESS_TOKEN"
    ],
    docsLink: "https://docs.patreon.com/"
  },
  {
    name: "Google Cloud",
    key: "googleCloud",
    description: "File storage and analytics services.",
    icon: <Cloud className="h-6 w-6" />,
    requiredSecrets: [
      "GOOGLE_CLOUD_PROJECT_ID", 
      "GOOGLE_CLOUD_STORAGE_BUCKET"
    ],
    docsLink: "https://cloud.google.com/docs"
  },
  {
    name: "Make.com",
    key: "make",
    description: "Workflow automation between all services.",
    icon: <Workflow className="h-6 w-6" />,
    requiredSecrets: [
      "MAKE_CONTENT_DISTRIBUTION_WEBHOOK", 
      "MAKE_CLIENT_ONBOARDING_WEBHOOK", 
      "MAKE_PATREON_SYNC_WEBHOOK"
    ],
    docsLink: "https://www.make.com/en/help"
  }
];

// Main Admin Integrations Page
export default function AdminIntegrations() {
  const { toast } = useToast();
  const [integrationStates, setIntegrationStates] = useState<Record<ServiceKey, IntegrationState>>({
    notion: { status: "checking" },
    airtable: { status: "checking" },
    hubspot: { status: "checking" },
    patreon: { status: "checking" },
    googleCloud: { status: "checking" },
    make: { status: "checking" }
  });

  // Function to check all integrations
  const checkAllIntegrations = async () => {
    try {
      // Set all to "checking" status
      setIntegrationStates(prev => {
        const updated = { ...prev };
        integrations.forEach(i => {
          updated[i.key] = { status: "checking" };
        });
        return updated;
      });

      // Call integration status API
      const response = await apiRequest("GET", "/api/integrations/status");
      const data = await response.json();

      if (data && data.services) {
        // Update states based on response
        const updatedStates: Record<ServiceKey, IntegrationState> = { ...integrationStates };
        data.services.forEach((service: any) => {
          const key = service.name.toLowerCase() as ServiceKey;
          
          if (Object.keys(updatedStates).includes(key)) {
            updatedStates[key] = {
              status: service.status,
              message: service.message,
              lastChecked: new Date()
            };
          }
        });

        setIntegrationStates(updatedStates);
      }
    } catch (error) {
      console.error("Error checking integrations:", error);
      toast({
        title: "Error Checking Integrations",
        description: "Failed to check integration status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Check integrations on first load
  useEffect(() => {
    checkAllIntegrations();
  }, []);
  
  // Get the status icon for an integration
  const getStatusIcon = (status: IntegrationStatus) => {
    switch (status) {
      case "connected":
        return <Check className="h-5 w-5 text-green-500" />;
      case "not_configured":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <X className="h-5 w-5 text-red-500" />;
      case "checking":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get the status badge for an integration
  const getStatusBadge = (status: IntegrationStatus) => {
    switch (status) {
      case "connected":
        return <Badge variant="default" className="bg-green-500">Connected</Badge>;
      case "not_configured":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Not Configured</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "checking":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Checking...</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Integrations</h1>
          <p className="text-muted-foreground">
            Manage and monitor your service integrations for the Midnight Magnolia Content Creation Dashboard.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Last checked: {new Date().toLocaleString()}
          </p>
          <Button onClick={checkAllIntegrations} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Status
          </Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration) => (
                <Card key={integration.key} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      {integration.icon}
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                    </div>
                    {getStatusBadge(integrationStates[integration.key]?.status || "checking")}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="min-h-[40px]">
                      {integration.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      {integrationStates[integration.key]?.lastChecked 
                        ? `Last checked: ${integrationStates[integration.key].lastChecked?.toLocaleTimeString()}`
                        : "Not checked yet"}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => window.open(integration.docsLink, "_blank")}
                        >
                          Docs
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Open documentation
                      </TooltipContent>
                    </Tooltip>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Configuration Tab */}
          <TabsContent value="config" className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Configuration Guide</AlertTitle>
              <AlertDescription>
                Service integrations require environment variables or secrets to be configured. 
                Follow the setup instructions for each service to configure them properly.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-6">
              {integrations.map((integration) => (
                <Card key={integration.key} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {integration.icon}
                        <CardTitle>{integration.name}</CardTitle>
                      </div>
                      {getStatusBadge(integrationStates[integration.key]?.status || "checking")}
                    </div>
                    <CardDescription>
                      {integration.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Required Environment Variables:</h4>
                      <div className="space-y-1">
                        {integration.requiredSecrets.map(secret => (
                          <div key={secret} className="flex items-center space-x-2 text-sm">
                            <div className="w-4 h-4 flex items-center justify-center">
                              {integrationStates[integration.key]?.status === "connected" 
                                ? <Check className="h-3 w-3 text-green-500" />
                                : <AlertCircle className="h-3 w-3 text-amber-500" />
                              }
                            </div>
                            <code className="bg-muted px-1 py-0.5 rounded text-xs">{secret}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {integrationStates[integration.key]?.message && (
                      <Alert variant={
                        integrationStates[integration.key]?.status === "error" 
                          ? "destructive" 
                          : "default"
                      }>
                        <AlertTitle>Status Message</AlertTitle>
                        <AlertDescription>
                          {integrationStates[integration.key]?.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(integration.docsLink, "_blank")}
                    >
                      Setup Instructions
                    </Button>
                    
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => {
                        toast({
                          title: "Environment Setup",
                          description: "To configure these secrets, you need to add them to your .env file.",
                        });
                      }}
                    >
                      Configure
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}