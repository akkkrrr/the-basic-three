import { useState, useEffect } from 'react';

export function useExchangeRates(baseCurrency) {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchRates = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`);

                if (!res.ok) {
                    throw new Error(`Verkkovirhe: ${res.status}`);
                }

                const data = await res.json();

                if (isMounted) {
                    // Frankfurter doesn't return the base currency in the rates, so we add it manually
                    const fullRates = { ...data.rates, [baseCurrency]: 1 };
                    setRates(fullRates);
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Failed to fetch rates:", err);
                    setError("Kurssien haku epäonnistui. Tarkista verkkoyhteytesi.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchRates();

        return () => {
            isMounted = false;
        };
    }, [baseCurrency]);

    return { rates, loading, error };
}
