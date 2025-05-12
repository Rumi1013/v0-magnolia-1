import { Request, Response } from 'express';
import { notionService, NOTION_PAGE_ID } from './notion';

// Database IDs for different content template types
const CONTENT_TEMPLATES = {
  TAROT_READINGS: 'tarot-readings-templates',
  JOURNAL_PROMPTS: 'journal-prompts-templates',
  AFFIRMATIONS: 'affirmations-templates',
  ASTROLOGY_INSIGHTS: 'astrology-insights-templates',
  SCRIPTS: 'scripts-templates',
  BRAND_VOICE: 'brand-voice-templates',
  EMAILS: 'email-templates'
};

/**
 * Initialize Notion databases for content templates if they don't exist
 */
export async function initializeContentTemplates() {
  if (!NOTION_PAGE_ID) {
    console.warn('NOTION_PAGE_ID is not set. Cannot initialize content templates.');
    return;
  }
  
  try {
    // Create Tarot Readings Templates Database
    await createTemplateDatabase(
      CONTENT_TEMPLATES.TAROT_READINGS,
      'Tarot Reading Templates',
      {
        Name: {
          title: {}
        },
        Description: {
          rich_text: {}
        },
        Template: {
          rich_text: {}
        },
        CardType: {
          select: {
            options: [
              { name: 'Major Arcana', color: 'purple' },
              { name: 'Minor Arcana', color: 'blue' },
              { name: 'Court Cards', color: 'green' }
            ]
          }
        },
        ReadingType: {
          select: {
            options: [
              { name: 'Single Card', color: 'yellow' },
              { name: 'Three Card', color: 'orange' },
              { name: 'Celtic Cross', color: 'red' },
              { name: 'Five Card', color: 'pink' }
            ]
          }
        },
        Tags: {
          multi_select: {
            options: [
              { name: 'Love', color: 'red' },
              { name: 'Career', color: 'blue' },
              { name: 'Finance', color: 'green' },
              { name: 'Spiritual', color: 'purple' },
              { name: 'Personal Growth', color: 'yellow' }
            ]
          }
        }
      },
      '🔮'
    );
    
    // Create Journal Prompts Templates Database
    await createTemplateDatabase(
      CONTENT_TEMPLATES.JOURNAL_PROMPTS,
      'Journal Prompt Templates',
      {
        Name: {
          title: {}
        },
        Description: {
          rich_text: {}
        },
        Prompt: {
          rich_text: {}
        },
        Category: {
          select: {
            options: [
              { name: 'Self-Reflection', color: 'blue' },
              { name: 'Goal Setting', color: 'green' },
              { name: 'Shadow Work', color: 'purple' },
              { name: 'Gratitude', color: 'yellow' },
              { name: 'Release', color: 'red' }
            ]
          }
        },
        Tags: {
          multi_select: {
            options: [
              { name: 'Morning', color: 'yellow' },
              { name: 'Evening', color: 'blue' },
              { name: 'Weekly', color: 'green' },
              { name: 'Monthly', color: 'purple' },
              { name: 'New Moon', color: 'gray' },
              { name: 'Full Moon', color: 'white' }
            ]
          }
        }
      },
      '📓'
    );
    
    // Create Affirmations Templates Database
    await createTemplateDatabase(
      CONTENT_TEMPLATES.AFFIRMATIONS,
      'Affirmation Templates',
      {
        Name: {
          title: {}
        },
        Description: {
          rich_text: {}
        },
        Affirmation: {
          rich_text: {}
        },
        Category: {
          select: {
            options: [
              { name: 'Abundance', color: 'green' },
              { name: 'Self-Love', color: 'pink' },
              { name: 'Confidence', color: 'yellow' },
              { name: 'Health', color: 'blue' },
              { name: 'Relationships', color: 'red' }
            ]
          }
        },
        Usage: {
          select: {
            options: [
              { name: 'Morning Ritual', color: 'yellow' },
              { name: 'Meditation', color: 'purple' },
              { name: 'Digital Content', color: 'blue' },
              { name: 'Journaling', color: 'green' }
            ]
          }
        }
      },
      '✨'
    );
    
    // Create Astrology Insights Templates Database
    await createTemplateDatabase(
      CONTENT_TEMPLATES.ASTROLOGY_INSIGHTS,
      'Astrology Insights Templates',
      {
        Name: {
          title: {}
        },
        Description: {
          rich_text: {}
        },
        Template: {
          rich_text: {}
        },
        AstrologyType: {
          select: {
            options: [
              { name: 'Natal Chart', color: 'blue' },
              { name: 'Transit', color: 'purple' },
              { name: 'Horoscope', color: 'yellow' },
              { name: 'Compatibility', color: 'pink' },
              { name: 'Moon Phase', color: 'gray' }
            ]
          }
        },
        Planet: {
          multi_select: {
            options: [
              { name: 'Sun', color: 'yellow' },
              { name: 'Moon', color: 'gray' },
              { name: 'Mercury', color: 'blue' },
              { name: 'Venus', color: 'green' },
              { name: 'Mars', color: 'red' },
              { name: 'Jupiter', color: 'orange' },
              { name: 'Saturn', color: 'purple' },
              { name: 'Uranus', color: 'brown' },
              { name: 'Neptune', color: 'blue' },
              { name: 'Pluto', color: 'black' }
            ]
          }
        }
      },
      '🌙'
    );
    
    console.log('Content template databases initialized successfully.');
  } catch (error) {
    console.error('Error initializing content template databases:', error);
  }
}

