"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleReducedMotionChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleReducedMotionChange)

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotionChange)
    }
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/gallery", label: "Gallery" },
    { href: "/videos", label: "Videos" },
    { href: "/contact", label: "Contact" },
  ]

  // Adjust animation duration based on reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.001 : 0.4 // Slowed down from 0.2

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-white z-50 relative"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: animationDuration }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: animationDuration }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: animationDuration }}
            className="fixed inset-0 top-16 z-40 bg-[#0A192F] border-t border-white/10 overflow-y-auto pb-20"
          >
            <div className="flex flex-col p-6 space-y-2">
              {menuItems.map((item) => (
                <NavItem key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </NavItem>
              ))}

              <div className="h-px bg-white/10 my-4"></div>

              <div className="space-y-4">
                <Link href="/portal" onClick={closeMenu}>
                  <Button className="w-full bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-sans">
                    Client Portal
                  </Button>
                </Link>

                <Link href="/admin" onClick={closeMenu}>
                  <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970] font-medium font-sans">
                    Admin Access
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavItem({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href))

  return (
    <Link
      href={href}
      className={`flex items-center justify-between text-lg font-serif py-3 border-b border-white/10 transition-colors duration-300 ${
        isActive ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
      }`}
      onClick={onClick}
    >
      <span>{children}</span>
      <ChevronRight className="h-5 w-5 opacity-70" />
    </Link>
  )
}
