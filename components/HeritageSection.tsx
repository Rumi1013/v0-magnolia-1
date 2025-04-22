"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"

// Default placeholder for heritage images
const DEFAULT_HERITAGE_IMAGE = "/thoughtful-gaze.png"

const heritageCollections = {
  "wisdom-keepers": {
    title: "Wisdom Keepers",
    description: "Celebrating the literary giants and thought leaders who paved the way with their words and wisdom.",
    figures: [
      {
        name: "Maya Angelou",
        quote: "You may encounter many defeats, but you must not be defeated.",
        image: "/images/heritage-maya.jpg",
      },
      {
        name: "Toni Morrison",
        quote: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
        image: "/images/heritage-toni.jpg",
      },
      {
        name: "Zora Neale Hurston",
        quote: "Research is formalized curiosity. It is poking and prying with a purpose.",
        image: "/images/heritage-zora.jpg",
      },
    ],
  },
  "modern-visionaries": {
    title: "Modern Visionaries",
    description: "Honoring contemporary leaders who are reshaping politics, business, and culture with bold vision.",
    figures: [
      {
        name: "Michelle Obama",
        quote: "When they go low, we go high.",
        image: "/images/heritage-michelle.jpg",
      },
      {
        name: "Stacey Abrams",
        quote: "The ability to tell your own story, in words or images, is already a victory, already a revolt.",
        image: "/images/heritage-stacey.jpg",
      },
      {
        name: "Maxine Waters",
        quote: "I am a strong black woman. I cannot be intimidated, and I'm not going anywhere.",
        image: "/images/heritage-maxine.jpg",
      },
    ],
  },
  "creative-forces": {
    title: "Creative Forces",
    description:
      "Celebrating the artists who express the depth and beauty of Black Southern experience through music and art.",
    figures: [
      {
        name: "Beyoncé",
        quote: "The most alluring thing a woman can have is confidence.",
        image: "/images/heritage-beyonce.jpg",
      },
      {
        name: "Janelle Monáe",
        quote: "I feel like I have a responsibility to the community.",
        image: "/images/heritage-janelle.jpg",
      },
      {
        name: "Solange",
        quote: "I'm not interested in entertainment that doesn't provoke.",
        image: "/images/heritage-solange.jpg",
      },
    ],
  },
}

export default function HeritageSection() {
  const [activeTab, setActiveTab] = useState("wisdom-keepers")
  const [activeFigure, setActiveFigure] = useState(0)

  return (
    <section className="py-20 bg-magnolia-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-midnight-blue">
            Southern Heritage Gallery
          </h2>
          <p className="text-midnight-teal max-w-2xl mx-auto">
            Drawing inspiration from the powerful legacy of Black Southern women who have shaped history, culture, and
            community through their wisdom, creativity, and resilience.
          </p>
        </div>

        <Tabs defaultValue="wisdom-keepers" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-midnight-blue/10">
              <TabsTrigger
                value="wisdom-keepers"
                className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
              >
                Wisdom Keepers
              </TabsTrigger>
              <TabsTrigger
                value="modern-visionaries"
                className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
              >
                Modern Visionaries
              </TabsTrigger>
              <TabsTrigger
                value="creative-forces"
                className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
              >
                Creative Forces
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(heritageCollections).map(([key, collection]) => (
            <TabsContent key={key} value={key}>
              <div className="flex flex-col lg:flex-row gap-12">
                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-midnight-blue">{collection.title}</h3>
                  <p className="text-midnight-teal mb-8">{collection.description}</p>

                  <div className="space-y-6">
                    {collection.figures.map((figure, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          index === activeFigure
                            ? "bg-midnight-blue text-magnolia-white"
                            : "bg-midnight-blue/5 hover:bg-midnight-blue/10"
                        }`}
                        onClick={() => setActiveFigure(index)}
                      >
                        <h4 className="font-playfair text-xl font-bold mb-2">{figure.name}</h4>
                        <p className={index === activeFigure ? "text-magnolia-white/80" : "text-midnight-teal"}>
                          "{figure.quote}"
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                      Explore Full Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative h-[500px] w-full rounded-lg overflow-hidden border-2 border-rich-gold">
                    <Image
                      src={
                        "/placeholder.svg?height=500&width=400&query=heritage+" + collection.figures[activeFigure].name
                      }
                      alt={collection.figures[activeFigure].name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent flex items-end">
                      <div className="p-6">
                        <h4 className="font-playfair text-2xl font-bold text-magnolia-white mb-2">
                          {collection.figures[activeFigure].name}
                        </h4>
                        <p className="text-magnolia-white/90 italic">"{collection.figures[activeFigure].quote}"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
