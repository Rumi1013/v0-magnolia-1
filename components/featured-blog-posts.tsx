"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  slug: string
  author: string
  category: string
}

export function FeaturedBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching featured blog posts
    const fetchPosts = async () => {
      try {
        // In a real implementation, you would fetch from your API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data
        const samplePosts: BlogPost[] = [
          {
            id: "1",
            title: "Finding My ADHD Voice: Late Diagnosis and Self-Discovery",
            excerpt:
              "My journey of discovering and embracing ADHD after 40, and how it transformed my understanding of myself and my business.",
            coverImage: "/woman-journaling-adhd.png",
            date: "May 15, 2023",
            slug: "finding-adhd-voice",
            author: "Latisha V. Waters",
            category: "ADHD Journey",
          },
          {
            id: "2",
            title: "Community Organizing in Small Southern Towns",
            excerpt:
              "The unique challenges and unexpected joys of community activism in traditional Southern communities.",
            coverImage: "/southern-community-meeting.png",
            date: "April 3, 2023",
            slug: "community-organizing-southern-towns",
            author: "Latisha V. Waters",
            category: "Southern Activist Chronicles",
          },
          {
            id: "3",
            title: "Navigating Social Events with Gastric Limitations",
            excerpt:
              "How I've learned to manage social gatherings and maintain connections while dealing with invisible disabilities.",
            coverImage: "/southern-gathering.png",
            date: "March 12, 2023",
            slug: "navigating-social-events-gastric-limitations",
            author: "Latisha V. Waters",
            category: "Living with Invisible Disabilities",
          },
        ]

        setPosts(samplePosts)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className="py-16 bg-[#0F0F1A]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif text-[#FAF3E0]">From Our Blog</h2>
          <Link href="/blog">
            <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
              View All Posts
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // Skeleton loading state
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all duration-300"
                >
                  <div className="relative h-48 w-full">
                    <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="inline-block px-3 py-1 text-xs font-medium text-[#D4AF37] bg-[#D4AF37]/10 rounded-full">
                        {post.category}
                      </div>
                      <span className="text-gray-400 text-sm">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-serif text-[#FAF3E0] mb-2">{post.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-2">
                          <span className="text-[#D4AF37] font-serif text-xs">
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="text-gray-300 text-sm">{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <span className="text-[#D4AF37] hover:underline">Read More</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  )
}
