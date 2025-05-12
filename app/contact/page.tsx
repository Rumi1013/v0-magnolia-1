import { Mail, MapPin, Send, Clock, Instagram, Facebook, Linkedin } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Contact() {
  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">Connect With Us</h1>
          <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mx-auto">
            Reach out to discuss custom projects, collaborations, or any questions about our offerings.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-midnight-teal/30 h-full">
                <h2 className="font-heading text-2xl text-rich-gold mb-6">Get in Touch</h2>
                <p className="font-body text-magnolia-white/90 mb-8">
                  We'd love to hear from you. Whether you have questions about our products, need custom work, or want
                  to explore collaboration opportunities, we're here to help.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-rich-gold/20 rounded-full text-rich-gold mt-1">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-rich-gold mb-1">Email Us</h3>
                      <p className="text-magnolia-white/90 mb-1">For general inquiries:</p>
                      <a href="mailto:hello@midnightmagnolia.com" className="text-rich-gold hover:underline">
                        hello@midnightmagnolia.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-rich-gold/20 rounded-full text-rich-gold mt-1">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-rich-gold mb-1">Our Location</h3>
                      <p className="text-magnolia-white/90">
                        Midnight Magnolia, LLC
                        <br />
                        10070 Dorchester Rd, Ste 51599
                        <br />
                        Summerville, SC 29485
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-rich-gold/20 rounded-full text-rich-gold mt-1">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-rich-gold mb-1">Response Time</h3>
                      <p className="text-magnolia-white/90">
                        We typically respond to all inquiries within 24-48 hours during business days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-midnight-teal/30 pt-6">
                  <h3 className="font-heading text-lg text-rich-gold mb-4">Connect on Social Media</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com/rumi_nationz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-rich-gold/20 rounded-full text-rich-gold hover:bg-rich-gold/30 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-rich-gold/20 rounded-full text-rich-gold hover:bg-rich-gold/30 transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-rich-gold/20 rounded-full text-rich-gold hover:bg-rich-gold/30 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-midnight-teal/30">
              <h2 className="font-heading text-2xl text-rich-gold mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-magnolia-white/90 mb-2 text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-magnolia-white/90 mb-2 text-sm">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-magnolia-white/90 mb-2 text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-type" className="block text-magnolia-white/90 mb-2 text-sm">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiry-type"
                    className="w-full px-4 py-3 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold"
                  >
                    <option>General Inquiry</option>
                    <option>Product Question</option>
                    <option>Custom Project</option>
                    <option>Collaboration</option>
                    <option>Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-magnolia-white/90 mb-2 text-sm">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold"
                    required
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-4 w-4 rounded border-midnight-teal/50 text-rich-gold focus:ring-rich-gold"
                    required
                  />
                  <label htmlFor="consent" className="ml-2 block text-sm text-magnolia-white/80">
                    I consent to having this website store my submitted information so they can respond to my inquiry.
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors shadow-md hover:shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-midnight-blue/90">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-rich-gold mb-4">Frequently Asked Questions</h2>
            <p className="font-body text-magnolia-white/90">
              Find quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What types of digital products do you offer?",
                answer:
                  "We offer a range of digital products including journals, tarot decks, business templates, Notion dashboards, and digital art prints. All our products are designed with ADHD-friendly principles and Southern Gothic aesthetics.",
              },
              {
                question: "How do I download my purchase?",
                answer:
                  "After completing your purchase, you'll receive an email with download links. You can also access your purchases through your account dashboard at any time.",
              },
              {
                question: "Do you offer custom design services?",
                answer:
                  "Yes! We offer custom design services for digital products, branding elements, and artwork. Contact us with your project details for a custom quote.",
              },
              {
                question: "What is your refund policy?",
                answer:
                  "Due to the digital nature of our products, we generally don't offer refunds. However, if you experience technical issues with your download, please contact us and we'll be happy to help.",
              },
              {
                question: "Can I use your products for commercial purposes?",
                answer:
                  "Our standard licenses are for personal use only. If you need a commercial license, please select that option during purchase or contact us for custom licensing arrangements.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-midnight-teal/30"
              >
                <h3 className="font-heading text-xl text-rich-gold mb-3">{faq.question}</h3>
                <p className="font-body text-magnolia-white/90">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
