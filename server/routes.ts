import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { notionService } from "./notion";
import { airtableService } from "./airtable";
import { openaiService } from "./openai";
import { z } from "zod";

// Create schemas for request validation
const createDatabaseSchema = z.object({
  parentPageId: z.string(),
  title: z.string(),
  properties: z.record(z.any()),
  icon: z.string().optional(),
  cover: z.string().optional()
});

const updateDatabaseSchema = z.object({
  databaseId: z.string(),
  title: z.string().optional(),
  properties: z.record(z.any()).optional()
});

const addDatabasePageSchema = z.object({
  databaseId: z.string(),
  properties: z.record(z.any()),
  icon: z.string().optional(),
  children: z.array(z.any()).optional()
});

const getDatabaseSchema = z.object({
  databaseId: z.string()
});

const getPageSchema = z.object({
  pageId: z.string()
});

const updatePageSchema = z.object({
  pageId: z.string(),
  properties: z.record(z.any()),
  archived: z.boolean().optional()
});

const queryDatabaseSchema = z.object({
  databaseId: z.string(),
  filter: z.any().optional(),
  sorts: z.any().optional(),
  pageSize: z.number().optional()
});

const appendBlockChildrenSchema = z.object({
  pageId: z.string(),
  children: z.array(z.any())
});

// Helper function to handle API errors consistently
function handleApiError(res: Response, error: any, defaultMessage: string) {
  console.error(`API Error: ${defaultMessage}`, error);
  
  // Check if it's our custom NotionApiError with status code
  if (error.status) {
    return res.status(error.status).json({
      success: false,
      error: error.message || defaultMessage,
      code: error.code
    });
  }
  
  // Handle Zod validation errors
  if (error.errors) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: error.errors
    });
  }
  
  // Default error response
  return res.status(500).json({
    success: false,
    error: error.message || defaultMessage
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Check Notion integration health
  app.get("/api/notion/health", async (_req: Request, res: Response) => {
    try {
      const user = await notionService.getCurrentUser();
      res.json({ 
        success: true, 
        status: "connected",
        integration: {
          name: user.name || 'Notion Integration',
          type: user.type || 'bot'
        }
      });
    } catch (error: any) {
      handleApiError(res, error, "Notion integration is not working properly");
    }
  });

  // Notion API routes - all prefixed with /api/notion
  
  // List all databases accessible to the integration
  app.get("/api/notion/databases", async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      const databases = await notionService.listDatabases(query as string);
      res.json({ success: true, databases });
    } catch (error: any) {
      handleApiError(res, error, "Failed to list databases");
    }
  });

  // Get a specific database by ID
  app.get("/api/notion/databases/:databaseId", async (req: Request, res: Response) => {
    try {
      const { databaseId } = req.params;
      const validatedData = getDatabaseSchema.parse({ databaseId });
      
      const database = await notionService.getDatabase(validatedData.databaseId);
      res.json({ success: true, database });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get database");
    }
  });

  // Update an existing database
  app.patch("/api/notion/databases/:databaseId", async (req: Request, res: Response) => {
    try {
      const { databaseId } = req.params;
      const validatedData = updateDatabaseSchema.parse({
        databaseId,
        ...req.body
      });
      
      const database = await notionService.updateDatabase(
        validatedData.databaseId,
        validatedData.title,
        validatedData.properties
      );
      
      res.json({ success: true, database });
    } catch (error: any) {
      handleApiError(res, error, "Failed to update database");
    }
  });

  // Create a new database in a Notion page
  app.post("/api/notion/databases", async (req: Request, res: Response) => {
    try {
      const validatedData = createDatabaseSchema.parse(req.body);
      
      const database = await notionService.createDatabase(
        validatedData.parentPageId,
        validatedData.title,
        validatedData.properties,
        validatedData.icon,
        validatedData.cover
      );
      
      res.json({ success: true, database });
    } catch (error: any) {
      handleApiError(res, error, "Failed to create database");
    }
  });

  // Add a new page (row) to a database
  app.post("/api/notion/databases/:databaseId/pages", async (req: Request, res: Response) => {
    try {
      const { databaseId } = req.params;
      const validatedData = addDatabasePageSchema.parse({
        databaseId,
        ...req.body
      });
      
      const page = await notionService.addDatabasePage(
        validatedData.databaseId,
        validatedData.properties,
        validatedData.icon,
        validatedData.children
      );
      
      res.json({ success: true, page });
    } catch (error: any) {
      handleApiError(res, error, "Failed to add page to database");
    }
  });

  // Query a database to get its pages
  app.post("/api/notion/databases/:databaseId/query", async (req: Request, res: Response) => {
    try {
      const { databaseId } = req.params;
      const validatedData = queryDatabaseSchema.parse({
        databaseId,
        ...req.body
      });
      
      const pages = await notionService.queryDatabase(
        validatedData.databaseId,
        validatedData.filter,
        validatedData.sorts,
        validatedData.pageSize
      );
      
      res.json({ success: true, pages });
    } catch (error: any) {
      handleApiError(res, error, "Failed to query database");
    }
  });

  // Legacy get query endpoint (for backward compatibility)
  app.get("/api/notion/databases/:databaseId/query", async (req: Request, res: Response) => {
    try {
      const { databaseId } = req.params;
      const validatedData = getDatabaseSchema.parse({ databaseId });
      
      const pages = await notionService.queryDatabase(validatedData.databaseId);
      res.json({ success: true, pages });
    } catch (error: any) {
      handleApiError(res, error, "Failed to query database");
    }
  });

  // Get a page by ID
  app.get("/api/notion/pages/:pageId", async (req: Request, res: Response) => {
    try {
      const { pageId } = req.params;
      const validatedData = getPageSchema.parse({ pageId });
      
      const page = await notionService.getPage(validatedData.pageId);
      res.json({ success: true, page });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get page");
    }
  });

  // Update a page
  app.patch("/api/notion/pages/:pageId", async (req: Request, res: Response) => {
    try {
      const { pageId } = req.params;
      const validatedData = updatePageSchema.parse({
        pageId,
        ...req.body
      });
      
      const page = await notionService.updatePage(
        validatedData.pageId,
        validatedData.properties,
        validatedData.archived
      );
      
      res.json({ success: true, page });
    } catch (error: any) {
      handleApiError(res, error, "Failed to update page");
    }
  });

  // Archive a page (soft delete)
  app.delete("/api/notion/pages/:pageId", async (req: Request, res: Response) => {
    try {
      const { pageId } = req.params;
      const validatedData = getPageSchema.parse({ pageId });
      
      const page = await notionService.archivePage(validatedData.pageId);
      res.json({ success: true, page });
    } catch (error: any) {
      handleApiError(res, error, "Failed to archive page");
    }
  });

  // Append blocks to a page
  app.post("/api/notion/blocks/:pageId/children", async (req: Request, res: Response) => {
    try {
      const { pageId } = req.params;
      const validatedData = appendBlockChildrenSchema.parse({
        pageId,
        ...req.body
      });
      
      const result = await notionService.appendBlockChildren(
        validatedData.pageId,
        validatedData.children
      );
      
      res.json({ success: true, result });
    } catch (error: any) {
      handleApiError(res, error, "Failed to append blocks to page");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
