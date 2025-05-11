import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoonStar, Sparkles, Moon, Loader2 } from 'lucide-react';

// Form validation schema
const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  }),
});

const registerSchema = loginSchema.extend({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters"
  }),
});

const AuthPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  // Redirect if already logged in
  if (user) {
    setLocation('/dashboard');
    return null;
  }

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await loginMutation.mutateAsync(values);
      toast({
        title: "Login Successful",
        description: "Welcome to Midnight Magnolia's Digital Grimoire!",
      });
      setLocation('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Error is already handled in the mutation's onError callback
    }
  };

  // Handle registration submission
  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await registerMutation.mutateAsync({
        ...values,
        membershipTier: 'free'
      });
      toast({
        title: "Registration Successful",
        description: "Welcome to Midnight Magnolia's Digital Grimoire!",
      });
      setLocation('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      // Error is already handled in the mutation's onError callback
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0]/30 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column - Form */}
        <div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-[#0A192F] data-[state=active]:text-[#FAF3E0]">
                Register
              </TabsTrigger>
            </TabsList>
            
            {/* Login Form */}
            <TabsContent value="login">
              <Card className="border-[#0A192F]/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-[#0A192F]">Welcome Back</CardTitle>
                  <CardDescription className="text-[#0A192F]/70">
                    Enter your credentials to access the Digital Grimoire
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0A192F]">Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your username" 
                                className="border-[#0A192F]/20 text-[#0A192F]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0A192F]">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Enter your password" 
                                className="border-[#0A192F]/20 text-[#0A192F]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Register Form */}
            <TabsContent value="register">
              <Card className="border-[#0A192F]/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-[#0A192F]">Create Account</CardTitle>
                  <CardDescription className="text-[#0A192F]/70">
                    Join the Midnight Magnolia community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0A192F]">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                className="border-[#0A192F]/20 text-[#0A192F]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0A192F]">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="border-[#0A192F]/20 text-[#0A192F]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0A192F]">Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Choose a username" 
                                className="border-[#0A192F]/20 text-[#0A192F]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#0A192F]">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Create a password" 
                                className="border-[#0A192F]/20 text-[#0A192F]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Hero */}
        <div className="hidden md:block">
          <div className="bg-[#0A192F] text-[#FAF3E0] p-8 rounded-lg">
            <div className="mb-6 flex justify-center">
              <MoonStar className="h-16 w-16 text-[#D4AF37]" />
            </div>
            <h1 className="text-3xl font-playfair text-center mb-6">The Digital Grimoire</h1>
            <p className="text-[#FAF3E0]/80 mb-6 text-center">
              Unlock a world of mystical content creation tools, workflows, and resources to enhance your spiritual and creative journey.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3 text-[#D4AF37]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-[#FAF3E0]">AI-Powered Content Creation</h3>
                  <p className="text-[#FAF3E0]/60 text-sm">Generate affirmations, tarot descriptions, and journal prompts with our AI tools.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3 text-[#D4AF37]">
                  <Moon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-[#FAF3E0]">Guided Workflows</h3>
                  <p className="text-[#FAF3E0]/60 text-sm">Follow structured workflows to streamline your content creation process.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3 text-[#D4AF37]">
                  <MoonStar className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-[#FAF3E0]">Premium Content</h3>
                  <p className="text-[#FAF3E0]/60 text-sm">Access exclusive resources and templates with premium membership tiers.</p>
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