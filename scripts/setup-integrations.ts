/**
 * Midnight Magnolia Integrations Setup Script
 * 
 * This script helps you set up all the necessary integrations for the Midnight Magnolia
 * Content Creation Dashboard. It guides you through setting up:
 * 
 * - Notion (content management and templates)
 * - Airtable (content inventory and tracking)
 * - HubSpot CRM (client management)
 * - Patreon (membership management)
 * - Google Cloud (file storage)
 * - Make.com (workflow automation)
 */

import { setupSecrets } from '../server/integrations/setup-secrets';
import { setupNotion } from '../server/integrations/setup-notion';

async function main() {
  try {
    console.log('🌙 Welcome to Midnight Magnolia Integrations Setup!');
    console.log('This script will help you set up all the necessary integrations for your dashboard.');
    
    // Step 1: Check and setup secrets
    console.log('\n📋 STEP 1: Checking integration secrets...');
    await setupSecrets();
    
    // Step 2: Setup Notion integration (if credentials are present)
    if (process.env.NOTION_INTEGRATION_SECRET && process.env.NOTION_PAGE_URL) {
      console.log('\n📓 STEP 2: Setting up Notion integration...');
      await setupNotion();
    } else {
      console.log('\n📓 STEP 2: Skipping Notion setup (missing credentials)');
      console.log('Please add NOTION_INTEGRATION_SECRET and NOTION_PAGE_URL to your .env file');
      console.log('Then run this script again to continue the setup process.');
    }
    
    // Final step: Summary
    console.log('\n✨ Setup Process Complete!');
    console.log('Your Midnight Magnolia integrations are now configured.');
    console.log('\nNext Steps:');
    console.log('1. Complete any missing integration setups based on the instructions above');
    console.log('2. Check the services connections in the dashboard at /admin/integrations');
    console.log('3. Set up Make.com workflows using the blueprints provided in the documentation');
    
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

// Run the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  });