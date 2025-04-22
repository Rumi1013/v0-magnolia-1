"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"

// Default logo image with a placeholder
const DEFAULT_LOGO = "/abstract-geometric-logo.png"

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "Heritage", href: "/heritage" },
    { name: "Through Our Eyes", href: "/through-our-eyes" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  shop: [
    { name: "Digital Products", href: "/shop/digital" },
    { name: "Resources", href: "/shop/resources" },
    { name: "Physical Products", href: "/shop/physical" },
    { name: "Membership", href: "/membership" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Podcast", href: "/podcast" },
    { name: "Events", href: "/events" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refunds" },
  ],
}

export default function Footer() {
  const [logoLoaded, setLogoLoaded] = useState(true)

  return (
    <footer className="bg-midnight-blue text-magnolia-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              {logoLoaded && (
                <Image
                  src={"/placeholder.svg?height=60&width=60&query=logo"}
                  alt="Midnight Magnolia"
                  width={60}
                  height={60}
                  className="h-15 w-auto"
                  onError={() => setLogoLoaded(false)}
                />
              )}
              <span className="font-playfair text-2xl font-bold">Midnight Magnolia</span>
            </Link>
            <p className="text-magnolia-white/70 max-w-xs">
              Digital-first creative brand transforming art, design, and strategy into sustainable income streams while
              honoring Southern heritage and Black women's resilience.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-magnolia-white/70 hover:text-rich-gold">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-magnolia-white/70 hover:text-rich-gold">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-magnolia-white/70 hover:text-rich-gold">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-magnolia-white/70 hover:text-rich-gold">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-magnolia-white/70 hover:text-rich-gold">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-lg font-playfair font-bold text-rich-gold">Shop</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.shop.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-magnolia-white/70 hover:text-rich-gold">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-lg font-playfair font-bold text-rich-gold">Resources</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-magnolia-white/70 hover:text-rich-gold">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-lg font-playfair font-bold text-rich-gold">Navigation</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-magnolia-white/70 hover:text-rich-gold">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-lg font-playfair font-bold text-rich-gold">Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-magnolia-white/70 hover:text-rich-gold">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-rich-gold/20 pt-8">
          <p className="text-base text-magnolia-white/60 text-center">
            &copy; {new Date().getFullYear()} Midnight Magnolia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
