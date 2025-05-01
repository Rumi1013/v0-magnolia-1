// Integration service for Midnight Magnolia
// This file serves as the central hub for all third-party integrations

export type IntegrationConfig = {
  makeWebhookUrl?: string
  airtableApiKey?: string
  airtableBaseId?: string
  notionApiKey?: string
  notionDatabaseId?: string
  hubspotApiKey?: string
  supabaseUrl?: string
  supabaseKey?: string
}

// Default configuration using environment variables
export const defaultConfig: IntegrationConfig = {
  makeWebhookUrl: process.env.MAKE_WEBHOOK_URL,
  airtableApiKey: process.env.AIRTABLE_API_KEY,
  airtableBaseId: process.env.AIRTABLE_BASE_ID,
  notionApiKey: process.env.NOTION_API_KEY,
  notionDatabaseId: process.env.NOTION_DATABASE_ID,
  hubspotApiKey: process.env.HUBSPOT_API_KEY,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
}

// Integration service class
export class IntegrationService {
  private config: IntegrationConfig

  constructor(config: IntegrationConfig = defaultConfig) {
    this.config = config
  }

  // Check if all required integrations are configured
  public isConfigured(): boolean {
    return !!(
      this.config.makeWebhookUrl &&
      this.config.airtableApiKey &&
      this.config.airtableBaseId &&
      this.config.notionApiKey &&
      this.config.supabaseUrl &&
      this.config.supabaseKey
    )
  }

  // Get configuration status for each integration
  public getConfigStatus(): Record<string, boolean> {
    return {
      make: !!this.config.makeWebhookUrl,
      airtable: !!(this.config.airtableApiKey && this.config.airtableBaseId),
      notion: !!(this.config.notionApiKey && this.config.notionDatabaseId),
      hubspot: !!this.config.hubspotApiKey,
      supabase: !!(this.config.supabaseUrl && this.config.supabaseKey),
    }
  }
}

// Create and export a default instance
export const integrationService = new IntegrationService()
