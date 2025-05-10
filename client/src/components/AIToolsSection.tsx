import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIContentGenerator } from "@/components/AIContentGenerator";
import { BirthChartGenerator } from "@/components/BirthChartGenerator";
import { TieredProductPricing } from "@/components/TieredProductPricing";
import { 
  Wand2,
  Bot,
  Layers,
  Sparkles,
  BookCopy,
  FileText,
  Check,
  ScrollText,
  Stars
} from "lucide-react";
import { motion } from "framer-motion";

export function AIToolsSection() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-10">
      <Card className="border-[#D4AF37]/20">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair text-[#0A192F] border-b-2 border-[#D4AF37] pb-2">
            AI Tools Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-6">
              Our automation system seamlessly connects with cutting-edge AI tools to enhance your Southern Gothic Digital content creation and service delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <motion.div 
              className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 text-center transition-all hover:border-[#D4AF37]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0A192F]/10 border border-[#D4AF37]/30 mx-auto mb-4">
                <Wand2 className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-playfair text-[#0A192F] mb-2">Claude AI</h3>
              <p className="text-xs text-gray-600">
                Advanced text generation with authentic Southern voice for ebooks, guides, and digital content.
              </p>
            </motion.div>

            <motion.div 
              className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 text-center transition-all hover:border-[#D4AF37]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0A192F]/10 border border-[#D4AF37]/30 mx-auto mb-4">
                <Bot className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-playfair text-[#0A192F] mb-2">OpenAI</h3>
              <p className="text-xs text-gray-600">
                Versatile content generation and data processing to power automation workflows.
              </p>
            </motion.div>

            <motion.div 
              className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 text-center transition-all hover:border-[#D4AF37]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0A192F]/10 border border-[#D4AF37]/30 mx-auto mb-4">
                <Layers className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-playfair text-[#0A192F] mb-2">Leonardo AI</h3>
              <p className="text-xs text-gray-600">
                Southern Gothic themed image generation for digital products and services.
              </p>
            </motion.div>

            <motion.div 
              className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 text-center transition-all hover:border-[#D4AF37]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0A192F]/10 border border-[#D4AF37]/30 mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-playfair text-[#0A192F] mb-2">Stable Diffusion</h3>
              <p className="text-xs text-gray-600">
                Customizable image creation via Freepik with your unique Southern aesthetic.
              </p>
            </motion.div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-playfair text-[#0A192F] mb-6">Resources Integration</h3>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 transition-all hover:border-[#D4AF37]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-lg font-playfair text-[#0A192F] mb-3">Public Domain Resources</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0A192F]">Project Gutenberg</p>
                      <p className="text-xs text-gray-600">Historical text integration for Southern Gothic context and reference</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0A192F]">Unsplash</p>
                      <p className="text-xs text-gray-600">High-quality imagery for digital products and templates</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0A192F]">Open Culture</p>
                      <p className="text-xs text-gray-600">Free cultural resources for educational content</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 transition-all hover:border-[#D4AF37]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-lg font-playfair text-[#0A192F] mb-3">Template Automation</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0A192F]">Airtable Template Engine</p>
                      <p className="text-xs text-gray-600">Custom template generation based on client needs</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0A192F]">Notion Design System</p>
                      <p className="text-xs text-gray-600">Elegant templates with your Southern Gothic branding</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0A192F]">Make Template Deployment</p>
                      <p className="text-xs text-gray-600">Automated delivery system for custom templates</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 transition-all hover:border-[#D4AF37]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-lg font-playfair text-[#0A192F] mb-3">Content Creation Suite</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0A192F]">eBook Automation</p>
                      <p className="text-xs text-gray-600">AI-powered content generation and formatting</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0A192F]">Historical Image Creation</p>
                      <p className="text-xs text-gray-600">AI-generated Southern Gothic artwork and imagery</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0A192F]">Automated Content Distribution</p>
                      <p className="text-xs text-gray-600">Seamless delivery across multiple platforms</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#D4AF37]/20">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair text-[#0A192F] border-b-2 border-[#D4AF37] pb-2">
            AI-Enhanced Digital Creation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-6">
              Our automation system integrates powerful AI tools to create stunning digital content with your Southern Gothic aesthetic, from ebooks to historical artwork and elegant templates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-[#0A192F]/5 border border-[#D4AF37]/20 rounded-lg p-6 transition-all"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-playfair text-[#0A192F] mb-4">Digital Content Creation Suite</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mr-4 mt-1">
                    <BookCopy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg text-[#0A192F] font-playfair mb-2">eBook Generation</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Automated ebook creation combining AI-generated content with your expertise and Southern Gothic aesthetic.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Claude AI content generation for authentic Southern voice</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Automated formatting and layout with your branding</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Integration with Project Gutenberg for historical references</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mr-4 mt-1">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg text-[#0A192F] font-playfair mb-2">Content Briefs</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      AI-generated content briefs for your digital products and marketing materials with Southern Gothic aesthetics.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Detailed outlines with Southern Gothic themes</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Reference materials and historical context integration</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Customizable format for various content types</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-[#0A192F]/5 border border-[#D4AF37]/20 rounded-lg p-6 transition-all"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-playfair text-[#0A192F] mb-4">Southern Gothic Digital Art</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mr-4 mt-1">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg text-[#0A192F] font-playfair mb-2">Historical Imagery</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      AI-generated historical imagery for your Southern Gothic digital products and content.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Authentic Southern Gothic aesthetics</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Stable Diffusion for high-quality image generation</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Custom prompts for your specific brand identity</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mr-4 mt-1">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg text-[#0A192F] font-playfair mb-2">Custom Product Imagery</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Generate custom product imagery with your Southern Gothic branding for digital products and marketing.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Product mockups with your branding</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Social media-ready graphics with Southern themes</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <Check className="w-3 h-3 text-[#D4AF37] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">Marketing materials with consistent aesthetic</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#D4AF37]/20">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair text-[#0A192F] border-b-2 border-[#D4AF37] pb-2">
            Digital Grimoire Tools
          </CardTitle>
          <CardDescription className="mt-2">
            Create content, generate workflow steps, and enhance your digital grimoire with AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid grid-cols-5 w-full mb-6">
              <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
              <TabsTrigger value="content-generator" className="text-sm">Content Generator</TabsTrigger>
              <TabsTrigger value="workflow-integration" className="text-sm">Workflow Integration</TabsTrigger>
              <TabsTrigger value="birth-chart" className="text-sm">Birth Chart</TabsTrigger>
              <TabsTrigger value="pricing" className="text-sm">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="border-none p-0">
              <div className="space-y-6">
                <motion.div 
                  className="bg-[#0A192F]/5 rounded-lg p-6 border border-[#A3B18A]/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-playfair text-[#0A192F] mb-4">The Digital Grimoire</h3>
                  <p className="text-gray-600 mb-4">
                    Your Digital Grimoire integrates AI tools to streamline content creation and workflow management, 
                    merging your Southern Gothic aesthetic with advanced technologies.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <motion.div 
                      className="border border-[#D4AF37]/20 rounded-lg p-4 bg-white/50"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center mb-3">
                        <ScrollText className="w-5 h-5 text-[#D4AF37] mr-2" />
                        <h4 className="font-playfair text-[#0A192F]">Content Generation</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Create tarot interpretations, affirmations, worksheets, and other content with your unique Southern Gothic voice.
                      </p>
                    </motion.div>

                    <motion.div 
                      className="border border-[#D4AF37]/20 rounded-lg p-4 bg-white/50"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center mb-3">
                        <Layers className="w-5 h-5 text-[#D4AF37] mr-2" />
                        <h4 className="font-playfair text-[#0A192F]">Workflow Enhancement</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Automatically generate workflow steps and streamline your creation process with AI assistance.
                      </p>
                    </motion.div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 italic">
                      Select one of the tabs above to access the AI tools
                    </p>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="content-generator" className="border-none p-0">
              <AIContentGenerator />
            </TabsContent>

            <TabsContent value="workflow-integration" className="border-none p-0">
              <Card className="border-[#D4AF37]/20">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair text-[#0A192F]">
                    Workflow Integration
                  </CardTitle>
                  <CardDescription>
                    Connect your Digital Grimoire workflow with AI assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <motion.div 
                      className="bg-[#0A192F]/5 rounded-lg p-6 border border-[#A3B18A]/30"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h3 className="text-lg font-playfair text-[#0A192F] mb-3">How to Use AI with Your Workflows</h3>

                      <ol className="space-y-4 mt-4">
                        <li className="flex">
                          <span className="bg-[#D4AF37]/20 text-[#0A192F] rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</span>
                          <div>
                            <p className="font-medium text-[#0A192F]">Open a workflow</p>
                            <p className="text-sm text-gray-600">Navigate to the Workflows tab and select any existing workflow</p>
                          </div>
                        </li>

                        <li className="flex">
                          <span className="bg-[#D4AF37]/20 text-[#0A192F] rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</span>
                          <div>
                            <p className="font-medium text-[#0A192F]">Locate the AI Workflow Assistant</p>
                            <p className="text-sm text-gray-600">The AI Workflow Assistant appears below your workflow steps</p>
                          </div>
                        </li>

                        <li className="flex">
                          <span className="bg-[#D4AF37]/20 text-[#0A192F] rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</span>
                          <div>
                            <p className="font-medium text-[#0A192F]">Generate workflow steps</p>
                            <p className="text-sm text-gray-600">Enter your workflow description and the AI will generate detailed steps</p>
                          </div>
                        </li>

                        <li className="flex">
                          <span className="bg-[#D4AF37]/20 text-[#0A192F] rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</span>
                          <div>
                            <p className="font-medium text-[#0A192F]">Apply to your workflow</p>
                            <p className="text-sm text-gray-600">Review the generated steps and click "Apply to Workflow" to add them</p>
                          </div>
                        </li>
                      </ol>
                    </motion.div>

                    <motion.div 
                      className="bg-[#0A192F]/5 rounded-lg p-6 border border-[#A3B18A]/30"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h3 className="text-lg font-playfair text-[#0A192F] mb-3">Digital Grimoire Workflow Templates</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        These templates are designed specifically for your Midnight Magnolia brand and can be enhanced with AI-generated steps:
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <motion.div 
                          className="border border-[#D4AF37]/20 rounded-lg p-4 bg-white/50"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <h4 className="font-playfair text-[#0A192F] text-sm mb-2">Content Creation</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Digital Product Development</li>
                            <li>• Tarot Content Creation</li>
                            <li>• eBook Production</li>
                          </ul>
                        </motion.div>

                        <motion.div 
                          className="border border-[#D4AF37]/20 rounded-lg p-4 bg-white/50"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <h4 className="font-playfair text-[#0A192F] text-sm mb-2">Marketing</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Social Media Campaign</li>
                            <li>• Product Launch</li>
                            <li>• Email Sequence</li>
                          </ul>
                        </motion.div>

                        <motion.div 
                          className="border border-[#D4AF37]/20 rounded-lg p-4 bg-white/50"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <h4 className="font-playfair text-[#0A192F] text-sm mb-2">Patreon</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Tier Content Planning</li>
                            <li>• Membership Benefits</li>
                            <li>• Monthly Delivery</li>
                          </ul>
                        </motion.div>

                        <motion.div 
                          className="border border-[#D4AF37]/20 rounded-lg p-4 bg-white/50"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <h4 className="font-playfair text-[#0A192F] text-sm mb-2">Technical</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Airtable Integration</li>
                            <li>• Notion Database Setup</li>
                            <li>• API Connection</li>
                          </ul>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="birth-chart" className="border-none p-0">
              <BirthChartGenerator />
            </TabsContent>

            <TabsContent value="pricing" className="border-none p-0">
              <TieredProductPricing />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <motion.div 
        className="bg-[#0A192F]/5 rounded-lg p-6 border border-[#A3B18A]/30 mt-10"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-start">
          <Stars className="w-6 h-6 text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-playfair text-[#0A192F] mb-2">Specialized Backend AI Access for Content Creators</h3>
            <p className="text-gray-600 mb-4">
              As requested, we've built robust backend capabilities for your content creation process. The AI tools are specifically designed for your Midnight Magnolia brand and are not intended for general public use without tiered access.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Advanced AI workflow generation with OpenAI integration for professional content creators</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Tiered product offerings with sliding scale pricing to offset operational costs</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Birth chart generator for premium content available through subscription tiers</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-[#D4AF37] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Consistent Southern Gothic branding and aesthetics across all components</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```