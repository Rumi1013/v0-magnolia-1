import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#191970] text-[#F8F6F0] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-[#D4AF37]">Midnight Magnolia</h3>
            <p className="mb-4">
              Southern-inspired digital solutions for businesses seeking elegant, sophisticated online presence.
            </p>
            <div className="flex items-center mb-2">
              <MapPin size={18} className="mr-2 text-[#D4AF37]" />
              <span>10070 Dorchester Rd, #51599, Summerville, SC 29485</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={18} className="mr-2 text-[#D4AF37]" />
              <span>(803) 387-2552</span>
            </div>
            <div className="flex items-center">
              <Mail size={18} className="mr-2 text-[#D4AF37]" />
              <span>contact@midnight-magnolia.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-[#D4AF37]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#D4AF37] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#D4AF37] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#D4AF37] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D4AF37] transition-colors">
                  Art Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-[#D4AF37]">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#web-design" className="hover:text-[#D4AF37] transition-colors">
                  Southern Gothic Web Design
                </Link>
              </li>
              <li>
                <Link href="/services#branding" className="hover:text-[#D4AF37] transition-colors">
                  Elegant Brand Development
                </Link>
              </li>
              <li>
                <Link href="/services#automation" className="hover:text-[#D4AF37] transition-colors">
                  Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/services#ai-research" className="hover:text-[#D4AF37] transition-colors">
                  AI Research Assistance
                </Link>
              </li>
              <li>
                <Link href="/services#content" className="hover:text-[#D4AF37] transition-colors">
                  Content Creation
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-[#D4AF37]">Stay Connected</h3>
            <p className="mb-4">Subscribe to our newsletter for southern-inspired digital insights.</p>
            <form className="mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-md bg-[#F8F6F0]/10 text-[#F8F6F0] border border-[#F8F6F0]/20 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37] text-[#191970] rounded-md hover:bg-[#D4AF37]/80 transition-colors font-medium"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/ruminationsshop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F8F6F0] hover:text-[#D4AF37] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/rumi_nationz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F8F6F0] hover:text-[#D4AF37] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/latishavwaters/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F8F6F0] hover:text-[#D4AF37] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#F8F6F0]/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Midnight Magnolia. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link href="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-[#D4AF37] transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
