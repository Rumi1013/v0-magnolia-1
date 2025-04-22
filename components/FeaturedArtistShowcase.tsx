"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

// Featured artists data
const featuredArtists = [
  {
    id: 1,
    name: "Beyoncé",
    description:
      "Grammy-winning artist whose music, performances, and business ventures have redefined entertainment while celebrating her Southern roots and Black heritage.",
    quote:
      "Albums like 'Lemonade' and 'Renaissance' have transformed popular culture while exploring themes of Southern Black womanhood, resilience, and empowerment.",
    imageUrl: "/stage-presence.png",
    spotifyUrl: "https://open.spotify.com/artist/6vWDO969PvNqNYHIOW5v0m",
    appleMusicUrl: "https://music.apple.com/us/artist/beyonc%C3%A9/1419227",
    youtubeUrl: "https://www.youtube.com/channel/UCuHzBCaKmtaLcRAOoazhCPA",
    featuredSong: {
      title: "Formation",
      album: "Lemonade",
      year: "2016",
    },
  },
  {
    id: 2,
    name: "Janelle Monáe",
    description:
      "Singer, actress, and visionary artist whose Afrofuturistic aesthetic and boundary-pushing music challenge conventions while honoring Black cultural traditions.",
    quote:
      "Through concept albums and films, she has created new spaces for Black expression that blend past, present, and future.",
    imageUrl: "/placeholder.svg?height=800&width=600&query=janelle+monae+performing",
    spotifyUrl: "https://open.spotify.com/artist/6ueGR6SWhUJfvEhqkvQvJr",
    appleMusicUrl: "https://music.apple.com/us/artist/janelle-mon%C3%A1e/278750226",
    youtubeUrl: "https://www.youtube.com/channel/UCPsUIP8TMsoZKdIUFK30Rrg",
    featuredSong: {
      title: "Make Me Feel",
      album: "Dirty Computer",
      year: "2018",
    },
  },
  {
    id: 3,
    name: "Lizzo",
    description:
      "Grammy-winning artist who blends genres and celebrates body positivity, self-love, and empowerment through her music and public presence.",
    quote:
      "Her blend of hip-hop, R&B, and soul, combined with her classically trained flute skills, creates a unique sound that resonates with audiences worldwide.",
    imageUrl: "/placeholder.svg?height=800&width=600&query=lizzo+performing",
    spotifyUrl: "https://open.spotify.com/artist/56oDRnqbIiwx4mA1CIZsmQ",
    appleMusicUrl: "https://music.apple.com/us/artist/lizzo/472949623",
    youtubeUrl: "https://www.youtube.com/channel/UCXVMHu5xDH1oAHtS0KlKpZA",
    featuredSong: {
      title: "Truth Hurts",
      album: "Cuz I Love You",
      year: "2019",
    },
  },
]

export default function FeaturedArtistShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredArtists.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredArtists.length) % featuredArtists.length)
  }

  const currentArtist = featuredArtists[currentIndex]

  return (
    <section className="py-20 bg-midnight-blue/5">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
          Featured Artists
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArtist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src={currentArtist.imageUrl || "/placeholder.svg"}
                    alt={currentArtist.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent flex items-end">
                    <div className="p-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <Button
                          size="icon"
                          className="h-12 w-12 rounded-full bg-rich-gold text-midnight-blue hover:bg-rich-gold/90"
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                        <div>
                          <h4 className="text-magnolia-white font-bold">{currentArtist.featuredSong.title}</h4>
                          <p className="text-magnolia-white/70 text-sm">
                            {currentArtist.featuredSong.album} ({currentArtist.featuredSong.year})
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="font-playfair text-3xl font-bold mb-4 text-midnight-blue">{currentArtist.name}</h3>
                <p className="text-midnight-teal mb-6">{currentArtist.description}</p>
                <blockquote className="border-l-4 border-rich-gold pl-4 mb-8 italic text-midnight-teal">
                  {currentArtist.quote}
                </blockquote>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white"
                    onClick={() => window.open(currentArtist.spotifyUrl, "_blank")}
                  >
                    <Image
                      src="/placeholder.svg?height=20&width=20&query=spotify+icon+white"
                      alt="Spotify"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Spotify
                  </Button>
                  <Button
                    className="bg-[#FB233B] hover:bg-[#FB233B]/90 text-white"
                    onClick={() => window.open(currentArtist.appleMusicUrl, "_blank")}
                  >
                    <Image
                      src="/placeholder.svg?height=20&width=20&query=apple+music+icon+white"
                      alt="Apple Music"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Apple Music
                  </Button>
                  <Button
                    className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white"
                    onClick={() => window.open(currentArtist.youtubeUrl, "_blank")}
                  >
                    <Image
                      src="/placeholder.svg?height=20&width=20&query=youtube+icon+white"
                      alt="YouTube"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    YouTube
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-midnight-blue/10 hover:bg-midnight-blue/20 text-midnight-blue rounded-full h-12 w-12"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous artist</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-midnight-blue/10 hover:bg-midnight-blue/20 text-midnight-blue rounded-full h-12 w-12"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next artist</span>
          </Button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {featuredArtists.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-rich-gold w-8" : "bg-midnight-blue/20"
              }`}
              aria-label={`Go to artist ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
