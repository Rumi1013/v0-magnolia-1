/**
 * Midnight Magnolia Integration Secrets Setup
 * 
 * This utility allows you to set up and verify the necessary secrets for 
 * the Midnight Magnolia service integrations.
 */

import dotenv from 'dotenv';
import { requiredIntegrationEnvVars, checkIntegrationEnvVars } from './index';

// Load environment variables
dotenv.config();

/**
 * Main function to run the secrets setup wizard
 */
async function setupSecrets() {
  console.log('\n==================================');
  console.log('🌙 Midnight Magnolia Secrets Setup');
  console.log('==================================\n');
  
  console.log('This utility will help you set up the necessary secrets for your service integrations.');
  console.log('It will check which secrets are already set and guide you through setting up the missing ones.\n');
  
  // Check all integrations
  const integrations = Object.keys(requiredIntegrationEnvVars) as Array<keyof typeof requiredIntegrationEnvVars>;
  
  // Track overall status
  let allReady = true;
  
  // Display status for each integration
  for (const integration of integrations) {
    const status = checkIntegrationEnvVars(integration);
    
    console.log(`\n--- ${capitalize(integration)} Integration ${status.ready ? '✅' : '❌'} ---`);
    
    if (status.ready) {
      console.log(`All required secrets for ${integration} are set.`);
    } else {
      allReady = false;
      console.log(`Missing secrets for ${integration}:`);
      status.missing.forEach(secret => {
        console.log(`  - ${secret}`);
      });
      
      // Display instructions for each integration
      console.log('\nTo set up these secrets:');
      
      switch (integration) {
        case 'notion':
          console.log(`
  1. Go to https://www.notion.so/my-integrations
  2. Create a new integration or select an existing one
  3. Copy the "Internal Integration Secret" - this is your NOTION_INTEGRATION_SECRET
  4. For NOTION_PAGE_URL, use the URL of your Midnight Magnolia hub page
     (e.g., https://www.notion.so/Midnight-Magnolia-Master-Project-Hub-6b0f54b2a8ba4d1f97897afa2df1c4e7)
  5. Add these values to your .env file:
     NOTION_INTEGRATION_SECRET=your_integration_secret
     NOTION_PAGE_URL=your_page_url
`);
          break;
          
        case 'airtable':
          console.log(`
  1. Go to https://airtable.com/account
  2. Under "API" section, generate an API key if you don't have one
  3. Copy the API key - this is your AIRTABLE_API_KEY
  4. Go to your Airtable base and click "Help" > "API Documentation"
  5. In the API documentation, find your base ID in the URL or introduction
  6. Add these values to your .env file:
     AIRTABLE_API_KEY=your_api_key
     AIRTABLE_BASE_ID=your_base_id
`);
          break;
          
        case 'hubspot':
          console.log(`
  1. Go to https://app.hubspot.com/settings/account/integrations/api-key
  2. Generate a new API key or use an existing one
  3. Copy the API key - this is your HUBSPOT_API_KEY
  4. Add this value to your .env file:
     HUBSPOT_API_KEY=your_api_key
`);
          break;
          
        case 'patreon':
          console.log(`
  1. Go to https://www.patreon.com/portal/registration/register-clients
  2. Create a new client (or use existing)
  3. From the client details, copy:
     - Client ID (PATREON_CLIENT_ID)
     - Client Secret (PATREON_CLIENT_SECRET)
  4. To get your creator access token, follow the OAuth flow or use the Patreon API console
  5. Add these values to your .env file:
     PATREON_CLIENT_ID=your_client_id
     PATREON_CLIENT_SECRET=your_client_secret
     PATREON_CREATOR_ACCESS_TOKEN=your_access_token
`);
          break;
          
        case 'googleCloud':
          console.log(`
  1. Go to https://console.cloud.google.com/
  2. Create a new project or select an existing one
  3. Get your project ID - this is your GOOGLE_CLOUD_PROJECT_ID
  4. Create a storage bucket and note its name - this is your GOOGLE_CLOUD_STORAGE_BUCKET
  5. Add these values to your .env file:
     GOOGLE_CLOUD_PROJECT_ID=your_project_id
     GOOGLE_CLOUD_STORAGE_BUCKET=your_bucket_name
`);
          break;
          
        case 'make':
          console.log(`
  1. Go to https://www.make.com
  2. Create scenarios based on the blueprints in the documentation
  3. For each scenario, get the webhook URL
  4. Add these values to your .env file:
     MAKE_CONTENT_DISTRIBUTION_WEBHOOK=your_webhook_url
     MAKE_CLIENT_ONBOARDING_WEBHOOK=your_webhook_url
     MAKE_PATREON_SYNC_WEBHOOK=your_webhook_url
`);
          break;
      }
    }
  }
  
  console.log('\n==================================');
  if (allReady) {
    console.log('✅ All integration secrets are set and ready to use!');
  } else {
    console.log('ℹ️ Some integration secrets are missing. Please set them up using the instructions above.');
    console.log('   After setting the secrets, run this utility again to verify your setup.');
  }
  console.log('==================================\n');
}

// Helper to capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupSecrets()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Setup failed:', error);
      process.exit(1);
    });
}

export { setupSecrets };