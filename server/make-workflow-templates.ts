/**
 * Make.com Workflow Templates for Midnight Magnolia
 * 
 * This file contains predefined workflow templates for common content creation and distribution tasks.
 */

// Define workflow template interface
export interface MakeWorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  modules: MakeModule[];
  connections: MakeConnection[];
  metadata?: Record<string, any>;
}

// Define module interface
interface MakeModule {
  id: string;
  name: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  settings?: Record<string, any>;
}

// Define connection interface
interface MakeConnection {
  sourceModuleId: string;
  targetModuleId: string;
  sourceField?: string;
  targetField?: string;
}

/**
 * Monthly Content Batch Production Workflow Template
 * This template automates the creation of multiple content pieces at once for monthly planning
 */
export const monthlyContentBatchTemplate: MakeWorkflowTemplate = {
  id: 'monthly-content-batch',
  name: 'Monthly Content Batch Production',
  description: 'Automates the monthly content batch creation process for Midnight Magnolia Patreon',
  category: 'content-creation',
  modules: [
    {
      id: 'trigger',
      name: 'Schedule',
      type: 'schedule',
      position: { x: 0, y: 0 },
      settings: {
        frequency: 'monthly',
        day: '25', // Run on the 25th of each month to prepare for next month
        time: '09:00:00'
      }
    },
    {
      id: 'notion-get-templates',
      name: 'Get Content Templates',
      type: 'notion',
      position: { x: 300, y: 0 },
      settings: {
        operation: 'queryDatabase',
        databaseId: '{{config.templateDatabaseId}}',
        filter: {
          property: 'Status',
          status: {
            equals: 'Active'
          }
        }
      }
    },
    {
      id: 'claude-generate',
      name: 'Generate Content with Claude',
      type: 'http',
      position: { x: 600, y: 0 },
      settings: {
        url: '{{config.apiBaseUrl}}/api/anthropic/generate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer {{config.apiKey}}'
        },
        body: {
          contentType: '{{1.contentType}}',
          template: '{{1.template}}',
          theme: '{{1.theme}}',
          count: 5
        }
      }
    },
    {
      id: 'notion-create-content',
      name: 'Create Content in Notion',
      type: 'notion',
      position: { x: 900, y: 0 },
      settings: {
        operation: 'createPage',
        parentType: 'database_id',
        parentId: '{{config.contentDatabaseId}}',
        properties: {
          'Title': {
            title: [
              {
                text: {
                  content: '{{1.name}} - {{formatDate(now; "MMMM YYYY")}}'
                }
              }
            ]
          },
          'Content': {
            rich_text: [
              {
                text: {
                  content: '{{2.content}}'
                }
              }
            ]
          },
          'ContentType': {
            select: {
              name: '{{1.contentType}}'
            }
          },
          'Status': {
            select: {
              name: 'Ready for Review'
            }
          },
          'PublishDate': {
            date: {
              start: '{{addDays(now; 7)}}'
            }
          }
        }
      }
    },
    {
      id: 'airtable-add-to-inventory',
      name: 'Add to Airtable Inventory',
      type: 'airtable',
      position: { x: 1200, y: 0 },
      settings: {
        operation: 'createRecord',
        base: '{{config.airtableBaseId}}',
        table: '{{config.airtableContentTable}}',
        fields: {
          'Title': '{{1.name}} - {{formatDate(now; "MMMM YYYY")}}',
          'Type': '{{1.contentType}}',
          'Content': '{{2.content}}',
          'Status': 'Ready for Review',
          'Created Date': '{{formatDate(now; "YYYY-MM-DD")}}',
          'Publish Date': '{{formatDate(addDays(now; 7); "YYYY-MM-DD")}}',
          'Notion ID': '{{3.id}}'
        }
      }
    },
    {
      id: 'notification',
      name: 'Send Notification',
      type: 'email',
      position: { x: 1500, y: 0 },
      settings: {
        to: '{{config.notificationEmail}}',
        subject: 'Monthly Content Batch Created',
        body: 'The monthly content batch for {{formatDate(now; "MMMM YYYY")}} has been created. {{4.result.count}} content pieces are ready for review in Notion.'
      }
    }
  ],
  connections: [
    { sourceModuleId: 'trigger', targetModuleId: 'notion-get-templates' },
    { sourceModuleId: 'notion-get-templates', targetModuleId: 'claude-generate' },
    { sourceModuleId: 'claude-generate', targetModuleId: 'notion-create-content' },
    { sourceModuleId: 'notion-create-content', targetModuleId: 'airtable-add-to-inventory' },
    { sourceModuleId: 'airtable-add-to-inventory', targetModuleId: 'notification' }
  ]
};

