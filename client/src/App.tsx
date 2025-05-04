import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Notion from "@/pages/Notion";

function Router() {
  return (
    <div>
      <nav className="bg-[#0A192F] border-b border-[#A3B18A]/20 py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-[#D4AF37] font-playfair text-xl hover:text-[#D4AF37]/80 transition-colors duration-300">
                Midnight Magnolia
              </a>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/">
              <a className="text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300">
                Home
              </a>
            </Link>
            <Link href="/notion">
              <a className="text-[#FAF3E0] hover:text-[#D4AF37] transition-colors duration-300">
                Creator Hub
              </a>
            </Link>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/notion" component={Notion}/>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
