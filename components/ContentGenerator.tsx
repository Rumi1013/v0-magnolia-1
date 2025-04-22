"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

const contentTypes = [
  { value: "blog-post", label: "Blog Post" },
  { value: "product-description", label: "Product Description" },
  { value: "social-media", label: "Social Media Post" },
  { value: "email-newsletter", label: "Email Newsletter" },
  { value: "brand-story", label: "Brand Story" },
]

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState("")
  const [contentType, setContentType] = useState("blog-post")
  const [tone, setTone] = useState("professional")
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          contentType,
          tone,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (err) {
      console.error(err)
      setError("An error occurred while generating content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Content Generator</CardTitle>
          <CardDescription>Describe what you want to create and our AI will generate content for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="content-type" className="block text-sm font-medium">
                Content Type
              </label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger id="content-type">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="tone" className="block text-sm font-medium">
                Tone
              </label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="southern">Southern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="prompt" className="block text-sm font-medium">
                Prompt
              </label>
              <Textarea
                id="prompt"
                placeholder="Describe what you want to create..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Content"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Content</CardTitle>
          <CardDescription>Your AI-generated content will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : generatedContent ? (
            <div className="whitespace-pre-wrap">{generatedContent}</div>
          ) : (
            <div className="text-gray-400 italic">
              Fill out the form and click "Generate Content" to see results here.
            </div>
          )}
        </CardContent>
        {generatedContent && (
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(generatedContent)
              }}
            >
              Copy to Clipboard
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
