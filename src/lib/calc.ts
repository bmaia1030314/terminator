import type { InputData, ValidationError, ComparisonResult } from '../types';

/**
 * Calculate gross payout for mutual agreement
 * Formula: (annual salary / 14) * total months
 * Note: Uses 14 months to account for standard 12 months + Christmas subsidy + Holiday subsidy
 * 
 * @param annualSalary - Annual gross salary
 * @param mutualMonths - Either months per year OR total months
 * @param yearsOfService - Years of service
 * @param mutualMonthsType - 'perYear' (multiply by years) or 'total' (use as-is)
 */
export function calcMutualGross(
  annualSalary: number, 
  mutualMonths: number, 
  yearsOfService: number,
  mutualMonthsType: 'perYear' | 'total' = 'perYear'
): number {
  const totalMonths = mutualMonthsType === 'perYear' 
    ? mutualMonths * yearsOfService 
    : mutualMonths;
  return Math.round((annualSalary / 14) * totalMonths);
}

/**
 * Calculate gross payout for contract termination
 * Formula includes:
 * - Base compensation: 12 days per full year of service
 * - Unused vacation days (if any)
 * - Holiday subsidy (months left to be paid)
 * 
 * Note: Holiday subsidy is 1 month annual salary divided by 12 and paid monthly.
 * For termination, employee receives remaining unpaid months.
 */
export function calcTerminationGross(
  annualSalary: number, 
  yearsOfService: number,
  vacationDaysLeft: number = 0,
  holidaySubsidyMonthsLeft: number = 0,
  paidTrainingDaysUsed: number = 0
): number {
  const dailyRate = annualSalary / 365;
  const fullYears = Math.floor(yearsOfService); // Only count full years
  
  // Base severance: 12 days per year
  const baseSeverance = dailyRate * 12 * fullYears;
  
  // Unused vacation days compensation
  const vacationCompensation = dailyRate * vacationDaysLeft;
  
  // Holiday subsidy (1 month annual salary / 12 months = monthly rate)
  // Multiply by months left to be paid
  const monthlyHolidaySubsidy = (annualSalary / 14) / 12;
  const holidaySubsidy = monthlyHolidaySubsidy * holidaySubsidyMonthsLeft;
  
  // Paid training days: Employee is entitled to 5 days per year
  // Compensation for unused training days
  const trainingDaysEntitled = fullYears * 5;
  const trainingDaysUnused = Math.max(0, trainingDaysEntitled - paidTrainingDaysUsed);
  const trainingCompensation = dailyRate * trainingDaysUnused;
  
  return Math.round(baseSeverance + vacationCompensation + holidaySubsidy + trainingCompensation);
}

/**
 * Calculate unemployment benefit duration based on age
 * Portuguese law (Subsídio de Desemprego):
 * - Under 30 years: 12 months maximum
 * - Between 30-49 years: 18 months maximum
 * - 50 years or more: 24 months maximum
 */
export function calcUnemploymentBenefitMonths(age: number): number {
  if (age < 30) {
    return 12;
  } else if (age < 50) {
    return 18;
  } else {
    return 24;
  }
}

/**
 * Calculate total unemployment benefit amount
 * Portuguese unemployment benefit is typically 65% of previous salary
 * for the first 6 months, then 55% afterwards.
 * Maximum monthly benefit is capped at €1,306.
 * This is a simplified calculation using 60% average rate.
 */
export function calcUnemploymentBenefitTotal(annualSalary: number, age: number): number {
  const months = calcUnemploymentBenefitMonths(age);
  const monthlySalary = annualSalary / 14; // Use 14-month base
  
  // Simplified: Use 60% average rate for entire period
  const calculatedMonthlyBenefit = monthlySalary * 0.60;
  
  // Cap at maximum of €1,306 per month (Portuguese law)
  const monthlyBenefit = Math.min(calculatedMonthlyBenefit, 1306);
  
  return Math.round(monthlyBenefit * months);
}

