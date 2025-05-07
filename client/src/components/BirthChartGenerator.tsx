import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Calendar, Clock, MapPin, Moon, Stars, Sun, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Form validation schema
const birthChartSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  birthDate: z.string().min(1, "Birth date is required"),
  birthTime: z.string().min(1, "Birth time is required"),
  birthLocation: z.string().min(2, "Birth location is required"),
  chartType: z.string().default("natal")
});

type BirthChartFormValues = z.infer<typeof birthChartSchema>;

// Chart explanation data
const chartElementExplanations = [
  { 
    name: "Sun", 
    title: "Core Essence", 
    description: "Your sun sign represents your conscious mind and core identity. It illuminates your path to self-realization.",
    icon: Sun
  },
  { 
    name: "Moon", 
    title: "Inner Emotions", 
    description: "Your moon sign reflects your emotional nature, subconscious, and how you process feelings internally.",
    icon: Moon
  },
  { 
    name: "Rising", 
    title: "Outward Persona", 
    description: "Your rising sign (ascendant) represents how you appear to others and your approach to new situations.",
    icon: Sparkles
  },
  { 
    name: "Mercury", 
    title: "Communication Style", 
    description: "Mercury governs your communication style, thinking patterns, and how you process information.",
    icon: Stars
  }
];

export function BirthChartGenerator() {
  const { toast } = useToast();
  const [chartData, setChartData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("chart");

  // Initialize form
  const form = useForm<BirthChartFormValues>({
    resolver: zodResolver(birthChartSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      birthTime: "",
      birthLocation: "",
      chartType: "natal"
    }
  });

  // Mutation for generating birth chart
  const generateChartMutation = useMutation({
    mutationFn: async (data: BirthChartFormValues) => {
      const response = await apiRequest("POST", "/api/astrology/generate-chart", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (!data.success) {
        throw new Error(data.error || "Failed to generate birth chart");
      }
      setChartData(data);
      toast({
        title: "✨ Chart Generated",
        description: "Your celestial blueprint has been revealed",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate birth chart",
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: BirthChartFormValues) => {
    setChartData(null);
    generateChartMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-amber-300/10 rounded-full blur-3xl -z-10"></div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-primary-900">Celestial Birth Chart</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Enter your birth details to unveil the cosmic energies that shaped your essence and illuminate your path.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            <Moon className="h-3 w-3 mr-1" /> Moon Signs
          </Badge>
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            <Sun className="h-3 w-3 mr-1" /> Sun Positions
          </Badge>
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            <Stars className="h-3 w-3 mr-1" /> Rising Signs
          </Badge>
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            <Sparkles className="h-3 w-3 mr-1" /> Planetary Aspects
          </Badge>
        </div>
      </div>
      
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        {/* Left Column - Chart Form */}
        <Card className="shadow-md border-primary/20 bg-white/80 backdrop-blur-lg md:col-span-2">
          <CardHeader className="space-y-1 border-b border-primary/10 bg-primary/5">
            <CardTitle className="text-2xl font-serif text-primary-900">Enter Your Details</CardTitle>
            <CardDescription>
              Provide accurate birth information for celestial insights
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name" 
                          {...field} 
                          className="bg-primary/5 border-primary/20 focus:border-primary/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Birth Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="date" 
                              {...field} 
                              className="bg-primary/5 border-primary/20 focus:border-primary/50" 
                            />
                            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-primary/60" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Birth Time</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="time" 
                              {...field} 
                              className="bg-primary/5 border-primary/20 focus:border-primary/50" 
                            />
                            <Clock className="absolute right-3 top-2.5 h-4 w-4 text-primary/60" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="birthLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Birth Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="City, Country" 
                            {...field} 
                            className="bg-primary/5 border-primary/20 focus:border-primary/50" 
                          />
                          <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-primary/60" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="chartType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Chart Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-primary/5 border-primary/20 focus:border-primary/50">
                            <SelectValue placeholder="Select chart type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="natal">Natal Chart (Birth Chart)</SelectItem>
                          <SelectItem value="transit">Transit Chart (Current)</SelectItem>
                          <SelectItem value="synastry">Synastry Chart (Compatibility)</SelectItem>
                          <SelectItem value="composite">Composite Chart (Relationship)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={generateChartMutation.isPending}
                  >
                    {generateChartMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Consulting the stars...
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Reveal Your Celestial Blueprint
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Right Column - Chart Results */}
        <div className="lg:col-span-3">
          {generateChartMutation.isPending ? (
            <div className="h-full flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping"></div>
                  <div className="absolute inset-3 rounded-full bg-primary/10 animate-pulse"></div>
                  <Loader2 className="absolute inset-0 h-24 w-24 animate-spin text-primary/70" />
                  <Moon className="absolute inset-0 m-auto h-12 w-12 text-primary/90" />
                </div>
                <h3 className="text-xl font-serif mb-2">Reading The Stars</h3>
                <p className="text-muted-foreground">Aligning celestial bodies and calculating your cosmic imprint...</p>
              </div>
            </div>
          ) : chartData ? (
            <Card className="shadow-md border-primary/20 bg-white/80 backdrop-blur-lg h-full">
              <CardHeader className="border-b border-primary/10 bg-primary/5 pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-serif text-primary-900">Your Celestial Blueprint</CardTitle>
                    <CardDescription>
                      Cosmic energies that influence your essence and journey
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-3 py-1">
                    {form.getValues().chartType === 'natal' ? 'Natal Chart' : 
                     form.getValues().chartType === 'transit' ? 'Transit Chart' :
                     form.getValues().chartType === 'synastry' ? 'Synastry Chart' : 'Composite Chart'}
                  </Badge>
                </div>
                
                <Tabs defaultValue="chart" className="mt-4" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 bg-primary/5">
                    <TabsTrigger 
                      value="chart" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Chart
                    </TabsTrigger>
                    <TabsTrigger 
                      value="interpretation" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Interpretation
                    </TabsTrigger>
                    <TabsTrigger 
                      value="elements" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Elements
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              
              <CardContent className="p-0">
                <TabsContent value="chart" className="p-6 m-0">
                  <div className="aspect-square relative rounded-lg overflow-hidden border border-primary/20 bg-white flex items-center justify-center shadow-inner">
                    {chartData.chartImage ? (
                      <img 
                        src={chartData.chartImage} 
                        alt="Birth Chart" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full bg-primary/5"></div>
                          <Moon className="absolute inset-0 m-auto h-12 w-12 text-primary/40" />
                        </div>
                        <p className="text-muted-foreground">Visual chart will appear in your premium download</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-sm font-medium text-primary-900">Sun Sign</p>
                      <p className="text-sm text-muted-foreground">Aries</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-sm font-medium text-primary-900">Moon Sign</p>
                      <p className="text-sm text-muted-foreground">Taurus</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-sm font-medium text-primary-900">Rising Sign</p>
                      <p className="text-sm text-muted-foreground">Gemini</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-sm font-medium text-primary-900">Mercury Sign</p>
                      <p className="text-sm text-muted-foreground">Pisces</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="interpretation" className="p-6 m-0">
                  <div className="prose prose-sm max-h-[500px] overflow-y-auto pr-4 prose-headings:font-serif prose-headings:text-primary-900">
                    {chartData.interpretation ? (
                      <div dangerouslySetInnerHTML={{ __html: chartData.interpretation }} />
                    ) : (
                      <div className="space-y-4">
                        <h3>Your Cosmic Essence</h3>
                        <p>Your natal chart reveals a fascinating blend of cosmic energies. With your Sun in Aries, you possess natural leadership abilities and a pioneering spirit that drives you to initiate new projects with enthusiasm and courage.</p>
                        
                        <h3>Emotional Landscape</h3>
                        <p>Your Moon in Taurus brings a grounded stability to your emotional nature. You seek security and comfort, appreciating life's sensual pleasures and maintaining a practical approach to meeting your emotional needs.</p>
                        
                        <h3>Social Expression</h3>
                        <p>With your Ascendant (Rising) in Gemini, you present yourself to the world as adaptable, curious, and intellectually engaged. Your communication style is lively and versatile, making you approachable and quick-witted in social situations.</p>
                        
                        <h3>Mental Patterns</h3>
                        <p>Mercury in Pisces gives you an intuitive and imaginative mental approach. Your thinking tends to be non-linear and creative, allowing you to connect ideas in unique ways and communicate with empathy and artistic flair.</p>
                        
                        <h3>Life Path Insights</h3>
                        <p>The placement of your North Node suggests that your life journey involves developing greater self-reliance while learning to balance independence with meaningful collaboration. Your chart's aspects indicate particular talents in creative expression and intuitive understanding.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="elements" className="p-6 m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {chartElementExplanations.map((element, index) => {
                      const Icon = element.icon;
                      return (
                        <Card key={index} className="border-primary/10">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-primary/10">
                                <Icon className="h-4 w-4 text-primary" />
                              </div>
                              <CardTitle className="text-base font-serif">{element.name}: {element.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{element.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <h3 className="text-sm font-medium mb-2">Element Distribution</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-red-100 h-8 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-400/60" style={{ width: '70%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">Fire: 70%</div>
                      </div>
                      <div className="bg-blue-100 h-8 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-400/60" style={{ width: '30%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">Water: 30%</div>
                      </div>
                      <div className="bg-yellow-100 h-8 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-yellow-400/60" style={{ width: '50%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">Air: 50%</div>
                      </div>
                      <div className="bg-green-100 h-8 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-green-400/60" style={{ width: '40%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">Earth: 40%</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
              
              <CardFooter className="border-t border-primary/10 bg-primary/5">
                <div className="w-full flex flex-col sm:flex-row gap-3">
                  <Button variant="default" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    Download Full Chart
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto border-primary/20">
                    Save to Your Grimoire
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="shadow-md border-primary/20 bg-white/80 backdrop-blur-lg h-full flex flex-col">
              <CardContent className="flex-grow flex items-center justify-center p-6">
                <div className="text-center max-w-lg mx-auto">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-primary/5"></div>
                    <div className="absolute inset-4 rounded-full bg-primary/10"></div>
                    <Moon className="absolute inset-0 m-auto h-16 w-16 text-primary/30" />
                    <Stars className="absolute top-0 right-0 h-8 w-8 text-amber-400/40" />
                    <Stars className="absolute bottom-1 left-1 h-6 w-6 text-amber-400/40" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4 text-primary-900">Discover Your Celestial Blueprint</h3>
                  <p className="text-muted-foreground mb-6">
                    The stars hold ancient wisdom about your unique essence. Enter your birth details to unveil the cosmic 
                    forces that have shaped your journey and illuminate your authentic path forward.
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="text-left bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-sm font-medium text-primary-900">Reveals</p>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                        <li>• Your authentic strengths</li>
                        <li>• Natural talents and abilities</li>
                        <li>• Life purpose indicators</li>
                      </ul>
                    </div>
                    <div className="text-left bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-sm font-medium text-primary-900">Insights</p>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                        <li>• Relationship compatibility</li>
                        <li>• Career path alignments</li>
                        <li>• Spiritual growth areas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-primary/10 bg-primary/5 flex justify-center">
                <p className="text-xs text-muted-foreground italic">Upgrade to premium tiers for detailed interpretations and additional chart types</p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      
      {/* Feature Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Moon className="h-8 w-8 text-primary/70" />
          </div>
          <h3 className="text-xl font-serif mb-2 text-primary-900">Natal Chart Analysis</h3>
          <p className="text-muted-foreground">
            Uncover the planetary positions at your birth and how they influence your personality, talents, and life path.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stars className="h-8 w-8 text-primary/70" />
          </div>
          <h3 className="text-xl font-serif mb-2 text-primary-900">Transit Forecasts</h3>
          <p className="text-muted-foreground">
            Understand how current planetary movements interact with your birth chart, revealing optimal timing for decisions.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-primary/70" />
          </div>
          <h3 className="text-xl font-serif mb-2 text-primary-900">Compatibility Insights</h3>
          <p className="text-muted-foreground">
            Explore relationship dynamics through synastry charts that reveal harmony, challenges, and growth opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}