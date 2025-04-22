"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, Heart, Share2 } from "lucide-react"
import { fetchMusicData } from "@/lib/music-api"
import type { Artist, Album, Playlist } from "@/types/music"

interface MusicPlatformSectionProps {
  platform: "spotify" | "apple-music" | "youtube"
}

export default function MusicPlatformSection({ platform }: MusicPlatformSectionProps) {
  const [artists, setArtists] = useState<Artist[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadMusicData = async () => {
      try {
        setLoading(true)
        // In a real implementation, this would fetch from actual APIs
        // For now, we'll use mock data from our utility function
        const data = await fetchMusicData(platform)
        setArtists(data.artists)
        setPlaylists(data.playlists)
        setAlbums(data.albums)
        setError("")
      } catch (err) {
        console.error(`Error loading ${platform} data:`, err)
        setError(`Failed to load ${platform} data. Please try again later.`)
      } finally {
        setLoading(false)
      }
    }

    loadMusicData()
  }, [platform])

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rich-gold"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-midnight-teal mb-4">{error}</p>
        <Button
          variant="outline"
          className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-16">
      {/* Artists Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-playfair text-2xl font-bold text-midnight-blue">Favorite Artists</h3>
          <Button
            variant="outline"
            className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
          >
            View All Artists
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <Card key={artist.id} className="overflow-hidden h-full flex flex-col border-rich-gold/20">
              <div className="relative aspect-square">
                <Image
                  src={artist.imageUrl || "/placeholder.svg?height=400&width=400&query=music+artist"}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${platformColors[platform]} opacity-40 hover:opacity-60 transition-opacity duration-300`}
                ></div>
                <div className="absolute top-4 right-4">
                  <div className="relative h-8 w-8">
                    <Image
                      src={platformIcons[platform] || "/placeholder.svg"}
                      alt={platformNames[platform]}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="font-playfair text-lg">{artist.name}</CardTitle>
                <CardDescription>{artist.genre}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 mt-auto">
                <Button
                  className={`w-full bg-gradient-to-r ${platformColors[platform]} text-white hover:opacity-90`}
                  onClick={() => window.open(artist.url, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Listen on {platformNames[platform]}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Playlists Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-playfair text-2xl font-bold text-midnight-blue">Curated Playlists</h3>
          <Button
            variant="outline"
            className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
          >
            View All Playlists
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="overflow-hidden h-full flex flex-col border-rich-gold/20">
              <div className="relative aspect-video">
                <Image
                  src={playlist.imageUrl || "/placeholder.svg?height=400&width=600&query=music+playlist"}
                  alt={playlist.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-transparent to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-between items-center">
                      <Button
                        size="icon"
                        className="h-10 w-10 rounded-full bg-rich-gold text-midnight-blue hover:bg-rich-gold/90"
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          size="icon"
                          className="h-8 w-8 rounded-full bg-midnight-blue/50 text-white hover:bg-midnight-blue/70"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
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
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`bg-gradient-to-r ${platformColors[platform]} text-white border-none`}>
                    {platformNames[platform]}
                  </Badge>
                  <CardDescription>{playlist.trackCount} tracks</CardDescription>
                </div>
                <CardTitle className="font-playfair">{playlist.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-midnight-teal line-clamp-2">{playlist.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 mt-auto">
                <Button
                  variant="outline"
                  className="w-full border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                  onClick={() => window.open(playlist.url, "_blank")}
                >
                  Open Playlist
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Albums Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-playfair text-2xl font-bold text-midnight-blue">Essential Albums</h3>
          <Button
            variant="outline"
            className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
          >
            View All Albums
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {albums.map((album) => (
            <Card key={album.id} className="overflow-hidden h-full flex flex-col border-rich-gold/20">
              <div className="relative aspect-square">
                <Image
                  src={album.imageUrl || "/placeholder.svg?height=400&width=400&query=music+album+cover"}
                  alt={album.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-rich-gold text-midnight-blue hover:bg-rich-gold/90"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="font-playfair text-base">{album.name}</CardTitle>
                <CardDescription>{album.artist}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-midnight-teal hover:text-rich-gold"
                  onClick={() => window.open(album.url, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Listen
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
