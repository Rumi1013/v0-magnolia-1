import Anthropic from '@anthropic-ai/sdk';
import { Request, Response } from 'express';

// the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Generate content using Claude
 */
export async function generateContentWithClaude(req: Request, res: Response) {
  try {
    const { prompt, contentType, maxTokens = 1000 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Create system prompt based on content type
    let systemPrompt = "You are a creative content generator for the Midnight Magnolia brand.";
    
    switch (contentType) {
      case 'affirmation':
        systemPrompt += " Create a powerful, poetic affirmation that balances Southern Gothic aesthetics with spiritual wisdom. Use rich, evocative language that inspires self-reflection.";
        break;
      case 'tarotReading':
        systemPrompt += " Create a detailed tarot card reading interpretation that incorporates Southern Gothic themes and ancestral wisdom. Be insightful, nuanced, and emotionally resonant.";
        break;
      case 'journalPrompt':
        systemPrompt += " Create a thought-provoking journal prompt that encourages deep self-reflection, ancestral connection, and spiritual growth within a Southern Gothic aesthetic.";
        break;
      case 'ritualDescription':
        systemPrompt += " Create a beautiful ritual description that incorporates elements of nature, ancestry, and Southern Gothic aesthetics. Include specific steps, ingredients, and intentions.";
        break;
      case 'productDescription':
        systemPrompt += " Create a captivating product description for a mystical/spiritual product that appeals to seekers interested in Southern Gothic aesthetics and soulful practices.";
        break;
      default:
        systemPrompt += " Create beautiful, evocative content that balances Southern Gothic aesthetics with spiritual wisdom.";
    }

    // Add brand context to system prompt
    systemPrompt += " The Midnight Magnolia brand combines Southern Gothic aesthetics with spiritual guidance, ancestral wisdom, and modern mysticism. The tone should be thoughtful, evocative, and authentic - never cheesy or superficial. The brand colors are Midnight Blue, Magnolia White, Rich Gold, and Sage Green.";

    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
    });

    return res.json({
      content: response.content[0].text,
      contentType,
      prompt
    });
  } catch (error: any) {
    console.error('Error generating content with Claude:', error);
    return res.status(500).json({ 
      error: 'Failed to generate content with Claude',
      details: error.message 
    });
  }
}

/**
 * Analyze an image using Claude
 */
export async function analyzeImageWithClaude(req: Request, res: Response) {
  try {
    const { imageBase64, prompt } = req.body;
    
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const userPrompt = prompt || "Analyze this image in detail and describe its key elements, context, mood, and any notable aspects.";

    const response = await anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: userPrompt
          },
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: imageBase64.replace(/^data:image\/\w+;base64,/, '') // Remove data URL prefix if present
            }
          }
        ]
      }]
    });

    return res.json({
      analysis: response.content[0].text
    });
  } catch (error: any) {
    console.error('Error analyzing image with Claude:', error);
    return res.status(500).json({ 
      error: 'Failed to analyze image with Claude',
      details: error.message 
    });
  }
}

/**
 * Generate a content brief using Claude
 */
export async function generateContentBrief(req: Request, res: Response) {
  try {
    const { 
      contentType, 
      primaryTheme, 
      secondaryThemes, 
      targetAudience, 
      contentLength,
      additionalNotes 
    } = req.body;
    
    if (!contentType || !primaryTheme) {
      return res.status(400).json({ error: 'Content type and primary theme are required' });
    }

    const prompt = `
      I need to create ${contentType} content about ${primaryTheme}.
      ${secondaryThemes ? `Secondary themes to include: ${secondaryThemes}.` : ''}
      ${targetAudience ? `Target audience: ${targetAudience}.` : ''}
      ${contentLength ? `Approximate length: ${contentLength}.` : ''}
      ${additionalNotes ? `Additional notes: ${additionalNotes}.` : ''}
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 1500,
      system: "You are a content strategist for the Midnight Magnolia brand, which combines Southern Gothic aesthetics with spiritual guidance, ancestral wisdom, and modern mysticism. Create a detailed content brief that outlines the key points, structure, tone, and specific elements to include. The brief should be comprehensive enough for a content creator to produce a complete piece from your guidance.",
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
    });

    return res.json({
      brief: response.content[0].text,
      contentType,
      primaryTheme
    });
  } catch (error: any) {
    console.error('Error generating content brief with Claude:', error);
    return res.status(500).json({ 
      error: 'Failed to generate content brief',
      details: error.message 
    });
  }
}

/**
 * Sentiment analysis using Claude
 */
export async function analyzeSentiment(req: Request, res: Response) {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required for sentiment analysis' });
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      system: `You're a Customer Insights AI. Analyze this feedback and output in JSON format with keys: "sentiment" (positive/negative/neutral), "confidence" (number, 0 through 1), "tone" (array of emotional tones detected), "highlights" (key phrases worth noting), and "summary" (brief overview of sentiment).`,
      max_tokens: 1000,
      messages: [
        { role: 'user', content: text }
      ],
    });

    try {
      const result = JSON.parse(response.content[0].text);
      return res.json(result);
    } catch (parseError) {
      return res.status(500).json({ 
        error: 'Failed to parse sentiment analysis result',
        details: 'The AI response was not in valid JSON format',
        rawResponse: response.content[0].text
      });
    }
  } catch (error: any) {
    console.error('Error analyzing sentiment with Claude:', error);
    return res.status(500).json({ 
      error: 'Failed to analyze sentiment',
      details: error.message 
    });
  }
}