import type { IntegrationConfig } from "./index"

export class MakeService {
  private webhookUrl: string | undefined

  constructor(config: IntegrationConfig) {
    this.webhookUrl = config.makeWebhookUrl
  }

  // Send data to a Make.com webhook
  async sendToWebhook(data: any, webhookUrl: string = this.webhookUrl!) {
    if (!webhookUrl) {
      throw new Error("Make.com webhook URL is required")
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Make.com webhook error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Trigger a specific scenario with data
  async triggerScenario(scenarioWebhookUrl: string, data: any) {
    const response = await fetch(scenarioWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Make.com scenario trigger error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }
}