/**
 * Patreon Content Publishing Workflow Template
 * This template handles the automatic publishing of content to Patreon based on a schedule
 */
export const patreonPostSchedulerTemplate: MakeWorkflowTemplate = {
  id: 'patreon-post-scheduler',
  name: 'Patreon Content Publishing',
  description: 'Automatically publishes scheduled content to Patreon from Notion',
  category: 'content-delivery',
  modules: [
    {
      id: 'trigger',
      name: 'Schedule',
      type: 'schedule',
      position: { x: 0, y: 0 },
      settings: {
        frequency: 'daily',
        time: '09:00:00'
      }
    },
    {
      id: 'notion-query-content',
      name: 'Get Ready Content',
      type: 'notion',
      position: { x: 300, y: 0 },
      settings: {
        operation: 'queryDatabase',
        databaseId: '{{config.contentDatabaseId}}',
        filter: {
          and: [
            {
              property: 'Status',
              select: {
                equals: 'Approved'
              }
            },
            {
              property: 'PublishDate',
              date: {
                equals: '{{formatDate(now; "YYYY-MM-DD")}}'
              }
            }
          ]
        }
      }
    },
    {
      id: 'filter-content',
      name: 'Has Content to Publish',
      type: 'filter',
      position: { x: 600, y: 0 },
      settings: {
        condition: '{{1.results.length > 0}}'
      }
    },
    {
      id: 'iterator',
      name: 'Process Each Content Item',
      type: 'iterator',
      position: { x: 900, y: 0 },
      settings: {
        collection: '{{1.results}}'
      }
    },
    {
      id: 'prepare-post',
      name: 'Prepare Patreon Post',
      type: 'transformer',
      position: { x: 1200, y: 0 },
      settings: {
        mapping: {
          title: '{{1.properties.Title.title[0].plain_text}}',
          content: '{{1.properties.Content.rich_text[0].plain_text}}',
          tier: '{{1.properties.Tier.select.name}}',
          isPaid: true,
          teaserText: '{{substring(1.properties.Content.rich_text[0].plain_text; 0; 100)}}...'
        }
      }
    },
    {
      id: 'patreon-post',
      name: 'Create Patreon Post',
      type: 'http',
      position: { x: 1500, y: 0 },
      settings: {
        url: '{{config.apiBaseUrl}}/api/patreon/post',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer {{config.apiKey}}'
        },
        body: {
          campaignId: '{{config.patreonCampaignId}}',
          postData: {
            title: '{{4.title}}',
            content: '{{4.content}}',
            isPaid: '{{4.isPaid}}',
            teaserText: '{{4.teaserText}}',
            tierIds: ['{{map(config.tierMap[4.tier])}}']
          }
        }
      }
    },
    {
      id: 'update-notion',
      name: 'Update Notion Status',
      type: 'notion',
      position: { x: 1800, y: 0 },
      settings: {
        operation: 'updatePage',
        pageId: '{{3.id}}',
        properties: {
          'Status': {
            select: {
              name: 'Published'
            }
          },
          'PublishedAt': {
            date: {
              start: '{{formatDate(now; "YYYY-MM-DD")}}'
            }
          },
          'PatreonPostId': {
            rich_text: [
              {
                text: {
                  content: '{{5.id}}'
                }
              }
            ]
          }
        }
      }
    },
    {
      id: 'update-airtable',
      name: 'Update Airtable',
      type: 'airtable',
      position: { x: 2100, y: 0 },
      settings: {
        operation: 'findRecord',
        base: '{{config.airtableBaseId}}',
        table: '{{config.airtableContentTable}}',
        query: {
          'Notion ID': '{{3.id}}'
        }
      }
    },
    {
      id: 'update-airtable-record',
      name: 'Update Airtable Record',
      type: 'airtable',
      position: { x: 2400, y: 0 },
      settings: {
        operation: 'updateRecord',
        base: '{{config.airtableBaseId}}',
        table: '{{config.airtableContentTable}}',
        recordId: '{{7.id}}',
        fields: {
          'Status': 'Published',
          'Published Date': '{{formatDate(now; "YYYY-MM-DD")}}',
          'Patreon Post ID': '{{5.id}}'
        }
      }
    }
  ],
  connections: [
    { sourceModuleId: 'trigger', targetModuleId: 'notion-query-content' },
    { sourceModuleId: 'notion-query-content', targetModuleId: 'filter-content' },
    { sourceModuleId: 'filter-content', targetModuleId: 'iterator' },
    { sourceModuleId: 'iterator', targetModuleId: 'prepare-post' },
    { sourceModuleId: 'prepare-post', targetModuleId: 'patreon-post' },
    { sourceModuleId: 'patreon-post', targetModuleId: 'update-notion' },
    { sourceModuleId: 'update-notion', targetModuleId: 'update-airtable' },
    { sourceModuleId: 'update-airtable', targetModuleId: 'update-airtable-record' }
  ]
};

