import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';

export type ContentTemplate = {
  id: string;
  name: string;
  description: string;
  content: string;
  category?: string;
  tags?: string[];
  lastEdited?: string;
};

export type TemplateType = 
  | 'tarot-readings-templates'
  | 'journal-prompts-templates'
  | 'affirmations-templates'
  | 'astrology-insights-templates'
  | 'scripts-templates'
  | 'brand-voice-templates'
  | 'email-templates';

/**
 * Hook for working with Notion content templates
 * @param templateType The type of template to work with
 */
export function useNotionTemplates(templateType: TemplateType) {
  const queryKey = [`/api/templates/${templateType}`];
  
  // Get all templates of the specified type
  const templatesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/templates/${templateType}`);
      return await response.json() as ContentTemplate[];
    },
  });
  
  // Create a new template
  const createTemplateMutation = useMutation({
    mutationFn: async (template: Omit<ContentTemplate, 'id'>) => {
      const response = await apiRequest('POST', `/api/templates/${templateType}`, template);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  
  // Update an existing template
  const updateTemplateMutation = useMutation({
    mutationFn: async (template: ContentTemplate) => {
      const response = await apiRequest(
        'PUT', 
        `/api/templates/${templateType}/${template.id}`, 
        template
      );
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  
  // Delete a template
  const deleteTemplateMutation = useMutation({
    mutationFn: async (templateId: string) => {
      const response = await apiRequest('DELETE', `/api/templates/${templateType}/${templateId}`);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  
  return {
    templates: templatesQuery.data || [],
    isLoading: templatesQuery.isLoading,
    error: templatesQuery.error,
    createTemplate: createTemplateMutation.mutate,
    updateTemplate: updateTemplateMutation.mutate,
    deleteTemplate: deleteTemplateMutation.mutate,
    createLoading: createTemplateMutation.isPending,
    updateLoading: updateTemplateMutation.isPending,
    deleteLoading: deleteTemplateMutation.isPending,
  };
}