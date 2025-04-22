"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface YouTubeEmbedProps {
  videoId: string
  title?: string
}

export default function YouTubeEmbed({ videoId, title = "YouTube video" }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-midnight-blue/10">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-rich-gold/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-rich-gold"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
                <p className="mt-2 text-midnight-teal">Loading video...</p>
              </div>
            </div>
          )}
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
            className="absolute inset-0"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  )
}
