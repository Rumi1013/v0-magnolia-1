/**
 * Midnight Magnolia Notion Integration
 * 
 * This file provides utilities for working with Notion as a content management system
 * for the Midnight Magnolia content creation dashboard.
 */

import { notionService } from '../notion';

interface NotionContent {
  title: string;
  contentType: string;
  content: string;
  tags: string[];
  status?: string;
  clientIds?: string[];
  createdAt?: string;
  properties?: Record<string, any>;
}

interface NotionClient {
  fullName: string;
  email: string;
  membershipTier: string;
  phone?: string;
  interests?: string[];
  createdAt?: string;
  properties?: Record<string, any>;
}

/**
 * Common Notion database names used in Midnight Magnolia
 */
export const notionDatabases = {
  clients: 'MM_Clients',
  affirmations: 'MM_Affirmations',
  tarotReadings: 'MM_Tarot_Readings',
  journalPrompts: 'MM_Journal_Prompts',
  contentInventory: 'MM_Content_Inventory',
  fulfillmentTasks: 'MM_Fulfillment_Tasks',
  products: 'MM_Products',
  contentAnalytics: 'MM_Content_Analytics'
};

/**
 * Fetch database ID by name
 * @param databaseName The name of the database to find
 */
export async function getDatabaseIdByName(databaseName: string): Promise<string | null> {
  try {
    // List all databases the integration has access to
    const databases = await notionService.listDatabases();
    
    // Find the database with the matching name
    for (const database of databases) {
      // Check if title is not empty and contains the name we're looking for
      if (
        database.title &&
        Array.isArray(database.title) && 
        database.title.length > 0 &&
        database.title[0].plain_text === databaseName
      ) {
        return database.id;
      }
    }
    
    // Database not found
    console.warn(`Notion database '${databaseName}' not found`);
    return null;
  } catch (error) {
    console.error('Error finding Notion database by name:', error);
    throw error;
  }
}

/**
 * Creates new content in the appropriate Notion database
 * @param content The content to add to Notion
 */
export async function createContentInNotion(content: NotionContent): Promise<any> {
  try {
    // Determine which database to use based on content type
    let databaseName;
    
    switch (content.contentType.toLowerCase()) {
      case 'affirmation':
        databaseName = notionDatabases.affirmations;
        break;
      case 'tarot':
        databaseName = notionDatabases.tarotReadings;
        break;
      case 'journal':
        databaseName = notionDatabases.journalPrompts;
        break;
      default:
        databaseName = notionDatabases.contentInventory;
    }
    
    // Get the database ID
    const databaseId = await getDatabaseIdByName(databaseName);
    
    if (!databaseId) {
      throw new Error(`Database '${databaseName}' not found. Please create it first.`);
    }
    
    // Prepare properties for Notion
    const properties: Record<string, any> = {
      Title: {
        title: [
          {
            text: {
              content: content.title
            }
          }
        ]
      },
      Content: {
        rich_text: [
          {
            text: {
              content: content.content.substring(0, 2000) // Notion has a limit on rich_text length
            }
          }
        ]
      },
      ContentType: {
        select: {
          name: content.contentType
        }
      },
      Tags: {
        multi_select: content.tags.map(tag => ({
          name: tag
        }))
      },
      Status: {
        select: {
          name: content.status || 'Draft'
        }
      }
    };
    
    // Add custom properties if provided
    if (content.properties) {
      Object.assign(properties, content.properties);
    }
    
    // Create the page in Notion
    const result = await notionService.addDatabasePage(
      databaseId,
      properties,
      content.contentType === 'affirmation' ? '✨' : undefined // Optional emoji icon
    );
    
    return result;
  } catch (error) {
    console.error('Error creating content in Notion:', error);
    throw error;
  }
}

/**
 * Creates or updates a client in the Notion clients database
 * @param client The client information to add/update
 */
