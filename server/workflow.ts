import { z } from "zod";

// Define workflow step structure
export const WorkflowStepSchema = z.object({
  name: z.string(),
  status: z.enum(["Complete", "In Progress", "Not Started"]),
  date: z.string()
});

export type WorkflowStep = z.infer<typeof WorkflowStepSchema>;

// Define the workflow schema
export const WorkflowSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  steps: z.array(WorkflowStepSchema),
  owner: z.string(),
  category: z.string()
});

export const CreateWorkflowSchema = WorkflowSchema.omit({ id: true });
export const UpdateWorkflowSchema = WorkflowSchema.partial().extend({ id: z.number() });

export type Workflow = z.infer<typeof WorkflowSchema>;
export type CreateWorkflow = z.infer<typeof CreateWorkflowSchema>;
export type UpdateWorkflow = z.infer<typeof UpdateWorkflowSchema>;

// Sample workflow data for initial use
const sampleWorkflows: Workflow[] = [
  {
    id: 1,
    name: "Content Creation Workflow",
    description: "Structured process for creating on-brand digital products",
    steps: [
      { name: "Research Phase", status: "Complete", date: "May 1, 2025" },
      { name: "Content Outline", status: "Complete", date: "May 3, 2025" },
      { name: "Visual Design", status: "In Progress", date: "May 7, 2025" },
      { name: "Editorial Review", status: "Not Started", date: "May 12, 2025" },
      { name: "Final Production", status: "Not Started", date: "May 15, 2025" }
    ],
    owner: "Latisha Waters",
    category: "Product Development"
  },
  {
    id: 2,
    name: "Tarot Deck Production",
    description: "Process for designing and producing Southern Oracle Tarot deck",
    steps: [
      { name: "Persona Research", status: "Complete", date: "Apr 15, 2025" },
      { name: "Card Meanings", status: "Complete", date: "Apr 22, 2025" },
      { name: "Card Design Concepts", status: "In Progress", date: "May 10, 2025" },
      { name: "Design Refinement", status: "Not Started", date: "May 20, 2025" },
      { name: "Production Preparation", status: "Not Started", date: "June 1, 2025" }
    ],
    owner: "Latisha Waters",
    category: "Product Development"
  },
  {
    id: 3,
    name: "Marketing Automation",
    description: "Structured campaign execution for product launches",
    steps: [
      { name: "Content Planning", status: "In Progress", date: "May 5, 2025" },
      { name: "Asset Creation", status: "In Progress", date: "May 8, 2025" },
      { name: "Email Sequence Setup", status: "Not Started", date: "May 12, 2025" },
      { name: "Social Media Scheduling", status: "Not Started", date: "May 14, 2025" },
      { name: "Analytics Configuration", status: "Not Started", date: "May 16, 2025" }
    ],
    owner: "Latisha Waters",
    category: "Marketing"
  },
  {
    id: 4,
    name: "Website Deployment",
    description: "Technical implementation of Midnight Magnolia brand on web platforms",
    steps: [
      { name: "Wireframing", status: "Complete", date: "Apr 10, 2025" },
      { name: "Brand Element Implementation", status: "Complete", date: "Apr 20, 2025" },
      { name: "Responsive Testing", status: "In Progress", date: "May 5, 2025" },
      { name: "Content Migration", status: "In Progress", date: "May 8, 2025" },
      { name: "Launch & Verification", status: "Not Started", date: "May 15, 2025" }
    ],
    owner: "Latisha Waters",
    category: "Technical"
  }
];

export class WorkflowService {
  private workflows: Workflow[] = [...sampleWorkflows];
  private nextId: number = 5; // Start from 5 since we have 4 initial workflows

  /**
   * Get all workflows
   */
  getWorkflows(): Workflow[] {
    return this.workflows;
  }

  /**
   * Get workflow by ID
   */
  getWorkflowById(id: number): Workflow | undefined {
    return this.workflows.find(w => w.id === id);
  }

  /**
   * Get workflows by category
   */
  getWorkflowsByCategory(category: string): Workflow[] {
    if (category === "All Workflows") {
      return this.workflows;
    }
    return this.workflows.filter(w => w.category === category);
  }

  /**
   * Create a new workflow
   */
  createWorkflow(workflow: CreateWorkflow): Workflow {
    const newWorkflow: Workflow = {
      ...workflow,
      id: this.nextId++
    };
    
    this.workflows.push(newWorkflow);
    return newWorkflow;
  }

  /**
   * Update an existing workflow
   */
  updateWorkflow(workflowData: UpdateWorkflow): Workflow | undefined {
    const index = this.workflows.findIndex(w => w.id === workflowData.id);
    if (index === -1) return undefined;
    
    const updatedWorkflow = {
      ...this.workflows[index],
      ...workflowData
    };
    
    this.workflows[index] = updatedWorkflow;
    return updatedWorkflow;
  }

  /**
   * Delete a workflow
   */
  deleteWorkflow(id: number): boolean {
    const initialLength = this.workflows.length;
    this.workflows = this.workflows.filter(w => w.id !== id);
    return this.workflows.length !== initialLength;
  }
}

export const workflowService = new WorkflowService();