/**
 * Patreon API integration for Midnight Magnolia
 * 
 * This file provides integration with the Patreon API for content publishing
 * and member management. It includes functions for authentication, campaign
 * access, content publishing, and member data access.
 */

import { Request, Response } from 'express';
import fetch from 'node-fetch';

// Patreon API base URLs
const PATREON_API_BASE = 'https://www.patreon.com/api/oauth2/v2';
const PATREON_OAUTH_BASE = 'https://www.patreon.com/oauth2';

// Check for required environment variables
if (!process.env.PATREON_CLIENT_ID || !process.env.PATREON_CLIENT_SECRET) {
  console.warn('Missing Patreon API credentials. Patreon functionality will be limited.');
}

// Store active access tokens (in a real implementation, these would be stored in the database)
// These are just for reference; actual tokens should be stored securely
interface PatreonTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number; // timestamp
}

let patreonTokens: PatreonTokens | null = null;

/**
 * Start the Patreon OAuth flow
 */
export function initiatePatreonAuth(req: Request, res: Response) {
  if (!process.env.PATREON_CLIENT_ID) {
    return res.status(503).json({ 
      error: 'Patreon integration not configured. Please check your environment variables.' 
    });
  }

  // Redirect URL will be the same domain with /api/patreon/callback path
  const host = req.get('host');
  const protocol = req.protocol;
  const redirectUri = `${protocol}://${host}/api/patreon/callback`;
  
  // Encode the redirect URI
  const encodedRedirectUri = encodeURIComponent(redirectUri);
  
  // Create the authorization URL with required scopes
  const scopes = [
    'identity',
    'identity[email]',
    'campaigns',
    'campaigns.posts',
    'campaigns.members'
  ].join(' ');
  
  const authUrl = `${PATREON_OAUTH_BASE}/authorize?response_type=code&client_id=${process.env.PATREON_CLIENT_ID}&redirect_uri=${encodedRedirectUri}&scope=${encodeURIComponent(scopes)}`;
  
  // Redirect to Patreon for authorization
  res.redirect(authUrl);
}

/**
 * Handle the Patreon OAuth callback
 */
