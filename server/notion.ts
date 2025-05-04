import { Client } from '@notionhq/client';
import { CreateDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export class NotionService {
  /**
   * Creates a new database in a Notion page
   * @param parentPageId The ID of the parent page where the database will be created
   * @param title Title of the database
   * @param properties Object defining the database schema
   * @returns The created database object
   */
  async createDatabase(
    parentPageId: string,
    title: string,
    properties: CreateDatabaseParameters['properties']
  ) {
    try {
      const response = await notion.databases.create({
        parent: {
          type: "page_id",
          page_id: parentPageId,
        },
        title: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
        properties: properties,
      });
      
      return response;
    } catch (error) {
      console.error('Error creating Notion database:', error);
      throw error;
    }
  }

  /**
   * Gets a list of databases the integration has access to
   */
  async listDatabases() {
    try {
      const response = await notion.search({
        filter: {
          value: 'database',
          property: 'object'
        }
      });
      
      return response.results;
    } catch (error) {
      console.error('Error listing Notion databases:', error);
      throw error;
    }
  }

  /**
   * Gets a specific database by ID
   * @param databaseId The ID of the database to retrieve
   */
  async getDatabase(databaseId: string) {
    try {
      const response = await notion.databases.retrieve({
        database_id: databaseId,
      });
      
      return response;
    } catch (error) {
      console.error('Error getting Notion database:', error);
      throw error;
    }
  }

  /**
   * Adds a new page (row) to a database
   * @param databaseId The ID of the database to add the page to
   * @param properties The properties of the new page
   */
  async addDatabasePage(databaseId: string, properties: any) {
    try {
      const response = await notion.pages.create({
        parent: {
          database_id: databaseId,
        },
        properties: properties,
      });
      
      return response;
    } catch (error) {
      console.error('Error adding page to Notion database:', error);
      throw error;
    }
  }

  /**
   * Lists pages from a specific database
   * @param databaseId The ID of the database to query
   */
  async queryDatabase(databaseId: string) {
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
      });
      
      return response.results;
    } catch (error) {
      console.error('Error querying Notion database:', error);
      throw error;
    }
  }
}

export const notionService = new NotionService();