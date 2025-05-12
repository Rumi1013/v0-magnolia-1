/**
 * Midnight Magnolia Notion Setup
 * 
 * This script helps set up the Notion integration for the Midnight Magnolia Content Creation Dashboard.
 * It provides utilities for connecting to your existing Notion workspace and configuring the necessary databases.
 * 
 * The script assumes you already have a Notion workspace with a page that will be used as the "hub" for
 * Midnight Magnolia content. The URL for this page is specified in the NOTION_PAGE_URL environment variable.
 */

import { notionService } from '../notion';
import { notionDatabases, setupNotionDatabases } from './notion-integration';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const NOTION_PAGE_URL = process.env.NOTION_PAGE_URL;
const NOTION_INTEGRATION_SECRET = process.env.NOTION_INTEGRATION_SECRET;

// Function to extract the page ID from a Notion URL
function extractPageIdFromUrl(url: string): string {
  // Extract the page ID from the URL
  // Notion page URLs are in the format: https://www.notion.so/workspace/page-title-pageId?queryParams
  // or https://www.notion.so/page-title-pageId?queryParams
  
  // The page ID is a 32-character hexadecimal string
  const match = url.match(/([a-f0-9]{32})/i);
  
  if (match && match[1]) {
    return match[1];
  }
  
  throw new Error('Invalid Notion page URL. Could not extract page ID.');
}

// Main function to set up Notion integration
async function setupNotion() {
  try {
    console.log('Starting Notion integration setup...');
    
    // Verify environment variables
    if (!NOTION_INTEGRATION_SECRET) {
      throw new Error('NOTION_INTEGRATION_SECRET environment variable is missing. Please add it to your .env file.');
    }
    
    if (!NOTION_PAGE_URL) {
      throw new Error('NOTION_PAGE_URL environment variable is missing. Please add it to your .env file.');
    }
    
    // Extract the page ID from the URL
    console.log(`Using Notion page URL: ${NOTION_PAGE_URL}`);
    const pageId = extractPageIdFromUrl(NOTION_PAGE_URL);
    console.log(`Extracted page ID: ${pageId}`);
    
    // Verify connection to Notion
    console.log('Verifying connection to Notion...');
    const user = await notionService.getCurrentUser();
    console.log(`Connected to Notion as: ${user.name || 'Integration'} (${user.type})`);
    
    // Check if databases already exist
    console.log('Checking for existing databases...');
    const databases = await notionService.listDatabases();
    
    // Map of database names to IDs
    const existingDatabases: { [key: string]: string } = {};
    
    // Check each database
    for (const database of databases) {
      if (database.title && Array.isArray(database.title) && database.title.length > 0) {
        const dbName = database.title[0].plain_text;
        
        // Check if it's one of our expected databases
        const databaseValues = Object.values(notionDatabases);
        if (databaseValues.includes(dbName)) {
          existingDatabases[dbName] = database.id;
          console.log(`Found existing database: ${dbName} (${database.id})`);
        }
      }
    }
    
    // Check which databases need to be created
    const missingDatabases = Object.values(notionDatabases).filter(
      dbName => !existingDatabases[dbName]
    );
    
    if (missingDatabases.length === 0) {
      console.log('All required databases already exist in your Notion workspace.');
    } else {
      console.log(`Missing databases: ${missingDatabases.join(', ')}`);
      
      // Prompt user to confirm database creation
      console.log('\nWould you like to create the missing databases? (yes/no)');
      // In a real CLI application, you would wait for user input here
      // For this script, we'll assume 'yes'
      
      // Run the database setup
      console.log('\nCreating missing databases...');
      await setupNotionDatabases(pageId);
      console.log('Database creation complete!');
    }
    
    // Summary
    console.log('\nNotion Integration Setup Summary:');
    console.log('--------------------------------');
    console.log(`Notion Hub Page: ${NOTION_PAGE_URL}`);
    console.log(`Page ID: ${pageId}`);
    console.log('Integration Status: Connected');
    
    // List all databases (including newly created ones)
    console.log('\nAvailable Databases:');
    const updatedDatabases = await notionService.listDatabases();
    
    for (const database of updatedDatabases) {
      if (database.title && Array.isArray(database.title) && database.title.length > 0) {
        const dbName = database.title[0].plain_text;
        
        // Check if it's one of our expected databases
        const databaseValues = Object.values(notionDatabases);
        if (databaseValues.includes(dbName)) {
          console.log(`- ${dbName} (${database.id})`);
        }
      }
    }
    
    console.log('\nSetup complete! Your Notion integration is ready to use.');
    console.log('Add these values to your .env file if not already present:');
    console.log(`NOTION_INTEGRATION_SECRET=${NOTION_INTEGRATION_SECRET}`);
    console.log(`NOTION_PAGE_URL=${NOTION_PAGE_URL}`);
    
  } catch (error) {
    console.error('Error setting up Notion integration:', error);
    process.exit(1);
  }
}

// Run the setup if needed - in ES modules, we'll handle this differently
// The setup will be called explicitly from other files instead
export default setupNotion;

export { setupNotion, extractPageIdFromUrl };