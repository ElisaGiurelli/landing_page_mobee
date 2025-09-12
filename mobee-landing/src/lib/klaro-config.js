// Klaro.js Configuration for GDPR Compliance - MOBEE
// Free and complete GDPR solution for Italian/EU market

export const klaroConfig = {
  // GDPR version for EU compliance
  version: 1,
  
  // Language configuration - Italian as default
  lang: 'it',
  
  // Translations for Italian/EU market
  translations: {
    it: {
      consentModal: {
        title: 'Cookie',
        description: 'Utilizziamo cookie per migliorare la tua esperienza e analizzare l\'utilizzo del sito.',
        privacyPolicy: {
          name: 'Privacy Policy',
          text: 'Leggi la {privacyPolicy} per maggiori informazioni.',
        },
      },
      consentNotice: {
        changeDescription: 'Aggiorna le tue preferenze cookie.',
        description: 'Utilizziamo cookie per personalizzare contenuti e migliorare la tua esperienza.',
        learnMore: 'Personalizza',
        testing: 'Test!',
        imprint: 'Impronta',
        privacyPolicy: 'Privacy',
        privacyPolicyUrl: '/privacy-policy'
      },
      ok: 'Accetta tutti',
      save: 'Salva',
      decline: 'Rifiuta tutto',
      close: 'Chiudi',
      acceptAll: 'Accetta tutti',
      acceptSelected: 'Accetta selezionati',
      service: {
        disableAll: {
          title: 'Disabilita tutti i servizi',
          description: 'Utilizza questo interruttore per abilitare/disabilitare tutti i servizi.'
        },
        optOut: {
          title: '(opt-out)',
          description: 'Questo servizio è caricato di default (ma puoi disattivarlo)'
        },
        required: {
          title: '(sempre richiesto)',
          description: 'Questo servizio è sempre richiesto'
        },
        purposes: 'Finalità',
        purpose: 'Finalità'
      },
      poweredBy: 'Realizzato con Klaro!'
    }
  },

  // Element ID where Klaro will be mounted
  elementID: 'klaro',

  // Styling - matches MOBEE brand colors
  styling: {
    theme: ['light'],
  },

  // No external stylesheets needed - we'll use inline CSS
  noAutoLoad: false,

  // HTML texts allowed
  htmlTexts: true,

  // Embedded - not as modal
  embedded: false,

  // Group services by purpose
  groupByPurpose: true,

  // Services configuration
  services: [
    {
      // Essential cookies - always required
      name: 'essential',
      title: 'Cookie Essenziali',
      description: 'Cookie necessari per il corretto funzionamento del sito web',
      purposes: ['functionality'],
      required: true,
      optOut: false,
      onlyOnce: true,
    },
    
    {
      // Google Analytics
      name: 'google-analytics',
      title: 'Google Analytics',
      description: 'Servizio di analisi web per comprendere come gli utenti interagiscono con il nostro sito',
      purposes: ['analytics'],
      cookies: [
        '_ga',
        '_gat',
        '_gid',
        '_ga_*'
      ],
      callback: function(consent, service) {
        if (typeof window === 'undefined') return;
        
        if (consent) {
          // Initialize Google Analytics
          if (window.gtag) {
            window.gtag('consent', 'update', {
              'analytics_storage': 'granted'
            });
            
            const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
            if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
              window.gtag('config', measurementId, {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            }
          }
        } else {
          // Disable Google Analytics
          if (window.gtag) {
            window.gtag('consent', 'update', {
              'analytics_storage': 'denied'
            });
          }
        }
      }
    },

    {
      // Hotjar - if used
      name: 'hotjar',
      title: 'Hotjar',
      description: 'Strumento di analisi del comportamento utente per migliorare l\'esperienza del sito',
      purposes: ['analytics'],
      cookies: [
        '_hjSessionUser_*',
        '_hjSession_*',
        '_hjTLDTest',
        '_hjUserAttributesHash',
        '_hjCachedUserAttributes'
      ],
      callback: function(consent, service) {
        if (consent) {
          // Initialize Hotjar
          console.log('Hotjar enabled');
        } else {
          // Disable Hotjar
          console.log('Hotjar disabled');
        }
      }
    },

    {
      // Facebook Pixel
      name: 'facebook-pixel',
      title: 'Facebook Pixel',
      description: 'Strumento di Facebook per il tracciamento delle conversioni e remarketing',
      purposes: ['marketing'],
      cookies: [
        '_fbp',
        '_fbc',
        'fr'
      ],
      callback: function(consent, service) {
        if (consent) {
          console.log('Facebook Pixel enabled');
        } else {
          console.log('Facebook Pixel disabled');
        }
      }
    },

    {
      // LinkedIn Insight Tag
      name: 'linkedin',
      title: 'LinkedIn Insight Tag',
      description: 'Tag di LinkedIn per il monitoraggio delle conversioni e remarketing B2B',
      purposes: ['marketing'],
      cookies: [
        'li_gc',
        'lidc',
        'bcookie',
        'li_fat_id'
      ],
      callback: function(consent, service) {
        if (consent) {
          console.log('LinkedIn tracking enabled');
        } else {
          console.log('LinkedIn tracking disabled');
        }
      }
    }
  ],

  // Cookie purposes
  purposes: [
    {
      name: 'functionality',
      title: 'Funzionalità',
      description: 'Cookie necessari per il funzionamento base del sito'
    },
    {
      name: 'analytics',
      title: 'Analisi',
      description: 'Cookie per comprendere come i visitatori utilizzano il sito'
    },
    {
      name: 'marketing',
      title: 'Marketing',
      description: 'Cookie per mostrare annunci personalizzati e misurare l\'efficacia delle campagne'
    }
  ],

  // Callback when consent changes
  callback: function(consent, service) {
    console.log('Consent updated:', consent, service);
  },

  // Default consent state
  default: false,

  // Must consent to use the site (required for GDPR)
  mustConsent: false,

  // Accept all by default in some regions (set to false for GDPR)
  acceptAll: false,

  // Hide decline all button (set to false for GDPR compliance)
  hideDeclineAll: false,

  // Hide learn more link to prevent modal opening
  hideLearnMore: true,

  // Notice as modal - ALWAYS keep as banner, never show modal
  noticeAsModal: false,
  
  // Force banner mode (not modal) even on first visit
  modalDisplayMode: 'notice',

  // Storage method
  storageMethod: 'localStorage',

  // Cookie domain
  cookieDomain: undefined,

  // Cookie expires after (in days)
  cookieExpiresAfterDays: 365,

  // Privacy policy URL
  privacyPolicy: '/privacy-policy',

  // Additional information
  additionalClass: 'moobee-cookie-consent',
  
  // Testing mode
  testing: false
};
export default klaroConfig;