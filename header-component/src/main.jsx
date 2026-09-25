import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import VivaVoceHeader from './VivaVoceHeader';

function App() {
  const [destination, setDestination] = useState('');
  useEffect(() => {
    const intercept = event => {
      const link = event.target.closest('a');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin) return;
      event.preventDefault();
      history.pushState({}, '', url.pathname);
      setDestination(link.getAttribute('aria-label') || link.textContent.trim());
    };
    const pop = () => setDestination('');
    document.addEventListener('click', intercept);
    window.addEventListener('popstate', pop);
    return () => { document.removeEventListener('click', intercept); window.removeEventListener('popstate', pop); };
  }, []);
  return <><VivaVoceHeader initialMenu="Clothing"/><main className="demo-content" aria-live="polite">{destination && <div><h1>{destination}</h1><p>This destination is ready to connect to your store.</p></div>}</main></>;
}

createRoot(document.getElementById('root')).render(<App/>);