export async function syncClientToNotion(client: NotionClient): Promise<any> {
  try {
    // Get the clients database ID
    const databaseId = await getDatabaseIdByName(notionDatabases.clients);
    
    if (!databaseId) {
      throw new Error(`Clients database '${notionDatabases.clients}' not found. Please create it first.`);
    }
    
    // Check if client already exists
    const existingClients = await notionService.queryDatabase(databaseId, {
      filter: {
        property: 'Email',
        text: {
          equals: client.email
        }
      }
    });
    
    // Prepare properties for Notion
    const properties: Record<string, any> = {
      Name: {
        title: [
          {
            text: {
              content: client.fullName
            }
          }
        ]
      },
      Email: {
        email: client.email
      },
      MembershipTier: {
        select: {
          name: client.membershipTier
        }
      },
      Phone: {
        phone_number: client.phone || ''
      }
    };
    
    // Add interests if provided
    if (client.interests && client.interests.length > 0) {
      properties.Interests = {
        multi_select: client.interests.map(interest => ({
          name: interest
        }))
      };
    }
    
    // Add custom properties if provided
    if (client.properties) {
      Object.assign(properties, client.properties);
    }
    
    let result;
    
    // Update existing client or create new one
    if (existingClients.results.length > 0) {
      const clientId = existingClients.results[0].id;
      result = await notionService.updatePage(clientId, properties);
    } else {
      result = await notionService.addDatabasePage(databaseId, properties, '👤');
    }
    
    return result;
  } catch (error) {
    console.error('Error syncing client to Notion:', error);
    throw error;
  }
}

/**
 * Creates a content fulfillment task in Notion
 * @param content The content to be fulfilled
 * @param client The client to fulfill the content for
 * @param dueDate When the task should be completed by
 */
export async function createFulfillmentTask(
  content: { id: string; title: string; contentType: string },
  client: { id: string; fullName: string; email: string },
  dueDate?: Date
): Promise<any> {
  try {
    // Get the tasks database ID
    const databaseId = await getDatabaseIdByName(notionDatabases.fulfillmentTasks);
    
    if (!databaseId) {
      throw new Error(`Tasks database '${notionDatabases.fulfillmentTasks}' not found. Please create it first.`);
    }
    
    // Prepare properties for Notion
    const properties: Record<string, any> = {
      Task: {
        title: [
          {
            text: {
              content: `Deliver ${content.contentType}: ${content.title}`
            }
          }
        ]
      },
      Client: {
        rich_text: [
          {
            text: {
              content: `${client.fullName} (${client.email})`
            }
          }
        ]
      },
      ContentType: {
        select: {
          name: content.contentType
        }
      },
      Status: {
        select: {
          name: 'To Do'
        }
      },
      Priority: {
        select: {
          name: 'Medium'
        }
      }
    };
    
    // Add due date if provided
    if (dueDate) {
      properties.DueDate = {
        date: {
          start: dueDate.toISOString().split('T')[0]
        }
      };
    }
    
    // Create the task in Notion
    const result = await notionService.addDatabasePage(
      databaseId,
      properties,
      '📋'
    );
    
    return result;
  } catch (error) {
    console.error('Error creating fulfillment task in Notion:', error);
    throw error;
  }
}

/**
 * Searches for content in Notion databases by keywords
 * @param query The search query
 * @param contentType Optional content type filter
 */
