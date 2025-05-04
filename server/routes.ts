import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { notionService } from "./notion";
import { z } from "zod";

// Create schemas for request validation
const createDatabaseSchema = z.object({
  parentPageId: z.string(),
  title: z.string(),
  properties: z.record(z.any())
});

const addDatabasePageSchema = z.object({
  databaseId: z.string(),
  properties: z.record(z.any())
});

const getDatabaseSchema = z.object({
  databaseId: z.string()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Notion API routes - all prefixed with /api/notion
  
  // List all databases accessible to the integration
  app.get("/api/notion/databases", async (req: Request, res: Response) => {
    try {
      const databases = await notionService.listDatabases();
      res.json({ success: true, databases });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to list databases" 
      });
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
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to get database" 
      });
    }
  });

  // Create a new database in a Notion page
  app.post("/api/notion/databases", async (req: Request, res: Response) => {
    try {
      const validatedData = createDatabaseSchema.parse(req.body);
      
      const database = await notionService.createDatabase(
        validatedData.parentPageId,
        validatedData.title,
        validatedData.properties
      );
      
      res.json({ success: true, database });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to create database" 
      });
    }
  });

  // Add a new page (row) to a database
  app.post("/api/notion/databases/:databaseId/pages", async (req: Request, res: Response) => {
    try {
      const { databaseId } = req.params;
      const validatedData = addDatabasePageSchema.parse({
        databaseId,
        properties: req.body.properties
      });
      
      const page = await notionService.addDatabasePage(
        validatedData.databaseId,
        validatedData.properties
      );
      
      res.json({ success: true, page });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to add page to database" 
      });
    }
  });

  // Query a database to get its pages
  app.get("/api/notion/databases/:databaseId/query", async (req: Request, res: Response) => {
    try {
      const { databaseId } = req.params;
      const validatedData = getDatabaseSchema.parse({ databaseId });
      
      const pages = await notionService.queryDatabase(validatedData.databaseId);
      res.json({ success: true, pages });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to query database" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
