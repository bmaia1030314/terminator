// Translation system for English and Portuguese

export type Language = 'en' | 'pt';

export interface Translations {
  // Header
  headerTitle: string;
  headerTagline: string;
  
  // Form Labels
  yourDetails: string;
  yearsOfService: string;
  age: string;
  ageHelper: string;
  annualSalary: string;
  mutualAgreement: string;
  mutualAgreementPerYear: string;
  mutualAgreementTotal: string;
  switchToTotal: string;
  switchToPerYear: string;
  mutualHelperPerYear: string;
  mutualHelperTotal: string;
  maritalStatus: string;
  maritalStatusSingle: string;
  maritalStatusMarried: string;
  numberOfDependents: string;
  unusedVacationDays: string;
  vacationDaysHelper: string;
  holidaySubsidyMonthsLeft: string;
  holidaySubsidyHelper: string;
  paidTrainingDaysUsed: string;
  trainingDaysHelper: string;
  calculateButton: string;
  resetButton: string;
  
  // Results
  comparisonResultsTitle: string;
  comparisonResultsSubtitle: string;
  fillDetailsPrompt: string;
  bestOption: string;
  mutualAgreementCard: string;
  contractTerminationCard: string;
  grossCompensation: string;
  netAfterTax: string;
  severanceTaxExempt: string;
  unemployment: string;
  unemploymentMonths: string;
  totalNetWithBenefit: string;
  
  // Summary
  summaryTitle: string;
  summaryProvides: string;
  summaryMoreCompensation: string;
  summaryIncludingBenefit: string;
  keyDifference: string;
  mutualAgreementNote: string;
  contractTerminationNote: string;
  considerDiscussing: string;
  
  // Troubleshoot Mode
  showFormulaDetails: string;
  hideFormulaDetails: string;
  troubleshootTitle: string;
  mutualAgreementCalculation: string;
  contractTerminationCalculation: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  baseSeverance: string;
  vacationCompensation: string;
  holidaySubsidy: string;
  trainingCompensation: string;
  totalGross: string;
  taxTreatment: string;
  addUnemployment: string;
  benefitDuration: string;
  calculatedMonthly: string;
  cappedAt: string;
  monthlyBenefitAfterCap: string;
  totalBenefit: string;
  totalCompensationWithUnemployment: string;
  
  // Legal Note
  legalNoteTitle: string;
  legalNoteText: string;
  
  // Footer
  footerText: string;
  methodologyLink: string;
  exportPdf: string;
  footerCopyright: string;
  
  // Validation Errors
  errorYearsOfService: string;
  errorAnnualSalary: string;
  errorMutualMonths: string;
  errorDependents: string;
  errorVacationDays: string;
  errorHolidaySubsidy: string;
  errorAge: string;
  errorTrainingDays: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    headerTitle: 'Mutual vs Termination',
    headerTagline: 'Your Employment Exit Calculator for Portuguese Labor Law',
    
    // Form Labels
    yourDetails: 'Your Details',
    yearsOfService: 'Years of Service',
    age: 'Age',
    ageHelper: 'Used to calculate unemployment benefit duration',
    annualSalary: 'Annual Salary (€)',
    mutualAgreement: 'Mutual Agreement',
    mutualAgreementPerYear: 'months per year',
    mutualAgreementTotal: 'total months',
    switchToTotal: '📊 Switch to Total',
    switchToPerYear: '📅 Switch to Per Year',
    mutualHelperPerYear: 'e.g., {months} months/year × {years} years = {total} months total',
    mutualHelperTotal: 'Total of {months} months compensation',
    maritalStatus: 'Marital Status',
    maritalStatusSingle: 'Single',
    maritalStatusMarried: 'Married',
    numberOfDependents: 'Number of Dependents',
    unusedVacationDays: 'Unused Vacation Days (current year)',
    vacationDaysHelper: "Days you haven't taken yet (adds to termination compensation)",
    holidaySubsidyMonthsLeft: 'Holiday Subsidy Months Left',
    holidaySubsidyHelper: 'Holiday subsidy is paid monthly (1/12 of annual). Enter months not yet received (0-12)',
    paidTrainingDaysUsed: 'Paid Training Days Used',
    trainingDaysHelper: "You're entitled to 5 paid training days per year. Unused days = {unused} ({years} years × 5 = {total} days total)",
    calculateButton: '🧮 Calculate',
    resetButton: '🔄 Reset',
    
    // Results
    comparisonResultsTitle: 'Your Comparison Results',
    comparisonResultsSubtitle: 'Based on your employment details',
    fillDetailsPrompt: 'Fill in your details to see personalized calculations',
    bestOption: '✅ BEST OPTION',
    mutualAgreementCard: 'Mutual Agreement',
    contractTerminationCard: 'Contract Termination',
    grossCompensation: 'Gross compensation',
    netAfterTax: 'Net (after IRS + 11% SS)',
    severanceTaxExempt: 'Severance (Tax-exempt)',
    unemployment: 'Unemployment',
    unemploymentMonths: '{months} months',
    totalNetWithBenefit: 'Total Net (with benefit)',
    
