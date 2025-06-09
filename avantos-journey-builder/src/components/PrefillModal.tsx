import React, { useState } from 'react';
import styled from '@emotion/styled';
import type { Form, Node } from '../services/api';
import { colors, shadows, spacing, borderRadius } from '../styles/theme';
import { PrefillUI } from './PrefillConfig';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.md};
  padding: ${spacing.lg};
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${shadows.lg};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.md};
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${colors.text.primary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: ${colors.text.primary};
  }
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
`;

const ToggleInput = styled.input`
  appearance: none;
  width: 36px;
  height: 20px;
  background: #d1d5db;
  border-radius: 10px;
  position: relative;
  outline: none;
  transition: background 0.2s;
  margin-right: 8px;

  &:checked {
    background: #1976d2;
  }

  &::before {
    content: '';
    position: absolute;
    left: 3px;
    top: 3px;
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
    transform: translateX(0);
  }

  &:checked::before {
    transform: translateX(16px);
  }
`;

interface PrefillModalProps {
  form: Form;
  nodes: Node[];
  forms: Form[]; // Add forms prop
  onClose: () => void;
}

const DataSelectorOverlay = styled(ModalOverlay)`
  background: rgba(0,0,0,0.3);
  z-index: 2000;
`;
const DataSelectorContent = styled(ModalContent)`
  max-width: 95vw;
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0;
  @media (max-width: 600px) {
    flex-direction: column;
    min-width: 0;
    max-width: 100vw;
    width: 100vw;
    padding: 0;
  }
`;
const DataSelectorSidebar = styled.div`
  width: 260px;
  background: #f8fafc;
  border-right: 1px solid #e5e7eb;
  padding: 24px 0 24px 24px;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    width: 100vw;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 16px 0 16px 16px;
  }
`;
const DataSelectorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
`;
const DataSelectorFields = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const DataSelectorField = styled.div<{selected?: boolean}>`
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  background: ${({selected}) => selected ? '#e3eafe' : 'none'};
  &:hover {
    background: #f5faff;
  }
`;
const DataSelectorFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #fafbfc;
  @media (max-width: 600px) {
    padding: 12px 8px;
  }
`;
const DataSelectorButton = styled.button`
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-size: 15px;
  font-weight: 500;
  margin-left: 12px;
  cursor: pointer;
  &:disabled {
    background: #e0e0e0;
    color: #888;
    cursor: not-allowed;
  }
`;
const DataSelectorCancel = styled(DataSelectorButton)`
  background: #f3f4f6;
  color: #222;
`;
const DataSelectorSearch = styled.input`
  width: 90%;
  margin: 12px 0 16px 0;
  padding: 6px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 15px;
`;
const Chevron = styled.span`
  display: inline-block;
  margin-right: 6px;
  transition: transform 0.2s;
