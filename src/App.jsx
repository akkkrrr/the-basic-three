import { useState } from 'react'
import VibeRates from './components/VibeRates'
import QuickTip from './components/QuickTip'
import EasySplit from './components/EasySplit'
import { useLanguage } from './LanguageContext'

function App() {
  const [activeTab, setActiveTab] = useState('viberates')
  const { language, setLanguage, t } = useLanguage()

  const renderContent = () => {
    switch (activeTab) {
      case 'viberates': return <VibeRates />
      case 'quicktip': return <QuickTip />
      case 'easysplit': return <EasySplit />
      default: return <VibeRates />
    }
  }

  return (
    <>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 100 }}>
        <button
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="lang-toggle"
        >
          {language === 'en' ? 'ES' : 'EN'}
        </button>
      </div>

      <header className="nav-header">
        <button
          className={`nav-link ${activeTab === 'viberates' ? 'active' : ''}`}
          onClick={() => setActiveTab('viberates')}
        >
          {t('nav', 'vibeRates')}
        </button>
        <button
          className={`nav-link ${activeTab === 'quicktip' ? 'active' : ''}`}
          onClick={() => setActiveTab('quicktip')}
        >
          {t('nav', 'quickTip')}
        </button>
        <button
          className={`nav-link ${activeTab === 'easysplit' ? 'active' : ''}`}
          onClick={() => setActiveTab('easysplit')}
        >
          {t('nav', 'easySplit')}
        </button>
      </header>

      <main className="app-container glass-panel animate-fade-in">
        {renderContent()}
      </main>
    </>
  )
}

export default App