/**
 * Create a template database if it doesn't exist
 */
async function createTemplateDatabase(id: string, title: string, properties: any, icon?: string) {
  try {
    // First check if database exists by searching for it
    const databases = await notionService.listDatabases(title);
    const existingDb = databases.find((db: any) => {
      // Check if the database title matches
      if (db.title && Array.isArray(db.title)) {
        const dbTitle = db.title[0]?.plain_text?.toLowerCase();
        return dbTitle === title.toLowerCase();
      }
      return false;
    });
    
    if (existingDb) {
      console.log(`Database "${title}" already exists.`);
      return existingDb;
    }
    
    // Create the database if it doesn't exist
    const db = await notionService.createDatabase(
      NOTION_PAGE_ID!,
      title,
      properties,
      icon
    );
    
    console.log(`Database "${title}" created successfully.`);
    return db;
  } catch (error) {
    console.error(`Error creating database "${title}":`, error);
    throw error;
  }
}

/**
 * Get content templates from Notion
 */
export async function getContentTemplates(req: Request, res: Response) {
  try {
    const { type } = req.params;
    
    if (!NOTION_PAGE_ID) {
      return res.status(500).json({ 
        error: 'Notion integration is not configured properly. Please set NOTION_PAGE_URL environment variable.' 
      });
    }
    
    // Validate template type
    const templateType = Object.values(CONTENT_TEMPLATES).find(t => t === type);
    if (!templateType) {
      return res.status(400).json({ error: 'Invalid template type' });
    }
    
    // Search for the database
    const databases = await notionService.listDatabases();
    
    // Find the right database based on title
    const templateTitle = type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    let targetDb: any = null;
    
    for (const db of databases) {
      if (db.title && Array.isArray(db.title)) {
        const dbTitle = db.title[0]?.plain_text;
        if (dbTitle && dbTitle.includes(templateTitle)) {
          targetDb = db;
          break;
        }
      }
    }
    
    if (!targetDb) {
      return res.status(404).json({ error: 'Template database not found' });
    }
    
    // Query the database for templates
    const templates = await notionService.queryDatabase(targetDb.id);
    
    // Format the templates for the frontend
    const formattedTemplates = templates.map((template: any) => {
      const properties = template.properties;
      
      return {
        id: template.id,
        name: properties.Name.title[0]?.plain_text || 'Untitled',
        description: properties.Description.rich_text[0]?.plain_text || '',
        content: properties.Template?.rich_text[0]?.plain_text || 
                properties.Prompt?.rich_text[0]?.plain_text || 
                properties.Affirmation?.rich_text[0]?.plain_text || '',
        category: properties.Category?.select?.name || 
                 properties.ReadingType?.select?.name || 
                 properties.AstrologyType?.select?.name || '',
        tags: (properties.Tags?.multi_select || []).map((tag: any) => tag.name),
        lastEdited: template.last_edited_time
      };
    });
    
    res.json(formattedTemplates);
  } catch (error: any) {
    console.error('Error getting content templates:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Add a new content template to Notion
 */
export async function addContentTemplate(req: Request, res: Response) {
  try {
    const { type } = req.params;
    const templateData = req.body;
    
    if (!NOTION_PAGE_ID) {
      return res.status(500).json({ 
        error: 'Notion integration is not configured properly. Please set NOTION_PAGE_URL environment variable.' 
      });
    }
    
    // Validate template type
    const templateType = Object.values(CONTENT_TEMPLATES).find(t => t === type);
    if (!templateType) {
      return res.status(400).json({ error: 'Invalid template type' });
    }
    
    // Search for the database
    const databases = await notionService.listDatabases();
    
    // Find the right database based on title
    const templateTitle = type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    let targetDb: any = null;
    
    for (const db of databases) {
      if (db.title && Array.isArray(db.title)) {
        const dbTitle = db.title[0]?.plain_text;
        if (dbTitle && dbTitle.includes(templateTitle)) {
          targetDb = db;
          break;
        }
      }
    }
    
    if (!targetDb) {
      return res.status(404).json({ error: 'Template database not found' });
    }
    
    // Prepare the properties based on template type
    let properties: any = {
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
      }
    };
    
    // Add specific properties based on template type
    if (type === CONTENT_TEMPLATES.TAROT_READINGS) {
      properties.Template = {
        rich_text: [
          {
            text: {
              content: templateData.content || ''
            }
          }
        ]
      };
      
      if (templateData.cardType) {
        properties.CardType = {
          select: {
            name: templateData.cardType
          }
        };
      }
      
      if (templateData.readingType) {
        properties.ReadingType = {
          select: {
            name: templateData.readingType
          }
        };
      }
    }
    else if (type === CONTENT_TEMPLATES.JOURNAL_PROMPTS) {
      properties.Prompt = {
        rich_text: [
          {
            text: {
              content: templateData.content || ''
            }
          }
        ]
      };
      
      if (templateData.category) {
        properties.Category = {
          select: {
            name: templateData.category
          }
        };
      }
    }
    else if (type === CONTENT_TEMPLATES.AFFIRMATIONS) {
      properties.Affirmation = {
        rich_text: [
          {
            text: {
              content: templateData.content || ''
            }
          }
        ]
      };
      
      if (templateData.category) {
        properties.Category = {
          select: {
            name: templateData.category
          }
        };
      }
      
      if (templateData.usage) {
        properties.Usage = {
          select: {
            name: templateData.usage
          }
        };
      }
    }
    else if (type === CONTENT_TEMPLATES.ASTROLOGY_INSIGHTS) {
      properties.Template = {
        rich_text: [
          {
            text: {
              content: templateData.content || ''
            }
          }
        ]
      };
      
      if (templateData.astrologyType) {
        properties.AstrologyType = {
          select: {
            name: templateData.astrologyType
          }
        };
      }
    }
    
    // Add tags if provided
    if (templateData.tags && Array.isArray(templateData.tags) && templateData.tags.length > 0) {
      properties.Tags = {
        multi_select: templateData.tags.map((tag: string) => ({
          name: tag
        }))
      };
    }
    
    // Add the page to the database
    const result = await notionService.addDatabasePage(targetDb.id, properties);
    
    res.status(201).json({ 
      message: 'Template created successfully',
      id: result.id
    });
  } catch (error: any) {
    console.error('Error adding content template:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Update an existing content template in Notion
 */
export async function updateContentTemplate(req: Request, res: Response) {
  try {
    const { type, id } = req.params;
    const templateData = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'Template ID is required' });
    }
    
    // Prepare the properties to update
    let properties: any = {};
    
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
              content: templateData.description || ''
            }
          }
        ]
      };
    }
    
    // Update specific properties based on template type
    if (type === CONTENT_TEMPLATES.TAROT_READINGS) {
      if (templateData.content !== undefined) {
        properties.Template = {
          rich_text: [
            {
              text: {
                content: templateData.content || ''
              }
            }
          ]
        };
      }
      
      if (templateData.cardType) {
        properties.CardType = {
          select: {
            name: templateData.cardType
          }
        };
      }
      
      if (templateData.readingType) {
        properties.ReadingType = {
          select: {
            name: templateData.readingType
          }
        };
      }
    }
    else if (type === CONTENT_TEMPLATES.JOURNAL_PROMPTS) {
      if (templateData.content !== undefined) {
        properties.Prompt = {
          rich_text: [
            {
              text: {
                content: templateData.content || ''
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
    }
    else if (type === CONTENT_TEMPLATES.AFFIRMATIONS) {
      if (templateData.content !== undefined) {
        properties.Affirmation = {
          rich_text: [
            {
              text: {
                content: templateData.content || ''
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
      
      if (templateData.usage) {
        properties.Usage = {
          select: {
            name: templateData.usage
          }
        };
      }
    }
    else if (type === CONTENT_TEMPLATES.ASTROLOGY_INSIGHTS) {
      if (templateData.content !== undefined) {
        properties.Template = {
          rich_text: [
            {
              text: {
                content: templateData.content || ''
              }
            }
          ]
        };
      }
      
      if (templateData.astrologyType) {
        properties.AstrologyType = {
          select: {
            name: templateData.astrologyType
          }
        };
      }
    }
    
    // Update tags if provided
    if (templateData.tags && Array.isArray(templateData.tags)) {
      properties.Tags = {
        multi_select: templateData.tags.map((tag: string) => ({
          name: tag
        }))
      };
    }
    
    // Update the page in Notion
    const result = await notionService.updatePage(id, properties);
    
    res.json({ 
      message: 'Template updated successfully',
      id: result.id
    });
  } catch (error: any) {
    console.error('Error updating content template:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Delete a content template from Notion (archive it)
 */
export async function deleteContentTemplate(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Template ID is required' });
    }
    
    // Archive the page in Notion
    const result = await notionService.archivePage(id);
    
    res.json({ 
      message: 'Template deleted successfully',
      id: result.id
    });
  } catch (error: any) {
    console.error('Error deleting content template:', error);
    res.status(500).json({ error: error.message });
  }
}