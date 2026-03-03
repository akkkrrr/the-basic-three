import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './LanguageContext.jsx'
import { ProProvider } from './ProContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ProProvider>
  </StrictMode>,
)
