// Automatic Cookie Scanner for GDPR Compliance - MOBEE
// Free tool to automatically detect cookies on the site

export class CookieScanner {
  constructor() {
    this.detectedCookies = new Map();
    this.observers = [];
  }

  // Start monitoring cookies
  startScanning() {
    if (typeof window === 'undefined') return;

    // Initial scan
    this.scanExistingCookies();

    // Monitor new cookies
    this.startCookieObserver();
    this.startNetworkObserver();

    console.log('🍪 Cookie Scanner started - GDPR compliance mode');
  }

  // Scan existing cookies
  scanExistingCookies() {
    if (typeof document === 'undefined') return;

    const cookies = document.cookie.split(';');
    
    cookies.forEach(cookie => {
      const [name] = cookie.trim().split('=');
      if (name) {
        this.categoryCookie(name.trim());
      }
    });
  }

  // Monitor new cookies being set
  startCookieObserver() {
    if (typeof document === 'undefined') return;

    // Override document.cookie setter
    const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    const scanner = this;

    Object.defineProperty(document, 'cookie', {
      get() {
        return originalCookieDescriptor.get.call(this);
      },
      set(value) {
        const [cookiePair] = value.split(';');
        const [name] = cookiePair.split('=');
        
        if (name) {
          scanner.categoryCookie(name.trim());
        }
        
        return originalCookieDescriptor.set.call(this, value);
      },
      configurable: true
    });
  }

  // Monitor network requests that might set cookies
  startNetworkObserver() {
    if (typeof window === 'undefined') return;

    // Monitor fetch requests
    const originalFetch = window.fetch;
    const scanner = this;

    window.fetch = function(...args) {
      return originalFetch.apply(this, args).then(response => {
        // Check Set-Cookie headers
        const cookies = response.headers.get('set-cookie');
        if (cookies) {
          cookies.split(',').forEach(cookie => {
            const [name] = cookie.trim().split('=');
            if (name) {
              scanner.categoryCookie(name.trim());
            }
          });
        }
        return response;
      });
    };
  }

  // Categorize cookie by name pattern
  categoryCookie(name) {
    if (this.detectedCookies.has(name)) return;

    const category = this.getCookieCategory(name);
    
    this.detectedCookies.set(name, {
      name,
      category,
      firstSeen: new Date(),
      source: this.getCookieSource(name)
    });

    console.log(`🍪 New cookie detected: ${name} (${category})`);
  }

  // Determine cookie category based on name patterns
  getCookieCategory(name) {
    // Essential cookies
    const essentialPatterns = [
      /^(PHPSESSID|JSESSIONID|ASP\.NET_SessionId)$/,
      /^(csrf|xsrf|_token)$/i,
      /^(consent|cookie-consent|gdpr)$/i,
      /^(lang|locale|timezone)$/i
    ];

    // Analytics cookies  
    const analyticsPatterns = [
      /^_ga/,
      /^_gid/,
      /^_gat/,
      /^_gtm/,
      /^_dc_gtm/,
      /^_hjSessionUser/,
      /^_hjSession/,
      /^_hjTLDTest/,
      /^_hjUserAttributesHash/,
      /^_hjCachedUserAttributes/
    ];

    // Marketing cookies
    const marketingPatterns = [
      /^_fbp$/,
      /^_fbc$/,
      /^fr$/,
      /^tr$/,
      /^li_gc$/,
      /^lidc$/,
      /^bcookie$/,
      /^li_fat_id$/,
      /^_gcl_au$/,
      /^_gac_/,
      /^__utma?$/,
      /^__utmb?$/,
      /^__utmc?$/,
      /^__utmz?$/
    ];

    // Check patterns
    for (const pattern of essentialPatterns) {
      if (pattern.test(name)) return 'essential';
    }

    for (const pattern of analyticsPatterns) {
      if (pattern.test(name)) return 'analytics';
    }

    for (const pattern of marketingPatterns) {
      if (pattern.test(name)) return 'marketing';
    }

    // Default to unknown (requires manual categorization)
    return 'unknown';
  }

  // Determine cookie source/provider
  getCookieSource(name) {
    const sources = {
      // Google services
      '_ga': 'Google Analytics',
      '_gid': 'Google Analytics', 
      '_gat': 'Google Analytics',
      '_gtm': 'Google Tag Manager',

      // Facebook
      '_fbp': 'Facebook Pixel',
      '_fbc': 'Facebook Pixel',
      'fr': 'Facebook',

      // LinkedIn  
      'li_gc': 'LinkedIn Insight Tag',
      'lidc': 'LinkedIn',
      'bcookie': 'LinkedIn',

      // Hotjar
      '_hjSessionUser': 'Hotjar',
      '_hjSession': 'Hotjar',
      '_hjTLDTest': 'Hotjar'
    };

    // Exact match
    if (sources[name]) return sources[name];

    // Pattern match
    if (name.startsWith('_ga')) return 'Google Analytics';
    if (name.startsWith('_hj')) return 'Hotjar';
    if (name.startsWith('li_')) return 'LinkedIn';
    if (name.startsWith('_fbp')) return 'Facebook Pixel';

    return 'Unknown';
  }

  // Get detected cookies report
  getReport() {
    const report = {
      totalCookies: this.detectedCookies.size,
      categories: {
        essential: 0,
        analytics: 0, 
        marketing: 0,
        unknown: 0
      },
      cookies: []
    };

    this.detectedCookies.forEach(cookie => {
      report.categories[cookie.category]++;
      report.cookies.push(cookie);
    });

    return report;
  }

  // Generate GDPR compliance report
  generateGDPRReport() {
    const report = this.getReport();
    
    console.log('📊 GDPR Cookie Compliance Report');
    console.log('================================');
    console.log(`Total cookies detected: ${report.totalCookies}`);
    console.log(`Essential: ${report.categories.essential}`);
    console.log(`Analytics: ${report.categories.analytics}`); 
    console.log(`Marketing: ${report.categories.marketing}`);
    console.log(`Unknown: ${report.categories.unknown}`);

    if (report.categories.unknown > 0) {
      console.warn('⚠️ Unknown cookies detected - manual categorization required for full GDPR compliance');
      
      const unknownCookies = report.cookies.filter(c => c.category === 'unknown');
      console.log('Unknown cookies:', unknownCookies);
    }

    return report;
  }

  // Stop scanning
  stopScanning() {
    // Restore original cookie behavior
    delete document.cookie;
    console.log('🍪 Cookie Scanner stopped');
  }
}

// Create global instance only on client side
let cookieScanner = null;

if (typeof window !== 'undefined') {
  cookieScanner = new CookieScanner();
  
  // Auto-start in development mode
  if (process.env.NODE_ENV === 'development') {
    cookieScanner.startScanning();
    
    // Generate report after 5 seconds
    setTimeout(() => {
      cookieScanner.generateGDPRReport();
    }, 5000);
  }
}

export { cookieScanner };

export default cookieScanner;