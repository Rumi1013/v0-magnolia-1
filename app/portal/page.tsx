"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FloatingPaper } from "@/components/floating-paper"
import { Sparkles } from "@/components/sparkles"
import { useRouter } from "next/navigation"

export default function PortalPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/dashboard")
    }, 1500)
  }

  const handleClientLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/client/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden py-20 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[#0A192F]" />

      <div className="absolute inset-0 pointer-events-none">
        <FloatingPaper count={6} />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <Sparkles count={20} />
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        <Card className="border border-[#D4AF37]/20 bg-[#191970]/30 backdrop-blur-sm w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-serif text-[#FAF3E0]">Welcome Back</CardTitle>
            <CardDescription className="text-gray-300">Sign in to access your portal</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 w-full">
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="client">
                <form onSubmit={handleClientLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-email" className="text-[#FAF3E0]">
                        Email
                      </Label>
                      <Input
                        id="client-email"
                        placeholder="your@email.com"
                        required
                        className="bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-password" className="text-[#FAF3E0]">
                        Password
                      </Label>
                      <Input
                        id="client-password"
                        type="password"
                        required
                        className="bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email" className="text-[#FAF3E0]">
                        Admin Email
                      </Label>
                      <Input
                        id="admin-email"
                        placeholder="admin@midnightmagnolia.com"
                        required
                        className="bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password" className="text-[#FAF3E0]">
                        Password
                      </Label>
                      <Input
                        id="admin-password"
                        type="password"
                        required
                        className="bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0]"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-gray-400">
              <a href="#" className="text-[#D4AF37] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="text-sm text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-[#D4AF37] hover:underline">
                Contact us
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
