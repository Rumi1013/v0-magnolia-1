import { Client } from '@notionhq/client';
import { 
  CreateDatabaseParameters, 
  QueryDatabaseParameters,
  UpdateDatabaseParameters,
  CreatePageParameters
} from '@notionhq/client/build/src/api-endpoints';

/**
 * Error handling for Notion API
 */
class NotionApiError extends Error {
  status: number;
  code: string;
  
  constructor(message: string, status = 500, code = 'notion_error') {
    super(message);
    this.name = 'NotionApiError';
    this.status = status;
    this.code = code;
  }
}

// Initialize the Notion client with error handling
const notion = new Client({
  auth: process.env.NOTION_INTEGRATION_SECRET,
});

// Validate if API key is set
if (!process.env.NOTION_INTEGRATION_SECRET) {
  console.warn('NOTION_INTEGRATION_SECRET environment variable is not set. Notion integration will not work.');
}

// Extract page ID from Notion page URL
function extractPageIdFromUrl(pageUrl: string): string {
  const match = pageUrl.match(/([a-f0-9]{32})(?:[?#]|$)/i);
  if (match && match[1]) {
    return match[1];
  }
  throw new NotionApiError('Failed to extract page ID from URL', 400, 'invalid_page_url');
}

// Get the parent page ID for Midnight Magnolia from environment variables
export const NOTION_PAGE_ID = process.env.NOTION_PAGE_URL 
  ? extractPageIdFromUrl(process.env.NOTION_PAGE_URL)
  : null;

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
    properties: CreateDatabaseParameters['properties'],
    icon?: string,
    cover?: string
  ) {
    try {
      // Clean and validate the parent page ID
      const cleanPageId = parentPageId.replace(/-/g, '');
      
      // Prepare database parameters
      const params: CreateDatabaseParameters = {
        parent: {
          type: "page_id",
          page_id: cleanPageId,
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
      };
      
      // Add icon if provided
      if (icon) {
        params.icon = {
          type: "emoji",
          emoji: icon
        } as any;
      }
      
      // Add cover if provided
      if (cover) {
        params.cover = {
          type: "external",
          external: {
            url: cover
          }
        };
      }
      
      const response = await notion.databases.create(params);
      return response;
    } catch (error: any) {
      console.error('Error creating Notion database:', error);
      
      // Enhanced error handling with user-friendly messages
      if (error.status === 404) {
        throw new NotionApiError(
          'Parent page not found or your integration doesn\'t have access to it. Make sure to share the page with your integration.',
          404,
          'page_not_found'
        );
      } else if (error.code === 'validation_error') {
        throw new NotionApiError(
          'Invalid database properties. Please check your schema format.',
          400,
          'invalid_schema'
        );
      } else if (error.status === 401) {
        throw new NotionApiError(
          'Authentication error. Please check your Notion API key.',
          401,
          'unauthorized'
        );
      }
      
      throw error;
    }
  }

  /**
   * Gets a list of databases the integration has access to
   * @param query Optional search query to filter databases
   */
  async listDatabases(query?: string) {
    try {
      const params: any = {
        filter: {
          value: 'database',
          property: 'object'
        }
      };
      
      // Add search query if provided
      if (query) {
        params.query = query;
      }
      
      const response = await notion.search(params);
      return response.results;
    } catch (error: any) {
      console.error('Error listing Notion databases:', error);
      
      if (error.status === 401) {
        throw new NotionApiError(
          'Authentication error. Please check your Notion API key.',
          401,
          'unauthorized'
        );
      }
      
      throw error;
    }
  }

  /**
   * Gets a specific database by ID
   * @param databaseId The ID of the database to retrieve
   */
  async getDatabase(databaseId: string) {
    try {
      // Clean the database ID
      const cleanDatabaseId = databaseId.replace(/-/g, '');
      
      const response = await notion.databases.retrieve({
        database_id: cleanDatabaseId,
      });
      
      return response;
    } catch (error: any) {
      console.error('Error getting Notion database:', error);
      
      if (error.status === 404) {
        throw new NotionApiError(
          'Database not found or your integration doesn\'t have access to it.',
          404,
          'database_not_found'
        );
      } else if (error.status === 401) {
        throw new NotionApiError(
          'Authentication error. Please check your Notion API key.',
          401,
          'unauthorized'
        );
      }
      
      throw error;
    }
  }

  /**
   * Updates an existing database schema
   * @param databaseId The ID of the database to update
   * @param title New title for the database (optional)
   * @param properties New properties for the database (optional)
   */
  async updateDatabase(
    databaseId: string, 
    title?: string, 
    properties?: UpdateDatabaseParameters['properties']
  ) {
    try {
      // Clean the database ID
      const cleanDatabaseId = databaseId.replace(/-/g, '');
      
      const params: UpdateDatabaseParameters = {
        database_id: cleanDatabaseId,
      };
      
      // Add title if provided
      if (title) {
        params.title = [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ];
      }
      
      // Add properties if provided
      if (properties) {
        params.properties = properties;
      }
      
      const response = await notion.databases.update(params);
      return response;
    } catch (error: any) {
      console.error('Error updating Notion database:', error);
      
      if (error.status === 404) {
        throw new NotionApiError(
          'Database not found or your integration doesn\'t have access to it.',
          404,
          'database_not_found'
        );
      } else if (error.code === 'validation_error') {
        throw new NotionApiError(
          'Invalid database properties. Please check your schema format.',
          400,
          'invalid_schema'
        );
      }
      
      throw error;
    }
  }

  /**
   * Adds a new page (row) to a database
   * @param databaseId The ID of the database to add the page to
   * @param properties The properties of the new page
   * @param icon Optional emoji icon for the page
   */
  async addDatabasePage(
    databaseId: string, 
    properties: CreatePageParameters['properties'],
    icon?: string,
    children?: any[]
  ) {
    try {
      // Clean the database ID
      const cleanDatabaseId = databaseId.replace(/-/g, '');
      
      // Prepare page parameters
      const params: CreatePageParameters = {
        parent: {
          database_id: cleanDatabaseId,
        },
        properties: properties,
      };
      
      // Add icon if provided
      if (icon) {
        params.icon = {
          type: "emoji",
          emoji: icon
        } as any;
      }
      
      // Add children if provided
      if (children && children.length > 0) {
        params.children = children;
      }
      
      const response = await notion.pages.create(params);
      return response;
    } catch (error: any) {
      console.error('Error adding page to Notion database:', error);
      
      if (error.status === 404) {
        throw new NotionApiError(
          'Database not found or your integration doesn\'t have access to it.',
          404,
          'database_not_found'
        );
      } else if (error.code === 'validation_error') {
        throw new NotionApiError(
          'Invalid page properties. Please check that properties match the database schema.',
          400,
          'invalid_properties'
        );
      } else if (error.status === 401) {
        throw new NotionApiError(
          'Authentication error. Please check your Notion API key.',
          401,
          'unauthorized'
        );
      }
      
      throw error;
    }
  }

  /**
   * Lists pages from a specific database with optional filtering and sorting
   * @param databaseId The ID of the database to query
   * @param filter Optional filter conditions
   * @param sorts Optional sorting specifications
   */
  async queryDatabase(
    databaseId: string,
    filter?: QueryDatabaseParameters['filter'],
    sorts?: QueryDatabaseParameters['sorts'],
    pageSize?: number
  ) {
    try {
      // Clean the database ID
      const cleanDatabaseId = databaseId.replace(/-/g, '');
      
      // Prepare query parameters
      const params: QueryDatabaseParameters = {
        database_id: cleanDatabaseId,
      };
      
      // Add filter if provided
      if (filter) {
        params.filter = filter;
      }
      
      // Add sorts if provided
      if (sorts) {
        params.sorts = sorts;
      }
      
      // Add page size if provided
      if (pageSize) {
        params.page_size = pageSize;
      }
      
      const response = await notion.databases.query(params);
      return response.results;
    } catch (error: any) {
      console.error('Error querying Notion database:', error);
      
      if (error.status === 404) {
        throw new NotionApiError(
          'Database not found or your integration doesn\'t have access to it.',
          404,
          'database_not_found'
        );
      } else if (error.code === 'validation_error') {
        throw new NotionApiError(
          'Invalid filter or sort parameters.',
          400,
          'invalid_query'
        );
      } else if (error.status === 401) {
        throw new NotionApiError(
          'Authentication error. Please check your Notion API key.',
          401,
          'unauthorized'
        );
      }
      
      throw error;
    }
  }
  
  /**
   * Retrieves a single page by its ID
   * @param pageId The ID of the page to retrieve
   */
  async getPage(pageId: string) {
    try {
      // Clean the page ID
      const cleanPageId = pageId.replace(/-/g, '');
      
      const response = await notion.pages.retrieve({
        page_id: cleanPageId,
      });
      
      return response;
    } catch (error: any) {
      console.error('Error retrieving Notion page:', error);
      
      if (error.status === 404) {
        throw new NotionApiError(
          'Page not found or your integration doesn\'t have access to it.',
          404,
          'page_not_found'
        );
      } else if (error.status === 401) {
        throw new NotionApiError(
          'Authentication error. Please check your Notion API key.',
          401,
          'unauthorized'
        );
      }
      
      throw error;
    }
  }
  
  /**
   * Updates a page's properties
   * @param pageId The ID of the page to update
   * @param properties The properties to update
   */
  async updatePage(pageId: string, properties: any, archived: boolean = false) {
    try {
      // Clean the page ID
      const cleanPageId = pageId.replace(/-/g, '');
      
      const response = await notion.pages.update({
        page_id: cleanPageId,
        properties: properties,
        archived: archived
      });
      
      return response;
    } catch (error: any) {
      console.error('Error updating Notion page:', error);
      
      if (error.status === 404) {
        throw new NotionApiError(
          'Page not found or your integration doesn\'t have access to it.',
          404,
          'page_not_found'
        );
      } else if (error.code === 'validation_error') {
        throw new NotionApiError(
          'Invalid page properties. Please check the property format.',
          400,
          'invalid_properties'
        );
      }
      
      throw error;
    }
  }
  
  /**
   * Archives or deletes a page (soft delete)
   * @param pageId The ID of the page to archive
   */
  async archivePage(pageId: string) {
    try {
      // Clean the page ID
      const cleanPageId = pageId.replace(/-/g, '');
      
      const response = await notion.pages.update({
        page_id: cleanPageId,
        archived: true,
      });
      
      return response;
    } catch (error: any) {
      console.error('Error archiving Notion page:', error);
      
      if (error.status === 404) {
        throw new NotionApiError(
          'Page not found or your integration doesn\'t have access to it.',
          404,
          'page_not_found'
        );
      }
      
      throw error;
    }
  }
  
  /**
   * Creates a block with content in a page
   * @param pageId The ID of the page to add blocks to
   * @param children The block content to add
   */
  async appendBlockChildren(pageId: string, children: any[]) {
    try {
      // Clean the page ID
      const cleanPageId = pageId.replace(/-/g, '');
      
      const response = await notion.blocks.children.append({
        block_id: cleanPageId,
        children: children,
      });
      
      return response;
    } catch (error: any) {
      console.error('Error appending blocks to Notion page:', error);
      
      if (error.status === 404) {
        throw new NotionApiError(
          'Page not found or your integration doesn\'t have access to it.',
          404,
          'page_not_found'
        );
      } else if (error.code === 'validation_error') {
        throw new NotionApiError(
          'Invalid block content. Please check the block format.',
          400,
          'invalid_content'
        );
      }
      
      throw error;
    }
  }
  
  /**
   * Utility: Formats a date for Notion properties
   * @param date JavaScript Date object
   * @param includeTime Whether to include time in the formatted date
   * @returns Formatted date object for Notion
   */
  formatDate(date: Date, includeTime: boolean = false) {
    const isoString = date.toISOString();
    
    return {
      start: includeTime ? isoString : isoString.split('T')[0],
    };
  }
  
  /**
   * Utility: Formats a rich text array for Notion properties
   * @param text Text content
   * @returns Formatted rich text array for Notion
   */
  formatRichText(text: string) {
    return [
      {
        type: "text",
        text: {
          content: text,
        },
      },
    ];
  }
  
  /**
   * Utility: Gets current integration user
   * @returns User information from the Notion API
   */
  async getCurrentUser() {
    try {
      // Use any type to bypass TypeScript checking for notion.users.me
      const notionAny = notion as any;
      const response = await notionAny.users.me();
      return response;
    } catch (error: any) {
      console.error('Error getting current Notion user:', error);
      
      if (error.status === 401) {
        throw new NotionApiError(
          'Authentication error. Please check your Notion API key.',
          401,
          'unauthorized'
        );
      }
      
      throw error;
    }
  }
}

export const notionService = new NotionService();