export async function searchNotionContent(query: string, contentType?: string): Promise<any[]> {
  try {
    // Determine which database(s) to search
    let databaseId;
    
    if (contentType) {
      // Search specific database based on content type
      let databaseName;
      
      switch (contentType.toLowerCase()) {
        case 'affirmation':
          databaseName = notionDatabases.affirmations;
          break;
        case 'tarot':
          databaseName = notionDatabases.tarotReadings;
          break;
        case 'journal':
          databaseName = notionDatabases.journalPrompts;
          break;
        default:
          databaseName = notionDatabases.contentInventory;
      }
      
      databaseId = await getDatabaseIdByName(databaseName);
      
      if (!databaseId) {
        console.warn(`Database '${databaseName}' not found. Skipping search.`);
        return [];
      }
      
      // Search the database for matching content
      const results = await notionService.queryDatabase(databaseId, {
        filter: {
          or: [
            {
              property: 'Title',
              text: {
                contains: query
              }
            },
            {
              property: 'Content',
              text: {
                contains: query
              }
            },
            {
              property: 'Tags',
              multi_select: {
                contains: query
              }
            }
          ]
        }
      });
      
      return results.results;
    } else {
      // Search all content databases
      const allContent = [];
      
      // Get IDs for all content databases
      const affirmationsId = await getDatabaseIdByName(notionDatabases.affirmations);
      const tarotId = await getDatabaseIdByName(notionDatabases.tarotReadings);
      const journalId = await getDatabaseIdByName(notionDatabases.journalPrompts);
      const inventoryId = await getDatabaseIdByName(notionDatabases.contentInventory);
      
      // Search each database and collect results
      const databases = [
        { id: affirmationsId, type: 'affirmation' },
        { id: tarotId, type: 'tarot' },
        { id: journalId, type: 'journal' },
        { id: inventoryId, type: 'other' }
      ];
      
      for (const db of databases) {
        if (!db.id) continue;
        
        const results = await notionService.queryDatabase(db.id, {
          filter: {
            or: [
              {
                property: 'Title',
                text: {
                  contains: query
                }
              },
              {
                property: 'Content',
                text: {
                  contains: query
                }
              },
              {
                property: 'Tags',
                multi_select: {
                  contains: query
                }
              }
            ]
          }
        });
        
        // Add type information to results
        const typedResults = results.results.map(result => ({
          ...result,
          contentType: db.type
        }));
        
        allContent.push(...typedResults);
      }
      
      return allContent;
    }
  } catch (error) {
    console.error('Error searching Notion content:', error);
    throw error;
  }
}

/**
 * Creates the necessary database templates in Notion for Midnight Magnolia
 */
export async function setupNotionDatabases(parentPageId: string): Promise<void> {
  try {
    console.log('Starting Notion database setup...');
    
    // Create clients database
    await createClientsDatabase(parentPageId);
    
    // Create content databases
    await createAffirmationsDatabase(parentPageId);
    await createTarotReadingsDatabase(parentPageId);
    await createJournalPromptsDatabase(parentPageId);
    
    // Create management databases
    await createContentInventoryDatabase(parentPageId);
    await createFulfillmentTasksDatabase(parentPageId);
    
    console.log('Notion database setup complete!');
  } catch (error) {
    console.error('Error setting up Notion databases:', error);
    throw error;
  }
}

// Helper function to create Clients database
async function createClientsDatabase(parentPageId: string): Promise<void> {
  try {
    console.log('Creating Clients database...');
    
    await notionService.createDatabase(
      parentPageId,
      notionDatabases.clients,
      {
        Name: {
          title: {}
        },
        Email: {
          email: {}
        },
        MembershipTier: {
          select: {
            options: [
              { name: 'Free', color: 'gray' },
              { name: 'Basic', color: 'blue' },
              { name: 'Premium', color: 'green' },
              { name: 'VIP', color: 'purple' }
            ]
          }
        },
        Phone: {
          phone_number: {}
        },
        Interests: {
          multi_select: {
            options: [
              { name: 'Affirmations', color: 'orange' },
              { name: 'Tarot', color: 'red' },
              { name: 'Journaling', color: 'green' },
              { name: 'Mindfulness', color: 'blue' },
              { name: 'Astrology', color: 'purple' }
            ]
          }
        },
        Status: {
          select: {
            options: [
              { name: 'Active', color: 'green' },
              { name: 'Inactive', color: 'gray' },
              { name: 'Pending', color: 'yellow' }
            ]
          }
        },
        JoinDate: {
          date: {}
        },
        LastContactDate: {
          date: {}
        },
        Notes: {
          rich_text: {}
        }
      },
      '👤'
    );
    
    console.log('Clients database created!');
  } catch (error) {
    console.error('Error creating Clients database:', error);
    throw error;
  }
}

