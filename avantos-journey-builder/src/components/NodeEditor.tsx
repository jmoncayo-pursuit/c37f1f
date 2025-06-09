import { useState } from 'react';
import styled from '@emotion/styled';
import { colors, shadows, spacing, borderRadius } from '../styles/theme';
import type { JourneyNodeType } from '../types';

interface NodeEditorProps {
  node: JourneyNodeType | null;
  onClose: () => void;
  onUpdate: () => void;
}

const EditorContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: ${colors.white};
  box-shadow: ${shadows.md};
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  transform: translateX(${props => props.hidden ? '100%' : '0'});
  transition: transform 0.3s ease;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};
`;

const Title = styled.h2`
  margin: 0;
  color: ${colors.text.primary};
  font-size: 18px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: ${spacing.xs};
  font-size: 20px;
  line-height: 1;

  &:hover {
    color: ${colors.text.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const Label = styled.label`
  color: ${colors.text.secondary};
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${spacing.sm};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.sm};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${spacing.sm};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.sm};
  font-size: 14px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const SaveButton = styled.button`
  background: ${colors.button.primary};
  color: ${colors.button.text};
  border: none;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: ${spacing.md};

  &:hover {
    background: ${colors.button.hover};
  }
`;

function NodeEditor({ node, onClose, onUpdate }: NodeEditorProps) {
  const [formData, setFormData] = useState({
    label: node?.data.label || '',
    description: node?.data.description || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!node) return;

    try {
      await fetch(`/api/steps/${node.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...node,
          data: formData,
        }),
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating node:', error);
    }
  };

  if (!node) return null;

  return (
    <EditorContainer>
      <EditorHeader>
        <Title>Edit Node</Title>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </EditorHeader>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Label</Label>
          <Input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
            placeholder="Enter node label"
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <TextArea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter node description"
          />
        </FormGroup>
        <SaveButton type="submit">Save Changes</SaveButton>
      </Form>
    </EditorContainer>
  );
}

export default NodeEditor; 