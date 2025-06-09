import { useState } from 'react';
import { ReactFlow, Background } from '@xyflow/react';
import styled from '@emotion/styled';
import { colors } from '../styles/theme';
import JourneyNode from './JourneyNode';
import { PrefillModal } from './PrefillModal';
import type { Node, Form } from '../services/api';

const FlowContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${colors.background};
  position: relative;
  overflow: hidden;

  .react-flow__handle {
    width: 10px;
    height: 10px;
    background: #fff; // remove blue from handle
    border: 2px solid #1a73e8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .react-flow__handle:hover {
    background: #e3eafe; // very light blue on hover
    transform: scale(1.2);
  }

  .react-flow__edge {
    stroke: #1a73e8;
    stroke-width: 3;
  }

  .react-flow__edge-path {
    stroke: #1a73e8;
    stroke-width: 3;
  }

  .react-flow__node {
    background: transparent;
    border: none;
    box-shadow: none;
    min-width: 0;
    min-height: 0;
    padding: 0;
  }

  .react-flow__node:hover {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    height: 80vh;
  }
`;

const nodeTypes = {
  journeyNode: JourneyNode,
  form: JourneyNode, // Register 'form' node type for React Flow
};

interface FlowDiagramProps {
  nodes: Node[];
  forms: Form[];
}

export function FlowDiagram({ nodes, forms }: FlowDiagramProps) {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  // Filter only the forms you want: Form A, B, C, D, E (by name)
  const filteredNodes = nodes.filter((node) => {
    const name = node.data?.name;
    return ["Form A", "Form B", "Form C", "Form D", "Form E"].includes(name);
  });

  // Map form names to node ids for edge creation
  const nodeIdByName: Record<string, string> = {};
  filteredNodes.forEach((node) => {
    nodeIdByName[node.data.name] = node.id;
  });

  // Edges: A→B, A→C, C→E, B→D (no type specified, so default edge is used)
  const edges = [
    { id: "A-B", source: nodeIdByName["Form A"], target: nodeIdByName["Form B"] },
    { id: "A-C", source: nodeIdByName["Form A"], target: nodeIdByName["Form C"] },
    { id: "C-E", source: nodeIdByName["Form C"], target: nodeIdByName["Form E"] },
    { id: "B-D", source: nodeIdByName["Form B"], target: nodeIdByName["Form D"] },
  ];

  return (
    <FlowContainer>
      <ReactFlow
        nodes={filteredNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        fitViewOptions={{ padding: 0.2 }}
        attributionPosition={undefined}
        onNodeClick={(_, node) => {
          // Find the real form object for this node by name or id
          const form = forms.find(f => f.name === node.data.name || f.id === node.data.component_id);
          setSelectedNode({
            ...node,
            form: form || {
              id: node.id,
              name: node.data.name,
              description: '', // fallback if not present
              is_reusable: false,
              field_schema: { type: 'object', properties: {}, required: [] },
            }
          });
        }}
      >
        <Background color="#E5E7EB" gap={20} />
      </ReactFlow>
      {selectedNode && (
        <PrefillModal
          form={selectedNode.form}
          nodes={filteredNodes}
          forms={forms}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </FlowContainer>
  );
}