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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { 
  Loader2, 
  Stars,
  MoveDown,
  Download,
  Share
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function BirthChartGenerator() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [chartImage, setChartImage] = useState<string | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [chartType, setChartType] = useState('natal');

  const generateChartMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      birthDate: string;
      birthTime: string;
      birthLocation: string;
      chartType: string;
    }) => {
      const response = await apiRequest('POST', '/api/astrology/generate-chart', data);
      return response.json();
    },
    onSuccess: (data) => {
      setChartImage(data.chartImage || null);
      setInterpretation(data.interpretation || null);
      toast({
        title: 'Birth Chart Generated',
        description: 'Your personalized birth chart is ready to view.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error generating chart',
        description: error.message || 'An error occurred while generating your birth chart',
        variant: 'destructive',
      });
    },
  });

  const handleGenerateChart = () => {
    if (!name || !birthDate || !birthTime || !birthLocation) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields to generate your birth chart',
        variant: 'destructive',
      });
      return;
    }

    generateChartMutation.mutate({
      name,
      birthDate,
      birthTime,
      birthLocation,
      chartType
    });
  };

  const downloadChart = () => {
    if (!chartImage) return;
    
    // Create a download link for the chart image
    const link = document.createElement('a');
    link.href = chartImage;
    link.download = `${name.replace(/\s+/g, '-').toLowerCase()}-birth-chart.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Chart Downloaded',
      description: 'Your birth chart has been downloaded.',
    });
  };

  const shareChart = () => {
    if (!chartImage) return;
    
    // Share functionality would be implemented here
    // For now, just show a toast indicating it would be shared
    toast({
      title: 'Sharing Coming Soon',
      description: 'This feature will be available in a future update.',
    });
  };

  return (
    <Card className="border-[#D4AF37]/20">
      <CardHeader className="border-b border-[#A3B18A]/20">
        <CardTitle className="text-xl font-playfair text-[#0A192F] flex items-center">
          <Stars className="w-5 h-5 text-[#D4AF37] mr-2" />
          Digital Grimoire Birth Chart Generator
        </CardTitle>
        <CardDescription>
          Create a personalized astrological birth chart with Southern Gothic aesthetics
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birth-date">Birth Date</Label>
                <Input
                  id="birth-date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="birth-time">Birth Time</Label>
                <Input
                  id="birth-time"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="birth-location">Birth Location</Label>
              <Input
                id="birth-location"
                placeholder="City, Country"
                value={birthLocation}
                onChange={(e) => setBirthLocation(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the city and country where you were born
              </p>
            </div>
            
            <div>
              <Label htmlFor="chart-type">Chart Type</Label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger id="chart-type">
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natal">Natal Chart</SelectItem>
                  <SelectItem value="transit">Transit Chart</SelectItem>
                  <SelectItem value="synastry">Synastry Chart</SelectItem>
                  <SelectItem value="composite">Composite Chart</SelectItem>
                  <SelectItem value="solar-return">Solar Return</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleGenerateChart}
              disabled={generateChartMutation.isPending}
              className="w-full bg-[#0A192F] hover:bg-[#0A192F]/80 text-white"
            >
              {generateChartMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Stars className="mr-2 h-4 w-4" />
                  Generate Birth Chart
                </>
              )}
            </Button>
          </div>
          
          <div>
            {generateChartMutation.isPending ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-[#D4AF37] mb-4" />
                <p className="text-gray-600">Generating your birth chart...</p>
                <p className="text-xs text-gray-500 mt-2">This may take a moment as we analyze the cosmos</p>
              </div>
            ) : chartImage ? (
              <div className="space-y-4">
                <div className="bg-[#0A192F]/5 rounded-lg p-4 border border-[#A3B18A]/30 flex justify-center">
                  <img 
                    src={chartImage} 
                    alt="Birth Chart" 
                    className="max-w-full h-auto rounded shadow-sm"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#D4AF37]/50 text-[#0A192F]"
                    onClick={downloadChart}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#D4AF37]/50 text-[#0A192F]"
                    onClick={shareChart}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full border border-dashed rounded-lg p-8 bg-[#0A192F]/5">
                <Stars className="h-16 w-16 text-[#D4AF37]/30 mb-4" />
                <p className="text-gray-600 text-center">Fill in your birth details and generate your personalized chart</p>
                <p className="text-xs text-gray-500 mt-2 text-center">Your chart will appear here with your cosmic insights</p>
              </div>
            )}
          </div>
        </div>
        
        {interpretation && (
          <div className="mt-8 border-t border-[#A3B18A]/20 pt-6">
            <h3 className="text-lg font-playfair text-[#0A192F] mb-4">Your Cosmic Insights</h3>
            <div className="bg-[#0A192F]/5 rounded-lg p-6 border border-[#A3B18A]/30">
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: interpretation }} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">
              Interpretation is provided as a creative exploration of possibilities, not as definitive astrological advice.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-[#A3B18A]/20 p-4 flex justify-between">
        <p className="text-xs text-gray-500 italic">
          Your birth chart is generated using precise astronomical calculations and Southern Gothic aesthetics.
        </p>
        <MoveDown className="h-5 w-5 text-[#D4AF37]" />
      </CardFooter>
    </Card>
  );
}