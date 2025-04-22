"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  name: string
  href: string
  children?: NavItem[]
}

interface NavigationProps {
  className?: string
  vertical?: boolean
  showDropdowns?: boolean
}

export function Navigation({ className, vertical = false, showDropdowns = false }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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
    <nav className={cn(vertical ? "flex flex-col space-y-3" : "flex space-x-6", className)}>
      {navItems.map((item) => (
        <div key={item.name} className={vertical ? "" : "relative"}>
          {item.children && showDropdowns ? (
            <div>
              <button
                onClick={() => toggleDropdown(item.name)}
                className="flex items-center text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
                <ChevronDown
                  className={cn("ml-1 h-4 w-4 transition-transform", activeDropdown === item.name ? "rotate-180" : "")}
                />
              </button>
              {activeDropdown === item.name && (
                <div
                  className={cn(
                    vertical
                      ? "pl-4 mt-2 space-y-2"
                      : "absolute left-0 mt-2 w-48 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                  )}
                >
                  <div className={vertical ? "" : "py-1"}>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          vertical
                            ? "block py-1 text-sm text-foreground/70 hover:text-primary transition-colors"
                            : "block px-4 py-2 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary",
                        )}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
  )
}
