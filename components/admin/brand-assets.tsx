"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, Copy, Search, Filter, Plus, Trash, Edit, Eye, ImageIcon, FileText } from "lucide-react"

export function BrandAssets() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const brandAssets = [
    {
      id: 1,
      name: "Midnight Magnolia Logo - Primary",
      type: "Logo",
      format: "PNG",
      size: "2.4 MB",
      dimensions: "1200 x 1200",
      date: "2023-08-15",
      thumbnail: "/abstract-logo.png",
    },
    {
      id: 2,
      name: "Midnight Magnolia Logo - White",
      type: "Logo",
      format: "PNG",
      size: "2.1 MB",
      dimensions: "1200 x 1200",
      date: "2023-08-15",
      thumbnail: "/white-abstract-logo.png",
    },
    {
      id: 3,
      name: "Southern Gothic Banner",
      type: "Banner",
      format: "JPG",
      size: "3.8 MB",
      dimensions: "1920 x 1080",
      date: "2023-09-05",
      thumbnail: "/celebratory-banner.png",
    },
    {
      id: 4,
      name: "Product Photography - Journals",
      type: "Product",
      format: "JPG",
      size: "5.2 MB",
      dimensions: "2400 x 1600",
      date: "2023-09-12",
      thumbnail: "/open-leather-journal.png",
    },
    {
      id: 5,
      name: "Brand Pattern - Magnolia",
      type: "Pattern",
      format: "SVG",
      size: "1.8 MB",
      dimensions: "Scalable",
      date: "2023-09-20",
      thumbnail: "/repeating-geometric-pattern.png",
    },
    {
      id: 6,
      name: "Social Media Template",
      type: "Template",
      format: "PSD",
      size: "8.5 MB",
      dimensions: "1080 x 1080",
      date: "2023-10-01",
      thumbnail: "/interconnected-social-media.png",
    },
  ]

  const filteredAssets = brandAssets.filter(
    (asset) =>
      (selectedType === "all" || asset.type === selectedType) &&
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Brand Assets</CardTitle>
        <CardDescription>Manage and organize all brand assets in one place</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="all-assets">
          <TabsList className="bg-[#191970]/10 border border-[#191970]/20">
            <TabsTrigger value="all-assets" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
              All Assets
            </TabsTrigger>
            <TabsTrigger
              value="upload-asset"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              Upload Asset
            </TabsTrigger>
            <TabsTrigger
              value="brand-guidelines"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              Brand Guidelines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-assets" className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search assets..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[180px]">
                    <Filter size={16} className="mr-2" />
                    <SelectValue placeholder="Asset Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Logo">Logo</SelectItem>
                    <SelectItem value="Banner">Banner</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Pattern">Pattern</SelectItem>
                    <SelectItem value="Template">Template</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-1">
                  <Plus size={16} />
                  <span>New</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssets.map((asset) => (
                <Card key={asset.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <ImageIcon
                      src={asset.thumbnail || "/placeholder.svg"}
                      alt={asset.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate" title={asset.name}>
                      {asset.name}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{asset.type}</span>
                      <span>{asset.format}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{asset.dimensions}</span>
                      <span>{asset.size}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex space-x-2">
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
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredAssets.length === 0 && (
              <div className="p-8 text-center text-gray-500">No assets found matching your criteria.</div>
            )}
          </TabsContent>

          <TabsContent value="upload-asset" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Upload New Asset</CardTitle>
                <CardDescription>Add new brand assets to the library</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="mx-auto flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="font-medium text-gray-900">Drag and drop files here</h3>
                    <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                    <Input type="file" className="hidden" id="file-upload" />
                    <Button className="mt-4 bg-[#191970]">
                      <Upload className="mr-2 h-4 w-4" />
                      Select Files
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asset-name">Asset Name</Label>
                    <Input id="asset-name" placeholder="Enter asset name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-type">Asset Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="logo">Logo</SelectItem>
                        <SelectItem value="banner">Banner</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="pattern">Pattern</SelectItem>
                        <SelectItem value="template">Template</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asset-tags">Tags (comma separated)</Label>
                  <Input id="asset-tags" placeholder="logo, brand, primary" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]">Upload Asset</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="brand-guidelines" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Brand Guidelines</CardTitle>
                <CardDescription>Access and manage brand guidelines documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-serif">Color Palette</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-md bg-[#191970]"></div>
                          <span className="text-xs mt-1">Midnight Blue</span>
                          <span className="text-xs text-gray-500">#191970</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-md bg-[#F8F6F0]"></div>
                          <span className="text-xs mt-1">Magnolia Cream</span>
                          <span className="text-xs text-gray-500">#F8F6F0</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-md bg-[#C0C0B0]"></div>
                          <span className="text-xs mt-1">Silver Sage</span>
                          <span className="text-xs text-gray-500">#C0C0B0</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-md bg-[#E8C4C0]"></div>
                          <span className="text-xs mt-1">Blush</span>
                          <span className="text-xs text-gray-500">#E8C4C0</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-md bg-[#D4AF37]"></div>
                          <span className="text-xs mt-1">Gold</span>
                          <span className="text-xs text-gray-500">#D4AF37</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Values
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-serif">Typography</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium">Primary Font</h4>
                          <p className="font-serif text-xl">Playfair Display</p>
                          <div className="text-xs text-gray-500 mt-1">Weights: Regular, Semi-Bold, Bold</div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Secondary Font</h4>
                          <p className="text-xl">Montserrat</p>
                          <div className="text-xs text-gray-500 mt-1">Weights: Light, Regular, Medium</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Download Fonts
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg">Brand Guidelines Documents</h3>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New
                  </Button>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      name: "Midnight Magnolia Brand Guidelines",
                      type: "PDF",
                      size: "8.2 MB",
                      date: "2023-08-10",
                    },
                    {
                      name: "Logo Usage Guidelines",
                      type: "PDF",
                      size: "3.5 MB",
                      date: "2023-08-12",
                    },
                    {
                      name: "Social Media Style Guide",
                      type: "PDF",
                      size: "5.1 MB",
                      date: "2023-09-05",
                    },
                    {
                      name: "Brand Voice Guidelines",
                      type: "PDF",
                      size: "2.8 MB",
                      date: "2023-09-15",
                    },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-[#191970]/10 flex items-center justify-center mr-3">
                          <FileText className="h-5 w-5 text-[#191970]" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <div className="flex text-xs text-gray-500 mt-1">
                            <span>{doc.type}</span>
                            <span className="mx-2">•</span>
                            <span>{doc.size}</span>
                            <span className="mx-2">•</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
