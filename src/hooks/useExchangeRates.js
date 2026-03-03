import { useState, useEffect } from 'react';
import { usePro } from '../ProContext';

export function useExchangeRates(baseCurrency) {
    const { isPro } = usePro();
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOfflineMode, setIsOfflineMode] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const cacheKey = `tbt_offline_rates_${baseCurrency}`;

        const fetchRates = async () => {
            setLoading(true);
            setError(null);
            setIsOfflineMode(false);

            try {
                const res = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`);

                if (!res.ok) {
                    throw new Error(`Verkkovirhe: ${res.status}`);
                }

                const data = await res.json();
                const fullRates = { ...data.rates, [baseCurrency]: 1 };

                if (isMounted) {
                    setRates(fullRates);
                    // AINA tallennetaan lokaaliin muistiin viimeisimmät kurssit
                    localStorage.setItem(cacheKey, JSON.stringify(fullRates));
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Failed to fetch API rates:", err);

                    // Offline Fallback Mechanism (PRO ONLY)
                    if (isPro) {
                        const cachedRates = localStorage.getItem(cacheKey);
                        if (cachedRates) {
                            console.log("Using cached offline rates! ⚡ PRO");
                            setRates(JSON.parse(cachedRates));
                            setIsOfflineMode(true);
                            // Nielletään virhe, koska meillä on välimuisti
                            setLoading(false);
                            return;
                        }
                    }

                    // Jos tultiin tänne asti, välimuistia ei ollut tai käyttäjä ilmaisversiossa
                    setError("Kurssien haku epäonnistui. Tarkista verkkoyhteytesi tai osta PRO jatkaaksesi ilman verkkoyhteyttä.");
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
    }, [baseCurrency, isPro]);

    return { rates, loading, error, isOfflineMode };
}
