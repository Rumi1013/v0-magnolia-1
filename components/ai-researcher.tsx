"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Bot, FileText, ArrowRight } from "lucide-react"
import { RoboAnimation } from "./robo-animation"
import Link from "next/link"

export function AIResearcher() {
  return (
    <section id="researcher" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Transform Your Research with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E8C4C0] block sm:inline">
                {" "}
                AI Power
              </span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
              Upload your research papers and let our AI transform them into engaging presentations, podcasts, and
              visual content. Our research assistant combines southern storytelling traditions with cutting-edge AI
              technology.
            </p>
            <div className="flex flex-wrap gap-4 mb-6 sm:mb-8">
              <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970] font-medium">
                <FileText className="mr-2 h-5 w-5" />
                Upload Paper
              </Button>
              <Button variant="outline" className="text-white border-[#D4AF37] hover:bg-[#D4AF37]/20">
                <Bot className="mr-2 h-5 w-5" />
                See Examples
              </Button>
            </div>

            <div className="bg-[#191970]/30 border border-[#D4AF37]/20 rounded-lg p-4">
              <h3 className="font-serif text-lg sm:text-xl text-white mb-2">Premium Research Features</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-2 shrink-0">
                    <span className="text-[#D4AF37]">✓</span>
                  </div>
                  Advanced visualization of research connections
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-2 shrink-0">
                    <span className="text-[#D4AF37]">✓</span>
                  </div>
                  AI-generated summaries and key insights
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-2 shrink-0">
                    <span className="text-[#D4AF37]">✓</span>
                  </div>
                  Export to multiple formats (PDF, PPT, Audio)
                </li>
              </ul>
              <Link href="#pricing">
                <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970] font-medium">
                  View Pricing Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[300px] sm:h-[400px] mt-8 lg:mt-0"
          >
            <RoboAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
