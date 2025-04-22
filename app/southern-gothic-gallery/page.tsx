import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Download, Share2, Heart } from "lucide-react"
import SouthernGothicCarousel from "@/components/SouthernGothicCarousel"

export const metadata: Metadata = {
  title: "Southern Gothic Gallery | Midnight Magnolia",
  description:
    "Explore the mystical beauty of the South through our enchanted collection of images that capture the essence of Southern heritage, magnolia blooms, and moonlit waters.",
}

// Gallery collections
const galleryCollections = {
  "moonlit-mansions": {
    title: "Moonlit Mansions",
    description:
      "Historic Southern homes bathed in ethereal moonlight, where past and present converge in haunting beauty.",
    images: [
      {
        title: "Midnight Magnolia Manor",
        description: "A grand plantation house with magnolia trees in full bloom under a golden moon",
        image: "/placeholder.svg?height=800&width=600&query=southern+gothic+mansion+moonlight",
        featured: true,
      },
      {
        title: "Crescent Shadows",
        description: "Dramatic shadows cast by a crescent moon over a historic Southern mansion",
        image: "/placeholder.svg?height=800&width=600&query=southern+mansion+crescent+moon",
      },
      {
        title: "Veiled Veranda",
        description: "Spanish moss drapes over the veranda of an antebellum home at twilight",
        image: "/placeholder.svg?height=800&width=600&query=spanish+moss+veranda+twilight",
      },
      {
        title: "Lantern Light",
        description: "Glowing lanterns illuminate the path to a Southern Gothic manor house",
        image: "/placeholder.svg?height=800&width=600&query=lantern+path+southern+manor",
      },
      {
        title: "Widow's Watch",
        description: "The silhouette of a woman gazing from the widow's walk of a coastal Southern home",
        image: "/placeholder.svg?height=800&width=600&query=widow+walk+southern+home+silhouette",
      },
      {
        title: "Forgotten Fountain",
        description: "An ornate fountain on a mansion's grounds, illuminated by moonlight",
        image: "/placeholder.svg?height=800&width=600&query=ornate+fountain+mansion+moonlight",
      },
    ],
  },
  "magnolia-mystique": {
    title: "Magnolia Mystique",
    description:
      "The iconic Southern magnolia captured in various states of bloom, symbolizing beauty, strength, and resilience.",
    images: [
      {
        title: "Midnight Bloom",
        description: "A magnolia flower opening under the light of a full moon",
        image: "/placeholder.svg?height=800&width=600&query=magnolia+bloom+full+moon",
        featured: true,
      },
      {
        title: "Dew-Kissed Petals",
        description: "Morning dew glistens on the pristine white petals of a magnolia blossom",
        image: "/placeholder.svg?height=800&width=600&query=magnolia+dew+morning+light",
      },
      {
        title: "Ancient Guardian",
        description: "A centuries-old magnolia tree standing sentinel over a Southern landscape",
        image: "/placeholder.svg?height=800&width=600&query=ancient+magnolia+tree+southern",
      },
      {
        title: "Petal Path",
        description: "A path lined with fallen magnolia petals leading through a misty garden",
        image: "/placeholder.svg?height=800&width=600&query=magnolia+petal+path+misty",
      },
      {
        title: "Storm Survivor",
        description: "A magnolia tree bending but not breaking during a Southern thunderstorm",
        image: "/placeholder.svg?height=800&width=600&query=magnolia+tree+storm+resilience",
      },
      {
        title: "Moonlit Magnolia",
        description: "The silhouette of magnolia branches against a full moon",
        image: "/placeholder.svg?height=800&width=600&query=magnolia+silhouette+full+moon",
      },
    ],
  },
  "bayou-whispers": {
    title: "Bayou Whispers",
    description:
      "The mysterious waterways of the South, where cypress trees rise from misty waters and stories flow like the current.",
    images: [
      {
        title: "Cypress Sentinels",
        description: "Ancient cypress trees standing in misty bayou waters at dawn",
        image: "/placeholder.svg?height=800&width=600&query=cypress+trees+misty+bayou",
        featured: true,
      },
      {
        title: "Firefly Dance",
        description: "Fireflies illuminate a Southern bayou on a warm summer night",
        image: "/placeholder.svg?height=800&width=600&query=fireflies+bayou+night",
      },
      {
        title: "Moss Veil",
        description: "Spanish moss creates a mysterious veil over a winding bayou",
        image: "/placeholder.svg?height=800&width=600&query=spanish+moss+bayou+veil",
      },
      {
        title: "Reflection Pool",
        description: "The moon's reflection creates a perfect mirror on still bayou waters",
        image: "/placeholder.svg?height=800&width=600&query=moon+reflection+still+bayou",
      },
      {
        title: "Hidden Cabin",
        description: "A weathered cabin nestled among cypress trees deep in the bayou",
        image: "/placeholder.svg?height=800&width=600&query=weathered+cabin+cypress+bayou",
      },
      {
        title: "Bayou Passage",
        description: "A narrow boat passage through a mystical Southern bayou",
        image: "/placeholder.svg?height=800&width=600&query=boat+passage+mystical+bayou",
      },
    ],
  },
  "southern-spirits": {
    title: "Southern Spirits",
    description:
      "Ethereal figures and symbolic representations of the spiritual traditions and folklore that permeate Southern culture.",
    images: [
      {
        title: "Lantern Bearer",
        description: "A ghostly figure carrying a lantern through a misty Southern cemetery",
        image: "/placeholder.svg?height=800&width=600&query=ghostly+figure+lantern+cemetery",
        featured: true,
      },
      {
        title: "Veil Between Worlds",
        description: "A thin veil of mist separating the world of the living from the spiritual realm",
        image: "/placeholder.svg?height=800&width=600&query=misty+veil+spiritual+realm",
      },
      {
        title: "Ancestor's Watch",
        description: "Spiritual guardians watching over a Southern homestead",
        image: "/placeholder.svg?height=800&width=600&query=spiritual+guardians+southern+home",
      },
      {
        title: "Ritual Circle",
        description: "A circle of candles illuminating a spiritual ritual under ancient oaks",
        image: "/placeholder.svg?height=800&width=600&query=candle+circle+ritual+oaks",
      },
      {
        title: "Crossroads Decision",
        description: "A figure standing at a misty crossroads, symbolizing important life choices",
        image: "/placeholder.svg?height=800&width=600&query=figure+misty+crossroads+decision",
      },
      {
        title: "Spiritual Passage",
        description: "A doorway between worlds hidden in a Southern landscape",
        image: "/placeholder.svg?height=800&width=600&query=doorway+worlds+southern+landscape",
      },
    ],
  },
}

