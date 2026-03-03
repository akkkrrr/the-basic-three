import { useState } from 'react'
import VibeRates from './components/VibeRates'
import QuickTip from './components/QuickTip'
import EasySplit from './components/EasySplit'

function App() {
  const [activeTab, setActiveTab] = useState('viberates')

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
      <header className="nav-header">
        <button
          className={`nav-link ${activeTab === 'viberates' ? 'active' : ''}`}
          onClick={() => setActiveTab('viberates')}
        >
          Valuuttamuunnin
        </button>
        <button
          className={`nav-link ${activeTab === 'quicktip' ? 'active' : ''}`}
          onClick={() => setActiveTab('quicktip')}
        >
          Tippilaskuri
        </button>
        <button
          className={`nav-link ${activeTab === 'easysplit' ? 'active' : ''}`}
          onClick={() => setActiveTab('easysplit')}
        >
          Kulusplitteri
        </button>
      </header>

      <main className="app-container glass-panel animate-fade-in">
        {renderContent()}
      </main>
    </>
  )
}

export default App
