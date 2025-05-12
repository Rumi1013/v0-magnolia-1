/**
 * Notion Content Templates for Midnight Magnolia
 * 
 * This file manages the Notion content templates database and operations
 * for creating, updating, and retrieving content templates.
 */

import { Client } from "@notionhq/client";
import { Request, Response } from "express";
import { extractPageIdFromUrl } from "./notion";

// Make sure we have the required environment variables
if (!process.env.NOTION_INTEGRATION_SECRET || !process.env.NOTION_PAGE_URL) {
  console.warn('Missing Notion integration credentials. Templates functionality will be limited.');
}

// Initialize Notion client if credentials are available
const notion = process.env.NOTION_INTEGRATION_SECRET 
  ? new Client({ auth: process.env.NOTION_INTEGRATION_SECRET }) 
  : null;

// Try to extract page ID from URL if available  
const NOTION_PAGE_ID = process.env.NOTION_PAGE_URL 
  ? extractPageIdFromUrl(process.env.NOTION_PAGE_URL) 
  : null;

// Define template types - must match the TemplateType in client/src/hooks/useNotionTemplates.ts
export type TemplateType = 
  | 'tarot-readings-templates'
  | 'journal-prompts-templates'
  | 'affirmations-templates'
  | 'astrology-insights-templates'
  | 'scripts-templates'
  | 'brand-voice-templates'
  | 'email-templates';

// Template database IDs by type - will be populated during initialization
const templateDatabaseIds: Record<TemplateType, string> = {
  'tarot-readings-templates': '',
  'journal-prompts-templates': '',
  'affirmations-templates': '',
  'astrology-insights-templates': '',
  'scripts-templates': '',
  'brand-voice-templates': '',
  'email-templates': ''
};

