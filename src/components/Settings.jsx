import React, { useState, useEffect } from 'react';
import { usePro } from '../ProContext';
import { useLanguage } from '../LanguageContext';

export default function Settings() {
    const { isPro, setShowPaywall } = usePro();
    const { t } = useLanguage();

    // Alustetaan tuorein teema muistista
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('tbt_theme') || 'default');

    // Asettaa teeman sivun juureen (body)
    useEffect(() => {
        document.body.className = currentTheme !== 'default' ? `theme-${currentTheme}` : '';
    }, [currentTheme]);

    const handleThemeChange = (themeName) => {
        if (!isPro && themeName !== 'default') {
            setShowPaywall(true);
            return;
        }

        setCurrentTheme(themeName);
        localStorage.setItem('tbt_theme', themeName);
    };

    return (
        <div style={{ padding: '1rem 0' }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <span className="text-gradient">Asetukset (Settings)</span>
            </h2>

            <div className="glass-card">
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Ulkoasu (Themes)</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Default Teema */}
                    <button
                        onClick={() => handleThemeChange('default')}
                        style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: currentTheme === 'default' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                            border: currentTheme === 'default' ? '1px solid var(--accent-color)' : '1px solid transparent',
                            color: '#fff', padding: '16px'
                        }}
                    >
                        <span>✨ Neon Purppura (Oletus)</span>
                        {currentTheme === 'default' && <span style={{ color: 'var(--accent-color)' }}>✓</span>}
                    </button>

                    {/* Midnight Teema */}
                    <button
                        onClick={() => handleThemeChange('midnight')}
                        style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: currentTheme === 'midnight' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                            border: currentTheme === 'midnight' ? '1px solid #3b82f6' : '1px solid transparent',
                            color: '#fff', padding: '16px'
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            🌑 Keskiyö (Midnight Black) {!isPro && '🔒'}
                        </span>
                        {currentTheme === 'midnight' && <span style={{ color: '#3b82f6' }}>✓</span>}
                    </button>

                    {/* Gold Teema */}
                    <button
                        onClick={() => handleThemeChange('gold')}
                        style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: currentTheme === 'gold' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255,255,255,0.05)',
                            border: currentTheme === 'gold' ? '1px solid #fbbf24' : '1px solid transparent',
                            color: '#fff', padding: '16px'
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            👑 Premium Kullanvärinen (Gold) {!isPro && '🔒'}
                        </span>
                        {currentTheme === 'gold' && <span style={{ color: '#fbbf24' }}>✓</span>}
                    </button>
                </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
                {isPro ? "PRO-lisenssi aktiivinen. Kiitos tuestasi! ✨" : "Päivitä PRO-versioon saadaksesi kaikki teemat ja ominaisuudet."}
            </p>
        </div>
    );
}
