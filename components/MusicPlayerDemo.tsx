"use client"
import { sampleTracks } from "@/lib/sample-tracks"
import TrackPlayButton from "@/components/TrackPlayButton"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MusicPlayerDemo() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-playfair text-midnight-blue mb-2">Creative Forces Music Player</h1>
        <p className="text-lg md:text-xl font-lora text-midnight-teal mb-8">
          Experience the sounds that inspire Midnight Magnolia
        </p>

        <div className="bg-gradient-to-r from-midnight-blue/10 to-sage-green/10 p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-playfair text-midnight-blue mb-4">How to Use the Music Player</h2>
          <div className="space-y-2 font-lora">
            <p>1. Click "Play" on any track to start listening</p>
            <p>2. Click "Add to Queue" to add a track to your playlist</p>
            <p>3. The player will persist as you browse the site</p>
            <p>4. Expand the player to see your queue and more details</p>
          </div>
        </div>

        <Tabs defaultValue="featured" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="featured">Featured Artists</TabsTrigger>
            <TabsTrigger value="playlists">Curated Playlists</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleTracks.map((track) => (
                <Card
                  key={track.id}
                  className="overflow-hidden border-midnight-teal/30 hover:border-rich-gold/50 transition-colors"
                >
                  <div className="relative aspect-square">
                    <Image src={track.albumArt || "/placeholder.svg"} alt={track.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-playfair text-midnight-blue">{track.title}</CardTitle>
                    <CardDescription className="font-lora">{track.artist}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <TrackPlayButton track={track} />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-midnight-teal/30 hover:border-rich-gold/50 transition-colors">
                <CardHeader>
                  <CardTitle className="font-playfair text-midnight-blue">Southern Roots Playlist</CardTitle>
                  <CardDescription className="font-lora">
                    A collection of songs celebrating Southern heritage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=96&width=96&query=southern+roots+playlist"
                        alt="Southern Roots Playlist"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-midnight-teal">12 tracks • 45 minutes</p>
                      <p className="text-xs text-midnight-teal/70 mt-1">Featuring Beyoncé, Solange, and more</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <TrackPlayButton track={sampleTracks[0]} variant="outline" showAddToQueue={false} />
                </CardFooter>
              </Card>

              <Card className="border-midnight-teal/30 hover:border-rich-gold/50 transition-colors">
                <CardHeader>
                  <CardTitle className="font-playfair text-midnight-blue">Resilience & Strength</CardTitle>
                  <CardDescription className="font-lora">Songs that embody the magnolia's strength</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=96&width=96&query=resilience+strength+playlist"
                        alt="Resilience & Strength Playlist"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-midnight-teal">10 tracks • 38 minutes</p>
                      <p className="text-xs text-midnight-teal/70 mt-1">Featuring SZA, Jill Scott, and more</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <TrackPlayButton track={sampleTracks[1]} variant="outline" showAddToQueue={false} />
                </CardFooter>
              </Card>

              <Card className="border-midnight-teal/30 hover:border-rich-gold/50 transition-colors">
                <CardHeader>
                  <CardTitle className="font-playfair text-midnight-blue">Creative Expression</CardTitle>
                  <CardDescription className="font-lora">Music to inspire your creative process</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=96&width=96&query=creative+expression+playlist"
                        alt="Creative Expression Playlist"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-midnight-teal">15 tracks • 52 minutes</p>
                      <p className="text-xs text-midnight-teal/70 mt-1">
                        Featuring Janelle Monáe, Erykah Badu, and more
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <TrackPlayButton track={sampleTracks[2]} variant="outline" showAddToQueue={false} />
                </CardFooter>
              </Card>

              <Card className="border-midnight-teal/30 hover:border-rich-gold/50 transition-colors">
                <CardHeader>
                  <CardTitle className="font-playfair text-midnight-blue">Digital Liberation</CardTitle>
                  <CardDescription className="font-lora">Sounds for the digital entrepreneur</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=96&width=96&query=digital+liberation+playlist"
                        alt="Digital Liberation Playlist"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-midnight-teal">8 tracks • 32 minutes</p>
                      <p className="text-xs text-midnight-teal/70 mt-1">Modern beats for focused work</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <TrackPlayButton track={sampleTracks[3]} variant="outline" showAddToQueue={false} />
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
