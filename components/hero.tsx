"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, Sparkles } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Southern Gothic
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E8C4C0] block sm:inline">
                {" "}
                Elegance
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 text-lg sm:text-xl mb-8 max-w-2xl mx-auto font-serif px-4"
          >
            A sacred business incubator and creative sanctuary rooted in Southern Gothic aesthetics and healing-centered
            technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <Link href="/#services">
              <Button
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970] font-medium px-8 w-full sm:w-auto"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Our Services
              </Button>
            </Link>
            <Link href="/#products">
              <Button
                size="lg"
                variant="outline"
                className="text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37]/20 font-medium w-full sm:w-auto"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                View Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements - hidden on smallest screens */}
      <div className="absolute bottom-10 left-10 w-24 h-24 md:w-32 md:h-32 hidden sm:block">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
              <span className="text-[#D4AF37] font-serif text-2xl md:text-3xl">M</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
