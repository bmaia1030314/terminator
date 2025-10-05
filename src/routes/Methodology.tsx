import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import type { Language } from '../lib/translations';

/**
 * Methodology page explaining calculation assumptions and legal references
 */
export function Methodology() {
  const [language] = useState<Language>('pt');
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header language={language} />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Calculator
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-6">
            <BookOpenIcon className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Calculation Methodology
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Understanding how we calculate mutual agreement and contract termination payouts 
            under Portuguese employment law.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Important Notice */}
          <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-900 mb-4">
              ⚠️ Important Notice
            </h2>
            <div className="text-yellow-800 space-y-3">
              <p>
                These calculations provide <strong>estimates only</strong> for exploration and 
                educational purposes. They are <strong>not legal advice</strong> and should not 
                be used as the sole basis for employment decisions.
              </p>
              <p>
                Actual compensation may vary significantly based on:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Specific employment contract terms</li>
                <li>Collective bargaining agreements</li>
                <li>Company policies</li>
                <li>Individual circumstances</li>
                <li>Current legislation and legal precedents</li>
              </ul>
              <p className="font-medium">
                Always consult with a qualified employment lawyer or HR professional 
                for accurate calculations and legal advice.
              </p>
            </div>
          </section>

          {/* Mutual Agreement */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-mutual-green">
              Mutual Agreement Calculation
            </h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-mono text-sm text-green-800">
                  Gross Payout = (Annual Salary ÷ 12) × Compensation Months
                </p>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>
                  Mutual agreement compensation is <strong>negotiable</strong> between 
                  employer and employee. The calculator uses the months of compensation 
                  you specify.
                </p>
                <p>
                  <strong>Key points:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>No legal minimum or maximum (within reason)</li>
                  <li>Often ranges from 1-6 months, but can vary widely</li>
                  <li>May include additional benefits beyond salary</li>
                  <li>Agreement must be voluntary from both parties</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contract Termination */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-termination-blue">
              Contract Termination Calculation
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-mono text-sm text-blue-800">
                  Gross Payout = (Annual Salary ÷ 365) × 12 × Full Years of Service
                </p>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>
                  This calculation uses a <strong>simplified baseline</strong> for 
                  illustration purposes. The actual Portuguese Labour Code is more complex.
                </p>
                <p>
                  <strong>Simplified MVP assumptions:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>12 days of base salary per year of service</li>
                  <li>Only full years counted (fractional years ignored)</li>
                  <li>Based on contracts signed after 2012</li>
                  <li>No caps or maximum limits applied</li>
                </ul>
                <p className="bg-blue-50 p-3 rounded text-blue-800 text-sm">
                  <strong>Real-world complexity:</strong> The actual legal framework includes 
                  time-based bands (different rates for different periods of service), 
                  maximum caps, minimum guarantees, and various exceptions based on 
                  termination reasons and timing.
                </p>
              </div>
            </div>
          </section>

          {/* Tax Considerations */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tax Considerations (Future Feature)
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                The calculator currently shows <strong>gross amounts only</strong>. 
                Net calculations (after tax) are planned for a future release.
              </p>
              <p>
                <strong>Tax factors to consider:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>IRS (income tax) progressive rates</li>
                <li>Social Security contributions</li>
                <li>Marital status impact on tax brackets</li>
                <li>Dependent deductions</li>
                <li>Special severance pay tax rules</li>
              </ul>
              <p className="text-gray-600 text-sm">
                We collect marital status and dependent information now to ensure 
                accurate future tax estimates.
              </p>
            </div>
          </section>

          {/* Legal References */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Legal References
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                This tool is based on general principles from:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Portuguese Labour Code (Código do Trabalho)</li>
                <li>Law 7/2009 and subsequent amendments</li>
                <li>General employment termination regulations</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                For authoritative and up-to-date legal information, consult 
                official government sources, legal professionals, or current legislation.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}