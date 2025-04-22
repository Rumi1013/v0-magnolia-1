"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavigationProps {
  className?: string
  vertical?: boolean
}

export function Navigation({ className, vertical = false }: NavigationProps) {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "Heritage", href: "/heritage" },
    { name: "Creative", href: "/creative-forces" },
    { name: "Content", href: "/blog" },
  ]

  return (
    <nav className={cn(vertical ? "flex flex-col space-y-3" : "flex space-x-6", className)}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
