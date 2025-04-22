import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Quote } from "lucide-react"

export const metadata: Metadata = {
  title: "Southern Heritage | Midnight Magnolia",
  description:
    "Celebrating the powerful legacy of Black Southern women who have shaped history, culture, and community through their wisdom, creativity, and resilience.",
}

// Heritage collections
const heritageCollections = {
  "wisdom-keepers": {
    title: "Wisdom Keepers",
    description: "Celebrating the literary giants and thought leaders who paved the way with their words and wisdom.",
    figures: [
      {
        name: "Maya Angelou",
        years: "1928-2014",
        quote: "You may encounter many defeats, but you must not be defeated.",
        bio: "Poet, memoirist, and civil rights activist who gave voice to the Black experience with grace and unflinching honesty. Her Southern roots deeply influenced her writing and perspective.",
        impact:
          "Her works like 'I Know Why the Caged Bird Sings' transformed literature by centering Black Southern women's experiences and resilience.",
        image: "/placeholder.svg?height=600&width=400&query=Maya+Angelou+portrait",
      },
      {
        name: "Toni Morrison",
        years: "1931-2019",
        quote: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
        bio: "Nobel Prize-winning novelist whose lyrical prose explored the complexities of Black identity, community, and history in America.",
        impact:
          "Through works like 'Beloved' and 'Song of Solomon,' she elevated Black literature and challenged conventional narratives about the American experience.",
        image: "/placeholder.svg?height=600&width=400&query=Toni+Morrison+portrait",
      },
      {
        name: "Zora Neale Hurston",
        years: "1891-1960",
        quote: "Research is formalized curiosity. It is poking and prying with a purpose.",
        bio: "Anthropologist, folklorist, and writer of the Harlem Renaissance who preserved Southern Black cultural traditions through her research and fiction.",
        impact:
          "Her novel 'Their Eyes Were Watching God' and anthropological work documented authentic Southern Black dialect and traditions for future generations.",
        image: "/placeholder.svg?height=600&width=400&query=Zora+Neale+Hurston+portrait",
      },
    ],
  },
  "modern-visionaries": {
    title: "Modern Visionaries",
    description: "Honoring contemporary leaders who are reshaping politics, business, and culture with bold vision.",
    figures: [
      {
        name: "Michelle Obama",
        years: "1964-present",
        quote: "When they go low, we go high.",
        bio: "Former First Lady, attorney, and advocate whose grace, intelligence, and authenticity have made her one of the most influential women in the world.",
        impact:
          "Through initiatives like Let's Move! and her memoir 'Becoming,' she has inspired millions while breaking barriers and challenging stereotypes.",
        image: "/placeholder.svg?height=600&width=400&query=Michelle+Obama+portrait",
      },
      {
        name: "Stacey Abrams",
        years: "1973-present",
        quote: "The ability to tell your own story, in words or images, is already a victory, already a revolt.",
        bio: "Political leader, voting rights activist, and author whose grassroots organizing transformed Georgia's political landscape.",
        impact:
          "Her Fair Fight organization has fought voter suppression and empowered communities to participate in democracy.",
        image: "/placeholder.svg?height=600&width=400&query=Stacey+Abrams+portrait",
      },
      {
        name: "Maxine Waters",
        years: "1938-present",
        quote: "I am a strong black woman. I cannot be intimidated, and I'm not going anywhere.",
        bio: "Congresswoman and fierce advocate for social justice, financial reform, and equality who has never shied away from speaking truth to power.",
        impact:
          "Her decades of public service have advanced legislation supporting women, children, and underserved communities.",
        image: "/placeholder.svg?height=600&width=400&query=Maxine+Waters+portrait",
      },
    ],
  },
  "creative-forces": {
    title: "Creative Forces",
    description:
      "Celebrating the artists who express the depth and beauty of Black Southern experience through music and art.",
    figures: [
      {
        name: "Beyoncé",
        years: "1981-present",
        quote: "The most alluring thing a woman can have is confidence.",
        bio: "Grammy-winning artist whose music, performances, and business ventures have redefined entertainment while celebrating her Southern roots and Black heritage.",
        impact:
          "Albums like 'Lemonade' and 'Renaissance' have transformed popular culture while exploring themes of Southern Black womanhood, resilience, and empowerment.",
        image: "/placeholder.svg?height=600&width=400&query=Beyonce+portrait",
      },
      {
        name: "Janelle Monáe",
        years: "1985-present",
        quote: "I feel like I have a responsibility to the community.",
        bio: "Singer, actress, and visionary artist whose Afrofuturistic aesthetic and boundary-pushing music challenge conventions while honoring Black cultural traditions.",
        impact:
          "Through concept albums and films, she has created new spaces for Black expression that blend past, present, and future.",
        image: "/placeholder.svg?height=600&width=400&query=Janelle+Monae+portrait",
      },
      {
        name: "Kara Walker",
        years: "1969-present",
        quote: "I don't want to be a hero, I want to be a mirror.",
        bio: "Visual artist known for her silhouettes and installations that confront the painful legacy of slavery and racism in the American South.",
        impact:
          "Her provocative work has forced audiences to reckon with historical trauma while elevating Black narratives in contemporary art.",
        image: "/placeholder.svg?height=600&width=400&query=Kara+Walker+artist+portrait",
      },
    ],
  },
}

