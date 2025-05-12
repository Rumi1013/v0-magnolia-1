import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Our Story", href: "/our-story" },
        { name: "Shop", href: "/shop" },
        { name: "Blog", href: "/blog" },
        { name: "Art Gallery", href: "/gallery" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "Tarot Deck", href: "#" },
        { name: "Digital Journals", href: "#" },
        { name: "Strategy Guides", href: "#" },
        { name: "Notion Templates", href: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Instagram", href: "#" },
        { name: "Pinterest", href: "#" },
        { name: "Newsletter", href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-midnight-blue text-magnolia-white/80 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo/midnight-magnolia-warm.png"
                alt="Midnight Magnolia"
                width={40}
                height={40}
                className="rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]"
              />
              <span className="font-heading text-xl text-magnolia-white">Midnight Magnolia</span>
            </div>
            <p className="font-body text-sm">
              A Southern Digital Sanctuary weaving together creativity, self-healing, automation, and storytelling.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-heading text-lg mb-4 text-rich-gold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="font-body text-sm hover:text-rich-gold transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-magnolia-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-body text-xs">
            &copy; {currentYear} Midnight Magnolia | A Division of Rumi-Nations LLC | All Rights Reserved
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="font-body text-xs hover:text-rich-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="font-body text-xs hover:text-rich-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
