import { ArrowRight, Mail, Bell, Star, Calendar } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

export function NewsletterSection() {
  return (
    <section className="py-16 md:py-24 bg-magnolia-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          label="STAY CONNECTED"
          title="Join the Midnight Magnolia Community"
          description="Subscribe to receive updates, exclusive content, and special offers."
          labelColor="text-midnight-teal"
          titleColor="text-midnight-blue"
          descriptionColor="text-midnight-teal/90"
        />

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-sage-green/30">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-heading text-xl text-midnight-blue mb-4">Monthly Moonlight Letter</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Star className="h-5 w-5 text-rich-gold flex-shrink-0 mt-0.5" />
                    <span className="text-midnight-teal/90">Exclusive content previews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-rich-gold flex-shrink-0 mt-0.5" />
                    <span className="text-midnight-teal/90">Upcoming events and launches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Bell className="h-5 w-5 text-rich-gold flex-shrink-0 mt-0.5" />
                    <span className="text-midnight-teal/90">Special offers and discounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-rich-gold flex-shrink-0 mt-0.5" />
                    <span className="text-midnight-teal/90">Direct connection to our community</span>
                  </li>
                </ul>
              </div>

              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-midnight-teal mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 rounded-md border border-sage-green/50 focus:outline-none focus:ring-2 focus:ring-midnight-teal"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-midnight-teal mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 rounded-md border border-sage-green/50 focus:outline-none focus:ring-2 focus:ring-midnight-teal"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-rich-gold focus:ring-rich-gold" />
                      <span className="text-sm text-midnight-teal/90">
                        I'd like to receive updates about products and services
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-midnight-blue text-magnolia-white rounded-md font-accent hover:bg-midnight-blue/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Subscribe to Newsletter
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            <div className="text-center text-xs text-midnight-teal/70 pt-4 border-t border-sage-green/20">
              We respect your privacy and will never share your information. You can unsubscribe at any time.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
