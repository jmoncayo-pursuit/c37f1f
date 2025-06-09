
const API_BASE_URL = 'http://localhost:3000/api/v1/1/actions/blueprints/1/graph';

export interface FormField {
  avantos_type: string;
  title: string;
  type: string;
  format?: string;
  items?: {
    enum: string[];
    type: string;
  };
  enum?: any[];
}

export interface FormSchema {
  type: string;
  properties: Record<string, FormField>;
  required: string[];
}

export interface Form {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  field_schema: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
  dynamic_field_config?: Record<string, any>;
}

export interface Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    id: string;
    component_key: string;
    component_type: string;
    component_id: string;
    name: string;
    prerequisites: string[];
    permitted_roles: string[];
    input_mapping: Record<string, any>;
    sla_duration: {
      number: number;
      unit: string;
    };
    approval_required: boolean;
    approval_roles: string[];
  };
}

export interface Edge {
  source: string;
  target: string;
}

export interface GraphData {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: Node[];
  edges: Edge[];
  forms: Form[];
  branches: any[];
  triggers: any[];
}

export const api = {
  async getGraphData(): Promise<GraphData> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch graph data');
    }
    return response.json();
  }
}; 