"use client"
import CreativeForcesFeatured from "@/components/CreativeForcesFeatured"
import MusicInspirationSection from "@/components/MusicInspirationSection"
import PlaylistCollection from "@/components/PlaylistCollection"
import { sampleTracks } from "@/lib/sample-tracks"
import { usePlayTrack } from "@/hooks/usePlayTrack"

export default function CreativeForcesClientPage() {
  const { play, addToPlayerQueue } = usePlayTrack()

  // Add play functionality to the Creative Forces page
  const handlePlayArtistTrack = (artistName: string) => {
    const track = sampleTracks.find((track) => track.artist.includes(artistName))
    if (track) {
      play(track)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-playfair text-midnight-blue mb-2">Creative Forces</h1>
      <p className="text-lg md:text-xl font-lora text-midnight-teal mb-12">
        The artists who inspire Midnight Magnolia's vision and aesthetic
      </p>

      <CreativeForcesFeatured onPlayArtist={handlePlayArtistTrack} />
      <MusicInspirationSection />
      <PlaylistCollection />

      <div className="mt-12 text-center">
        <p className="text-lg font-lora text-midnight-teal mb-4">Explore our full music player experience</p>
        <a
          href="/music-player-demo"
          className="inline-block px-6 py-3 bg-rich-gold text-magnolia-white font-medium rounded-md hover:bg-rich-gold/90 transition-colors"
        >
          Try the Music Player Demo
        </a>
      </div>
    </div>
  )
}
