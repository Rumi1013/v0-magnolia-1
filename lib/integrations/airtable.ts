import type { IntegrationConfig } from "./index"

export class AirtableService {
  private apiKey: string
  private baseId: string

  constructor(config: IntegrationConfig) {
    if (!config.airtableApiKey || !config.airtableBaseId) {
      throw new Error("Airtable API key and Base ID are required")
    }
    this.apiKey = config.airtableApiKey
    this.baseId = config.airtableBaseId
  }

  // Fetch records from a table
  async getRecords(
    tableName: string,
    options: {
      fields?: string[]
      filterByFormula?: string
      maxRecords?: number
      sort?: Array<{ field: string; direction: "asc" | "desc" }>
    } = {},
  ) {
    const url = new URL(`https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent(tableName)}`)

    // Add query parameters
    if (options.fields) {
      options.fields.forEach((field) => {
        url.searchParams.append("fields[]", field)
      })
    }

    if (options.filterByFormula) {
      url.searchParams.append("filterByFormula", options.filterByFormula)
    }

    if (options.maxRecords) {
      url.searchParams.append("maxRecords", options.maxRecords.toString())
    }

    if (options.sort) {
      options.sort.forEach((sortOption, index) => {
        url.searchParams.append(`sort[${index}][field]`, sortOption.field)
        url.searchParams.append(`sort[${index}][direction]`, sortOption.direction)
      })
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Create a new record
  async createRecord(tableName: string, fields: Record<string, any>) {
    const url = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent(tableName)}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Update an existing record
  async updateRecord(tableName: string, recordId: string, fields: Record<string, any>) {
    const url = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent(tableName)}/${recordId}`

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Delete a record
  async deleteRecord(tableName: string, recordId: string) {
    const url = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent(tableName)}/${recordId}`

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }
}
