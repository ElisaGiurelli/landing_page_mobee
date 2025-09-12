"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CookieConsent from './cookie-consent';

export default function CookieManager() {
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  const handleShowCookieSettings = () => {
    // Remove existing consent to force showing the banner
    localStorage.removeItem('cookie-consent');
    setShowCookieSettings(true);
    // Reload the page to show the cookie banner
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={handleShowCookieSettings}
        className="font-body hover:text-white transition-colors text-gray-400 text-sm"
      >
        Gestisci Cookie
      </button>
      {showCookieSettings && (
        <CookieConsent
          onConsentChange={(preferences) => {
            setShowCookieSettings(false);
          }}
        />
      )}
    </>
  );
}