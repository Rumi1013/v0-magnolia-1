import { NextResponse } from "next/server"
import { integrationFactory } from "@/lib/integrations/factory"

export async function GET() {
  try {
    const supabaseService = integrationFactory.getSupabase()

    // Query products from Supabase
    const { data: products, error } = await supabaseService.query(
      "products",
      `id, name, description, price, category, image, featured, shopify_url, status`,
    )

    if (error) {
      throw error
    }

    // Transform data to match our Product type
    const transformedProducts = products.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      featured: product.featured,
      shopifyUrl: product.shopify_url,
      status: product.status,
    }))

    // Return the products
    return NextResponse.json({ products: transformedProducts })
  } catch (error) {
    console.error("Error fetching products from Supabase:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
