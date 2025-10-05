import { useState } from 'react';
import type { Language } from '../lib/translations';

interface SupportModalProps {
  language: Language;
  onClose: () => void;
  onLanguageChange: (lang: Language) => void;
}

/**
 * Modal with support information for employees going through termination
 */
export function SupportModal({ language: initialLanguage, onClose, onLanguageChange }: SupportModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(initialLanguage);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    onLanguageChange(lang);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Language Toggle in Modal */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '0.5rem',
          background: '#f9fafb',
          padding: '0.25rem',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <button
            onClick={() => handleLanguageChange('en')}
            style={{
              padding: '0.25rem',
              background: selectedLanguage === 'en' ? '#e0f2fe' : 'transparent',
              border: selectedLanguage === 'en' ? '2px solid #3b82f6' : '2px solid transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="English"
          >
            <img src="/flag-gb.svg" alt="English" style={{ width: '28px', height: '18px', display: 'block' }} />
          </button>
          <button
            onClick={() => handleLanguageChange('pt')}
            style={{
              padding: '0.25rem',
              background: selectedLanguage === 'pt' ? '#e0f2fe' : 'transparent',
              border: selectedLanguage === 'pt' ? '2px solid #3b82f6' : '2px solid transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Português"
          >
            <img src="/flag-pt.svg" alt="Português" style={{ width: '28px', height: '18px', display: 'block' }} />
          </button>
        </div>
        {selectedLanguage === 'pt' ? (
          <>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem',
              marginTop: '3rem',
              textAlign: 'center'
            }}>
              💙 Está a passar por um processo de despedimento?
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#4b5563',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Não está sozinho.
            </p>

            <div style={{ color: '#374151', lineHeight: '1.75' }}>
              <p style={{ marginBottom: '1rem' }}>
                Sabemos que enfrentar um despedimento — seja por mútuo acordo ou por iniciativa da entidade patronal — é um dos momentos mais difíceis da vida profissional. Surgem dúvidas, inseguranças e, muitas vezes, um forte impacto emocional. Queremos que saiba: <strong>os seus sentimentos são válidos, e há apoio disponível.</strong>
              </p>

              <p style={{
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#059669'
              }}>
                Respire. Este é um momento importante — mas não tem de enfrentá-lo sozinho.
              </p>

              <div style={{
                background: 'linear-gradient(to right, #fef3c7, #fed7aa)',
                borderLeft: '4px solid #f59e0b',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#92400e',
                  marginBottom: '0.5rem'
                }}>
                  1. 🧠 Cuide da sua saúde mental
                </h3>
                <p style={{ marginBottom: '0.75rem', color: '#78350f' }}>
                  Ser confrontado com o fim de um vínculo laboral pode gerar ansiedade, stress, tristeza ou até sintomas de depressão. É essencial dar espaço a essas emoções e procurar apoio psicológico sempre que necessário.
                </p>
                <p style={{ fontWeight: '600', color: '#92400e' }}>
                  ➡️ Considere falar com um psicólogo, recorrer ao médico de família ou contactar serviços de apoio emocional. Não é fraqueza — é autocuidado.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(to right, #dbeafe, #bfdbfe)',
                borderLeft: '4px solid #3b82f6',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1e3a8a',
                  marginBottom: '0.5rem'
                }}>
                  2. ⚖️ Conheça os seus direitos
                </h3>
                <p style={{ marginBottom: '0.75rem', color: '#1e40af' }}>
                  Antes de tomar qualquer decisão — aceitar um acordo mútuo ou avançar para um despedimento — é fundamental compreender as implicações legais e financeiras de cada opção.
                </p>
                <p style={{ fontWeight: '600', color: '#1e3a8a' }}>
                  ➡️ Consulte um advogado, sindicato ou associação de trabalhadores. Muitas vezes, os primeiros esclarecimentos são gratuitos e podem proteger os seus interesses a longo prazo.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(to right, #fecaca, #fca5a5)',
                borderLeft: '4px solid #ef4444',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#7f1d1d',
                  marginBottom: '0.5rem'
                }}>
                  3. ⏰ Não decida sob pressão
                </h3>
                <p style={{ fontWeight: '600', color: '#991b1b' }}>
                  É seu direito pedir tempo para refletir antes de assinar qualquer documento. Um acordo assinado sob pressão ou sem informação clara pode prejudicar os seus direitos futuros, incluindo acesso ao subsídio de desemprego.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(to right, #f3e8ff, #e9d5ff)',
                borderLeft: '4px solid #9333ea',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#581c87',
                  marginBottom: '0.75rem'
                }}>
                  4. 🤝 Mútuo acordo vs. Despedimento: o que considerar
                </h3>
                <p style={{ marginBottom: '0.75rem', color: '#6b21a8' }}>
                  <strong>Mútuo acordo</strong> pode parecer mais "amigável", mas pode não dar acesso ao subsídio de desemprego, dependendo das condições e da legislação em vigor.
                </p>
                <p style={{ marginBottom: '0.75rem', color: '#6b21a8' }}>
                  <strong>Despedimento</strong> pode parecer mais duro, mas pode garantir-lhe o acesso a compensações e proteção social, caso seja feito dentro da legalidade.
                </p>
                <p style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#faf5ff',
                  borderRadius: '6px',
                  fontWeight: '600',
                  color: '#581c87'
                }}>
                  💡 Dica: Nunca assine nada sem antes compreender totalmente o conteúdo. Peça ajuda se tiver dúvidas — isso é um sinal de responsabilidade, não de fraqueza.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '1rem'
              }}
            >
              Compreendi
            </button>
          </>
        ) : (
          <>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem',
              marginTop: '3rem',
              textAlign: 'center'
            }}>
              💙 Going Through Employment Termination?
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#4b5563',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              You Are Not Alone.
            </p>

            <div style={{ color: '#374151', lineHeight: '1.75' }}>
              <p style={{ marginBottom: '1rem' }}>
                We know that facing termination — whether by mutual agreement or employer initiative — is one of the most difficult moments in professional life. Doubts, insecurities, and often a strong emotional impact arise. We want you to know: <strong>your feelings are valid, and support is available.</strong>
              </p>

              <p style={{
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#059669'
              }}>
                Breathe. This is an important moment — but you don't have to face it alone.
              </p>

              <div style={{
                background: 'linear-gradient(to right, #fef3c7, #fed7aa)',
                borderLeft: '4px solid #f59e0b',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#92400e',
                  marginBottom: '0.5rem'
                }}>
                  1. 🧠 Take Care of Your Mental Health
                </h3>
                <p style={{ marginBottom: '0.75rem', color: '#78350f' }}>
                  Facing the end of an employment relationship can generate anxiety, stress, sadness, or even symptoms of depression. It's essential to give space to these emotions and seek psychological support whenever necessary.
                </p>
                <p style={{ fontWeight: '600', color: '#92400e' }}>
                  ➡️ Consider talking to a psychologist, consulting your family doctor, or contacting emotional support services. It's not weakness — it's self-care.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(to right, #dbeafe, #bfdbfe)',
                borderLeft: '4px solid #3b82f6',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1e3a8a',
                  marginBottom: '0.5rem'
                }}>
                  2. ⚖️ Know Your Rights
                </h3>
                <p style={{ marginBottom: '0.75rem', color: '#1e40af' }}>
                  Before making any decision — accepting a mutual agreement or proceeding with termination — it's essential to understand the legal and financial implications of each option.
                </p>
                <p style={{ fontWeight: '600', color: '#1e3a8a' }}>
                  ➡️ Consult a lawyer, union, or workers' association. Initial consultations are often free and can protect your long-term interests.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(to right, #fecaca, #fca5a5)',
                borderLeft: '4px solid #ef4444',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#7f1d1d',
                  marginBottom: '0.5rem'
                }}>
                  3. ⏰ Don't Decide Under Pressure
                </h3>
                <p style={{ fontWeight: '600', color: '#991b1b' }}>
                  It's your right to ask for time to reflect before signing any document. An agreement signed under pressure or without clear information can harm your future rights, including access to unemployment benefits.
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(to right, #f3e8ff, #e9d5ff)',
                borderLeft: '4px solid #9333ea',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#581c87',
                  marginBottom: '0.75rem'
                }}>
                  4. 🤝 Mutual Agreement vs. Termination: What to Consider
                </h3>
                <p style={{ marginBottom: '0.75rem', color: '#6b21a8' }}>
                  <strong>Mutual agreement</strong> may seem more "friendly," but may not grant access to unemployment benefits, depending on conditions and current legislation.
                </p>
                <p style={{ marginBottom: '0.75rem', color: '#6b21a8' }}>
                  <strong>Termination</strong> may seem harsher, but can guarantee access to compensation and social protection, if done within the law.
                </p>
                <p style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#faf5ff',
                  borderRadius: '6px',
                  fontWeight: '600',
                  color: '#581c87'
                }}>
                  💡 Tip: Never sign anything without fully understanding the content. Ask for help if you have doubts — it's a sign of responsibility, not weakness.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '1rem'
              }}
            >
              I Understand
            </button>
          </>
        )}
      </div>
    </div>
  );
}
