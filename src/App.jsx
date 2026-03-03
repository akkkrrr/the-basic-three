import { useState } from 'react'
import VibeRates from './components/VibeRates'
import QuickTip from './components/QuickTip'
import EasySplit from './components/EasySplit'
import Settings from './components/Settings'
import { useLanguage } from './LanguageContext'
import { usePro } from './ProContext'

function App() {
  const [activeTab, setActiveTab] = useState('viberates')
  const { language, setLanguage, t } = useLanguage()
  const { isPro, setShowPaywall } = usePro()

  const renderContent = () => {
    switch (activeTab) {
      case 'viberates': return <VibeRates />
      case 'quicktip': return <QuickTip />
      case 'easysplit': return <EasySplit />
      case 'settings': return <Settings />
      default: return <VibeRates />
    }
  }

  return (
    <>
      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', padding: '1rem 1rem 0', zIndex: 100 }}>
        {!isPro && (
          <button
            onClick={() => setShowPaywall(true)}
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FDB931)',
              color: '#000',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '16px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '700',
              boxShadow: '0 2px 8px rgba(255, 215, 0, 0.4)'
            }}
          >
            ⚡ PRO
          </button>
        )}
        <button
          onClick={() => setActiveTab('settings')}
          style={{ background: activeTab === 'settings' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', border: activeTab === 'settings' ? '1px solid var(--accent-color)' : '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '6px 12px', borderRadius: '16px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title={t('nav', 'settings')}
        >
          ⚙️
        </button>
        <button
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="lang-toggle"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '6px 16px', borderRadius: '16px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
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

      <main className="app-container glass-panel">
        <div key={activeTab} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </>
  )
}

export default App
