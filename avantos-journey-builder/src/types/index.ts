import type { Node, Edge } from '@xyflow/react';

export interface JourneyNodeData extends Record<string, unknown> {
  label: string;
  description: string;
}

export type JourneyNodeType = Node<JourneyNodeData, 'journeyNode'>;

export interface JourneyEdgeData extends Record<string, unknown> {
  animated?: boolean;
}

export type JourneyEdgeType = Edge<JourneyEdgeData, 'custom'>;

export type CustomNodeType = JourneyNodeType;
export type CustomEdgeType = JourneyEdgeType;

// Form and FormField types for use in hooks and components
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