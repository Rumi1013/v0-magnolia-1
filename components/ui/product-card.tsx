import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ProductCardProps {
  title: string
  description: string
  image: string
  price: string
  badge?: {
    text: string
    color?: string
  }
  link: {
    href: string
    text: string
  }
}

export function ProductCard({ title, description, image, price, badge, link }: ProductCardProps) {
  return (
    <div className="bg-midnight-blue/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-magnolia-white/10 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
        {badge && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-rich-gold/90 text-midnight-blue text-xs font-accent px-2 py-1 rounded">
              {badge.text}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl text-rich-gold mb-2">{title}</h3>
        <p className="font-body text-magnolia-white/90 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <Link
            href={link.href}
            className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
          >
            {link.text} <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="font-accent text-magnolia-white">{price}</span>
        </div>
      </div>
    </div>
  )
}
