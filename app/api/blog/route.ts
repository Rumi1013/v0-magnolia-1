import { NextResponse } from "next/server"
import { integrationFactory } from "@/lib/integrations/factory"

export async function GET() {
  try {
    const notionService = integrationFactory.getNotion()

    // Query the Notion database
    const response = await notionService.queryDatabase()

    // Transform Notion data into a more usable format
    const posts = response.results.map((page: any) => {
      const properties = page.properties

      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || "Untitled",
        excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || "",
        coverImage:
          properties.CoverImage?.files?.[0]?.file?.url || properties.CoverImage?.files?.[0]?.external?.url || "",
        date: properties.Date?.date?.start
          ? new Date(properties.Date.date.start).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "No date",
        slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
        author: properties.Author?.select?.name || "Unknown Author",
        category: properties.Category?.select?.name || "Uncategorized",
      }
    })

    // Return the posts
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching blog posts from Notion:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
