import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { storage } from './storage';

/**
 * Error handling class for Patreon API
 */
class PatreonApiError extends Error {
  status: number;
  code: string;
  
  constructor(message: string, status = 500, code = 'patreon_error') {
    super(message);
    this.name = 'PatreonApiError';
    this.status = status;
    this.code = code;
  }
}

/**
 * Patreon Service for managing integration with Patreon API
 */
export class PatreonService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private apiUrl: string = 'https://www.patreon.com/api/oauth2/v2';
  private token: string | null = null;
  
  constructor() {
    this.clientId = process.env.PATREON_CLIENT_ID || '';
    this.clientSecret = process.env.PATREON_CLIENT_SECRET || '';
    this.redirectUri = process.env.PATREON_REDIRECT_URI || 'http://localhost:3000/api/patreon/callback';
    
    if (!this.clientId || !this.clientSecret) {
      console.warn('PATREON_CLIENT_ID or PATREON_CLIENT_SECRET environment variables are not set. Patreon integration will not work.');
    }
  }
  
  /**
   * Get the OAuth authorization URL for Patreon
   * @returns URL to redirect user for Patreon OAuth
   */
  getAuthUrl(state: string = ''): string {
    const scopes = ['identity', 'campaigns', 'campaigns.members'];
    const url = new URL('https://www.patreon.com/oauth2/authorize');
    
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('redirect_uri', this.redirectUri);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', scopes.join(' '));
    
    if (state) {
      url.searchParams.append('state', state);
    }
    
    return url.toString();
  }
  
  /**
   * Exchange authorization code for access token
   * @param code Authorization code from OAuth callback
   * @returns Access token and related information
   */
  async getAccessToken(code: string): Promise<any> {
    try {
      const params = new URLSearchParams();
      params.append('code', code);
      params.append('grant_type', 'authorization_code');
      params.append('client_id', this.clientId);
      params.append('client_secret', this.clientSecret);
      params.append('redirect_uri', this.redirectUri);
      
      const response = await fetch('https://www.patreon.com/api/oauth2/token', {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new PatreonApiError(
          error.error_description || 'Failed to get access token',
          response.status,
          error.error
        );
      }
      
      const data = await response.json();
      this.token = data.access_token;
      return data;
    } catch (error: any) {
      console.error('Error getting Patreon access token:', error);
      throw error;
    }
  }
  
  /**
   * Get current campaign information
   * @returns Campaign data from Patreon
   */
  async getCampaign(accessToken: string): Promise<any> {
    try {
      const url = `${this.apiUrl}/campaigns?include=tiers,goals,benefits&fields[tier]=title,description,amount_cents,published,discord_role_ids&fields[benefit]=title,description,rule_type,tiers`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new PatreonApiError(
          error.errors?.[0]?.detail || 'Failed to get campaign data',
          response.status,
          error.errors?.[0]?.code
        );
      }
      
      return await response.json();
    } catch (error: any) {
      console.error('Error getting Patreon campaign:', error);
      throw error;
    }
  }
  
  /**
   * Get members for the campaign
   * @returns Campaign members data
   */
  async getCampaignMembers(accessToken: string, campaignId: string): Promise<any> {
    try {
      const url = `${this.apiUrl}/campaigns/${campaignId}/members?include=currently_entitled_tiers,user&fields[member]=email,patron_status,lifetime_support_cents,currently_entitled_amount_cents,last_charge_date,next_charge_date&fields[user]=full_name,email,vanity,is_email_verified&fields[tier]=title,amount_cents`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new PatreonApiError(
          error.errors?.[0]?.detail || 'Failed to get campaign members',
          response.status,
          error.errors?.[0]?.code
        );
      }
      
      return await response.json();
    } catch (error: any) {
      console.error('Error getting Patreon campaign members:', error);
      throw error;
    }
  }
  
  /**
   * Create a post on Patreon
   * @param accessToken OAuth access token
   * @param campaignId Campaign ID
   * @param postData Post data
   * @returns Created post data
   */
  async createPost(accessToken: string, campaignId: string, postData: any): Promise<any> {
    try {
      const url = `${this.apiUrl}/posts`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'post',
            attributes: {
              title: postData.title,
              content: postData.content,
              is_paid: postData.isPaid || true,
              published_at: postData.publishedAt || new Date().toISOString(),
              visibility: postData.visibility || 'public',
              teaser_text: postData.teaserText || '',
              post_type: postData.postType || 'text_only',
              is_public: postData.isPublic || false,
            },
            relationships: {
              campaign: {
                data: {
                  type: 'campaign',
                  id: campaignId
                }
              },
              // Include tier access restrictions if specified
              ...(postData.tierIds && {
                tiers: {
                  data: postData.tierIds.map((id: string) => ({
                    type: 'tier',
                    id
                  }))
                }
              }),
            }
          }
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new PatreonApiError(
          error.errors?.[0]?.detail || 'Failed to create post',
          response.status,
          error.errors?.[0]?.code
        );
      }
      
      return await response.json();
    } catch (error: any) {
      console.error('Error creating Patreon post:', error);
      throw error;
    }
  }
  
  /**
   * Sync Patreon content from database to Patreon
   * @param contentId ID of content in database to sync
   * @returns Result of the sync operation
   */
  async syncContentToPatreon(accessToken: string, campaignId: string, contentId: number): Promise<any> {
    try {
      // Get content from database
      const content = await storage.getPatreonContent(contentId);
      if (!content) {
        throw new PatreonApiError('Content not found', 404, 'content_not_found');
      }
      
      // Only sync content that is ready for publishing
      if (content.status !== 'ready') {
        throw new PatreonApiError(
          'Content is not ready for publishing', 
          400, 
          'content_not_ready'
        );
      }
      
      // Create post on Patreon
      const postData = {
        title: content.title,
        content: content.content || '',
        isPaid: true,
        publishedAt: content.publishDate || new Date().toISOString(),
        visibility: 'public',
        teaserText: content.title,
        postType: 'text_only',
        isPublic: false,
        // Map tier levels to tier IDs (this would need to be configured)
        tierIds: this.getTierIdsForContentLevel(content.tier),
      };
      
      const result = await this.createPost(accessToken, campaignId, postData);
      
      // Update content status in database
      await storage.updatePatreonContent(contentId, {
        status: 'published',
        // You might want to store the Patreon post ID for future reference
      });
      
      return result;
    } catch (error: any) {
      console.error('Error syncing content to Patreon:', error);
      throw error;
    }
  }
  
  /**
   * Map content tier levels to Patreon tier IDs
   * This is a placeholder and would need to be configured with actual tier IDs
   */
  private getTierIdsForContentLevel(tier: string): string[] {
    // This is a placeholder. In a real application, you would maintain a mapping
    // of your tier names to actual Patreon tier IDs.
    const tierMappings: Record<string, string[]> = {
      // Sample mapping - these would be replaced with actual Patreon tier IDs
      'magnolia-seed': ['tier-id-1'],
      'magnolia-sprout': ['tier-id-1', 'tier-id-2'],
      'magnolia-blossom': ['tier-id-1', 'tier-id-2', 'tier-id-3'],
      'magnolia-bloom': ['tier-id-1', 'tier-id-2', 'tier-id-3', 'tier-id-4'],
      'house-of-midnight': ['tier-id-1', 'tier-id-2', 'tier-id-3', 'tier-id-4', 'tier-id-5'],
    };
    
    return tierMappings[tier.toLowerCase()] || [];
  }
  
  /**
   * Check if Patreon integration is properly configured
   */
  isConfigured(): boolean {
    return Boolean(this.clientId && this.clientSecret);
  }
}

