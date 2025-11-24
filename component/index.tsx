import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../app.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
  throw new Error('Could not find root element');
}

console.log('Root element found, mounting React app...');

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('React render error:', error);
  rootElement.innerHTML = `<div style="color: #ff6b6b; padding: 40px; text-align: center;"><h1>Error Loading App</h1><p>${error instanceof Error ? error.message : String(error)}</p></div>`;
}