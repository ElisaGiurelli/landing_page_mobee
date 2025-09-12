"use client";

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    dataLayer: unknown[];
    klaro: {
      show?: () => void;
      [key: string]: unknown;
    };
  }
}

interface AnalyticsProps {
  measurementId?: string;
}

export default function Analytics({ measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID }: AnalyticsProps) {
  useEffect(() => {
    // Initialize Google Analytics with consent mode
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: unknown[]) {
        window.dataLayer.push(...args);
      };
      
      window.gtag('js', Date.now().toString());
      
      // Set default consent state (denied until user accepts)
      window.gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
      });

      // Initialize GA config (will only work when consent is granted)
      if (measurementId) {
        window.gtag('config', measurementId, {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure'
        });
      }
    }
  }, [measurementId]);

  // Don't render anything if no measurement ID
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        data-klaro="google-analytics"
      />
    </>
  );
}