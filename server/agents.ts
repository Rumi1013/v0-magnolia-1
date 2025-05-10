
import OpenAI from "openai";
import { OpenAIApiError } from "./openai";
import { workflowService } from "./workflow";
import { openaiService } from "./openai";

export interface GPTAction {
  name: string;
  description: string;
  parameters: Record<string, any>;
  handler: (params: any) => Promise<any>;
}

interface ToolCall {
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string;
  };
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
    this.registerAction({
      name: "create_workflow",
      description: "Create a new workflow with given steps",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          steps: { type: "array", items: { type: "string" } }
        },
        required: ["name", "description", "steps"]
      },
      handler: async (params) => {
        return workflowService.createWorkflow(params);
      }
    });

    this.registerAction({
      name: "generate_content",
      description: "Generate content using AI",
      parameters: {
        type: "object",
        properties: {
          type: { type: "string" },
          topic: { type: "string" },
          style: { type: "string", default: "mystical" }
        },
        required: ["type", "topic"]
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
      const availableTools = Array.from(this.actions.entries()).map(([name, action]) => ({
        type: "function",
        function: {
          name,
          description: action.description,
          parameters: action.parameters
        }
      }));

      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a workflow assistant that helps break down tasks and execute them using available tools."
          },
          {
            role: "user",
            content: `Task: ${task}\nContext: ${JSON.stringify(context)}`
          }
        ],
        tools: availableTools,
        tool_choice: "auto"
      });

      const results = [];
      const message = response.choices[0].message;

      if (message.tool_calls) {
        for (const toolCall of message.tool_calls) {
          const action = this.actions.get(toolCall.function.name);
          if (action) {
            const args = JSON.parse(toolCall.function.arguments);
            const result = await action.handler(args);
            results.push({
              tool: toolCall.function.name,
              args,
              result
            });
          }
        }
      }

      return {
        completion: message.content,
        actions: results
      };
    } catch (error: any) {
      throw new OpenAIApiError(
        `Agent orchestration failed: ${error.message}`,
        error.status || 500
      );
    }
  }
}

export const agentOrchestrator = new AgentOrchestrator(new OpenAI());
