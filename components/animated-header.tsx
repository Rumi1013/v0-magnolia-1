"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/our-story" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "#" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-midnight-blue/95 backdrop-blur-sm py-3 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-rich-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]">
              <Image
                src="/logo/midnight-magnolia-warm.png"
                alt="Midnight Magnolia"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <span
              className={`font-heading text-xl ${
                scrolled ? "text-magnolia-white" : "text-midnight-blue"
              } transition-colors duration-300 drop-shadow-md`}
            >
              Midnight Magnolia
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link
                href={item.path}
                className={`font-accent text-sm ${
                  scrolled ? "text-magnolia-white" : "text-midnight-teal"
                } hover:text-rich-gold transition-colors relative group drop-shadow-sm`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rich-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <button
            className={`p-2 rounded-full ${
              scrolled ? "hover:bg-magnolia-white/10" : "hover:bg-sage-green/10"
            } transition-colors`}
          >
            <ShoppingBag className={`h-5 w-5 ${scrolled ? "text-magnolia-white" : "text-midnight-teal"}`} />
          </button>
          <button
            className={`hidden md:block px-4 py-2 bg-rich-gold text-magnolia-white rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors shadow-md hover:shadow-lg`}
          >
            Join Patron Portal
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full hover:bg-magnolia-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${scrolled ? "text-magnolia-white" : "text-midnight-teal"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? "text-magnolia-white" : "text-midnight-teal"}`} />
            )}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-midnight-blue/95 backdrop-blur-sm"
          >
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
                <button className="mt-2 px-4 py-3 bg-rich-gold text-magnolia-white rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors text-left shadow-md">
                  Join Patron Portal
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
