import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-midnight-blue text-magnolia-white/80 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo/midnight-magnolia-logo-9.jpeg"
                alt="Midnight Magnolia"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-heading text-xl text-magnolia-white">Midnight Magnolia</span>
            </div>
            <p className="font-body text-sm">
              A Southern Digital Sanctuary weaving together creativity, self-healing, automation, and storytelling.
            </p>
            <p className="font-body text-xs mt-4">
              Midnight Magnolia, LLC
              <br />
              10070 Dorchester Rd, Ste 51599
              <br />
              Summerville, SC 29485
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/shop" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/community" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/patron-portal" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Patron Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Digital Journals
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Tarot Deck
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Notion Templates
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Business Tools
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Digital Art
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com/rumi_nationz"
                  className="font-body text-sm hover:text-rich-gold transition-colors"
                >
                  Instagram: @rumi_nationz
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                  Facebook: Ruminations Shop
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body text-sm hover:text-rich-gold transition-colors">
                  LinkedIn: Latisha Waters
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-magnolia-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-body text-xs">
            &copy; {new Date().getFullYear()} Midnight Magnolia | A Division of Rumi-Nations LLC | All Rights Reserved
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
