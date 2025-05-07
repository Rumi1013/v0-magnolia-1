import OpenAI from "openai";

// Get the OpenAI API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AstrologyError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 500, code = "astrology_error") {
    super(message);
    this.status = status;
    this.code = code;
    Object.setPrototypeOf(this, AstrologyError.prototype);
  }
}

export class AstrologyService {
  /**
   * Generate a birth chart image and interpretation
   */
  async generateBirthChart(
    name: string,
    birthDate: string,
    birthTime: string,
    birthLocation: string,
    chartType: string = "natal"
  ) {
    try {
      // This would normally use a real astrology API, but for now we'll simulate it
      // with AI-generated content and a placeholder image
      
      // Generate birth chart interpretation using OpenAI
      const promptText = `Create a detailed ${chartType} astrological chart interpretation for a person named ${name} 
        born on ${birthDate} at ${birthTime} in ${birthLocation}. 
        Use a Southern Gothic style with references to magnolias, moonlight, and mystical elements. 
        Structure the interpretation with the following sections:
        1. Overall Chart Energy
        2. Sun, Moon, and Rising Signs
        3. Major Planetary Aspects
        4. Key Houses and Placements
        5. Life Path Potential
        Format the response with HTML tags for better display.`;

      const interpretation = await this.generateInterpretation(promptText);
      
      // For a real implementation, we would generate an actual birth chart
      // But for now we'll just return a placeholder image URL
      // In a production environment, this would call an actual astrology API service
      const chartImageUrl = this.getPlaceholderChartImage(chartType);

      return {
        chartImage: chartImageUrl,
        interpretation: interpretation,
        chartData: {
          name,
          birthDate,
          birthTime,
          birthLocation,
          chartType
        }
      };
    } catch (error: any) {
      console.error("Error generating birth chart:", error);
      throw new AstrologyError(
        error.message || "Failed to generate birth chart",
        500
      );
    }
  }

  /**
   * Generate interpretation text using OpenAI
   */
  private async generateInterpretation(prompt: string): Promise<string> {
    try {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert astrologer with a Southern Gothic aesthetic. Your interpretations blend traditional astrology with poetic, mystical language that evokes the Southern Gothic genre. Use HTML formatting to structure your response."
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 1000,
      });

      return response.choices[0].message.content || "";
    } catch (error: any) {
      console.error("Error generating interpretation:", error);
      throw new AstrologyError(
        error.message || "Failed to generate interpretation",
        500
      );
    }
  }

  /**
   * Get a placeholder image for a birth chart
   */
  private getPlaceholderChartImage(chartType: string): string {
    // In a real implementation, this would be replaced with actual chart generation
    // For now, we'll return placeholder URLs that look like birth charts
    const chartImages = {
      natal: "https://www.astro.com/im/circle/ah/aho5_e.gif",
      transit: "https://www.astro.com/im/circle/ah/aho52_e.gif",
      synastry: "https://www.astro.com/im/circle/ah/ahs_e.gif",
      composite: "https://www.astro.com/im/circle/ah/ahm_e.gif",
      "solar-return": "https://www.astro.com/im/circle/ah/ahr_e.gif"
    };

    return chartImages[chartType as keyof typeof chartImages] || chartImages.natal;
  }
}

export const astrologyService = new AstrologyService();