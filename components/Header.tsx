"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, MoonIcon, SunIcon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  name: string
  href: string
  children?: NavItem[]
}

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)
      ) {
        setActiveDropdown(null)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    {
      name: "Shop",
      href: "/shop",
      children: [
        { name: "Products", href: "/shop" },
        { name: "Memberships", href: "/shop#memberships" },
        { name: "Digital Downloads", href: "/shop#digital" },
      ],
    },
    {
      name: "Services",
      href: "/services",
      children: [
        { name: "Creative Services", href: "/services" },
        { name: "Consulting", href: "/services#consulting" },
        { name: "Workshops", href: "/services#workshops" },
      ],
    },
    {
      name: "Heritage",
      href: "/heritage",
      children: [
        { name: "Southern Black Heritage", href: "/heritage" },
        { name: "Through Our Eyes", href: "/through-our-eyes" },
        { name: "Historical Timeline", href: "/heritage#timeline" },
      ],
    },
    {
      name: "Creative",
      href: "/creative-forces",
      children: [
        { name: "Creative Forces", href: "/creative-forces" },
        { name: "Southern Gothic Gallery", href: "/southern-gothic-gallery" },
        { name: "AI Tools", href: "/ai-tools" },
      ],
    },
    {
      name: "Content",
      href: "/blog",
      children: [
        { name: "Blog", href: "/blog" },
        { name: "Podcast", href: "/podcast" },
        { name: "Music", href: "/music" },
      ],
    },
  ]

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Midnight Magnolia</span>
            <img className="h-8 w-auto" src="/midnight-magnolia-bloom.png" alt="Midnight Magnolia Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative" ref={(el) => (dropdownRefs.current[item.name] = el)}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                    aria-expanded={activeDropdown === item.name}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform",
                        activeDropdown === item.name ? "rotate-180" : "",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-background/95 backdrop-blur-md shadow-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-3 space-y-1 divide-y divide-border/20">
            {navItems.map((item) => (
              <div key={item.name} className="py-3">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center w-full text-left py-2 text-foreground/80 hover:text-primary transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown
                        className={cn(
                          "ml-auto h-4 w-4 transition-transform",
                          activeDropdown === item.name ? "rotate-180" : "",
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 mt-1 space-y-1"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
