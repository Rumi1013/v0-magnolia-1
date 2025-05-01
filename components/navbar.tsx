"use client"

import Link from "next/link"
import { MobileMenu } from "./mobile-menu"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight-blue/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/white-abstract-logo.png"
                alt="Midnight Magnolia Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="font-heading text-xl font-bold text-white">Midnight Magnolia</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="font-ui text-white hover:text-rich-gold transition-colors duration-300">
              Home
            </Link>
            <Link href="/gallery" className="font-ui text-white hover:text-rich-gold transition-colors duration-300">
              Art Gallery
            </Link>
            <Link href="/blog" className="font-ui text-white hover:text-rich-gold transition-colors duration-300">
              Blog
            </Link>
            <Link href="/portfolio" className="font-ui text-white hover:text-rich-gold transition-colors duration-300">
              Portfolio
            </Link>
            <Link href="/videos" className="font-ui text-white hover:text-rich-gold transition-colors duration-300">
              Videos
            </Link>
            <Link href="/contact" className="font-ui text-white hover:text-rich-gold transition-colors duration-300">
              Contact
            </Link>
            <Link href="/portal" className="ml-4">
              <Button
                variant="outline"
                className="font-ui border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue transition-all duration-300"
              >
                Client Portal
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </nav>
  )
}
