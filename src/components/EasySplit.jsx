import { useState } from 'react';

export default function EasySplit() {
    const [total, setTotal] = useState('');
    const [splitType, setSplitType] = useState('even');
    const [numPeople, setNumPeople] = useState(2);
    const [customSplits, setCustomSplits] = useState([
        { id: 1, name: 'Henkilö 1', amount: '' },
        { id: 2, name: 'Henkilö 2', amount: '' }
    ]);

    const totalAmount = parseFloat(total) || 0;

    const handleCustomChange = (id, field, value) => {
        setCustomSplits(customSplits.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const addPerson = () => {
        setCustomSplits([...customSplits, { id: Date.now(), name: `Henkilö ${customSplits.length + 1}`, amount: '' }]);
    };

    const removePerson = (id) => {
        if (customSplits.length > 2) {
            setCustomSplits(customSplits.filter(p => p.id !== id));
        }
    };

    const evenAmount = totalAmount > 0 && numPeople > 0 ? (totalAmount / numPeople).toFixed(2) : '0.00';

    let customTotal = 0;
    if (splitType === 'custom') {
        customTotal = customSplits.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    }

    const generateWhatsAppLink = (amount, name = '') => {
        let text;
        if (name && name.toLowerCase() !== 'henkilö' && !name.toLowerCase().startsWith('henkilö ')) {
            text = `Moikka ${name}! 👋\nMeidän yhteisen laskun summa oli ${totalAmount.toFixed(2)}€. Sinun osuutesi on ${parseFloat(amount).toFixed(2)}€.\nSopiiko laittaa MobilePaylla? 💸`;
        } else {
            text = `Moikka! 👋\nMeidän yhteisen laskun summa oli ${totalAmount.toFixed(2)}€. Sinun osuutesi on ${parseFloat(amount).toFixed(2)}€.\nSopiiko laittaa MobilePaylla? 💸`;
        }
        return `whatsapp://send?text=${encodeURIComponent(text)}`;
    };

    return (
        <div>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <span className="text-gradient">Easy Split</span>
            </h2>

            <div className="input-group">
                <label>Kokonaissumma (€)</label>
                <input
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setSplitType('even')}
                    style={{
                        flex: 1,
                        background: splitType === 'even' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                        color: splitType === 'even' ? '#fff' : 'var(--text-secondary)',
                    }}
                >
                    Tasajako
                </button>
                <button
                    onClick={() => setSplitType('custom')}
                    style={{
                        flex: 1,
                        background: splitType === 'custom' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                        color: splitType === 'custom' ? '#fff' : 'var(--text-secondary)',
                    }}
                >
                    Omat osuudet
                </button>
            </div>

            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                {splitType === 'even' ? (
                    <div>
                        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ textAlign: 'center', marginBottom: '1rem' }}>Henkilöiden määrä</label>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                                <button
                                    onClick={() => setNumPeople(Math.max(2, numPeople - 1))}
                                    style={{ width: '50px', height: '50px', padding: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', fontSize: '1.5rem' }}
                                >-</button>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', width: '60px', textAlign: 'center' }}>{numPeople}</div>
                                <button
                                    onClick={() => setNumPeople(numPeople + 1)}
                                    style={{ width: '50px', height: '50px', padding: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', fontSize: '1.5rem' }}
                                >+</button>
                            </div>
                        </div>

                        <div className="result-box" style={{ marginTop: 0 }}>
                            <h3>Osuus per hlö</h3>
                            <div className="amount" style={{ fontSize: '2.5rem' }}>
                                {evenAmount}€
                            </div>

                            <a
                                href={generateWhatsAppLink(evenAmount)}
                                style={{
                                    display: 'inline-block',
                                    marginTop: '1.5rem',
                                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                                    color: '#fff',
                                    padding: '12px 24px',
                                    borderRadius: '24px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                                }}
                            >
                                💬 Jaa WhatsAppissa
                            </a>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Jaettu: <span style={{ color: customTotal > totalAmount && totalAmount > 0 ? '#ef4444' : '#fff', fontWeight: '600' }}>{customTotal.toFixed(2)}€</span>
                            </div>
                            {customTotal < totalAmount && totalAmount > 0 && (
                                <div style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: '500' }}>
                                    Jäljellä: {(totalAmount - customTotal).toFixed(2)}€
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {customSplits.map((person, index) => (
                                <div key={person.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={person.name}
                                        onChange={(e) => handleCustomChange(person.id, 'name', e.target.value)}
                                        style={{ flex: 3, padding: '12px 10px' }}
                                        placeholder={`Nimi ${index + 1}`}
                                    />
                                    <input
                                        type="number"
                                        value={person.amount}
                                        onChange={(e) => handleCustomChange(person.id, 'amount', e.target.value)}
                                        style={{ flex: 2, padding: '12px 10px' }}
                                        placeholder="0.00"
                                    />
                                    {customSplits.length > 2 && (
                                        <button
                                            onClick={() => removePerson(person.id)}
                                            style={{ padding: '12px', background: 'transparent', color: '#ef4444', width: 'auto' }}
                                            title="Poista"
                                        >
                                            ✕
                                        </button>
                                    )}
                                    {person.amount > 0 && (
                                        <a
                                            href={generateWhatsAppLink(person.amount, person.name)}
                                            title="Jaa WhatsAppissa"
                                            style={{
                                                background: '#25D366',
                                                color: '#fff',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            💬
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={addPerson}
                            style={{ marginTop: '1.5rem', width: '100%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}
                        >
                            + Lisää henkilö
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
