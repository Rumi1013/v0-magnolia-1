import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/ui/logo";
import { useState } from "react";
import ErrorBoundary from "@/components/ui/error-boundary";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Notion from "@/pages/Notion";
import AuthPage from "@/pages/auth-page";
import WorkflowPage from "@/pages/workflow-page";
import AIToolsPage from "@/pages/ai-tools-page";
import CheckoutPage from "@/pages/checkout-page";
import DashboardPage from "@/pages/dashboard-page";
import ContentCreatorPage from "@/pages/content-creator-page";
import ClientViewPage from "@/pages/client-view-page";
import MembershipPage from "@/pages/membership-page";
import ContentOfferingsPage from "@/pages/content-offerings-page";
import ContentFulfillmentPage from "@/pages/content-fulfillment-page";
import { BirthChartGenerator } from "@/components/BirthChartGenerator";
import { TieredProductPricing } from "@/components/TieredProductPricing";

function AppNavigation() {
  const { user, logoutMutation } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ErrorBoundary>
      <nav className="bg-[#0A192F] border-b border-[#A3B18A]/20 py-3 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <div className="bg-[#FAF3E0] rounded-full p-1 overflow-hidden">
                <Logo size="sm" />
              </div>
              <span className="text-[#D4AF37] font-playfair text-xl md:text-2xl">Midnight Magnolia</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-[#FAF3E0]">
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/' ? 'text-[#D4AF37]' : ''}`}>
              Home
            </Link>
            <Link to="/content-creator" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/content-creator' ? 'text-[#D4AF37]' : ''}`}>
              Digital Grimoire
            </Link>
            <Link to="/content-fulfillment" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/content-fulfillment' ? 'text-[#D4AF37]' : ''}`}>
              Content Fulfillment
            </Link>
            <Link to="/workflows" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/workflows' ? 'text-[#D4AF37]' : ''}`}>
              Workflows
            </Link>
            <Link to="/ai-tools" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/ai-tools' ? 'text-[#D4AF37]' : ''}`}>
              AI Tools
            </Link>
            <Link to="/birth-chart" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/birth-chart' ? 'text-[#D4AF37]' : ''}`}>
              Birth Chart
            </Link>
            <Link to="/library" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/library' ? 'text-[#D4AF37]' : ''}`}>
              Content Library
            </Link>
            <Link to="/content-offerings" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/content-offerings' ? 'text-[#D4AF37]' : ''}`}>
              Content Offerings
            </Link>
            <Link to="/membership" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/membership' ? 'text-[#D4AF37]' : ''}`}>
              Membership
            </Link>
            <Link to="/pricing" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/pricing' ? 'text-[#D4AF37]' : ''}`}>
              Pricing
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/dashboard' ? 'text-[#D4AF37]' : ''}`}>
                  <span className="text-[#FAF3E0] hover:text-[#D4AF37]">My Dashboard</span>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-[#0A192F] rounded-lg p-4 absolute left-0 right-0 mx-4 z-50 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link to="/" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/content-creator" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/content-creator' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Digital Grimoire
              </Link>
              <Link to="/content-fulfillment" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/content-fulfillment' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Content Fulfillment
              </Link>
              <Link to="/workflows" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/workflows' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Workflows
              </Link>
              <Link to="/ai-tools" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/ai-tools' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                AI Tools
              </Link>
              <Link to="/birth-chart" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/birth-chart' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Birth Chart
              </Link>
              <Link to="/library" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/library' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Content Library
              </Link>
              <Link to="/content-offerings" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/content-offerings' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Content Offerings
              </Link>
              <Link to="/membership" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/membership' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Membership
              </Link>
              <Link to="/pricing" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/pricing' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              
              {user ? (
                <>
                  <div className="text-[#FAF3E0] pt-2 border-t border-[#A3B18A]/20">Welcome, {user.username}</div>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black w-full mb-2"
                    >
                      My Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    disabled={logoutMutation.isPending}
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </ErrorBoundary>
  );
}

function AppRouter() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route path="/" component={Home} />
          <ProtectedRoute path="/notion" component={() => <Notion />} />
          <ProtectedRoute path="/workflows" component={() => <WorkflowPage />} />
          <ProtectedRoute path="/ai-tools" component={() => <AIToolsPage />} />
          <ProtectedRoute path="/dashboard" component={() => <DashboardPage />} />
          <ProtectedRoute path="/content-creator" component={() => <ContentCreatorPage />} />
          <ProtectedRoute path="/content-fulfillment" component={() => <ContentFulfillmentPage />} />
          <Route path="/library" component={() => <ClientViewPage />} />
          <Route path="/birth-chart" component={() => (
            <div className="bg-gradient-to-b from-[#0A192F]/5 to-[#FAF3E0]/20 min-h-screen py-8">
              <BirthChartGenerator />
            </div>
          )} />
          <Route path="/pricing" component={() => (
            <div className="bg-gradient-to-b from-[#0A192F]/5 to-[#FAF3E0]/20 min-h-screen py-8">
              <TieredProductPricing />
            </div>
          )} />
          <Route path="/membership" component={MembershipPage} />
          <Route path="/content-offerings" component={ContentOfferingsPage} />
          <ProtectedRoute path="/checkout" component={() => <CheckoutPage />} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;