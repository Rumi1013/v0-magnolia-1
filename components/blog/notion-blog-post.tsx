"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import type { JSX } from "react"

type BlockContent = {
  text: string
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
}

type Block = {
  type: string
  content?: BlockContent[]
  url?: string
  caption?: string
  language?: string
}

type BlogPost = {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  slug: string
  author: string
  category: string
  content: Block[]
}

export function NotionBlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog post not found")
          }
          throw new Error("Failed to fetch blog post")
        }

        const data = await response.json()
        setPost(data.post)
      } catch (err) {
        console.error("Error fetching blog post:", err)
        setError(`${err instanceof Error ? err.message : "Failed to load blog post"}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <Link href="/blog">
          <span className="text-[#D4AF37] hover:underline">Back to Blog</span>
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-3" />
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Blog post not found</p>
        <Link href="/blog">
          <span className="text-[#D4AF37] hover:underline">Back to Blog</span>
        </Link>
      </div>
    )
  }

  // Helper function to render text with annotations
  const renderAnnotatedText = (content: BlockContent[]) => {
    return content.map((item, index) => {
      let text = item.text

      // Apply annotations
      if (item.annotations.bold) {
        text = <strong key={index}>{text}</strong>
      }
      if (item.annotations.italic) {
        text = <em key={index}>{text}</em>
      }
      if (item.annotations.underline) {
        text = <u key={index}>{text}</u>
      }
      if (item.annotations.strikethrough) {
        text = <s key={index}>{text}</s>
      }
      if (item.annotations.code) {
        text = (
          <code key={index} className="bg-[#191970]/50 px-1 py-0.5 rounded">
            {text}
          </code>
        )
      }

      return text
    })
  }

  // Render content blocks
  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-4 text-gray-300">
            {block.content && renderAnnotatedText(block.content)}
          </p>
        )
      case "heading_1":
        return (
          <h1 key={index} className="text-3xl font-serif text-[#FAF3E0] mb-4 mt-8">
            {block.content && renderAnnotatedText(block.content)}
          </h1>
        )
      case "heading_2":
        return (
          <h2 key={index} className="text-2xl font-serif text-[#FAF3E0] mb-3 mt-6">
            {block.content && renderAnnotatedText(block.content)}
          </h2>
        )
      case "heading_3":
        return (
          <h3 key={index} className="text-xl font-serif text-[#FAF3E0] mb-2 mt-5">
            {block.content && renderAnnotatedText(block.content)}
          </h3>
        )
      case "bulleted_list_item":
        return (
          <li key={index} className="ml-6 mb-2 text-gray-300">
            {block.content && renderAnnotatedText(block.content)}
          </li>
        )
      case "numbered_list_item":
        return (
          <li key={index} className="ml-6 mb-2 text-gray-300">
            {block.content && renderAnnotatedText(block.content)}
          </li>
        )
      case "image":
        return (
          <figure key={index} className="my-6">
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={block.url || "/placeholder.svg"}
                alt={block.caption || "Blog image"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            {block.caption && (
              <figcaption className="text-center text-sm text-gray-400 mt-2">{block.caption}</figcaption>
            )}
          </figure>
        )
      case "quote":
        return (
          <blockquote key={index} className="border-l-4 border-[#D4AF37] pl-4 italic my-6 text-gray-300">
            {block.content && renderAnnotatedText(block.content)}
          </blockquote>
        )
      case "code":
        return (
          <pre key={index} className="bg-[#191970]/70 p-4 rounded-lg my-6 overflow-x-auto">
            <code className="text-[#FAF3E0] text-sm">
              {block.content && block.content.map((item) => item.text).join("")}
            </code>
          </pre>
        )
      case "divider":
        return <hr key={index} className="my-8 border-[#D4AF37]/20" />
      default:
        return (
          <div key={index} className="text-gray-400 my-4">
            Unsupported block type: {block.type}
          </div>
        )
    }
  }

  // Group consecutive list items
  const renderContent = () => {
    const result = []
    let currentList: JSX.Element[] = []
    let currentListType: string | null = null

    post.content.forEach((block, index) => {
      if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
        // Start a new list if needed
        if (currentListType !== block.type) {
          // Push the previous list if it exists
          if (currentList.length > 0) {
            result.push(
              currentListType === "bulleted_list_item" ? (
                <ul key={`list-${result.length}`} className="list-disc mb-4">
                  {currentList}
                </ul>
              ) : (
                <ol key={`list-${result.length}`} className="list-decimal mb-4">
                  {currentList}
                </ol>
              ),
            )
            currentList = []
          }
          currentListType = block.type
        }

        // Add item to the current list
        currentList.push(renderBlock(block, index))
      } else {
        // Push the previous list if it exists
        if (currentList.length > 0) {
          result.push(
            currentListType === "bulleted_list_item" ? (
              <ul key={`list-${result.length}`} className="list-disc mb-4">
                {currentList}
              </ul>
            ) : (
              <ol key={`list-${result.length}`} className="list-decimal mb-4">
                {currentList}
              </ol>
            ),
          )
          currentList = []
          currentListType = null
        }

        // Add the non-list block
        result.push(renderBlock(block, index))
      }
    })

    // Push any remaining list
    if (currentList.length > 0) {
      result.push(
        currentListType === "bulleted_list_item" ? (
          <ul key={`list-${result.length}`} className="list-disc mb-4">
            {currentList}
          </ul>
        ) : (
          <ol key={`list-${result.length}`} className="list-decimal mb-4">
            {currentList}
          </ol>
        ),
      )
    }

    return result
  }

  return (
    <article className="max-w-3xl mx-auto">
      {post.coverImage && (
        <div className="relative h-64 md:h-96 w-full mb-8">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <h1 className="text-4xl font-serif text-[#FAF3E0] mb-4">{post.title}</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3">
            <span className="text-[#D4AF37] font-serif">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="text-[#FAF3E0] font-medium">{post.author}</p>
            <p className="text-gray-400 text-sm">{post.date}</p>
          </div>
        </div>

        <div className="inline-block px-3 py-1 text-sm font-medium text-[#D4AF37] bg-[#D4AF37]/10 rounded-full">
          {post.category}
        </div>
      </div>

      {post.excerpt && (
        <div className="mb-8 text-xl text-gray-300 italic border-l-4 border-[#D4AF37]/40 pl-4">{post.excerpt}</div>
      )}

      <div className="prose prose-invert max-w-none">{renderContent()}</div>

      <div className="mt-12 pt-8 border-t border-[#D4AF37]/20">
        <Link href="/blog">
          <span className="text-[#D4AF37] hover:underline">← Back to Blog</span>
        </Link>
      </div>
    </article>
  )
}
