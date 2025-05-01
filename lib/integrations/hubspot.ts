import type { IntegrationConfig } from "./index"

export class HubspotService {
  private apiKey: string | undefined

  constructor(config: IntegrationConfig) {
    this.apiKey = config.hubspotApiKey
  }

  // Check if HubSpot is configured
  isConfigured(): boolean {
    return !!this.apiKey
  }

  // Create or update a contact
  async upsertContact(email: string, properties: Record<string, any>) {
    if (!this.apiKey) {
      throw new Error("HubSpot API key is required")
    }

    const url = `https://api.hubapi.com/crm/v3/objects/contacts/batch/update`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [
          {
            id: email,
            properties,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Create a deal
  async createDeal(properties: Record<string, any>, associations?: Record<string, string[]>) {
    if (!this.apiKey) {
      throw new Error("HubSpot API key is required")
    }

    const url = "https://api.hubapi.com/crm/v3/objects/deals"

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties,
        associations,
      }),
    })

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get contact by email
  async getContactByEmail(email: string) {
    if (!this.apiKey) {
      throw new Error("HubSpot API key is required")
    }

    const url = `https://api.hubapi.com/crm/v3/objects/contacts/search`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: email,
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }
}
