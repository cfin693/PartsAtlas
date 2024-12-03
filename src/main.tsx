import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add this global error handler
const originalConsoleError = console.error;
console.error = function(...args) {
  if (typeof args[0] === 'string' && args[0].includes('Warning: %s: Support for defaultProps will be removed from memo components')) {
    return;
  }
  originalConsoleError.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);