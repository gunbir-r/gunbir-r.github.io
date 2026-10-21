import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Handle GitHub Pages 404 redirect for SPA safely
if (sessionStorage.redirect) {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (
    typeof redirect === 'string' &&
    redirect.startsWith('/') &&
    !redirect.startsWith('//') &&
    !redirect.startsWith('/\\')
  ) {
    try {
      const targetUrl = new URL(redirect, window.location.origin);
      if (targetUrl.origin === window.location.origin) {
        window.history.replaceState(null, '', targetUrl.pathname + targetUrl.search + targetUrl.hash);
      }
    } catch {
      // Ignore malformed redirect URLs
    }
  }
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
