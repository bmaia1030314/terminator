// Core data types for the calculator
export interface InputData {
  yearsOfService: number;
  annualSalary: number;
  mutualMonths: number;
  mutualMonthsType: 'perYear' | 'total'; // Toggle between "per year" or "total months"
  maritalStatus: 'Single' | 'Married';
  dependents: number;
  vacationDaysLeft: number;
  holidaySubsidyMonthsLeft: number;
  age: number;
  paidTrainingDaysUsed: number;
}

export interface ResultData {
  mutualGross: number;
  terminationGross: number;
  // Future: net amounts after tax
  mutualNet?: number | null;
  terminationNet?: number | null;
}

export interface ValidationError {
  field: keyof InputData;
  message: string;
}

export interface ComparisonResult {
  betterOption: 'mutual' | 'termination' | 'equal';
  difference: number;
  mutualGross: number;
  terminationGross: number;
  mutualNet?: number;
  terminationNet?: number;
  unemploymentBenefitMonths?: number;
  unemploymentBenefitTotal?: number;
}