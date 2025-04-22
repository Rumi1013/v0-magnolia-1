"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Download, RefreshCw, ImageIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

// Sample style presets
const stylePresets = [
  { value: "southern-gothic", label: "Southern Gothic" },
  { value: "magnolia-bloom", label: "Magnolia Bloom" },
  { value: "digital-art", label: "Digital Art" },
  { value: "watercolor", label: "Watercolor" },
  { value: "photorealistic", label: "Photorealistic" },
  { value: "vintage", label: "Vintage" },
]

// Sample aspect ratios
const aspectRatios = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "4:3", label: "Standard (4:3)" },
  { value: "16:9", label: "Widescreen (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "3:2", label: "Classic (3:2)" },
]

// Sample prompt templates
const promptTemplates = [
  {
    title: "Southern Heritage",
    prompt: "A beautiful Southern magnolia tree in bloom against a backdrop of a historic plantation house at sunset",
  },
  {
    title: "Digital Creativity",
    prompt: "A modern digital workspace with creative elements and Southern-inspired decor",
  },
  {
    title: "Black Excellence",
    prompt: "A powerful portrait of a Black woman entrepreneur in a modern office with Southern design elements",
  },
  {
    title: "Resilience Symbol",
    prompt: "A symbolic representation of resilience and strength using Southern imagery and motifs",
  },
]

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [stylePreset, setStylePreset] = useState("southern-gothic")
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [creativityLevel, setCreativityLevel] = useState(70)
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("prompt")
  const [imageHistory, setImageHistory] = useState<string[]>([])

  const handleGenerateImage = async () => {
    if (!prompt) {
      setError("Please enter a prompt to generate an image.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          negativePrompt,
          stylePreset,
          aspectRatio,
          creativityLevel: creativityLevel / 100, // Convert to 0-1 range
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate image")
      }

      const data = await response.json()
      setGeneratedImage(data.imageUrl)

      // Add to history
      setImageHistory((prev) => [data.imageUrl, ...prev].slice(0, 8))
    } catch (err) {
      console.error(err)
      setError("An error occurred while generating the image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleUseTemplate = (templatePrompt: string) => {
    setPrompt(templatePrompt)
    setActiveTab("prompt")
  }

  const handleDownload = async () => {
    if (!generatedImage) return

    try {
      const response = await fetch(generatedImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `midnight-magnolia-ai-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error("Error downloading image:", err)
      setError("Failed to download the image. Please try again.")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Image Generator</CardTitle>
          <CardDescription>Describe the image you want to create or select from our templates.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="prompt" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt">Image Description</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe the image you want to create..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style-preset">Style</Label>
                <Select value={stylePreset} onValueChange={setStylePreset}>
                  <SelectTrigger id="style-preset">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {stylePresets.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger id="aspect-ratio">
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Select a template to quickly generate images based on our curated prompts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promptTemplates.map((template, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{template.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{template.prompt}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleUseTemplate(template.prompt)}
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="negative-prompt">Negative Prompt</Label>
                <Textarea
                  id="negative-prompt"
                  placeholder="Elements to avoid in the image..."
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Specify elements you want to exclude from the generated image.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="creativity-level">Creativity Level: {creativityLevel}%</Label>
                </div>
                <Slider
                  id="creativity-level"
                  min={0}
                  max={100}
                  step={1}
                  value={[creativityLevel]}
                  onValueChange={(value) => setCreativityLevel(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Higher values create more creative but less predictable results.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
            onClick={handleGenerateImage}
            disabled={loading || !prompt}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
            <CardDescription>Your AI-generated image will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {loading ? (
              <div className="w-full aspect-square flex items-center justify-center bg-muted rounded-md">
                <Loader2 className="h-12 w-12 animate-spin text-rich-gold" />
              </div>
            ) : generatedImage ? (
              <div className="relative w-full aspect-square rounded-md overflow-hidden">
                <Image
                  src={generatedImage || "/placeholder.svg?height=800&width=800&query=ai+image"}
                  alt="AI-generated image"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-square flex flex-col items-center justify-center bg-muted rounded-md p-6 text-center">
                <ImageIcon className="h-12 w-12 mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Your generated image will appear here. Fill out the form and click "Generate Image" to get started.
                </p>
              </div>
            )}
          </CardContent>
          {generatedImage && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleGenerateImage} disabled={loading}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button variant="outline" onClick={handleDownload} disabled={loading}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardFooter>
          )}
        </Card>

        {imageHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Generations</CardTitle>
              <CardDescription>Your recently generated images.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {imageHistory.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden cursor-pointer"
                    onClick={() => setGeneratedImage(img)}
                  >
                    <Image
                      src={img || "/placeholder.svg?height=200&width=200&query=ai+thumbnail"}
                      alt={`Generated image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
