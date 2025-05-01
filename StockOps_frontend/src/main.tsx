import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Impossible de trouver l'élément avec l'id 'root'");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
