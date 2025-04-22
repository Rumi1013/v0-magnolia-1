"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Paintbrush, Code, Megaphone, Sparkles, ArrowRight } from "lucide-react"

const services = [
  {
    icon: <Paintbrush className="h-10 w-10 text-rich-gold" />,
    title: "Brand Design",
    description:
      "Comprehensive brand identity development including logos, color palettes, typography, and brand guidelines that reflect your unique Southern heritage and story.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
  {
    icon: <Code className="h-10 w-10 text-rich-gold" />,
    title: "Web Development",
    description:
      "Custom website design and development that captures your essence while providing seamless functionality and user experience for your audience.",
    features: ["Custom Design", "E-commerce Setup", "Content Management", "Mobile Optimization"],
  },
  {
    icon: <Megaphone className="h-10 w-10 text-rich-gold" />,
    title: "Digital Marketing",
    description:
      "Strategic digital marketing services to help you connect with your audience, build community, and grow your business with authentic storytelling.",
    features: ["Content Strategy", "Social Media", "Email Marketing", "SEO Optimization"],
  },
  {
    icon: <Sparkles className="h-10 w-10 text-rich-gold" />,
    title: "Automation Systems",
    description:
      "Streamline your business operations with custom automation workflows that save time, reduce stress, and create consistent experiences for your clients.",
    features: ["Workflow Design", "Tool Integration", "Process Optimization", "Training & Support"],
  },
]

export default function ServicesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-midnight-blue text-magnolia-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Creative Services</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto">
            Elevate your brand with our professional creative services designed to help you stand out, connect with your
            audience, and grow your business with Southern charm and digital expertise.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-midnight-teal border-rich-gold/20 h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="font-playfair text-2xl text-magnolia-white">{service.title}</CardTitle>
                  <CardDescription className="text-magnolia-white/70">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-rich-gold mr-2"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
