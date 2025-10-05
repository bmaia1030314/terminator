import type { Language } from '../lib/translations';
import { t } from '../lib/translations';
import type { ComparisonResult, InputData } from '../types';
import { exportToPDF } from '../lib/pdfExport';

interface FooterProps {
  language: Language;
  result?: ComparisonResult | null;
  inputData?: InputData | null;
}

/**
 * Footer component with export and methodology links
 */
export function Footer({ language, result, inputData }: FooterProps) {
  const handleExportPDF = () => {
    if (result && inputData) {
      exportToPDF(result, inputData, language);
    }
  };

  const canExport = result && inputData;
  return (
    <footer style={{
      background: 'linear-gradient(to right, #f9fafb, #f1f5f9)',
      borderTop: '2px solid #e5e7eb',
      padding: '2.5rem 1.5rem',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Export PDF button */}
          <button
            disabled={!canExport}
            onClick={handleExportPDF}
            className={canExport ? 'btn btn-primary' : ''}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.25rem',
              border: canExport ? 'none' : '2px solid #d1d5db',
              color: canExport ? 'white' : '#9ca3af',
              borderRadius: '12px',
              cursor: canExport ? 'pointer' : 'not-allowed',
              background: canExport ? undefined : '#f3f4f6',
              fontSize: '0.875rem'
            }}
            title={canExport ? t('exportPdf', language).replace(' (coming soon)', '') : t('exportPdf', language)}
          >
            📄 {canExport ? (language === 'en' ? 'Export PDF' : 'Exportar PDF') : t('exportPdf', language)}
          </button>
        </div>

        {/* Copyright */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '2px solid #e5e7eb'
        }}>
          <p style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            {t('footerCopyright', language)}
          </p>
        </div>
      </div>
    </footer>
  );
}