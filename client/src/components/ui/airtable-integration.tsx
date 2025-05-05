import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { FaTable, FaDatabase, FaSync, FaCheck, FaExclamationTriangle, FaLink, FaFileImport } from 'react-icons/fa';

export const AirtableIntegration: React.FC = () => {
  const { toast } = useToast();
  const [selectedBase, setSelectedBase] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [selectedNotionDb, setSelectedNotionDb] = useState<string>('');
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({});
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Check Airtable connection status
  const { data: apiHealth, isLoading: isCheckingConnection } = useQuery({
    queryKey: ['/api/airtable/health'],
    queryFn: async () => {
      console.log('Checking Airtable health...');
      try {
        const response = await apiRequest('/api/airtable/health');
        const data = await response.json();
        console.log('Airtable health data:', data);
        
        // Set connection status directly from the queryFn
        if (data?.success && data?.status === 'connected') {
          console.log('Setting connection status to connected');
          setConnectionStatus('connected');
        } else {
          console.log('Setting connection status to error (data not successful)');
          setConnectionStatus('error');
        }
        
        return data;
      } catch (error) {
        console.error('Airtable health check error:', error);
        setConnectionStatus('error');
        throw error;
      }
    }
  });

  // Get all Airtable bases
  const { 
    data: basesData, 
    isLoading: isLoadingBases,
    refetch: refetchBases,
    error: basesError
  } = useQuery({
    queryKey: ['/api/airtable/bases'],
    enabled: connectionStatus === 'connected',
    queryFn: async () => {
      console.log('Fetching Airtable bases...');
      try {
        const response = await apiRequest('/api/airtable/bases');
        const data = await response.json();
        console.log('Airtable bases API response:', data);
        return data;
      } catch (error) {
        console.error('Error in Airtable bases queryFn:', error);
        throw error;
      }
    }
  });
  
  // Log error if present
  useEffect(() => {
    if (basesError) {
      console.error('Bases query error:', basesError);
    }
  }, [basesError]);

  // Get tables for selected base
  const {
    data: tablesData,
    isLoading: isLoadingTables,
    refetch: refetchTables
  } = useQuery({
    queryKey: ['/api/airtable/bases', selectedBase, 'tables'],
    enabled: !!selectedBase && connectionStatus === 'connected',
    queryFn: async () => {
      if (!selectedBase) return null;
      const response = await apiRequest(`/api/airtable/bases/${selectedBase}/tables`);
      return response.json();
    }
  });

  // Get schema for selected table
  const {
    data: schemaData,
    isLoading: isLoadingSchema,
    refetch: refetchSchema,
    error: schemaError
  } = useQuery({
    queryKey: ['/api/airtable/bases', selectedBase, 'tables', selectedTable, 'schema'],
    enabled: !!selectedBase && !!selectedTable && connectionStatus === 'connected',
    queryFn: async () => {
      if (!selectedBase || !selectedTable) return null;
      try {
        console.log(`Fetching schema for ${selectedBase}/${selectedTable}...`);
        const response = await apiRequest(`/api/airtable/bases/${selectedBase}/tables/${selectedTable}/schema`);
        const data = await response.json();
        console.log('Schema data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching schema:', error);
        // Return a dummy schema so the UI doesn't break
        return {
          success: false,
          error: error.message || 'Failed to fetch schema',
          schema: {
            fields: [
              { name: 'Name', type: 'text' },
              { name: 'Description', type: 'text' }
            ]
          }
        };
      }
    }
  });
  
  // Log schema error
  useEffect(() => {
    if (schemaError) {
      console.error('Schema error:', schemaError);
    }
  }, [schemaError]);

  // Get Notion databases for mapping
  const {
    data: notionDbsData,
    isLoading: isLoadingNotionDbs,
    refetch: refetchNotionDbs
  } = useQuery({
    queryKey: ['/api/notion/databases'],
    enabled: connectionStatus === 'connected',
    queryFn: async () => {
      const response = await apiRequest('/api/notion/databases');
      return response.json();
    }
  });

  // Import records mutation
  const importRecordsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('/api/airtable/import-to-notion', {
        method: 'POST',
        body: JSON.stringify({
          baseId: selectedBase,
          tableId: selectedTable,
          notionDatabaseId: selectedNotionDb,
          fieldMappings
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Import Successful",
        description: `Imported ${data.importedCount} records from Airtable to Notion.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Import Failed",
        description: `Failed to import records: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Create database from Airtable schema mutation
  const createDbFromSchemaMutation = useMutation({
    mutationFn: async (data: { parentPageId: string; title: string; schema: any }) => {
      // First convert schema to Notion format
      const convertResponse = await apiRequest('/api/airtable/convert-schema', {
        method: 'POST',
        body: JSON.stringify({ schema: data.schema }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const convertData = await convertResponse.json();

      // Then create database with converted schema
      const dbResponse = await apiRequest('/api/notion/databases', {
        method: 'POST',
        body: JSON.stringify({
          parentPageId: data.parentPageId,
          title: data.title,
          properties: convertData.notionSchema
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return dbResponse.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Database Created",
        description: "Created Notion database from Airtable schema.",
      });
      setSelectedNotionDb(data.database.id);
      refetchNotionDbs();
    },
    onError: (error: any) => {
      toast({
        title: "Database Creation Failed",
        description: `Failed to create database: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // When a new table is selected, reset field mappings
  useEffect(() => {
    setFieldMappings({});
  }, [selectedTable]);

  // Create field mapping UI based on schema
  const renderFieldMappings = () => {
    if (!schemaData?.schema?.fields || !notionDbsData?.databases || !selectedNotionDb) {
      return null;
    }

    // Find selected Notion DB
    const notionDb = notionDbsData.databases.find((db: any) => db.id === selectedNotionDb);
    if (!notionDb || !notionDb.properties) {
      return (
        <div className="text-[#FAF3E0] text-sm py-4">
          Select a Notion database to create field mappings.
        </div>
      );
    }

    const notionProperties = Object.keys(notionDb.properties);

    return (
      <div className="space-y-4 mt-4">
        <h3 className="text-[#D4AF37] font-medium">Field Mappings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {schemaData.schema.fields.map((field: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 bg-[#0A192F]/70 p-2 rounded-md border border-[#A3B18A]/20">
              <div className="flex-1 text-[#FAF3E0]">{field.name}</div>
              <FaLink className="text-[#A3B18A]" />
              <Select
                value={fieldMappings[field.name] || ''}
                onValueChange={(value) => {
                  setFieldMappings(prev => ({
                    ...prev,
                    [field.name]: value
                  }));
                }}
              >
                <SelectTrigger className="w-[160px] bg-[#0A192F]/80 border-[#A3B18A]/30 text-[#FAF3E0]">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                  <SelectItem value="">None</SelectItem>
                  {notionProperties.map((prop: string) => (
                    <SelectItem key={prop} value={prop}>{prop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // For debugging purposes
  useEffect(() => {
    console.log('Current basesData state:', basesData);
  }, [basesData]);
  
  // For debugging the connection status
  useEffect(() => {
    console.log('Connection status changed to:', connectionStatus);
    if (connectionStatus === 'connected') {
      console.log('Connection is now connected, refetching bases...');
      refetchBases();
    }
  }, [connectionStatus, refetchBases]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-playfair text-[#D4AF37]">Airtable Integration</h2>
          <p className="text-sm text-[#FAF3E0]">
            Import content schemas from Airtable into your Digital Grimoire
          </p>
        </div>
        <Badge
          variant="outline"
          className={`${
            connectionStatus === 'checking'
              ? 'bg-blue-500/20 text-blue-300'
              : connectionStatus === 'connected'
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}
        >
          {connectionStatus === 'checking' ? 'Checking Connection...' :
           connectionStatus === 'connected' ? 'Connected' : 'Connection Error'}
        </Badge>
      </div>

      {/* DEBUG INFO */}
      <div className="bg-black/50 p-3 rounded border border-yellow-500/30 mt-2 mb-4">
        <h3 className="text-yellow-400 font-mono text-sm">Debug Information</h3>
        <div className="text-white font-mono text-xs mt-2">
          <p>isLoadingBases: {isLoadingBases ? 'true' : 'false'}</p>
          <p>connectionStatus: {connectionStatus}</p>
          <p>basesData present: {basesData ? 'yes' : 'no'}</p>
          {basesData && (
            <>
              <p>basesData.success: {basesData.success ? 'true' : 'false'}</p>
              <p>basesData.bases: {basesData.bases ? `Array(${basesData.bases.length})` : 'undefined'}</p>
              {basesData.bases && basesData.bases.length > 0 && (
                <div className="mt-1 ml-2">
                  <p>First base: {JSON.stringify(basesData.bases[0])}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {connectionStatus === 'error' ? (
        <Card className="bg-[#0A192F] border-red-400/30 shadow-lg">
          <CardHeader className="border-b border-red-400/20">
            <CardTitle className="text-red-400 flex items-center">
              <FaExclamationTriangle className="mr-2" /> Airtable API Connection Error
            </CardTitle>
            <CardDescription className="text-[#FAF3E0]">
              Unable to connect to the Airtable API. Please check your API key.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="bg-red-950/20 border border-red-400/20 rounded-md p-4">
              <h3 className="font-medium text-red-400 mb-2">Troubleshooting Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#FAF3E0]">
                <li>Verify that your Airtable API key is correct and active</li>
                <li>Check that your Airtable account has access to the bases you want to work with</li>
                <li>Ensure your API key has appropriate permissions</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Base and Table Selection */}
          <Card className="bg-[#0A192F] border-[#A3B18A]/30 shadow-lg">
            <CardHeader className="border-b border-[#A3B18A]/20">
              <CardTitle className="text-[#D4AF37] flex items-center">
                <FaTable className="mr-2" /> Content Schemas
              </CardTitle>
              <CardDescription className="text-[#FAF3E0]">
                Select your Airtable base and table to import
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {isLoadingBases ? (
                <div className="text-center p-4">
                  <p className="text-[#A3B18A]">Loading Airtable bases...</p>
                </div>
              ) : (
                <>
                  {/* Base selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#FAF3E0]">Select Base</label>
                    <Select
                      value={selectedBase}
                      onValueChange={setSelectedBase}
                    >
                      <SelectTrigger className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                        <SelectValue placeholder="Select an Airtable base" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                        {basesData?.bases?.map((base: any) => (
                          <SelectItem key={base.id} value={base.id}>
                            {base.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Table selection */}
                  {selectedBase && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#FAF3E0]">Select Table</label>
                      <Select
                        value={selectedTable}
                        onValueChange={setSelectedTable}
                        disabled={isLoadingTables || !tablesData?.tables?.length}
                      >
                        <SelectTrigger className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectValue placeholder={isLoadingTables ? "Loading tables..." : "Select a table"} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                          {tablesData?.tables?.map((table: any) => (
                            <SelectItem key={table.id} value={table.id}>
                              {table.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Schema display */}
                  {selectedTable && schemaData?.schema && (
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-[#D4AF37] font-medium">Schema Fields</h3>
                        <Badge variant="outline" className="bg-[#0A192F] text-xs text-[#FAF3E0]">
                          {schemaData.schema.fields.length} Fields
                        </Badge>
                      </div>
                      <div className="bg-[#0A192F]/50 border border-[#A3B18A]/20 rounded-md p-3 max-h-48 overflow-y-auto">
                        <div className="space-y-1">
                          {schemaData.schema.fields.map((field: any, index: number) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-[#FAF3E0]">{field.name}</span>
                              <Badge variant="outline" className="bg-[#0A192F]/30 text-xs text-[#A3B18A]">
                                {field.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Notion Database Selection */}
          {selectedTable && schemaData?.schema && (
            <Card className="bg-[#0A192F] border-[#A3B18A]/30 shadow-lg">
              <CardHeader className="border-b border-[#A3B18A]/20">
                <CardTitle className="text-[#D4AF37] flex items-center">
                  <FaDatabase className="mr-2" /> Destination Mapping
                </CardTitle>
                <CardDescription className="text-[#FAF3E0]">
                  Select a Notion database or create a new one from schema
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {isLoadingNotionDbs ? (
                  <div className="text-center p-4">
                    <p className="text-[#A3B18A]">Loading Notion databases...</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#FAF3E0]">Select Notion Database</label>
                      <Select
                        value={selectedNotionDb}
                        onValueChange={setSelectedNotionDb}
                      >
                        <SelectTrigger className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                          <SelectValue placeholder="Select a Notion database" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                          {notionDbsData?.databases?.map((db: any) => {
                            const title = db.title && db.title.length > 0 
                              ? db.title[0]?.plain_text 
                              : 'Untitled Database';
                            return (
                              <SelectItem key={db.id} value={db.id}>
                                {title}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Separator className="flex-1 bg-[#A3B18A]/20" />
                      <span className="text-xs text-[#A3B18A]">OR</span>
                      <Separator className="flex-1 bg-[#A3B18A]/20" />
                    </div>

                    <Button
                      onClick={() => {
                        // Ask for parent page ID
                        const parentPageId = prompt("Enter parent page ID for the new database:");
                        if (!parentPageId) return;
                        
                        // Ask for database title
                        const baseInfo = basesData?.bases?.find((b: any) => b.id === selectedBase);
                        const tableInfo = tablesData?.tables?.find((t: any) => t.id === selectedTable);
                        const defaultTitle = `${baseInfo?.name || 'Airtable'} - ${tableInfo?.name || 'Table'}`;
                        const title = prompt("Enter database title:", defaultTitle);
                        if (!title) return;
                        
                        // Create the database
                        createDbFromSchemaMutation.mutate({
                          parentPageId,
                          title,
                          schema: schemaData.schema
                        });
                      }}
                      variant="outline"
                      className="w-full border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A] hover:text-[#0A192F]"
                      disabled={createDbFromSchemaMutation.isPending}
                    >
                      <FaDatabase className="mr-2" />
                      {createDbFromSchemaMutation.isPending 
                        ? "Creating Database..." 
                        : "Create New Database from Schema"}
                    </Button>

                    {renderFieldMappings()}
                  </>
                )}
              </CardContent>
              <CardFooter className="border-t border-[#A3B18A]/20 pt-4 flex justify-end">
                <Button
                  onClick={() => importRecordsMutation.mutate()}
                  disabled={
                    importRecordsMutation.isPending || 
                    !selectedBase || 
                    !selectedTable || 
                    !selectedNotionDb || 
                    Object.keys(fieldMappings).length === 0
                  }
                  className="bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                >
                  <FaFileImport className="mr-2" />
                  {importRecordsMutation.isPending 
                    ? "Importing..." 
                    : "Import Records to Notion"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AirtableIntegration;