// Timeline events
const timelineEvents = [
  {
    year: 1619,
    title: "First Africans in English North America",
    description:
      "The first recorded Africans in English North America arrive in Jamestown, Virginia, marking the beginning of a complex history of enslavement, resistance, and resilience.",
  },
  {
    year: 1773,
    title: "Phillis Wheatley Publishes Poems",
    description:
      "Phillis Wheatley becomes the first African American woman to publish a book of poetry, demonstrating the intellectual capabilities of Black women despite enslavement.",
  },
  {
    year: 1863,
    title: "Emancipation Proclamation",
    description:
      "President Lincoln issues the Emancipation Proclamation, declaring freedom for enslaved people in Confederate states and beginning the long journey toward liberation.",
  },
  {
    year: 1920,
    title: "Harlem Renaissance Begins",
    description:
      "The Harlem Renaissance flourishes, with Southern-born artists like Zora Neale Hurston preserving and celebrating Black Southern cultural traditions.",
  },
  {
    year: 1955,
    title: "Montgomery Bus Boycott",
    description:
      "Rosa Parks refuses to give up her seat, sparking the Montgomery Bus Boycott and highlighting the crucial role of Black women in the Civil Rights Movement.",
  },
  {
    year: 1972,
    title: "Shirley Chisholm's Presidential Campaign",
    description:
      "Shirley Chisholm becomes the first Black candidate for a major party's presidential nomination, paving the way for future generations of Black women in politics.",
  },
  {
    year: 2008,
    title: "Michelle Obama Becomes First Lady",
    description:
      "Michelle Obama becomes the first Black First Lady of the United States, bringing grace, intelligence, and her unique perspective to the White House.",
  },
  {
    year: 2020,
    title: "Kamala Harris Elected Vice President",
    description:
      "Kamala Harris becomes the first woman, first Black person, and first South Asian American to be elected Vice President of the United States.",
  },
]

