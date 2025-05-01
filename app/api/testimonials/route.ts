import { NextResponse } from "next/server"
import { integrationFactory } from "@/lib/integrations/factory"

export async function GET() {
  try {
    const airtableService = integrationFactory.getAirtable()

    // Fetch testimonials from Airtable
    const response = await airtableService.getRecords("Testimonials", {
      sort: [{ field: "Date", direction: "desc" }],
    })

    // Transform Airtable data into a more usable format
    const testimonials = response.records.map((record: any) => {
      const fields = record.fields

      return {
        id: record.id,
        name: fields.Name || "Anonymous",
        role: fields.Role || "",
        company: fields.Company || "",
        testimonial: fields.Testimonial || "",
        rating: fields.Rating || 5,
        image: fields.Image?.[0]?.url || null,
        date: fields.Date
          ? new Date(fields.Date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          : "",
      }
    })

    // Return the testimonials
    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error("Error fetching testimonials from Airtable:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}
