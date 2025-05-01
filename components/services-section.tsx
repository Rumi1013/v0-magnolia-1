"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Laptop, PenTool } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      title: "Professional Documentation",
      description: "Comprehensive business document creation with southern elegance and professional polish",
      icon: <FileText className="h-8 w-8 text-[#D4AF37]" />,
    },
    {
      title: "Digital Identity Packages",
      description: "Modern digital tools with Midnight Magnolia's sophisticated southern aesthetic",
      icon: <PenTool className="h-8 w-8 text-[#D4AF37]" />,
    },
    {
      title: "Technology Access Initiatives",
      description: "Programs to increase Black women's access to technology for career advancement",
      icon: <Laptop className="h-8 w-8 text-[#D4AF37]" />,
    },
  ]

  return (
    <section id="services" className="py-16 sm:py-20 relative bg-[#191970]/10">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Our <span className="text-[#D4AF37]">Services</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto px-4">
            Professional services that blend southern hospitality with modern expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border border-[#D4AF37]/20 backdrop-blur-sm text-white h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="bg-[#191970] p-2 rounded-md shrink-0">{service.icon}</div>
                  <CardTitle className="font-serif text-base sm:text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-sm sm:text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
