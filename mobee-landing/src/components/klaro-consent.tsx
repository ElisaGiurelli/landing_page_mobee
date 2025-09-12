"use client";

import { useEffect, useState } from 'react';

export default function KlaroConsent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const initializeKlaro = async () => {
      console.log('🚀 Starting Klaro initialization...');
      
      try {
        // Check if already initialized
        if (window.klaro && localStorage.getItem('klaro')) {
          console.log('⚠️ Klaro already initialized, skipping...');
          return;
        }

        // Dynamic import per evitare errori SSR
        console.log('📦 Importing Klaro module...');
        const klaroModule = await import('klaro');
        
        console.log('📦 Importing Klaro config...');
        const { klaroConfig } = await import('@/lib/klaro-config');
        
        console.log('⚙️ Klaro config loaded:', klaroConfig);
        
        // Initialize Klaro with our configuration
        console.log('🔧 Setting up Klaro...');
        klaroModule.setup(klaroConfig);
        
        // Rendi Klaro disponibile globalmente per l'accesso dal footer
        window.klaro = klaroModule;
        
        // Force show if no consent exists
        const consent = localStorage.getItem('klaro');
        console.log('🍪 Existing consent:', consent);
        
        if (!consent) {
          console.log('🎯 No consent found, banner should appear automatically...');
          // Let Klaro handle showing the banner naturally - don't force it
          // The banner will appear automatically based on configuration
        } else {
          console.log('🔍 Consent exists, banner hidden.');
        }
        
        // Start cookie scanner for compliance monitoring in development
        if (process.env.NODE_ENV === 'development') {
          try {
            const scannerModule = await import('@/lib/cookie-scanner');
            const cookieScanner = scannerModule.cookieScanner as any;
            if (cookieScanner && typeof cookieScanner.startScanning === 'function') {
              cookieScanner.startScanning();
            }
          } catch (error) {
            console.warn('Cookie scanner not available:', error);
          }
        }
        
        console.log('✅ Klaro initialized successfully', klaroModule);
      } catch (error) {
        console.error('❌ Error initializing Klaro:', error);
        console.error('Stack trace:', error instanceof Error ? error.stack : 'Unknown error');
      }
    };

    initializeKlaro();
  }, []);

  // Non renderizzare nulla durante SSR
  if (!isClient) {
    return null;
  }

  // Debug function to reset cookies and show banner
  const resetCookieConsent = () => {
    localStorage.removeItem('klaro');
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    console.log('🧹 Cookie consent reset, reloading page...');
    window.location.reload();
  };

  // Make debug function available globally in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    (window as any).resetCookieConsent = resetCookieConsent;
  }

  return (
    <>
      {/* Klaro will inject the consent notice here */}
      <div id="klaro" />
      
      {/* Debug helper in development */}
      {process.env.NODE_ENV === 'development' && isClient && (
        <div 
          style={{ 
            position: 'fixed', 
            top: '10px', 
            left: '10px', 
            zIndex: 10000, 
            background: '#ff4444', 
            color: 'white', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            fontSize: '12px',
            cursor: 'pointer',
            opacity: 0.7
          }}
          onClick={resetCookieConsent}
        >
          🔄 Reset Cookies
        </div>
      )}
      
      {/* Custom CSS for MOBEE branding - Beautiful cookie modal */}
      <style jsx global>{`
        /* Cookie Notice Banner - Small, discrete bottom-right banner */
        .moobe-cookie-consent .klaro .cookie-notice {
          background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%) !important;
          border: none !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(124, 58, 237, 0.1) !important;
          border-radius: 16px !important;
          margin: 12px !important;
          backdrop-filter: blur(10px) !important;
          max-width: 350px !important;
          width: 350px !important;
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 9999 !important;
          font-size: 14px !important;
        }

        /* Cookie notice content styling */
        .moobe-cookie-consent .klaro .cookie-notice .cn-body {
          color: #374151 !important;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif !important;
          line-height: 1.5 !important;
          padding: 16px !important;
        }

        .moobe-cookie-consent .klaro .cookie-notice .cn-body h1 {
          font-size: 16px !important;
          font-weight: 600 !important;
          color: #111827 !important;
          margin-bottom: 8px !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

        .moobe-cookie-consent .klaro .cookie-notice .cn-body h1::before {
          content: '🍪' !important;
          font-size: 18px !important;
        }

        .moobe-cookie-consent .klaro .cookie-notice .cn-body p {
          font-size: 13px !important;
          margin-bottom: 12px !important;
          color: #6b7280 !important;
          line-height: 1.4 !important;
        }

        /* Button styling - MOBEE brand colors - Smaller buttons */
        .moobe-cookie-consent .klaro .cookie-notice .cn-buttons {
          display: flex !important;
          gap: 8px !important;
          flex-wrap: wrap !important;
          justify-content: flex-end !important;
        }

        .moobe-cookie-consent .klaro .button {
          border-radius: 8px !important;
          font-weight: 500 !important;
          padding: 8px 12px !important;
          font-size: 12px !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: none !important;
          cursor: pointer !important;
          font-family: inherit !important;
        }

        /* Accept All - Purple gradient */
        .moobe-cookie-consent .klaro .cm-btn.cm-btn-accept-all {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          color: white !important;
          box-shadow: 0 4px 14px 0 rgba(124, 58, 237, 0.4) !important;
        }

        .moobe-cookie-consent .klaro .cm-btn.cm-btn-accept-all:hover {
          background: linear-gradient(135deg, #6d28d9 0%, #9333ea 100%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px 0 rgba(124, 58, 237, 0.5) !important;
        }

        /* Decline/Essential Only - Gray outline */
        .moobe-cookie-consent .klaro .cm-btn.cm-btn-decline {
          background: transparent !important;
          color: #6b7280 !important;
          border: 2px solid #e5e7eb !important;
          box-shadow: none !important;
        }

        .moobe-cookie-consent .klaro .cm-btn.cm-btn-decline:hover {
          background: #f9fafb !important;
          border-color: #d1d5db !important;
          transform: translateY(-1px) !important;
        }

        /* Learn More button - Purple outline */
        .moobe-cookie-consent .klaro .cm-btn.cm-btn-learn-more {
          background: transparent !important;
          color: #7c3aed !important;
          border: 2px solid #7c3aed !important;
          box-shadow: none !important;
        }

        .moobe-cookie-consent .klaro .cm-btn.cm-btn-learn-more:hover {
          background: rgba(124, 58, 237, 0.05) !important;
          transform: translateY(-1px) !important;
        }

        /* Cookie Modal - Full overlay style */
        .moobe-cookie-consent .klaro .cookie-modal {
          background: linear-gradient(135deg, #ffffff 0%, #faf5ff 50%, #fef3c7 100%) !important;
          border-radius: 20px !important;
          border: none !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          max-width: 600px !important;
          max-height: 80vh !important;
          overflow-y: auto !important;
        }

        /* Modal Header with gradient */
        .moobe-cookie-consent .klaro .cookie-modal .cm-header {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #f59e0b 100%) !important;
          color: white !important;
          padding: 32px !important;
          text-align: center !important;
          position: relative !important;
        }

        .moobe-cookie-consent .klaro .cookie-modal .cm-header::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hexagons" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hexagons)"/></svg>') !important;
          opacity: 0.3 !important;
        }

        .moobe-cookie-consent .klaro .cookie-modal .cm-header h1 {
          font-size: 28px !important;
          font-weight: 800 !important;
          margin: 0 !important;
          position: relative !important;
          z-index: 1 !important;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        }

        .moobe-cookie-consent .klaro .cookie-modal .cm-header h1::before {
          content: '🍪 ' !important;
          font-size: 32px !important;
          margin-right: 8px !important;
        }

        /* Modal Body */
        .moobe-cookie-consent .klaro .cookie-modal .cm-body {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          padding: 32px !important;
        }

        /* Purpose sections */
        .moobe-cookie-consent .klaro .cm-purposes .cm-purpose {
          background: white !important;
          border: 1px solid rgba(124, 58, 237, 0.1) !important;
          border-radius: 16px !important;
          padding: 24px !important;
          margin-bottom: 16px !important;
          transition: all 0.3s ease !important;
        }

        .moobe-cookie-consent .klaro .cm-purposes .cm-purpose:hover {
          border-color: rgba(124, 58, 237, 0.2) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.1) !important;
        }

        .moobe-cookie-consent .klaro .cm-purpose .cm-purpose-title {
          color: #111827 !important;
          font-weight: 700 !important;
          font-size: 18px !important;
          margin-bottom: 8px !important;
        }

        .moobe-cookie-consent .klaro .cm-purpose .cm-purpose-description {
          color: #6b7280 !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
        }

        /* Modern toggle switches */
        .moobe-cookie-consent .klaro .cm-toggle {
          float: right !important;
          margin-top: -4px !important;
        }

        .moobe-cookie-consent .klaro .cm-toggle input[type="checkbox"] {
          display: none !important;
        }

        .moobe-cookie-consent .klaro .cm-toggle .slider {
          width: 60px !important;
          height: 32px !important;
          background: #e5e7eb !important;
          border-radius: 32px !important;
          position: relative !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1) !important;
        }

        .moobe-cookie-consent .klaro .cm-toggle .slider:before {
          content: '' !important;
          position: absolute !important;
          height: 28px !important;
          width: 28px !important;
          left: 2px !important;
          top: 2px !important;
          background: white !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        }

        .moobe-cookie-consent .klaro .cm-toggle input[type="checkbox"]:checked + .slider {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4) !important;
        }

        .moobe-cookie-consent .klaro .cm-toggle input[type="checkbox"]:checked + .slider:before {
          transform: translateX(28px) !important;
        }

        /* Modal buttons */
        .moobe-cookie-consent .klaro .cookie-modal .cm-buttons {
          text-align: center !important;
          padding-top: 24px !important;
          border-top: 1px solid rgba(124, 58, 237, 0.1) !important;
          margin-top: 24px !important;
          display: flex !important;
          gap: 12px !important;
          justify-content: center !important;
        }

        .moobe-cookie-consent .klaro .cookie-modal .cm-btn {
          min-width: 140px !important;
        }

        /* Hide links to prevent modal opening - keep banner small */
        .moobe-cookie-consent .klaro .cookie-notice a,
        .moobe-cookie-consent .klaro .cookie-notice .cm-btn-learn-more {
          display: none !important;
        }
        
        /* Link styling for modal (if ever needed) */
        .moobe-cookie-consent .klaro .cookie-modal a {
          color: #7c3aed !important;
          text-decoration: none !important;
          font-weight: 600 !important;
        }

        .moobe-cookie-consent .klaro .cookie-modal a:hover {
          color: #6d28d9 !important;
          text-decoration: underline !important;
        }

        /* Mobile responsive improvements - Keep it small */
        @media (max-width: 768px) {
          .moobe-cookie-consent .klaro .cookie-notice {
            left: 12px !important;
            right: 12px !important;
            bottom: 12px !important;
            max-width: none !important;
            width: auto !important;
            border-radius: 12px !important;
            font-size: 12px !important;
          }

          .moobe-cookie-consent .klaro .cookie-notice .cn-body {
            padding: 12px !important;
          }

          .moobe-cookie-consent .klaro .cookie-notice .cn-body h1 {
            font-size: 14px !important;
            margin-bottom: 6px !important;
          }

          .moobe-cookie-consent .klaro .cookie-notice .cn-body p {
            font-size: 11px !important;
            margin-bottom: 8px !important;
          }

          .moobe-cookie-consent .klaro .cookie-notice .cn-buttons {
            gap: 6px !important;
          }

          .moobe-cookie-consent .klaro .button {
            padding: 6px 10px !important;
            font-size: 11px !important;
          }

          .moobe-cookie-consent .klaro .cookie-modal {
            margin: 16px !important;
            max-height: 90vh !important;
            border-radius: 16px !important;
          }

          .moobe-cookie-consent .klaro .cookie-modal .cm-header {
            padding: 24px !important;
          }

          .moobe-cookie-consent .klaro .cookie-modal .cm-header h1 {
            font-size: 24px !important;
          }

          .moobe-cookie-consent .klaro .cookie-modal .cm-body {
            padding: 20px !important;
          }

          .moobe-cookie-consent .klaro .cookie-modal .cm-buttons {
            flex-direction: column !important;
          }

          .moobe-cookie-consent .klaro .cm-toggle {
            float: none !important;
            display: block !important;
            margin: 16px 0 0 0 !important;
          }
        }

        /* Animation for modal appearance */
        .moobe-cookie-consent .klaro .cookie-modal {
          animation: modalSlideIn 0.3s ease-out !important;
        }

        .moobe-cookie-consent .klaro .cookie-notice {
          animation: bannerSlideIn 0.5s ease-out !important;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bannerSlideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}