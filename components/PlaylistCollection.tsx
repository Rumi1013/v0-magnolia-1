"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink, Share2 } from "lucide-react"

// Playlist data organized by category
const playlists = {
  inspiration: [
    {
      id: 1,
      title: "Creative Workflow",
      description: "Music to fuel your creative process and entrepreneurial journey.",
      trackCount: 25,
      duration: "1 hr 45 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=creative+workflow+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
      appleMusicUrl: "https://music.apple.com/us/playlist/creative-workflow/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "spotify",
    },
    {
      id: 2,
      title: "Digital Entrepreneur Vibes",
      description: "Upbeat tracks to keep you motivated while building your digital empire.",
      trackCount: 18,
      duration: "1 hr 12 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=entrepreneur+motivation+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX8dTWjpijlub",
      appleMusicUrl: "https://music.apple.com/us/playlist/entrepreneur-vibes/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "apple-music",
    },
    {
      id: 3,
      title: "Brand Development Soundscape",
      description: "Ambient sounds to enhance focus while developing your brand identity.",
      trackCount: 32,
      duration: "2 hr 20 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=ambient+focus+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY",
      appleMusicUrl: "https://music.apple.com/us/playlist/ambient-focus/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "youtube",
    },
  ],
  southern: [
    {
      id: 4,
      title: "Southern Roots",
      description: "A celebration of musical traditions from the American South.",
      trackCount: 22,
      duration: "1 hr 30 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=southern+roots+music+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX58NJL8plPdz",
      appleMusicUrl: "https://music.apple.com/us/playlist/southern-roots/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "spotify",
    },
    {
      id: 5,
      title: "Magnolia Nights",
      description: "Soulful evening sounds inspired by warm Southern nights.",
      trackCount: 15,
      duration: "58 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=southern+night+soul+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXbcPC6Vvqudd",
      appleMusicUrl: "https://music.apple.com/us/playlist/magnolia-nights/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "apple-music",
    },
    {
      id: 6,
      title: "Heritage Beats",
      description: "Modern sounds influenced by Southern musical traditions.",
      trackCount: 20,
      duration: "1 hr 15 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=modern+southern+beats+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX4SBhb3fqCJd",
      appleMusicUrl: "https://music.apple.com/us/playlist/heritage-beats/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "youtube",
    },
  ],
  resilience: [
    {
      id: 7,
      title: "Strength Through Sound",
      description: "Powerful anthems celebrating resilience and inner strength.",
      trackCount: 18,
      duration: "1 hr 10 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=strength+anthems+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX4eRPd9frC1m",
      appleMusicUrl: "https://music.apple.com/us/playlist/strength-through-sound/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "spotify",
    },
    {
      id: 8,
      title: "Magnolia's Resilience",
      description: "Songs that embody the strength of the magnolia tree that withstands storms.",
      trackCount: 24,
      duration: "1 hr 32 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=resilience+strength+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS",
      appleMusicUrl: "https://music.apple.com/us/playlist/magnolias-resilience/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "apple-music",
    },
    {
      id: 9,
      title: "Through Our Eyes",
      description: "Music that speaks to the experiences of Black women's resilience and strength.",
      trackCount: 20,
      duration: "1 hr 25 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=black+women+resilience+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX6XE7HRLM75P",
      appleMusicUrl: "https://music.apple.com/us/playlist/through-our-eyes/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "youtube",
    },
  ],
  transformation: [
    {
      id: 10,
      title: "Journey of Change",
      description: "Tracks that inspire personal transformation and growth.",
      trackCount: 22,
      duration: "1 hr 28 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=transformation+journey+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX9XIFQuFvzM4",
      appleMusicUrl: "https://music.apple.com/us/playlist/journey-of-change/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "spotify",
    },
    {
      id: 11,
      title: "Digital Liberation",
      description: "Music that celebrates technology as a pathway to freedom and creativity.",
      trackCount: 16,
      duration: "1 hr 5 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=digital+freedom+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX0kbJZpiYdZl",
      appleMusicUrl: "https://music.apple.com/us/playlist/digital-liberation/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "apple-music",
    },
    {
      id: 12,
      title: "Midnight Metamorphosis",
      description: "A sonic journey through transformation, from darkness to light.",
      trackCount: 25,
      duration: "1 hr 40 min",
      imageUrl: "/placeholder.svg?height=600&width=600&query=metamorphosis+journey+playlist",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
      appleMusicUrl: "https://music.apple.com/us/playlist/midnight-metamorphosis/pl.u-AkAmPPNFB7jbLp",
      youtubeUrl: "https://youtube.com/playlist?list=PLSdoVPM5WnndV_AyG3eQ_iMbC9ZZkzUkW",
      platform: "youtube",
    },
  ],
}

