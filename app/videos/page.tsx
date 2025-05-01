import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Play } from "lucide-react"

export default function VideosPage() {
  // Sample video playlists
  const playlists = [
    {
      id: 1,
      title: "Southern Gothic Design Tutorials",
      description: "Learn how to incorporate Southern Gothic elements into your digital designs.",
      image: "/placeholder.svg?height=400&width=600&query=southern+gothic+design+tutorial",
      videoCount: 12,
    },
    {
      id: 2,
      title: "Brand Strategy Sessions",
      description: "In-depth discussions on building authentic Southern-inspired brands.",
      image: "/placeholder.svg?height=400&width=600&query=brand+strategy+session+southern+aesthetic",
      videoCount: 8,
    },
    {
      id: 3,
      title: "Creative Process Insights",
      description: "Behind-the-scenes looks at our creative process and project development.",
      image: "/placeholder.svg?height=400&width=600&query=creative+process+behind+the+scenes",
      videoCount: 15,
    },
  ]

  // Sample featured videos
  const featuredVideos = [
    {
      id: 1,
      title: "The Art of Southern Gothic Typography",
      description: "Exploring the unique characteristics of typography in Southern Gothic design.",
      thumbnail: "/placeholder.svg?height=400&width=600&query=southern+gothic+typography+tutorial",
      duration: "18:42",
      date: "April 15, 2023",
      views: "2.4K",
    },
    {
      id: 2,
      title: "Digital Storytelling: Preserving Southern Narratives",
      description: "How to use digital media to preserve and share Southern stories and traditions.",
      thumbnail: "/placeholder.svg?height=400&width=600&query=digital+storytelling+southern+traditions",
      duration: "24:17",
      date: "March 22, 2023",
      views: "1.8K",
    },
    {
      id: 3,
      title: "Creating Mood Boards with Southern Influence",
      description: "A step-by-step guide to creating mood boards that capture Southern aesthetics.",
      thumbnail: "/placeholder.svg?height=400&width=600&query=mood+board+southern+aesthetic+creation",
      duration: "15:33",
      date: "February 8, 2023",
      views: "3.2K",
    },
    {
      id: 4,
      title: "Brand Photography with Southern Gothic Elements",
      description: "Tips and techniques for incorporating Southern Gothic elements in brand photography.",
      thumbnail: "/placeholder.svg?height=400&width=600&query=brand+photography+southern+gothic+elements",
      duration: "21:05",
      date: "January 17, 2023",
      views: "2.1K",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-[#FAF3E0] mb-4">Video Channel</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Tutorials, insights, and creative explorations from the world of Southern Gothic design.
        </p>
      </div>

      {/* Featured Video */}
      <div className="mb-16">
        <h2 className="text-2xl font-serif text-[#FAF3E0] mb-6">Featured Video</h2>
        <div className="relative rounded-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 relative">
            <Image
              src="/placeholder.svg?height=720&width=1280&query=southern+gothic+design+masterclass+video+thumbnail"
              alt="Featured video"
              width={1280}
              height={720}
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-[#D4AF37]/80 flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <Play className="w-8 h-8 text-[#191970] ml-1" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A192F] to-transparent">
              <h3 className="text-2xl font-serif text-[#FAF3E0] mb-2">Southern Gothic Design Masterclass</h3>
              <p className="text-gray-300">
                A comprehensive guide to incorporating Southern Gothic elements in modern digital design.
              </p>
              <div className="flex items-center mt-4 text-sm text-gray-400">
                <span className="mr-4">32:17</span>
                <span className="mr-4">April 29, 2023</span>
                <span>5.7K views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlists */}
      <div className="mb-16">
        <h2 className="text-2xl font-serif text-[#FAF3E0] mb-6">Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {playlists.map((playlist) => (
            <Card
              key={playlist.id}
              className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all"
            >
              <div className="relative h-48 w-full">
                <Image src={playlist.image || "/placeholder.svg"} alt={playlist.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-[#0A192F]/50 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-[#D4AF37] mx-auto mb-2" />
                    <span className="text-[#FAF3E0] font-medium">{playlist.videoCount} Videos</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif text-[#FAF3E0] mb-2">{playlist.title}</h3>
                <p className="text-gray-300">{playlist.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Videos */}
      <div>
        <h2 className="text-2xl font-serif text-[#FAF3E0] mb-6">Recent Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredVideos.map((video) => (
            <Card
              key={video.id}
              className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all"
            >
              <div className="relative h-40 w-full">
                <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-[#0A192F]/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="w-12 h-12 rounded-full bg-[#D4AF37]/80 flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                    <Play className="w-5 h-5 text-[#191970] ml-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#0A192F]/80 text-xs text-[#FAF3E0] rounded">
                  {video.duration}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-md font-serif text-[#FAF3E0] mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{video.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{video.date}</span>
                  <span>{video.views} views</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