export async function handlePatreonCallback(req: Request, res: Response) {
  if (!process.env.PATREON_CLIENT_ID || !process.env.PATREON_CLIENT_SECRET) {
    return res.status(503).json({ 
      error: 'Patreon integration not configured. Please check your environment variables.' 
    });
  }

  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' });
    }
    
    // Prepare token exchange parameters
    const host = req.get('host');
    const protocol = req.protocol;
    const redirectUri = `${protocol}://${host}/api/patreon/callback`;
    
    // Exchange authorization code for tokens
    const response = await fetch(`${PATREON_OAUTH_BASE}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'client_id': process.env.PATREON_CLIENT_ID,
        'client_secret': process.env.PATREON_CLIENT_SECRET,
        'code': code as string,
        'grant_type': 'authorization_code',
        'redirect_uri': redirectUri
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Failed to exchange code for token: ${data.error}`);
    }
    
    // Store tokens (in a real implementation, store these in a secure database)
    patreonTokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + (data.expires_in * 1000)
    };
    
    // Create a success page with redirect to admin dashboard
    res.send(`
      <html>
        <head>
          <title>Patreon Connected</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #0A192F;
              color: #FAF3E0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              padding: 20px;
              text-align: center;
            }
            .container {
              max-width: 500px;
              padding: 40px;
              background-color: #142641;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }
            h1 {
              color: #D4AF37;
              margin-top: 0;
            }
            p {
              margin-bottom: 25px;
              line-height: 1.6;
            }
            .button {
              background-color: #D4AF37;
              color: #0A192F;
              border: none;
              padding: 12px 24px;
              border-radius: 4px;
              font-weight: 600;
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
            }
            .button:hover {
              background-color: #C9A227;
            }
          </style>
          <script>
            // Redirect to dashboard after 5 seconds
            setTimeout(() => {
              window.location.href = '/admin/workflows';
            }, 5000);
          </script>
        </head>
        <body>
          <div class="container">
            <h1>Patreon Connected Successfully</h1>
            <p>Your Midnight Magnolia account is now connected to Patreon. You can now access campaign data and publish content directly from the dashboard.</p>
            <a href="/admin/workflows" class="button">Return to Dashboard</a>
          </div>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error('Error handling Patreon callback:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Get Patreon campaign information
 */
export async function getPatreonCampaignInfo(req: Request, res: Response) {
  if (!patreonTokens) {
    return res.status(401).json({ 
      error: 'Not authenticated with Patreon',
      auth_url: '/api/patreon/auth'
    });
  }

  try {
    // Check if token is expired and refresh if needed
    if (Date.now() > patreonTokens.expires_at) {
      await refreshPatreonToken();
    }
    
    // Fetch campaign data with included tiers and relevant fields
    const response = await fetch(
      `${PATREON_API_BASE}/campaigns?include=tiers&fields[campaign]=name,url,summary,creation_name,patron_count,discord_server_id&fields[tier]=title,description,amount_cents,published`, 
      {
        headers: {
          'Authorization': `Bearer ${patreonTokens.access_token}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch campaign: ${response.statusText}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error('Error getting Patreon campaign:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Create a post on Patreon
 */
export async function createPatreonPost(req: Request, res: Response) {
  if (!patreonTokens) {
    return res.status(401).json({ 
      error: 'Not authenticated with Patreon',
      auth_url: '/api/patreon/auth'
    });
  }

  try {
    // Check if token is expired and refresh if needed
    if (Date.now() > patreonTokens.expires_at) {
      await refreshPatreonToken();
    }
    
    const { campaignId, post } = req.body;
    
    if (!campaignId || !post) {
      return res.status(400).json({ error: 'Campaign ID and post details are required' });
    }
    
    // Validate required post fields
    if (!post.title || !post.content) {
      return res.status(400).json({ error: 'Post title and content are required' });
    }
    
    // Prepare post data
    const postData: any = {
      data: {
        type: 'post',
        attributes: {
          title: post.title,
          content: post.content,
          is_paid: post.isPaid !== undefined ? post.isPaid : true
        },
        relationships: {
          campaign: {
            data: {
              type: 'campaign',
              id: campaignId
            }
          }
        }
      }
    };
    
    // Add optional fields if provided
    if (post.teaserText) {
      postData.data.attributes.teaser_text = post.teaserText;
    }
    
    if (post.isPublic !== undefined) {
      postData.data.attributes.is_public = post.isPublic;
    }
    
    if (post.publishedAt) {
      postData.data.attributes.published_at = post.publishedAt;
    }
    
    // Add tier access if provided
    if (post.tierIds && post.tierIds.length > 0) {
      postData.data.relationships.tiers = {
        data: post.tierIds.map((id: string) => ({
          type: 'tier',
          id
        }))
      };
    }
    
    // Create the post
    const response = await fetch(`${PATREON_API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${patreonTokens.access_token}`,
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create post: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    res.status(201).json(data);
  } catch (err: any) {
    console.error('Error creating Patreon post:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Sync content from database to Patreon
 * This function takes content from our database and publishes it to Patreon
 */
export async function syncContentToPatreon(req: Request, res: Response) {
  if (!patreonTokens) {
    return res.status(401).json({ 
      error: 'Not authenticated with Patreon',
      auth_url: '/api/patreon/auth'
    });
  }

  try {
    // Check if token is expired and refresh if needed
    if (Date.now() > patreonTokens.expires_at) {
      await refreshPatreonToken();
    }
    
    const { campaignId, contentIds } = req.body;
    
    if (!campaignId || !contentIds || !Array.isArray(contentIds)) {
      return res.status(400).json({ 
        error: 'Campaign ID and array of content IDs are required' 
      });
    }
    
    // In a real implementation, you would fetch the content items from your database
    // For this example, we'll assume the content is passed in the request
    
    const results = [];
    const errors = [];
    
    // Process each content item
    for (const contentId of contentIds) {
      try {
        // Fetch content from database (placeholder for demo)
        const content = await fetchContentById(contentId);
        
        // Create a post for this content
        const postData = {
          data: {
            type: 'post',
            attributes: {
              title: content.title,
              content: content.content,
              is_paid: content.isPaid,
              teaser_text: content.teaserText || content.content.substring(0, 100) + '...'
            },
            relationships: {
              campaign: {
                data: {
                  type: 'campaign',
                  id: campaignId
                }
              }
            }
          }
        };
        
        // Add tier access if defined
        if (content.tierIds && content.tierIds.length > 0) {
          postData.data.relationships.tiers = {
            data: content.tierIds.map((id: string) => ({
              type: 'tier',
              id
            }))
          };
        }
        
        // Create the post
        const response = await fetch(`${PATREON_API_BASE}/posts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${patreonTokens.access_token}`,
            'Content-Type': 'application/vnd.api+json'
          },
          body: JSON.stringify(postData)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create post: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Update the content status in our database
        await updateContentStatus(contentId, 'published', data.data.id);
        
        results.push({
          contentId,
          status: 'success',
          patreonPostId: data.data.id
        });
      } catch (err: any) {
        console.error(`Error syncing content ${contentId}:`, err);
        errors.push({
          contentId,
          error: err.message
        });
      }
    }
    
    res.json({
      success: errors.length === 0,
      results,
      errors
    });
  } catch (err: any) {
    console.error('Error syncing content to Patreon:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Refresh the Patreon access token
 */
async function refreshPatreonToken(): Promise<void> {
  if (!process.env.PATREON_CLIENT_ID || !process.env.PATREON_CLIENT_SECRET || !patreonTokens) {
    throw new Error('Missing Patreon credentials or refresh token');
  }

  try {
    const response = await fetch(`${PATREON_OAUTH_BASE}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'client_id': process.env.PATREON_CLIENT_ID,
        'client_secret': process.env.PATREON_CLIENT_SECRET,
        'refresh_token': patreonTokens.refresh_token,
        'grant_type': 'refresh_token'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Update tokens
    patreonTokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token || patreonTokens.refresh_token,
      expires_at: Date.now() + (data.expires_in * 1000)
    };
    
    console.log('Patreon token refreshed successfully');
  } catch (err) {
    console.error('Error refreshing Patreon token:', err);
    // Reset tokens so the user needs to authenticate again
    patreonTokens = null;
    throw err;
  }
}

// Mock function to fetch content by ID (in production, this would use your database)
async function fetchContentById(contentId: string | number): Promise<any> {
  // In a real implementation, fetch from database
  // For this example, return mock data
  return {
    id: contentId,
    title: `Sample Content ${contentId}`,
    content: `This is sample content with ID ${contentId} that would be fetched from the database.`,
    isPaid: true,
    teaserText: `A preview of content ${contentId}...`,
    tierIds: [] // Default to all patrons
  };
}

// Mock function to update content status (in production, this would update your database)
async function updateContentStatus(contentId: string | number, status: string, patreonPostId?: string): Promise<void> {
  // In a real implementation, update the database
  console.log(`Updated content ${contentId} status to ${status} with Patreon post ID ${patreonPostId}`);
}