// Helper function to create Affirmations database
async function createAffirmationsDatabase(parentPageId: string): Promise<void> {
  try {
    console.log('Creating Affirmations database...');
    
    await notionService.createDatabase(
      parentPageId,
      notionDatabases.affirmations,
      {
        Title: {
          title: {}
        },
        Content: {
          rich_text: {}
        },
        Tags: {
          multi_select: {
            options: [
              { name: 'self-love', color: 'pink' },
              { name: 'abundance', color: 'green' },
              { name: 'healing', color: 'blue' },
              { name: 'growth', color: 'orange' },
              { name: 'gratitude', color: 'purple' }
            ]
          }
        },
        Status: {
          select: {
            options: [
              { name: 'Draft', color: 'gray' },
              { name: 'Published', color: 'green' },
              { name: 'Archived', color: 'brown' }
            ]
          }
        },
        MoodCategory: {
          select: {
            options: [
              { name: 'Uplifting', color: 'yellow' },
              { name: 'Calming', color: 'blue' },
              { name: 'Empowering', color: 'red' },
              { name: 'Healing', color: 'green' },
              { name: 'Grounding', color: 'orange' }
            ]
          }
        },
        AssignedToClients: {
          relation: {
            database_id: '{{clients_database_id}}'
          }
        },
        CreatedDate: {
          date: {}
        },
        LastUpdated: {
          last_edited_time: {}
        }
      },
      '✨'
    );
    
    console.log('Affirmations database created!');
  } catch (error) {
    console.error('Error creating Affirmations database:', error);
    throw error;
  }
}

// Helper function to create Tarot Readings database
async function createTarotReadingsDatabase(parentPageId: string): Promise<void> {
  try {
    console.log('Creating Tarot Readings database...');
    
    await notionService.createDatabase(
      parentPageId,
      notionDatabases.tarotReadings,
      {
        Title: {
          title: {}
        },
        CardName: {
          select: {
            options: [
              { name: 'The Fool', color: 'yellow' },
              { name: 'The Magician', color: 'red' },
              { name: 'The High Priestess', color: 'blue' },
              { name: 'The Empress', color: 'green' },
              { name: 'The Emperor', color: 'orange' },
              // Add more card options as needed
            ]
          }
        },
        Interpretation: {
          rich_text: {}
        },
        Tags: {
          multi_select: {
            options: [
              { name: 'career', color: 'blue' },
              { name: 'relationships', color: 'pink' },
              { name: 'personal-growth', color: 'green' },
              { name: 'spiritual', color: 'purple' },
              { name: 'health', color: 'orange' }
            ]
          }
        },
        Status: {
          select: {
            options: [
              { name: 'Draft', color: 'gray' },
              { name: 'Published', color: 'green' },
              { name: 'Archived', color: 'brown' }
            ]
          }
        },
        SpreadType: {
          select: {
            options: [
              { name: 'Single Card', color: 'blue' },
              { name: 'Three Card', color: 'orange' },
              { name: 'Celtic Cross', color: 'purple' }
            ]
          }
        },
        AssignedToClients: {
          relation: {
            database_id: '{{clients_database_id}}'
          }
        },
        CreatedDate: {
          date: {}
        },
        LastUpdated: {
          last_edited_time: {}
        }
      },
      '🔮'
    );
    
    console.log('Tarot Readings database created!');
  } catch (error) {
    console.error('Error creating Tarot Readings database:', error);
    throw error;
  }
}

// Helper function to create Journal Prompts database
async function createJournalPromptsDatabase(parentPageId: string): Promise<void> {
  try {
    console.log('Creating Journal Prompts database...');
    
    await notionService.createDatabase(
      parentPageId,
      notionDatabases.journalPrompts,
      {
        Title: {
          title: {}
        },
        Prompt: {
          rich_text: {}
        },
        Category: {
          select: {
            options: [
              { name: 'Self-Discovery', color: 'blue' },
              { name: 'Gratitude', color: 'green' },
              { name: 'Goal Setting', color: 'orange' },
              { name: 'Reflection', color: 'purple' },
              { name: 'Shadow Work', color: 'gray' }
            ]
          }
        },
        Tags: {
          multi_select: {
            options: [
              { name: 'beginner', color: 'green' },
              { name: 'intermediate', color: 'orange' },
              { name: 'advanced', color: 'red' },
              { name: 'morning', color: 'blue' },
              { name: 'evening', color: 'purple' }
            ]
          }
        },
        Status: {
          select: {
            options: [
              { name: 'Draft', color: 'gray' },
              { name: 'Published', color: 'green' },
              { name: 'Archived', color: 'brown' }
            ]
          }
        },
        TimeSuggestion: {
          select: {
            options: [
              { name: '5 minutes', color: 'blue' },
              { name: '10 minutes', color: 'green' },
              { name: '15 minutes', color: 'yellow' },
              { name: '30 minutes', color: 'orange' }
            ]
          }
        },
        AssignedToClients: {
          relation: {
            database_id: '{{clients_database_id}}'
          }
        },
        CreatedDate: {
          date: {}
        },
        LastUpdated: {
          last_edited_time: {}
        }
      },
      '📔'
    );
    
    console.log('Journal Prompts database created!');
  } catch (error) {
    console.error('Error creating Journal Prompts database:', error);
    throw error;
  }
}

