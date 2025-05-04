"use client"

import type React from "react"

import { useState } from "react"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      setStatus("success")
      setMessage("Thank you for subscribing to our newsletter!")
      setEmail("")

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Failed to subscribe. Please try again.")

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    }
  }

  return (
    <section className="py-16 bg-[#191970]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-3 bg-[#D4AF37]/20 rounded-full mb-6">
            <Mail className="h-8 w-8 text-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#F8F6F0] mb-4">Stay Connected</h2>
          <p className="text-[#F8F6F0]/80 mb-8">
            Subscribe to our newsletter for southern-inspired digital insights, exclusive offers, and updates on our
            latest products and services.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-l-md bg-[#F8F6F0]/10 text-[#F8F6F0] border border-[#F8F6F0]/20 focus:outline-none focus:border-[#D4AF37]"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-[#D4AF37] text-[#191970] rounded-r-md hover:bg-[#D4AF37]/80 transition-colors font-medium disabled:opacity-70"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {status === "success" && (
            <div className="mt-4 flex items-center justify-center text-green-400">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>{message}</span>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 flex items-center justify-center text-red-400">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{message}</span>
            </div>
          )}

          <p className="mt-6 text-[#F8F6F0]/60 text-sm">
            By subscribing, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-[#D4AF37]">
              Privacy Policy
            </a>{" "}
            and consent to receive updates from Midnight Magnolia.
          </p>
        </div>
      </div>
    </section>
  )
}