export const patreonService = new PatreonService();

/**
 * Express route handler for starting Patreon OAuth flow
 */
export async function initiatePatreonAuth(req: Request, res: Response) {
  try {
    if (!patreonService.isConfigured()) {
      return res.status(500).json({
        error: 'Patreon integration is not configured',
        message: 'Please set PATREON_CLIENT_ID and PATREON_CLIENT_SECRET environment variables'
      });
    }
    
    // Generate a state parameter to prevent CSRF
    const state = Math.random().toString(36).substring(2, 15);
    // In a real application, you would store this state in the session
    req.session.patreonState = state;
    
    const authUrl = patreonService.getAuthUrl(state);
    res.redirect(authUrl);
  } catch (error: any) {
    console.error('Error initiating Patreon auth:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Express route handler for Patreon OAuth callback
 */
export async function handlePatreonCallback(req: Request, res: Response) {
  try {
    const { code, state } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code missing' });
    }
    
    // In a real application, you would verify the state parameter
    // if (state !== req.session.patreonState) {
    //   return res.status(403).json({ error: 'Invalid state parameter' });
    // }
    
    const tokenData = await patreonService.getAccessToken(code.toString());
    
    // In a real application, you would store these tokens securely
    // req.session.patreonAccessToken = tokenData.access_token;
    // req.session.patreonRefreshToken = tokenData.refresh_token;
    
    // Redirect back to the application
    res.redirect('/admin/patreon-integration?success=true');
  } catch (error: any) {
    console.error('Error handling Patreon callback:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Express route handler for getting Patreon campaign info
 */
export async function getPatreonCampaignInfo(req: Request, res: Response) {
  try {
    if (!req.session.patreonAccessToken) {
      return res.status(401).json({ error: 'Not authenticated with Patreon' });
    }
    
    const campaignData = await patreonService.getCampaign(req.session.patreonAccessToken);
    res.json(campaignData);
  } catch (error: any) {
    console.error('Error getting Patreon campaign info:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Express route handler for creating a Patreon post
 */
export async function createPatreonPost(req: Request, res: Response) {
  try {
    if (!req.session.patreonAccessToken) {
      return res.status(401).json({ error: 'Not authenticated with Patreon' });
    }
    
    const { campaignId, postData } = req.body;
    
    if (!campaignId || !postData) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const result = await patreonService.createPost(
      req.session.patreonAccessToken,
      campaignId,
      postData
    );
    
    res.json(result);
  } catch (error: any) {
    console.error('Error creating Patreon post:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Express route handler for syncing content to Patreon
 */
export async function syncContentToPatreon(req: Request, res: Response) {
  try {
    if (!req.session.patreonAccessToken) {
      return res.status(401).json({ error: 'Not authenticated with Patreon' });
    }
    
    const { campaignId, contentId } = req.body;
    
    if (!campaignId || !contentId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const result = await patreonService.syncContentToPatreon(
      req.session.patreonAccessToken,
      campaignId,
      contentId
    );
    
    res.json(result);
  } catch (error: any) {
    console.error('Error syncing content to Patreon:', error);
    res.status(500).json({ error: error.message });
  }
}