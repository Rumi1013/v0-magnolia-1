"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"
import { ShoppingCart } from "@/components/ui/shopping-cart"
import { UserAccountModal } from "@/components/ui/user-account-modal"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleUserModal = () => setIsUserModalOpen(!isUserModalOpen)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-midnight-blue/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/midnight-magnolia-logo-9.jpeg"
              alt="Midnight Magnolia"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-heading text-xl text-magnolia-white">Midnight Magnolia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-body text-magnolia-white/90 hover:text-rich-gold transition-colors">
              Home
            </Link>
            <Link href="/our-story" className="font-body text-magnolia-white/90 hover:text-rich-gold transition-colors">
              Our Story
            </Link>
            <Link href="/shop" className="font-body text-magnolia-white/90 hover:text-rich-gold transition-colors">
              Shop
            </Link>
            <Link href="/blog" className="font-body text-magnolia-white/90 hover:text-rich-gold transition-colors">
              Journal
            </Link>
            <Link href="/community" className="font-body text-magnolia-white/90 hover:text-rich-gold transition-colors">
              Community
            </Link>
            <Link
              href="/patron-portal"
              className="font-body text-magnolia-white/90 hover:text-rich-gold transition-colors"
            >
              Patron Portal
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <ShoppingCart />
            <button
              onClick={toggleUserModal}
              className="p-2 rounded-full bg-rich-gold/10 hover:bg-rich-gold/20 transition-colors text-rich-gold"
              aria-label="User Account"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-rich-gold/10 hover:bg-rich-gold/20 transition-colors text-rich-gold md:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-midnight-blue/95 z-50 flex flex-col md:hidden">
          <div className="container mx-auto px-4 py-5">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2" onClick={toggleMenu}>
                <Image
                  src="/logo/midnight-magnolia-logo-9.jpeg"
                  alt="Midnight Magnolia"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-heading text-xl text-magnolia-white">Midnight Magnolia</span>
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full bg-rich-gold/10 hover:bg-rich-gold/20 transition-colors text-rich-gold"
                aria-label="Close Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <nav className="flex-1 flex flex-col justify-center items-center gap-8 text-center">
            <Link
              href="/"
              className="font-heading text-2xl text-magnolia-white hover:text-rich-gold transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/our-story"
              className="font-heading text-2xl text-magnolia-white hover:text-rich-gold transition-colors"
              onClick={toggleMenu}
            >
              Our Story
            </Link>
            <Link
              href="/shop"
              className="font-heading text-2xl text-magnolia-white hover:text-rich-gold transition-colors"
              onClick={toggleMenu}
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className="font-heading text-2xl text-magnolia-white hover:text-rich-gold transition-colors"
              onClick={toggleMenu}
            >
              Journal
            </Link>
            <Link
              href="/community"
              className="font-heading text-2xl text-magnolia-white hover:text-rich-gold transition-colors"
              onClick={toggleMenu}
            >
              Community
            </Link>
            <Link
              href="/patron-portal"
              className="font-heading text-2xl text-magnolia-white hover:text-rich-gold transition-colors"
              onClick={toggleMenu}
            >
              Patron Portal
            </Link>
          </nav>
        </div>
      )}

      {/* User Account Modal */}
      {isUserModalOpen && <UserAccountModal onClose={toggleUserModal} />}
    </header>
  )
}
