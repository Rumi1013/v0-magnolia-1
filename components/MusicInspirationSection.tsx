import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function MusicInspirationSection() {
  return (
    <section className="py-20 bg-midnight-blue text-magnolia-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-center">
          How Music Inspires Our Brand Narratives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Transformation Story",
              description:
                "Just as artists evolve through their careers, our brand celebrates personal transformation and growth through challenges to entrepreneurship.",
              image: "/placeholder.svg?height=400&width=600&query=musical+transformation+journey",
            },
            {
              title: "Resilience & Strength",
              description:
                "Like the magnolia tree that withstands storms, our featured artists demonstrate resilience through their music and public presence.",
              image: "/placeholder.svg?height=400&width=600&query=resilient+black+women+musicians",
            },
            {
              title: "Technology as Liberation",
              description:
                "Today's artists leverage digital tools to create, distribute, and connect, inspiring our approach to using technology for creative freedom.",
              image: "/placeholder.svg?height=400&width=600&query=digital+music+production+studio",
            },
            {
              title: "Community & Collective Rise",
              description:
                "Music brings people together, and our featured artists build communities that lift others through knowledge sharing and collaboration.",
              image: "/placeholder.svg?height=400&width=600&query=music+community+collaboration",
            },
          ].map((item, index) => (
            <Card key={index} className="bg-midnight-teal border-rich-gold/20 h-full flex flex-col">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="font-playfair text-xl text-magnolia-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-magnolia-white/80">{item.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="font-playfair text-2xl font-bold mb-6">Our Creative Process Playlist</h3>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto mb-8">
            This curated collection of songs accompanies us during our creative process, from brainstorming to final
            execution. Each track has been selected to inspire different aspects of creativity.
          </p>
          <div className="flex justify-center">
            <iframe
              className="rounded-lg shadow-lg"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
