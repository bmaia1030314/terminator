import type { ComparisonResult, InputData } from '../types';
import { formatCurrency } from '../lib/calc';
import type { Language } from '../lib/translations';
import { t } from '../lib/translations';

interface ResultsComparisonProps {
  result: ComparisonResult | null;
  inputData?: InputData | null;
  troubleshootMode?: boolean;
  language: Language;
}

/**
 * Display side-by-side comparison of mutual agreement vs contract termination
 * Shows gross payouts with highlight banner for better option
 */
export function ResultsComparison({ result, inputData, troubleshootMode = false, language }: ResultsComparisonProps) {
  if (!result) {
    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>
            {t('comparisonResultsTitle', language)}
          </h2>
          <p style={{ color: '#6b7280' }}>
            {t('fillDetailsPrompt', language)}
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
          gap: '1rem' 
        }}>
          {/* Mutual Agreement Placeholder */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
            border: '2px solid #bbf7d0'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1.5rem' 
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                🤝
              </div>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {t('mutualAgreement', language)}
            </h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#374151',
              textAlign: 'center',
              marginBottom: '0.5rem'
            }}>
              €
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              textAlign: 'center'
            }}>
              {t('fillDetailsPrompt', language)}
            </p>
          </div>

          {/* Contract Termination Placeholder */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
            border: '2px solid #bfdbfe'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1.5rem' 
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                ⚖️
              </div>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {t('contractTerminationCard', language)}
            </h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#374151',
              textAlign: 'center',
              marginBottom: '0.5rem'
            }}>
              €
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              textAlign: 'center'
            }}>
              {t('fillDetailsPrompt', language)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Compare NET values including unemployment benefit for termination
  const terminationNetWithBenefit = (result.terminationNet || 0) + (result.unemploymentBenefitTotal || 0);
  const isMutualBetter = (result.mutualNet || 0) >= terminationNetWithBenefit;

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '0.5rem'
        }}>
          Your Comparison Results
        </h2>
        <p style={{ color: '#6b7280' }}>
          Based on your employment details
        </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {/* Mutual Agreement Result */}
        <div className="card" style={{
          background: isMutualBetter 
            ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' 
            : 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
          border: isMutualBetter 
            ? '2px solid #22c55e' 
            : '2px solid #e5e7eb',
          position: 'relative'
        }}>
          {isMutualBetter && (
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#22c55e',
              color: 'white',
              padding: '0.25rem 1rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              ✨ BEST OPTION
            </div>
          )}
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: isMutualBetter ? '#dcfce7' : '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              🤝
            </div>
          </div>
          
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {t('mutualAgreementCard', language)}
          </h3>
          
          {result.mutualNet && (
            <>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: isMutualBetter ? '#16a34a' : '#374151',
                textAlign: 'center',
                marginBottom: '0.5rem'
              }}>
                {formatCurrency(result.mutualNet)}
              </div>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                textAlign: 'center',
                marginBottom: '0.75rem'
              }}>
                {t('netAfterTaxMutual', language)}
              </p>
            </>
          )}

          <div style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: isMutualBetter ? '#059669' : '#6b7280',
            textAlign: 'center',
            marginBottom: '0.25rem'
          }}>
            {formatCurrency(result.mutualGross)}
          </div>
          
          <p style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            textAlign: 'center'
          }}>
            {t('grossCompensation', language)}
          </p>
        </div>

        {/* Contract Termination Result */}
        <div className="card" style={{
          background: !isMutualBetter 
            ? 'linear-gradient(135deg, #eff6ff, #dbeafe)' 
            : 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
          border: !isMutualBetter 
            ? '2px solid #3b82f6' 
            : '2px solid #e5e7eb',
          position: 'relative'
        }}>
          {!isMutualBetter && (
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#3b82f6',
              color: 'white',
              padding: '0.25rem 1rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              ✨ BEST OPTION
            </div>
          )}
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: !isMutualBetter ? '#dbeafe' : '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              ⚖️
            </div>
          </div>
          
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {t('contractTerminationCard', language)}
          </h3>
          
          {result.terminationNet && (
            <>
              {/* Total Net Value with Benefit - TOP */}
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: !isMutualBetter ? '#1d4ed8' : '#374151',
                textAlign: 'center',
                marginBottom: '0.5rem'
              }}>
                {formatCurrency(result.terminationNet + (result.unemploymentBenefitTotal || 0))}
              </div>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                textAlign: 'center',
                marginBottom: '0.75rem'
              }}>
                Total Net (with benefit)
              </p>

              {/* Show breakdown */}
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    Severance (Tax-exempt)
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#1e293b',
                    fontWeight: '600'
                  }}>
                    {formatCurrency(result.terminationNet)}
                  </span>
                </div>

                {/* Unemployment Benefit */}
                {result.unemploymentBenefitTotal && result.unemploymentBenefitMonths && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#1e40af',
                      fontWeight: '500'
                    }}>
                      Unemployment ({result.unemploymentBenefitMonths} months)
                    </span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#1e40af',
                      fontWeight: '600'
                    }}>
                      {formatCurrency(result.unemploymentBenefitTotal)}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Gross Value - BOTTOM */}
          <div style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: !isMutualBetter ? '#1e40af' : '#6b7280',
            textAlign: 'center',
            marginBottom: '0.25rem'
          }}>
            {formatCurrency(result.terminationGross)}
          </div>
          
          <p style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            textAlign: 'center'
          }}>
            {t('grossCompensation', language)}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="card" style={{
        marginTop: '2rem',
        background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        border: '1px solid #e2e8f0'
      }}>
        <h4 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '0.75rem'
        }}>
          💡 Summary
        </h4>
        <p style={{
          fontSize: '0.875rem',
          color: '#475569',
          lineHeight: '1.5',
          marginBottom: '0.75rem'
        }}>
          The <strong>{isMutualBetter ? 'Mutual Agreement' : 'Contract Termination'}</strong> option 
          provides <strong>{formatCurrency(result.difference)}</strong> more 
          in total compensation{!isMutualBetter ? ' (including unemployment benefit)' : ''}.
        </p>
        <p style={{
          fontSize: '0.875rem',
          color: '#475569',
          lineHeight: '1.5',
          marginBottom: '0.5rem'
        }}>
          <strong>📊 Key Difference:</strong>
        </p>
        <ul style={{
          fontSize: '0.875rem',
          color: '#475569',
          lineHeight: '1.5',
          paddingLeft: '1.5rem',
          marginBottom: '0.75rem'
        }}>
          <li><strong>Mutual Agreement:</strong> 12 days per year are IRS tax-free. Remaining amount subject to IRS taxation (up to 53%). NO Social Security (11%) applied!</li>
          <li><strong>Contract Termination:</strong> Tax-exempt compensation PLUS unemployment benefit eligibility ({result.unemploymentBenefitMonths} months at ~60% salary = {result.unemploymentBenefitTotal ? formatCurrency(result.unemploymentBenefitTotal) : '€0'})</li>
        </ul>
        <p style={{
          fontSize: '0.875rem',
          color: '#475569',
          lineHeight: '1.5'
        }}>
          Consider discussing both options with HR and seeking professional advice to understand 
          the full implications including timing and legal rights.
        </p>
      </div>

      {/* Troubleshoot Mode - Detailed Formula Breakdown */}
      {troubleshootMode && inputData && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f8fafc',
          borderRadius: '0.5rem',
          border: '2px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🔧 Troubleshoot Mode: Calculation Details
          </h3>

          {/* Mutual Agreement Breakdown */}
          <div style={{
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#0f172a',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid #3b82f6'
            }}>
              Mutual Agreement (Revogação por Mútuo Acordo)
            </h4>

            <div style={{ fontSize: '0.875rem', color: '#475569', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Step 1: Calculate Gross Amount</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Monthly Salary = €{inputData.annualSalary.toFixed(2)} ÷ 14 months = €{(inputData.annualSalary / 14).toFixed(2)}
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Total Months = {inputData.mutualMonths} months/year × {inputData.yearsOfService} years = {(inputData.mutualMonths * inputData.yearsOfService).toFixed(1)} months
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                <strong>Gross = €{(inputData.annualSalary / 14).toFixed(2)} × {(inputData.mutualMonths * inputData.yearsOfService).toFixed(1)} = €{result.mutualGross.toFixed(2)}</strong>
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Step 2: Calculate Tax-Exempt Amount (IRS Free)</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#dcfce7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Daily Salary = €{inputData.annualSalary.toFixed(2)} ÷ 365 days = €{(inputData.annualSalary / 365).toFixed(2)}
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#dcfce7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Tax-Exempt Days = 12 days/year × {Math.floor(inputData.yearsOfService)} years = {12 * Math.floor(inputData.yearsOfService)} days
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#dcfce7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                <strong>✅ Tax-Exempt Amount = €{(inputData.annualSalary / 365).toFixed(2)} × {12 * Math.floor(inputData.yearsOfService)} = €{((inputData.annualSalary / 365) * 12 * Math.floor(inputData.yearsOfService)).toFixed(2)}</strong>
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Step 3: Calculate Taxable Portion</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#fef3c7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Taxable Amount = €{result.mutualGross.toFixed(2)} - €{((inputData.annualSalary / 365) * 12 * Math.floor(inputData.yearsOfService)).toFixed(2)} = €{Math.max(0, result.mutualGross - ((inputData.annualSalary / 365) * 12 * Math.floor(inputData.yearsOfService))).toFixed(2)}
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Step 4: Apply IRS Tax on Taxable Portion Only</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                Tax Category: {inputData.maritalStatus === 'Single' ? (inputData.dependents > 0 ? 'Single with Dependents (Table II)' : 'Single (Table I)') : 'Married (Table III)'}
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                Dependents: {inputData.dependents}
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#fef3c7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                IRS Tax Base = €{Math.max(0, result.mutualGross - ((inputData.annualSalary / 365) * 12 * Math.floor(inputData.yearsOfService))).toFixed(2)} (only taxable portion)
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#fef3c7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Maximum Bracket Rate = 53.00% (highest IRS tax bracket)
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#fef3c7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                IRS Tax = (€{Math.max(0, result.mutualGross - ((inputData.annualSalary / 365) * 12 * Math.floor(inputData.yearsOfService))).toFixed(2)} × 53%) - Parcel ≈ €{result.mutualNet ? (result.mutualGross - result.mutualNet).toFixed(2) : '0.00'}
              </p>

              <p style={{ marginBottom: '0.75rem', backgroundColor: '#dcfce7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                <strong>⚠️ No Social Security (11%) - Does NOT apply to mutual agreements!</strong>
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Final Net Amount</strong>
              </p>
              <p style={{ marginLeft: '1rem', fontFamily: 'monospace', backgroundColor: '#dcfce7', padding: '0.75rem', borderRadius: '0.25rem', fontSize: '1rem' }}>
                <strong>Net = Gross - IRS Tax = €{result.mutualNet ? result.mutualNet.toFixed(2) : '0.00'}</strong>
              </p>
            </div>
          </div>

          {/* Contract Termination Breakdown */}
          <div style={{
            padding: '1rem',
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#0f172a',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid #10b981'
            }}>
              Contract Termination (Despedimento por Mútuo Acordo)
            </h4>

            <div style={{ fontSize: '0.875rem', color: '#475569', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Step 1: Calculate Base Severance</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Daily Salary = €{inputData.annualSalary.toFixed(2)} ÷ 365 days = €{(inputData.annualSalary / 365).toFixed(2)}
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Severance Days = 12 days/year × {inputData.yearsOfService} years = {12 * inputData.yearsOfService} days
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Base Severance = €{(inputData.annualSalary / 365).toFixed(2)} × {12 * inputData.yearsOfService} days = €{((inputData.annualSalary / 365) * 12 * inputData.yearsOfService).toFixed(2)}
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Step 2: Add Unused Vacation Days</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Vacation Days Left = {inputData.vacationDaysLeft} days
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Vacation Compensation = €{(inputData.annualSalary / 365).toFixed(2)} × {inputData.vacationDaysLeft} days = €{((inputData.annualSalary / 365) * inputData.vacationDaysLeft).toFixed(2)}
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Step 3: Add Holiday Subsidy (unpaid months)</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Monthly Holiday Subsidy = €{inputData.annualSalary.toFixed(2)} ÷ 14 ÷ 12 = €{((inputData.annualSalary / 14) / 12).toFixed(2)}
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Months Left to be Paid = {inputData.holidaySubsidyMonthsLeft} months
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Holiday Subsidy = €{((inputData.annualSalary / 14) / 12).toFixed(2)} × {inputData.holidaySubsidyMonthsLeft} = €{(((inputData.annualSalary / 14) / 12) * inputData.holidaySubsidyMonthsLeft).toFixed(2)}
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Total Gross Amount</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#dcfce7', padding: '0.75rem', borderRadius: '0.25rem', fontSize: '1rem' }}>
                <strong>Gross = €{result.terminationGross.toFixed(2)}</strong>
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Step 4: Tax Treatment</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#fef3c7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                ✅ <strong>TAX-EXEMPT</strong> - Contract termination compensation (including vacation and holiday subsidy) is not subject to IRS or Social Security
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Final Net Amount</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#dcfce7', padding: '0.75rem', borderRadius: '0.25rem', fontSize: '1rem' }}>
                <strong>Net = €{result.terminationNet ? result.terminationNet.toFixed(2) : result.terminationGross.toFixed(2)} (same as gross)</strong>
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Step 5: Add Unemployment Benefit (Subsídio de Desemprego)</strong>
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#eff6ff', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Age = {inputData.age} years
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#eff6ff', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Benefit Duration = {result.unemploymentBenefitMonths} months (
                {inputData.age < 30 ? 'under 30 years' : inputData.age < 50 ? '30-49 years' : '50+ years'})
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', backgroundColor: '#eff6ff', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Calculated Monthly = €{(inputData.annualSalary / 14).toFixed(2)} × 60% = €{((inputData.annualSalary / 14) * 0.60).toFixed(2)}
                {((inputData.annualSalary / 14) * 0.60) > 1306 && (
                  <span style={{ color: '#dc2626', fontWeight: 'bold' }}> → Capped at €1,306</span>
                )}
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#eff6ff', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Monthly Benefit (after cap) = €{Math.min((inputData.annualSalary / 14) * 0.60, 1306).toFixed(2)}
              </p>
              <p style={{ marginLeft: '1rem', marginBottom: '1rem', fontFamily: 'monospace', backgroundColor: '#eff6ff', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Total Benefit = €{Math.min((inputData.annualSalary / 14) * 0.60, 1306).toFixed(2)} × {result.unemploymentBenefitMonths} months = €{result.unemploymentBenefitTotal?.toFixed(2)}
              </p>

              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Total Compensation (with Unemployment)</strong>
              </p>
              <p style={{ marginLeft: '1rem', fontFamily: 'monospace', backgroundColor: '#dbeafe', padding: '0.75rem', borderRadius: '0.25rem', fontSize: '1rem' }}>
                <strong>Total = €{result.terminationNet ? result.terminationNet.toFixed(2) : result.terminationGross.toFixed(2)} + €{result.unemploymentBenefitTotal?.toFixed(2)} = €{((result.terminationNet || result.terminationGross) + (result.unemploymentBenefitTotal || 0)).toFixed(2)}</strong>
              </p>
            </div>
          </div>

          <p style={{
            marginTop: '1.5rem',
            fontSize: '0.75rem',
            color: '#64748b',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            Note: IRS calculations use Portuguese 2025 tax tables. Unemployment benefit is estimated at 60% average rate.
            Actual amounts may vary based on specific circumstances and eligibility.
          </p>
        </div>
      )}
    </div>
  );
}