export default function HeritagePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-midnight-blue text-magnolia-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=1080&width=1920&query=southern+gothic+heritage+magnolias"
            alt="Heritage Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Southern Heritage</h1>
            <p className="text-lg md:text-xl text-magnolia-white/80 mb-8">
              Celebrating the powerful legacy of Black Southern women who have shaped history, culture, and community
              through their wisdom, creativity, and resilience.
            </p>
            <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
              Explore Our Heritage
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-midnight-blue">
                Our Roots Run Deep
              </h2>
              <p className="text-midnight-teal mb-6">
                Like the magnolia tree that withstands storms yet continues to bloom with elegance and grace, the story
                of Black women in the American South is one of remarkable resilience, creativity, and strength.
              </p>
              <p className="text-midnight-teal mb-6">
                At Midnight Magnolia, we draw inspiration from this rich heritage—from the wisdom keepers who preserved
                our stories, the visionaries who fought for justice, and the creative forces who expressed our
                experiences through art and music.
              </p>
              <p className="text-midnight-teal mb-6">
                Our brand honors this legacy by creating spaces, resources, and opportunities that celebrate Southern
                heritage while empowering future generations to thrive.
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-0.5 w-12 bg-rich-gold"></div>
                <p className="text-midnight-blue italic font-playfair">"We are the dreams and the dreamers."</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=1000&width=800&query=southern+black+women+heritage+collage"
                  alt="Southern Heritage Collage"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent flex items-end">
                  <div className="p-8">
                    <span className="bg-rich-gold text-midnight-blue px-4 py-1 rounded-full text-sm font-bold">
                      Our Heritage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Collections */}
      <section className="py-20 bg-midnight-blue/5">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Honoring Our Heritage
          </h2>

          <Tabs defaultValue="wisdom-keepers" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-midnight-blue/10">
                <TabsTrigger
                  value="wisdom-keepers"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Wisdom Keepers
                </TabsTrigger>
                <TabsTrigger
                  value="modern-visionaries"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Modern Visionaries
                </TabsTrigger>
                <TabsTrigger
                  value="creative-forces"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Creative Forces
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(heritageCollections).map(([key, collection]) => (
              <TabsContent key={key} value={key}>
                <div className="mb-8">
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-midnight-blue">{collection.title}</h3>
                  <p className="text-midnight-teal max-w-3xl">{collection.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {collection.figures.map((figure, index) => (
                    <Card key={index} className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-80">
                        <Image
                          src={figure.image || "/placeholder.svg"}
                          alt={figure.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/90 via-midnight-blue/50 to-transparent flex flex-col justify-end p-6">
                          <h4 className="font-playfair text-2xl font-bold text-magnolia-white">{figure.name}</h4>
                          <p className="text-magnolia-white/80">{figure.years}</p>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-start mb-4">
                          <Quote className="h-6 w-6 text-rich-gold mr-2 flex-shrink-0 mt-1" />
                          <p className="italic text-midnight-blue">{figure.quote}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-midnight-teal mb-4">{figure.bio}</p>
                        <h5 className="font-bold text-midnight-blue mb-2">Legacy & Impact:</h5>
                        <p className="text-midnight-teal">{figure.impact}</p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                        >
                          Learn More
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

      {/* Timeline Section */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-midnight-blue text-center">
            Journey Through History
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-rich-gold/20"></div>

            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`mb-12 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
              >
                <div className="w-5/12" />
                <div className="z-20">
                  <div className="flex items-center justify-center w-10 h-10 bg-rich-gold rounded-full">
                    <div className="w-3 h-3 bg-midnight-blue rounded-full" />
                  </div>
                </div>
                <div className="w-5/12">
                  <Card className="border-rich-gold/20">
                    <CardHeader>
                      <CardTitle className="font-playfair text-xl text-midnight-blue flex items-center">
                        <span className="text-rich-gold font-bold mr-2">{event.year}</span>
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-midnight-teal">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Traditions */}
      <section className="py-20 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-16 text-center">Cultural Traditions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Storytelling",
                description:
                  "The oral tradition of passing down history, wisdom, and cultural knowledge through stories has been essential to preserving Southern Black heritage.",
                image: "/placeholder.svg?height=400&width=600&query=southern+storytelling+tradition",
              },
              {
                title: "Music & Spirituals",
                description:
                  "From spirituals to blues, jazz, and gospel, music has been a powerful form of expression, resistance, and community-building in Southern Black culture.",
                image: "/placeholder.svg?height=400&width=600&query=southern+gospel+music",
              },
              {
                title: "Culinary Arts",
                description:
                  "Southern soul food represents creativity, resourcefulness, and the preservation of African culinary traditions adapted to the American South.",
                image: "/placeholder.svg?height=400&width=600&query=southern+soul+food",
              },
              {
                title: "Quilting",
                description:
                  "Quilting circles were spaces for creativity, community, and sometimes coded communication, with patterns that told stories and preserved history.",
                image: "/placeholder.svg?height=400&width=600&query=southern+quilting+tradition",
              },
              {
                title: "Faith & Spirituality",
                description:
                  "The Black church has been a cornerstone of community, resistance, and hope, providing spiritual guidance and social organization.",
                image: "/placeholder.svg?height=400&width=600&query=southern+black+church",
              },
              {
                title: "Language & Dialect",
                description:
                  "Distinctive speech patterns and linguistic innovations reflect the rich cultural heritage and creative expression of Southern Black communities.",
                image: "/placeholder.svg?height=400&width=600&query=southern+dialect+expression",
              },
            ].map((tradition, index) => (
              <Card key={index} className="bg-midnight-teal border-rich-gold/20 overflow-hidden h-full flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={tradition.image || "/placeholder.svg"}
                    alt={tradition.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-magnolia-white">{tradition.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-magnolia-white/80">{tradition.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-midnight-blue">
                Heritage Resources
              </h2>
              <p className="text-midnight-teal mb-6">
                Explore our curated collection of resources designed to help you connect with, learn about, and
                celebrate Southern Black heritage.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Digital Library",
                    description:
                      "Access our growing collection of articles, essays, and digital archives exploring various aspects of Southern Black heritage.",
                  },
                  {
                    title: "Educational Materials",
                    description:
                      "Lesson plans, activities, and resources for educators and parents to teach children about Southern Black history and culture.",
                  },
                  {
                    title: "Community Programs",
                    description:
                      "Information about our workshops, events, and community initiatives focused on preserving and celebrating heritage.",
                  },
                  {
                    title: "Research Guides",
                    description:
                      "Resources to help you explore your own family history and connections to Southern heritage.",
                  },
                ].map((resource, index) => (
                  <Card key={index} className="border-rich-gold/20">
                    <CardHeader>
                      <CardTitle className="font-playfair text-lg text-midnight-blue">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-midnight-teal">{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-rich-gold text-rich-gold hover:bg-rich-gold hover:text-midnight-blue"
                      >
                        Explore
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative h-[600px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=1200&width=800&query=southern+heritage+resources+library"
                  alt="Heritage Resources"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent flex items-end">
                  <div className="p-8 max-w-md">
                    <h3 className="font-playfair text-2xl font-bold text-magnolia-white mb-4">Featured Collection</h3>
                    <p className="text-magnolia-white/90 mb-6">
                      "Voices of Resilience: Oral Histories of Southern Black Women" - Our award-winning digital archive
                      preserving the stories of elders in our community.
                    </p>
                    <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">Access Collection</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-blue text-magnolia-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Join Us in Preserving Our Heritage</h2>
          <p className="text-magnolia-white/80 max-w-2xl mx-auto mb-8">
            Help us continue the work of documenting, celebrating, and sharing the rich heritage of Black Southern women
            for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
              Support Our Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-rich-gold text-rich-gold hover:bg-rich-gold/10">
              Share Your Story
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
