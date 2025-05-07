import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { notionService } from "./notion";
import { airtableService } from "./airtable";
import { openaiService } from "./openai";
import { setupAuth } from "./auth";
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
  // Setup authentication - returns auth middleware functions
  const { isAuthenticated, isAdmin } = setupAuth(app);
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

  // ===== AIRTABLE API ROUTES =====
  
  // Check Airtable integration health
  app.get("/api/airtable/health", async (_req: Request, res: Response) => {
    try {
      // Try listing bases to verify API key works
      await airtableService.listBases();
      res.json({ 
        success: true, 
        status: "connected"
      });
    } catch (error: any) {
      handleApiError(res, error, "Airtable integration is not working properly");
    }
  });

  // List all Airtable bases
  app.get("/api/airtable/bases", async (_req: Request, res: Response) => {
    try {
      const bases = await airtableService.listBases();
      res.json({ success: true, bases });
    } catch (error: any) {
      handleApiError(res, error, "Failed to list Airtable bases");
    }
  });

  // Get a specific base by ID
  app.get("/api/airtable/bases/:baseId", async (req: Request, res: Response) => {
    try {
      const { baseId } = req.params;
      const base = await airtableService.getBase(baseId);
      res.json({ success: true, base });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get Airtable base");
    }
  });

  // Get tables for a specific base
  app.get("/api/airtable/bases/:baseId/tables", async (req: Request, res: Response) => {
    try {
      const { baseId } = req.params;
      const tables = await airtableService.getTables(baseId);
      res.json({ success: true, tables });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get tables from Airtable base");
    }
  });

  // Get records from a specific table
  app.get("/api/airtable/bases/:baseId/tables/:tableId/records", async (req: Request, res: Response) => {
    try {
      const { baseId, tableId } = req.params;
      const records = await airtableService.getRecords(baseId, tableId);
      res.json({ success: true, records });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get records from Airtable table");
    }
  });

  // Get schema for a specific table
  app.get("/api/airtable/bases/:baseId/tables/:tableId/schema", async (req: Request, res: Response) => {
    try {
      const { baseId, tableId } = req.params;
      const schema = await airtableService.getTableSchema(baseId, tableId);
      res.json({ success: true, schema });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get schema from Airtable table");
    }
  });

  // Convert Airtable schema to Notion schema
  app.post("/api/airtable/convert-schema", async (req: Request, res: Response) => {
    try {
      const { schema } = req.body;
      const notionSchema = airtableService.convertToNotionSchema(schema);
      res.json({ success: true, notionSchema });
    } catch (error: any) {
      handleApiError(res, error, "Failed to convert schema to Notion format");
    }
  });

  // Import records from Airtable to Notion
  app.post("/api/airtable/import-to-notion", async (req: Request, res: Response) => {
    try {
      const { baseId, tableId, notionDatabaseId, fieldMappings } = req.body;
      const importedCount = await airtableService.importToNotion(
        baseId,
        tableId,
        notionDatabaseId,
        fieldMappings,
        notionService
      );
      res.json({ success: true, importedCount });
    } catch (error: any) {
      handleApiError(res, error, "Failed to import records to Notion");
    }
  });

  // ===== OPENAI API ROUTES =====
  
  // Check OpenAI integration health
  app.get("/api/openai/health", async (_req: Request, res: Response) => {
    try {
      // Generate a simple completion to verify API key works
      const testPrompt = "Hello, this is a test.";
      const response = await openaiService.generateTarotReading("The Fool", "general");
      res.json({ 
        success: true, 
        status: "connected"
      });
    } catch (error: any) {
      handleApiError(res, error, "OpenAI integration is not working properly");
    }
  });

  // Generate a tarot reading
  app.post("/api/openai/tarot-reading", async (req: Request, res: Response) => {
    try {
      const { cardName, queryType } = req.body;
      const reading = await openaiService.generateTarotReading(
        cardName,
        queryType || "general"
      );
      res.json({ success: true, reading });
    } catch (error: any) {
      handleApiError(res, error, "Failed to generate tarot reading");
    }
  });

  // Generate affirmations
  app.post("/api/openai/affirmations", async (req: Request, res: Response) => {
    try {
      const { theme, count, mood } = req.body;
      const affirmations = await openaiService.generateAffirmations(
        theme,
        count || 5,
        mood || "positive"
      );
      res.json({ success: true, affirmations });
    } catch (error: any) {
      handleApiError(res, error, "Failed to generate affirmations");
    }
  });

  // Generate a content brief
  app.post("/api/openai/content-brief", async (req: Request, res: Response) => {
    try {
      const { contentType, theme, additionalContext } = req.body;
      const brief = await openaiService.generateContentBrief(
        contentType,
        theme,
        additionalContext
      );
      res.json({ success: true, brief });
    } catch (error: any) {
      handleApiError(res, error, "Failed to generate content brief");
    }
  });

  // Generate a product description
  app.post("/api/openai/product-description", async (req: Request, res: Response) => {
    try {
      const { productType, title, features, targetAudience } = req.body;
      const description = await openaiService.generateProductDescription(
        productType,
        title,
        features,
        targetAudience
      );
      res.json({ success: true, description });
    } catch (error: any) {
      handleApiError(res, error, "Failed to generate product description");
    }
  });

  // Generate image prompts
  app.post("/api/openai/image-prompts", async (req: Request, res: Response) => {
    try {
      const { subject, style, count } = req.body;
      const prompts = await openaiService.generateImagePrompts(
        subject,
        style,
        count || 3
      );
      res.json({ success: true, prompts });
    } catch (error: any) {
      handleApiError(res, error, "Failed to generate image prompts");
    }
  });

  // Generate a worksheet structure
  app.post("/api/openai/worksheet", async (req: Request, res: Response) => {
    try {
      const { topic, purpose } = req.body;
      const worksheet = await openaiService.generateWorksheetStructure(
        topic,
        purpose
      );
      res.json({ success: true, worksheet });
    } catch (error: any) {
      handleApiError(res, error, "Failed to generate worksheet structure");
    }
  });

  // Generate moon phase content
  app.post("/api/openai/moon-phase-content", async (req: Request, res: Response) => {
    try {
      const { phase, contentType } = req.body;
      const content = await openaiService.generateMoonPhaseContent(
        phase,
        contentType
      );
      res.json({ success: true, content });
    } catch (error: any) {
      handleApiError(res, error, "Failed to generate moon phase content");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
