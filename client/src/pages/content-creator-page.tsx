import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ContentWorkflowManager from '@/components/ContentWorkflowManager';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Wand2, 
  FileText, 
  LayoutPanelTop, 
  BookOpen, 
  Settings, 
  Clock,
  Sparkles,
  PenSquare,
  CalendarDays
} from 'lucide-react';

const ContentCreatorPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [workflowOpen, setWorkflowOpen] = useState(false);

  // Function to handle when a published content is selected
  const handleContentSelect = (content: string) => {
    setSelectedContent(content);
    setWorkflowOpen(true);
  };

  // Function to handle workflow completion
  const handleWorkflowComplete = () => {
    toast({
      title: "Content Published",
      description: "Your content has been successfully added to your Digital Grimoire.",
    });
    setWorkflowOpen(false);
    setSelectedContent(null);
  };

  return (
    <div className="bg-[#FAF3E0]/30 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-playfair text-[#0A192F] mb-2">The Digital Grimoire</h1>
          <p className="text-[#0A192F]/70">Your personal content creation and management space</p>
        </header>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
              <LayoutPanelTop className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
              <Wand2 className="h-4 w-4 mr-2" />
              Create
            </TabsTrigger>
            <TabsTrigger value="library" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
              <BookOpen className="h-4 w-4 mr-2" />
              Library
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-playfair text-[#0A192F] flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Content Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#0A192F]/70">Total Content</span>
                      <span className="font-medium text-[#0A192F]">24 items</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#0A192F]/70">Published</span>
                      <span className="font-medium text-[#0A192F]">18 items</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#0A192F]/70">Drafts</span>
                      <span className="font-medium text-[#0A192F]">6 items</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Energy Tracker */}
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-playfair text-[#0A192F] flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Energy Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-2">
                    <h3 className="text-[#0A192F]/70 mb-3">How's your energy today?</h3>
                    <div className="flex justify-between gap-2">
                      <Button variant="outline" className="flex-1 border-green-500 text-green-600 hover:bg-green-50">
                        High
                      </Button>
                      <Button variant="outline" className="flex-1 border-amber-500 text-amber-600 hover:bg-amber-50">
                        Medium
                      </Button>
                      <Button variant="outline" className="flex-1 border-blue-400 text-blue-500 hover:bg-blue-50">
                        Low
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Moon Phase */}
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-playfair text-[#0A192F] flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Moon Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-2">
                    <div className="mb-2">🌓</div>
                    <h3 className="text-[#0A192F] font-medium">First Quarter Moon</h3>
                    <p className="text-[#0A192F]/70 text-sm">Ideal for: Content refinement & decision making</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Activity & Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair text-[#0A192F] flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 mt-0.5 text-[#D4AF37]">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0A192F]">Created 5 new affirmation cards</p>
                        <p className="text-[#0A192F]/60 text-sm">2 hours ago</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 mt-0.5 text-[#D4AF37]">
                        <PenSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0A192F]">Updated Tarot card descriptions</p>
                        <p className="text-[#0A192F]/60 text-sm">Yesterday</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 mt-0.5 text-[#D4AF37]">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0A192F]">Published new journal prompt set</p>
                        <p className="text-[#0A192F]/60 text-sm">3 days ago</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair text-[#0A192F] flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Quick Create
                  </CardTitle>
                  <CardDescription className="text-[#0A192F]/70">
                    Start creating your mystical content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5 justify-start"
                      onClick={() => toast({
                        title: "Creating New Content",
                        description: "Opening the affirmation generator...",
                      })}
                    >
                      <Sparkles className="mr-2 h-4 w-4 text-[#D4AF37]" />
                      Affirmation Card
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5 justify-start"
                      onClick={() => toast({
                        title: "Creating New Content",
                        description: "Opening the tarot description generator...",
                      })}
                    >
                      <Sparkles className="mr-2 h-4 w-4 text-[#D4AF37]" />
                      Tarot Description
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5 justify-start"
                      onClick={() => toast({
                        title: "Creating New Content",
                        description: "Opening the journal prompt generator...",
                      })}
                    >
                      <Sparkles className="mr-2 h-4 w-4 text-[#D4AF37]" />
                      Journal Prompt
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5 justify-start"
                      onClick={() => toast({
                        title: "Creating New Content",
                        description: "Opening the product listing generator...",
                      })}
                    >
                      <Sparkles className="mr-2 h-4 w-4 text-[#D4AF37]" />
                      Product Listing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Create Tab */}
          <TabsContent value="create">
            {workflowOpen ? (
              <ContentWorkflowManager 
                content={selectedContent || ''} 
                onComplete={handleWorkflowComplete}
                onCancel={() => setWorkflowOpen(false)}
              />
            ) : (
              <div className="bg-white border border-[#0A192F]/10 rounded-lg p-12 text-center">
                <h3 className="text-lg font-medium text-[#0A192F] mb-2">Content Generator</h3>
                <p className="text-[#0A192F]/60 max-w-md mx-auto mb-6">
                  This is where you can create new content for your Digital Grimoire. Use the AI-powered generator to create different types of content like affirmations, tarot readings, and more.
                </p>
                <Button 
                  className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                  onClick={() => {
                    toast({
                      title: "Demo Mode",
                      description: "The AI Content Generator is running in mock mode. For this demo, let's move directly to the workflow.",
                    });
                    
                    const mockContent = `# Daily Affirmation Set - Self-Awareness

1. I honor my journey and recognize that growth comes from both success and failure.
2. My intuition is a powerful guide; I trust the wisdom that comes from within.
3. I am grounded in the present moment, not defined by my past or anxious about my future.
4. I embrace my authentic voice and share my truth with confidence and compassion.
5. My vulnerability is not weakness but a profound source of connection and strength.`;
                    
                    setSelectedContent(mockContent);
                    setWorkflowOpen(true);
                  }}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Content
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library">
            <div className="bg-white border border-[#0A192F]/10 rounded-lg p-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
              <h3 className="text-lg font-medium text-[#0A192F] mb-2">Your Digital Library</h3>
              <p className="text-[#0A192F]/60 max-w-md mx-auto mb-6">
                View, manage, and organize all of your content in one place. Keep track of published work, drafts, and archives.
              </p>
              <Button 
                className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                onClick={() => toast({
                  title: "Coming Soon",
                  description: "The content library feature is still under development.",
                })}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Explore Library
              </Button>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="bg-white border border-[#0A192F]/10 rounded-lg p-12 text-center">
              <Settings className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
              <h3 className="text-lg font-medium text-[#0A192F] mb-2">Personalize Your Grimoire</h3>
              <p className="text-[#0A192F]/60 max-w-md mx-auto mb-6">
                Customize your content settings, manage integrations, and set up publishing destinations like Notion, Airtable, or social media channels.
              </p>
              <Button 
                className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                onClick={() => toast({
                  title: "Coming Soon",
                  description: "Settings and integrations are still under development.",
                })}
              >
                <Settings className="mr-2 h-4 w-4" />
                Configure Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentCreatorPage;