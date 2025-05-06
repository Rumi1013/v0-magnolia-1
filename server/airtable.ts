import Airtable from 'airtable';

// Configure Airtable
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY
});

// Error class for Airtable API errors
export class AirtableApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 500, code = 'airtable_error') {
    super(message);
    this.name = 'AirtableApiError';
    this.status = status;
    this.code = code;
  }
}

export class AirtableService {
  /**
   * Get list of all bases available to the user
   */
  async listBases(): Promise<any[]> {
    try {
      // Note: Airtable API doesn't provide a direct way to list bases
      // Instead, we'll return a predefined list that the user can extend
      return [
        {
          id: 'appTarotCards',
          name: 'Tarot Card Collection',
          description: 'Database of tarot cards with meanings, elements, and associations'
        },
        {
          id: 'appAffirmations',
          name: 'Affirmation Library',
          description: 'Collection of affirmations organized by theme, mood, and intention'
        },
        {
          id: 'appAstrology',
          name: 'Astrology Reference',
          description: 'Zodiac signs, planets, houses, and aspects with descriptions'
        },
        {
          id: 'appPrintables',
          name: 'Printable Templates',
          description: 'Layouts for worksheets, journaling pages, and planners'
        }
      ];
    } catch (error: any) {
      throw new AirtableApiError(
        `Failed to fetch bases: ${error.message}`,
        error.statusCode || 500
      );
    }
  }

  /**
   * Get a specific base by ID
   */
  async getBase(baseId: string): Promise<any> {
    try {
      const base = Airtable.base(baseId);
      // We don't return the base directly but information about it
      return {
        id: baseId,
        name: this.getBaseNameFromId(baseId),
        tables: await this.getTables(baseId)
      };
    } catch (error: any) {
      throw new AirtableApiError(
        `Failed to fetch base with ID ${baseId}: ${error.message}`,
        error.statusCode || 500
      );
    }
  }

  /**
   * Get all tables in a base
   */
  async getTables(baseId: string): Promise<any[]> {
    try {
      console.log(`Getting tables for base ${baseId}`);
      const base = Airtable.base(baseId);
      
      // This is a workaround since Airtable JS client doesn't have a direct method to list tables
      // Get the tables based on the baseId
      let tables: any[] = [];
      
      switch (baseId) {
        case 'appTarotCards':
          tables = [
            { id: 'tblMajorArcana', name: 'Major Arcana' },
            { id: 'tblMinorArcana', name: 'Minor Arcana' },
            { id: 'tblMoonAssociations', name: 'Moon Phase Associations' }
          ];
          break;
        case 'appAffirmations':
          tables = [
            { id: 'tblDailyAffirmations', name: 'Daily Affirmations' },
            { id: 'tblMoonPhaseAffirmations', name: 'Moon Phase Affirmations' },
            { id: 'tblChakraAffirmations', name: 'Chakra Affirmations' }
          ];
          break;
        case 'appAstrology':
          tables = [
            { id: 'tblZodiacSigns', name: 'Zodiac Signs' },
            { id: 'tblPlanets', name: 'Planets' },
            { id: 'tblHouses', name: 'Houses' }
          ];
          break;
        case 'appPrintables':
          tables = [
            { id: 'tblWorksheets', name: 'Worksheets' },
            { id: 'tblJournalPages', name: 'Journal Pages' },
            { id: 'tblPlanners', name: 'Planners' }
          ];
          break;
        default:
          // Default tables for any unrecognized base
          tables = [
            { id: 'tblDefault', name: 'Default Table' }
          ];
          break;
      }
      
      console.log(`Returning ${tables.length} tables for base ${baseId}`);
      return tables;
    } catch (error: any) {
      console.error(`Error getting tables for base ${baseId}:`, error);
      // Return empty array instead of throwing an error for better UI resilience
      return [];
    }
  }

  /**
   * Get records from a specific table
   */
  async getRecords(baseId: string, tableId: string, options: any = {}): Promise<any[]> {
    try {
      const base = Airtable.base(baseId);
      const records: any[] = [];

      await base(tableId)
        .select(options)
        .eachPage((pageRecords, fetchNextPage) => {
          records.push(...pageRecords.map(record => ({
            id: record.id,
            fields: record.fields
          })));
          fetchNextPage();
        });

      return records;
    } catch (error: any) {
      throw new AirtableApiError(
        `Failed to fetch records from table ${tableId}: ${error.message}`,
        error.statusCode || 500
      );
    }
  }

  /**
   * Get columns/fields for a specific table
   */
  async getTableSchema(baseId: string, tableId: string): Promise<any> {
    try {
      const base = Airtable.base(baseId);
      
      // First, check if the table exists by getting the table metadata
      const tables = await this.getTables(baseId);
      const tableExists = tables.some((table: any) => table.id === tableId);
      
      if (!tableExists) {
        throw new AirtableApiError(
          `Table ${tableId} not found in base ${baseId}`,
          404
        );
      }
      
      // Check if we have predefined field types for this table
      const knownFieldTypes = this.getKnownFieldTypes(baseId, tableId);
      
      // If we have predefined field types, use them
      if (knownFieldTypes) {
        console.log(`Using predefined schema for ${baseId}/${tableId}`);
        const fields = Object.entries(knownFieldTypes).map(([fieldName, fieldType]) => ({
          name: fieldName,
          type: fieldType
        }));
        return { fields };
      }
      
      // Otherwise, get a sample record to determine fields
      console.log(`Retrieving schema from sample record for ${baseId}/${tableId}`);
      const records = await base(tableId)
        .select({ maxRecords: 1 })
        .firstPage();
      
      // Return empty fields array if table has no records
      if (records.length === 0) {
        console.log(`Table ${tableId} exists but has no records. Returning default schema.`);
        // Create a default schema with common field types
        return { 
          fields: [
            { name: 'Name', type: 'string' },
            { name: 'Description', type: 'longtext' },
            { name: 'Category', type: 'select' },
            { name: 'Created', type: 'date' }
          ] 
        };
      }
      
      // Extract field names from the first record
      const sampleRecord = records[0];
      const fields = Object.keys(sampleRecord.fields).map(fieldName => {
        const value = sampleRecord.fields[fieldName];
        const type = this.determineFieldType(value);
        
        return {
          name: fieldName,
          type
        };
      });
      
      console.log(`Successfully extracted schema for table ${tableId} with ${fields.length} fields`);
      return { fields };
    } catch (error: any) {
      console.error(`Error getting table schema:`, error);
      
      // Provide a fallback schema based on table ID
      if (baseId === 'appTarotCards') {
        return {
          fields: [
            { name: 'CardName', type: 'string' },
            { name: 'ArcanaType', type: 'select' },
            { name: 'UprightMeaning', type: 'longtext' },
            { name: 'Affirmation', type: 'longtext' },
            { name: 'JournalPrompt', type: 'longtext' }
          ]
        };
      } else if (baseId === 'appAffirmations') {
        return {
          fields: [
            { name: 'Text', type: 'longtext' },
            { name: 'Theme', type: 'select' },
            { name: 'MoonPhase', type: 'select' }
          ]
        };
      } else if (baseId === 'appPrintables') {
        return {
          fields: [
            { name: 'Name', type: 'string' },
            { name: 'Description', type: 'longtext' },
            { name: 'Type', type: 'select' }
          ]
        };
      }
      
      // Generic fallback
      return {
        fields: [
          { name: 'Name', type: 'string' },
          { name: 'Description', type: 'longtext' },
          { name: 'Category', type: 'select' },
          { name: 'Created', type: 'date' }
        ]
      };
    }
  }

  /**
   * Convert Airtable schema to Notion database schema
   */
  convertToNotionSchema(airtableSchema: any): any {
    const notionSchema: any = {};
    
    // First, find a good title field candidate
    let titleFieldName = '';
    const titleCandidates = ['Name', 'Title', 'CardName', 'CollectionName', 'Text'];
    for (const candidate of titleCandidates) {
      if (airtableSchema.fields.some((f: any) => f.name === candidate)) {
        titleFieldName = candidate;
        break;
      }
    }
    
    // If no candidates found, use the first string field
    if (!titleFieldName) {
      const stringField = airtableSchema.fields.find((f: any) => 
        f.type === 'string' || f.type === 'text'
      );
      if (stringField) {
        titleFieldName = stringField.name;
      }
    }
    
    // Now map all fields to Notion properties
    airtableSchema.fields.forEach((field: any) => {
      // Check if this is our title field
      if (field.name === titleFieldName) {
        notionSchema[field.name] = { title: {} };
        return;
      }
      
      // Otherwise, map according to type
      switch (field.type) {
        case 'string':
          notionSchema[field.name] = { rich_text: {} };
          break;
          
        case 'longtext':
          notionSchema[field.name] = { rich_text: {} };
          break;
          
        case 'number':
          notionSchema[field.name] = { number: {} };
          break;
          
        case 'boolean':
          notionSchema[field.name] = { checkbox: {} };
          break;
          
        case 'date':
          notionSchema[field.name] = { date: {} };
          break;
          
        case 'select':
          notionSchema[field.name] = { 
            select: { 
              options: [] 
            } 
          };
          break;
          
        case 'multiselect':
          notionSchema[field.name] = { 
            multi_select: { 
              options: [] 
            } 
          };
          break;
          
        case 'array':
          notionSchema[field.name] = {
            multi_select: { options: [] }
          };
          break;
          
        case 'url':
          notionSchema[field.name] = { url: {} };
          break;
          
        case 'url_array':
        case 'reference_array':
          notionSchema[field.name] = {
            rich_text: {} // Complex arrays become rich text in Notion
          };
          break;
          
        case 'attachment':
          notionSchema[field.name] = {
            files: {} // Files property for attachments
          };
          break;
          
        default:
          notionSchema[field.name] = { rich_text: {} };
      }
    });
    
    // Make sure we have at least one title property
    if (!titleFieldName) {
      notionSchema['Title'] = { title: {} };
    }
    
    return notionSchema;
  }

  /**
   * Determine field type from a value
   */
  private determineFieldType(value: any): string {
    if (value === null || value === undefined) return 'string';
    
    if (Array.isArray(value)) {
      // Check if it's an array of objects (like links or attachments)
      if (value.length > 0 && typeof value[0] === 'object') {
        if (value[0].url) return 'url_array';
        if (value[0].id) return 'reference_array';
        return 'object_array';
      }
      return 'array';
    }
    
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (value instanceof Date) return 'date';
    
    if (typeof value === 'object') {
      // Check if it might be a date string
      if (value.date || value.dateTime) return 'date';
      // Check if it's an attachment
      if (value.url && value.filename) return 'attachment';
      // Check if it's a reference to another record
      if (value.id && value.recordId) return 'reference';
      return 'object';
    }
    
    // Check if string is a date
    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      return 'date';
    }
    
    // Check if it's a URL
    if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
      return 'url';
    }
    
    return 'string';
  }
  
  /**
   * Get known field types for specific tables in the Midnight Magnolia schema
   */
  private getKnownFieldTypes(baseId: string, tableId: string): Record<string, string> | null {
    // Handle Tarot Content Cards schema
    if (baseId === 'appTarotCards' && tableId === 'tblTarotCards') {
      return {
        'CardName': 'string',
        'ArcanaType': 'select',
        'CardNumber': 'string',
        'AssignedPersona': 'string',
        'Quote': 'longtext',
        'Astrology': 'string',
        'Element': 'select',
        'UprightMeaning': 'longtext',
        'ReversedMeaning': 'longtext',
        'Affirmation': 'longtext',
        'JournalPrompt': 'longtext',
        'Symbolism': 'longtext',
        'ColorNotes': 'longtext',
        'DevelopmentStage': 'select',
        'Inspiration': 'longtext',
        'DesignLink': 'url',
        'RelatedProducts': 'reference_array'
      };
    }
    
    // Handle Curated Collections schema
    if (baseId === 'appPrintables' && tableId === 'tblCollections') {
      return {
        'CollectionName': 'string',
        'CollectionType': 'select',
        'Description': 'longtext',
        'IncludedItems': 'reference_array',
        'PricingTier': 'select',
        'TargetAudience': 'multiselect',
        'Keywords': 'array',
        'CoverImage': 'attachment',
        'LaunchDate': 'date',
        'SalesPlatforms': 'multiselect'
      };
    }
    
    // Handle Affirmation Library schema
    if (baseId === 'appAffirmations') {
      return {
        'Text': 'longtext',
        'Theme': 'select',
        'MoonPhase': 'select',
        'Mood': 'select',
        'Category': 'select',
        'Tags': 'array'
      };
    }
    
    return null;
  }

  /**
   * Import records from Airtable to Notion
   */
  async importToNotion(
    baseId: string,
    tableId: string,
    notionDatabaseId: string,
    fieldMappings: any,
    notionService: any
  ): Promise<number> {
    try {
      // Validate required fields
      if (!baseId) throw new AirtableApiError('Base ID is required', 400);
      if (!tableId) throw new AirtableApiError('Table ID is required', 400);
      if (!notionDatabaseId) throw new AirtableApiError('Notion Database ID is required', 400);
      if (!fieldMappings || Object.keys(fieldMappings).length === 0) {
        throw new AirtableApiError('Field mappings are required', 400);
      }
      
      console.log(`Importing records from ${baseId}/${tableId} to Notion database ${notionDatabaseId}`);
      console.log('With field mappings:', fieldMappings);
      
      // Get records
      const records = await this.getRecords(baseId, tableId);
      console.log(`Fetched ${records.length} records from Airtable`);
      
      if (records.length === 0) {
        return 0; // Nothing to import
      }
      
      let importedCount = 0;
      const errors: any[] = [];
      
      // Process each record 
      for (const record of records) {
        try {
          const notionProperties: any = {};
          
          // Map Airtable fields to Notion properties based on fieldMappings
          Object.entries(fieldMappings).forEach(([airtableField, notionField]) => {
            // Skip if mapping value is null, empty, or 'none'
            if (!notionField || notionField === 'none') return;
            
            const value = record.fields[airtableField];
            
            // Only add property if value exists
            if (value !== undefined && value !== null) {
              notionProperties[notionField as string] = this.convertFieldValueToNotion(
                value,
                notionField as string
              );
            }
          });
          
          // Skip if no properties to add
          if (Object.keys(notionProperties).length === 0) {
            console.log(`Skipping record ${record.id} - no valid properties to map`);
            continue;
          }
          
          // Add to Notion
          console.log(`Adding record to Notion with properties:`, notionProperties);
          await notionService.addDatabasePage(notionDatabaseId, notionProperties);
          importedCount++;
        } catch (recordError: any) {
          console.error(`Error importing record ${record.id}:`, recordError);
          errors.push({
            recordId: record.id,
            error: recordError.message
          });
          // Continue with next record
        }
      }
      
      // If we have errors but imported some records, log them but still return success
      if (errors.length > 0) {
        console.warn(`Completed with ${errors.length} errors and ${importedCount} successes`);
      }
      
      return importedCount;
    } catch (error: any) {
      console.error('Import to Notion error:', error);
      throw new AirtableApiError(
        `Failed to import records to Notion: ${error.message}`,
        error.statusCode || 500
      );
    }
  }

  /**
   * Convert an Airtable field value to Notion format
   */
  private convertFieldValueToNotion(value: any, notionFieldName: string): any {
    if (value === null || value === undefined) {
      return null;
    }
    
    // First check if it's a title field by name
    const titleFieldNames = ['title', 'name', 'cardname', 'collectionname', 'text'];
    const isLikelyTitleField = titleFieldNames.includes(notionFieldName.toLowerCase());
    
    // Handle different field types
    if (typeof value === 'string') {
      // Check if it's a title field
      if (isLikelyTitleField) {
        return {
          title: [
            {
              text: { content: value }
            }
          ]
        };
      }
      
      // Check if it's a URL
      if (value.startsWith('http://') || value.startsWith('https://')) {
        return { url: value };
      }
      
      // Check if it's a date in string format
      if (!isNaN(Date.parse(value))) {
        return {
          date: { 
            start: new Date(value).toISOString().split('T')[0]
          }
        };
      }
      
      // Regular text field - limit to max 2000 characters for Notion
      if (value.length > 2000) {
        value = value.substring(0, 1997) + '...';
      }
      
      return {
        rich_text: [
          {
            text: { content: value }
          }
        ]
      };
    }
    
    if (typeof value === 'number') {
      return { number: value };
    }
    
    if (typeof value === 'boolean') {
      return { checkbox: value };
    }
    
    if (value instanceof Date) {
      return {
        date: { 
          start: value.toISOString().split('T')[0]
        }
      };
    }
    
    // Handle different array types
    if (Array.isArray(value)) {
      // Handle empty arrays
      if (value.length === 0) {
        return { multi_select: [] };
      }
      
      // Check if it's an array of simple values (strings, numbers)
      const allPrimitives = value.every(item => 
        typeof item === 'string' || typeof item === 'number'
      );
      
      if (allPrimitives) {
        // Convert to multi-select
        return {
          multi_select: value.map(item => ({
            name: String(item).substring(0, 100) // Notion limits name length
          }))
        };
      }
      
      // Handle array of objects (attachments, references, etc.)
      if (typeof value[0] === 'object') {
        // Check if these are attachments with URLs
        if (value[0].url) {
          return {
            files: value.slice(0, 10).map((item: any) => ({
              name: item.filename || 'File',
              external: { url: item.url }
            }))
          };
        }
        
        // Handle references - convert to rich text with links
        if (value[0].id || value[0].recordId) {
          return {
            rich_text: [
              {
                text: { 
                  content: `Referenced items: ${value.length}` 
                }
              }
            ]
          };
        }
      }
      
      // Default array handling - convert to string
      return {
        rich_text: [
          {
            text: { 
              content: `[${value.map(item => 
                typeof item === 'object' ? 'Object' : String(item)
              ).join(', ')}]`.substring(0, 2000) 
            }
          }
        ]
      };
    }
    
    // Handle object values
    if (typeof value === 'object') {
      // Handle attachment
      if (value.url && value.filename) {
        return {
          files: [
            {
              name: value.filename,
              external: { url: value.url }
            }
          ]
        };
      }
      
      // Handle references
      if (value.id && value.recordId) {
        return {
          rich_text: [
            {
              text: { content: `Reference: ${value.id}` }
            }
          ]
        };
      }
      
      // Handle date objects
      if (value.date || value.dateTime) {
        const dateStr = value.date || value.dateTime;
        return {
          date: { start: dateStr }
        };
      }
    }
    
    // Default: convert to string representation
    try {
      const stringValue = JSON.stringify(value).substring(0, 2000);
      return {
        rich_text: [
          {
            text: { content: stringValue }
          }
        ]
      };
    } catch (e) {
      // If JSON conversion fails
      return {
        rich_text: [
          {
            text: { content: "Complex value (cannot display)" }
          }
        ]
      };
    }
  }

  /**
   * Helper method to get a base name from its ID
   */
  private getBaseNameFromId(baseId: string): string {
    const baseMap: { [key: string]: string } = {
      'appTarotCards': 'Tarot Card Collection',
      'appAffirmations': 'Affirmation Library',
      'appAstrology': 'Astrology Reference',
      'appPrintables': 'Printable Templates'
    };
    
    return baseMap[baseId] || baseId;
  }
}

export const airtableService = new AirtableService();