import { Request, Response } from 'express';
import fetch from 'node-fetch';

const REPLICATE_API_ENDPOINT = 'https://api.replicate.com/v1/predictions';
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;

/**
 * Generic function to run any Replicate model
 */
export async function runReplicateModel(req: Request, res: Response) {
  try {
    const { modelVersion, input } = req.body;
    
    if (!modelVersion || !input) {
      return res.status(400).json({ error: 'Model version and input are required' });
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${REPLICATE_API_KEY}`
      },
      body: JSON.stringify({
        version: modelVersion,
        input
      })
    };

    // Start the prediction
    const startResponse = await fetch(REPLICATE_API_ENDPOINT, requestOptions);
    const prediction = await startResponse.json();

    if (!startResponse.ok) {
      throw new Error(prediction.detail || 'Failed to start prediction');
    }

    // Get the prediction ID
    const predictionId = prediction.id;

    // Poll for results
    let result;
    let status = 'starting';
    let attempts = 0;
    const maxAttempts = 60; // Maximum polling attempts (up to 5 minutes with 5-second intervals)

    while (status !== 'succeeded' && status !== 'failed' && attempts < maxAttempts) {
      // Wait for 5 seconds between polling attempts
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Check prediction status
      const statusResponse = await fetch(`${REPLICATE_API_ENDPOINT}/${predictionId}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_KEY}`
        }
      });
      
      result = await statusResponse.json();
      status = result.status;
      attempts++;
    }

    if (status === 'succeeded') {
      return res.json({
        output: result.output,
        modelVersion,
        input
      });
    } else if (status === 'failed') {
      throw new Error(result.error || 'Prediction failed');
    } else {
      throw new Error('Prediction timed out');
    }
  } catch (error: any) {
    console.error('Error running Replicate model:', error);
    return res.status(500).json({ 
      error: 'Failed to run Replicate model',
      details: error.message 
    });
  }
}

/**
 * Generate an image using Stable Diffusion
 */
export async function generateImageWithStableDiffusion(req: Request, res: Response) {
  try {
    const { 
      prompt, 
      negativePrompt = "low quality, blurry, distorted", 
      width = 768, 
      height = 768,
      numInferenceSteps = 30,
      guidanceScale = 7.5
    } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Enhance the prompt with Midnight Magnolia brand aesthetics
    const enhancedPrompt = `${prompt}, Southern Gothic style, midnight blue and gold color scheme, vintage aesthetic, mystical atmosphere, magnolia flowers, detailed, atmospheric lighting`;

    // Use Stable Diffusion XL
    const modelVersion = "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316";
    
    const input = {
      prompt: enhancedPrompt,
      negative_prompt: negativePrompt,
      width,
      height,
      num_inference_steps: numInferenceSteps,
      guidance_scale: guidanceScale
    };

    req.body = { modelVersion, input };
    return runReplicateModel(req, res);
  } catch (error: any) {
    console.error('Error generating image with Stable Diffusion:', error);
    return res.status(500).json({ 
      error: 'Failed to generate image with Stable Diffusion',
      details: error.message 
    });
  }
}

/**
 * Generate music with MusicGen
 */
export async function generateMusic(req: Request, res: Response) {
  try {
    const { 
      prompt, 
      duration = 8
    } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Enhance the prompt with Midnight Magnolia brand aesthetics
    const enhancedPrompt = `${prompt}, southern gothic, ethereal, mystical, hauntingly beautiful, vintage, atmospheric`;

    // Use Meta's MusicGen
    const modelVersion = "meta/musicgen:7a76a8258b7be33f9753e92ca86d33fd685698d82b8cd1c7f3cf9b5a8384657b";
    
    const input = {
      prompt: enhancedPrompt,
      duration,
      output_format: "mp3"
    };

    req.body = { modelVersion, input };
    return runReplicateModel(req, res);
  } catch (error: any) {
    console.error('Error generating music:', error);
    return res.status(500).json({ 
      error: 'Failed to generate music',
      details: error.message 
    });
  }
}

/**
 * Generate a tarot reading with a specialized model
 */
export async function generateTarotReading(req: Request, res: Response) {
  try {
    const { question, spread = "three-card" } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Use a Large Language Model for tarot reading
    const modelVersion = "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3";
    
    let promptTemplate = "";
    
    if (spread === "single-card") {
      promptTemplate = `
        You are a skilled tarot reader with a Southern Gothic aesthetic. Draw a single tarot card to answer this question: "${question}"
        
        First, name the card you've drawn. Then provide a detailed interpretation that includes:
        1. The traditional meaning of this card
        2. How it specifically relates to the question
        3. The card's symbolism and imagery
        4. Advice based on this card
        
        Include mystical and Southern Gothic elements in your reading. Be poetic but insightful.
      `;
    } else if (spread === "three-card") {
      promptTemplate = `
        You are a skilled tarot reader with a Southern Gothic aesthetic. Draw three tarot cards for a past-present-future spread to answer this question: "${question}"
        
        For each card, provide:
        1. The name of the card
        2. The position (past, present, or future)
        3. The traditional meaning of this card in this position
        4. How it relates to the question
        
        After interpreting each card individually, provide an overall reading that synthesizes all three cards together.
        
        Include mystical and Southern Gothic elements in your reading. Be poetic but insightful.
      `;
    } else if (spread === "celtic-cross") {
      promptTemplate = `
        You are a skilled tarot reader with a Southern Gothic aesthetic. Perform a Celtic Cross tarot spread to answer this question: "${question}"
        
        Name each card and its position in the spread, then provide a brief interpretation for each. After covering all ten positions, synthesize the entire reading into a cohesive narrative.
        
        Include mystical and Southern Gothic elements in your reading. Be poetic but insightful.
      `;
    }

    const input = {
      prompt: promptTemplate,
      system_prompt: "You are an expert tarot reader with decades of experience, specializing in Southern Gothic aesthetics and ancestral wisdom. Your readings are insightful, thoughtful, and spiritually meaningful without being cliché.",
      max_tokens: 2048
    };

    req.body = { modelVersion, input };
    return runReplicateModel(req, res);
  } catch (error: any) {
    console.error('Error generating tarot reading:', error);
    return res.status(500).json({ 
      error: 'Failed to generate tarot reading',
      details: error.message 
    });
  }
}