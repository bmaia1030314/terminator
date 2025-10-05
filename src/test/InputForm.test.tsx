import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputForm } from '../components/InputForm';

describe('InputForm', () => {
  const mockOnCalculate = vi.fn();
  const mockOnReset = vi.fn();

  beforeEach(() => {
    mockOnCalculate.mockClear();
    mockOnReset.mockClear();
  });

  it('renders with default values', () => {
    render(
      <InputForm 
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
        language="en"
      />
    );

    expect(screen.getByDisplayValue('5')).toBeInTheDocument(); // Years of service
    expect(screen.getByDisplayValue('36000')).toBeInTheDocument(); // Annual salary
    expect(screen.getByDisplayValue('2')).toBeInTheDocument(); // Mutual months
    expect(screen.getByDisplayValue('Single')).toBeInTheDocument(); // Marital status
    expect(screen.getByDisplayValue('0')).toBeInTheDocument(); // Dependents
  });

  it('calls onCalculate with form data when Calculate button is clicked', () => {
    render(
      <InputForm 
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
        language="en"
      />
    );

    fireEvent.click(screen.getByText('Calculate'));

    expect(mockOnCalculate).toHaveBeenCalledWith({
      yearsOfService: 5,
      annualSalary: 36000,
      mutualMonths: 2,
      maritalStatus: 'Single',
      dependents: 0
    });
  });

  it('calls onReset when Reset button is clicked', () => {
    render(
      <InputForm 
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
        language="en"
      />
    );

    fireEvent.click(screen.getByText('Reset'));

    expect(mockOnReset).toHaveBeenCalled();
  });

  it('shows validation error for invalid annual salary', () => {
    render(
      <InputForm 
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
        language="en"
      />
    );

    // Change salary to invalid value
    const salaryInput = screen.getByLabelText(/annual salary/i);
    fireEvent.change(salaryInput, { target: { value: '500' } });
    fireEvent.click(screen.getByText('Calculate'));

    expect(screen.getByText(/annual salary must be at least/i)).toBeInTheDocument();
    expect(mockOnCalculate).not.toHaveBeenCalled();
  });

  it('updates form values when inputs change', () => {
    render(
      <InputForm 
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
        language="en"
      />
    );

    const yearsInput = screen.getByLabelText(/years of service/i);
    fireEvent.change(yearsInput, { target: { value: '10' } });

    expect(yearsInput).toHaveValue(10);
  });
});