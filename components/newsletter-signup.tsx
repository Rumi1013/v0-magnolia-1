"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSignup() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe")
      }

      setEmail("")
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter.",
      })
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-xl font-serif text-[#FAF3E0] mb-2">Join Our Newsletter</h3>
        <p className="text-gray-300">Stay updated with our latest news and offerings</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0] flex-grow"
        />
        <Button type="submit" className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]" disabled={isSubmitting}>
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  )
}
