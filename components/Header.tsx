"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag, User, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type NavItem = {
  name: string
  href: string
  children?: NavItem[]
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const [logoLoaded, setLogoLoaded] = useState(true)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-magnolia-white/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-magnolia-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-rich-gold/50">
                      <Image
                        src="/abstract-geometric-logo.png"
                        alt="Midnight Magnolia"
                        width={40}
                        height={40}
                        className="h-10 w-auto object-cover"
                        onError={() => setLogoLoaded(false)}
                      />
                    </div>
                    <span className="font-playfair text-xl font-bold">Midnight Magnolia</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex flex-col space-y-6 mt-4">
                  {navItems.map((item) => (
                    <div key={item.name} className="py-2">
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
                </nav>
                <div className="mt-auto pt-8 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Search className="h-5 w-5" />
                      <span className="sr-only">Search</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <ShoppingBag className="h-5 w-5" />
                      <span className="sr-only">Cart</span>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-rich-gold/50">
                <Image
                  src="/abstract-geometric-logo.png"
                  alt="Midnight Magnolia"
                  width={50}
                  height={50}
                  className="h-12 w-auto object-cover"
                  onError={() => setLogoLoaded(false)}
                />
              </div>
              <span className="font-playfair text-2xl font-bold hidden sm:inline-block">Midnight Magnolia</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative" ref={(el) => (dropdownRefs.current[item.name] = el)}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center text-sm font-medium text-foreground/80 hover:text-rich-gold transition-colors"
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
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-rich-gold",
                      pathname === item.href ? "text-rich-gold" : "text-midnight-blue",
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