/**
 * Portuguese IRS Tax Tables (2025) - Continental Portugal
 * Source: Ministério das Finanças - Tabelas de Retenção na Fonte
 */

// Table I - Single, widowed, divorced or legally separated without dependents
const TABLE_I = [
  { from: 0, to: 820, rate: 0, parcel: 0 },
  { from: 820, to: 935, rate: 13.25, parcel: 108.65 },
  { from: 935, to: 1002, rate: 18.00, parcel: 153.06 },
  { from: 1002, to: 1123, rate: 19.00, parcel: 163.09 },
  { from: 1123, to: 1765, rate: 25.50, parcel: 236.12 },
  { from: 1765, to: 2057, rate: 32.75, parcel: 364.06 },
  { from: 2057, to: 2670, rate: 37.00, parcel: 451.48 },
  { from: 2670, to: 4210, rate: 43.50, parcel: 625.03 },
  { from: 4210, to: 6410, rate: 45.00, parcel: 688.18 },
  { from: 6410, to: 21407, rate: 48.00, parcel: 880.48 },
  { from: 21407, to: Infinity, rate: 53.00, parcel: 1951.83 }
];

// Table II - Single, widowed, divorced or legally separated with dependents
const TABLE_II = [
  { from: 0, to: 913, rate: 0, parcel: 0 },
  { from: 913, to: 1009, rate: 13.25, parcel: 120.97 },
  { from: 1009, to: 1111, rate: 18.00, parcel: 168.90 },
  { from: 1111, to: 1371, rate: 19.00, parcel: 180.00 },
  { from: 1371, to: 1891, rate: 23.00, parcel: 234.84 },
  { from: 1891, to: 2122, rate: 27.50, parcel: 320.00 },
  { from: 2122, to: 2987, rate: 33.00, parcel: 436.71 },
  { from: 2987, to: 4210, rate: 38.72, parcel: 607.51 },
  { from: 4210, to: 5809, rate: 43.50, parcel: 808.69 },
  { from: 5809, to: 21407, rate: 45.00, parcel: 895.84 },
  { from: 21407, to: Infinity, rate: 53.00, parcel: 2609.40 }
];

// Table III - Married, two wage earners
const TABLE_III = [
  { from: 0, to: 820, rate: 0, parcel: 0 },
  { from: 820, to: 935, rate: 13.25, parcel: 108.65 },
  { from: 935, to: 1002, rate: 18.00, parcel: 153.06 },
  { from: 1002, to: 1123, rate: 19.00, parcel: 163.09 },
  { from: 1123, to: 1801, rate: 24.00, parcel: 219.38 },
  { from: 1801, to: 2057, rate: 27.50, parcel: 282.41 },
  { from: 2057, to: 2987, rate: 33.00, parcel: 395.54 },
  { from: 2987, to: 4210, rate: 37.00, parcel: 515.02 },
  { from: 4210, to: 5809, rate: 43.50, parcel: 788.67 },
  { from: 5809, to: 21407, rate: 45.00, parcel: 875.82 },
  { from: 21407, to: Infinity, rate: 53.00, parcel: 2589.38 }
];

/**
 * Calculate net payout after IRS and Social Security deductions
 * For mutual agreement compensation
 */
export function estimateNet(
  grossAmount: number,
  maritalStatus: 'Single' | 'Married',
  dependents: number
): number {
  // Social Security contribution: 11%
  const socialSecurity = grossAmount * 0.11;
  
  // Select appropriate tax table to get maximum tax rate
  let table;
  if (maritalStatus === 'Single') {
    table = dependents > 0 ? TABLE_II : TABLE_I;
  } else {
    table = TABLE_III; // Married, two wage earners
  }
  
  // Use the highest tax bracket (maximum tax rate)
  const highestBracket = table[table.length - 1];
  const totalIRS = grossAmount * (highestBracket.rate / 100) - highestBracket.parcel;
  
  // Net amount after all deductions
  const netAmount = grossAmount - socialSecurity - Math.max(0, totalIRS);
  
  return Math.round(Math.max(0, netAmount)); // Ensure non-negative
}

