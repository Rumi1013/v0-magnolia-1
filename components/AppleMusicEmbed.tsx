"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface AppleMusicEmbedProps {
  appleMusicId: string
  type: "album" | "playlist" | "song"
  height?: number
}

export default function AppleMusicEmbed({ appleMusicId, type, height = 450 }: AppleMusicEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative" style={{ height: `${height}px` }}>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-midnight-blue/10">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-[#FB233B]/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#FB233B]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
                <p className="mt-2 text-midnight-teal">Loading Apple Music...</p>
              </div>
            </div>
          )}
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder="0"
            height="100%"
            width="100%"
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              background: "transparent",
            }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={`https://embed.music.apple.com/us/${type}/${appleMusicId}`}
            onLoad={() => setIsLoaded(true)}
            className="absolute inset-0"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  )
}
