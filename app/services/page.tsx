import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Check, Paintbrush, Code, Megaphone, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Services | Midnight Magnolia",
  description:
    "Professional creative services designed to help you stand out, connect with your audience, and grow your business with Southern charm and digital expertise.",
}

// Service categories
const serviceCategories = [
  {
    id: "brand-design",
    name: "Brand Design",
    icon: <Paintbrush className="h-10 w-10 text-rich-gold" />,
    description:
      "Comprehensive brand identity development including logos, color palettes, typography, and brand guidelines that reflect your unique Southern heritage and story.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    process: [
      {
        title: "Discovery",
        description:
          "We begin with a deep dive into your vision, values, and audience to understand the heart of your brand.",
      },
      {
        title: "Concept Development",
        description:
          "Creating initial design concepts that capture your essence and resonate with your target audience.",
      },
      {
        title: "Refinement",
        description: "Iterative feedback and refinement to perfect your brand identity elements.",
      },
      {
        title: "Finalization",
        description: "Delivering a comprehensive brand package with all necessary files and guidelines.",
      },
    ],
    projects: [
      {
        title: "Southern Heritage Bakery",
        description: "Brand identity for an artisanal bakery celebrating Southern culinary traditions",
        image: "/placeholder.svg?height=400&width=600&query=southern+bakery+branding",
      },
      {
        title: "Magnolia Wellness",
        description: "Holistic wellness brand focused on traditional Southern healing practices",
        image: "/placeholder.svg?height=400&width=600&query=wellness+brand+southern",
      },
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    icon: <Code className="h-10 w-10 text-rich-gold" />,
    description:
      "Custom website design and development that captures your essence while providing seamless functionality and user experience for your audience.",
    features: ["Custom Design", "E-commerce Setup", "Content Management", "Mobile Optimization"],
    process: [
      {
        title: "Planning",
        description: "Mapping out site architecture, user flows, and technical requirements.",
      },
      {
        title: "Design",
        description: "Creating visually stunning mockups that align with your brand identity.",
      },
      {
        title: "Development",
        description: "Building a responsive, accessible, and performant website.",
      },
      {
        title: "Launch & Support",
        description: "Thorough testing, deployment, and ongoing maintenance options.",
      },
    ],
    projects: [
      {
        title: "Heritage Tours",
        description: "Tourism website showcasing Southern historical sites and cultural experiences",
        image: "/placeholder.svg?height=400&width=600&query=southern+tourism+website",
      },
      {
        title: "Magnolia Marketplace",
        description: "E-commerce platform for Southern artisans and craftspeople",
        image: "/placeholder.svg?height=400&width=600&query=southern+marketplace+ecommerce",
      },
    ],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    icon: <Megaphone className="h-10 w-10 text-rich-gold" />,
    description:
      "Strategic digital marketing services to help you connect with your audience, build community, and grow your business with authentic storytelling.",
    features: ["Content Strategy", "Social Media", "Email Marketing", "SEO Optimization"],
    process: [
      {
        title: "Research",
        description: "Analyzing your market, competitors, and target audience to identify opportunities.",
      },
      {
        title: "Strategy Development",
        description: "Creating a comprehensive marketing plan aligned with your business goals.",
      },
      {
        title: "Implementation",
        description: "Executing campaigns across relevant channels with consistent messaging.",
      },
      {
        title: "Analysis & Optimization",
        description: "Continuous monitoring and refinement based on performance data.",
      },
    ],
    projects: [
      {
        title: "Southern Comfort Foods",
        description: "Content marketing campaign celebrating traditional Southern recipes and stories",
        image: "/placeholder.svg?height=400&width=600&query=southern+food+marketing",
      },
      {
        title: "Heritage Crafts Collective",
        description: "Social media strategy for a collective of traditional Southern craftspeople",
        image: "/placeholder.svg?height=400&width=600&query=crafts+social+media+southern",
      },
    ],
  },
  {
    id: "automation",
    name: "Automation Systems",
    icon: <Sparkles className="h-10 w-10 text-rich-gold" />,
    description:
      "Streamline your business operations with custom automation workflows that save time, reduce stress, and create consistent experiences for your clients.",
    features: ["Workflow Design", "Tool Integration", "Process Optimization", "Training & Support"],
    process: [
      {
        title: "Assessment",
        description: "Evaluating your current systems and identifying automation opportunities.",
      },
      {
        title: "Solution Design",
        description: "Creating custom workflows and selecting appropriate tools for your needs.",
      },
      {
        title: "Implementation",
        description: "Setting up and integrating systems with minimal disruption to your business.",
      },
      {
        title: "Training & Refinement",
        description: "Ensuring your team can effectively use and maintain the new systems.",
      },
    ],
    projects: [
      {
        title: "Magnolia Client Experience",
        description: "Automated client onboarding and management system for a boutique service provider",
        image: "/placeholder.svg?height=400&width=600&query=client+automation+system",
      },
      {
        title: "Southern Artisan Collective",
        description: "Inventory and order management system for a multi-vendor marketplace",
        image: "/placeholder.svg?height=400&width=600&query=inventory+management+system",
      },
    ],
  },
]

