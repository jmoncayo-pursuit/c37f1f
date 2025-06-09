import React from 'react';
import styled from '@emotion/styled';

const Section = styled.div`
  margin-bottom: 24px;
`;

const FieldRow = styled.div<{active?: boolean}>`
  display: flex;
  align-items: center;
  background: #fff; // always white, no blue or gray background
  border: 2px dashed ${({active}) => active ? '#1a73e8' : '#d1d5db'};
  border-radius: 12px;
  padding: 12px 20px;
  margin-bottom: 12px;
  color: #888;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
`;

const PrefillValue = styled.div`
  background: #f3f4f6;
  border-radius: 24px;
  padding: 10px 18px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #222;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 22px;
  margin-left: 10px;
  cursor: pointer;
`;

interface PrefillConfig {
  [field: string]: string | null;
}

interface PrefillUIProps {
  formFields: string[];
  prefill: PrefillConfig;
  onEdit: (field: string) => void;
  onRemove: (field: string) => void;
}

export function PrefillUI({ formFields, prefill, onEdit, onRemove }: PrefillUIProps) {
  return (
    <Section>
      <h3 style={{margin:0, color:'#222'}}>Prefill</h3>
      <div style={{color:'#888', fontSize:14, marginBottom:12}}>Prefill fields for this form</div>
      {formFields.map(field =>
        prefill[field] ? (
          <PrefillValue key={field}>
            {field}: {prefill[field]}
            <RemoveBtn aria-label="Remove prefill" onClick={() => onRemove(field)}>&times;</RemoveBtn>
          </PrefillValue>
        ) : (
          <FieldRow key={field} active onClick={() => onEdit(field)}>
            <span style={{marginRight:10}}>🗄️</span> {field}
          </FieldRow>
        )
      )}
    </Section>
  );
}

// Example usage in PrefillModal (simplified, you can adapt to your modal logic)
// ...existing code...