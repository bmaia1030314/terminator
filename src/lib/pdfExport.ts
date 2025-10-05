import jsPDF from 'jspdf';
import type { ComparisonResult, InputData } from '../types';
import { formatCurrency } from './calc';
import type { Language } from './translations';
import { t } from './translations';

/**
 * Export calculation results to PDF
 */
export function exportToPDF(
  result: ComparisonResult,
  inputData: InputData,
  language: Language
): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(t('headerTitle', language), pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(t('headerTagline', language), pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;

  // Input Details Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(t('yourDetails', language), 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const details = [
    `${t('yearsOfService', language)}: ${inputData.yearsOfService} ${language === 'en' ? 'years' : 'anos'}`,
    `${t('age', language)}: ${inputData.age} ${language === 'en' ? 'years' : 'anos'}`,
    `${t('annualSalary', language)}: ${formatCurrency(inputData.annualSalary)}`,
    `${t('mutualAgreement', language)}: ${inputData.mutualMonths} ${inputData.mutualMonthsType === 'perYear' ? t('mutualAgreementPerYear', language) : t('mutualAgreementTotal', language)}`,
    `${t('maritalStatus', language)}: ${inputData.maritalStatus === 'Single' ? t('maritalStatusSingle', language) : t('maritalStatusMarried', language)}`,
    `${t('numberOfDependents', language)}: ${inputData.dependents}`,
    `${t('unusedVacationDays', language)}: ${inputData.vacationDaysLeft}`,
    `${t('holidaySubsidyMonthsLeft', language)}: ${inputData.holidaySubsidyMonthsLeft}`,
    `${t('paidTrainingDaysUsed', language)}: ${inputData.paidTrainingDaysUsed}`
  ];

  details.forEach(detail => {
    doc.text(detail, 14, yPos);
    yPos += 6;
  });

  yPos += 10;

  // Results Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(t('comparisonResultsTitle', language), 14, yPos);
  yPos += 10;

  // Mutual Agreement Card
  doc.setFillColor(220, 252, 231);
  doc.rect(14, yPos, pageWidth - 28, 40, 'F');
  
  yPos += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(t('mutualAgreementCard', language), 20, yPos);
  
  yPos += 8;
  doc.setFontSize(14);
  doc.text(`${t('grossCompensation', language)}: ${formatCurrency(result.mutualGross)}`, 20, yPos);
  
  if (result.mutualNet) {
    yPos += 7;
    doc.setFontSize(12);
    doc.text(`${t('netAfterTax', language)}: ${formatCurrency(result.mutualNet)}`, 20, yPos);
  }

  yPos += 15;

  // Contract Termination Card
  doc.setFillColor(219, 234, 254);
  doc.rect(14, yPos, pageWidth - 28, 50, 'F');
  
  yPos += 8;
  doc.setFont('helvetica', 'bold');
  doc.text(t('contractTerminationCard', language), 20, yPos);
  
  yPos += 8;
  doc.setFontSize(14);
  doc.text(`${t('grossCompensation', language)}: ${formatCurrency(result.terminationGross)}`, 20, yPos);
  
  if (result.terminationNet) {
    yPos += 7;
    doc.setFontSize(12);
    doc.text(`${t('netAfterTax', language)}: ${formatCurrency(result.terminationNet)}`, 20, yPos);
  }

  if (result.unemploymentBenefitTotal && result.unemploymentBenefitTotal > 0) {
    yPos += 7;
    const unemploymentText = language === 'en' 
      ? `Unemployment Benefit: ${formatCurrency(result.unemploymentBenefitTotal)} (${result.unemploymentBenefitMonths} months)`
      : `Subsídio de Desemprego: ${formatCurrency(result.unemploymentBenefitTotal)} (${result.unemploymentBenefitMonths} meses)`;
    doc.text(unemploymentText, 20, yPos);
  }

  yPos += 15;

  // Recommendation
  const isMutualBetter = result.mutualNet && result.terminationNet 
    ? result.mutualNet > (result.terminationNet + (result.unemploymentBenefitTotal || 0))
    : result.mutualGross > result.terminationGross;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const recommendationText = language === 'en'
    ? `Recommended: ${isMutualBetter ? 'Mutual Agreement' : 'Contract Termination'}`
    : `Recomendado: ${isMutualBetter ? 'Acordo Mútuo' : 'Despedimento por Contrato'}`;
  doc.text(recommendationText, 14, yPos);

  yPos += 10;

  // Legal Disclaimer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  const disclaimer = doc.splitTextToSize(t('legalNoteText', language), pageWidth - 28);
  doc.text(disclaimer, 14, yPos);

  // Footer
  yPos = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const today = new Date().toLocaleDateString(language === 'en' ? 'en-GB' : 'pt-PT');
  doc.text(`${language === 'en' ? 'Generated on' : 'Gerado em'}: ${today}`, pageWidth / 2, yPos, { align: 'center' });

  // Save the PDF
  const filename = language === 'en' 
    ? 'employment-exit-calculation.pdf'
    : 'calculo-rescisao-contrato.pdf';
  doc.save(filename);
}
