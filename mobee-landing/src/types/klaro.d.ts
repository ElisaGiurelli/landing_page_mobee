declare module 'klaro' {
  export interface KlaroConfig {
    version?: number;
    lang?: string;
    translations?: Record<string, any>;
    elementID?: string;
    styling?: {
      theme?: string[];
    };
    noAutoLoad?: boolean;
    htmlTexts?: boolean;
    embedded?: boolean;
    groupByPurpose?: boolean;
    services?: Array<{
      name: string;
      title: string;
      description: string;
      purposes: string[];
      required?: boolean;
      optOut?: boolean;
      onlyOnce?: boolean;
      cookies?: string[];
      callback?: (consent: boolean, service: any) => void;
    }>;
    purposes?: Array<{
      name: string;
      title: string;
      description: string;
    }>;
    callback?: (consent: any, service?: any) => void;
    default?: boolean;
    mustConsent?: boolean;
    acceptAll?: boolean;
    hideDeclineAll?: boolean;
    hideLearnMore?: boolean;
    noticeAsModal?: boolean;
    storageMethod?: string;
    cookieDomain?: string;
    cookieExpiresAfterDays?: number;
    privacyPolicy?: string;
    additionalClass?: string;
    testing?: boolean;
  }

  export function setup(config: KlaroConfig): void;
  export function show(): void;
  export function hide(): void;
  export function getManager(): any;
  
  const klaro: {
    setup: (config: KlaroConfig) => void;
    show: () => void;
    hide: () => void;
    getManager: () => any;
    [key: string]: any;
  };
  
  export default klaro;
}