// Template database schemas by type
const templateDatabaseSchemas: Record<TemplateType, any> = {
  'tarot-readings-templates': {
    Name: { title: {} },
    Description: { rich_text: {} },
    Content: { rich_text: {} },
    Category: { select: {
      options: [
        { name: 'Daily Draw', color: 'blue' },
        { name: 'Three Card Spread', color: 'green' },
        { name: 'Celtic Cross', color: 'orange' },
        { name: 'Career Reading', color: 'purple' },
        { name: 'Relationship Reading', color: 'pink' },
        { name: 'Spiritual Growth', color: 'yellow' }
      ]
    }},
    Tags: { multi_select: {
      options: [
        { name: 'Beginner', color: 'green' },
        { name: 'Intermediate', color: 'blue' },
        { name: 'Advanced', color: 'red' },
        { name: 'Major Arcana', color: 'purple' },
        { name: 'Minor Arcana', color: 'orange' }
      ]
    }},
    Status: { select: {
      options: [
        { name: 'Active', color: 'green' },
        { name: 'Draft', color: 'gray' },
        { name: 'Archived', color: 'red' }
      ]
    }},
    LastEdited: { date: {} }
  },
  
  'journal-prompts-templates': {
    Name: { title: {} },
    Description: { rich_text: {} },
    Content: { rich_text: {} },
    Category: { select: {
      options: [
        { name: 'Self-Discovery', color: 'blue' },
        { name: 'Gratitude', color: 'green' },
        { name: 'Shadow Work', color: 'purple' },
        { name: 'Manifestation', color: 'yellow' },
        { name: 'Healing', color: 'pink' },
        { name: 'Creativity', color: 'orange' }
      ]
    }},
    Tags: { multi_select: {
      options: [
        { name: 'Morning', color: 'yellow' },
        { name: 'Evening', color: 'blue' },
        { name: 'Weekly', color: 'green' },
        { name: 'Monthly', color: 'red' },
        { name: 'Seasonal', color: 'orange' }
      ]
    }},
    Status: { select: {
      options: [
        { name: 'Active', color: 'green' },
        { name: 'Draft', color: 'gray' },
        { name: 'Archived', color: 'red' }
      ]
    }},
    LastEdited: { date: {} }
  },
  
  'affirmations-templates': {
    Name: { title: {} },
    Description: { rich_text: {} },
    Content: { rich_text: {} },
    Category: { select: {
      options: [
        { name: 'Abundance', color: 'green' },
        { name: 'Self-Love', color: 'pink' },
        { name: 'Healing', color: 'blue' },
        { name: 'Confidence', color: 'yellow' },
        { name: 'Creativity', color: 'orange' },
        { name: 'Protection', color: 'purple' }
      ]
    }},
    Tags: { multi_select: {
      options: [
        { name: 'Daily', color: 'blue' },
        { name: 'Morning', color: 'yellow' },
        { name: 'Evening', color: 'purple' },
        { name: 'New Moon', color: 'gray' },
        { name: 'Full Moon', color: 'green' }
      ]
    }},
    Status: { select: {
      options: [
        { name: 'Active', color: 'green' },
        { name: 'Draft', color: 'gray' },
        { name: 'Archived', color: 'red' }
      ]
    }},
    LastEdited: { date: {} }
  },
  
  'astrology-insights-templates': {
    Name: { title: {} },
    Description: { rich_text: {} },
    Content: { rich_text: {} },
    Category: { select: {
      options: [
        { name: 'Monthly Horoscope', color: 'blue' },
        { name: 'New Moon', color: 'gray' },
        { name: 'Full Moon', color: 'yellow' },
        { name: 'Retrograde', color: 'orange' },
        { name: 'Zodiac Signs', color: 'green' },
        { name: 'Planetary Transits', color: 'purple' }
      ]
    }},
    Tags: { multi_select: {
      options: [
        { name: 'Fire Signs', color: 'red' },
        { name: 'Earth Signs', color: 'green' },
        { name: 'Air Signs', color: 'blue' },
        { name: 'Water Signs', color: 'purple' },
        { name: 'Personal', color: 'pink' },
        { name: 'Professional', color: 'orange' }
      ]
    }},
    Status: { select: {
      options: [
        { name: 'Active', color: 'green' },
        { name: 'Draft', color: 'gray' },
        { name: 'Archived', color: 'red' }
      ]
    }},
    LastEdited: { date: {} }
  },
  
  'scripts-templates': {
    Name: { title: {} },
    Description: { rich_text: {} },
    Content: { rich_text: {} },
    Category: { select: {
      options: [
        { name: 'Product Launch', color: 'green' },
        { name: 'Monthly Update', color: 'blue' },
        { name: 'Tutorial', color: 'orange' },
        { name: 'Announcement', color: 'purple' },
        { name: 'Behind the Scenes', color: 'pink' },
        { name: 'Q&A Session', color: 'yellow' }
      ]
    }},
    Tags: { multi_select: {
      options: [
        { name: 'Video', color: 'red' },
        { name: 'Podcast', color: 'green' },
        { name: 'Instagram', color: 'purple' },
        { name: 'YouTube', color: 'orange' },
        { name: 'TikTok', color: 'blue' }
      ]
    }},
    Status: { select: {
      options: [
        { name: 'Active', color: 'green' },
        { name: 'Draft', color: 'gray' },
        { name: 'Archived', color: 'red' }
      ]
    }},
    Duration: { select: {
      options: [
        { name: '1-3 minutes', color: 'green' },
        { name: '3-5 minutes', color: 'blue' },
        { name: '5-10 minutes', color: 'yellow' },
        { name: '10+ minutes', color: 'red' }
      ]
    }},
    LastEdited: { date: {} }
  },
  
  'brand-voice-templates': {
    Name: { title: {} },
    Description: { rich_text: {} },
    Content: { rich_text: {} },
    Category: { select: {
      options: [
        { name: 'Brand Personality', color: 'purple' },
        { name: 'Core Values', color: 'green' },
        { name: 'Tone Guidelines', color: 'blue' },
        { name: 'Vocabulary', color: 'orange' },
        { name: 'Messaging Principles', color: 'yellow' },
        { name: 'Storytelling Elements', color: 'pink' }
      ]
    }},
    Tags: { multi_select: {
      options: [
        { name: 'Website', color: 'blue' },
        { name: 'Social Media', color: 'purple' },
        { name: 'Email Marketing', color: 'green' },
        { name: 'Product Descriptions', color: 'yellow' },
        { name: 'Customer Service', color: 'red' }
      ]
    }},
    Status: { select: {
      options: [
        { name: 'Active', color: 'green' },
        { name: 'Draft', color: 'gray' },
        { name: 'Archived', color: 'red' }
      ]
    }},
    LastEdited: { date: {} }
  },
  
  'email-templates': {
    Name: { title: {} },
    Description: { rich_text: {} },
    Content: { rich_text: {} },
    Subject: { rich_text: {} },
    Category: { select: {
      options: [
        { name: 'Welcome Series', color: 'green' },
        { name: 'Newsletter', color: 'blue' },
        { name: 'Product Launch', color: 'orange' },
        { name: 'Event Invitation', color: 'purple' },
        { name: 'Promotional', color: 'yellow' },
        { name: 'Educational', color: 'pink' },
        { name: 'Membership Update', color: 'red' }
      ]
    }},
    Tags: { multi_select: {
      options: [
        { name: 'All Subscribers', color: 'blue' },
        { name: 'Members Only', color: 'green' },
        { name: 'VIP Tier', color: 'purple' },
        { name: 'New Subscribers', color: 'yellow' },
        { name: 'Targeted', color: 'red' }
      ]
    }},
    Status: { select: {
      options: [
        { name: 'Active', color: 'green' },
        { name: 'Draft', color: 'gray' },
        { name: 'Archived', color: 'red' }
      ]
    }},
    LastEdited: { date: {} }
  }
};

