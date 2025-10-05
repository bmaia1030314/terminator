import { useState } from 'react';
import type { InputData, ValidationError } from '../types';
import { validateInputs } from '../lib/calc';
import type { Language } from '../lib/translations';
import { t } from '../lib/translations';

interface InputFormProps {
  onCalculate: (data: InputData) => void;
  onReset: () => void;
  language: Language;
}

/**
 * Main input form for collecting user employment data
 * Includes validation and sensible defaults
 */
export function InputForm({ onCalculate, onReset, language }: InputFormProps) {
  // Form state with sensible defaults
  const [formData, setFormData] = useState<InputData>({
    yearsOfService: 5,
    annualSalary: 36000,
    mutualMonths: 2,
    mutualMonthsType: 'perYear',
    maritalStatus: 'Single',
    dependents: 0,
    vacationDaysLeft: 0,
    holidaySubsidyMonthsLeft: 0,
    age: 35,
    paidTrainingDaysUsed: 0
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Set<keyof InputData>>(new Set());

  // Handle input changes
  const handleChange = (field: keyof InputData, value: number | string) => {
    // Keep string values for maritalStatus and mutualMonthsType
    const processedValue = (field === 'maritalStatus' || field === 'mutualMonthsType') ? value : Number(value);
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
    
    // Mark field as touched
    setTouched(prev => new Set(prev).add(field));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validationErrors = validateInputs(formData);
    setErrors(validationErrors);
    
    // Mark all fields as touched
    setTouched(new Set(['yearsOfService', 'annualSalary', 'mutualMonths', 'mutualMonthsType', 'maritalStatus', 'dependents', 'vacationDaysLeft', 'holidaySubsidyMonthsLeft', 'age', 'paidTrainingDaysUsed']));
    
    if (validationErrors.length === 0) {
      onCalculate(formData);
    }
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      yearsOfService: 5,
      annualSalary: 36000,
      mutualMonths: 2,
      mutualMonthsType: 'perYear',
      maritalStatus: 'Single',
      dependents: 0,
      vacationDaysLeft: 0,
      holidaySubsidyMonthsLeft: 0,
      age: 35,
      paidTrainingDaysUsed: 0
    });
    setErrors([]);
    setTouched(new Set());
    onReset();
  };

  // Get error for specific field
  const getFieldError = (field: keyof InputData) => {
    return errors.find(error => error.field === field);
  };

  // Check if field should show error (touched and has error)
  const shouldShowError = (field: keyof InputData) => {
    return touched.has(field) && getFieldError(field);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '0.75rem',
          fontSize: '20px'
        }}>
          📊
        </div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#111827',
          margin: 0
        }}>
          {t('yourDetails', language)}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Years of Service */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="yearsOfService" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            ⏱️ {t('yearsOfService', language)}
          </label>
          <input
            id="yearsOfService"
            type="number"
            min="0"
            max="45"
            step="0.1"
            value={formData.yearsOfService}
            onChange={(e) => handleChange('yearsOfService', e.target.value)}
            className="input-field"
            style={{
              ...(shouldShowError('yearsOfService') ? {
                borderColor: '#f87171',
                backgroundColor: '#fef2f2'
              } : {})
            }}
            aria-describedby={shouldShowError('yearsOfService') ? 'yearsOfService-error' : undefined}
          />
          {shouldShowError('yearsOfService') && (
            <p id="yearsOfService-error" style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              ⚠️ {getFieldError('yearsOfService')?.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="age" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            👤 {t('age', language)}
          </label>
          <input
            id="age"
            type="number"
            min="18"
            max="70"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className="input-field"
            style={{
              ...(shouldShowError('age') ? {
                borderColor: '#f87171',
                backgroundColor: '#fef2f2'
              } : {})
            }}
            aria-describedby={shouldShowError('age') ? 'age-error' : undefined}
          />
          {shouldShowError('age') ? (
            <p id="age-error" style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              ⚠️ {getFieldError('age')?.message}
            </p>
          ) : (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.75rem',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              {t('ageHelper', language)}
            </p>
          )}
        </div>

        {/* Annual Salary */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="annualSalary" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            💰 {t('annualSalary', language)}
          </label>
          <input
            id="annualSalary"
            type="number"
            min="760"
            max="500000"
            value={formData.annualSalary}
            onChange={(e) => handleChange('annualSalary', e.target.value)}
            className="input-field"
            style={{
              ...(shouldShowError('annualSalary') ? {
                borderColor: '#f87171',
                backgroundColor: '#fef2f2'
              } : {})
            }}
            aria-describedby={shouldShowError('annualSalary') ? 'annualSalary-error' : undefined}
          />
          {shouldShowError('annualSalary') && (
            <p id="annualSalary-error" style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              ⚠️ {getFieldError('annualSalary')?.message}
            </p>
          )}
        </div>

        {/* Mutual Agreement Months */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label htmlFor="mutualMonths" style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              🤝 {formData.mutualMonthsType === 'perYear' ? t('mutualAgreementPerYear', language) : t('mutualAgreementTotal', language)}
            </label>
            <button
              type="button"
              onClick={() => handleChange('mutualMonthsType', formData.mutualMonthsType === 'perYear' ? 'total' : 'perYear')}
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {formData.mutualMonthsType === 'perYear' ? t('switchToTotal', language) : t('switchToPerYear', language)}
            </button>
          </div>
          <input
            id="mutualMonths"
            type="number"
            min="0"
            max={formData.mutualMonthsType === 'perYear' ? 36 : 180}
            step="0.5"
            value={formData.mutualMonths}
            onChange={(e) => handleChange('mutualMonths', e.target.value)}
            className="input-field"
            style={{
              ...(shouldShowError('mutualMonths') ? {
                borderColor: '#f87171',
                backgroundColor: '#fef2f2'
              } : {})
            }}
            aria-describedby={shouldShowError('mutualMonths') ? 'mutualMonths-error' : undefined}
          />
          {shouldShowError('mutualMonths') ? (
            <p id="mutualMonths-error" style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              ⚠️ {getFieldError('mutualMonths')?.message}
            </p>
          ) : (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.75rem',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              {formData.mutualMonthsType === 'perYear' 
                ? t('mutualHelperPerYear', language, { months: formData.mutualMonths.toString(), years: formData.yearsOfService.toString(), total: (formData.mutualMonths * formData.yearsOfService).toFixed(1) })
                : t('mutualHelperTotal', language, { months: formData.mutualMonths.toString() })
              }
            </p>
          )}
        </div>

        {/* Marital Status */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="maritalStatus" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            💍 {t('maritalStatus', language)}
          </label>
          <select
            id="maritalStatus"
            value={formData.maritalStatus}
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
            className="input-field"
          >
            <option value="Single">{t('maritalStatusSingle', language)}</option>
            <option value="Married">{t('maritalStatusMarried', language)}</option>
          </select>
        </div>

        {/* Number of Dependents */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="dependents" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            👶 {t('numberOfDependents', language)}
          </label>
          <input
            id="dependents"
            type="number"
            min="0"
            max="10"
            value={formData.dependents}
            onChange={(e) => handleChange('dependents', e.target.value)}
            className="input-field"
            style={{
              ...(shouldShowError('dependents') ? {
                borderColor: '#f87171',
                backgroundColor: '#fef2f2'
              } : {})
            }}
            aria-describedby={shouldShowError('dependents') ? 'dependents-error' : undefined}
          />
          {shouldShowError('dependents') && (
            <p id="dependents-error" style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              ⚠️ {getFieldError('dependents')?.message}
            </p>
          )}
        </div>

        {/* Vacation Days Left */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="vacationDaysLeft" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            🏖️ {t('unusedVacationDays', language)}
          </label>
          <input
            id="vacationDaysLeft"
            type="number"
            min="0"
            max="30"
            value={formData.vacationDaysLeft}
            onChange={(e) => handleChange('vacationDaysLeft', e.target.value)}
            className="input-field"
            style={{
              ...(shouldShowError('vacationDaysLeft') ? {
                borderColor: '#f87171',
                backgroundColor: '#fef2f2'
              } : {})
            }}
            aria-describedby={shouldShowError('vacationDaysLeft') ? 'vacationDaysLeft-error' : undefined}
          />
          {shouldShowError('vacationDaysLeft') ? (
            <p id="vacationDaysLeft-error" style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              ⚠️ {getFieldError('vacationDaysLeft')?.message}
            </p>
          ) : (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.75rem',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              {t('vacationDaysHelper', language)}
            </p>
          )}
        </div>

        {/* Holiday Subsidy Months Left */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="holidaySubsidyMonthsLeft" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            🎁 {t('holidaySubsidyMonthsLeft', language)}
          </label>
          <input
            id="holidaySubsidyMonthsLeft"
            type="number"
            min="0"
            max="12"
            step="1"
            value={formData.holidaySubsidyMonthsLeft}
            onChange={(e) => handleChange('holidaySubsidyMonthsLeft', e.target.value)}
            className="input-field"
            style={{
              ...(shouldShowError('holidaySubsidyMonthsLeft') ? {
                borderColor: '#f87171',
                backgroundColor: '#fef2f2'
              } : {})
            }}
            aria-describedby={shouldShowError('holidaySubsidyMonthsLeft') ? 'holidaySubsidyMonthsLeft-error' : undefined}
          />
          {shouldShowError('holidaySubsidyMonthsLeft') ? (
            <p id="holidaySubsidyMonthsLeft-error" style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              ⚠️ {getFieldError('holidaySubsidyMonthsLeft')?.message}
            </p>
          ) : (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.75rem',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              {t('holidaySubsidyHelper', language)}
            </p>
          )}
        </div>

        {/* Paid Training Days Used */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="paidTrainingDaysUsed" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            📚 {t('paidTrainingDaysUsed', language)}
          </label>
          <input
            id="paidTrainingDaysUsed"
            type="number"
            min="0"
            max={Math.floor(formData.yearsOfService) * 5}
            step="1"
            value={formData.paidTrainingDaysUsed}
            onChange={(e) => handleChange('paidTrainingDaysUsed', e.target.value)}
            className="input-field"
            style={{
              ...(shouldShowError('paidTrainingDaysUsed') ? {
                borderColor: '#f87171',
                backgroundColor: '#fef2f2'
              } : {})
            }}
            aria-describedby={shouldShowError('paidTrainingDaysUsed') ? 'paidTrainingDaysUsed-error' : undefined}
          />
          {shouldShowError('paidTrainingDaysUsed') ? (
            <p id="paidTrainingDaysUsed-error" style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              ⚠️ {getFieldError('paidTrainingDaysUsed')?.message}
            </p>
          ) : (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.75rem',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              {t('trainingDaysHelper', language, {
                unused: Math.max(0, Math.floor(formData.yearsOfService) * 5 - formData.paidTrainingDaysUsed).toString(),
                years: Math.floor(formData.yearsOfService).toString(),
                total: (Math.floor(formData.yearsOfService) * 5).toString()
              })}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          paddingTop: '1.5rem' 
        }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            {t('calculateButton', language)}
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '0.75rem 1.25rem',
              border: '2px solid #d1d5db',
              color: '#374151',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {t('resetButton', language)}
          </button>
        </div>
      </form>
    </div>
  );
}