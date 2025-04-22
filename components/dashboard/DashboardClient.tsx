"use client"

import { useState } from "react"

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>Dashboard content will appear here.</p>
    </div>
  )
}
