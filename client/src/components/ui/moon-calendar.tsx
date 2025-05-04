import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaMoon, FaStar, FaBook, FaMagic, FaDownload } from 'react-icons/fa';

// Moon phases for the current month (simplified example)
// In a real app, you'd calculate these based on actual astronomical data
const moonPhases = [
  { 
    date: '2025-05-01', 
    phase: 'New Moon', 
    zSign: 'Taurus',
    element: 'Earth',
    color: 'bg-blue-500/80',
    textColor: 'text-white'
  },
  { 
    date: '2025-05-08', 
    phase: 'First Quarter', 
    zSign: 'Leo',
    element: 'Fire',
    color: 'bg-blue-400/70',
    textColor: 'text-white'
  },
  { 
    date: '2025-05-15', 
    phase: 'Full Moon', 
    zSign: 'Scorpio',
    element: 'Water',
    color: 'bg-purple-500/80',
    textColor: 'text-white'
  },
  { 
    date: '2025-05-22', 
    phase: 'Last Quarter', 
    zSign: 'Aquarius',
    element: 'Air',
    color: 'bg-yellow-500/60',
    textColor: 'text-gray-800'
  },
  { 
    date: '2025-05-29', 
    phase: 'New Moon', 
    zSign: 'Gemini',
    element: 'Air',
    color: 'bg-blue-500/80',
    textColor: 'text-white'
  }
];

// Content ideas for each moon phase
const getContentIdeas = (phase: string) => {
  switch(phase) {
    case 'New Moon':
      return ['Intention setting ritual', 'Manifestation grid', 'Seed affirmations'];
    case 'First Quarter':
      return ['Action plan worksheet', 'Decision tarot spread', 'Breakthrough affirmations'];
    case 'Full Moon':
      return ['Release ritual', 'Abundance grid', 'Shadow work journal'];
    case 'Last Quarter':
      return ['Reflection prompts', 'Forgiveness practice', 'Letting go ritual'];
    default:
      return ['Moon ritual', 'Daily affirmation', 'Tarot spread'];
  }
};

// Get icon for content type
const getContentIcon = (contentType: string) => {
  if (contentType.includes('ritual') || contentType.includes('spread')) return <FaMoon className="text-purple-300" />;
  if (contentType.includes('affirmation') || contentType.includes('grid')) return <FaStar className="text-yellow-300" />;
  if (contentType.includes('journal') || contentType.includes('prompts')) return <FaBook className="text-green-300" />;
  if (contentType.includes('work')) return <FaMagic className="text-blue-300" />;
  return <FaDownload className="text-[#A3B18A]" />;
};

interface MoonCalendarProps {
  month?: string; // If not provided, uses current month
  year?: number;
}

export const MoonCalendar: React.FC<MoonCalendarProps> = ({ 
  month = 'May', 
  year = 2025 
}) => {
  return (
    <Card className="bg-[#0A192F] border-[#A3B18A]/30 shadow-lg">
      <CardHeader className="border-b border-[#A3B18A]/20">
        <CardTitle className="text-[#D4AF37] flex items-center justify-between">
          <div className="flex items-center">
            <FaMoon className="mr-2" /> Moon Phase Content Calendar
          </div>
          <span className="text-sm font-normal">{month} {year}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {moonPhases.map((moon, index) => (
            <div key={index} className="relative">
              {index > 0 && (
                <div className="absolute h-full w-0.5 bg-[#A3B18A]/10 left-5 -top-6 z-0"></div>
              )}
              <div className="flex relative z-10">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${moon.color}`}>
                  <FaMoon className={`text-lg ${moon.textColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-[#D4AF37]">{moon.phase}</h3>
                      <p className="text-xs text-[#FAF3E0]">
                        {new Date(moon.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {moon.zSign} • {moon.element}
                      </p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      moon.phase === 'New Moon' ? 'bg-blue-500/20 text-blue-300' :
                      moon.phase === 'Full Moon' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-[#A3B18A]/20 text-[#A3B18A]'
                    }`}>
                      {moon.phase}
                    </Badge>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium text-[#FAF3E0]">Suggested Content:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {getContentIdeas(moon.phase).map((idea, i) => (
                        <div 
                          key={i}
                          className="text-xs p-2 bg-[#0A192F]/80 border border-[#A3B18A]/20 rounded-md flex items-center"
                        >
                          <div className="h-5 w-5 rounded-full flex items-center justify-center mr-2 bg-[#0A192F]">
                            {getContentIcon(idea)}
                          </div>
                          <span>{idea}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoonCalendar;