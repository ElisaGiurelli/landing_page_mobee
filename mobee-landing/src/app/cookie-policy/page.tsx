import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MoobeeLogo from '@/components/ui/mobee-logo';

export const metadata: Metadata = {
  title: 'Cookie Policy - MOOBEE | Gestione Cookie',
  description: 'Informazioni sui cookie utilizzati dal sito MOOBEE per migliorare la tua esperienza nella piattaforma AI talent management.',
  openGraph: {
    title: 'Cookie Policy - MOOBEE',
    description: 'Informazioni sui cookie utilizzati dal sito MOOBEE',
    url: 'https://moobee.it/cookie-policy',
  }
};

const cookieData = [
  {
    category: 'Cookie Essenziali',
    description: 'Necessari per il funzionamento del sito web',
    cookies: [
      {
        name: 'cookie-consent',
        provider: 'Moobee',
        purpose: 'Memorizza le preferenze sui cookie',
        duration: 'Persistente',
        type: 'Essenziale'
      },
      {
        name: 'cookie-consent-date',
        provider: 'Moobee', 
        purpose: 'Data del consenso ai cookie',
        duration: 'Persistente',
        type: 'Essenziale'
      },
      {
        name: 'NEXT_LOCALE',
        provider: 'Next.js',
        purpose: 'Gestione localizzazione',
        duration: 'Sessione',
        type: 'Essenziale'
      }
    ]
  },
  {
    category: 'Cookie di Analisi',
    description: 'Raccolgono informazioni su come gli utenti utilizzano il sito',
    cookies: [
      {
        name: '_ga',
        provider: 'Google Analytics',
        purpose: 'Distingue gli utenti unici',
        duration: '2 anni',
        type: 'Analytics'
      },
      {
        name: '_ga_*',
        provider: 'Google Analytics',
        purpose: 'Mantiene lo stato della sessione',
        duration: '2 anni',
        type: 'Analytics'
      },
      {
        name: '_gid',
        provider: 'Google Analytics',
        purpose: 'Distingue gli utenti unici',
        duration: '24 ore',
        type: 'Analytics'
      },
      {
        name: '_gat',
        provider: 'Google Analytics',
        purpose: 'Limita la frequenza delle richieste',
        duration: '1 minuto',
        type: 'Analytics'
      },
      {
        name: '_hjSessionUser_*',
        provider: 'Hotjar',
        purpose: 'Registrazione sessioni utente',
        duration: '1 anno',
        type: 'Analytics'
      },
      {
        name: '_hjSession_*',
        provider: 'Hotjar',
        purpose: 'Dati della sessione corrente',
        duration: '30 minuti',
        type: 'Analytics'
      }
    ]
  },
  {
    category: 'Cookie di Marketing',
    description: 'Utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti',
    cookies: [
      {
        name: '_fbp',
        provider: 'Facebook',
        purpose: 'Tracciamento conversioni Facebook Pixel',
        duration: '3 mesi',
        type: 'Marketing'
      },
      {
        name: 'li_gc',
        provider: 'LinkedIn',
        purpose: 'Memorizza il consenso guest per LinkedIn',
        duration: '2 anni',
        type: 'Marketing'
      },
      {
        name: 'lidc',
        provider: 'LinkedIn',
        purpose: 'Facilita la selezione del data center',
        duration: '24 ore',
        type: 'Marketing'
      },
      {
        name: 'bcookie',
        provider: 'LinkedIn',
        purpose: 'Identificazione browser su LinkedIn',
        duration: '2 anni',
        type: 'Marketing'
      }
    ]
  }
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <MoobeeLogo className="text-purple-600" width={120} height={100} />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna al sito
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Cosa sono i Cookie</h2>
              <p className="text-gray-600 leading-relaxed">
                I cookie sono piccoli file di testo che vengono automaticamente posizionati sul PC dell'utente 
                dal server web durante la navigazione e sono memorizzati dal browser web dell'utente. 
                Il cookie contiene alcune informazioni che possono essere lette dal server web che lo ha generato 
                ogni qualvolta l'utente vi fa ritorno.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Come utilizziamo i Cookie</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Utilizziamo i cookie per migliorare la tua esperienza di navigazione, per fornire funzionalità 
                di social media e per analizzare il nostro traffico. Condividiamo anche informazioni sul modo 
                in cui utilizzi il nostro sito con i nostri partner che si occupano di analisi web e social media.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">💡 Gestisci le tue preferenze</h3>
                <p className="text-blue-700 text-sm">
                  Puoi modificare le tue preferenze sui cookie in qualsiasi momento utilizzando il 
                  pulsante "Gestisci Cookie" presente nel footer del sito.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Tipi di Cookie utilizzati</h2>
              
              {cookieData.map((category, index) => (
                <div key={index} className="mb-8">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.category}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Nome</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Provider</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Scopo</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Durata</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Tipo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.cookies.map((cookie, cookieIndex) => (
                          <tr key={cookieIndex} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-100 font-mono">
                              {cookie.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                              {cookie.provider}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-100">
                              {cookie.purpose}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                              {cookie.duration}
                            </td>
                            <td className="px-4 py-3 text-sm border-b border-gray-100">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                cookie.type === 'Essenziale' 
                                  ? 'bg-green-100 text-green-800'
                                  : cookie.type === 'Analytics'
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-orange-100 text-orange-800'
                              }`}>
                                {cookie.type}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Come disabilitare i Cookie</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Puoi controllare e/o disabilitare i cookie come desideri. Puoi cancellare tutti i cookie 
                già presenti sul tuo computer e puoi impostare la maggior parte dei browser per impedire 
                che vengano posizionati.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Google Chrome</h4>
                  <p className="text-sm text-gray-600">
                    Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Mozilla Firefox</h4>
                  <p className="text-sm text-gray-600">
                    Opzioni → Privacy e sicurezza → Cookie e dati dei siti web
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Safari</h4>
                  <p className="text-sm text-gray-600">
                    Preferenze → Privacy → Gestisci dati siti web
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Microsoft Edge</h4>
                  <p className="text-sm text-gray-600">
                    Impostazioni → Cookie e autorizzazioni del sito
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Link Utili</h2>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                     className="text-purple-600 hover:underline">
                    Google Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer" 
                     className="text-purple-600 hover:underline">
                    Hotjar Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" 
                     className="text-purple-600 hover:underline">
                    Facebook Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" 
                     className="text-purple-600 hover:underline">
                    LinkedIn Privacy Policy
                  </a>
                </li>
              </ul>
            </section>

            <section className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-800 mb-2">Contatti</h3>
              <p className="text-purple-700">
                Per domande relative ai cookie, contattaci a: 
                <a href="mailto:mobee.mirai@gmail.com" className="underline ml-1">mobee.mirai@gmail.com</a>
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Ultima modifica: {new Date().toLocaleDateString('it-IT', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}