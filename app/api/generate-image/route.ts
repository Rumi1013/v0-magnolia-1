import { type NextRequest, NextResponse } from "next/server"
import * as fal from "@fal-ai/serverless-client"

// Initialize the Fal AI client
fal.config({
  credentials: {
    key: process.env.FAL_KEY,
  },
})

// Define aspect ratio dimensions
const aspectRatioDimensions: Record<string, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "4:3": { width: 1024, height: 768 },
  "16:9": { width: 1024, height: 576 },
  "9:16": { width: 576, height: 1024 },
  "3:2": { width: 1024, height: 683 },
}

// Define style preset prompts
const stylePresetPrompts: Record<string, string> = {
  "southern-gothic": "Southern Gothic style, moody, atmospheric, Spanish moss, old plantation houses",
  "magnolia-bloom": "Soft, elegant, magnolia flowers, pastel colors, delicate details",
  "digital-art": "Digital art style, vibrant colors, modern, sleek, tech-inspired",
  watercolor: "Watercolor painting style, soft edges, flowing colors, artistic, hand-painted",
  photorealistic: "Photorealistic, detailed, high resolution, realistic lighting and textures",
  vintage: "Vintage photography, sepia tones, nostalgic, retro, old-fashioned",
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, negativePrompt, stylePreset, aspectRatio, creativityLevel } = await req.json()

    // Get dimensions based on aspect ratio
    const dimensions = aspectRatioDimensions[aspectRatio] || aspectRatioDimensions["1:1"]

    // Enhance prompt with style preset
    const stylePrompt = stylePresetPrompts[stylePreset] || ""
    const enhancedPrompt = `${prompt}. ${stylePrompt}`

    // Generate image using Fal AI
    const result = await fal.run("fal-ai/fast-sdxl", {
      input: {
        prompt: enhancedPrompt,
        negative_prompt: negativePrompt || "blurry, distorted, low quality, ugly, deformed",
        width: dimensions.width,
        height: dimensions.height,
        guidance_scale: 7.5,
        num_inference_steps: 30,
        seed: Math.floor(Math.random() * 1000000),
        scheduler: "K_EULER",
        apply_watermark: false,
        high_noise_frac: creativityLevel || 0.7,
      },
    })

    // Return the generated image URL
    return NextResponse.json({ imageUrl: result.images[0].url })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: "Failed to generate image. Please try again." }, { status: 500 })
  }
}
