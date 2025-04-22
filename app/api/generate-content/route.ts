import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: NextRequest) {
  try {
    const { prompt, contentType, tone } = await req.json()

    // Create a system prompt based on the content type and tone
    const systemPrompt = `You are an expert content creator specializing in creating ${contentType} content with a ${tone} tone. 
    You focus on Southern heritage, Black women's resilience, and digital creativity themes.
    Create content that is engaging, authentic, and aligns with the Midnight Magnolia brand.`

    // Generate the content using Groq
    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: prompt,
      system: systemPrompt,
      maxTokens: 1000,
    })

    return NextResponse.json({ content: text })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
