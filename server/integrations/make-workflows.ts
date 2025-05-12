/**
 * Make.com (formerly Integromat) Integration Blueprint
 * 
 * This file provides utilities for interfacing with Make.com workflows
 * that coordinate between Notion, Airtable, Google Cloud, Stripe, and HubSpot.
 */

import { Request, Response } from 'express';
import fetch from 'node-fetch';

interface MakeWebhookPayload {
  action: string;
  data: Record<string, any>;
  source: string;
  timestamp: number;
}

/**
 * Typical Make.com workflow scenarios for Midnight Magnolia:
 * 
 * 1. Content Creation & Distribution
 *    - Trigger: New content created in dashboard
 *    - Steps: Save to Notion → Update Airtable inventory → Update HubSpot → Notify clients
 * 
 * 2. Order Processing
 *    - Trigger: New Stripe payment
 *    - Steps: Create order in system → Update inventory in Airtable → 
 *             Create fulfillment tasks in Notion → Update HubSpot contact → Send confirmation email
 * 
 * 3. Client Membership Management
 *    - Trigger: Stripe subscription event
 *    - Steps: Update client tier in database → Adjust permissions → 
 *             Update client record in Airtable → Add to appropriate Notion database →
 *             Update contact properties in HubSpot
 * 
 * 4. Content Analytics
 *    - Trigger: Scheduled (daily/weekly)
 *    - Steps: Pull analytics from Google Cloud → Process data → 
 *             Update dashboards in Notion and Airtable → Send to HubSpot reporting
 *
 * 5. Client Onboarding
 *    - Trigger: New client signup
 *    - Steps: Create client in database → Add to HubSpot → Create Notion page →
 *             Add to Airtable → Trigger welcome sequence
 */

/**
 * Send data to a Make.com webhook to trigger a scenario
 * @param webhookUrl The Make.com webhook URL for the scenario
 * @param payload Data to send to the webhook
 */
export async function triggerMakeScenario(webhookUrl: string, payload: MakeWebhookPayload): Promise<any> {
  try {
    if (!webhookUrl) {
      throw new Error("Make.com webhook URL is required");
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Make.com webhook error: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error triggering Make.com scenario:', error);
    throw error;
  }
}

/**
 * Create a webhook endpoint for receiving Make.com scenario results
 * @param req Express request
 * @param res Express response
 */
export async function handleMakeWebhook(req: Request, res: Response): Promise<void> {
  try {
    const webhookData = req.body;
    
    // Validate webhook data
    if (!webhookData || !webhookData.action) {
      res.status(400).json({ error: 'Invalid webhook data' });
      return;
    }

    // Process based on the action
    switch (webhookData.action) {
      case 'content_distributed':
        // Update content status in database
        console.log('Content distributed:', webhookData.data);
        break;
      
      case 'order_fulfilled':
        // Update order status in database
        console.log('Order fulfilled:', webhookData.data);
        break;
      
      case 'subscription_updated':
        // Update client membership status
        console.log('Subscription updated:', webhookData.data);
        break;
      
      case 'client_onboarded':
        // Update client onboarding status
        console.log('Client onboarded:', webhookData.data);
        break;
      
      default:
        console.log('Unknown webhook action:', webhookData.action);
    }

    res.status(200).json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Error handling Make.com webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Helper function to format content data for Make.com
 */
export function formatContentForMake(content: any): Record<string, any> {
  return {
    id: content.id,
    title: content.title,
    contentType: content.contentType,
    content: content.content,
    tags: Array.isArray(content.tags) ? content.tags.join(", ") : content.tags,
    status: content.status,
    createdAt: content.createdAt || new Date().toISOString(),
    productId: content.productId || null,
    // Format additional fields as needed for Make.com
  };
}

/**
 * Helper function to format client data for HubSpot via Make.com
 */
export function formatClientForHubSpot(client: any): Record<string, any> {
  return {
    email: client.email,
    firstname: client.fullName.split(' ')[0],
    lastname: client.fullName.split(' ').slice(1).join(' '),
    phone: client.phone || '',
    membership_tier: client.membershipTier || 'free',
    client_id: client.id?.toString(),
    lifecycle_stage: 'customer',
    client_status: client.status || 'active',
    // HubSpot specific properties
    hs_lead_status: client.status === 'active' ? 'New' : 'Closed',
    midnight_magnolia_client: 'true',
  };
}

/**
 * Helper function to format order data for Make.com
 */
export function formatOrderForMake(order: any, client: any, products: any[]): Record<string, any> {
  return {
    orderId: order.id,
    clientId: client.id,
    clientName: client.fullName,
    clientEmail: client.email,
    products: products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type
    })),
    totalAmount: products.reduce((sum, product) => sum + product.price, 0),
    orderDate: order.createdAt || new Date().toISOString(),
    status: order.status || 'pending',
  };
}

/**
 * Blueprint for necessary Make.com scenarios
 */
