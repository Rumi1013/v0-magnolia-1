"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface SpotifyEmbedProps {
  spotifyId: string
  type: "track" | "album" | "playlist" | "artist"
  height?: number
}

export default function SpotifyEmbed({ spotifyId, type, height = 380 }: SpotifyEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative" style={{ height: `${height}px` }}>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-midnight-blue/10">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#1DB954]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
                <p className="mt-2 text-midnight-teal">Loading Spotify...</p>
              </div>
            </div>
          )}
          <iframe
            src={`https://open.spotify.com/embed/${type}/${spotifyId}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className="absolute inset-0"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  )
}