/**
 * New Patron Welcome Sequence Workflow Template
 * This template handles the onboarding process for new Patreon members
 */
export const patronWelcomeAutomationTemplate: MakeWorkflowTemplate = {
  id: 'patron-welcome-automation',
  name: 'New Patron Welcome Sequence',
  description: 'Automatically process and welcome new Patreon members',
  category: 'patron-management',
  modules: [
    {
      id: 'trigger',
      name: 'Patreon Webhook',
      type: 'webhook',
      position: { x: 0, y: 0 },
      settings: {
        url: '{{config.webhookUrl}}/patreon-webhook'
      }
    },
    {
      id: 'filter-event',
      name: 'Is New Member',
      type: 'filter',
      position: { x: 300, y: 0 },
      settings: {
        condition: '{{1.data.event_type == "members:pledge:create"}}'
      }
    },
    {
      id: 'get-member-details',
      name: 'Get Member Details',
      type: 'http',
      position: { x: 600, y: 0 },
      settings: {
        url: '{{config.patreonApiUrl}}/members/{{1.data.data.id}}?include=user,currently_entitled_tiers',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer {{config.patreonAccessToken}}'
        }
      }
    },
    {
      id: 'create-client',
      name: 'Create Client in Database',
      type: 'http',
      position: { x: 900, y: 0 },
      settings: {
        url: '{{config.apiBaseUrl}}/api/clients',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer {{config.apiKey}}'
        },
        body: {
          fullName: '{{2.data.attributes.full_name}}',
          email: '{{2.data.attributes.email}}',
          phone: '',
          platform: 'Patreon',
          membershipTier: '{{2.included[0].attributes.title}}',
          status: 'active'
        }
      }
    },
    {
      id: 'create-notion-page',
      name: 'Create Notion Client Page',
      type: 'notion',
      position: { x: 1200, y: 0 },
      settings: {
        operation: 'createPage',
        parentType: 'database_id',
        parentId: '{{config.clientsDatabaseId}}',
        properties: {
          'Name': {
            title: [
              {
                text: {
                  content: '{{2.data.attributes.full_name}}'
                }
              }
            ]
          },
          'Email': {
            email: '{{2.data.attributes.email}}'
          },
          'Status': {
            select: {
              name: 'Active'
            }
          },
          'Source': {
            select: {
              name: 'Patreon'
            }
          },
          'Membership Tier': {
            select: {
              name: '{{2.included[0].attributes.title}}'
            }
          },
          'Joined Date': {
            date: {
              start: '{{formatDate(now; "YYYY-MM-DD")}}'
            }
          },
          'Patreon ID': {
            rich_text: [
              {
                text: {
                  content: '{{1.data.data.id}}'
                }
              }
            ]
          }
        }
      }
    },
    {
      id: 'add-to-airtable',
      name: 'Add to Airtable Clients',
      type: 'airtable',
      position: { x: 1500, y: 0 },
      settings: {
        operation: 'createRecord',
        base: '{{config.airtableBaseId}}',
        table: '{{config.airtableClientsTable}}',
        fields: {
          'Name': '{{2.data.attributes.full_name}}',
          'Email': '{{2.data.attributes.email}}',
          'Status': 'Active',
          'Source': 'Patreon',
          'Membership Tier': '{{2.included[0].attributes.title}}',
          'Joined Date': '{{formatDate(now; "YYYY-MM-DD")}}',
          'Patreon ID': '{{1.data.data.id}}',
          'Database ID': '{{3.id}}',
          'Notion ID': '{{4.id}}'
        }
      }
    },
    {
      id: 'add-to-hubspot',
      name: 'Add to HubSpot CRM',
      type: 'http',
      position: { x: 1800, y: 0 },
      settings: {
        url: '{{config.apiBaseUrl}}/api/integrations/hubspot/contacts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer {{config.apiKey}}'
        },
        body: {
          email: '{{2.data.attributes.email}}',
          firstname: '{{split(2.data.attributes.full_name; " ")[0]}}',
          lastname: '{{split(2.data.attributes.full_name; " ")[1]}}',
          membership_tier: '{{2.included[0].attributes.title}}',
          source: 'Patreon',
          lifecycle_stage: 'customer'
        }
      }
    },
    {
      id: 'send-welcome-email',
      name: 'Send Welcome Email',
      type: 'email',
      position: { x: 2100, y: 0 },
      settings: {
        to: '{{2.data.attributes.email}}',
        subject: 'Welcome to Midnight Magnolia!',
        body: 'Dear {{split(2.data.attributes.full_name; " ")[0]}},\n\nWelcome to the Midnight Magnolia community! We\'re thrilled to have you join us as a {{2.included[0].attributes.title}} member.\n\nOver the next few days, you\'ll receive access to all your membership benefits. In the meantime, you can explore your member portal at {{config.patreonUrl}}.\n\nMagical regards,\nThe Midnight Magnolia Team'
      }
    }
  ],
  connections: [
    { sourceModuleId: 'trigger', targetModuleId: 'filter-event' },
    { sourceModuleId: 'filter-event', targetModuleId: 'get-member-details' },
    { sourceModuleId: 'get-member-details', targetModuleId: 'create-client' },
    { sourceModuleId: 'create-client', targetModuleId: 'create-notion-page' },
    { sourceModuleId: 'create-notion-page', targetModuleId: 'add-to-airtable' },
    { sourceModuleId: 'add-to-airtable', targetModuleId: 'add-to-hubspot' },
    { sourceModuleId: 'add-to-hubspot', targetModuleId: 'send-welcome-email' }
  ]
};

