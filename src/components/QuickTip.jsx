import { useState } from 'react';

export default function QuickTip() {
    const [bill, setBill] = useState('');
    const [tipPercentage, setTipPercentage] = useState(15);
    const [roundTotal, setRoundTotal] = useState(false);

    const [separateTax, setSeparateTax] = useState(false);
    const [taxPercentage, setTaxPercentage] = useState(14); // Default to restaurant VAT in Finland

    const billAmount = parseFloat(bill) || 0;

    // Calculate base for tip
    let tipBase = billAmount;
    let taxAmount = 0;

    if (separateTax && billAmount > 0) {
        // Alv is included in billAmount, calculate tax free part
        const taxFree = billAmount / (1 + taxPercentage / 100);
        taxAmount = billAmount - taxFree;
        tipBase = taxFree;
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
                <span className="text-gradient">Quick Tip</span>
            </h2>

            <div className="input-group">
                <label>Laskun loppusumma (€)</label>
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
                {[10, 15, 20].map(p => (
                    <button
                        key={p}
                        onClick={() => setTipPercentage(p)}
                        style={{
                            flex: 1,
                            background: tipPercentage === p ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                            color: tipPercentage === p ? '#fff' : 'var(--text-secondary)',
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
                    <span style={{ fontSize: '0.95rem' }}>Laske tippi verottomasta summasta</span>
                </label>

                {separateTax && (
                    <div className="input-group" style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                        <label>ALV % (verkkokauppa/ravintola)</label>
                        <select value={taxPercentage} onChange={(e) => setTaxPercentage(parseFloat(e.target.value))}>
                            <option value={25.5}>25.5% (Yleinen)</option>
                            <option value={14}>14% (Ruoka & ravintola)</option>
                            <option value={10}>10% (Henkilökuljetukset ym.)</option>
                            <option value={0}>0%</option>
                        </select>
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
                    <span style={{ fontSize: '0.95rem' }}>Pyöristä loppusumma tasaeuroon</span>
                </label>
            </div>

            <div className="grid-2">
                <div className="result-box" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
                    <h3>Tippiosa</h3>
                    <div className="amount" style={{ fontSize: '1.8rem' }}>
                        {tipAmount.toFixed(2)}€
                    </div>
                    {separateTax && billAmount > 0 && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                            Veroton pohja: {tipBase.toFixed(2)}€
                        </div>
                    )}
                </div>
                <div className="result-box">
                    <h3>Yhteensä</h3>
                    <div className="amount" style={{ fontSize: '1.8rem' }}>
                        {totalWithTip.toFixed(2)}€
                    </div>
                </div>
            </div>
        </div>
    );
}