    // Summary
    summaryTitle: '💡 Summary',
    summaryProvides: 'The',
    summaryMoreCompensation: 'option provides',
    summaryIncludingBenefit: '(including unemployment benefit)',
    keyDifference: '📊 Key Difference:',
    mutualAgreementNote: 'Subject to IRS taxation (up to 53%) and 11% Social Security contributions',
    contractTerminationNote: 'Tax-exempt compensation PLUS unemployment benefit eligibility ({months} months at ~60% salary = {total})',
    considerDiscussing: 'Consider discussing both options with HR and seeking professional advice to understand the full implications including timing and legal rights.',
    
    // Troubleshoot Mode
    showFormulaDetails: '📝 Show Formula Details',
    hideFormulaDetails: '✖ Hide Formula Details',
    troubleshootTitle: 'Troubleshoot Mode: Calculation Details',
    mutualAgreementCalculation: 'Mutual Agreement Calculation',
    contractTerminationCalculation: 'Contract Termination Calculation',
    step1: 'Step 1: Base Severance Compensation',
    step2: 'Step 2: Add Unused Vacation Days',
    step3: 'Step 3: Add Holiday Subsidy',
    step4: 'Step 4: Add Training Days Compensation',
    step5: 'Step 5: Add Unemployment Benefit (Subsídio de Desemprego)',
    baseSeverance: 'Base Severance',
    vacationCompensation: 'Vacation Compensation',
    holidaySubsidy: 'Holiday Subsidy',
    trainingCompensation: 'Training Compensation',
    totalGross: 'Total Gross',
    taxTreatment: 'Tax Treatment',
    addUnemployment: 'Add Unemployment',
    benefitDuration: 'Benefit Duration',
    calculatedMonthly: 'Calculated Monthly',
    cappedAt: 'Capped at €1,306',
    monthlyBenefitAfterCap: 'Monthly Benefit (after cap)',
    totalBenefit: 'Total Benefit',
    totalCompensationWithUnemployment: 'Total Compensation (with Unemployment)',
    
    // Legal Note
    legalNoteTitle: '⚖️ Legal Disclaimer',
    legalNoteText: 'This calculator provides estimates based on standard Portuguese labor law. Actual amounts may vary. Consult with HR and legal professionals for specific advice.',
    
    // Footer
    footerText: 'Built with Portuguese Labor Law Compliance',
    methodologyLink: '📘 View Methodology',
    exportPdf: 'Export PDF (coming soon)',
    footerCopyright: '© 2025 Employment Exit Calculator | 🇵🇹 Portuguese Labor Law Educational Tool',
    