/**
 * Notion to Airtable Content Sync Workflow Template
 * This template keeps the Notion database in sync with Airtable
 */
export const notionAirtableSyncTemplate: MakeWorkflowTemplate = {
  id: 'notion-airtable-sync',
  name: 'Notion to Airtable Content Sync',
  description: 'Synchronizes content database between Notion and Airtable',
  category: 'integration',
  modules: [
    {
      id: 'trigger',
      name: 'Schedule',
      type: 'schedule',
      position: { x: 0, y: 0 },
      settings: {
        frequency: 'hourly'
      }
    },
    {
      id: 'notion-get-updated',
      name: 'Get Recently Updated Content',
      type: 'notion',
      position: { x: 300, y: 0 },
      settings: {
        operation: 'queryDatabase',
        databaseId: '{{config.contentDatabaseId}}',
        filter: {
          property: 'LastEditedTime',
          timestamp: 'last_edited_time',
          date: {
            after: '{{formatDate(subtractHours(now; 1); "YYYY-MM-DDTHH:mm:ss")}}'
          }
        }
      }
    },
    {
      id: 'filter-results',
      name: 'Has Updated Content',
      type: 'filter',
      position: { x: 600, y: 0 },
      settings: {
        condition: '{{1.results.length > 0}}'
      }
    },
    {
      id: 'iterator',
      name: 'Process Each Item',
      type: 'iterator',
      position: { x: 900, y: 0 },
      settings: {
        collection: '{{1.results}}'
      }
    },
    {
      id: 'airtable-find',
      name: 'Find Airtable Record',
      type: 'airtable',
      position: { x: 1200, y: 0 },
      settings: {
        operation: 'findRecord',
        base: '{{config.airtableBaseId}}',
        table: '{{config.airtableContentTable}}',
        query: {
          'Notion ID': '{{3.id}}'
        }
      }
    },
    {
      id: 'create-or-update',
      name: 'Create or Update Record',
      type: 'router',
      position: { x: 1500, y: 0 },
      settings: {
        routes: [
          {
            label: 'Record Exists',
            condition: '{{!!4.id}}'
          },
          {
            label: 'Record Not Found',
            condition: '{{!4.id}}'
          }
        ]
      }
    },
    {
      id: 'update-record',
      name: 'Update Airtable Record',
      type: 'airtable',
      position: { x: 1800, y: 0 },
      settings: {
        operation: 'updateRecord',
        base: '{{config.airtableBaseId}}',
        table: '{{config.airtableContentTable}}',
        recordId: '{{4.id}}',
        fields: {
          'Title': '{{3.properties.Title.title[0].plain_text}}',
          'Type': '{{3.properties.ContentType.select.name}}',
          'Content': '{{3.properties.Content.rich_text[0].plain_text}}',
          'Status': '{{3.properties.Status.select.name}}',
          'Last Modified': '{{formatDate(now; "YYYY-MM-DD")}}'
        }
      }
    },
    {
      id: 'create-record',
      name: 'Create Airtable Record',
      type: 'airtable',
      position: { x: 1800, y: 300 },
      settings: {
        operation: 'createRecord',
        base: '{{config.airtableBaseId}}',
        table: '{{config.airtableContentTable}}',
        fields: {
          'Title': '{{3.properties.Title.title[0].plain_text}}',
          'Type': '{{3.properties.ContentType.select.name}}',
          'Content': '{{3.properties.Content.rich_text[0].plain_text}}',
          'Status': '{{3.properties.Status.select.name}}',
          'Created Date': '{{formatDate(now; "YYYY-MM-DD")}}',
          'Last Modified': '{{formatDate(now; "YYYY-MM-DD")}}',
          'Notion ID': '{{3.id}}'
        }
      }
    },
    {
      id: 'log-update',
      name: 'Log Sync Activity',
      type: 'logger',
      position: { x: 2100, y: 0 },
      settings: {
        message: 'Synced Notion content "{{3.properties.Title.title[0].plain_text}}" to Airtable'
      }
    }
  ],
  connections: [
    { sourceModuleId: 'trigger', targetModuleId: 'notion-get-updated' },
    { sourceModuleId: 'notion-get-updated', targetModuleId: 'filter-results' },
    { sourceModuleId: 'filter-results', targetModuleId: 'iterator' },
    { sourceModuleId: 'iterator', targetModuleId: 'airtable-find' },
    { sourceModuleId: 'airtable-find', targetModuleId: 'create-or-update' },
    { sourceModuleId: 'create-or-update', targetModuleId: 'update-record', sourceField: 'Record Exists' },
    { sourceModuleId: 'create-or-update', targetModuleId: 'create-record', sourceField: 'Record Not Found' },
    { sourceModuleId: 'update-record', targetModuleId: 'log-update' },
    { sourceModuleId: 'create-record', targetModuleId: 'log-update' }
  ]
};

