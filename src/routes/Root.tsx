import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { InputForm } from '../components/InputForm';
import { ResultsComparison } from '../components/ResultsComparison';
import { LegalNote } from '../components/LegalNote';
import { Footer } from '../components/Footer';
import { SupportModal } from '../components/SupportModal';
import type { InputData, ComparisonResult } from '../types';
import { calculateComparison } from '../lib/calc';
import type { Language } from '../lib/translations';

/**
 * Main root page with input form and results comparison
 * Two-column layout: inputs on left, results on right
 */
export function Root() {
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [inputData, setInputData] = useState<InputData | null>(null);
  const [troubleshootMode, setTroubleshootMode] = useState(false);
  const [language, setLanguage] = useState<Language>('pt');
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Show support modal on first visit
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenSupportModal');
    if (!hasSeenModal) {
      setShowSupportModal(true);
    }
  }, []);

  const handleCloseSupportModal = () => {
    setShowSupportModal(false);
    localStorage.setItem('hasSeenSupportModal', 'true');
  };

  const handleCalculate = (data: InputData) => {
    const comparisonResult = calculateComparison(data);
    setResult(comparisonResult);
    setInputData(data);
  };

  const handleReset = () => {
    setResult(null);
    setInputData(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Support Modal */}
      {showSupportModal && (
        <SupportModal 
          language={language} 
          onClose={handleCloseSupportModal}
          onLanguageChange={setLanguage}
        />
      )}

      <Header language={language} />
      
      {/* Language Toggle */}
      <div style={{ position: 'fixed', top: '0.5rem', right: '0.5rem', zIndex: 1000 }}>
        <div style={{ 
          display: 'flex', 
          gap: '0.25rem', 
          background: 'white', 
          padding: '0.25rem', 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '2px solid #e5e7eb'
        }}>
          <button
            onClick={() => setLanguage('en')}
            style={{
              padding: '0.25rem',
              background: language === 'en' ? '#e0f2fe' : 'transparent',
              border: language === 'en' ? '2px solid #3b82f6' : '2px solid transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="English"
          >
            <img src="/flag-gb.svg" alt="English" style={{ width: 'clamp(32px, 8vw, 64px)', height: 'auto', display: 'block' }} />
          </button>
          <button
            onClick={() => setLanguage('pt')}
            style={{
              padding: '0.25rem',
              background: language === 'pt' ? '#e0f2fe' : 'transparent',
              border: language === 'pt' ? '2px solid #3b82f6' : '2px solid transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Português"
          >
            <img src="/flag-pt.svg" alt="Português" style={{ width: 'clamp(32px, 8vw, 64px)', height: 'auto', display: 'block' }} />
          </button>
        </div>
      </div>
      
      <main style={{ flex: 1, width: '100%' }}>
        <div className="container" style={{ padding: '1rem' }}>
          {/* Legal Notice */}
          <div style={{ marginBottom: '1.5rem' }}>
            <LegalNote language={language} />
          </div>

          {/* Main Content - Responsive Layout */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr',
            gap: '1.5rem'
          }}>
            {/* Input Form (Stacks on mobile, side-by-side on desktop) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '1.5rem'
            }}>
              <div>
                <InputForm 
                  onCalculate={handleCalculate}
                  onReset={handleReset}
                  language={language}
                />
              </div>

              {/* Results (shows below form on mobile, next to it on desktop) */}
              <div style={{ minWidth: 0 }}>
                {/* Troubleshoot Toggle */}
                {result && (
                  <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => setTroubleshootMode(!troubleshootMode)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: troubleshootMode ? '#3b82f6' : '#f3f4f6',
                        color: troubleshootMode ? 'white' : '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        width: '100%',
                        maxWidth: '300px'
                      }}
                    >
                      {language === 'en' 
                        ? `🔧 ${troubleshootMode ? 'Hide' : 'Show'} Details`
                        : `🔧 ${troubleshootMode ? 'Ocultar' : 'Mostrar'} Detalhes`
                      }
                    </button>
                  </div>
                )}
                <ResultsComparison 
                  result={result} 
                  inputData={inputData}
                  troubleshootMode={troubleshootMode}
                  language={language}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer language={language} result={result} inputData={inputData} />
    </div>
  );
}