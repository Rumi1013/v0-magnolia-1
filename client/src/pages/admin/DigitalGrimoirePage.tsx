import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Book, Search, Filter, ArrowUp, Download, BookOpen, Bookmark, Calendar, Tag, Star, Edit, Clock, BookmarkPlus } from 'lucide-react';

interface SpellEntry {
  id: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
  source: string;
  dateAdded: string;
  lastAccessed?: string;
  isFavorite: boolean;
}

const CATEGORIES = [
  'All Entries',
  'Affirmations',
  'Rituals',
  'Journal Prompts',
  'Tarot Readings',
  'Meditations',
  'Resources',
  'Templates'
];

const DigitalGrimoirePage: React.FC = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All Entries');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Placeholder data - this would be loaded from the backend
  const [entries, setEntries] = useState<SpellEntry[]>([
    {
      id: '1',
      title: 'Full Moon Ritual for Abundance',
      category: 'Rituals',
      tags: ['moon phases', 'abundance', 'manifestation'],
      content: 'A full moon ritual designed to attract abundance and prosperity. Gather your materials: a white candle, bay leaves, green crystals...',
      source: 'Original Creation',
      dateAdded: '2025-04-15T12:00:00Z',
      lastAccessed: '2025-05-08T18:30:00Z',
      isFavorite: true
    },
    {
      id: '2',
      title: 'Daily Affirmation Template for Shadow Work',
      category: 'Templates',
      tags: ['shadow work', 'affirmations', 'self-love'],
      content: 'I acknowledge my shadows as teachers. I embrace the wisdom of my full experience. Through acceptance, I transform darkness into light...',
      source: 'Adapted from Monthly Shadow Work Package',
      dateAdded: '2025-05-01T09:15:00Z',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Three Card Tarot Spread for Guidance',
      category: 'Tarot Readings',
      tags: ['tarot', 'guidance', 'decisions'],
      content: 'This three-card spread helps provide clarity on difficult decisions. Position 1: The current situation. Position 2: The obstacle or challenge...',
      source: 'Tarot Collection Vol. 2',
      dateAdded: '2025-03-22T14:45:00Z',
      lastAccessed: '2025-05-10T10:20:00Z',
      isFavorite: true
    },
    {
      id: '4',
      title: 'Evening Journal Prompt for Gratitude',
      category: 'Journal Prompts',
      tags: ['gratitude', 'evening practice', 'reflection'],
      content: 'What three unexpected moments brought you joy today? How did these moments shift your perspective or energy? How might you invite more of these...',
      source: 'Monthly Journal Package',
      dateAdded: '2025-04-28T20:10:00Z',
      isFavorite: false
    },
    {
      id: '5',
      title: 'Morning Affirmation for Creativity',
      category: 'Affirmations',
      tags: ['creativity', 'morning ritual', 'inspiration'],
      content: 'My creative spirit flows freely today. I am a vessel for divine inspiration. My unique voice deserves to be expressed...',
      source: 'Creative Awakening Series',
      dateAdded: '2025-05-05T07:30:00Z',
      lastAccessed: '2025-05-11T07:25:00Z',
      isFavorite: true
    }
  ]);

  // Filter entries based on active category and search query
  const filteredEntries = entries.filter(entry => {
    // Filter by category
    if (activeCategory !== 'All Entries' && entry.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query) ||
        entry.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Sort entries
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'dateAdded':
        comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        break;
      case 'lastAccessed':
        // Handle entries without lastAccessed date
        if (!a.lastAccessed) return 1;
        if (!b.lastAccessed) return -1;
        comparison = new Date(a.lastAccessed).getTime() - new Date(b.lastAccessed).getTime();
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setEntries(prev => 
      prev.map(entry => 
        entry.id === id 
          ? { ...entry, isFavorite: !entry.isFavorite } 
          : entry
      )
    );
    
    toast({
      title: "Favorite status updated",
      description: "Your changes have been saved",
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair text-[#D4AF37] mb-2">Digital Grimoire</h1>
            <p className="text-[#FAF3E0] opacity-80 font-lora">
              Your personal collection of spells, rituals, and wisdom for content creation
            </p>
          </div>
          <Button className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/90">
            <BookmarkPlus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-[250px_1fr]">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
              <CardHeader>
                <CardTitle className="text-[#D4AF37] text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                        activeCategory === category 
                          ? 'bg-[#051224] text-[#D4AF37]' 
                          : 'text-[#FAF3E0] hover:bg-[#051224]/50'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category === 'All Entries' ? (
                        <Book className="h-4 w-4 mr-2" />
                      ) : category === 'Affirmations' ? (
                        <Star className="h-4 w-4 mr-2" />
                      ) : category === 'Rituals' ? (
                        <BookOpen className="h-4 w-4 mr-2" />
                      ) : category === 'Journal Prompts' ? (
                        <Edit className="h-4 w-4 mr-2" />
                      ) : category === 'Tarot Readings' ? (
                        <Bookmark className="h-4 w-4 mr-2" />
                      ) : category === 'Meditations' ? (
                        <Clock className="h-4 w-4 mr-2" />
                      ) : (
                        <BookOpen className="h-4 w-4 mr-2" />
                      )}
                      {category}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
            
            <Card className="bg-[#0A192F] border border-[#A3B18A]/30">
              <CardHeader>
                <CardTitle className="text-[#D4AF37] text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]">
                    <Tag className="h-3 w-3 mr-1" />
                    moon phases
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]">
                    <Tag className="h-3 w-3 mr-1" />
                    shadow work
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]">
                    <Tag className="h-3 w-3 mr-1" />
                    manifestation
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]">
                    <Tag className="h-3 w-3 mr-1" />
                    creativity
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]">
                    <Tag className="h-3 w-3 mr-1" />
                    gratitude
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="space-y-6">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A3B18A]" />
                <Input
                  placeholder="Search grimoire..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#051224] border-[#A3B18A]/30 text-[#FAF3E0]"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A3B18A]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-10 h-10 rounded-md border border-[#A3B18A]/30 bg-[#051224] text-[#FAF3E0] focus:ring-1 focus:ring-[#D4AF37] pr-10"
                  >
                    <option value="title">Title</option>
                    <option value="dateAdded">Date Added</option>
                    <option value="lastAccessed">Last Accessed</option>
                  </select>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="h-10 w-10 border-[#A3B18A]/30 text-[#A3B18A]"
                >
                  <ArrowUp className={`h-4 w-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
            
            {/* Entries */}
            {sortedEntries.length > 0 ? (
              <div className="space-y-4">
                {sortedEntries.map(entry => (
                  <Card key={entry.id} className="bg-[#0A192F] border border-[#A3B18A]/30 hover:border-[#A3B18A]/60 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                            {entry.title}
                            {entry.isFavorite && (
                              <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                            )}
                          </CardTitle>
                          <CardDescription className="text-[#FAF3E0]/70">
                            {entry.category}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(entry.id)}
                          className="h-8 w-8 text-[#D4AF37]"
                        >
                          <Star className={`h-4 w-4 ${entry.isFavorite ? 'fill-[#D4AF37]' : ''}`} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-[#FAF3E0] line-clamp-3 font-lora">
                        {entry.content}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {entry.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 rounded-full bg-[#051224] text-[#A3B18A] border border-[#A3B18A]/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 flex justify-between text-xs text-[#FAF3E0]/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        Added: {formatDate(entry.dateAdded)}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-[#A3B18A] hover:text-[#D4AF37]">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-[#A3B18A] hover:text-[#D4AF37]">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 border border-dashed border-[#A3B18A]/30 rounded-lg">
                <Book className="h-12 w-12 text-[#A3B18A]/30" />
                <h3 className="mt-4 text-[#D4AF37] font-medium">No entries found</h3>
                <p className="text-[#FAF3E0]/60 mt-1 text-center max-w-sm">
                  {searchQuery 
                    ? "No entries match your search criteria. Try different keywords or clear your search."
                    : "No entries found in this category. Add your first entry to begin building your grimoire."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalGrimoirePage;