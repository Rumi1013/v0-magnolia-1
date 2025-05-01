import type { IntegrationConfig } from "./index"

export class NotionService {
  private apiKey: string
  private databaseId: string | undefined

  constructor(config: IntegrationConfig) {
    if (!config.notionApiKey) {
      throw new Error("Notion API key is required")
    }
    this.apiKey = config.notionApiKey
    this.databaseId = config.notionDatabaseId
  }

  // Query a database
  async queryDatabase(databaseId: string = this.databaseId!, filter?: any, sorts?: any[]) {
    if (!databaseId) {
      throw new Error("Database ID is required")
    }

    const url = `https://api.notion.com/v1/databases/${databaseId}/query`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter,
        sorts,
      }),
    })

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Create a page in a database
  async createPage(databaseId: string = this.databaseId!, properties: Record<string, any>) {
    if (!databaseId) {
      throw new Error("Database ID is required")
    }

    const url = "https://api.notion.com/v1/pages"

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    })

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Update a page
  async updatePage(pageId: string, properties: Record<string, any>) {
    const url = `https://api.notion.com/v1/pages/${pageId}`

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties,
      }),
    })

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get page content
  async getPageContent(pageId: string) {
    const url = `https://api.notion.com/v1/blocks/${pageId}/children`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Notion-Version": "2022-06-28",
      },
    })

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }
}
