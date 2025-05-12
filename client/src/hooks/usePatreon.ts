import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export type PatreonMember = {
  id: string;
  attributes: {
    email: string;
    full_name: string;
    patron_status: string;
    currently_entitled_amount_cents: number;
    lifetime_support_cents: number;
    last_charge_date: string;
    next_charge_date: string;
  };
  relationships: {
    currently_entitled_tiers: {
      data: Array<{
        id: string;
        type: string;
      }>;
    };
  };
};

export type PatreonTier = {
  id: string;
  attributes: {
    title: string;
    description: string;
    amount_cents: number;
    published: boolean;
  };
};

export type PatreonCampaign = {
  id: string;
  attributes: {
    name: string;
    url: string;
    summary: string;
    creation_name: string;
    patron_count: number;
    discord_server_id: string | null;
  };
  relationships: {
    tiers: {
      data: Array<{
        id: string;
        type: string;
      }>;
    };
  };
};

export type PatreonPost = {
  title: string;
  content: string;
  isPaid: boolean;
  publishedAt?: string;
  teaserText?: string;
  isPublic?: boolean;
  tierIds?: string[];
};

/**
 * Hook for interacting with Patreon API
 */
export function usePatreon() {
  const { toast } = useToast();
  
  // Fetches the Patreon campaign info
  const campaignQuery = useQuery({
    queryKey: ['/api/patreon/campaign'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/patreon/campaign');
        const data = await response.json();
        return data.data[0] as PatreonCampaign;
      } catch (error: any) {
        console.error('Error fetching Patreon campaign:', error);
        return null;
      }
    },
    retry: false,
    enabled: false // Don't auto-fetch since auth might be required
  });
  
  // Fetches the Patreon tiers for the campaign
  const tiersQuery = useQuery({
    queryKey: ['/api/patreon/tiers'],
    queryFn: async () => {
      if (!campaignQuery.data?.id) {
        return [];
      }
      
      try {
        const response = await apiRequest('GET', `/api/patreon/campaign/tiers?campaignId=${campaignQuery.data.id}`);
        const data = await response.json();
        return data.data as PatreonTier[];
      } catch (error: any) {
        console.error('Error fetching Patreon tiers:', error);
        return [];
      }
    },
    enabled: !!campaignQuery.data?.id
  });
  
  // Fetches the Patreon members for the campaign
  const membersQuery = useQuery({
    queryKey: ['/api/patreon/members'],
    queryFn: async () => {
      if (!campaignQuery.data?.id) {
        return [];
      }
      
      try {
        const response = await apiRequest('GET', `/api/patreon/campaign/members?campaignId=${campaignQuery.data.id}`);
        const data = await response.json();
        return data.data as PatreonMember[];
      } catch (error: any) {
        console.error('Error fetching Patreon members:', error);
        return [];
      }
    },
    enabled: !!campaignQuery.data?.id
  });
  
  // Create a new Patreon post
  const createPostMutation = useMutation({
    mutationFn: async ({ post, campaignId }: { post: PatreonPost, campaignId: string }) => {
      const response = await apiRequest('POST', '/api/patreon/post', {
        campaignId,
        postData: post
      });
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Post Created',
        description: 'Successfully created a new Patreon post',
      });
      
      // Invalidate related queries if needed
      // queryClient.invalidateQueries({ queryKey: ['/api/patreon/posts'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to create Patreon post: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  // Sync content to Patreon
  const syncContentMutation = useMutation({
    mutationFn: async ({ contentId, campaignId }: { contentId: number, campaignId: string }) => {
      const response = await apiRequest('POST', '/api/patreon/sync', {
        campaignId,
        contentId
      });
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Content Synced',
        description: 'Successfully synced content to Patreon',
      });
      
      // Invalidate any queries that might be affected
      queryClient.invalidateQueries({ queryKey: ['/api/patreon-content'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to sync content to Patreon: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  // Initiate Patreon authorization
  const initiateAuth = () => {
    window.location.href = '/api/patreon/auth';
  };
  
  return {
    // Queries
    campaign: campaignQuery.data,
    tiers: tiersQuery.data || [],
    members: membersQuery.data || [],
    isLoadingCampaign: campaignQuery.isLoading,
    isLoadingTiers: tiersQuery.isLoading,
    isLoadingMembers: membersQuery.isLoading,
    errorCampaign: campaignQuery.error,
    errorTiers: tiersQuery.error,
    errorMembers: membersQuery.error,
    
    // Refetch functions
    refetchCampaign: campaignQuery.refetch,
    
    // Mutations
    createPost: createPostMutation.mutate,
    syncContent: syncContentMutation.mutate,
    isCreatingPost: createPostMutation.isPending,
    isSyncingContent: syncContentMutation.isPending,
    
    // Auth helper
    initiateAuth,
  };
}