"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  MessageSquare,
  User,
  Clock,
  CheckCircle,
  BarChart,
  ArrowUpDown,
  Plus,
  Send,
} from "lucide-react"

export function CustomerSupport() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const tickets = [
    {
      id: "TKT-1001",
      customer: "Emily Johnson",
      subject: "Question about AI Researcher subscription",
      status: "Open",
      priority: "Medium",
      created: "2023-10-20",
      lastUpdated: "2023-10-21",
    },
    {
      id: "TKT-1002",
      customer: "Michael Williams",
      subject: "Issue with downloading research paper",
      status: "In Progress",
      priority: "High",
      created: "2023-10-19",
      lastUpdated: "2023-10-21",
    },
    {
      id: "TKT-1003",
      customer: "Sarah Davis",
      subject: "Billing inquiry for Professional plan",
      status: "Resolved",
      priority: "Low",
      created: "2023-10-15",
      lastUpdated: "2023-10-18",
    },
    {
      id: "TKT-1004",
      customer: "Robert Thompson",
      subject: "Feature request for AI Researcher",
      status: "Open",
      priority: "Medium",
      created: "2023-10-18",
      lastUpdated: "2023-10-18",
    },
    {
      id: "TKT-1005",
      customer: "Jennifer Martinez",
      subject: "Account access issue",
      status: "In Progress",
      priority: "High",
      created: "2023-10-17",
      lastUpdated: "2023-10-20",
    },
  ]

  const filteredTickets = tickets.filter(
    (ticket) =>
      (selectedStatus === "all" || ticket.status === selectedStatus) &&
      (ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Customer Support</CardTitle>
        <CardDescription>Manage customer support tickets and inquiries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="tickets">
          <TabsList className="bg-[#191970]/10 border border-[#191970]/20">
            <TabsTrigger value="tickets" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
              Tickets
            </TabsTrigger>
            <TabsTrigger
              value="conversation"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              Conversation
            </TabsTrigger>
            <TabsTrigger
              value="knowledge-base"
              className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
            >
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search tickets..."
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
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-1">
                  <ArrowUpDown size={16} />
                  <span>Sort</span>
                </Button>
                <Button className="bg-[#191970]">
                  <Plus size={16} className="mr-2" />
                  New Ticket
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-12 bg-[#191970]/10 p-3 font-medium text-sm">
                <div className="col-span-1">ID</div>
                <div className="col-span-2">Customer</div>
                <div className="col-span-4">Subject</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-2">Last Updated</div>
                <div className="col-span-1">Actions</div>
              </div>

              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <div key={ticket.id} className="grid grid-cols-12 p-3 border-t items-center">
                    <div className="col-span-1 font-medium">{ticket.id}</div>
                    <div className="col-span-2">{ticket.customer}</div>
                    <div className="col-span-4 truncate" title={ticket.subject}>
                      {ticket.subject}
                    </div>
                    <div className="col-span-1">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "Open"
                            ? "bg-blue-100 text-blue-800"
                            : ticket.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : ticket.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="col-span-2 text-sm">{ticket.lastUpdated}</div>
                    <div className="col-span-1 flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">No tickets found matching your criteria.</div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {filteredTickets.length} of {tickets.length} tickets
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

          <TabsContent value="conversation" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
              <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
                <div className="p-3 bg-[#191970]/10 font-medium">Recent Conversations</div>
                <div className="overflow-y-auto flex-1">
                  {tickets.map((ticket, i) => (
                    <div
                      key={i}
                      className={`p-3 border-b flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${
                        i === 1 ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#191970]/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-[#191970]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{ticket.customer}</div>
                        <div className="text-sm text-gray-500 truncate">{ticket.subject}</div>
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">{ticket.lastUpdated}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
                <div className="p-3 bg-[#191970]/10 font-medium flex items-center justify-between">
                  <div>
                    <span>Michael Williams</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-500">TKT-1002</span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Resolve
                    </Button>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto flex-1 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#191970]/10 flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#191970]" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="font-medium">Michael Williams</div>
                      <div className="text-sm mt-1">
                        I'm having trouble downloading the research paper I just analyzed. The download button doesn't
                        seem to be working. Can you help?
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Oct 19, 2023 - 10:23 AM</div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="bg-[#191970]/10 rounded-lg p-3 max-w-[80%]">
                      <div className="font-medium">Support Agent</div>
                      <div className="text-sm mt-1">
                        Hello Michael, I'm sorry to hear you're having trouble. Could you please let me know which
                        browser you're using and if you've tried clearing your cache?
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Oct 19, 2023 - 11:05 AM</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#191970]/10 flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#191970]" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="font-medium">Michael Williams</div>
                      <div className="text-sm mt-1">
                        I'm using Chrome, and I just tried clearing my cache but still having the same issue. The
                        download button appears but nothing happens when I click it.
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Oct 19, 2023 - 11:32 AM</div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="bg-[#191970]/10 rounded-lg p-3 max-w-[80%]">
                      <div className="font-medium">Support Agent</div>
                      <div className="text-sm mt-1">
                        Thank you for that information. I've checked your account and it looks like there might be an
                        issue with the file format. I'm going to convert the file to a different format and send you a
                        direct download link. Could you please check your email in about 15 minutes?
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Oct 19, 2023 - 12:15 PM</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#191970]/10 flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#191970]" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="font-medium">Michael Williams</div>
                      <div className="text-sm mt-1">That sounds great, thank you! I'll check my email shortly.</div>
                      <div className="text-xs text-gray-500 mt-2">Oct 19, 2023 - 12:20 PM</div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="bg-[#191970]/10 rounded-lg p-3 max-w-[80%]">
                      <div className="font-medium">Support Agent</div>
                      <div className="text-sm mt-1">
                        I've just sent the email with the download link. Please let me know if you're able to access the
                        file now. We're also working on fixing the download button issue, which should be resolved in
                        our next update.
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Oct 19, 2023 - 12:45 PM</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#191970]/10 flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#191970]" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="font-medium">Michael Williams</div>
                      <div className="text-sm mt-1">
                        I got the email and was able to download the file successfully. Thank you so much for your help!
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Oct 20, 2023 - 9:15 AM</div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="bg-[#191970]/10 rounded-lg p-3 max-w-[80%]">
                      <div className="font-medium">Support Agent</div>
                      <div className="text-sm mt-1">
                        You're welcome! I'm glad we were able to resolve the issue. Is there anything else you need help
                        with today?
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Oct 20, 2023 - 9:30 AM</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#191970]/10 flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#191970]" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="font-medium">Michael Williams</div>
                      <div className="text-sm mt-1">That's all for now. Thanks again for your assistance!</div>
                      <div className="text-xs text-gray-500 mt-2">Oct 21, 2023 - 10:05 AM</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Textarea placeholder="Type your message..." className="min-h-[80px]" />
                    <Button className="bg-[#191970] self-end">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="knowledge-base" className="space-y-4 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg">Knowledge Base Articles</h3>
              <Button className="bg-[#191970]">
                <Plus className="mr-2 h-4 w-4" />
                New Article
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Getting Started with AI Researcher",
                  category: "User Guide",
                  views: 1245,
                  lastUpdated: "2023-09-15",
                },
                {
                  title: "Troubleshooting Download Issues",
                  category: "Troubleshooting",
                  views: 876,
                  lastUpdated: "2023-10-10",
                },
                {
                  title: "Understanding Subscription Plans",
                  category: "Billing",
                  views: 654,
                  lastUpdated: "2023-08-22",
                },
                {
                  title: "How to Export Research to Different Formats",
                  category: "User Guide",
                  views: 432,
                  lastUpdated: "2023-09-30",
                },
                {
                  title: "Account Management and Security",
                  category: "Account",
                  views: 321,
                  lastUpdated: "2023-10-05",
                },
                {
                  title: "Advanced Research Features",
                  category: "User Guide",
                  views: 289,
                  lastUpdated: "2023-10-12",
                },
              ].map((article, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-serif">{article.title}</CardTitle>
                      <span className="px-2 py-1 bg-[#191970]/10 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="text-sm text-gray-500">
                      <span>{article.views} views</span>
                      <span className="mx-2">•</span>
                      <span>Updated: {article.lastUpdated}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-serif">Ticket Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">127</div>
                  <p className="text-sm text-green-600">+12% from last month</p>
                  <div className="h-32 mt-4 flex items-end space-x-2">
                    {[40, 25, 35, 30, 45, 35, 55, 40, 60, 45, 70, 55].map((height, i) => (
                      <div key={i} className="flex-1 bg-[#191970]/60 rounded-t-sm" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Nov</span>
                    <span>Dec</span>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-serif">Resolution Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.2 hours</div>
                  <p className="text-sm text-green-600">-15% from last month</p>
                  <div className="mt-4 space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>High Priority</span>
                        <span className="font-medium">2.1 hours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Medium Priority</span>
                        <span className="font-medium">4.5 hours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Low Priority</span>
                        <span className="font-medium">8.3 hours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-serif">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">94%</div>
                  <p className="text-sm text-green-600">+2% from last month</p>
                  <div className="mt-4 flex justify-center">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 36 36" className="w-32 h-32">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#eee"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#4CAF50"
                          strokeWidth="3"
                          strokeDasharray="94, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold">94%</span>
                        <span className="text-xs text-gray-500">Satisfied</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Support Analytics Overview</CardTitle>
                <CardDescription>Key metrics and trends for customer support performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { label: "Total Tickets", value: "127", change: "+12%", icon: <MessageSquare /> },
                      { label: "Avg. Response Time", value: "1.5 hrs", change: "-8%", icon: <Clock /> },
                      { label: "Resolution Rate", value: "92%", change: "+3%", icon: <CheckCircle /> },
                      { label: "Customer Satisfaction", value: "94%", change: "+2%", icon: <BarChart /> },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                          </div>
                          <div className="bg-[#191970]/10 p-2 rounded-full">{stat.icon}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-medium mb-4">Tickets by Category</h3>
                      <div className="space-y-2">
                        {[
                          { category: "Account Issues", percentage: 35 },
                          { category: "Billing Questions", percentage: 25 },
                          { category: "Technical Support", percentage: 20 },
                          { category: "Feature Requests", percentage: 15 },
                          { category: "Other", percentage: 5 },
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.category}</span>
                              <span>{item.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-[#191970] h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-medium mb-4">Tickets by Priority</h3>
                      <div className="flex items-center justify-center h-48">
                        <div className="relative w-40 h-40">
                          <svg viewBox="0 0 36 36" className="w-40 h-40">
                            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#eee" strokeWidth="3" />
                            <circle
                              cx="18"
                              cy="18"
                              r="15.9155"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="3"
                              strokeDasharray="30, 100"
                              strokeDashoffset="0"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="15.9155"
                              fill="none"
                              stroke="#eab308"
                              strokeWidth="3"
                              strokeDasharray="45, 100"
                              strokeDashoffset="-30"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="15.9155"
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="3"
                              strokeDasharray="25, 100"
                              strokeDashoffset="-75"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-xl font-bold">127</div>
                              <div className="text-xs text-gray-500">Total</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 ml-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm">High (30%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-sm">Medium (45%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm">Low (25%)</span>
                          </div>
                        </div>
                      </div>
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
