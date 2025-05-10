
import OpenAI from "openai";
import { OpenAIApiError } from "./openai";

export class AgentOrchestrator {
  private openai: OpenAI;

  constructor(openai: OpenAI) {
    this.openai = openai;
  }

  async orchestrateWorkflow(task: string, context: any = {}) {
    try {
      // Planning agent determines steps
      const plannerResponse = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a workflow planning agent. Break down tasks into discrete steps."
          },
          {
            role: "user",
            content: `Plan steps for: ${task}\nContext: ${JSON.stringify(context)}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const plan = JSON.parse(plannerResponse.choices[0].message.content || "{}");

      // Execution agent carries out steps
      const results = [];
      for (const step of plan.steps) {
        const executorResponse = await this.openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system", 
              content: "You are an execution agent. Complete the assigned task step."
            },
            {
              role: "user",
              content: `Complete step: ${step.description}\nContext: ${JSON.stringify(step.context)}`
            }
          ]
        });

        results.push({
          step: step.description,
          result: executorResponse.choices[0].message.content
        });
      }

      return {
        plan,
        results
      };
    } catch (error: any) {
      throw new OpenAIApiError(
        `Agent orchestration failed: ${error.message}`,
        error.status || 500
      );
    }
  }
}
