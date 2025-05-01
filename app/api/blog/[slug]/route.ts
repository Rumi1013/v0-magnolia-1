import { NextResponse } from "next/server"
import { integrationFactory } from "@/lib/integrations/factory"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const notionService = integrationFactory.getNotion()

    // Query the Notion database for the specific post
    const response = await notionService.queryDatabase(undefined, {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    })

    // Check if post exists
    if (!response.results || response.results.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const page = response.results[0]
    const properties = page.properties

    // Get the page content
    const contentResponse = await notionService.getPageContent(page.id)

    // Transform the content blocks
    const blocks = contentResponse.results.map((block: any) => {
      // Process different block types
      switch (block.type) {
        case "paragraph":
          return {
            type: "paragraph",
            content: block.paragraph.rich_text.map((text: any) => ({
              text: text.plain_text,
              annotations: text.annotations,
            })),
          }
        case "heading_1":
          return {
            type: "heading_1",
            content: block.heading_1.rich_text.map((text: any) => ({
              text: text.plain_text,
              annotations: text.annotations,
            })),
          }
        case "heading_2":
          return {
            type: "heading_2",
            content: block.heading_2.rich_text.map((text: any) => ({
              text: text.plain_text,
              annotations: text.annotations,
            })),
          }
        case "heading_3":
          return {
            type: "heading_3",
            content: block.heading_3.rich_text.map((text: any) => ({
              text: text.plain_text,
              annotations: text.annotations,
            })),
          }
        case "bulleted_list_item":
          return {
            type: "bulleted_list_item",
            content: block.bulleted_list_item.rich_text.map((text: any) => ({
              text: text.plain_text,
              annotations: text.annotations,
            })),
          }
        case "numbered_list_item":
          return {
            type: "numbered_list_item",
            content: block.numbered_list_item.rich_text.map((text: any) => ({
              text: text.plain_text,
              annotations: text.annotations,
            })),
          }
        case "image":
          return {
            type: "image",
            url: block.image.file?.url || block.image.external?.url,
            caption: block.image.caption?.length > 0 ? block.image.caption[0].plain_text : "",
          }
        case "quote":
          return {
            type: "quote",
            content: block.quote.rich_text.map((text: any) => ({
              text: text.plain_text,
              annotations: text.annotations,
            })),
          }
        case "code":
          return {
            type: "code",
            language: block.code.language,
            content: block.code.rich_text.map((text: any) => ({
              text: text.plain_text,
              annotations: text.annotations,
            })),
          }
        case "divider":
          return {
            type: "divider",
          }
        default:
          return {
            type: "unsupported",
            blockType: block.type,
          }
      }
    })

    // Construct the post object
    const post = {
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
      content: blocks,
    }

    // Return the post
    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error fetching blog post from Notion:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}
