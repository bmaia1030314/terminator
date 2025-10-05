# Mutual Agreement vs Contract Termination Calculator

A web-based tool for employees in Portugal to compare financial outcomes between **Mutual Agreement** and **Contract Termination** under Portuguese labor law. Built with React, TypeScript, and Tailwind CSS.

## Features

### MVP (Current)
- ✅ **Input Form**: Years of service, annual salary, mutual agreement months, marital status, dependents
- ✅ **Calculations**: Gross payout comparison between mutual agreement and contract termination
- ✅ **Side-by-side Results**: Clear visual comparison with highlighting of better option
- ✅ **Validation**: Form validation with inline error messages
- ✅ **Responsive Design**: Mobile-friendly layout with accessibility features
- ✅ **Legal Disclaimer**: Prominent warnings about estimate limitations

### Coming Soon (Stubs Created)
- 🔄 **Net Tax Estimation**: Calculate after-tax amounts based on Portuguese tax rules
- 🔄 **PDF Export**: Generate downloadable comparison reports
- 🔄 **Portuguese Translation**: Full i18n support
- 🔄 **Advanced Calculations**: Time-banded severance rules and caps

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom color scheme
- **Routing**: React Router v6
- **Icons**: Heroicons
- **Testing**: Vitest + React Testing Library
- **Build**: Vite with TypeScript compilation

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Calculations

### Mutual Agreement
```
Gross Payout = (Annual Salary ÷ 12) × Compensation Months
```

### Contract Termination (Simplified MVP)
```
Gross Payout = (Annual Salary ÷ 365) × 12 × Full Years of Service
```

> **Note**: The termination calculation uses a simplified baseline (12 days per year) for MVP purposes. Real Portuguese labor law includes time-based bands, caps, and various exceptions.

## Sample Test Cases

| Case | Years | Salary | Mutual Months | Mutual Gross | Termination Gross | Better Option |
|------|-------|--------|---------------|--------------|-------------------|---------------|
| A    | 5     | €36,000| 2             | €6,000       | €5,918           | Mutual        |
| B    | 10    | €50,000| 0             | €0           | €16,438          | Termination   |
| C    | 3     | €28,000| 4             | €9,333       | €2,760           | Mutual        |

## Development

### Key Files to Modify
- **Calculations**: `src/lib/calc.ts` - Pure functions for all calculations
- **Types**: `src/types/index.ts` - TypeScript interfaces
- **Main Form**: `src/components/InputForm.tsx` - User input handling
- **Results**: `src/components/ResultsComparison.tsx` - Display logic
- **Styling**: `tailwind.config.js` - Custom colors and theme

### TODO Comments for Future Development

Search for these comments in the codebase:

```bash
# Find all TODO items
grep -r "TODO:" src/
```

Key areas for expansion:
1. **Time-banded severance rules** (`src/lib/calc.ts`)
2. **Portuguese tax calculation** (`estimateNet` function)
3. **PDF export functionality** (`src/components/Footer.tsx`)
4. **i18n translation setup** (`src/components/Header.tsx`)

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode  
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Legal Disclaimer

This tool provides **estimates only** for educational purposes. It is **not legal advice** and should not be used as the sole basis for employment decisions.

Always consult with a qualified employment lawyer or HR professional for accurate calculations and legal advice.

## License

Educational and demonstration purposes.
