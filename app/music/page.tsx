import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"
import MusicPlatformSection from "@/components/MusicPlatformSection"
import FeaturedArtistShowcase from "@/components/FeaturedArtistShowcase"
import MusicInspirationSection from "@/components/MusicInspirationSection"

export const metadata: Metadata = {
  title: "Music Inspirations | Midnight Magnolia",
  description:
    "Explore the musical influences that inspire Midnight Magnolia's creative vision, featuring Southern artists across YouTube, Spotify, and Apple Music.",
}

export default function MusicPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-midnight-blue text-magnolia-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/southern-vinyl-collection.png" alt="Music Inspiration" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Musical Inspirations</h1>
            <p className="text-lg md:text-xl text-magnolia-white/80 mb-8">
              Discover the artists and sounds that inspire our creative vision and celebrate the rich musical heritage
              of the South.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                Explore Playlists
              </Button>
              <Button size="lg" variant="outline" className="border-rich-gold text-rich-gold hover:bg-rich-gold/10">
                Featured Artists
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artist Showcase */}
      <FeaturedArtistShowcase />

      {/* Platform Tabs Section */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Listen on Your Favorite Platform
          </h2>

          <Tabs defaultValue="spotify" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-midnight-blue/10">
                <TabsTrigger
                  value="spotify"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Spotify
                </TabsTrigger>
                <TabsTrigger
                  value="apple-music"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Apple Music
                </TabsTrigger>
                <TabsTrigger
                  value="youtube"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  YouTube
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="spotify">
              <MusicPlatformSection platform="spotify" />
            </TabsContent>

            <TabsContent value="apple-music">
              <MusicPlatformSection platform="apple-music" />
            </TabsContent>

            <TabsContent value="youtube">
              <MusicPlatformSection platform="youtube" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Music Inspiration Section */}
      <MusicInspirationSection />

      {/* CTA Section */}
      <section className="py-16 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Share Your Musical Inspirations</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto mb-8">
            We'd love to hear about the artists and songs that inspire your creative journey. Join our community and
            share your musical influences.
          </p>
          <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
            Join the Conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
