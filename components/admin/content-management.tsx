"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowUpDown, Edit, Trash, Eye, Bot } from "lucide-react"

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const contentItems = [
    {
      id: 1,
      title: "Southern Gothic Aesthetics",
      category: "Blog Post",
      status: "Published",
      author: "Latisha V. Waters",
      date: "2023-10-15",
      views: 1245,
    },
    {
      id: 2,
      title: "Healing-Centered Technology",
      category: "Research Paper",
      status: "Draft",
      author: "Latisha V. Waters",
      date: "2023-10-20",
      views: 0,
    },
    {
      id: 3,
      title: "Black Southern Experience",
      category: "Memoir Chapter",
      status: "Published",
      author: "Latisha V. Waters",
      date: "2023-09-28",
      views: 876,
    },
    {
      id: 4,
      title: "ADHD Journey",
      category: "Blog Post",
      status: "Published",
      author: "Latisha V. Waters",
      date: "2023-09-15",
      views: 2134,
    },
    {
      id: 5,
      title: "Community Activism",
      category: "Research Paper",
      status: "Review",
      author: "Latisha V. Waters",
      date: "2023-10-22",
      views: 0,
    },
  ]

  const filteredContent = contentItems.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Content Management</CardTitle>
        <CardDescription>Create, edit, and manage all content across the platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="all-content">
          <TabsList className="bg-[#191970]/10 border border-[#191970]/20">
            <TabsTrigger
              value="all-content"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              All Content
            </TabsTrigger>
            <TabsTrigger
              value="create-content"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              Create Content
            </TabsTrigger>
            <TabsTrigger
              value="ai-generator"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              AI Generator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-content" className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search content..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <Filter size={16} className="mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Blog Post">Blog Post</SelectItem>
                    <SelectItem value="Research Paper">Research Paper</SelectItem>
                    <SelectItem value="Memoir Chapter">Memoir Chapter</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-1">
                  <ArrowUpDown size={16} />
                  <span>Sort</span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-12 bg-[#191970]/10 p-3 font-medium text-sm">
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-1">Actions</div>
              </div>

              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 p-3 border-t items-center">
                    <div className="col-span-5 font-medium">{item.title}</div>
                    <div className="col-span-2 text-sm">{item.category}</div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Draft"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="col-span-2 text-sm">{item.date}</div>
                    <div className="col-span-1 flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">No content found matching your criteria.</div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {filteredContent.length} of {contentItems.length} items
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create-content" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter content title" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="research">Research Paper</SelectItem>
                      <SelectItem value="memoir">Memoir Chapter</SelectItem>
                      <SelectItem value="product">Product Description</SelectItem>
                      <SelectItem value="service">Service Description</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Write your content here..." className="min-h-[200px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="southern, gothic, healing, technology" />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]">Publish</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-generator" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">AI Content Generator</CardTitle>
                <CardDescription>Generate content drafts using AI based on your prompts and guidelines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="social">Social Media Post</SelectItem>
                      <SelectItem value="product">Product Description</SelectItem>
                      <SelectItem value="email">Email Newsletter</SelectItem>
                      <SelectItem value="research">Research Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt or Topic</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe what you want the AI to write about..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="southern">Southern Gothic</SelectItem>
                      <SelectItem value="poetic">Poetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Length</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (300 words)</SelectItem>
                      <SelectItem value="medium">Medium (600 words)</SelectItem>
                      <SelectItem value="long">Long (1200 words)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button className="bg-[#191970] hover:bg-[#191970]/80 text-white">
                  <Bot className="mr-2 h-4 w-4" />
                  Generate Content
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
