import { NextResponse } from "next/server"
import { integrationFactory } from "@/lib/integrations/factory"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Initialize services
    const makeService = integrationFactory.getMake()
    const airtableService = integrationFactory.getAirtable()
    const hubspotService = integrationFactory.getHubspot()

    // Store in Airtable
    try {
      await airtableService.createRecord("Newsletter Subscribers", {
        Email: email,
        "Date Subscribed": new Date().toISOString(),
        Source: "Website",
        Status: "Active",
      })
    } catch (error) {
      console.error("Error storing subscriber in Airtable:", error)
      // Continue execution even if Airtable fails
    }

    // Add to HubSpot if configured
    if (hubspotService.isConfigured()) {
      try {
        await hubspotService.upsertContact(email, {
          email,
          newsletter_subscriber: "true",
          newsletter_signup_date: new Date().toISOString(),
          source: "Website Newsletter Form",
        })
      } catch (error) {
        console.error("Error adding subscriber to HubSpot:", error)
        // Continue execution even if HubSpot fails
      }
    }

    // Send to Make.com webhook for further processing
    try {
      await makeService.sendToWebhook({
        email,
        action: "newsletter_signup",
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
    console.error("Error processing newsletter signup:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