    // Validation Errors
    errorYearsOfService: 'Years of service must be between 0 and 45',
    errorAnnualSalary: 'Annual salary must be at least €1,000',
    errorMutualMonths: 'Mutual agreement months must be between 0 and 36',
    errorDependents: 'Number of dependents must be between 0 and 6',
    errorVacationDays: 'Vacation days left must be between 0 and 30',
    errorHolidaySubsidy: 'Holiday subsidy months left must be between 0 and 12',
    errorAge: 'Age must be between 18 and 70',
    errorTrainingDays: 'Paid training days used must be between 0 and {max} (5 days per year × {years} years)',
  },
  
  pt: {
    // Header
    headerTitle: 'Acordo Mútuo vs Despedimento',
    headerTagline: 'Calculadora de Cessação de Contrato sob a Lei Laboral Portuguesa',
    
    // Form Labels
    yourDetails: 'Os Seus Dados',
    yearsOfService: 'Anos de Serviço',
    age: 'Idade',
    ageHelper: 'Usado para calcular a duração do subsídio de desemprego',
    annualSalary: 'Salário Anual (€)',
    mutualAgreement: 'Acordo Mútuo',
    mutualAgreementPerYear: 'meses por ano',
    mutualAgreementTotal: 'meses totais',
    switchToTotal: '📊 Mudar para Total',
    switchToPerYear: '📅 Mudar para Por Ano',
    mutualHelperPerYear: 'ex: {months} meses/ano × {years} anos = {total} meses no total',
    mutualHelperTotal: 'Total de {months} meses de compensação',
    maritalStatus: 'Estado Civil',
    maritalStatusSingle: 'Solteiro(a)',
    maritalStatusMarried: 'Casado(a)',
    numberOfDependents: 'Número de Dependentes',
    unusedVacationDays: 'Dias de Férias Não Gozados (ano corrente)',
    vacationDaysHelper: 'Dias que ainda não tirou (adicionado à compensação de despedimento)',
    holidaySubsidyMonthsLeft: 'Meses de Subsídio de Férias em Falta',
    holidaySubsidyHelper: 'Subsídio de férias é pago mensalmente (1/12 do anual). Indique meses ainda não recebidos (0-12)',
    paidTrainingDaysUsed: 'Dias de Formação Pagos Usados',
    trainingDaysHelper: 'Tem direito a 5 dias de formação pagos por ano. Dias não usados = {unused} ({years} anos × 5 = {total} dias no total)',
    calculateButton: '🧮 Calcular',
    resetButton: '🔄 Limpar',
    
    // Results
    comparisonResultsTitle: 'Os Seus Resultados Comparativos',
    comparisonResultsSubtitle: 'Baseado nos seus dados laborais',
    fillDetailsPrompt: 'Preencha os seus dados para ver os cálculos personalizados',
    bestOption: '✅ MELHOR OPÇÃO',
    mutualAgreementCard: 'Acordo Mútuo',
    contractTerminationCard: 'Despedimento por Contrato',
    grossCompensation: 'Compensação bruta',
    netAfterTax: 'Líquido (após IRS + 11% SS)',
    severanceTaxExempt: 'Indemnização (Isenta de impostos)',
    unemployment: 'Desemprego',
    unemploymentMonths: '{months} meses',
    totalNetWithBenefit: 'Total Líquido (com subsídio)',
    
    // Summary
    summaryTitle: '💡 Resumo',
    summaryProvides: 'A opção de',
    summaryMoreCompensation: 'proporciona',
    summaryIncludingBenefit: '(incluindo subsídio de desemprego)',
    keyDifference: '📊 Diferença Principal:',
    mutualAgreementNote: 'Sujeito a tributação IRS (até 53%) e 11% de contribuições para Segurança Social',
    contractTerminationNote: 'Compensação isenta de impostos MAIS elegibilidade para subsídio de desemprego ({months} meses a ~60% do salário = {total})',
    considerDiscussing: 'Considere discutir ambas as opções com RH e procurar aconselhamento profissional para entender as implicações completas, incluindo prazos e direitos legais.',
    
    // Troubleshoot Mode
    showFormulaDetails: '📝 Mostrar Detalhes da Fórmula',
    hideFormulaDetails: '✖ Ocultar Detalhes da Fórmula',
    troubleshootTitle: 'Modo de Diagnóstico: Detalhes do Cálculo',
    mutualAgreementCalculation: 'Cálculo do Acordo Mútuo',
    contractTerminationCalculation: 'Cálculo do Despedimento',
    step1: 'Passo 1: Compensação Base de Indemnização',
    step2: 'Passo 2: Adicionar Dias de Férias Não Gozados',
    step3: 'Passo 3: Adicionar Subsídio de Férias',
    step4: 'Passo 4: Adicionar Compensação de Dias de Formação',
    step5: 'Passo 5: Adicionar Subsídio de Desemprego',
    baseSeverance: 'Indemnização Base',
    vacationCompensation: 'Compensação de Férias',
    holidaySubsidy: 'Subsídio de Férias',
    trainingCompensation: 'Compensação de Formação',
    totalGross: 'Total Bruto',
    taxTreatment: 'Tratamento Fiscal',
    addUnemployment: 'Adicionar Desemprego',
    benefitDuration: 'Duração do Subsídio',
    calculatedMonthly: 'Mensal Calculado',
    cappedAt: 'Limitado a 1.306€',
    monthlyBenefitAfterCap: 'Subsídio Mensal (após limite)',
    totalBenefit: 'Subsídio Total',
    totalCompensationWithUnemployment: 'Compensação Total (com Desemprego)',
    
    // Legal Note
    legalNoteTitle: '⚖️ Aviso Legal',
    legalNoteText: 'Esta calculadora fornece estimativas baseadas na lei laboral portuguesa padrão. Os valores reais podem variar. Consulte RH e profissionais legais para aconselhamento específico.',
    
    // Footer
    footerText: 'Construído com Conformidade à Lei Laboral Portuguesa',
    methodologyLink: '📘 Ver Metodologia',
    exportPdf: 'Exportar PDF (em breve)',
    footerCopyright: '© 2025 Calculadora de Rescisão de Contrato | 🇵🇹 Ferramenta Educacional de Direito Laboral Português',
    
    // Validation Errors
    errorYearsOfService: 'Anos de serviço devem estar entre 0 e 45',
    errorAnnualSalary: 'Salário anual deve ser pelo menos 1.000€',
    errorMutualMonths: 'Meses de acordo mútuo devem estar entre 0 e 36',
    errorDependents: 'Número de dependentes deve estar entre 0 e 6',
    errorVacationDays: 'Dias de férias restantes devem estar entre 0 e 30',
    errorHolidaySubsidy: 'Meses de subsídio de férias restantes devem estar entre 0 e 12',
    errorAge: 'Idade deve estar entre 18 e 70',
    errorTrainingDays: 'Dias de formação pagos usados devem estar entre 0 e {max} (5 dias por ano × {years} anos)',
  }
};

// Helper function to replace placeholders in translation strings
export function t(key: keyof Translations, lang: Language, params?: Record<string, string | number>): string {
  let text = translations[lang][key];
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value));
    });
  }
  
  return text;
}
