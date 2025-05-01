"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  FileText,
  MessageSquare,
  Calendar,
  Clock,
  CreditCard,
  Download,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would check for authentication
    const isClient = localStorage.getItem("clientToken")
    if (!isClient) {
      router.push("/portal")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-[#191970] text-white border-[#D4AF37]"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#191970] text-white transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-[#D4AF37]/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[#191970] font-serif font-bold text-sm">M</span>
            </div>
            <span className="font-serif text-lg">Midnight Magnolia</span>
          </Link>
        </div>

        <div className="p-4">
          <div className="text-xs uppercase text-gray-400 font-medium tracking-wider mb-2">Main</div>
          <nav className="space-y-1">
            <SidebarItem icon={<Home size={18} />} text="Dashboard" active />
            <SidebarItem icon={<FileText size={18} />} text="Documents" />
            <SidebarItem icon={<MessageSquare size={18} />} text="Messages" />
            <SidebarItem icon={<Calendar size={18} />} text="Calendar" />
          </nav>

          <div className="text-xs uppercase text-gray-400 font-medium tracking-wider mt-6 mb-2">Account</div>
          <nav className="space-y-1">
            <SidebarItem icon={<User size={18} />} text="Profile" />
            <SidebarItem icon={<CreditCard size={18} />} text="Billing" />
            <SidebarItem icon={<Clock size={18} />} text="History" />
            <SidebarItem icon={<Settings size={18} />} text="Settings" />
          </nav>

          <div className="pt-6 mt-6 border-t border-[#D4AF37]/20">
            <Link
              href="/portal"
              onClick={() => {
                document.cookie = "clientAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                localStorage.removeItem("clientToken")
              }}
            >
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 p-8 transition-all duration-200 ${sidebarOpen ? "md:ml-64" : ""}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-serif font-bold text-[#191970]">Client Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Sarah Johnson</span>
              </div>
              <Avatar>
                <AvatarImage src="/diverse-person-portrait.png" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-[#191970]/10 border border-[#191970]/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">
                Messages
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-[#191970] data-[state=active]:text-white"
              >
                Appointments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Active Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-green-600 mt-1">2 in progress, 1 pending review</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-amber-600 mt-1">Next: Strategy Session (Tomorrow)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Unread Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-blue-600 mt-1">3 new since yesterday</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Recent Activity</CardTitle>
                  <CardDescription>Your latest interactions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <FileText size={18} />,
                        title: "Brand Strategy Document Updated",
                        description: "New version available for review",
                        time: "2 hours ago",
                      },
                      {
                        icon: <MessageSquare size={18} />,
                        title: "New Message from Latisha",
                        description: "Re: Your upcoming content calendar",
                        time: "Yesterday",
                      },
                      {
                        icon: <Calendar size={18} />,
                        title: "Strategy Session Scheduled",
                        description: "Tomorrow at 2:00 PM",
                        time: "Yesterday",
                      },
                      {
                        icon: <CreditCard size={18} />,
                        title: "Invoice #1234 Paid",
                        description: "Thank you for your payment",
                        time: "3 days ago",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white border border-gray-200">
                        <div className="w-10 h-10 rounded-full bg-[#191970]/10 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <div className="text-xs text-gray-500">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Current Projects</CardTitle>
                    <CardDescription>Status of your ongoing projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Brand Identity Refresh",
                          status: "In Progress",
                          progress: 75,
                          dueDate: "Nov 30, 2023",
                        },
                        {
                          title: "Content Strategy",
                          status: "In Progress",
                          progress: 40,
                          dueDate: "Dec 15, 2023",
                        },
                        {
                          title: "Website Redesign",
                          status: "Pending Review",
                          progress: 90,
                          dueDate: "Nov 25, 2023",
                        },
                      ].map((project, i) => (
                        <div key={i} className="p-3 rounded-lg bg-white border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{project.title}</h3>
                            <Badge
                              variant={project.status === "In Progress" ? "outline" : "default"}
                              className={project.status === "Pending Review" ? "bg-amber-500" : ""}
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className="bg-[#191970] h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{project.progress}% Complete</span>
                            <span>Due: {project.dueDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Recent Documents</CardTitle>
                    <CardDescription>Documents shared with you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          icon: <FileText size={18} />,
                          title: "Brand Strategy.pdf",
                          size: "2.4 MB",
                          date: "Nov 18, 2023",
                        },
                        {
                          icon: <FileText size={18} />,
                          title: "Content Calendar.xlsx",
                          size: "1.8 MB",
                          date: "Nov 15, 2023",
                        },
                        {
                          icon: <FileText size={18} />,
                          title: "Project Proposal.docx",
                          size: "3.2 MB",
                          date: "Nov 10, 2023",
                        },
                        {
                          icon: <FileText size={18} />,
                          title: "Invoice #1234.pdf",
                          size: "1.1 MB",
                          date: "Nov 5, 2023",
                        },
                      ].map((doc, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-[#191970]/10 flex items-center justify-center">
                              {doc.icon}
                            </div>
                            <div>
                              <p className="font-medium">{doc.title}</p>
                              <p className="text-xs text-gray-500">
                                {doc.size} • {doc.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Your Documents</CardTitle>
                  <CardDescription>Access all documents shared with you</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">Documents content would be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Messages</CardTitle>
                  <CardDescription>Your conversations with Midnight Magnolia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">Messages content would be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Appointments</CardTitle>
                  <CardDescription>Your scheduled meetings and sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">Appointments content would be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        active ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Button>
  )
}
