import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useExchangeRates } from '../hooks/useExchangeRates';

export default function VibeRates() {
    const { t } = useLanguage();
    const [amount, setAmount] = useState(1);
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('MXN');

    const { rates, loading, error } = useExchangeRates(baseCurrency);

    // Load favorites from local storage
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('vibeRatesFavorites');
        return saved ? JSON.parse(saved) : ['USD-MXN', 'EUR-USD'];
    });

    const currencies = ['USD', 'MXN', 'EUR', 'GBP', 'CAD', 'SEK'];

    const handleSwap = () => {
        setBaseCurrency(targetCurrency);
        setTargetCurrency(baseCurrency);
    };

    const pairKey = `${baseCurrency}-${targetCurrency}`;
    const isFavorite = favorites.includes(pairKey);

    const toggleFavorite = () => {
        let newFavs;
        if (isFavorite) {
            newFavs = favorites.filter(f => f !== pairKey);
        } else {
            newFavs = [...favorites, pairKey];
        }
        setFavorites(newFavs);
        localStorage.setItem('vibeRatesFavorites', JSON.stringify(newFavs));
    };

    const loadFavorite = (pair) => {
        const [base, target] = pair.split('-');
        setBaseCurrency(base);
        setTargetCurrency(target);
    };

    const convertedAmount = rates && rates[targetCurrency]
        ? (amount * rates[targetCurrency]).toFixed(2)
        : '...';

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2><span className="text-gradient">{t('vibeRates', 'title')}</span></h2>
                <button
                    onClick={toggleFavorite}
                    style={{ background: 'transparent', padding: '8px', color: isFavorite ? 'var(--accent-color)' : 'var(--text-secondary)' }}
                    title={t('vibeRates', 'saveFav')}
                >
                    {isFavorite ? t('vibeRates', 'savedFav') : t('vibeRates', 'saveFav')}
                </button>
            </div>

            {favorites.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '8px' }}>
                    {favorites.map(fav => (
                        <button
                            key={fav}
                            onClick={() => loadFavorite(fav)}
                            style={{
                                background: fav === pairKey ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                                color: fav === pairKey ? '#fff' : 'var(--text-secondary)',
                                border: `1px solid ${fav === pairKey ? 'var(--accent-color)' : 'transparent'}`,
                                padding: '6px 12px',
                                fontSize: '0.85rem',
                                borderRadius: '16px',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {fav.replace('-', ' → ')}
                        </button>
                    ))}
                </div>
            )}

            <div className="input-group">
                <label>{t('vibeRates', 'amount')}</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    placeholder="0.00"
                />
            </div>

            <div className="grid-2" style={{ alignItems: 'end', marginBottom: '1.5rem' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                    <label>{t('vibeRates', 'from')}</label>
                    <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div className="input-group" style={{ marginBottom: 0 }}>
                    <label>{t('vibeRates', 'to')}</label>
                    <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
                        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <button
                className="btn-primary"
                style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}
                onClick={handleSwap}
            >
                {t('vibeRates', 'swap')}
            </button>

            <div className="result-box">
                <h3>{t('vibeRates', 'result')} ({targetCurrency})</h3>
                <div className="amount">
                    {loading ? (
                        t('vibeRates', 'loading')
                    ) : error ? (
                        <span style={{ fontSize: '1rem', color: '#ef4444' }}>{error}</span>
                    ) : (
                        convertedAmount
                    )}
                </div>
                {rates && rates[targetCurrency] && !loading && !error && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        1 {baseCurrency} = {rates[targetCurrency].toFixed(4)} {targetCurrency}
                    </div>
                )}
            </div>
        </div>
    );
}