export default function SouthernGothicGalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <section className="min-h-screen bg-midnight-blue">
        <SouthernGothicCarousel />
      </section>

      {/* Gallery Introduction */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-midnight-blue">
              Southern Gothic Gallery
            </h1>
            <p className="text-midnight-teal mb-8">
              Step into a world where Spanish moss drapes from ancient oaks, magnolias bloom under moonlight, and the
              Southern spirit comes alive through enchanted imagery. Our Southern Gothic Gallery captures the haunting
              beauty, rich history, and mystical essence of the American South.
            </p>
            <div className="flex justify-center">
              <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                Explore Collections
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Collections */}
      <section className="py-20 bg-midnight-blue/5">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Explore Our Collections
          </h2>

          <Tabs defaultValue="moonlit-mansions" className="w-full">
            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <TabsList className="bg-midnight-blue/10">
                {Object.entries(galleryCollections).map(([key, collection]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                  >
                    {collection.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.entries(galleryCollections).map(([key, collection]) => (
              <TabsContent key={key} value={key}>
                <div className="mb-8 max-w-3xl mx-auto text-center">
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-midnight-blue">{collection.title}</h3>
                  <p className="text-midnight-teal">{collection.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {collection.images.map((image, index) => (
                    <Card
                      key={index}
                      className={`overflow-hidden h-full flex flex-col ${
                        image.featured ? "border-rich-gold/50" : "border-transparent"
                      }`}
                    >
                      <div className="relative aspect-[3/4] group">
                        <Image
                          src={image.image || "/placeholder.svg"}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-midnight-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-6 w-full">
                            <div className="flex justify-between items-center">
                              <h4 className="font-playfair text-xl font-bold text-magnolia-white">{image.title}</h4>
                              <div className="flex space-x-2">
                                <button className="h-8 w-8 rounded-full bg-rich-gold/20 flex items-center justify-center text-rich-gold hover:bg-rich-gold/30 transition-colors">
                                  <Heart className="h-4 w-4" />
                                </button>
                                <button className="h-8 w-8 rounded-full bg-rich-gold/20 flex items-center justify-center text-rich-gold hover:bg-rich-gold/30 transition-colors">
                                  <Share2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {image.featured && (
                          <div className="absolute top-4 right-4 bg-rich-gold text-midnight-blue px-3 py-1 rounded-full text-xs font-bold">
                            Featured
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="font-playfair">{image.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-midnight-teal">{image.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                        >
                          View Full Size
                        </Button>
                        <Button variant="ghost" size="sm" className="text-midnight-teal">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Behind the Images */}
      <section className="py-20 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Behind the Images</h2>
              <p className="text-magnolia-white/80 mb-6">
                Our Southern Gothic Gallery is a celebration of the unique aesthetic that blends beauty with mystery,
                history with folklore, and reality with the supernatural. Each image is carefully crafted to capture the
                essence of the South's complex heritage.
              </p>
              <p className="text-magnolia-white/80 mb-6">
                Drawing inspiration from Southern literature, architecture, landscapes, and cultural traditions, these
                images tell stories of resilience, transformation, and the enduring spirit of the South.
              </p>
              <p className="text-magnolia-white/80 mb-8">
                Many of these images are created using our AI Image Generator, which has been specially trained to
                understand and interpret Southern Gothic aesthetics. Others are the work of talented artists who share
                our passion for this unique cultural expression.
              </p>
              <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue" asChild>
                <Link href="/ai-image-generator">
                  Create Your Own
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=400&query=southern+gothic+process+1"
                      alt="Creative Process"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=southern+gothic+process+2"
                      alt="Creative Process"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=southern+gothic+process+3"
                      alt="Creative Process"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=400&query=southern+gothic+process+4"
                      alt="Creative Process"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Sources of Inspiration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Southern Literature",
                description:
                  "The works of authors like Flannery O'Connor, William Faulkner, and Zora Neale Hurston who captured the complex spirit of the South.",
                image: "/placeholder.svg?height=400&width=600&query=southern+literature+books",
              },
              {
                title: "Historic Architecture",
                description:
                  "Antebellum homes, plantation houses, and rural cabins that tell stories of the South's complex past and enduring beauty.",
                image: "/placeholder.svg?height=400&width=600&query=southern+historic+architecture",
              },
              {
                title: "Natural Landscapes",
                description:
                  "Misty bayous, ancient oak trees draped with Spanish moss, and fields of magnolias that define the Southern aesthetic.",
                image: "/placeholder.svg?height=400&width=600&query=southern+landscape+misty",
              },
              {
                title: "Cultural Traditions",
                description:
                  "Folklore, spiritual practices, and cultural expressions that have shaped the Southern Gothic imagination for generations.",
                image: "/placeholder.svg?height=400&width=600&query=southern+cultural+traditions",
              },
            ].map((source, index) => (
              <Card key={index} className="overflow-hidden h-full flex flex-col border-rich-gold/20">
                <div className="relative h-48">
                  <Image src={source.image || "/placeholder.svg"} alt={source.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="font-playfair">{source.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-midnight-teal">{source.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Submissions */}
      <section className="py-20 bg-midnight-blue/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-midnight-blue">Submit Your Creation</h2>
          <p className="text-midnight-teal max-w-2xl mx-auto mb-8">
            Have you created a Southern Gothic-inspired image using our AI Image Generator or your own artistic skills?
            We invite you to submit your work for consideration in our community gallery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">Submit Your Work</Button>
            <Button variant="outline" className="border-rich-gold text-rich-gold hover:bg-rich-gold/10" asChild>
              <Link href="/ai-image-generator">Create with AI</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Bring Southern Gothic to Your Space</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto mb-8">
            Our gallery images are available as high-quality prints, perfect for adding a touch of Southern mystique to
            your home or office.
          </p>
          <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
            Shop Prints
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
