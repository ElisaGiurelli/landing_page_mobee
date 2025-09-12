"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Settings } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  onConsentChange?: (preferences: CookiePreferences) => void;
}

export default function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      onConsentChange?.(savedPreferences);
    }
  }, [onConsentChange]);

  const saveConsent = (newPreferences: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(newPreferences);
    onConsentChange?.(newPreferences);
    setIsVisible(false);
    setShowCustomize(false);

    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: newPreferences.analytics ? 'granted' : 'denied',
        ad_storage: newPreferences.marketing ? 'granted' : 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
      });
    }
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleAcceptEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleCustomSave = () => {
    saveConsent(preferences);
  };

  const handlePreferenceChange = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [category]: value }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      {showCustomize && (
        <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setShowCustomize(false)} />
      )}
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-[70] p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {!showCustomize ? (
            // Main Banner
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>🍪 Utilizziamo i cookie</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Utilizziamo cookie tecnici e di analisi per migliorare la tua esperienza. 
                  Puoi accettare tutti i cookie o solo quelli essenziali.
                </p>
                <div className="flex gap-4 mt-2 text-xs">
                  <a href="/privacy-policy" className="text-purple-600 hover:underline">
                    Privacy Policy
                  </a>
                  <a href="/cookie-policy" className="text-purple-600 hover:underline">
                    Cookie Policy
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                <Button
                  onClick={handleAcceptAll}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm"
                >
                  Accetta tutti
                </Button>
                <Button
                  onClick={handleAcceptEssential}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 text-sm"
                >
                  Solo essenziali
                </Button>
                <Button
                  onClick={() => setShowCustomize(true)}
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 px-4 py-2 text-sm"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Personalizza
                </Button>
              </div>
            </div>
          ) : (
            // Customize Panel
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Personalizza i cookie
                </h3>
                <Button
                  onClick={() => setShowCustomize(false)}
                  variant="ghost"
                  size="sm"
                  className="p-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Cookie essenziali</h4>
                    <p className="text-sm text-gray-600">
                      Necessari per il funzionamento del sito
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Sempre attivi
                  </div>
                </div>
                
                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Cookie di analisi</h4>
                    <p className="text-sm text-gray-600">
                      Google Analytics per migliorare l'esperienza utente
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                
                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Cookie di marketing</h4>
                    <p className="text-sm text-gray-600">
                      LinkedIn, Facebook Pixel per contenuti personalizzati
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => setShowCustomize(false)}
                  variant="outline"
                  className="px-4 py-2 text-sm"
                >
                  Annulla
                </Button>
                <Button
                  onClick={handleCustomSave}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm"
                >
                  Salva preferenze
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

