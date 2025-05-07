import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Error class for OpenAI API errors
export class OpenAIApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 500, code = 'openai_error') {
    super(message);
    this.name = 'OpenAIApiError';
    this.status = status;
    this.code = code;
  }
}

export class OpenAIService {
  /**
   * Generate workflow steps based on a description
   */
  async generateWorkflowSteps(
    prompt: string,
    workflowType: string,
    title?: string,
    description?: string,
    category?: string
  ): Promise<any> {
    try {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert workflow designer specializing in ${workflowType} workflows for content creators in the Southern Gothic aesthetics niche. 
            Your task is to create a detailed step-by-step workflow based on the user's description.
            The steps should include a title, description, and optional assignee, due date, priority, and notes fields.
            For each step, provide:
            1. A clear, actionable title
            2. A brief but specific description of what needs to be done
            3. A recommended priority (low, medium, or high)
            
            Output the steps as a valid JSON array of step objects with the structure:
            {
              "title": "Step Title",
              "description": "Step description",
              "assignee": null,
              "dueDate": null,
              "priority": "medium",
              "status": "not-started",
              "notes": "Optional notes about the step"
            }
            
            Ensure each workflow has a minimum of 5 steps and a maximum of 15 steps.`
          },
          {
            role: "user",
            content: `Create a detailed workflow for: ${prompt}\n\n${
              title ? `The workflow title is: ${title}\n` : ''
            }${description ? `Additional context: ${description}\n` : ''}${
              category ? `This falls under the category: ${category}\n` : ''
            }
            
            Structure it as a step-by-step process that follows best practices for ${workflowType}.`
          }
        ],
        response_format: { type: "json_object" }
      });

      // Parse the response
      const responseContent = response.choices[0].message.content;
      const parsedResponse = JSON.parse(responseContent);
      
      // Check for the expected structure
      if (!parsedResponse.steps || !Array.isArray(parsedResponse.steps)) {
        throw new OpenAIApiError('Invalid response format from OpenAI', 500);
      }
      
      return parsedResponse;
    } catch (error: any) {
      if (error instanceof OpenAIApiError) {
        throw error;
      }
      
      const message = error.response?.data?.error?.message || error.message || 'Unknown error';
      const status = error.response?.status || 500;
      throw new OpenAIApiError(`Error generating workflow steps: ${message}`, status);
    }
  }

  /**
   * Generate a tarot reading prompt based on a query
   */
  async generateTarotReading(
    cardName: string, 
    queryType: 'general' | 'love' | 'career' | 'spiritual' = 'general'
  ): Promise<string> {
    try {
      const prompt = `Create a tarot card reading for the ${cardName} card focused on ${queryType} guidance. 
        The reading should include:
        1. Card symbolism and key elements
        2. General meaning in a ${queryType} context
        3. Three specific insights or messages
        4. A reflective question for the querent to consider
        
        Format the response elegantly with proper paragraph breaks and formatting. 
        The tone should be insightful, mystical but grounded, and compassionate.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      });