interface PlaylistCollectionProps {
  category: keyof typeof playlists
  title: string
  description: string
}

export default function PlaylistCollection({ category, title, description }: PlaylistCollectionProps) {
  const platformColors = {
    spotify: "from-green-600 to-green-800",
    "apple-music": "from-pink-600 to-pink-800",
    youtube: "from-red-600 to-red-800",
  }

  const platformIcons = {
    spotify: "/spotify-logo-on-dark-background.png",
    "apple-music": "/stylized-music-note.png",
    youtube: "/youtube-play-button.png",
  }

  const platformNames = {
    spotify: "Spotify",
    "apple-music": "Apple Music",
    youtube: "YouTube",
  }

  return (
    <div>
      <p className="text-midnight-teal max-w-2xl mx-auto text-center mb-12">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {playlists[category].map((playlist) => (
          <Card key={playlist.id} className="overflow-hidden h-full flex flex-col border-rich-gold/20">
            <div className="relative aspect-square">
              <Image src={playlist.imageUrl || "/placeholder.svg"} alt={playlist.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-transparent to-transparent flex items-end">
                <div className="p-4 w-full">
                  <div className="flex justify-between items-center">
                    <Button
                      size="icon"
                      className="h-10 w-10 rounded-full bg-rich-gold text-midnight-blue hover:bg-rich-gold/90"
                      onClick={() => {
                        let url = playlist.spotifyUrl
                        if (playlist.platform === "apple-music") url = playlist.appleMusicUrl
                        if (playlist.platform === "youtube") url = playlist.youtubeUrl
                        window.open(url, "_blank")
                      }}
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                    <div className="flex space-x-2">
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-midnight-blue/50 text-white hover:bg-midnight-blue/70"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="relative h-8 w-8">
                  <Image
                    src={platformIcons[playlist.platform as keyof typeof platformIcons] || "/placeholder.svg"}
                    alt={platformNames[playlist.platform as keyof typeof platformNames]}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge
                  className={`bg-gradient-to-r ${
                    platformColors[playlist.platform as keyof typeof platformColors]
                  } text-white border-none`}
                >
                  {platformNames[playlist.platform as keyof typeof platformNames]}
                </Badge>
                <CardDescription>{playlist.trackCount} tracks</CardDescription>
              </div>
              <CardTitle className="font-playfair">{playlist.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-midnight-teal line-clamp-2">{playlist.description}</p>
              <p className="text-midnight-teal/70 text-sm mt-2">{playlist.duration}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
              <Button
                className={`w-full bg-gradient-to-r ${
                  platformColors[playlist.platform as keyof typeof platformColors]
                } text-white hover:opacity-90`}
                onClick={() => {
                  let url = playlist.spotifyUrl
                  if (playlist.platform === "apple-music") url = playlist.appleMusicUrl
                  if (playlist.platform === "youtube") url = playlist.youtubeUrl
                  window.open(url, "_blank")
                }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in {platformNames[playlist.platform as keyof typeof platformNames]}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
