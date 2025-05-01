import { NextResponse } from "next/server"
import { integrationFactory } from "@/lib/integrations/factory"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { name, email, subject, message, interest } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Initialize services
    const makeService = integrationFactory.getMake()
    const airtableService = integrationFactory.getAirtable()

    // Store in Airtable
    try {
      await airtableService.createRecord("Contacts", {
        Name: name,
        Email: email,
        Subject: subject || "Website Contact Form",
        Message: message,
        Interest: interest || "Not specified",
        Source: "Website",
        "Date Submitted": new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error storing contact in Airtable:", error)
      // Continue execution even if Airtable fails
    }

    // Send to Make.com webhook for further processing
    try {
      await makeService.sendToWebhook({
        name,
        email,
        subject: subject || "Website Contact Form",
        message,
        interest: interest || "Not specified",
        source: "Website",
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error sending to Make.com:", error)
      // Continue execution even if Make.com fails
    }

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
