import type { Language } from '../lib/translations';
import { t } from '../lib/translations';

interface HeaderProps {
  language: Language;
}

/**
 * Main header component with title and tagline
 */
export function Header({ language }: HeaderProps) {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #3b82f6, #10b981)',
      color: 'white',
      padding: '2rem 1.5rem',
      textAlign: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
          <img 
            src="/logo-icon.svg" 
            alt="Mutual vs Termination Logo" 
            style={{
              height: '56px',
              width: 'auto',
              marginRight: '1rem',
              backgroundColor: 'white',
              padding: '8px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          />
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            letterSpacing: '-0.025em'
          }}>
            {t('headerTitle', language)}
          </h1>
        </div>
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(239, 246, 255, 0.9)',
          fontWeight: '300'
        }}>
          {t('headerTagline', language)}
        </p>
      </div>
    </header>
  );
}