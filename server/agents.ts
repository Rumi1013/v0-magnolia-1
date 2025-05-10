
import OpenAI from "openai";
import { OpenAIApiError } from "./openai";

export interface GPTAction {
  name: string;
  description: string;
  parameters: Record<string, any>;
  handler: (params: any) => Promise<any>;
}

class AgentOrchestrator {
  private openai: OpenAI;
  private actions: Map<string, GPTAction>;

  constructor(openai: OpenAI) {
    this.openai = openai;
    this.actions = new Map();
    this.registerDefaultActions();
  }

  private registerDefaultActions() {
    // Register workflow management actions
    this.registerAction({
      name: "create_workflow",
      description: "Create a new workflow",
      parameters: {
        name: "string",
        description: "string",
        steps: "array"
      },
      handler: async (params) => {
        return workflowService.createWorkflow(params);
      }
    });

    // Register content generation action
    this.registerAction({
      name: "generate_content",
      description: "Generate content using OpenAI",
      parameters: {
        type: "string",
        topic: "string",
        style: "string"
      },
      handler: async (params) => {
        return openaiService.generateContentBrief(params.type, params.topic);
      }
    });
  }

  registerAction(action: GPTAction) {
    this.actions.set(action.name, action);
  }

  async orchestrateWorkflow(task: string, context: any = {}) {
    try {
      // Prepare available actions for the planning agent
      const availableActions = Array.from(this.actions.entries()).map(([name, action]) => ({
        name,
        description: action.description,
        parameters: action.parameters
      }));

      // Planning agent determines steps with available actions
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
        // Check if step requires an action
        if (step.action && this.actions.has(step.action)) {
          const action = this.actions.get(step.action)!;
          const result = await action.handler(step.parameters);
          results.push({
            step: step.description,
            result,
            action: step.action
          });
          continue;
        }

        // Default to GPT response if no action specified
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
