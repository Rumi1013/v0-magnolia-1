"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Our Story", path: "/our-story" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Shop", path: "/shop" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-midnight-blue/95 backdrop-blur-sm py-3 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-rich-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]">
            <Image src="/logo/midnight-magnolia-warm.png" alt="Midnight Magnolia" fill className="object-cover" />
          </div>
          <span className="font-heading text-xl text-magnolia-white">Midnight Magnolia</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="font-accent text-sm text-magnolia-white hover:text-rich-gold transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rich-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-4 py-2 bg-rich-gold text-midnight-blue font-bold rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors shadow-md hover:shadow-lg">
            Join Patron Portal
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-magnolia-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-magnolia-white"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-midnight-blue/95 border-t border-midnight-blue/50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="font-accent text-magnolia-white hover:text-rich-gold transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="mt-2 px-4 py-3 bg-rich-gold text-midnight-blue font-bold rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors text-left shadow-md">
                Join Patron Portal
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
