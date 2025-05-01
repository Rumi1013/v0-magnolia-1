import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-[#FAF3E0] mb-4">Our Services</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover how Midnight Magnolia can help elevate your brand with our Southern-inspired digital solutions.
        </p>
      </div>

      <Tabs defaultValue="brand" className="w-full">
        <TabsList className="w-full max-w-2xl mx-auto flex flex-wrap justify-center bg-[#191970]/50 border border-[#D4AF37]/20 mb-8">
          <TabsTrigger value="brand" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970]">
            Brand Design
          </TabsTrigger>
          <TabsTrigger value="web" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970]">
            Web Development
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970]">
            Content Creation
          </TabsTrigger>
          <TabsTrigger
            value="automation"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#191970]"
          >
            Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="brand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image src="/southern-gothic-brand.png" alt="Brand Design Services" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-[#FAF3E0] mb-4">Brand Design</h2>
              <p className="text-gray-300 mb-6">
                Our brand design services infuse Southern Gothic aesthetics with modern design principles to create
                memorable, distinctive brand identities that resonate with your audience and tell your unique story.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Brand Strategy</h3>
                    <p className="text-gray-400">
                      Comprehensive brand strategy development to position your business in the market.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Visual Identity</h3>
                    <p className="text-gray-400">
                      Logo design, color palette development, typography selection, and visual elements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Brand Guidelines</h3>
                    <p className="text-gray-400">
                      Detailed brand guidelines to ensure consistency across all touchpoints.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Brand Collateral</h3>
                    <p className="text-gray-400">
                      Business cards, letterheads, social media templates, and other brand assets.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]">Request Brand Consultation</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="web">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-serif text-[#FAF3E0] mb-4">Web Development</h2>
              <p className="text-gray-300 mb-6">
                Our web development services combine stunning Southern-inspired aesthetics with powerful functionality
                to create websites that not only look beautiful but also drive results for your business.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Custom Website Design</h3>
                    <p className="text-gray-400">
                      Bespoke website designs that reflect your brand's unique Southern heritage and values.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">E-commerce Solutions</h3>
                    <p className="text-gray-400">
                      Fully-featured online stores with secure payment processing and inventory management.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Content Management</h3>
                    <p className="text-gray-400">
                      User-friendly content management systems that make updating your site a breeze.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">SEO & Analytics</h3>
                    <p className="text-gray-400">
                      Search engine optimization and analytics integration to track and improve performance.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]">Discuss Your Web Project</Button>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden order-1 md:order-2">
              <Image
                src="/southern-gothic-web-design.png"
                alt="Web Development Services"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/southern-gothic-products.png"
                alt="Content Creation Services"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-[#FAF3E0] mb-4">Content Creation</h2>
              <p className="text-gray-300 mb-6">
                Our content creation services help you tell your story with authentic Southern voice and style,
                connecting with your audience through compelling narratives and visuals.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Copywriting</h3>
                    <p className="text-gray-400">
                      Engaging website copy, blog posts, and marketing materials with Southern flair.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Photography</h3>
                    <p className="text-gray-400">
                      Professional photography services capturing the essence of Southern aesthetics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Video Production</h3>
                    <p className="text-gray-400">
                      Compelling video content for social media, websites, and marketing campaigns.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Social Media Content</h3>
                    <p className="text-gray-400">
                      Consistent, on-brand content creation for all your social media platforms.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]">Explore Content Services</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-serif text-[#FAF3E0] mb-4">Automation</h2>
              <p className="text-gray-300 mb-6">
                Our automation services help streamline your business operations, saving you time and resources while
                maintaining the personal touch that makes Southern hospitality special.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Workflow Automation</h3>
                    <p className="text-gray-400">
                      Custom workflows that automate repetitive tasks and streamline business processes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Email Marketing</h3>
                    <p className="text-gray-400">
                      Automated email campaigns that nurture leads and build relationships with your audience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">CRM Integration</h3>
                    <p className="text-gray-400">
                      Seamless integration with customer relationship management systems to track interactions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#D4AF37] mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#FAF3E0]">Data Analysis</h3>
                    <p className="text-gray-400">
                      Automated reporting and analytics to help you make data-driven business decisions.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]">Automate Your Business</Button>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden order-1 md:order-2">
              <Image src="/southern-gothic-automation.png" alt="Automation Services" fill className="object-cover" />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-24">
        <h2 className="text-3xl font-serif text-[#FAF3E0] text-center mb-12">Our Process</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-[#191970]/30 border border-[#D4AF37]/20">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-3xl font-serif text-[#D4AF37]">1</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-[#FAF3E0] text-center mb-2">Discovery</h3>
              <p className="text-gray-300 text-center">
                We begin by understanding your business, goals, audience, and unique Southern story.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#191970]/30 border border-[#D4AF37]/20">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-3xl font-serif text-[#D4AF37]">2</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-[#FAF3E0] text-center mb-2">Strategy</h3>
              <p className="text-gray-300 text-center">
                We develop a tailored strategy that aligns with your business objectives and Southern values.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#191970]/30 border border-[#D4AF37]/20">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-3xl font-serif text-[#D4AF37]">3</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-[#FAF3E0] text-center mb-2">Creation</h3>
              <p className="text-gray-300 text-center">
                Our team brings your vision to life with Southern-inspired design and development.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#191970]/30 border border-[#D4AF37]/20">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-3xl font-serif text-[#D4AF37]">4</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-[#FAF3E0] text-center mb-2">Growth</h3>
              <p className="text-gray-300 text-center">
                We provide ongoing support and optimization to ensure your continued success and growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-24 bg-[#191970]/50 border border-[#D4AF37]/20 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-serif text-[#FAF3E0] mb-4">Ready to Get Started?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Let's collaborate to create something beautiful that honors your Southern roots while embracing modern digital
          possibilities.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]">Schedule a Consultation</Button>
          <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
            View Our Portfolio
          </Button>
        </div>
      </div>
    </div>
  )
}
