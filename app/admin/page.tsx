"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Clear any previous auth on mount
  useEffect(() => {
    // Clear previous authentication to ensure fresh login
    document.cookie = "adminAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.removeItem("adminToken")
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Simple credential check for demo purposes
    if (email === "latisha@midnight-magnolia.com" && password === "1234") {
      try {
        // Set a cookie and localStorage item to simulate authentication
        document.cookie = "adminAuthenticated=true; path=/; max-age=86400"
        localStorage.setItem("adminToken", "demo-token-12345")

        // Redirect to admin dashboard
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 500)
      } catch (err) {
        console.error("Authentication error:", err)
        setError("Authentication failed. Please try again.")
        setIsSubmitting(false)
      }
    } else {
      setError("Invalid email or password")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center p-4">
      {/* Solid background for mobile */}
      <div className="absolute inset-0 overflow-hidden bg-[#0F0F1A]">
        <div className="absolute inset-0 bg-grid-white/[0.02] hidden md:block" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[#191970] font-serif font-bold text-xl">M</span>
            </div>
            <span className="text-white font-serif text-xl">Midnight Magnolia</span>
          </Link>
        </div>

        <Card className="border border-[#D4AF37]/20 bg-[#191970]/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif text-white text-center">Admin Access</CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="latisha@midnight-magnolia.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-[#D4AF37]/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-[#D4AF37]/20 text-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970] font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-[#191970] border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" /> Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-xs text-gray-400 text-center">
              <p>Demo credentials:</p>
              <p>Email: latisha@midnight-magnolia.com</p>
              <p>Password: 1234</p>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-4 text-center">
          <Link href="/" className="text-[#D4AF37] hover:underline text-sm">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
