"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Edit,
  Eye,
  Download,
  FileSignature,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export function CustomerContracts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const contracts = [
    {
      id: 1,
      client: "Southern Heritage Museum",
      type: "Service Agreement",
      status: "Active",
      startDate: "2023-08-15",
      endDate: "2024-08-14",
      value: "$12,500",
    },
    {
      id: 2,
      client: "Magnolia Gardens Resort",
      type: "Product License",
      status: "Pending",
      startDate: "2023-10-01",
      endDate: "2024-09-30",
      value: "$8,750",
    },
    {
      id: 3,
      client: "Charleston Historical Society",
      type: "Service Agreement",
      status: "Active",
      startDate: "2023-07-01",
      endDate: "2024-06-30",
      value: "$15,000",
    },
    {
      id: 4,
      client: "Savannah Arts Foundation",
      type: "Consulting",
      status: "Expired",
      startDate: "2023-01-15",
      endDate: "2023-07-14",
      value: "$6,500",
    },
    {
      id: 5,
      client: "Gulf Coast University",
      type: "Research Partnership",
      status: "Draft",
      startDate: "2023-11-01",
      endDate: "2024-10-31",
      value: "$22,000",
    },
  ]

  const filteredContracts = contracts.filter(
    (contract) =>
      (selectedStatus === "all" || contract.status === selectedStatus) &&
      contract.client.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Customer Contracts</CardTitle>
        <CardDescription>Manage client contracts and agreements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="all-contracts">
          <TabsList className="bg-[#191970]/10 border border-[#191970]/20">
            <TabsTrigger
              value="all-contracts"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              All Contracts
            </TabsTrigger>
            <TabsTrigger
              value="create-contract"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              Create Contract
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
              Templates
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-contracts" className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search contracts..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <Filter size={16} className="mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
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
                <div className="col-span-3">Client</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Start Date</div>
                <div className="col-span-2">Value</div>
                <div className="col-span-1">Actions</div>
              </div>

              {filteredContracts.length > 0 ? (
                filteredContracts.map((contract) => (
                  <div key={contract.id} className="grid grid-cols-12 p-3 border-t items-center">
                    <div className="col-span-3 font-medium">{contract.client}</div>
                    <div className="col-span-2 text-sm">{contract.type}</div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          contract.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : contract.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : contract.status === "Draft"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {contract.status}
                      </span>
                    </div>
                    <div className="col-span-2 text-sm">{contract.startDate}</div>
                    <div className="col-span-2 text-sm">{contract.value}</div>
                    <div className="col-span-1 flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">No contracts found matching your criteria.</div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {filteredContracts.length} of {contracts.length} contracts
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

          <TabsContent value="create-contract" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Create New Contract</CardTitle>
                <CardDescription>Generate a new client contract or agreement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input id="client-name" placeholder="Enter client name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contract-type">Contract Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contract type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service">Service Agreement</SelectItem>
                        <SelectItem value="product">Product License</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="research">Research Partnership</SelectItem>
                        <SelectItem value="custom">Custom Agreement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contract-value">Contract Value</Label>
                    <Input id="contract-value" placeholder="$0.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contract-template">Contract Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Service Agreement</SelectItem>
                      <SelectItem value="product">Product License Agreement</SelectItem>
                      <SelectItem value="consulting">Consulting Agreement</SelectItem>
                      <SelectItem value="research">Research Partnership Agreement</SelectItem>
                      <SelectItem value="blank">Blank Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contract-notes">Notes</Label>
                  <Textarea id="contract-notes" placeholder="Add any special terms or notes..." />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save as Draft</Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]">
                    <FileSignature className="mr-2 h-4 w-4" />
                    Generate Contract
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg">Contract Templates</h3>
              <Button className="bg-[#191970]">
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Standard Service Agreement",
                  description: "For general service offerings with standard terms",
                  lastUpdated: "2023-09-15",
                },
                {
                  name: "Product License Agreement",
                  description: "For digital and physical product licensing",
                  lastUpdated: "2023-08-22",
                },
                {
                  name: "Consulting Agreement",
                  description: "For advisory and consulting services",
                  lastUpdated: "2023-07-30",
                },
                {
                  name: "Research Partnership Agreement",
                  description: "For collaborative research projects",
                  lastUpdated: "2023-10-05",
                },
                {
                  name: "Non-Disclosure Agreement",
                  description: "For protecting confidential information",
                  lastUpdated: "2023-09-01",
                },
              ].map((template, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-serif">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="text-sm text-gray-500">Last updated: {template.lastUpdated}</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Use
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Contract Calendar</CardTitle>
                <CardDescription>Track important contract dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">October 2023</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-7 bg-[#191970]/10 text-center py-2 font-medium">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                        <div key={i}>{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 auto-rows-fr border-t">
                      {Array.from({ length: 35 }).map((_, i) => {
                        const day = i - 6 // Offset to start month on a Sunday
                        return (
                          <div
                            key={i}
                            className={`border p-2 min-h-[80px] ${
                              day > 0 && day <= 31 ? "bg-white" : "bg-gray-50 text-gray-400"
                            }`}
                          >
                            {day > 0 && day <= 31 && (
                              <>
                                <div className="font-medium">{day}</div>
                                {day === 15 && (
                                  <div className="mt-1 p-1 text-xs bg-green-100 text-green-800 rounded">
                                    <div className="font-medium">Southern Heritage Museum</div>
                                    <div>Contract Renewal</div>
                                  </div>
                                )}
                                {day === 22 && (
                                  <div className="mt-1 p-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                                    <div className="font-medium">Magnolia Gardens Resort</div>
                                    <div>Contract Review</div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Upcoming Contract Events</h3>
                    <div className="space-y-2">
                      {[
                        {
                          client: "Southern Heritage Museum",
                          event: "Contract Renewal",
                          date: "October 15, 2023",
                          icon: <Clock />,
                          color: "text-green-600",
                        },
                        {
                          client: "Magnolia Gardens Resort",
                          event: "Contract Review",
                          date: "October 22, 2023",
                          icon: <AlertCircle />,
                          color: "text-yellow-600",
                        },
                        {
                          client: "Gulf Coast University",
                          event: "Contract Start",
                          date: "November 1, 2023",
                          icon: <CheckCircle />,
                          color: "text-blue-600",
                        },
                        {
                          client: "Savannah Arts Foundation",
                          event: "Contract Expiration",
                          date: "November 14, 2023",
                          icon: <AlertCircle />,
                          color: "text-red-600",
                        },
                      ].map((event, i) => (
                        <div key={i} className="flex items-center p-3 bg-white rounded-lg border">
                          <div className={`mr-3 ${event.color}`}>{event.icon}</div>
                          <div>
                            <p className="font-medium">{event.client}</p>
                            <div className="flex text-sm text-gray-500">
                              <span>{event.event}</span>
                              <span className="mx-2">•</span>
                              <span>{event.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
