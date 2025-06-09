import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import styled from '@emotion/styled';
import type { JourneyNodeType } from '../types';

const NodeContainer = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0;
  background: #fff;
  border-radius: 16px;
  border: 2px solid #e0e3eb;
  padding: 0 24px 0 0;
  min-width: 220px;
  min-height: 64px;
  box-shadow: 0 2px 8px rgba(16, 30, 54, 0.04);
  transition: box-shadow 0.2s;
  color: #222;
  position: relative;

  &:hover {
    box-shadow: 0 4px 16px rgba(16, 30, 54, 0.1);
    border-color: #b5b8c5;
  }
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  background: #757ef6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 16px; // Add space from the left edge
`;

const Icon = styled.div`
  width: 28px;
  height: 28px;
  background: #fff;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='1.5'%3E%3Crect x='4' y='6' width='16' height='12' rx='2' fill='none' stroke='white' stroke-width='1.5'/%3E%3Cpath d='M4 10h16M9 14h1m2 0h1' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat center;
  mask-size: contain;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  margin-left: 16px; // Add space between icon and text
`;

const FormLabel = styled.div`
  color: #757ef6;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const FormName = styled.div`
  color: #222;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
`;

const HandleStyled = styled(Handle)`
  width: 14px;
  height: 14px;
  background: #fff;
  border: 2px solid #757ef6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  position: absolute;
  top: 50%;
  left: unset;
  right: unset;
  transform: translateY(-50%);

  &:hover {
    background: #e3eafe;
    transform: translateY(-50%) scale(1.2);
  }

  &.react-flow__handle-left {
    left: -8px;
    right: unset;
  }
  &.react-flow__handle-right {
    right: -8px;
    left: unset;
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

function JourneyNode({ data, selected }: NodeProps<JourneyNodeType>) {
  // Use the actual form name from data.name, fallback to data.label if needed
  const formName = data.name || data.label || '';
  return (
    <NodeContainer selected={selected}>
      <HandleStyled type="target" position={Position.Left} />
      <IconContainer>
        <Icon />
      </IconContainer>
      <TextContainer>
        <FormLabel>Form</FormLabel>
        <FormName>{formName.toString()}</FormName>
      </TextContainer>
      <HandleStyled type="source" position={Position.Right} />
    </NodeContainer>
  );
}

export default memo(JourneyNode);