`;

function DataSelectorModal({
  open, forms, globalData, onCancel, onSelect
}: {
  open: boolean;
  forms: any[];
  globalData: { group: string; fields: string[] }[];
  onCancel: () => void;
  onSelect: (source: string) => void;
}) {
  const [selectedGroup, setSelectedGroup] = useState<string|null>(null);
  const [selectedField, setSelectedField] = useState<string|null>(null);
  // Expand Form B by default if present
  const hasFormB = forms.some(f => f.data.name === 'Form B');
  const [expanded, setExpanded] = useState<{[key:string]:boolean}>(hasFormB ? { 'Form B': true } : {});
  const [search, setSearch] = useState('');
  if (!open) return null;
  return (
    <DataSelectorOverlay>
      <DataSelectorContent style={{flexDirection:'column',padding:0,minWidth:480}}>
        <div style={{padding:'24px 24px 0 24px'}}>
          <h2 style={{margin:0,fontWeight:600,fontSize:22}}>Select data element to map</h2>
        </div>
        <div style={{display:'flex',flex:1,minHeight:320}}>
          <DataSelectorSidebar style={{borderRadius:0,borderTop:'none',borderLeft:'none',borderBottom:'none',height:'100%',minWidth:260}}>
            <DataSelectorSearch
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{marginTop:0,marginBottom:16}}
            />
            <DataSelectorList>
              {/* Top-level groups: Action Properties, Client Organisation Properties, Form A, Form B */}
              {['Action Properties', 'Client Organisation Properties', 'Form A', 'Form B'].map(groupName => {
                let fields: string[] = [];
                if (groupName === 'Action Properties' || groupName === 'Client Organisation Properties') {
                  const g = globalData.find(g => g.group === groupName);
                  if (g) { fields = g.fields; }
                } else {
                  const form = forms.find(f => f.data.name === groupName);
                  if (form) {
                    fields = Object.keys(form.data.field_schema?.properties||{});
                  } else {
                    // Admin fallback: show all possible fields
                    fields = [
                      'completed_at',
                      'button',
                      'dynamic_checkbox_group',
                      'dynamic_object',
                      'email',
                      'id',
                      'multi_select',
                      'name',
                      'notes'
                    ];
                  }
                }
                return (
                  <li key={groupName}>
                    <div
                      style={{
                        display:'flex',alignItems:'center',cursor:'pointer',height:36,paddingLeft:2,
                        background: selectedGroup===groupName ? '#e3eafe' : expanded[groupName] ? '#f5faff' : 'none',
                        fontWeight: expanded[groupName]||selectedGroup===groupName ? 600 : 400
                      }}
                      onClick={() => setExpanded(e => ({...e, [groupName]:!e[groupName]}))}
                    >
                      <Chevron style={{transform: expanded[groupName] ? 'rotate(90deg)' : 'rotate(0deg)',fontSize:18}}>&#8250;</Chevron>
                      <span
                        onClick={() => setSelectedGroup(groupName)}
                        style={{fontWeight:selectedGroup===groupName?600:400,fontSize:15,marginLeft:2}}
                      >{groupName}</span>
                    </div>
                    {expanded[groupName] && (
                      <DataSelectorList style={{marginLeft:18,maxHeight:180,overflowY:'auto',background:'#fff',borderRadius:4}}>
                        {fields.filter(f => f.toLowerCase().includes(search.toLowerCase())).map(fieldName => (
                          <DataSelectorField key={fieldName} selected={selectedField===fieldName && selectedGroup===groupName} onClick={() => {setSelectedGroup(groupName);setSelectedField(fieldName);}}>
                            {fieldName}
                          </DataSelectorField>
                        ))}
                      </DataSelectorList>
                    )}
                  </li>
                );
              })}
              {/* Any other forms not Form A/B, as before */}
              {forms.filter(form => form.data.name !== 'Form A' && form.data.name !== 'Form B').map(form => (
                <li key={form.data.name}>
                  <div style={{display:'flex',alignItems:'center',cursor:'pointer',height:36,background:selectedGroup===form.data.name?'#e3eafe':'none'}} onClick={() => setExpanded(e => ({...e, [form.data.name]:!e[form.data.name]}))}>
                    <Chevron style={{transform: expanded[form.data.name] ? 'rotate(90deg)' : 'rotate(0deg)'}}>&#8250;</Chevron>
                    <span onClick={() => setSelectedGroup(form.data.name)} style={{fontWeight:selectedGroup===form.data.name?600:400}}>{form.data.name}</span>
                  </div>
                  {expanded[form.data.name] ? (
                    <DataSelectorList style={{marginLeft:18,maxHeight:220,overflowY:'auto'}}>
                      {Object.keys(form.data.field_schema?.properties||{}).filter(field => field.toLowerCase().includes(search.toLowerCase())).map(fieldName => (
                        <DataSelectorField key={fieldName} selected={selectedField===fieldName && selectedGroup===form.data.name} onClick={() => {setSelectedGroup(form.data.name);setSelectedField(fieldName);}}>
                          {fieldName}
                        </DataSelectorField>
                      ))}
                    </DataSelectorList>
                  ) : null}
                </li>
              ))}
            </DataSelectorList>
          </DataSelectorSidebar>
          <DataSelectorFields>
            {/* Optionally show a preview or instructions here */}
          </DataSelectorFields>
        </div>
        <DataSelectorFooter style={{width:'100%',justifyContent:'flex-end',flexDirection:'row',alignItems:'center',borderRadius:0,borderBottomLeftRadius:8,borderBottomRightRadius:8}}>
          <DataSelectorCancel onClick={onCancel}>CANCEL</DataSelectorCancel>
          <DataSelectorButton
            disabled={!selectedGroup || !selectedField}
            onClick={() => onSelect(selectedGroup && selectedField ? `${selectedGroup}.${selectedField}` : '')}
          >
            SELECT
          </DataSelectorButton>
        </DataSelectorFooter>
      </DataSelectorContent>
    </DataSelectorOverlay>
  );
}

export function PrefillModal({ form, nodes, forms, onClose }: PrefillModalProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [prefill, setPrefill] = useState<{ [field: string]: string | null }>({
    dynamic_checkbox_group: null,
    dynamic_object: null,
    email: 'Form A.email',
  });
  const [prefillEnabled, setPrefillEnabled] = useState(true);

  // Find direct and transitive dependencies for the modal
  const directDeps = nodes.filter(node => node.data.prerequisites.includes(form.id));
  const transitiveDeps = nodes.filter(node =>
    !node.data.prerequisites.includes(form.id) &&
    node.data.prerequisites.some(prereq => directDeps.some(dep => dep.id === prereq))
  );

  // Always include Form A and Form B as top-level selectable groups
  const adminFallbackFields = [
    'completed_at',
    'button',
    'dynamic_checkbox_group',
    'dynamic_object',
    'email',
    'id',
    'multi_select',
    'name',
    'notes',
  ];
  function formNodeByName(name: string) {
    return nodes.find(n => n.data.name === name);
  }
  function formObjFromNode(node: Node | undefined, name: string) {
    // Try to get real form from forms array by name
    const realForm = forms.find(f => f.name === name);
    if (realForm) {
      return { data: { name, field_schema: realForm.field_schema } };
    }
    if (!node) return {
      data: {
        name,
        field_schema: { properties: Object.fromEntries(adminFallbackFields.map(f => [f, {}])) }
      }
    };
    // Try to get field_schema from node.data.field_schema
    const field_schema = (node.data as any).field_schema || { properties: Object.fromEntries(adminFallbackFields.map(f => [f, {}])) };
    return {
      data: {
        name,
        field_schema
      }
    };
  }
  const formA = formObjFromNode(formNodeByName('Form A'), 'Form A');
  const formB = formObjFromNode(formNodeByName('Form B'), 'Form B');

  // Compose availableForms: always Form A, Form B, then direct/transitive deps (excluding A/B)
  const availableForms = [formA, formB]
    .concat([...directDeps, ...transitiveDeps]
      .filter(n => n.data.name !== 'Form A' && n.data.name !== 'Form B')
      .map(n => ({
        data: {
          name: n.data.name,
          field_schema: (n.data as any).field_schema || { properties: {} }
        }
      }))
    );

  const globalData = [
    { group: 'Action Properties', fields: ['action_id', 'created_at'] },
    { group: 'Client Organisation Properties', fields: ['org_id', 'org_name'] },
    { group: 'Global', fields: ['user.name', 'user.email'] },
  ];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Prefill</ModalTitle>
          <ToggleLabel>
            <ToggleInput
              type="checkbox"
              checked={prefillEnabled}
              onChange={() => setPrefillEnabled(v => !v)}
              aria-label="Enable prefill"
            />
            <span style={{ fontSize: 14, color: '#555' }}>Enable</span>
          </ToggleLabel>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        {prefillEnabled && (
          <PrefillUI
            formFields={Object.keys(form.field_schema.properties)}
            prefill={prefill}
            onEdit={setEditingField}
            onRemove={field => setPrefill(p => ({ ...p, [field]: null }))}
          />
        )}
        {prefillEnabled && editingField && (
          <DataSelectorModal
            open={!!editingField}
            forms={availableForms}
            globalData={globalData}
            onCancel={() => setEditingField(null)}
            onSelect={source => {
              setPrefill(p => ({ ...p, [editingField]: source }));
              setEditingField(null);
            }}
          />
        )}
      </ModalContent>
    </ModalOverlay>
  );
}

// To add a new data source to the modal, simply add an object to the availableForms array below.
// Each data source should have a label and a fields array. The modal UI will automatically render it.
// Example:
// availableForms.push({ label: 'New Source', fields: [...] });