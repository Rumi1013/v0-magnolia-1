"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FAQItem = {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What services does Midnight Magnolia offer?",
    answer:
      "Midnight Magnolia offers a range of services including professional documentation, digital identity packages, technology access initiatives, web development, content creation, and automation solutions. All our services blend Southern Gothic aesthetics with modern functionality.",
  },
  {
    question: "How does your design process work?",
    answer:
      "Our design process begins with a discovery phase where we learn about your business, goals, and audience. We then develop a tailored strategy, create designs and implementations based on that strategy, and provide ongoing support for growth and optimization.",
  },
  {
    question: "Do you offer custom branding services?",
    answer:
      "Yes, we offer comprehensive brand design services that infuse Southern Gothic aesthetics with modern design principles. This includes brand strategy development, visual identity creation, brand guidelines, and brand collateral design.",
  },
  {
    question: "What makes Midnight Magnolia different from other design agencies?",
    answer:
      "Midnight Magnolia uniquely blends Southern Gothic aesthetics with healing-centered technology. We focus on creating digital experiences that honor tradition while embracing innovation, all with a distinctly Southern perspective and attention to accessibility.",
  },
  {
    question: "Do you work with clients outside the Southern United States?",
    answer:
      "While our aesthetic is inspired by Southern Gothic traditions, we work with clients from all regions who appreciate our unique design approach and quality of service.",
  },
  {
    question: "What types of products do you offer?",
    answer:
      "Our product offerings include Southern Oracle Tarot decks, journals and stationery designed for executive function support, digital templates, home textiles, home accents, and various digital wellness tools that complement our physical products.",
  },
  {
    question: "How can I collaborate with Midnight Magnolia?",
    answer:
      "You can start by reaching out through our contact form or scheduling a consultation. We'll discuss your needs, goals, and how our services can help you achieve them. From there, we'll develop a tailored proposal and timeline for your project.",
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  return (
    <section className="py-16 bg-[#0F0F1A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-[#FAF3E0] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about Midnight Magnolia's services, products, and approach.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#D4AF37]/20 last:border-b-0"
              >
                <AccordionTrigger className="text-left font-serif text-[#FAF3E0] hover:text-[#D4AF37] py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
