/**
 * Kevyt mock-analytiikka mittaaman viraaliteettiä WhatsApp-jakojen muodossa.
 * Tosimaailman sovelluksessa tämä korvattaisiin esim: posthog.capture('event_name', properties)
 */
export const trackEvent = (eventName, properties = {}) => {
    // Luetaan vanhat eventit selaimen LocalStoragesta demotarkoituksiin
    const storageKey = 'vuoto_analytics_events';
    const existingEvents = JSON.parse(localStorage.getItem(storageKey)) || [];

    const newEvent = {
        eventName,
        properties,
        timestamp: new Date().toISOString()
    };

    existingEvents.push(newEvent);
    localStorage.setItem(storageKey, JSON.stringify(existingEvents));

    // Pellervolle lukuja kehityskonsoliin
    console.log(`📊 [Analytics Tracked]: ${eventName}`, properties);
};
