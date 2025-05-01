"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Users,
  FileText,
  LogOut,
  Home,
  Menu,
  X,
  ImageIcon,
  FileCodeIcon as FileContract,
  HeadphonesIcon,
  Workflow,
  Book,
  Database,
  Palette,
  Briefcase,
  MessageSquare,
  Calendar,
  Trello,
} from "lucide-react"
import Link from "next/link"
import { ContentManagement } from "@/components/admin/content-management"
import { BrandAssets } from "@/components/admin/brand-assets"
import { CustomerContracts } from "@/components/admin/customer-contracts"
import { CustomerSupport } from "@/components/admin/customer-support"
import { WorkflowIntegration } from "@/components/admin/workflow-integration"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if the user is authenticated
    const adminToken = localStorage.getItem("adminToken")
    const checkCookie = document.cookie.includes("adminAuthenticated=true")

    if (!adminToken || !checkCookie) {
      router.push("/admin")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    // Clear authentication
    document.cookie = "adminAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.removeItem("adminToken")
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#191970] border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#191970] font-serif">Loading dashboard...</p>
        </div>
      </div>
    )
  }

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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#191970] text-white transform transition-transform duration-500 ease-in-out md:translate-x-0 ${
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
          <div className="text-xs uppercase text-gray-400 font-medium tracking-wider mb-2 font-sans">Main</div>
          <nav className="space-y-1">
            <SidebarItem icon={<Home size={18} />} text="Dashboard" active />
            <SidebarItem icon={<Users size={18} />} text="Users" />
            <SidebarItem icon={<BarChart size={18} />} text="Analytics" />
          </nav>

          <div className="text-xs uppercase text-gray-400 font-medium tracking-wider mt-6 mb-2 font-sans">Content</div>
          <nav className="space-y-1">
            <SidebarItem icon={<FileText size={18} />} text="Content Management" />
            <SidebarItem icon={<ImageIcon size={18} />} text="Brand Assets" />
            <SidebarItem icon={<Palette size={18} />} text="Brand Guidelines" />
            <SidebarItem icon={<Book size={18} />} text="AI Research" />
          </nav>

          <div className="text-xs uppercase text-gray-400 font-medium tracking-wider mt-6 mb-2 font-sans">Business</div>
          <nav className="space-y-1">
            <SidebarItem icon={<FileContract size={18} />} text="Contracts" />
            <SidebarItem icon={<HeadphonesIcon size={18} />} text="Support" />
            <SidebarItem icon={<Briefcase size={18} />} text="Services" />
            <SidebarItem icon={<Database size={18} />} text="Products" />
          </nav>

          <div className="text-xs uppercase text-gray-400 font-medium tracking-wider mt-6 mb-2 font-sans">
            Integrations
          </div>
          <nav className="space-y-1">
            <SidebarItem icon={<Workflow size={18} />} text="Workflows" />
            <SidebarItem icon={<Trello size={18} />} text="Notion" />
            <SidebarItem icon={<Calendar size={18} />} text="Calendar" />
            <SidebarItem icon={<MessageSquare size={18} />} text="Messages" />
          </nav>

          <div className="pt-6 mt-6 border-t border-[#D4AF37]/20">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10 font-sans"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 p-8 transition-all duration-500 ${sidebarOpen ? "md:ml-64" : ""}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-[#191970] mb-6">Admin Dashboard</h1>

          <Tabs defaultValue="overview" className="space-y-4">
            {/* Improved tab styling for better contrast and visibility */}
            <TabsList className="bg-[#191970] border border-[#191970]/20 overflow-x-auto flex w-full md:w-auto p-1 rounded-md">
              <TabsTrigger
                value="overview"
                className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970] font-medium transition-all duration-300 rounded-md px-4 py-2 font-sans"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970] font-medium transition-all duration-300 rounded-md px-4 py-2 font-sans"
              >
                Content
              </TabsTrigger>
              <TabsTrigger
                value="brand"
                className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970] font-medium transition-all duration-300 rounded-md px-4 py-2 font-sans"
              >
                Brand
              </TabsTrigger>
              <TabsTrigger
                value="contracts"
                className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970] font-medium transition-all duration-300 rounded-md px-4 py-2 font-sans"
              >
                Contracts
              </TabsTrigger>
              <TabsTrigger
                value="support"
                className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970] font-medium transition-all duration-300 rounded-md px-4 py-2 font-sans"
              >
                Support
              </TabsTrigger>
              <TabsTrigger
                value="workflows"
                className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970] font-medium transition-all duration-300 rounded-md px-4 py-2 font-sans"
              >
                Workflows
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                  title="Total Users"
                  value="1,234"
                  description="+12% from last month"
                  icon={<Users className="h-5 w-5 text-[#D4AF37]" />}
                />
                <StatsCard
                  title="AI Analyses"
                  value="5,678"
                  description="+23% from last month"
                  icon={<FileText className="h-5 w-5 text-[#D4AF37]" />}
                />
                <StatsCard
                  title="Revenue"
                  value="$12,345"
                  description="+18% from last month"
                  icon={<BarChart className="h-5 w-5 text-[#D4AF37]" />}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Recent Activity</CardTitle>
                    <CardDescription>Latest user interactions with the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { icon: <Users size={18} />, text: "New user registered", time: "5 minutes ago" },
                        { icon: <FileText size={18} />, text: "Research paper uploaded", time: "1 hour ago" },
                        { icon: <FileContract size={18} />, text: "Contract signed", time: "3 hours ago" },
                        { icon: <HeadphonesIcon size={18} />, text: "Support ticket resolved", time: "5 hours ago" },
                        { icon: <Workflow size={18} />, text: "Workflow automation completed", time: "1 day ago" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white border border-gray-200">
                          <div className="w-10 h-10 rounded-full bg-[#191970]/10 flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium">{item.text}</p>
                            <p className="text-sm text-gray-500">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Upcoming Tasks</CardTitle>
                    <CardDescription>Tasks scheduled for the next 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { icon: <Calendar size={18} />, text: "Content review meeting", time: "Tomorrow, 10:00 AM" },
                        { icon: <FileContract size={18} />, text: "Contract renewal", time: "Wednesday, 2:00 PM" },
                        { icon: <Trello size={18} />, text: "Notion board update", time: "Thursday, 11:00 AM" },
                        { icon: <Users size={18} />, text: "Client onboarding", time: "Friday, 3:30 PM" },
                        { icon: <Workflow size={18} />, text: "Workflow audit", time: "Next Monday, 9:00 AM" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white border border-gray-200">
                          <div className="w-10 h-10 rounded-full bg-[#191970]/10 flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium">{item.text}</p>
                            <p className="text-sm text-gray-500">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">System Status</CardTitle>
                  <CardDescription>Current status of integrated systems and services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: "Content Management", status: "Operational", color: "bg-green-500" },
                      { name: "Notion Integration", status: "Operational", color: "bg-green-500" },
                      { name: "AI Research Engine", status: "Operational", color: "bg-green-500" },
                      { name: "Customer Support", status: "Operational", color: "bg-green-500" },
                      { name: "Contract Management", status: "Operational", color: "bg-green-500" },
                      { name: "Workflow Automation", status: "Maintenance", color: "bg-yellow-500" },
                    ].map((service, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <span className="font-medium">{service.name}</span>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${service.color} mr-2`}></div>
                          <span className="text-sm">{service.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <ContentManagement />
            </TabsContent>

            <TabsContent value="brand">
              <BrandAssets />
            </TabsContent>

            <TabsContent value="contracts">
              <CustomerContracts />
            </TabsContent>

            <TabsContent value="support">
              <CustomerSupport />
            </TabsContent>

            <TabsContent value="workflows">
              <WorkflowIntegration />
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
      className={`w-full justify-start font-sans ${
        active ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Button>
  )
}

function StatsCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 font-sans">{title}</CardTitle>
        <div className="w-8 h-8 rounded-full bg-[#191970]/10 flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-green-600 mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}
