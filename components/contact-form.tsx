"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    interest: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send form data to API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        interest: "",
      })

      // Show success message
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border border-[#D4AF37]/20 bg-[#191970]/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-[#FAF3E0]">Contact Us</CardTitle>
        <CardDescription className="text-gray-300">
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#FAF3E0]">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#FAF3E0]">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest" className="text-[#FAF3E0]">
              I'm interested in
            </Label>
            <Select value={formData.interest} onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="branding">Branding & Design</SelectItem>
                <SelectItem value="website">Website Development</SelectItem>
                <SelectItem value="consulting">Consulting Services</SelectItem>
                <SelectItem value="products">Digital Products</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-[#FAF3E0]">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject of your message"
              required
              className="bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[#FAF3E0]">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              required
              className="min-h-[120px] bg-[#0A192F]/50 border-[#D4AF37]/30 text-[#FAF3E0]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
