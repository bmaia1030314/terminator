import type { Language } from '../lib/translations';
import { t } from '../lib/translations';

interface LegalNoteProps {
  language: Language;
}

/**
 * Legal disclaimer component
 * Warns users about estimate limitations and need for professional advice
 */
export function LegalNote({ language }: LegalNoteProps) {
  return (
    <div style={{
      background: 'linear-gradient(to right, #fef3c7, #fed7aa)',
      borderLeft: '4px solid #f59e0b',
      borderRadius: '12px',
      padding: '1.25rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#fef3c7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            ⚠️
          </div>
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <p style={{
            color: '#92400e',
            fontWeight: '600',
            fontSize: '1rem',
            marginBottom: '0.5rem'
          }}>
            {t('legalNoteTitle', language)}
          </p>
          <p style={{
            color: '#a16207',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            {t('legalNoteText', language)}
          </p>
        </div>
      </div>
    </div>
  );
}