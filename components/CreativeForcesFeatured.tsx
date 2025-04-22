"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { sampleTracks } from "@/lib/sample-tracks"
import TrackPlayButton from "@/components/TrackPlayButton"

interface CreativeForcesFeaturedProps {
  onPlayArtist?: (artistName: string) => void
}

const artists = [
  {
    name: "Beyoncé",
    image: "/placeholder.svg?height=600&width=400&query=Beyonce+performing",
    description:
      "A cultural icon whose work celebrates Black excellence and Southern roots. Her album 'Lemonade' is a powerful exploration of heritage and identity.",
    impact:
      "Beyoncé's visual storytelling and business acumen inspire Midnight Magnolia's approach to both creative expression and entrepreneurship.",
    spotifyUrl: "https://open.spotify.com/artist/6vWDO969PvNqNYHIOW5v0m",
    appleUrl: "https://music.apple.com/us/artist/beyonc%C3%A9/1419227",
    youtubeUrl: "https://www.youtube.com/channel/UCuHzBCaKmtaLcRAOoazhCPA",
  },
  {
    name: "SZA",
    image: "/placeholder.svg?height=600&width=400&query=SZA+performing",
    description:
      "A soulful voice whose vulnerable lyrics explore themes of self-discovery, healing, and growth that resonate deeply with our brand values.",
    impact:
      "SZA's authenticity and willingness to share her journey inspires our approach to storytelling and connecting with our community.",
    spotifyUrl: "https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHyP",
    appleUrl: "https://music.apple.com/us/artist/sza/605800394",
    youtubeUrl: "https://www.youtube.com/channel/UCi8DXQILFgvUgTrudnXJ2Gg",
  },
  {
    name: "Janelle Monáe",
    image: "/placeholder.svg?height=600&width=400&query=Janelle+Monae+performing",
    description:
      "A visionary artist whose futuristic aesthetic and boundary-pushing creativity embodies our belief in technology as liberation.",
    impact:
      "Monáe's innovative approach to genre-blending and storytelling influences our cross-disciplinary approach to creative services.",
    spotifyUrl: "https://open.spotify.com/artist/6ueGR6SWhUJfvEhqkvQvJr",
    appleUrl: "https://music.apple.com/us/artist/janelle-mon%C3%A1e/281607534",
    youtubeUrl: "https://www.youtube.com/channel/UCPsUU5HHFQXcXXU3lSXbDcw",
  },
  {
    name: "Solange",
    image: "/placeholder.svg?height=600&width=400&query=Solange+performing",
    description:
      "An artist whose work celebrates Black womanhood and creates immersive visual and sonic experiences that honor cultural heritage.",
    impact:
      "Solange's dedication to artistic integrity and cultural preservation inspires our commitment to authentic storytelling.",
    spotifyUrl: "https://open.spotify.com/artist/2auiVi8sUZo17dLy1HwrTU",
    appleUrl: "https://music.apple.com/us/artist/solange/1326312",
    youtubeUrl: "https://www.youtube.com/channel/UCZqwA3RC0gWtdUbZUwX9_xg",
  },
  {
    name: "Jill Scott",
    image: "/placeholder.svg?height=600&width=400&query=Jill+Scott+performing",
    description:
      "A soulful poet whose rich vocals and lyrical depth celebrate the everyday experiences of Black women with grace and wisdom.",
    impact:
      "Scott's poetic approach to storytelling influences our brand voice and commitment to finding beauty in everyday moments.",
    spotifyUrl: "https://open.spotify.com/artist/1Wd97nSD0wKRL8L1MevkPl",
    appleUrl: "https://music.apple.com/us/artist/jill-scott/74643",
    youtubeUrl: "https://www.youtube.com/channel/UCMFGTwzBwZ_GnpVU8TxJ2YA",
  },
  {
    name: "Erykah Badu",
    image: "/placeholder.svg?height=600&width=400&query=Erykah+Badu+performing",
    description:
      "A neo-soul pioneer whose spiritual depth and artistic innovation have created a blueprint for authentic creative expression.",
    impact:
      "Badu's fearless individuality and holistic approach to artistry inspire our integration of wellness and creativity.",
    spotifyUrl: "https://open.spotify.com/artist/7IfculRW2WXyzNQ8djX8WX",
    appleUrl: "https://music.apple.com/us/artist/erykah-badu/772991",
    youtubeUrl: "https://www.youtube.com/channel/UCF3Kh1GP_FxfgkLyJS_TG0Q",
  },
]

