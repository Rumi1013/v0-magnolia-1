"use client"

import { useState } from "react"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="py-4 border-b">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Midnight Magnolia</h1>
      </div>
    </header>
  )
}
