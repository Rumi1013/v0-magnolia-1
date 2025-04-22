import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, ArrowRight, Headphones, Bookmark, Share2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export const metadata: Metadata = {
  title: "Podcast | Midnight Magnolia",
  description:
    "Listen to our podcast exploring Southern heritage, digital creativity, and the stories of resilient Black women who have shaped history and culture.",
}

// Podcast episodes data
const podcastEpisodes = [
  {
    id: 1,
    title: "The Resilience of Southern Magnolias",
    description:
      "Exploring the symbolism of the magnolia tree in Southern culture and how it represents the strength and beauty of Black women throughout history.",
    duration: "42:18",
    date: "May 15, 2025",
    image: "/blooming-magnolia-podcast.png",
    category: "Heritage",
    featured: true,
    audioSrc: "/podcast-episode-1.mp3",
  },
  {
    id: 2,
    title: "Digital Entrepreneurship: Blazing New Trails",
    description:
      "A conversation with three successful Black women entrepreneurs about how they've leveraged digital tools to build thriving businesses while honoring their Southern roots.",
    duration: "56:42",
    date: "May 1, 2025",
    image: "/podcast-growth.png",
    category: "Business",
    featured: false,
    audioSrc: "/podcast-episode-2.mp3",
  },
  {
    id: 3,
    title: "Healing Through Creativity: The Southern Way",
    description:
      "Exploring traditional and modern creative practices that have helped Southern communities heal from trauma and build resilience across generations.",
    duration: "38:55",
    date: "April 15, 2025",
    image: "/blossoming-healing.png",
    category: "Wellness",
    featured: false,
    audioSrc: "/podcast-episode-3.mp3",
  },
  {
    id: 4,
    title: "Southern Gothic Aesthetics in Modern Design",
    description:
      "How the haunting beauty of Southern Gothic imagery is influencing contemporary design, fashion, and digital art.",
    duration: "45:30",
    date: "April 1, 2025",
    image: "/whispering-willows-podcast.png",
    category: "Design",
    featured: true,
    audioSrc: "/podcast-episode-4.mp3",
  },
  {
    id: 5,
    title: "Reclaiming Our Narratives: Southern Storytelling",
    description:
      "The power of storytelling in preserving history and shaping identity, featuring renowned Southern authors and oral historians.",
    duration: "51:22",
    date: "March 15, 2025",
    image: "/porch-tales.png",
    category: "Heritage",
    featured: false,
    audioSrc: "/podcast-episode-5.mp3",
  },
  {
    id: 6,
    title: "Tech Innovations Rooted in Southern Wisdom",
    description:
      "How traditional Southern approaches to community, sustainability, and resourcefulness are informing cutting-edge technology solutions.",
    duration: "47:15",
    date: "March 1, 2025",
    image: "/placeholder.svg?height=600&width=600&query=technology+southern+wisdom+podcast",
    category: "Technology",
    featured: false,
    audioSrc: "/podcast-episode-6.mp3",
  },
]

// Podcast categories
const categories = ["All", "Heritage", "Business", "Wellness", "Design", "Technology"]

