import React, { createContext, useState, useContext, useEffect } from 'react';

const ProContext = createContext();

export const usePro = () => useContext(ProContext);

export const ProProvider = ({ children }) => {
    const [isPro, setIsPro] = useState(false);
    const [showPaywall, setShowPaywall] = useState(false);

    // Ladataan PRO-tila laitteen muistista sivun latautuessa
    useEffect(() => {
        const savedStatus = localStorage.getItem('tbt_pro_status');
        if (savedStatus === 'active') {
            setIsPro(true);
        }
    }, []);

    // Simuloitu ostotapahtuma
    const purchasePro = () => {
        setIsPro(true);
        localStorage.setItem('tbt_pro_status', 'active');
        setShowPaywall(false);
    };

    // Kehittäjätyökalu nollaamiseen
    const resetPro = () => {
        setIsPro(false);
        localStorage.removeItem('tbt_pro_status');
    };

    return (
        <ProContext.Provider value={{ isPro, purchasePro, resetPro, showPaywall, setShowPaywall }}>
            {children}

            {/* Yksinkertainen Maksuseinä-Modaali */}
            {showPaywall && !isPro && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backdropFilter: 'blur(8px)'
                }}>
                    <div className="glass-card" style={{ maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative' }}>
                        <button
                            onClick={() => setShowPaywall(false)}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', padding: '5px', color: '#fff' }}
                        >
                            ✕
                        </button>
                        <h2 style={{ marginBottom: '1rem' }}><span className="text-gradient">The Basic Three PRO ✨</span></h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            Avaa elinikäinen premium-tila:<br />
                            • Offline Valuuttakurssit<br />
                            • Kameraskanneri (OCR) kuitteille<br />
                            • Eksklusiiviset väriteemat
                        </p>
                        <button
                            className="btn-primary"
                            style={{ padding: '16px', fontSize: '1.1rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #FFD700, #FDB931)', color: '#000', textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}
                            onClick={purchasePro}
                        >
                            Osta Lukkopassi - $4.99
                        </button>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>Kertamaksu. Ei tilauksia.</p>
                    </div>
                </div>
            )}
        </ProContext.Provider>
    );
};
