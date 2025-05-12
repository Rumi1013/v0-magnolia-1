import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { notionService } from "./notion";
import { airtableService } from "./airtable";
import { openaiService } from "./openai";
import { astrologyService } from "./astrology";
import { stripeService } from "./stripe";
import { workflowService, WorkflowSchema, CreateWorkflowSchema, UpdateWorkflowSchema } from "./workflow";
import { agentOrchestrator } from "./agents";
import { setupAuth } from "./auth";
import { z } from "zod";
// Import integration route handlers
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
} from "./integrations/route-handlers";
// Import Notion templates handlers
import {
  getContentTemplates,
  addContentTemplate,
  updateContentTemplate,
  deleteContentTemplate,
  initializeContentTemplates
} from "./notion-templates";
// Import Patreon handlers
import {
  initiatePatreonAuth,
  handlePatreonCallback,
  getPatreonCampaignInfo,
  syncContentToPatreon
} from "./patreon";
import {
  insertClientSchema, 
  insertGeneratedContentSchema, 
  insertOrderSchema,
  insertOrderItemSchema,
  insertTaskSchema
} from "@shared/schema";

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
  
  // Register service integration routes
  import('./integrations').then(integrations => {
    integrations.registerIntegrationRoutes(app);
    console.log('Service integration routes registered');
  }).catch(error => {
    console.error('Failed to register integration routes:', error);
  });
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

  // Orchestrate agents for complex tasks
  app.post("/api/agents/orchestrate", async (req: Request, res: Response) => {
    try {
      const { task, context } = req.body;
      const result = await agentOrchestrator.orchestrateWorkflow(task, context);
      res.json({ 
        success: true, 
        completion: result.completion,
        actions: result.actions 
      });
    } catch (error: any) {
      handleApiError(res, error, "Failed to orchestrate agents");
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
  
  // Generate workflow steps
  app.post("/api/openai/generate-workflow-steps", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { prompt, workflowType, title, description, category } = req.body;
      
      if (!prompt || !workflowType) {
        return res.status(400).json({ 
          success: false, 
          error: "Prompt and workflow type are required" 
        });
      }
      
      const result = await openaiService.generateWorkflowSteps(
        prompt,
        workflowType,
        title,
        description,
        category
      );
      
      res.json({ success: true, steps: result.steps });
    } catch (error: any) {
      handleApiError(res, error, "Failed to generate workflow steps");
    }
  });

  // ===== WORKFLOW API ROUTES =====
  
  // Get all workflows
  app.get("/api/workflows", isAuthenticated, async (_req: Request, res: Response) => {
    try {
      const workflows = workflowService.getWorkflows();
      res.json({ success: true, workflows });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get workflows");
    }
  });

  // Get a workflow by ID
  app.get("/api/workflows/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: "Invalid workflow ID" });
      }
      
      const workflow = workflowService.getWorkflowById(id);
      if (!workflow) {
        return res.status(404).json({ success: false, error: "Workflow not found" });
      }
      
      res.json({ success: true, workflow });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get workflow");
    }
  });

  // Get workflows by category
  app.get("/api/workflows/category/:category", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const workflows = workflowService.getWorkflowsByCategory(category);
      res.json({ success: true, workflows });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get workflows by category");
    }
  });

  // Create a new workflow
  app.post("/api/workflows", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const workflowData = CreateWorkflowSchema.parse(req.body);
      const workflow = workflowService.createWorkflow(workflowData);
      res.status(201).json({ success: true, workflow });
    } catch (error: any) {
      handleApiError(res, error, "Failed to create workflow");
    }
  });

  // Update a workflow
  app.patch("/api/workflows/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: "Invalid workflow ID" });
      }
      
      const workflowData = UpdateWorkflowSchema.parse({
        ...req.body,
        id
      });
      
      const workflow = workflowService.updateWorkflow(workflowData);
      if (!workflow) {
        return res.status(404).json({ success: false, error: "Workflow not found" });
      }
      
      res.json({ success: true, workflow });
    } catch (error: any) {
      handleApiError(res, error, "Failed to update workflow");
    }
  });

  // Delete a workflow
  app.delete("/api/workflows/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: "Invalid workflow ID" });
      }
      
      const success = workflowService.deleteWorkflow(id);
      if (!success) {
        return res.status(404).json({ success: false, error: "Workflow not found" });
      }
      
      res.json({ success: true });
    } catch (error: any) {
      handleApiError(res, error, "Failed to delete workflow");
    }
  });
  
  // ===== ASTROLOGY API ROUTES =====
  
  // Birth chart generation schema
  const generateChartSchema = z.object({
    name: z.string(),
    birthDate: z.string(),
    birthTime: z.string(),
    birthLocation: z.string(),
    chartType: z.string().default("natal")
  });
  
  // Generate a birth chart
  app.post("/api/astrology/generate-chart", async (req: Request, res: Response) => {
    try {
      const validatedData = generateChartSchema.parse(req.body);
      
      const chartData = await astrologyService.generateBirthChart(
        validatedData.name,
        validatedData.birthDate,
        validatedData.birthTime,
        validatedData.birthLocation,
        validatedData.chartType
      );
      
      res.json({ 
        success: true, 
        chartImage: chartData.chartImage,
        interpretation: chartData.interpretation,
        chartData: chartData.chartData
      });
    } catch (error: any) {
      handleApiError(res, error, "Failed to generate birth chart");
    }
  });
  
  // ===== STRIPE PAYMENT ROUTES =====
  
  // Create payment intent schema
  const createPaymentIntentSchema = z.object({
    amount: z.number(),
    currency: z.string().default("usd"),
    metadata: z.record(z.string()).optional()
  });
  
  // Create a payment intent
  app.post("/api/payments/create-intent", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const validatedData = createPaymentIntentSchema.parse(req.body);
      
      const paymentIntent = await stripeService.createPaymentIntent(
        validatedData.amount,
        validatedData.currency,
        validatedData.metadata
      );
      
      res.json({
        success: true,
        clientSecret: paymentIntent.clientSecret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error: any) {
      handleApiError(res, error, "Failed to create payment intent");
    }
  });
  
  // Create subscription schema
  const createSubscriptionSchema = z.object({
    priceId: z.string(),
    customerId: z.string().optional(),
    metadata: z.record(z.string()).optional()
  });
  
  // Create a subscription
  app.post("/api/payments/create-subscription", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const validatedData = createSubscriptionSchema.parse(req.body);
      
      // If no customerId is provided, create a new customer
      let customerId = validatedData.customerId;
      if (!customerId && req.user) {
        const customer = await stripeService.createCustomer(
          req.user.email || `user_${req.user.id}@example.com`,
          req.user.username,
          { userId: req.user.id.toString() }
        );
        customerId = customer.id;
        
        // Here you would typically update the user in your database
        // to store the Stripe customer ID for future use
        // await storage.updateUserStripeCustomerId(req.user.id, customerId);
      }
      
      if (!customerId) {
        return res.status(400).json({
          success: false,
          error: "Customer ID is required"
        });
      }
      
      const subscription = await stripeService.createSubscription(
        customerId,
        validatedData.priceId,
        validatedData.metadata
      );
      
      res.json({
        success: true,
        subscriptionId: subscription.subscriptionId,
        clientSecret: subscription.clientSecret,
        status: subscription.status
      });
    } catch (error: any) {
      handleApiError(res, error, "Failed to create subscription");
    }
  });
  
  // Get subscription schema
  const getSubscriptionSchema = z.object({
    subscriptionId: z.string()
  });
  
  // Get subscription details
  app.get("/api/payments/subscriptions/:subscriptionId", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { subscriptionId } = req.params;
      const validatedData = getSubscriptionSchema.parse({ subscriptionId });
      
      const subscription = await stripeService.getSubscription(validatedData.subscriptionId);
      
      res.json({
        success: true,
        subscription
      });
    } catch (error: any) {
      handleApiError(res, error, "Failed to get subscription");
    }
  });
  
  // Cancel subscription
  app.delete("/api/payments/subscriptions/:subscriptionId", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { subscriptionId } = req.params;
      const validatedData = getSubscriptionSchema.parse({ subscriptionId });
      
      const subscription = await stripeService.cancelSubscription(validatedData.subscriptionId);
      
      res.json({
        success: true,
        subscription
      });
    } catch (error: any) {
      handleApiError(res, error, "Failed to cancel subscription");
    }
  });

  // ===== CLIENT MANAGEMENT API ROUTES =====
  
  // Get all clients
  app.get("/api/clients", isAuthenticated, async (_req: Request, res: Response) => {
    try {
      const clients = await storage.getAllClients();
      res.json({ success: true, clients });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch clients");
    }
  });
  
  // Get a specific client
  app.get("/api/clients/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const clientId = parseInt(req.params.id);
      const client = await storage.getClient(clientId);
      
      if (!client) {
        return res.status(404).json({ success: false, error: "Client not found" });
      }
      
      res.json({ success: true, client });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch client");
    }
  });
  
  // Create a new client
  app.post("/api/clients", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const clientData = insertClientSchema.parse(req.body);
      const newClient = await storage.createClient(clientData);
      res.status(201).json({ success: true, client: newClient });
    } catch (error: any) {
      handleApiError(res, error, "Failed to create client");
    }
  });
  
  // Update a client
  app.patch("/api/clients/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const clientId = parseInt(req.params.id);
      const clientData = req.body;
      
      const updatedClient = await storage.updateClient(clientId, clientData);
      
      if (!updatedClient) {
        return res.status(404).json({ success: false, error: "Client not found" });
      }
      
      res.json({ success: true, client: updatedClient });
    } catch (error: any) {
      handleApiError(res, error, "Failed to update client");
    }
  });
  
  // Delete a client
  app.delete("/api/clients/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const clientId = parseInt(req.params.id);
      const success = await storage.deleteClient(clientId);
      
      if (!success) {
        return res.status(404).json({ success: false, error: "Client not found" });
      }
      
      res.json({ success: true, message: "Client deleted successfully" });
    } catch (error: any) {
      handleApiError(res, error, "Failed to delete client");
    }
  });
  
  // ===== GENERATED CONTENT API ROUTES =====
  
  // Get all generated content
  app.get("/api/content", isAuthenticated, async (_req: Request, res: Response) => {
    try {
      const content = await storage.getAllGeneratedContent();
      res.json({ success: true, content });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch content");
    }
  });
  
  // Get content by type
  app.get("/api/content/type/:contentType", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { contentType } = req.params;
      const content = await storage.getGeneratedContentByType(contentType);
      res.json({ success: true, content });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch content by type");
    }
  });
  
  // Get content by user
  app.get("/api/content/user/:userId", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const content = await storage.getGeneratedContentByUser(userId);
      res.json({ success: true, content });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch content by user");
    }
  });
  
  // Get a specific content item
  app.get("/api/content/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const contentId = parseInt(req.params.id);
      const content = await storage.getGeneratedContent(contentId);
      
      if (!content) {
        return res.status(404).json({ success: false, error: "Content not found" });
      }
      
      res.json({ success: true, content });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch content");
    }
  });
  
  // Create new content
  app.post("/api/content", isAuthenticated, async (req: Request, res: Response) => {
    try {
      // Include the user ID from the authenticated user
      const contentData = insertGeneratedContentSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const newContent = await storage.createGeneratedContent(contentData);
      res.status(201).json({ success: true, content: newContent });
    } catch (error: any) {
      handleApiError(res, error, "Failed to create content");
    }
  });
  
  // Update content
  app.patch("/api/content/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const contentId = parseInt(req.params.id);
      const contentData = req.body;
      
      const updatedContent = await storage.updateGeneratedContent(contentId, contentData);
      
      if (!updatedContent) {
        return res.status(404).json({ success: false, error: "Content not found" });
      }
      
      res.json({ success: true, content: updatedContent });
    } catch (error: any) {
      handleApiError(res, error, "Failed to update content");
    }
  });
  
  // Delete content
  app.delete("/api/content/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const contentId = parseInt(req.params.id);
      const success = await storage.deleteGeneratedContent(contentId);
      
      if (!success) {
        return res.status(404).json({ success: false, error: "Content not found" });
      }
      
      res.json({ success: true, message: "Content deleted successfully" });
    } catch (error: any) {
      handleApiError(res, error, "Failed to delete content");
    }
  });
  
  // ===== ORDER MANAGEMENT API ROUTES =====
  
  // Get all orders
  app.get("/api/orders", isAuthenticated, async (_req: Request, res: Response) => {
    try {
      const orders = await storage.getAllOrders();
      res.json({ success: true, orders });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch orders");
    }
  });
  
  // Get orders by client
  app.get("/api/orders/client/:clientId", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const orders = await storage.getOrdersByClient(clientId);
      res.json({ success: true, orders });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch orders by client");
    }
  });
  
  // Get a specific order
  app.get("/api/orders/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ success: false, error: "Order not found" });
      }
      
      // Get the order items
      const items = await storage.getOrderItems(orderId);
      
      res.json({ success: true, order, items });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch order");
    }
  });
  
  // Create a new order
  app.post("/api/orders", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { orderData, items } = req.body;
      
      // Validate order data
      const validOrderData = insertOrderSchema.parse(orderData);
      
      // Create the order first
      const newOrder = await storage.createOrder(validOrderData);
      
      // Then create each order item
      if (items && Array.isArray(items)) {
        for (const item of items) {
          await storage.createOrderItem({
            ...item,
            orderId: newOrder.id
          });
        }
      }
      
      // Get the complete order with items
      const orderItems = await storage.getOrderItems(newOrder.id);
      
      res.status(201).json({ 
        success: true, 
        order: newOrder, 
        items: orderItems 
      });
    } catch (error: any) {
      handleApiError(res, error, "Failed to create order");
    }
  });
  
  // Update an order
  app.patch("/api/orders/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id);
      const orderData = req.body;
      
      const updatedOrder = await storage.updateOrder(orderId, orderData);
      
      if (!updatedOrder) {
        return res.status(404).json({ success: false, error: "Order not found" });
      }
      
      res.json({ success: true, order: updatedOrder });
    } catch (error: any) {
      handleApiError(res, error, "Failed to update order");
    }
  });
  
  // Delete an order
  app.delete("/api/orders/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id);
      const success = await storage.deleteOrder(orderId);
      
      if (!success) {
        return res.status(404).json({ success: false, error: "Order not found" });
      }
      
      res.json({ success: true, message: "Order deleted successfully" });
    } catch (error: any) {
      handleApiError(res, error, "Failed to delete order");
    }
  });
  
  // ===== TASK MANAGEMENT API ROUTES =====
  
  // Get all tasks
  app.get("/api/tasks", isAuthenticated, async (_req: Request, res: Response) => {
    try {
      const tasks = await storage.getAllTasks();
      res.json({ success: true, tasks });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch tasks");
    }
  });
  
  // Get tasks by user
  app.get("/api/tasks/user/:userId", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const tasks = await storage.getTasksByUser(userId);
      res.json({ success: true, tasks });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch tasks by user");
    }
  });
  
  // Get a specific task
  app.get("/api/tasks/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ success: false, error: "Task not found" });
      }
      
      res.json({ success: true, task });
    } catch (error: any) {
      handleApiError(res, error, "Failed to fetch task");
    }
  });
  
  // Create a new task
  app.post("/api/tasks", isAuthenticated, async (req: Request, res: Response) => {
    try {
      // Include the user ID from the authenticated user
      const taskData = insertTaskSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const newTask = await storage.createTask(taskData);
      res.status(201).json({ success: true, task: newTask });
    } catch (error: any) {
      handleApiError(res, error, "Failed to create task");
    }
  });
  
  // Update a task
  app.patch("/api/tasks/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      const taskData = req.body;
      
      const updatedTask = await storage.updateTask(taskId, taskData);
      
      if (!updatedTask) {
        return res.status(404).json({ success: false, error: "Task not found" });
      }
      
      res.json({ success: true, task: updatedTask });
    } catch (error: any) {
      handleApiError(res, error, "Failed to update task");
    }
  });
  
  // Delete a task
  app.delete("/api/tasks/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      const success = await storage.deleteTask(taskId);
      
      if (!success) {
        return res.status(404).json({ success: false, error: "Task not found" });
      }
      
      res.json({ success: true, message: "Task deleted successfully" });
    } catch (error: any) {
      handleApiError(res, error, "Failed to delete task");
    }
  });

  // ===== INTEGRATION API ROUTES =====
  
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
  
  // ===== NOTION TEMPLATES ROUTES =====
  
  // Initialize Notion content templates (call this during startup)
  initializeContentTemplates().catch(err => {
    console.error('Error initializing Notion templates:', err);
  });
  
  // Get content templates by type
  app.get("/api/templates/:type", isAuthenticated, getContentTemplates);
  
  // Add a new content template
  app.post("/api/templates/:type", isAuthenticated, addContentTemplate);
  
  // Update an existing content template
  app.put("/api/templates/:type/:id", isAuthenticated, updateContentTemplate);
  
  // Delete a content template
  app.delete("/api/templates/:type/:id", isAuthenticated, deleteContentTemplate);

  // ===== PATREON INTEGRATION ROUTES =====
  
  // Start the Patreon OAuth flow
  app.get("/api/patreon/auth", isAuthenticated, initiatePatreonAuth);
  
  // Callback for Patreon OAuth
  app.get("/api/patreon/callback", handlePatreonCallback);
  
  // Get Patreon campaign info
  app.get("/api/patreon/campaign", isAuthenticated, getPatreonCampaignInfo);
  
  // Create a post on Patreon
  app.post("/api/patreon/post", isAuthenticated, createPatreonPost);
  
  // Sync content from database to Patreon
  app.post("/api/patreon/sync", isAuthenticated, syncContentToPatreon);

  const httpServer = createServer(app);

  return httpServer;
}
