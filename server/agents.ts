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
    // Notion Database Actions
    this.registerAction({
      name: "create_notion_database",
      description: "Create a new Notion database",
      parameters: {
        type: "object",
        properties: {
          parentPageId: { type: "string" },
          title: { type: "string" },
          properties: { type: "object" },
          icon: { type: "string", optional: true }
        },
        required: ["parentPageId", "title", "properties"]
      },
      handler: async (params) => {
        return notionService.createDatabase(params.parentPageId, params.title, params.properties, params.icon);
      }
    });

    this.registerAction({
      name: "add_notion_page",
      description: "Add a new page to Notion database",
      parameters: {
        type: "object",
        properties: {
          databaseId: { type: "string" },
          properties: { type: "object" },
          icon: { type: "string", optional: true }
        },
        required: ["databaseId", "properties"]
      },
      handler: async (params) => {
        return notionService.addDatabasePage(params.databaseId, params.properties, params.icon);
      }
    });

    // Original workflow action
    this.registerAction({
      name: "create_workflow",
      description: "Create a new workflow",
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

      // Step 1: Planning agent determines high-level steps
      const plannerResponse = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a strategic planner that breaks down complex tasks into structured steps. Output a JSON array of high-level steps needed to accomplish the task."
          },
          {
            role: "user",
            content: `Task: ${task}\nContext: ${JSON.stringify(context)}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const plan = JSON.parse(plannerResponse.choices[0].message.content || "{}");

      // Step 2: Task-specific agents execute each step
      const results = [];
      for (const step of plan.steps || []) {
        const executorResponse = await this.openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a specialized agent that executes specific workflow steps using available tools."
            },
            {
              role: "user",
              content: `Execute this step: ${JSON.stringify(step)}\nContext: ${JSON.stringify(context)}`
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

      const stepResults = [];
      for (const toolCall of executorResponse.choices[0].message.tool_calls || []) {
        const action = this.actions.get(toolCall.function.name);
        if (action) {
          const args = JSON.parse(toolCall.function.arguments);
          const result = await action.handler(args);
          stepResults.push({
            tool: toolCall.function.name,
            args,
            result
          });
        }
      }
      
      results.push({
        step: step,
        actions: stepResults,
        completion: executorResponse.choices[0].message.content
      });
    }

      return {
        plan: plan.steps,
        stepResults: results,
        summary: plannerResponse.choices[0].message.content
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