/**
 * Initialize content template databases in Notion
 * This creates the database if it doesn't exist yet
 */
export async function initializeContentTemplates(): Promise<void> {
  if (!notion || !NOTION_PAGE_ID) {
    console.warn('Notion client not initialized. Skipping template database initialization.');
    return;
  }

  try {
    console.log('Starting Notion content templates initialization...');
    
    // Get child databases under the main page
    const childDatabases = await getChildDatabases();
    
    // For each template type, check if database exists or create it
    for (const templateType of Object.keys(templateDatabaseSchemas) as TemplateType[]) {
      try {
        // Format template name for display (e.g., 'tarot-readings-templates' -> 'Tarot Readings Templates')
        const displayName = formatTemplateTypeName(templateType);
        
        // Check if database already exists
        const existingDb = childDatabases.find(db => {
          try {
            // Extract title from database object
            const dbTitle = db.title?.[0]?.plain_text?.toLowerCase();
            return dbTitle === displayName.toLowerCase();
          } catch (err) {
            return false;
          }
        });
        
        if (existingDb) {
          console.log(`Found existing template database: ${displayName} (${existingDb.id})`);
          templateDatabaseIds[templateType] = existingDb.id;
        } else {
          // Create new database if it doesn't exist
          console.log(`Creating new template database: ${displayName}`);
          const newDb = await notion.databases.create({
            parent: {
              type: "page_id",
              page_id: NOTION_PAGE_ID
            },
            title: [
              {
                type: "text",
                text: {
                  content: displayName
                }
              }
            ],
            properties: templateDatabaseSchemas[templateType]
          });
          
          templateDatabaseIds[templateType] = newDb.id;
          console.log(`Created new template database: ${displayName} (${newDb.id})`);
        }
      } catch (err) {
        console.error(`Error setting up ${templateType} database:`, err);
      }
    }
    
    console.log('Notion content templates initialization complete.');
  } catch (err) {
    console.error('Error initializing content templates:', err);
  }
}

/**
 * Format template type as display name
 * e.g., 'tarot-readings-templates' -> 'Tarot Readings Templates'
 */
