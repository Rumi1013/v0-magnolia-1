import React, { useState } from 'react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingCart, 
  Users, 
  Settings,
  Moon,
  Star,
  Sparkles,
  Clock,
  PenSquare,
  ScrollText,
  MoonStar,
  BookOpen
} from 'lucide-react';

// Energy level type
type EnergyLevel = 'high' | 'medium' | 'low';

const DashboardPage: React.FC = () => {
  const { toast } = useToast();
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel | null>(null);
  
  // Function to handle energy level selection
  const handleEnergySelect = (level: EnergyLevel) => {
    setEnergyLevel(level);
    toast({
      title: "Energy Level Updated",
      description: `Your energy level has been set to ${level}.`,
    });
  };
  
  return (
    <div className="bg-[#FAF3E0]/30 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-[#0A192F] text-[#FAF3E0] rounded-lg p-6 sticky top-24">
              <div className="mb-6 text-center">
                <h2 className="font-playfair text-[#D4AF37] text-xl mb-2">Midnight Magnolia</h2>
                <p className="text-sm text-[#FAF3E0]/70">Digital Content Grimoire</p>
              </div>
              
              <nav className="space-y-1">
                <Link href="/dashboard">
                  <div className="flex items-center space-x-3 bg-[#0A192F]/90 text-[#D4AF37] px-4 py-3 rounded-md">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <Link href="/content-creator">
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#0A192F]/90 text-[#FAF3E0] hover:text-[#D4AF37] transition-colors">
                    <FileText className="h-5 w-5" />
                    <span>Content Creation</span>
                  </div>
                </Link>
                <Link href="/library">
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#0A192F]/90 text-[#FAF3E0] hover:text-[#D4AF37] transition-colors">
                    <BookOpen className="h-5 w-5" />
                    <span>Digital Library</span>
                  </div>
                </Link>
                <Link href="/ai-tools">
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#0A192F]/90 text-[#FAF3E0] hover:text-[#D4AF37] transition-colors">
                    <Sparkles className="h-5 w-5" />
                    <span>AI Tools</span>
                  </div>
                </Link>
                <Link href="/pricing">
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#0A192F]/90 text-[#FAF3E0] hover:text-[#D4AF37] transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Orders & Sales</span>
                  </div>
                </Link>
                <Link href="/clients">
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#0A192F]/90 text-[#FAF3E0] hover:text-[#D4AF37] transition-colors">
                    <Users className="h-5 w-5" />
                    <span>Client Management</span>
                  </div>
                </Link>
                <Link href="/settings">
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#0A192F]/90 text-[#FAF3E0] hover:text-[#D4AF37] transition-colors">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </div>
                </Link>
              </nav>
              
              <div className="mt-8 border-t border-[#FAF3E0]/10 pt-6">
                <h3 className="text-sm font-medium text-[#FAF3E0] mb-4">Energy Tracker</h3>
                <div className="flex justify-between gap-2">
                  <Button 
                    variant="outline" 
                    className={`flex-1 border-green-500 ${energyLevel === 'high' ? 'bg-green-500/20 text-green-400' : 'text-green-600 hover:bg-green-500/10'}`}
                    onClick={() => handleEnergySelect('high')}
                  >
                    High
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`flex-1 border-amber-500 ${energyLevel === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'text-amber-600 hover:bg-amber-500/10'}`}
                    onClick={() => handleEnergySelect('medium')}
                  >
                    Medium
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`flex-1 border-blue-400 ${energyLevel === 'low' ? 'bg-blue-400/20 text-blue-300' : 'text-blue-500 hover:bg-blue-400/10'}`}
                    onClick={() => handleEnergySelect('low')}
                  >
                    Low
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9">
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h1 className="text-3xl font-playfair text-[#0A192F] mb-2">Welcome to Your Digital Grimoire</h1>
                  <div className="flex items-center">
                    <Moon className="text-[#0A192F]/70 h-4 w-4 mr-1" />
                    <p className="text-[#0A192F]/70">Waxing Crescent | May 11, 2025 | Ideal for: new beginnings, setting intentions</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50 px-3 py-1">
                    Premium Account
                  </Badge>
                </div>
              </div>
            </header>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-[#0A192F]">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#0A192F]">$2,450</div>
                  <p className="text-sm text-green-600">+18% this month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-[#0A192F]">Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#0A192F]">32</div>
                  <p className="text-sm text-green-600">+5 since last week</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-[#0A192F]">Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#0A192F]">14</div>
                  <p className="text-sm text-[#0A192F]/60">No change</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-[#0A192F]">Goal Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-1">
                    <div className="text-2xl font-bold text-[#0A192F]">24.5%</div>
                    <div className="text-sm text-[#0A192F]/60">$2,450/$10,000</div>
                  </div>
                  <Progress value={24.5} className="h-2" />
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Activity & Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair text-[#0A192F]">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 mt-0.5 text-[#D4AF37]">
                        <ShoppingCart className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0A192F]">New sale: The Magnolia Reset Journal</p>
                        <p className="text-[#0A192F]/60 text-sm">2 hours ago</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 mt-0.5 text-[#D4AF37]">
                        <PenSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0A192F]">Created 5 new affirmation cards</p>
                        <p className="text-[#0A192F]/60 text-sm">Yesterday</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-3 mt-0.5 text-[#D4AF37]">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0A192F]">New client: Maya Johnson</p>
                        <p className="text-[#0A192F]/60 text-sm">2 days ago</p>
                      </div>
                    </li>
                  </ul>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-[#0A192F]/70 hover:text-[#0A192F]"
                    onClick={() => toast({
                      title: "Coming Soon",
                      description: "View all activity feature is under development.",
                    })}
                  >
                    View all activity
                    <Clock className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-[#0A192F]/10">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair text-[#0A192F]">Today's Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-5 w-5 rounded border border-[#0A192F]/30 mr-3"></div>
                        <span className="text-[#0A192F]">Complete Tarot deck descriptions</span>
                      </div>
                      <Badge className="bg-red-50 text-red-600 border-red-200">High</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-5 w-5 rounded border border-[#0A192F]/30 mr-3"></div>
                        <span className="text-[#0A192F]">Upload new journal templates</span>
                      </div>
                      <Badge className="bg-amber-50 text-amber-600 border-amber-200">Medium</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-5 w-5 rounded border border-[#0A192F]/30 mr-3 flex items-center justify-center bg-[#0A192F]/10">
                          <svg className="h-3 w-3 text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[#0A192F]/60 line-through">Respond to customer inquiries</span>
                      </div>
                      <Badge className="bg-[#0A192F]/10 text-[#0A192F]/60 border-[#0A192F]/20">Completed</Badge>
                    </li>
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                    onClick={() => toast({
                      title: "Add Task",
                      description: "Task management feature is under development.",
                    })}
                  >
                    + Add New Task
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Create */}
            <Card className="bg-white border-[#0A192F]/10">
              <CardHeader>
                <CardTitle className="text-xl font-playfair text-[#0A192F]">Quick Create</CardTitle>
                <CardDescription className="text-[#0A192F]/70">
                  Start creating your mystical content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Link href="/content-creator">
                    <a className="block">
                      <div className="border border-[#0A192F]/10 rounded-lg p-4 text-center hover:bg-[#0A192F]/5 transition-colors">
                        <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                          <Star className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-[#0A192F]">Affirmation Card</h3>
                      </div>
                    </a>
                  </Link>
                  
                  <Link href="/content-creator">
                    <a className="block">
                      <div className="border border-[#0A192F]/10 rounded-lg p-4 text-center hover:bg-[#0A192F]/5 transition-colors">
                        <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                          <MoonStar className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-[#0A192F]">Tarot Description</h3>
                      </div>
                    </a>
                  </Link>
                  
                  <Link href="/content-creator">
                    <a className="block">
                      <div className="border border-[#0A192F]/10 rounded-lg p-4 text-center hover:bg-[#0A192F]/5 transition-colors">
                        <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                          <ScrollText className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-[#0A192F]">Journal Prompt</h3>
                      </div>
                    </a>
                  </Link>
                  
                  <Link href="/content-creator">
                    <a className="block">
                      <div className="border border-[#0A192F]/10 rounded-lg p-4 text-center hover:bg-[#0A192F]/5 transition-colors">
                        <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                          <ShoppingCart className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-[#0A192F]">Product Listing</h3>
                      </div>
                    </a>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;