/**
 * Validate input data and return any errors
 */
export function validateInputs(data: InputData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data.yearsOfService < 0 || data.yearsOfService > 45) {
    errors.push({
      field: 'yearsOfService',
      message: 'Years of service must be between 0 and 45'
    });
  }

  if (data.annualSalary < 1000) {
    errors.push({
      field: 'annualSalary',
      message: 'Annual salary must be at least €1,000'
    });
  }

  if (data.mutualMonths < 0 || data.mutualMonths > 36) {
    errors.push({
      field: 'mutualMonths',
      message: 'Mutual agreement months must be between 0 and 36'
    });
  }

  if (data.dependents < 0 || data.dependents > 6) {
    errors.push({
      field: 'dependents',
      message: 'Number of dependents must be between 0 and 6'
    });
  }

  if (data.vacationDaysLeft < 0 || data.vacationDaysLeft > 30) {
    errors.push({
      field: 'vacationDaysLeft',
      message: 'Vacation days left must be between 0 and 30'
    });
  }

  if (data.holidaySubsidyMonthsLeft < 0 || data.holidaySubsidyMonthsLeft > 12) {
    errors.push({
      field: 'holidaySubsidyMonthsLeft',
      message: 'Holiday subsidy months left must be between 0 and 12'
    });
  }

  if (data.age < 18 || data.age > 70) {
    errors.push({
      field: 'age',
      message: 'Age must be between 18 and 70'
    });
  }

  // Maximum training days: 5 per year × years of service
  const maxTrainingDays = Math.floor(data.yearsOfService) * 5;
  if (data.paidTrainingDaysUsed < 0 || data.paidTrainingDaysUsed > maxTrainingDays) {
    errors.push({
      field: 'paidTrainingDaysUsed',
      message: `Paid training days used must be between 0 and ${maxTrainingDays} (5 days per year × ${Math.floor(data.yearsOfService)} years)`
    });
  }

  return errors;
}

/**
 * Format currency for Portuguese locale
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculate comparison results between mutual and termination
 */
export function calculateComparison(data: InputData): ComparisonResult {
  const mutualGross = calcMutualGross(data.annualSalary, data.mutualMonths, data.yearsOfService, data.mutualMonthsType);
  const terminationGross = calcTerminationGross(
    data.annualSalary, 
    data.yearsOfService,
    data.vacationDaysLeft,
    data.holidaySubsidyMonthsLeft,
    data.paidTrainingDaysUsed
  );
  
  // Calculate net values
  // Mutual agreement: subject to IRS and Social Security taxation
  const mutualNet = estimateNet(mutualGross, data.maritalStatus, data.dependents);
  // Contract termination: exempt from taxation (gross = net)
  const terminationNet = terminationGross;
  
  // Calculate unemployment benefit (only for termination scenario)
  const unemploymentBenefitMonths = calcUnemploymentBenefitMonths(data.age);
  const unemploymentBenefitTotal = calcUnemploymentBenefitTotal(data.annualSalary, data.age);
  
  // Add unemployment benefit to termination net value for comparison
  const terminationNetWithBenefit = terminationNet + unemploymentBenefitTotal;
  
  let betterOption: 'mutual' | 'termination' | 'equal';
  let difference: number;

  // Compare based on NET values including unemployment benefit for termination
  if (mutualNet > terminationNetWithBenefit) {
    betterOption = 'mutual';
    difference = mutualNet - terminationNetWithBenefit;
  } else if (terminationNetWithBenefit > mutualNet) {
    betterOption = 'termination';
    difference = terminationNetWithBenefit - mutualNet;
  } else {
    betterOption = 'equal';
    difference = 0;
  }

  return {
    betterOption,
    difference,
    mutualGross,
    terminationGross,
    mutualNet,
    terminationNet,
    unemploymentBenefitMonths,
    unemploymentBenefitTotal
  };
}