/**
 * Weekly Analytics Report Workflow Template
 * This template generates and delivers a weekly report of Patreon and content analytics
 */
export const weeklyAnalyticsReportTemplate: MakeWorkflowTemplate = {
  id: 'weekly-analytics-report',
  name: 'Weekly Analytics Report',
  description: 'Generates and delivers a weekly report of Patreon and content analytics',
  category: 'analytics',
  modules: [
    {
      id: 'trigger',
      name: 'Schedule',
      type: 'schedule',
      position: { x: 0, y: 0 },
      settings: {
        frequency: 'weekly',
        day: 'Monday',
        time: '06:00:00'
      }
    },
    {
      id: 'get-patreon-members',
      name: 'Get Patreon Members',
      type: 'http',
      position: { x: 300, y: 0 },
      settings: {
        url: '{{config.apiBaseUrl}}/api/integrations/patreon/members',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer {{config.apiKey}}'
        }
      }
    },
    {
      id: 'get-content-stats',
      name: 'Get Content Stats',
      type: 'http',
      position: { x: 300, y: 300 },
      settings: {
        url: '{{config.apiBaseUrl}}/api/analytics/content',
        method: 'GET',
        parameters: {
          startDate: '{{formatDate(subtractDays(now; 7); "YYYY-MM-DD")}}',
          endDate: '{{formatDate(now; "YYYY-MM-DD")}}'
        },
        headers: {
          'Authorization': 'Bearer {{config.apiKey}}'
        }
      }
    },
    {
      id: 'get-revenue',
      name: 'Get Revenue Data',
      type: 'http',
      position: { x: 600, y: 0 },
      settings: {
        url: '{{config.apiBaseUrl}}/api/analytics/revenue',
        method: 'GET',
        parameters: {
          startDate: '{{formatDate(subtractDays(now; 7); "YYYY-MM-DD")}}',
          endDate: '{{formatDate(now; "YYYY-MM-DD")}}'
        },
        headers: {
          'Authorization': 'Bearer {{config.apiKey}}'
        }
      }
    },
    {
      id: 'aggregate-data',
      name: 'Aggregate Report Data',
      type: 'transformer',
      position: { x: 900, y: 0 },
      settings: {
        mapping: {
          patronCount: '{{1.data.length}}',
          newPatrons: '{{filter(1.data; function(item) { return parseDate(item.attributes.patron_since) > subtractDays(now; 7); }).length}}',
          contentCount: '{{2.data.length}}',
          publishedContent: '{{filter(2.data; function(item) { return item.status === "Published"; }).length}}',
          topContentType: '{{2.topContentType}}',
          totalRevenue: '{{3.total}}',
          revenueGrowth: '{{(3.total - 3.previousTotal) / 3.previousTotal * 100}}%',
          reportDate: '{{formatDate(now; "MMMM D, YYYY")}}',
          dateRange: '{{formatDate(subtractDays(now; 7); "MMMM D")}} - {{formatDate(now; "MMMM D, YYYY")}}'
        }
      }
    },
    {
      id: 'create-notion-report',
      name: 'Create Notion Report',
      type: 'notion',
      position: { x: 1200, y: 0 },
      settings: {
        operation: 'createPage',
        parentType: 'database_id',
        parentId: '{{config.reportsDatabaseId}}',
        properties: {
          'Title': {
            title: [
              {
                text: {
                  content: 'Weekly Analytics Report - {{4.dateRange}}'
                }
              }
            ]
          },
          'Date': {
            date: {
              start: '{{formatDate(now; "YYYY-MM-DD")}}'
            }
          },
          'Type': {
            select: {
              name: 'Weekly Report'
            }
          }
        },
        children: [
          {
            object: 'block',
            type: 'heading_1',
            heading_1: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Midnight Magnolia Weekly Analytics Report'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Report Period: {{4.dateRange}}'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Patron Statistics'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Total Patrons: {{4.patronCount}}'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'New Patrons This Week: {{4.newPatrons}}'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Content Statistics'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Total Content Created: {{4.contentCount}}'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Content Published: {{4.publishedContent}}'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Top Content Type: {{4.topContentType}}'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Revenue Statistics'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Total Revenue: ${{4.totalRevenue}}'
                  }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Revenue Growth: {{4.revenueGrowth}}'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      id: 'send-email-report',
      name: 'Send Email Report',
      type: 'email',
      position: { x: 1500, y: 0 },
      settings: {
        to: '{{config.reportEmail}}',
        subject: 'Midnight Magnolia Weekly Analytics Report - {{4.dateRange}}',
        body: 'Weekly Analytics Report\n\nReport Period: {{4.dateRange}}\n\nPatron Statistics:\n- Total Patrons: {{4.patronCount}}\n- New Patrons This Week: {{4.newPatrons}}\n\nContent Statistics:\n- Total Content Created: {{4.contentCount}}\n- Content Published: {{4.publishedContent}}\n- Top Content Type: {{4.topContentType}}\n\nRevenue Statistics:\n- Total Revenue: ${{4.totalRevenue}}\n- Revenue Growth: {{4.revenueGrowth}}\n\nView the full report in Notion: {{5.url}}'
      }
    }
  ],
  connections: [
    { sourceModuleId: 'trigger', targetModuleId: 'get-patreon-members' },
    { sourceModuleId: 'trigger', targetModuleId: 'get-content-stats' },
    { sourceModuleId: 'get-patreon-members', targetModuleId: 'get-revenue' },
    { sourceModuleId: 'get-content-stats', targetModuleId: 'aggregate-data' },
    { sourceModuleId: 'get-revenue', targetModuleId: 'aggregate-data' },
    { sourceModuleId: 'aggregate-data', targetModuleId: 'create-notion-report' },
    { sourceModuleId: 'create-notion-report', targetModuleId: 'send-email-report' }
  ]
};

// Export all workflow templates in a collection
export const workflowTemplates: MakeWorkflowTemplate[] = [
  monthlyContentBatchTemplate,
  patreonPostSchedulerTemplate,
  patronWelcomeAutomationTemplate,
  notionAirtableSyncTemplate,
  weeklyAnalyticsReportTemplate
];

// Add a new custom workflow template
export function createCustomTemplate(
  id: string,
  name: string,
  description: string,
  category: string,
  modules: MakeModule[],
  connections: MakeConnection[],
  metadata?: Record<string, any>
): MakeWorkflowTemplate {
  return {
    id,
    name,
    description,
    category,
    modules,
    connections,
    metadata
  };
}

// Get a workflow template by ID
export function getWorkflowTemplate(templateId: string): MakeWorkflowTemplate | undefined {
  return workflowTemplates.find(template => template.id === templateId);
}