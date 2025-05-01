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
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Edit,
  Trash,
  Eye,
  Workflow,
  Trello,
  Clock,
  CheckCircle,
  LinkIcon,
  ArrowRight,
  Play,
  Pause,
  RefreshCw,
} from "lucide-react"

export function WorkflowIntegration() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const workflows = [
    {
      id: 1,
      name: "Content Approval Workflow",
      description: "Automated content review and approval process",
      status: "Active",
      lastRun: "2023-10-21",
      integration: "Notion",
      steps: 5,
    },
    {
      id: 2,
      name: "Contract Generation",
      description: "Automated contract creation and notification",
      status: "Active",
      lastRun: "2023-10-20",
      integration: "Notion",
      steps: 4,
    },
    {
      id: 3,
      name: "Customer Onboarding",
      description: "New customer welcome and setup process",
      status: "Paused",
      lastRun: "2023-10-15",
      integration: "Notion",
      steps: 6,
    },
    {
      id: 4,
      name: "Support Ticket Escalation",
      description: "Automated ticket routing and escalation",
      status: "Draft",
      lastRun: "Never",
      integration: "Notion",
      steps: 3,
    },
    {
      id: 5,
      name: "Research Paper Analysis",
      description: "AI processing of uploaded research papers",
      status: "Active",
      lastRun: "2023-10-19",
      integration: "Notion",
      steps: 7,
    },
  ]

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      (selectedStatus === "all" || workflow.status === selectedStatus) &&
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Workflow Integration</CardTitle>
        <CardDescription>Manage automated workflows and Notion integration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="workflows">
          <TabsList className="bg-[#191970]/10 border border-[#191970]/20">
            <TabsTrigger value="workflows" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
              Workflows
            </TabsTrigger>
            <TabsTrigger value="notion" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
              Notion Integration
            </TabsTrigger>
            <TabsTrigger
              value="document-tracking"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              Document Tracking
            </TabsTrigger>
            <TabsTrigger value="automation" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
              Automation Builder
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search workflows..."
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
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-1">
                  <ArrowUpDown size={16} />
                  <span>Sort</span>
                </Button>
                <Button className="bg-[#191970]">
                  <Plus size={16} className="mr-2" />
                  New Workflow
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredWorkflows.map((workflow) => (
                <Card key={workflow.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg font-serif">{workflow.name}</CardTitle>
                        <CardDescription>{workflow.description}</CardDescription>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          workflow.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : workflow.status === "Paused"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {workflow.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <Trello className="h-4 w-4 mr-1 text-[#191970]" />
                        <span>Integration: {workflow.integration}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-[#191970]" />
                        <span>Last Run: {workflow.lastRun}</span>
                      </div>
                      <div className="flex items-center">
                        <Workflow className="h-4 w-4 mr-1 text-[#191970]" />
                        <span>{workflow.steps} Steps</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                    <div>
                      {workflow.status === "Active" ? (
                        <Button variant="outline" size="sm">
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </Button>
                      ) : workflow.status === "Paused" ? (
                        <Button variant="outline" size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Resume
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Activate
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}

              {filteredWorkflows.length === 0 && (
                <div className="p-8 text-center text-gray-500">No workflows found matching your criteria.</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notion" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Notion Integration</CardTitle>
                <CardDescription>Connect and manage your Notion workspace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800">Connected to Notion</p>
                    <p className="text-sm text-green-700">
                      Your Midnight Magnolia workspace is successfully connected to Notion.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Connected Notion Pages</h3>
                  <div className="space-y-2">
                    {[
                      {
                        name: "🌙 Midnight Magnolia Command Center",
                        type: "Database",
                        lastSync: "5 minutes ago",
                      },
                      {
                        name: "🪷 Root & Rituals",
                        type: "Page",
                        lastSync: "10 minutes ago",
                      },
                      {
                        name: "🎯 Today's Intentions",
                        type: "Database",
                        lastSync: "5 minutes ago",
                      },
                      {
                        name: "🧘🏾‍♀️ Soft Structure (Task Links)",
                        type: "Page",
                        lastSync: "15 minutes ago",
                      },
                      {
                        name: "🔗 Open Work Portals",
                        type: "Page",
                        lastSync: "20 minutes ago",
                      },
                    ].map((page, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded bg-[#191970]/10 flex items-center justify-center mr-3">
                            <Trello className="h-5 w-5 text-[#191970]" />
                          </div>
                          <div>
                            <p className="font-medium">{page.name}</p>
                            <div className="flex text-xs text-gray-500 mt-1">
                              <span>{page.type}</span>
                              <span className="mx-2">•</span>
                              <span>Last synced: {page.lastSync}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <LinkIcon className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Integration Settings</h3>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Settings
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sync Frequency</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Every 1 minute</SelectItem>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Webhook Notifications</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All changes</SelectItem>
                        <SelectItem value="major">Major changes only</SelectItem>
                        <SelectItem value="none">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sync Now
                  </Button>
                  <Button className="bg-[#191970]">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Notion Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="document-tracking" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Document Tracking</CardTitle>
                <CardDescription>Track and manage documents across your workflow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input placeholder="Search documents..." className="pl-10" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <Filter size={16} className="mr-2" />
                        <SelectValue placeholder="Document Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="contract">Contracts</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
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
                    <div className="col-span-4">Document</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Last Updated</div>
                    <div className="col-span-2">Actions</div>
                  </div>

                  {[
                    {
                      name: "Southern Heritage Museum Contract",
                      type: "Contract",
                      status: "In Review",
                      lastUpdated: "2023-10-21",
                    },
                    {
                      name: "AI Researcher Product Description",
                      type: "Content",
                      status: "Published",
                      lastUpdated: "2023-10-20",
                    },
                    {
                      name: "Black Southern Experience Blog Post",
                      type: "Content",
                      status: "Draft",
                      lastUpdated: "2023-10-19",
                    },
                    {
                      name: "Customer Support Knowledge Base",
                      type: "Support",
                      status: "Published",
                      lastUpdated: "2023-10-18",
                    },
                    {
                      name: "Research Paper Analysis Template",
                      type: "Research",
                      status: "In Review",
                      lastUpdated: "2023-10-17",
                    },
                  ].map((doc, i) => (
                    <div key={i} className="grid grid-cols-12 p-3 border-t items-center">
                      <div className="col-span-4 font-medium">{doc.name}</div>
                      <div className="col-span-2">{doc.type}</div>
                      <div className="col-span-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            doc.status === "Published"
                              ? "bg-green-100 text-green-800"
                              : doc.status === "Draft"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </div>
                      <div className="col-span-2">{doc.lastUpdated}</div>
                      <div className="col-span-2 flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trello size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Document Workflow Status</h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Southern Heritage Museum Contract",
                        steps: [
                          { name: "Draft", completed: true },
                          { name: "Legal Review", completed: true },
                          { name: "Client Review", completed: false, current: true },
                          { name: "Finalization", completed: false },
                          { name: "Signatures", completed: false },
                        ],
                      },
                      {
                        name: "AI Researcher Product Description",
                        steps: [
                          { name: "Draft", completed: true },
                          { name: "Review", completed: true },
                          { name: "Approval", completed: true },
                          { name: "Publication", completed: true },
                        ],
                      },
                    ].map((doc, i) => (
                      <Card key={i}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-serif">{doc.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center">
                            {doc.steps.map((step, j) => (
                              <div key={j} className="flex items-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    step.completed
                                      ? "bg-green-100 text-green-800"
                                      : step.current
                                        ? "bg-blue-100 text-blue-800 ring-2 ring-blue-300"
                                        : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  {step.completed ? <CheckCircle className="h-5 w-5" /> : <span>{j + 1}</span>}
                                </div>
                                {j < doc.steps.length - 1 && (
                                  <div className={`h-1 w-12 ${step.completed ? "bg-green-500" : "bg-gray-200"}`}></div>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-sm">{doc.steps.find((s) => s.current)?.name || "Completed"}</div>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Automation Builder</CardTitle>
                <CardDescription>Create and customize automated workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">New Workflow</h3>
                    <div className="flex gap-2">
                      <Button variant="outline">Save as Draft</Button>
                      <Button className="bg-[#191970]">Publish Workflow</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="workflow-name">Workflow Name</Label>
                      <Input id="workflow-name" placeholder="Enter workflow name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workflow-description">Description</Label>
                      <Textarea id="workflow-description" placeholder="Describe the purpose of this workflow" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="trigger-type">Trigger Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select trigger" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="notion">Notion Page Updated</SelectItem>
                            <SelectItem value="form">Form Submission</SelectItem>
                            <SelectItem value="contract">Contract Signed</SelectItem>
                            <SelectItem value="support">Support Ticket Created</SelectItem>
                            <SelectItem value="schedule">Schedule</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workflow-status">Status</Label>
                        <Select defaultValue="draft">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="paused">Paused</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Workflow Steps</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Step
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          number: 1,
                          name: "Trigger: Notion Page Updated",
                          description: "When a document is updated in Notion",
                          configured: true,
                        },
                        {
                          number: 2,
                          name: "Condition: Check Document Type",
                          description: "Determine the type of document that was updated",
                          configured: true,
                        },
                        {
                          number: 3,
                          name: "Action: Send Notification",
                          description: "Notify relevant team members about the update",
                          configured: true,
                        },
                        {
                          number: 4,
                          name: "Action: Update Status",
                          description: "Update the document status in the tracking system",
                          configured: false,
                        },
                      ].map((step, i) => (
                        <div key={i} className="border rounded-lg overflow-hidden">
                          <div className="bg-[#191970]/10 p-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                  step.configured ? "bg-[#191970] text-white" : "bg-gray-200 text-gray-500"
                                }`}
                              >
                                {step.number}
                              </div>
                              <div>
                                <h4 className="font-medium">{step.name}</h4>
                                <p className="text-sm text-gray-500">{step.description}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {i < 3 && (
                            <div className="flex justify-center py-2">
                              <ArrowRight className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Testing & Monitoring</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-serif">Test Workflow</CardTitle>
                          <CardDescription>Run a test execution of this workflow</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500 mb-4">
                            Testing allows you to verify your workflow configuration before activating it.
                          </p>
                          <Button className="bg-[#191970]">
                            <Play className="mr-2 h-4 w-4" />
                            Run Test
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-serif">Execution History</CardTitle>
                          <CardDescription>View past workflow executions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500 mb-4">
                            No execution history available for this workflow yet.
                          </p>
                          <Button variant="outline">View Logs</Button>
                        </CardContent>
                      </Card>
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
