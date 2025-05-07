import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Notion from "@/pages/Notion";
import AuthPage from "@/pages/auth-page";
import WorkflowPage from "@/pages/workflow-page";

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
    <nav className="bg-[#0A192F] border-b border-[#A3B18A]/20 py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-[#D4AF37] font-playfair text-xl hover:text-[#D4AF37]/80 transition-colors duration-300">
            Midnight Magnolia
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
          <Link to="/notion" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/notion' ? 'text-[#D4AF37]' : ''}`}>
            Creator Hub
          </Link>
          <Link to="/workflows" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/workflows' ? 'text-[#D4AF37]' : ''}`}>
            Workflows
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-[#FAF3E0]">Welcome, {user.username}</span>
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
        <div className="md:hidden mt-4 bg-[#0F2942] rounded-lg p-4 absolute left-0 right-0 mx-4 z-50 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/notion" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/notion' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Creator Hub
            </Link>
            <Link to="/workflows" className={`text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300 ${location === '/workflows' ? 'text-[#D4AF37]' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Workflows
            </Link>
            
            {user ? (
              <>
                <div className="text-[#FAF3E0] pt-2 border-t border-[#A3B18A]/20">Welcome, {user.username}</div>
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
  );
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route path="/" component={Home} />
          <ProtectedRoute path="/notion" component={() => <Notion />} />
          <ProtectedRoute path="/workflows" component={() => <WorkflowPage />} />
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
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
