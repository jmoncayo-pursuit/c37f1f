// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PrefillModal } from '../PrefillModal';
import '@testing-library/jest-dom';

// Mock form, nodes, and forms for PrefillModal
const mockForm = {
  id: 'formA',
  name: 'Form A',
  description: 'Test Form A',
  is_reusable: false,
  field_schema: {
    type: 'object',
    properties: {
      email: { type: 'string', title: 'Email' },
      first_name: { type: 'string', title: 'First Name' },
    },
    required: [],
  },
};
// Remove type annotations for mockNodes and mockForms for compatibility with Babel/Jest
const mockNodes = [];
const mockForms = [mockForm];

const mockProps = {
  form: mockForm,
  nodes: mockNodes,
  forms: mockForms,
  onClose: jest.fn(),
  onSelect: jest.fn(),
  selectedField: null,
};

describe('PrefillModal', () => {
  it('renders the prefill value', () => {
    render(<PrefillModal {...mockProps} />);
    // Find the element that contains both 'email' and 'Form A.email' in its textContent
    const prefillValue = Array.from(document.querySelectorAll('div'))
      .find(div => div.textContent && div.textContent.replace(/\s+/g, ' ').includes('email: Form A.email'));
    expect(prefillValue).toBeInTheDocument();
  });

  it('renders all form field keys for the form', () => {
    render(<PrefillModal {...mockProps} />);
    // There should be at least one element containing 'email' and one containing 'first_name'
    const emailNodes = screen.getAllByText((content, node) => node?.textContent?.includes('email'));
    const firstNameNodes = screen.getAllByText((content, node) => node?.textContent?.includes('first_name'));
    expect(emailNodes.length).toBeGreaterThan(0);
    expect(firstNameNodes.length).toBeGreaterThan(0);
  });

  it('shows the data selector modal when a field row is clicked', () => {
    render(<PrefillModal {...mockProps} />);
    // Find the field row for 'first_name' (not prefilled)
    const fieldRows = Array.from(document.querySelectorAll('div'))
      .filter(div => div.textContent && div.textContent.trim() === '🗄️ first_name');
    expect(fieldRows.length).toBeGreaterThan(0);
    fireEvent.click(fieldRows[0]);
    expect(screen.getByText('Select data element to map')).toBeInTheDocument();
  });
});