// Testimonials
const testimonials = [
  {
    quote:
      "Midnight Magnolia transformed our brand with their deep understanding of Southern heritage and modern design principles. They captured our essence perfectly.",
    author: "Eliza Johnson",
    role: "Founder, Southern Roots Bakery",
    image: "/placeholder.svg?height=100&width=100&query=woman+entrepreneur+portrait",
  },
  {
    quote:
      "The automation systems they implemented saved us countless hours and helped us scale our business without sacrificing the personal touch our clients love.",
    author: "Marcus Williams",
    role: "CEO, Heritage Tours",
    image: "/placeholder.svg?height=100&width=100&query=man+business+portrait",
  },
  {
    quote:
      "Their digital marketing strategy helped us connect with our audience in an authentic way that honors our traditions while embracing modern platforms.",
    author: "Jasmine Reynolds",
    role: "Marketing Director, Magnolia Artisans",
    image: "/placeholder.svg?height=100&width=100&query=marketing+director+portrait",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-midnight-blue text-magnolia-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=1080&width=1920&query=southern+gothic+creative+services"
            alt="Services Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Creative Services</h1>
            <p className="text-lg md:text-xl text-magnolia-white/80 mb-8">
              Elevate your brand with our professional creative services designed to help you stand out, connect with
              your audience, and grow your business with Southern charm and digital expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                Explore Services
              </Button>
              <Button size="lg" variant="outline" className="border-rich-gold text-rich-gold hover:bg-rich-gold/10">
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            How We Can Help You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map((service) => (
              <Card key={service.id} className="bg-midnight-teal border-rich-gold/20 h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="font-playfair text-2xl text-magnolia-white">{service.name}</CardTitle>
                  <CardDescription className="text-magnolia-white/70">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-rich-gold mr-2"></div>
                        <span className="text-magnolia-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                    asChild
                  >
                    <Link href={`#${service.id}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      {serviceCategories.map((service, index) => (
        <section
          id={service.id}
          key={service.id}
          className={`py-20 ${index % 2 === 0 ? "bg-midnight-blue/5" : "bg-magnolia-white"}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              <div className="w-full lg:w-1/2">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-midnight-blue">{service.name}</h2>
                <p className="text-midnight-teal mb-8">{service.description}</p>

                <h3 className="font-playfair text-2xl font-bold mb-4 text-midnight-blue">Our Process</h3>
                <div className="space-y-6 mb-8">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rich-gold text-midnight-blue">
                          {i + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                        <p className="text-midnight-teal">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="w-full lg:w-1/2">
                <h3 className="font-playfair text-2xl font-bold mb-6 text-midnight-blue">Featured Projects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.projects.map((project, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden group">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-midnight-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4">
                            <h4 className="font-playfair text-lg font-bold text-magnolia-white mb-1">
                              {project.title}
                            </h4>
                            <p className="text-magnolia-white/80 text-sm">{project.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Section */}
      <section className="py-20 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-magnolia-white/80 max-w-2xl mx-auto">
              We believe in clear, straightforward pricing with no hidden fees. Choose the service package that best
              fits your needs, or contact us for a custom quote.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Essential",
                price: "$1,500",
                description: "Perfect for small businesses and solopreneurs just getting started",
                features: [
                  "Brand Strategy Session",
                  "Logo Design (2 concepts)",
                  "Basic Brand Guidelines",
                  "Business Card Design",
                  "Social Media Templates (3)",
                  "Email Support",
                ],
              },
              {
                name: "Professional",
                price: "$3,500",
                description: "Comprehensive branding and digital presence for established businesses",
                features: [
                  "Everything in Essential",
                  "Full Brand Identity Package",
                  "Custom Website (5 pages)",
                  "Social Media Strategy",
                  "Email Marketing Setup",
                  "1 Month of Support",
                ],
                featured: true,
              },
              {
                name: "Premium",
                price: "$7,500",
                description: "Complete brand transformation and digital marketing strategy",
                features: [
                  "Everything in Professional",
                  "E-commerce Website",
                  "Custom Photography",
                  "3-Month Marketing Campaign",
                  "Business Automation Setup",
                  "3 Months of Support",
                ],
              },
            ].map((plan, i) => (
              <Card
                key={i}
                className={`h-full flex flex-col ${
                  plan.featured
                    ? "bg-rich-gold text-midnight-blue border-rich-gold"
                    : "bg-midnight-teal border-rich-gold/20 text-magnolia-white"
                }`}
              >
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-center">{plan.name}</CardTitle>
                  <div className="text-center my-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.name !== "Premium" && <span className="text-sm opacity-80"> / starting at</span>}
                  </div>
                  <CardDescription
                    className={`text-center ${plan.featured ? "text-midnight-blue/80" : "text-magnolia-white/70"}`}
                  >
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start">
                        <Check
                          className={`h-5 w-5 mr-2 flex-shrink-0 ${plan.featured ? "text-midnight-blue" : "text-rich-gold"}`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.featured
                        ? "bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white"
                        : "bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-magnolia-white/80 mb-4">
              Need a custom solution? We offer tailored packages to meet your specific needs.
            </p>
            <Button
              variant="outline"
              className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
            >
              Request Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Client Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-midnight-blue/5 border-none">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base font-playfair">{testimonial.author}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-midnight-blue italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-midnight-blue/5">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What is your typical project timeline?",
                a: "Project timelines vary based on scope and complexity. A brand identity typically takes 4-6 weeks, while a custom website may take 6-12 weeks. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                q: "How do you incorporate Southern heritage into modern designs?",
                a: "We blend traditional Southern elements, symbolism, and storytelling with contemporary design principles to create authentic yet modern brand experiences that honor heritage while appealing to today's audiences.",
              },
              {
                q: "Do you offer ongoing support after project completion?",
                a: "Yes, we offer various support and maintenance packages to ensure your brand and digital presence continue to thrive. We can discuss these options based on your specific needs.",
              },
              {
                q: "How do we get started working together?",
                a: "The process begins with a discovery call where we discuss your vision, goals, and needs. From there, we'll provide a proposal outlining our recommended approach, timeline, and investment.",
              },
              {
                q: "Do you work with clients outside the Southern region?",
                a: "While our aesthetic is inspired by Southern heritage, we work with clients nationwide who appreciate our unique approach to design and storytelling.",
              },
            ].map((faq, i) => (
              <Card key={i} className="border-rich-gold/20">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-midnight-teal">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto mb-8">
            Let's create something beautiful together that honors your story and connects with your audience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-rich-gold text-rich-gold hover:bg-rich-gold/10">
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
