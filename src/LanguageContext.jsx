import { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './i18n';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('bt_language');
        // Default to 'en' if not saved, you could also check navigator.language
        return saved || 'en';
    });

    useEffect(() => {
        localStorage.setItem('bt_language', language);
    }, [language]);

    const t = (section, key) => {
        return translations[language][section][key] || key;
    };

    const getCurrencySymbol = () => {
        // A simple helper, could be expanded. Most of the time we just use the currency code anyway.
        return '$';
    }

    const formatMoney = (amount) => {
        // For English/Spanish in Americas, usually 1,234.56 format is preferred over 1.234,56
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount || 0);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, formatMoney, getCurrencySymbol }}>
            {children}
        </LanguageContext.Provider>
    );
};