export default function CreativeForcesFeatured({ onPlayArtist }: CreativeForcesFeaturedProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextArtist = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length)
  }

  const prevArtist = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + artists.length) % artists.length)
  }

  const currentArtist = artists[currentIndex]
  const artistTrack = sampleTracks.find((track) => track.artist.includes(currentArtist.name))

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-playfair text-midnight-blue mb-8">Featured Artists</h2>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="relative aspect-[3/4] md:aspect-auto md:h-[500px] overflow-hidden rounded-lg">
              <Image
                src={currentArtist.image || "/placeholder.svg"}
                alt={currentArtist.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-playfair text-magnolia-white mb-2">{currentArtist.name}</h3>
                <div className="flex space-x-3">
                  <a
                    href={currentArtist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rich-gold hover:text-rich-gold/80 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </a>
                  <a
                    href={currentArtist.appleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rich-gold hover:text-rich-gold/80 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.448 3.208c-.207.51-.332 1.04-.39 1.58-.08.668-.075 1.34-.076 2.01v10.4c.005.7.03 1.4.11 2.097.08.734.216 1.447.51 2.125.508 1.188 1.31 2.077 2.45 2.67.572.3 1.174.48 1.813.55.5.048 1.006.057 1.51.057h10.11c.525-.004 1.05-.023 1.568-.1.823-.13 1.597-.396 2.28-.934.778-.616 1.328-1.426 1.664-2.4.066-.19.12-.39.178-.583.142-.477.188-.967.205-1.46.037-1.12.023-2.243.024-3.363V8.432c0-.774.003-1.55-.037-2.32zm-1.42 12.233c-.01.57-.037 1.14-.15 1.7-.14.703-.437 1.32-.988 1.803-.55.482-1.2.752-1.92.865-.4.06-.813.09-1.222.093-.778.01-1.556.01-2.333.01H8.16c-.48-.003-.96-.003-1.44-.026-.56-.026-1.1-.093-1.63-.27-1.05-.347-1.87-1.022-2.268-2.1-.13-.366-.19-.746-.21-1.133-.03-.57-.032-1.14-.035-1.71v-3.6-5.624c.006-.61.02-1.22.082-1.825.1-.944.436-1.76 1.22-2.368.576-.444 1.24-.7 1.963-.823.33-.053.67-.082 1.01-.09.845-.022 1.69-.025 2.534-.02h6.964c.59.003 1.18.02 1.77.05.813.043 1.594.208 2.29.65.84.533 1.354 1.3 1.604 2.236.102.386.14.78.158 1.182.026.52.026 1.04.026 1.562v10.12c0 .406-.018.81-.05 1.214z" />
                      <path d="M16.884 8.074c-.586-.757-1.414-1.152-2.34-1.34-.608-.124-1.22-.16-1.838-.162-.568-.003-1.136.016-1.7.076-.88.095-1.725.33-2.45.86-.865.63-1.43 1.48-1.608 2.543-.09.54-.082 1.09-.065 1.632.026.74.14 1.463.48 2.12.476.92 1.195 1.55 2.14 1.913.776.3 1.588.387 2.413.387.358 0 .716-.013 1.075-.013.466 0 .93.018 1.39-.07.86-.16 1.65-.52 2.32-1.133.505-.462.85-1.033 1.08-1.674.266-.738.346-1.502.346-2.28-.003-.95-.146-1.894-.65-2.77-.046-.08-.096-.16-.15-.24zm-4.21 5.138c-.694-.005-1.326-.274-1.825-.79-.512-.527-.79-1.18-.797-1.91-.007-.71.25-1.33.73-1.843.477-.506 1.077-.784 1.77-.796.693-.01 1.323.26 1.827.77.507.514.785 1.16.796 1.89.01.72-.245 1.344-.72 1.865-.477.52-1.082.8-1.78.815z" />
                    </svg>
                  </a>
                  <a
                    href={currentArtist.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rich-gold hover:text-rich-gold/80 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg font-lora text-midnight-teal mb-6">{currentArtist.description}</p>
                <h4 className="text-xl font-playfair text-midnight-blue mb-3">Impact on Midnight Magnolia</h4>
                <p className="font-lora text-midnight-teal mb-8">{currentArtist.impact}</p>
              </div>

              {artistTrack && (
                <Card className="bg-midnight-blue/5 border-midnight-teal/20">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-playfair text-midnight-blue mb-3">Featured Song</h4>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={artistTrack.albumArt || "/placeholder.svg"}
                          alt={artistTrack.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-midnight-blue">{artistTrack.title}</p>
                        <p className="text-sm text-midnight-teal">{artistTrack.artist}</p>
                      </div>
                    </div>

                    <TrackPlayButton track={artistTrack} />
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-midnight-blue/30 text-magnolia-white hover:bg-midnight-blue/50 z-10"
          onClick={prevArtist}
        >
          <ChevronLeft size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-midnight-blue/30 text-magnolia-white hover:bg-midnight-blue/50 z-10"
          onClick={nextArtist}
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {artists.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-rich-gold" : "bg-midnight-blue/20"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}