      return response.choices[0].message.content?.trim() || "No content generated.";
    } catch (error: any) {
      throw new OpenAIApiError(
        `Failed to generate tarot reading: ${error.message}`,
        error.status || 500
      );
    }
  }

  /**
   * Generate affirmations based on theme and mood
   */
  async generateAffirmations(
    theme: string,
    count: number = 5,
    mood: string = 'positive'
  ): Promise<string[]> {
    try {
      const prompt = `Generate ${count} powerful affirmations centered around the theme of "${theme}" with a ${mood} tone.
        Each affirmation should be:
        1. Concise and impactful (15 words or less)
        2. Written in present tense
        3. Positive and empowering
        4. Free of cliches
        
        Format your response as a JSON array of strings, with each string containing a single affirmation.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content?.trim() || "{}";
      const parsedResponse = JSON.parse(content);
      
      if (Array.isArray(parsedResponse.affirmations)) {
        return parsedResponse.affirmations;
      } else {
        // Parse the response in case it's not in the expected format
        const text = response.choices[0].message.content || "";
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        return lines.slice(0, count);
      }
    } catch (error: any) {
      throw new OpenAIApiError(
        `Failed to generate affirmations: ${error.message}`,
        error.status || 500
      );
    }
  }

  /**
   * Generate a content brief for a specific type of content
   */
  async generateContentBrief(
    contentType: string,
    theme: string,
    additionalContext: string = ""
  ): Promise<any> {
    try {
      const prompt = `Create a detailed content brief for a ${contentType} centered around the theme of "${theme}".
        ${additionalContext ? "Additional context: " + additionalContext : ""}
        
        Include the following sections:
        1. Title ideas (3-5 options)
        2. Key points to cover
        3. Structure/outline
        4. Target audience
        5. Keywords/phrases
        6. Tone and style guidelines
        7. Recommended length
        
        Format your response as a JSON object with these sections as keys.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content?.trim() || "{}";
      return JSON.parse(content);
    } catch (error: any) {
      throw new OpenAIApiError(
        `Failed to generate content brief: ${error.message}`,
        error.status || 500
      );
    }
  }

  /**
   * Generate a product description for listing
   */
  async generateProductDescription(
    productType: string,
    title: string,
    features: string[],
    targetAudience: string
  ): Promise<string> {
    try {
      const featuresText = features.join(", ");
      
      const prompt = `Write a compelling product description for a ${productType} titled "${title}".
        Features/Benefits: ${featuresText}
        Target Audience: ${targetAudience}
        
        The description should be:
        1. Engaging and evocative
        2. Highlight the unique value and benefits
        3. Connect emotionally with the target audience
        4. Between 150-200 words
        5. Include at least one call-to-action
        
        The tone should be mystical, warm, and inviting - in line with a spiritual/wellness brand called "Midnight Magnolia".`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      });

      return response.choices[0].message.content?.trim() || "No description generated.";
    } catch (error: any) {
      throw new OpenAIApiError(
        `Failed to generate product description: ${error.message}`,
        error.status || 500
      );
    }
  }

  /**
   * Generate prompts for image creation
   */
  async generateImagePrompts(
    subject: string,
    style: string,
    count: number = 3
  ): Promise<string[]> {
    try {
      const prompt = `Create ${count} detailed image generation prompts for ${subject} in a ${style} style.
        
        Each prompt should:
        1. Be highly detailed and specific
        2. Include suggestions for composition, lighting, mood, and color palette
        3. Reference specific artistic techniques relevant to the style
        4. Be optimized for AI image generators
        
        Format your response as a JSON array of strings, with each string containing a complete image prompt.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content?.trim() || "{}";
      const parsedResponse = JSON.parse(content);
      
      if (Array.isArray(parsedResponse.prompts)) {
        return parsedResponse.prompts;
      } else {
        // Parse the response in case it's not in the expected format
        const text = response.choices[0].message.content || "";
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        return lines.slice(0, count);
      }
    } catch (error: any) {
      throw new OpenAIApiError(
        `Failed to generate image prompts: ${error.message}`,
        error.status || 500
      );
    }
  }

  /**
   * Generate a printable worksheet structure
   */
  async generateWorksheetStructure(
    topic: string,
    purpose: string
  ): Promise<any> {
    try {
      const prompt = `Design a printable worksheet about "${topic}" for the purpose of "${purpose}".
        
        The worksheet should include:
        1. A compelling title
        2. An introduction paragraph explaining how to use the worksheet
        3. 5-8 exercises/prompts/activities (with clear instructions for each)
        4. Any necessary sections, tables, or spaces for writing
        5. A reflection section at the end
        
        Format your response as a JSON object with sections for title, introduction, exercises (array), and reflection.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content?.trim() || "{}";
      return JSON.parse(content);
    } catch (error: any) {
      throw new OpenAIApiError(
        `Failed to generate worksheet structure: ${error.message}`,
        error.status || 500
      );
    }
  }

  /**
   * Generate content ideas based on moon phase
   */
  async generateMoonPhaseContent(
    phase: string,
    contentType: string = 'general'
  ): Promise<any> {
    try {
      const prompt = `Generate content ideas for the ${phase} moon phase, focused on ${contentType} content.
        
        Include the following:
        1. 3-5 content themes aligned with this moon phase's energy
        2. Key words and phrases associated with this phase
        3. Recommended activities or practices for this phase
        4. Content structures or formats that would work well
        
        Format your response as a JSON object with sections for themes, keywords, activities, and formats.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content?.trim() || "{}";
      return JSON.parse(content);
    } catch (error: any) {
      throw new OpenAIApiError(
        `Failed to generate moon phase content: ${error.message}`,
        error.status || 500
      );
    }
  }
}

export const openaiService = new OpenAIService();