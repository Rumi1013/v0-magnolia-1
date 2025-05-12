import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  link?: {
    href: string
    text: string
  }
}

export function FeatureCard({ title, description, icon, link }: FeatureCardProps) {
  return (
    <div className="bg-magnolia-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-sage-green/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>
      <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mb-4 relative z-10">
        {icon}
      </div>
      <h3 className="font-heading text-xl text-midnight-blue mb-2 relative z-10">{title}</h3>
      <p className="font-body text-midnight-teal/90 relative z-10">{description}</p>
      {link && (
        <Link
          href={link.href}
          className="mt-4 inline-flex items-center text-rich-gold font-accent text-sm hover:underline group relative z-10"
        >
          {link.text}
          <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )
}
