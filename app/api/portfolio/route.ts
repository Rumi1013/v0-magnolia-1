import { NextResponse } from "next/server"
import { integrationFactory } from "@/lib/integrations/factory"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const supabaseService = integrationFactory.getSupabase()

    // Query portfolio items from Supabase
    let query = supabaseService
      .getClient()
      .from("portfolio")
      .select("id, title, description, category, image, client, year, tags")

    // Apply category filter if provided
    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    const { data: items, error } = await query

    if (error) {
      throw error
    }

    // Return the portfolio items
    return NextResponse.json({ items })
  } catch (error) {
    console.error("Error fetching portfolio items from Supabase:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio items" }, { status: 500 })
  }
}
