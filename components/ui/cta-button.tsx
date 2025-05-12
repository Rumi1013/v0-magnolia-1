import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

interface CTAButtonProps {
  href: string
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  fullWidth?: boolean
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 rounded-md font-accent transition-all group shadow-lg hover:shadow-xl transform hover:-translate-y-1"

  const variantStyles = {
    primary: "bg-rich-gold text-midnight-blue font-bold hover:bg-rich-gold/90",
    secondary: "bg-midnight-teal text-magnolia-white hover:bg-midnight-teal/90",
    outline: "border-2 border-midnight-blue/80 bg-midnight-blue/5 text-midnight-blue/90 hover:bg-midnight-blue/10",
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-base",
  }

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full justify-center" : ""} ${className}`}
    >
      {children}
      <ArrowRight
        className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} transform group-hover:translate-x-1 transition-transform`}
      />
    </Link>
  )
}