export const makeScenarioBlueprints = {
  contentDistribution: `
  # Make.com Content Distribution Scenario Blueprint
  
  ## Trigger
  - Webhook (receives content data from Midnight Magnolia dashboard)
  
  ## Steps
  1. **Process Incoming Data** - Parse and validate webhook data
  2. **Create Notion Page** - Add content to appropriate Notion database
     - Map content fields to Notion properties
     - Use content type to determine which database
  3. **Update Airtable Record** - Add/update content in Airtable inventory
     - Create record if new content
     - Update if existing content
  4. **Update HubSpot** - Record content creation as engagement
     - Create note on associated contacts
     - Update content inventory custom object
  5. **Check Client Assignments** - If content is assigned to clients
     - For each client assignment:
       - **Send Email** - Notification with content details
       - **Update Client Record** - in Notion, Airtable, and HubSpot
  6. **Return Result** - Send confirmation back to dashboard
  `,

  orderProcessing: `
  # Make.com Order Processing Scenario Blueprint
  
  ## Trigger
  - Stripe Webhook (payment successful)
  
  ## Steps
  1. **Process Stripe Data** - Extract order and customer information
  2. **Get Product Details** - Retrieve full product information from database
  3. **Update Order System** - Create/update order record in database
  4. **Create Notion Task** - Add fulfillment task to task database
     - Include client info, order details, products
     - Set due date and priority
  5. **Update Airtable** - Record the sale in Airtable
     - Update inventory counts if applicable
     - Add to sales records
  6. **Update HubSpot Contact** - Record purchase in HubSpot
     - Create deal with products
     - Update contact properties (total spend, etc.)
     - Add to appropriate lists/workflows
  7. **Send Confirmation Email** - To customer with order details
  8. **Update Stripe Metadata** - Add fulfillment details to Stripe
  `,

  clientMembership: `
  # Make.com Client Membership Management Scenario Blueprint
  
  ## Trigger
  - Stripe Subscription Event (created, updated, cancelled)
  
  ## Steps
  1. **Process Subscription Data** - Extract subscription details
  2. **Update Client Record** - In database with membership tier
  3. **Update Notion Client Database** - Add client to appropriate tier database
     - Create client page if new
     - Move between databases if tier changed
  4. **Update Airtable Client Records** - Sync membership status
  5. **Update HubSpot Contact** - Adjust HubSpot properties
     - Update membership tier property
     - Add/remove from appropriate lists
     - Trigger appropriate automation based on tier
  6. **Generate Client Assets** - Create any tier-specific content/access
  7. **Send Tier-specific Email** - Welcome or status update
  8. **Schedule Follow-up Task** - Create follow-up reminder in Notion
  `,

  clientOnboarding: `
  # Make.com Client Onboarding Workflow Blueprint
  
  ## Trigger
  - New client signup (webhook from website or dashboard)
  
  ## Steps
  1. **Process Client Data** - Extract client information
  2. **Create HubSpot Contact** - Add client to HubSpot
     - Create contact with all relevant properties
     - Add to appropriate lists/workflows
     - Set lifecycle stage
  3. **Create Notion Client Page** - Add to Client database
     - Create client profile page with all details
     - Set up content preferences
  4. **Add to Airtable** - Create client record
     - Map all client properties
     - Set relationship to products/content
  5. **Create Welcome Sequence** - In HubSpot or email service
     - Schedule welcome emails
     - Personalize based on interests
  6. **Create Google Cloud Storage** - If applicable
     - Set up client storage area
     - Configure permissions
  7. **Trigger Welcome Call Task** - Create task for onboarding call
     - Assign to appropriate team member
     - Set priority and due date
  `,

  hubspotSynchronization: `
  # Make.com HubSpot Synchronization Blueprint
  
  ## Trigger
  - Scheduled (daily or on content/client update)
  
  ## Steps
  1. **Fetch Data from Sources**
     - Get clients from database
     - Get content from Notion
     - Get inventory from Airtable
     - Get orders from Stripe
  2. **Prepare HubSpot Data** - Format all data for HubSpot
     - Map properties to HubSpot fields
     - Prepare batch operations
  3. **Update HubSpot Contacts** - Sync client information
     - Create/update contacts
     - Update custom properties
  4. **Update HubSpot Deals** - Sync order information
     - Create/update deals
     - Link line items
  5. **Update HubSpot Custom Objects** - For content/products
     - Create/update custom objects
     - Associate with contacts
  6. **Generate Reports** - Create reports in HubSpot
     - Content performance
     - Client engagement
     - Revenue metrics
  7. **Verify Sync Status** - Check for errors
     - Log all operations
     - Flag issues for review
  `,

  contentAnalytics: `
  # Make.com Content Analytics Workflow Blueprint
  
  ## Trigger
  - Scheduled (weekly) or manual trigger
  
  ## Steps
  1. **Gather Content Performance Data**
     - Pull from Google Analytics
     - Extract from HubSpot engagement metrics
     - Combine with internal usage statistics
  2. **Process and Analyze Data**
     - Calculate engagement metrics
     - Determine most popular content
     - Segment by user type/tier
  3. **Update Notion Dashboard**
     - Create/update content analytics page
     - Generate visualization blocks
     - Highlight key insights
  4. **Update Airtable Records**
     - Add performance metrics to content records
     - Tag high-performing content
  5. **Create HubSpot Reports**
     - Update custom report
     - Generate shareable dashboard
  6. **Send Summary Email**
     - Generate weekly performance summary
     - Include top content and recommendations
  7. **Create Action Items**
     - Generate tasks based on insights
     - Assign to appropriate team members
  `
};

