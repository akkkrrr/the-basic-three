import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function QuickTip() {
    const { t, getCurrencySymbol, formatMoney } = useLanguage();
    const currency = getCurrencySymbol();

    const [bill, setBill] = useState('');
    const [tipPercentage, setTipPercentage] = useState(15);
    const [roundTotal, setRoundTotal] = useState(false);

    const [separateTax, setSeparateTax] = useState(false);
    const [taxAmountInput, setTaxAmountInput] = useState(''); // Instead of percentage, we use raw tax amount

    const billAmount = parseFloat(bill) || 0;
    const taxAmount = parseFloat(taxAmountInput) || 0;

    // Calculate base for tip
    let tipBase = billAmount;

    if (separateTax && billAmount > 0) {
        // If tax is separated, tip base is bill minus tax
        // This assumes billAmount includes the tax. If it doesn't, logic would be different.
        // Usually in America, receipt says Subtotal + Tax = Total. 
        // We'll let user put the Subtotal directly if they want, but if they put Total, we subtract Tax to tip on base.
        if (taxAmount < billAmount) {
            tipBase = billAmount - taxAmount;
        }
    }

    // Calculate tip
    let tipAmount = tipBase * (tipPercentage / 100);
    let totalWithTip = billAmount + tipAmount;

    if (roundTotal && totalWithTip > 0) {
        const roundedTotal = Math.round(totalWithTip);
        // Adjust tip to match the rounded total
        tipAmount = roundedTotal - billAmount;
        totalWithTip = roundedTotal;

        // If rounding made tip negative (rare edge case with very small tips), reset to 0
        if (tipAmount < 0) {
            tipAmount = 0;
            totalWithTip = billAmount;
        }
    }

    return (
        <div>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <span className="text-gradient">{t('quickTip', 'title')}</span>
            </h2>

            <div className="input-group">
                <label>{t('quickTip', 'billAmount')} ({currency})</label>
                <input
                    type="number"
                    value={bill}
                    onChange={(e) => setBill(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                {[10, 15, 18, 20, 25].map(p => (
                    <button
                        key={p}
                        onClick={() => setTipPercentage(p)}
                        style={{
                            flex: 1,
                            background: tipPercentage === p ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                            color: tipPercentage === p ? '#fff' : 'var(--text-secondary)',
                            padding: '12px 0px'
                        }}
                    >
                        {p}%
                    </button>
                ))}
            </div>

            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={separateTax}
                        onChange={(e) => setSeparateTax(e.target.checked)}
                        style={{ width: '20px', height: '20px', margin: 0 }}
                    />
                    <span style={{ fontSize: '0.95rem' }}>{t('quickTip', 'excludeTax')}</span>
                </label>

                {separateTax && (
                    <div className="input-group" style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                        <label>{t('quickTip', 'taxAmount')}</label>
                        <input
                            type="number"
                            value={taxAmountInput}
                            onChange={(e) => setTaxAmountInput(e.target.value)}
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                        />
                    </div>
                )}

                <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0.5rem 0' }}></div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={roundTotal}
                        onChange={(e) => setRoundTotal(e.target.checked)}
                        style={{ width: '20px', height: '20px', margin: 0 }}
                    />
                    <span style={{ fontSize: '0.95rem' }}>{t('quickTip', 'roundTotal')}</span>
                </label>
            </div>

            <div className="grid-2">
                <div className="result-box" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
                    <h3>{t('quickTip', 'tipAmount')}</h3>
                    <div className="amount" style={{ fontSize: '1.8rem' }}>
                        {currency}{formatMoney(tipAmount)}
                    </div>
                    {separateTax && billAmount > 0 && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                            {t('quickTip', 'taxBase')}: {currency}{formatMoney(tipBase)}
                        </div>
                    )}
                </div>
                <div className="result-box">
                    <h3>{t('quickTip', 'total')}</h3>
                    <div className="amount" style={{ fontSize: '1.8rem' }}>
                        {currency}{formatMoney(totalWithTip)}
                    </div>
                </div>
            </div>
        </div>
    );
}