function formatTemplateTypeName(templateType: string): string {
  return templateType
    .replace(/-/g, ' ')
    .replace(/templates$/, 'Templates')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get child databases under the main page
 */
async function getChildDatabases(): Promise<any[]> {
  if (!notion || !NOTION_PAGE_ID) {
    return [];
  }

  try {
    // First, get all child blocks of the page
    const response = await notion.blocks.children.list({
      block_id: NOTION_PAGE_ID
    });
    
    // Filter blocks to find child databases
    const databaseBlocks = response.results.filter(
      block => block.type === 'child_database'
    );
    
    // Get details for each database
    const databases = await Promise.all(
      databaseBlocks.map(async (block: any) => {
        try {
          return await notion.databases.retrieve({ database_id: block.id });
        } catch (err) {
          console.error(`Error retrieving database ${block.id}:`, err);
          return null;
        }
      })
    );
    
    return databases.filter(db => db !== null);
  } catch (err) {
    console.error('Error getting child databases:', err);
    return [];
  }
}

/**
 * Get content templates by type
 */
export async function getContentTemplates(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { type } = req.params;
    
    // Validate template type
    if (!isValidTemplateType(type)) {
      return res.status(400).json({ error: `Invalid template type: ${type}` });
    }
    
    const templateType = type as TemplateType;
    const databaseId = templateDatabaseIds[templateType];
    
    if (!databaseId) {
      return res.status(404).json({ 
        error: `Template database for ${type} not found. It may not be initialized yet.` 
      });
    }
    
    // Query the template database
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Name',
          direction: 'ascending'
        }
      ]
    });
    
    // Transform Notion results to our ContentTemplate format
    const templates = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        name: properties.Name.title[0]?.plain_text || 'Untitled Template',
        description: properties.Description.rich_text[0]?.plain_text || '',
        content: properties.Content.rich_text[0]?.plain_text || '',
        category: properties.Category?.select?.name || '',
        tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        lastEdited: properties.LastEdited?.date?.start || new Date().toISOString()
      };
    });
    
    res.json(templates);
  } catch (err: any) {
    console.error('Error getting content templates:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Add a new content template
 */
export async function addContentTemplate(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { type } = req.params;
    const templateData = req.body;
    
    // Validate template type
    if (!isValidTemplateType(type)) {
      return res.status(400).json({ error: `Invalid template type: ${type}` });
    }
    
    const templateType = type as TemplateType;
    const databaseId = templateDatabaseIds[templateType];
    
    if (!databaseId) {
      return res.status(404).json({ 
        error: `Template database for ${type} not found. It may not be initialized yet.` 
      });
    }
    
    // Validate required fields
    if (!templateData.name || !templateData.content) {
      return res.status(400).json({ error: 'Name and content are required' });
    }
    
    // Create the template in Notion
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: templateData.name
              }
            }
          ]
        },
        Description: {
          rich_text: [
            {
              text: {
                content: templateData.description || ''
              }
            }
          ]
        },
        Content: {
          rich_text: [
            {
              text: {
                content: templateData.content
              }
            }
          ]
        },
        ...(templateData.category && {
          Category: {
            select: {
              name: templateData.category
            }
          }
        }),
        ...(templateData.tags && templateData.tags.length > 0 && {
          Tags: {
            multi_select: templateData.tags.map((tag: string) => ({
              name: tag
            }))
          }
        }),
        Status: {
          select: {
            name: 'Active'
          }
        },
        LastEdited: {
          date: {
            start: new Date().toISOString()
          }
        }
      }
    });
    
    res.status(201).json({
      id: response.id,
      ...templateData
    });
  } catch (err: any) {
    console.error('Error adding content template:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Update an existing content template
 */
export async function updateContentTemplate(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { type, id } = req.params;
    const templateData = req.body;
    
    // Validate template type
    if (!isValidTemplateType(type)) {
      return res.status(400).json({ error: `Invalid template type: ${type}` });
    }
    
    // Update the template in Notion
    const properties: any = {};
    
    if (templateData.name) {
      properties.Name = {
        title: [
          {
            text: {
              content: templateData.name
            }
          }
        ]
      };
    }
    
    if (templateData.description !== undefined) {
      properties.Description = {
        rich_text: [
          {
            text: {
              content: templateData.description
            }
          }
        ]
      };
    }
    
    if (templateData.content) {
      properties.Content = {
        rich_text: [
          {
            text: {
              content: templateData.content
            }
          }
        ]
      };
    }
    
    if (templateData.category) {
      properties.Category = {
        select: {
          name: templateData.category
        }
      };
    }
    
    if (templateData.tags) {
      properties.Tags = {
        multi_select: templateData.tags.map((tag: string) => ({
          name: tag
        }))
      };
    }
    
    if (templateData.status) {
      properties.Status = {
        select: {
          name: templateData.status
        }
      };
    }
    
    // Always update LastEdited
    properties.LastEdited = {
      date: {
        start: new Date().toISOString()
      }
    };
    
    const response = await notion.pages.update({
      page_id: id,
      properties
    });
    
    res.json({
      id,
      ...templateData
    });
  } catch (err: any) {
    console.error('Error updating content template:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Delete a content template
 */
export async function deleteContentTemplate(req: Request, res: Response) {
  if (!notion) {
    return res.status(503).json({ 
      error: 'Notion integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { type, id } = req.params;
    
    // Validate template type
    if (!isValidTemplateType(type)) {
      return res.status(400).json({ error: `Invalid template type: ${type}` });
    }
    
    // Instead of deleting the page, mark it as "Archived"
    await notion.pages.update({
      page_id: id,
      properties: {
        Status: {
          select: {
            name: 'Archived'
          }
        },
        LastEdited: {
          date: {
            start: new Date().toISOString()
          }
        }
      }
    });
    
    res.json({ success: true, message: 'Template archived successfully' });
  } catch (err: any) {
    console.error('Error deleting content template:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Check if a template type is valid
 */
function isValidTemplateType(type: string): type is TemplateType {
  return Object.keys(templateDatabaseSchemas).includes(type);
}