export default function PodcastPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-midnight-blue text-magnolia-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=1080&width=1920&query=podcast+studio+southern+gothic"
            alt="Podcast Studio"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Midnight Magnolia Podcast</h1>
            <p className="text-lg md:text-xl text-magnolia-white/80 mb-8">
              Conversations exploring Southern heritage, digital creativity, and the stories of resilient Black women
              who have shaped history and culture.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                <Headphones className="mr-2 h-5 w-5" />
                Subscribe Now
              </Button>
              <Button size="lg" variant="outline" className="border-rich-gold text-rich-gold hover:bg-rich-gold/10">
                View All Episodes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episodes */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Featured Episodes
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {podcastEpisodes
              .filter((episode) => episode.featured)
              .map((episode) => (
                <Card key={episode.id} className="overflow-hidden border-rich-gold/20">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-2/5 aspect-square">
                      <Image
                        src={episode.image || "/placeholder.svg"}
                        alt={episode.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-transparent to-transparent md:hidden" />
                      <Badge className="absolute top-4 right-4 bg-rich-gold text-midnight-blue">
                        {episode.category}
                      </Badge>
                    </div>
                    <div className="w-full md:w-3/5 p-6">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-rich-gold border-rich-gold">
                            Featured
                          </Badge>
                          <div className="flex items-center text-midnight-teal/70 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {episode.duration}
                          </div>
                        </div>
                        <CardTitle className="font-playfair text-xl md:text-2xl">{episode.title}</CardTitle>
                        <CardDescription className="text-sm">{episode.date}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 pb-4">
                        <p className="text-midnight-teal line-clamp-3">{episode.description}</p>
                      </CardContent>
                      <CardFooter className="p-0 flex flex-col space-y-4">
                        <div className="w-full bg-midnight-blue/5 rounded-lg p-3 flex items-center space-x-3">
                          <Button size="icon" className="h-10 w-10 rounded-full bg-rich-gold text-midnight-blue">
                            <Play className="h-5 w-5" />
                          </Button>
                          <div className="flex-grow">
                            <Slider defaultValue={[0]} max={100} step={1} className="w-full" />
                          </div>
                          <span className="text-sm text-midnight-teal">00:00</span>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="ghost" size="sm" className="text-midnight-teal">
                            <Bookmark className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button variant="ghost" size="sm" className="text-midnight-teal">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Episodes */}
      <section className="py-20 bg-midnight-blue/5">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-midnight-blue text-center">
            All Episodes
          </h2>
          <p className="text-midnight-teal max-w-2xl mx-auto text-center mb-12">
            Explore our full library of podcast episodes covering Southern heritage, digital entrepreneurship, wellness,
            and creative expression.
          </p>

          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <TabsList className="bg-midnight-blue/10">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {podcastEpisodes
                    .filter((episode) => category === "All" || episode.category === category)
                    .map((episode) => (
                      <Card key={episode.id} className="overflow-hidden h-full flex flex-col border-rich-gold/20">
                        <div className="relative aspect-square">
                          <Image
                            src={episode.image || "/placeholder.svg"}
                            alt={episode.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-4 right-4 bg-rich-gold text-midnight-blue">
                            {episode.category}
                          </Badge>
                          <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-transparent to-transparent flex items-end">
                            <div className="p-4 w-full">
                              <Button
                                size="icon"
                                className="h-12 w-12 rounded-full bg-rich-gold text-midnight-blue hover:bg-rich-gold/90"
                              >
                                <Play className="h-6 w-6" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <CardDescription className="text-sm">{episode.date}</CardDescription>
                            <div className="flex items-center text-midnight-teal/70 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              {episode.duration}
                            </div>
                          </div>
                          <CardTitle className="font-playfair">{episode.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-midnight-teal line-clamp-3">{episode.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                          >
                            Listen Now
                          </Button>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="text-midnight-teal">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-midnight-teal">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-20 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Podcast</h2>
              <p className="text-magnolia-white/80 mb-6">
                Never miss an episode of the Midnight Magnolia Podcast. Subscribe on your favorite platform and join our
                community of listeners exploring Southern heritage, digital creativity, and stories of resilience.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                  { name: "Apple Podcasts", icon: "/placeholder.svg?height=40&width=40&query=apple+podcast+icon" },
                  { name: "Spotify", icon: "/placeholder.svg?height=40&width=40&query=spotify+icon" },
                  { name: "Google Podcasts", icon: "/placeholder.svg?height=40&width=40&query=google+podcast+icon" },
                  { name: "Amazon Music", icon: "/placeholder.svg?height=40&width=40&query=amazon+music+icon" },
                  { name: "Stitcher", icon: "/placeholder.svg?height=40&width=40&query=stitcher+icon" },
                  { name: "RSS Feed", icon: "/placeholder.svg?height=40&width=40&query=rss+feed+icon" },
                ].map((platform) => (
                  <Button
                    key={platform.name}
                    variant="outline"
                    className="border-rich-gold/50 text-rich-gold hover:bg-rich-gold/10 flex items-center justify-center h-16"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative h-6 w-6 mb-1">
                        <Image
                          src={platform.icon || "/placeholder.svg"}
                          alt={platform.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs">{platform.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
              <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                Subscribe to Newsletter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=600&query=podcast+recording+studio+southern"
                  alt="Podcast Studio"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent flex items-end">
                  <div className="p-8">
                    <h3 className="font-playfair text-2xl font-bold text-magnolia-white mb-4">Behind the Scenes</h3>
                    <p className="text-magnolia-white/90 mb-4">
                      Get exclusive access to behind-the-scenes content, bonus episodes, and special guest interviews
                      when you join our Patreon community.
                    </p>
                    <Button
                      variant="outline"
                      className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                    >
                      Join Our Patreon
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Host Section */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Meet Your Host
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/3">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=900&width=600&query=professional+black+woman+podcast+host"
                  alt="Latisha Waters"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              <h3 className="font-playfair text-2xl font-bold mb-4 text-midnight-blue">Latisha Waters</h3>
              <p className="text-midnight-teal mb-6">
                Latisha Waters is the founder of Midnight Magnolia and host of the Midnight Magnolia Podcast. With over
                15 years of experience in digital entrepreneurship and a deep connection to her Southern roots, Latisha
                brings a unique perspective to conversations about heritage, creativity, and resilience.
              </p>
              <p className="text-midnight-teal mb-6">
                Her warm, insightful interview style creates space for guests to share authentic stories that inspire
                and educate listeners. When she's not behind the microphone, Latisha is helping creative entrepreneurs
                build sustainable businesses that honor their unique cultural heritage.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-midnight-blue hover:bg-midnight-blue/90">Learn More About Latisha</Button>
                <Button
                  variant="outline"
                  className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                >
                  Contact for Speaking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Have a Story to Share?</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto mb-8">
            We're always looking for compelling stories and diverse perspectives to feature on the Midnight Magnolia
            Podcast. If you have expertise in Southern heritage, digital entrepreneurship, or creative resilience, we'd
            love to hear from you.
          </p>
          <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
            Pitch Your Story
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
