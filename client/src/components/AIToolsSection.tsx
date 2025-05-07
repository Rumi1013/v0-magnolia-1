import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wand2,
  Bot,
  Layers,
  Sparkles,
  BookCopy,
  FileText,
  Check
} from "lucide-react";

export function AIToolsSection() {
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
            <div className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 text-center transition-all hover:border-[#D4AF37]">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0A192F]/10 border border-[#D4AF37]/30 mx-auto mb-4">
                <Wand2 className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-playfair text-[#0A192F] mb-2">Claude AI</h3>
              <p className="text-xs text-gray-600">
                Advanced text generation with authentic Southern voice for ebooks, guides, and digital content.
              </p>
            </div>
              
            <div className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 text-center transition-all hover:border-[#D4AF37]">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0A192F]/10 border border-[#D4AF37]/30 mx-auto mb-4">
                <Bot className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-playfair text-[#0A192F] mb-2">OpenAI</h3>
              <p className="text-xs text-gray-600">
                Versatile content generation and data processing to power automation workflows.
              </p>
            </div>
              
            <div className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 text-center transition-all hover:border-[#D4AF37]">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0A192F]/10 border border-[#D4AF37]/30 mx-auto mb-4">
                <Layers className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-playfair text-[#0A192F] mb-2">Leonardo AI</h3>
              <p className="text-xs text-gray-600">
                Southern Gothic themed image generation for digital products and services.
              </p>
            </div>
              
            <div className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 text-center transition-all hover:border-[#D4AF37]">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0A192F]/10 border border-[#D4AF37]/30 mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-playfair text-[#0A192F] mb-2">Stable Diffusion</h3>
              <p className="text-xs text-gray-600">
                Customizable image creation via Freepik with your unique Southern aesthetic.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-playfair text-[#0A192F] mb-6">Resources Integration</h3>
              
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 transition-all hover:border-[#D4AF37]">
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
              </div>
                
              <div className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 transition-all hover:border-[#D4AF37]">
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
              </div>
                
              <div className="bg-[#0A192F]/5 border border-[#A3B18A]/30 rounded-lg p-5 transition-all hover:border-[#D4AF37]">
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
              </div>
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
            <div className="bg-[#0A192F]/5 border border-[#D4AF37]/20 rounded-lg p-6 transition-all">
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
            </div>
            
            <div className="bg-[#0A192F]/5 border border-[#D4AF37]/20 rounded-lg p-6 transition-all">
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}