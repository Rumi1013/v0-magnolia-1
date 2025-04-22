"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type MoonPhase = {
  name: string
  icon: string
  description: string
}

const moonPhases: MoonPhase[] = [
  {
    name: "New Moon",
    icon: "🌑",
    description: "A time for setting intentions and beginning new projects.",
  },
  {
    name: "Waxing Crescent",
    icon: "🌒",
    description: "A time for planning and gathering resources for your goals.",
  },
  {
    name: "First Quarter",
    icon: "🌓",
    description: "A time for decision making and overcoming challenges.",
  },
  {
    name: "Waxing Gibbous",
    icon: "🌔",
    description: "A time for refining and adjusting your plans before completion.",
  },
  {
    name: "Full Moon",
    icon: "🌕",
    description: "A time for celebration, manifestation, and seeing results.",
  },
  {
    name: "Waning Gibbous",
    icon: "🌖",
    description: "A time for gratitude, sharing, and teaching others.",
  },
  {
    name: "Last Quarter",
    icon: "🌗",
    description: "A time for release, letting go, and forgiveness.",
  },
  {
    name: "Waning Crescent",
    icon: "🌘",
    description: "A time for rest, reflection, and surrender.",
  },
]

export default function MoonPhaseTracker() {
  const [currentPhase, setCurrentPhase] = useState<MoonPhase>(moonPhases[0])

  // In a real implementation, you would calculate the actual moon phase
  // For this demo, we'll just rotate through the phases
  useEffect(() => {
    // Get a random moon phase for demonstration
    const randomIndex = Math.floor(Math.random() * moonPhases.length)
    setCurrentPhase(moonPhases[randomIndex])
  }, [])

  return (
    <div className="rounded-lg p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="font-playfair text-2xl font-bold mb-6 text-magnolia-white text-center">Current Moon Phase</h3>

        <div className="flex flex-col items-center">
          <motion.div
            className="text-7xl mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {currentPhase.icon}
          </motion.div>

          <h4 className="font-playfair text-xl font-bold text-rich-gold mb-2">{currentPhase.name}</h4>

          <p className="text-magnolia-white/80 text-center mb-6">{currentPhase.description}</p>

          <div className="flex justify-between w-full max-w-xs">
            {moonPhases.map((phase, index) => (
              <div
                key={index}
                className={`text-sm ${currentPhase.name === phase.name ? "text-rich-gold" : "text-magnolia-white/40"}`}
              >
                {phase.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-magnolia-white/80 italic">
            "As the moon waxes and wanes, so too do our creative energies. Align your work with the lunar cycle for
            optimal flow."
          </p>
        </div>
      </motion.div>
    </div>
  )
}
