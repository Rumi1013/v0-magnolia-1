import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

// Define validation schemas
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = loginSchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { toast } = useToast();
  const [_, navigate] = useLocation();

  // Get auth context
  const { user, isLoading, loginMutation, registerMutation } = useAuth();

  // Setup form for login
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Setup form for registration
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Handle login form submission
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await loginMutation.mutateAsync(values);
      toast({
        title: "Login successful",
        description: "Welcome to the Digital Grimoire",
        variant: "default",
      });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Handle registration form submission
  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await registerMutation.mutateAsync(values);
      toast({
        title: "Registration successful",
        description: "Welcome to the Digital Grimoire",
        variant: "default",
      });
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // Redirect to home if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A192F] flex flex-col md:flex-row items-center justify-center p-4 md:p-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-card dark:bg-[#0F2942] rounded-lg overflow-hidden shadow-xl">
        {/* Left side: Auth forms */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-2 text-[#D4AF37]">Midnight Magnolia</h1>
          <h2 className="text-3xl font-bold mb-6">Digital Grimoire</h2>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input 
                        id="login-username" 
                        placeholder="Your username" 
                        {...loginForm.register("username")} 
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.username.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input 
                        id="login-password" 
                        type="password" 
                        placeholder="Your password" 
                        {...loginForm.register("password")} 
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#D4AF37] hover:bg-[#B4951E] text-black"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Enter your details to join the Digital Grimoire</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input 
                        id="register-username" 
                        placeholder="Your username" 
                        {...registerForm.register("username")} 
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.username.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="Your email" 
                        {...registerForm.register("email")} 
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input 
                        id="register-password" 
                        type="password" 
                        placeholder="Your password" 
                        {...registerForm.register("password")} 
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#D4AF37] hover:bg-[#B4951E] text-black"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create account"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right side: Brand / Hero section */}
        <div className="w-full md:w-1/2 bg-[url('/herbs-bg.jpg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2942]/90 to-[#0A192F]/80 flex flex-col justify-center items-center text-center p-8">
            <div className="max-w-md">
              <h2 className="text-[#D4AF37] text-3xl font-bold mb-4">The Digital Grimoire</h2>
              <p className="text-white/90 text-lg mb-6">
                Your sacred space for magical content creation, tarot insights, and membership-based offerings.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5">
                  <span className="text-[#D4AF37] text-xl mb-1">✧</span>
                  <p>Content Management</p>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5">
                  <span className="text-[#D4AF37] text-xl mb-1">❍</span>
                  <p>Tarot Integration</p>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5">
                  <span className="text-[#D4AF37] text-xl mb-1">✦</span>
                  <p>Membership Tiers</p>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5">
                  <span className="text-[#D4AF37] text-xl mb-1">✧</span>
                  <p>AI-Powered Tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;