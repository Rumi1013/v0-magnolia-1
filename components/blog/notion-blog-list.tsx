"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import Image from "next/image"

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

export function NotionBlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog")

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }

        const data = await response.json()
        setPosts(data.posts)
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError("Failed to load blog posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <Button
          onClick={() => {
            setIsLoading(true)
            setError(null)
            // Retry fetching posts
            fetch("/api/blog")
              .then((res) => res.json())
              .then((data) => {
                setPosts(data.posts)
                setIsLoading(false)
              })
              .catch((err) => {
                console.error("Error retrying fetch:", err)
                setError("Failed to load blog posts. Please try again later.")
                setIsLoading(false)
              })
          }}
          className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970]"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {isLoading
        ? // Skeleton loading state
          Array.from({ length: 6 }).map((_, i) => (
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
              className="bg-[#191970]/30 border border-[#D4AF37]/20 overflow-hidden hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.coverImage || "/placeholder.svg?height=400&width=600&query=southern+gothic+blog+post"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
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
  )
}
