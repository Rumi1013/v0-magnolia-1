import { Request, Response } from 'express';
import fetch from 'node-fetch';

const IDEOGRAM_API_ENDPOINT = 'https://api.ideogram.ai/api/v1/images/generations';
const IDEOGRAM_API_KEY = process.env.IDEOGRAM_API_KEY;

/**
 * Generate an image using Ideogram AI
 */
export async function generateImage(req: Request, res: Response) {
  try {
    const { 
      prompt, 
      style = "vintage", 
      aspectRatio = "1:1", 
      negativePrompt = "",
      modelVersion = "6"
    } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Enhance the prompt with Midnight Magnolia brand aesthetics
    const enhancedPrompt = `${prompt}. Southern Gothic style, midnight blue and gold color scheme, vintage aesthetic, magnolia flowers, mystical atmosphere`;
    
    // Enhanced negative prompt to avoid unwanted elements
    const enhancedNegativePrompt = `${negativePrompt} low quality, blurry, distorted faces, unrealistic proportions, oversaturated colors, clip art, cartoon style`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${IDEOGRAM_API_KEY}`
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        style,
        aspect_ratio: aspectRatio,
        negative_prompt: enhancedNegativePrompt,
        model_version: modelVersion
      })
    };

    const response = await fetch(IDEOGRAM_API_ENDPOINT, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate image with Ideogram');
    }

    return res.json({
      imageUrl: data.image_url,
      prompt: enhancedPrompt,
      style,
      aspectRatio
    });
  } catch (error: any) {
    console.error('Error generating image with Ideogram:', error);
    return res.status(500).json({ 
      error: 'Failed to generate image with Ideogram',
      details: error.message 
    });
  }
}

/**
 * Generate multiple style variations of an image
 */
export async function generateImageVariations(req: Request, res: Response) {
  try {
    const { prompt, styles = ["vintage", "art_deco", "cinematic"] } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Enhance the prompt with Midnight Magnolia brand aesthetics
    const enhancedPrompt = `${prompt}. Southern Gothic style, midnight blue and gold color scheme, mystical atmosphere`;

    const results = [];
    const errors = [];

    // Generate an image for each style
    for (const style of styles) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${IDEOGRAM_API_KEY}`
          },
          body: JSON.stringify({
            prompt: enhancedPrompt,
            style,
            aspect_ratio: "1:1",
            negative_prompt: "low quality, blurry, distorted faces, unrealistic proportions"
          })
        };

        const response = await fetch(IDEOGRAM_API_ENDPOINT, requestOptions);
        const data = await response.json();

        if (response.ok && data.image_url) {
          results.push({
            style,
            imageUrl: data.image_url
          });
        } else {
          errors.push({
            style,
            error: data.message || 'Failed to generate image'
          });
        }
      } catch (error: any) {
        errors.push({
          style,
          error: error.message
        });
      }

      // Add a small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return res.json({
      results,
      errors: errors.length > 0 ? errors : undefined,
      prompt: enhancedPrompt
    });
  } catch (error: any) {
    console.error('Error generating image variations with Ideogram:', error);
    return res.status(500).json({ 
      error: 'Failed to generate image variations',
      details: error.message 
    });
  }
}

/**
 * Generate a mood board of multiple related images
 */
export async function generateMoodBoard(req: Request, res: Response) {
  try {
    const { 
      theme, 
      numImages = 4, 
      style = "vintage"
    } = req.body;
    
    if (!theme) {
      return res.status(400).json({ error: 'Theme is required' });
    }

    // Generate varied prompts based on the theme
    const prompts = [
      `${theme} with magnolia flowers and moonlight, southern gothic`,
      `${theme} with spanish moss and old mansion, mystical atmosphere`,
      `${theme} with antique objects and ancient wisdom symbols`,
      `${theme} with ritual elements and sacred space`,
      `${theme} with ancestral connections and heritage symbols`,
      `${theme} with natural elements and seasonal aspects`
    ];

    // Select a subset of prompts based on numImages
    const selectedPrompts = prompts.slice(0, Math.min(numImages, prompts.length));
    
    const results = [];
    const errors = [];

    // Generate an image for each prompt
    for (const prompt of selectedPrompts) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${IDEOGRAM_API_KEY}`
          },
          body: JSON.stringify({
            prompt,
            style,
            aspect_ratio: "1:1",
            negative_prompt: "low quality, blurry, distorted faces, unrealistic proportions"
          })
        };

        const response = await fetch(IDEOGRAM_API_ENDPOINT, requestOptions);
        const data = await response.json();

        if (response.ok && data.image_url) {
          results.push({
            prompt,
            imageUrl: data.image_url
          });
        } else {
          errors.push({
            prompt,
            error: data.message || 'Failed to generate image'
          });
        }
      } catch (error: any) {
        errors.push({
          prompt,
          error: error.message
        });
      }

      // Add a small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    return res.json({
      results,
      errors: errors.length > 0 ? errors : undefined,
      theme
    });
  } catch (error: any) {
    console.error('Error generating mood board with Ideogram:', error);
    return res.status(500).json({ 
      error: 'Failed to generate mood board',
      details: error.message 
    });
  }
}