/**
 * SETUP INSTRUCTIONS FOR MAKE.COM SCENARIOS
 *
 * 1. Create a Make.com account at https://www.make.com
 * 2. Create a new scenario for each blueprint above
 * 3. Configure authentication for each service:
 *    - Notion: Connect via OAuth 
 *    - Airtable: Use API key authentication
 *    - Google Cloud: Set up service account authentication
 *    - Stripe: Connect using API keys
 *    - HubSpot: Connect using OAuth or API key
 * 4. For each scenario, start with a webhook trigger
 *    - Copy the webhook URL provided by Make.com
 *    - Use this URL in your dashboard to trigger the scenario
 * 5. Configure modules according to the blueprint steps
 * 6. Set up data mapping between modules
 * 7. Test each scenario with sample data
 * 8. Activate the scenario
 * 9. Update your .env with the webhook URLs:
 *    MAKE_CONTENT_DISTRIBUTION_WEBHOOK="https://hook.make.com/..."
 *    MAKE_ORDER_PROCESSING_WEBHOOK="https://hook.make.com/..."
 *    MAKE_CLIENT_MEMBERSHIP_WEBHOOK="https://hook.make.com/..."
 *    MAKE_CLIENT_ONBOARDING_WEBHOOK="https://hook.make.com/..."
 *    MAKE_HUBSPOT_SYNC_WEBHOOK="https://hook.make.com/..."
 */

/**
 * HubSpot Integration Notes
 * 
 * For your Midnight Magnolia business, HubSpot will primarily be used for:
 * 
 * 1. Client Relationship Management
 *    - Storing all client information with custom properties for membership tiers
 *    - Tracking client engagement with content
 *    - Managing client communication and follow-ups
 * 
 * 2. Content Distribution
 *    - Using HubSpot marketing tools to distribute content to clients
 *    - Tracking content performance and engagement
 *    - Creating automated workflows based on content interactions
 * 
 * 3. Sales Pipeline
 *    - Managing product sales through deals pipeline
 *    - Tracking revenue from different product types
 *    - Forecasting based on client interests
 * 
 * HubSpot Custom Properties to create:
 *    - membership_tier: Free, Basic, Premium, VIP
 *    - preferred_content_types: Multi-select (Affirmations, Tarot, Journal, etc.)
 *    - energy_level_preference: Single select (High, Medium, Low)
 *    - last_content_delivery: Date
 *    - content_engagement_score: Number
 *    - total_purchases: Number
 *    - midnight_magnolia_client: Boolean
 * 
 * HubSpot Custom Objects to create:
 *    - Content: Track all content pieces with properties like type, tags, status
 *    - Product: Track all products with properties like type, price, content_included
 */

/**
 * Example Make.com webhook payloads for testing
 */
export const exampleMakeWebhookPayloads = {
  contentDistribution: {
    action: "distribute_content",
    data: {
      content: {
        id: "123",
        title: "Daily Affirmations: Self-Acceptance",
        contentType: "affirmation",
        content: "1. My softness ain't weakness, honey; it's the river that carved the canyon.\n2. I honor the shadows of my ancestors as they guide my steps toward the light.",
        tags: ["affirmation", "self-love", "healing"],
        status: "published"
      },
      clients: [
        { id: "client1", email: "client1@example.com", membershipTier: "premium" }
      ]
    },
    source: "midnight_magnolia_dashboard",
    timestamp: Date.now()
  },
  
  orderProcessing: {
    action: "process_order",
    data: {
      order: {
        id: "order123",
        clientId: "client1",
        products: ["prod1", "prod2"],
        paymentIntentId: "pi_123456",
        status: "paid"
      }
    },
    source: "stripe_webhook",
    timestamp: Date.now()
  },
  
  clientOnboarding: {
    action: "onboard_client",
    data: {
      client: {
        id: "client456",
        fullName: "Maya Johnson",
        email: "maya@example.com",
        phone: "123-456-7890",
        membershipTier: "premium",
        interests: ["tarot", "affirmations", "journaling"],
        referralSource: "instagram"
      }
    },
    source: "signup_form",
    timestamp: Date.now()
  }
};