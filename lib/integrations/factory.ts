import { type IntegrationConfig, defaultConfig } from "./index"
import { AirtableService } from "./airtable"
import { NotionService } from "./notion"
import { MakeService } from "./make"
import { HubspotService } from "./hubspot"
import { SupabaseService } from "./supabase-client"

export class IntegrationFactory {
  private config: IntegrationConfig
  private airtableService: AirtableService | null = null
  private notionService: NotionService | null = null
  private makeService: MakeService | null = null
  private hubspotService: HubspotService | null = null
  private supabaseService: SupabaseService | null = null

  constructor(config: IntegrationConfig = defaultConfig) {
    this.config = config
  }

  // Get Airtable service
  getAirtable(): AirtableService {
    if (!this.airtableService) {
      this.airtableService = new AirtableService(this.config)
    }
    return this.airtableService
  }

  // Get Notion service
  getNotion(): NotionService {
    if (!this.notionService) {
      this.notionService = new NotionService(this.config)
    }
    return this.notionService
  }

  // Get Make service
  getMake(): MakeService {
    if (!this.makeService) {
      this.makeService = new MakeService(this.config)
    }
    return this.makeService
  }

  // Get HubSpot service
  getHubspot(): HubspotService {
    if (!this.hubspotService) {
      this.hubspotService = new HubspotService(this.config)
    }
    return this.hubspotService
  }

  // Get Supabase service
  getSupabase(): SupabaseService {
    if (!this.supabaseService) {
      this.supabaseService = new SupabaseService(this.config)
    }
    return this.supabaseService
  }
}

// Create and export a default instance
export const integrationFactory = new IntegrationFactory()
