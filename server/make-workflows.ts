import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { workflowTemplates } from './make-workflow-templates';

const MAKE_API_BASE_URL = 'https://eu1.make.com/api/v2';
const MAKE_API_KEY = process.env.MAKE_API_KEY;

interface MakeWorkflow {
  id: string;
  name: string;
  description: string;
  active: boolean;
  teamId: string;
  folderId: string;
  lastEdit: string;
  blueprint?: Record<string, any>;
}

interface MakeScenario {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'draft';
  frequency?: string;
  lastRun?: string;
  nextRun?: string;
  totalRuns?: number;
  blueprint?: Record<string, any>;
}

/**
 * Midnight Magnolia Make.com API Service
 * For managing workflow automation between Notion, Airtable, and other services
 */
export class MakeService {
  /**
   * Get all Make.com workflows (scenarios)
   */
  async getWorkflows(): Promise<MakeScenario[]> {
    try {
      const response = await fetch(`${MAKE_API_BASE_URL}/scenarios`, {
        headers: {
          'Authorization': `Token ${MAKE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get Make.com scenarios: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.scenarios || [];
    } catch (error) {
      console.error('Error getting Make.com workflows:', error);
      throw error;
    }
  }

  /**
   * Get detailed information about a specific Make.com workflow
   */
  async getWorkflowDetails(workflowId: string): Promise<MakeScenario> {
    try {
      const response = await fetch(`${MAKE_API_BASE_URL}/scenarios/${workflowId}`, {
        headers: {
          'Authorization': `Token ${MAKE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get workflow details: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error getting workflow details for ${workflowId}:`, error);
      throw error;
    }
  }

  /**
   * Activate a Make.com workflow
   */
  async activateWorkflow(workflowId: string): Promise<{ success: boolean, message: string }> {
    try {
      const response = await fetch(`${MAKE_API_BASE_URL}/scenarios/${workflowId}/activate`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${MAKE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to activate workflow: ${response.statusText}`);
      }
      
      return { success: true, message: 'Workflow activated successfully' };
    } catch (error) {
      console.error(`Error activating workflow ${workflowId}:`, error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Deactivate a Make.com workflow
   */
  async deactivateWorkflow(workflowId: string): Promise<{ success: boolean, message: string }> {
    try {
      const response = await fetch(`${MAKE_API_BASE_URL}/scenarios/${workflowId}/deactivate`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${MAKE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to deactivate workflow: ${response.statusText}`);
      }
      
      return { success: true, message: 'Workflow deactivated successfully' };
    } catch (error) {
      console.error(`Error deactivating workflow ${workflowId}:`, error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Get execution history for a specific workflow
   */
  async getWorkflowExecutions(workflowId: string, limit: number = 10): Promise<any[]> {
    try {
      const response = await fetch(`${MAKE_API_BASE_URL}/scenarios/${workflowId}/executions?limit=${limit}`, {
        headers: {
          'Authorization': `Token ${MAKE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get workflow executions: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.executions || [];
    } catch (error) {
      console.error(`Error getting executions for workflow ${workflowId}:`, error);
      throw error;
    }
  }

  /**
   * Deploy a predefined Midnight Magnolia workflow blueprint
   */
  async deployWorkflowFromBlueprint(blueprintName: string): Promise<{ success: boolean, workflowId?: string, message: string }> {
    try {
      // Get the blueprint configuration
      const blueprint = this.getMidnightMagnoliaBlueprint(blueprintName);
      
      if (!blueprint) {
        return { success: false, message: `Blueprint "${blueprintName}" not found` };
      }
      
      // Create the scenario from blueprint
      const response = await fetch(`${MAKE_API_BASE_URL}/scenarios`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${MAKE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blueprint)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to deploy workflow: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { 
        success: true, 
        workflowId: data.id, 
        message: `Workflow "${blueprintName}" deployed successfully` 
      };
    } catch (error) {
      console.error(`Error deploying workflow blueprint ${blueprintName}:`, error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Test a webhook connection by sending a sample payload
   */
  async testWebhook(webhookUrl: string, payload: any): Promise<{ success: boolean, message: string }> {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to test webhook: ${response.status} ${response.statusText}`);
      }
      
      return { success: true, message: 'Webhook test successful' };
    } catch (error) {
      console.error(`Error testing webhook ${webhookUrl}:`, error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Get predefined Midnight Magnolia workflow blueprints
   */
  getMidnightMagnoliaBlueprint(blueprintId: string): Record<string, any> | null {
    // Find the template with matching ID from our workflow templates
    const template = workflowTemplates.find(template => template.id === blueprintId);
    
    if (!template) {
      return null;
    }
    
    // Convert our template format to Make.com API format
    const blueprint = {
      name: template.name,
      description: template.description,
      scenario: {
        modules: template.modules,
        connections: template.connections,
        metadata: template.metadata || {}
      }
    };
    
    return blueprint;
  }
  
  /* Original blueprint definitions kept for reference - now using templates from make-workflow-templates.ts
  getMidnightMagnoliaOldBlueprint(blueprintName: string): Record<string, any> | null {
    const blueprints: Record<string, any> = {
      // Content batch production workflow - Automates monthly content scheduling in Notion
      'monthly-content-batch': {
        name: 'Monthly Content Batch Production',
        description: 'Automates the monthly content batch creation process for Midnight Magnolia Patreon',
        scenario: {
          modules: [
            // Trigger: Monthly on the last week of the month
            {
              type: 'schedule',
              parameters: {
                frequency: 'monthly',
                day: 'last monday'
              }
            },
            // Create monthly theme planning document in Notion
            {
              type: 'notion',
              action: 'createPage',
              parameters: {
                databaseId: '{{env.NOTION_CONTENT_DATABASE_ID}}',
                properties: {
                  Name: {
                    title: [
                      {
                        text: {
                          content: "{{formatDate(now; 'MMMM YYYY')}} Content Planning"
                        }
                      }
                    ]
                  },
                  Type: { select: { name: "Monthly Planning" } },
                  Status: { select: { name: "In Progress" } }
                }
              }
            },
            // Schedule 4 batch sessions in Google Calendar
            {
              type: 'googlecalendar',
              action: 'createEvent',
              parameters: {
                calendarId: '{{env.GOOGLE_CALENDAR_ID}}',
                summary: 'Batch Session 1: Visual Content',
                description: 'Create affirmation cards, wallpapers, and tarot card imagery',
                start: { 
                  dateTime: '{{addDays(startOfNextMonth(); 5)}}T10:00:00',
                  timeZone: 'America/New_York'
                },
                end: {
                  dateTime: '{{addDays(startOfNextMonth(); 5)}}T13:00:00',
                  timeZone: 'America/New_York'
                }
              }
            },
            // Create Airtable record tracking progress
            {
              type: 'airtable',
              action: 'createRecord',
              parameters: {
                baseId: '{{env.AIRTABLE_BASE_ID}}',
                tableId: '{{env.AIRTABLE_CONTENT_TRACKING_TABLE}}',
                fields: {
                  'Month': '{{formatDate(now; "MMMM YYYY")}}',
                  'Planning Complete': false,
                  'Visual Content Complete': false,
                  'Written Content Complete': false,
                  'Audio Content Complete': false,
                  'Personalized Content Complete': false
                }
              }
            }
          ]
        }
      },
      
      // Patreon post scheduler - Auto-publishes content on schedule
      'patreon-post-scheduler': {
        name: 'Patreon Content Publishing',
        description: 'Automatically publishes scheduled content to Patreon from Notion',
        scenario: {
          modules: [
            // Trigger: Check Notion for content ready to publish
            {
              type: 'notion',
              action: 'queryDatabase',
              parameters: {
                databaseId: '{{env.NOTION_CONTENT_DATABASE_ID}}',
                filter: {
                  and: [
                    {
                      property: 'Status',
                      select: { equals: 'Ready to Publish' }
                    },
                    {
                      property: 'Publish Date',
                      date: { on_or_before: '{{formatDate(now; "YYYY-MM-DD")}}' }
                    }
                  ]
                }
              }
            },
            // For each content item ready to publish
            {
              type: 'iterator',
              parameters: {
                collection: '{{1.results}}',
                item: 'content'
              },
              modules: [
                // Post to Patreon
                {
                  type: 'httpRequest',
                  action: 'post',
                  parameters: {
                    url: 'https://www.patreon.com/api/posts',
                    headers: {
                      'Authorization': 'Bearer {{env.PATREON_ACCESS_TOKEN}}',
                      'Content-Type': 'application/json'
                    },
                    body: {
                      data: {
                        type: 'post',
                        attributes: {
                          title: '{{content.properties.Name.title[0].text.content}}',
                          content: '{{content.properties.Content.rich_text[0].text.content}}',
                          'is_paid': true,
                          'tiers': '{{content.properties.Access Level.multi_select}}'
                        },
                        relationships: {
                          campaign: {
                            data: {
                              type: 'campaign',
                              id: '{{env.PATREON_CAMPAIGN_ID}}'
                            }
                          }
                        }
                      }
                    }
                  }
                },
                // Update Notion status to Published
                {
                  type: 'notion',
                  action: 'updatePage',
                  parameters: {
                    pageId: '{{content.id}}',
                    properties: {
                      Status: { select: { name: 'Published' } },
                      'Publish Timestamp': { date: { start: '{{formatDate(now; "YYYY-MM-DDTHH:mm:ss")}}' } }
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      
      // Patron welcome automation - processes new patrons
      'patron-welcome-automation': {
        name: 'New Patron Welcome Sequence',
        description: 'Automatically process and welcome new Patreon members',
        scenario: {
          modules: [
            // Trigger: Patreon webhook for new pledge events
            {
              type: 'webhookTrigger',
              parameters: {
                event: 'pledge:create'
              }
            },
            // Record new patron in Airtable
            {
              type: 'airtable',
              action: 'createRecord',
              parameters: {
                baseId: '{{env.AIRTABLE_BASE_ID}}',
                tableId: '{{env.AIRTABLE_PATRONS_TABLE}}',
                fields: {
                  'Name': '{{webhook.data.attributes.full_name}}',
                  'Email': '{{webhook.data.attributes.email}}',
                  'Tier': '{{webhook.data.relationships.currently_entitled_tiers.data[0].id}}',
                  'Join Date': '{{formatDate(now; "YYYY-MM-DD")}}',
                  'Status': 'Active'
                }
              }
            },
            // Add patron to HubSpot CRM
            {
              type: 'hubspot',
              action: 'createOrUpdateContact',
              parameters: {
                properties: {
                  email: '{{webhook.data.attributes.email}}',
                  firstname: '{{webhook.data.attributes.first_name}}',
                  lastname: '{{webhook.data.attributes.last_name}}',
                  patreon_tier: '{{webhook.data.relationships.currently_entitled_tiers.data[0].attributes.title}}',
                  patreon_join_date: '{{formatDate(now; "YYYY-MM-DD")}}',
                  lifecyclestage: 'customer'
                }
              }
            },
            // Send welcome email
            {
              type: 'email',
              action: 'send',
              parameters: {
                to: '{{webhook.data.attributes.email}}',
                subject: 'Welcome to Midnight Magnolia!',
                body: {
                  html: '{{loadTemplateFile("welcome-email-template.html")}}'
                },
                substitutions: {
                  '%FIRST_NAME%': '{{webhook.data.attributes.first_name}}',
                  '%TIER_NAME%': '{{webhook.data.relationships.currently_entitled_tiers.data[0].attributes.title}}',
                  '%ACCESS_LINK%': 'https://www.patreon.com/posts/welcome-members-12345'
                }
              }
            }
          ]
        }
      },
      
      // Notion to Airtable sync - keeps content in sync
      'notion-airtable-sync': {
        name: 'Notion to Airtable Content Sync',
        description: 'Synchronizes content database between Notion and Airtable',
        scenario: {
          modules: [
            // Trigger: Daily sync at midnight
            {
              type: 'schedule',
              parameters: {
                frequency: 'daily',
                time: '00:00'
              }
            },
            // Get all content from Notion
            {
              type: 'notion',
              action: 'queryDatabase',
              parameters: {
                databaseId: '{{env.NOTION_CONTENT_DATABASE_ID}}',
                sorts: [
                  {
                    property: 'Last edited time',
                    direction: 'descending'
                  }
                ]
              }
            },
            // Retrieve current Airtable records for comparison
            {
              type: 'airtable',
              action: 'listRecords',
              parameters: {
                baseId: '{{env.AIRTABLE_BASE_ID}}',
                tableId: '{{env.AIRTABLE_CONTENT_TABLE}}'
              }
            },
            // Process each Notion item
            {
              type: 'iterator',
              parameters: {
                collection: '{{1.results}}',
                item: 'notionItem'
              },
              modules: [
                // Check if item exists in Airtable
                {
                  type: 'filter',
                  parameters: {
                    condition: '{{some(2.records; "record"; record.fields["Notion ID"] == notionItem.id)}}'
                  },
                  ifTrue: [
                    // Update existing record
                    {
                      type: 'airtable',
                      action: 'updateRecord',
                      parameters: {
                        baseId: '{{env.AIRTABLE_BASE_ID}}',
                        tableId: '{{env.AIRTABLE_CONTENT_TABLE}}',
                        recordId: '{{find(2.records; "record"; record.fields["Notion ID"] == notionItem.id).id}}',
                        fields: {
                          'Title': '{{notionItem.properties.Name.title[0].text.content}}',
                          'Status': '{{notionItem.properties.Status.select.name}}',
                          'Type': '{{notionItem.properties.Type.select.name}}',
                          'Last Updated': '{{formatDate(now; "YYYY-MM-DD")}}'
                        }
                      }
                    }
                  ],
                  ifFalse: [
                    // Create new record
                    {
                      type: 'airtable',
                      action: 'createRecord',
                      parameters: {
                        baseId: '{{env.AIRTABLE_BASE_ID}}',
                        tableId: '{{env.AIRTABLE_CONTENT_TABLE}}',
                        fields: {
                          'Notion ID': '{{notionItem.id}}',
                          'Title': '{{notionItem.properties.Name.title[0].text.content}}',
                          'Status': '{{notionItem.properties.Status.select.name}}',
                          'Type': '{{notionItem.properties.Type.select.name}}',
                          'Created Date': '{{formatDate(now; "YYYY-MM-DD")}}',
                          'Last Updated': '{{formatDate(now; "YYYY-MM-DD")}}'
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      
      // Analytics reporting workflow - weekly stats
      'weekly-analytics-report': {
        name: 'Weekly Analytics Report',
        description: 'Generates and delivers a weekly report of Patreon and content analytics',
        scenario: {
          modules: [
            // Trigger: Weekly on Mondays
            {
              type: 'schedule',
              parameters: {
                frequency: 'weekly',
                day: 'monday',
                time: '08:00'
              }
            },
            // Get Patreon analytics data
            {
              type: 'httpRequest',
              action: 'get',
              parameters: {
                url: 'https://www.patreon.com/api/campaigns/{{env.PATREON_CAMPAIGN_ID}}/pledges',
                headers: {
                  'Authorization': 'Bearer {{env.PATREON_ACCESS_TOKEN}}'
                }
              }
            },
            // Process analytics data
            {
              type: 'code',
              action: 'execute',
              parameters: {
                language: 'javascript',
                code: `
                  // Process Patreon data
                  const patrons = $1.data;
                  const activePatrons = patrons.filter(p => p.attributes.status === 'active');
                  
                  // Calculate tier distribution
                  const tierDistribution = {};
                  for (const patron of activePatrons) {
                    const tierId = patron.relationships.currently_entitled_tiers.data[0]?.id;
                    if (tierId) {
                      tierDistribution[tierId] = (tierDistribution[tierId] || 0) + 1;
                    }
                  }
                  
                  // Calculate revenue
                  const totalRevenue = activePatrons.reduce((sum, p) => sum + p.attributes.pledge_amount_cents, 0) / 100;
                  
                  return {
                    totalPatrons: activePatrons.length,
                    newPatronsLastWeek: activePatrons.filter(p => {
                      const pledgeDate = new Date(p.attributes.pledge_date);
                      const oneWeekAgo = new Date();
                      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                      return pledgeDate >= oneWeekAgo;
                    }).length,
                    tierDistribution,
                    totalRevenue,
                    reportDate: new Date().toISOString().split('T')[0]
                  };
                `
              }
            },
            // Create report in Notion
            {
              type: 'notion',
              action: 'createPage',
              parameters: {
                databaseId: '{{env.NOTION_REPORTS_DATABASE_ID}}',
                properties: {
                  Name: {
                    title: [
                      {
                        text: {
                          content: "Weekly Analytics Report - {{formatDate(now; 'MMMM D, YYYY')}}"
                        }
                      }
                    ]
                  },
                  Type: { select: { name: "Analytics" } },
                  Date: { date: { start: '{{formatDate(now; "YYYY-MM-DD")}}' } }
                },
                children: [
                  {
                    object: 'block',
                    type: 'heading_1',
                    heading_1: {
                      rich_text: [{ type: 'text', text: { content: 'Patreon Analytics' } }]
                    }
                  },
                  {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                      rich_text: [{ 
                        type: 'text', 
                        text: { 
                          content: `Total Active Patrons: {{3.totalPatrons}}\nNew Patrons This Week: {{3.newPatronsLastWeek}}\nTotal Monthly Revenue: ${{3.totalRevenue}}` 
                        } 
                      }]
                    }
                  }
                ]
              }
            },
            // Send email notification
            {
              type: 'email',
              action: 'send',
              parameters: {
                to: '{{env.ADMIN_EMAIL}}',
                subject: 'Weekly Patreon Analytics Report - {{formatDate(now; "MMMM D, YYYY")}}',
                body: {
                  html: `
                    <h1>Patreon Weekly Analytics</h1>
                    <p>Period: {{formatDate(addDays(now, -7), "MMM D")}} - {{formatDate(now, "MMM D, YYYY")}}</p>
                    <h2>Key Metrics</h2>
                    <ul>
                      <li>Total Active Patrons: {{3.totalPatrons}}</li>
                      <li>New Patrons This Week: {{3.newPatronsLastWeek}}</li>
                      <li>Total Monthly Revenue: ${{3.totalRevenue}}</li>
                    </ul>
                    <p><a href="{{4.url}}">View Full Report in Notion</a></p>
                  `
                }
              }
            }
          ]
        }
      }
    };
    
    return blueprints[blueprintName] || null;
  }
}

export const makeService = new MakeService();

// API routes

/**
 * Get all Make.com workflows
 */
export async function getWorkflows(req: Request, res: Response) {
  try {
    const workflows = await makeService.getWorkflows();
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get details for a specific workflow
 */
export async function getWorkflowDetails(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const workflow = await makeService.getWorkflowDetails(id);
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Activate a workflow
 */
export async function activateWorkflow(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await makeService.activateWorkflow(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Deactivate a workflow
 */
export async function deactivateWorkflow(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await makeService.deactivateWorkflow(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get execution history for a workflow
 */
export async function getWorkflowExecutions(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { limit } = req.query;
    const executions = await makeService.getWorkflowExecutions(id, Number(limit) || 10);
    res.json(executions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Deploy a workflow from a blueprint
 */
export async function deployWorkflowFromBlueprint(req: Request, res: Response) {
  try {
    const { blueprintName } = req.body;
    const result = await makeService.deployWorkflowFromBlueprint(blueprintName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Test a Make.com webhook
 */
export async function testWebhook(req: Request, res: Response) {
  try {
    const { webhookUrl, payload } = req.body;
    const result = await makeService.testWebhook(webhookUrl, payload);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get available workflow blueprints
 */
export function getAvailableBlueprints(req: Request, res: Response) {
  try {
    // Map the workflow templates to simplified blueprint objects to send to the client
    const blueprints = workflowTemplates.map(template => ({
      id: template.id,
      name: template.name,
      description: template.description,
      category: template.category
    }));
    
    res.json(blueprints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}