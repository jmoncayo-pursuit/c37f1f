import { BaseEdge, getBezierPath } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';
import type { JourneyEdgeType } from '../types';

export function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps<JourneyEdgeType>) {
  // Increase curvature for a more pronounced curve
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY: sourceY - 40, // shift source up for upper-left curve
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.5, // more pronounced curve
  });

  return (
    <BaseEdge
      path={edgePath}
      style={{
        ...style,
        stroke: '#1a73e8', // simple blue line
        strokeWidth: 2, // thinner line
        strokeDasharray: undefined, // solid line
        filter: undefined, // no shadow
      }}
      markerEnd={markerEnd || 'url(#arrowhead)'}
    />
  );
}

// Add arrowhead marker for edge endings
export function CustomEdgeArrowDefs() {
  return (
    <svg width="0" height="0">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#4a90e2" />
        </marker>
      </defs>
    </svg>
  );
}