// Helper function to create Content Inventory database
async function createContentInventoryDatabase(parentPageId: string): Promise<void> {
  try {
    console.log('Creating Content Inventory database...');
    
    await notionService.createDatabase(
      parentPageId,
      notionDatabases.contentInventory,
      {
        Title: {
          title: {}
        },
        ContentType: {
          select: {
            options: [
              { name: 'Affirmation', color: 'yellow' },
              { name: 'Tarot', color: 'purple' },
              { name: 'Journal', color: 'blue' },
              { name: 'Meditation', color: 'green' },
              { name: 'Worksheet', color: 'orange' },
              { name: 'Other', color: 'gray' }
            ]
          }
        },
        Status: {
          select: {
            options: [
              { name: 'Draft', color: 'gray' },
              { name: 'Ready', color: 'yellow' },
              { name: 'Published', color: 'green' },
              { name: 'Archived', color: 'brown' }
            ]
          }
        },
        Tags: {
          multi_select: {
            options: [
              { name: 'self-care', color: 'pink' },
              { name: 'spiritual', color: 'purple' },
              { name: 'mindfulness', color: 'blue' },
              { name: 'growth', color: 'green' },
              { name: 'healing', color: 'red' }
            ]
          }
        },
        TierAccess: {
          select: {
            options: [
              { name: 'Free', color: 'gray' },
              { name: 'Basic', color: 'blue' },
              { name: 'Premium', color: 'green' },
              { name: 'VIP', color: 'purple' }
            ]
          }
        },
        AssignedToClients: {
          relation: {
            database_id: '{{clients_database_id}}'
          }
        },
        ContentURL: {
          url: {}
        },
        DateCreated: {
          date: {}
        },
        LastDelivered: {
          date: {}
        },
        DeliveryCount: {
          number: {}
        }
      }
    );
    
    console.log('Content Inventory database created!');
  } catch (error) {
    console.error('Error creating Content Inventory database:', error);
    throw error;
  }
}

// Helper function to create Fulfillment Tasks database
async function createFulfillmentTasksDatabase(parentPageId: string): Promise<void> {
  try {
    console.log('Creating Fulfillment Tasks database...');
    
    await notionService.createDatabase(
      parentPageId,
      notionDatabases.fulfillmentTasks,
      {
        Task: {
          title: {}
        },
        Client: {
          rich_text: {}
        },
        ContentType: {
          select: {
            options: [
              { name: 'Affirmation', color: 'yellow' },
              { name: 'Tarot', color: 'purple' },
              { name: 'Journal', color: 'blue' },
              { name: 'Meditation', color: 'green' },
              { name: 'Worksheet', color: 'orange' },
              { name: 'Other', color: 'gray' }
            ]
          }
        },
        Status: {
          select: {
            options: [
              { name: 'To Do', color: 'red' },
              { name: 'In Progress', color: 'yellow' },
              { name: 'Done', color: 'green' },
              { name: 'Cancelled', color: 'gray' }
            ]
          }
        },
        Priority: {
          select: {
            options: [
              { name: 'Low', color: 'blue' },
              { name: 'Medium', color: 'yellow' },
              { name: 'High', color: 'red' }
            ]
          }
        },
        DueDate: {
          date: {}
        },
        AssignedTo: {
          people: {}
        },
        Notes: {
          rich_text: {}
        },
        CompletedAt: {
          date: {}
        }
      },
      '📋'
    );
    
    console.log('Fulfillment Tasks database created!');
  } catch (error) {
    console.error('Error creating Fulfillment Tasks database:', error);
    throw error;
  }
}