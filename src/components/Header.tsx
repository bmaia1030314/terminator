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
      padding: '1.5rem 1rem',
      textAlign: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '0.75rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <img 
            src="/logo-icon.svg" 
            alt="Mutual vs Termination Logo" 
            style={{
              height: '48px',
              width: 'auto',
              backgroundColor: 'white',
              padding: '8px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          />
          <h1 style={{
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            fontWeight: 'bold',
            letterSpacing: '-0.025em',
            lineHeight: '1.2'
          }}>
            {t('headerTitle', language)}
          </h1>
        </div>
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'rgba(239, 246, 255, 0.9)',
          fontWeight: '300'
        }}>
          {t('headerTagline', language)}
        </p>
      </div>
    </header>
  );
}