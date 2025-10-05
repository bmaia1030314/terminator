import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Root } from './routes/Root';
import { Methodology } from './routes/Methodology';

/**
 * Main App component with routing
 * Routes: / (calculator), /methodology (info page)
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

/**
 * Simple 404 page component
 */
function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <a 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Return to Calculator
        </a>
      </div>
    </div>
  );
}

export default App;
