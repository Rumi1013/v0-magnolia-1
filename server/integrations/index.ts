/**
 * Midnight Magnolia Service Integrations
 * 
 * This file exports all the necessary components for integrating with external services:
 * - Notion
 * - Airtable
 * - HubSpot CRM
 * - Patreon
 * - Google Cloud
 * - Make.com
 */

// Re-export all integration components
export * from './make-workflows';
export * from './notion-integration';
export * from './route-handlers';
export * from './setup-notion';

// Import route handlers for registering in the main Express app
import { Express } from 'express';
import {
  getNotionDatabase,
  createNotionPage,
  getAirtableRecords,
  createAirtableRecord,
  syncHubSpotContact,
  createHubSpotDeal,
  getPatreonMember,
  createPatreonPost,
  handlePatreonWebhook,
  generateGoogleUploadUrl,
  triggerContentDistribution,
  triggerClientOnboarding,
  handleMakeResponse,
  checkIntegrationStatus
} from './route-handlers';

/**
 * Register all integration routes with the Express app
 * @param app Express application instance
 */
export function registerIntegrationRoutes(app: Express): void {
  // Check all integrations status
  app.get("/api/integrations/status", checkIntegrationStatus);
  
  // ===== MAKE.COM INTEGRATION ROUTES =====
  
  // Trigger content distribution workflow in Make.com
  app.post("/api/integrations/make/content-distribution", triggerContentDistribution);
  
  // Trigger client onboarding workflow in Make.com
  app.post("/api/integrations/make/client-onboarding", triggerClientOnboarding);
  
  // Receive webhook responses from Make.com workflows
  app.post("/api/integrations/make/webhook", handleMakeResponse);
  
  // ===== PATREON INTEGRATION ROUTES =====
  
  // Get Patreon member information
  app.get("/api/integrations/patreon/members/:memberId", getPatreonMember);
  
  // Create a post on Patreon
  app.post("/api/integrations/patreon/posts", createPatreonPost);
  
  // Handle Patreon webhooks
  app.post("/api/integrations/patreon/webhook", handlePatreonWebhook);
  
  // ===== HUBSPOT INTEGRATION ROUTES =====
  
  // Sync a client to HubSpot
  app.post("/api/integrations/hubspot/contacts", syncHubSpotContact);
  
  // Create a deal in HubSpot
  app.post("/api/integrations/hubspot/deals", createHubSpotDeal);
  
  // ===== GOOGLE CLOUD INTEGRATION ROUTES =====
  
  // Generate a signed upload URL for Google Cloud Storage
  app.post("/api/integrations/google/upload-url", generateGoogleUploadUrl);
  
  // ===== ADDITIONAL NOTION INTEGRATION ROUTES =====
  
  // Get a Notion database by name/type (extension of existing Notion routes)
  app.get("/api/integrations/notion/databases/by-name/:databaseName", getNotionDatabase);
  
  // Create a Notion page with specific template
  app.post("/api/integrations/notion/pages/template", createNotionPage);
  
  // ===== ADDITIONAL AIRTABLE INTEGRATION ROUTES =====
  
  // Get Airtable records by query
  app.post("/api/integrations/airtable/query", getAirtableRecords);
  
  // Create a record in Airtable
  app.post("/api/integrations/airtable/records", createAirtableRecord);
}

/**
 * Environment variables required for integrations
 * 
 * These are the environment variables that should be set for the integrations to work properly.
 * This constant can be used to check if all required variables are set.
 */
export const requiredIntegrationEnvVars = {
  notion: ['NOTION_INTEGRATION_SECRET', 'NOTION_PAGE_URL'],
  airtable: ['AIRTABLE_API_KEY', 'AIRTABLE_BASE_ID'],
  hubspot: ['HUBSPOT_API_KEY'],
  patreon: ['PATREON_CLIENT_ID', 'PATREON_CLIENT_SECRET', 'PATREON_CREATOR_ACCESS_TOKEN'],
  googleCloud: ['GOOGLE_CLOUD_PROJECT_ID', 'GOOGLE_CLOUD_STORAGE_BUCKET'],
  make: [
    'MAKE_CONTENT_DISTRIBUTION_WEBHOOK', 
    'MAKE_CLIENT_ONBOARDING_WEBHOOK', 
    'MAKE_PATREON_SYNC_WEBHOOK'
  ]
};

/**
 * Check if all required environment variables for a specific integration are set
 * @param integration Name of the integration to check
 * @returns Object with status and missing variables (if any)
 */
export function checkIntegrationEnvVars(integration: keyof typeof requiredIntegrationEnvVars): {
  ready: boolean;
  missing: string[];
} {
  const requiredVars = requiredIntegrationEnvVars[integration];
  const missing: string[] = [];
  
  if (!requiredVars) {
    return { ready: false, missing: ['Unknown integration'] };
  }
  
  for (const envVar of requiredVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }
  
  return {
    ready: missing.length === 0,
    missing
  };
}