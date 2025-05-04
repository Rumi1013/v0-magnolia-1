import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  FaBook, 
  FaMoon, 
  FaStar, 
  FaMagic, 
  FaTable, 
  FaPlus, 
  FaDownload, 
  FaSyncAlt, 
  FaClipboardCheck,
  FaCalendarAlt
} from 'react-icons/fa';
import MoonCalendar from '@/components/ui/moon-calendar';
import AIPromptGenerator from '@/components/ui/ai-prompt-generator';

const Notion: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('creator-hub');
  
  // Predefined database templates
  const databaseTemplates = {
    default: {
      name: "General Content",
      schema: {
        "Title": {
          "title": {}
        },
        "Description": {
          "rich_text": {}
        },
        "Category": {
          "select": {
            "options": [
              { "name": "Tarot", "color": "purple" },
              { "name": "Affirmation", "color": "blue" },
              { "name": "Printable", "color": "green" },
              { "name": "eBook", "color": "yellow" },
              { "name": "Astrology", "color": "orange" }
            ]
          }
        },
        "Status": {
          "status": {
            "options": [
              { "name": "Not Started", "color": "red" },
              { "name": "In Progress", "color": "yellow" },
              { "name": "Completed", "color": "green" }
            ]
          }
        },
        "Priority": {
          "select": {
            "options": [
              { "name": "Urgent + Important", "color": "red" },
              { "name": "Not Urgent + Important", "color": "blue" },
              { "name": "Urgent + Not Important", "color": "yellow" },
              { "name": "Not Urgent + Not Important", "color": "gray" }
            ]
          }
        },
        "Type": {
          "multi_select": {
            "options": [
              { "name": "Zine", "color": "purple" },
              { "name": "Tarot", "color": "blue" },
              { "name": "Grid", "color": "green" },
              { "name": "AI Brief", "color": "orange" }
            ]
          }
        },
        "CreatedDate": {
          "date": {}
        },
        "CreativeCommonsSources": {
          "url": {}
        }
      }
    },
    tarot: {
      name: "Tarot Card Database",
      schema: {
        "CardName": {
          "title": {}
        },
        "Description": {
          "rich_text": {}
        },
        "Arcana": {
          "select": {
            "options": [
              { "name": "Major", "color": "purple" },
              { "name": "Minor - Cups", "color": "blue" },
              { "name": "Minor - Wands", "color": "orange" },
              { "name": "Minor - Swords", "color": "gray" },
              { "name": "Minor - Pentacles", "color": "green" }
            ]
          }
        },
        "Keywords": {
          "multi_select": {
            "options": [
              { "name": "Transformation", "color": "purple" },
              { "name": "Intuition", "color": "blue" },
              { "name": "Creativity", "color": "yellow" },
              { "name": "Abundance", "color": "green" },
              { "name": "Challenge", "color": "red" }
            ]
          }
        },
        "UprightMeaning": {
          "rich_text": {}
        },
        "ReversedMeaning": {
          "rich_text": {}
        },
        "Element": {
          "select": {
            "options": [
              { "name": "Fire", "color": "orange" },
              { "name": "Water", "color": "blue" },
              { "name": "Air", "color": "gray" },
              { "name": "Earth", "color": "green" },
              { "name": "Spirit", "color": "purple" }
            ]
          }
        },
        "Numerology": {
          "number": {}
        },
        "ImageURL": {
          "url": {}
        },
        "MoonPhaseAssociation": {
          "select": {
            "options": [
              { "name": "New Moon", "color": "blue" },
              { "name": "Waxing Crescent", "color": "blue" },
              { "name": "First Quarter", "color": "blue" },
              { "name": "Waxing Gibbous", "color": "blue" },
              { "name": "Full Moon", "color": "purple" },
              { "name": "Waning Gibbous", "color": "yellow" },
              { "name": "Last Quarter", "color": "yellow" },
              { "name": "Waning Crescent", "color": "yellow" }
            ]
          }
        }
      }
    },
    affirmation: {
      name: "Affirmation Grid",
      schema: {
        "AffirmationTitle": {
          "title": {}
        },
        "Affirmation": {
          "rich_text": {}
        },
        "Theme": {
          "select": {
            "options": [
              { "name": "Abundance", "color": "green" },
              { "name": "Self-Love", "color": "pink" },
              { "name": "Creativity", "color": "orange" },
              { "name": "Healing", "color": "blue" },
              { "name": "Transformation", "color": "purple" },
              { "name": "Courage", "color": "yellow" },
              { "name": "Peace", "color": "gray" }
            ]
          }
        },
        "MoonPhase": {
          "select": {
            "options": [
              { "name": "New Moon", "color": "blue" },
              { "name": "Waxing Moon", "color": "blue" },
              { "name": "Full Moon", "color": "purple" },
              { "name": "Waning Moon", "color": "yellow" },
              { "name": "Any", "color": "gray" }
            ]
          }
        },
        "DailyOrRitual": {
          "select": {
            "options": [
              { "name": "Daily", "color": "blue" },
              { "name": "Ritual", "color": "purple" }
            ]
          }
        },
        "Chakra": {
          "multi_select": {
            "options": [
              { "name": "Root", "color": "red" },
              { "name": "Sacral", "color": "orange" },
              { "name": "Solar Plexus", "color": "yellow" },
              { "name": "Heart", "color": "green" },
              { "name": "Throat", "color": "blue" },
              { "name": "Third Eye", "color": "purple" },
              { "name": "Crown", "color": "purple" }
            ]
          }
        },
        "ImagePrompt": {
          "rich_text": {}
        },
        "BackgroundColor": {
          "select": {
            "options": [
              { "name": "Midnight Blue", "color": "blue" },
              { "name": "Sage Green", "color": "green" },
              { "name": "Rich Gold", "color": "yellow" },
              { "name": "Cream", "color": "gray" },
              { "name": "Lavender", "color": "purple" }
            ]
          }
        }
      }
    },
    astrology: {
      name: "Astrology Content Calendar",
      schema: {
        "EventTitle": {
          "title": {}
        },
        "Description": {
          "rich_text": {}
        },
        "CelestialEvent": {
          "select": {
            "options": [
              { "name": "New Moon", "color": "blue" },
              { "name": "Full Moon", "color": "purple" },
              { "name": "Solar Eclipse", "color": "yellow" },
              { "name": "Lunar Eclipse", "color": "purple" },
              { "name": "Mercury Retrograde", "color": "gray" },
              { "name": "Venus Retrograde", "color": "pink" },
              { "name": "Mars Retrograde", "color": "red" },
              { "name": "Equinox", "color": "green" },
              { "name": "Solstice", "color": "orange" }
            ]
          }
        },
        "Date": {
          "date": {}
        },
        "ZodiacSign": {
          "select": {
            "options": [
              { "name": "Aries", "color": "red" },
              { "name": "Taurus", "color": "green" },
              { "name": "Gemini", "color": "yellow" },
              { "name": "Cancer", "color": "blue" },
              { "name": "Leo", "color": "orange" },
              { "name": "Virgo", "color": "green" },
              { "name": "Libra", "color": "blue" },
              { "name": "Scorpio", "color": "red" },
              { "name": "Sagittarius", "color": "orange" },
              { "name": "Capricorn", "color": "gray" },
              { "name": "Aquarius", "color": "blue" },
              { "name": "Pisces", "color": "purple" }
            ]
          }
        },
        "ContentType": {
          "multi_select": {
            "options": [
              { "name": "Tarot Spread", "color": "purple" },
              { "name": "Affirmation Grid", "color": "blue" },
              { "name": "Ritual Guide", "color": "green" },
              { "name": "Journal Prompt", "color": "yellow" },
              { "name": "Meditation", "color": "gray" }
            ]
          }
        },
        "Element": {
          "select": {
            "options": [
              { "name": "Fire", "color": "orange" },
              { "name": "Earth", "color": "green" },
              { "name": "Air", "color": "gray" },
              { "name": "Water", "color": "blue" }
            ]
          }
        },
        "Status": {
          "status": {
            "options": [
              { "name": "Planning", "color": "blue" },
              { "name": "Creating", "color": "yellow" },
              { "name": "Reviewing", "color": "orange" },
              { "name": "Scheduled", "color": "green" },
              { "name": "Published", "color": "purple" }
            ]
          }
        }
      }
    }
  };

  // State for creating a database
  const [parentPageId, setParentPageId] = useState('');
  const [databaseTitle, setDatabaseTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [databasePropertiesJson, setDatabasePropertiesJson] = useState(
    JSON.stringify(databaseTemplates.default.schema, null, 2)
  );

  // State for adding a page to a database
  const [selectedDatabaseId, setSelectedDatabaseId] = useState('');
  const [pagePropertiesJson, setPagePropertiesJson] = useState(JSON.stringify({
    "Title": {
      "title": [
        {
          "text": {
            "content": "New Moon Tarot Reflection Worksheet"
          }
        }
      ]
    },
    "Description": {
      "rich_text": [
        {
          "text": {
            "content": "Monthly worksheet aligning tarot readings with moon phases"
          }
        }
      ]
    },
    "Category": {
      "select": {
        "name": "Printable"
      }
    },
    "Status": {
      "status": {
        "name": "Not Started"
      }
    },
    "Priority": {
      "select": {
        "name": "Urgent + Important"
      }
    },
    "Type": {
      "multi_select": [
        {
          "name": "Tarot"
        },
        {
          "name": "Grid"
        }
      ]
    },
    "CreatedDate": {
      "date": {
        "start": new Date().toISOString().split('T')[0]
      }
    }
  }, null, 2));

  // Query to list all databases
  interface NotionApiResponse {
    success: boolean;
    databases: Array<any>;
  }
  
  const { 
    data: databasesData, 
    isLoading: isLoadingDatabases, 
    refetch: refetchDatabases 
  } = useQuery<NotionApiResponse>({
    queryKey: ['/api/notion/databases'],
    enabled: activeTab === 'explore' || activeTab === 'creator-hub'
  });

  // Mutation to create a database
  const createDatabaseMutation = useMutation({
    mutationFn: async (data: { parentPageId: string; title: string; properties: any }) => {
      return apiRequest('/api/notion/databases', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Database created successfully!",
      });
      refetchDatabases();
      setActiveTab('explore');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to create database: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Mutation to add a page to a database
  const addPageMutation = useMutation({
    mutationFn: async (data: { databaseId: string; properties: any }) => {
      return apiRequest(`/api/notion/databases/${data.databaseId}/pages`, {
        method: 'POST',
        body: JSON.stringify({ properties: data.properties }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Entry added to database successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to add entry: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Handle database creation
  const handleCreateDatabase = () => {
    try {
      const properties = JSON.parse(databasePropertiesJson);
      createDatabaseMutation.mutate({ 
        parentPageId, 
        title: databaseTitle, 
        properties 
      });
    } catch (error: any) {
      toast({
        title: "Invalid JSON",
        description: "Please enter valid JSON for database properties",
        variant: "destructive",
      });
    }
  };

  // Handle adding a page to a database
  const handleAddPage = () => {
    try {
      const properties = JSON.parse(pagePropertiesJson);
      addPageMutation.mutate({ 
        databaseId: selectedDatabaseId, 
        properties 
      });
    } catch (error: any) {
      toast({
        title: "Invalid JSON",
        description: "Please enter valid JSON for page properties",
        variant: "destructive",
      });
    }
  };

  // Select a database for adding a page
  const handleSelectDatabase = (databaseId: string) => {
    setSelectedDatabaseId(databaseId);
    setActiveTab('add-content');
  };

  // Placeholder data for grimoire workflow steps
  const workflowSteps = [
    {
      id: 1,
      title: "Import Content Schemas",
      description: "Connect Airtable schemas for tarot cards, affirmation grids, and more",
      icon: <FaTable />,
      status: "pending"
    },
    {
      id: 2,
      title: "Integrate Creative Commons Sources",
      description: "Connect to Gutenberg, Unsplash, etc. for ebooks, art, and printables",
      icon: <FaBook />,
      status: "pending"
    },
    {
      id: 3,
      title: "Configure Content Automation",
      description: "Set up your automation cask for AI-assisted content creation",
      icon: <FaMagic />,
      status: "pending"
    },
    {
      id: 4,
      title: "Sync Monthly Bundles",
      description: "Merge tarot, astrology, and affirmation content into curated packages",
      icon: <FaMoon />,
      status: "pending"
    }
  ];

  // Get icon and color for database category
  const getCategoryIcon = (category: string) => {
    switch(category?.toLowerCase()) {
      case 'tarot':
        return { icon: <FaMoon className="mr-2" />, color: 'bg-purple-500/20 text-purple-300' };
      case 'affirmation':
        return { icon: <FaStar className="mr-2" />, color: 'bg-blue-500/20 text-blue-300' };
      case 'printable':
        return { icon: <FaDownload className="mr-2" />, color: 'bg-green-500/20 text-green-300' };
      case 'ebook':
        return { icon: <FaBook className="mr-2" />, color: 'bg-yellow-500/20 text-yellow-300' };
      default:
        return { icon: <FaMagic className="mr-2" />, color: 'bg-[#A3B18A]/20 text-[#A3B18A]' };
    }
  };

  // Format database title for display
  const getDisplayTitle = (db: any) => {
    if (!db.title || !db.title.length) return 'Untitled Database';
    return db.title[0]?.plain_text || 'Untitled Database';
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#FAF3E0]">
      <div 
        className="absolute top-0 left-0 w-full h-full z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-4xl md:text-5xl text-[#D4AF37] mb-4">The Digital Grimoire</h1>
          <p className="text-xl max-w-3xl mx-auto text-[#FAF3E0]">
            Midnight Magnolia Creator Hub - Your central command center for content creation, automation, and distribution
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="mb-8 bg-[#0A192F] border border-[#A3B18A]/30 p-1">
            <TabsTrigger 
              value="creator-hub" 
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F]"
            >
              Creator Hub
            </TabsTrigger>
            <TabsTrigger 
              value="explore" 
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F]"
            >
              Explore Databases
            </TabsTrigger>
            <TabsTrigger 
              value="create-template" 
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F]"
            >
              Create Template
            </TabsTrigger>
            <TabsTrigger 
              value="add-content" 
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A192F]"
              disabled={!selectedDatabaseId}
            >
              Add Content
            </TabsTrigger>
          </TabsList>

          {/* Creator Hub Tab */}
          <TabsContent value="creator-hub">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Setup status */}
              <div className="lg:col-span-1">
                <Card className="bg-[#0A192F] border-[#A3B18A]/30 shadow-lg h-full">
                  <CardHeader className="border-b border-[#A3B18A]/20">
                    <CardTitle className="text-[#D4AF37] flex items-center">
                      <FaClipboardCheck className="mr-2" /> Grimoire Setup
                    </CardTitle>
                    <CardDescription className="text-[#FAF3E0]">Track your implementation progress</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {workflowSteps.map(step => (
                        <div key={step.id} className="flex items-start p-3 border border-[#A3B18A]/20 rounded-md hover:border-[#A3B18A]/50 transition-all">
                          <div className="h-8 w-8 rounded-full bg-[#A3B18A]/20 flex items-center justify-center mr-3 text-[#D4AF37]">
                            {step.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-[#D4AF37]">{step.title}</h3>
                            <p className="text-sm text-[#FAF3E0]">{step.description}</p>
                            <div className="mt-2">
                              <Badge variant="outline" className="text-xs bg-[#0A192F] text-[#FAF3E0] border-[#A3B18A]/30">
                                {step.status === 'complete' ? 'Completed' : 'Pending'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-[#A3B18A]/20 pt-4 flex justify-between">
                    <Button variant="outline" className="text-xs border-[#A3B18A] text-[#A3B18A]">
                      <FaSyncAlt className="mr-2" /> Refresh Status
                    </Button>
                    <Button className="text-xs bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80">
                      <FaPlus className="mr-2" /> Complete Next Step
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Right column - Content grid & databases */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-playfair text-[#D4AF37] mb-4">Content Databases</h2>
                <p className="text-sm text-[#FAF3E0] mb-6">
                  Use these templates to organize and automate your content creation workflow
                </p>

                {isLoadingDatabases ? (
                  <div className="text-center p-6 border border-dashed border-[#A3B18A]/30 rounded-md">
                    <p className="text-[#A3B18A]">Loading creator databases...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {databasesData?.databases && databasesData.databases.length > 0 ? 
                      databasesData.databases.slice(0, 4).map((db: any) => (
                        <Card key={db.id} className="bg-[#0A192F] border-[#A3B18A]/30 hover:border-[#A3B18A] transition-all duration-300">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-[#D4AF37] text-lg">
                              {getDisplayTitle(db)}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {db.properties && Object.keys(db.properties).slice(0, 3).map(propName => (
                                <Badge key={propName} variant="outline" className="bg-[#0A192F]/50 text-xs text-[#FAF3E0]">
                                  {propName}
                                </Badge>
                              ))}
                              {db.properties && Object.keys(db.properties).length > 3 && (
                                <Badge variant="outline" className="bg-[#0A192F]/50 text-xs text-[#FAF3E0]">
                                  +{Object.keys(db.properties).length - 3} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSelectDatabase(db.id)}
                              className="text-[#A3B18A] border-[#A3B18A] hover:bg-[#A3B18A] hover:text-[#0A192F] text-xs w-full"
                            >
                              <FaPlus className="mr-2" /> Add Content
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    : null}

                    {/* Create new template card */}
                    <Card className="bg-[#0A192F] border-dashed border-[#A3B18A]/30 hover:border-[#A3B18A] transition-all duration-300">
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                        <div className="h-12 w-12 rounded-full bg-[#A3B18A]/20 flex items-center justify-center mb-3 text-[#D4AF37]">
                          <FaPlus />
                        </div>
                        <h3 className="font-medium text-[#D4AF37] mb-2">Create New Template</h3>
                        <p className="text-sm text-[#FAF3E0] mb-4">
                          Design a custom database for your content needs
                        </p>
                        <Button 
                          onClick={() => setActiveTab('create-template')}
                          variant="outline"
                          className="border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A] hover:text-[#0A192F]"
                        >
                          Create Template
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 mt-10">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-playfair text-[#D4AF37]">Moon Phase Content Calendar</h2>
                    <Badge variant="outline" className="bg-[#0A192F] border-[#D4AF37]/50 text-[#D4AF37]">
                      <FaCalendarAlt className="mr-1" /> May 2025
                    </Badge>
                  </div>
                  <p className="text-sm text-[#FAF3E0] mt-0 mb-2">
                    Align your content creation with lunar cycles for more powerful cosmic connections
                  </p>
                  <MoonCalendar />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-10">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-playfair text-[#D4AF37]">Content Automation Cask</h2>
                    <Badge variant="outline" className="bg-[#0A192F] border-[#D4AF37]/50 text-[#D4AF37]">
                      <FaMagic className="mr-1" /> AI Powered
                    </Badge>
                  </div>
                  <p className="text-sm text-[#FAF3E0] mt-0 mb-2">
                    Generate AI prompts to assist your content creation workflow
                  </p>
                  <AIPromptGenerator />
                </div>

                {/* Recent activity section */}
                <h2 className="text-2xl font-playfair text-[#D4AF37] mb-4 mt-8">Recent Activity</h2>
                <Card className="bg-[#0A192F] border-[#A3B18A]/30">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="p-3 border-b border-[#A3B18A]/10">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 text-blue-300">
                            <FaStar />
                          </div>
                          <div>
                            <p className="text-sm text-[#FAF3E0]">Added "Monthly Affirmation Cards - May" to Printables</p>
                            <p className="text-xs text-[#FAF3E0]">Today, 2:15 PM</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-b border-[#A3B18A]/10">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 text-purple-300">
                            <FaMoon />
                          </div>
                          <div>
                            <p className="text-sm text-[#FAF3E0]">Created "Tarot + Astrology Content Calendar" template</p>
                            <p className="text-xs text-[#FAF3E0]">Yesterday, 10:23 AM</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 text-green-300">
                            <FaDownload />
                          </div>
                          <div>
                            <p className="text-sm text-[#FAF3E0]">Updated "New Moon Ritual Worksheet" status to Complete</p>
                            <p className="text-xs text-[#FAF3E0]">May 3, 2025</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab for exploring databases */}
          <TabsContent value="explore">
            <div className="grid gap-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-playfair text-[#D4AF37]">Your Accessible Databases</h2>
                <Button 
                  onClick={() => refetchDatabases()} 
                  variant="outline" 
                  size="sm" 
                  className="text-[#A3B18A] border-[#A3B18A]"
                >
                  <FaSyncAlt className="mr-2" /> Refresh
                </Button>
              </div>
              
              {isLoadingDatabases ? (
                <div className="text-center p-12 border border-dashed border-[#A3B18A]/30 rounded-md">
                  <p className="text-[#A3B18A]">Loading databases...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {databasesData?.databases && databasesData.databases.length > 0 ? (
                    databasesData.databases.map((db: any) => (
                      <Card key={db.id} className="bg-[#0A192F] border-[#A3B18A]/50 shadow-lg hover:border-[#A3B18A] transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="text-[#D4AF37]">
                            {db.title?.[0]?.plain_text || 'Untitled Database'}
                          </CardTitle>
                          <CardDescription className="font-mono text-xs break-all text-[#FAF3E0]">
                            ID: {db.id}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-[#FAF3E0] mb-2">Properties:</p>
                          <div className="bg-[#0A192F]/50 p-3 rounded border border-[#A3B18A]/20 text-sm text-[#FAF3E0] overflow-auto max-h-32">
                            {db.properties && Object.keys(db.properties).map(propName => (
                              <div key={propName} className="mb-1 flex items-center">
                                <span className="inline-block w-2 h-2 rounded-full bg-[#A3B18A]/50 mr-2"></span>
                                <span className="font-medium">{propName}</span>
                                <span className="text-[#FAF3E0] text-xs ml-2">({db.properties[propName].type})</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSelectDatabase(db.id)}
                            className="text-[#A3B18A] border-[#A3B18A] hover:bg-[#A3B18A] hover:text-[#0A192F]"
                          >
                            <FaPlus className="mr-2" /> Add Entry
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-2 text-center p-12 border border-dashed border-[#A3B18A]/30 rounded-md">
                      <div className="flex flex-col items-center">
                        <FaBook className="text-[#A3B18A] text-4xl mb-4 opacity-40" />
                        <p className="text-[#FAF3E0] mb-2">
                          No databases found. Make sure your integration has access to pages with databases.
                        </p>
                        <p className="text-[#FAF3E0] text-sm max-w-lg mb-4">
                          To share a page with your integration, open Notion, navigate to the page, 
                          click "Share" in the top right, and select your integration.
                        </p>
                        <Button
                          onClick={() => setActiveTab('create-template')}
                          className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                        >
                          Create Your First Database
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab for creating a new database */}
          <TabsContent value="create-template">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3 text-[#D4AF37]">
                  <FaPlus />
                </div>
                <div>
                  <h2 className="text-2xl font-playfair text-[#D4AF37]">Create Content Template</h2>
                  <p className="text-sm text-[#FAF3E0]">Design a new database for your content workflow</p>
                </div>
              </div>
              
              <Card className="bg-[#0A192F] border-[#A3B18A]/30 shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="parent-page-id">Parent Page ID</Label>
                      <Input
                        id="parent-page-id"
                        value={parentPageId}
                        onChange={(e) => setParentPageId(e.target.value)}
                        placeholder="Enter the ID of the page where the database will be created"
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30"
                      />
                      <p className="text-xs text-[#FAF3E0]">
                        Note: Your integration must have access to this page. Page IDs are found in the URL when viewing a page.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="database-title">Template Title</Label>
                      <Input
                        id="database-title"
                        value={databaseTitle}
                        onChange={(e) => setDatabaseTitle(e.target.value)}
                        placeholder="e.g., Content Calendar, Tarot Card Database, etc."
                        className="bg-[#0A192F]/60 border-[#A3B18A]/30"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="template-type">Template Type</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(databaseTemplates).map(([key, template]) => (
                          <div
                            key={key}
                            onClick={() => {
                              setSelectedTemplate(key);
                              setDatabasePropertiesJson(JSON.stringify(template.schema, null, 2));
                            }}
                            className={`cursor-pointer p-3 rounded-md border transition-all flex flex-col items-center text-center ${
                              selectedTemplate === key
                                ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                                : 'border-[#A3B18A]/30 hover:border-[#A3B18A]/70'
                            }`}
                          >
                            <div className="h-10 w-10 rounded-full flex items-center justify-center mb-2 bg-[#0A192F]/70">
                              {key === 'tarot' && <FaMoon className="text-[#D4AF37]" />}
                              {key === 'affirmation' && <FaStar className="text-[#D4AF37]" />}
                              {key === 'astrology' && <FaMagic className="text-[#D4AF37]" />}
                              {key === 'default' && <FaTable className="text-[#D4AF37]" />}
                            </div>
                            <div className="font-medium text-sm">{template.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="database-properties">Schema Properties (JSON)</Label>
                        <Badge variant="outline" className="bg-[#0A192F] text-xs text-[#FAF3E0]">Advanced</Badge>
                      </div>
                      <Textarea
                        id="database-properties"
                        value={databasePropertiesJson}
                        onChange={(e) => setDatabasePropertiesJson(e.target.value)}
                        rows={10}
                        className="font-mono text-sm bg-[#0A192F]/60 border-[#A3B18A]/30"
                      />
                      <p className="text-xs text-[#FAF3E0]">
                        This defines your database schema with columns like Title, Category, Status etc. Edit with caution.
                      </p>
                    </div>

                    <Button 
                      onClick={handleCreateDatabase} 
                      disabled={createDatabaseMutation.isPending || !parentPageId || !databaseTitle}
                      className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                    >
                      {createDatabaseMutation.isPending ? "Creating..." : "Create Content Template"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">Template Guidelines</h3>
                <Card className="bg-[#0A192F] border-[#A3B18A]/30">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-[#D4AF37]">Recommended Properties</h4>
                        <ul className="text-sm space-y-1 text-[#FAF3E0]">
                          <li>• Title (title) - Every database needs a title field</li>
                          <li>• Description (rich_text) - Details about the content</li>
                          <li>• Category (select) - Content category</li>
                          <li>• Status (status) - Track progress</li>
                          <li>• Priority (select) - Use Eisenhower Matrix</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-[#D4AF37]">Content Types</h4>
                        <ul className="text-sm space-y-1 text-[#FAF3E0]">
                          <li>• Tarot - Card meanings, spreads, rituals</li>
                          <li>• Affirmations - Daily/monthly affirmations</li>
                          <li>• Grids - Tarot or affirmation grids</li>
                          <li>• Printables - Downloadable worksheets</li>
                          <li>• eBooks - Digital books and guides</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab for adding a page to a database */}
          <TabsContent value="add-content">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3 text-[#D4AF37]">
                  <FaPlus />
                </div>
                <div>
                  <h2 className="text-2xl font-playfair text-[#D4AF37]">Add New Content</h2>
                  <p className="text-sm text-[#FAF3E0]">Create a new entry in your content database</p>
                </div>
              </div>
              
              {selectedDatabaseId && (
                <div className="mb-6 p-4 bg-[#0A192F]/80 border border-[#A3B18A]/30 rounded-md">
                  <div className="flex items-center">
                    <FaBook className="text-[#D4AF37] mr-3" />
                    <div>
                      <p className="text-sm text-[#FAF3E0]">Selected Database:</p>
                      <p className="font-mono text-xs text-[#FAF3E0] overflow-hidden text-ellipsis">{selectedDatabaseId}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <Card className="bg-[#0A192F] border-[#A3B18A]/30 shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="page-properties">Content Properties (JSON)</Label>
                        <Badge variant="outline" className="bg-[#0A192F] text-xs text-[#FAF3E0]">Advanced</Badge>
                      </div>
                      <Textarea
                        id="page-properties"
                        value={pagePropertiesJson}
                        onChange={(e) => setPagePropertiesJson(e.target.value)}
                        rows={12}
                        className="font-mono text-sm bg-[#0A192F]/60 border-[#A3B18A]/30"
                      />
                      <p className="text-xs text-[#FAF3E0]">
                        Note: The structure of properties must match the database schema. Title properties are required.
                      </p>
                    </div>

                    <Button 
                      onClick={handleAddPage} 
                      disabled={addPageMutation.isPending || !selectedDatabaseId}
                      className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                    >
                      {addPageMutation.isPending ? "Adding..." : "Add Content Entry"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">Automation Instructions</h3>
                <Card className="bg-[#0A192F] border-[#A3B18A]/30">
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <h4 className="font-medium text-[#D4AF37] mb-2">Content Automation Flow</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-sm text-[#FAF3E0]">
                        <li>Add content entries to your Notion databases</li>
                        <li>Group related content into monthly curated bundles</li>
                        <li>Set up automation casks for printables and AI workflows</li>
                        <li>Connect your content to delivery platforms (Etsy, Patreon, etc.)</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-[#D4AF37] mb-2">Next Steps</h4>
                      <p className="text-sm text-[#FAF3E0]">
                        After adding your content, explore the "Creator Hub" tab to track your implementation progress 
                        and manage your creative workflow according to The Digital Grimoire strategy.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notion;