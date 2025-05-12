/**
 * Notion API integration for Midnight Magnolia
 * 
 * This file provides basic Notion API integration functions and utilities
 * for working with Notion databases and pages.
 */

import { Client } from "@notionhq/client";
import { Request, Response } from "express";

// Make sure we have the required environment variables
if (!process.env.NOTION_INTEGRATION_SECRET || !process.env.NOTION_PAGE_URL) {
  console.warn('Missing Notion integration credentials. Notion functionality will be limited.');
}

// Initialize Notion client if credentials are available
export const notion = process.env.NOTION_INTEGRATION_SECRET 
  ? new Client({ auth: process.env.NOTION_INTEGRATION_SECRET }) 
  : null;

// Extract the page ID from the Notion page URL
export function extractPageIdFromUrl(pageUrl: string): string {
  const match = pageUrl.match(/([a-f0-9]{32})(?:[?#]|$)/i);
  if (match && match[1]) {
    return match[1];
  }

  throw Error("Failed to extract page ID from URL");
}

// Root page ID for the integration
export const NOTION_PAGE_ID = process.env.NOTION_PAGE_URL 
  ? extractPageIdFromUrl(process.env.NOTION_PAGE_URL) 
  : null;

/**
 * Health check for Notion integration
 */
export async function checkNotionHealth(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    // Attempt to access the users endpoint to verify the token is valid
    const response = await notion.users.list({});
    res.json({ 
      status: 'ok',
      message: 'Notion integration is functioning correctly',
      users_count: response.results.length
    });
  } catch (err: any) {
    console.error('Error checking Notion health:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Lists all child databases contained within NOTION_PAGE_ID
 */
export async function getNotionDatabases(req: Request, res: Response) {
  if (!notion || !NOTION_PAGE_ID) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    // Array to store the child databases
    const childDatabases = [];

    // Query all child blocks in the specified page
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const response = await notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
        start_cursor: startCursor,
      });

      // Process the results
      for (const block of response.results) {
        // Check if the block is a child database
        if (block.type === "child_database") {
          const databaseId = block.id;

          // Retrieve the database title
          try {
            const databaseInfo = await notion.databases.retrieve({
              database_id: databaseId,
            });

            // Add the database to our list
            childDatabases.push(databaseInfo);
          } catch (error) {
            console.error(`Error retrieving database ${databaseId}:`, error);
          }
        }
      }

      // Check if there are more results to fetch
      hasMore = response.has_more;
      startCursor = response.next_cursor || undefined;
    }

    res.json(childDatabases);
  } catch (err: any) {
    console.error('Error listing Notion databases:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Get details for a specific database
 */
export async function getNotionDatabase(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { databaseId } = req.params;
    
    const database = await notion.databases.retrieve({
      database_id: databaseId
    });
    
    res.json(database);
  } catch (err: any) {
    console.error(`Error retrieving database ${req.params.databaseId}:`, err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Update a database's properties
 */
export async function updateNotionDatabase(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { databaseId } = req.params;
    const { title, properties } = req.body;
    
    // Prepare update parameters
    const updateParams: any = {
      database_id: databaseId
    };
    
    // Add title if provided
    if (title) {
      updateParams.title = [
        {
          type: 'text',
          text: {
            content: title
          }
        }
      ];
    }
    
    // Add properties if provided
    if (properties) {
      updateParams.properties = properties;
    }
    
    // Update the database
    const updatedDatabase = await notion.databases.update(updateParams);
    
    res.json(updatedDatabase);
  } catch (err: any) {
    console.error(`Error updating database ${req.params.databaseId}:`, err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Create a new database in the root page
 */
export async function createNotionDatabase(req: Request, res: Response) {
  if (!notion || !NOTION_PAGE_ID) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { title, properties } = req.body;
    
    if (!title || !properties) {
      return res.status(400).json({ error: 'Title and properties are required' });
    }
    
    // Create the database
    const newDatabase = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: NOTION_PAGE_ID
      },
      title: [
        {
          type: 'text',
          text: {
            content: title
          }
        }
      ],
      properties
    });
    
    res.status(201).json(newDatabase);
  } catch (err: any) {
    console.error('Error creating Notion database:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Create a new page in a database
 */
export async function createNotionPage(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { databaseId } = req.params;
    const { properties, children } = req.body;
    
    if (!properties) {
      return res.status(400).json({ error: 'Properties are required' });
    }
    
    // Create the page
    const newPage = await notion.pages.create({
      parent: {
        database_id: databaseId
      },
      properties,
      ...(children && { children })
    });
    
    res.status(201).json(newPage);
  } catch (err: any) {
    console.error(`Error creating page in database ${req.params.databaseId}:`, err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Query a database with filters
 */
export async function queryNotionDatabase(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { databaseId } = req.params;
    const { filter, sorts, page_size, start_cursor } = req.body;
    
    // Build query parameters
    const queryParams: any = {
      database_id: databaseId
    };
    
    if (filter) {
      queryParams.filter = filter;
    }
    
    if (sorts) {
      queryParams.sorts = sorts;
    }
    
    if (page_size) {
      queryParams.page_size = page_size;
    }
    
    if (start_cursor) {
      queryParams.start_cursor = start_cursor;
    }
    
    // Query the database
    const results = await notion.databases.query(queryParams);
    
    res.json(results);
  } catch (err: any) {
    console.error(`Error querying database ${req.params.databaseId}:`, err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Get all pages in a database (simple GET endpoint for basic queries)
 */
export async function getNotionDatabasePages(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { databaseId } = req.params;
    
    // Query the database without filters
    const results = await notion.databases.query({
      database_id: databaseId
    });
    
    res.json(results);
  } catch (err: any) {
    console.error(`Error getting pages from database ${req.params.databaseId}:`, err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Get details for a specific page
 */
export async function getNotionPage(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { pageId } = req.params;
    
    const page = await notion.pages.retrieve({
      page_id: pageId
    });
    
    res.json(page);
  } catch (err: any) {
    console.error(`Error retrieving page ${req.params.pageId}:`, err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Update a page's properties
 */
export async function updateNotionPage(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { pageId } = req.params;
    const { properties, archived } = req.body;
    
    // Prepare update parameters
    const updateParams: any = {
      page_id: pageId
    };
    
    if (properties) {
      updateParams.properties = properties;
    }
    
    if (archived !== undefined) {
      updateParams.archived = archived;
    }
    
    // Update the page
    const updatedPage = await notion.pages.update(updateParams);
    
    res.json(updatedPage);
  } catch (err: any) {
    console.error(`Error updating page ${req.params.pageId}:`, err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Archive a page (soft delete)
 */
export async function deleteNotionPage(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { pageId } = req.params;
    
    // Archive the page (Notion API doesn't support hard deletes)
    const archivedPage = await notion.pages.update({
      page_id: pageId,
      archived: true
    });
    
    res.json({ 
      success: true,
      message: 'Page archived successfully',
      page: archivedPage
    });
  } catch (err: any) {
    console.error(`Error archiving page ${req.params.pageId}:`, err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Add blocks to a page
 */
export async function addBlocksToPage(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { pageId } = req.params;
    const { blocks } = req.body;
    
    if (!blocks || !Array.isArray(blocks)) {
      return res.status(400).json({ error: 'Blocks array is required' });
    }
    
    // Add blocks to the page
    const response = await notion.blocks.children.append({
      block_id: pageId,
      children: blocks
    });
    
    res.json(response);
  } catch (err: any) {
    console.error(`Error adding blocks to page ${req.params.pageId}:`, err);
    res.status(500).json({ error: err.message });
  }
}