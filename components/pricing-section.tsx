"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

export function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      description: "Perfect for individual researchers and students",
      features: ["5 AI research analyses per month", "Basic visualization tools", "Export to PDF", "Email support"],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      description: "Ideal for professional researchers and small teams",
      features: [
        "25 AI research analyses per month",
        "Advanced visualization tools",
        "Export to multiple formats",
        "Priority email support",
        "Custom branding options",
        "Collaboration tools for up to 3 users",
      ],
      buttonText: "Subscribe Now",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      description: "For research teams and organizations",
      features: [
        "Unlimited AI research analyses",
        "Premium visualization tools",
        "All export formats",
        "24/7 priority support",
        "Custom branding and white-labeling",
        "Collaboration tools for unlimited users",
        "API access",
        "Dedicated account manager",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Research <span className="text-[#D4AF37]">Pricing Plans</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto px-4">
            Choose the perfect plan to transform your research with our AI-powered tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <div className="bg-[#D4AF37] text-[#191970] font-medium text-sm py-1 px-4 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <Card
                className={`h-full ${
                  plan.popular
                    ? "bg-[#191970] border-[#D4AF37] text-white"
                    : "bg-[#191970]/30 border-[#D4AF37]/20 backdrop-blur-sm text-white"
                }`}
              >
                <CardHeader>
                  <CardTitle className="font-serif text-xl sm:text-2xl">{plan.name}</CardTitle>
                  <CardDescription className={plan.popular ? "text-gray-300" : "text-gray-400"}>
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                    <span className="text-sm ml-1">/month</span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm sm:text-base">
                        <Check className="h-5 w-5 text-[#D4AF37] mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={
                      plan.popular
                        ? "w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970] font-medium"
                        : "w-full bg-white/10 hover:bg-white/20 text-white border border-[#D4AF37]/40"
                    }
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-gray-400 mb-4">Need a custom solution for your organization?</p>
          <Button className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
            Contact Our Sales Team
          </Button>
        </div>
      </div>
    </section>
  )
}
