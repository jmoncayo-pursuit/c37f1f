import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, shadows, spacing, borderRadius } from '../styles/theme';
import type { Form } from '../types';
import { api } from '../services/api';

// Custom hook for fetching forms (separation of concerns example)
export function useForms() {
  const [forms, setForms] = useState<Form[]>([]);
  useEffect(() => {
    api.getGraphData().then((res) => {
      setForms(res.forms);
    });
  }, []);
  return forms;
}

const FormListContainer = styled.div`
  padding: ${spacing.md};
`;

const FormCard = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.md};
  padding: ${spacing.md};
  margin-bottom: ${spacing.md};
  box-shadow: ${shadows.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${shadows.md};
  }
`;

const FormName = styled.h3`
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.xs} 0;
`;

const FormDescription = styled.p`
  color: ${colors.text.secondary};
  margin: 0;
  font-size: 14px;
`;

const FormFields = styled.div`
  margin-top: ${spacing.sm};
  font-size: 12px;
  color: ${colors.text.secondary};
`;

const FieldList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${spacing.xs} 0 0 0;
`;

const FieldItem = styled.li`
  padding: ${spacing.xs} 0;
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export function FormList() {
  const forms = useForms();

  return (
    <FormListContainer>
      <h2>Forms</h2>
      {forms.map((form) => (
        <FormCard key={form.id}>
          <FormName>{form.name || form.id}</FormName>
          <FormDescription>{form.description}</FormDescription>
          {form.field_schema?.properties && (
            <FormFields>
              Fields:
              <FieldList>
                {Object.keys(form.field_schema.properties).map((field) => (
                  <FieldItem key={field}>{field}</FieldItem>
                ))}
              </FieldList>
            </FormFields>
          )}
        </FormCard>
      ))}
    </FormListContainer>
  );
}